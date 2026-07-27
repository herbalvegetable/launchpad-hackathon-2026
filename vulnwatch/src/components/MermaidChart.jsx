import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { renderMermaid } from '../utils/mermaidHelper';

let counter = 0;

export default function MermaidChart({ code }) {
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setSvg(null);
    if (!code) return;

    counter += 1;
    const id = `mermaid-${counter}`;

    renderMermaid(code, id)
      .then((rendered) => {
        if (!cancelled) setSvg(rendered);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-4 text-sm text-[var(--critical)]">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-[var(--text-muted)] font-mono">
        VulnWatch is mapping the exploit chain...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="mermaid-export-target"
      className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] p-4 [&_svg]:mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
