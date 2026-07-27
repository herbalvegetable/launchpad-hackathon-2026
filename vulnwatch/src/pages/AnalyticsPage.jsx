import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Loader2, TrendingUp } from 'lucide-react';
import { useTeamProfile } from '../context/TeamProfileContext';
import { getCvesForStack, OpenCveError } from '../utils/opencveApi';
import { demoDailyCounts } from '../data/demoCves';
import { storage } from '../utils/storage';
import { SeverityBarChart, CvesPerDayChart, RemediationPieChart } from '../components/Dashboard/SeverityCharts';
import SeverityBadge from '../components/SeverityBadge';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export default function AnalyticsPage() {
  const { team } = useTeamProfile();
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const remediation = storage.getRemediation();
  const stack = team?.stack || [];

  useEffect(() => {
    let cancelled = false;
    if (!stack.length) {
      setLoading(false);
      return;
    }
    getCvesForStack(stack)
      .then((results) => {
        if (!cancelled) setCves(results);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof OpenCveError ? err.message : 'Could not load analytics data.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [stack]);

  const statusCounts = useMemo(() => {
    const counts = { unreviewed: 0, under_analysis: 0, risk_accepted: 0, patched: 0 };
    cves.forEach((c) => {
      const status = remediation[c.id]?.status || 'unreviewed';
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  }, [cves, remediation]);

  const topCritical = useMemo(() => {
    return cves
      .filter((c) => (remediation[c.id]?.status || 'unreviewed') !== 'patched')
      .sort((a, b) => (b.cvss?.v3 || 0) - (a.cvss?.v3 || 0))
      .slice(0, 5);
  }, [cves, remediation]);

  const dailyCounts = DEMO_MODE ? demoDailyCounts() : [];

  if (!stack.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <TrendingUp size={32} className="mx-auto text-[var(--text-faint)] mb-4" />
        <h2 className="font-display text-xl font-semibold mb-2">No data yet</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Register your stack in Settings to see severity trends and remediation progress.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-16 justify-center">
        <Loader2 size={16} className="animate-spin" />
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl font-semibold mb-6">Severity Dashboard</h1>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-4 text-sm text-[var(--critical)] mb-6">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
            CVE count by severity
          </h2>
          <SeverityBarChart cves={cves} />
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
            CVEs published per day (30 days)
          </h2>
          <CvesPerDayChart dailyCounts={dailyCounts} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
            Top 5 open critical CVEs
          </h2>
          {topCritical.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">Nothing outstanding — great work.</p>
          ) : (
            <ol className="space-y-2">
              {topCritical.map((c, i) => (
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[var(--text-faint)]">{i + 1}.</span>
                    <span className="font-mono text-[var(--accent)]">{c.id}</span>
                  </span>
                  <SeverityBadge severity={c.severity} size="sm" />
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
          <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
            Remediation progress
          </h2>
          <RemediationPieChart statusCounts={statusCounts} />
        </div>
      </div>
    </div>
  );
}
