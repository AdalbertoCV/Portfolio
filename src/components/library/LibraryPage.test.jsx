import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider, useTranslation } from '../../i18n/I18nProvider';
import LibraryPage from './LibraryPage';
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
      <MemoryRouter initialEntries={['/library']}>
        <LibraryPage />
      </MemoryRouter>
    </I18nProvider>
  );

test('opens on its own heading, then the interests, then every shelf', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: en.library.title })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: en.cv.interestsTitle })).toBeInTheDocument();
  READING.forEach(({ id }) => {
    expect(screen.getByRole('heading', { name: en.cv.readingGroups[id] })).toBeInTheDocument();
  });
  expect(screen.getByText('Cosmos')).toBeInTheDocument();
  expect(screen.getByText(en.cv.readingAside)).toBeInTheDocument();
});

test('ends on the card to contact', () => {
  renderPage();
  expect(screen.getByRole('link', { name: new RegExp(en.talk.cta) })).toHaveAttribute('href', '/contact');
});

test('reads in Spanish too, with no raw keys', () => {
  renderPage();
  act(() => setLanguage('es'));
  expect(screen.getByRole('heading', { level: 1, name: es.library.title })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: es.cv.readingGroups.science })).toBeInTheDocument();
  expect(screen.queryByText(/^(library|cv)\.[a-zA-Z.]+$/)).toBeNull();
  act(() => setLanguage('en'));
});
