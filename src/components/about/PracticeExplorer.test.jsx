import { fireEvent, render, screen, within } from '@testing-library/react';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
import PRACTICE_ICONS from './practiceIcons';
import PracticeExplorer from './PracticeExplorer';

const GROUPS = ['systems', 'ai', 'security', 'delivery', 'product', 'breadth'];

const renderAreas = () =>
  render(
    <I18nProvider>
      <PracticeExplorer />
    </I18nProvider>
  );

const tab = (name) => screen.getByRole('tab', { name });
const panel = () => screen.getByRole('tabpanel');

test('opens on one area, not on the whole list at once', () => {
  renderAreas();
  expect(tab(en.cv.practice.systems)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText(en.cv.practice.systemsItems[0])).toBeInTheDocument();
  // The rest of the areas are one click away, not already on the page.
  expect(within(panel()).queryByText(en.cv.practice.aiItems[0])).toBeNull();
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
});

test('every area is in the index, and the area says what it is for', () => {
  renderAreas();
  GROUPS.forEach((group) => {
    expect(tab(en.cv.practice[group])).toBeInTheDocument();
    expect(en.cv.practice[`${group}Lede`].length).toBeGreaterThan(0);
  });
  expect(within(panel()).getByText(en.cv.practice.systemsLede)).toBeInTheDocument();
});

test('picking an area swaps the panel', () => {
  renderAreas();
  fireEvent.click(tab(en.cv.practice.security));
  expect(tab(en.cv.practice.security)).toHaveAttribute('aria-selected', 'true');
  expect(tab(en.cv.practice.systems)).toHaveAttribute('aria-selected', 'false');
  expect(within(panel()).getByText(en.cv.practice.securityItems[0])).toBeInTheDocument();
  expect(within(panel()).queryByText(en.cv.practice.systemsItems[0])).toBeNull();
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
});

test('arrow keys walk the areas, as a tablist is expected to', () => {
  renderAreas();
  fireEvent.keyDown(tab(en.cv.practice.systems), { key: 'ArrowDown' });
  expect(tab(en.cv.practice.ai)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText(en.cv.practice.aiItems[0])).toBeInTheDocument();
  fireEvent.keyDown(tab(en.cv.practice.ai), { key: 'ArrowUp' });
  expect(tab(en.cv.practice.systems)).toHaveAttribute('aria-selected', 'true');
});

test('the last area wraps around to the first', () => {
  renderAreas();
  fireEvent.keyDown(tab(en.cv.practice.breadth), { key: 'ArrowDown' });
  expect(tab(en.cv.practice.systems)).toHaveAttribute('aria-selected', 'true');
});

test('every line carries its own mark, and no area repeats one', () => {
  GROUPS.forEach((group) => {
    const icons = PRACTICE_ICONS[group];
    const items = en.cv.practice[`${group}Items`];
    expect(icons).toHaveLength(items.length);
    // A repeated mark inside one panel reads as a copy-paste slip.
    expect(new Set(icons).size).toBe(icons.length);
  });
});

test('a name ConceptIcon does not know would leave a row without a logo', () => {
  // ConceptIcon returns null for a name it does not have, so the panel is asked
  // for one drawn mark per line: any typo in the map shows up here as a count
  // that does not add up.
  GROUPS.forEach((group) => {
    const { unmount } = renderAreas();
    fireEvent.click(tab(en.cv.practice[group]));
    const rows = within(panel()).getAllByRole('listitem');
    const marks = panel().querySelectorAll('.list-icon svg');
    expect(rows).toHaveLength(en.cv.practice[`${group}Items`].length);
    expect(marks).toHaveLength(rows.length);
    unmount();
  });
});
