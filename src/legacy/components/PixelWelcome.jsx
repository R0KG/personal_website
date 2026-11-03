import { useEffect, useState } from 'react';

const SESSION_KEY = 'roman-intro-v4-seen';
const INTRO_DURATION_MS = 2800;

function isFirstVisit() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== 'yes';
  } catch {
    return true;
  }
}

export default function PixelWelcome() {
  const [visible, setVisible] = useState(isFirstVisit);

  useEffect(() => {
    if (!visible) return undefined;
    try {
      sessionStorage.setItem(SESSION_KEY, 'yes');
    } catch {
      // The intro can still play when browser storage is unavailable.
    }

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
