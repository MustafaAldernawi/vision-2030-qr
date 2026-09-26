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
  assert.match(download, /new URL\(['"]documents\/vision-2030\.pdf['"], window\.location\.href\)/);
  assert.match(download, /new URL\(['"]documents\/vision-2030-projects\.pdf['"], window\.location\.href\)/);
  assert.match(download, /manual-projects-download/);
  assert.match(download, /download/);
  assert.match(download, /auto/);
});

test('repository has a GitHub Pages deployment workflow and update guidance', () => {
  const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');
  const readme = readFileSync('README.md', 'utf8');
  assert.match(workflow, /actions\/deploy-pages/);
  assert.match(workflow, /actions\/upload-pages-artifact/);
  assert.match(readme, /vision-2030\.pdf/);
});
