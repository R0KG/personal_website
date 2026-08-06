import { useEffect, useRef, useState } from 'react';

export default function AmbientCareerBackground() {
  const [isLit, setIsLit] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handlePointerMove = (event) => {
    if (frameRef.current) return;

    const target = event.currentTarget;
    const { clientX, clientY } = event;

    frameRef.current = requestAnimationFrame(() => {
      const bounds = target.getBoundingClientRect();
      const x = ((clientX - bounds.left) / bounds.width) * 100;
      const y = ((clientY - bounds.top) / bounds.height) * 100;

      target.style.setProperty('--ambient-x', `${x}%`);
      target.style.setProperty('--ambient-y', `${y}%`);
      frameRef.current = 0;
    });
  };

  const toggleLight = () => setIsLit((current) => !current);

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggleLight();
  };

  return (
    <div
      className={`career-background${isLit ? ' is-lit' : ''}`}
      role="button"
      tabIndex="0"
      aria-label={`${isLit ? 'Dim' : 'Illuminate'} the ambient studio background`}
      aria-pressed={isLit}
      onClick={toggleLight}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
    >
      <div className="career-background__network" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="career-background__studio" aria-hidden="true">
        <span className="career-background__window" />
        <span className="career-background__screen"><i /><i /><i /></span>
        <span className="career-background__tower" />
        <span className="career-background__desk" />
        <span className="career-background__plant"><i /><i /></span>
      </div>
      <span className="career-background__horizon" aria-hidden="true" />
      <span className="career-background__light" aria-hidden="true" />
      <span className="career-background__scanlines" aria-hidden="true" />
      <span className="career-background__hint">Move / tap to illuminate</span>
    </div>
  );
}
