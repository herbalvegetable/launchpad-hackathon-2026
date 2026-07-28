import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SEVERITY_STYLES } from '../SeverityBadge';

const RISK_STYLE_KEY = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  MINIMAL: 'NONE',
};

function StatTile({ label, value, color }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel-raised)] p-4">
      <p className="text-2xl font-display font-semibold" style={color ? { color } : undefined}>
        {value}
      </p>
      <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mt-1">{label}</p>
    </div>
  );
}

export default function AnalysisSummaryPanel({
  confirmedCount,
  likelyCount,
  possibleCount,
  highestSeverityCve,
  overallRiskRating,
  recommendedImmediateActions,
}) {
  const riskStyle = SEVERITY_STYLES[RISK_STYLE_KEY[overallRiskRating]] || SEVERITY_STYLES.NONE;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Confirmed" value={confirmedCount} color="var(--critical)" />
        <StatTile label="Likely" value={likelyCount} color="var(--high)" />
        <StatTile label="Possible" value={possibleCount} color="var(--medium)" />
        <StatTile
          label="Overall Risk"
          value={overallRiskRating || 'MINIMAL'}
          color={riskStyle.color}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2 flex items-center gap-1.5">
            <ShieldAlert size={13} /> Highest severity finding
          </h3>
          <p className="text-sm font-mono text-[var(--accent)]">{highestSeverityCve || 'None found'}</p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
            Recommended immediate actions
          </h3>
          {recommendedImmediateActions?.length > 0 ? (
            <ul className="space-y-1.5">
              {recommendedImmediateActions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle2 size={14} className="text-[var(--accent)] shrink-0 mt-0.5" />
                  {action}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">No immediate actions recommended.</p>
          )}
        </div>
      </div>
    </div>
  );
}
