import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 2200 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173/skills', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'tmp/page_shots/skills-current.png', fullPage: true });
await browser.close();
