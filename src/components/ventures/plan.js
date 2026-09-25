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
