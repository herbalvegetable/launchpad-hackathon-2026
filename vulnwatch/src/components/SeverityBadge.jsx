const SEVERITY_STYLES = {
  CRITICAL: { color: 'var(--critical)', bg: 'var(--critical-bg)', label: 'Critical' },
  HIGH: { color: 'var(--high)', bg: 'var(--high-bg)', label: 'High' },
  MEDIUM: { color: 'var(--medium)', bg: 'var(--medium-bg)', label: 'Medium' },
  LOW: { color: 'var(--low)', bg: 'var(--low-bg)', label: 'Low' },
  NONE: { color: 'var(--none-sev)', bg: 'var(--none-bg)', label: 'None' },
};

export default function SeverityBadge({ severity = 'NONE', size = 'md' }) {
  const style = SEVERITY_STYLES[severity] || SEVERITY_STYLES.NONE;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium tracking-wide ${padding}`}
      style={{ color: style.color, background: style.bg, border: `1px solid ${style.color}33` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.color }} />
      {style.label}
    </span>
  );
}

export { SEVERITY_STYLES };
