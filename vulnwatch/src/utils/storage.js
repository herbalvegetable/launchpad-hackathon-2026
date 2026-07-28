// Thin wrapper around localStorage with JSON encoding and quota-error handling.

const KEYS = {
  TEAM: 'vulnwatch_team',
  CVE_CACHE: 'vulnwatch_cve_cache',
  REMEDIATION: 'vulnwatch_remediation',
  LAST_VISIT: 'vulnwatch_last_visit',
  ORG_STATE: 'vulnwatch_org_state',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Storage read failed for ${key}:`, err);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Storage write failed for ${key}:`, err);
    // Likely quota exceeded - surface a typed error the UI can catch.
    if (err && err.name === 'QuotaExceededError') {
      throw new Error('Local storage is full. Try clearing cached CVE data in Settings.');
    }
    return false;
  }
}

export const storage = {
  getTeam: () => read(KEYS.TEAM, null),
  setTeam: (team) => write(KEYS.TEAM, team),

  getCveCache: () => read(KEYS.CVE_CACHE, {}),
  setCveCache: (cache) => write(KEYS.CVE_CACHE, cache),
  getCachedCve: (id) => {
    const cache = read(KEYS.CVE_CACHE, {});
    return cache[id] || null;
  },
  setCachedCve: (id, record) => {
    const cache = read(KEYS.CVE_CACHE, {});
    cache[id] = record;
    write(KEYS.CVE_CACHE, cache);
  },

  getRemediation: () => read(KEYS.REMEDIATION, {}),
  getRemediationFor: (cveId) => {
    const all = read(KEYS.REMEDIATION, {});
    return (
      all[cveId] || {
        cveId,
        status: 'unreviewed',
        assignedTo: '',
        notes: '',
        updatedAt: null,
      }
    );
  },
  setRemediationFor: (cveId, patch) => {
    const all = read(KEYS.REMEDIATION, {});
    all[cveId] = {
      ...(all[cveId] || { cveId, status: 'unreviewed', assignedTo: '', notes: '' }),
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    write(KEYS.REMEDIATION, all);
    return all[cveId];
  },

  getLastVisit: () => read(KEYS.LAST_VISIT, null),
  setLastVisit: (iso) => write(KEYS.LAST_VISIT, iso),

  // Mock org/team/member/CVE-assignment state (see utils/orgUtils.js).
  // `fallback` lets the caller pass the seed data on first read, since this
  // key won't exist in localStorage until something writes to it.
  getOrgState: (fallback = null) => read(KEYS.ORG_STATE, fallback),
  setOrgState: (state) => write(KEYS.ORG_STATE, state),
  clearOrgState: () => {
    try {
      localStorage.removeItem(KEYS.ORG_STATE);
      return true;
    } catch (err) {
      console.error('Storage clear failed for ORG_STATE:', err);
      return false;
    }
  },
};

export const STORAGE_KEYS = KEYS;
