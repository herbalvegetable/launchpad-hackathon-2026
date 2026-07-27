// Curated stacks most developers use. vendor/product values match OpenCVE
// CPE names (verified against GET /vendors/{vendor}/products/{product}).
// Labels are for display only — CVE feed queries still use vendor + product.

export const popularStacks = [
  { vendor: 'nginx', product: 'nginx', label: 'Nginx' },
  { vendor: 'apache', product: 'http_server', label: 'Apache HTTP Server' },
  { vendor: 'postgresql', product: 'postgresql', label: 'PostgreSQL' },
  { vendor: 'mysql', product: 'mysql', label: 'MySQL' },
  { vendor: 'mongodb', product: 'mongodb', label: 'MongoDB' },
  { vendor: 'redis', product: 'redis', label: 'Redis' },
  { vendor: 'sqlite', product: 'sqlite', label: 'SQLite' },
  { vendor: 'openssl', product: 'openssl', label: 'OpenSSL' },
  { vendor: 'linux', product: 'linux_kernel', label: 'Linux Kernel' },
  { vendor: 'canonical', product: 'ubuntu_linux', label: 'Ubuntu Linux' },
  { vendor: 'debian', product: 'debian_linux', label: 'Debian Linux' },
  { vendor: 'redhat', product: 'enterprise_linux', label: 'Red Hat Enterprise Linux' },
  { vendor: 'amazon', product: 'amazon_linux', label: 'Amazon Linux' },
  { vendor: 'microsoft', product: 'windows_10', label: 'Windows 10' },
  { vendor: 'docker', product: 'docker', label: 'Docker' },
  { vendor: 'kubernetes', product: 'kubernetes', label: 'Kubernetes' },
  { vendor: 'python', product: 'python', label: 'Python' },
  { vendor: 'php', product: 'php', label: 'PHP' },
  { vendor: 'go', product: 'go', label: 'Go' },
  { vendor: 'expressjs', product: 'express', label: 'Express.js' },
  { vendor: 'angular', product: 'angular', label: 'Angular' },
  { vendor: 'spring', product: 'spring_framework', label: 'Spring Framework' },
  { vendor: 'laravel', product: 'framework', label: 'Laravel' },
  { vendor: 'wordpress', product: 'wordpress', label: 'WordPress' },
  { vendor: 'google', product: 'chrome', label: 'Google Chrome' },
  { vendor: 'mozilla', product: 'firefox', label: 'Mozilla Firefox' },
  { vendor: 'oracle', product: 'jdk', label: 'Oracle JDK' },
  { vendor: 'elastic', product: 'elasticsearch', label: 'Elasticsearch' },
  { vendor: 'hashicorp', product: 'terraform', label: 'Terraform' },
  { vendor: 'gitlab', product: 'gitlab', label: 'GitLab' },
  { vendor: 'jenkins', product: 'jenkins', label: 'Jenkins' },
  { vendor: 'vmware', product: 'vsphere', label: 'VMware vSphere' },
  { vendor: 'fortinet', product: 'fortios', label: 'FortiOS' },
  { vendor: 'cisco', product: 'ios', label: 'Cisco IOS' },
];

/**
 * Local filter over popularStacks — never hits OpenCVE.
 * Empty query returns the full curated list (preloaded suggestions).
 */
export function searchPopularStacks(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return popularStacks;

  return popularStacks.filter((s) => {
    const haystack = [s.vendor, s.product, s.label].join(' ').toLowerCase();
    return q.split(/\s+/).every((part) => haystack.includes(part));
  });
}
