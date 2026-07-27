import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { getCveDetail, OpenCveError } from '../utils/opencveApi';
import { storage } from '../utils/storage';
import SeverityBadge from '../components/SeverityBadge';
import OverviewTab from '../components/CVEDetail/OverviewTab';
import ExploitTab from '../components/CVEDetail/ExploitTab';
import PlainEnglishTab from '../components/CVEDetail/PlainEnglishTab';
import RemediationTab from '../components/CVEDetail/RemediationTab';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'exploit', label: 'Exploit Flowchart' },
  { id: 'plain', label: 'Plain English' },
  { id: 'remediation', label: 'Remediation' },
];

export default function CVEDetailPage() {
  const { cveId } = useParams();
  const [cve, setCve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setTab('overview');

    getCveDetail(cveId)
      .then((data) => {
        if (cancelled) return;
        const cached = storage.getCachedCve(cveId) || {};
        setCve({ ...data, _cached: cached });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof OpenCveError ? err.message : `Could not load ${cveId}.`);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cveId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-16 justify-center">
        <Loader2 size={16} className="animate-spin" />
        Loading {cveId}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-4 text-sm text-[var(--critical)]">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] mt-4 hover:text-[var(--text-primary)]">
          <ArrowLeft size={14} /> Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-4 hover:text-[var(--text-primary)]">
        <ArrowLeft size={14} /> Back to feed
      </Link>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="font-mono text-xl text-[var(--accent)]">{cve.id}</h1>
        <SeverityBadge severity={cve.severity} />
      </div>

      <div className="flex gap-1 border-b border-[var(--border)] mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && <OverviewTab cve={cve} />}
      {tab === 'exploit' && <ExploitTab cve={cve} />}
      {tab === 'plain' && <PlainEnglishTab cve={cve} />}
      {tab === 'remediation' && (
        <RemediationTab
          cve={cve}
          explanation={
            storage.getCachedCve(cve.id)?.aiExplanation ||
            storage.getCachedCve(cve.id)?.claudeExplanation
          }
        />
      )}
    </div>
  );
}
