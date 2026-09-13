import { hashOf, languageColor, makeRandom } from './ProjectGlyph';

// The teaser art that sends a reader from Ventures to Projects. The sibling of
// VenturesRoadmap: same 420x140 strip, same "draw in on reveal, then loop"
// shape, different subject.
//
// A road made sense for Ventures — one trajectory, two companies. A catalogue
// has no trajectory, so this is the catalogue itself: the Truchet tiling the
// project covers are drawn with, at strip scale. The mosaic is not a metaphor
// for the destination, it is the same artwork the destination is made of.
//
// The mosaic draws itself once on reveal. After that a scanner crosses it on a
// loop and each repository tile lights as it passes: the delays below come
// from where the tile sits along the sweep, so the lighting is caused by the
// scanner rather than merely happening near it.

const COLS = 12;
const ROWS = 4;
const CELL = 35;
const WIDTH = COLS * CELL;

// Seconds. The scanner only starts once the mosaic has finished drawing.
const DRAW_DELAY = 1.15;
const SWEEP_DURATION = 3.2;

// The scanner is slanted, so the row a tile sits in shifts when the beam
// reaches it. Without accounting for that the flashes would fire a column at
// a time and the slant would read as a mistake.
const SLANT = 26;

// skewX tilts the beam left as y grows, so a lower tile is reached later. This
// is the same number the CSS skew uses, kept here because the per-tile delays
// are derived from it.
const SKEW_DEG = SLANT / 3;
const SKEW_SHIFT = Math.tan((SKEW_DEG * Math.PI) / 180);

// How far the beam travels, in viewBox units — it has to clear the right edge
// plus its own half-width. The CSS keyframe moves by exactly this.
const SWEEP_TRAVEL = 446;

// pmLit peaks 6% into its cycle, so the delay is pulled back by that much:
// otherwise the tile reaches full brightness once the beam has already gone
// past it, and the flash reads as an echo rather than as the beam's doing.
const LIT_PEAK = 0.06;

// Six tiles carrying the languages the catalogue actually runs on, in the
// order the catalogue weights them. Placed by hand rather than by the seed:
// they are the reading path across the strip, and a hash spreads them badly
// about one time in three.
const REPOS = [
  { col: 1, row: 2, language: 'Java' },
  { col: 3, row: 0, language: 'Python' },
  { col: 5, row: 3, language: 'JavaScript' },
  { col: 7, row: 1, language: 'CSS' },
  { col: 9, row: 3, language: 'C#' },
  { col: 10, row: 0, language: 'R' },
];

// The same seed every render, so the mosaic is a fixed piece of art rather
// than something that reshuffles on reload — the covers behave the same way.
const random = makeRandom(hashOf('adalberto-cerrillo/projects'));

const TILES = [];
for (let row = 0; row < ROWS; row += 1) {
  for (let col = 0; col < COLS; col += 1) {
    const x = col * CELL;
    const y = row * CELL;
    const roll = random();
    const flip = random() < 0.5;
    const opacity = 0.18 + random() * 0.34;
    const half = CELL / 2;

    // Quarter-arcs at one of four rotations, so adjacent tiles always meet at
    // the cell edge and the pattern resolves into continuous lines.
    const d =
      roll < 0.66
        ? flip
          ? `M${x} ${y + half} A ${half} ${half} 0 0 1 ${x + half} ${y} M${x + half} ${y + CELL} A ${half} ${half} 0 0 1 ${x + CELL} ${y + half}`
          : `M${x + half} ${y} A ${half} ${half} 0 0 1 ${x + CELL} ${y + half} M${x} ${y + half} A ${half} ${half} 0 0 1 ${x + half} ${y + CELL}`
        : flip
          ? `M${x + half} ${y} V${y + CELL}`
          : `M${x} ${y + half} H${x + CELL}`;

    TILES.push({
      key: `${row}-${col}`,
      d,
      opacity: roll < 0.66 ? opacity : opacity * 0.7,
      // Diagonal, so the mosaic arrives as one sweep of light across the strip
      // instead of a column marching left to right.
      delay: (col + row) * 0.045,
    });
  }
}

const ProjectsMosaic = () => (
  <div className="projects-mosaic" aria-hidden="true">
    <svg className="pm-track" viewBox={`0 0 ${WIDTH} ${ROWS * CELL}`} preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        {/* The scanner's light: hard centre, falling away on both sides, so it
            reads as a beam rather than as a moving rectangle. */}
        <linearGradient id="pmBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {TILES.map(({ key, d, opacity, delay }) => (
        <path
          key={key}
          className="pm-tile"
          d={d}
          fill="none"
          stroke="currentColor"
          strokeOpacity={opacity}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* The scanner. Slanted to match the diagonal the mosaic drew itself on. */}
      <g className="pm-beam">
        <rect x="-26" y={-SLANT} width="52" height={ROWS * CELL + SLANT * 2} fill="url(#pmBeam)" transform={`skewX(-${SKEW_DEG})`} />
      </g>

      {REPOS.map(({ col, row, language }) => {
        const cx = col * CELL + CELL / 2;
        const cy = row * CELL + CELL / 2;
        // Where the slanted beam reaches this tile, as a fraction of the run.
        const reach = (cx + SKEW_SHIFT * cy) / SWEEP_TRAVEL;
        return (
          <rect
            key={language}
            className="pm-repo"
            x={cx - 5.5}
            y={cy - 5.5}
            width="11"
            height="11"
            rx="3"
            fill="currentColor"
            style={{
              // fill and the lit glow both resolve from this, so the flash is
              // the language's own colour rather than the strip's grey.
              color: languageColor(language),
              // Two animations: the one-off pop as the mosaic draws, then the
              // repeating flash as the scanner reaches this tile.
              animationDelay: `${0.4 + (col + row) * 0.045}s, ${DRAW_DELAY + (reach - LIT_PEAK) * SWEEP_DURATION}s`,
            }}
          />
        );
      })}
    </svg>
  </div>
);

export default ProjectsMosaic;
