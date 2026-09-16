// The one card in the catalogue whose cover cannot be a screenshot, because
// the thing it shows is still running two clicks away. So the cover is the
// game's own sprite work, redrawn as blocks at rest: the laptop mid-jump, the
// bugs it is jumping, the deploy floating past overhead.
//
// Everything is currentColor, so the cover follows the theme the way the
// canvas does — the game reads its ink from CSS too.

// Same proportion as a screenshot cover (5:2), so this card sits in the grid
// without announcing that it is different.
const W = 400;
const H = 160;
const GROUND = 118;

// One block. The game draws with fillRect; this draws with <rect>, from the
// same coordinates, which is why the two look like the same laptop.
const Px = ({ x, y, w, h, o = 1 }) => (
  <rect x={x} y={y} width={w} height={h} fill="currentColor" fillOpacity={o} />
);

// The laptop, lifted off the ground: a cover showing it standing still would be
// a picture of a laptop, and a cover showing it mid-jump is a picture of a game.
const Laptop = ({ x, y }) => (
  <g>
    {/* screen, hollowed out by an inner rect painted in the card ground */}
    <Px x={x + 6} y={y - 30} w={34} h={22} />
    <rect x={x + 9} y={y - 27} width={28} height={16} fill="var(--color-bg-tertiary)" />
    {/* the two eyes: a laptop with a face is a character, without one it is a box */}
    <Px x={x + 14} y={y - 22} w={4} h={4} />
    <Px x={x + 28} y={y - 22} w={4} h={4} />
    {/* hinge and base */}
    <Px x={x + 2} y={y - 8} w={42} h={4} />
    <Px x={x} y={y - 4} w={46} h={4} />
  </g>
);

const Bug = ({ x, w, h }) => (
  <g>
    <Px x={x + 4} y={GROUND - h + 6} w={w - 8} h={h - 8} />
    <Px x={x + w / 2 - 4} y={GROUND - h} w={8} h={6} />
    <Px x={x} y={GROUND - h + 10} w={4} h={3} />
    <Px x={x + w - 4} y={GROUND - h + 10} w={4} h={3} />
    <Px x={x} y={GROUND - 8} w={4} h={3} />
    <Px x={x + w - 4} y={GROUND - 8} w={4} h={3} />
  </g>
);

const PlayGlyph = () => (
  <svg
    className="project-glyph project-glyph-play"
    viewBox={`0 0 ${W} ${H}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    {/* the moving ground, frozen: a dashed line reads as speed even at rest */}
    {Array.from({ length: 15 }, (_, i) => (
      <Px key={i} x={i * 28} y={GROUND + 2} w={14} h={2} o={0.35} />
    ))}

    <Laptop x={78} y={GROUND - 26} />
    <Bug x={196} w={30} h={24} />
    <Bug x={268} w={44} h={22} />
    <Bug x={352} w={28} h={26} />

    {/* the deploy, worth 25 points, drifting above head height */}
    <g>
      <Px x={300} y={34} w={30} h={22} />
      <rect x={304} y={38} width={22} height={14} fill="var(--color-bg-tertiary)" />
      <Px x={314} y={40} w={2} h={10} />
      <Px x={310} y={44} w={4} h={2} />
      <Px x={316} y={44} w={4} h={2} />
    </g>

    {/* the labels, as the game prints them under each bug */}
    <g
      fill="currentColor"
      fillOpacity="0.5"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fontSize="9"
      fontWeight="600"
      textAnchor="middle"
    >
      <text x={211} y={GROUND + 16}>404</text>
      <text x={290} y={GROUND + 16}>off-by-one</text>
      <text x={366} y={GROUND + 16}>NaN</text>
    </g>
  </svg>
);

export default PlayGlyph;
