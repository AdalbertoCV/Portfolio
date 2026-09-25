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
