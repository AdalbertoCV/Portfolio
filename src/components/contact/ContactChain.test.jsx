import { render } from '@testing-library/react';
import ContactChain from './ContactChain';

// The invitation tells a collaboration, not a ping: two people, a message and
// a reply, and something built between them out of the exchange.
test('two people, a message each way, and something built between them', () => {
  const { container } = render(<ContactChain />);
  const scene = container.querySelector('.contact-chain');
  expect(scene).toHaveAttribute('aria-hidden', 'true');
  expect(scene.querySelectorAll('.cc-person')).toHaveLength(2);
  expect(scene.querySelectorAll('.cc-bubble')).toHaveLength(2);
  expect(scene.querySelectorAll('.cc-typing circle')).toHaveLength(3);
  expect(scene.querySelectorAll('.cc-block')).toHaveLength(3);
  expect(scene.querySelector('.cc-done')).not.toBeNull();
});
