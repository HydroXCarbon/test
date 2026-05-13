import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const lighthouseDir = resolve(__dirname, '..');
const runsDir = join(lighthouseDir, 'runs');
const tsvPath = join(lighthouseDir, 'results.tsv');
const latestPath = join(lighthouseDir, 'latest.json');

// --- CLI args: --url=<url> --note=<label> ---
const args = process.argv.slice(2);
const getArg = (key) =>
  args.find((a) => a.startsWith(`--${key}=`))?.slice(key.length + 3) ?? '';
const targetUrl = getArg('url') || 'http://localhost:3000';
const note = getArg('note');

mkdirSync(runsDir, { recursive: true });

// --- Git context ---
let branch = 'unknown';
let commit = 'unknown';
try {
  const root = resolve(lighthouseDir, '..');
  branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: root }).toString().trim();
  commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
} catch { /* not in git or git not available */ }

console.log(`\n⚡ Lighthouse audit`);
console.log(`   URL    : ${targetUrl}`);
console.log(`   Branch : ${branch} @ ${commit}`);
if (note) console.log(`   Note   : ${note}`);
console.log('');

// --- Launch Chrome ---
const chrome = await launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

let lhr;
try {
  const result = await lighthouse(targetUrl, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  lhr = result.lhr;
} finally {
  await chrome.kill();
}

// --- Write full JSON report ---
const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const jsonPath = join(runsDir, `${ts}.json`);
writeFileSync(jsonPath, JSON.stringify(lhr, null, 2));
writeFileSync(latestPath, JSON.stringify(lhr, null, 2));

// --- Extract scores ---
const catScore = (cat) => Math.round((lhr.categories[cat]?.score ?? 0) * 100);
const auditMs = (id) => Math.round(lhr.audits[id]?.numericValue ?? 0);

const perf = catScore('performance');
const a11y = catScore('accessibility');
const bp = catScore('best-practices');
const seo = catScore('seo');
const fcp_ms = auditMs('first-contentful-paint');
const lcp_ms = auditMs('largest-contentful-paint');
const tbt_ms = auditMs('total-blocking-time');
const cls = (lhr.audits['cumulative-layout-shift']?.numericValue ?? 0).toFixed(3);
const si_ms = auditMs('speed-index');
const tti_ms = auditMs('interactive');

// --- Append TSV row ---
const TSV_HEADER =
  'timestamp\tbranch\tcommit\tperf\ta11y\tbp\tseo\tfcp_ms\tlcp_ms\ttbt_ms\tcls\tsi_ms\ttti_ms\turl\tnote';
const row = [
  ts, branch, commit, perf, a11y, bp, seo,
  fcp_ms, lcp_ms, tbt_ms, cls, si_ms, tti_ms,
  targetUrl, note,
].join('\t');

if (!existsSync(tsvPath)) {
  writeFileSync(tsvPath, TSV_HEADER + '\n');
}
appendFileSync(tsvPath, row + '\n');

// --- Summary ---
const grade = (s) => (s >= 90 ? '🟢' : s >= 50 ? '🟡' : '🔴');
const ms2s = (ms) => (ms / 1000).toFixed(1) + 's';

console.log('Scores');
console.log(`  ${grade(perf)}  Performance   ${perf}`);
console.log(`  ${grade(a11y)}  Accessibility ${a11y}`);
console.log(`  ${grade(bp)}  Best Practices ${bp}`);
console.log(`  ${grade(seo)}  SEO           ${seo}`);
console.log('');
console.log('Web Vitals');
console.log(`  FCP ${ms2s(fcp_ms)}  LCP ${ms2s(lcp_ms)}  TBT ${tbt_ms}ms  CLS ${cls}  SI ${ms2s(si_ms)}  TTI ${ms2s(tti_ms)}`);
console.log('');
console.log(`Report  → ${jsonPath}`);
console.log(`TSV     → ${tsvPath}`);
console.log(`Dashboard → run: npm run lh:dash`);
