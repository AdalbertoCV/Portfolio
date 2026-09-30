import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import ENTRIES from './entries';
import { TONES } from './DecisionArt';
import Decisions from './Decisions';

const renderLog = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <Decisions />
      </MemoryRouter>
    </I18nProvider>,
  );

// A scene per decision is decoration, so what is checked is that none was left
// out when an entry was added, and that the page around them did not change.
test('every entry in the log has its own small scene', () => {
  const { container } = renderLog();
  expect(container.querySelectorAll('.dec-entry')).toHaveLength(ENTRIES.length);
  expect(container.querySelectorAll('.dec-art')).toHaveLength(ENTRIES.length);
  container.querySelectorAll('.dec-art').forEach((art) => expect(art.querySelector('svg')).not.toBeNull());
});

test('every room an entry was made in has a tone for its scene', () => {
  ENTRIES.forEach(({ where }) => expect(TONES[where]).toMatch(/^#[0-9a-f]{6}$/i));
});
