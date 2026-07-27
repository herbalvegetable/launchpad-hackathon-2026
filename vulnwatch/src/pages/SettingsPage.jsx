import { useState } from 'react';
import { Trash2, Save, Check } from 'lucide-react';
import { useTeamProfile } from '../context/TeamProfileContext';
import StackBuilder from '../components/Onboarding/StackBuilder';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export default function SettingsPage() {
  const { team, saveTeam, addStackItem, removeStackItem, resetTeam } = useTeamProfile();
  const [name, setName] = useState(team?.name || '');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveTeam({ name: name.trim() || 'My team' });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-1">Settings</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Manage your team profile and the stack VulnWatch monitors.
          {DEMO_MODE && ' Running in demo mode - live OpenCVE and Claude API calls are disabled.'}
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <label className="block text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
          Team name
        </label>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
          />
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)] text-[#0a0e17] hover:bg-[var(--accent-dim)] transition-colors"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3">
          Tech stack
        </h2>
        <StackBuilder stack={team?.stack || []} onAdd={addStackItem} onRemove={removeStackItem} />
      </div>

      <div className="rounded-xl border border-[var(--critical)]/30 bg-[var(--critical-bg)] p-5">
        <h2 className="text-xs uppercase tracking-wider text-[var(--critical)] font-mono mb-2">
          Danger zone
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-3">
          Resetting clears your team profile and restarts onboarding. Cached CVE data and remediation
          status are kept.
        </p>
        <button
          onClick={resetTeam}
          className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border border-[var(--critical)]/50 text-[var(--critical)] hover:bg-[var(--critical)]/10 transition-colors"
        >
          <Trash2 size={15} />
          Reset team profile
        </button>
      </div>
    </div>
  );
}
