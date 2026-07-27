import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { storage } from '../../utils/storage';

const STATUS_OPTIONS = [
  { value: 'unreviewed', label: 'Unreviewed' },
  { value: 'under_analysis', label: 'Under analysis' },
  { value: 'risk_accepted', label: 'Risk accepted' },
  { value: 'patched', label: 'Patched' },
];

export default function RemediationTab({ cve, explanation }) {
  const [record, setRecord] = useState(() => storage.getRemediationFor(cve.id));
  const [notesDraft, setNotesDraft] = useState(record.notes);

  function updateStatus(status) {
    const updated = storage.setRemediationFor(cve.id, { status });
    setRecord(updated);
  }

  function updateAssignee(assignedTo) {
    const updated = storage.setRemediationFor(cve.id, { assignedTo });
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
            <input
              value={record.assignedTo}
              onChange={(e) => updateAssignee(e.target.value)}
              placeholder="Team member name"
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
            />
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
