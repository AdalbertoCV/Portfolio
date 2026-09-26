// The teaser art that sends a reader from Projects to the Stack. Same 420x140
// strip as its siblings. The stack is a wall of tiles, so the strip is one:
// the tiles drop into the grid a column at a time, then, on a loop, the four
// that carry projects light up in turn with their count — the way The Stars
// sit at the top of the real wall.

const COLS = 10;
const ROWS = 3;
const SIZE = 30;
const GAP = 8;
const STEP = SIZE + GAP;
const LEFT = (420 - (COLS * STEP - GAP)) / 2;
const TOP = (140 - (ROWS * STEP - GAP)) / 2;

// Seconds. Each star holds the light for a quarter of the loop.
const LOOP = 4.8;

const STARS = [
  { col: 1, row: 1, count: 3 },
  { col: 4, row: 0, count: 5 },
  { col: 6, row: 2, count: 2 },
  { col: 8, row: 1, count: 4 },
];

const TILES = [];
for (let row = 0; row < ROWS; row += 1) {
  for (let col = 0; col < COLS; col += 1) {
    TILES.push({
      key: `${row}-${col}`,
      x: LEFT + col * STEP,
      y: TOP + row * STEP,
      // Bottom row lands first, so the wall is built up rather than hung down.
      delay: col * 0.05 + (ROWS - 1 - row) * 0.12,
    });
  }
}

const StackTiles = () => (
  <div className="stack-tiles" aria-hidden="true">
    <svg className="st-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      {TILES.map(({ key, x, y, delay }) => (
        <rect
          key={key}
          className="st-tile"
          x={x}
          y={y}
          width={SIZE}
          height={SIZE}
          rx="7"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {STARS.map(({ col, row, count }, index) => {
        const x = LEFT + col * STEP;
        const y = TOP + row * STEP;
        return (
          <g
            key={`${col}-${row}`}
            className="st-star"
            style={{ animationDelay: `${1.2 + index * (LOOP / STARS.length)}s` }}
          >
            <rect x={x} y={y} width={SIZE} height={SIZE} rx="7" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="2" />
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
