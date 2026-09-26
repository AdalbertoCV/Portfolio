import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import StackPage from './StackPage';
import en from '../../i18n/en';

const renderPage = () =>
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/stack']}>
        <StackPage />
      </MemoryRouter>
    </I18nProvider>
  );

test('carries the whole wall under its own heading', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: en.cv.skillsTitle })).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: 'Search technologies' })).toBeInTheDocument();
});

test('ends on the card to the library', () => {
  renderPage();
  expect(screen.getByRole('link', { name: en.stackPage.libraryCta })).toHaveAttribute('href', '/library');
});

test('has its own page title', () => {
  expect(en.meta.stack.title).toMatch(/Stack/);
});
