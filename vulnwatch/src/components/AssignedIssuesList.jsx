import { Link } from 'react-router-dom';
import SeverityBadge from './SeverityBadge';
import RemediationBadge from './RemediationBadge';

export default function AssignedIssuesList({ issues, emptyLabel = 'No issues assigned.' }) {
  if (!issues || issues.length === 0) {
    return <p className="text-xs text-[var(--text-faint)]">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-1.5">
      {issues.map((issue) => (
        <li key={issue.cveId}>
          <Link
            to={`/cve/${issue.cveId}`}
            className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-panel-raised)] hover:border-[var(--accent)] transition-colors text-sm"
          >
            <span className="font-mono text-[var(--accent)] truncate">{issue.cveId}</span>
            <span className="flex items-center gap-1.5 shrink-0">
              {issue.severity && <SeverityBadge severity={issue.severity} size="sm" />}
              <RemediationBadge status={issue.status} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
