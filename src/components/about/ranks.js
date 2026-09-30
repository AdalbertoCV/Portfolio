/*
 * The ranks of The Stars, which are colours and nothing else. A technology's rank
 * is how many projects stand behind it in the catalogue (PROJECT_TECH), the way a
 * rank in a game is how much you have played, and it shows as the colour of its
 * tile: a border in the rank's gradient and the count in the same colour. There
 * is no league name on the page, no row, no divider and no change of size: the
 * tiles are in one grid, in the order they were already in (most used first), and
 * the colour is all that says how much work is behind each.
 *
 * Highest first. A technology has the first rank whose `min` it reaches, so the
 * last entry's `min` of 1 is what "has any project at all" means. `tone` and
 * `deep` are the two ends of the gradient; the ids are for the code and for a
 * screen reader. Moving a threshold is moving one number.
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
