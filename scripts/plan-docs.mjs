import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

/* Write each venture's operating plan as a Markdown document, from the same
   data the /ventures#plan section renders, so the two can never say
   different things. After changing a criterion's state or CURRENT_STAGE in
   src/components/ventures/plan.js, run `npm run plan:docs`.

   The output folder defaults to Documents/Proyecto Moonphase; pass another
   one as the first argument. The source files are ES modules inside a CRA
   project that Node reads as CommonJS, so they are copied to .mjs first. */

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.argv[2] || path.join(os.homedir(), 'Documents', 'Proyecto Moonphase');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'plan-docs-'));

const load = async (relative, name) => {
  const copy = path.join(TMP, name);
  fs.copyFileSync(path.join(REPO, relative), copy);
  return import(pathToFileURL(copy).href);
};

const es = (await load('src/i18n/brands.es.js', 'brands.es.mjs')).default;
const { STAGES, CURRENT_STAGE, FRONTS, CRITERIA } = await load('src/components/ventures/plan.js', 'plan.mjs');
fs.rmSync(TMP, { recursive: true, force: true });

const p = es.plan;
const MARK = { done: '[x]', active: '[~]', pending: '[ ]' };

const write = (id, folder) => {
  const name = p.names[id];
  const out = [
    `# Plan de operaciones — ${name}`,
    '',
    `> **${p.title}.** ${p.lede}`,
    '',
    'Este documento sale de los mismos datos que la sección [De la promesa al plan](https://portfolio-phi-ten-37.vercel.app/ventures#plan) del portfolio. Para avanzar el plan se cambia el estado de un criterio o la etapa actual en `src/components/ventures/plan.js`, y se regenera con `npm run plan:docs`.',
    '',
    'Estados: `[x]` cumplido · `[~]` en curso · `[ ]` pendiente.',
    '',
    '---',
    '',
  ];
  const current = STAGES.find((s) => s.id === CURRENT_STAGE);
  out.push(`## ${p.focusTitle}`, '', `**${p.here}: ${p.stages[current.id].name}** (${p.stages[current.id].window}).`, '');
  current.focusNow.forEach((key, i) => out.push(`${i + 1}. ${p.stages[current.id].now[key]}`));
  out.push('', '## Las cuatro etapas', '', '| Etapa | Ventana | Qué significa |', '|---|---|---|');
  STAGES.forEach((s) => {
    const here = s.id === CURRENT_STAGE ? ` ← ${p.here.toLowerCase()}` : '';
    out.push(`| **${p.stages[s.id].name}**${here} | ${p.stages[s.id].window} | ${p.stages[s.id].tagline} |`);
  });
  out.push('', 'Se sale de una etapa cuando se cumplen sus criterios de salida, no cuando llega la fecha.');

  STAGES.forEach((s) => {
    const cell = p[id][s.id];
    const stage = p.stages[s.id];
    const incubating = id === 'moonphase' && s.id === 'incubate';
    out.push('', '---', '', `## ${stage.name} · ${stage.window}${s.id === CURRENT_STAGE ? ` — ${p.here}` : ''}`, '');
    out.push(
      `*${stage.tagline}*${incubating ? ` En esta etapa, la empresa es **${p.names.freelanceMoonphase}**: la práctica independiente es la incubadora de Moonphase.` : ''}`,
      ''
    );
    out.push(`### ${p.objectiveTitle}`, '', cell.objective, '', `### ${p.modelTitle}`, '', cell.model, '', `### ${p.metricsTitle}`, '');
    cell.metrics.forEach((metric) => out.push(`- ${metric}`));
    out.push('', `### ${p.frontsTitle}`);
    FRONTS[id][s.id].forEach((front) => {
      out.push('', `#### ${p.frontNames[id][front]}`, '');
      cell.fronts[front].forEach((action) => out.push(`- ${action}`));
    });
    out.push('', `### ${p.risksTitle}`, '');
    cell.risks.forEach((r) => out.push(`- **${r.risk}** ${p.mitigationLabel}: ${r.mitigation}`));
    out.push('', `### ${p.exitTitle}`, '');
    const criteria = CRITERIA[id][s.id];
    if (!criteria.length) out.push(p.exitOpen);
    criteria.forEach((c) => out.push(`- ${MARK[c.state]} ${cell.exit[c.key]} *(${p.states[c.state].toLowerCase()})*`));
  });

  const file = path.join(BASE, folder, 'PLAN.md');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${out.join('\n')}\n`, 'utf8');
  console.log(`wrote ${file}`);
};

write('moonphase', 'Moonphase');
write('stackselect', 'StackSelect');
