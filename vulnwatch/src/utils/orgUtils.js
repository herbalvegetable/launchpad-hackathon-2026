// Mock organization/team/member/CVE-assignment logic for the demo.
// No backend - state is seeded from orgData.json once, then persisted
// through storage.js (localStorage) so assignments survive a page refresh,
// same pattern as remediation status elsewhere in the app.

import seedOrgData from '../data/orgData.json';
import { storage } from './storage';

/**
 * Returns the current org state, seeding localStorage from orgData.json
 * on first call. Always returns a fresh object (never seed data by
 * reference) so callers can't accidentally mutate the fallback.
 */
function getState() {
  const existing = storage.getOrgState(null);
  if (existing) return existing;

  const seeded = structuredClone(seedOrgData);
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
