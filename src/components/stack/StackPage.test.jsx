import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider, useTranslation } from '../../i18n/I18nProvider';
import StackPage from './StackPage';
import READING from '../about/reading';
import en from '../../i18n/en';
import es from '../../i18n/es';

let setLanguage;
const LanguageHandle = () => {
  setLanguage = useTranslation().setLang;
  return null;
};

const renderPage = () =>
  render(
    <I18nProvider>
      <LanguageHandle />
      <MemoryRouter initialEntries={['/stack']}>
        <StackPage />
      </MemoryRouter>
    </I18nProvider>
  );

test('opens on the wall under its own heading', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: en.cv.skillsTitle })).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: 'Search technologies' })).toBeInTheDocument();
});

test('then the interests and every shelf, on the same page', () => {
  const { container } = renderPage();
  expect(screen.getByRole('heading', { name: en.cv.interestsTitle })).toBeInTheDocument();
  READING.forEach(({ id }) => {
    expect(screen.getByRole('heading', { name: en.cv.readingGroups[id] })).toBeInTheDocument();
  });
  expect(screen.getByText('Cosmos')).toBeInTheDocument();
  expect(screen.getByText(en.cv.readingAside)).toBeInTheDocument();
  // The anchor /library and the terminal land on.
  expect(container.querySelector('#library')).not.toBeNull();
});

test('ends on the card to contact, with no card to a separate library', () => {
  renderPage();
  expect(screen.getByRole('link', { name: new RegExp(en.talk.cta) })).toHaveAttribute('href', '/contact');
  expect(screen.queryByRole('link', { name: /library/i })).toBeNull();
});

test('reads in Spanish too, with no raw keys', () => {
  renderPage();
  act(() => setLanguage('es'));
  expect(screen.getByRole('heading', { level: 1, name: es.cv.skillsTitle })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: es.cv.readingGroups.science })).toBeInTheDocument();
  expect(screen.queryByText(/^(library|cv|stackPage)\.[a-zA-Z.]+$/)).toBeNull();
  act(() => setLanguage('en'));
});

test('the page is named for both halves, in both languages', () => {
  expect(en.nav.stack).toBe('Stack & Library');
  expect(es.nav.stack).toBe('Stack y Biblioteca');
  expect(en.meta.stack.title).toBe('Stack & Library · Adal Cerrillo');
  expect(es.meta.stack.title).toBe('Stack y Biblioteca · Adal Cerrillo');
  expect(en.nav.library).toBeUndefined();
  expect(en.meta.library).toBeUndefined();
});
