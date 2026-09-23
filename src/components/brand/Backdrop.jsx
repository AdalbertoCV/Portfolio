import './backdrop.css';

/* ==========================================================================
   THE PAGE, BREATHING

   Three soft washes drifting behind everything, on loops long enough and
   offset enough that they never repeat visibly. The point is that a reader
   who looks up from the text finds the page slightly different from how they
   left it, without ever having been asked to watch anything move.

   All the motion is `transform`, which the compositor handles on its own
   thread: the page is never laid out or repainted for it. That is the whole
   design constraint. The layer this replaces animated `background-position`
   on a full-screen fixed element, which repaints the viewport every frame
   forever — pretty, and the most expensive thing on the site.

   No JavaScript. Nothing here reacts to anything, so nothing here needs a
   component that thinks. It is a div and a stylesheet.
   ======================================================================== */

const Backdrop = () => (
  <div className="backdrop" aria-hidden="true">
    <span className="bd-wash bd-wash-a" />
    <span className="bd-wash bd-wash-b" />
    <span className="bd-wash bd-wash-c" />
    {/* The dust that used to live on body::after, moved onto a real element
        so it can drift by transform instead of by background-position. */}
    <span className="bd-dust" />
  </div>
);

export default Backdrop;
