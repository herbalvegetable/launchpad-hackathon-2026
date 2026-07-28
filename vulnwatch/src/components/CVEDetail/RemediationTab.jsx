import { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getOrganization, getAllMembers } from '../../utils/orgUtils';

const STATUS_OPTIONS = [
  { value: 'unreviewed', label: 'Unreviewed' },
  { value: 'under_analysis', label: 'Under analysis' },
  { value: 'risk_accepted', label: 'Risk accepted' },
  { value: 'patched', label: 'Patched' },
];

export default function RemediationTab({ cve, explanation }) {
  const [record, setRecord] = useState(() => storage.getRemediationFor(cve.id));
  const [notesDraft, setNotesDraft] = useState(record.notes);
  const [members] = useState(() => getAllMembers(getOrganization().id));

  // Snapshot the CVE's severity/summary onto the remediation record itself,
  // so the Team/Analytics pages can list a member's assigned issues without
  // needing to re-fetch or already have this CVE in the team's live stack.
  function snapshot() {
    return { severity: cve.severity, cvssScore: cve.cvss?.v3 ?? null, summary: cve.summary || '' };
  }

  function updateStatus(status) {
    const updated = storage.setRemediationFor(cve.id, { ...snapshot(), status });
    setRecord(updated);
  }

  function updateAssignee(assignedTo) {
    // Assigning someone is an implicit acknowledgement - move an untouched
    // CVE out of "unreviewed" so the assignment actually shows up in the
    // analytics dashboard's remediation-progress breakdown.
    const patch = { ...snapshot(), assignedTo };
    if (assignedTo && record.status === 'unreviewed') {
      patch.status = 'under_analysis';
    }
    const updated = storage.setRemediationFor(cve.id, patch);
    setRecord(updated);
  }

  function saveNotes() {
    const updated = storage.setRemediationFor(cve.id, { notes: notesDraft });
    setRecord(updated);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
            Status
          </label>
          <div className="flex flex-col gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateStatus(opt.value)}
                className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                  record.status === opt.value
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
              Assigned to
            </label>
            <div className="relative">
              <select
                value={record.assignedTo}
                onChange={(e) => updateAssignee(e.target.value)}
                disabled={members.length === 0}
                className="w-full appearance-none px-3 py-2 pr-8 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">Unassigned</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                    {m.teamName ? ` — ${m.teamName}` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
              />
            </div>
            {members.length === 0 && (
              <p className="mt-1.5 text-xs text-[var(--text-faint)]">
                No team members yet — add some on the Team page.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
              Notes
            </label>
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              onBlur={saveNotes}
              rows={4}
              placeholder="Internal notes on remediation progress..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none resize-none"
            />
          </div>

          {record.updatedAt && (
            <p className="text-xs text-[var(--text-faint)] font-mono">
              Last updated {new Date(record.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {explanation?.patchSteps?.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
          <h3 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
            Patch checklist
          </h3>
          <ul className="space-y-1.5">
            {explanation.patchSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={15} className="text-[var(--accent)] shrink-0 mt-0.5" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
