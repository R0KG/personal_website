import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1800 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
const projects = await page.locator('.home-projects').first();
await projects.screenshot({ path: 'tmp/page_shots/home-projects-current.png' });
await browser.close();
