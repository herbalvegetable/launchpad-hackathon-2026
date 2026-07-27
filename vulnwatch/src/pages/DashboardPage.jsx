import { useEffect, useMemo, useState, useCallback } from 'react';
import { AlertTriangle, Loader2, RadioTower } from 'lucide-react';
import { useTeamProfile } from '../context/TeamProfileContext';
import { getCvesForStack, OpenCveError } from '../utils/opencveApi';
import { storage } from '../utils/storage';
import CVECard from '../components/CVECard';
import FeedFilters from '../components/Dashboard/FeedFilters';

const POLL_INTERVAL_MS = 5 * 60 * 1000;

export default function DashboardPage() {
  const { team } = useTeamProfile();
  const [cves, setCves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ severity: null, vendor: null, status: null });
  const [lastVisit] = useState(() => storage.getLastVisit());
  const remediation = storage.getRemediation();

  const stack = team?.stack || [];

  const load = useCallback(async () => {
    if (!stack.length) {
      setCves([]);
      setLoading(false);
      return;
    }
    setError(null);
    try {
      const results = await getCvesForStack(stack);
      setCves(results);
    } catch (err) {
      setError(err instanceof OpenCveError ? err.message : 'Could not load the CVE feed.');
    } finally {
      setLoading(false);
    }
  }, [stack]);

  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  useEffect(() => {
    storage.setLastVisit(new Date().toISOString());
  }, []);

  const vendorList = useMemo(
    () => Array.from(new Set(stack.map((s) => s.vendor))),
    [stack]
  );

  const filtered = useMemo(() => {
    return cves
      .filter((c) => !filters.severity || c.severity === filters.severity)
      .filter((c) => !filters.vendor || Object.keys(c.vendors).includes(filters.vendor))
      .filter((c) => !filters.status || (remediation[c.id]?.status || 'unreviewed') === filters.status)
      .sort((a, b) => (b.cvss?.v3 || 0) - (a.cvss?.v3 || 0));
  }, [cves, filters, remediation]);

  if (!stack.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <RadioTower size={32} className="mx-auto text-[var(--text-faint)] mb-4" />
        <h2 className="font-display text-xl font-semibold mb-2">No stack registered yet</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Add vendors and products in Settings to start receiving CVE alerts scoped to your team.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">CVE Feed</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Scoped to {stack.length} product{stack.length === 1 ? '' : 's'} in {team.name}'s stack.
          </p>
        </div>
      </div>

      <FeedFilters vendors={vendorList} filters={filters} onChange={setFilters} />

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-12 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Loading CVE feed...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-4 text-sm text-[var(--critical)] mb-4">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-sm text-[var(--text-muted)] py-8 text-center">
          No CVEs match the current filters.
        </p>
      )}

      <div className="space-y-3">
        {filtered.map((cve) => (
          <CVECard
            key={cve.id}
            cve={cve}
            remediationStatus={remediation[cve.id]?.status}
            isNew={lastVisit ? new Date(cve.published) > new Date(lastVisit) : false}
          />
        ))}
      </div>
    </div>
  );
}
