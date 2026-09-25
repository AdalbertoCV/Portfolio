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

const stageTabs = () => within(screen.getByRole('tablist', { name: 'Plan stages' })).getAllByRole('tab');
const ventureTabs = () => within(screen.getByRole('tablist', { name: 'Company' })).getAllByRole('tab');
const selected = (tabs) => tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');

test('opens on the current stage and on Moonphase', () => {
  renderPlan();
  expect(selected(stageTabs())).toHaveTextContent('Incubate');
  expect(selected(stageTabs())).toHaveTextContent('We are here');
  expect(selected(ventureTabs())).toHaveTextContent('Freelance → Moonphase');
});

test.each([
  ['stage', stageTabs],
  ['venture', ventureTabs],
])('the %s tabs wrap with arrows and jump with Home and End', (_name, tabs) => {
  renderPlan();
  const list = tabs();
  const first = list[0];
  const last = list[list.length - 1];
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

test('up and down move the stage selection too, for the vertical rail', () => {
  renderPlan();
  const [first, second] = stageTabs();
  fireEvent.keyDown(first, { key: 'ArrowDown' });
  expect(second).toHaveAttribute('aria-selected', 'true');
  fireEvent.keyDown(second, { key: 'ArrowUp' });
  expect(first).toHaveAttribute('aria-selected', 'true');
});

describe('on a narrow screen', () => {
  const realMatchMedia = window.matchMedia;
  beforeEach(() => {
    window.matchMedia = (query) => ({
      matches: query === '(max-width: 720px)',
      addEventListener: () => {},
      removeEventListener: () => {},
    });
  });
  afterEach(() => {
    window.matchMedia = realMatchMedia;
  });

  test('the rail turns vertical and only the featured workstream starts open', () => {
    renderPlan();
    expect(screen.getByRole('tablist', { name: 'Plan stages' })).toHaveAttribute('aria-orientation', 'vertical');
    const fronts = within(screen.getByRole('tabpanel')).getAllByRole('article');
    const open = fronts.map((front) => front.querySelector('details').open);
    expect(open[0]).toBe(true);
    expect(open.slice(1).every((isOpen) => !isOpen)).toBe(true);
  });
});

// On a wide screen nothing folds, so nothing should pretend to: a <summary>
// there is a tab stop that can hide a list with no sign it was collapsible.
test('on a wide screen the workstreams are headed lists, not disclosures', () => {
  renderPlan();
  const panel = screen.getByRole('tabpanel');
  expect(panel.querySelector('details, summary')).toBeNull();
  expect(within(panel).getByRole('heading', { name: 'Research and development' })).toBeInTheDocument();
});

test('the two selections are independent', () => {
  renderPlan();
  fireEvent.click(ventureTabs()[1]);
  fireEvent.click(stageTabs()[2]);
  expect(selected(ventureTabs())).toHaveTextContent('StackSelect');
  fireEvent.click(ventureTabs()[0]);
  expect(selected(stageTabs())).toHaveTextContent('Scale');
});

test('Moonphase is titled with Freelance only while incubating', () => {
  renderPlan();
  const panel = () => screen.getByRole('tabpanel');
  expect(within(panel()).getByRole('heading', { name: 'Freelance → Moonphase' })).toBeInTheDocument();
  fireEvent.click(stageTabs()[1]);
  expect(within(panel()).getByRole('heading', { name: 'Moonphase' })).toBeInTheDocument();
});

test('research and development leads Moonphase, featured', () => {
  renderPlan();
  const fronts = within(screen.getByRole('tabpanel')).getAllByRole('article');
  expect(fronts[0]).toHaveTextContent('Research and development');
  expect(fronts[0]).toHaveClass('is-featured');
});

test('the focus block always shows the current stage', () => {
  renderPlan();
  fireEvent.click(stageTabs()[3]);
  const focus = screen.getByRole('region', { name: 'Where our focus goes now' });
  expect(within(focus).getByText('Incorporate both companies before January 2027.')).toBeInTheDocument();
});

test('the horizon stage has no exit criterion', () => {
  renderPlan();
  fireEvent.click(stageTabs()[3]);
  expect(within(screen.getByRole('tabpanel')).getByText('No exit criterion: this stage is the horizon.')).toBeInTheDocument();
});

test('risks come with their mitigation and criteria announce their state', () => {
  renderPlan();
  const panel = screen.getByRole('tabpanel');
  expect(within(panel).getAllByText('How we mitigate it').length).toBeGreaterThan(0);
  expect(within(panel).getAllByText('In progress').length).toBeGreaterThan(0);
  expect(panel).toHaveAttribute('tabindex', '0');
});
