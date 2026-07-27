import { useEffect, useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { searchVendorsProducts } from '../../utils/opencveApi';

export default function StackBuilder({ stack, onAdd, onRemove }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const results = await searchVendorsProducts(query.trim());
        setSuggestions(results.slice(0, 8));
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search vendors or products (e.g. nginx, postgresql)..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--bg-panel)] border border-[var(--border)] text-sm placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] outline-none"
        />
      </div>

      {loading && <p className="text-xs text-[var(--text-muted)] font-mono mb-2">Searching...</p>}

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s) => {
            const already = stack.some((it) => it.vendor === s.vendor && it.product === s.product);
            return (
              <button
                key={`${s.vendor}-${s.product}`}
                onClick={() => !already && onAdd(s)}
                disabled={already}
                className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                  already
                    ? 'border-[var(--border)] text-[var(--text-faint)] cursor-default'
                    : 'border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/10'
                }`}
              >
                <Plus size={12} />
                {s.vendor} / {s.product}
              </button>
            );
          })}
        </div>
      )}

      <p className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
        Your stack ({stack.length})
      </p>
      {stack.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">
          No products added yet. Search above to add vendors and products your team relies on.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={`${item.vendor}-${item.product}`}
              className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-[var(--bg-panel)] border border-[var(--border)]"
            >
              {item.vendor} / {item.product}
              <button
                onClick={() => onRemove(item)}
                aria-label={`Remove ${item.vendor} / ${item.product}`}
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
