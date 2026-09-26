// A small moving scene per interest card, drawn in the card's tone. Each one
// is the subject doing its own thing — a bulb switching on, a chart climbing,
// electrons in orbit, a scanner crossing a shield, a route being connected,
// an equaliser, a heartbeat, a turning globe — rather than one entrance
// applied to eight cards. They loop quietly, run only while the grid is on
// screen (.is-live, set by the grid) and stand still under reduced motion.

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

const ORBIT = 'M34 32a26 9 0 1 0 52 0a26 9 0 1 0 -52 0';
const ROUTE = 'M22 46 L48 20 L74 40 L98 16';
const EQUALISER = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const SCENES = {
  // The filament catches, the glass fills with light, the rays pulse out.
  innovation: (
    <svg {...base}>
      <circle className="ia-glow" cx="60" cy="25" r="15" fill="currentColor" stroke="none" />
      <path d="M60 10a14 14 0 0 1 8.4 25.2c-1.6 1.2-2.4 2.8-2.4 4.8H54c0-2-.8-3.6-2.4-4.8A14 14 0 0 1 60 10z" />
      <path d="M54.5 45h11M56 50h8" />
      <path className="ia-filament" d="M55.5 30l2.2-4.5 2.3 4.5 2.3-4.5 2.2 4.5" />
      {[
        'M60 1.5v3.5',
        'M41 9.5l2.6 2.6',
        'M79 9.5l-2.6 2.6',
        'M34.5 25h3.5',
        'M82 25h3.5',
      ].map((d, index) => (
        <path key={d} className="ia-ray" d={d} style={{ animationDelay: `${index * 0.12}s` }} />
      ))}
    </svg>
  ),

  // Four quarters grow in turn, then the trend line draws over them.
  business: (
    <svg {...base}>
      <path d="M16 55h88" strokeOpacity="0.5" />
      {[
        [26, 14],
        [44, 22],
        [62, 18],
        [80, 32],
      ].map(([x, h], index) => (
        <rect
          key={x}
          className="ia-bar"
          x={x}
          y={55 - h}
          width="11"
          height={h}
          rx="2.5"
          fill="currentColor"
          fillOpacity="0.28"
          style={{ animationDelay: `${index * 0.18}s` }}
        />
      ))}
      <path className="ia-trend" d="M24 38 L46 29 L64 33 L92 12" />
      <path className="ia-trend-head" d="M85.5 12H92v6.5" />
    </svg>
  ),

  // Three orbits, an electron on each, never in step.
  science: (
    <svg {...base}>
      <circle cx="60" cy="32" r="4.5" fill="currentColor" stroke="none" />
      {[0, 60, 120].map((angle, index) => (
        <g key={angle} transform={`rotate(${angle} 60 32)`}>
          <path d={ORBIT} strokeOpacity="0.4" strokeWidth="1.5" />
          <circle
            className="ia-electron"
            cx="0"
            cy="0"
            r="3"
            fill="currentColor"
            stroke="none"
            style={{ offsetPath: `path("${ORBIT}")`, animationDelay: `${index * -1.1}s` }}
          />
        </g>
      ))}
    </svg>
  ),

  // A scan line crosses the shield top to bottom; the keyhole answers.
  security: (
    <svg {...base}>
      <defs>
        <clipPath id="iaShield">
          <path d="M60 6 L80 13 V28 C80 40 72 49 60 53 C48 49 40 40 40 28 V13 Z" />
        </clipPath>
      </defs>
      <path d="M60 6 L80 13 V28 C80 40 72 49 60 53 C48 49 40 40 40 28 V13 Z" fill="currentColor" fillOpacity="0.12" />
      <g clipPath="url(#iaShield)">
        <rect className="ia-scan" x="38" y="4" width="44" height="3" fill="currentColor" stroke="none" />
      </g>
      <g className="ia-keyhole">
        <circle cx="60" cy="27" r="4" />
        <path d="M60 31v7" />
      </g>
      <path className="ia-ping" d="M92 20a9 9 0 0 1 0 14M99 15a16 16 0 0 1 0 24" strokeWidth="1.6" />
      <path className="ia-ping ia-ping-left" d="M28 20a9 9 0 0 0 0 14M21 15a16 16 0 0 0 0 24" strokeWidth="1.6" />
    </svg>
  ),

  // The route is built one leg at a time and a spark travels it.
  learning: (
    <svg {...base}>
      <path d={ROUTE} strokeOpacity="0.25" />
      <path className="ia-route" d={ROUTE} />
      {[
        [22, 46],
        [48, 20],
        [74, 40],
        [98, 16],
      ].map(([cx, cy], index) => (
        <circle
          key={cx}
          className="ia-node"
          cx={cx}
          cy={cy}
          r="5"
          fill="currentColor"
          fillOpacity="0.25"
          style={{ animationDelay: `${index * 0.55}s` }}
        />
      ))}
      <circle className="ia-spark" cx="0" cy="0" r="3" fill="currentColor" stroke="none" style={{ offsetPath: `path("${ROUTE}")` }} />
    </svg>
  ),

  // An equaliser: nine bars, each on its own tempo.
  arts: (
    <svg {...base}>
      {EQUALISER.map((index) => (
        <rect
          key={index}
          className="ia-eq"
          x={22 + index * 9.2}
          y="12"
          width="5.4"
          height="40"
          rx="2.7"
          fill="currentColor"
          stroke="none"
          style={{
            animationDuration: `${0.9 + ((index * 7) % 5) * 0.16}s`,
            animationDelay: `${((index * 3) % 4) * -0.21}s`,
          }}
        />
      ))}
    </svg>
  ),

  // A heartbeat: the trace is faint, the beat runs across it.
  sports: (
    <svg {...base}>
      <path d="M6 34h28l5-10 6 22 6-32 6 28 4-8h53" strokeOpacity="0.22" />
      <path className="ia-beat" d="M6 34h28l5-10 6 22 6-32 6 28 4-8h53" strokeWidth="2.4" />
    </svg>
  ),

  // A globe turning: the meridians close and open like a slow spin.
  culture: (
    <svg {...base}>
      <circle cx="60" cy="32" r="23" fill="currentColor" fillOpacity="0.1" />
      <path d="M37 32h46M40.5 20h39M40.5 44h39" strokeOpacity="0.45" strokeWidth="1.5" />
      <ellipse className="ia-meridian" cx="60" cy="32" rx="23" ry="23" />
      <ellipse className="ia-meridian ia-meridian-late" cx="60" cy="32" rx="23" ry="23" />
    </svg>
  ),
};

const InterestArt = ({ name }) =>
  SCENES[name] ? (
    <div className="interest-art" data-art={name}>
      {SCENES[name]}
    </div>
  ) : null;

export default InterestArt;
