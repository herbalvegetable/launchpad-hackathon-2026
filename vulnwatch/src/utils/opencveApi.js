import { demoCves, demoVendorSuggestions } from '../data/demoCves';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
const BASE_URL = import.meta.env.VITE_OPENCVE_BASE_URL || 'https://app.opencve.io/api/v2';
const API_KEY = import.meta.env.VITE_OPENCVE_API_KEY || '';
const USERNAME = import.meta.env.VITE_OPENCVE_USERNAME || '';
const PASSWORD = import.meta.env.VITE_OPENCVE_PASSWORD || '';

class OpenCveError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'OpenCveError';
    this.status = status;
  }
}

function authHeaders() {
  // API v2 only supports organization API tokens (Bearer auth). Basic auth
  // with a username/password is kept as a fallback for v1 deployments.
  const authorization = API_KEY ? `Bearer ${API_KEY}` : 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
  return {
    Authorization: authorization,
    'Content-Type': 'application/json',
  };
}

async function liveFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });

  let response;
  try {
    response = await fetch(url.toString(), { headers: authHeaders() });
  } catch (err) {
    throw new OpenCveError('Could not reach OpenCVE. Check your network connection.', 0);
  }

  if (response.status === 401 || response.status === 403) {
    throw new OpenCveError('OpenCVE authentication failed. Check your API key or credentials.', response.status);
  }
  if (response.status === 429) {
    throw new OpenCveError('OpenCVE rate limit reached. Try again shortly.', 429);
  }
  if (!response.ok) {
    throw new OpenCveError(`OpenCVE request failed (${response.status}).`, response.status);
  }
  return response.json();
}

function filterDemoCves({ search, vendor, product, cvss } = {}) {
  let results = [...demoCves];
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
  const data = await liveFetch('/cves', { search, vendor, product, cvss, page });
  return data;
}

/**
 * GET /cves/<CVE-ID> - full detail
 */
export async function getCveDetail(cveId) {
  if (DEMO_MODE) {
    const found = demoCves.find((c) => c.id === cveId);
    if (!found) throw new OpenCveError(`${cveId} was not found in demo data.`, 404);
    return found;
  }
  const data = await liveFetch(`/cves/${cveId}`);
  return data;
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
 * GET /vendors - suggestions for the stack builder.
 */
export async function searchVendorsProducts(query) {
  if (DEMO_MODE) {
    const q = (query || '').toLowerCase();
    return demoVendorSuggestions.filter(
      (s) => s.vendor.includes(q) || s.product.includes(q)
    );
  }
  try {
    const vendorData = await liveFetch('/vendors', { search: query });
    return (vendorData.results || []).map((v) => ({ vendor: v.name, product: v.name }));
  } catch (err) {
    return [];
  }
}

export { OpenCveError };
