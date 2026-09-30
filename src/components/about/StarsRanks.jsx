import { PROJECT_TECH } from '../projects/catalogue';
import TechMark from './TechMark';
import { RANKS, rankFor, rankSpan } from './ranks';

// The Stars, laid out by rank. The group used to be one grid of tiles in the
// order of their counts, which said "most used first" only to somebody who read
// the little numbers. Now each rank is a row with its own emblem, drawn like the
// badge of a ladder, and the tiles inside get smaller and quieter down the
// ladder: the marks with the most work behind them are the largest and the ones
// that shine. The tiles themselves are the same tiles and still open the
// projects they stand for.

// A shield, and on it what makes the rank that rank: a gem, a star, two
// chevrons, one chevron, a dot. Drawn, not an icon font, so the gradient ends
// can be the rank's own.
const MARKS = {
  diamond: (
    <>
      <path d="M20 13.5 28 20l-8 13-8-13z" />
      <path d="M12 20h16M16 20l4-6.5 4 6.5" className="rank-cut" />
    </>
  ),
  gold: <path d="m20 13 2.7 5.6 6.1.9-4.4 4.3 1 6.1L20 27l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  silver: <path d="M13 22.5 20 16.5l7 6M13 30l7-6 7 6" className="rank-line" />,
  bronze: <path d="M13 28 20 21l7 7" className="rank-line" />,
  iron: <circle cx="20" cy="23" r="3.4" />,
};

export const RankEmblem = ({ rank }) => (
  <svg className="rank-emblem" viewBox="0 0 40 46" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`rank-g-${rank.id}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={rank.tone} />
        <stop offset="1" stopColor={rank.deep} />
      </linearGradient>
    </defs>
    <path
      className="rank-shield"
      d="M20 2 34 8v15c0 9-6 16-14 20C12 39 6 32 6 23V8z"
      fill={`url(#rank-g-${rank.id})`}
    />
    <g className="rank-mark" style={{ '--rk-ink': rank.ink }}>
      {MARKS[rank.id]}
    </g>
  </svg>
);

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
      {rows.map(({ rank, items: members }) => {
        const { min, max } = rankSpan(rank);
        const span = max === null ? `${min}+` : max === min ? `${min}` : `${min}–${max}`;
        return (
          <section
            className="rank-row"
            data-rank={rank.id}
            key={rank.id}
            style={{ '--rk-tone': rank.tone, '--rk-deep': rank.deep }}
            aria-label={t(`cv.ranks.${rank.id}`)}
          >
            <header className="rank-head">
              <RankEmblem rank={rank} />
              <h3 className="rank-name">{t(`cv.ranks.${rank.id}`)}</h3>
              <span className="rank-span">
                {span} {max === min && min === 1 ? t('cv.ranksProject') : t('cv.ranksProjects')}
              </span>
            </header>
            <ul className="stack-marks">
              {members.map((item) => (
                <TechMark item={item} t={t} key={item.name} />
              ))}
            </ul>
          </section>
        );
      })}
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
