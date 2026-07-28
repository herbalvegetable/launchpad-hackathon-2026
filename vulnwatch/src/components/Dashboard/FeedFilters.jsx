const SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NONE'];
const STATUSES = [
  { value: 'unreviewed', label: 'Unreviewed' },
  { value: 'under_analysis', label: 'Under analysis' },
  { value: 'risk_accepted', label: 'Risk accepted' },
  { value: 'patched', label: 'Patched' },
];

export function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
          : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
      }`}
    >
      {children}
    </button>
  );
}

export default function FeedFilters({ vendors, filters, onChange }) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mr-1">
          Severity
        </span>
        <Pill active={!filters.severity} onClick={() => onChange({ ...filters, severity: null })}>
          All
        </Pill>
        {SEVERITIES.map((s) => (
          <Pill
            key={s}
            active={filters.severity === s}
            onClick={() => onChange({ ...filters, severity: filters.severity === s ? null : s })}
          >
            {s}
          </Pill>
        ))}
      </div>

      {vendors.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mr-1">
            Vendor
          </span>
          <Pill active={!filters.vendor} onClick={() => onChange({ ...filters, vendor: null })}>
            All
          </Pill>
          {vendors.map((v) => (
            <Pill
              key={v}
              active={filters.vendor === v}
              onClick={() => onChange({ ...filters, vendor: filters.vendor === v ? null : v })}
            >
              {v}
            </Pill>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mr-1">
          Status
        </span>
        <Pill active={!filters.status} onClick={() => onChange({ ...filters, status: null })}>
          All
        </Pill>
        {STATUSES.map(({ value, label }) => (
          <Pill
            key={value}
            active={filters.status === value}
            onClick={() => onChange({ ...filters, status: filters.status === value ? null : value })}
          >
            {label}
          </Pill>
        ))}
      </div>
    </div>
  );
}
