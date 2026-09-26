import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import MyProjects from './projects';
import en from '../../i18n/en';

// jsdom has no matchMedia; the page asks it about reduced motion and hover.
window.matchMedia =
  window.matchMedia ||
  (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));

test('Projects hands off to the stack, not to contact', () => {
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/projects']}>
        <MyProjects />
      </MemoryRouter>
    </I18nProvider>
  );
  expect(screen.getByRole('link', { name: new RegExp(en.repos.stackCta) })).toHaveAttribute('href', '/stack');
  expect(screen.queryByRole('link', { name: new RegExp(en.talk.cta) })).toBeNull();
});
