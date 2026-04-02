import { chromium } from 'playwright';

const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['portfolio', '/portfolio'],
  ['services', '/services'],
  ['skills', '/skills'],
  ['project', '/project'],
  ['contact', '/contact'],
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 3584 }, deviceScaleFactor: 1 });

for (const [name, path] of routes) {
  await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `tmp/page_shots/${name}.png`, fullPage: true });
}

await browser.close();
