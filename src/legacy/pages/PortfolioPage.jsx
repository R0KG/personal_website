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
    id: '001',
    name: 'RustFlow',
    summary: 'Distributed Rust service for querying uploaded CSV telemetry with an Axum API, worker queue, and object storage.',
    tags: ['Rust', 'Axum', 'DataFusion'],
    result: 'Purpose: learn and operate a bounded distributed data-processing workflow.',
    tone: 'featured',
    icon: 'chart-multiple',
    repoUrl: 'https://github.com/R0KG/Rustlflow',
  },
  {
    id: '002',
    name: 'Agent Security Evals',
    summary: 'Deterministic evaluation harness for tool-using AI agents, with synthetic fixtures for prompt injection, data loss, and approval checks.',
    tags: ['Python', 'AI Security', 'Testing'],
    result: 'Purpose: turn agent security boundaries into repeatable regression tests.',
    tone: 'gold',
    icon: 'shield',
    repoUrl: 'https://github.com/R0KG/agent-security-evals',
  },
  {
    id: '003',
    name: 'Bughunt Platform',
    summary: 'Policy-gated security research platform for scoped reconnaissance, durable evidence, and reviewable reports.',
    tags: ['Python', 'Security', 'Policy'],
    result: 'Purpose: keep controlled research workflows bounded, observable, and evidence-led.',
    tone: 'gold',
    icon: 'shield',
    repoUrl: 'https://github.com/R0KG/happy_cyber',
  },
  {
    id: '004',
    name: 'FounderOrFraud',
    summary: 'Full-stack prototype for company assessment workflows, with scan, monitoring, report, webhook, and billing surfaces.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL'],
    result: 'Purpose: explore an operational product surface from web UI through backend tooling.',
    tone: 'featured',
    icon: 'wallet',
    repoUrl: 'https://github.com/R0KG/fraud',
  },
  {
    id: '005',
    name: 'EvoLife',
    summary: 'CPU-first artificial ecosystem prototype with inherited parameters, mutation, species tracking, and persistent run history.',
    tags: ['Python', 'JAX', 'Simulation'],
    result: 'Local research prototype: reproducible ecosystem experiments and event analysis.',
    tone: 'gold',
    icon: 'chart-multiple',
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
            Selected codebases across distributed systems, AI security, research tooling, and
            simulation. Public repositories are linked where available.
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
            <div><span>Primary stack</span><strong>Rust / Python / TS</strong></div>
            <div><span>Portfolio set</span><strong>4 public + 1 local</strong></div>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
