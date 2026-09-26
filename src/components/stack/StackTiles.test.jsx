import { render } from '@testing-library/react';
import StackTiles from './StackTiles';

test('lays out a wall of thirty tiles with four stars, hidden from assistive tech', () => {
  const { container } = render(<StackTiles />);
  const strip = container.querySelector('.stack-tiles');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.st-tile')).toHaveLength(30);
  expect(strip.querySelectorAll('.st-star')).toHaveLength(4);
});
