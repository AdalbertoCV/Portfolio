// A small moving scene per decision, in the tone of the room it was made in. Each
// one is the decision doing its own thing — a platform moving between clouds, a
// price coming out of a formula, one block splitting into services, two lanes
// running at once, a fan of directions with one that goes deep — and not one
// entrance applied to five entries. They are the size of a margin note, loop
// quietly, run only while the log is on screen (.is-live, set by the page) and
// stand still under reduced motion. Nothing here explains the decision; the
// entry does that. This is only so the page has something alive in its margin.

const base = {
  viewBox: '0 0 120 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

// One tone per room, so an entry and its scene are the same colour.
export const TONES = {
  radii: '#22d3ee',
  rbr: '#34d399',
  own: '#facc15',
  personal: '#f472b6',
  freelance: '#fb923c',
};

const CLOUD = 'M14 42h24a7 7 0 0 0 .8-14A10 10 0 0 0 19.5 30 6 6 0 0 0 14 42z';

const SCENES = {
  // Moving a platform from one cloud to another: packets cross, and the one they
  // arrive at fills in as the one they left thins out.
  cloud: (
    <svg {...base}>
      <path className="da-cloud-old" d={CLOUD} />
      <path className="da-cloud-new" d={CLOUD} transform="translate(60 0)" />
      <path d="M46 36h28" strokeDasharray="2 4" strokeOpacity="0.55" />
      {[0, 1, 2].map((index) => (
        <circle
          key={index}
          className="da-packet"
          cx="46"
          cy="36"
          r="2.4"
          fill="currentColor"
          stroke="none"
          style={{ animationDelay: `${index * 0.5}s` }}
        />
      ))}
    </svg>
  ),

  // Pricing with no data to train on: a few scattered points that say nothing,
  // and a clean curve from the domain drawing itself through them to a price.
  quoter: (
    <svg {...base}>
      <path d="M14 54V10M14 54h94" strokeOpacity="0.5" />
      {[
        [30, 46],
        [46, 40],
        [62, 34],
      ].map(([x, y], index) => (
        <circle
          key={x}
          className="da-dot"
          cx={x}
          cy={y}
          r="2.4"
          fill="currentColor"
          stroke="none"
          style={{ animationDelay: `${index * 0.3}s` }}
        />
      ))}
      <path className="da-curve" pathLength="1" d="M18 51C42 48 68 32 102 14" />
      <circle className="da-end" cx="102" cy="14" r="4" fill="currentColor" stroke="none" />
    </svg>
  ),

  // One block that splits into separate services, one per responsibility, and the
  // links between them light up once they are apart.
  services: (
    <svg {...base}>
      <rect className="da-monolith" x="34" y="16" width="52" height="32" rx="5" />
      <path className="da-link" d="M34 32L50 22M70 22L92 38" strokeOpacity="0.6" />
      <rect className="da-service da-service-a" x="12" y="22" width="24" height="20" rx="4" style={{ '--dx': '38px', '--dy': '0px' }} />
      <rect className="da-service da-service-b" x="48" y="10" width="24" height="20" rx="4" style={{ '--dx': '0px', '--dy': '14px' }} />
      <rect className="da-service da-service-c" x="84" y="30" width="24" height="20" rx="4" style={{ '--dx': '-38px', '--dy': '-6px' }} />
    </svg>
  ),

  // Two lanes running at once, at their own speeds: the work at Radii and the
  // things of my own.
  parallel: (
    <svg {...base}>
      <path d="M12 22h96M12 44h96" strokeOpacity="0.32" />
      <circle cx="12" cy="22" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="44" r="3.2" fill="currentColor" stroke="none" />
      <path d="M104 18l4 4-4 4M104 40l4 4-4 4" strokeOpacity="0.6" />
      {[0, 1, 2].map((index) => (
        <circle
          key={`a${index}`}
          className="da-lane da-lane-a"
          cx="14"
          cy="22"
          r="2.6"
          fill="currentColor"
          stroke="none"
          style={{ animationDelay: `${index * 0.75}s` }}
        />
      ))}
      {[0, 1].map((index) => (
        <circle
          key={`b${index}`}
          className="da-lane da-lane-b"
          cx="14"
          cy="44"
          r="2.6"
          fill="currentColor"
          stroke="none"
          style={{ animationDelay: `${index * 1.4}s` }}
        />
      ))}
    </svg>
  ),

  // Breadth: a fan of directions from one point, with one of them going deep.
  breadth: (
    <svg {...base}>
      {[
        [58, 10],
        [70, 21],
        [62, 34],
        [70, 46],
        [58, 56],
      ].map(([x, y], index) => (
        <g key={y}>
          <path d={`M18 32L${x} ${y}`} strokeOpacity="0.5" />
          <circle
            className="da-tip"
            cx={x}
            cy={y}
            r="2.6"
            fill="currentColor"
            stroke="none"
            style={{ animationDelay: `${index * 0.25}s` }}
          />
        </g>
      ))}
      <path className="da-deep" pathLength="1" d="M70 21H102" />
      <circle className="da-deep-end" cx="102" cy="21" r="3.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="32" r="4.4" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const DecisionArt = ({ name, where }) => {
  const scene = SCENES[name];
  if (!scene) return null;
  return (
    <span className="dec-art" style={{ '--tone': TONES[where] || TONES.radii }} aria-hidden="true">
      {scene}
    </span>
  );
};

export default DecisionArt;
