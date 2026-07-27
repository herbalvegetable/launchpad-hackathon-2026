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

/**
 * Renders mermaid source into an SVG string. Throws a plain Error with a
 * readable message on parse failure so callers can show it in the UI.
 */
export async function renderMermaid(code, id) {
  ensureInit();
  try {
    const { svg } = await mermaid.render(id, code);
    return svg;
  } catch (err) {
    throw new Error(
      `Could not render the exploit flowchart: ${err.message || 'invalid Mermaid syntax'}.`
    );
  }
}
