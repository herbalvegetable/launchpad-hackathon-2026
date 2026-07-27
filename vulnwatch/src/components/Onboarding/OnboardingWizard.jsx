import { useState } from 'react';
import { ShieldHalf, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import StackBuilder from './StackBuilder';
import { useTeamProfile } from '../../context/TeamProfileContext';

const STEPS = ['Team name', 'Build your stack', 'Confirm'];

export default function OnboardingWizard({ onComplete }) {
  const { saveTeam, addStackItem, removeStackItem, team } = useTeamProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(team?.name || '');
  const stack = team?.stack || [];

  function next() {
    if (step === 0) {
      saveTeam({ name: name.trim() || 'My team' });
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  function finish() {
    saveTeam({ name: name.trim() || 'My team', stack });
    onComplete();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--bg-panel)] p-8 relative overflow-hidden">
        <div className="scan-line" />
        <div className="flex items-center gap-2 mb-6">
          <ShieldHalf size={24} className="text-[var(--accent)]" />
          <h1 className="font-display text-xl font-semibold">Set up VulnWatch</h1>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-mono border ${
                  i <= step
                    ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10'
                    : 'border-[var(--border)] text-[var(--text-faint)]'
                }`}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 ${i < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <label className="block text-sm text-[var(--text-muted)] mb-2">
              What should we call your team?
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Platform Engineering"
              className="w-full px-3 py-2.5 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
              autoFocus
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Add the vendors and products your team runs in production. VulnWatch will scope alerts to these.
            </p>
            <StackBuilder stack={stack} onAdd={addStackItem} onRemove={removeStackItem} />
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              <span className="text-[var(--text-primary)] font-medium">{name || 'My team'}</span> is
              tracking {stack.length} product{stack.length === 1 ? '' : 's'}. You can edit this anytime
              from Settings.
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={`${item.vendor}-${item.product}`}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-[var(--bg-panel-raised)] border border-[var(--border)]"
                >
                  {item.vendor} / {item.product}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] disabled:opacity-0 hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={15} /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)] text-[#0a0e17] hover:bg-[var(--accent-dim)] transition-colors"
            >
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={finish}
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)] text-[#0a0e17] hover:bg-[var(--accent-dim)] transition-colors"
            >
              Go to dashboard <ArrowRight size={15} />
            </button>
          )}
        </div>

        <button
          onClick={finish}
          className="w-full text-center mt-4 text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)]"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
