import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import StackExplorer from './StackExplorer';

const renderStack = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <StackExplorer />
      </MemoryRouter>
    </I18nProvider>
  );

const search = () => screen.getByRole('searchbox', { name: 'Search technologies' });
const tab = (name) => screen.getByRole('tab', { name: new RegExp(`^${name}`) });

test('typing shows every match across the wall, grouped by section', () => {
  renderStack();
  fireEvent.change(search(), { target: { value: 'lang' } });
  const results = screen.getByRole('region', { name: /results/i });
  expect(within(results).getByText('LangChain')).toBeInTheDocument();
  expect(within(results).getByText('LangGraph')).toBeInTheDocument();
  expect(within(results).getByText('Langfuse')).toBeInTheDocument();
  expect(within(results).getByRole('heading', { name: /AI systems/i })).toBeInTheDocument();
  expect(screen.queryByRole('tabpanel')).toBeNull();
});

test('finds a name however it is typed', () => {
  renderStack();
  fireEvent.change(search(), { target: { value: 'nextjs' } });
  expect(within(screen.getByRole('region', { name: /results/i })).getByText('Next.js')).toBeInTheDocument();
  fireEvent.change(search(), { target: { value: 'c++' } });
  expect(within(screen.getByRole('region', { name: /results/i })).getByText('C++')).toBeInTheDocument();
});

test('Escape clears the search and returns to the section you were in', () => {
  renderStack();
  fireEvent.click(tab('Languages'));
  fireEvent.change(search(), { target: { value: 'lang' } });
  fireEvent.keyDown(search(), { key: 'Escape' });
  expect(search()).toHaveValue('');
  expect(tab('Languages')).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel')).toBeInTheDocument();
});

test('says plainly when nothing matches', () => {
  renderStack();
  fireEvent.change(search(), { target: { value: 'zzzqqq' } });
  expect(screen.getByText(/Nothing called “zzzqqq”/)).toBeInTheDocument();
});

test('the slash key focuses the search from anywhere on the page', () => {
  renderStack();
  fireEvent.keyDown(document.body, { key: '/' });
  expect(search()).toHaveFocus();
});
