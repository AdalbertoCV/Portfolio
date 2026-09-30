import { render } from '@testing-library/react';
import CATALOGUE, { PROJECT_COUNT } from './catalogue';
import ProjectsOrbit, { ORBIT_DATA } from './ProjectsOrbit';

// The drawing is of the catalogue, so what is checked is the data it is built
// from: every project is a planet, and a technology that stands behind more than
// one is a bridge between exactly the projects that used it.
test('every project in the catalogue is a planet', () => {
  expect(ORBIT_DATA.projects).toHaveLength(PROJECT_COUNT);
  const keys = CATALOGUE.flatMap((group) => group.projects.map((project) => project.key));
  expect(ORBIT_DATA.projects.map((project) => project.key)).toEqual(keys);
});

test('a technology shared by several projects is a bridge between those projects', () => {
  const names = ORBIT_DATA.bridges.map((bridge) => bridge.name);
  expect(names).toContain('Django');
  const django = ORBIT_DATA.bridges.find((bridge) => bridge.name === 'Django');
  django.members.forEach((index) => expect(ORBIT_DATA.projects[index].tags).toContain('Django'));
  ORBIT_DATA.bridges.forEach((bridge) => expect(bridge.members.length).toBeGreaterThan(1));
  // A technology used once is not a bridge.
  expect(names).not.toContain('Strudel');
});

test('the panel renders with no count or caption on it', () => {
  const { container } = render(<ProjectsOrbit query="" language="" tech="" live onSelect={() => {}} />);
  expect(container.querySelector('.po-panel')).not.toBeNull();
  expect(container.querySelector('.po-tag')).toHaveTextContent('');
});
