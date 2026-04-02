import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function ServicesPage() {
  return (
    <PageShell
      activeKey="services"
      sidebarTitle="Service Layer"
      sidebarSubtitle="Scoped delivery modules"
      sidebarCtaLabel="Book Initial Scope"
      sidebarCtaHref="/contact"
      footerText="Consulting, product framing, and implementation in one operating layer."
      footerLinks={footerLinks}
    >
      <motion.section className="services-page" {...fadeUp()}>
        <div className="services-hero">
          <div className="services-hero__stack">
            <div className="home-chip">Service modules / buildable offers</div>
            <h1>
              Technical services framed like a product system,
              <br />
              not a freelancer checklist
            </h1>
            <p>
              The service layer follows the same Analog Executive direction: dense modules,
              asymmetrical layout, hard borders, and clear operating intent.
            </p>
          </div>
          <aside className="services-hero__meta">
            <span>Working_range</span>
            <ul>
              <li><span>Security UX</span><strong>Consoles + dashboards</strong></li>
              <li><span>AI UX</span><strong>Review loops</strong></li>
              <li><span>Build</span><strong>Responsive systems</strong></li>
            </ul>
          </aside>
        </div>

        <div className="services-grid">
          <article className="service-module service-module--gold">
            <div className="service-module__badge">
              <Icon aria-hidden="true" name="briefcase-account" />
            </div>
            <div className="service-module__id">Module 01</div>
            <h2>Technical Consulting</h2>
            <p>Architecture reviews, capability framing, and product direction for teams dealing with technical complexity.</p>
            <ul>
              <li>Architecture audits</li>
              <li>Platform decisions</li>
              <li>Performance strategy</li>
            </ul>
          </article>

          <article className="service-module service-module--blue service-module--featured">
            <div className="service-module__badge">
              <Icon aria-hidden="true" name="git-branch" />
            </div>
            <div className="service-module__id">Module 02</div>
            <h2>AI Workflows</h2>
            <p>RAG systems, agent-assisted tooling, and approval flows that make AI outputs operationally useful.</p>
            <ul>
              <li>RAG integration</li>
              <li>Custom agent tooling</li>
              <li>Evaluation surfaces</li>
            </ul>
          </article>

          <article className="service-module service-module--peach">
            <div className="service-module__badge">
              <Icon aria-hidden="true" name="lock" />
            </div>
            <div className="service-module__id">Module 03</div>
            <h2>Security Builds</h2>
            <p>Security-aware interfaces, permission-heavy workflows, and stable user-facing products for sensitive systems.</p>
            <ul>
              <li>Identity flows</li>
              <li>Secure storage UX</li>
              <li>Operational consoles</li>
            </ul>
          </article>
        </div>

        <motion.section className="services-lower" {...fadeUp(0.08)}>
          <article className="services-process">
            <div className="services-process__ghost">OPS</div>
            <span className="services-block-label">Workflow</span>
            <div className="services-steps-grid">
              <div><strong>01 / Audit</strong><p>Clarify audience, constraints, and technical friction.</p></div>
              <div><strong>02 / Shape</strong><p>Translate goals into a visual and structural system.</p></div>
              <div><strong>03 / Build</strong><p>Implement the product surface with responsive components.</p></div>
            </div>
          </article>

          <article className="services-offer">
            <span className="services-block-label">Current offer</span>
            <h2>Focused setup sprint</h2>
            <p>
              Best for personal sites, early product interfaces, or technical marketing surfaces
              that need stronger signal and better structure.
            </p>
            <div className="services-offer__actions">
              <AppLink className="home-btn home-btn--primary" to="/contact">
                Request scope
              </AppLink>
              <AppLink className="home-btn home-btn--dark" to="/skills">
                See capability map
              </AppLink>
            </div>
          </article>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
