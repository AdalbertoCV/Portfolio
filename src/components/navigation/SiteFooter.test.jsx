import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import SiteFooter from './SiteFooter';
import en from '../../i18n/en';

// The footer's Explore list is the navbar again, for whoever reached the
// bottom: it has to carry the same pages in the same order.
test('the footer explores the same seven pages as the navbar, in order', () => {
  render(
    <I18nProvider>
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    </I18nProvider>
  );
  const labels = [en.nav.about, en.nav.experience, en.nav.ventures, en.nav.projects, en.nav.stack, en.nav.library, en.nav.contact];
  const links = labels.map((label) => screen.getByRole('link', { name: label }));
  expect(links.map((link) => link.getAttribute('href'))).toEqual([
    '/', '/experience', '/ventures', '/projects', '/stack', '/library', '/contact',
  ]);
  const list = links[0].closest('ul');
  expect(within(list).getAllByRole('link')).toHaveLength(7);
});
