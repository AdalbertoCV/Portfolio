import { useId } from 'react';

/* ==========================================================================
   Hero artwork for the three role pages.

   Each one draws the thing the role is actually about, in the same grammar as
   the Radii/Moonphase/StackSelect canvases: one full-bleed SVG, `slice` so it
   always covers, tinted entirely from the page's brand tokens, and never in
   the way of a tap.
   ======================================================================== */

/**
 * Evodeps — custom work. A modular grid where the blocks are all different
 * sizes: the same system re-cut to a different client's shape every time.
 * Adaptability is the company's stated differentiator, so it is what the
 * artwork shows rather than a generic circuit pattern.
 */
export const EvodepsArt = () => {
  const id = useId();
  const fade = `${id}-fade`;

  // Deterministic module layout — a random one would reshuffle on re-render.
  const modules = [
    [80, 120, 190, 120, 0], [290, 120, 120, 120, -2], [430, 120, 260, 250, -5],
    [80, 260, 120, 250, -3], [220, 260, 190, 110, -1], [220, 390, 190, 120, -6],
    [710, 120, 120, 250, -4], [850, 120, 260, 120, -2.5],
    [850, 260, 120, 110, -1.5], [990, 260, 120, 110, -5.5],
    [430, 390, 190, 120, -3.5], [640, 390, 190, 120, -0.8],
    [850, 390, 260, 120, -4.5], [80, 530, 330, 120, -2.2],
    [430, 530, 190, 120, -6.2], [640, 530, 120, 120, -1.2],
    [780, 530, 330, 120, -3.8],
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
        <radialGradient id={fade} cx="62%" cy="38%" r="68%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${fade})`} />

      {modules.map(([x, y, w, h, delay], index) => {
        // Every fourth module is "fitted": filled and outlined at full strength,
        // so the eye reads a system being assembled rather than a static grid.
        const fitted = index % 4 === 1;
        return (
          <rect
            key={`${x}-${y}`}
            className={fitted ? 'ev-module ev-module-fitted' : 'ev-module'}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="10"
            fill="var(--brand-core)"
            fillOpacity={fitted ? 0.07 : 0.02}
            stroke="var(--brand-core)"
            strokeOpacity={fitted ? 0.5 : 0.14}
            strokeWidth={fitted ? 2 : 1.2}
            style={{ animationDelay: `${delay}s` }}
          />
        );
      })}
    </svg>
  );
};

/**
 * Freelance — three disciplines overlapping. Engineering, design and domain
 * knowledge as three rings with one solid node where all three meet: the
 * multidisciplinary table this role opened the door to.
 */
export const FreelanceMark = ({ className, title }) => {
  const id = useId();
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
        <radialGradient id={grad}>
          <stop offset="0%" stopColor="var(--brand-core-2, #ffd98a)" />
          <stop offset="100%" stopColor="var(--brand-core, #f5b942)" />
        </radialGradient>
      </defs>

      {/* Three disciplines, drifting very slightly out of phase so the overlap
          reads as a live negotiation rather than a fixed Venn diagram. */}
      <circle className="fl-ring fl-ring-1" cx="24" cy="26" r="15" fill="none"
              stroke="var(--brand-core, #f5b942)" strokeOpacity="0.65" strokeWidth="2" />
      <circle className="fl-ring fl-ring-2" cx="40" cy="26" r="15" fill="none"
              stroke="var(--brand-core, #f5b942)" strokeOpacity="0.65" strokeWidth="2" />
      <circle className="fl-ring fl-ring-3" cx="32" cy="40" r="15" fill="none"
              stroke="var(--brand-core, #f5b942)" strokeOpacity="0.65" strokeWidth="2" />

      {/* Where all three meet. */}
      <circle className="fl-node" cx="32" cy="31" r="5" fill={`url(#${grad})`} />
    </svg>
  );
};

// Deterministic client constellation — nodes at the edge, all connected to the
// centre where the three disciplines overlap.
const CLIENTS = [
  [150, 180], [320, 110], [1010, 150], [1120, 330],
  [180, 520], [340, 660], [980, 620], [1100, 480],
];

export const FreelanceArt = () => {
  const id = useId();
  const halo = `${id}-halo`;
  const CX = 640;
  const CY = 380;

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="53%" cy="47%" r="55%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {/* Every client reaches the same person at the centre. The lines pulse in
          sequence, so the page reads as work arriving rather than as a static
          network diagram. */}
      <g stroke="var(--brand-core)" strokeWidth="1.4">
        {CLIENTS.map(([x, y], index) => (
          <line
            key={`${x}-${y}`}
            className="fl-thread"
            x1={x}
            y1={y}
            x2={CX}
            y2={CY}
            strokeOpacity="0.24"
            style={{ animationDelay: `${index * -1.1}s` }}
          />
        ))}
      </g>

      {CLIENTS.map(([x, y], index) => (
        <circle
          key={`node-${x}-${y}`}
          className="fl-client"
          cx={x}
          cy={y}
          r="7"
          fill="var(--brand-core)"
          fillOpacity="0.5"
          style={{ animationDelay: `${index * -0.9}s` }}
        />
      ))}

      {/* The three disciplines, at hero scale. */}
      <g fill="none" stroke="var(--brand-core)" strokeWidth="2">
        <circle className="fl-ring fl-ring-1" cx={CX - 105} cy={CY - 60} r="185" strokeOpacity="0.4" />
        <circle className="fl-ring fl-ring-2" cx={CX + 105} cy={CY - 60} r="185" strokeOpacity="0.4" />
        <circle className="fl-ring fl-ring-3" cx={CX} cy={CY + 100} r="185" strokeOpacity="0.4" />
      </g>

      <circle className="fl-node" cx={CX} cy={CY} r="16" fill="var(--brand-core)" />
    </svg>
  );
};

/**
 * Labsol — a teaching lab. A commit graph flowing left to right: many small
 * nodes entering, branches running in parallel, converging into two large
 * delivered nodes. Students pass through; two systems come out.
 */
export const LabsolArt = () => {
  const id = useId();
  const halo = `${id}-halo`;

  const LANES = [200, 320, 440, 560, 680];

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="70%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {/* The lanes: parallel work running through the lab at once. */}
      <g stroke="var(--brand-core-2)" strokeWidth="1.4" strokeOpacity="0.28">
        {LANES.map((y) => (
          <line key={y} x1="60" y1={y} x2="820" y2={y} />
        ))}
      </g>

      {/* Commits travelling along each lane. */}
      {LANES.map((y, lane) =>
        [0, 1, 2, 3].map((step) => (
          <circle
            key={`${y}-${step}`}
            className="lab-commit"
            cx="60"
            cy={y}
            r="6"
            fill="var(--brand-core-2)"
            fillOpacity="0.7"
            style={{ animationDelay: `${lane * -1.6 - step * 2.4}s` }}
          />
        ))
      )}

      {/* The two merges: every lane converging into a delivered system. */}
      <g fill="none" stroke="var(--brand-core)" strokeWidth="2" strokeOpacity="0.55">
        {LANES.map((y) => (
          <path key={`m1-${y}`} d={`M820 ${y} C 900 ${y}, 920 300, 990 300`} />
        ))}
        {LANES.map((y) => (
          <path key={`m2-${y}`} d={`M820 ${y} C 900 ${y}, 920 560, 990 560`} />
        ))}
      </g>

      {[300, 560].map((cy) => (
        <g key={cy}>
          <circle className="lab-delivered" cx="1010" cy={cy} r="26"
                  fill="var(--brand-core)" fillOpacity="0.16" />
          <circle cx="1010" cy={cy} r="14" fill="none"
                  stroke="var(--brand-core)" strokeWidth="3" />
          <circle cx="1010" cy={cy} r="5" fill="var(--brand-core)" />
        </g>
      ))}
    </svg>
  );
};

/**
 * UAZ — the degree itself. The curriculum map: nine semester columns with the
 * real number of subjects in each, prerequisite chains running left to right,
 * and a light that advances one semester at a time until the map is lit and
 * starts over.
 *
 * The counts are not invented. They are the published plan — 42 subjects
 * across nine semesters — so the artwork is the thing the page is about rather
 * than a lattice that merely suggests one.
 */
export const UazArt = () => {
  const id = useId();
  const halo = `${id}-halo`;

  // Subjects per semester, first to ninth. 5+5+5+5+4+4+4+5+5 = 42.
  const COLUMNS = [5, 5, 5, 5, 4, 4, 4, 5, 5];

  const X0 = 90;
  const GAP_X = 128;
  const GAP_Y = 112;
  const MID = 400;

  // One full pass of the light across all nine semesters.
  const CYCLE = 9;
  const STEP = CYCLE / COLUMNS.length;

  const nodeAt = (col, row, count) => [X0 + col * GAP_X, MID + (row - (count - 1) / 2) * GAP_Y];

  // The prerequisite chains, as rows that carry across columns: the maths
  // sequence, the programming sequence, and the software engineering sequence
  // that runs the length of the degree. Only these three are drawn — every
  // edge would be a thicket, and these are the spines the plan is built on.
  const CHAINS = [0, 2, 3];

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {/* The chains between semesters. Each edge belongs to the column it
          leaves, so it lights with that semester. */}
      <g fill="none" strokeWidth="1.6" strokeLinecap="round">
        {COLUMNS.slice(0, -1).map((count, col) =>
          CHAINS.filter((row) => row < count && row < COLUMNS[col + 1]).map((row) => {
            const [x1, y1] = nodeAt(col, row, count);
            const [x2, y2] = nodeAt(col + 1, row, COLUMNS[col + 1]);
            return (
              <path
                key={`edge-${col}-${row}`}
                className="uaz-edge"
                d={`M${x1 + 9} ${y1} C ${x1 + 58} ${y1}, ${x2 - 58} ${y2}, ${x2 - 9} ${y2}`}
                stroke="var(--brand-core-2)"
                strokeOpacity="0.16"
                style={{ animationDelay: `${col * STEP}s` }}
              />
            );
          })
        )}
      </g>

      {/* The subjects. */}
      {COLUMNS.map((count, col) =>
        Array.from({ length: count }, (_, row) => {
          const [cx, cy] = nodeAt(col, row, count);
          return (
            <circle
              key={`node-${col}-${row}`}
              className="uaz-subject"
              cx={cx}
              cy={cy}
              r="7"
              fill="var(--brand-core)"
              fillOpacity="0.07"
              stroke="var(--brand-core)"
              strokeOpacity="0.2"
              strokeWidth="1.4"
              style={{ animationDelay: `${col * STEP + row * 0.06}s` }}
            />
          );
        })
      )}

      {/* The semester marker: the column the light is currently on. */}
      {COLUMNS.map((count, col) => (
        <line
          key={`term-${col}`}
          className="uaz-term"
          x1={X0 + col * GAP_X}
          y1={MID - 300}
          x2={X0 + col * GAP_X}
          y2={MID + 300}
          stroke="var(--brand-core)"
          strokeWidth="1.2"
          style={{ animationDelay: `${col * STEP}s` }}
        />
      ))}
    </svg>
  );
};

/**
 * CASE — mentoring. Knowledge propagating outward: one mentor node, three arcs
 * of students, and a light that travels along the links and then leaves each
 * student emitting a ring of their own.
 *
 * The count is not decorative. Three arcs of 8, 10 and 12 make the thirty-odd
 * students the page actually claims, so the canvas states the same fact the
 * stats do rather than suggesting a vague network.
 */
const MENTOR = [300, 400];

// radius, how many students, and the half-angle the arc opens across. The arcs
// open to the right, into the empty half of the canvas, so the hero copy that
// sits over the left of the frame never lands on a dense field of nodes.
const ARCS = [
  { r: 250, count: 8, spread: 60 },
  { r: 430, count: 10, spread: 70 },
  { r: 610, count: 12, spread: 78 },
];

const RAD = Math.PI / 180;

// Every arc, resolved to points and to the parent each student learned from:
// the nearest node on the arc before it, or the mentor for the first arc.
const CASE_ARCS = ARCS.map(({ r, count, spread }, arc) => {
  const points = Array.from({ length: count }, (_, i) => {
    const angle = -spread + (i * (spread * 2)) / (count - 1);
    return [
      MENTOR[0] + r * Math.cos(angle * RAD),
      MENTOR[1] + r * Math.sin(angle * RAD),
    ];
  });
  return { arc, points };
});

const parentOf = (arc, index, count) => {
  if (arc === 0) return MENTOR;
  const prev = CASE_ARCS[arc - 1].points;
  return prev[Math.min(prev.length - 1, Math.round((index * (prev.length - 1)) / (count - 1)))];
};

export const CaseArt = () => {
  const id = useId();
  const halo = `${id}-halo`;

  // One pass of the light outward, arc by arc. Every element shares the cycle
  // and differs only in delay, so it reads as a single wave leaving the mentor
  // rather than as thirty dots blinking on their own clocks.
  const STEP = 1.9;

  return (
    <svg
      className="brand-hero-canvas"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="26%" cy="50%" r="62%">
          <stop offset="0%" stopColor="var(--brand-core)" stopOpacity="0.17" />
          <stop offset="100%" stopColor="var(--brand-core)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${halo})`} />

      {/* The links. Each one belongs to the arc it arrives at, so it draws
          forward just before that arc lights. */}
      <g fill="none" strokeWidth="1.5" strokeLinecap="round">
        {CASE_ARCS.map(({ arc, points }) =>
          points.map(([x, y], i) => {
            const [px, py] = parentOf(arc, i, points.length);
            return (
              <line
                key={`link-${arc}-${i}`}
                className="case-link"
                x1={px}
                y1={py}
                x2={x}
                y2={y}
                stroke="var(--brand-core-2)"
                strokeOpacity="0.1"
                style={{ animationDelay: `${arc * STEP}s` }}
              />
            );
          })
        )}
      </g>

      {/* The students, and the ring each one emits once it has understood —
          the beat the whole canvas exists for: what was received gets passed
          on rather than stopping there. */}
      {CASE_ARCS.map(({ arc, points }) =>
        points.map(([x, y], i) => {
          const delay = arc * STEP + i * 0.05;
          return (
            <g key={`node-${arc}-${i}`}>
              <circle
                className="case-pass"
                cx={x}
                cy={y}
                r="9"
                fill="none"
                stroke="var(--brand-core)"
                strokeWidth="1.6"
                style={{ animationDelay: `${delay + 0.35}s` }}
              />
              <circle
                className="case-node"
                cx={x}
                cy={y}
                r="8"
                fill="var(--brand-core)"
                fillOpacity="0.06"
                stroke="var(--brand-core)"
                strokeOpacity="0.22"
                strokeWidth="1.5"
                style={{ animationDelay: `${delay}s` }}
              />
            </g>
          );
        })
      )}

      {/* The mentor. Solid and always lit: the one node on the canvas that is
          not waiting for the wave to reach it. */}
      <circle className="case-source-halo" cx={MENTOR[0]} cy={MENTOR[1]} r="34"
              fill="var(--brand-core)" fillOpacity="0.1" />
      <circle cx={MENTOR[0]} cy={MENTOR[1]} r="20" fill="none"
              stroke="var(--brand-core)" strokeWidth="2.5" strokeOpacity="0.6" />
      <circle cx={MENTOR[0]} cy={MENTOR[1]} r="9" fill="var(--brand-core)" />
    </svg>
  );
};

/**
 * The CASE mark. The centre has no logo of its own to borrow, so the mark draws
 * the transaction instead: one node that already knows, one that is receiving,
 * and the ring the second one gains once it does.
 */
export const CaseMark = ({ className, title }) => {
  const id = useId();
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
        <radialGradient id={grad}>
          <stop offset="0%" stopColor="var(--brand-core-2, #a5b4fc)" />
          <stop offset="100%" stopColor="var(--brand-core, #f472b6)" />
        </radialGradient>
      </defs>

      {/* Set on the diagonal rather than side by side: two nodes on one axis
          leave the top and bottom of the box empty, and at the 56px the hero
          gives a mark that reads as a third of the size every other role's
          logo gets. */}

      {/* The one who already knows. */}
      <circle cx="19" cy="45" r="9.5" fill={`url(#${grad})`} />
      <circle className="case-mark-ring" cx="19" cy="45" r="15" fill="none"
              stroke="var(--brand-core, #f472b6)" strokeOpacity="0.35" strokeWidth="1.8" />

      {/* What travels between them. */}
      <line className="case-mark-link" x1="27" y1="37" x2="37" y2="27"
            stroke="var(--brand-core, #f472b6)" strokeOpacity="0.8" strokeWidth="2.4"
            strokeLinecap="round" />

      {/* The one receiving it, and the ring they gain. */}
      <circle className="case-mark-node" cx="45" cy="19" r="8.5" fill="none"
              stroke="var(--brand-core, #f472b6)" strokeWidth="2.6" />
      <circle className="case-mark-pass" cx="45" cy="19" r="8.5" fill="none"
              stroke="var(--brand-core, #f472b6)" strokeWidth="1.8" />
    </svg>
  );
};
