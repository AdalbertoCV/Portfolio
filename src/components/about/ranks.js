/*
 * The ranks of The Stars. A technology's rank is how many projects stand behind
 * it in the catalogue (PROJECT_TECH), the way a rank in a game is how much you
 * have played: the more work behind a mark, the higher it sits and the more it
 * shines. The thresholds live here so moving one is moving one number, and the
 * rows of the panel, the emblems and the tiles all read the same list.
 *
 * Highest first. A technology has the first rank whose `min` it reaches, so the
 * last entry's `min` of 1 is what "has any project at all" means.
 *
 * `tone` and `deep` are the two ends of the rank's gradient. The rank is shown by
 * colour alone (and by the size of the tile), never by name: the ids are for the
 * code and for a screen reader.
 */
export const RANKS = [
  { id: 'diamond', min: 6, tone: '#8feaff', deep: '#2bb0e6' },
  { id: 'gold', min: 5, tone: '#fbd55c', deep: '#c98a0c' },
  { id: 'silver', min: 4, tone: '#dfe5ee', deep: '#8793a6' },
  { id: 'bronze', min: 2, tone: '#eba070', deep: '#9a5a2c' },
  { id: 'iron', min: 1, tone: '#9aa3af', deep: '#586069' },
];

// The rank for a number of projects, or null for none.
export const rankFor = (count) => RANKS.find((rank) => count >= rank.min) || null;
