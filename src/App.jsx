import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function RouteLoader() {
  return (
    <div className="route-loader" aria-live="polite" aria-busy="true">
      <div className="route-loader__chip">Loading interface module</div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteLoader />}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
