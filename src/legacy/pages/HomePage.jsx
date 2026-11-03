import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import AmbientCareerBackground from '../components/AmbientCareerBackground';
import { fadeUp } from '../../lib/motion';

const footerLinks = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
];

const trustItems = [
  { iconName: 'shield', label: 'Cybersecurity' },
  { iconName: 'lightbulb', label: 'AI engineering' },
  { iconName: 'code', label: 'Software architecture' },
  { iconName: 'monitor', label: 'Remote delivery' },
];

export default function HomePage() {
  return (
    <PageShell
      activeKey="index"
      brandLabel="ANALOG_EXECUTIVE"
      sidebarTitle="Rank: Commander"
      sidebarSubtitle="Level 94"
      sidebarCtaLabel="Contact_Me"
      sidebarCtaHref="/contact"
      footerText="Built for security, AI, and software teams that need clearer digital products."
      footerLinks={footerLinks}
    >
      <motion.section className="home-hero" id="home" {...fadeUp()}>
        <AmbientCareerBackground />
        <div className="home-chip">Status: online / view: standard</div>
        <div className="home-hero__content">
          <div className="home-hero__copy">
            <h1>
              <span>Cybersecurity, AI,</span>
              <span>and software</span>
              <span>engineering.</span>
              <span className="is-accent">Presented clearly.</span>
              <span className="is-accent">Built creatively.</span>
            </h1>
            <p className="home-hero__lead">
              I design and build modern technical products, from secure web experiences to
              experimental AI tools.
            </p>
            <div className="home-hero__actions">
              <AppLink className="home-btn home-btn--secondary" to="/portfolio">
                Selected Work
              </AppLink>
              <AppLink className="home-btn home-btn--tertiary" to="/contact">
                Start a Conversation
              </AppLink>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="home-trust-strip" aria-label="Trust indicators" {...fadeUp(0.05)}>
        <div className="home-trust-strip__inner">
          {trustItems.map(({ iconName, label }) => (
            <div className="home-trust-item" key={label}>
              <span className="trust-icon">
                <Icon className="home-inline-icon" aria-hidden="true" name={iconName} />
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="home-projects" id="projects" {...fadeUp(0.08)}>
        <div className="home-section-head">
          <div>
            <h2>Selected Works</h2>
            <p>Experiments in AI engineering, agent security, and the systems behind them.</p>
          </div>
          <AppLink className="home-section-link" to="/portfolio">
            View_all_log
          </AppLink>
        </div>

        <div className="home-project-grid home-project-grid--illustrated">
          {[
            { title: 'Enterprise AI Lab', category: 'Document AI', image: 'ai-lab', summary: 'A RAG lab for exploring PDFs, retrieval, and answers grounded in source passages.', tags: 'Python + FastAPI + pgvector' },
            { title: 'Agent Orchestration', category: 'AI Engineering', image: 'orchestration', summary: 'Parallel AI sessions and explicit handoffs, with traces to inspect each run.', tags: 'TypeScript + Pi SDK' },
            { title: 'Agent Security Evals', category: 'AI Security', image: 'security', summary: 'Repeatable checks for tool calls, untrusted instructions, and approval boundaries.', tags: 'Python + synthetic fixtures' },
          ].map((project, index) => (
            <motion.article key={project.title} className="home-project-card home-project-card--illustrated" {...fadeUp(0.1 + index * 0.05)}>
              <div className="home-project-card__art"><img src={`/images/projects/${project.image}.webp`} alt="" loading="lazy" /></div>
              <div className="home-project-card__content">
                <span className="home-project-card__eyebrow">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="home-project-card__caption">{project.tags}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section className="home-capabilities" id="services" {...fadeUp(0.1)}>
        <div className="home-capabilities__panel">
          <div className="home-services__head">
            <span>Capabilities_Matrix</span>
            <h2>Technical depth, product signal</h2>
          </div>

          <div className="home-capabilities__grid">
            <article className="home-capability-card">
              <span className="home-capability-card__id">01</span>
              <h3>Technical consulting</h3>
              <p>Architecture advisory for teams shipping security, AI, and operator-heavy systems.</p>
              <ul>
                <li>System reviews</li>
                <li>Architecture audits</li>
              </ul>
            </article>
            <article className="home-capability-card home-capability-card--blue">
              <span className="home-capability-card__id">02</span>
              <h3>AI workflows</h3>
              <p>Human review loops, evaluation surfaces, and operational interfaces for model output.</p>
              <ul>
                <li>RAG systems</li>
                <li>Agent tooling</li>
              </ul>
            </article>
            <article className="home-capability-card home-capability-card--peach">
              <span className="home-capability-card__id">03</span>
              <h3>Security builds</h3>
              <p>Permission-heavy product surfaces, trust signals, and hardened frontend systems.</p>
              <ul>
                <li>Secure interfaces</li>
                <li>Identity flows</li>
              </ul>
            </article>
          </div>
        </div>
      </motion.section>

      <motion.section className="home-cta" {...fadeUp(0.12)}>
        <div className="home-cta__inner">
          <h2>Ready_To_Build The_Future?</h2>
          <div className="home-cta__actions">
            <AppLink className="home-btn home-btn--primary home-btn--wide" to="/contact">
              Init_signal_link
            </AppLink>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
