import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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

// jsdom has no layout, so a rail is zero pixels wide and never looks like it has
// anything to scroll. These are the numbers the whole carousel turns on, and
// `scrollTo` is the one method jsdom never implemented.
const layOutRail = (container, { cardWidth = 240, gap = 14, clientWidth = 620 } = {}) => {
  const cards = [...container.querySelectorAll('.practice-card')];
  cards.forEach((card, index) => {
    Object.defineProperty(card, 'offsetWidth', { configurable: true, value: cardWidth });
    Object.defineProperty(card, 'offsetLeft', {
      configurable: true,
      value: index * (cardWidth + gap),
    });
  });
  const rail = container.querySelector('.practice-rail');
  Object.defineProperty(rail, 'clientWidth', { configurable: true, value: clientWidth });
  Object.defineProperty(rail, 'scrollWidth', {
    configurable: true,
    value: cards.length * (cardWidth + gap),
  });
  rail.scrollTo = jest.fn();
  return rail;
};

test('opens on one area, not on the whole list at once', () => {
  renderAreas();
  expect(tab(en.cv.practice.systems)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText(en.cv.practice.systemsItems[0])).toBeInTheDocument();
  // The rest of the areas are one tap away, not already on the page.
  expect(within(panel()).queryByText(en.cv.practice.aiItems[0])).toBeNull();
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
});

test('the areas are a horizontal rail of cards', () => {
  renderAreas();
  const rail = screen.getByRole('tablist');
  expect(rail).toHaveAttribute('aria-orientation', 'horizontal');
  expect(rail.className).toContain('practice-rail');
  expect(rail.querySelectorAll('.practice-card')).toHaveLength(GROUPS.length);
  expect(screen.queryByRole('button', { name: en.cv.practice.nextArea })).toBeNull();
});

test('the arrows only exist when the rail has further to go', () => {
  const { container } = renderAreas();
  fireEvent.scroll(layOutRail(container));
  const next = screen.getByRole('button', { name: en.cv.practice.nextArea });
  const prev = screen.getByRole('button', { name: en.cv.practice.prevArea });
  // The rail is at its first card, so there is nothing before it.
  expect(prev).toBeDisabled();
  fireEvent.click(next);
  expect(tab(en.cv.practice.ai)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText(en.cv.practice.aiItems[0])).toBeInTheDocument();
  expect(screen.getByRole('button', { name: en.cv.practice.prevArea })).toBeEnabled();
});

test('the arrows stop at the ends instead of jumping back to the first', () => {
  const { container } = renderAreas();
  fireEvent.scroll(layOutRail(container));
  fireEvent.click(tab(en.cv.practice.breadth));
  expect(screen.getByRole('button', { name: en.cv.practice.nextArea })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: en.cv.practice.nextArea }));
  expect(tab(en.cv.practice.breadth)).toHaveAttribute('aria-selected', 'true');
  fireEvent.click(screen.getByRole('button', { name: en.cv.practice.prevArea }));
  expect(tab(en.cv.practice.product)).toHaveAttribute('aria-selected', 'true');
});

test('a swipe settles on the card nearest the middle', () => {
  const { container } = renderAreas();
  // The rail has not moved, so the card closest to its centre is the second.
  fireEvent.scroll(layOutRail(container));
  return waitFor(() => expect(tab(en.cv.practice.ai)).toHaveAttribute('aria-selected', 'true'));
});

test('every area is in the rail, and the area says what it is for', () => {
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
