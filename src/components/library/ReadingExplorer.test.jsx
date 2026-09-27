import { fireEvent, render, screen, within } from '@testing-library/react';
import { I18nProvider } from '../../i18n/I18nProvider';
import READING from '../about/reading';
import en from '../../i18n/en';
import ReadingExplorer from './ReadingExplorer';

const renderShelves = () =>
  render(
    <I18nProvider>
      <ReadingExplorer />
    </I18nProvider>
  );

const tab = (name) => screen.getByRole('tab', { name });
const panel = () => screen.getByRole('tabpanel');

test('opens on a shelf rather than on two hundred lines of book', () => {
  renderShelves();
  expect(tab(en.cv.readingGroups.ai)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText('AI Engineering')).toBeInTheDocument();
  expect(within(panel()).queryByText('Cosmos')).toBeNull();
  // The shelf says what it is for, above the books it is for.
  expect(within(panel()).getByText(/Read it because the field moves weekly/)).toBeInTheDocument();
});

test('every shelf is in the index, so none is hidden at the bottom of the page', () => {
  renderShelves();
  READING.forEach(({ id }) => expect(tab(en.cv.readingGroups[id])).toBeInTheDocument());
});

test('picking a shelf swaps the panel', () => {
  renderShelves();
  fireEvent.click(tab(en.cv.readingGroups.science));
  expect(tab(en.cv.readingGroups.science)).toHaveAttribute('aria-selected', 'true');
  expect(tab(en.cv.readingGroups.ai)).toHaveAttribute('aria-selected', 'false');
  expect(within(panel()).getByText('Cosmos')).toBeInTheDocument();
  expect(within(panel()).queryByText('AI Engineering')).toBeNull();
  expect(within(panel()).getByText(/because the universe is more interesting/)).toBeInTheDocument();
});

test('one panel at a time: switching shelves does not stack them up', () => {
  renderShelves();
  fireEvent.click(tab(en.cv.readingGroups.history));
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(within(panel()).getByText('Chip War')).toBeInTheDocument();
});

test('arrow keys walk the shelves, as a tablist is expected to', () => {
  renderShelves();
  fireEvent.keyDown(tab(en.cv.readingGroups.ai), { key: 'ArrowDown' });
  expect(tab(en.cv.readingGroups.craft)).toHaveAttribute('aria-selected', 'true');
  expect(within(panel()).getByText('The Pragmatic Programmer')).toBeInTheDocument();
  fireEvent.keyDown(tab(en.cv.readingGroups.craft), { key: 'ArrowUp' });
  expect(tab(en.cv.readingGroups.ai)).toHaveAttribute('aria-selected', 'true');
});

test('the last shelf wraps around to the first', () => {
  renderShelves();
  fireEvent.keyDown(tab(en.cv.readingGroups.history), { key: 'ArrowDown' });
  expect(tab(en.cv.readingGroups.ai)).toHaveAttribute('aria-selected', 'true');
});
