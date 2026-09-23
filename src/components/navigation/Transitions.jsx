import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';
import './transitions.css';

/* ==========================================================================
   MOVING BETWEEN PAGES

   React Router swaps the route's markup the instant the URL changes, which
   the browser renders as a hard cut: the old page is simply not there any
   more. The View Transitions API can animate that cut, but only if it is the
   one holding the pen — it needs the DOM to change *inside* its callback so
   it can photograph the page before and after.

   That is the whole shape of the hook below. The router's location is watched
   but not rendered; a second copy is, and it only catches up inside
   `startViewTransition`. `flushSync` is what makes it work: React would
   otherwise batch the update and hand the browser an unchanged page to
   photograph.

   Doing it here rather than on every link means nothing else has to know. A
   <Link>, a navigate() from the ⌘K terminal, the browser's own back button
   and a typed URL all arrive the same way, and all of them animate.
   ======================================================================== */

export const useShownLocation = () => {
  const location = useLocation();
  const [shown, setShown] = useState(location);

  useEffect(() => {
    if (shown === location) return;

    // No support, or the reader asked for less motion: swap without ceremony.
    if (
      typeof document.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(location);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => setShown(location));
    });
  }, [location, shown]);

  return shown;
};

/* ==========================================================================
   HOW FAR DOWN THIS IS

   The home page is fourteen thousand pixels tall. A reader three screens in
   has no idea whether that is a tenth of it or most of it, and the scrollbar
   on a trackpad is invisible until you move.

   The rail is driven by `animation-timeline: scroll()`, so its position is a
   function of the scroll offset rather than something JavaScript recomputes
   on a scroll event. There is no listener, no rAF, and no work on the main
   thread at all — the compositor already knows where the page is.
   ======================================================================== */

export const ScrollRail = () => <div className="scroll-rail" aria-hidden="true" />;
