import { useEffect, useState } from 'react';
import { AlertTriangle, Copy, Check, Loader2 } from 'lucide-react';
import { generateAnalogy, ClaudeApiError } from '../../utils/claudeApi';
import { storage } from '../../utils/storage';

export default function PlainEnglishTab({ cve }) {
  const [analogy, setAnalogy] = useState(cve._cached?.claudeAnalogy || null);
  const [loading, setLoading] = useState(!analogy);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (analogy) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    generateAnalogy(cve)
      .then((result) => {
        if (cancelled) return;
        setAnalogy(result);
        storage.setCachedCve(cve.id, { ...cve._cached, id: cve.id, claudeAnalogy: result });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ClaudeApiError ? err.message : 'Could not generate an analogy.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cve]);

  async function copyToClipboard() {
    if (!analogy) return;
    try {
      await navigator.clipboard.writeText(analogy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy to clipboard. Select and copy the text manually.');
    }
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-6 sm:p-8">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-6 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Writing a plain-English explanation...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-3 text-sm text-[var(--critical)] mb-4">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {analogy && !loading && (
        <>
          <p className="text-lg sm:text-xl leading-relaxed text-[var(--text-primary)] max-w-2xl">
            {analogy}
          </p>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-colors mt-6"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Copied' : 'Copy explanation'}
          </button>
        </>
      )}
    </div>
  );
}
