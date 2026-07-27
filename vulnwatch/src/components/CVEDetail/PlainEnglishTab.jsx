import { useEffect, useState } from 'react';
import { AlertTriangle, Copy, Check, Loader2, Film } from 'lucide-react';
import { generateAnalogy, generateExplanationVideo, AgnesApiError } from '../../utils/agnesApi';
import { storage } from '../../utils/storage';

export default function PlainEnglishTab({ cve }) {
  const [analogy, setAnalogy] = useState(
    cve._cached?.aiAnalogy || cve._cached?.claudeAnalogy || null,
  );
  const [loading, setLoading] = useState(!analogy);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const [videoUrl, setVideoUrl] = useState(cve._cached?.aiVideoUrl || null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoProgress, setVideoProgress] = useState({ status: null, progress: 0 });
  const [videoError, setVideoError] = useState(null);

  useEffect(() => {
    if (analogy) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    generateAnalogy(cve)
      .then((result) => {
        if (cancelled) return;
        setAnalogy(result);
        storage.setCachedCve(cve.id, { ...cve._cached, id: cve.id, aiAnalogy: result });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof AgnesApiError ? err.message : 'Could not generate an analogy.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cve]);

  useEffect(() => {
    if (!analogy || videoUrl) return;

    const controller = new AbortController();
    setVideoLoading(true);
    setVideoError(null);
    setVideoProgress({ status: 'queued', progress: 0 });

    generateExplanationVideo(analogy, {
      signal: controller.signal,
      onProgress: (p) => {
        if (!controller.signal.aborted) setVideoProgress(p);
      },
    })
      .then((result) => {
        if (controller.signal.aborted) return;
        setVideoUrl(result.url);
        storage.setCachedCve(cve.id, {
          ...storage.getCachedCve(cve.id),
          id: cve.id,
          aiAnalogy: analogy,
          aiVideoUrl: result.url,
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setVideoError(
          err instanceof AgnesApiError ? err.message : 'Could not generate the explanation video.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setVideoLoading(false);
      });

    return () => controller.abort();
  }, [analogy, videoUrl, cve.id]);

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

  function progressLabel() {
    const { status, progress } = videoProgress;
    if (status === 'queued') return 'Queued with Agnes AI...';
    if (status === 'in_progress') return `Generating video… ${progress || 0}%`;
    if (status === 'completed') return 'Finalizing video...';
    return 'Starting video generation...';
  }

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-6 sm:p-8 space-y-6">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono py-6 justify-center">
          <Loader2 size={16} className="animate-spin" />
          Writing a plain-English explanation...
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-3 text-sm text-[var(--critical)]">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {analogy && !loading && (
        <>
          <div>
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
          </div>

          <div className="border-t border-[var(--border)] pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Film size={16} className="text-[var(--accent)]" />
              <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono">
                Video explanation
              </h3>
            </div>

            {videoLoading && (
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-panel-raised)] p-5">
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-mono mb-3">
                  <Loader2 size={16} className="animate-spin shrink-0" />
                  {progressLabel()}
                </div>
                <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                    style={{ width: `${Math.max(4, videoProgress.progress || 0)}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text-faint)] mt-3">
                  This usually takes under a minute. The video is generated from the explanation above.
                </p>
              </div>
            )}

            {videoError && (
              <div className="flex items-start gap-2 rounded-lg border border-[var(--critical)]/40 bg-[var(--critical-bg)] p-3 text-sm text-[var(--critical)]">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                {videoError}
              </div>
            )}

            {videoUrl && !videoLoading && (
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                playsInline
                className="w-full max-w-2xl rounded-lg border border-[var(--border)] bg-black aspect-video"
              >
                Your browser does not support embedded video.
              </video>
            )}
          </div>
        </>
      )}
    </div>
  );
}
