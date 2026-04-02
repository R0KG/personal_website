import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

export default function SkillsPage() {
  return (
    <PageShell
      activeKey="skills"
      sidebarTitle="Analog_Exec"
      sidebarSubtitle="v.1994.01"
      sidebarCtaLabel="Contact Me"
      sidebarCtaHref="/contact"
      footerText="Skills are useful only when they reduce complexity in the shipped result."
      footerLinks={footerLinks}
    >
      <motion.section className="skills-page" {...fadeUp()}>
        <div className="skills-status">System_status: online</div>
        <div className="skills-hero">
          <h1>Skill_tree: v.1994</h1>
          <p>
            Analyzing core proficiencies and deployment capabilities. Attributes scaled to 16-bit
            professional standards.
          </p>
        </div>

        <div className="skills-layout">
          <article className="skills-panel skills-panel--stats">
            <div className="skills-panel__dot"></div>
            <h2>Character_stats</h2>
            <div className="skills-bars">
              <div className="skills-bar">
                <div className="skills-bar__meta"><span>Intellect</span><strong>Lvl 94</strong></div>
                <div className="skills-bar__track"><span style={{ width: '94%' }}></span></div>
              </div>
              <div className="skills-bar">
                <div className="skills-bar__meta"><span>Endurance</span><strong>Lvl 82</strong></div>
                <div className="skills-bar__track"><span className="skills-bar__fill--blue" style={{ width: '82%' }}></span></div>
              </div>
              <div className="skills-bar">
                <div className="skills-bar__meta"><span>Precision</span><strong>Lvl 88</strong></div>
                <div className="skills-bar__track"><span className="skills-bar__fill--peach" style={{ width: '88%' }}></span></div>
              </div>
            </div>
            <p className="skills-panel__note">
              Specialized in high-load architectural integrity and secure deployment patterns.
            </p>
          </article>

          <article className="skills-panel skills-panel--wide">
            <h2>Interface_architect</h2>
            <div className="skills-dual">
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>React / Next.js</span><strong>Master</strong></div>
                <div className="skills-bar__track"><span style={{ width: '92%' }}></span></div>
                <p>Advanced state management, component isolation, and SSR optimizations.</p>
              </div>
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>Tailwind CSS</span><strong>Expert</strong></div>
                <div className="skills-bar__track"><span className="skills-bar__fill--blue" style={{ width: '87%' }}></span></div>
                <p>Utility-first architecture, custom design system implementation.</p>
              </div>
            </div>
          </article>

          <article className="skills-panel skills-panel--specials">
            <h2>Equipped_specials</h2>
            <div className="skills-specials">
              <div className="skills-special">
                <span className="skills-special__icon">
                  <Icon aria-hidden="true" name="git-branch" />
                </span>
                <strong>Agent_loops</strong>
              </div>
              <div className="skills-special">
                <span className="skills-special__icon">
                  <Icon aria-hidden="true" name="server" />
                </span>
                <strong>Model_ops</strong>
              </div>
              <div className="skills-special">
                <span className="skills-special__icon">
                  <Icon aria-hidden="true" name="shield" />
                </span>
                <strong>Secure_flows</strong>
              </div>
              <div className="skills-special">
                <span className="skills-special__icon">
                  <Icon aria-hidden="true" name="code" />
                </span>
                <strong>Tool_chains</strong>
              </div>
            </div>
          </article>

          <article className="skills-panel skills-panel--wide skills-panel--blue">
            <h2>Openclaw_expertise</h2>
            <div className="skills-dual">
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>AI Automation</span><strong>Advanced</strong></div>
                <div className="skills-bar__track"><span className="skills-bar__fill--blue" style={{ width: '90%' }}></span></div>
                <p>Agent workflows, approval loops, tool orchestration, and operational automations built around real tasks.</p>
              </div>
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>Open Source Models</span><strong>Applied</strong></div>
                <div className="skills-bar__track"><span style={{ width: '86%' }}></span></div>
                <p>Working with open-source models, local or hosted inference, retrieval pipelines, and evaluation-driven iteration.</p>
              </div>
            </div>
          </article>

          <article className="skills-panel skills-panel--wide skills-panel--peach">
            <h2>System_logic</h2>
            <div className="skills-dual">
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>Python / Django</span><strong>Elite</strong></div>
                <div className="skills-bar__track"><span className="skills-bar__fill--peach" style={{ width: '83%' }}></span></div>
                <p>RESTful APIs, async task processing, and clean domain modeling.</p>
              </div>
              <div className="skills-dual__item">
                <div className="skills-dual__meta"><span>Cybersecurity</span><strong>Specialist</strong></div>
                <div className="skills-bar__track"><span style={{ width: '89%' }}></span></div>
                <p>Penetration testing, OAuth2 implementation, secure handshake protocols.</p>
              </div>
            </div>
          </article>

          <article className="skills-panel skills-panel--toolbelt">
            <h2>Daily_toolbelt</h2>
            <div className="skills-toolbelt">
              <div className="skills-tool">
                <span className="skills-tool__icon">
                  <Icon aria-hidden="true" name="git-branch" />
                </span>
                <div>
                  <h3>Git_flow</h3>
                  <p>Version control, branch hygiene, release-safe iteration.</p>
                </div>
              </div>
              <div className="skills-tool skills-tool--blue">
                <span className="skills-tool__icon">
                  <Icon aria-hidden="true" name="device-laptop" />
                </span>
                <div>
                  <h3>Linux_cli</h3>
                  <p>Shell-first workflows, automation tasks, deployment operations.</p>
                </div>
              </div>
              <div className="skills-tool skills-tool--peach">
                <span className="skills-tool__icon">
                  <Icon aria-hidden="true" name="cloud-upload" />
                </span>
                <div>
                  <h3>Docker</h3>
                  <p>Containerized environments, repeatable builds, portable services.</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <motion.section className="skills-terminal" {...fadeUp(0.08)}>
          <div className="skills-terminal__title">Skill_analytics_v4.0</div>
          <div className="skills-terminal__body">
            <p>&gt; loading skill_manifest.json</p>
            <p>&gt; analyzing repository history...</p>
            <p>&gt; proficiency levels confirmed for 19 key technologies.</p>
            <p>&gt; status: ready for deployment</p>
            <p>&gt; _</p>
          </div>
          <div className="skills-terminal__actions">
            <AppLink className="home-btn home-btn--primary" to="/contact">
              Contact Me
            </AppLink>
            <AppLink className="home-btn home-btn--dark" to="/services">
              Service Map
            </AppLink>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
