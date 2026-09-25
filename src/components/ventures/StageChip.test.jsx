import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import StageChip from './StageChip';

test('names the current stage and links to the plan', () => {
  render(
    <I18nProvider>
      <MemoryRouter>
        <StageChip />
      </MemoryRouter>
    </I18nProvider>
  );
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/ventures#plan');
  expect(link).toHaveTextContent('Current stage');
  expect(link).toHaveTextContent('Incubate');
  expect(link).toHaveTextContent('See the plan');
});
