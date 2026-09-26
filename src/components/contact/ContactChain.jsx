import { BRAND_CORE } from '../brand/teaserPalette';

// The art on the invitation at the foot of the tour. Same 420x140 frame and
// the same draw-then-loop shape as the other hand-offs, but it tells a
// collaboration rather than a ping: two people, a message out, a reply typed
// and sent back, and between them something that gets built out of the
// exchange — a block for each message that crosses, a third once the
// conversation is complete, a flash, a check, and round again.
//
// One cycle (--cc-cycle in hub.css) and one phase table there; every piece
// below only says which part of the cycle it plays.

const OUT = 'M78 70 C 134 12, 268 18, 342 64';
const BACK = 'M342 64 C 286 124, 148 122, 78 70';

const ME = [78, 70];
const YOU = [342, 64];

const ME_COLOUR = BRAND_CORE.radii;
const YOU_COLOUR = BRAND_CORE.case;
const MESSAGE_COLOUR = BRAND_CORE.moonphase;
const REPLY_COLOUR = BRAND_CORE.freelance;

// Bottom up: the first message's block, the reply's, and the one that only
// lands once both have.
const BLOCKS = [
  { y: 82, width: 46, colour: BRAND_CORE.moonphase },
  { y: 66, width: 38, colour: BRAND_CORE.freelance },
  { y: 50, width: 30, colour: BRAND_CORE.stackselect },
];
const BLOCK_X = 210;

// A person: the ring they stand in, a head and shoulders.
const Person = ({ at, colour, className }) => (
  <g className={`cc-person ${className}`} style={{ color: colour }} transform={`translate(${at[0]} ${at[1]})`}>
    <circle className="cc-bloom" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Solid first, so the dotted lines end at the ring instead of showing through it. */}
    <circle r="16" fill="var(--color-bg-card)" stroke="none" />
    <circle className="cc-ring" r="16" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2" />
    <circle cy="-4" r="4.6" fill="currentColor" />
    <path d="M-8 10a8 7.5 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </g>
);

// A chat bubble centred on its own origin, so offset-path carries it by its
// middle; three dots inside say it holds words.
const Bubble = ({ path, colour, className }) => (
  <g className={`cc-bubble ${className}`} style={{ color: colour, offsetPath: `path("${path}")` }}>
    <path
      d="M-12 -9h24a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H-2l-6 5v-5h-4a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z"
      fill="currentColor"
      stroke="none"
    />
    {[-6, 0, 6].map((x) => (
      <circle key={x} cx={x} cy="-1" r="1.6" fill="var(--color-bg-card)" stroke="none" />
    ))}
  </g>
);

const ContactChain = () => (
  <div className="contact-chain" aria-hidden="true">
    <svg className="cc-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        <linearGradient id="ccOut" gradientUnits="userSpaceOnUse" x1={ME[0]} y1="0" x2={YOU[0]} y2="0">
          <stop offset="0" stopColor={ME_COLOUR} />
          <stop offset="0.5" stopColor={MESSAGE_COLOUR} />
          <stop offset="1" stopColor={YOU_COLOUR} />
        </linearGradient>
        <linearGradient id="ccBack" gradientUnits="userSpaceOnUse" x1={YOU[0]} y1="0" x2={ME[0]} y2="0">
          <stop offset="0" stopColor={YOU_COLOUR} />
          <stop offset="0.5" stopColor={REPLY_COLOUR} />
          <stop offset="1" stopColor={ME_COLOUR} />
        </linearGradient>
      </defs>

      {/* The two lines of the conversation. */}
      <path className="cc-path" d={OUT} fill="none" stroke="url(#ccOut)" strokeOpacity="0.75" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 7" />
      <path className="cc-path cc-path-back" d={BACK} fill="none" stroke="url(#ccBack)" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 7" />

      {/* What gets built between them, one block per exchange. */}
      <g className="cc-build">
        <path d={`M${BLOCK_X - 34} 97.5h68`} stroke="var(--color-text-tertiary)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        {BLOCKS.map(({ y, width, colour }, index) => (
          <rect
            key={y}
            className={`cc-block cc-block-${index + 1}`}
            x={BLOCK_X - width / 2}
            y={y}
            width={width}
            height="14"
            rx="3.5"
            fill="currentColor"
            fillOpacity="0.85"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: colour }}
          />
        ))}
        {/* The flash and the check once all three are up. */}
        <g className="cc-done" style={{ color: BRAND_CORE.stackselect }}>
          {['M210 30v-8', 'M186 38l-5-5', 'M234 38l5-5', 'M176 56h-7', 'M244 56h7'].map((d) => (
            <path key={d} className="cc-spark" d={d} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          ))}
          <circle cx="252" cy="80" r="9" fill="currentColor" />
          <path d="M247.5 80l3 3 5.5-6" fill="none" stroke="var(--color-bg-card)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      <Person at={ME} colour={ME_COLOUR} className="cc-me" />
      <Person at={YOU} colour={YOU_COLOUR} className="cc-you" />

      {/* You, typing the reply. */}
      <g className="cc-typing" style={{ color: YOU_COLOUR }}>
        {[-7, 0, 7].map((dx, index) => (
          <circle key={dx} cx={YOU[0] + dx} cy={YOU[1] - 30} r="2.4" fill="currentColor" style={{ animationDelay: `${index * 0.12}s` }} />
        ))}
      </g>

      <Bubble path={OUT} colour={MESSAGE_COLOUR} className="cc-bubble-out" />
      <Bubble path={BACK} colour={REPLY_COLOUR} className="cc-bubble-back" />
    </svg>
  </div>
);

export default ContactChain;
