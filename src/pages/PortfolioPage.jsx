import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const projects = [
  {
    id: '001',
    name: 'phantom-wallet-replica',
    summary: 'TypeScript wallet interface build with a deployed live demo and product-focused frontend execution.',
    tags: ['TypeScript', 'Frontend', 'Vercel'],
    result: 'Result / purpose: replica UI implementation with live public deployment',
    tone: 'gold',
    icon: 'wallet',
    repoUrl: 'https://github.com/R0KG/phantom-wallet-replica',
    liveUrl: 'https://phantom-wallet-replica.vercel.app',
  },
  {
    id: '002',
    name: 'trans_ansamble',
    summary: 'Transformer implementation in Python, focused on core sequence-model architecture and training logic.',
    tags: ['Python', 'Transformer', 'ML'],
    result: 'Result / purpose: concise transformer implementation for model experimentation',
    tone: 'featured',
    icon: 'chart-multiple',
    repoUrl: 'https://github.com/R0KG/trans_ansamble',
  },
  {
    id: '003',
    name: 'deepfake-guardian',
    summary: 'Detection-focused project oriented around media authenticity and defensive analysis workflows.',
    tags: ['JavaScript', 'Security', 'AI'],
    result: 'Result / purpose: applied detection workflow for authenticity review',
    tone: 'gold',
    icon: 'shield',
    repoUrl: 'https://github.com/R0KG/deepfake-guardian',
  },
];

export default function PortfolioPage() {
  return (
    <PageShell
      activeKey="portfolio"
      sidebarTitle="Analog Executive"
      sidebarSubtitle="Projects view"
      sidebarCtaLabel="Open Case Study"
      sidebarCtaHref="/project"
      footerText="High-performance architecture, security products, and technical implementation surfaces."
      footerLinks={footerLinks}
    >
      <motion.section className="portfolio-page" {...fadeUp()}>
        <div className="portfolio-hero">
          <div className="portfolio-hero__ghost">PRJ</div>
          <h1>
            Engineering
            <br />
            Portfolio
          </h1>
          <div className="portfolio-hero__bar"></div>
          <p>
            Selected public builds from GitHub, focused on interface engineering, applied AI, and
            defensive tooling.
          </p>
        </div>

        <div className="portfolio-toggle">
          <span className="portfolio-toggle__active">View: Standard</span>
          <span>Repos linked</span>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article
              key={project.name}
              className={`portfolio-card ${
                project.tone === 'featured' ? 'portfolio-card--featured' : 'portfolio-card--gold'
              }`}
            >
              <div className="portfolio-card__topline">
                <span className="portfolio-card__icon">
                  <Icon name={project.icon} aria-hidden="true" />
                </span>
                <span className="portfolio-card__id">ID: {project.id}</span>
              </div>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <div className="portfolio-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="portfolio-card__result">{project.result}</div>
              <div className="portfolio-card__actions">
                <AppLink
                  className="portfolio-chip-button"
                  to={project.liveUrl || project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.liveUrl ? 'Live Link' : 'Open Repo'}
                </AppLink>
                <AppLink
                  className="portfolio-icon-button"
                  to={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name} repository`}
                >
                  &lt;&gt;
                </AppLink>
              </div>
            </article>
          ))}
        </div>

        <motion.section className="portfolio-manifesto" {...fadeUp(0.08)}>
          <div className="portfolio-manifesto__copy">
            <h2>Technical Manifesto</h2>
            <p>
              The portfolio is now wired to actual public repositories. Priority goes to projects
              that show shipped UI work, model implementation, and security-oriented thinking.
            </p>
            <ul className="portfolio-manifesto__list">
              <li>Public repo backed</li>
              <li>Code first evidence</li>
            </ul>
          </div>
          <div className="portfolio-manifesto__stats">
            <div><span>Featured profile</span><strong>R0KG</strong></div>
            <div><span>Primary stack</span><strong>TS / Python</strong></div>
            <div><span>Live demo</span><strong>1 linked</strong></div>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
