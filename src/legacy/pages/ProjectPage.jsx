import { motion } from 'framer-motion';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const featuredRepo = {
  name: 'RustFlow',
  repoUrl: 'https://github.com/R0KG/Rustlflow',
};

export default function ProjectPage() {
  return (
    <PageShell
      activeKey="portfolio"
      sidebarTitle="Case Study"
      sidebarSubtitle="Repo-backed detail"
      sidebarCtaLabel="Discuss Similar Project"
      sidebarCtaHref="/contact"
      footerText="Case studies should show operating logic, not just polished outcomes."
      footerLinks={footerLinks}
    >
      <motion.section className="project-page" {...fadeUp()}>
        <div className="project-header">
          <div>
            <h1>Projects</h1>
            <p>
              A selected view into the codebases behind this portfolio: distributed systems, AI
              security controls, and reproducible technical experiments.
            </p>
          </div>
          <div className="project-view-toggle">
            <span className="project-view-toggle__active">Standard view</span>
            <span>Repo linked</span>
          </div>
        </div>

        <div className="project-layout">
          <article className="project-main-card">
            <div className="project-main-card__image"></div>
            <div className="project-main-card__body">
              <div className="project-main-card__meta">
                <h2>{featuredRepo.name}</h2>
                <span>Public repository</span>
              </div>
              <p>
                A Rust service for running limited SQL queries over uploaded CSV telemetry. An Axum
                API stores metadata, NATS JetStream distributes partition tasks, DataFusion runs
                queries, and MinIO stores immutable results.
              </p>
              <div className="project-tags">
                <span>Rust</span>
                <span>Axum</span>
                <span>NATS</span>
                <span>DataFusion</span>
              </div>
              <div className="project-main-card__footer">
                <em>Focus: bounded distributed data processing</em>
                <AppLink to={featuredRepo.repoUrl} target="_blank" rel="noreferrer" aria-label="Open RustFlow repository">
                  ↗
                </AppLink>
              </div>
            </div>
          </article>

          <aside className="project-side-card">
            <h3>Repository access</h3>
            <p>
              The source, local Docker setup, architecture notes, and API flow are available in the
              public repository.
            </p>
            <div className="project-side-card__stack">
              <span>Links</span>
              <p>GitHub / Architecture / API</p>
            </div>
            <AppLink className="project-outline-button" to={featuredRepo.repoUrl} target="_blank" rel="noreferrer">
              Open Repo
            </AppLink>
          </aside>

          <article className="project-mini-card project-mini-card--peach">
            <div className="project-mini-card__heading">
              <span className="project-mini-icon"></span>
              <h3>Agent Security Evals</h3>
            </div>
            <p>
              Deterministic security checks for planned AI-agent tool calls, using safe synthetic
              fixtures for injection, data handling, and approval boundaries.
            </p>
            <div className="project-mini-card__meta">
              <div><span>Stack</span><strong>Python</strong></div>
              <div><span>Focus</span><strong>AI security</strong></div>
            </div>
          </article>

          <article className="project-mini-card">
            <div className="project-mini-card__heading">
              <span className="project-mini-icon project-mini-icon--db"></span>
              <h3>EvoLife</h3>
            </div>
            <p>
              A CPU-first artificial ecosystem prototype with mutation, lineage tracking, persistent
              observations, and reproducible simulation runs.
            </p>
            <div className="project-mini-card__meta">
              <div><span>Stack</span><strong>Python / JAX</strong></div>
              <div><span>Focus</span><strong>Simulation</strong></div>
            </div>
          </article>
        </div>

        <motion.section className="project-manifest" {...fadeUp(0.08)}>
          <div className="project-manifest__badge">Current Ops</div>
          <div className="project-manifest__content">
            <div>
              <h2>
                Public
                <br />
                Portfolio Sync
              </h2>
              <p>
                The portfolio now reflects active codebases, with public repository links where the
                source can be reviewed and clear labels where a project remains local.
              </p>
            </div>
            <div className="project-manifest__stats">
              <div><strong>5</strong><span>Codebases</span></div>
              <div><strong>4</strong><span>Public repos</span></div>
            </div>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
