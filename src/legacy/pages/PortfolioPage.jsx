import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const projects = [
  {
    id: '001', name: 'Enterprise AI Lab',
    summary: 'A document question-answering lab that extracts PDF text, finds relevant passages, and returns answers with sources.',
    tags: ['Python', 'RAG', 'pgvector'], result: 'Focus: document ingestion, retrieval, and evaluation.',
    tone: 'featured', icon: 'lightbulb', image: '/images/projects/ai-lab.webp',
    repoUrl: 'https://github.com/R0KG/ai_lab',
  },
  {
    id: '002', name: 'Agent Orchestration',
    summary: 'A TypeScript experiment coordinating parallel AI sessions and passing their results to a final coordinator.',
    tags: ['TypeScript', 'Agents', 'Pi SDK'], result: 'Focus: explicit handoffs, failure handling, and inspectable runs.',
    tone: 'gold', icon: 'code', image: '/images/projects/orchestration.webp',
    repoUrl: 'https://github.com/R0KG/multi_agent/tree/main/pi-lab',
  },
  {
    id: '003', name: 'Agent Security Evals',
    summary: 'A deterministic evaluation harness for agent tool calls, using synthetic cases for injection, data handling, and approvals.',
    tags: ['Python', 'AI Security', 'Testing'], result: 'Focus: repeatable security checks at the tool boundary.',
    tone: 'gold', icon: 'shield', image: '/images/projects/security.webp',
    repoUrl: 'https://github.com/R0KG/agent-security-evals',
  },
  {
    id: '004', name: 'RustFlow',
    summary: 'A distributed Rust service for querying uploaded CSV telemetry with an API, worker queue, and object storage.',
    tags: ['Rust', 'Axum', 'DataFusion'], result: 'Focus: bounded distributed data processing.',
    tone: 'gold', icon: 'chart-multiple', image: '/images/projects/rustflow.webp',
    repoUrl: 'https://github.com/R0KG/Rustlflow',
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
            Selected experiments in AI engineering, agent security, and distributed systems.
            Each project is available to explore on GitHub.
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
              <div className="portfolio-card__art"><img src={project.image} alt="" loading="lazy" /></div>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <div className="portfolio-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="portfolio-card__result">{project.result}</div>
              <div className="portfolio-card__actions">
                {project.repoUrl ? (
                  <>
                    <AppLink className="portfolio-chip-button" to={project.repoUrl} target="_blank" rel="noreferrer">
                      Open Repo
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
                  </>
                ) : (
                  <span className="portfolio-chip-button portfolio-chip-button--static">Local prototype</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <motion.section className="portfolio-manifesto" {...fadeUp(0.08)}>
          <div className="portfolio-manifesto__copy">
            <h2>Technical Manifesto</h2>
            <p>
              These cards are grounded in the codebases currently maintained locally. Public source
              is linked directly; private research material is intentionally excluded.
            </p>
            <ul className="portfolio-manifesto__list">
              <li>Evidence-based scope</li>
              <li>Public links where available</li>
            </ul>
          </div>
          <div className="portfolio-manifesto__stats">
            <div><span>Featured profile</span><strong>R0KG</strong></div>
            <div><span>Primary stack</span><strong>Python / TS / Rust</strong></div>
            <div><span>Portfolio set</span><strong>4 public repos</strong></div>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
