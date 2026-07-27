# VulnWatch

Real-time CVE monitoring and plain-language explanation platform for project teams.

VulnWatch bridges the gap between security teams and non-technical stakeholders by
translating raw vulnerability data into plain-language explanations, visual exploit
flowcharts, and actionable patch guidance — filtered to each team's own tech stack.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Features

- **Team stack setup** — a 3-step onboarding wizard to register the vendors and
  products your team runs, editable anytime from Settings
- **CVE feed** — real-time alerts scoped to your stack, polling every 5 minutes,
  with severity/vendor/remediation filters and a "New" badge on recent CVEs
- **CVE detail view** — four tabs per vulnerability:
  - **Overview** — CVSS v2/v3 gauges, CWE tags, affected versions, and a
    plain-language breakdown (what it is, what an attacker gains, how to fix it)
  - **Exploit Flowchart** — an auto-generated Mermaid diagram of the attack chain,
    exportable as PNG
  - **Plain English** — a jargon-free analogy for non-technical stakeholders, with
    one-click copy
  - **Remediation Tracker** — status (unreviewed / under analysis / risk accepted /
    patched), assignee, notes, and a patch checklist
- **Search & browse** — debounced full-text CVE search independent of your stack,
  with pagination
- **Severity dashboard** — CVE count by severity, a 30-day publication timeline,
  top 5 open critical CVEs, and remediation progress as a pie chart
- **Demo mode** — six seeded CVEs (Critical RCE through Low info disclosure), each
  with canned explanations, analogies, and flowcharts, so the whole app works with
  zero API credentials

## Tech stack

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) v4
- [react-router-dom](https://reactrouter.com) for navigation
- [recharts](https://recharts.org) for CVSS gauges and analytics charts
- [lucide-react](https://lucide.dev) for icons
- [mermaid](https://mermaid.js.org) for exploit flowcharts
- [html2canvas](https://html2canvas.hertzen.com) for PNG export
- [OpenCVE API](https://www.opencve.io/api) for CVE data
- [Anthropic API](https://docs.claude.com) for explanations, analogies, and
  flowchart generation

No paid component libraries, no backend — team profile, CVE cache, and
remediation status all persist to `localStorage`.

## Getting started

```bash
git clone <your-repo-url>
cd vulnwatch
npm install
npm run dev
```

The app starts in **demo mode** by default (`VITE_DEMO_MODE=true`), using seeded
CVE data and canned Claude responses so you can explore every feature without any
API credentials.

## Environment variables

Copy `.env.example` to `.env` and fill in your own values to go live:

| Variable                | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `VITE_OPENCVE_BASE_URL`  | OpenCVE API base URL (`https://www.opencve.io`)                                |
| `VITE_OPENCVE_USERNAME`  | Your OpenCVE account username                                                  |
| `VITE_OPENCVE_PASSWORD`  | Your OpenCVE account password                                                  |
| `VITE_CLAUDE_API_KEY`    | An Anthropic API key ([console.anthropic.com](https://console.anthropic.com))  |
| `VITE_DEMO_MODE`         | `true` to use seeded data, `false` for live API calls                          |

You'll need a free [OpenCVE](https://www.opencve.io) account for CVE data and an
Anthropic API key for the AI-generated explanations, analogies, and flowcharts.

## Build & deploy

```bash
npm run build
```

Outputs a static site in `dist/`. `vercel.json` is included with a SPA rewrite
rule, so the project deploys to [Vercel](https://vercel.com) out of the box — it
also works on any static host that supports client-side routing fallbacks
(Netlify, GitHub Pages with a 404 redirect, S3 + CloudFront, etc.).

## Project structure

```
src/
  components/
    Navbar.jsx
    CVECard.jsx
    SeverityBadge.jsx
    RemediationBadge.jsx
    MermaidChart.jsx
    CvssGauge.jsx
    Onboarding/
      OnboardingWizard.jsx
      StackBuilder.jsx
    CVEDetail/
      OverviewTab.jsx
      ExploitTab.jsx
      PlainEnglishTab.jsx
      RemediationTab.jsx
    Dashboard/
      FeedFilters.jsx
      SeverityCharts.jsx
  context/
    TeamProfileContext.jsx
  data/
    demoCves.js       # seeded CVE records
    demoClaude.js      # canned explanations, analogies, mermaid code
  utils/
    opencveApi.js
    claudeApi.js
    storage.js
    mermaidHelper.js
  pages/
    DashboardPage.jsx
    CVEDetailPage.jsx
    SearchPage.jsx
    AnalyticsPage.jsx
    SettingsPage.jsx
  App.jsx
  main.jsx
```

## Data model

Team profile, CVE cache, and remediation status are stored in `localStorage`
under these keys:

- `vulnwatch_team` — team name, id, and registered stack
- `vulnwatch_cve_cache` — cached Claude responses per CVE, so a CVE is never
  re-sent to the API once explained
- `vulnwatch_remediation` — per-CVE status, assignee, and notes

## License

MIT — see `LICENSE` (add your preferred license file before publishing).
