import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const outDir = '/Users/cristianvaduva/.gemini/antigravity-ide/brain/58476c22-363f-4d99-971e-ee1ae9e62af7/scratch';

const routes = [
  { path: '/', name: 'homepage' },
  { path: '/raport-piata-asigurarilor', name: 'market_report' },
  { path: '/harta-risc-seismic-bucuresti', name: 'seismic_map' },
  { path: '/private-client', name: 'private_client' },
  { path: '/urgente', name: 'urgente' },
  { path: '/calculator-asigurare', name: 'calculator' },
  { path: '/verifica-polita', name: 'verifica_polita' },
  { path: '/international-clients', name: 'international_clients' },
];

const viewports = [
  { name: 'desktop_1280', width: 1280, height: 900 },
  { name: 'mobile_390', width: 390, height: 844 },
];

async function run() {
  const possiblePaths = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ];
  let executablePath = possiblePaths.find((p) => fs.existsSync(p));

  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
    console.log(`Using Chrome from: ${executablePath}`);
  }

  const browser = await puppeteer.launch(launchOptions);

  const page = await browser.newPage();

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.width < 500 });

    for (const route of routes) {
      const url = `http://localhost:3005${route.path}`;
      console.log(`Navigating to ${url} at ${vp.name}...`);
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
        const shotPath = path.join(outDir, `${route.name}_${vp.name}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
        console.log(`Saved screenshot: ${shotPath}`);
      } catch (e) {
        console.error(`Failed ${url}:`, e.message);
      }
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Inspection error:', err);
  process.exit(1);
});
