import { useId } from 'react';

// StackSelect has no logo yet, so this is the identity: an isometric stack of
// slabs with the top one lifted clear of the pile under a closing bracket.
// "Stack" is the pile of technologies; "Select" is the one that gets picked and
// placed. The whole mark is one idea read at a glance, which is what a logo has
// to survive at 24px.
//
// Ids are generated per instance (useId) rather than hardcoded: the mark renders
// more than once per page — nav card, hero, venture tile — and duplicate ids are
// invalid HTML that also let a gradient reference resolve to the wrong node.

// Isometric rhombus centred on x=32 at a given y.
const slab = (cy, halfW = 22, halfH = 11) =>
  `M32 ${cy - halfH} L${32 + halfW} ${cy} L32 ${cy + halfH} L${32 - halfW} ${cy} Z`;

export const StackSelectMark = ({ className, title }) => {
  const id = useId();
  const grad = `${id}-grad`;
  const glow = `${id}-glow`;

  return (
    <svg
      className={`ss-mark${className ? ` ${className}` : ''}`}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title || undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-core-2, #a3e635)" />
          <stop offset="100%" stopColor="var(--brand-core, #34d399)" />
        </linearGradient>
        <linearGradient id={glow} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-core, #34d399)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand-core, #34d399)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--brand-core, #34d399)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The selection bracket: a caliper closing on the chosen slab. */}
      <g className="ss-caret" stroke="var(--brand-core, #34d399)" strokeWidth="2"
         strokeLinecap="round" fill="none">
        <path d="M23 13 L23 8 L29 8" />
        <path d="M41 13 L41 8 L35 8" />
      </g>

      {/* Two slabs still in the pile — outlined, holding the stack's shape. */}
      <path
        className="ss-slab ss-slab-base"
        d={slab(46)}
        fill="none"
        stroke="var(--brand-core, #34d399)"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="ss-slab ss-slab-base ss-slab-base-2"
        d={slab(37)}
        fill="none"
        stroke="var(--brand-core, #34d399)"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* The selected slab: filled, lifted, sitting in its own gap. */}
      <path
        className="ss-slab ss-selected"
        d={slab(24)}
        fill={`url(#${grad})`}
        stroke="var(--brand-core-2, #a3e635)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* The scanner pass that reads the stack top to bottom. */}
      <path
        className="ss-scan"
        d={slab(34, 24, 12)}
        fill="none"
        stroke={`url(#${glow})`}
        strokeWidth="1.5"
      />
    </svg>
  );
};

// Full-bleed hero artwork: a field of stacks with one slab pulled out of the
// crowd. `slice` so it always covers, whatever the viewport shape.
export const StackSelectArt = () => {
  const id = useId();
  const fade = `${id}-fade`;
  const beam = `${id}-beam`;

  // Deterministic layout — a random one would reshuffle on every re-render.
  const columns = [
    { x: 110, rows: 4, delay: -1.5, pick: false },
    { x: 265, rows: 6, delay: -4, pick: false },
    { x: 420, rows: 3, delay: -7, pick: false },
    { x: 600, rows: 5, delay: -2.5, pick: true },
    { x: 780, rows: 4, delay: -9, pick: false },
    { x: 935, rows: 6, delay: -5.5, pick: false },
    { x: 1090, rows: 3, delay: -3, pick: false },
  ];

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={fade} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={beam} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-core-2)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--brand-core-2)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${fade})`} />

      {columns.map((column) => (
        <g
          key={column.x}
          className="ss-field-col"
          style={{ animationDelay: `${column.delay}s` }}
        >
          {Array.from({ length: column.rows }, (_, row) => {
            const cy = 620 - row * 34;
            const isPicked = column.pick && row === column.rows - 1;
            return (
              <path
                key={row}
                className={isPicked ? 'ss-field-pick' : undefined}
                d={`M${column.x} ${cy - 17} L${column.x + 58} ${cy} L${column.x} ${cy + 17} L${column.x - 58} ${cy} Z`}
                fill={isPicked ? 'var(--brand-core)' : 'none'}
                fillOpacity={isPicked ? 0.22 : 0}
                stroke="var(--brand-core)"
                strokeOpacity={isPicked ? 0.95 : 0.16 + row * 0.03}
                strokeWidth={isPicked ? 2 : 1.2}
                strokeLinejoin="round"
              />
            );
          })}
          {column.pick ? (
            <rect
              className="ss-field-pick"
              x={column.x - 1}
              y={620 - (column.rows - 1) * 34}
              width="2"
              height={(column.rows - 1) * 34 + 40}
              fill={`url(#${beam})`}
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
};

export default StackSelectMark;
