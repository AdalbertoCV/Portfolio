import { act, render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { useShownLocation } from './Transitions';

// A redirect, such as /library to /stack, starts a second transition while
// the first is still running; the browser skips the first and rejects its
// `ready` promise with an AbortError. Left unhandled, that is a console error
// on every visit to a redirected address.
test('a transition skipped by the next navigation does not leave an unhandled rejection', async () => {
  const rejections = [];
  window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
  document.startViewTransition = (update) => {
    update();
    const ready = Promise.reject(new DOMException('Transition was skipped', 'AbortError'));
    const handled = { ready, finished: Promise.resolve(), updateCallbackDone: Promise.resolve() };
    const originalCatch = ready.catch.bind(ready);
    ready.catch = (fn) => {
      rejections.push('handled');
      return originalCatch(fn);
    };
    return handled;
  };

  let navigate;
  const Probe = () => {
    navigate = useNavigate();
    useShownLocation();
    return null;
  };
  render(
    <MemoryRouter initialEntries={['/']}>
      <Probe />
    </MemoryRouter>
  );
  await act(async () => navigate('/library'));
  expect(rejections).toContain('handled');
  delete document.startViewTransition;
});
