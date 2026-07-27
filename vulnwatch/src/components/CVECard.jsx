import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import RemediationBadge from './RemediationBadge';

function firstVendorProduct(vendors = {}) {
  const entries = Object.entries(vendors || {});
  if (!entries.length) return 'Unknown vendor';
  const [vendor, products] = entries[0];
  const product = products?.[0];
  const label = product ? `${vendor} / ${product}` : vendor;
  if (entries.length === 1) return label;
  return `${label} +${entries.length - 1}`;
}

function formatCvss(score) {
  if (score == null || Number.isNaN(score) || score <= 0) return 'CVSS —';
  return `CVSS ${Number(score).toFixed(1)}`;
}

export default function CVECard({ cve, remediationStatus, isNew }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/cve/${cve.id}`)}
      className="w-full text-left rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] hover:bg-[var(--bg-panel-raised)] hover:border-[var(--accent)]/50 transition-colors p-4 group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-sm text-[var(--accent)]">{cve.id}</span>
          {isNew && (
            <span className="text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/40">
              New
            </span>
          )}
        </div>
        <ChevronRight
          size={16}
          className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors shrink-0 mt-0.5"
        />
      </div>

      <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3 line-clamp-2">
        {cve.summary}
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <SeverityBadge severity={cve.severity} size="sm" />
          {remediationStatus && <RemediationBadge status={remediationStatus} />}
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-mono">
          <span>{firstVendorProduct(cve.vendors)}</span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {cve.published?.slice(0, 10)}
          </span>
          <span>{formatCvss(cve.cvss?.v3)}</span>
        </div>
      </div>
    </button>
  );
}
