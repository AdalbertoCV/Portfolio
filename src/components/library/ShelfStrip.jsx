// The teaser art that sends a reader from the Stack to the Library. Same
// 420x140 strip as its siblings. The shelf draws itself, the spines slide in
// and stand on it, then, on a loop, one leans out the way a book does when
// somebody reaches for it.

const SHELF_Y = 122;

// Widths and heights by hand, not by a seed: a shelf reads as real when the
// rhythm is uneven in the way books are, and a hash does that badly.
const SPINES = [
  [18, 78], [14, 64], [22, 88], [16, 70], [20, 92], [13, 58], [19, 80],
  [24, 72], [15, 86], [17, 66], [21, 90], [14, 74], [18, 62], [23, 84],
];
const GAP = 3;
const PULLED = 8;

const TOTAL = SPINES.reduce((sum, [w]) => sum + w + GAP, -GAP);
const LEFT = (420 - TOTAL) / 2;

const BOOKS = SPINES.reduce((books, [width, height], index) => {
  const x = index === 0 ? LEFT : books[index - 1].x + books[index - 1].width + GAP;
  books.push({ x, width, height, index, shade: 0.06 + ((index * 5) % 7) * 0.025 });
  return books;
}, []);

const ShelfStrip = () => (
  <div className="shelf-strip" aria-hidden="true">
    <svg className="ss-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path className="ss-shelf" d={`M${LEFT - 14} ${SHELF_Y} H${LEFT + TOTAL + 14}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {BOOKS.map(({ x, width, height, index, shade }) => (
        <g
          key={index}
          className={`ss-book${index === PULLED ? ' ss-pulled' : ''}`}
          style={{ animationDelay: index === PULLED ? `${0.5 + index * 0.06}s, 2s` : `${0.5 + index * 0.06}s` }}
        >
          <rect x={x} y={SHELF_Y - height - 1.5} width={width} height={height} rx="2.5" fill="currentColor" fillOpacity={shade} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d={`M${x + 3} ${SHELF_Y - height + 10} H${x + width - 3} M${x + 3} ${SHELF_Y - 14} H${x + width - 3}`} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  </div>
);

export default ShelfStrip;
