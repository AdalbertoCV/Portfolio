import { render } from '@testing-library/react';
import TimelineStrip from './TimelineStrip';

test('draws a line of five milestones, hidden from assistive tech', () => {
  const { container } = render(<TimelineStrip />);
  const strip = container.querySelector('.timeline-strip');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.ts-milestone')).toHaveLength(5);
  expect(strip.querySelector('.ts-pulse')).not.toBeNull();
});
