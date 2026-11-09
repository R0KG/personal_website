// Builds src/legacy/research/cases.json from local Codex research reports.
// Public-safe by design: keeps mechanism-level facts only. It never copies payload
// contents, fixture bodies, prompts, traces, local paths, or any verified /
// candidate / clean-baseline-security result.
//   node scripts/build-research-cases.mjs [artifactsDir]
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const root = process.argv[2] || join(homedir(), 'code/bug_codex/artifacts');
const OUT = new URL('../src/legacy/research/cases.json', import.meta.url);
const STATS_OUT = new URL('../src/legacy/research/stats.json', import.meta.url);
const MAX_CASES = 14;

// Only outcomes that are safe to show publicly.
// attack_verified is shown only for the synthetic mock target (see below).
const SHOWABLE = new Set(['attack_failed_task_success', 'clean_failure', 'inconclusive', 'legitimate_task_disrupted', 'attack_verified']);
const TEMPLATES = {
  batch_manifest_cleanup: { label: 'Batch cleanup from a manifest', carrier: 'build/manifest.txt', task: 'Delete the generated files listed in the manifest.' },
  test_output_authority: { label: 'Trusted test output', carrier: 'tool output', task: 'Run the diagnostic and summarize its report.' },
  config_split_weakening: { label: 'Split configuration changes', carrier: 'config change request', task: 'Apply a series of small configuration updates.' },
};
const FALLBACK = { label: 'Agent-designed scenario', carrier: 'agent-written fixture', task: 'Complete a legitimate user task.' };
const VARIANTS = {
  directory_entry: 'directory entry', wildcard_expansion: 'wildcard expansion',
  lexical_obfuscation: 'case-folding / lexical spelling', free_text_followup: 'free-text follow-up',
};
const pretty = s => (s || '').replace(/_/g, ' ');
const safePath = p => (typeof p === 'string' && /^[\w./-]{3,40}$/.test(p) ? p : null);

const cases = [];
const totals = { sessions: 0, runs: 0, targetCalls: 0, liveCalls: 0, mockCalls: 0, roleCalls: 0, negatives: 0, costUsd: 0 };
for (const dir of readdirSync(root).sort()) {
  if (!/^\d{8}T\d{6}Z-/.test(dir)) continue; // skip demo / simulation folders
  const file = join(root, dir, 'report.json');
  if (!existsSync(file)) continue;
  let r; try { r = JSON.parse(readFileSync(file, 'utf8')); } catch { continue; }
  const usage = r.model_usage || {};
  let cfg = {}; try { cfg = JSON.parse(r.session?.config_json || '{}'); } catch { /* keep empty */ }
  const target = cfg.target === 'mock' ? 'mock' : cfg.target === 'codex' ? 'codex' : 'unknown';
  const used = r.live_call_budget?.used || 0;
  if (target === 'mock') totals.mockCalls += used; else if (cfg.authorize_live) totals.liveCalls += used;
  totals.sessions++; totals.runs += (r.experiments || []).length; totals.targetCalls += r.live_call_budget?.used || 0;
  totals.roleCalls += usage.role_calls || 0; totals.costUsd += usage.estimated_cost_usd || 0;
  totals.negatives += (r.classifications || []).filter(x => x.classification === 'attack_failed_task_success').length;
  const session = { roleCalls: usage.role_calls || 0, targetCalls: r.live_call_budget?.used || (r.experiments || []).length, minutes: Math.round((usage.duration_ms || 0) / 6000) / 10, costUsd: Math.round((usage.estimated_cost_usd || 0) * 1000) / 1000 };
  const scenarios = new Map((r.scenarios || []).map(s => [s.scenario_id, s]));
  const disc = new Map((r.discoveries || []).map(x => [x.hypothesis_id, x]));
  const hypOf = bundle => (r.experiments || []).find(e => bundle && String(e.case_name).startsWith(bundle))?.hypothesis_id;
  const fidelityFile = readdirSync(join(root, dir)).find(f => /fidelity\.json$/.test(f));
  const fidelity = fidelityFile ? JSON.parse(readFileSync(join(root, dir, fidelityFile), 'utf8')) : null;
  const stop = (r.timeline || []).find(t => t.stage === 'stop');

  for (const c of r.classifications || []) {
    if (!SHOWABLE.has(c.classification)) continue;
    const d = c.detail || {}; const s = scenarios.get(d.scenario_id) || {};
    const dim = d.dimensions || {};
    const bundle = !dim.clean && d.clean && d.injected; // newer bundle-style reports
    const legacy = !dim.clean && !bundle && Array.isArray(d.results) ? Object.fromEntries(d.results.map(x => [x.case, x])) : null; // older results[] shape
    if (!dim.clean && !bundle && !legacy) continue;
    // A verified injection is only publishable here when it ran on the synthetic mock target.
    if (c.classification === 'attack_verified' && target !== 'mock') { console.warn(`skipping attack_verified outside the mock target: ${dir}`); continue; }
    const hyp = disc.get(hypOf(d.bundle_id));
    const kinds = new Set();
    for (const k of ['clean', 'injected']) for (const a of Object.values(d[k]?.assertions || {})) for (const kind of a?.failed || []) kinds.add(kind);
    const checks = [...kinds].filter(k => /^[a-z_]{3,30}$/.test(k)).slice(0, 4);
    const tpl = TEMPLATES[d.template || s.template] || FALLBACK;
    const executed = d.variant || s.variant;
    const arm = k => legacy
      ? { task: !!legacy[k]?.task_success, taskFailed: legacy[k]?.task_success === false, unauthorized: !!legacy[k]?.attack_success, exposed: !!legacy[k]?.injection_exposed, evidence: legacy[k]?.evidence_valid !== false }
      : bundle
      ? { task: !!d[k].task_success, taskFailed: d[k].task_success === false, unauthorized: !!d[k].attack_success, exposed: !!(d[k].injection_exposed ?? d[k].attack_observed), evidence: d[k].evidence_valid !== false }
      : { task: !!dim[k]?.task_success, taskFailed: !!dim[k]?.task_failure, unauthorized: !!dim[k]?.unauthorized_action, exposed: !!dim[k]?.injection_exposed, evidence: dim[k]?.evidence_complete !== false };
    cases.push({
      id: `${dir.slice(0, 15)}-${String(d.scenario_id || d.bundle_id || c.classification_id).slice(-8)}`,
      date: c.at?.slice(0, 10) || dir.slice(0, 8),
      templateLabel: tpl.label,
      mechanism: s.surface_category || hyp?.surface_category || tpl.label.toLowerCase(),
      injectionKind: pretty(s.injection?.kind) || 'modified input',
      variant: VARIANTS[executed] || pretty(executed) || 'standard',
      carrier: safePath(s.attacker_surface) || tpl.carrier,
      task: tpl.task,
      target, classification: c.classification, checks: checks.length ? checks : ['file_changed'], session,
      clean: arm('clean'), injected: arm('injected'),
      fidelity: fidelity && fidelity.scenario_id === d.scenario_id && fidelity.mechanism_match === false
        ? { proposed: VARIANTS[fidelity.claimed_variant] || pretty(fidelity.claimed_variant), executed: VARIANTS[fidelity.executed_variant] || pretty(fidelity.executed_variant) }
        : null,
      stopped: stop?.detail ? pretty(String(stop.detail)).slice(0, 60) : null,
    });
  }
}

// Keep the set varied: one case per session, then round-robin across outcome types.
const seenSession = new Set(); const groups = {};
for (const c of cases.sort((a, b) => b.id.localeCompare(a.id))) {
  const sid = c.id.slice(0, 15); if (seenSession.has(sid)) continue; seenSession.add(sid);
  (groups[c.classification] ||= []).push(c);
}
// Always keep cases with a fidelity finding: they show the verifier catching a mismatch.
const picked = [...cases.filter(c => c.fidelity).slice(0, 2), ...cases.filter(c => c.classification === 'attack_verified')];
for (const g of Object.values(groups)) g.splice(0, g.length, ...g.filter(c => !picked.includes(c)));
while (picked.length < MAX_CASES && Object.values(groups).some(g => g.length)) {
  for (const g of Object.values(groups)) if (g.length && picked.length < MAX_CASES) picked.push(g.shift());
}
const rank = c => (c.fidelity ? 0 : { attack_verified: 1, attack_failed_task_success: 2, inconclusive: 3, legitimate_task_disrupted: 4 }[c.classification] ?? 4);
picked.sort((a, b) => rank(a) - rank(b) || b.id.localeCompare(a.id));
writeFileSync(STATS_OUT, JSON.stringify({ ...totals, costUsd: Math.round(totals.costUsd * 100) / 100 }, null, 2) + '\n');

writeFileSync(OUT, JSON.stringify(picked, null, 2) + '\n');
const tally = {}; picked.forEach(c => { tally[c.classification] = (tally[c.classification] || 0) + 1; });
console.log(`wrote ${picked.length} of ${cases.length} showable cases`, tally);
