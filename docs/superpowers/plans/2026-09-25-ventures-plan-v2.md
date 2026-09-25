# Ventures Operating Plan v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the operating plan from its own page into a `#plan` section of `/ventures`, and deepen every stage × venture cell into objective, model, metrics, workstreams with actions, risks with mitigations and exit criteria — with R&D leading Moonphase.

**Architecture:** `plan.js` keeps the structure (stages, current stage, ventures, which workstreams appear per stage, criteria states); all copy lives in `brands.es.js` / `brands.en.js` under `plan:`, with lists as arrays read through `tl()`. `VenturesPlan.jsx` becomes a section rendered by `ventures.jsx`, with two tablists (stage, venture). Builds on branch `ventures-plan` (v1 already committed there).

**Tech Stack:** React 18, react-router-dom 6, CRA (Jest + @testing-library/react 13), plain CSS in `src/styles/hub.css`.

**Spec:** `docs/superpowers/specs/2026-09-25-ventures-plan-design.md` (v2). Its "Contenido" section is the verbatim Spanish copy; the English is its faithful translation.

## Global Constraints

- Public and narrative: no amounts, prices, margins, pipeline, client names except PuntoBienestar, unclosed partners or assessment rubrics.
- Voice: first-person plural ("Estamos aquí", "En qué ponemos el foco ahora" / "We are here", "Where our focus goes now").
- Both languages always; identical key sets and array lengths (enforced by `dictionary.test.js`); no empty strings.
- Criterion states exactly `done | active | pending`; `CURRENT_STAGE = 'incubate'`.
- Moonphase's first workstream is `rd` ("Investigación y desarrollo"), present in every stage and rendered featured (full width).
- No route `/ventures/plan`; chips link to `/ventures#plan`.
- Reuse existing patterns (`Reveal`, `brand-h2`, `brand-p`, `data-brand` scopes). Comments explain why.

## Review Focus

1. Both tablists wrap with arrows and support Home/End, moving focus. → Task 2 test.
2. Arriving at `/ventures#plan` from another page scrolls to the section even though `App` resets scroll to the top on route change (child effects run before the parent's). → Task 3 test.
3. Switching stage keeps the selected venture, and switching venture keeps the selected stage. → Task 2 test.
4. An array present in one language but shorter in the other (would render a missing action silently in one language). → Task 1 test.
5. The focus block always shows the current stage's actions, whatever stage is selected. → Task 2 test.

Rulings carried from the conversation: the focus block moves above the selectors and always shows the current stage (spec v2 structure item 2), replacing v1's "only when the current stage is selected".

---

### Task 1: Structure and copy v2

**Files:**
- Modify: `src/components/ventures/plan.js` (rewrite)
- Modify: `src/components/ventures/plan.test.js` (rewrite)
- Modify: `src/i18n/brands.es.js`, `src/i18n/brands.en.js` (replace the `plan:` block)
- Modify: `src/i18n/es.js`, `src/i18n/en.js` (remove `meta.plan`)

**Interfaces:**
- Produces: `STATES`, `STAGES` (unchanged shape), `CURRENT_STAGE`, `VENTURES: Array<{id, brand, featured: string|null}>`, `FRONTS: {[venture]: {[stage]: string[]}}`, `CRITERIA` (unchanged shape), `planKeys(): {strings: string[], lists: string[], risks: string[]}`.
- Dictionary shape under `plan`: `title, lede, here, stageTabs, ventureTabs, focusTitle, objectiveTitle, modelTitle, metricsTitle, frontsTitle, risksTitle, mitigationLabel, exitTitle, exitOpen, chipLabel, chipCta, states.{done,active,pending}, names.{freelanceMoonphase,moonphase,stackselect}, frontNames.moonphase.{rd,operation,commercial,financeLegal,team,brand}, frontNames.stackselect.{program,platform,employers,talent,financeLegal,team,brand}, stages.<id>.{name,window,tagline}, stages.incubate.now.{constitute,records,placements}`, and per `<venture>.<stage>`: `objective, model, metrics: string[], fronts.<front>: string[], risks: {risk, mitigation}[], exit.<key>` (no `exit` in `exploit`).

- [ ] **Step 1: Write the failing test** — replace `plan.test.js`:

```js
import en from '../../i18n/en';
import es from '../../i18n/es';
import { CRITERIA, CURRENT_STAGE, FRONTS, STAGES, STATES, VENTURES, planKeys } from './plan';

const read = (dictionary, path) =>
  path.split('.').reduce((node, part) => (node == null ? node : node[part]), dictionary);
const filled = (value) => typeof value === 'string' && value.trim() !== '';

test('the current stage is one of the stages', () => {
  expect(STAGES.map((stage) => stage.id)).toContain(CURRENT_STAGE);
});

test('only the current stage carries focus actions', () => {
  STAGES.forEach((stage) => {
    if (stage.id === CURRENT_STAGE) expect(stage.focusNow.length).toBeGreaterThan(0);
    else expect(stage.focusNow).toEqual([]);
  });
});

test('every criterion has a known state', () => {
  VENTURES.forEach(({ id }) =>
    STAGES.forEach((stage) => CRITERIA[id][stage.id].forEach((c) => expect(STATES).toContain(c.state)))
  );
});

test('the featured workstream leads and appears in every stage', () => {
  VENTURES.filter((v) => v.featured).forEach(({ id, featured }) =>
    STAGES.forEach((stage) => expect(FRONTS[id][stage.id][0]).toBe(featured))
  );
});

test.each([
  ['es', es],
  ['en', en],
])('every string the plan reads exists in %s', (_name, dictionary) => {
  expect(planKeys().strings.filter((key) => !filled(read(dictionary, key)))).toEqual([]);
});

// A list shorter in one language would drop an action silently there.
test('every list exists, is filled, and has the same length in both languages', () => {
  const broken = planKeys().lists.filter((key) => {
    const a = read(es, key);
    const b = read(en, key);
    return !Array.isArray(a) || !Array.isArray(b) || !a.length || a.length !== b.length || ![...a, ...b].every(filled);
  });
  expect(broken).toEqual([]);
});

test('every risk has a mitigation, in both languages', () => {
  const broken = planKeys().risks.filter((key) => {
    const a = read(es, key);
    const b = read(en, key);
    const ok = (list) => Array.isArray(list) && list.length && list.every((r) => filled(r.risk) && filled(r.mitigation));
    return !ok(a) || !ok(b) || a.length !== b.length;
  });
  expect(broken).toEqual([]);
});
```

- [ ] **Step 2: Run it** — `CI=true npx react-scripts test --watchAll=false src/components/ventures/plan.test.js` → FAIL (`FRONTS` undefined / keys missing).

- [ ] **Step 3: Implement** — rewrite `plan.js`:

```js
// The ventures' operating plan, as structure only. Every sentence lives in the
// brand dictionaries under `plan:`; this file says what exists, in what order,
// and how far along it is — so advancing the plan is editing a state here, not
// touching the page.
//
// The rule the section states out loud: a stage is left when its exit
// criteria are met, not when its date arrives.

export const STATES = ['done', 'active', 'pending'];

export const STAGES = [
  // Only the current stage carries focus actions: they are the reminder of
  // what to do this week, and a list of actions for 2029 is not that.
  { id: 'incubate', focusNow: ['constitute', 'records', 'placements'] },
  { id: 'stabilize', focusNow: [] },
  { id: 'scale', focusNow: [] },
  { id: 'exploit', focusNow: [] },
];

export const CURRENT_STAGE = 'incubate';

// Freelance is Moonphase's incubator, not a third company: it rides the
// Moonphase row and names itself only in the stage where it exists.
// R&D is featured because it is Moonphase's largest ambition: it leads every
// stage and renders full width.
export const VENTURES = [
  { id: 'moonphase', brand: 'moonphase', featured: 'rd' },
  { id: 'stackselect', brand: 'stackselect', featured: null },
];

const MOONPHASE_ALL = ['rd', 'operation', 'commercial', 'financeLegal', 'team', 'brand'];
const STACKSELECT_ALL = ['program', 'platform', 'employers', 'talent', 'financeLegal', 'team', 'brand'];

// Which workstreams have their own actions in each stage.
export const FRONTS = {
  moonphase: {
    incubate: MOONPHASE_ALL,
    stabilize: MOONPHASE_ALL,
    scale: MOONPHASE_ALL,
    exploit: ['rd', 'commercial', 'financeLegal', 'team'],
  },
  stackselect: {
    incubate: STACKSELECT_ALL,
    stabilize: STACKSELECT_ALL,
    scale: ['program', 'platform', 'employers', 'talent', 'financeLegal', 'team'],
    exploit: ['program', 'platform', 'employers', 'financeLegal'],
  },
};

export const CRITERIA = {
  moonphase: {
    incubate: [
      { key: 'legal', state: 'active' },
      { key: 'records', state: 'active' },
      { key: 'portfolio', state: 'pending' },
    ],
    stabilize: [
      { key: 'recurring', state: 'pending' },
      { key: 'firstRd', state: 'pending' },
    ],
    scale: [
      { key: 'handsOff', state: 'pending' },
      { key: 'round', state: 'pending' },
    ],
    // The horizon: no gate after it.
    exploit: [],
  },
  stackselect: {
    incubate: [
      { key: 'legal', state: 'active' },
      { key: 'placements', state: 'active' },
      { key: 'pricing', state: 'pending' },
    ],
    stabilize: [
      { key: 'rate', state: 'pending' },
      { key: 'repeat', state: 'pending' },
    ],
    scale: [
      { key: 'handsOff', state: 'pending' },
      { key: 'platform', state: 'pending' },
    ],
    exploit: [],
  },
};

// Every dictionary key the section reads, so a test can prove none is missing
// in either language: plain strings, lists of strings, and lists of risks.
export const planKeys = () => {
  const strings = [
    'plan.title', 'plan.lede', 'plan.here', 'plan.stageTabs', 'plan.ventureTabs',
    'plan.focusTitle', 'plan.objectiveTitle', 'plan.modelTitle', 'plan.metricsTitle',
    'plan.frontsTitle', 'plan.risksTitle', 'plan.mitigationLabel', 'plan.exitTitle',
    'plan.exitOpen', 'plan.chipLabel', 'plan.chipCta',
    'plan.names.freelanceMoonphase', 'plan.names.moonphase', 'plan.names.stackselect',
    ...STATES.map((state) => `plan.states.${state}`),
  ];
  const lists = [];
  const risks = [];
  const frontNames = new Set();
  STAGES.forEach((stage) => {
    strings.push(`plan.stages.${stage.id}.name`, `plan.stages.${stage.id}.window`, `plan.stages.${stage.id}.tagline`);
    stage.focusNow.forEach((action) => strings.push(`plan.stages.${stage.id}.now.${action}`));
    VENTURES.forEach(({ id }) => {
      const base = `plan.${id}.${stage.id}`;
      strings.push(`${base}.objective`, `${base}.model`);
      lists.push(`${base}.metrics`);
      risks.push(`${base}.risks`);
      FRONTS[id][stage.id].forEach((front) => {
        lists.push(`${base}.fronts.${front}`);
        frontNames.add(`plan.frontNames.${id}.${front}`);
      });
      CRITERIA[id][stage.id].forEach((criterion) => strings.push(`${base}.exit.${criterion.key}`));
    });
  });
  return { strings: [...strings, ...frontNames], lists, risks };
};
```

Replace the `plan:` block in both brand dictionaries with the v2 shape. Labels (es / en):
`title` De la promesa al plan / From promise to plan · `lede` (v1 lede, "we" voice, ending with a sentence that R&D and placement are what each company exists for — see Step 3 copy below) · `here` Estamos aquí / We are here · `stageTabs` Etapas del plan / Plan stages · `ventureTabs` Empresa / Company · `focusTitle` En qué ponemos el foco ahora / Where our focus goes now · `objectiveTitle` Objetivo de la etapa / Stage objective · `modelTitle` Modelo de negocio / Business model · `metricsTitle` Métricas que miramos / Metrics we watch · `frontsTitle` Frentes de trabajo / Workstreams · `risksTitle` Riesgos / Risks · `mitigationLabel` Cómo lo mitigamos / How we mitigate it · `exitTitle` Criterios de salida / Exit criteria · `exitOpen` (v1) · `chipLabel` Etapa actual / Current stage · `chipCta` Ver el plan / See the plan · `states`, `names`, `stages` as v1 · `frontNames.moonphase`: rd Investigación y desarrollo / Research and development, operation Operación y método / Operations and method, commercial Comercial y cartera / Sales and client base, financeLegal Finanzas y legal / Finance and legal, team Equipo y cultura / Team and culture, brand Marca y evidencia / Brand and evidence · `frontNames.stackselect`: program Programa de formación / Training program, platform Plataforma de evaluación / Assessment platform, employers Empresas contratantes / Hiring companies, talent Captación de talento / Talent intake, financeLegal, team, brand as above.

Per-cell copy: transcribe the spec's "Contenido" section verbatim into `plan.<venture>.<stage>` (Spanish), and its faithful English translation into `brands.en.js`, keeping every list the same length. Exit keys are those in `CRITERIA`, with the v1 wording (moonphase `handsOff` names "the founder", stackselect `handsOff` "the founders").

Remove `meta.plan` from `es.js` and `en.js`.

- [ ] **Step 4: Run** `CI=true npx react-scripts test --watchAll=false src/components/ventures/plan.test.js src/i18n` → plan tests PASS; `VenturesPlan.test.jsx` is not in this run.

- [ ] **Step 5: Commit** `git add` the six files; message "The plan v2 as data: workstreams, metrics and risks per stage, R&D first".

---

### Task 2: The plan as a section with two selectors

**Files:**
- Modify: `src/components/ventures/VenturesPlan.jsx` (rewrite)
- Modify: `src/components/ventures/VenturesPlan.test.jsx` (rewrite)
- Modify: `src/styles/hub.css` (replace everything from `/* ------------------------------------------------------ operating plan` to the end of the file)

**Interfaces:**
- Consumes: Task 1 exports and keys.
- Produces: default export `VenturesPlan` — a `<section id="plan">` with no props.

- [ ] **Step 1: Write the failing test** — replace `VenturesPlan.test.jsx`:

```jsx
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import VenturesPlan from './VenturesPlan';

const renderPlan = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <VenturesPlan />
      </MemoryRouter>
    </I18nProvider>
  );

const stageTabs = () => within(screen.getByRole('tablist', { name: 'Plan stages' })).getAllByRole('tab');
const ventureTabs = () => within(screen.getByRole('tablist', { name: 'Company' })).getAllByRole('tab');
const selected = (tabs) => tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');

test('opens on the current stage and on Moonphase', () => {
  renderPlan();
  expect(selected(stageTabs())).toHaveTextContent('Incubate');
  expect(selected(stageTabs())).toHaveTextContent('We are here');
  expect(selected(ventureTabs())).toHaveTextContent('Freelance → Moonphase');
});

test.each([
  ['stage', stageTabs],
  ['venture', ventureTabs],
])('the %s tabs wrap with arrows and jump with Home and End', (_name, tabs) => {
  renderPlan();
  const list = tabs();
  const first = list[0];
  const last = list[list.length - 1];
  fireEvent.keyDown(first, { key: 'ArrowLeft' });
  expect(last).toHaveAttribute('aria-selected', 'true');
  expect(last).toHaveFocus();
  fireEvent.keyDown(last, { key: 'ArrowRight' });
  expect(first).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(first, { key: 'End' });
  expect(last).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(last, { key: 'Home' });
  expect(first).toHaveAttribute('aria-selected', 'true');
});

test('the two selections are independent', () => {
  renderPlan();
  fireEvent.click(ventureTabs()[1]);
  fireEvent.click(stageTabs()[2]);
  expect(selected(ventureTabs())).toHaveTextContent('StackSelect');
  fireEvent.click(ventureTabs()[0]);
  expect(selected(stageTabs())).toHaveTextContent('Scale');
});

test('Moonphase is titled with Freelance only while incubating', () => {
  renderPlan();
  const panel = () => screen.getByRole('tabpanel');
  expect(within(panel()).getByRole('heading', { name: 'Freelance → Moonphase' })).toBeInTheDocument();
  fireEvent.click(stageTabs()[1]);
  expect(within(panel()).getByRole('heading', { name: 'Moonphase' })).toBeInTheDocument();
});

test('research and development leads Moonphase, featured', () => {
  renderPlan();
  const fronts = within(screen.getByRole('tabpanel')).getAllByRole('article');
  expect(fronts[0]).toHaveTextContent('Research and development');
  expect(fronts[0]).toHaveClass('is-featured');
});

test('the focus block always shows the current stage', () => {
  renderPlan();
  fireEvent.click(stageTabs()[3]);
  const focus = screen.getByRole('region', { name: 'Where our focus goes now' });
  expect(within(focus).getByText('Incorporate both companies before January 2027.')).toBeInTheDocument();
});

test('the horizon stage has no exit criterion', () => {
  renderPlan();
  fireEvent.click(stageTabs()[3]);
  expect(within(screen.getByRole('tabpanel')).getByText('No exit criterion: this stage is the horizon.')).toBeInTheDocument();
});

test('risks come with their mitigation and criteria announce their state', () => {
  renderPlan();
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('How we mitigate it').length).toBeGreaterThan(0);
  expect(within(panel).getAllByText('In progress').length).toBeGreaterThan(0);
  expect(panel).toHaveAttribute('tabindex', '0');
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false src/components/ventures/VenturesPlan.test.jsx` → FAIL (no `Company` tablist).

- [ ] **Step 3: Implement** — rewrite `VenturesPlan.jsx`:

```jsx
import { useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import { CRITERIA, CURRENT_STAGE, FRONTS, STAGES, VENTURES } from './plan';

// The ventures' operating plan, as a section of /ventures. It is our own
// reminder of where the focus goes before it is anything else, which is why
// the current stage's actions sit above everything and the section opens on
// the current stage.

const STATE_MARK = { done: '✓', active: '◐', pending: '○' };
const currentIndex = STAGES.findIndex((stage) => stage.id === CURRENT_STAGE);
const current = STAGES[currentIndex];

// The standard tablist keys, with wrap-around: both rails are short enough
// that stopping dead at either end would only feel broken.
const moveFor = (key, index, count) =>
  ({ ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1 })[key];

const Tabs = ({ label, items, selected, onSelect, idPrefix, render, className }) => {
  const refs = useRef([]);
  const select = (index) => {
    const wrapped = (index + items.length) % items.length;
    onSelect(items[wrapped]);
    refs.current[wrapped]?.focus();
  };
  return (
    <div className={className} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-${item}`}
          aria-selected={item === selected}
          aria-controls="plan-panel"
          tabIndex={item === selected ? 0 : -1}
          onClick={() => onSelect(item)}
          onKeyDown={(event) => {
            const move = moveFor(event.key, index, items.length);
            if (move === undefined) return;
            event.preventDefault();
            select(move);
          }}
          {...render(item, index)}
        />
      ))}
    </div>
  );
};

const VenturesPlan = () => {
  const { t, tl } = useTranslation();
  const [stage, setStage] = useState(CURRENT_STAGE);
  const [ventureId, setVentureId] = useState(VENTURES[0].id);
  const venture = VENTURES.find((item) => item.id === ventureId);
  const base = `plan.${ventureId}.${stage}`;
  const criteria = CRITERIA[ventureId][stage];

  const ventureName = (id) =>
    id === 'moonphase' && stage === 'incubate' ? t('plan.names.freelanceMoonphase') : t(`plan.names.${id}`);

  return (
    <section className="plan-section" id="plan" aria-labelledby="plan-title">
      <Reveal className="plan-head">
        <h2 className="brand-h2" id="plan-title">
          {t('plan.title')}
        </h2>
        <p className="brand-p">{t('plan.lede')}</p>
      </Reveal>

      <section className="plan-focus" aria-labelledby="plan-focus-title">
        <h3 className="plan-focus-title" id="plan-focus-title">
          {t('plan.focusTitle')}
        </h3>
        <p className="plan-focus-stage">{t(`plan.stages.${current.id}.name`)}</p>
        <ol className="plan-focus-list">
          {current.focusNow.map((action) => (
            <li key={action}>{t(`plan.stages.${current.id}.now.${action}`)}</li>
          ))}
        </ol>
      </section>

      <Tabs
        className="plan-rail"
        label={t('plan.stageTabs')}
        items={STAGES.map((item) => item.id)}
        selected={stage}
        onSelect={setStage}
        idPrefix="plan-stage"
        render={(id, index) => {
          const phase = index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future';
          return {
            className: `plan-stage plan-stage-${phase}${id === stage ? ' is-selected' : ''}`,
            children: (
              <>
                <span className="plan-node" aria-hidden="true" />
                <span className="plan-stage-name">{t(`plan.stages.${id}.name`)}</span>
                <span className="plan-stage-window">{t(`plan.stages.${id}.window`)}</span>
                {phase === 'current' ? <span className="plan-here">{t('plan.here')}</span> : null}
              </>
            ),
          };
        }}
      />

      <p className="plan-tagline">{t(`plan.stages.${stage}.tagline`)}</p>

      <Tabs
        className="plan-ventures"
        label={t('plan.ventureTabs')}
        items={VENTURES.map((item) => item.id)}
        selected={ventureId}
        onSelect={setVentureId}
        idPrefix="plan-venture"
        render={(id) => ({
          className: `plan-venture-tab${id === ventureId ? ' is-selected' : ''}`,
          'data-brand': id,
          children: ventureName(id),
        })}
      />

      <div
        className="plan-panel"
        role="tabpanel"
        id="plan-panel"
        aria-labelledby={`plan-venture-${ventureId}`}
        tabIndex={0}
        data-brand={venture.brand}
      >
        <h3 className="plan-venture-title">{ventureName(ventureId)}</h3>

        <div className="plan-objective">
          <span className="plan-label">{t('plan.objectiveTitle')}</span>
          <p>{t(`${base}.objective`)}</p>
        </div>

        <div className="plan-summary">
          <div>
            <h4 className="plan-label">{t('plan.modelTitle')}</h4>
            <p>{t(`${base}.model`)}</p>
          </div>
          <div>
            <h4 className="plan-label">{t('plan.metricsTitle')}</h4>
            <ul className="plan-metrics">
              {tl(`${base}.metrics`).map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </div>
        </div>

        <h4 className="plan-label">{t('plan.frontsTitle')}</h4>
        <div className="plan-fronts">
          {FRONTS[ventureId][stage].map((front) => (
            <article className={`plan-front${front === venture.featured ? ' is-featured' : ''}`} key={front}>
              <h5 className="plan-front-title">{t(`plan.frontNames.${ventureId}.${front}`)}</h5>
              <ul>
                {tl(`${base}.fronts.${front}`).map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h4 className="plan-label">{t('plan.risksTitle')}</h4>
        <ul className="plan-risks">
          {tl(`${base}.risks`).map(({ risk, mitigation }) => (
            <li key={risk}>
              <p className="plan-risk">{risk}</p>
              <p className="plan-mitigation">
                <span className="plan-mitigation-label">{t('plan.mitigationLabel')}</span>
                {mitigation}
              </p>
            </li>
          ))}
        </ul>

        <h4 className="plan-label">{t('plan.exitTitle')}</h4>
        {criteria.length ? (
          <ul className="plan-exit">
            {criteria.map((criterion) => (
              <li className={`plan-exit-item is-${criterion.state}`} key={criterion.key}>
                <span className="plan-exit-mark" aria-hidden="true">
                  {STATE_MARK[criterion.state]}
                </span>
                <span className="plan-exit-text">{t(`${base}.exit.${criterion.key}`)}</span>
                <span className="plan-exit-state">{t(`plan.states.${criterion.state}`)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="plan-exit-open">{t('plan.exitOpen')}</p>
        )}
      </div>
    </section>
  );
};

export default VenturesPlan;
```

CSS (replaces the old plan, chip and hub-link blocks at the end of `hub.css`) — the full block is in Step 3 of the execution; its requirements:
- `.plan-rail`: grid of 4, `overflow-x: auto`, `padding: 6px` so focus rings are not clipped; the road line drawn per stage (`.plan-stage::before`) so it scrolls with the stages; first segment starts at the first node, last ends at the last node.
- `.plan-stage:focus-visible`, `.plan-venture-tab:focus-visible`: 2px outline in `--brand-core`, offset 2px.
- `.plan-ventures`: segmented control; the selected tab uses its own `data-brand` colours.
- `.plan-panel`: brand ink card (`--brand-ink`, `--brand-ink-2`, `--brand-on-ink`), full width; `:focus-visible` outline.
- `.plan-fronts`: auto-fill grid `minmax(16rem, 1fr)`; `.plan-front.is-featured` spans all columns with a stronger border and tint.
- `.plan-risks` items: risk in `--brand-on-ink`, mitigation in `--brand-soft` with its label.
- State text (`.plan-here`, `.plan-exit-state`) at least `0.8rem`.
- `.stage-chip` text: label `var(--color-text-secondary)`, CTA `var(--brand-text)` (light-theme contrast fix from the v1 review); dot stays `--brand-core`.
- ≤720px: rail scrolls horizontally with stages at `10.5rem`; summary and fronts collapse to one column; no page-level horizontal scroll.

- [ ] **Step 4: Run** `CI=true npx react-scripts test --watchAll=false src/components/ventures src/i18n` → PASS.

- [ ] **Step 5: Commit** "The plan as a section: stage and company selectors, workstreams and risks".

---

### Task 3: Into Ventures, and out of its own route

**Files:**
- Modify: `src/components/ventures/ventures.jsx`
- Create: `src/components/ventures/ventures.test.jsx`
- Modify: `src/components/ventures/StageChip.jsx`, `StageChip.test.jsx`
- Modify: `src/App.js`, `src/components/navigation/RouteMeta.jsx`, `public/sitemap.xml`, `src/updates.js`

**Interfaces:**
- Consumes: `VenturesPlan` (Task 2), `StageChip`.
- Produces: `/ventures` renders `#plan`; `StageChip` links to `/ventures#plan`.

- [ ] **Step 1: Write the failing tests**

`StageChip.test.jsx`: change the expected `href` to `'/ventures#plan'`.

Create `ventures.test.jsx`:

```jsx
import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import Ventures from './ventures';

const renderAt = (entry) =>
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={[entry]}>
        <Ventures />
      </MemoryRouter>
    </I18nProvider>
  );

beforeEach(() => {
  jest.useFakeTimers();
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
});

test('the hub carries the plan section', () => {
  const { container } = renderAt('/ventures');
  expect(container.querySelector('section#plan')).not.toBeNull();
});

// App resets scroll to the top on route change, and its effect runs after the
// page's, so the jump has to wait a tick to land after that reset.
test('arriving with #plan scrolls to the section after the route settles', () => {
  const { container } = renderAt('/ventures#plan');
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  act(() => {
    jest.runAllTimers();
  });
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(container.querySelector('section#plan'));
});

test('without the hash nothing scrolls', () => {
  renderAt('/ventures');
  act(() => {
    jest.runAllTimers();
  });
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run** `CI=true npx react-scripts test --watchAll=false src/components/ventures` → the new ventures tests and the chip test FAIL.

- [ ] **Step 3: Implement**

`StageChip.jsx`: `to="/ventures#plan"`.

`ventures.jsx`: import `useEffect` from react, `useLocation` from react-router-dom, and `VenturesPlan`; drop the `StageChip` import and the `plan-hub-link` `Reveal`; render `<VenturesPlan />` directly after the `venture-grid` `Reveal`; add inside the component:

```jsx
  const { hash } = useLocation();

  // The chips on each company's page land here. App resets the scroll to the
  // top on every route change and its effect runs after this one, so the jump
  // waits a tick to land after that reset rather than be undone by it.
  useEffect(() => {
    if (hash !== '#plan') return undefined;
    const timer = window.setTimeout(() => document.getElementById('plan')?.scrollIntoView({ block: 'start' }), 0);
    return () => window.clearTimeout(timer);
  }, [hash]);
```

`App.js`: remove the `VenturesPlan` import and the `/ventures/plan` route. `RouteMeta.jsx`: remove `'/ventures/plan': 'plan'`. `sitemap.xml`: remove the `/ventures/plan` `<url>`. `updates.js`: first entry becomes es "El plan de operaciones de Moonphase y StackSelect, por etapas, en Ventures" / en "The operating plan for Moonphase and StackSelect, stage by stage, in Ventures".

- [ ] **Step 4: Run** `CI=true npx react-scripts test --watchAll=false src` → all PASS; `CI=true npm run build` → Compiled successfully.

- [ ] **Step 5: Commit** "The plan lives in Ventures; chips land on it".

---

### Task 4: Verify and review

- [ ] Serve `build/`; on `/ventures` and `/en/ventures`, dark 1280 and light 390: section order (cards → plan → projects), both selectors by keyboard, R&D featured full width, risks and mitigations legible, no horizontal page scroll, focus rings unclipped.
- [ ] From `/moonphase`, `/stackselect`, `/freelance`, the chip lands on the section (not the top of the page), in both languages.
- [ ] Light theme: chip text contrast ≥ 4.5:1 (measure).
- [ ] Final whole-branch review by a fresh reviewer; fix Critical/Important with a failing test first.
