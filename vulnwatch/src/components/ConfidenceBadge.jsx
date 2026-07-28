const CONFIDENCE_STYLES = {
  CONFIRMED: { color: 'var(--critical)', label: 'Confirmed' },
  LIKELY: { color: 'var(--high)', label: 'Likely' },
  POSSIBLE: { color: 'var(--medium)', label: 'Possible' },
};

export default function ConfidenceBadge({ confidence }) {
  const style = CONFIDENCE_STYLES[confidence] || { color: 'var(--text-faint)', label: confidence || 'Unknown' };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-mono"
      style={{ color: style.color, background: `${style.color}1a`, border: `1px solid ${style.color}40` }}
    >
      {style.label}
    </span>
  );
}

export { CONFIDENCE_STYLES };
