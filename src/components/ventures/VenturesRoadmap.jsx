import { MoonphaseMark } from '../marks/MoonphaseMark';
import { StackSelectMark } from '../marks/StackSelectMark';
import { BRAND_CORE } from '../brand/teaserPalette';

// The teaser that sends a reader from the timeline to Ventures. A road that
// climbs through milestones and forks into the two companies, each branch
// ending in that company's actual mark — so the strip previews the destination
// rather than decorating the paragraph.
//
// The road draws itself once on reveal. After that, sparks run the climb on a
// loop and each milestone lights as one passes: the delays below are derived
// from where the milestone sits along the path, so the lighting is caused by
// the spark rather than merely happening near it.

// Declared once and shared: the <path> renders it, and the sparks follow it
// through `offset-path`. Two copies of this string would drift apart.
const ROAD = 'M18 120 C 62 116, 88 104, 122 88 S 190 60, 238 48';

const ROAD_START_X = 18;
const ROAD_SPAN_X = 220;

// Seconds. The sparks only start once the road has finished drawing.
const DRAW_DELAY = 1.2;
const RUN_DURATION = 3.2;

const MILESTONES = [
  [55, 113],
  [100, 96],
  [150, 74],
  [198, 57],
];

const VenturesRoadmap = () => (
  <div className="ventures-roadmap" aria-hidden="true">
    <svg className="vr-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      {/* The road so far is Freelance's amber, the incubator both companies
          came out of, warming towards the fork. Each branch then takes the
          colour of the company it leads to. */}
      <defs>
        <linearGradient id="vrRoad" gradientUnits="userSpaceOnUse" x1="18" y1="0" x2="238" y2="0">
          <stop offset="0" stopColor={BRAND_CORE.freelance} />
          <stop offset="1" stopColor={BRAND_CORE.case} />
        </linearGradient>
      </defs>

      {/* The road so far, climbing left to right. */}
      <path
        className="vr-path vr-path-main"
        d={ROAD}
        fill="none"
        stroke="url(#vrRoad)"
        strokeOpacity="0.95"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* The fork: two companies out of one trajectory. */}
      <path
        className="vr-path vr-path-up"
        data-brand="moonphase"
        d="M238 48 C 282 38, 312 32, 352 30"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        className="vr-path vr-path-down"
        data-brand="stackselect"
        d="M238 48 C 282 58, 312 78, 352 104"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      {MILESTONES.map(([cx, cy], index) => {
        // How far along the climb this milestone sits, so it can light exactly
        // as a spark reaches it.
        const progress = (cx - ROAD_START_X) / ROAD_SPAN_X;
        return (
          <circle
            key={`${cx}-${cy}`}
            className="vr-milestone"
            cx={cx}
            cy={cy}
            r="4"
            fill="currentColor"
            fillOpacity="0.85"
            style={{
              color: BRAND_CORE.freelance,
              // Two animations: the one-off pop as the road draws, then the
              // repeating flash as each spark passes.
              animationDelay: `${0.25 + index * 0.12}s, ${DRAW_DELAY + progress * RUN_DURATION}s`,
            }}
          />
        );
      })}

      {/* Where the fork happens — the point the whole strip is about. */}
      <circle
        className="vr-junction"
        cx="238"
        cy="48"
        r="6.5"
        fill="currentColor"
        style={{ color: BRAND_CORE.case, animationDelay: `0.95s, ${DRAW_DELAY + RUN_DURATION * 0.97}s` }}
      />

      {/* The sparks. `cx`/`cy` stay at the origin because `offset-path` places
          them; any offset here would be added on top of the path position. */}
      {[0, 1].map((index) => (
        <g key={index} style={{ color: BRAND_CORE.freelance }}>
          <circle
            className="vr-spark vr-spark-glow"
            cx="0"
            cy="0"
            r="9"
            fill="currentColor"
            style={{
              offsetPath: `path("${ROAD}")`,
              animationDelay: `${DRAW_DELAY + index * (RUN_DURATION / 2)}s`,
            }}
          />
          <circle
            className="vr-spark"
            cx="0"
            cy="0"
            r="3"
            fill="currentColor"
            style={{
              offsetPath: `path("${ROAD}")`,
              animationDelay: `${DRAW_DELAY + index * (RUN_DURATION / 2)}s`,
            }}
          />
        </g>
      ))}
    </svg>

    {/* The two destinations, each in its own colour scope so the marks arrive
        in the colours they use on their own pages. */}
    <span className="vr-end vr-end-up" data-brand="moonphase">
      <MoonphaseMark />
    </span>
    <span className="vr-end vr-end-down" data-brand="stackselect">
      <StackSelectMark />
    </span>
  </div>
);

export default VenturesRoadmap;
