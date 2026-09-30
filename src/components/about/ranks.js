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
 * `tone` and `deep` are the two ends of the tier's gradient and `ink` is what is
 * drawn on the emblem over it, chosen for contrast (a pale silver needs a dark
 * mark, a deep bronze a light one is not needed).
 */
export const RANKS = [
  { id: 'diamond', min: 6, tone: '#8feaff', deep: '#2bb0e6', ink: '#05303d' },
  { id: 'gold', min: 5, tone: '#fbd55c', deep: '#c98a0c', ink: '#4a2f00' },
  { id: 'silver', min: 4, tone: '#dfe5ee', deep: '#8793a6', ink: '#2a3340' },
  { id: 'bronze', min: 2, tone: '#eba070', deep: '#9a5a2c', ink: '#3a1d08' },
  { id: 'iron', min: 1, tone: '#9aa3af', deep: '#586069', ink: '#f2f4f7' },
];

// The rank for a number of projects, or null for none.
export const rankFor = (count) => RANKS.find((rank) => count >= rank.min) || null;

// The span of project counts a rank covers, as text parts: "6+", "5", "2–3".
export const rankSpan = (rank) => {
  const index = RANKS.indexOf(rank);
  if (index === 0) return { min: rank.min, max: null };
  const max = RANKS[index - 1].min - 1;
  return { min: rank.min, max };
};
