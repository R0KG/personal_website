import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import AmbientCareerBackground from '../components/AmbientCareerBackground';
import { fadeUp } from '../../lib/motion';
import neuralMeshImage from '../../../assets/neural-mesh-pexels.jpg';

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
            <p>Current codebases in distributed systems, AI security, and technical research.</p>
          </div>
          <AppLink className="home-section-link" to="/portfolio">
            View_all_log
          </AppLink>
        </div>

        <div className="home-project-grid">
          <motion.article className="home-project-card home-project-card--large" {...fadeUp(0.1)}>
            <span className="home-project-card__bar"></span>
            <div className="home-project-card__meta">
              <span>RustFlow service</span>
              <span className="home-project-card__corner"></span>
            </div>
            <h3>Distributed telemetry queries</h3>
            <p>
              A Rust service that partitions uploaded CSV telemetry and coordinates query workers
              through an explicit API, queue, and storage pipeline.
            </p>
            <div className="home-project-tags">
              <span>Rust</span>
              <span>Data systems</span>
            </div>
            <div className="home-project-card__caption">Axum + NATS + DataFusion</div>
            <div className="home-project-card__ghost"></div>
          </motion.article>

          <motion.article className="home-project-card home-project-card--blue" {...fadeUp(0.15)}>
            <span className="home-project-card__eyebrow">AI Security</span>
            <h3>Agent Security Evals</h3>
            <p>
              A deterministic harness for checking whether proposed agent tool calls respect trust,
              data, and approval boundaries.
            </p>
            <div className="home-project-card__screen">
              <img src={neuralMeshImage} alt="Abstract network texture representing AI-agent evaluation" />
            </div>
            <div className="home-project-card__caption">synthetic fixtures + regression tests</div>
          </motion.article>

          <motion.article className="home-project-card home-project-card--peach" {...fadeUp(0.2)}>
            <span className="home-project-card__bar"></span>
            <span className="home-project-card__eyebrow">Research prototype</span>
            <h3>EvoLife ecosystem</h3>
            <p>
              A reproducible, CPU-first artificial ecosystem with mutation, species tracking, and
              persistent simulation history.
            </p>
            <div className="home-project-card__caption">Python + JAX + event history</div>
          </motion.article>

          <motion.article className="home-project-card home-project-card--accent" {...fadeUp(0.25)}>
            <div>
              <h3>Want to see more?</h3>
              <p>Explore more technical builds, AI systems, and tooling projects.</p>
            </div>
            <span className="home-project-card__arrow"></span>
          </motion.article>
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
