// The teaser art that sends a reader from Projects to the Stack. Same 420x140
// strip as its siblings. The stack is a wall of tiles, so the strip is one:
// the tiles drop into the grid a column at a time, then, on a loop, the four
// that carry projects light up in turn with their count — the way The Stars
// sit at the top of the real wall. Every tile is in the colour of a real
// mark from the wall, so the strip reads as the wall rather than a grid.

import { TECH_COLOURS } from '../brand/teaserPalette';

const COLS = 10;
const ROWS = 3;
const SIZE = 30;
const GAP = 8;
const STEP = SIZE + GAP;
const LEFT = (420 - (COLS * STEP - GAP)) / 2;
const TOP = (140 - (ROWS * STEP - GAP)) / 2;

// Seconds. Each star holds the light for a quarter of the loop.
const LOOP = 4.8;

// The four stars, each in its own mark's colour: React, Python, Docker, Django.
const STARS = [
  { col: 1, row: 1, count: 3, colour: '#61dafb' },
  { col: 4, row: 0, count: 5, colour: '#3776ab' },
  { col: 6, row: 2, count: 2, colour: '#2496ed' },
  { col: 8, row: 1, count: 4, colour: '#44b78b' },
];

const TILES = [];
for (let row = 0; row < ROWS; row += 1) {
  for (let col = 0; col < COLS; col += 1) {
    TILES.push({
      key: `${row}-${col}`,
      x: LEFT + col * STEP,
      y: TOP + row * STEP,
      // A stride that is coprime with the palette, so no two neighbours in a
      // row or a column share a colour.
      colour: TECH_COLOURS[(col * 3 + row * 5) % TECH_COLOURS.length],
      // Bottom row lands first, so the wall is built up rather than hung down.
      delay: col * 0.05 + (ROWS - 1 - row) * 0.12,
    });
  }
}

const StackTiles = () => (
  <div className="stack-tiles" aria-hidden="true">
    <svg className="st-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      {TILES.map(({ key, x, y, colour, delay }) => (
        <rect
          key={key}
          className="st-tile"
          x={x}
          y={y}
          width={SIZE}
          height={SIZE}
          rx="7"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeOpacity="0.95"
          strokeWidth="1.5"
          style={{ color: colour, animationDelay: `${delay}s` }}
        />
      ))}

      {STARS.map(({ col, row, count, colour }, index) => {
        const x = LEFT + col * STEP;
        const y = TOP + row * STEP;
        return (
          <g
            key={`${col}-${row}`}
            className="st-star"
            style={{ color: colour, animationDelay: `${1.2 + index * (LOOP / STARS.length)}s` }}
          >
            <rect x={x} y={y} width={SIZE} height={SIZE} rx="7" fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="2" />
            <circle cx={x + SIZE} cy={y} r="7.5" fill="currentColor" />
            <text className="st-count" x={x + SIZE} y={y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700">
              {count}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
);

export default StackTiles;
