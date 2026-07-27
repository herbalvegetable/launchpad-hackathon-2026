import mermaid from 'mermaid';

let initialized = false;

function ensureInit() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      background: '#121a2b',
      primaryColor: '#172038',
      primaryTextColor: '#e7ecf5',
      primaryBorderColor: '#2fd6c4',
      lineColor: '#2fd6c4',
      secondaryColor: '#1b2438',
      tertiaryColor: '#0a0e17',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    },
    securityLevel: 'strict',
  });
  initialized = true;
}

function parseColor(color) {
  if (!color || color === 'none' || color === 'transparent') return null;
  const value = color.trim().toLowerCase();

  if (value.startsWith('#')) {
    let hex = value.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .slice(0, 3)
        .split('')
        .map((c) => c + c)
        .join('');
    } else if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    if (hex.length !== 6) return null;
    const n = Number.parseInt(hex, 16);
    if (Number.isNaN(n)) return null;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  const rgb = value.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgb) {
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) };
  }
  return null;
}

function relativeLuminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function isBrightFill(color) {
  const rgb = parseColor(color);
  if (!rgb) return false;
  return relativeLuminance(rgb) > 0.42;
}

function shapeFill(el) {
  const attr = el.getAttribute('fill');
  if (attr && attr !== 'none') return attr;
  const style = el.getAttribute('style') || '';
  const match = style.match(/(?:^|;)\s*fill\s*:\s*([^;!]+)/i);
  return match ? match[1].trim() : null;
}

/**
 * Mermaid's dark theme uses light label text. When a node (or AI style/classDef)
 * has a bright fill, force dark text so the label stays readable.
 */
function applyContrastToBrightNodes(svg) {
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  if (doc.querySelector('parsererror')) return svg;

  const darkText = '#1a1f2e';

  doc.querySelectorAll('.node').forEach((node) => {
    const shape = node.querySelector('rect, polygon, circle, ellipse, path');
    if (!shape || !isBrightFill(shapeFill(shape))) return;

    node.querySelectorAll('text, tspan').forEach((el) => {
      el.setAttribute('fill', darkText);
      const style = el.getAttribute('style') || '';
      el.setAttribute(
        'style',
        `${style.replace(/(?:^|;)\s*fill\s*:[^;]*/gi, '').replace(/^;/, '')};fill:${darkText}`.replace(/^;/, ''),
      );
    });

    node.querySelectorAll('span, div, p, a').forEach((el) => {
      el.style.color = darkText;
    });
  });

  return new XMLSerializer().serializeToString(doc.documentElement);
}

/**
 * Renders mermaid source into an SVG string. Throws a plain Error with a
 * readable message on parse failure so callers can show it in the UI.
 */
export async function renderMermaid(code, id) {
  ensureInit();
  try {
    const { svg } = await mermaid.render(id, code);
    return applyContrastToBrightNodes(svg);
  } catch (err) {
    throw new Error(
      `Could not render the exploit flowchart: ${err.message || 'invalid Mermaid syntax'}.`
    );
  }
}
