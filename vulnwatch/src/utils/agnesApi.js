import { demoAgnesExplanations, demoAgnesAnalogies, demoAgnesMermaid } from '../data/demoAgnes';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';
const API_BASE = import.meta.env.VITE_AGNES_API_BASE_URL || 'https://apihub.agnes-ai.com/v1';
const API_KEY = import.meta.env.VITE_AGNES_API_KEY || '';
const MODEL = import.meta.env.VITE_AGNES_MODEL || 'agnes-2.0-flash';

class AgnesApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AgnesApiError';
  }
}

const EXPLAIN_SYSTEM_PROMPT = `You are VulnWatch, a security analyst assistant.
The user will provide raw CVE JSON data.

Your job is to explain this vulnerability clearly for a mixed technical
and non-technical business audience. Include:
1. What the vulnerability is in one sentence
2. What an attacker could do if they exploit it (be specific and concrete)
3. Which systems or versions are affected
4. How severe it is and why (reference the CVSS score)
5. Exactly what the team should do to fix or mitigate it

You MUST respond ONLY in this exact JSON format, no extra text,
no markdown, no backticks:
{
  "oneLiner": "string",
  "attackerCapability": "string",
  "affectedSystems": ["string"],
  "severityExplanation": "string",
  "patchSteps": ["string"],
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "NONE"
}`;

const ANALOGY_SYSTEM_PROMPT = `You are VulnWatch, a security analyst assistant.
The user will provide a plain-language description of a CVE vulnerability.

Write a SHORT, vivid real-world analogy (3-5 sentences) that explains
how this vulnerability works to someone with no technical background.
The analogy should make the danger feel real and urgent without being
alarmist. Do not use jargon. End with one concrete sentence on what
"patching" means in everyday terms.

Respond with plain text only - no JSON, no markdown, no headers.`;

const MERMAID_SYSTEM_PROMPT = `You are VulnWatch, a security diagram generator.
The user will provide details about a CVE vulnerability including the
attack vector, what the attacker gains at each step, and the patch.

Generate a Mermaid flowchart (graph TD) showing the exploit chain:
- Start: Attacker's initial position / entry point
- Each step the attacker takes to escalate
- The impact at the end (what they gain access to)
- A separate branch showing the patched path that blocks the exploit

Use short node labels (under 8 words each). Make it readable at a glance.
Respond with ONLY the raw Mermaid code block - no explanation, no markdown
fences, just the graph TD ... content itself.`;

async function callAgnes(systemPrompt, userContent) {
  if (!API_KEY) {
    throw new AgnesApiError('No Agnes AI API key configured. Enable demo mode or set VITE_AGNES_API_KEY.');
  }
  let response;
  try {
    response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
      }),
    });
  } catch (err) {
    throw new AgnesApiError('Could not reach the Agnes AI API. Check your network connection.');
  }

  if (response.status === 401) {
    throw new AgnesApiError('Agnes AI API authentication failed. Check VITE_AGNES_API_KEY.');
  }
  if (response.status === 429) {
    throw new AgnesApiError('Agnes AI API rate limit reached. Try again shortly.');
  }
  if (!response.ok) {
    throw new AgnesApiError(`Agnes AI API request failed (${response.status}).`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new AgnesApiError('Agnes AI API returned an empty response.');
  return content;
}

function simulateLatency(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Plain-language breakdown of a CVE. Returns the parsed JSON object described
 * in EXPLAIN_SYSTEM_PROMPT.
 */
export async function explainCVE(cveData) {
  if (DEMO_MODE) {
    await simulateLatency();
    const canned = demoAgnesExplanations[cveData.id];
    if (canned) return canned;
    return {
      oneLiner: 'No canned explanation available for this CVE in demo mode.',
      attackerCapability: 'N/A',
      affectedSystems: [],
      severityExplanation: 'N/A',
      patchSteps: [],
      severity: cveData.severity || 'NONE',
    };
  }
  const raw = await callAgnes(EXPLAIN_SYSTEM_PROMPT, JSON.stringify(cveData));
  try {
    return JSON.parse(raw.trim().replace(/^```json\s*|\s*```$/g, ''));
  } catch (err) {
    throw new AgnesApiError('Agnes AI returned a response that could not be parsed as JSON.');
  }
}

/**
 * Non-technical analogy for a CVE. Returns plain text.
 */
export async function generateAnalogy(cveData) {
  if (DEMO_MODE) {
    await simulateLatency();
    return (
      demoAgnesAnalogies[cveData.id] ||
      'No canned analogy available for this CVE in demo mode.'
    );
  }
  const description = cveData.oneLiner || cveData.summary || JSON.stringify(cveData);
  return callAgnes(ANALOGY_SYSTEM_PROMPT, description);
}

/**
 * Exploit-chain flowchart for a CVE, as raw Mermaid `graph TD` code.
 */
export async function generateMermaid(cveData) {
  if (DEMO_MODE) {
    await simulateLatency();
    return (
      demoAgnesMermaid[cveData.id] ||
      `graph TD\n  A[Entry point] --> B[Exploit chain unavailable in demo mode]`
    );
  }
  const raw = await callAgnes(MERMAID_SYSTEM_PROMPT, JSON.stringify(cveData));
  return raw.trim().replace(/^```(mermaid)?\s*|\s*```$/g, '');
}

export { AgnesApiError };
