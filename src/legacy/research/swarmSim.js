// Time-based choreography + sprite drawing for the research swarm.
// evalBeat(beat, t) is a pure function of (beat, time): agents stand up, walk along
// the office aisles, talk, hand over artifacts, act on the sandbox and walk back.
// Coordinates are pixels in the 480x260 pixtuoid frame (foot position of a sprite).

export const SCENE_W = 480;
export const SCENE_H = 260;

export const SEATS = {
  R: { x: 205, y: 112, row: 'top' },
  E: { x: 292, y: 112, row: 'top' },
  C: { x: 200, y: 190, row: 'bot' },
  V: { x: 288, y: 190, row: 'bot' },
  X: { x: 413, y: 190, row: 'bot' }, // Codex target
};
// Where a visitor stands when talking to a given seat / the sandbox.
const MEET = { R: { x: 231, y: 116 }, E: { x: 266, y: 116 }, C: { x: 226, y: 194 }, V: { x: 262, y: 194 }, S: { x: 378, y: 194 }, D: { x: 340, y: 196 } };
export const BOUNDARY_X = 365; // trust boundary: only the Controller crosses it
const isPlace = z => z === 'S' || z === 'D';
export const PANEL = { x: 413, y: 118 }; // sandbox workspace panel (center)
const CH1 = 248, CH2 = 353, COR = 230; // aisle between desk columns, and the bottom corridor
const SPEED = 80; // px per second
const ACT = { run: 2.2, inject: 1.9, inspect: 2.0, alert: 2.8 };

export const ROLES = {
  R: { name: 'RESEARCHER', short: 'cc·api', shirt: '#4aa3ff', skin: '#e8b48f', hair: '#3b2a20', row: 'top' },
  E: { name: 'EXPERIMENTER', short: 'cx·web', shirt: '#ff9a3c', skin: '#c98a64', hair: '#e2b84a', row: 'top' },
  C: { name: 'CONTROLLER', short: 'ag·infra', shirt: '#5ee08a', skin: '#f0c9a6', hair: '#1c1c24', row: 'bot' },
  V: { name: 'VERIFIER', short: 'cw·data', shirt: '#c58bff', skin: '#8d5a3c', hair: '#101018', row: 'bot' },
};

function route(actor, zone) {
  const A = SEATS[actor], M = MEET[zone];
  let pts;
  if (zone === 'D') pts = A.x > 250 ? [A, { x: M.x, y: A.y }, M] : [A, { x: CH1, y: A.y }, { x: CH1, y: COR }, { x: M.x, y: COR }, M];
  else if (zone === 'S') pts = [A, { x: CH1, y: A.y }, { x: CH1, y: COR }, { x: CH2, y: COR }, { x: CH2, y: M.y }, M];
  else pts = [A, { x: CH1, y: A.y }, { x: CH1, y: M.y }, M];
  return pts.filter((p, i) => i === 0 || p.x !== pts[i - 1].x || p.y !== pts[i - 1].y);
}
const pathLen = pts => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);
function sample(pts, d, fallbackDir) {
  let left = Math.max(0, d);
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    if (left <= seg || i === pts.length - 1) {
      const k = seg ? Math.min(1, left / seg) : 1;
      const dx = pts[i].x - pts[i - 1].x;
      return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k, dir: dx ? Math.sign(dx) : fallbackDir };
    }
    left -= seg;
  }
  return { ...pts[pts.length - 1], dir: fallbackDir };
}
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
const clamp01 = k => Math.max(0, Math.min(1, k));

export function beatTimeline(beat, reduced = false) {
  const hasTo = !!beat.to && !!SEATS[beat.actor];
  const out = hasTo ? route(beat.actor, beat.to) : null;
  // With reduced motion agents change position without walking.
  const walk = out && !reduced ? pathLen(out) / SPEED : 0;
  const rise = hasTo && !reduced ? 0.5 : 0;
  const talk = Math.max(1.8, ((beat.say || '').length + (beat.reply || '').length) * 0.04);
  const act = ACT[beat.act] || 0;
  const tWalk = rise + walk, tTalk = tWalk + talk, tAct = tTalk + act;
  const total = tAct + walk + (hasTo ? 0.4 : 0) + 0.3;
  return { hasTo, out, walk, rise, talk, act, tWalk, tTalk, tAct, total, reduced };
}

export function evalBeat(beat, t, tl = beatTimeline(beat)) {
  const agents = {};
  for (const id of ['R', 'E', 'C', 'V']) agents[id] = { ...SEATS[id], pose: 'sit', dir: SEATS[id].row === 'top' ? -1 : 1 };
  agents.X = { ...SEATS.X, pose: 'sit', dir: -1, state: 'idle' };
  let speaker = null, text = '';
  const { hasTo, out, rise, tWalk, tTalk, tAct, talk } = tl;
  const mover = SEATS[beat.actor] ? agents[beat.actor] : null;
  const toAgent = hasTo && !isPlace(beat.to);

  if (mover) {
    if (hasTo) {
      const meet = MEET[beat.to];
      const faceDir = isPlace(beat.to) ? 1 : Math.sign(SEATS[beat.to].x - meet.x) || 1;
      if (t < rise) Object.assign(mover, { pose: 'stand' });
      else if (tl.reduced && t < tAct) Object.assign(mover, { pose: 'stand', x: meet.x, y: meet.y, dir: faceDir });
      else if (t < tWalk) Object.assign(mover, { pose: 'walk' }, sample(out, (t - rise) * SPEED, mover.dir));
      else if (t < tAct) Object.assign(mover, { pose: 'stand', x: meet.x, y: meet.y, dir: faceDir });
      else if (t < tAct + tl.walk) { const back = [...out].reverse(); Object.assign(mover, { pose: 'walk' }, sample(back, (t - tAct) * SPEED, -mover.dir)); }
      else if (t < tl.total - 0.3) Object.assign(mover, { pose: 'stand' });
    } else if (t < tl.total - 0.3) mover.pose = 'stand';
  }
  if (toAgent) {
    const r = agents[beat.to];
    if (t > tWalk - 0.4 && t < tAct + 0.3) { r.pose = 'stand'; r.dir = Math.sign(MEET[beat.to].x - SEATS[beat.to].x) || 1; }
  }

  // Speech: the mover talks first, the receiver replies in the second part.
  if (beat.actor && t >= tWalk && t < tTalk) {
    const split = beat.reply ? beat.say.length / (beat.say.length + beat.reply.length) : 1;
    if ((t - tWalk) / talk < split) { speaker = beat.actor; text = beat.say; }
    else { speaker = isPlace(beat.to) ? 'X' : beat.to; text = beat.reply; }
  }

  // Sandbox target reacts.
  let fx = null;
  if (beat.act && t >= tTalk && t < tAct) {
    const p = (t - tTalk) / tl.act;
    fx = { type: beat.act, p };
    if (beat.act === 'run') { agents.X.state = 'work'; speaker = 'X'; text = p < 0.55 ? 'Reading the task…' : 'Working on it…'; }
    if (beat.act === 'inspect') speaker = beat.actor, text = beat.say;
    if (beat.act === 'inject') agents.X.state = 'idle';
    if (beat.act === 'alert') { speaker = SEATS[beat.actor] ? beat.actor : null; text = beat.say; }
  }
  if (beat.act === 'run' && t >= tTalk && t < tAct) { agents.X.state = 'work'; }
  if (beat.act === 'alert' && t >= tWalk) agents.X.state = beat.alert?.tone === 'fail' ? 'alarm' : 'idle';
  if (beat.act === 'alert' && !hasTo && t >= 0 && t < tTalk && beat.actor) { speaker = SEATS[beat.actor] ? beat.actor : null; text = beat.say; }

  // Artifact card: carried by the mover, then handed to the receiver / dropped into the sandbox.
  let artifact = null;
  if (beat.artifact && hasTo && t >= rise && t < tl.total - 0.3) {
    const dest = beat.to === 'S' ? { x: PANEL.x, y: PANEL.y + 6 } : beat.to === 'D' ? { x: MEET.D.x + 4, y: MEET.D.y - 10 } : { x: SEATS[beat.to].x, y: SEATS[beat.to].y - 6 };
    const handStart = beat.artifactFrom === 'S' ? tWalk : tTalk - talk * 0.45; // handed over mid-conversation
    const k = clamp01((t - handStart) / 0.7);
    const hand = beat.artifactFrom === 'S' ? { x: PANEL.x, y: PANEL.y + 6 } : { x: mover.x, y: mover.y - 8 };
    artifact = { x: lerp(hand.x, dest.x, ease(k)), y: lerp(hand.y, dest.y, ease(k)), label: beat.artifact.label, tone: beat.artifact.tone, landed: k >= 1 };
    if (beat.to === 'S' && t >= tAct) artifact = null;
    if (beat.artifactFrom === 'S' && t < tWalk * 0.5) artifact = null;
  }

  const alert = beat.act === 'alert' && t >= (tWalk + 0.3) ? beat.alert : null;
  const markAt = beat.act ? tAct - tl.act * 0.1 : tTalk;
  return { agents, speaker, text, fx, artifact, alert, markReached: !!beat.mark && t >= markAt, done: t >= tl.total };
}

// ---------- drawing ----------
const px = (ctx, x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), w, h); };

function drawPerson(ctx, role, a, time) {
  const x = Math.round(a.x), y = Math.round(a.y);
  const sit = a.pose === 'sit', walk = a.pose === 'walk';
  const back = sit && role.row === 'bot';
  const by = y + (sit ? 5 : 0);
  const f = walk ? Math.floor(time * 7) % 2 : 0;
  const halo = '#0b0d12';
  px(ctx, x - 6, y - 1, 12, 2, 'rgba(0,0,0,.32)');
  if (!sit) {
    px(ctx, x - 4, by - 10, 4, 10, halo); px(ctx, x, by - 10, 4, 10, halo);
    px(ctx, x - 3, by - 9, 3, 8 + (walk && f ? 0 : 1), '#262b3d'); px(ctx, x, by - 9, 3, 8 + (walk && !f ? 0 : 1), '#262b3d');
    px(ctx, x - 3, by - 1 - (walk && f ? 1 : 0), 3, 1, '#0e1016'); px(ctx, x, by - 1 - (walk && !f ? 1 : 0), 3, 1, '#0e1016');
  }
  px(ctx, x - 6, by - 18, 12, 10, halo);
  px(ctx, x - 4, by - 17, 8, 9, role.shirt);
  const swing = walk ? (f ? 1 : -1) : 0;
  px(ctx, x - 6, by - 17 + swing, 2, 7, role.shirt); px(ctx, x + 4, by - 17 - swing, 2, 7, role.shirt);
  px(ctx, x - 6, by - 10 + swing, 2, 2, role.skin); px(ctx, x + 4, by - 10 - swing, 2, 2, role.skin);
  px(ctx, x - 4, by - 24, 8, 8, halo);
  px(ctx, x - 3, by - 23, 6, 6, back ? role.hair : role.skin);
  px(ctx, x - 3, by - 24, 6, 2, role.hair);
  if (!back) {
    const ex = a.dir > 0 ? 0 : -1;
    px(ctx, x - 2 + ex + 1, by - 21, 1, 1, '#111'); px(ctx, x + 1 + ex + 1, by - 21, 1, 1, '#111');
  }
}

function drawCodex(ctx, a, time) {
  const x = Math.round(a.x), y = Math.round(a.y);
  const work = a.state === 'work', alarm = a.state === 'alarm';
  const body = alarm ? '#ff6b6b' : '#ffd84a';
  px(ctx, x - 7, y - 1, 14, 2, 'rgba(0,0,0,.32)');
  px(ctx, x - 8, y - 19, 16, 14, '#0b0d12'); px(ctx, x - 7, y - 18, 14, 12, body);
  px(ctx, x - 6, y - 16, 12, 6, '#12151c');
  const blink = Math.floor(time * 3) % 6 === 0;
  const eye = alarm ? '#ff6b6b' : '#50f0ff';
  if (!blink) { px(ctx, x - 4, y - 14, 3, 2, eye); px(ctx, x + 1, y - 14, 3, 2, eye); }
  px(ctx, x - 1, y - 24, 2, 5, '#0b0d12'); px(ctx, x - 1, y - 26, 2, 2, work ? '#50f0ff' : body);
  if (work) for (let i = 0; i < 3; i++) px(ctx, x - 5 + i * 4, y - 31 - (Math.floor(time * 6) % 3 === i ? 2 : 0), 3, 3, '#50f0ff');
}

export function drawScene(ctx, state, time, inspecting) {
  ctx.clearRect(0, 0, SCENE_W, SCENE_H);
  const items = [
    ...['R', 'E', 'C', 'V'].map(id => ({ id, y: state.agents[id].y })),
    { id: 'X', y: SEATS.X.y },
  ].sort((a, b) => a.y - b.y);
  for (const { id } of items) {
    if (id === 'X') drawCodex(ctx, state.agents.X, time);
    else drawPerson(ctx, ROLES[id], state.agents[id], time);
  }
  if (inspecting) { // magnifier in the Verifier's hand
    const v = state.agents.V; const x = Math.round(v.x + 9), y = Math.round(v.y - 17);
    ctx.strokeStyle = '#ffda4b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 3, y + 3); ctx.lineTo(x + 7, y + 7); ctx.stroke();
  }
}
