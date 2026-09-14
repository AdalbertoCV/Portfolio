// The teaser that sends a reader from Projects to Contact — the third sibling
// of VenturesRoadmap and ProjectsMosaic, and the one that closes the loop.
//
// The site is a chain: About hands off to Experience, Experience to Ventures,
// Ventures to Projects. A reader standing at the foot of the catalogue has
// walked the whole thing, so the strip draws that walk literally — four links
// already travelled, rising left to right, and one final node still open.
//
// The chain draws itself once on reveal. After that a signal runs it on a loop
// and each link lights as the signal passes; the delays are derived from where
// the link sits along the path, so the lighting is caused by the signal rather
// than merely happening near it. The last node does not flash like the others:
// it blooms, because it is the one thing on the strip that has not happened
// yet.

// Declared once and shared: the <path> renders it and the signal follows it
// through `offset-path`. Two copies of this string would drift apart.
const CHAIN = 'M20 104 C 58 100, 76 78, 108 74 S 160 86, 194 68 S 250 48, 284 58 S 340 64, 372 38';

const CHAIN_START_X = 20;
const CHAIN_SPAN_X = 352;

// Seconds. The signal only starts once the chain has finished drawing.
const DRAW_DELAY = 1.2;
const RUN_DURATION = 3.4;

// The pages already read, in order. Each sits exactly on a path anchor, so a
// link never floats beside the chain it belongs to.
const LINKS = [
  [20, 104],
  [108, 74],
  [194, 68],
  [284, 58],
];

const END = [372, 38];

const progressAt = (x) => (x - CHAIN_START_X) / CHAIN_SPAN_X;

const ContactChain = () => (
  <div className="contact-chain" aria-hidden="true">
    <svg className="cc-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path
        className="cc-path"
        d={CHAIN}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {LINKS.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          className="cc-link"
          cx={cx}
          cy={cy}
          r="4"
          fill="currentColor"
          fillOpacity="0.45"
          style={{
            // Two animations: the one-off pop as the chain draws, then the
            // repeating flash as the signal reaches this link.
            animationDelay: `${0.2 + index * 0.12}s, ${DRAW_DELAY + progressAt(cx) * RUN_DURATION}s`,
          }}
        />
      ))}

      {/* The open end. Drawn as a ring rather than a dot — every link behind it
          is closed, and this one is not. */}
      <circle
        className="cc-bloom"
        cx={END[0]}
        cy={END[1]}
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ animationDelay: `${DRAW_DELAY + RUN_DURATION * 0.98}s` }}
      />
      <circle
        className="cc-end"
        cx={END[0]}
        cy={END[1]}
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        style={{ animationDelay: '0.9s' }}
      />

      {/* The signal. `cx`/`cy` stay at the origin because `offset-path` places
          it; any offset here would be added on top of the path position. */}
      <circle
        className="cc-signal cc-signal-glow"
        cx="0"
        cy="0"
        r="9"
        fill="currentColor"
        style={{ offsetPath: `path("${CHAIN}")`, animationDelay: `${DRAW_DELAY}s` }}
      />
      <circle
        className="cc-signal"
        cx="0"
        cy="0"
        r="3"
        fill="currentColor"
        style={{ offsetPath: `path("${CHAIN}")`, animationDelay: `${DRAW_DELAY}s` }}
      />
    </svg>
  </div>
);

export default ContactChain;
