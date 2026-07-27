import { NavLink } from 'react-router-dom';
import { ShieldHalf, LayoutGrid, Search, BarChart3, Settings } from 'lucide-react';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const links = [
  { to: '/', label: 'Feed', icon: LayoutGrid, end: true },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg-base)]/95 backdrop-blur">
      <div className="relative overflow-hidden">
        <div className="scan-line" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <ShieldHalf size={22} className="text-[var(--accent)]" />
            <span className="font-display font-semibold text-lg tracking-tight">VulnWatch</span>
            {DEMO_MODE && (
              <span className="ml-2 text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-[var(--medium)]/50 text-[var(--medium)] bg-[var(--medium-bg)]">
                Demo Mode
              </span>
            )}
          </NavLink>

          <nav className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]'
                  }`
                }
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
