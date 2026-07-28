import { ExternalLink } from 'lucide-react';
import SeverityBadge from '../SeverityBadge';
import ConfidenceBadge from '../ConfidenceBadge';

function Field({ label, children }) {
  if (!children || (Array.isArray(children) && children.length === 0)) return null;
  return (
    <div>
      <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-1">
        {label}
      </h4>
      <div className="text-sm text-[var(--text-muted)] leading-relaxed">{children}</div>
    </div>
  );
}

export default function FindingCard({ finding }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[var(--accent)] text-sm">{finding.cveId}</span>
          <SeverityBadge severity={finding.severity} size="sm" />
          <ConfidenceBadge confidence={finding.confidence} />
        </div>
        <span className="text-xs font-mono text-[var(--text-faint)]">
          CVSS {finding.cvssScore != null ? finding.cvssScore.toFixed(1) : 'N/A'}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-[var(--text-faint)]">Affected Component: </span>
          <span className="font-medium">{finding.affectedComponent || 'UNKNOWN'}</span>
        </div>
        <div>
          <span className="text-[var(--text-faint)]">Detected Version: </span>
          <span className="font-mono">{finding.detectedVersion || 'UNKNOWN'}</span>
        </div>
        <div>
          <span className="text-[var(--text-faint)]">Vulnerable Range: </span>
          <span className="font-mono">{finding.vulnerableVersionRange || 'UNKNOWN'}</span>
        </div>
        <div>
          <span className="text-[var(--text-faint)]">Fixed Version: </span>
          <span className="font-mono text-[var(--accent)]">{finding.fixedVersion || 'UNKNOWN'}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border-soft)]">
        <Field label="Evidence Found">{finding.evidenceFound}</Field>
        <Field label="Why This Organisation Is Affected">{finding.whyAffected}</Field>
        <Field label="Potential Business Impact">{finding.businessImpact}</Field>
        <Field label="Recommended Fix">{finding.recommendedFix}</Field>
      </div>

      {finding.references?.length > 0 && (
        <div className="pt-2 border-t border-[var(--border-soft)]">
          <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-1.5">
            References
          </h4>
          <ul className="space-y-1">
            {finding.references.map((ref) => (
              <li key={ref}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline break-all"
                >
                  <ExternalLink size={11} className="shrink-0" />
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
