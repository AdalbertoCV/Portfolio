import { useId } from 'react';

// Moonphase has no logo yet. The mark is the company's whole argument in one
// shape: a single disc whose lit portion sweeps through real phases. Nothing
// about the disc changes — only where the light falls. That is the thesis
// ("what changes is not the moon, it is where you are standing"), so the mark
// animates the terminator across a mask rather than cross-fading between two
// pictures of a moon.
//
// Ids are per instance: the mark renders in the navbar, the venture tile and
// the hero at once, and a shared mask id would let one instance's mask resolve
// against another's.

export const MoonphaseMark = ({ className, title }) => {
  const id = useId();
  const mask = `${id}-mask`;
  const grad = `${id}-grad`;

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-core-2, #e2e8f0)" />
          <stop offset="100%" stopColor="var(--brand-core, #a78bfa)" />
        </linearGradient>
        <mask id={mask}>
          {/* White keeps, black cuts. The cutter is the same radius as the disc,
              so at offset 0 it covers it exactly (new moon) and at ±44 it has
              cleared the disc entirely (full moon); everything between is a
              true crescent, not an approximation of one. */}
          <rect width="64" height="64" fill="black" />
          <circle cx="32" cy="32" r="20" fill="white" />
          <circle className="mp-terminator" cx="32" cy="32" r="20" fill="black" />
        </mask>
      </defs>

      {/* The unlit disc stays visible as a hairline, so the moon never vanishes
          at new phase — the shape has to stay legible as a logo at every frame. */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        stroke="var(--brand-core, #a78bfa)"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />

      <circle cx="32" cy="32" r="20" fill={`url(#${grad})`} mask={`url(#${mask})`} />

      {/* The orbit that makes it a system rather than a dot. */}
      <ellipse
        className="mp-orbit"
        cx="32"
        cy="32"
        rx="29"
        ry="10"
        fill="none"
        stroke="var(--brand-core, #a78bfa)"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
    </svg>
  );
};

// Deterministic star field — a random one would reshuffle on every render and
// flicker the background on unrelated state changes.
const STARS = [
  [90, 120, 1.6, 0], [210, 80, 1.1, -1.2], [330, 180, 1.4, -2.4], [150, 300, 1, -0.6],
  [60, 430, 1.5, -3], [260, 520, 1.2, -1.8], [420, 420, 1, -2.1], [120, 620, 1.3, -0.9],
  [330, 690, 1.5, -3.4], [520, 130, 1.2, -1.5], [480, 620, 1.1, -2.7], [620, 720, 1.4, -0.3],
  [1120, 180, 1.3, -1.1], [1050, 560, 1.5, -2.9], [1160, 680, 1.1, -1.7], [700, 90, 1.2, -3.2],
  [980, 90, 1, -0.4], [760, 660, 1.3, -2.2], [880, 740, 1.2, -1.4], [40, 220, 1.1, -2.6],
];

export const MoonphaseArt = () => {
  const id = useId();
  const mask = `${id}-mask`;
  const grad = `${id}-grad`;
  const halo = `${id}-halo`;

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="72%" cy="42%" r="52%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-core-2)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0.75" />
        </linearGradient>
        <mask id={mask}>
          <rect width="1200" height="800" fill="black" />
          <circle cx="860" cy="340" r="300" fill="white" />
          <circle className="mp-hero-terminator" cx="860" cy="340" r="300" fill="black" />
        </mask>
      </defs>

      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {STARS.map(([cx, cy, r, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          className="mp-star"
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--brand-core-2)"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <circle
        cx="860"
        cy="340"
        r="300"
        fill="none"
        stroke="var(--brand-core)"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      <circle cx="860" cy="340" r="300" fill={`url(#${grad})`} mask={`url(#${mask})`} />

      {/* Two orbits at different speeds and tilts: the same body observed from
          two paths, which is the metaphor the company is named for. */}
      <ellipse
        className="mp-hero-ring"
        cx="860"
        cy="340"
        rx="430"
        ry="150"
        fill="none"
        stroke="var(--brand-core)"
        strokeOpacity="0.22"
        strokeWidth="1.2"
      />
      <ellipse
        className="mp-hero-ring mp-hero-ring-2"
        cx="860"
        cy="340"
        rx="370"
        ry="360"
        fill="none"
        stroke="var(--brand-core)"
        strokeOpacity="0.12"
        strokeWidth="1.2"
        strokeDasharray="3 12"
      />
    </svg>
  );
};

export default MoonphaseMark;
