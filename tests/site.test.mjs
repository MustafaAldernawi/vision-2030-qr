import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'download.html',
  'documents/vision-2030.pdf',
  'documents/vision-2030-projects.pdf',
  'assets/images/cover.png',
  'assets/js/qrcode.min.js'
];

test('publishes the original PDF and the local visual assets', () => {
  for (const file of requiredFiles) assert.ok(existsSync(file), `Missing ${file}`);
});

test('pages implement the stable QR and download contract', () => {
  const index = readFileSync('index.html', 'utf8');
  const download = readFileSync('download.html', 'utf8');
  const script = readFileSync('assets/js/site.js', 'utf8');
  assert.match(index, /<html[^>]+dir="rtl"/);
  assert.match(script, /new URL\(['"]download\.html['"], window\.location\.href\)/);
  assert.match(index, /copy-download-link/);
  assert.match(index, /save-qr/);
  assert.match(download, /href="documents\/vision-2030\.pdf"/);
  assert.match(download, /href="documents\/vision-2030-projects\.pdf"/);
  assert.match(download, /manual-projects-download/);
  assert.match(download, /الرؤية الاستراتيجية 2030 - عربي/);
  assert.match(download, /Vision 2030 - English/);
  assert.match(download, /English version of the strategic vision document/);
  assert.match(download, />Download PDF</);
  assert.match(download, /بلدية طرابلس المركز/);
  assert.doesNotMatch(download, /مكتبة الوثائق/);
  assert.match(download, /اختر الوثيقة التي تود تحميلها/);
  assert.doesNotMatch(download, /fetch\(/);
  assert.doesNotMatch(download, /setTimeout\(/);
  assert.match(readFileSync('assets/css/download-options.css', 'utf8'), /@font-face/);
  assert.match(download, /download/);
});

test('repository has a GitHub Pages deployment workflow and update guidance', () => {
  const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');
  const readme = readFileSync('README.md', 'utf8');
  assert.match(workflow, /actions\/deploy-pages/);
  assert.match(workflow, /actions\/upload-pages-artifact/);
  assert.match(readme, /vision-2030\.pdf/);
});
