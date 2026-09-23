import { useEffect, useState } from 'react';
import {
  EYES, EYE_Y, H, HAIR, HEART, HOOD, Px, RIM, SHOULDERS, SHOULDER_RIM, VOID, W,
} from '../brand/hackerArt';

/* ==========================================================================
   A reference, as a small hooded figure.

   The cards used to open with two initials on a grey disc, which is what a
   card does when it has no photograph and will not borrow one. This is the
   same refusal with better manners: nobody's face is taken off LinkedIn, and
   the plate still says something — the figure matches the person, and the
   colour is theirs and only theirs across the whole page.

   The drawing is the one over the contact form, from the same module, at a
   fifth of the size. What it does not do is follow anything: five avatars
   tracking a pointer would turn a list of people into a wall of eyes. They
   blink, each on its own clock, and that is all.
   ======================================================================== */

const RefHacker = ({ name, figure, glow }) => {
  // null | 'one' | 'two'. The value picks the keyframe; the animation ending
  // is what clears it.
  const [blink, setBlink] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let next;
    const schedule = () => {
      next = window.setTimeout(() => {
        setBlink(Math.random() < 0.26 ? 'two' : 'one');
        schedule();
      // A wider, later spread than the one over the form: five of these in a
      // row landing together would read as a single flicker of the section.
      }, 3400 + Math.random() * 7000);
    };

    schedule();
    return () => window.clearTimeout(next);
  }, []);

  return (
    <span
      className="ref-mark"
      style={{ '--hk-glow': glow }}
      data-blink={blink || undefined}
      onAnimationEnd={() => setBlink(null)}
    >
      <svg
        className="ref-mark-art"
        viewBox={`0 0 ${W} ${H}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={name}
      >
        {SHOULDERS.map((r) => (
          <Px key={`s${r[1]}`} r={r} className="hk-hood" />
        ))}
        {HOOD.map((r) => (
          <Px key={`h${r[1]}`} r={r} className="hk-hood" />
        ))}
        {figure === 'f'
          ? HAIR.map((r) => <Px key={`a${r[0]}-${r[1]}`} r={r} className="hk-hair" />)
          : null}
        {[...RIM, ...SHOULDER_RIM].map((r) => (
          <Px key={`r${r[0]}-${r[1]}`} r={r} className="hk-rim" />
        ))}
        {VOID.map((r) => (
          <Px key={`v${r[1]}`} r={r} className="hk-void" />
        ))}

        {EYES.map((ex) => (
          <g className="hk-eye" key={ex}>
            <rect className="hk-open" x={ex} y={EYE_Y} width="4" height="3" />
            <rect className="hk-shut" x={ex} y={EYE_Y + 1} width="4" height="1" />
          </g>
        ))}

        {/* The reason this section exists at all, in five pixels. */}
        <g className="hk-heart">
          {HEART.map((r) => (
            <Px key={`t${r[0]}-${r[1]}`} r={r} />
          ))}
        </g>
      </svg>
    </span>
  );
};

export default RefHacker;
