const LIST_FIELDS = [
  ['languages', 'Languages'],
  ['frameworks', 'Frameworks'],
  ['infrastructure', 'Infrastructure'],
  ['databases', 'Databases'],
  ['cloudServices', 'Cloud Services'],
  ['authMechanisms', 'Auth Mechanisms'],
  ['apis', 'APIs'],
  ['containers', 'Containers'],
  ['buildSystems', 'Build Systems'],
];

function Chips({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-xs text-[var(--text-faint)]">None detected</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-muted)]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function InventoryPanel({ inventory }) {
  const dependencies = inventory?.dependencies || [];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 space-y-4">
      <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono">
        Detected inventory
      </h2>

      {inventory?.runtime && (
        <p className="text-sm">
          <span className="text-[var(--text-faint)]">Runtime: </span>
          <span className="font-mono">{inventory.runtime}</span>
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {LIST_FIELDS.map(([key, label]) => (
          <div key={key}>
            <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-faint)] font-mono mb-1.5">
              {label}
            </h3>
            <Chips items={inventory?.[key]} />
          </div>
        ))}
      </div>

      {dependencies.length > 0 && (
        <div>
          <h3 className="text-[11px] uppercase tracking-wider text-[var(--text-faint)] font-mono mb-2">
            Dependencies
          </h3>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-[var(--text-faint)] font-mono border-b border-[var(--border)]">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Version</th>
                  <th className="px-3 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {dependencies.map((dep, i) => (
                  <tr key={`${dep.name}-${i}`} className="border-b border-[var(--border-soft)] last:border-0">
                    <td className="px-3 py-2 font-mono">{dep.name}</td>
                    <td className="px-3 py-2 font-mono text-[var(--text-muted)]">{dep.version || 'UNKNOWN'}</td>
                    <td className="px-3 py-2 text-[var(--text-muted)]">{dep.type || 'unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
