// Fictional but realistic CVE records used when VITE_DEMO_MODE=true.
// Shape mirrors what OpenCVE's /api/cve and /api/cve/<id> endpoints return,
// flattened for convenience.

export const demoCves = [
  {
    id: 'CVE-2024-31337',
    summary:
      'A crafted command sent to the management endpoint of Orbit Gateway is interpreted by the underlying shell parser, allowing an unauthenticated remote attacker to execute arbitrary commands with elevated privileges.',
    cvss: { v2: 9.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { 'orbit-networks': ['orbit-gateway'] },
    cwes: ['CWE-78', 'CWE-306'],
    affectedVersions: ['Orbit Gateway < 4.2.1', 'Orbit Gateway 4.0.x (all)'],
    published: '2026-05-02T00:00:00Z',
    updated: '2026-05-14T00:00:00Z',
    references: [
      'https://orbit-networks.example/security/advisories/OGW-2026-01',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-31337',
    ],
  },
  {
    id: 'CVE-2024-28812',
    summary:
      'The search filter in Ledgerly ERP concatenates user-supplied input directly into a SQL query, letting an authenticated low-privilege user read or modify arbitrary rows across tenants.',
    cvss: { v2: 7.5, v3: 8.6 },
    severity: 'HIGH',
    vendors: { ledgerly: ['ledgerly-erp'] },
    cwes: ['CWE-89'],
    affectedVersions: ['Ledgerly ERP 6.0 - 6.4.2'],
    published: '2026-04-18T00:00:00Z',
    updated: '2026-04-20T00:00:00Z',
    references: [
      'https://ledgerly.example/trust/CVE-2024-28812',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-28812',
    ],
  },
  {
    id: 'CVE-2024-29901',
    summary:
      'Nimbus Auth accepts a forged session token when the "remember me" flag is set, because the signature check is skipped for tokens issued through the legacy SSO bridge.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { 'nimbus-id': ['nimbus-auth'] },
    cwes: ['CWE-287', 'CWE-347'],
    affectedVersions: ['Nimbus Auth 2.3.0 - 2.6.1'],
    published: '2026-06-01T00:00:00Z',
    updated: '2026-06-03T00:00:00Z',
    references: [
      'https://nimbus-id.example/advisories/2026-06',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-29901',
    ],
  },
  {
    id: 'CVE-2023-44510',
    summary:
      'The comment widget in Fernwood CMS renders user input without sanitising script tags, allowing a stored cross-site scripting payload to run in the browser of any visitor viewing the page.',
    cvss: { v2: 4.3, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { fernwood: ['fernwood-cms'] },
    cwes: ['CWE-79'],
    affectedVersions: ['Fernwood CMS 3.x (all versions before 3.9.4)'],
    published: '2026-03-11T00:00:00Z',
    updated: '2026-03-15T00:00:00Z',
    references: [
      'https://fernwood.example/security/CVE-2023-44510',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-44510',
    ],
  },
  {
    id: 'CVE-2023-41207',
    summary:
      'Relay Queue deserialises message payloads with a permissive object mapper, letting an attacker who can publish to the queue trigger arbitrary object instantiation on the consumer.',
    cvss: { v2: 6.0, v3: 7.3 },
    severity: 'MEDIUM',
    vendors: { relaystack: ['relay-queue'] },
    cwes: ['CWE-502'],
    affectedVersions: ['Relay Queue 1.8 - 1.11'],
    published: '2026-02-20T00:00:00Z',
    updated: '2026-02-22T00:00:00Z',
    references: [
      'https://relaystack.example/CVE-2023-41207',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-41207',
    ],
  },
  {
    id: 'CVE-2023-39112',
    summary:
      'A debug endpoint left enabled in Harbor Notify responds with internal configuration, including internal hostnames, to any request that supplies a valid but low-privilege API key.',
    cvss: { v2: 3.5, v3: 3.9 },
    severity: 'LOW',
    vendors: { harborsoft: ['harbor-notify'] },
    cwes: ['CWE-200'],
    affectedVersions: ['Harbor Notify 5.0 - 5.2'],
    published: '2026-01-09T00:00:00Z',
    updated: '2026-01-10T00:00:00Z',
    references: [
      'https://harborsoft.example/advisories/CVE-2023-39112',
      'https://nvd.nist.gov/vuln/detail/CVE-2023-39112',
    ],
  },
];

// Extra published dates spread over the last 30 days so the "CVEs per day"
// line chart in the Analytics module has something to show even with only
// six seed records. Not tied to any real CVE id - purely for the chart demo.
export function demoDailyCounts() {
  const days = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    // Deterministic pseudo-random-ish pattern, not Math.random, so it's stable across renders.
    const count = (i * 7 + 3) % 5;
    days.push({ date: iso, count });
  }
  return days;
}

export const demoVendorSuggestions = [
  { vendor: 'orbit-networks', product: 'orbit-gateway' },
  { vendor: 'ledgerly', product: 'ledgerly-erp' },
  { vendor: 'nimbus-id', product: 'nimbus-auth' },
  { vendor: 'fernwood', product: 'fernwood-cms' },
  { vendor: 'relaystack', product: 'relay-queue' },
  { vendor: 'harborsoft', product: 'harbor-notify' },
  { vendor: 'nginx', product: 'nginx' },
  { vendor: 'postgresql', product: 'postgresql' },
  { vendor: 'openssl', product: 'openssl' },
  { vendor: 'kubernetes', product: 'kubernetes' },
];
