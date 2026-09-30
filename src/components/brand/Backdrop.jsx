import Aurora from './Aurora';
import './backdrop.css';

/* ==========================================================================
   THE BACKGROUND OF THE SITE

   A fixed layer behind everything. It used to be three soft washes drifting
   on long loops: pleasant, and so quiet that nobody could say it was there.
   It is an aurora over a living grid now (see Aurora.jsx), drawn on a canvas
   that starts once the page has painted; under it, a static wash in the
   theme's own colours is what the page is before that, so it is never flat.

   Nothing here moves with the scroll: it is fixed, and what moves on it moves
   on its own. It is behind the content on a negative z-index, so every
   surface in front of it reads exactly as it did.
   ======================================================================== */

const Backdrop = () => (
  <div className="backdrop" aria-hidden="true">
    <Aurora />
  </div>
);

export default Backdrop;
