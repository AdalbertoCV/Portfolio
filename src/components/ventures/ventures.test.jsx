import { act, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import Ventures from './ventures';

const renderAt = (entry) =>
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={[entry]}>
        <Ventures />
      </MemoryRouter>
    </I18nProvider>
  );

beforeEach(() => {
  jest.useFakeTimers();
  Element.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
});

test('the hub carries the plan section', () => {
  const { container } = renderAt('/ventures');
  expect(container.querySelector('section#plan')).not.toBeNull();
});

// App resets scroll to the top on route change, and its effect runs after the
// page's, so the jump has to wait a tick to land after that reset.
test('arriving with #plan scrolls to the section after the route settles', () => {
  const { container } = renderAt('/ventures#plan');
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  act(() => {
    jest.runAllTimers();
  });
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(Element.prototype.scrollIntoView.mock.instances[0]).toBe(container.querySelector('section#plan'));
});

test('without the hash nothing scrolls', () => {
  renderAt('/ventures');
  act(() => {
    jest.runAllTimers();
  });
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
});
