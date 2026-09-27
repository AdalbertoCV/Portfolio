import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
import { INTEREST_KEYS } from '../about/interestsData';
import InterestsRail from './InterestsRail';

const CARD = 520;
const GAP = 20;
const RAIL = 620;

const renderRail = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <InterestsRail />
      </MemoryRouter>
    </I18nProvider>
  );

const card = (key) => document.getElementById(`interest-card-${key}`);
const dot = (key) => document.getElementById(`interest-dot-${key}`);

// jsdom has no layout: a rail is zero pixels wide, every card is at 0, and
// `scrollTo` is the one method it never implemented. The whole carousel turns
// on those numbers, so a test that does not supply them is testing nothing.
const layOutRail = (container, { scrollLeft = 0 } = {}) => {
  [...container.querySelectorAll('.cv-interest')].forEach((node, index) => {
    Object.defineProperty(node, 'offsetLeft', { configurable: true, value: index * (CARD + GAP) });
  });
  const rail = container.querySelector('.cv-interests');
  Object.defineProperty(rail, 'clientWidth', { configurable: true, value: RAIL });
  Object.defineProperty(rail, 'scrollWidth', { configurable: true, value: INTEREST_KEYS.length * (CARD + GAP) });
  rail.scrollTo = jest.fn();
  rail.scrollLeft = scrollLeft;
  return rail;
};

test('the eight subjects are a rail, not a wall of cards', () => {
  const { container } = renderRail();
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(INTEREST_KEYS.length);
  expect(container.querySelectorAll('.cv-interest-dot')).toHaveLength(INTEREST_KEYS.length);
  // Nothing is thrown away: every subject is still in the document, the reader
  // just reaches one of them at a time.
  expect(screen.getByText(en.cv.interests.science.title)).toBeInTheDocument();
});

test('a dot opens its own card, and only that one is reachable', () => {
  renderRail();
  expect(dot(INTEREST_KEYS[0])).toHaveAttribute('aria-current', 'true');
  fireEvent.click(dot(INTEREST_KEYS[3]));
  expect(dot(INTEREST_KEYS[3])).toHaveAttribute('aria-current', 'true');
  expect(dot(INTEREST_KEYS[0])).not.toHaveAttribute('aria-current');
  // The open card is the one the reader can tab into; the other seven are inert
  // so the keyboard cannot land in a card the rail has scrolled past.
  expect(card(INTEREST_KEYS[3])).not.toHaveAttribute('inert');
  expect(card(INTEREST_KEYS[0])).toHaveAttribute('inert');
});

test('each dot is named after the card it opens, and a dot keeps its tone', () => {
  const { container } = renderRail();
  const dots = [...container.querySelectorAll('.cv-interest-dot')];
  INTEREST_KEYS.forEach((key, index) => {
    expect(dots[index]).toHaveAttribute('aria-label', en.cv.interests[key].title);
    expect(dots[index].style.getPropertyValue('--tone')).toBe(
      container.querySelector(`#interest-card-${key}`).style.getPropertyValue('--tone')
    );
  });
});

test('the arrows walk the cards and stop at the ends', () => {
  renderRail();
  const prev = screen.getByRole('button', { name: en.cv.interestsPrev });
  const next = screen.getByRole('button', { name: en.cv.interestsNext });
  expect(prev).toBeDisabled();
  fireEvent.click(next);
  expect(dot(INTEREST_KEYS[1])).toHaveAttribute('aria-current', 'true');
  expect(prev).toBeEnabled();
  fireEvent.click(dot(INTEREST_KEYS[INTEREST_KEYS.length - 1]));
  expect(next).toBeDisabled();
  // A rail that jumps from the last card to the first is a cut, not a slide.
  fireEvent.click(next);
  expect(dot(INTEREST_KEYS[INTEREST_KEYS.length - 1])).toHaveAttribute('aria-current', 'true');
});

test('arrow keys walk the dots', () => {
  renderRail();
  fireEvent.keyDown(dot(INTEREST_KEYS[0]), { key: 'ArrowRight' });
  expect(dot(INTEREST_KEYS[1])).toHaveAttribute('aria-current', 'true');
  fireEvent.keyDown(dot(INTEREST_KEYS[1]), { key: 'ArrowLeft' });
  expect(dot(INTEREST_KEYS[0])).toHaveAttribute('aria-current', 'true');
});

test('a swipe settles on the card the rail came to rest against', () => {
  const { container } = renderRail();
  // The rail has been dragged one card to the left and released.
  fireEvent.scroll(layOutRail(container, { scrollLeft: CARD + GAP }));
  return waitFor(() =>
    expect(dot(INTEREST_KEYS[1])).toHaveAttribute('aria-current', 'true')
  );
});

test('the end of the rail is the last card, not the one before it', () => {
  const { container } = renderRail();
  const rail = layOutRail(container);
  // The last card cannot reach the left edge, so resting at the end of the rail
  // is resting on the last card.
  rail.scrollLeft = rail.scrollWidth - RAIL;
  fireEvent.scroll(rail);
  return waitFor(() =>
    expect(dot(INTEREST_KEYS[INTEREST_KEYS.length - 1])).toHaveAttribute('aria-current', 'true')
  );
});

test('the card the reader picked is scrolled to inside the rail', () => {
  const { container } = renderRail();
  const rail = layOutRail(container);
  fireEvent.click(dot(INTEREST_KEYS[4]));
  expect(rail.scrollTo).toHaveBeenCalledWith({ left: 4 * (CARD + GAP), behavior: 'smooth' });
  // The last card stops at the end of the rail rather than scrolling past it.
  fireEvent.click(dot(INTEREST_KEYS[INTEREST_KEYS.length - 1]));
  const last = (INTEREST_KEYS.length - 1) * (CARD + GAP);
  expect(rail.scrollTo).toHaveBeenLastCalledWith({
    left: Math.min(last, rail.scrollWidth - RAIL),
    behavior: 'smooth',
  });
});
