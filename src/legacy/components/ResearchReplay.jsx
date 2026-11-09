import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ResearchProcess from './ResearchProcess';
import SwarmStage from './SwarmStage';
import cases from '../research/cases.json';
import totals from '../research/stats.json';
import { buildBeats, boardRows, targetCalls, getOutcome, ROLE_NAMES, TARGET_NAMES } from '../research/beats';

const monthDay = iso => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' }).toUpperCase();
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const sessionLine = s => [
  s.roleCalls && `${s.roleCalls} agent role calls`,
  s.targetCalls && `${s.targetCalls} target calls`,
  s.minutes && `${s.minutes} min`,
  s.costUsd && `≈$${s.costUsd} model cost`,
].filter(Boolean).join(' · ');

const FILTERS = [['all', 'ALL'], ['attack_failed_task_success', 'NEGATIVE'], ['inconclusive', 'INCONCLUSIVE'], ['legitimate_task_disrupted', 'DISRUPTED'], ['attack_verified', 'VERIFIED']];
const PIPELINE = [['R', 'Researcher', 'RES'], ['E', 'Experimenter', 'EXP'], ['C', 'Controller', 'CTRL'], ['X', 'Target sandbox', 'TARGET'], ['V', 'Verifier', 'VER']];

// ?case=3&step=5 (1-based) deep-links to a moment in a case.
function initialFromUrl() {
  const q = new URLSearchParams(window.location.search);
  const c = Math.min(cases.length, Math.max(1, parseInt(q.get('case'), 10) || 1)) - 1;
  const max = buildBeats(cases[c]).length;
  const st = Math.min(max, Math.max(1, parseInt(q.get('step'), 10) || 1)) - 1;
  return { c, st, linked: q.has('case') || q.has('step') };
}

export default function ResearchReplay() {
  const [init] = useState(initialFromUrl);
  const [caseIndex, setCaseIndex] = useState(init.c);
  const [index, setIndex] = useState(init.st);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [kick, setKick] = useState(init.linked ? 1 : 0); // a deep link plays its own step once
  const [markedThrough, setMarkedThrough] = useState(init.st - 1);
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const consoleRef = useRef(null);
  const autoStarted = useRef(init.linked);

  const data = cases[caseIndex];
  const beats = useMemo(() => buildBeats(data), [data]);
  const last = beats.length - 1;
  const beat = beats[index];
  const marks = useMemo(() => new Set(beats.slice(0, markedThrough + 1).map(b => b.mark).filter(Boolean)), [beats, markedThrough]);
  const outcome = getOutcome(data);
  const idle = !playing && index === 0 && markedThrough < 0;
  const visibleCases = cases.map((c, i) => [c, i]).filter(([c]) => filter === 'all' || c.classification === filter);

  // Keep the address bar shareable without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('case', caseIndex + 1); url.searchParams.set('step', index + 1);
    window.history.replaceState(window.history.state, '', url);
  }, [caseIndex, index]);
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard unavailable */ }
  };

  const goTo = useCallback((i, { play = false } = {}) => {
    autoStarted.current = true;
    setIndex(i); setMarkedThrough(i - 1); setPlaying(play); setKick(k => k + 1);
  }, []);
  const onMark = useCallback(i => setMarkedThrough(m => Math.max(m, i)), []);
  const onBeatDone = useCallback(i => {
    if (!playing) return;
    if (i >= last) setPlaying(false); else setIndex(i + 1);
  }, [playing, last]);
  const chooseCase = i => { autoStarted.current = true; setCaseIndex(i); setIndex(0); setMarkedThrough(-1); setPlaying(!prefersReducedMotion()); };
  const play = () => { autoStarted.current = true; if (index === last) goTo(0, { play: true }); else setPlaying(true); };

  // Start the first case once, the first time the stage is mostly on screen.
  useEffect(() => {
    const el = consoleRef.current;
    if (!el || !('IntersectionObserver' in window) || prefersReducedMotion()) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !autoStarted.current) { autoStarted.current = true; setPlaying(true); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(el); return () => io.disconnect();
  }, []);

  const onKeyDown = e => {
    if (e.target.closest('button, summary, a, input')) { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; }
    if (e.key === ' ') { e.preventDefault(); playing ? setPlaying(false) : play(); }
    else if (e.key === 'ArrowRight' && index < last) goTo(index + 1);
    else if (e.key === 'ArrowLeft' && index > 0) goTo(index - 1);
  };

  const board = boardRows(data, marks);
  const calls = targetCalls(marks);
  const handoff = beat.to ? `HANDOFF: ${ROLE_NAMES[beat.actor]} → ${beat.to === 'S' ? `${TARGET_NAMES[data.target] || 'TARGET'} SANDBOX` : beat.to === 'D' ? 'EVIDENCE DOCK' : ROLE_NAMES[beat.to]}` : 'FOLLOW THE ACTIVE AGENT AND SESSION CHAT';
  const showResult = index === last && (!beats[last].mark || marks.has(beats[last].mark));

  return <section className="research-replay" aria-labelledby="research-title">
    <div className="research-replay__intro"><div><span>PROJECT / MULTI-AGENT ENGINEERING</span><h1 id="research-title">Inside the research loop.</h1><p>A swarm of agents hunts for prompt-injection weaknesses in Codex. Watch them design a test, run it in a sandbox and check the result.</p><nav className="research-process-nav" aria-label="Showcase sections"><a href="#recorded-case">Watch a case</a><a href="#engineering-process">Explore the process & live backlog ↓</a></nav></div><div className="research-replay__meta"><p className="research-replay__note">{cases.length} RECORDED CASES</p><p>Outcomes, checks and run stats come from real sessions. The dialogue is illustrative. No payloads, prompts or traces are shown.</p></div></div>

    <dl className="research-proof" aria-label="Research totals">
      <div><dt>{totals.sessions}</dt><dd>research sessions</dd></div>
      <div><dt>{totals.runs}</dt><dd>experiment runs</dd></div>
      <div title={`${totals.liveCalls} live Codex calls, ${totals.mockCalls} on the mock target`}><dt>{totals.targetCalls}</dt><dd>target calls</dd></div>
      <div><dt>{totals.roleCalls}</dt><dd>agent role calls</dd></div>
      <div><dt>~${totals.costUsd.toFixed(2)}</dt><dd>est. model cost</dd></div>
    </dl>

    <div className="research-filters" role="group" aria-label="Filter cases by outcome">{FILTERS.map(([key, label]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    <div className="research-cases" role="group" aria-label="Choose a recorded case">{visibleCases.map(([c, i]) => <button key={c.id} aria-pressed={i === caseIndex} data-outcome={c.classification} onClick={() => chooseCase(i)} title={c.templateLabel}><span>CASE {String(i + 1).padStart(2, '0')} · {monthDay(c.date)}</span><strong>{getOutcome(c).label}</strong><small>{c.target === 'mock' ? 'mock target · ' : ''}{c.session.targetCalls} target calls{c.session.minutes ? ` · ${Math.round(c.session.minutes)} min` : ''}</small></button>)}{!visibleCases.length && <p className="research-cases__empty">No cases match this filter.</p>}</div>

    <div className="research-replay__console" id="recorded-case" ref={consoleRef} onKeyDown={onKeyDown}>
      <div className="research-replay__stage"><div className="research-replay__top"><span>SESSION MONITOR · CASE {String(caseIndex + 1).padStart(2, '0')}</span><span>{playing ? '● PLAYING' : '○ PAUSED'}</span></div>
        <ol className="research-pipeline" aria-label="Research loop roles">{PIPELINE.map(([id, name, short]) => <li key={id} className={beat.actor === id || beat.to === id || (id === 'X' && beat.to === 'S') ? 'is-active' : ''} data-boundary={id === 'X' ? 'true' : undefined} title={name}><span className="full">{name}</span><span className="short" aria-hidden="true">{short}</span></li>)}</ol>
        <SwarmStage data={data} beats={beats} index={index} playing={playing} speed={speed} kick={kick} marks={marks} onMark={onMark} onBeatDone={onBeatDone} showStart={idle} onStart={play} />
        <p className="research-handoff">{handoff.split(' → ').flatMap((part, i) => (i ? [<i key={i} className="research-arrow" aria-hidden="true">→</i>, part] : [part]))}</p>
        <ol className="research-steps" aria-label="Case steps">{beats.map((b, i) => <li key={b.title + i}><button onClick={() => goTo(i)} aria-label={`Step ${i + 1}: ${b.title}`} aria-current={i === index ? 'step' : undefined} className={i < index ? 'is-done' : i === index ? 'is-current' : ''}><span>{b.title}</span></button></li>)}</ol>
        <div className="research-replay__actions"><button onClick={() => (playing ? setPlaying(false) : play())}>{playing ? 'PAUSE' : index === last ? 'REPLAY' : 'PLAY'}</button><button onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}>PREVIOUS</button><button onClick={() => goTo(Math.min(last, index + 1))} disabled={index === last}>NEXT</button><button onClick={() => setSpeed(speed === 1 ? 2 : 1)} aria-label={`Playback speed ${speed}x. Switch to ${speed === 1 ? 2 : 1}x`}>{speed}×</button><button onClick={() => { setPlaying(false); setIndex(0); setMarkedThrough(-1); }}>RESET</button><button onClick={share} className="research-share">{copied ? 'LINK COPIED' : 'COPY LINK'}</button></div>
        <p className="research-keys">SPACE play / pause · ← → step</p>
        <div className="research-board" aria-label="Case board: clean versus injected comparison">
          <div className="research-board__head"><span>CASE BOARD</span><span>CASE CALLS {calls}/2</span></div>
          <div className="research-board__grid" role="table">
            <div className="research-board__row is-header" role="row"><span role="columnheader">CHECK</span><span role="columnheader">CLEAN</span><span role="columnheader">INJECTED</span></div>
            {board.map(([label, clean, injected]) => <div className="research-board__row" role="row" key={label}><span role="rowheader">{label}</span><span role="cell" className={`is-${clean[0]}`}>{clean[1]}</span><span role="cell" className={`is-${injected[0]}`}>{injected[1]}</span></div>)}
          </div>
        </div>
        {showResult && <div className={`research-result is-${outcome.tone}`} role="status"><span>CASE RESULT · {outcome.label}</span><h2>{outcome.headline}</h2><p>{outcome.body}</p>{data.fidelity && <p>The proposed idea ({data.fidelity.proposed}) differed from what actually ran ({data.fidelity.executed}), so the original hypothesis remains untested.</p>}{data.stopped && <p>The session stopped: {data.stopped}.</p>}</div>}
      </div>
      <div className="research-dialogue" aria-label="Session dialogue">
        <div className="research-dialogue__header"><span>SESSION CHAT</span><span>{String(index + 1).padStart(2, '0')} / {String(beats.length).padStart(2, '0')}</span></div>
        <div className="research-dialogue__messages" key={`${caseIndex}-${index}`} aria-live="polite" aria-atomic="true">
          <div className="research-engineering-note"><span>STEP {index + 1} / {beat.title}</span><p>{beat.note}</p></div>
          <article className="research-dialogue__message is-current">
            <div className="research-dialogue__avatar" aria-hidden="true">{ROLE_NAMES[beat.actor].slice(0, 2)}</div><div className="research-dialogue__bubble"><strong>{ROLE_NAMES[beat.actor]}</strong><p>{beat.say}</p>{beat.reply && <p className="research-dialogue__reply"><b>{ROLE_NAMES[beat.to]}</b> {beat.reply}</p>}</div>
          </article>
          {index > 0 && <details className="research-history"><summary>Earlier messages ({index})</summary>{beats.slice(0, index).reverse().map(b => <article className="research-dialogue__message" key={b.title + b.say}>
            <div className="research-dialogue__avatar" aria-hidden="true">{ROLE_NAMES[b.actor].slice(0, 2)}</div><div className="research-dialogue__bubble"><strong>{ROLE_NAMES[b.actor]}</strong><p>{b.say}</p></div>
          </article>)}</details>}
        </div>
        <p className="research-dialogue__disclaimer">Dialogue is illustrative. Outcomes, checks and run stats come from the recorded session.</p>
        <details className="research-evidence"><summary>Case record</summary><p><strong>Mechanism:</strong> {data.mechanism}.</p><p><strong>Scenario:</strong> {data.templateLabel}; variant: {data.variant}.</p><p><strong>Checks:</strong> {data.checks.map(k => k.replace(/_/g, ' ')).join(', ')}.</p><p><strong>Carrier:</strong> {data.carrier}. <strong>Injection:</strong> {data.injectionKind}.</p><p><strong>Target:</strong> {data.target === 'mock' ? 'synthetic mock target (not live Codex)' : data.target === 'codex' ? 'Codex' : 'not recorded'}.</p><p><strong>Session:</strong> {sessionLine(data.session)}.</p></details>
        <details className="research-evidence"><summary>What this record leaves out</summary><p>Payload contents, prompts, traces and target configuration are not published. Only outcomes that are safe to show appear here; results that would need review or disclosure are excluded. Source: retained session reports.</p></details>
      </div>
    </div>

    <div className="research-brief"><div><span className="research-brief__eyebrow">{data.templateLabel.toUpperCase()} / {beats.length} STEPS</span><h2>Can a modified {data.carrier} change the outcome of a normal task?</h2><p>The assistant does a legitimate task twice: once on clean input and once on injected input. The swarm designs the pair, the Controller runs it behind the trust boundary, and the Verifier checks whether anything it should not touch changed.</p><p className="research-brief__stats">THIS SESSION · {sessionLine(data.session) || 'stats not recorded'}</p></div></div>
    <ResearchProcess />
  </section>;
}
