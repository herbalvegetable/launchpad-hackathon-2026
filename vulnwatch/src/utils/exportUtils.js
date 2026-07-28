// Client-only export helpers for the Codebase CVE Analysis dashboard.
// PDF export intentionally reuses the browser's native print-to-PDF instead
// of pulling in a new PDF-generation dependency - `triggerPrintExport`
// pairs with the `[data-print-area]` / `.no-print` rules in index.css to
// print just the results, which the user can then "Save as PDF" from the
// print dialog.

const CSV_COLUMNS = [
  ['cveId', 'CVE ID'],
  ['severity', 'Severity'],
  ['cvssScore', 'CVSS Score'],
  ['confidence', 'Confidence'],
  ['affectedComponent', 'Affected Component'],
  ['detectedVersion', 'Detected Version'],
  ['vulnerableVersionRange', 'Vulnerable Version Range'],
  ['evidenceFound', 'Evidence Found'],
  ['whyAffected', 'Why This Organisation Is Affected'],
  ['businessImpact', 'Potential Business Impact'],
  ['recommendedFix', 'Recommended Fix'],
  ['fixedVersion', 'Fixed Version'],
  ['references', 'References'],
];

function csvEscape(value) {
  const str = value == null ? '' : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/** Downloads the given findings as a CSV file. */
export function exportFindingsToCsv(findings, filename = 'codebase-cve-analysis.csv') {
  const header = CSV_COLUMNS.map(([, label]) => csvEscape(label)).join(',');
  const rows = findings.map((f) =>
    CSV_COLUMNS.map(([key]) => {
      const value = key === 'references' ? (f.references || []).join('; ') : f[key];
      return csvEscape(value);
    }).join(',')
  );
  const csv = [header, ...rows].join('\n');
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), filename);
}

/** Opens the browser print dialog scoped to the `[data-print-area]` element. */
export function triggerPrintExport() {
  window.print();
}
