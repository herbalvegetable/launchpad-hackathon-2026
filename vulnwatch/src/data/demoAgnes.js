// Canned Agnes AI API responses keyed by CVE id, used when VITE_DEMO_MODE=true
// so every tab on the CVE Detail page is populated without live API calls.

export const demoAgnesExplanations = {
  'CVE-2024-31337': {
    oneLiner:
      'Orbit Gateway will run a command an attacker sends it, without checking who sent it or what the command does.',
    attackerCapability:
      'An attacker on the network can reach the management endpoint, send a specially formed command, and have it executed by the underlying shell with root privileges - no login required.',
    affectedSystems: ['Orbit Gateway < 4.2.1', 'Orbit Gateway 4.0.x (all)'],
    severityExplanation:
      'CVSS v3 9.8 (Critical): the attack needs no privileges or user interaction, can be launched remotely, and gives the attacker full control of the device.',
    patchSteps: [
      'Upgrade Orbit Gateway to 4.2.1 or later.',
      'Until patched, block external access to the management endpoint at the firewall.',
      'Rotate any credentials stored on affected gateways.',
      'Review gateway logs for unexpected shell commands since the advisory date.',
    ],
    severity: 'CRITICAL',
  },
  'CVE-2024-28812': {
    oneLiner:
      'Ledgerly ERP lets a logged-in user slip database commands into a search box and read data that belongs to other companies using the same system.',
    attackerCapability:
      'A user with only basic access can craft a search query that the system runs directly against the database, letting them view or change records outside their own tenant.',
    affectedSystems: ['Ledgerly ERP 6.0 - 6.4.2'],
    severityExplanation:
      'CVSS v3 8.6 (High): requires a valid low-privilege account but no user interaction, and can expose or corrupt data belonging to every tenant on the instance.',
    patchSteps: [
      'Upgrade to Ledgerly ERP 6.4.3 or later.',
      'Audit recent search activity for unusual query patterns.',
      'Restrict database accounts used by the app to least-privilege roles.',
      'Notify tenants if a review finds evidence of cross-tenant access.',
    ],
    severity: 'HIGH',
  },
  'CVE-2024-29901': {
    oneLiner:
      'Nimbus Auth will accept a fake "remember me" login token as genuine, letting someone in without a password.',
    attackerCapability:
      'An attacker who can guess or intercept a token format can forge a persistent session for any account routed through the legacy SSO bridge, bypassing the password check entirely.',
    affectedSystems: ['Nimbus Auth 2.3.0 - 2.6.1'],
    severityExplanation:
      'CVSS v3 8.1 (High): no valid credentials are needed and the impact is full account takeover, though the attacker needs some access to the legacy bridge path.',
    patchSteps: [
      'Upgrade Nimbus Auth to 2.6.2 or later.',
      'Disable the legacy SSO bridge if it is not actively required.',
      'Force-expire all existing "remember me" sessions after patching.',
      'Monitor for repeated login attempts using the legacy bridge path.',
    ],
    severity: 'HIGH',
  },
  'CVE-2023-44510': {
    oneLiner:
      'Fernwood CMS shows visitor comments on a page without checking whether they secretly contain code.',
    attackerCapability:
      'An attacker posts a comment containing a script; anyone who later views that page runs the script in their browser, which can steal their session or redirect them.',
    affectedSystems: ['Fernwood CMS 3.x (all versions before 3.9.4)'],
    severityExplanation:
      'CVSS v3 6.1 (Medium): requires a visitor to view the page, and the attacker needs comment access, but the payload runs in the victim\u2019s own session.',
    patchSteps: [
      'Upgrade to Fernwood CMS 3.9.4 or later.',
      'Enable output encoding on all user-submitted content fields.',
      'Review existing comments for embedded script tags and remove them.',
      'Add a content security policy to limit inline script execution.',
    ],
    severity: 'MEDIUM',
  },
  'CVE-2023-41207': {
    oneLiner:
      'Relay Queue will try to rebuild any object it is told to from a message, even ones it never expected to see.',
    attackerCapability:
      'Anyone who can publish a message to the queue can shape that message so the consumer builds an unintended object in memory, which can lead to further compromise depending on what classes are available.',
    affectedSystems: ['Relay Queue 1.8 - 1.11'],
    severityExplanation:
      'CVSS v3 7.3 (Medium-High border): requires publish access to the queue, but the resulting object instantiation can cascade into more serious impact on the consumer service.',
    patchSteps: [
      'Upgrade to Relay Queue 1.12 or later.',
      'Restrict which services and accounts are allowed to publish to the queue.',
      'Configure the mapper to use an allow-list of expected classes.',
      'Review consumer logs for deserialization errors around the advisory window.',
    ],
    severity: 'MEDIUM',
  },
  'CVE-2023-39112': {
    oneLiner:
      'Harbor Notify has a leftover debug page that shares internal configuration with anyone who has even minimal API access.',
    attackerCapability:
      'A user with a valid but low-privilege API key can query the debug endpoint and receive internal hostnames and configuration details useful for planning further attacks.',
    affectedSystems: ['Harbor Notify 5.0 - 5.2'],
    severityExplanation:
      'CVSS v3 3.9 (Low): the exposed data is informational rather than directly exploitable, but it can help an attacker plan a more targeted attack.',
    patchSteps: [
      'Upgrade to Harbor Notify 5.2.1 or later.',
      'Disable the debug endpoint in production configuration.',
      'Rotate any credentials or hostnames that may have already been exposed.',
      'Restrict API keys to only the scopes each integration actually needs.',
    ],
    severity: 'LOW',
  },
};

export const demoAgnesAnalogies = {
  'CVE-2024-31337':
    'Imagine your office has a front desk that will follow any instruction handed to it on a sticky note, no ID required, and the desk happens to hold the master keys. Someone outside just has to walk up, hand over the right note, and they can open every door in the building. That is what this vulnerability lets an attacker do to the affected devices over the network. Patching means changing that front desk so it only follows instructions from people it has actually verified.',
  'CVE-2024-28812':
    'Picture a shared filing cabinet used by several companies, where the label on each drawer is trusted completely. If you write a clever enough label, the clerk will open a drawer that belongs to a different company and hand you its files. That is how this flaw lets one user reach into data that is not theirs. Patching means the clerk starts checking whose drawer it actually is before handing anything over.',
  'CVE-2024-29901':
    'Think of a keycard reader that is supposed to check a signature on every card, but for one specific gate it just waves people through if the card looks vaguely right. Anyone who figures out the shape of a valid-looking card can walk through that gate as if they belonged. Patching means fixing that one gate so it checks every card the same careful way as the rest of the building.',
  'CVE-2023-44510':
    'Imagine a guestbook at a shop where anyone can write a note, and the shop reads every note aloud to the next customer exactly as written, sticky notes and all. If someone slips in a note that is actually a hidden instruction, the next customer unknowingly acts on it. Patching means the shop starts reading notes as plain text instead of following anything written inside them.',
  'CVE-2023-41207':
    'This is like a mailroom that will assemble any package based on instructions printed on the label, without checking if the label makes sense. Send a strange enough label and the mailroom builds something nobody asked for. Patching means the mailroom only builds packages from a known, approved list of instructions.',
  'CVE-2023-39112':
    'This is like a maintenance closet door in a building that is supposed to need a special key, but actually opens for any employee badge, even a visitor pass. It does not lead anywhere dangerous by itself, but it lets a visitor see the building\u2019s wiring diagrams. Patching means locking that closet so only the right badges open it.',
};

export const demoAgnesMermaid = {
  'CVE-2024-31337': `graph TD
  A[Attacker reaches endpoint] --> B[Sends malformed command]
  B --> C[Vulnerable version interprets it]
  C --> D[Sudo / root access gained]
  D --> E[Persistent shell established]
  E --> F[Full device compromise]

  A --> G[Input whitelisting added]
  G --> H[Version patched to 4.2.1]
  H --> I[Exploit blocked]`,
  'CVE-2024-28812': `graph TD
  A[Attacker has low-priv account] --> B[Crafts search query]
  B --> C[Query concatenated into SQL]
  C --> D[Cross-tenant rows returned]
  D --> E[Data read or modified]

  A --> F[Parameterized queries added]
  F --> G[Version patched to 6.4.3]
  G --> H[Exploit blocked]`,
  'CVE-2024-29901': `graph TD
  A[Attacker crafts session token] --> B[Sends via legacy SSO bridge]
  B --> C[Signature check skipped]
  C --> D[Session accepted as valid]
  D --> E[Account takeover]

  A --> F[Signature check enforced]
  F --> G[Version patched to 2.6.2]
  G --> H[Exploit blocked]`,
  'CVE-2023-44510': `graph TD
  A[Attacker posts comment] --> B[Script embedded in text]
  B --> C[Page renders comment unescaped]
  C --> D[Script runs in visitor browser]
  D --> E[Session or data stolen]

  A --> F[Output encoding enforced]
  F --> G[Version patched to 3.9.4]
  G --> H[Exploit blocked]`,
  'CVE-2023-41207': `graph TD
  A[Attacker publishes message] --> B[Payload shapes object type]
  B --> C[Mapper instantiates object]
  C --> D[Unexpected code path triggered]
  D --> E[Consumer service compromised]

  A --> F[Allow-list mapper added]
  F --> G[Version patched to 1.12]
  G --> H[Exploit blocked]`,
  'CVE-2023-39112':
`graph TD
  A[Attacker has low-priv API key] --> B[Queries debug endpoint]
  B --> C[Internal config returned]
  C --> D[Hostnames exposed]
  D --> E[Used to plan further attack]

  A --> F[Debug endpoint disabled]
  F --> G[Version patched to 5.2.1]
  G --> H[Exploit blocked]`,
};
