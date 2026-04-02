import { motion } from 'framer-motion';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const featuredRepo = {
  name: 'phantom-wallet-replica',
  repoUrl: 'https://github.com/R0KG/phantom-wallet-replica',
  liveUrl: 'https://phantom-wallet-replica.vercel.app',
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
              Featured repository detail from the public GitHub portfolio, centered on shipped
              frontend execution and UI fidelity.
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
                <span>Live project</span>
              </div>
              <p>
                A public TypeScript build focused on recreating the Phantom wallet interface with a
                deployable frontend. This is the clearest current example of polished UI delivery
                in the repository set.
              </p>
              <div className="project-tags">
                <span>TypeScript</span>
                <span>Frontend</span>
                <span>Vercel</span>
              </div>
              <div className="project-main-card__footer">
                <em>Result: public repo plus live deployment</em>
                <AppLink to={featuredRepo.liveUrl} target="_blank" rel="noreferrer" aria-label="Open live project">
                  ↗
                </AppLink>
              </div>
            </div>
          </article>

          <aside className="project-side-card">
            <h3>Repository access</h3>
            <p>
              Source code is public on GitHub and the deployment is available separately, so both
              implementation and output can be reviewed.
            </p>
            <div className="project-side-card__stack">
              <span>Links</span>
              <p>GitHub / Live Demo</p>
            </div>
            <AppLink className="project-outline-button" to={featuredRepo.repoUrl} target="_blank" rel="noreferrer">
              Open Repo
            </AppLink>
          </aside>

          <article className="project-mini-card project-mini-card--peach">
            <div className="project-mini-card__heading">
              <span className="project-mini-icon"></span>
              <h3>trans_ansamble</h3>
            </div>
            <p>
              Python transformer implementation used as a clean model-architecture reference in the
              public repository set.
            </p>
            <div className="project-mini-card__meta">
              <div><span>Stack</span><strong>Python</strong></div>
              <div><span>Focus</span><strong>Transformer</strong></div>
            </div>
          </article>

          <article className="project-mini-card">
            <div className="project-mini-card__heading">
              <span className="project-mini-icon project-mini-icon--db"></span>
              <h3>deepfake-guardian</h3>
            </div>
            <p>
              Public JavaScript project oriented around authenticity review and defensive analysis
              workflows.
            </p>
            <div className="project-mini-card__meta">
              <div><span>Stack</span><strong>JavaScript</strong></div>
              <div><span>Focus</span><strong>Detection</strong></div>
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
                Portfolio cards now resolve to actual GitHub repositories and live URLs where
                available, rather than placeholder internal links.
              </p>
            </div>
            <div className="project-manifest__stats">
              <div><strong>3</strong><span>Repo cards</span></div>
              <div><strong>1</strong><span>Live demo</span></div>
            </div>
          </div>
        </motion.section>
      </motion.section>
    </PageShell>
  );
}
