import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
import ENTRIES, { TONES } from './entries';
import Decisions from './Decisions';

const renderLog = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <Decisions />
      </MemoryRouter>
    </I18nProvider>,
  );

// The tree beside the log is a picture of the log: one fork per entry, and the
// branches that lost are the options each entry lists. Neither can be checked
// from the canvas, so what is checked is what the canvas is fed and that the
// page around it did not change.
test('the log keeps every entry, with the tree beside it', () => {
  const { container } = renderLog();
  expect(container.querySelector('.dec-tree')).not.toBeNull();
  expect(container.querySelectorAll('.dec-entry')).toHaveLength(ENTRIES.length);
  // Every entry can be scrolled to from a node of the tree.
  ENTRIES.forEach(({ id }) => expect(document.getElementById(`decision-${id}`)).not.toBeNull());
  expect(container.querySelector('.dec-tree-tag--meta')).toHaveTextContent(String(ENTRIES.length));
});

test('every room an entry was made in has a tone for the tree', () => {
  ENTRIES.forEach(({ where }) => expect(TONES[where]).toMatch(/^#[0-9a-f]{6}$/i));
});

test('every entry lists at least two options, so its fork has something to drop', () => {
  ENTRIES.forEach(({ id }) => {
    expect(en.decisions.items[id].options.length).toBeGreaterThanOrEqual(2);
  });
});
