// Mock organization/team/member/CVE-assignment logic for the demo.
// No backend - state is seeded from orgData.json once, then persisted
// through storage.js (localStorage) so assignments survive a page refresh,
// same pattern as remediation status elsewhere in the app.

import seedOrgData from '../data/orgData.json';
import { storage } from './storage';

// Bump whenever orgData.json's seed content changes shape (e.g. removing
// the old placeholder members) so browsers with a stale cached org state
// get migrated to the new seed instead of hanging on to old demo data.
const SEED_VERSION = 2;

/**
 * Returns the current org state, seeding localStorage from orgData.json
 * on first call (or reseeding if the cached state predates SEED_VERSION).
 * Always returns a fresh object (never seed data by reference) so callers
 * can't accidentally mutate the fallback.
 */
function getState() {
  const existing = storage.getOrgState(null);
  if (existing && existing.__seedVersion === SEED_VERSION) return existing;

  const seeded = { ...structuredClone(seedOrgData), __seedVersion: SEED_VERSION };
  storage.setOrgState(seeded);
  return seeded;
}

/** Wipes any saved edits and reseeds from orgData.json. */
export function resetOrgState() {
  storage.clearOrgState();
  return getState();
}

export function getOrganization() {
  return getState().organization;
}

/** All teams for an org, each with its members resolved inline. */
export function getOrgTeams(orgId) {
  const state = getState();
  return state.teams
    .filter((t) => t.orgId === orgId)
    .map((t) => ({ ...t, members: getTeamMembers(orgId, t.id) }));
}

/** Members of a given team, scoped to an org so ids can't cross-leak. */
export function getTeamMembers(orgId, teamId) {
  const state = getState();
  const team = state.teams.find((t) => t.id === teamId && t.orgId === orgId);
  if (!team) return [];
  return state.members.filter((m) => team.memberIds.includes(m.id));
}

export function getMemberById(memberId) {
  return getState().members.find((m) => m.id === memberId) || null;
}

/** All members across every team in an org, each tagged with its team name. */
export function getAllMembers(orgId) {
  const state = getState();
  const teamsById = new Map(state.teams.filter((t) => t.orgId === orgId).map((t) => [t.id, t]));
  return state.members
    .filter((m) => m.orgId === orgId)
    .map((m) => ({ ...m, teamName: teamsById.get(m.teamId)?.name || null }));
}

/**
 * Every org member paired with the remediation records (CVE snapshots)
 * currently assigned to them, newest first. Reads the same localStorage-
 * backed remediation store the CVE detail/remediation tab writes to, so
 * an assignment shows up here regardless of whether the CVE is part of
 * the team's currently-registered stack.
 */
export function getAssignedIssues(orgId) {
  const remediation = storage.getRemediation();
  const members = getAllMembers(orgId);

  return members.map((member) => ({
    member,
    issues: Object.values(remediation)
      .filter((r) => r.assignedTo === member.id)
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '')),
  }));
}

function makeMemberId() {
  return 'mem_' + Math.random().toString(36).slice(2, 10);
}

/**
 * Adds a new member to a team and persists the change. Returns the created
 * member record, or throws if the team doesn't exist or the email is
 * already used within the org.
 */
export function addTeamMember(orgId, teamId, { name, email, role }) {
  const state = getState();
  const team = state.teams.find((t) => t.id === teamId && t.orgId === orgId);
  if (!team) throw new Error('Team not found');

  const trimmedEmail = email.trim().toLowerCase();
  const exists = state.members.some(
    (m) => m.orgId === orgId && m.email.toLowerCase() === trimmedEmail
  );
  if (exists) throw new Error('A member with that email already exists in this org');

  const member = {
    id: makeMemberId(),
    orgId,
    teamId,
    name: name.trim(),
    email: trimmedEmail,
    role: role.trim() || 'Member',
  };

  state.members.push(member);
  team.memberIds.push(member.id);

  storage.setOrgState(state);
  return member;
}

/** Removes a member from a team (and the org's member list) entirely. */
export function removeTeamMember(orgId, teamId, memberId) {
  const state = getState();
  const team = state.teams.find((t) => t.id === teamId && t.orgId === orgId);
  if (!team) return false;

  team.memberIds = team.memberIds.filter((id) => id !== memberId);
  state.members = state.members.filter((m) => m.id !== memberId);

  storage.setOrgState(state);
  return true;
}

/**
 * Searches members within an org by name, email, or role. Scoped to a
 * single team when teamId is given, otherwise searches the whole org.
 */
export function searchTeamMembers(orgId, query, teamId = null) {
  const state = getState();
  const q = query.trim().toLowerCase();

  let pool = state.members.filter((m) => m.orgId === orgId);
  if (teamId) pool = pool.filter((m) => m.teamId === teamId);
  if (!q) return pool;

  return pool.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
  );
}

/** All assignment records for a CVE (usually just one, per team). */
export function getAssignmentsForCve(cveId) {
  return getState().cveAssignments.filter((a) => a.cveId === cveId);
}

export function getAssignmentForCve(cveId, teamId) {
  return getState().cveAssignments.find((a) => a.cveId === cveId && a.teamId === teamId) || null;
}

/**
 * Assign or reassign a CVE to a member on a team. Creates the assignment
 * record if it doesn't exist yet, otherwise updates it in place. Persists
 * the change to localStorage and returns the updated record.
 */
export function assignCve(cveId, teamId, assigneeId, status = 'under_analysis') {
  const state = getState();
  const existing = state.cveAssignments.find((a) => a.cveId === cveId && a.teamId === teamId);

  let record;
  if (existing) {
    existing.assigneeId = assigneeId;
    existing.status = status;
    existing.assignedAt = new Date().toISOString();
    record = existing;
  } else {
    record = { cveId, teamId, assigneeId, status, assignedAt: new Date().toISOString() };
    state.cveAssignments.push(record);
  }

  storage.setOrgState(state);
  return record;
}
