// Most of these repositories are APIs, pipelines and data structures — there is
// nothing to photograph. Rather than shipping a grid of identical grey
// placeholders, each card draws its own cover: a Truchet tiling seeded by the
// repository name, tinted with its primary language colour.
//
// Truchet tiles are quarter-arcs placed at one of four rotations. Whatever the
// seed, adjacent arcs meet at cell edges, so the pattern always resolves into
// continuous flowing lines — it cannot generate an ugly result, which is the
// property that makes it safe to hand over to a hash.
//
// The same name always produces the same cover, so a repository keeps its
// identity across reloads and languages.

// GitHub's own language colours, so the accent matches what the repo page
// shows. Anything unlisted falls back to the site's neutral.
const LANGUAGE_COLORS = {
  Java: '#b07219',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  PLSQL: '#dad8d8',
  R: '#198CE7',
  Shell: '#89e051',
};

export const languageColor = (language) => LANGUAGE_COLORS[language] || '#8b8b94';

// FNV-1a: small, fast, and well spread for short strings.
export const hashOf = (text) => {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
};

// mulberry32 — a tiny deterministic PRNG, seeded from the hash above.
export const makeRandom = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const COLS = 8;
const ROWS = 4;
const CELL = 40;

const ProjectGlyph = ({ name, language }) => {
  const color = languageColor(language);
  const random = makeRandom(hashOf(name));

  const cells = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const x = col * CELL;
      const y = row * CELL;
      const roll = random();
      const flip = random() < 0.5;
      const opacity = 0.25 + random() * 0.55;

      if (roll < 0.62) {
        // The Truchet tile proper: two opposite quarter-arcs.
        const d = flip
          ? `M${x} ${y + CELL / 2} A ${CELL / 2} ${CELL / 2} 0 0 1 ${x + CELL / 2} ${y}
             M${x + CELL / 2} ${y + CELL} A ${CELL / 2} ${CELL / 2} 0 0 1 ${x + CELL} ${y + CELL / 2}`
          : `M${x + CELL / 2} ${y} A ${CELL / 2} ${CELL / 2} 0 0 1 ${x + CELL} ${y + CELL / 2}
             M${x} ${y + CELL / 2} A ${CELL / 2} ${CELL / 2} 0 0 1 ${x + CELL / 2} ${y + CELL}`;
        cells.push(
          <path key={`${row}-${col}`} d={d} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="2" />
        );
      } else if (roll < 0.84) {
        // A straight run, so the pattern has some rest between the curves.
        const d = flip
          ? `M${x + CELL / 2} ${y} V${y + CELL}`
          : `M${x} ${y + CELL / 2} H${x + CELL}`;
        cells.push(
          <path key={`${row}-${col}`} d={d} fill="none" stroke={color} strokeOpacity={opacity * 0.7} strokeWidth="2" />
        );
      } else {
        // A node: where lines would otherwise merge into noise, a dot reads as
        // a junction and gives the eye somewhere to land.
        cells.push(
          <circle
            key={`${row}-${col}`}
            cx={x + CELL / 2}
            cy={y + CELL / 2}
            r="3"
            fill={color}
            fillOpacity={opacity}
          />
        );
      }
    }
  }

  return (
    <svg
      className="project-glyph"
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width={COLS * CELL} height={ROWS * CELL} fill={color} fillOpacity="0.07" />
      {cells}
    </svg>
  );
};

export default ProjectGlyph;
