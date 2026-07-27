import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import CvssGauge from '../CvssGauge';
import { explainCVE, AgnesApiError } from '../../utils/agnesApi';
import { storage } from '../../utils/storage';

export default function OverviewTab({ cve }) {
  const [explanation, setExplanation] = useState(
    cve._cached?.aiExplanation || cve._cached?.claudeExplanation || null,
  );
  const [loading, setLoading] = useState(!explanation);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (explanation) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    explainCVE(cve)
      .then((result) => {
        if (cancelled) return;
        setExplanation(result);
        storage.setCachedCve(cve.id, { ...cve._cached, id: cve.id, aiExplanation: result });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof AgnesApiError ? err.message : 'Could not generate an explanation.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cve]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6 rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
            Summary
          </h3>
          <p className="text-sm leading-relaxed">{cve.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {cve.cwes?.map((cwe) => (
              <span
                key={cwe}
                className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]"
              >
                {cwe}
              </span>
            ))}
          </div>

          <div className="mt-4 text-xs text-[var(--text-muted)] space-y-1 font-mono">
            <p>Published: {cve.published?.slice(0, 10)}</p>
            <p>Updated: {cve.updated?.slice(0, 10)}</p>
          </div>

          <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mt-4 mb-1">
            Affected versions
          </h4>
          <ul className="text-sm text-[var(--text-muted)] list-disc list-inside space-y-0.5">
            {cve.affectedVersions?.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <CvssGauge label="CVSS v3" score={cve.cvss?.v3 || 0} />
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
          Plain-language breakdown
        </h3>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Loader2 size={16} className="animate-spin" />
            Generating explanation...
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-3 text-sm text-[var(--critical)]">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {explanation && !loading && (
          <div className="space-y-4">
            <p className="text-base font-medium">{explanation.oneLiner}</p>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-1">
                What an attacker could do
              </h4>
              <p className="text-sm text-[var(--text-muted)]">{explanation.attackerCapability}</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-1">
                Why it's rated this way
              </h4>
              <p className="text-sm text-[var(--text-muted)]">{explanation.severityExplanation}</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
                Patch checklist
              </h4>
              <ul className="space-y-1.5">
                {explanation.patchSteps?.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
