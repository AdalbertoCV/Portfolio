import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import VenturesPlan from './VenturesPlan';

const renderPlan = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <VenturesPlan />
      </MemoryRouter>
    </I18nProvider>
  );

const tabs = () => screen.getAllByRole('tab');

test('opens on the current stage, marked as where you are', () => {
  renderPlan();
  const selected = tabs().find((tab) => tab.getAttribute('aria-selected') === 'true');
  expect(selected).toHaveTextContent('Incubate');
  expect(selected).toHaveTextContent('We are here');
});

test('arrow keys move the selection and wrap at both ends', () => {
  renderPlan();
  const [first, , , last] = tabs();
  fireEvent.keyDown(first, { key: 'ArrowLeft' });
  expect(last).toHaveAttribute('aria-selected', 'true');
  expect(last).toHaveFocus();
  fireEvent.keyDown(last, { key: 'ArrowRight' });
  expect(first).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(first, { key: 'End' });
  expect(last).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(last, { key: 'Home' });
  expect(first).toHaveAttribute('aria-selected', 'true');
});

test('the Moonphase card names Freelance only while incubating', () => {
  renderPlan();
  expect(screen.getByRole('heading', { name: 'Freelance → Moonphase' })).toBeInTheDocument();
  fireEvent.click(tabs()[1]);
  expect(screen.queryByRole('heading', { name: 'Freelance → Moonphase' })).toBeNull();
  expect(screen.getByRole('heading', { name: 'Moonphase' })).toBeInTheDocument();
});

test('focus actions show only for the current stage', () => {
  renderPlan();
  expect(screen.getByRole('heading', { name: 'Where our focus goes now' })).toBeInTheDocument();
  fireEvent.click(tabs()[2]);
  expect(screen.queryByRole('heading', { name: 'Where our focus goes now' })).toBeNull();
});

test('the horizon stage says it has no exit criterion instead of an empty list', () => {
  renderPlan();
  fireEvent.click(tabs()[3]);
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('No exit criterion: this stage is the horizon.')).toHaveLength(2);
});

test('each criterion announces its state in words', () => {
  renderPlan();
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('In progress').length).toBeGreaterThan(0);
  expect(within(panel).getAllByText('Pending').length).toBeGreaterThan(0);
});
