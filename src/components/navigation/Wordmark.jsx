import { useId } from 'react';

// The navbar mark, redrawn from the original PNG so it says "ADAL CERRILLO".
//
// Vector rather than a bitmap for three reasons beyond the name change: it is
// sharp at every density, it inherits `currentColor` so it follows the light
// and dark themes instead of being faked with a brightness() filter, and it is
// a fraction of the 1351×213 PNG's weight.
//
// `textLength` pins each line to an exact width. That matters here: the mark
// sits in a fixed navbar, and without it a late-arriving webfont would resize
// the logo after first paint and shove the bar's contents sideways. With it,
// whatever font ends up rendering, the mark occupies the same box.

const GEAR_TEETH = [0, 45, 90, 135, 180, 225, 270, 315];

const Wordmark = ({ className, title = 'Adal Cerrillo' }) => {
  const id = useId();
  const maskId = `${id}-gear-cut`;

  return (
    <svg
      className={className}
      viewBox="0 0 560 100"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <title>{title}</title>

      <defs>
        {/* Punches a hole in the window so the gear reads as sitting in front
            of it rather than welded to its corner. */}
        <mask id={maskId}>
          <rect width="640" height="100" fill="white" />
          <circle cx="74" cy="74" r="20" fill="black" />
        </mask>
      </defs>

      {/* ---------------------------------------------------- code window */}
      <g
        mask={`url(#${maskId})`}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="10" y="14" width="76" height="62" rx="9" />
        <path d="M10 29h76" />
      </g>

      {/* The </> that makes it a developer's window and not just a browser. */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={`url(#${maskId})`}
      >
        <path d="M37 44 29 53l8 9" />
        <path d="M53 41 44 65" />
        <path d="M60 44l8 9-8 9" />
      </g>

      {/* ------------------------------------------------------------ gear */}
      <g fill="currentColor">
        {GEAR_TEETH.map((angle) => (
          <rect
            key={angle}
            x="71.6"
            y="59.5"
            width="4.8"
            height="7"
            rx="1.4"
            transform={`rotate(${angle} 74 74)`}
          />
        ))}
      </g>
      <circle cx="74" cy="74" r="9.5" fill="none" stroke="currentColor" strokeWidth="4" />

      {/* --------------------------------------------------------- divider */}
      <path d="M112 18v64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

      {/* ------------------------------------------------------- lettering */}
      {/* Baseline sits so the caps are optically centred against the icon
          block (y 14–86), now that there is no second line to balance it.
          `lengthAdjust="spacing"` pins the width by tracking alone — it never
          stretches the glyphs themselves, which on a wordmark would read as a
          mistake rather than as a font swap. */}
      <text
        x="136"
        y="66"
        textLength="408"
        lengthAdjust="spacing"
        fill="currentColor"
        fontFamily="'Cinzel', 'Trajan Pro', Georgia, 'Times New Roman', serif"
        fontSize="44"
        fontWeight="600"
      >
        ADAL CERRILLO
      </text>
    </svg>
  );
};

export default Wordmark;
