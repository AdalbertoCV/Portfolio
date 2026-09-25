# Ventures Operating Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A public `/ventures/plan` page that lays out Freelance → Moonphase and StackSelect across four stages (Incubar, Estabilizar, Escalar, Explotar), with a stage selector, "estás aquí", per-venture cards and exit-criteria checklists, plus a "current stage" chip on the three brand pages.

**Architecture:** Structure (stage order, current stage, criteria states, focus actions) lives in one data file, `src/components/ventures/plan.js`; every sentence lives in the brand dictionaries under `plan:` in both languages. One page component renders from the two; one small chip component is reused on three brand pages and the hub.

**Tech Stack:** React 18, react-router-dom 6, Create React App (react-scripts, Jest + @testing-library/react 13), plain CSS in `src/styles/hub.css`.

**Spec:** `docs/superpowers/specs/2026-09-25-ventures-plan-design.md`

## Global Constraints

- Public, narrative version only: no money amounts, no client names except PuntoBienestar (already public on the site), no revenue figures.
- Both languages always: every key added to `brands.es.js` must exist in `brands.en.js` (enforced by `src/i18n/dictionary.test.js`); no empty strings.
- Criterion states are exactly `done | active | pending`.
- `CURRENT_STAGE` is `incubate`.
- Route is `/ventures/plan`; English is served under `/en/ventures/plan` by the Router's `basename` (no code needed for the prefix).
- Links use react-router `<Link to="/ventures/plan">` (never hard-code `/en`).
- Reuse existing patterns: `hub-page`, `hub-header`, `hub-badge`, `hub-title`, `hub-lede`, `brand-h2`, `brand-p`, `brand-link-out`, `Reveal`, `ArrowRight`, and brand colour scopes via `data-brand`.
- Match the codebase's comment style: comments explain *why*, in full sentences.

## Review Focus

1. Arrow keys on the stage tablist wrap around (Right on "Explotar" goes to "Incubar", Left on "Incubar" goes to "Explotar"), and Home/End jump to the ends; focus moves with selection. → tested in Task 2.
2. A stage with no exit criteria (Explotar) shows the "open horizon" sentence instead of an empty list. → tested in Task 2.
3. The Moonphase card is titled "Freelance → Moonphase" only in Incubar and "Moonphase" elsewhere. → tested in Task 2.
4. The "focus now" block renders only for the current stage, never for a selected future stage. → tested in Task 2.
5. Every key `plan.js` references resolves to a non-empty string in both languages (a typo would render the raw key). → tested in Task 1.

---

### Task 1: Plan data and copy

**Files:**
- Create: `src/components/ventures/plan.js`
- Create: `src/components/ventures/plan.test.js`
- Modify: `src/i18n/brands.es.js` (add `plan:` block after `ventures:`)
- Modify: `src/i18n/brands.en.js` (same block, English)
- Modify: `src/i18n/es.js` and `src/i18n/en.js` (add `meta.plan`)

**Interfaces:**
- Produces:
  - `STAGES: Array<{ id: 'incubate'|'stabilize'|'scale'|'exploit', focusNow: string[] }>`: `focusNow` holds dictionary keys under `plan.stages.<id>.now.`.
  - `CURRENT_STAGE: string` = `'incubate'`.
  - `VENTURES: Array<{ id: 'moonphase'|'stackselect', brand: string }>`.
  - `CRITERIA: { [ventureId]: { [stageId]: Array<{ key: string, state: 'done'|'active'|'pending' }> } }`: `key` is under `plan.<ventureId>.<stageId>.exit.`.
  - `DIMENSIONS = ['focus', 'model', 'clients', 'funding']`: keys under `plan.<ventureId>.<stageId>.`.
  - `STATES = ['done', 'active', 'pending']`.
  - `planKeys(): string[]`: every dictionary key the page will read.
  - Dictionary keys (both languages): `plan.badge, plan.title, plan.lede, plan.here, plan.tabsLabel, plan.focusTitle, plan.exitTitle, plan.exitOpen, plan.back, plan.chipLabel, plan.chipCta, plan.hubCta, plan.states.{done,active,pending}, plan.dims.{focus,model,clients,funding}, plan.names.{freelanceMoonphase,moonphase,stackselect}, plan.stages.<id>.{name,window,tagline}, plan.stages.incubate.now.{constitute,records,placements}`, and the per-venture blocks listed in Step 3.

- [ ] **Step 1: Write the failing test**

Create `src/components/ventures/plan.test.js`:

```js
import en from '../../i18n/en';
import es from '../../i18n/es';
import { CRITERIA, CURRENT_STAGE, STAGES, STATES, VENTURES, planKeys } from './plan';

const read = (dictionary, path) =>
  path.split('.').reduce((node, part) => (node == null ? node : node[part]), dictionary);

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
    STAGES.forEach((stage) =>
      (CRITERIA[id][stage.id] || []).forEach((criterion) => expect(STATES).toContain(criterion.state))
    )
  );
});

// A typo in plan.js would otherwise render the raw key on the page.
test.each([
  ['es', es],
  ['en', en],
])('every key the plan reads exists and is non-empty in %s', (_name, dictionary) => {
  const missing = planKeys().filter((key) => {
    const value = read(dictionary, key);
    return typeof value !== 'string' || value.trim() === '';
  });
  expect(missing).toEqual([]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test --watchAll=false src/components/ventures/plan.test.js`
Expected: FAIL with "Cannot find module './plan'".

- [ ] **Step 3: Write the data file**

Create `src/components/ventures/plan.js`:

```js
// The ventures' operating plan, as structure only. Every sentence lives in the
// brand dictionaries under `plan:`; this file says what exists, in what order,
// and how far along it is — so advancing the plan is editing a state here, not
// touching the page.
//
// The rule the page states out loud: a stage is left when its exit criteria
// are met, not when its date arrives. The dates are targets; the criteria are
// the gate.

export const STATES = ['done', 'active', 'pending'];

export const DIMENSIONS = ['focus', 'model', 'clients', 'funding'];

export const STAGES = [
  // Only the current stage carries focus actions: they are the reminder of
  // what to do this week, and a list of actions for 2029 is not that.
  { id: 'incubate', focusNow: ['constitute', 'records', 'placements'] },
  { id: 'stabilize', focusNow: [] },
  { id: 'scale', focusNow: [] },
  { id: 'exploit', focusNow: [] },
];

export const CURRENT_STAGE = 'incubate';

// Freelance is not a third company: it is Moonphase's incubator, so it rides
// the Moonphase row and names itself only in the stage where it exists.
export const VENTURES = [
  { id: 'moonphase', brand: 'moonphase' },
  { id: 'stackselect', brand: 'stackselect' },
];

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

// Every dictionary key the page reads, so a test can prove none of them is
// missing in either language.
export const planKeys = () => {
  const keys = [
    'plan.badge', 'plan.title', 'plan.lede', 'plan.here', 'plan.tabsLabel',
    'plan.focusTitle', 'plan.exitTitle', 'plan.exitOpen', 'plan.back',
    'plan.chipLabel', 'plan.chipCta', 'plan.hubCta',
    'plan.names.freelanceMoonphase', 'plan.names.moonphase', 'plan.names.stackselect',
    ...STATES.map((state) => `plan.states.${state}`),
    ...DIMENSIONS.map((dimension) => `plan.dims.${dimension}`),
  ];
  STAGES.forEach((stage) => {
    keys.push(`plan.stages.${stage.id}.name`, `plan.stages.${stage.id}.window`, `plan.stages.${stage.id}.tagline`);
    stage.focusNow.forEach((action) => keys.push(`plan.stages.${stage.id}.now.${action}`));
    VENTURES.forEach(({ id }) => {
      DIMENSIONS.forEach((dimension) => keys.push(`plan.${id}.${stage.id}.${dimension}`));
      CRITERIA[id][stage.id].forEach((criterion) => keys.push(`plan.${id}.${stage.id}.exit.${criterion.key}`));
    });
  });
  return keys;
};
```

Add to `src/i18n/brands.es.js`, directly after the closing `},` of the `ventures:` block:

```js
  // ------------------------------------------------ Plan de operaciones
  // Public on purpose, and narrative on purpose: stages, focus and exit
  // criteria, but no amounts and no client names beyond what the site
  // already tells. The structure (order, current stage, states) is in
  // components/ventures/plan.js.
  plan: {
    badge: 'Ventures · Plan de operaciones',
    title: 'De la promesa al plan',
    lede: 'Enero de 2027 es la fecha de operación formal de las dos empresas. Esta página es cómo se llega a ella y qué viene después, en cuatro etapas. Cada etapa tiene una fecha objetivo, pero se sale de ella cuando se cumplen sus criterios, no cuando llega la fecha.',
    here: 'Estás aquí',
    tabsLabel: 'Etapas del plan',
    focusTitle: 'En qué pongo el foco ahora',
    exitTitle: 'Criterios de salida',
    exitOpen: 'Sin criterio de salida: esta etapa es el horizonte.',
    back: 'Volver a Ventures',
    chipLabel: 'Etapa actual',
    chipCta: 'Ver el plan',
    hubCta: 'Ver el plan de operaciones',
    states: { done: 'Cumplido', active: 'En curso', pending: 'Pendiente' },
    dims: {
      focus: 'Foco',
      model: 'Modelo de negocio',
      clients: 'Cartera de clientes',
      funding: 'Fondeo',
    },
    names: {
      freelanceMoonphase: 'Freelance → Moonphase',
      moonphase: 'Moonphase',
      stackselect: 'StackSelect',
    },
    stages: {
      incubate: {
        name: 'Incubar',
        window: 'Ene 2025 — Dic 2026',
        tagline: 'Probar que el método aguanta antes de pedirle a alguien que apueste por él.',
        now: {
          constitute: 'Constituir las dos empresas antes de enero de 2027.',
          records: 'Convertir cada proyecto entregado en un expediente de Moonphase.',
          placements: 'Cerrar las primeras colocaciones de StackSelect y, con ellas, el modelo de cobro.',
        },
      },
      stabilize: {
        name: 'Estabilizar',
        window: '2027',
        tagline: 'Operación formal que se sostiene sola.',
      },
      scale: {
        name: 'Escalar',
        window: '2028 — 2029',
        tagline: 'Crecer sin ser el cuello de botella.',
      },
      exploit: {
        name: 'Explotar',
        window: '2030 en adelante',
        tagline: 'Convertir lo construido en activos.',
      },
    },
    moonphase: {
      incubate: {
        focus: 'Entregar proyectos de automatización con el método de Moonphase —factibilidad, alcance, construcción, expediente— para demostrar que se sostiene fuera de la teoría.',
        model: 'Proyecto de alcance cerrado y precio fijo, cotizado contra un entregable medible.',
        clients: 'La cartera que ya construyó la práctica independiente, empezando por PuntoBienestar. Se gana por referencia y por entrega, no por publicidad.',
        funding: 'Autofinanciado con el ingreso de los propios proyectos.',
        exit: {
          legal: 'Moonphase constituida legalmente.',
          records: 'Los proyectos entregados, reescritos como expedientes de Moonphase: qué se construyó, qué se midió, qué falló.',
          portfolio: 'La cartera freelance transferida a Moonphase como su cartera inicial.',
        },
      },
      stabilize: {
        focus: 'Que el carril 1, automatización aplicada, cubra la operación, y abrir los primeros expedientes del carril 2, I+D.',
        model: 'Proyectos cerrados más contratos de mantenimiento y soporte sobre lo entregado, que vuelven recurrente parte del ingreso.',
        clients: 'De la referencia al canal: casos publicados, sitio propio desde enero de 2027 y nichos concretos donde el método ya probó resultado.',
        funding: 'El carril 1 financia el carril 2. Fondos públicos de ciencia, tecnología e innovación para los primeros proyectos de I+D.',
        exit: {
          recurring: 'El ingreso recurrente cubre la operación.',
          firstRd: 'El primer expediente del carril 2 cerrado, con resultado positivo o negativo.',
        },
      },
      scale: {
        focus: 'Primeras contrataciones técnicas, y el método escrito de modo que otro ingeniero lo ejecute igual.',
        model: 'Proyectos más una cartera de soporte, y los primeros componentes reutilizables del carril 1 vendidos como producto.',
        clients: 'Industrias y nichos con más de un caso resuelto, donde el siguiente cliente se parece al anterior.',
        funding: 'Ronda ángel o pre-semilla, levantada cuando existan métricas que la sostengan.',
        exit: {
          handsOff: 'Un proyecto entregado de principio a fin sin mi intervención directa.',
          round: 'Ronda levantada sobre métricas reales, no sobre la promesa.',
        },
      },
      exploit: {
        focus: 'Los expedientes de I+D que funcionaron se vuelven productos o spin-offs.',
        model: 'Producto y licenciamiento sobre la investigación propia, además de la operación de servicios.',
        clients: 'Clientes de producto, no solo de proyecto.',
        funding: 'Ronda semilla o serie A según tracción, o crecimiento con capital propio.',
      },
    },
    stackselect: {
      incubate: {
        focus: 'Correr las primeras generaciones de formación y evaluación, en marcha desde junio de 2026, y comprobar que el método produce candidatos que se incorporan.',
        model: 'Validar quién paga y por qué: el candidato, la empresa contratante o ambos. La hipótesis de trabajo es que paga la empresa, por colocación.',
        clients: 'Las primeras empresas dispuestas a entrevistar a los candidatos de las generaciones iniciales.',
        funding: 'Autofinanciado.',
        exit: {
          legal: 'StackSelect constituida legalmente.',
          placements: 'Primeras colocaciones reales, documentadas de principio a fin.',
          pricing: 'Modelo de cobro validado con al menos una empresa que pague.',
        },
      },
      stabilize: {
        focus: 'Operación formal: generaciones regulares y la colocación como la unidad que se mide.',
        model: 'La empresa contratante paga una cuota por colocación. El costo para el candidato se mantiene mínimo o nulo, porque es la población que todavía no tiene ingreso.',
        clients: 'Empresas aliadas que contratan de forma recurrente, no una sola vez.',
        funding: 'Ingreso por colocación, y fondos públicos de empleo juvenil y vinculación.',
        exit: {
          rate: 'Tasa de colocación documentada y sostenida por varias generaciones.',
          repeat: 'Empresas que vuelven a contratar.',
        },
      },
      scale: {
        focus: 'Instructores y evaluadores propios, y la plataforma de evaluación como producto independiente.',
        model: 'Se suma la evaluación como servicio: la empresa paga por evaluar a sus propios candidatos con el criterio de StackSelect.',
        clients: 'Empresas que usan la plataforma aunque no contraten por colocación.',
        funding: 'Ronda ángel o pre-semilla sobre la tracción de colocación.',
        exit: {
          handsOff: 'Generaciones que corren sin que yo imparta ni evalúe.',
          platform: 'La plataforma con clientes propios.',
        },
      },
      exploit: {
        focus: 'Expansión regional y por vertical de talento.',
        model: 'Colocación y plataforma en más mercados.',
        clients: 'Empresas fuera de la región de origen.',
        funding: 'Ronda semilla o serie A según tracción.',
      },
    },
  },
```

Add to `src/i18n/brands.en.js`, directly after the closing `},` of its `ventures:` block:

```js
  // ------------------------------------------------------ Operating plan
  // Public on purpose, and narrative on purpose: stages, focus and exit
  // criteria, but no amounts and no client names beyond what the site
  // already tells. The structure (order, current stage, states) is in
  // components/ventures/plan.js.
  plan: {
    badge: 'Ventures · Operating plan',
    title: 'From promise to plan',
    lede: 'January 2027 is when both companies start formal operations. This page is how they get there and what comes after, in four stages. Each stage has a target date, but it is left when its criteria are met, not when the date arrives.',
    here: 'You are here',
    tabsLabel: 'Plan stages',
    focusTitle: 'Where my focus goes now',
    exitTitle: 'Exit criteria',
    exitOpen: 'No exit criterion: this stage is the horizon.',
    back: 'Back to Ventures',
    chipLabel: 'Current stage',
    chipCta: 'See the plan',
    hubCta: 'See the operating plan',
    states: { done: 'Done', active: 'In progress', pending: 'Pending' },
    dims: {
      focus: 'Focus',
      model: 'Business model',
      clients: 'Client base',
      funding: 'Funding',
    },
    names: {
      freelanceMoonphase: 'Freelance → Moonphase',
      moonphase: 'Moonphase',
      stackselect: 'StackSelect',
    },
    stages: {
      incubate: {
        name: 'Incubate',
        window: 'Jan 2025 — Dec 2026',
        tagline: 'Prove the method holds before asking anyone to bet on it.',
        now: {
          constitute: 'Incorporate both companies before January 2027.',
          records: 'Turn every delivered project into a Moonphase record.',
          placements: 'Close StackSelect’s first placements and, with them, its pricing model.',
        },
      },
      stabilize: {
        name: 'Stabilize',
        window: '2027',
        tagline: 'Formal operations that pay for themselves.',
      },
      scale: {
        name: 'Scale',
        window: '2028 — 2029',
        tagline: 'Grow without being the bottleneck.',
      },
      exploit: {
        name: 'Exploit',
        window: '2030 onwards',
        tagline: 'Turn what was built into assets.',
      },
    },
    moonphase: {
      incubate: {
        focus: 'Deliver automation projects with the Moonphase method —feasibility, scope, build, record— to show it holds outside theory.',
        model: 'Fixed-scope, fixed-price projects, quoted against a measurable deliverable.',
        clients: 'The client base the independent practice already built, starting with PuntoBienestar. Won by referral and by delivery, not by advertising.',
        funding: 'Self-funded from the projects’ own revenue.',
        exit: {
          legal: 'Moonphase legally incorporated.',
          records: 'Delivered projects rewritten as Moonphase records: what was built, what was measured, what failed.',
          portfolio: 'The freelance client base moved to Moonphase as its starting portfolio.',
        },
      },
      stabilize: {
        focus: 'Lane 1, applied automation, covers operations, and the first lane 2 records, R&D, are opened.',
        model: 'Fixed-scope projects plus maintenance and support contracts on what was delivered, which make part of the revenue recurring.',
        clients: 'From referral to channel: published cases, the company’s own site from January 2027, and specific niches where the method has already proven itself.',
        funding: 'Lane 1 funds lane 2. Public science, technology and innovation funds for the first R&D projects.',
        exit: {
          recurring: 'Recurring revenue covers operations.',
          firstRd: 'The first lane 2 record closed, with a positive or negative result.',
        },
      },
      scale: {
        focus: 'First technical hires, and the method written down so another engineer runs it the same way.',
        model: 'Projects plus a support portfolio, and the first reusable lane 1 components sold as product.',
        clients: 'Industries and niches with more than one solved case, where the next client looks like the last one.',
        funding: 'Angel or pre-seed round, raised once there are metrics to back it.',
        exit: {
          handsOff: 'A project delivered end to end without my direct involvement.',
          round: 'A round raised on real metrics, not on the promise.',
        },
      },
      exploit: {
        focus: 'The R&D records that worked become products or spin-offs.',
        model: 'Product and licensing on our own research, alongside the services business.',
        clients: 'Product customers, not only project clients.',
        funding: 'Seed or Series A depending on traction, or growth on our own capital.',
      },
    },
    stackselect: {
      incubate: {
        focus: 'Run the first training and assessment cohorts, under way since June 2026, and check that the method produces candidates who get hired.',
        model: 'Validate who pays and why: the candidate, the hiring company, or both. The working hypothesis is that the company pays, per placement.',
        clients: 'The first companies willing to interview candidates from the early cohorts.',
        funding: 'Self-funded.',
        exit: {
          legal: 'StackSelect legally incorporated.',
          placements: 'First real placements, documented end to end.',
          pricing: 'Pricing validated with at least one paying company.',
        },
      },
      stabilize: {
        focus: 'Formal operations: regular cohorts, with the placement as the unit that is measured.',
        model: 'The hiring company pays a fee per placement. The cost to the candidate stays minimal or zero, because they are the people who do not yet have an income.',
        clients: 'Partner companies that hire repeatedly, not once.',
        funding: 'Placement revenue, and public youth-employment and industry-linkage funds.',
        exit: {
          rate: 'A placement rate documented and sustained across several cohorts.',
          repeat: 'Companies that hire again.',
        },
      },
      scale: {
        focus: 'Our own instructors and assessors, and the assessment platform as a standalone product.',
        model: 'Assessment as a service is added: companies pay to assess their own candidates with StackSelect’s criteria.',
        clients: 'Companies that use the platform even when they do not hire by placement.',
        funding: 'Angel or pre-seed round on placement traction.',
        exit: {
          handsOff: 'Cohorts that run without me teaching or assessing.',
          platform: 'The platform with its own customers.',
        },
      },
      exploit: {
        focus: 'Regional expansion and new talent verticals.',
        model: 'Placement and platform in more markets.',
        clients: 'Companies outside the home region.',
        funding: 'Seed or Series A depending on traction.',
      },
    },
  },
```

In `src/i18n/es.js`, inside `meta: {`, after the `ventures:` entry, add:

```js
    plan: {
      title: 'Plan de operaciones · Adal Cerrillo',
      description:
        'Cómo Moonphase y StackSelect pasan de la promesa al plan: cuatro etapas, qué se hace en cada una y qué tiene que ser cierto para pasar a la siguiente.',
    },
```

In `src/i18n/en.js`, inside `meta: {`, after the `ventures:` entry, add:

```js
    plan: {
      title: 'Operating plan · Adal Cerrillo',
      description:
        'How Moonphase and StackSelect go from promise to plan: four stages, what gets done in each, and what has to be true to move to the next.',
    },
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `CI=true npx react-scripts test --watchAll=false src/components/ventures/plan.test.js src/i18n`
Expected: PASS, including `dictionary.test.js` (identical key sets, no empty entries).

- [ ] **Step 5: Commit**

```bash
git add src/components/ventures/plan.js src/components/ventures/plan.test.js src/i18n/brands.es.js src/i18n/brands.en.js src/i18n/es.js src/i18n/en.js
git commit -m "The ventures' plan as data: four stages, criteria and copy in both languages"
```

---

### Task 2: The plan page

**Files:**
- Create: `src/components/ventures/VenturesPlan.jsx`
- Create: `src/components/ventures/VenturesPlan.test.jsx`
- Modify: `src/styles/hub.css` (append the `.plan-*` block)
- Modify: `src/App.js` (import and route)
- Modify: `src/components/navigation/RouteMeta.jsx` (add `'/ventures/plan': 'plan'` to `PAGES`)
- Modify: `public/sitemap.xml` (new `<url>` after `/ventures`)
- Modify: `src/updates.js` (new first entry)

**Interfaces:**
- Consumes: `STAGES, CURRENT_STAGE, VENTURES, CRITERIA, DIMENSIONS` from `./plan`; dictionary keys under `plan.` from Task 1.
- Produces: default export `VenturesPlan` (React component, no props), mounted at `/ventures/plan`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ventures/VenturesPlan.test.jsx`. The provider boots in English under jsdom, so the assertions use roles and the English copy:

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

const tabs = () => screen.getAllByRole('tab');

test('opens on the current stage, marked as where you are', () => {
  renderPlan();
  const selected = tabs().find((tab) => tab.getAttribute('aria-selected') === 'true');
  expect(selected).toHaveTextContent('Incubate');
  expect(selected).toHaveTextContent('You are here');
});

test('arrow keys move the selection and wrap at both ends', () => {
  renderPlan();
  const [first, , , last] = tabs();
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

test('the Moonphase card names Freelance only while incubating', () => {
  renderPlan();
  expect(screen.getByRole('heading', { name: 'Freelance → Moonphase' })).toBeInTheDocument();
  fireEvent.click(tabs()[1]);
  expect(screen.queryByRole('heading', { name: 'Freelance → Moonphase' })).toBeNull();
  expect(screen.getByRole('heading', { name: 'Moonphase' })).toBeInTheDocument();
});

test('focus actions show only for the current stage', () => {
  renderPlan();
  expect(screen.getByRole('heading', { name: 'Where my focus goes now' })).toBeInTheDocument();
  fireEvent.click(tabs()[2]);
  expect(screen.queryByRole('heading', { name: 'Where my focus goes now' })).toBeNull();
});

test('the horizon stage says it has no exit criterion instead of an empty list', () => {
  renderPlan();
  fireEvent.click(tabs()[3]);
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('No exit criterion: this stage is the horizon.')).toHaveLength(2);
});

test('each criterion announces its state in words', () => {
  renderPlan();
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('In progress').length).toBeGreaterThan(0);
  expect(within(panel).getAllByText('Pending').length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test --watchAll=false src/components/ventures/VenturesPlan.test.jsx`
Expected: FAIL with "Cannot find module './VenturesPlan'".

- [ ] **Step 3: Write the page**

Create `src/components/ventures/VenturesPlan.jsx`:

```jsx
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowLeft, Reveal } from '../brand/parts';
import { CRITERIA, CURRENT_STAGE, DIMENSIONS, STAGES, VENTURES } from './plan';

// The ventures' operating plan: four stages, two companies, and what has to be
// true to move on. It is Adal's own reminder of where the focus goes before it
// is anything else, which is why it opens on the current stage and puts that
// stage's actions first.

const STATE_MARK = { done: '✓', active: '◐', pending: '○' };

const currentIndex = STAGES.findIndex((stage) => stage.id === CURRENT_STAGE);

const VenturesPlan = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(CURRENT_STAGE);
  const tabRefs = useRef([]);

  const stage = STAGES.find((item) => item.id === selected);

  const select = (index) => {
    const wrapped = (index + STAGES.length) % STAGES.length;
    setSelected(STAGES[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  // The standard tablist keys, with wrap-around: the rail is short enough that
  // stopping dead at either end would only feel broken.
  const onKeyDown = (event, index) => {
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: STAGES.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  const ventureName = (id) =>
    id === 'moonphase' && selected === 'incubate' ? t('plan.names.freelanceMoonphase') : t(`plan.names.${id}`);

  return (
    <div className="hub-page plan-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('plan.badge')}</span>
        <h1 className="hub-title">{t('plan.title')}</h1>
        <p className="hub-lede">{t('plan.lede')}</p>
      </Reveal>

      <div className="plan-rail" role="tablist" aria-label={t('plan.tabsLabel')}>
        {STAGES.map((item, index) => {
          const isSelected = item.id === selected;
          const phase = index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future';
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`plan-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls="plan-panel"
              tabIndex={isSelected ? 0 : -1}
              className={`plan-stage plan-stage-${phase}${isSelected ? ' is-selected' : ''}`}
              onClick={() => setSelected(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="plan-node" aria-hidden="true" />
              <span className="plan-stage-name">{t(`plan.stages.${item.id}.name`)}</span>
              <span className="plan-stage-window">{t(`plan.stages.${item.id}.window`)}</span>
              {phase === 'current' ? <span className="plan-here">{t('plan.here')}</span> : null}
            </button>
          );
        })}
      </div>

      <div className="plan-panel" role="tabpanel" id="plan-panel" aria-labelledby={`plan-tab-${selected}`}>
        <p className="plan-tagline">{t(`plan.stages.${selected}.tagline`)}</p>

        {stage.focusNow.length ? (
          <section className="plan-focus">
            <h2 className="brand-h2">{t('plan.focusTitle')}</h2>
            <ol className="plan-focus-list">
              {stage.focusNow.map((action) => (
                <li key={action}>{t(`plan.stages.${selected}.now.${action}`)}</li>
              ))}
            </ol>
          </section>
        ) : null}

        <div className="plan-cards">
          {VENTURES.map(({ id, brand }) => {
            const criteria = CRITERIA[id][selected];
            return (
              <article className="plan-card" data-brand={brand} key={id}>
                <h2 className="plan-card-title">{ventureName(id)}</h2>
                <dl className="plan-dims">
                  {DIMENSIONS.map((dimension) => (
                    <div className="plan-dim" key={dimension}>
                      <dt>{t(`plan.dims.${dimension}`)}</dt>
                      <dd>{t(`plan.${id}.${selected}.${dimension}`)}</dd>
                    </div>
                  ))}
                </dl>
                <h3 className="plan-exit-title">{t('plan.exitTitle')}</h3>
                {criteria.length ? (
                  <ul className="plan-exit">
                    {criteria.map((criterion) => (
                      <li className={`plan-exit-item is-${criterion.state}`} key={criterion.key}>
                        <span className="plan-exit-mark" aria-hidden="true">
                          {STATE_MARK[criterion.state]}
                        </span>
                        <span className="plan-exit-text">{t(`plan.${id}.${selected}.exit.${criterion.key}`)}</span>
                        <span className="plan-exit-state">{t(`plan.states.${criterion.state}`)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="plan-exit-open">{t('plan.exitOpen')}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Out to each company's own story, and back to the hub. */}
      <Reveal className="brand-footer-nav plan-footer">
        <Link className="brand-footer-link" to="/ventures">
          <ArrowLeft />
          {t('plan.back')}
        </Link>
        {VENTURES.map(({ id }) => (
          <Link className="brand-link-out" to={`/${id}`} key={id}>
            {t(`plan.names.${id}`)}
          </Link>
        ))}
      </Reveal>
    </div>
  );
};

export default VenturesPlan;
```

Append to `src/styles/hub.css`:

```css
/* ------------------------------------------------------ operating plan
   The rail is a tablist that reads as a road: a line through four nodes,
   filled up to the current stage. Cards reuse the brand colour scopes so each
   company arrives in its own colours, as it does on the hub. */

.plan-rail {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(9rem, 1fr));
    gap: 0.5rem;
    margin: 2.5rem 0 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
}

.plan-rail::before {
    content: '';
    position: absolute;
    top: 1.05rem;
    left: 1rem;
    right: 1rem;
    height: 2px;
    background: color-mix(in srgb, var(--brand-core) 22%, transparent);
}

.plan-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 0.4rem 0.75rem 0.9rem;
    border: 1px solid transparent;
    border-radius: 12px;
    background: none;
    color: var(--brand-soft);
    font: inherit;
    text-align: left;
    cursor: pointer;
    scroll-snap-align: start;
}

.plan-stage:hover {
    background: color-mix(in srgb, var(--brand-core) 6%, transparent);
}

.plan-stage:focus-visible {
    outline: 2px solid var(--brand-core);
    outline-offset: 2px;
}

.plan-stage.is-selected {
    border-color: color-mix(in srgb, var(--brand-core) 34%, transparent);
    background: color-mix(in srgb, var(--brand-core) 10%, transparent);
    color: var(--brand-text);
}

.plan-node {
    position: relative;
    width: 14px;
    height: 14px;
    margin: 0.4rem 0 0.35rem;
    border: 2px solid color-mix(in srgb, var(--brand-core) 45%, transparent);
    border-radius: 50%;
    background: var(--color-bg-primary);
}

.plan-stage-past .plan-node,
.plan-stage-current .plan-node {
    border-color: var(--brand-core);
    background: var(--brand-core);
}

.plan-stage-current .plan-node {
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--brand-core) 18%, transparent);
}

.plan-stage-name {
    font-weight: 600;
    color: var(--brand-text);
}

.plan-stage-window {
    font-size: 0.82rem;
}

.plan-here {
    margin-top: 0.2rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--brand-core) 14%, transparent);
    color: var(--brand-core);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
}

.plan-tagline {
    margin: 0 0 1.5rem;
    font-size: 1.15rem;
    color: var(--brand-text);
}

.plan-focus {
    margin-bottom: 2rem;
    padding: 1.25rem 1.5rem;
    border-left: 3px solid var(--brand-core);
    border-radius: 0 12px 12px 0;
    background: color-mix(in srgb, var(--brand-core) 6%, transparent);
}

.plan-focus .brand-h2 {
    margin: 0 0 0.75rem;
    font-size: 1.2rem;
}

.plan-focus-list {
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 0.5rem;
    color: var(--brand-text);
}

.plan-cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
}

.plan-card {
    padding: 1.5rem;
    border-radius: 18px;
    background: radial-gradient(120% 110% at 20% 0%, var(--brand-ink-2), var(--brand-ink) 65%);
    border: 1px solid color-mix(in srgb, var(--brand-core) 24%, transparent);
    color: var(--brand-on-ink);
}

.plan-card-title {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    color: var(--brand-core);
}

.plan-dims {
    margin: 0 0 1.25rem;
    display: grid;
    gap: 0.85rem;
}

.plan-dim dt {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--brand-core);
}

.plan-dim dd {
    margin: 0.2rem 0 0;
    line-height: 1.55;
}

.plan-exit-title {
    margin: 0 0 0.6rem;
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--brand-soft);
}

.plan-exit {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.55rem;
}

.plan-exit-item {
    display: grid;
    grid-template-columns: 1.25rem 1fr auto;
    gap: 0.5rem;
    align-items: baseline;
}

.plan-exit-mark {
    color: var(--brand-core);
}

.plan-exit-state {
    font-size: 0.72rem;
    color: var(--brand-soft);
    white-space: nowrap;
}

.plan-exit-item.is-done .plan-exit-text {
    color: var(--brand-soft);
}

.plan-exit-open {
    margin: 0;
    color: var(--brand-soft);
    font-style: italic;
}

.plan-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.5rem;
}

@media (max-width: 720px) {
    .plan-rail {
        grid-template-columns: repeat(4, 10.5rem);
        margin-inline: -16px;
        padding-inline: 16px;
    }

    .plan-cards {
        grid-template-columns: 1fr;
    }

    .plan-exit-item {
        grid-template-columns: 1.25rem 1fr;
    }

    .plan-exit-state {
        grid-column: 2;
    }
}
```

In `src/App.js`, add after `import Ventures from './components/ventures/ventures';`:

```js
import VenturesPlan from './components/ventures/VenturesPlan';
```

and after `<Route path="/ventures" element={<Ventures />} />`:

```jsx
        <Route path="/ventures/plan" element={<VenturesPlan />} />
```

In `src/components/navigation/RouteMeta.jsx`, in `PAGES`, after `'/ventures': 'ventures',` add:

```js
  '/ventures/plan': 'plan',
```

In `public/sitemap.xml`, after the `/ventures` `<url>` block, add:

```xml
  <url>
    <loc>https://portfolio-phi-ten-37.vercel.app/ventures/plan</loc>
    <lastmod>2026-09-25</lastmod>
    <priority>0.7</priority>
  </url>
```

In `src/updates.js`, add as the first element of `UPDATES`:

```js
  {
    date: '2026-09-25',
    es: 'El plan de operaciones de Moonphase y StackSelect, por etapas',
    en: 'The operating plan for Moonphase and StackSelect, stage by stage',
  },
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `CI=true npx react-scripts test --watchAll=false src/components/ventures src/i18n`
Expected: PASS (all tests in both files plus the dictionary tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/ventures/VenturesPlan.jsx src/components/ventures/VenturesPlan.test.jsx src/styles/hub.css src/App.js src/components/navigation/RouteMeta.jsx public/sitemap.xml src/updates.js
git commit -m "The operating plan page: four stages, two companies, exit criteria"
```

---

### Task 3: The stage chip and the ways in

**Files:**
- Create: `src/components/ventures/StageChip.jsx`
- Create: `src/components/ventures/StageChip.test.jsx`
- Modify: `src/components/brand/MoonphasePage.jsx` (inside the status `<Section>`, after the `brand-note` `<Reveal>`)
- Modify: `src/components/brand/StackSelectPage.jsx` (same place)
- Modify: `src/components/brand/FreelancePage.jsx` (first child of `<div className="brand-body">`)
- Modify: `src/components/ventures/ventures.jsx` (link after the venture grid)
- Modify: `src/styles/hub.css` (append `.stage-chip`)

**Interfaces:**
- Consumes: `CURRENT_STAGE` from `./plan`; `plan.chipLabel`, `plan.chipCta`, `plan.hubCta`, `plan.stages.<id>.name` from Task 1; the `/ventures/plan` route from Task 2.
- Produces: default export `StageChip` (React component, no props): a `<Link>` to `/ventures/plan`.

- [ ] **Step 1: Write the failing test**

Create `src/components/ventures/StageChip.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import StageChip from './StageChip';

test('names the current stage and links to the plan', () => {
  render(
    <I18nProvider>
      <MemoryRouter>
        <StageChip />
      </MemoryRouter>
    </I18nProvider>
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/ventures/plan');
  expect(link).toHaveTextContent('Current stage');
  expect(link).toHaveTextContent('Incubate');
  expect(link).toHaveTextContent('See the plan');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `CI=true npx react-scripts test --watchAll=false src/components/ventures/StageChip.test.jsx`
Expected: FAIL with "Cannot find module './StageChip'".

- [ ] **Step 3: Write the chip and place it**

Create `src/components/ventures/StageChip.jsx`:

```jsx
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight } from '../brand/parts';
import { CURRENT_STAGE } from './plan';

// The thread from each company's story to the plan. It reads the current
// stage from the plan's data, so advancing the plan moves every chip with it.
const StageChip = () => {
  const { t } = useTranslation();
  return (
    <Link className="stage-chip" to="/ventures/plan">
      <span className="stage-chip-dot" aria-hidden="true" />
      <span className="stage-chip-label">{t('plan.chipLabel')}</span>
      <strong className="stage-chip-stage">{t(`plan.stages.${CURRENT_STAGE}.name`)}</strong>
      <span className="stage-chip-cta">
        {t('plan.chipCta')}
        <ArrowRight />
      </span>
    </Link>
  );
};

export default StageChip;
```

Append to `src/styles/hub.css`:

```css
/* The chip on each brand page that points at the plan. */
.stage-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
    padding: 0.45rem 0.9rem;
    border: 1px solid color-mix(in srgb, var(--brand-core) 34%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--brand-core) 8%, transparent);
    color: var(--brand-text);
    font-size: 0.88rem;
    text-decoration: none;
}

.stage-chip:hover {
    border-color: color-mix(in srgb, var(--brand-core) 60%, transparent);
}

.stage-chip:focus-visible {
    outline: 2px solid var(--brand-core);
    outline-offset: 2px;
}

.stage-chip-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--brand-core);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--brand-core) 18%, transparent);
}

.stage-chip-label {
    color: var(--brand-soft);
}

.stage-chip-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--brand-core);
}

.stage-chip-cta svg {
    width: 14px;
    height: 14px;
}
```

In `src/components/brand/MoonphasePage.jsx`, add the import `import StageChip from '../ventures/StageChip';` beside the other imports, and change the status note block to:

```jsx
          <Reveal>
            <p className="brand-note">{t('moonphase.statusNote')}</p>
            <StageChip />
          </Reveal>
```

In `src/components/brand/StackSelectPage.jsx`, add the same import and change its status note block to:

```jsx
          <Reveal>
            <p className="brand-note">{t('stackselect.statusNote')}</p>
            <StageChip />
          </Reveal>
```

In `src/components/brand/FreelancePage.jsx`, add the same import and make the chip the first child of `<div className="brand-body">`:

```jsx
      <div className="brand-body">
        {/* Freelance is Moonphase's incubator, so its story points at the
            plan it is stage zero of. */}
        <Reveal>
          <StageChip />
        </Reveal>
```

In `src/components/ventures/ventures.jsx`, add `import StageChip from './StageChip';` and, directly after the closing `</Reveal>` of the `venture-grid`, add:

```jsx
      {/* The plan both companies are working to, one tap from their cards. */}
      <Reveal className="plan-hub-link">
        <Link className="brand-link-out" to="/ventures/plan">
          {t('plan.hubCta')}
          <ArrowRight />
        </Link>
        <StageChip />
      </Reveal>
```

and append to `src/styles/hub.css`:

```css
.plan-hub-link {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.5rem;
    margin: 1.5rem 0 0;
}

.plan-hub-link .stage-chip {
    margin-top: 0;
}
```

- [ ] **Step 4: Run tests and the build**

Run: `CI=true npx react-scripts test --watchAll=false src`
Expected: PASS, every suite.

Run: `CI=true npm run build`
Expected: `Compiled successfully.`

- [ ] **Step 5: Commit**

```bash
git add src/components/ventures/StageChip.jsx src/components/ventures/StageChip.test.jsx src/components/brand/MoonphasePage.jsx src/components/brand/StackSelectPage.jsx src/components/brand/FreelancePage.jsx src/components/ventures/ventures.jsx src/styles/hub.css
git commit -m "A current-stage chip on each venture's story, pointing at the plan"
```

---

### Task 4: Verify in the browser and ship

**Files:** none changed unless a defect is found (fix it in the task that owns the file, then re-run its tests).

- [ ] **Step 1: Serve the build**

Run (in the background): a static server on `build/` that falls back to `index.html`, for example `npx serve -s build -l 4556`.

- [ ] **Step 2: Check the page**

At `http://localhost:4556/ventures/plan` and `http://localhost:4556/en/ventures/plan`, for light and dark themes, at 1280×900 and 390×844:
- It opens on Incubar with "Estás aquí", the focus block and the "Freelance → Moonphase" card.
- Tab into the rail; Left, Right, Home and End move the selection and focus; Explotar shows the open-horizon sentence in both cards.
- At 390px the rail scrolls sideways, the cards stack, and the page has no horizontal scroll.
- Both cards are in their brand colours and legible in both themes.

- [ ] **Step 3: Check the ways in**

On `/moonphase`, `/stackselect`, `/freelance` and `/ventures`, the chip reads "Etapa actual · Incubar · Ver el plan" and goes to the plan; the tab title on the plan is "Plan de operaciones · Adal Cerrillo".

- [ ] **Step 4: Push**

```bash
git push origin main
```
