import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import LibrarySections from '../library/LibrarySections';
import { INTEREST_KEYS, INTEREST_TONES } from './interestsData';

const renderSections = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <LibrarySections />
      </MemoryRouter>
    </I18nProvider>
  );

test('every interest has a tone of its own', () => {
  const tones = INTEREST_KEYS.map((key) => INTEREST_TONES[key]);
  expect(tones.every(Boolean)).toBe(true);
  expect(new Set(tones).size).toBe(INTEREST_KEYS.length);
});

test('every card carries its tone and a small animated scene for its subject', () => {
  const { container } = renderSections();
  const cards = [...container.querySelectorAll('.cv-interest')];
  expect(cards).toHaveLength(INTEREST_KEYS.length);
  cards.forEach((card, index) => {
    const key = INTEREST_KEYS[index];
    expect(card.style.getPropertyValue('--tone')).toBe(INTEREST_TONES[key]);
    const art = card.querySelector(`.interest-art[data-art="${key}"]`);
    expect(art).not.toBeNull();
    expect(art.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});

// The loops are decoration, so they only run while the section is on screen.
// Without IntersectionObserver (jsdom, old browsers) the grid simply runs.
test('the scenes run only while the grid is live', () => {
  const { container } = renderSections();
  expect(container.querySelector('.cv-interests-live.is-live')).not.toBeNull();
});

// Security sits beside Science in the grid: close to its length, so it does
// not read as an afterthought, but no longer than it, and with a short list
// of tags rather than a wall of them.
test.each([
  ['en', require('../../i18n/cv.en').default],
  ['es', require('../../i18n/cv.es').default],
])('the security card holds its own beside its neighbour in %s', (_lang, dictionary) => {
  const { security, science } = dictionary.cv.interests;
  const words = (card) => `${card.body} ${card.body2 || ''}`.split(/\s+/).length;
  expect(words(security)).toBeGreaterThanOrEqual(words(science) * 0.8);
  expect(words(security)).toBeLessThanOrEqual(words(science));
  expect(security.tags.length).toBeLessThanOrEqual(10);
});
