import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

export default function NotFoundPage() {
  const { pathname } = useLocation();

  // Keep missing pages out of search results and make the tab title honest.
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.createElement('meta');
    meta.name = 'robots'; meta.content = 'noindex';
    document.head.appendChild(meta);
    document.title = 'Page not found | Roman Merk';
    return () => { document.title = previousTitle; meta.remove(); };
  }, []);

  return (
    <PageShell
      activeKey="notfound"
      sidebarTitle="Roman Merk"
      sidebarSubtitle="Lvl 99 architect"
      sidebarCtaLabel="View Portfolio"
      sidebarCtaHref="/portfolio"
      footerText="Professional-first, retro-second. The interface should feel like a precise instrument."
      footerLinks={footerLinks}
    >
      <motion.section className="notfound" {...fadeUp()} aria-labelledby="notfound-title">
        <div className="notfound__tag">ERROR_404 / MAP_NOT_FOUND</div>
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 id="notfound-title">This area is not on the map.</h1>
        <p className="notfound__lead">The link may be old or the address mistyped. Nothing is broken on your side. Pick a known route below to get back on track.</p>
        <p className="notfound__path"><span>PATH</span> <code>{pathname}</code></p>
        <div className="notfound__actions">
          <AppLink className="home-btn home-btn--primary" to="/">Back to home</AppLink>
          <AppLink className="home-btn home-btn--secondary" to="/portfolio">Selected work</AppLink>
          <AppLink className="home-btn home-btn--dark" to="/research-lab">Research lab</AppLink>
        </div>
      </motion.section>
    </PageShell>
  );
}
