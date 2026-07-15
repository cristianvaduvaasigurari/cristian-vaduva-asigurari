/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/form-verification.js
const puppeteer = require('puppeteer-core');
// Automated end‑to‑end verification of all ContactForm pages.
// Runs against the local dev server (http://localhost:3000).
// For each page it:
//   1. Loads the page.
//   2. Fills the ContactForm with test data.
//   3. Submits the form.
//   4. Waits for a POST /api/lead response (expects HTTP 200).
//   5. Waits for the success overlay containing "Mesaj Trimis!".
// No environment secrets are accessed and no Telegram API is called.

const puppeteer = require('puppeteer-core');

// Pages that contain a ContactForm component.
const pages = [
  '/',
  '/aixbeneficiu',
  '/servicii/health-insurance',
  '/servicii/health-insurance-individual',
  '/servicii/business-building-insurance',
  '/servicii/fleet-insurance',
  '/servicii/pad-insurance',
  '/servicii/business-Expert-liability',
  '/servicii/auto-insurance',
  '/servicii/business-directors-liability',
  '/servicii/life-insurance-capitalizare',
  '/servicii/health-insurance-corporate',
  '/servicii/imm-insurance',
  '/servicii/casco-insurance',
  '/servicii/travel-insurance-annual',
  '/servicii/travel-insurance-family',
  '/servicii/accident-insurance',
  '/servicii/business-cyber-insurance',
  '/servicii/business-construction-insurance',
  '/servicii/travel-insurance-individual',
  '/servicii/rca-insurance',
  '/servicii/business-general-liability',
  '/servicii/business-malpractice-insurance',
  '/servicii/business-equipment-insurance',
  '/servicii/business-cargo-insurance',
];

// Test data used for every form.
const testData = {
  name: 'Test User',
  phone: '0712345678',
  email: 'test@example.com',
  message: 'This is a test',
};

(async () => {
  const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    timeout: 30000,
  });

  const results = [];

  for (const path of pages) {
    const page = await browser.newPage();
    const url = `http://localhost:3000${path}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (e) {
      results.push({ page: path, httpOk: false, successOverlay: false, error: 'Navigation timeout' });
      await page.close();
      continue;
    }

    // Fill form fields (selectors are based on ContactForm component).
    try {
      await page.type('input[name="name"]', testData.name);
      await page.type('input[name="phone"]', testData.phone);
      await page.type('input[name="email"]', testData.email);
    } catch (e) {
      results.push({ page: path, httpOk: false, successOverlay: false, error: 'Form fields missing' });
      await page.close();
      continue;
    }

    // Choose the first real option in the service dropdown.
    const serviceValues = await page.$$eval('select[name="service"] option', opts =>
      opts.map(o => o.value).filter(v => v && v !== '')
    );
    if (serviceValues.length) {
      await page.select('select[name="service"]', serviceValues[0]);
    }

    await page.type('textarea[name="message"]', testData.message);

    // Prepare to capture the POST /api/lead response.
    const leadResponsePromise = page.waitForResponse(r =>
      r.url().endsWith('/api/lead') && r.request().method() === 'POST'
    );

    // Submit the form.
    await page.click('button[type="submit"]');

    // Wait for the response (timeout after 10s).
    let leadResponse = null;
    try {
      leadResponse = await leadResponsePromise;
    } catch (_) {
      // No response captured.
    }

    // Wait for the success overlay.
    let successOverlay = false;
    try {
      await page.waitForFunction(
        () => document.body.innerText.includes('Mesaj Trimis!'),
        { timeout: 10000 }
      );
      successOverlay = true;
    } catch (_) {}

    const httpOk = leadResponse && leadResponse.status() === 200;
    results.push({ page: path, httpOk, successOverlay, error: httpOk ? null : 'No 200 response' });
    await page.close();
  }

  await browser.close();

  console.log('\n--- Verification Report ---');
  console.log('| Page | HTTP 200 | Success Overlay |');
  console.log('|------|----------|----------------|');
  for (const r of results) {
    console.log(`| ${r.page} | ${r.httpOk ? '✅' : '❌'} | ${r.successOverlay ? '✅' : '❌'} |`);
  }
  console.log('--- End of Report ---');
})();
