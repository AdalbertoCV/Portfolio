import { render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import Navbar from './navbar';

// The bar's entries are buttons that navigate, so the order is pinned by label.
test('the bar carries the six pages in order', () => {
  const { container } = render(
    <ThemeProvider>
      <I18nProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </I18nProvider>
    </ThemeProvider>
  );
  const row = container.querySelector('.nav-links-inline');
  const labels = within(row).getAllByRole('button').map((button) => button.textContent);
  expect(labels).toEqual(['About Me', 'Experience', 'Ventures', 'Projects', 'Stack & Library', 'Contact']);
});
