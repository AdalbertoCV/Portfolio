import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import TECH_GROUPS from './techStack';
import StackExplorer from './StackExplorer';
import { PROJECT_TECH } from '../projects/catalogue';
import { RANKS, rankFor } from './ranks';

const renderExplorer = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <StackExplorer />
      </MemoryRouter>
    </I18nProvider>,
  );

test('a technology has the highest rank whose threshold it reaches', () => {
  expect(rankFor(6).id).toBe('diamond');
  expect(rankFor(9).id).toBe('diamond');
  expect(rankFor(5).id).toBe('gold');
  expect(rankFor(4).id).toBe('silver');
  expect(rankFor(3).id).toBe('bronze');
  expect(rankFor(2).id).toBe('bronze');
  expect(rankFor(1).id).toBe('iron');
  expect(rankFor(0)).toBeNull();
});

test('the ranks run highest first, with thresholds strictly falling', () => {
  RANKS.slice(1).forEach((rank, i) => expect(rank.min).toBeLessThan(RANKS[i].min));
});

// Colour and nothing else: one grid, in the order it was already in, with no
// rows, dividers, names or labels; only the tile carries its rank.
test('The Stars stay one grid, and each tile carries the colour its count earns', () => {
  const { container } = renderExplorer();
  expect(container.querySelectorAll('.stack-marks')).toHaveLength(1);
  expect(container.querySelector('.rank-row')).toBeNull();
  expect(container.querySelector('.rank-rule')).toBeNull();
  expect(container.querySelector('.rank-name')).toBeNull();
  const tiles = [...container.querySelectorAll('.stack-mark')];
  expect(tiles.length).toBe(TECH_GROUPS[0].items.length);
  TECH_GROUPS[0].items.forEach((item, i) => {
    expect(tiles[i].dataset.rank).toBe(rankFor(PROJECT_TECH[item.name] || 0)?.id);
  });
  // Most used first, as before: the first tile is in the top rank.
  expect(tiles[0].dataset.rank).toBe('diamond');
});

test('every technology in The Stars has a rank', () => {
  TECH_GROUPS[0].items.forEach((item) => {
    expect(rankFor(PROJECT_TECH[item.name] || 0)).not.toBeNull();
  });
});
