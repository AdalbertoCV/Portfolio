import { useId } from 'react';

// Radii already has a real logo, so this is not an identity mark — it is the
// hero's background: a CAD viewport mid-operation. Concentric radii turning
// around one centre (the name is the geometry), a contour that cuts itself in,
// and an inspection sweep passing over the part.

const TOOLPATH =
  'M180 600 L180 330 Q180 286 224 286 L392 286 Q436 286 436 330 L436 404 ' +
  'L566 404 Q610 404 610 448 L610 600 Z';

// Dimension ticks along the base line, staggered so they read as a scale.
const TICKS = [200, 248, 296, 344, 392, 440, 488, 536, 584];

const RadiiArt = () => {
  const id = useId();
  const grid = `${id}-grid`;
  const halo = `${id}-halo`;
  const sweep = `${id}-sweep`;

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={grid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0 L0 0 0 40"
            fill="none"
            stroke="var(--brand-core)"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={halo} cx="73%" cy="47%" r="55%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={sweep} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand-core)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${grid})`} />
      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {/* The radii: everything measured from one centre. Three rings turning at
          different rates so the group never reads as a single rigid object. */}
      <g>
        <circle
          className="rd-ring"
          cx="880"
          cy="380"
          r="150"
          fill="none"
          stroke="var(--brand-core)"
          strokeOpacity="0.4"
          strokeWidth="1.4"
          strokeDasharray="2 10"
        />
        <circle
          className="rd-ring rd-ring-2"
          cx="880"
          cy="380"
          r="240"
          fill="none"
          stroke="var(--brand-core)"
          strokeOpacity="0.26"
          strokeWidth="1.2"
          strokeDasharray="18 14"
        />
        <circle
          className="rd-ring rd-ring-3"
          cx="880"
          cy="380"
          r="330"
          fill="none"
          stroke="var(--brand-core-2)"
          strokeOpacity="0.18"
          strokeWidth="1.2"
          strokeDasharray="60 22"
        />

        {/* Literal radii, drawn from the centre out. */}
        <g className="rd-ring rd-ring-2" stroke="var(--brand-core)" strokeOpacity="0.2" strokeWidth="1">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={880 + Math.cos(rad) * 150}
                y1={380 + Math.sin(rad) * 150}
                x2={880 + Math.cos(rad) * 330}
                y2={380 + Math.sin(rad) * 330}
              />
            );
          })}
        </g>

        {/* Centre datum. */}
        <g stroke="var(--brand-core)" strokeOpacity="0.7" strokeWidth="1.4">
          <line x1="856" y1="380" x2="904" y2="380" />
          <line x1="880" y1="356" x2="880" y2="404" />
        </g>
        <circle cx="880" cy="380" r="5" fill="var(--brand-core)" fillOpacity="0.85" />
      </g>

      {/* The contour, cutting itself in. */}
      <path
        className="rd-path"
        d={TOOLPATH}
        fill="none"
        stroke="var(--brand-core)"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Ghost of the finished profile, so the area never looks empty between
          passes. */}
      <path
        d={TOOLPATH}
        fill="var(--brand-core)"
        fillOpacity="0.04"
        stroke="var(--brand-core)"
        strokeOpacity="0.14"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Drilled features on the profile. */}
      <g fill="none" stroke="var(--brand-core)" strokeOpacity="0.4" strokeWidth="1.4">
        <circle cx="250" cy="356" r="18" />
        <circle cx="366" cy="356" r="18" />
        <circle cx="556" cy="520" r="24" />
      </g>

      {/* The cutter head riding the contour. */}
      <g className="rd-head">
        <circle cx="610" cy="448" r="9" fill="var(--brand-core)" fillOpacity="0.2" />
        <circle cx="610" cy="448" r="3.5" fill="var(--brand-core)" />
      </g>

      {/* Dimension scale under the part. */}
      <g className="rd-tick" stroke="var(--brand-core-2)" strokeWidth="1.2" strokeOpacity="0.5">
        <line x1="180" y1="650" x2="610" y2="650" />
        {TICKS.map((x, index) => (
          <line key={x} x1={x} y1="650" x2={x} y2={index % 2 === 0 ? 662 : 657} />
        ))}
      </g>

      {/* Inspection sweep. */}
      <rect className="rd-sweep" x="-120" y="0" width="120" height="800" fill={`url(#${sweep})`} />
    </svg>
  );
};

export default RadiiArt;
