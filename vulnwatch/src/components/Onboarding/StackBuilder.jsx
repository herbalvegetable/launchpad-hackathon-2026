import { useEffect, useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { searchVendorsProducts } from '../../utils/opencveApi';

function stackLabel(item) {
  return item.label || `${item.vendor} / ${item.product}`;
}

export default function StackBuilder({ stack, onAdd, onRemove }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let cancelled = false;
    searchVendorsProducts(query).then((results) => {
      if (!cancelled) setSuggestions(results);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div>
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter popular stacks (e.g. nginx, postgres, docker)..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
        />
      </div>

      <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
        {query.trim() ? 'Matching stacks' : 'Popular stacks'}
      </p>

      {suggestions.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4 max-h-48 overflow-y-auto">
          {suggestions.map((s) => {
            const already = stack.some((it) => it.vendor === s.vendor && it.product === s.product);
            return (
              <button
                key={`${s.vendor}-${s.product}`}
                onClick={() => !already && onAdd({ vendor: s.vendor, product: s.product, label: s.label })}
                disabled={already}
                title={`${s.vendor} / ${s.product}`}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  already
                    ? 'border-[var(--border)] text-[var(--text-faint)] cursor-default'
                    : 'border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/10'
                }`}
              >
                <Plus size={12} />
                {stackLabel(s)}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-[var(--text-muted)] mb-4">No stacks match that filter.</p>
      )}

      <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
        Your stack ({stack.length})
      </p>
      {stack.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">
          No products added yet. Pick from the popular stacks above to start receiving relevant CVE alerts.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={`${item.vendor}-${item.product}`}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[var(--bg-panel)] border border-[var(--border)]"
              title={`${item.vendor} / ${item.product}`}
            >
              {stackLabel(item)}
              <button
                onClick={() => onRemove(item)}
                aria-label={`Remove ${stackLabel(item)}`}
                className="text-[var(--text-faint)] hover:text-[var(--critical)]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
