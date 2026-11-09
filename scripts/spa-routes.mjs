// After `vite build`: give every client-side route its own index.html so static hosting
// (GitHub Pages) answers with HTTP 200 instead of the 404.html fallback.
// Link previews and crawlers treat a 404 status as a missing page.
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const routes = ['about', 'portfolio', 'services', 'skills', 'project', 'contact', 'research-lab']; // keep in sync with src/App.jsx
const index = join(dist, 'index.html');
if (!existsSync(index)) { console.error('dist/index.html not found; run vite build first'); process.exit(1); }
for (const route of routes) {
  mkdirSync(join(dist, route), { recursive: true });
  copyFileSync(index, join(dist, route, 'index.html'));
}
copyFileSync(index, join(dist, '404.html')); // unknown URLs still load the app
console.log(`spa-routes: wrote ${routes.length} route pages and 404.html`);
