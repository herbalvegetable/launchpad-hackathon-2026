import { demoCves, searchDemoVendorSuggestions, demoVendorAliases } from '../data/demoCves';
import { searchPopularStacks } from '../data/popularStacks';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
// Same-origin proxy path — OpenCVE blocks direct browser CORS.
const BASE_URL = (import.meta.env.VITE_OPENCVE_BASE_URL || '/api/opencve').trim().replace(/\/$/, '');
const API_KEY = (import.meta.env.VITE_OPENCVE_API_KEY || '').trim();
const PAGE_SIZE = 20;

class OpenCveError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'OpenCveError';
    this.status = status;
  }
}

function authHeaders() {
  if (!API_KEY) {
    throw new OpenCveError(
      'No OpenCVE API key configured. Set VITE_OPENCVE_API_KEY in .env and restart the dev server.',
      0,
    );
  }
  return {
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json',
  };
}

async function liveFetch(path, params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') searchParams.set(k, String(v));
  });
  const qs = searchParams.toString();
  const url = `${BASE_URL}${path}${qs ? `?${qs}` : ''}`;

  let response;
  try {
    response = await fetch(url, { headers: authHeaders() });
  } catch (err) {
    throw new OpenCveError('Could not reach OpenCVE. Check your network connection.', 0);
  }

  if (response.status === 401 || response.status === 403) {
    throw new OpenCveError(
      'OpenCVE authentication failed (401/403). Confirm VITE_OPENCVE_API_KEY is valid, then restart the Vite dev server so .env changes load.',
      response.status,
    );
  }
  if (response.status === 429) {
    throw new OpenCveError('OpenCVE rate limit reached. Try again shortly.', 429);
  }
  if (!response.ok) {
    throw new OpenCveError(`OpenCVE request failed (${response.status}).`, response.status);
  }
  return response.json();
}

function scoreToSeverity(score) {
  if (score == null || Number.isNaN(score) || score <= 0) return 'NONE';
  if (score >= 9) return 'CRITICAL';
  if (score >= 7) return 'HIGH';
  if (score >= 4) return 'MEDIUM';
  return 'LOW';
}

function extractCvssScore(metrics, keys) {
  if (!metrics || typeof metrics !== 'object') return 0;
  for (const key of keys) {
    const entry = metrics[key];
    const score = entry?.data?.score ?? entry?.score;
    if (typeof score === 'number') return score;
    if (typeof score === 'string' && score !== '') {
      const n = Number(score);
      if (!Number.isNaN(n)) return n;
    }
  }
  return 0;
}

/** Fallback when list payloads omit metrics but mention the score in the description. */
function parseScoreFromDescription(text) {
  if (!text) return 0;
  const match = text.match(/CVSS\s*3(?:\.\d)?\s*Base\s*Score\s*([\d.]+)/i);
  if (!match) return 0;
  const n = Number(match[1]);
  return Number.isNaN(n) ? 0 : n;
}

/**
 * OpenCVE v2 list/detail payloads use cve_id / description / metrics.
 * Map them into the flat shape the UI expects (id, summary, cvss, ...).
 */
function normalizeCve(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const id = raw.id || raw.cve_id;
  if (!id) return null;

  const summary = raw.summary || raw.description || '';
  const metrics = raw.metrics || {};
  let v3 = extractCvssScore(metrics, ['cvssV3_1', 'cvssV3_0', 'cvssV3', 'cvssV4_0']);
  if (!v3) v3 = parseScoreFromDescription(summary);

  // vendors may be ["microsoft", "microsoft$PRODUCT$windows_10"] or already an object
  let vendors = {};
  if (raw.vendors && !Array.isArray(raw.vendors) && typeof raw.vendors === 'object') {
    vendors = raw.vendors;
  } else if (Array.isArray(raw.vendors)) {
    for (const entry of raw.vendors) {
      if (typeof entry !== 'string') continue;
      if (entry.includes('$PRODUCT$')) {
        const [vendor, product] = entry.split('$PRODUCT$');
        if (!vendors[vendor]) vendors[vendor] = [];
        if (product && !vendors[vendor].includes(product)) vendors[vendor].push(product);
      } else if (!vendors[entry]) {
        vendors[entry] = [];
      }
    }
  }

  const weaknesses = raw.weaknesses || raw.cwes || [];
  const cwes = Array.isArray(weaknesses)
    ? weaknesses.map((w) => (typeof w === 'string' ? w : w?.name || w?.cwe_id)).filter(Boolean)
    : [];

  const references = Array.isArray(raw.references)
    ? raw.references.map((r) => (typeof r === 'string' ? r : r?.url)).filter(Boolean)
    : [];

  return {
    id,
    summary,
    cvss: { v3 },
    severity: raw.severity || scoreToSeverity(v3),
    vendors,
    cwes,
    affectedVersions: raw.affectedVersions || [],
    published: raw.published || raw.created_at || null,
    updated: raw.updated || raw.updated_at || null,
    references,
  };
}

/**
 * List endpoints omit metrics/vendors. Fetch detail for each id (bounded
 * concurrency) so cards can show severity, vendor, and CVSS.
 */
async function enrichWithDetails(listItems, concurrency = 6) {
  if (!listItems.length) return listItems;
  const results = new Array(listItems.length);
  let next = 0;

  async function worker() {
    while (next < listItems.length) {
      const index = next++;
      const item = listItems[index];
      try {
        const detail = await liveFetch(`/cves/${item.id}`);
        results[index] = normalizeCve(detail) || item;
      } catch {
        results[index] = item;
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, listItems.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * If `vendor`/`product` doesn't exist in the fictional demo dataset (e.g. a
 * team registered a real-world name like nginx/nginx before the stack
 * builder was made demo-aware), remap it to the aliased fictional
 * vendor/product so demo filtering still finds a match.
 */
function resolveDemoVendorProduct(vendor, product) {
  if (!vendor) return { vendor, product };
  const alias = demoVendorAliases[`${vendor}/${product}`];
  if (!alias) return { vendor, product };
  const [aliasVendor, aliasProduct] = alias.split('/');
  return { vendor: aliasVendor, product: aliasProduct };
}

function filterDemoCves({ search, vendor, product, cvss } = {}) {
  let results = [...demoCves];
  const resolved = resolveDemoVendorProduct(vendor, product);
  const aliased = resolved.vendor !== vendor || resolved.product !== product;
  const originalVendor = vendor;
  const originalProduct = product;
  vendor = resolved.vendor;
  product = resolved.product;
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) => c.id.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
    );
  }
  if (vendor) {
    results = results.filter((c) => Object.keys(c.vendors).includes(vendor));
  }
  if (product) {
    results = results.filter((c) => Object.values(c.vendors).flat().includes(product));
  }
  if (cvss && cvss !== 'none') {
    const bounds = { low: [0, 4], medium: [4, 7], high: [7, 9], critical: [9, 10.1] };
    const [min, max] = bounds[cvss] || [0, 10.1];
    results = results.filter((c) => c.cvss.v3 >= min && c.cvss.v3 < max);
  }
  if (aliased) {
    // Relabel so the card/filter chips consistently show the vendor the
    // team actually registered, not the internal fictional alias.
    results = results.map((c) => ({ ...c, vendors: { [originalVendor]: [originalProduct] } }));
  }
  return results;
}

/**
 * GET /cves - list/search CVEs
 */
export async function searchCves({ search, vendor, product, cvss, page = 1 } = {}) {
  if (DEMO_MODE) {
    const results = filterDemoCves({ search, vendor, product, cvss });
    return { results, count: results.length, page, pages: 1 };
  }
  const data = await liveFetch('/cves', { search, vendor, product, cvss, page, page_size: PAGE_SIZE });
  const listed = (data.results || []).map(normalizeCve).filter(Boolean);
  // List payloads lack metrics/vendors — enrich so cards show real scores.
  const results = await enrichWithDetails(listed);
  const count = data.count ?? results.length;
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  return { results, count, page, pages };
}

/**
 * GET /cves/<CVE-ID> - full detail
 */
export async function getCveDetail(cveId) {
  if (!cveId || cveId === 'undefined') {
    throw new OpenCveError('Missing CVE id.', 400);
  }
  if (DEMO_MODE) {
    const found = demoCves.find((c) => c.id === cveId);
    if (!found) throw new OpenCveError(`${cveId} was not found in demo data.`, 404);
    return found;
  }
  const data = await liveFetch(`/cves/${cveId}`);
  const normalized = normalizeCve(data);
  if (!normalized) throw new OpenCveError(`${cveId} returned an unexpected response shape.`, 500);
  return normalized;
}

/**
 * Fetch CVEs scoped to a team's registered stack, one request per
 * vendor/product pair, deduplicated by CVE id.
 */
export async function getCvesForStack(stack = []) {
  if (!stack.length) return [];
  const seen = new Map();
  for (const { vendor, product } of stack) {
    const { results } = await searchCves({ vendor, product });
    for (const cve of results) {
      if (!seen.has(cve.id)) seen.set(cve.id, cve);
    }
  }
  return Array.from(seen.values());
}

/**
 * Stack-builder suggestions from a curated local list of popular stacks.
 * Does not call OpenCVE — vendor/product names are OpenCVE-compatible CPE ids.
 */
export async function searchVendorsProducts(query) {
  if (DEMO_MODE) return searchDemoVendorSuggestions(query);
  return searchPopularStacks(query);
}

export { OpenCveError };
