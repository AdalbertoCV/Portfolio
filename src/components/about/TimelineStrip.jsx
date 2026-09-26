// The teaser art that sends a reader from About to Experience. The sibling of
// VenturesRoadmap and ProjectsMosaic: same 420x140 strip, same "draw in on
// reveal, then loop" shape. Experience is a timeline, so the strip is one: the
// line draws itself, the roles stand up off it, and a pulse runs the line on a
// loop lighting each milestone as it passes. The delays come from where each
// milestone sits along the run, so the lighting is caused by the pulse.
//
// Each milestone is in the colour of the role it stands for, oldest first, and
// the line runs through those colours on its way to the present.

import { BRAND_CORE } from '../brand/teaserPalette';

const START = 24;
const END = 396;
const RUN = END - START;
const Y = 70;

// Seconds. The pulse only starts once the line has finished drawing.
const DRAW_DELAY = 1.1;
const PULSE_DURATION = 3.2;

// tsLit peaks 6% into its cycle; pull the delay back by that much so the
// milestone is brightest as the pulse reaches it, not after.
const LIT_PEAK = 0.06;

// Alternating up and down, like roles on the page they point at.
const MILESTONES = [
  { x: 64, up: true, brand: 'labsol' },
  { x: 138, up: false, brand: 'case' },
  { x: 212, up: true, brand: 'freelance' },
  { x: 286, up: false, brand: 'evodeps' },
  { x: 360, up: true, brand: 'radii' },
];

const TimelineStrip = () => (
  <div className="timeline-strip" aria-hidden="true">
    <svg className="ts-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        <linearGradient id="tsLine" gradientUnits="userSpaceOnUse" x1={START} y1="0" x2={END} y2="0">
          {MILESTONES.map(({ x, brand }) => (
            <stop key={brand} offset={(x - START) / RUN} stopColor={BRAND_CORE[brand]} />
          ))}
        </linearGradient>
      </defs>

      <path className="ts-line" d={`M${START} ${Y} H${END}`} fill="none" stroke="url(#tsLine)" strokeWidth="3" strokeLinecap="round" />

      {MILESTONES.map(({ x, up, brand }, index) => {
        const stemEnd = up ? Y - 26 : Y + 26;
        const cardY = up ? stemEnd - 16 : stemEnd;
        const reach = (x - START) / RUN;
        return (
          <g key={x} data-brand={brand}>
            <g className="ts-role" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
              <path d={`M${x} ${Y} V${stemEnd}`} stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.5" />
              <rect x={x - 22} y={cardY} width="44" height="16" rx="4" fill="currentColor" fillOpacity="0.32" stroke="currentColor" strokeOpacity="0.95" strokeWidth="1.5" />
              <path d={`M${x - 15} ${cardY + 8} H${x + 9}`} stroke="currentColor" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
            </g>
            <circle
              className="ts-milestone"
              cx={x}
              cy={Y}
              r="6"
              fill="currentColor"
              style={{ animationDelay: `${0.6 + index * 0.1}s, ${DRAW_DELAY + (reach - LIT_PEAK) * PULSE_DURATION}s` }}
            />
          </g>
        );
      })}

      <circle className="ts-pulse" cx={START} cy={Y} r="4" fill="currentColor" />
    </svg>
  </div>
);

export default TimelineStrip;
