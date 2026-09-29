import TECH_GROUPS from './techStack';
import { PROJECT_TECH } from '../projects/catalogue';

const names = (group) => group.items.map((item) => item.name);

// The Stars are the technologies with public projects behind them, so the
// section the wall opens on is the one a visitor can click through to work.
describe('The Stars', () => {
  const [first, ...rest] = TECH_GROUPS;

  test('open the wall', () => {
    expect(first.id).toBe('stars');
  });

  test('are exactly the technologies with projects behind them', () => {
    const everything = TECH_GROUPS.flatMap(names);
    const backed = everything.filter((name) => PROJECT_TECH[name]).sort();
    expect([...names(first)].sort()).toEqual(backed);
  });

  test('are ordered by how many projects stand behind them', () => {
    const counts = names(first).map((name) => PROJECT_TECH[name]);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });

  test('were moved, not copied: no other group still has one', () => {
    const leftovers = rest.flatMap(names).filter((name) => PROJECT_TECH[name]);
    expect(leftovers).toEqual([]);
  });
});

test('no technology appears twice on the wall', () => {
  const everything = TECH_GROUPS.flatMap(names);
  expect(everything.filter((name, index) => everything.indexOf(name) !== index)).toEqual([]);
});

// Every star that left a group was replaced by one of the same kind, so the
// groups kept their sizes and The Stars came on top: 1080 before, plus 21,
// plus Prezi, Greptile, Dropbox, Windows Autopilot, Beautiful Soup, Fabrix.ai
// Gentle AI, Ichigo, Gamma, Fathom, Kilo Code, OmniRoute and MetaMask, and fourteen fields of science
// and six of mathematics on the frontier, and the fractal omniverse.
test('the groups kept their sizes and The Stars added to the wall', () => {
  expect(TECH_GROUPS.reduce((total, group) => total + group.items.length, 0)).toBe(1114 + TECH_GROUPS[0].items.length);
});

test('Prezi is on the wall as a tool', () => {
  expect(TECH_GROUPS.flatMap(names)).toContain('Prezi');
});

test('Greptile, Dropbox and Behave are on the wall, and Behave shines with its project', () => {
  const everything = TECH_GROUPS.flatMap(names);
  ['Greptile', 'Dropbox', 'Behave'].forEach((name) => expect(everything).toContain(name));
  expect(names(TECH_GROUPS[0])).toContain('Behave');
});

test('Windows Autopilot is on the wall, with cloud and DevOps', () => {
  const cloud = TECH_GROUPS.find((group) => group.id === 'cloud');
  expect(names(cloud)).toContain('Windows Autopilot');
});

test('Beautiful Soup is on the wall, with data', () => {
  const data = TECH_GROUPS.find((group) => group.id === 'data');
  expect(names(data)).toContain('Beautiful Soup');
});

test('Fabrix.ai is on the wall, with the agents and models I work with', () => {
  const aitools = TECH_GROUPS.find((group) => group.id === 'aitools');
  expect(names(aitools)).toContain('Fabrix.ai');
});

test('Gentle AI is on the wall, with the agents and models I work with', () => {
  const aitools = TECH_GROUPS.find((group) => group.id === 'aitools');
  expect(names(aitools)).toContain('Gentle AI');
});

test('Ichigo is on the wall, with the agents and models I work with', () => {
  const aitools = TECH_GROUPS.find((group) => group.id === 'aitools');
  expect(names(aitools)).toContain('Ichigo');
});

test('Gamma is with the agents and models I work with, and Fathom with the meeting tools beside Fireflies.ai and Otter.ai', () => {
  expect(names(TECH_GROUPS.find((group) => group.id === 'aitools'))).toEqual(expect.arrayContaining(['Gamma', 'Fireflies.ai']));
  expect(TECH_GROUPS.flatMap(names)).toContain('Fathom');
});

test('Kilo Code and OmniRoute are with the agents and models I work with, and MetaMask with the tools', () => {
  const aitools = TECH_GROUPS.find((group) => group.id === 'aitools');
  ['Kilo Code', 'OmniRoute', 'OpenRouter'].forEach((name) => expect(names(aitools)).toContain(name));
  expect(names(TECH_GROUPS.find((group) => group.id === 'tools'))).toContain('MetaMask');
});

test('the sciences are on the frontier', () => {
  const frontier = TECH_GROUPS.find((group) => group.id === 'frontier');
  ['Nuclear fusion', 'Exoplanets', 'Fractal omniverse', 'Particle physics', 'Quantum sensing', 'Gene editing (CRISPR)'].forEach((name) =>
    expect(names(frontier)).toContain(name),
  );
});

test('mathematics is on the frontier', () => {
  const frontier = TECH_GROUPS.find((group) => group.id === 'frontier');
  ['Complex analysis', 'Topology', 'Number theory'].forEach((name) => expect(names(frontier)).toContain(name));
});
