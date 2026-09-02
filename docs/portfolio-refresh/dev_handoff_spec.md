# Developer handoff

- Updated files: `src/legacy/pages/HomePage.jsx`, `PortfolioPage.jsx`, `ProjectPage.jsx`, and `legacy_styles.css`.
- Portfolio data is held in the local `projects` array. A project without `repoUrl` must render the static local-prototype label instead of a dead link.
- Linked repositories: `R0KG/Rustlflow`, `R0KG/agent-security-evals`, `R0KG/happy_cyber`, and `R0KG/fraud`.
- Private `recon_ai` source material is intentionally not referenced on the public site.
- Verification: run `npm run build`, then confirm the portfolio has five project cards, four outbound repository destinations, and one non-interactive local-prototype label.
