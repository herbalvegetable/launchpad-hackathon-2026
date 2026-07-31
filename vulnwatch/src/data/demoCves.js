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
  
  {
    id: 'CVE-2024-36104',
    summary:
      'A stack-based buffer overflow in the RTSP request parser of Sablefin Camera Firmware allows an unauthenticated attacker on the local network to overwrite the return address and execute arbitrary code as root.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { sablefin: ['sablefin-camera-firmware'] },
    cwes: ['CWE-121'],
    affectedVersions: ['Sablefin Camera Firmware 1.0 - 2.4.3'],
    published: '2026-06-24T00:00:00Z',
    updated: '2026-06-27T00:00:00Z',
    references: [
      'https://sablefin.example/security/CVE-2024-36104',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-36104',
    ],
  },
  {
    id: 'CVE-2024-36521',
    summary:
      'A use-after-free in the WebRTC media handler of Pinecone Browser is triggered when a peer connection is closed while an ICE candidate is still being processed, allowing a malicious page to corrupt the heap and execute arbitrary code in the renderer.',
    cvss: { v2: 9.3, v3: 8.8 },
    severity: 'HIGH',
    vendors: { pinecone: ['pinecone-browser'] },
    cwes: ['CWE-416'],
    affectedVersions: ['Pinecone Browser 118.0 - 121.0.2'],
    published: '2026-06-28T00:00:00Z',
    updated: '2026-07-02T00:00:00Z',
    references: [
      'https://pinecone.example/security/CVE-2024-36521',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-36521',
    ],
  },
  {
    id: 'CVE-2024-37014',
    summary:
      'A double-free in the certificate chain teardown routine of TrellisTLS occurs when validation is aborted mid-chain, potentially allowing an attacker able to trigger the abort to crash the process or corrupt allocator metadata.',
    cvss: { v2: 6.4, v3: 7.5 },
    severity: 'HIGH',
    vendors: { trellistls: ['trellistls'] },
    cwes: ['CWE-415'],
    affectedVersions: ['TrellisTLS 3.2 - 3.5.1'],
    published: '2026-05-08T00:00:00Z',
    updated: '2026-05-12T00:00:00Z',
    references: [
      'https://trellistls.example/security/CVE-2024-37014',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-37014',
    ],
  },
  {
    id: 'CVE-2024-37890',
    summary:
      'An integer overflow in the JPEG segment length calculation of libraster wraps to a small allocation, after which the decoder writes attacker-controlled bytes past the buffer, leading to heap corruption when decoding a crafted image.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { rasterworks: ['libraster'] },
    cwes: ['CWE-190', 'CWE-787'],
    affectedVersions: ['libraster 0.8 - 1.2.4'],
    published: '2026-04-11T00:00:00Z',
    updated: '2026-04-14T00:00:00Z',
    references: [
      'https://rasterworks.example/security/CVE-2024-37890',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-37890',
    ],
  },
  {
    id: 'CVE-2024-38220',
    summary:
      'An out-of-bounds read in the SNMP response parser of Sparrow NMS occurs when a returned varbind declares a length longer than the remaining packet, disclosing adjacent heap memory to a remote attacker able to answer polled queries.',
    cvss: { v2: 5.0, v3: 5.9 },
    severity: 'MEDIUM',
    vendors: { sparrow: ['sparrow-nms'] },
    cwes: ['CWE-125'],
    affectedVersions: ['Sparrow NMS 4.1 - 4.3.2'],
    published: '2026-05-15T00:00:00Z',
    updated: '2026-05-16T00:00:00Z',
    references: [
      'https://sparrow.example/security/CVE-2024-38220',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-38220',
    ],
  },
  {
    id: 'CVE-2024-38702',
    summary:
      'A NULL pointer dereference in the DHCPv6 option handler of Wren Router Firmware causes the routing daemon to crash when a client sends a relay message with an empty interface-id option, resulting in a network-wide outage until the daemon restarts.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { wren: ['wren-router-firmware'] },
    cwes: ['CWE-476'],
    affectedVersions: ['Wren Router Firmware 8.0 - 8.4.6'],
    published: '2026-05-20T00:00:00Z',
    updated: '2026-05-23T00:00:00Z',
    references: [
      'https://wren.example/security/CVE-2024-38702',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-38702',
    ],
  },
  {
    id: 'CVE-2024-39115',
    summary:
      'A type confusion in the JIT compiler of QuartzScript engine misinterprets an object shape after a specific pattern of property deletions, allowing a crafted script to read and write arbitrary process memory.',
    cvss: { v2: 9.3, v3: 8.8 },
    severity: 'HIGH',
    vendors: { quartz: ['quartzscript'] },
    cwes: ['CWE-843'],
    affectedVersions: ['QuartzScript 10.2 - 10.4.1'],
    published: '2026-06-02T00:00:00Z',
    updated: '2026-06-05T00:00:00Z',
    references: [
      'https://quartz.example/security/CVE-2024-39115',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-39115',
    ],
  },
  {
    id: 'CVE-2024-39544',
    summary:
      'A format string vulnerability in the syslog forwarder of Kelp Firewall passes user-controlled interface descriptions directly to a printf-family function, allowing an authenticated administrator to read stack memory or crash the daemon.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { kelp: ['kelp-firewall'] },
    cwes: ['CWE-134'],
    affectedVersions: ['Kelp Firewall 12.0 - 12.3.4'],
    published: '2026-04-25T00:00:00Z',
    updated: '2026-04-28T00:00:00Z',
    references: [
      'https://kelp.example/security/CVE-2024-39544',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-39544',
    ],
  },

  // ---------- Injection ----------
  {
    id: 'CVE-2024-40012',
    summary:
      'The LDAP login filter in Cormorant Directory concatenates the supplied username into the search filter without escaping metacharacters, letting an unauthenticated user bypass authentication or enumerate directory attributes.',
    cvss: { v2: 7.5, v3: 9.1 },
    severity: 'CRITICAL',
    vendors: { cormorant: ['cormorant-directory'] },
    cwes: ['CWE-90'],
    affectedVersions: ['Cormorant Directory 2.0 - 2.5.3'],
    published: '2026-06-14T00:00:00Z',
    updated: '2026-06-17T00:00:00Z',
    references: [
      'https://cormorant.example/security/CVE-2024-40012',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-40012',
    ],
  },
  {
    id: 'CVE-2024-40118',
    summary:
      'An XPath injection in the document search endpoint of Barnowl DMS lets an authenticated user retrieve nodes outside their permission scope by embedding boolean predicates in the query string.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { barnowl: ['barnowl-dms'] },
    cwes: ['CWE-643'],
    affectedVersions: ['Barnowl DMS 5.0 - 5.4.2'],
    published: '2026-05-30T00:00:00Z',
    updated: '2026-06-02T00:00:00Z',
    references: [
      'https://barnowl.example/security/CVE-2024-40118',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-40118',
    ],
  },
  {
    id: 'CVE-2024-40423',
    summary:
      'The document filter API in Marlin NoSQL evaluates operator-prefixed keys from user input, allowing an unauthenticated user to inject query operators and bypass authentication checks that rely on equality matches.',
    cvss: { v2: 7.5, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { marlin: ['marlin-nosql'] },
    cwes: ['CWE-943', 'CWE-89'],
    affectedVersions: ['Marlin NoSQL 3.0 - 3.4.1'],
    published: '2026-04-15T00:00:00Z',
    updated: '2026-04-18T00:00:00Z',
    references: [
      'https://marlin.example/security/CVE-2024-40423',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-40423',
    ],
  },
  {
    id: 'CVE-2024-40711',
    summary:
      'The archive extraction routine of Ospreyzip does not validate entry paths, letting a crafted archive write files to arbitrary locations outside the target directory when extracted by an application using the library.',
    cvss: { v2: 7.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { ospreysoft: ['ospreyzip'] },
    cwes: ['CWE-22'],
    affectedVersions: ['Ospreyzip 1.4 - 1.9.0'],
    published: '2026-03-20T00:00:00Z',
    updated: '2026-03-24T00:00:00Z',
    references: [
      'https://ospreysoft.example/security/CVE-2024-40711',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-40711',
    ],
  },
  {
    id: 'CVE-2024-41005',
    summary:
      'The backup restore feature in Dunlin Console follows symbolic links inside uploaded archives, allowing an authenticated administrator on one tenant to overwrite files owned by other tenants sharing the same host.',
    cvss: { v2: 5.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { dunlin: ['dunlin-console'] },
    cwes: ['CWE-59'],
    affectedVersions: ['Dunlin Console 2.1 - 2.4.5'],
    published: '2026-05-05T00:00:00Z',
    updated: '2026-05-07T00:00:00Z',
    references: [
      'https://dunlin.example/security/CVE-2024-41005',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-41005',
    ],
  },
  {
    id: 'CVE-2024-41220',
    summary:
      'The image processing worker in Auklet Media Studio invokes the ffmpeg binary with a user-supplied filename passed through a shell, allowing an authenticated user to inject additional arguments and read arbitrary files as the worker user.',
    cvss: { v2: 8.5, v3: 8.8 },
    severity: 'HIGH',
    vendors: { auklet: ['auklet-media-studio'] },
    cwes: ['CWE-88', 'CWE-78'],
    affectedVersions: ['Auklet Media Studio 4.0 - 4.2.3'],
    published: '2026-04-22T00:00:00Z',
    updated: '2026-04-25T00:00:00Z',
    references: [
      'https://auklet.example/security/CVE-2024-41220',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-41220',
    ],
  },
  {
    id: 'CVE-2024-41533',
    summary:
      'The API response cache in Gannet Proxy uses unvalidated CRLF sequences from upstream headers as cache keys, allowing an attacker who controls an upstream response to poison the cache and inject arbitrary headers into responses served to other clients.',
    cvss: { v2: 6.4, v3: 7.5 },
    severity: 'HIGH',
    vendors: { gannet: ['gannet-proxy'] },
    cwes: ['CWE-113', 'CWE-93'],
    affectedVersions: ['Gannet Proxy 6.0 - 6.2.4'],
    published: '2026-06-06T00:00:00Z',
    updated: '2026-06-09T00:00:00Z',
    references: [
      'https://gannet.example/security/CVE-2024-41533',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-41533',
    ],
  },
  {
    id: 'CVE-2024-41902',
    summary:
      'The frontend of Petrel Load Balancer accepts requests with both Content-Length and Transfer-Encoding headers and forwards them unchanged to backends that prioritize the other header, enabling HTTP request smuggling to bypass access controls.',
    cvss: { v2: 6.4, v3: 8.1 },
    severity: 'HIGH',
    vendors: { petrel: ['petrel-load-balancer'] },
    cwes: ['CWE-444'],
    affectedVersions: ['Petrel Load Balancer 1.9 - 2.3.0'],
    published: '2026-05-18T00:00:00Z',
    updated: '2026-05-21T00:00:00Z',
    references: [
      'https://petrel.example/security/CVE-2024-41902',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-41902',
    ],
  },
  {
    id: 'CVE-2024-42111',
    summary:
      'The template rendering path in Chukar CMS passes user-supplied filter expressions to a Ruby eval call, letting an authenticated editor execute arbitrary Ruby code on the application server.',
    cvss: { v2: 9.0, v3: 8.8 },
    severity: 'HIGH',
    vendors: { chukar: ['chukar-cms'] },
    cwes: ['CWE-95', 'CWE-94'],
    affectedVersions: ['Chukar CMS 3.0 - 3.4.2'],
    published: '2026-04-08T00:00:00Z',
    updated: '2026-04-11T00:00:00Z',
    references: [
      'https://chukar.example/security/CVE-2024-42111',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-42111',
    ],
  },
  {
    id: 'CVE-2024-42405',
    summary:
      'The log ingestion pipeline in Grebe Observability writes user-supplied fields to structured log files without sanitising newline characters, allowing a caller to forge log entries and mislead audit reviews.',
    cvss: { v2: 4.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { grebe: ['grebe-observability'] },
    cwes: ['CWE-117'],
    affectedVersions: ['Grebe Observability 1.1 - 1.5.0'],
    published: '2026-03-08T00:00:00Z',
    updated: '2026-03-10T00:00:00Z',
    references: [
      'https://grebe.example/security/CVE-2024-42405',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-42405',
    ],
  },

  // ---------- XSS variants ----------
  {
    id: 'CVE-2024-42630',
    summary:
      'A DOM-based cross-site scripting flaw in the dashboard widget of Merlin Analytics reads the URL fragment and passes it to innerHTML, allowing an attacker to run arbitrary script in the browser of a user who follows a crafted link.',
    cvss: { v2: 4.3, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { merlin: ['merlin-analytics'] },
    cwes: ['CWE-79'],
    affectedVersions: ['Merlin Analytics 7.0 - 7.3.2'],
    published: '2026-02-14T00:00:00Z',
    updated: '2026-02-17T00:00:00Z',
    references: [
      'https://merlin.example/security/CVE-2024-42630',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-42630',
    ],
  },
  {
    id: 'CVE-2024-42890',
    summary:
      'The error page in Grackle Portal reflects the requested URL path back into the response without HTML-encoding, allowing a reflected cross-site scripting attack against any authenticated user who clicks a crafted link.',
    cvss: { v2: 4.3, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { grackle: ['grackle-portal'] },
    cwes: ['CWE-79'],
    affectedVersions: ['Grackle Portal 2.0 - 2.4.1'],
    published: '2026-01-30T00:00:00Z',
    updated: '2026-02-01T00:00:00Z',
    references: [
      'https://grackle.example/security/CVE-2024-42890',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-42890',
    ],
  },
  {
    id: 'CVE-2024-43021',
    summary:
      'The login page in Skua Support Portal accepts a returnTo parameter that is written into a location.href assignment, allowing an attacker to craft a link that redirects users to an arbitrary external site after login for phishing.',
    cvss: { v2: 5.8, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { skua: ['skua-support-portal'] },
    cwes: ['CWE-601'],
    affectedVersions: ['Skua Support Portal 3.2 - 3.6.4'],
    published: '2026-03-04T00:00:00Z',
    updated: '2026-03-05T00:00:00Z',
    references: [
      'https://skua.example/security/CVE-2024-43021',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-43021',
    ],
  },

  // ---------- Auth / access control ----------
  {
    id: 'CVE-2024-43305',
    summary:
      'The password reset flow in Curlew Identity issues a reset token that is bound only to the requested account, letting an attacker who obtains a token for one account submit it with a different account identifier and take over the second account.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { curlew: ['curlew-identity'] },
    cwes: ['CWE-287', 'CWE-640'],
    affectedVersions: ['Curlew Identity 1.5 - 2.0.3'],
    published: '2026-05-11T00:00:00Z',
    updated: '2026-05-15T00:00:00Z',
    references: [
      'https://curlew.example/security/CVE-2024-43305',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-43305',
    ],
  },
  {
    id: 'CVE-2024-43518',
    summary:
      'The JWT verification routine in Redshank Gateway accepts tokens whose alg header is set to "none", letting an attacker forge tokens with arbitrary claims and impersonate any user.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { redshank: ['redshank-gateway'] },
    cwes: ['CWE-347'],
    affectedVersions: ['Redshank Gateway 1.0 - 1.3.2'],
    published: '2026-06-19T00:00:00Z',
    updated: '2026-06-22T00:00:00Z',
    references: [
      'https://redshank.example/security/CVE-2024-43518',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-43518',
    ],
  },
  {
    id: 'CVE-2024-43720',
    summary:
      'The token verifier in Stint Auth accepts JWTs signed with HS256 when the configured key is an RSA public key, letting an attacker who knows the public key sign tokens that the server treats as valid.',
    cvss: { v2: 9.0, v3: 9.1 },
    severity: 'CRITICAL',
    vendors: { stint: ['stint-auth'] },
    cwes: ['CWE-347', 'CWE-287'],
    affectedVersions: ['Stint Auth 4.0 - 4.2.5'],
    published: '2026-06-03T00:00:00Z',
    updated: '2026-06-06T00:00:00Z',
    references: [
      'https://stint.example/security/CVE-2024-43720',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-43720',
    ],
  },
  {
    id: 'CVE-2024-44008',
    summary:
      'The invoice detail endpoint of Tanager Billing checks that the caller is authenticated but does not verify that the invoice belongs to the caller, allowing any user to retrieve any invoice by incrementing the identifier in the URL.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { tanager: ['tanager-billing'] },
    cwes: ['CWE-639'],
    affectedVersions: ['Tanager Billing 2.0 - 2.6.1'],
    published: '2026-04-02T00:00:00Z',
    updated: '2026-04-04T00:00:00Z',
    references: [
      'https://tanager.example/security/CVE-2024-44008',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-44008',
    ],
  },
  {
    id: 'CVE-2024-44212',
    summary:
      'The role assignment endpoint in Vireo IAM does not verify that the caller has permission to grant the requested role, allowing any authenticated user to promote themselves to administrator.',
    cvss: { v2: 9.0, v3: 8.8 },
    severity: 'HIGH',
    vendors: { vireo: ['vireo-iam'] },
    cwes: ['CWE-269', 'CWE-285'],
    affectedVersions: ['Vireo IAM 3.0 - 3.4.2'],
    published: '2026-06-10T00:00:00Z',
    updated: '2026-06-13T00:00:00Z',
    references: [
      'https://vireo.example/security/CVE-2024-44212',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-44212',
    ],
  },
  {
    id: 'CVE-2024-44530',
    summary:
      'The debug REST interface of Coot IoT Hub is exposed on all interfaces by default and requires no authentication, allowing anyone on a reachable network to read device state and issue control commands.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { coot: ['coot-iot-hub'] },
    cwes: ['CWE-306', 'CWE-1188'],
    affectedVersions: ['Coot IoT Hub 1.0 - 1.4.1'],
    published: '2026-05-01T00:00:00Z',
    updated: '2026-05-04T00:00:00Z',
    references: [
      'https://coot.example/security/CVE-2024-44530',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-44530',
    ],
  },
  {
    id: 'CVE-2024-44807',
    summary:
      'The session cookie issued by Rail Portal after login is not invalidated on logout, letting an attacker who captured the cookie continue to access the account after the user believes they have signed out.',
    cvss: { v2: 4.9, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { railworks: ['rail-portal'] },
    cwes: ['CWE-613', 'CWE-384'],
    affectedVersions: ['Rail Portal 5.1 - 5.3.4'],
    published: '2026-03-18T00:00:00Z',
    updated: '2026-03-20T00:00:00Z',
    references: [
      'https://railworks.example/security/CVE-2024-44807',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-44807',
    ],
  },
  {
    id: 'CVE-2024-45001',
    summary:
      'The login endpoint of Sora Portal does not throttle failed attempts, allowing an attacker with a list of usernames to perform unbounded credential-stuffing or brute-force attempts against user accounts.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { sora: ['sora-portal'] },
    cwes: ['CWE-307', 'CWE-799'],
    affectedVersions: ['Sora Portal 1.0 - 1.4.2'],
    published: '2026-02-25T00:00:00Z',
    updated: '2026-02-27T00:00:00Z',
    references: [
      'https://sora.example/security/CVE-2024-45001',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-45001',
    ],
  },

  // ---------- Crypto / TLS ----------
  {
    id: 'CVE-2024-45322',
    summary:
      'The HTTPS client in Talus Sync does not verify server certificate hostnames when the configuration file omits the "verifyHost" key, allowing an on-path attacker with a certificate for any domain to intercept synchronised data.',
    cvss: { v2: 5.8, v3: 7.4 },
    severity: 'HIGH',
    vendors: { talus: ['talus-sync'] },
    cwes: ['CWE-295'],
    affectedVersions: ['Talus Sync 3.0 - 3.5.2'],
    published: '2026-04-18T00:00:00Z',
    updated: '2026-04-20T00:00:00Z',
    references: [
      'https://talus.example/security/CVE-2024-45322',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-45322',
    ],
  },
  {
    id: 'CVE-2024-45610',
    summary:
      'Password hashes in Meridian File Vault are computed with unsalted MD5, letting an attacker who obtains the user database recover passwords in bulk with precomputed tables.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { meridian: ['meridian-file-vault'] },
    cwes: ['CWE-327', 'CWE-916'],
    affectedVersions: ['Meridian File Vault 1.0 - 2.3.0'],
    published: '2026-01-15T00:00:00Z',
    updated: '2026-01-18T00:00:00Z',
    references: [
      'https://meridian.example/security/CVE-2024-45610',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-45610',
    ],
  },
  {
    id: 'CVE-2024-45881',
    summary:
      'The device provisioning workflow of Basalt Meter transmits its initial API key over plain HTTP, letting a passive observer on the same network capture credentials that grant full access to the meter.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { basalt: ['basalt-meter'] },
    cwes: ['CWE-319'],
    affectedVersions: ['Basalt Meter Firmware 2.1 - 2.4.0'],
    published: '2026-03-25T00:00:00Z',
    updated: '2026-03-27T00:00:00Z',
    references: [
      'https://basalt.example/security/CVE-2024-45881',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-45881',
    ],
  },
  {
    id: 'CVE-2024-46020',
    summary:
      'Backup archives produced by Osprey Backup store database credentials in cleartext inside a metadata file, exposing credentials to anyone who can read the archive.',
    cvss: { v2: 4.0, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { ospreysoft: ['osprey-backup'] },
    cwes: ['CWE-312'],
    affectedVersions: ['Osprey Backup 4.0 - 4.2.3'],
    published: '2026-02-09T00:00:00Z',
    updated: '2026-02-11T00:00:00Z',
    references: [
      'https://ospreysoft.example/security/CVE-2024-46020',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-46020',
    ],
  },
  {
    id: 'CVE-2024-46315',
    summary:
      'The signature verification in Ptarmigan Update Agent compares HMAC values with a byte-by-byte loop that returns early on mismatch, allowing a remote attacker to recover valid signatures with a timing side channel over many requests.',
    cvss: { v2: 4.3, v3: 5.9 },
    severity: 'MEDIUM',
    vendors: { ptarmigan: ['ptarmigan-update-agent'] },
    cwes: ['CWE-208', 'CWE-347'],
    affectedVersions: ['Ptarmigan Update Agent 1.0 - 1.6.4'],
    published: '2026-04-05T00:00:00Z',
    updated: '2026-04-08T00:00:00Z',
    references: [
      'https://ptarmigan.example/security/CVE-2024-46315',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-46315',
    ],
  },

  // ---------- Deserialization / dependency confusion ----------
  {
    id: 'CVE-2024-46722',
    summary:
      'The report import feature in Godwit Analytics deserialises Java objects from uploaded files using an unrestricted ObjectInputStream, allowing an authenticated user to execute arbitrary code by uploading a crafted gadget chain.',
    cvss: { v2: 9.0, v3: 8.8 },
    severity: 'HIGH',
    vendors: { godwit: ['godwit-analytics'] },
    cwes: ['CWE-502'],
    affectedVersions: ['Godwit Analytics 6.0 - 6.4.1'],
    published: '2026-05-24T00:00:00Z',
    updated: '2026-05-27T00:00:00Z',
    references: [
      'https://godwit.example/security/CVE-2024-46722',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-46722',
    ],
  },
  {
    id: 'CVE-2024-47013',
    summary:
      'The plugin loader of Snipe Editor loads YAML configuration files with a full-featured constructor, allowing a project that ships a crafted config to execute arbitrary code when the editor opens the workspace.',
    cvss: { v2: 6.8, v3: 7.8 },
    severity: 'HIGH',
    vendors: { snipe: ['snipe-editor'] },
    cwes: ['CWE-502'],
    affectedVersions: ['Snipe Editor 1.7 - 2.1.1'],
    published: '2026-03-30T00:00:00Z',
    updated: '2026-04-02T00:00:00Z',
    references: [
      'https://snipe.example/security/CVE-2024-47013',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-47013',
    ],
  },

  // ---------- SSRF / XXE / SSTI ----------
  {
    id: 'CVE-2024-47401',
    summary:
      'The link preview service in Bittern Chat fetches user-supplied URLs without filtering internal address ranges, letting a member of any workspace read cloud metadata endpoints from the preview worker.',
    cvss: { v2: 6.5, v3: 7.7 },
    severity: 'HIGH',
    vendors: { bittern: ['bittern-chat'] },
    cwes: ['CWE-918'],
    affectedVersions: ['Bittern Chat 3.5 - 4.0.2'],
    published: '2026-06-15T00:00:00Z',
    updated: '2026-06-18T00:00:00Z',
    references: [
      'https://bittern.example/security/CVE-2024-47401',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-47401',
    ],
  },
  {
    id: 'CVE-2024-47720',
    summary:
      'The SOAP handler in Willet ESB parses inbound XML with external entity resolution enabled, letting an unauthenticated remote attacker read local files or trigger outbound requests from the message broker.',
    cvss: { v2: 7.5, v3: 9.1 },
    severity: 'CRITICAL',
    vendors: { willet: ['willet-esb'] },
    cwes: ['CWE-611'],
    affectedVersions: ['Willet ESB 8.0 - 8.3.2'],
    published: '2026-05-13T00:00:00Z',
    updated: '2026-05-16T00:00:00Z',
    references: [
      'https://willet.example/security/CVE-2024-47720',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-47720',
    ],
  },
  {
    id: 'CVE-2024-48002',
    summary:
      'The rule engine of Egret Automations evaluates user-supplied condition strings through Groovy without a sandboxed classloader, allowing an authenticated workflow author to execute arbitrary code on the engine.',
    cvss: { v2: 9.0, v3: 8.8 },
    severity: 'HIGH',
    vendors: { egret: ['egret-automations'] },
    cwes: ['CWE-1336', 'CWE-94'],
    affectedVersions: ['Egret Automations 2.0 - 2.5.3'],
    published: '2026-04-27T00:00:00Z',
    updated: '2026-04-30T00:00:00Z',
    references: [
      'https://egret.example/security/CVE-2024-48002',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-48002',
    ],
  },

  // ---------- Denial of service ----------
  {
    id: 'CVE-2024-48430',
    summary:
      'The username validation regex in Storky Auth exhibits catastrophic backtracking on strings that mix repeated groups, allowing an attacker to stall a request thread for several minutes with a crafted username.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { storky: ['storky-auth'] },
    cwes: ['CWE-1333'],
    affectedVersions: ['Storky Auth 1.2 - 1.6.0'],
    published: '2026-03-13T00:00:00Z',
    updated: '2026-03-15T00:00:00Z',
    references: [
      'https://storky.example/security/CVE-2024-48430',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-48430',
    ],
  },
  {
    id: 'CVE-2024-48711',
    summary:
      'The XML configuration parser in Ibis Manager expands entity references without limits, allowing an authenticated administrator to exhaust memory and crash the process by uploading a document that references nested entities.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { ibis: ['ibis-manager'] },
    cwes: ['CWE-776', 'CWE-400'],
    affectedVersions: ['Ibis Manager 4.0 - 4.2.5'],
    published: '2026-02-18T00:00:00Z',
    updated: '2026-02-20T00:00:00Z',
    references: [
      'https://ibis.example/security/CVE-2024-48711',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-48711',
    ],
  },
  {
    id: 'CVE-2024-48915',
    summary:
      'The zip extractor in Redshank Backup does not enforce a limit on the ratio of compressed to uncompressed size, letting a small crafted archive expand to fill available disk space during restore.',
    cvss: { v2: 4.0, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { redshank: ['redshank-backup'] },
    cwes: ['CWE-409'],
    affectedVersions: ['Redshank Backup 2.0 - 2.3.1'],
    published: '2026-01-22T00:00:00Z',
    updated: '2026-01-24T00:00:00Z',
    references: [
      'https://redshank.example/security/CVE-2024-48915',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-48915',
    ],
  },
  {
    id: 'CVE-2024-49110',
    summary:
      'The connection handler in Chachalaca MQ allocates a per-frame buffer sized from an untrusted length field before verifying the payload, letting an unauthenticated client exhaust broker memory by opening many connections that advertise large frames.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { chachalaca: ['chachalaca-mq'] },
    cwes: ['CWE-400', 'CWE-770'],
    affectedVersions: ['Chachalaca MQ 3.0 - 3.4.2'],
    published: '2026-04-13T00:00:00Z',
    updated: '2026-04-15T00:00:00Z',
    references: [
      'https://chachalaca.example/security/CVE-2024-49110',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-49110',
    ],
  },
  {
    id: 'CVE-2024-49404',
    summary:
      'The recursion depth limit for nested JSON objects in the Sanderling parser is missing, letting an attacker crash the process by sending a deeply nested payload that overflows the call stack.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { sanderling: ['sanderling-parser'] },
    cwes: ['CWE-674'],
    affectedVersions: ['Sanderling Parser 0.9 - 1.3.1'],
    published: '2026-03-01T00:00:00Z',
    updated: '2026-03-03T00:00:00Z',
    references: [
      'https://sanderling.example/security/CVE-2024-49404',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-49404',
    ],
  },

  // ---------- Kernel / drivers / hypervisor ----------
  {
    id: 'CVE-2024-49702',
    summary:
      'A race condition in the shared memory driver of Quokka Hypervisor allows a guest process to write to a page after its permissions have been downgraded, letting a guest escalate privileges within the guest kernel.',
    cvss: { v2: 6.9, v3: 7.0 },
    severity: 'HIGH',
    vendors: { quokka: ['quokka-hypervisor'] },
    cwes: ['CWE-362', 'CWE-284'],
    affectedVersions: ['Quokka Hypervisor 5.0 - 5.3.4'],
    published: '2026-05-06T00:00:00Z',
    updated: '2026-05-09T00:00:00Z',
    references: [
      'https://quokka.example/security/CVE-2024-49702',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-49702',
    ],
  },
  {
    id: 'CVE-2024-50003',
    summary:
      'An out-of-bounds write in the ioctl handler of the Numbat GPU driver occurs when a user-supplied command buffer omits the expected trailer, allowing a local unprivileged user to corrupt kernel memory and gain root privileges.',
    cvss: { v2: 7.2, v3: 7.8 },
    severity: 'HIGH',
    vendors: { numbat: ['numbat-gpu-driver'] },
    cwes: ['CWE-787'],
    affectedVersions: ['Numbat GPU Driver 470.10 - 495.29'],
    published: '2026-06-25T00:00:00Z',
    updated: '2026-06-28T00:00:00Z',
    references: [
      'https://numbat.example/security/CVE-2024-50003',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-50003',
    ],
  },
  {
    id: 'CVE-2024-50210',
    summary:
      'A missing capability check in the container runtime of Bandicoot Runtime allows a process inside an unprivileged container to attach to the host cgroup and read process listings from the host.',
    cvss: { v2: 4.6, v3: 7.8 },
    severity: 'HIGH',
    vendors: { bandicoot: ['bandicoot-runtime'] },
    cwes: ['CWE-250', 'CWE-269'],
    affectedVersions: ['Bandicoot Runtime 1.6 - 1.9.2'],
    published: '2026-04-01T00:00:00Z',
    updated: '2026-04-04T00:00:00Z',
    references: [
      'https://bandicoot.example/security/CVE-2024-50210',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-50210',
    ],
  },
  {
    id: 'CVE-2024-50508',
    summary:
      'A symlink race in the log rotation script of Wombat OS allows a local attacker who wins the race to redirect the truncation to arbitrary root-owned files.',
    cvss: { v2: 6.9, v3: 7.0 },
    severity: 'HIGH',
    vendors: { wombat: ['wombat-os'] },
    cwes: ['CWE-367', 'CWE-59'],
    affectedVersions: ['Wombat OS 22.04 - 24.04'],
    published: '2026-02-27T00:00:00Z',
    updated: '2026-03-01T00:00:00Z',
    references: [
      'https://wombat.example/security/CVE-2024-50508',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-50508',
    ],
  },

  // ---------- Network devices / VPN / IoT ----------
  {
    id: 'CVE-2024-50811',
    summary:
      'The web management interface of Nautilus VPN Appliance parses the URL path with a routine that treats path segments as case-insensitive, letting an unauthenticated attacker reach an internal diagnostic page normally restricted to administrators.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { nautilus: ['nautilus-vpn-appliance'] },
    cwes: ['CWE-863', 'CWE-288'],
    affectedVersions: ['Nautilus VPN Appliance 9.0 - 9.2.4'],
    published: '2026-06-20T00:00:00Z',
    updated: '2026-06-23T00:00:00Z',
    references: [
      'https://nautilus.example/security/CVE-2024-50811',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-50811',
    ],
  },
  {
    id: 'CVE-2024-51102',
    summary:
      'A command injection in the ping diagnostic tool of Squill SD-WAN concatenates the target host into a shell command, letting an authenticated administrator gain a shell on the appliance.',
    cvss: { v2: 9.0, v3: 7.2 },
    severity: 'HIGH',
    vendors: { squill: ['squill-sd-wan'] },
    cwes: ['CWE-78'],
    affectedVersions: ['Squill SD-WAN 6.0 - 6.2.5'],
    published: '2026-05-22T00:00:00Z',
    updated: '2026-05-25T00:00:00Z',
    references: [
      'https://squill.example/security/CVE-2024-51102',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-51102',
    ],
  },
  {
    id: 'CVE-2024-51340',
    summary:
      'The firmware update of Bristlebird Camera does not verify the digital signature on downloaded images, letting an attacker able to intercept the update channel install malicious firmware on any deployed camera.',
    cvss: { v2: 7.6, v3: 8.1 },
    severity: 'HIGH',
    vendors: { bristlebird: ['bristlebird-camera'] },
    cwes: ['CWE-347', 'CWE-345'],
    affectedVersions: ['Bristlebird Camera Firmware 1.0 - 3.2.1'],
    published: '2026-03-06T00:00:00Z',
    updated: '2026-03-09T00:00:00Z',
    references: [
      'https://bristlebird.example/security/CVE-2024-51340',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-51340',
    ],
  },
  {
    id: 'CVE-2024-51612',
    summary:
      'The Bluetooth pairing flow in Bandicoot Lock accepts a Just Works pairing without user confirmation when the peer advertises a specific IO capability, letting an attacker in radio range pair with the lock and unlock it.',
    cvss: { v2: 5.4, v3: 7.1 },
    severity: 'HIGH',
    vendors: { bandicoot: ['bandicoot-lock'] },
    cwes: ['CWE-287', 'CWE-1391'],
    affectedVersions: ['Bandicoot Lock Firmware 2.0 - 2.4.0'],
    published: '2026-04-17T00:00:00Z',
    updated: '2026-04-19T00:00:00Z',
    references: [
      'https://bandicoot.example/security/CVE-2024-51612',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-51612',
    ],
  },
  {
    id: 'CVE-2024-51955',
    summary:
      'The SSH server in Solitaire Router Firmware ships with a debug user whose password is derived from the device serial number using a public algorithm, letting an attacker who knows the serial number gain shell access.',
    cvss: { v2: 8.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { solitaire: ['solitaire-router-firmware'] },
    cwes: ['CWE-798', 'CWE-1391'],
    affectedVersions: ['Solitaire Router Firmware 5.0 - 5.3.2'],
    published: '2026-02-04T00:00:00Z',
    updated: '2026-02-07T00:00:00Z',
    references: [
      'https://solitaire.example/security/CVE-2024-51955',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-51955',
    ],
  },

  // ---------- Cloud / CI-CD / supply chain ----------
  {
    id: 'CVE-2024-52212',
    summary:
      'The pipeline runner in Trawler CI evaluates workflow strings that embed pull request titles, letting a contributor to a public repository execute arbitrary shell commands on the runner by opening a request with a crafted title.',
    cvss: { v2: 6.5, v3: 8.8 },
    severity: 'HIGH',
    vendors: { trawler: ['trawler-ci'] },
    cwes: ['CWE-94', 'CWE-1336'],
    affectedVersions: ['Trawler CI 4.0 - 4.3.1'],
    published: '2026-06-08T00:00:00Z',
    updated: '2026-06-11T00:00:00Z',
    references: [
      'https://trawler.example/security/CVE-2024-52212',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-52212',
    ],
  },
  {
    id: 'CVE-2024-52508',
    summary:
      'The dependency resolver in Skate Package Manager prefers a public registry over configured private registries when versions match, letting an attacker publish a package with the same name and higher version to trigger a dependency confusion attack.',
    cvss: { v2: 6.8, v3: 8.6 },
    severity: 'HIGH',
    vendors: { skate: ['skate-package-manager'] },
    cwes: ['CWE-427', 'CWE-1357'],
    affectedVersions: ['Skate Package Manager 3.0 - 3.5.2'],
    published: '2026-05-28T00:00:00Z',
    updated: '2026-05-31T00:00:00Z',
    references: [
      'https://skate.example/security/CVE-2024-52508',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-52508',
    ],
  },
  {
    id: 'CVE-2024-52812',
    summary:
      'Build artifacts uploaded by Ridley CI to object storage are written with a URL that includes the build number but no random component, letting an attacker who can enumerate build numbers download artifacts they should not have access to.',
    cvss: { v2: 4.3, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { ridley: ['ridley-ci'] },
    cwes: ['CWE-340', 'CWE-284'],
    affectedVersions: ['Ridley CI 2.1 - 2.4.3'],
    published: '2026-01-12T00:00:00Z',
    updated: '2026-01-15T00:00:00Z',
    references: [
      'https://ridley.example/security/CVE-2024-52812',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-52812',
    ],
  },
  {
    id: 'CVE-2024-53020',
    summary:
      'The Kubernetes admission controller in Wagtail Policy caches decisions keyed only by the resource name, letting a user who first submits a benign object and then edits it bypass policy for subsequent updates while the cache entry is warm.',
    cvss: { v2: 5.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { wagtail: ['wagtail-policy'] },
    cwes: ['CWE-524', 'CWE-284'],
    affectedVersions: ['Wagtail Policy 1.3 - 1.6.1'],
    published: '2026-06-01T00:00:00Z',
    updated: '2026-06-03T00:00:00Z',
    references: [
      'https://wagtail.example/security/CVE-2024-53020',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-53020',
    ],
  },

  // ---------- Databases ----------
  {
    id: 'CVE-2024-53311',
    summary:
      'The materialized view refresh in Merganser DB runs under the definer\'s privileges without checking that the invoker has the right to read the underlying tables, letting a low-privilege user read data through a view they should not be able to query directly.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { merganser: ['merganser-db'] },
    cwes: ['CWE-269', 'CWE-863'],
    affectedVersions: ['Merganser DB 14.0 - 14.3.2'],
    published: '2026-05-02T00:00:00Z',
    updated: '2026-05-05T00:00:00Z',
    references: [
      'https://merganser.example/security/CVE-2024-53311',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-53311',
    ],
  },
  {
    id: 'CVE-2024-53605',
    summary:
      'The replication protocol in Loon Cluster accepts unauthenticated peer connections on the replication port when the shared secret is empty, letting anyone with network reach replicate cluster data or inject writes.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { loon: ['loon-cluster'] },
    cwes: ['CWE-306'],
    affectedVersions: ['Loon Cluster 3.0 - 3.4.1'],
    published: '2026-03-21T00:00:00Z',
    updated: '2026-03-24T00:00:00Z',
    references: [
      'https://loon.example/security/CVE-2024-53605',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-53605',
    ],
  },
  {
    id: 'CVE-2024-53812',
    summary:
      'The stored procedure engine in Petrel SQL evaluates dynamic SQL constructed with the CONCAT operator when procedures are marked SECURITY DEFINER, letting a low-privilege caller inject SQL that runs as the procedure owner.',
    cvss: { v2: 7.5, v3: 8.8 },
    severity: 'HIGH',
    vendors: { petrel: ['petrel-sql'] },
    cwes: ['CWE-89'],
    affectedVersions: ['Petrel SQL 12.0 - 12.4.3'],
    published: '2026-06-16T00:00:00Z',
    updated: '2026-06-19T00:00:00Z',
    references: [
      'https://petrel.example/security/CVE-2024-53812',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-53812',
    ],
  },

  // ---------- Mobile / SDKs ----------
  {
    id: 'CVE-2024-54001',
    summary:
      'The deep link handler in the Cinnamon SDK for Android accepts intents from any app on the device and forwards the payload to a WebView with JavaScript enabled, letting a malicious app inject script into the host application.',
    cvss: { v2: 5.4, v3: 6.3 },
    severity: 'MEDIUM',
    vendors: { cinnamon: ['cinnamon-android-sdk'] },
    cwes: ['CWE-926', 'CWE-79'],
    affectedVersions: ['Cinnamon Android SDK 4.2 - 4.6.1'],
    published: '2026-04-20T00:00:00Z',
    updated: '2026-04-22T00:00:00Z',
    references: [
      'https://cinnamon.example/security/CVE-2024-54001',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-54001',
    ],
  },
  {
    id: 'CVE-2024-54212',
    summary:
      'The Cardamom iOS SDK stores OAuth refresh tokens in NSUserDefaults instead of the Keychain, letting a backup extraction or a shared jailbroken device expose tokens to other apps.',
    cvss: { v2: 4.0, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { cardamom: ['cardamom-ios-sdk'] },
    cwes: ['CWE-312', 'CWE-922'],
    affectedVersions: ['Cardamom iOS SDK 3.0 - 3.3.4'],
    published: '2026-02-11T00:00:00Z',
    updated: '2026-02-13T00:00:00Z',
    references: [
      'https://cardamom.example/security/CVE-2024-54212',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-54212',
    ],
  },
  {
    id: 'CVE-2024-54530',
    summary:
      'The push notification handler in the Saffron SDK for Android does not verify that broadcast intents come from the notification service, letting any local app trigger arbitrary callbacks in the host application.',
    cvss: { v2: 4.3, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { saffron: ['saffron-android-sdk'] },
    cwes: ['CWE-940', 'CWE-284'],
    affectedVersions: ['Saffron Android SDK 2.1 - 2.5.0'],
    published: '2026-03-14T00:00:00Z',
    updated: '2026-03-16T00:00:00Z',
    references: [
      'https://saffron.example/security/CVE-2024-54530',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-54530',
    ],
  },

  // ---------- Web app misc ----------
  {
    id: 'CVE-2024-54810',
    summary:
      'The password reset email sent by Grouse Portal includes the reset URL in the body without a hash fragment separator, and the token is transmitted to a third-party analytics service through the Referer header when the user clicks it.',
    cvss: { v2: 4.3, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { grouse: ['grouse-portal'] },
    cwes: ['CWE-200'],
    affectedVersions: ['Grouse Portal 1.0 - 1.4.2'],
    published: '2026-01-05T00:00:00Z',
    updated: '2026-01-07T00:00:00Z',
    references: [
      'https://grouse.example/security/CVE-2024-54810',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-54810',
    ],
  },
  {
    id: 'CVE-2024-55020',
    summary:
      'Session cookies issued by Booby Portal are set without the HttpOnly attribute, letting a cross-site scripting flaw in any part of the application be escalated to full account takeover.',
    cvss: { v2: 4.3, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { boobyworks: ['booby-portal'] },
    cwes: ['CWE-1004'],
    affectedVersions: ['Booby Portal 5.0 - 5.2.3'],
    published: '2026-02-22T00:00:00Z',
    updated: '2026-02-24T00:00:00Z',
    references: [
      'https://boobyworks.example/security/CVE-2024-55020',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-55020',
    ],
  },
  {
    id: 'CVE-2024-55311',
    summary:
      'The CORS policy of Skimmer API responds with an Access-Control-Allow-Origin header that reflects the Origin header of the request together with Access-Control-Allow-Credentials true, letting any origin read authenticated responses on behalf of a logged-in user.',
    cvss: { v2: 5.8, v3: 7.4 },
    severity: 'HIGH',
    vendors: { skimmer: ['skimmer-api'] },
    cwes: ['CWE-346', 'CWE-942'],
    affectedVersions: ['Skimmer API 3.0 - 3.4.1'],
    published: '2026-05-16T00:00:00Z',
    updated: '2026-05-19T00:00:00Z',
    references: [
      'https://skimmer.example/security/CVE-2024-55311',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-55311',
    ],
  },
  {
    id: 'CVE-2024-55605',
    summary:
      'The GraphQL endpoint of Vireo Storefront resolves nested queries without a depth limit, letting an unauthenticated caller submit a self-referential query that consumes CPU until the resolver times out.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { vireo: ['vireo-storefront'] },
    cwes: ['CWE-770', 'CWE-674'],
    affectedVersions: ['Vireo Storefront 2.0 - 2.3.4'],
    published: '2026-06-12T00:00:00Z',
    updated: '2026-06-14T00:00:00Z',
    references: [
      'https://vireo.example/security/CVE-2024-55605',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-55605',
    ],
  },
  {
    id: 'CVE-2024-55890',
    summary:
      'The file upload handler in Snipe Editor accepts SVG images without stripping script elements, letting any user store a payload that runs in the browsers of viewers with permission to preview the asset.',
    cvss: { v2: 4.3, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { snipe: ['snipe-editor'] },
    cwes: ['CWE-79', 'CWE-434'],
    affectedVersions: ['Snipe Editor 1.9 - 2.1.3'],
    published: '2026-04-09T00:00:00Z',
    updated: '2026-04-11T00:00:00Z',
    references: [
      'https://snipe.example/security/CVE-2024-55890',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-55890',
    ],
  },
  {
    id: 'CVE-2024-56102',
    summary:
      'The account merge feature in Whimbrel Identity does not verify that the caller controls the target email address, letting an attacker who knows a victim\'s email address absorb their account into an attacker-controlled one.',
    cvss: { v2: 7.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { whimbrel: ['whimbrel-identity'] },
    cwes: ['CWE-287', 'CWE-863'],
    affectedVersions: ['Whimbrel Identity 4.0 - 4.2.1'],
    published: '2026-03-17T00:00:00Z',
    updated: '2026-03-19T00:00:00Z',
    references: [
      'https://whimbrel.example/security/CVE-2024-56102',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-56102',
    ],
  },
  {
    id: 'CVE-2024-56413',
    summary:
      'The two-factor enrollment endpoint in Coot Auth allows a caller who has provided a valid password to disable two-factor authentication without an additional confirmation step, weakening account protection if the password is later compromised.',
    cvss: { v2: 4.0, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { coot: ['coot-auth'] },
    cwes: ['CWE-308', 'CWE-287'],
    affectedVersions: ['Coot Auth 3.0 - 3.3.2'],
    published: '2026-05-09T00:00:00Z',
    updated: '2026-05-12T00:00:00Z',
    references: [
      'https://coot.example/security/CVE-2024-56413',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-56413',
    ],
  },
  {
    id: 'CVE-2024-56720',
    summary:
      'The SAML response validator in Snowfinch SSO does not verify that the Assertion signature covers the SubjectConfirmation element, letting an attacker who obtains any signed assertion for the same IdP impersonate arbitrary users by wrapping the assertion.',
    cvss: { v2: 9.0, v3: 8.1 },
    severity: 'HIGH',
    vendors: { snowfinch: ['snowfinch-sso'] },
    cwes: ['CWE-347', 'CWE-287'],
    affectedVersions: ['Snowfinch SSO 2.4 - 2.7.1'],
    published: '2026-04-14T00:00:00Z',
    updated: '2026-04-17T00:00:00Z',
    references: [
      'https://snowfinch.example/security/CVE-2024-56720',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-56720',
    ],
  },
  {
    id: 'CVE-2024-57002',
    summary:
      'The GraphQL introspection endpoint of Puffin API remains enabled in production builds and requires no authentication, letting an unauthenticated caller enumerate the entire schema including deprecated internal fields.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { puffin: ['puffin-api'] },
    cwes: ['CWE-200', 'CWE-1188'],
    affectedVersions: ['Puffin API 1.0 - 1.4.2'],
    published: '2026-01-29T00:00:00Z',
    updated: '2026-01-31T00:00:00Z',
    references: [
      'https://puffin.example/security/CVE-2024-57002',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-57002',
    ],
  },
  {
    id: 'CVE-2024-57315',
    summary:
      'The admin console of Kite CDN returns different response times for existing and non-existing tenant identifiers, letting an unauthenticated caller enumerate customer tenants with a timing side channel.',
    cvss: { v2: 3.5, v3: 3.7 },
    severity: 'LOW',
    vendors: { kite: ['kite-cdn'] },
    cwes: ['CWE-208', 'CWE-203'],
    affectedVersions: ['Kite CDN 4.0 - 4.2.1'],
    published: '2026-02-06T00:00:00Z',
    updated: '2026-02-08T00:00:00Z',
    references: [
      'https://kite.example/security/CVE-2024-57315',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-57315',
    ],
  },
  {
    id: 'CVE-2024-57601',
    summary:
      'The reset link generator in Sparrow Portal appends the token as a URL parameter, causing tokens to be recorded in the access logs of any proxy on the path between the browser and the application.',
    cvss: { v2: 3.5, v3: 3.7 },
    severity: 'LOW',
    vendors: { sparrow: ['sparrow-portal'] },
    cwes: ['CWE-598', 'CWE-532'],
    affectedVersions: ['Sparrow Portal 2.0 - 2.4.0'],
    published: '2026-01-19T00:00:00Z',
    updated: '2026-01-21T00:00:00Z',
    references: [
      'https://sparrow.example/security/CVE-2024-57601',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-57601',
    ],
  },
  {
    id: 'CVE-2024-57812',
    summary:
      'The audit log endpoint of Marbled Console does not require any privilege to read entries related to other users, letting a low-privilege user browse the sensitive operation history of the entire tenant.',
    cvss: { v2: 4.0, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { marbled: ['marbled-console'] },
    cwes: ['CWE-284', 'CWE-200'],
    affectedVersions: ['Marbled Console 1.2 - 1.5.4'],
    published: '2026-03-28T00:00:00Z',
    updated: '2026-03-30T00:00:00Z',
    references: [
      'https://marbled.example/security/CVE-2024-57812',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-57812',
    ],
  },

  // ---------- Mixed high-value classes ----------
  {
    id: 'CVE-2024-58011',
    summary:
      'The GraphQL mutation for updating a user profile in Skua Marketplace does not check the caller\'s role when the isAdmin field is present in the payload, letting any authenticated user grant themselves administrator privileges.',
    cvss: { v2: 6.5, v3: 8.8 },
    severity: 'HIGH',
    vendors: { skua: ['skua-marketplace'] },
    cwes: ['CWE-269', 'CWE-863'],
    affectedVersions: ['Skua Marketplace 3.0 - 3.2.4'],
    published: '2026-05-25T00:00:00Z',
    updated: '2026-05-28T00:00:00Z',
    references: [
      'https://skua.example/security/CVE-2024-58011',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-58011',
    ],
  },
  {
    id: 'CVE-2024-58322',
    summary:
      'The Redis cache configuration for Grebe Search stores query results keyed by a hash of the SQL string only, without a tenant identifier, letting a query issued for one tenant return the cached result from another tenant.',
    cvss: { v2: 6.5, v3: 7.6 },
    severity: 'HIGH',
    vendors: { grebe: ['grebe-search'] },
    cwes: ['CWE-524', 'CWE-1230'],
    affectedVersions: ['Grebe Search 2.0 - 2.2.3'],
    published: '2026-06-04T00:00:00Z',
    updated: '2026-06-06T00:00:00Z',
    references: [
      'https://grebe.example/security/CVE-2024-58322',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-58322',
    ],
  },
  {
    id: 'CVE-2024-58611',
    summary:
      'The metrics endpoint of Tanager Runtime exposes environment variables of the running process, including database credentials, to any client that can reach the monitoring port.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { tanager: ['tanager-runtime'] },
    cwes: ['CWE-200', 'CWE-497'],
    affectedVersions: ['Tanager Runtime 1.0 - 1.6.1'],
    published: '2026-03-05T00:00:00Z',
    updated: '2026-03-07T00:00:00Z',
    references: [
      'https://tanager.example/security/CVE-2024-58611',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-58611',
    ],
  },
  {
    id: 'CVE-2024-58911',
    summary:
      'The SFTP subsystem of Kestrel Gateway does not enforce chroot for accounts marked as restricted, letting a restricted user traverse the filesystem to read arbitrary files readable by the daemon user.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { kestrel: ['kestrel-gateway'] },
    cwes: ['CWE-22', 'CWE-284'],
    affectedVersions: ['Kestrel Gateway 5.0 - 5.3.4'],
    published: '2026-02-15T00:00:00Z',
    updated: '2026-02-17T00:00:00Z',
    references: [
      'https://kestrel.example/security/CVE-2024-58911',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-58911',
    ],
  },
  {
    id: 'CVE-2024-59103',
    summary:
      'The activation code check in Auk POS uses a non-constant-time comparison, letting a local attacker with terminal access recover the activation code byte-by-byte by observing the timing of the compare loop.',
    cvss: { v2: 4.6, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { auk: ['auk-pos'] },
    cwes: ['CWE-208'],
    affectedVersions: ['Auk POS 1.0 - 1.3.2'],
    published: '2026-01-08T00:00:00Z',
    updated: '2026-01-10T00:00:00Z',
    references: [
      'https://auk.example/security/CVE-2024-59103',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-59103',
    ],
  },
  {
    id: 'CVE-2024-59415',
    summary:
      'The Node.js server in Puffin Studio uses the child_process.exec API to compile user projects, passing project names through the shell, letting an authenticated user run arbitrary commands as the server user with a crafted project name.',
    cvss: { v2: 9.0, v3: 8.8 },
    severity: 'HIGH',
    vendors: { puffin: ['puffin-studio'] },
    cwes: ['CWE-78'],
    affectedVersions: ['Puffin Studio 4.1 - 4.4.0'],
    published: '2026-06-07T00:00:00Z',
    updated: '2026-06-10T00:00:00Z',
    references: [
      'https://puffin.example/security/CVE-2024-59415',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-59415',
    ],
  },
  {
    id: 'CVE-2024-59702',
    summary:
      'The audit trail in Bittern Vault does not record failed access attempts, letting an attacker probe for valid resource identifiers without leaving traces reviewable by the tenant administrator.',
    cvss: { v2: 2.6, v3: 3.1 },
    severity: 'LOW',
    vendors: { bittern: ['bittern-vault'] },
    cwes: ['CWE-778'],
    affectedVersions: ['Bittern Vault 2.0 - 2.2.4'],
    published: '2026-04-06T00:00:00Z',
    updated: '2026-04-08T00:00:00Z',
    references: [
      'https://bittern.example/security/CVE-2024-59702',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-59702',
    ],
  },
  {
    id: 'CVE-2024-59911',
    summary:
      'The dashboard export in Merlin Analytics builds CSV files by concatenating field values without escaping formula prefix characters, letting an attacker who can supply a field value cause the exported spreadsheet to execute a formula when opened.',
    cvss: { v2: 4.4, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { merlin: ['merlin-analytics'] },
    cwes: ['CWE-1236'],
    affectedVersions: ['Merlin Analytics 6.0 - 7.2.3'],
    published: '2026-02-28T00:00:00Z',
    updated: '2026-03-02T00:00:00Z',
    references: [
      'https://merlin.example/security/CVE-2024-59911',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-59911',
    ],
  },
  {
    id: 'CVE-2024-60112',
    summary:
      'The XML parser in Willet ESB accepts DOCTYPE declarations in messages received from federated peers, letting a malicious peer trigger a billion-laughs style expansion that exhausts memory on the receiving broker.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { willet: ['willet-esb'] },
    cwes: ['CWE-776', 'CWE-400'],
    affectedVersions: ['Willet ESB 7.0 - 8.2.1'],
    published: '2026-06-13T00:00:00Z',
    updated: '2026-06-15T00:00:00Z',
    references: [
      'https://willet.example/security/CVE-2024-60112',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-60112',
    ],
  },
  {
    id: 'CVE-2024-60420',
    summary:
      'The plugin sandbox in Sanderling IDE relies on the plugin declaring its own permissions, and an attacker who ships a plugin with an under-declared manifest can access filesystem APIs from the sandbox worker.',
    cvss: { v2: 6.8, v3: 7.8 },
    severity: 'HIGH',
    vendors: { sanderling: ['sanderling-ide'] },
    cwes: ['CWE-693', 'CWE-284'],
    affectedVersions: ['Sanderling IDE 2.0 - 2.3.1'],
    published: '2026-05-04T00:00:00Z',
    updated: '2026-05-07T00:00:00Z',
    references: [
      'https://sanderling.example/security/CVE-2024-60420',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-60420',
    ],
  },
  {
    id: 'CVE-2024-60711',
    summary:
      'The IPsec IKEv2 responder in Nautilus VPN Appliance panics on an authentication payload whose identity type is set to a reserved value, letting an unauthenticated attacker on the internet crash the VPN process repeatedly.',
    cvss: { v2: 7.8, v3: 7.5 },
    severity: 'HIGH',
    vendors: { nautilus: ['nautilus-vpn-appliance'] },
    cwes: ['CWE-20', 'CWE-754'],
    affectedVersions: ['Nautilus VPN Appliance 9.0 - 9.2.5'],
    published: '2026-06-29T00:00:00Z',
    updated: '2026-07-02T00:00:00Z',
    references: [
      'https://nautilus.example/security/CVE-2024-60711',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-60711',
    ],
  },
  {
    id: 'CVE-2024-61022',
    summary:
      'The autoupdate client in Cinnamon Desktop verifies the update signature after writing the new binary to disk, letting a local attacker who can race the verification replace the file between check and execution.',
    cvss: { v2: 6.9, v3: 7.0 },
    severity: 'HIGH',
    vendors: { cinnamon: ['cinnamon-desktop'] },
    cwes: ['CWE-367'],
    affectedVersions: ['Cinnamon Desktop 5.0 - 5.4.2'],
    published: '2026-05-31T00:00:00Z',
    updated: '2026-06-03T00:00:00Z',
    references: [
      'https://cinnamon.example/security/CVE-2024-61022',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-61022',
    ],
  },
  {
    id: 'CVE-2024-61321',
    summary:
      'The template loader in Cardinal CMS caches rendered fragments in a shared directory writable by all site processes, letting one tenant plant a cache entry that is served to visitors of another tenant.',
    cvss: { v2: 6.5, v3: 7.4 },
    severity: 'HIGH',
    vendors: { cardinal: ['cardinal-cms'] },
    cwes: ['CWE-732', 'CWE-284'],
    affectedVersions: ['Cardinal CMS 4.0 - 4.3.1'],
    published: '2026-04-24T00:00:00Z',
    updated: '2026-04-27T00:00:00Z',
    references: [
      'https://cardinal.example/security/CVE-2024-61321',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-61321',
    ],
  },
  {
    id: 'CVE-2024-61604',
    summary:
      'The provisioning agent for Basalt Meter accepts firmware images signed by any certificate chained to a permissive default trust store, letting an attacker with a certificate from a low-assurance CA install unauthorised firmware.',
    cvss: { v2: 7.6, v3: 8.1 },
    severity: 'HIGH',
    vendors: { basalt: ['basalt-meter'] },
    cwes: ['CWE-295', 'CWE-345'],
    affectedVersions: ['Basalt Meter Firmware 2.0 - 2.4.1'],
    published: '2026-03-11T00:00:00Z',
    updated: '2026-03-13T00:00:00Z',
    references: [
      'https://basalt.example/security/CVE-2024-61604',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-61604',
    ],
  },
  {
    id: 'CVE-2024-61812',
    summary:
      'The OAuth authorisation endpoint of Cormorant Directory accepts wildcard subdomains in the registered redirect URI, letting an attacker who controls any subdomain of a client\'s registered domain steal authorisation codes.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { cormorant: ['cormorant-directory'] },
    cwes: ['CWE-601', 'CWE-346'],
    affectedVersions: ['Cormorant Directory 2.0 - 2.5.4'],
    published: '2026-06-21T00:00:00Z',
    updated: '2026-06-24T00:00:00Z',
    references: [
      'https://cormorant.example/security/CVE-2024-61812',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-61812',
    ],
  },
  {
    id: 'CVE-2024-62002',
    summary:
      'The mobile web view in Bittern Chat loads remote URLs with allowFileAccess enabled, letting a page rendered from an untrusted origin read the app\'s private files through file: URLs.',
    cvss: { v2: 5.4, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { bittern: ['bittern-chat'] },
    cwes: ['CWE-829', 'CWE-200'],
    affectedVersions: ['Bittern Chat Mobile 3.5 - 4.0.3'],
    published: '2026-04-16T00:00:00Z',
    updated: '2026-04-18T00:00:00Z',
    references: [
      'https://bittern.example/security/CVE-2024-62002',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-62002',
    ],
  },
  {
    id: 'CVE-2024-62311',
    summary:
      'The API client in Talus Sync trusts the X-Forwarded-For header when logging authentication events, letting an attacker who can control that header forge the source IP recorded for their actions.',
    cvss: { v2: 3.5, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { talus: ['talus-sync'] },
    cwes: ['CWE-345', 'CWE-807'],
    affectedVersions: ['Talus Sync 3.4 - 3.6.0'],
    published: '2026-05-14T00:00:00Z',
    updated: '2026-05-16T00:00:00Z',
    references: [
      'https://talus.example/security/CVE-2024-62311',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-62311',
    ],
  },
  {
    id: 'CVE-2024-62620',
    summary:
      'The SMB client in Wombat OS falls back to NTLMv1 authentication when the server advertises no other options, letting an on-path attacker capture credentials suitable for offline cracking.',
    cvss: { v2: 5.0, v3: 7.4 },
    severity: 'HIGH',
    vendors: { wombat: ['wombat-os'] },
    cwes: ['CWE-757', 'CWE-327'],
    affectedVersions: ['Wombat OS 22.04 - 24.10'],
    published: '2026-02-19T00:00:00Z',
    updated: '2026-02-22T00:00:00Z',
    references: [
      'https://wombat.example/security/CVE-2024-62620',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-62620',
    ],
  },
  {
    id: 'CVE-2024-62901',
    summary:
      'The container image loader in Bandicoot Runtime does not verify manifest digests when a caller supplies a manifest reference by tag, letting a registry able to change the tag substitute an image without detection.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { bandicoot: ['bandicoot-runtime'] },
    cwes: ['CWE-345', 'CWE-494'],
    affectedVersions: ['Bandicoot Runtime 1.7 - 1.9.3'],
    published: '2026-06-26T00:00:00Z',
    updated: '2026-06-29T00:00:00Z',
    references: [
      'https://bandicoot.example/security/CVE-2024-62901',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-62901',
    ],
  },
  {
    id: 'CVE-2024-63102',
    summary:
      'The support diagnostic bundle produced by Kelp Firewall includes the plaintext of the current admin password in the exported configuration snapshot, exposing credentials to anyone with access to the bundle.',
    cvss: { v2: 4.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { kelp: ['kelp-firewall'] },
    cwes: ['CWE-312', 'CWE-200'],
    affectedVersions: ['Kelp Firewall 11.0 - 12.3.5'],
    published: '2026-05-17T00:00:00Z',
    updated: '2026-05-20T00:00:00Z',
    references: [
      'https://kelp.example/security/CVE-2024-63102',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-63102',
    ],
  },
  {
    id: 'CVE-2024-63410',
    summary:
      'The scheduled task engine in Cirrus Wallet stores callback URLs without validating them against an allowlist, letting an authenticated user configure tasks that send POST requests to arbitrary internal endpoints from the scheduler.',
    cvss: { v2: 6.5, v3: 7.2 },
    severity: 'HIGH',
    vendors: { cirrus: ['cirrus-wallet'] },
    cwes: ['CWE-918'],
    affectedVersions: ['Cirrus Wallet 2.3 - 2.4.2'],
    published: '2026-06-30T00:00:00Z',
    updated: '2026-07-02T00:00:00Z',
    references: [
      'https://cirrus.example/security/CVE-2024-63410',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-63410',
    ],
  },
  {
    id: 'CVE-2024-63720',
    summary:
      'The comment API in Fernwood CMS accepts markdown that renders arbitrary iframe tags after upgrading to the 3.10 series, reintroducing a cross-site scripting vector that had been closed in 3.9.4.',
    cvss: { v2: 4.3, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { fernwood: ['fernwood-cms'] },
    cwes: ['CWE-79', 'CWE-1104'],
    affectedVersions: ['Fernwood CMS 3.10 - 3.10.2'],
    published: '2026-04-10T00:00:00Z',
    updated: '2026-04-13T00:00:00Z',
    references: [
      'https://fernwood.example/security/CVE-2024-63720',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-63720',
    ],
  },
  {
    id: 'CVE-2024-64020',
    summary:
      'The scheduled job runner in Godwit Analytics interpolates job names into an SSH command line without quoting, letting an authenticated administrator inject SSH options that redirect traffic through an attacker-controlled host.',
    cvss: { v2: 6.5, v3: 7.2 },
    severity: 'HIGH',
    vendors: { godwit: ['godwit-analytics'] },
    cwes: ['CWE-88'],
    affectedVersions: ['Godwit Analytics 6.2 - 6.4.2'],
    published: '2026-05-26T00:00:00Z',
    updated: '2026-05-29T00:00:00Z',
    references: [
      'https://godwit.example/security/CVE-2024-64020',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-64020',
    ],
  },
  {
    id: 'CVE-2024-64320',
    summary:
      'The plugin registry check in Chukar CMS trusts an X-Signature header sent by the plugin marketplace client, letting an on-path attacker who can substitute the response install unauthorised plugins.',
    cvss: { v2: 6.8, v3: 7.5 },
    severity: 'HIGH',
    vendors: { chukar: ['chukar-cms'] },
    cwes: ['CWE-345', 'CWE-494'],
    affectedVersions: ['Chukar CMS 3.3 - 3.4.2'],
    published: '2026-04-19T00:00:00Z',
    updated: '2026-04-21T00:00:00Z',
    references: [
      'https://chukar.example/security/CVE-2024-64320',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-64320',
    ],
  },
  {
    id: 'CVE-2024-64611',
    summary:
      'The device pairing QR code emitted by Bandicoot Lock includes the long-lived pairing secret in cleartext, letting anyone who photographs the code register as an owner of the lock.',
    cvss: { v2: 5.4, v3: 6.8 },
    severity: 'MEDIUM',
    vendors: { bandicoot: ['bandicoot-lock'] },
    cwes: ['CWE-319', 'CWE-522'],
    affectedVersions: ['Bandicoot Lock Firmware 2.0 - 2.4.1'],
    published: '2026-03-23T00:00:00Z',
    updated: '2026-03-26T00:00:00Z',
    references: [
      'https://bandicoot.example/security/CVE-2024-64611',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-64611',
    ],
  },
  {
    id: 'CVE-2024-64912',
    summary:
      'The recovery mode of Solitaire Router Firmware exposes a UART serial console with root shell access when the reset button is held during boot, letting an attacker with physical access modify system files.',
    cvss: { v2: 4.6, v3: 6.8 },
    severity: 'MEDIUM',
    vendors: { solitaire: ['solitaire-router-firmware'] },
    cwes: ['CWE-1263', 'CWE-1233'],
    affectedVersions: ['Solitaire Router Firmware 5.0 - 5.3.3'],
    published: '2026-02-12T00:00:00Z',
    updated: '2026-02-14T00:00:00Z',
    references: [
      'https://solitaire.example/security/CVE-2024-64912',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-64912',
    ],
  },
  {
    id: 'CVE-2024-65220',
    summary:
      'The Elasticsearch integration in Grebe Observability configures the client with sniff-on-connection enabled and no host allowlist, letting a compromised cluster node redirect queries and result data to an attacker-controlled host.',
    cvss: { v2: 5.8, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { grebe: ['grebe-observability'] },
    cwes: ['CWE-345', 'CWE-829'],
    affectedVersions: ['Grebe Observability 1.4 - 1.5.1'],
    published: '2026-03-09T00:00:00Z',
    updated: '2026-03-11T00:00:00Z',
    references: [
      'https://grebe.example/security/CVE-2024-65220',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-65220',
    ],
  },
  {
    id: 'CVE-2024-65510',
    summary:
      'The API rate limiter in Skimmer API keys buckets on the session cookie only, letting an unauthenticated attacker who rotates cookies bypass abuse controls on the login endpoint.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { skimmer: ['skimmer-api'] },
    cwes: ['CWE-799', 'CWE-807'],
    affectedVersions: ['Skimmer API 3.2 - 3.4.2'],
    published: '2026-06-05T00:00:00Z',
    updated: '2026-06-07T00:00:00Z',
    references: [
      'https://skimmer.example/security/CVE-2024-65510',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-65510',
    ],
  },
  {
    id: 'CVE-2024-65820',
    summary:
      'The audit log viewer in Petrel SQL renders SQL statements without escaping, letting a user who submits crafted SQL comments plant HTML that runs when a database administrator views the log through the web UI.',
    cvss: { v2: 3.5, v3: 4.8 },
    severity: 'MEDIUM',
    vendors: { petrel: ['petrel-sql'] },
    cwes: ['CWE-79'],
    affectedVersions: ['Petrel SQL 12.2 - 12.4.3'],
    published: '2026-05-19T00:00:00Z',
    updated: '2026-05-21T00:00:00Z',
    references: [
      'https://petrel.example/security/CVE-2024-65820',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-65820',
    ],
  },
  {
    id: 'CVE-2024-66020',
    summary:
      'The multipart request parser in Sanderling Parser copies each field into a hash map without a total-size limit, letting an unauthenticated caller upload a request with millions of tiny fields to exhaust memory.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { sanderling: ['sanderling-parser'] },
    cwes: ['CWE-770'],
    affectedVersions: ['Sanderling Parser 1.0 - 1.3.2'],
    published: '2026-04-03T00:00:00Z',
    updated: '2026-04-05T00:00:00Z',
    references: [
      'https://sanderling.example/security/CVE-2024-66020',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-66020',
    ],
  },
  {
    id: 'CVE-2024-66321',
    summary:
      'The CSV import routine of Ledgerly ERP interprets negative row identifiers by wrapping to the maximum value, letting an authenticated user overwrite arbitrary rows through the import feature.',
    cvss: { v2: 6.5, v3: 7.1 },
    severity: 'HIGH',
    vendors: { ledgerly: ['ledgerly-erp'] },
    cwes: ['CWE-190', 'CWE-284'],
    affectedVersions: ['Ledgerly ERP 6.3 - 6.4.3'],
    published: '2026-01-25T00:00:00Z',
    updated: '2026-01-27T00:00:00Z',
    references: [
      'https://ledgerly.example/security/CVE-2024-66321',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-66321',
    ],
  },
  {
    id: 'CVE-2024-66611',
    summary:
      'The gRPC handler in Loon Cluster accepts arbitrarily large protobuf messages before checking authentication, letting an unauthenticated attacker exhaust memory on cluster nodes by streaming a single oversized message.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { loon: ['loon-cluster'] },
    cwes: ['CWE-770', 'CWE-400'],
    affectedVersions: ['Loon Cluster 3.2 - 3.4.2'],
    published: '2026-06-02T00:00:00Z',
    updated: '2026-06-04T00:00:00Z',
    references: [
      'https://loon.example/security/CVE-2024-66611',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-66611',
    ],
  },
  {
    id: 'CVE-2024-66920',
    summary:
      'The migration runner in Merganser DB executes SQL files in lexicographic order, but the CLI accepts arbitrary file paths that are not restricted to the migrations directory, letting an operator with shell access apply attacker-supplied SQL as part of a routine deploy.',
    cvss: { v2: 6.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { merganser: ['merganser-db'] },
    cwes: ['CWE-73', 'CWE-22'],
    affectedVersions: ['Merganser DB 14.1 - 14.3.3'],
    published: '2026-05-10T00:00:00Z',
    updated: '2026-05-13T00:00:00Z',
    references: [
      'https://merganser.example/security/CVE-2024-66920',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-66920',
    ],
  },
  {
    id: 'CVE-2024-67210',
    summary:
      'The billing webhook receiver in Vireo Storefront verifies the sender only by the presence of a signature header, without validating the signature bytes, letting an attacker inject fake payment confirmations.',
    cvss: { v2: 7.5, v3: 9.1 },
    severity: 'CRITICAL',
    vendors: { vireo: ['vireo-storefront'] },
    cwes: ['CWE-345', 'CWE-347'],
    affectedVersions: ['Vireo Storefront 2.2 - 2.3.4'],
    published: '2026-06-17T00:00:00Z',
    updated: '2026-06-20T00:00:00Z',
    references: [
      'https://vireo.example/security/CVE-2024-67210',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-67210',
    ],
  },
  {
    id: 'CVE-2024-67512',
    summary:
      'The desktop client of Cinnamon Desktop registers a custom URI scheme that passes arguments to the installed application without prompting the user, letting a webpage open documents that trigger further code paths.',
    cvss: { v2: 4.3, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { cinnamon: ['cinnamon-desktop'] },
    cwes: ['CWE-939', 'CWE-284'],
    affectedVersions: ['Cinnamon Desktop 5.2 - 5.4.3'],
    published: '2026-06-09T00:00:00Z',
    updated: '2026-06-11T00:00:00Z',
    references: [
      'https://cinnamon.example/security/CVE-2024-67512',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-67512',
    ],
  },
  {
    id: 'CVE-2024-67820',
    summary:
      'The health check endpoint of Puffin API returns the version and commit hash of the running build without authentication, giving attackers an easy way to identify hosts running vulnerable versions.',
    cvss: { v2: 2.6, v3: 3.7 },
    severity: 'LOW',
    vendors: { puffin: ['puffin-api'] },
    cwes: ['CWE-200'],
    affectedVersions: ['Puffin API 1.0 - 1.4.3'],
    published: '2026-01-16T00:00:00Z',
    updated: '2026-01-18T00:00:00Z',
    references: [
      'https://puffin.example/security/CVE-2024-67820',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-67820',
    ],
  },
  {
    id: 'CVE-2024-68010',
    summary:
      'The password strength meter in Sora Portal accepts any password of at least six characters, and there is no server-side enforcement of the meter\'s recommendation, letting users pick trivially guessable passwords.',
    cvss: { v2: 2.6, v3: 3.1 },
    severity: 'LOW',
    vendors: { sora: ['sora-portal'] },
    cwes: ['CWE-521'],
    affectedVersions: ['Sora Portal 1.3 - 1.4.3'],
    published: '2026-02-01T00:00:00Z',
    updated: '2026-02-03T00:00:00Z',
    references: [
      'https://sora.example/security/CVE-2024-68010',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-68010',
    ],
  },
  {
    id: 'CVE-2024-68320',
    summary:
      'The tracing endpoint of Tanager Runtime accepts spans referencing arbitrary parent span IDs, letting a caller poison the trace tree of another tenant sharing the same collector.',
    cvss: { v2: 3.5, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { tanager: ['tanager-runtime'] },
    cwes: ['CWE-345'],
    affectedVersions: ['Tanager Runtime 1.4 - 1.6.2'],
    published: '2026-04-28T00:00:00Z',
    updated: '2026-05-01T00:00:00Z',
    references: [
      'https://tanager.example/security/CVE-2024-68320',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-68320',
    ],
  },
  {
    id: 'CVE-2024-68620',
    summary:
      'The remote assistance feature in Marbled Console gives support agents access to any tenant\'s console for the duration of a support ticket, but the elevated session persists indefinitely if the ticket is deleted before the session ends.',
    cvss: { v2: 5.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { marbled: ['marbled-console'] },
    cwes: ['CWE-613', 'CWE-269'],
    affectedVersions: ['Marbled Console 1.3 - 1.5.5'],
    published: '2026-03-31T00:00:00Z',
    updated: '2026-04-02T00:00:00Z',
    references: [
      'https://marbled.example/security/CVE-2024-68620',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-68620',
    ],
  },
  {
    id: 'CVE-2024-68910',
    summary:
      'The signature check in Ptarmigan Update Agent uses SHA-1 as the hash function, letting an attacker with the resources to compute a chosen-prefix collision produce a fraudulent update that passes verification.',
    cvss: { v2: 5.1, v3: 6.8 },
    severity: 'MEDIUM',
    vendors: { ptarmigan: ['ptarmigan-update-agent'] },
    cwes: ['CWE-327', 'CWE-347'],
    affectedVersions: ['Ptarmigan Update Agent 1.0 - 1.6.5'],
    published: '2026-04-12T00:00:00Z',
    updated: '2026-04-15T00:00:00Z',
    references: [
      'https://ptarmigan.example/security/CVE-2024-68910',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-68910',
    ],
  },
  {
    id: 'CVE-2024-69205',
    summary:
      'The websocket endpoint of Bittern Chat sends message history for any conversation whose identifier is subscribed to, without verifying that the subscriber is a member, letting any authenticated user read messages from arbitrary conversations.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { bittern: ['bittern-chat'] },
    cwes: ['CWE-284', 'CWE-863'],
    affectedVersions: ['Bittern Chat 3.6 - 4.0.4'],
    published: '2026-06-22T00:00:00Z',
    updated: '2026-06-25T00:00:00Z',
    references: [
      'https://bittern.example/security/CVE-2024-69205',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-69205',
    ],
  },
  {
    id: 'CVE-2024-69502',
    summary:
      'The archive integrity check in Osprey Backup validates a per-file checksum but not a manifest signature, letting an attacker who can modify individual entries substitute files while keeping the archive superficially valid.',
    cvss: { v2: 4.3, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { ospreysoft: ['osprey-backup'] },
    cwes: ['CWE-347', 'CWE-345'],
    affectedVersions: ['Osprey Backup 4.1 - 4.2.4'],
    published: '2026-02-24T00:00:00Z',
    updated: '2026-02-26T00:00:00Z',
    references: [
      'https://ospreysoft.example/security/CVE-2024-69502',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-69502',
    ],
  },
  {
    id: 'CVE-2024-69810',
    summary:
      'The temporary file created by Cinnamon Desktop during document print preview is written with world-readable permissions in /tmp, letting other local users read the content of the printed document.',
    cvss: { v2: 3.6, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { cinnamon: ['cinnamon-desktop'] },
    cwes: ['CWE-732', 'CWE-378'],
    affectedVersions: ['Cinnamon Desktop 5.0 - 5.4.4'],
    published: '2026-03-02T00:00:00Z',
    updated: '2026-03-05T00:00:00Z',
    references: [
      'https://cinnamon.example/security/CVE-2024-69810',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-69810',
    ],
  },
  {
    id: 'CVE-2024-70112',
    summary:
      'The scheduled report distribution in Merlin Analytics stores recipient lists as an editable JSON blob that is not signed by the server, letting a client with write access to the blob divert reports to arbitrary email addresses.',
    cvss: { v2: 5.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { merlin: ['merlin-analytics'] },
    cwes: ['CWE-345', 'CWE-284'],
    affectedVersions: ['Merlin Analytics 7.1 - 7.3.3'],
    published: '2026-05-03T00:00:00Z',
    updated: '2026-05-06T00:00:00Z',
    references: [
      'https://merlin.example/security/CVE-2024-70112',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-70112',
    ],
  },
  {
    id: 'CVE-2024-70420',
    summary:
      'A stack overflow in the recursive descent parser of Sanderling Parser is triggered by a JSON document with several thousand levels of nesting, letting a malicious input crash any process using the library.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { sanderling: ['sanderling-parser'] },
    cwes: ['CWE-674', 'CWE-121'],
    affectedVersions: ['Sanderling Parser 0.9 - 1.3.3'],
    published: '2026-05-01T00:00:00Z',
    updated: '2026-05-03T00:00:00Z',
    references: [
      'https://sanderling.example/security/CVE-2024-70420',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-70420',
    ],
  },
  {
    id: 'CVE-2024-70712',
    summary:
      'The webhook signer in Ridley CI uses a fixed shared secret for all customers in the same region, letting an attacker who compromises any customer forge webhook payloads for other customers in the region.',
    cvss: { v2: 7.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { ridley: ['ridley-ci'] },
    cwes: ['CWE-798', 'CWE-345'],
    affectedVersions: ['Ridley CI 2.3 - 2.4.4'],
    published: '2026-06-27T00:00:00Z',
    updated: '2026-06-30T00:00:00Z',
    references: [
      'https://ridley.example/security/CVE-2024-70712',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-70712',
    ],
  },

  // Part 3
  {
    id: 'CVE-2025-10112',
    summary:
      'An off-by-one error in the HTTP/2 HPACK integer decoder of Lappet Server allocates one byte too few when the decoded value equals the maximum table size, letting a remote attacker overwrite an adjacent heap chunk and achieve code execution.',
    cvss: { v2: 10.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { lappet: ['lappet-server'] },
    cwes: ['CWE-193', 'CWE-787'],
    affectedVersions: ['Lappet Server 4.0 - 4.3.2'],
    published: '2026-07-01T00:00:00Z',
    updated: '2026-07-04T00:00:00Z',
    references: [
      'https://lappet.example/security/CVE-2025-10112',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-10112',
    ],
  },
  {
    id: 'CVE-2025-10330',
    summary:
      'A heap spray in the font shaping engine of Cinnabar Office is achievable through a crafted OpenType GPOS table that causes the allocator to be driven into a predictable state, enabling reliable exploitation of a separate use-after-free.',
    cvss: { v2: 9.3, v3: 8.8 },
    severity: 'HIGH',
    vendors: { cinnabar: ['cinnabar-office'] },
    cwes: ['CWE-416', 'CWE-122'],
    affectedVersions: ['Cinnabar Office 10.0 - 10.4.1'],
    published: '2026-06-18T00:00:00Z',
    updated: '2026-06-21T00:00:00Z',
    references: [
      'https://cinnabar.example/security/CVE-2025-10330',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-10330',
    ],
  },
  {
    id: 'CVE-2025-10511',
    summary:
      'An off-by-one in the TLV frame reader of Dunnart Protocol Library permits a crafted frame whose declared length equals the buffer size to write one byte past the allocation, corrupting the next heap chunk in the same arena.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { dunnart: ['dunnart-protocol-library'] },
    cwes: ['CWE-193', 'CWE-122'],
    affectedVersions: ['Dunnart Protocol Library 2.0 - 2.4.3'],
    published: '2026-05-14T00:00:00Z',
    updated: '2026-05-17T00:00:00Z',
    references: [
      'https://dunnart.example/security/CVE-2025-10511',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-10511',
    ],
  },
  {
    id: 'CVE-2025-10720',
    summary:
      'A use-after-free in the eBPF verifier of Fulmar OS kernel occurs when a map lookup is inlined during JIT compilation after the map is concurrently deleted, allowing a local unprivileged user with BPF privileges to escalate to root.',
    cvss: { v2: 7.2, v3: 7.8 },
    severity: 'HIGH',
    vendors: { fulmar: ['fulmar-os-kernel'] },
    cwes: ['CWE-416'],
    affectedVersions: ['Fulmar OS 6.1 - 6.4.2'],
    published: '2026-04-22T00:00:00Z',
    updated: '2026-04-25T00:00:00Z',
    references: [
      'https://fulmar.example/security/CVE-2025-10720',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-10720',
    ],
  },
  {
    id: 'CVE-2025-10905',
    summary:
      'The FFI binding layer of Jacana Script Engine does not validate that a C callback registered from script still refers to a live closure after garbage collection, producing a type-confused call that can be steered by a crafted script to arbitrary memory.',
    cvss: { v2: 9.3, v3: 8.8 },
    severity: 'HIGH',
    vendors: { jacana: ['jacana-script-engine'] },
    cwes: ['CWE-843', 'CWE-416'],
    affectedVersions: ['Jacana Script Engine 3.0 - 3.3.1'],
    published: '2026-06-05T00:00:00Z',
    updated: '2026-06-08T00:00:00Z',
    references: [
      'https://jacana.example/security/CVE-2025-10905',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-10905',
    ],
  },

  // ---------- Injection / XSS ----------
  {
    id: 'CVE-2025-11103',
    summary:
      'The URL router in Peregrine Framework matches routes with a regex built from path parameter names without escaping metacharacters, letting an attacker register a route whose parameter name is a regex that matches other routes and intercepts their traffic.',
    cvss: { v2: 6.4, v3: 7.5 },
    severity: 'HIGH',
    vendors: { peregrine: ['peregrine-framework'] },
    cwes: ['CWE-625', 'CWE-284'],
    affectedVersions: ['Peregrine Framework 5.0 - 5.3.2'],
    published: '2026-03-19T00:00:00Z',
    updated: '2026-03-22T00:00:00Z',
    references: [
      'https://peregrine.example/security/CVE-2025-11103',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-11103',
    ],
  },
  {
    id: 'CVE-2025-11321',
    summary:
      'The PostMessage handler in Stilt Dashboard does not validate the origin of incoming messages, letting any page embedded in an iframe or opened via window.open inject commands into the dashboard on behalf of the logged-in user.',
    cvss: { v2: 5.8, v3: 7.4 },
    severity: 'HIGH',
    vendors: { stilt: ['stilt-dashboard'] },
    cwes: ['CWE-346', 'CWE-79'],
    affectedVersions: ['Stilt Dashboard 2.1 - 2.5.0'],
    published: '2026-05-07T00:00:00Z',
    updated: '2026-05-10T00:00:00Z',
    references: [
      'https://stilt.example/security/CVE-2025-11321',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-11321',
    ],
  },
  {
    id: 'CVE-2025-11502',
    summary:
      'The Markdown renderer in Harrier Wiki processes HTML passthrough blocks without sanitising event handler attributes, letting any authenticated user store a persistent cross-site scripting payload in a wiki page.',
    cvss: { v2: 4.3, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { harrier: ['harrier-wiki'] },
    cwes: ['CWE-79', 'CWE-116'],
    affectedVersions: ['Harrier Wiki 3.0 - 3.5.2'],
    published: '2026-04-01T00:00:00Z',
    updated: '2026-04-03T00:00:00Z',
    references: [
      'https://harrier.example/security/CVE-2025-11502',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-11502',
    ],
  },
  {
    id: 'CVE-2025-11712',
    summary:
      'The server-side rendering path in Avocet UI Framework evaluates component props through a template interpolation step before sanitisation, letting an attacker who controls a prop string inject arbitrary HTML into server-rendered pages.',
    cvss: { v2: 6.4, v3: 7.2 },
    severity: 'HIGH',
    vendors: { avocet: ['avocet-ui-framework'] },
    cwes: ['CWE-79', 'CWE-1336'],
    affectedVersions: ['Avocet UI Framework 6.0 - 6.2.4'],
    published: '2026-06-12T00:00:00Z',
    updated: '2026-06-15T00:00:00Z',
    references: [
      'https://avocet.example/security/CVE-2025-11712',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-11712',
    ],
  },
  {
    id: 'CVE-2025-11910',
    summary:
      'The multipart form parser in Lapwing Uploads misroutes field data when two fields in the same request share a name prefix, causing a subsequent field\'s value to be stored under the first field\'s key and bypass backend validation.',
    cvss: { v2: 5.8, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { lapwing: ['lapwing-uploads'] },
    cwes: ['CWE-20', 'CWE-706'],
    affectedVersions: ['Lapwing Uploads 1.0 - 1.4.3'],
    published: '2026-03-25T00:00:00Z',
    updated: '2026-03-27T00:00:00Z',
    references: [
      'https://lapwing.example/security/CVE-2025-11910',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-11910',
    ],
  },

  // ---------- Auth / access control ----------
  {
    id: 'CVE-2025-12102',
    summary:
      'The invite acceptance endpoint of Turnstone Collaboration does not require the invited user to be authenticated, letting an attacker who obtains an invite link join the workspace as any email address they control and escalate privileges within it.',
    cvss: { v2: 7.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { turnstone: ['turnstone-collaboration'] },
    cwes: ['CWE-287', 'CWE-284'],
    affectedVersions: ['Turnstone Collaboration 2.0 - 2.4.1'],
    published: '2026-05-21T00:00:00Z',
    updated: '2026-05-24T00:00:00Z',
    references: [
      'https://turnstone.example/security/CVE-2025-12102',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-12102',
    ],
  },
  {
    id: 'CVE-2025-12315',
    summary:
      'The user enumeration check on the registration form of Flicker IAM returns a different HTTP status code for duplicate emails than for new ones, allowing an unauthenticated attacker to determine which email addresses are registered.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { flicker: ['flicker-iam'] },
    cwes: ['CWE-203', 'CWE-200'],
    affectedVersions: ['Flicker IAM 1.0 - 1.3.4'],
    published: '2026-02-10T00:00:00Z',
    updated: '2026-02-12T00:00:00Z',
    references: [
      'https://flicker.example/security/CVE-2025-12315',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-12315',
    ],
  },
  {
    id: 'CVE-2025-12510',
    summary:
      'The Kubernetes ClusterRole binding in Crake Operator grants all service accounts in the operator namespace list and watch privileges over Secrets cluster-wide, letting any pod in the namespace read secrets belonging to other namespaces.',
    cvss: { v2: 6.8, v3: 7.5 },
    severity: 'HIGH',
    vendors: { crake: ['crake-operator'] },
    cwes: ['CWE-269', 'CWE-732'],
    affectedVersions: ['Crake Operator 1.2 - 1.5.0'],
    published: '2026-06-09T00:00:00Z',
    updated: '2026-06-12T00:00:00Z',
    references: [
      'https://crake.example/security/CVE-2025-12510',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-12510',
    ],
  },
  {
    id: 'CVE-2025-12714',
    summary:
      'The file download endpoint of Gannet Storage checks that the session user owns the object record but resolves the file path using a user-supplied filename parameter, letting any authenticated user download files outside their storage prefix.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { gannet: ['gannet-storage'] },
    cwes: ['CWE-639', 'CWE-22'],
    affectedVersions: ['Gannet Storage 3.0 - 3.4.2'],
    published: '2026-04-29T00:00:00Z',
    updated: '2026-05-01T00:00:00Z',
    references: [
      'https://gannet.example/security/CVE-2025-12714',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-12714',
    ],
  },
  {
    id: 'CVE-2025-12910',
    summary:
      'The mobile API of Avocet Commerce checks ownership of order resources by comparing a URL path segment with the session user ID, but the comparison is case-insensitive while the ID store is case-sensitive, letting an attacker access orders by supplying a differently-cased ID.',
    cvss: { v2: 6.5, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { avocet: ['avocet-commerce'] },
    cwes: ['CWE-178', 'CWE-639'],
    affectedVersions: ['Avocet Commerce 5.0 - 5.3.1'],
    published: '2026-03-12T00:00:00Z',
    updated: '2026-03-14T00:00:00Z',
    references: [
      'https://avocet.example/security/CVE-2025-12910',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-12910',
    ],
  },
  {
    id: 'CVE-2025-13105',
    summary:
      'The session cookie issued by Tern Portal is missing the SameSite attribute, allowing a cross-site request triggered from an attacker-controlled page to attach the cookie and perform state-changing actions on behalf of the victim.',
    cvss: { v2: 4.3, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { tern: ['tern-portal'] },
    cwes: ['CWE-1275', 'CWE-352'],
    affectedVersions: ['Tern Portal 4.0 - 4.3.2'],
    published: '2026-01-20T00:00:00Z',
    updated: '2026-01-22T00:00:00Z',
    references: [
      'https://tern.example/security/CVE-2025-13105',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-13105',
    ],
  },
  {
    id: 'CVE-2025-13301',
    summary:
      'The GraphQL batching endpoint of Pratincole API does not apply per-operation rate limits to batched requests, letting an attacker send a single HTTP request containing hundreds of mutations and bypass throttling intended for individual operations.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { pratincole: ['pratincole-api'] },
    cwes: ['CWE-799', 'CWE-770'],
    affectedVersions: ['Pratincole API 2.0 - 2.4.1'],
    published: '2026-05-28T00:00:00Z',
    updated: '2026-05-30T00:00:00Z',
    references: [
      'https://pratincole.example/security/CVE-2025-13301',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-13301',
    ],
  },
  {
    id: 'CVE-2025-13502',
    summary:
      'The admin impersonation feature of Smew Platform logs the original admin identity but performs the subsequent audit log writes as the impersonated user, letting an admin take irreversible actions whose audit trail does not identify the actual operator.',
    cvss: { v2: 4.0, v3: 4.9 },
    severity: 'MEDIUM',
    vendors: { smew: ['smew-platform'] },
    cwes: ['CWE-778', 'CWE-285'],
    affectedVersions: ['Smew Platform 3.1 - 3.4.0'],
    published: '2026-04-07T00:00:00Z',
    updated: '2026-04-09T00:00:00Z',
    references: [
      'https://smew.example/security/CVE-2025-13502',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-13502',
    ],
  },

  // ---------- Crypto / secrets ----------
  {
    id: 'CVE-2025-13705',
    summary:
      'The AES encryption in Coucal Vault uses ECB mode for all block operations, leaking plaintext block structure and allowing an attacker who obtains two ciphertexts for the same data to verify equality without knowing the key.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { coucal: ['coucal-vault'] },
    cwes: ['CWE-327', 'CWE-326'],
    affectedVersions: ['Coucal Vault 1.0 - 1.5.2'],
    published: '2026-02-17T00:00:00Z',
    updated: '2026-02-19T00:00:00Z',
    references: [
      'https://coucal.example/security/CVE-2025-13705',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-13705',
    ],
  },
  {
    id: 'CVE-2025-13910',
    summary:
      'The CBC cipher mode implementation in Yellowhammer Crypto Library reuses a hardcoded IV for every encryption operation, letting an attacker who observes multiple ciphertexts produced from known plaintexts recover the key with a standard chosen-plaintext attack.',
    cvss: { v2: 5.0, v3: 7.5 },
    severity: 'HIGH',
    vendors: { yellowhammer: ['yellowhammer-crypto-library'] },
    cwes: ['CWE-329', 'CWE-327'],
    affectedVersions: ['Yellowhammer Crypto Library 2.0 - 2.3.1'],
    published: '2026-03-03T00:00:00Z',
    updated: '2026-03-05T00:00:00Z',
    references: [
      'https://yellowhammer.example/security/CVE-2025-13910',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-13910',
    ],
  },
  {
    id: 'CVE-2025-14102',
    summary:
      'The nonce used in the challenge-response login of Dipper Auth is derived from a 32-bit timestamp truncated to milliseconds, providing insufficient entropy for servers handling multiple concurrent logins and enabling replay with a brute-forced nonce.',
    cvss: { v2: 5.0, v3: 5.9 },
    severity: 'MEDIUM',
    vendors: { dipper: ['dipper-auth'] },
    cwes: ['CWE-330', 'CWE-338'],
    affectedVersions: ['Dipper Auth 2.0 - 2.3.4'],
    published: '2026-04-14T00:00:00Z',
    updated: '2026-04-16T00:00:00Z',
    references: [
      'https://dipper.example/security/CVE-2025-14102',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-14102',
    ],
  },
  {
    id: 'CVE-2025-14315',
    summary:
      'The environment variable loader in Wagtail Config echoes all loaded variables including secrets into the application startup log at INFO level, exposing database passwords and API keys to any user with log read access.',
    cvss: { v2: 4.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { wagtail: ['wagtail-config'] },
    cwes: ['CWE-532', 'CWE-312'],
    affectedVersions: ['Wagtail Config 1.0 - 1.4.1'],
    published: '2026-05-15T00:00:00Z',
    updated: '2026-05-17T00:00:00Z',
    references: [
      'https://wagtail.example/security/CVE-2025-14315',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-14315',
    ],
  },
  {
    id: 'CVE-2025-14512',
    summary:
      'Egret Secrets Manager stores a copy of every fetched secret in a plaintext file under the service account home directory to speed repeated lookups, leaving secrets readable by any local user who can read that directory.',
    cvss: { v2: 4.6, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { egret: ['egret-secrets-manager'] },
    cwes: ['CWE-312', 'CWE-200'],
    affectedVersions: ['Egret Secrets Manager 1.0 - 1.3.2'],
    published: '2026-01-26T00:00:00Z',
    updated: '2026-01-28T00:00:00Z',
    references: [
      'https://egret.example/security/CVE-2025-14512',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-14512',
    ],
  },

  // ---------- Network / protocol ----------
  {
    id: 'CVE-2025-14720',
    summary:
      'The DNS resolver in Chukar Gateway is vulnerable to DNS rebinding: it resolves hostnames at request time but caches only the rendered response, letting an attacker rotate a hostname to an internal IP after the initial allow-list check to reach internal services.',
    cvss: { v2: 6.4, v3: 7.5 },
    severity: 'HIGH',
    vendors: { chukar: ['chukar-gateway'] },
    cwes: ['CWE-350', 'CWE-918'],
    affectedVersions: ['Chukar Gateway 4.0 - 4.3.1'],
    published: '2026-06-16T00:00:00Z',
    updated: '2026-06-19T00:00:00Z',
    references: [
      'https://chukar.example/security/CVE-2025-14720',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-14720',
    ],
  },
  {
    id: 'CVE-2025-14911',
    summary:
      'The WebSocket upgrade handler in Stint Gateway does not verify the Origin header, letting a malicious website open a WebSocket connection to the gateway on behalf of a logged-in user and issue authenticated commands.',
    cvss: { v2: 5.8, v3: 7.1 },
    severity: 'HIGH',
    vendors: { stint: ['stint-gateway'] },
    cwes: ['CWE-346', 'CWE-352'],
    affectedVersions: ['Stint Gateway 5.0 - 5.2.3'],
    published: '2026-04-20T00:00:00Z',
    updated: '2026-04-23T00:00:00Z',
    references: [
      'https://stint.example/security/CVE-2025-14911',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-14911',
    ],
  },
  {
    id: 'CVE-2025-15104',
    summary:
      'The SNMPv3 agent in Brolga Switch does not enforce the engine ID binding on incoming requests, letting an attacker replay a captured authenticated PDU against any engine in the network.',
    cvss: { v2: 6.1, v3: 7.4 },
    severity: 'HIGH',
    vendors: { brolga: ['brolga-switch'] },
    cwes: ['CWE-294', 'CWE-287'],
    affectedVersions: ['Brolga Switch Firmware 3.0 - 3.4.5'],
    published: '2026-03-07T00:00:00Z',
    updated: '2026-03-09T00:00:00Z',
    references: [
      'https://brolga.example/security/CVE-2025-15104',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-15104',
    ],
  },
  {
    id: 'CVE-2025-15312',
    summary:
      'The IPP print server in Lorikeet Print Manager processes job attributes with external entity references enabled, letting any client on the network exfiltrate local files from the print server host by submitting a crafted job.',
    cvss: { v2: 7.5, v3: 8.6 },
    severity: 'HIGH',
    vendors: { lorikeet: ['lorikeet-print-manager'] },
    cwes: ['CWE-611'],
    affectedVersions: ['Lorikeet Print Manager 2.0 - 2.3.2'],
    published: '2026-05-11T00:00:00Z',
    updated: '2026-05-13T00:00:00Z',
    references: [
      'https://lorikeet.example/security/CVE-2025-15312',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-15312',
    ],
  },
  {
    id: 'CVE-2025-15505',
    summary:
      'The OSPF implementation in Fulmar Router processes LSA packets without verifying the checksum field when the packet is received on an unnumbered interface, allowing an on-link attacker to inject routing updates and redirect traffic.',
    cvss: { v2: 6.1, v3: 7.4 },
    severity: 'HIGH',
    vendors: { fulmar: ['fulmar-router'] },
    cwes: ['CWE-354', 'CWE-345'],
    affectedVersions: ['Fulmar Router Firmware 9.0 - 9.3.1'],
    published: '2026-06-24T00:00:00Z',
    updated: '2026-06-27T00:00:00Z',
    references: [
      'https://fulmar.example/security/CVE-2025-15505',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-15505',
    ],
  },

  // ---------- DoS / resource exhaustion ----------
  {
    id: 'CVE-2025-15701',
    summary:
      'The rate limiter in Avocet Commerce uses an in-process counter that is not shared across worker processes, letting an attacker who can route requests to different workers multiply their effective request budget by the number of workers.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { avocet: ['avocet-commerce'] },
    cwes: ['CWE-799', 'CWE-362'],
    affectedVersions: ['Avocet Commerce 5.1 - 5.3.2'],
    published: '2026-03-14T00:00:00Z',
    updated: '2026-03-16T00:00:00Z',
    references: [
      'https://avocet.example/security/CVE-2025-15701',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-15701',
    ],
  },
  {
    id: 'CVE-2025-15911',
    summary:
      'The certificate parser in Dunnart TLS processes Subject Alternative Name extensions without a count limit, letting a server present a certificate with millions of SANs that exhaust heap memory in the connecting client.',
    cvss: { v2: 5.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { dunnart: ['dunnart-tls'] },
    cwes: ['CWE-400', 'CWE-770'],
    affectedVersions: ['Dunnart TLS 1.4 - 1.7.2'],
    published: '2026-04-17T00:00:00Z',
    updated: '2026-04-19T00:00:00Z',
    references: [
      'https://dunnart.example/security/CVE-2025-15911',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-15911',
    ],
  },
  {
    id: 'CVE-2025-16104',
    summary:
      'The template compiler in Harrier Wiki does not restrict the number of unique variables in a single template, letting a contributor submit a template that causes the compiler to allocate a slot per variable and exhaust memory at render time.',
    cvss: { v2: 4.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { harrier: ['harrier-wiki'] },
    cwes: ['CWE-770'],
    affectedVersions: ['Harrier Wiki 3.2 - 3.5.3'],
    published: '2026-02-21T00:00:00Z',
    updated: '2026-02-23T00:00:00Z',
    references: [
      'https://harrier.example/security/CVE-2025-16104',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-16104',
    ],
  },
  {
    id: 'CVE-2025-16312',
    summary:
      'The lazy relationship loader in Limpkin ORM issues a separate database query per object when a collection is iterated, letting a caller with access to a list endpoint trigger O(n) queries and degrade the database under moderate load.',
    cvss: { v2: 4.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { limpkin: ['limpkin-orm'] },
    cwes: ['CWE-1176', 'CWE-400'],
    affectedVersions: ['Limpkin ORM 4.0 - 4.3.2'],
    published: '2026-01-11T00:00:00Z',
    updated: '2026-01-13T00:00:00Z',
    references: [
      'https://limpkin.example/security/CVE-2025-16312',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-16312',
    ],
  },

  // ---------- Cloud / CI-CD / supply chain ----------
  {
    id: 'CVE-2025-16512',
    summary:
      'The Helm chart renderer in Jacana Deploy interpolates Kubernetes secret values into rendered manifests that are printed to the build log, exposing secrets to any user with log read access to the deployment pipeline.',
    cvss: { v2: 4.0, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { jacana: ['jacana-deploy'] },
    cwes: ['CWE-532', 'CWE-200'],
    affectedVersions: ['Jacana Deploy 2.0 - 2.4.3'],
    published: '2026-05-09T00:00:00Z',
    updated: '2026-05-12T00:00:00Z',
    references: [
      'https://jacana.example/security/CVE-2025-16512',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-16512',
    ],
  },
  {
    id: 'CVE-2025-16711',
    summary:
      'The pull-request label trigger in Smew CI evaluates shell scripts from the default branch even when the triggering commit is from an untrusted fork, letting a fork contributor execute arbitrary code on the CI runner.',
    cvss: { v2: 6.5, v3: 8.8 },
    severity: 'HIGH',
    vendors: { smew: ['smew-ci'] },
    cwes: ['CWE-94', 'CWE-269'],
    affectedVersions: ['Smew CI 1.5 - 2.0.3'],
    published: '2026-04-10T00:00:00Z',
    updated: '2026-04-13T00:00:00Z',
    references: [
      'https://smew.example/security/CVE-2025-16711',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-16711',
    ],
  },
  {
    id: 'CVE-2025-16912',
    summary:
      'The Terraform provider plugin for Crake Cloud downloads provider binaries from a CDN URL embedded in the lockfile without verifying their hash against the registry checksum, letting a CDN compromise serve malicious binaries to all users of the provider.',
    cvss: { v2: 6.8, v3: 8.1 },
    severity: 'HIGH',
    vendors: { crake: ['crake-terraform-provider'] },
    cwes: ['CWE-494', 'CWE-345'],
    affectedVersions: ['Crake Terraform Provider 1.0 - 1.4.2'],
    published: '2026-06-01T00:00:00Z',
    updated: '2026-06-04T00:00:00Z',
    references: [
      'https://crake.example/security/CVE-2025-16912',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-16912',
    ],
  },
  {
    id: 'CVE-2025-17110',
    summary:
      'The service mesh sidecar in Turnstone Mesh forwards mTLS client certificates to upstream services in a plaintext header, letting an upstream service impersonate any peer by writing an arbitrary identity into that header.',
    cvss: { v2: 6.4, v3: 7.5 },
    severity: 'HIGH',
    vendors: { turnstone: ['turnstone-mesh'] },
    cwes: ['CWE-295', 'CWE-287'],
    affectedVersions: ['Turnstone Mesh 2.0 - 2.3.1'],
    published: '2026-06-18T00:00:00Z',
    updated: '2026-06-21T00:00:00Z',
    references: [
      'https://turnstone.example/security/CVE-2025-17110',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-17110',
    ],
  },

  // ---------- Web app misc ----------
  {
    id: 'CVE-2025-17320',
    summary:
      'The redirect handler in Harrier Auth performs a client-side redirect through a JavaScript assignment to window.location after reading the next parameter from the URL, and does not enforce same-origin, enabling open redirect to an arbitrary external site.',
    cvss: { v2: 5.8, v3: 6.1 },
    severity: 'MEDIUM',
    vendors: { harrier: ['harrier-auth'] },
    cwes: ['CWE-601'],
    affectedVersions: ['Harrier Auth 2.0 - 2.3.4'],
    published: '2026-03-20T00:00:00Z',
    updated: '2026-03-22T00:00:00Z',
    references: [
      'https://harrier.example/security/CVE-2025-17320',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-17320',
    ],
  },
  {
    id: 'CVE-2025-17515',
    summary:
      'The job queue processor in Lapwing Worker does not verify that tasks dequeued from a shared queue belong to the tenant whose credentials are used to process them, letting one tenant submit tasks that execute in the context of a co-tenant\'s integration.',
    cvss: { v2: 6.5, v3: 7.6 },
    severity: 'HIGH',
    vendors: { lapwing: ['lapwing-worker'] },
    cwes: ['CWE-284', 'CWE-863'],
    affectedVersions: ['Lapwing Worker 3.0 - 3.3.2'],
    published: '2026-05-22T00:00:00Z',
    updated: '2026-05-25T00:00:00Z',
    references: [
      'https://lapwing.example/security/CVE-2025-17515',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-17515',
    ],
  },
  {
    id: 'CVE-2025-17720',
    summary:
      'The webhook dispatcher in Pratincole API includes the full request body in a retry message stored to the dead-letter queue, which is accessible to all operators regardless of tenant, exposing payload data from one tenant to operators of another.',
    cvss: { v2: 4.0, v3: 4.9 },
    severity: 'MEDIUM',
    vendors: { pratincole: ['pratincole-api'] },
    cwes: ['CWE-200', 'CWE-284'],
    affectedVersions: ['Pratincole API 2.1 - 2.4.2'],
    published: '2026-04-03T00:00:00Z',
    updated: '2026-04-05T00:00:00Z',
    references: [
      'https://pratincole.example/security/CVE-2025-17720',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-17720',
    ],
  },
  {
    id: 'CVE-2025-17910',
    summary:
      'The RSS feed generator of Harrier Wiki exposes the full source of draft articles in the feed payload before they are published, letting any subscriber read unreleased content.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { harrier: ['harrier-wiki'] },
    cwes: ['CWE-200', 'CWE-284'],
    affectedVersions: ['Harrier Wiki 3.0 - 3.5.4'],
    published: '2026-02-05T00:00:00Z',
    updated: '2026-02-07T00:00:00Z',
    references: [
      'https://harrier.example/security/CVE-2025-17910',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-17910',
    ],
  },
  {
    id: 'CVE-2025-18110',
    summary:
      'The admin password change API of Lorikeet Print Manager accepts a new password without requiring the current password, letting an attacker who gains brief authenticated access permanently lock out the legitimate administrator.',
    cvss: { v2: 6.5, v3: 8.1 },
    severity: 'HIGH',
    vendors: { lorikeet: ['lorikeet-print-manager'] },
    cwes: ['CWE-620', 'CWE-287'],
    affectedVersions: ['Lorikeet Print Manager 2.1 - 2.3.3'],
    published: '2026-06-10T00:00:00Z',
    updated: '2026-06-12T00:00:00Z',
    references: [
      'https://lorikeet.example/security/CVE-2025-18110',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-18110',
    ],
  },
  {
    id: 'CVE-2025-18301',
    summary:
      'The public share link for Gannet Storage objects embeds the object path in a signed URL but does not bind the signature to a specific requester, letting anyone who obtains the link from browser history or proxy logs download the shared file.',
    cvss: { v2: 4.3, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { gannet: ['gannet-storage'] },
    cwes: ['CWE-200', 'CWE-285'],
    affectedVersions: ['Gannet Storage 3.1 - 3.4.3'],
    published: '2026-01-30T00:00:00Z',
    updated: '2026-02-01T00:00:00Z',
    references: [
      'https://gannet.example/security/CVE-2025-18301',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-18301',
    ],
  },
  {
    id: 'CVE-2025-18510',
    summary:
      'The import wizard in Limpkin ORM generates a temporary SQL script in the current working directory with a predictable name, letting a local attacker pre-create the file as a symlink to redirect writes to an arbitrary location.',
    cvss: { v2: 3.3, v3: 5.5 },
    severity: 'MEDIUM',
    vendors: { limpkin: ['limpkin-orm'] },
    cwes: ['CWE-377', 'CWE-59'],
    affectedVersions: ['Limpkin ORM 4.1 - 4.3.3'],
    published: '2026-03-28T00:00:00Z',
    updated: '2026-03-30T00:00:00Z',
    references: [
      'https://limpkin.example/security/CVE-2025-18510',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-18510',
    ],
  },
  {
    id: 'CVE-2025-18720',
    summary:
      'The search API of Stilt Dashboard passes the sort field parameter directly to a dynamic query builder without validating it against allowed column names, letting an authenticated user extract values from columns they are not supposed to see by sorting on them and observing ordering.',
    cvss: { v2: 4.0, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { stilt: ['stilt-dashboard'] },
    cwes: ['CWE-89', 'CWE-200'],
    affectedVersions: ['Stilt Dashboard 2.2 - 2.5.1'],
    published: '2026-04-25T00:00:00Z',
    updated: '2026-04-27T00:00:00Z',
    references: [
      'https://stilt.example/security/CVE-2025-18720',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-18720',
    ],
  },
  {
    id: 'CVE-2025-18912',
    summary:
      'The account deletion flow in Flicker IAM removes the user record but does not revoke outstanding OAuth access tokens, letting an attacker who obtains a token before deletion continue to act as the deleted user until the token naturally expires.',
    cvss: { v2: 4.9, v3: 5.4 },
    severity: 'MEDIUM',
    vendors: { flicker: ['flicker-iam'] },
    cwes: ['CWE-613'],
    affectedVersions: ['Flicker IAM 1.2 - 1.3.5'],
    published: '2026-05-19T00:00:00Z',
    updated: '2026-05-21T00:00:00Z',
    references: [
      'https://flicker.example/security/CVE-2025-18912',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-18912',
    ],
  },
  {
    id: 'CVE-2025-19104',
    summary:
      'The Dockerfile linter in Crake Operator evaluates user-supplied label values in a Go template to produce annotations, letting an authenticated developer inject Go template directives and read environment variables from the linter process.',
    cvss: { v2: 6.5, v3: 7.7 },
    severity: 'HIGH',
    vendors: { crake: ['crake-operator'] },
    cwes: ['CWE-1336', 'CWE-94'],
    affectedVersions: ['Crake Operator 1.3 - 1.5.1'],
    published: '2026-06-23T00:00:00Z',
    updated: '2026-06-26T00:00:00Z',
    references: [
      'https://crake.example/security/CVE-2025-19104',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-19104',
    ],
  },
  {
    id: 'CVE-2025-19301',
    summary:
      'The notification preference update endpoint of Smew Platform applies the JSON merge patch from the request body without validating field names, letting an authenticated user set arbitrary fields on the user record including internal flags.',
    cvss: { v2: 6.5, v3: 6.3 },
    severity: 'MEDIUM',
    vendors: { smew: ['smew-platform'] },
    cwes: ['CWE-915'],
    affectedVersions: ['Smew Platform 3.0 - 3.4.1'],
    published: '2026-05-02T00:00:00Z',
    updated: '2026-05-04T00:00:00Z',
    references: [
      'https://smew.example/security/CVE-2025-19301',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-19301',
    ],
  },
  {
    id: 'CVE-2025-19505',
    summary:
      'The image optimiser in Cinnabar Office rewrites SVG files by parsing them with libxml2 in network-enabled mode, letting a crafted SVG trigger outbound HTTP requests from the document server when the file is opened.',
    cvss: { v2: 5.0, v3: 5.8 },
    severity: 'MEDIUM',
    vendors: { cinnabar: ['cinnabar-office'] },
    cwes: ['CWE-918', 'CWE-611'],
    affectedVersions: ['Cinnabar Office 10.1 - 10.4.2'],
    published: '2026-06-07T00:00:00Z',
    updated: '2026-06-10T00:00:00Z',
    references: [
      'https://cinnabar.example/security/CVE-2025-19505',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-19505',
    ],
  },
  {
    id: 'CVE-2025-19710',
    summary:
      'The signup flow in Tern Portal does not invalidate the email verification token after a successful verification, letting an attacker who obtains a used token re-verify the address and reactivate a previously deleted account.',
    cvss: { v2: 5.0, v3: 5.3 },
    severity: 'MEDIUM',
    vendors: { tern: ['tern-portal'] },
    cwes: ['CWE-613', 'CWE-640'],
    affectedVersions: ['Tern Portal 4.1 - 4.3.3'],
    published: '2026-04-11T00:00:00Z',
    updated: '2026-04-13T00:00:00Z',
    references: [
      'https://tern.example/security/CVE-2025-19710',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-19710',
    ],
  },

  // ---------- IoT / firmware ----------
  {
    id: 'CVE-2025-19910',
    summary:
      'The OTA update endpoint of Yellowhammer Thermostat downloads the update manifest over HTTP and does not verify its signature, letting an on-path attacker substitute a manifest that points to malicious firmware.',
    cvss: { v2: 7.6, v3: 8.1 },
    severity: 'HIGH',
    vendors: { yellowhammer: ['yellowhammer-thermostat'] },
    cwes: ['CWE-319', 'CWE-345'],
    affectedVersions: ['Yellowhammer Thermostat Firmware 2.0 - 2.5.1'],
    published: '2026-05-24T00:00:00Z',
    updated: '2026-05-27T00:00:00Z',
    references: [
      'https://yellowhammer.example/security/CVE-2025-19910',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-19910',
    ],
  },
  {
    id: 'CVE-2025-20112',
    summary:
      'The web interface of Brolga Industrial Switch stores the session token in a cookie without setting the Secure flag, letting an attacker on a shared network read the token over HTTP if the user visits any HTTP resource that triggers a redirect.',
    cvss: { v2: 3.5, v3: 4.8 },
    severity: 'MEDIUM',
    vendors: { brolga: ['brolga-industrial-switch'] },
    cwes: ['CWE-614', 'CWE-311'],
    affectedVersions: ['Brolga Industrial Switch Firmware 4.0 - 4.2.3'],
    published: '2026-02-28T00:00:00Z',
    updated: '2026-03-01T00:00:00Z',
    references: [
      'https://brolga.example/security/CVE-2025-20112',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-20112',
    ],
  },
  {
    id: 'CVE-2025-20305',
    summary:
      'The Wi-Fi provisioning AP exposed by Dipper Smart Plug uses WPS with a static 4-digit PIN printed on the device label, allowing an attacker with physical access to the label or knowledge of the PIN schema to join and reconfigure the device.',
    cvss: { v2: 3.3, v3: 6.5 },
    severity: 'MEDIUM',
    vendors: { dipper: ['dipper-smart-plug'] },
    cwes: ['CWE-798', 'CWE-521'],
    affectedVersions: ['Dipper Smart Plug Firmware 1.0 - 1.3.2'],
    published: '2026-01-17T00:00:00Z',
    updated: '2026-01-19T00:00:00Z',
    references: [
      'https://dipper.example/security/CVE-2025-20305',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-20305',
    ],
  },
  {
    id: 'CVE-2025-20510',
    summary:
      'The configuration export of Lappet Network Sensor includes API keys and SNMP community strings in an unencrypted JSON file that is served over HTTP without authentication when the sensor is in its factory default state.',
    cvss: { v2: 5.0, v3: 9.8 },
    severity: 'CRITICAL',
    vendors: { lappet: ['lappet-network-sensor'] },
    cwes: ['CWE-306', 'CWE-312'],
    affectedVersions: ['Lappet Network Sensor Firmware 1.0 - 1.4.0'],
    published: '2026-06-14T00:00:00Z',
    updated: '2026-06-17T00:00:00Z',
    references: [
      'https://lappet.example/security/CVE-2025-20510',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-20510',
    ],
  },

  // ---------- Low severity / info disclosure ----------
  {
    id: 'CVE-2025-20710',
    summary:
      'The 404 response body of Coucal API Framework includes the fully qualified class name of the unmatched controller, giving an attacker information about the server-side framework and namespace structure without authentication.',
    cvss: { v2: 2.6, v3: 3.7 },
    severity: 'LOW',
    vendors: { coucal: ['coucal-api-framework'] },
    cwes: ['CWE-209'],
    affectedVersions: ['Coucal API Framework 3.0 - 3.4.2'],
    published: '2026-01-07T00:00:00Z',
    updated: '2026-01-08T00:00:00Z',
    references: [
      'https://coucal.example/security/CVE-2025-20710',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-20710',
    ],
  },
  {
    id: 'CVE-2025-20905',
    summary:
      'The X-Powered-By response header of Peregrine Framework discloses the framework name and version string in every response, helping an attacker identify hosts running vulnerable versions without active probing.',
    cvss: { v2: 2.6, v3: 3.7 },
    severity: 'LOW',
    vendors: { peregrine: ['peregrine-framework'] },
    cwes: ['CWE-200'],
    affectedVersions: ['Peregrine Framework 4.0 - 5.3.3'],
    published: '2026-01-14T00:00:00Z',
    updated: '2026-01-15T00:00:00Z',
    references: [
      'https://peregrine.example/security/CVE-2025-20905',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-20905',
    ],
  },
  {
    id: 'CVE-2025-21105',
    summary:
      'The verbose error mode in Yellowhammer Crypto Library prints the full plaintext alongside the derived key on a decryption failure, leaking sensitive material to any process that captures standard error.',
    cvss: { v2: 2.1, v3: 3.3 },
    severity: 'LOW',
    vendors: { yellowhammer: ['yellowhammer-crypto-library'] },
    cwes: ['CWE-215', 'CWE-312'],
    affectedVersions: ['Yellowhammer Crypto Library 2.1 - 2.3.2'],
    published: '2026-02-09T00:00:00Z',
    updated: '2026-02-10T00:00:00Z',
    references: [
      'https://yellowhammer.example/security/CVE-2025-21105',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-21105',
    ],
  },
  {
    id: 'CVE-2025-21310',
    summary:
      'The JavaScript bundle served by Stilt Dashboard embeds the internal Sentry DSN including the project secret as a compile-time constant, allowing anyone who reads the bundle to submit arbitrary events to the Sentry project.',
    cvss: { v2: 3.5, v3: 4.3 },
    severity: 'MEDIUM',
    vendors: { stilt: ['stilt-dashboard'] },
    cwes: ['CWE-540', 'CWE-200'],
    affectedVersions: ['Stilt Dashboard 2.0 - 2.5.2'],
    published: '2026-03-26T00:00:00Z',
    updated: '2026-03-27T00:00:00Z',
    references: [
      'https://stilt.example/security/CVE-2025-21310',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-21310',
    ],
  },
  {
    id: 'CVE-2025-21512',
    summary:
      'The user detail endpoint of Smew Platform returns the hashed password field in its JSON response when called by an administrator, allowing an admin to harvest hashes for offline cracking.',
    cvss: { v2: 4.0, v3: 4.9 },
    severity: 'MEDIUM',
    vendors: { smew: ['smew-platform'] },
    cwes: ['CWE-200', 'CWE-916'],
    affectedVersions: ['Smew Platform 3.0 - 3.4.2'],
    published: '2026-04-16T00:00:00Z',
    updated: '2026-04-18T00:00:00Z',
    references: [
      'https://smew.example/security/CVE-2025-21512',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-21512',
    ],
  },
  {
    id: 'CVE-2025-21710',
    summary:
      'The access denied page of Avocet Commerce reveals whether a product exists before returning the authorisation error, letting an unauthenticated user enumerate private product catalogue entries by observing whether the response is 403 or 404.',
    cvss: { v2: 3.5, v3: 3.7 },
    severity: 'LOW',
    vendors: { avocet: ['avocet-commerce'] },
    cwes: ['CWE-203', 'CWE-200'],
    affectedVersions: ['Avocet Commerce 5.0 - 5.3.3'],
    published: '2026-01-04T00:00:00Z',
    updated: '2026-01-06T00:00:00Z',
    references: [
      'https://avocet.example/security/CVE-2025-21710',
      'https://nvd.nist.gov/vuln/detail/CVE-2025-21710',
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

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Built directly from demoCves' vendor/product pairs (deduped) so the
// stack-builder autocomplete in demo mode can never suggest a vendor/product
// combo that has zero matching demo CVEs. Do not hand-maintain this list —
// it stays in sync automatically as demoCves grows.
// Teams created before the stack-builder was made demo-aware may have real
// vendor/product names (nginx, docker, postgresql, ...) saved in their
// stack. Rather than inventing fake CVE claims about real software, we
// alias each one to the existing fictional demo record closest in category
// (proxy -> proxy, database -> database, kernel -> kernel, etc.) so Feed
// and Analytics still populate instead of silently showing nothing.
export const demoVendorAliases = {
  'nginx/nginx': 'gannet/gannet-proxy',
  'apache/http_server': 'chukar/chukar-gateway',
  'postgresql/postgresql': 'merganser/merganser-db',
  'mysql/mysql': 'marlin/marlin-nosql',
  'mongodb/mongodb': 'marlin/marlin-nosql',
  'redis/redis': 'grebe/grebe-observability',
  'sqlite/sqlite': 'limpkin/limpkin-orm',
  'openssl/openssl': 'dunnart/dunnart-tls',
  'linux/linux_kernel': 'fulmar/fulmar-os-kernel',
  'canonical/ubuntu_linux': 'wombat/wombat-os',
  'debian/debian_linux': 'bandicoot/bandicoot-runtime',
  'redhat/enterprise_linux': 'quokka/quokka-hypervisor',
  'amazon/amazon_linux': 'numbat/numbat-gpu-driver',
  'microsoft/windows_10': 'cinnamon/cinnamon-desktop',
  'docker/docker': 'crake/crake-operator',
  'kubernetes/kubernetes': 'loon/loon-cluster',
  'python/python': 'jacana/jacana-script-engine',
  'php/php': 'sanderling/sanderling-parser',
  'go/go': 'skate/skate-package-manager',
  'expressjs/express': 'stilt/stilt-dashboard',
  'angular/angular': 'snipe/snipe-editor',
  'spring/spring_framework': 'egret/egret-automations',
  'laravel/framework': 'harrier/harrier-wiki',
  'wordpress/wordpress': 'grackle/grackle-portal',
  'google/chrome': 'pinecone/pinecone-browser',
  'mozilla/firefox': 'pinecone/pinecone-browser',
  'oracle/jdk': 'tanager/tanager-runtime',
  'elastic/elasticsearch': 'grebe/grebe-search',
  'hashicorp/terraform': 'crake/crake-terraform-provider',
  'gitlab/gitlab': 'turnstone/turnstone-collaboration',
  'jenkins/jenkins': 'trawler/trawler-ci',
  'vmware/vsphere': 'quokka/quokka-hypervisor',
  'fortinet/fortios': 'nautilus/nautilus-vpn-appliance',
  'cisco/ios': 'squill/squill-sd-wan',
};

export const demoVendorSuggestions = (() => {
  const seen = new Map();
  demoCves.forEach((cve) => {
    Object.entries(cve.vendors).forEach(([vendor, products]) => {
      products.forEach((product) => {
        const key = `${vendor}/${product}`;
        if (!seen.has(key)) {
          seen.set(key, { vendor, product, label: titleCaseFromSlug(product) });
        }
      });
    });
  });
  return Array.from(seen.values());
})();

/**
 * Local filter over demoVendorSuggestions — mirrors searchPopularStacks'
 * matching behaviour so StackBuilder can use either source interchangeably.
 */
export function searchDemoVendorSuggestions(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return demoVendorSuggestions;
  return demoVendorSuggestions.filter((s) => {
    const haystack = [s.vendor, s.product, s.label].join(' ').toLowerCase();
    return q.split(/\s+/).every((part) => haystack.includes(part));
  });
}
