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

test('How I work lists the areas in an index, and opens one at a time', () => {
  const { container } = renderAbout();
  const index = container.querySelector('.stack-index[aria-label="' + en.cv.listsLabel + '"]');
  expect(index).not.toBeNull();
  expect(index.querySelectorAll('[role="tab"]')).toHaveLength(6);
  // One area open, not the whole list rendered six times over.
  const practice = container.querySelector('.stack-panel');
  expect(practice.getAttribute('aria-labelledby')).toBe('practice-tab-systems');
  expect(practice.querySelectorAll('li')).toHaveLength(en.cv.practice.systemsItems.length);
  // The two mindsets still open the section; they are not part of the index.
  expect(screen.getByText(en.cv.principles.aiFirst.title)).toBeInTheDocument();
  expect(screen.getByText(en.cv.principles.innovation.title)).toBeInTheDocument();
});
