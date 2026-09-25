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
