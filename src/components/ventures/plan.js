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
