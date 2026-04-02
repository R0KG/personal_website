import { motion } from 'framer-motion';
import { FaFileArrowDown } from 'react-icons/fa6';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';
import cvImage from '../../cv_image.jpg';
import cvPdf from '../../Roman_Merkulov_CV-1.pdf';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

function StatBar({ label, value, tone = 'gold' }) {
  return (
    <div className="about-stat">
      <div className="about-stat__head">
        <span className={`about-stat__label about-stat__label--${tone}`}>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="about-stat__track">
        <span className={`about-stat__fill about-stat__fill--${tone}`} style={{ width: value }}></span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      activeKey="about"
      sidebarTitle="Roman Merk"
      sidebarSubtitle="Lvl 99 architect"
      sidebarCtaLabel="View Manifesto"
      sidebarCtaHref="/portfolio"
      footerText="Professional-first, retro-second. The interface should feel like a precise instrument."
      footerLinks={footerLinks}
    >
      <motion.section className="about-hero" {...fadeUp()}>
        <div className="about-portrait-wrap">
          <div className="about-portrait-tag">SUBJECT_01</div>
          <div className="about-portrait">
            <img src={cvImage} alt="Roman Merk portrait" />
          </div>
          <div className="about-portrait-accent"></div>
        </div>

        <div className="about-copy">
          <div>
            <h1>Roman Merk</h1>
            <h2>Builder. Architect. Security Strategist.</h2>
            <p className="about-copy__lead">
              I build across cybersecurity, AI, and software engineering. The work tends to sit
              where technical depth and presentation quality both matter.
            </p>
            <p>
              My operating preference is straightforward: make dense systems easier to read, make
              product decisions easier to trust, and keep the implementation clean enough to scale.
            </p>
          </div>

          <div className="about-stats-panel">
            <div className="about-panel-tag">TECHNICAL_SPEC</div>
            <div className="about-stats-grid">
              <StatBar label="Python [AI/ENG]" value="94%" tone="gold" />
              <StatBar label="React [UI/UX]" value="88%" tone="blue" />
              <StatBar label="Security [DEF/OFF]" value="91%" tone="peach" />
              <StatBar label="AI [LLM/ML]" value="85%" tone="gold" />
            </div>
            <div className="about-actions">
              <AppLink
                className="home-btn home-btn--primary"
                to={cvPdf}
                download="Roman_Merkulov_CV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <FaFileArrowDown aria-hidden="true" />
                <span>Download_CV.pdf</span>
              </AppLink>
              <AppLink className="home-btn home-btn--secondary" to="/contact">
                Init_Contact.exe
              </AppLink>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="about-pillars" {...fadeUp(0.08)}>
        <div className="home-section-head">
          <div>
            <h2>Core Pillars</h2>
            <p>Three recurring themes behind the work: system clarity, technical rigor, and usable execution.</p>
          </div>
        </div>

        <div className="about-pillars__grid">
          <article className="about-pillar-card">
            <span className="about-pillar-card__icon"></span>
            <h3>Systems Architecture</h3>
            <p>Designing robust, scalable backends that withstand high-load environments.</p>
          </article>
          <article className="about-pillar-card about-pillar-card--blue">
            <span className="about-pillar-card__icon about-pillar-card__icon--shield"></span>
            <h3>Cybersecurity</h3>
            <p>Threat modeling, penetration testing, and zero-trust implementation for enterprise stacks.</p>
          </article>
          <article className="about-pillar-card about-pillar-card--peach">
            <span className="about-pillar-card__icon about-pillar-card__icon--core"></span>
            <h3>Applied AI</h3>
            <p>LLM pipelines and workflow automation focused on real operational bottlenecks.</p>
          </article>
        </div>
      </motion.section>

      <motion.section className="systems-section systems-section--cta" {...fadeUp(0.12)}>
        <div className="systems-banner about-cta-banner">
          <div>
            <span className="systems-card__eyebrow">Contact channel</span>
            <h2>Need a technical site or interface with this design language?</h2>
          </div>
          <div className="systems-actions">
            <AppLink className="home-btn home-btn--primary" to="/contact">
              Start a conversation
            </AppLink>
            <AppLink className="home-btn home-btn--dark" to="/portfolio">
              Review portfolio
            </AppLink>
          </div>
        </div>
      </motion.section>
    </PageShell>
  );
}
