import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';
import neuralMeshImage from '../../assets/neural-mesh-pexels.jpg';

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
        <div className="home-chip">Status: online / view: standard</div>
        <h1>
          <span>Cybersecurity,</span>
          <span>AI,</span>
          <span>and</span>
          <span>Software engineering.</span>
          <span>-</span>
          <span className="is-accent">presented</span>
          <span className="is-accent">clearly,</span>
          <span className="is-accent">built</span>
          <span className="is-accent">creatively.</span>
        </h1>
        <p className="home-hero__lead">
          I design and build modern technical products, from secure web experiences to
          experimental AI tools.
        </p>
        <div className="home-hero__actions">
          <AppLink className="home-btn home-btn--primary" to="/portfolio">
            View Works
          </AppLink>
          <AppLink className="home-btn home-btn--secondary" to="/contact">
            Hire Me
          </AppLink>
          <AppLink className="home-btn home-btn--tertiary" to="/skills">
            Switch + Get More
          </AppLink>
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
            <p>Professional deployments in cybersecurity, AI, and engineering media systems.</p>
          </div>
          <AppLink className="home-section-link" to="/portfolio">
            View_all_log
          </AppLink>
        </div>

        <div className="home-project-grid">
          <motion.article className="home-project-card home-project-card--large" {...fadeUp(0.1)}>
            <span className="home-project-card__bar"></span>
            <div className="home-project-card__meta">
              <span>OniShield interface</span>
              <span className="home-project-card__corner"></span>
            </div>
            <h3>Intrusion detection terminal</h3>
            <p>
              Enterprise-grade security hardening for studio-scale architecture. Tightened analyst
              flows, risk framing, and provider-side incident triage.
            </p>
            <div className="home-project-tags">
              <span>Security</span>
              <span>Platform</span>
            </div>
            <div className="home-project-card__caption">active analyst surface / hardened detection flow</div>
            <div className="home-project-card__ghost"></div>
          </motion.article>

          <motion.article className="home-project-card home-project-card--blue" {...fadeUp(0.15)}>
            <span className="home-project-card__eyebrow">AI System</span>
            <h3>Neural mesh</h3>
            <p>
              Structured model review, operator feedback, and deployment safety into one cleaner
              surface.
            </p>
            <div className="home-project-card__screen">
              <img src={neuralMeshImage} alt="Abstract blue neural network style interface texture" />
            </div>
            <div className="home-project-card__caption">evaluation + oversight</div>
          </motion.article>

          <motion.article className="home-project-card home-project-card--peach" {...fadeUp(0.2)}>
            <span className="home-project-card__bar"></span>
            <span className="home-project-card__eyebrow">Core-flow</span>
            <h3>Engine module</h3>
            <p>
              Productized account state, orchestration, and low-friction system visibility.
            </p>
            <div className="home-project-card__caption">systems + orchestration</div>
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
