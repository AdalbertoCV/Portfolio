import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import About from './about';
import en from '../../i18n/en';

// jsdom has no matchMedia; the page asks it about reduced motion and hover.
window.matchMedia =
  window.matchMedia ||
  (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));

const renderAbout = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </I18nProvider>
  );

test('About is about the person: no wall, no shelves, no interests', () => {
  renderAbout();
  expect(screen.queryByRole('searchbox', { name: 'Search technologies' })).toBeNull();
  expect(screen.queryByText('Cosmos')).toBeNull();
  expect(screen.queryByRole('heading', { name: en.cv.interestsTitle })).toBeNull();
});

test('About still ends on the card to Experience', () => {
  const { container } = renderAbout();
  const teaser = container.querySelector('.hub-teaser');
  expect(teaser.querySelector('a[href="/experience"]')).not.toBeNull();
  expect(teaser.querySelector('.timeline-strip')).not.toBeNull();
});
