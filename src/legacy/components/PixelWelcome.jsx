import { useEffect, useState } from 'react';

// The intro plays once per browser, on the very first visit. localStorage remembers it
// across sessions; sessionStorage is the fallback when localStorage is blocked.
const VISIT_KEY = 'roman-intro-v5-seen';
const INTRO_DURATION_MS = 2800;

function readSeen() {
  for (const store of ['localStorage', 'sessionStorage']) {
    try { if (window[store].getItem(VISIT_KEY) === 'yes') return true; } catch { /* storage unavailable */ }
  }
  return false;
}
function markSeen() {
  for (const store of ['localStorage', 'sessionStorage']) {
    try { window[store].setItem(VISIT_KEY, 'yes'); return; } catch { /* try the next store */ }
  }
}

const isFirstVisit = () => !readSeen();

export default function PixelWelcome() {
  const [visible, setVisible] = useState(isFirstVisit);

  useEffect(() => {
    if (!visible) return undefined;
    markSeen();

    const timer = window.setTimeout(() => setVisible(false), INTRO_DURATION_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pixel-intro" aria-label="Hey, I'm Roman. Welcome to my website." role="status">
      <div className="pixel-intro__grid" aria-hidden="true" />
      <div className="pixel-intro__scene" aria-hidden="true">
        <div className="pixel-intro__pixels pixel-intro__pixels--left"><i /><i /><i /><i /></div>
        <div className="pixel-intro__pixels pixel-intro__pixels--right"><i /><i /><i /><i /></div>
        <span className="pixel-intro__eyebrow">PLAYER 01 / ONLINE</span>
        <div className="pixel-intro__line pixel-intro__line--hello">HEY, I’M</div>
        <div className="pixel-intro__line pixel-intro__line--name">ROMAN<span className="pixel-intro__dot">.</span></div>
        <div className="pixel-intro__rule" />
        <div className="pixel-intro__subtitle">WELCOME TO MY WEBSITE<span className="pixel-intro__cursor">_</span></div>
        <div className="pixel-intro__topics"><span>AI ENGINEERING</span><span>SECURITY</span><span>CODE</span></div>
      </div>
    </div>
  );
}
