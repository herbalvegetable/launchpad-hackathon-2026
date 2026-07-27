import { useEffect, useState } from 'react';
import { Search as SearchIcon, AlertTriangle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { searchCves, OpenCveError } from '../utils/opencveApi';
import { storage } from '../utils/storage';
import CVECard from '../components/CVECard';

const SEVERITY_OPTIONS = [
  { value: '', label: 'Any severity' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'none', label: 'None' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [cvss, setCvss] = useState('');
  const [vendor, setVendor] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const remediation = storage.getRemediation();

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchCves({ search: query, cvss, vendor, page });
        setResults(data.results || []);
        setPages(data.pages || 1);
      } catch (err) {
        setError(err instanceof OpenCveError ? err.message : 'Search failed.');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, cvss, vendor, page]);

  useEffect(() => {
    setPage(1);
  }, [query, cvss, vendor]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Search CVEs</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Look up any CVE, whether or not it belongs to your team's registered stack.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by CVE ID or keyword..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
          />
        </div>
        <select
          value={cvss}
          onChange={(e) => setCvss(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border)] text-sm outline-none focus:border-[var(--accent)]"
        >
          {SEVERITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <input
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          placeholder="Vendor (optional)"
          className="px-3 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border)] text-sm w-full sm:w-40 placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-8 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Searching...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-4 text-sm text-[var(--critical)] mb-4">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <p className="text-sm text-[var(--text-muted)] py-8 text-center">No CVEs match your search.</p>
      )}

      <div className="space-y-3">
        {results.map((cve) => (
          <CVECard key={cve.id} cve={cve} remediationStatus={remediation[cve.id]?.status} />
        ))}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 text-sm text-[var(--text-muted)] disabled:opacity-40 hover:text-[var(--text-primary)]"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="text-xs font-mono text-[var(--text-faint)]">
            Page {page} of {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="flex items-center gap-1 text-sm text-[var(--text-muted)] disabled:opacity-40 hover:text-[var(--text-primary)]"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
