import { render } from '@testing-library/react';
import ShelfStrip from './ShelfStrip';

test('stands a row of books on a shelf, one of them pulled, hidden from assistive tech', () => {
  const { container } = render(<ShelfStrip />);
  const strip = container.querySelector('.shelf-strip');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.ss-book').length).toBeGreaterThanOrEqual(12);
  expect(strip.querySelectorAll('.ss-book.ss-pulled')).toHaveLength(1);
  expect(strip.querySelector('.ss-shelf')).not.toBeNull();
});
