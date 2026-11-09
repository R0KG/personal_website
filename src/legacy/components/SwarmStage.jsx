import { useEffect, useRef, useState } from 'react';
import { SCENE_W, SCENE_H, BOUNDARY_X, ROLES, evalBeat, beatTimeline, drawScene } from '../research/swarmSim';
import { ROLE_NAMES, TARGET_NAMES } from '../research/beats';

// One shared engine instance: React StrictMode mounts twice, and instantiating the wasm
// module twice would leave Office pointers and memory pointing at different instances.
let enginePromise;
const loadEngine = () => (enginePromise ||= import('../../vendor/pixtuoid/pixtuoid_web.js').then(async mod => ({ mod, wasm: await mod.default() })));

const TAGS = ['R', 'E', 'C', 'V', 'X'];
const FX_LABEL = { run: 'RUNNING…', inject: 'INJECTING…' };
const ZOOM = 1.5; // camera zoom on small screens

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The pixtuoid office is only the background. The agents are drawn by swarmSim so they
// can stand up, walk to each other, hand over artifacts and act on the sandbox.
export default function SwarmStage({ data, beats, index, playing, speed = 1, kick, marks, onMark, onBeatDone, showStart, onStart }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  const tagRefs = useRef({});
  const bubbleRef = useRef(null);
  const captionRef = useRef(null);
  const artifactRef = useRef(null);
  const alertRef = useRef(null);
  const panelRef = useRef(null);
  const statusRef = useRef(null);
  const sim = useRef({ t: 0, index: 0, oneShot: false, marked: false, done: false, tl: null, visible: true });
  const live = useRef({});
  const [error, setError] = useState(false);
  live.current = { beats, index, playing, speed, onMark, onBeatDone };

  // New beat / new case: restart the beat clock.
  useEffect(() => {
    const s = sim.current;
    s.t = 0; s.index = index; s.marked = false; s.done = false; s.oneShot = false;
    s.tl = beats[index] ? beatTimeline(beats[index], reducedMotion()) : null;
  }, [index, beats]);
  // A manual Next/Previous plays that single beat even while paused.
  useEffect(() => { if (kick > 0) sim.current.oneShot = true; }, [kick]);

  // Do no work while the stage is scrolled out of view.
  useEffect(() => {
    const el = sceneRef.current; if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => { sim.current.visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(el); return () => io.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false, frame = 0, office, wasm, lastBg = 0, prev = performance.now(), bgClock = Date.now();
    const bgW = 120, bgH = 65;
    let lastBubble = '';
    const cam = { x: SCENE_W / 2, y: SCENE_H / 2 };
    (async () => {
      try {
        const engine = await loadEngine();
        if (cancelled) return;
        wasm = engine.wasm;
        office = new engine.mod.Office(42);
        office.set_theme('Cyberpunk');
        for (let i = 0; i < 16; i++) { bgClock += 250; office.step(bgClock, bgW, bgH); }
      } catch { if (!cancelled) setError(true); }
    })();
    const fg = fgRef.current.getContext('2d');
    fg.imageSmoothingEnabled = false;

    const tick = now => {
      if (cancelled) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - prev) / 1000); prev = now;
      const s = sim.current;
      if (document.hidden || !s.visible) return;
      const { beats: bs, index: idx, playing: isPlaying, speed: spd } = live.current;
      const beat = bs[idx];

      // Background office (ambient animation only).
      if (office && now - lastBg > 67) {
        lastBg = now; bgClock += dt * 500; office.step(bgClock, bgW, bgH);
        const sc = office.scale(), w = bgW * sc, h = bgH * sc, cv = bgRef.current;
        if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
        const pixels = new Uint8ClampedArray(wasm.memory.buffer, office.frame_ptr(), office.frame_len());
        cv.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(pixels), w, h), 0, 0);
      }
      if (!beat) return;
      if ((isPlaying || s.oneShot) && !s.done) s.t += dt * spd;
      const st = evalBeat(beat, s.t, s.tl || beatTimeline(beat));
      if (st.markReached && !s.marked) { s.marked = true; live.current.onMark(idx); }
      if (st.done && !s.done) { s.done = true; s.oneShot = false; live.current.onBeatDone(idx); }

      drawScene(fg, st, now / 1000, st.fx?.type === 'inspect');

      const scene = sceneRef.current; if (!scene) return;
      const cw = scene.clientWidth, ch = scene.clientHeight;
      const small = cw < 640;
      const X = x => (x / SCENE_W) * cw, Y = y => (y / SCENE_H) * ch;

      // Camera: on small screens zoom in and follow the action.
      const camEl = cameraRef.current;
      if (camEl) {
        if (small) {
          const mover = beat.actor && st.agents[beat.actor];
          const target = mover ? { x: (mover.x + (st.agents[beat.to]?.x ?? (beat.to === 'S' ? 400 : mover.x))) / 2, y: beat.to === 'S' ? 140 : mover.y - 8 } : { x: SCENE_W / 2, y: SCENE_H / 2 };
          const k = 1 - Math.exp(-dt * 4); cam.x += (target.x - cam.x) * k; cam.y += (target.y - cam.y) * k;
          const tx = Math.max(cw - cw * ZOOM, Math.min(0, cw / 2 - X(cam.x) * ZOOM));
          const ty = Math.max(ch - ch * ZOOM, Math.min(0, ch / 2 - Y(cam.y) * ZOOM));
          camEl.style.transform = `translate(${tx}px,${ty}px) scale(${ZOOM})`;
        } else if (camEl.style.transform) camEl.style.transform = '';
      }

      for (const id of TAGS) {
        const el = tagRefs.current[id], a = st.agents[id]; if (!el) continue;
        el.style.left = `${(a.x / SCENE_W) * 100}%`;
        el.style.top = `${((a.y - (a.pose === 'sit' ? 25 : 31)) / SCENE_H) * 100}%`;
        el.classList.toggle('is-speaking', st.speaker === id);
      }
      // Speech: bubble above the speaker (desktop) and a subtitle strip (small screens).
      const bub = bubbleRef.current;
      const spk = st.speaker && st.agents[st.speaker] ? st.speaker : null;
      const key = spk && st.text ? `${spk}|${st.text}` : '';
      if (key !== lastBubble) {
        lastBubble = key;
        if (bub && key) { bub.querySelector('strong').textContent = ROLE_NAMES[spk]; bub.querySelector('p').textContent = st.text; }
        const cap = captionRef.current;
        if (cap) { cap.hidden = !key; if (key) { cap.querySelector('strong').textContent = ROLE_NAMES[spk]; cap.querySelector('span').textContent = st.text; } }
      }
      if (bub) {
        if (!key || small) bub.hidden = true;
        else {
          bub.hidden = false;
          const a = st.agents[spk];
          const left = Math.max(3, Math.min(X(a.x) - bub.offsetWidth / 2, cw - bub.offsetWidth - 3));
          const top = Y(a.y - (a.pose === 'sit' ? 25 : 31)) - bub.offsetHeight - 16;
          bub.style.left = `${left}px`; bub.style.top = `${Math.max(3, top)}px`;
          bub.style.setProperty('--tail-x', `${Math.max(8, Math.min(X(a.x) - left, bub.offsetWidth - 8))}px`);
        }
      }
      // Artifact card travelling between agents / into the sandbox.
      const art = artifactRef.current;
      if (art) {
        if (!st.artifact) art.hidden = true;
        else {
          art.hidden = false; art.dataset.tone = st.artifact.tone || 'info';
          art.style.left = `${(st.artifact.x / SCENE_W) * 100}%`; art.style.top = `${(st.artifact.y / SCENE_H) * 100}%`;
          art.classList.toggle('is-arrived', st.artifact.landed);
          const label = art.querySelector('b'); if (label.textContent !== st.artifact.label) label.textContent = st.artifact.label;
        }
      }
      if (alertRef.current) alertRef.current.hidden = !st.alert;
      const panel = panelRef.current;
      if (panel) {
        const fx = st.fx?.type === 'inspect' ? '' : st.fx?.type || '';
        if (panel.dataset.fx !== fx) panel.dataset.fx = fx;
        if (statusRef.current) { const label = FX_LABEL[fx] || (st.agents.X.state === 'alarm' ? (beat.actor === 'S' ? 'STOPPED' : 'ALERT') : 'IDLE'); if (statusRef.current.textContent !== label) statusRef.current.textContent = label; }
      }
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(frame); if (office) office.free(); };
  }, []);

  const beat = beats[index];
  const tName = TARGET_NAMES[data.target] || 'TARGET';
  const injected = marks.has('inject');
  const verified = marks.has('injected-verify');
  return <>
    <div className="research-office swarm-stage" ref={sceneRef}>
      <div className="swarm-stage__camera" ref={cameraRef}>
        <canvas ref={bgRef} className="swarm-stage__bg" width={SCENE_W} height={SCENE_H} role="img" aria-label="Pixel office where the research agents stand up, walk to each other and test Codex in a sandbox. The case steps are described in the session chat." />
        <canvas ref={fgRef} className="swarm-stage__fg" width={SCENE_W} height={SCENE_H} aria-hidden="true" />
        <div className="research-office__overlays" aria-hidden="true">
          <div className="swarm-boundary" style={{ left: `${(BOUNDARY_X / SCENE_W) * 100}%` }}><span>TRUST BOUNDARY</span></div>
          <div className="swarm-panel" ref={panelRef} data-injected={injected} data-verified={verified}>
            <div className="swarm-panel__head"><span>{tName} · SANDBOX</span><em ref={statusRef}>IDLE</em></div>
            <div className="swarm-panel__row"><i className="is-file" /><span>{data.carrier}</span><b className={injected ? 'is-mod' : ''}>{injected ? 'MODIFIED' : 'CLEAN'}</b></div>
            <div className="swarm-panel__row"><i className="is-lock" /><span>protected state</span><b className={verified && data.injected.unauthorized ? 'is-mod' : ''}>{verified && data.injected.unauthorized ? 'CHANGED' : 'INTACT'}</b></div>
          </div>
          {TAGS.map(id => <span key={id} className="research-office__badge swarm-tag" ref={el => { tagRefs.current[id] = el; }}>{id === 'X' ? (data.target === 'mock' ? 'MOCK' : tName) : ROLES[id].name}</span>)}
          <div className="research-office__artifact" ref={artifactRef} hidden><i /><b /></div>
          {beat?.alert && <div className={`research-office__alert is-${beat.alert.tone}`} ref={alertRef} hidden><strong>{beat.alert.title}</strong>{beat.alert.lines.map(([k, v]) => <span key={k}><em>{k}</em> {v}</span>)}</div>}
          <div className="research-office__speech" ref={bubbleRef} hidden><strong /><p /></div>
        </div>
      </div>
      {showStart && <button className="swarm-start" onClick={onStart}><span>▶</span> PLAY THE CASE<small>about 90 seconds · illustrative dialogue, recorded outcomes</small></button>}
      {error && <p className="swarm-stage__error">Office background unavailable. The case steps are still shown below.</p>}
    </div>
    <p className="swarm-caption" ref={captionRef} hidden aria-hidden="true"><strong /> <span /></p>
  </>;
}
