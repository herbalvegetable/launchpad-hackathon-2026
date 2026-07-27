const STATUS_STYLES = {
  unreviewed: { color: '#8b96ac', label: 'Unreviewed' },
  under_analysis: { color: '#4f8bf0', label: 'Under analysis' },
  risk_accepted: { color: '#f0c33d', label: 'Risk accepted' },
  patched: { color: '#2fd6c4', label: 'Patched' },
};

export default function RemediationBadge({ status = 'unreviewed' }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.unreviewed;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: style.color, background: `${style.color}1a`, border: `1px solid ${style.color}40` }}
    >
      {style.label}
    </span>
  );
}

export { STATUS_STYLES };
