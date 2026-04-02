import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import { Link, NavLink } from 'react-router-dom';
import AppLink from './AppLink';
import pixelCvImage from '../../pixel_cv_image.png';

const navItems = [
  { key: 'index', label: 'Home', to: '/', iconName: 'home' },
  { key: 'portfolio', label: 'Portfolio', to: '/portfolio', iconName: 'grid' },
  { key: 'services', label: 'Services', to: '/services', iconName: 'briefcase' },
  { key: 'about', label: 'About', to: '/about', iconName: 'user' },
  { key: 'skills', label: 'Skills', to: '/skills', iconName: 'zap' },
  { key: 'contact', label: 'Contact', to: '/contact', iconName: 'mail' },
];

export default function PageShell({
  activeKey,
  sidebarTitle,
  sidebarSubtitle,
  sidebarCtaLabel,
  sidebarCtaHref,
  footerText,
  footerLinks,
  fabHref = '/contact',
  brandLabel = 'ANALOG_EXECUTIVE',
  children,
}) {
  return (
    <div className={activeKey === 'index' ? 'home-shell home-page' : 'home-shell'}>
      <header className="home-header">
        <Link className="home-brand" to="/">
          {brandLabel}
        </Link>
        <AppLink className="home-header-terminal home-header-terminal--icon" to={fabHref} aria-label="Open contact channel">
          <Icon className="home-inline-icon" aria-hidden="true" name="mail" />
        </AppLink>
      </header>

      <aside className="home-sidebar" aria-label="Section navigation">
        <div className="home-sidebar__head">
          <div className="home-sidebar__identity">
            <div className="home-sidebar__mark">
              <img className="home-sidebar__avatar" src={pixelCvImage} alt="" aria-hidden="true" />
            </div>
            <div>
              <strong>{sidebarTitle}</strong>
              <span>{sidebarSubtitle}</span>
            </div>
          </div>
          <AppLink className="home-sidebar__button" to={sidebarCtaHref}>
            {sidebarCtaLabel}
          </AppLink>
        </div>
        <nav className="home-sidebar__nav">
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.key}
                className={({ isActive }) => (isActive || activeKey === item.key ? 'is-active' : undefined)}
                to={item.to}
              >
                <span className="home-nav-icon">
                  <Icon className="home-inline-icon" aria-hidden="true" name={item.iconName} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className={activeKey === 'index' ? 'home-main' : 'systems-main'}>{children}
        <footer className="home-footer">
          <div className="home-footer__inner">
            <strong>Roman Merk</strong>
            <div className="home-footer__links">
              {footerLinks.map((link) => (
                <AppLink key={link.label} to={link.to} target={link.to.startsWith('http') ? '_blank' : undefined} rel={link.to.startsWith('http') ? 'noreferrer' : undefined}>
                  {link.label}
                </AppLink>
              ))}
            </div>
            <p>{footerText}</p>
            <small>© 2026 Roman Merk</small>
          </div>
        </footer>
      </main>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
        <AppLink className="home-fab" to={fabHref} aria-label="Quick action">
          <Icon className="fab-icon" aria-hidden="true" name="arrow-right" />
        </AppLink>
      </motion.div>
    </div>
  );
}
