import { MoonphaseMark } from '../marks/MoonphaseMark';
import { StackSelectMark } from '../marks/StackSelectMark';

// The teaser that sends a reader from the timeline to Ventures. A road that
// climbs through milestones and then forks into the two companies, with each
// branch ending in that company's actual mark — so the strip is a preview of
// the destination rather than decoration.
//
// It draws itself once, on reveal, rather than looping: this sits at the foot
// of a long page, and a permanent animation down there is something you notice
// while trying to read the paragraph next to it. The keyframes are keyed off
// the `.is-visible` class the reveal observer already adds.

const MILESTONES = [
  [46, 168],
  [110, 150],
  [172, 122],
  [232, 96],
];

const VenturesRoadmap = () => (
  <div className="ventures-roadmap" aria-hidden="true">
    <svg className="vr-track" viewBox="0 0 420 200" preserveAspectRatio="xMidYMid meet" focusable="false">
      {/* The road so far, climbing left to right. */}
      <path
        className="vr-path vr-path-main"
        d="M20 178 C 70 172, 96 158, 130 140 S 196 112, 236 92"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* The fork: two companies out of one trajectory. */}
      <path
        className="vr-path vr-path-up"
        d="M236 92 C 286 68, 318 54, 366 48"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      <path
        className="vr-path vr-path-down"
        d="M236 92 C 286 104, 318 128, 366 146"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />

      {MILESTONES.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className="vr-milestone"
          cx={cx}
          cy={cy}
          r="4.5"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ animationDelay: `${0.25 + index * 0.14}s` }}
        />
      ))}

      {/* Where the fork happens — the point the whole strip is about. */}
      <circle className="vr-junction" cx="236" cy="92" r="7" fill="currentColor" />
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
