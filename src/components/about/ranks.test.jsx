import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
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

test('The Stars open as a ladder, most used first, every tile in the rank its count earns', () => {
  const { container } = renderExplorer();
  const rows = [...container.querySelectorAll('.rank-row')];
  expect(rows.length).toBeGreaterThan(1);
  // Rows come in the order of the ladder.
  const order = rows.map((row) => RANKS.findIndex((rank) => rank.id === row.dataset.rank));
  expect(order).toEqual([...order].sort((a, b) => a - b));
  // Every tile sits in the row its count puts it in.
  rows.forEach((row) => {
    row.querySelectorAll('.stack-mark').forEach((tile) => {
      expect(tile.dataset.rank).toBe(row.dataset.rank);
    });
  });
  // And Python and Django, the most used, are in the top rank.
  const top = rows[0];
  expect(top.dataset.rank).toBe('diamond');
  expect(top).toHaveTextContent('Python');
  // The rank is colour alone: the league names are not on the page, only given to
  // a screen reader.
  expect(screen.queryByText(en.cv.ranks.diamond)).toBeNull();
  expect(top).toHaveAttribute('aria-label', en.cv.ranks.diamond);
  expect(container.querySelector('.rank-name')).toBeNull();
  expect(container.querySelector('.rank-emblem')).toBeNull();
});

test('every technology in The Stars has a rank', () => {
  TECH_GROUPS[0].items.forEach((item) => {
    expect(rankFor(PROJECT_TECH[item.name] || 0)).not.toBeNull();
  });
});
