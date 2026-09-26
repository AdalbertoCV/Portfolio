// The teaser that sends a reader from Projects to Contact — the third sibling
// of VenturesRoadmap and ProjectsMosaic.
//
// It used to draw the site as a trail that ran out here. It no longer does:
// the invitation is not "you reached the end", it is "let's talk", so the
// strip draws a conversation instead. Two nodes — me and whoever is reading —
// with a signal that goes out along the upper arc, blooms as it lands, and
// comes back along the lower one. Neither end is the open one; the loop never
// settles, because an exchange is the thing that has not happened yet.
//
// Both arcs draw themselves once on reveal, then the exchange runs forever.
// The two signals share one keyframe and one cycle: the reply is simply the
// same animation half a cycle later, so the two can never drift apart.

// Declared once and shared: the <path> renders each arc and its signal follows
// it through `offset-path`. Two copies of these strings would drift apart.
// Deliberately not each other's mirror: a perfectly symmetric pair of arcs
// draws an eye, and the two ends of a conversation are not the same shape.
import { BRAND_CORE } from '../brand/teaserPalette';

// Me in cyan, you in pink; the message warms through violet on the way out and
// the reply through amber on the way back, so each direction reads as its own.
const ME_COLOUR = BRAND_CORE.radii;
const YOU_COLOUR = BRAND_CORE.case;

const OUT = 'M78 70 C 134 12, 268 18, 342 64';
const BACK = 'M342 64 C 286 124, 148 122, 78 70';

const ME = [78, 70];
const YOU = [342, 64];

// Seconds. The exchange only starts once both arcs have finished drawing, and
// the reply leaves exactly half a cycle after the message did.
const DRAW_DELAY = 1.15;
const CYCLE = 4;
const HALF = CYCLE / 2;

// The head, its glow, and two dimmer copies a fraction of a second behind it.
// The tail is the same animation started late rather than a drawn streak: a
// stroked trail would have to be re-measured for each arc, and this reads as
// travel for three more circles and no geometry.
const TRAIL = [
  { r: 2.6, opacity: 0.45, lag: 0.07 },
  { r: 1.8, opacity: 0.22, lag: 0.14 },
];

const Signal = ({ path, delay, colour }) => {
  // `cx`/`cy` stay at the origin because `offset-path` places the circle; any
  // offset here would be added on top of the path position.
  const ride = (extra = 0) => ({
    offsetPath: `path("${path}")`,
    animationDelay: `${delay + extra}s`,
  });

  return (
    <g style={{ color: colour }}>
      <circle className="cc-signal cc-signal-glow" cx="0" cy="0" r="11" fill="currentColor" style={ride()} />
      {TRAIL.map(({ r, opacity, lag }) => (
        <circle
          key={lag}
          className="cc-signal cc-signal-trail"
          cx="0"
          cy="0"
          r={r}
          fill="currentColor"
          style={{ ...ride(lag), '--cc-trail': opacity }}
        />
      ))}
      <circle className="cc-signal" cx="0" cy="0" r="3.5" fill="currentColor" style={ride()} />
    </g>
  );
};

const Node = ({ at, popDelay, bloomDelay, colour }) => (
  <g style={{ color: colour }}>
    {/* The ring the arriving signal opens up into. Drawn under the node so the
        node stays the solid thing and the bloom reads as its echo. */}
    <circle
      className="cc-bloom"
      cx={at[0]}
      cy={at[1]}
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animationDelay: `${bloomDelay}s` }}
    />
    <circle
      className="cc-halo"
      cx={at[0]}
      cy={at[1]}
      r="10.5"
      fill="none"
      stroke="currentColor"
      strokeOpacity="0.35"
      strokeWidth="1.5"
      style={{ animationDelay: `${popDelay}s` }}
    />
    <circle
      className="cc-node"
      cx={at[0]}
      cy={at[1]}
      r="5.5"
      fill="currentColor"
      style={{ animationDelay: `${popDelay}s, ${bloomDelay}s` }}
    />
  </g>
);

const ContactChain = () => (
  <div className="contact-chain" aria-hidden="true">
    <svg className="cc-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        <linearGradient id="ccOut" gradientUnits="userSpaceOnUse" x1={ME[0]} y1="0" x2={YOU[0]} y2="0">
          <stop offset="0" stopColor={ME_COLOUR} />
          <stop offset="0.5" stopColor={BRAND_CORE.moonphase} />
          <stop offset="1" stopColor={YOU_COLOUR} />
        </linearGradient>
        <linearGradient id="ccBack" gradientUnits="userSpaceOnUse" x1={YOU[0]} y1="0" x2={ME[0]} y2="0">
          <stop offset="0" stopColor={YOU_COLOUR} />
          <stop offset="0.5" stopColor={BRAND_CORE.freelance} />
          <stop offset="1" stopColor={ME_COLOUR} />
        </linearGradient>
      </defs>

      {[OUT, BACK].map((d, index) => (
        <path
          key={d}
          className="cc-path"
          d={d}
          fill="none"
          stroke={index === 0 ? 'url(#ccOut)' : 'url(#ccBack)'}
          strokeOpacity={index === 0 ? 0.9 : 0.6}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animationDelay: `${0.1 + index * 0.22}s` }}
        />
      ))}

      {/* Each node lights when the other one's signal reaches it: the reply
          lands back home half a cycle after the message lands away. */}
      <Node at={ME} popDelay={0.35} bloomDelay={DRAW_DELAY + HALF} colour={ME_COLOUR} />
      <Node at={YOU} popDelay={0.55} bloomDelay={DRAW_DELAY} colour={YOU_COLOUR} />

      <Signal path={OUT} delay={DRAW_DELAY} colour={BRAND_CORE.moonphase} />
      <Signal path={BACK} delay={DRAW_DELAY + HALF} colour={BRAND_CORE.freelance} />
    </svg>
  </div>
);

export default ContactChain;
