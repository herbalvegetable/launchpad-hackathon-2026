import { useMemo, useState } from 'react';
import { UserPlus, Trash2, Search, Users, ChevronDown } from 'lucide-react';
import {
  getOrganization,
  getOrgTeams,
  addTeamMember,
  removeTeamMember,
  searchTeamMembers,
  getAssignedIssues,
} from '../utils/orgUtils';
import AssignedIssuesList from '../components/AssignedIssuesList';

export default function TeamPage() {
  const organization = getOrganization();
  const [teams, setTeams] = useState(() => getOrgTeams(organization.id));
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const issuesByMemberId = useMemo(() => {
    const entries = getAssignedIssues(organization.id);
    return new Map(entries.map((e) => [e.member.id, e.issues]));
  }, [organization.id, teams]);

  const [form, setForm] = useState({ name: '', email: '', role: '', teamId: teams[0]?.id || '' });

  function refresh() {
    setTeams(getOrgTeams(organization.id));
  }

  function handleAdd(e) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.teamId) {
      setError('Name, email, and team are required.');
      return;
    }

    try {
      addTeamMember(organization.id, form.teamId, {
        name: form.name,
        email: form.email,
        role: form.role,
      });
      setForm({ name: '', email: '', role: '', teamId: form.teamId });
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleRemove(teamId, memberId) {
    removeTeamMember(organization.id, teamId, memberId);
    refresh();
  }

  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    return searchTeamMembers(organization.id, query);
  }, [query, organization.id, teams]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold mb-1">Team members</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Manage who's on each team in {organization.name}.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3 flex items-center gap-1.5">
          <UserPlus size={13} /> Add a member
        </h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
          />
          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Role (optional)"
            className="px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
          />
          <div className="relative">
            <select
              value={form.teamId}
              onChange={(e) => setForm({ ...form, teamId: e.target.value })}
              className="w-full appearance-none px-3 py-2 pr-8 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)]"
            />
          </div>

          {error && <p className="sm:col-span-2 text-sm text-[var(--critical)]">{error}</p>}

          <button
            type="submit"
            className="sm:col-span-2 flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--accent)] text-[#0a0e17] hover:bg-[var(--accent-dim)] transition-colors"
          >
            <UserPlus size={15} />
            Add to team
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
        <h2 className="text-xs uppercase tracking-wider text-[var(--text-faint)] font-mono mb-3 flex items-center gap-1.5">
          <Search size={13} /> Search members
        </h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)] text-sm focus:border-[var(--accent)] outline-none mb-3"
        />
        {searchResults && (
          <div className="space-y-2">
            {searchResults.length === 0 && (
              <p className="text-sm text-[var(--text-muted)]">No members match "{query}".</p>
            )}
            {searchResults.map((m) => (
              <MemberRow key={m.id} member={m} issues={issuesByMemberId.get(m.id) || []} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.id} className="rounded-xl border border-[var(--border)] bg-[var(--bg-panel)] p-5">
            <h2 className="text-sm font-semibold mb-1 flex items-center gap-1.5">
              <Users size={14} className="text-[var(--accent)]" />
              {team.name}
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">{team.description}</p>
            <div className="space-y-2">
              {team.members.map((m) => (
                <MemberRow
                  key={m.id}
                  member={m}
                  issues={issuesByMemberId.get(m.id) || []}
                  onRemove={() => handleRemove(team.id, m.id)}
                />
              ))}
              {team.members.length === 0 && (
                <p className="text-sm text-[var(--text-muted)]">No members yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberRow({ member, issues = [], onRemove }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg bg-[var(--bg-panel-raised)] border border-[var(--border)]">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{member.name}</p>
          <p className="text-xs text-[var(--text-muted)] truncate">
            {member.email} &middot; {member.role}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {issues.length > 0 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)] transition-colors"
            >
              {issues.length} assigned
              <ChevronDown size={12} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-1.5 rounded-lg text-[var(--text-faint)] hover:text-[var(--critical)] hover:bg-[var(--critical)]/10 transition-colors"
              aria-label={`Remove ${member.name}`}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
      {expanded && issues.length > 0 && (
        <div className="px-3 pb-3">
          <AssignedIssuesList issues={issues} />
        </div>
      )}
    </div>
  );
}
