import { useEffect, useMemo, useRef, useState } from 'react';
import { ScanSearch, Loader2, AlertTriangle, Search, Download, FileDown, Trash2 } from 'lucide-react';
import { analyzeCodebaseForCves, AgnesApiError, MAX_CODEBASE_INPUT_LENGTH } from '../utils/agnesApi';
import { storage } from '../utils/storage';
import { exportFindingsToCsv, triggerPrintExport } from '../utils/exportUtils';
import { Pill } from '../components/Dashboard/FeedFilters';
import AnalysisSummaryPanel from '../components/CodebaseAnalysis/AnalysisSummaryPanel';
import InventoryPanel from '../components/CodebaseAnalysis/InventoryPanel';
import FindingCard from '../components/CodebaseAnalysis/FindingCard';

const SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'NONE'];
const SEVERITY_RANK = { CRITICAL: 5, HIGH: 4, MEDIUM: 3, LOW: 2, NONE: 1 };
const CONFIDENCE_RANK = { CONFIRMED: 3, LIKELY: 2, POSSIBLE: 1 };

const PROGRESS_STEPS = [
  'Building component inventory...',
  'Matching against known CVEs...',
  'Validating evidence and confidence...',
];

const SORT_OPTIONS = [
  { value: 'severity', label: 'Severity' },
  { value: 'cvss', label: 'CVSS score' },
  { value: 'confidence', label: 'Confidence' },
];

const PLACEHOLDER = `Paste anything that describes your codebase - package.json,
package-lock.json, requirements.txt, pom.xml, build.gradle, Dockerfile,
docker-compose.yml, Kubernetes manifests, source code, architecture notes,
runtime/framework versions, etc.`;

export default function CodebaseAnalysisPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressStep, setProgressStep] = useState(0);
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState(null);
  const [sortBy, setSortBy] = useState('severity');
  const progressTimer = useRef(null);

  useEffect(() => {
    const saved = storage.getCodebaseAnalysis();
    if (saved) {
      setInput(saved.input || '');
      setResult(saved.result || null);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      clearInterval(progressTimer.current);
      return;
    }
    setProgressStep(0);
    progressTimer.current = setInterval(() => {
      setProgressStep((s) => (s + 1) % PROGRESS_STEPS.length);
    }, 1500);
    return () => clearInterval(progressTimer.current);
  }, [loading]);

  async function handleAnalyze() {
    setError(null);
    setLoading(true);
    try {
      const analysis = await analyzeCodebaseForCves(input);
      setResult(analysis);
      storage.setCodebaseAnalysis({ input, result: analysis, updatedAt: new Date().toISOString() });
    } catch (err) {
      setError(err instanceof AgnesApiError ? err.message : 'Could not analyse the codebase. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setInput('');
    setResult(null);
    setError(null);
    storage.clearCodebaseAnalysis();
  }

  const findings = result?.findings || [];

  const counts = useMemo(() => {
    const c = { CONFIRMED: 0, LIKELY: 0, POSSIBLE: 0 };
    findings.forEach((f) => {
      if (c[f.confidence] !== undefined) c[f.confidence] += 1;
    });
    return c;
  }, [findings]);

  const highestSeverityCve = useMemo(() => {
    if (findings.length === 0) return null;
    const sorted = [...findings].sort((a, b) => {
      const rank = (SEVERITY_RANK[b.severity] || 0) - (SEVERITY_RANK[a.severity] || 0);
      if (rank !== 0) return rank;
      return (b.cvssScore || 0) - (a.cvssScore || 0);
    });
    return sorted[0].cveId;
  }, [findings]);

  const visibleFindings = useMemo(() => {
    let list = findings;
    if (severityFilter) list = list.filter((f) => f.severity === severityFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (f) =>
          f.cveId?.toLowerCase().includes(q) ||
          f.affectedComponent?.toLowerCase().includes(q) ||
          f.evidenceFound?.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'cvss') return (b.cvssScore || 0) - (a.cvssScore || 0);
      if (sortBy === 'confidence') return (CONFIDENCE_RANK[b.confidence] || 0) - (CONFIDENCE_RANK[a.confidence] || 0);
      return (SEVERITY_RANK[b.severity] || 0) - (SEVERITY_RANK[a.severity] || 0);
    });
  }, [findings, severityFilter, query, sortBy]);

  const charCount = input.length;
  const overLimit = charCount > MAX_CODEBASE_INPUT_LENGTH;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2">
          <ScanSearch size={22} className="text-[var(--accent)]" />
          Codebase CVE Analysis
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Paste your codebase, manifests, or architecture notes. Agnes AI builds an inventory of what
          you actually run, then reports only the CVEs it finds real evidence for.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 space-y-3 no-print">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={12}
          className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm font-mono placeholder:text-[var(--text-faint)] placeholder:font-sans focus:border-[var(--accent)] outline-none resize-y"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`text-xs font-mono ${overLimit ? 'text-[var(--critical)]' : 'text-[var(--text-faint)]'}`}>
            {charCount.toLocaleString()} / {MAX_CODEBASE_INPUT_LENGTH.toLocaleString()} characters
          </p>
          <div className="flex items-center gap-2">
            {(input || result) && (
              <button
                onClick={handleClear}
                disabled={loading}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors disabled:opacity-50"
              >
                <Trash2 size={14} />
                Clear
              </button>
            )}
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim() || overLimit}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)] text-[#0a0e17] hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <ScanSearch size={15} />}
              {loading ? 'Analysing...' : 'Analyse Codebase'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono">
            <Loader2 size={14} className="animate-spin text-[var(--accent)]" />
            {PROGRESS_STEPS[progressStep]}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-3 text-sm text-[var(--critical)]">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}
      </div>

      {!result && !loading && (
        <div className="text-center py-12">
          <ScanSearch size={32} className="mx-auto text-[var(--text-faint)] mb-4" />
          <h2 className="font-display text-lg font-semibold mb-1">No analysis yet</h2>
          <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
            Paste evidence about your application above and click "Analyse Codebase" to see which
            known CVEs actually apply to it.
          </p>
        </div>
      )}

      {result && (
        <div data-print-area className="space-y-6">
          <AnalysisSummaryPanel
            confirmedCount={counts.CONFIRMED}
            likelyCount={counts.LIKELY}
            possibleCount={counts.POSSIBLE}
            highestSeverityCve={highestSeverityCve}
            overallRiskRating={result.overallRiskRating}
            recommendedImmediateActions={result.recommendedImmediateActions}
          />

          <InventoryPanel inventory={result.inventory} />

          <div className="flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mr-1">
                Severity
              </span>
              <Pill active={!severityFilter} onClick={() => setSeverityFilter(null)}>
                All
              </Pill>
              {SEVERITIES.map((s) => (
                <Pill
                  key={s}
                  active={severityFilter === s}
                  onClick={() => setSeverityFilter(severityFilter === s ? null : s)}
                >
                  {s}
                </Pill>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => exportFindingsToCsv(visibleFindings)}
                disabled={visibleFindings.length === 0}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors disabled:opacity-50"
              >
                <Download size={13} />
                Export CSV
              </button>
              <button
                onClick={triggerPrintExport}
                disabled={visibleFindings.length === 0}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors disabled:opacity-50"
              >
                <FileDown size={13} />
                Export PDF
              </button>
            </div>
          </div>

          <div className="relative no-print">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by CVE ID, component, or evidence..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 no-print">
            <span className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono">
              Sort by
            </span>
            {SORT_OPTIONS.map((opt) => (
              <Pill key={opt.value} active={sortBy === opt.value} onClick={() => setSortBy(opt.value)}>
                {opt.label}
              </Pill>
            ))}
          </div>

          <div className="space-y-4">
            {visibleFindings.length === 0 ? (
              <div className="text-center py-10 rounded-xl border border-[var(--border)] bg-[var(--bg-panel)]">
                <p className="text-sm text-[var(--text-muted)]">
                  {findings.length === 0
                    ? 'No applicable CVEs found in the supplied evidence.'
                    : 'No findings match the current search/filter.'}
                </p>
              </div>
            ) : (
              visibleFindings.map((finding) => <FindingCard key={finding.cveId} finding={finding} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
