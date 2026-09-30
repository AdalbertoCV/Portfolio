import { PROJECT_TECH } from '../projects/catalogue';
import TechMark from './TechMark';
import { RANKS, rankFor } from './ranks';

// The Stars, laid out by rank. The group used to be one grid of tiles in the
// order of their counts, which said "most used first" only to somebody who read
// the little numbers. Now each rank is a row, and the rank is carried by colour
// alone: no league names and no labels, only the colour of the tile, the colour
// of the rule above the row, and the size, which falls as the work behind a mark
// does. The tiles are the same tiles and still open the projects they stand for.

const StarsRanks = ({ items, t }) => {
  // Keep the order the group was written in inside each rank: it is already
  // most-used first.
  const rows = RANKS.map((rank) => ({
    rank,
    items: items.filter((item) => rankFor(PROJECT_TECH[item.name] || 0)?.id === rank.id),
  })).filter((row) => row.items.length);
  // Tiles with no projects behind them have no rank; in this group there are none,
  // but a tile that arrives here without one should still be on the page.
  const unranked = items.filter((item) => !rankFor(PROJECT_TECH[item.name] || 0));

  return (
    <div className="ranks">
      {rows.map(({ rank, items: members }) => (
        <section
          className="rank-row"
          data-rank={rank.id}
          key={rank.id}
          style={{ '--rk-tone': rank.tone, '--rk-deep': rank.deep }}
          // Not shown, but a screen reader is told which rank the row is.
          aria-label={t(`cv.ranks.${rank.id}`)}
        >
          <div className="rank-rule" aria-hidden="true" />
          <ul className="stack-marks">
            {members.map((item) => (
              <TechMark item={item} t={t} key={item.name} />
            ))}
          </ul>
        </section>
      ))}
      {unranked.length ? (
        <ul className="stack-marks">
          {unranked.map((item) => (
            <TechMark item={item} t={t} key={item.name} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default StarsRanks;
