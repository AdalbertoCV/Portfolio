/* ==========================================================================
   DRAWN COVERS

   Most of this catalogue is APIs, pipelines, brokers and data structures.
   There is nothing to photograph — so each of these projects gets a cover
   that shows what it does while it does it: the packets actually travel, the
   handshake actually completes, the flag actually types itself out.

   They sit beside real screenshots in the same grid, so they are built like
   screenshots: a full-bleed panel with a colour of its own, not a diagram
   printed on the card. The palette per project is its own — the broker burns
   orange, the framework runs Django green, the terminal glows the way a
   terminal does.

   Every animation is transform or opacity only, loops forever, and stops
   entirely under prefers-reduced-motion — the keyframes live in projects.css
   so that one media query governs all of them.
   ========================================================================= */

const W = 400;
const H = 160;

// Two stops and an angle: every cover's ground is built the same way, so nine
// different palettes still read as one set.
const Ground = ({ id, from, to }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill={`url(#${id})`} />
  </>
);

const Cover = ({ id, from, to, children }) => (
  <svg
    className="project-glyph project-glyph-drawn"
    viewBox={`0 0 ${W} ${H}`}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <Ground id={id} from={from} to={to} />
    <g fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

// A labelled chip — the unit most of these are built from.
const Chip = ({ x, y, w, h, label, o = 1, size = 9 }) => (
  <g opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx="6" fill="rgba(255,255,255,0.14)" />
    <rect x={x} y={y} width={w} height={h} rx="6" stroke="rgba(255,255,255,0.5)" />
    {label ? (
      <text
        x={x + w / 2}
        y={y + h / 2 + size * 0.36}
        textAnchor="middle"
        fill="#ffffff"
        stroke="none"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize={size}
        fontWeight="600"
      >
        {label}
      </text>
    ) : null}
  </g>
);

const Label = ({ x, y, children, size = 9, o = 0.75, anchor = 'middle', fill = '#ffffff' }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fill={fill}
    stroke="none"
    opacity={o}
    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize={size}
    fontWeight="600"
    letterSpacing="0.06em"
  >
    {children}
  </text>
);

/* ---------------------------------------------------------------- the set */

// Four formats leaving at once and arriving as one graph. The packets run the
// paths; the graph lights up as they land.
const EtlCover = () => (
  <Cover id="cov-etl" from="#312e81" to="#7c3aed">
    {['CSV', 'XML', 'HTM', 'TXT'].map((label, i) => (
      <Chip key={label} x={20} y={22 + i * 30} w={48} h={20} label={label} o={0.95} />
    ))}

    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M70 ${32 + i * 30}H108Q130 ${32 + i * 30} 130 80`}
        stroke="rgba(255,255,255,0.3)"
        strokeDasharray="5 7"
        className="cov-flow"
        style={{ animationDelay: `${i * 0.22}s` }}
      />
    ))}

    <Chip x={106} y={68} w={48} h={24} label="luigi" />

    <path d="M156 80h26" stroke="rgba(255,255,255,0.4)" />
    <path d="M182 76l6 4-6 4" stroke="rgba(255,255,255,0.6)" />

    {/* the graph it all lands in — the nodes light in sequence */}
    <g>
      <path
        d="m300 52 30 26M292 58l-8 18M296 96l28 16M306 88l22-32"
        stroke="rgba(255,255,255,0.32)"
      />
      {[
        [300, 46, 10],
        [334, 82, 10],
        [288, 96, 9],
        [330, 120, 8],
        [276, 62, 6],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(255,255,255,0.18)"
          stroke="rgba(255,255,255,0.75)"
          className="cov-node"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </g>
    <Label x={362} y={146} anchor="end" o={0.5}>
      dgraph
    </Label>
  </Cover>
);

// One message in, three out. The fan-out is the whole product.
const PubSubCover = () => (
  <Cover id="cov-pubsub" from="#7c2d12" to="#f97316">
    <Chip x={16} y={64} w={62} h={26} label="publish" />
    <path d="M82 77h34" stroke="rgba(255,255,255,0.35)" strokeDasharray="5 6" className="cov-flow" />

    <g>
      <rect x="126" y="52" width="96" height="50" rx="8" fill="rgba(255,255,255,0.13)" />
      <rect x="126" y="52" width="96" height="50" rx="8" stroke="rgba(255,255,255,0.55)" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={140 + i * 24}
          y="66"
          width="16"
          height="22"
          rx="3"
          fill="#ffffff"
          stroke="none"
          className="cov-slot"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </g>
    <Label x={174} y={122} o={0.6}>
      topic
    </Label>

    {[32, 77, 122].map((y, i) => (
      <g key={y}>
        <path
          d={`M224 77H252L286 ${y}`}
          stroke="rgba(255,255,255,0.3)"
          strokeDasharray="5 6"
          className="cov-flow"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        />
        <Chip x={296} y={y - 13} w={88} h={26} label={`sub ${i + 1}`} o={0.95} />
      </g>
    ))}

    {/* the message itself: in once, then out three ways */}
    <circle r="4.5" fill="#ffffff" stroke="none" className="cov-msg-in" cx="82" cy="77" />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        r="4.5"
        fill="#ffffff"
        stroke="none"
        className={`cov-msg-out cov-msg-out-${i + 1}`}
        cx="224"
        cy="77"
      />
    ))}
  </Cover>
);

// The three-way handshake, in the order it happens.
const SocketsCover = () => (
  <Cover id="cov-sockets" from="#064e3b" to="#14b8a6">
    <Chip x={18} y={18} w={84} h={26} label="client" />
    <Chip x={298} y={18} w={84} h={26} label="server" />
    <path d="M60 46v96M340 46v96" stroke="rgba(255,255,255,0.28)" strokeDasharray="3 6" />

    {[
      ['SYN', 68, 1],
      ['SYN-ACK', 96, -1],
      ['ACK', 124, 1],
    ].map(([label, y, dir], i) => (
      <g key={label}>
        <path d={`M62 ${y}h276`} stroke="rgba(255,255,255,0.32)" />
        <Label x={200} y={y - 6} o={0.7} size={8.5}>
          {label}
        </Label>
        <rect
          x={dir === 1 ? 62 : 330}
          y={y - 4}
          width="10"
          height="8"
          rx="2"
          fill="#ffffff"
          stroke="none"
          className={`cov-hs cov-hs-${dir === 1 ? 'fwd' : 'back'}`}
          style={{ animationDelay: `${i * 1.05}s` }}
        />
      </g>
    ))}
  </Cover>
);

// A tree that branches and a list that does not — traversed, so you can see
// which is which.
const PooEddCover = () => {
  const nodes = [
    [104, 30],
    [64, 74],
    [144, 74],
    [40, 118],
    [88, 118],
    [168, 118],
  ];
  return (
    <Cover id="cov-pooedd" from="#831843" to="#f43f5e">
      <path
        d="m96 38-24 28M112 38l24 28M56 82l-8 26M72 82l8 26M152 82l8 26"
        stroke="rgba(255,255,255,0.4)"
      />
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="12"
          fill="rgba(255,255,255,0.16)"
          stroke="rgba(255,255,255,0.8)"
          className="cov-visit"
          style={{ animationDelay: `${i * 0.36}s` }}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={230 + i * 54}
            y="62"
            width="42"
            height="28"
            rx="5"
            fill="rgba(255,255,255,0.14)"
            stroke="rgba(255,255,255,0.65)"
          />
          <path d={`M${256 + i * 54} 62v28`} stroke="rgba(255,255,255,0.4)" />
          {i < 2 ? (
            <path
              d={`M${274 + i * 54} 76h8`}
              stroke="#ffffff"
              className="cov-visit"
              style={{ animationDelay: `${0.4 + i * 0.36}s` }}
            />
          ) : (
            <path d="M344 68l10 16M354 68l-10 16" stroke="rgba(255,255,255,0.45)" />
          )}
        </g>
      ))}
      <Label x={286} y={112} o={0.6}>
        linked list
      </Label>
    </Cover>
  );
};

// A request falling through every layer a framework puts in its way, and the
// response climbing back out.
const FrameworksCover = () => (
  <Cover id="cov-frameworks" from="#064e3b" to="#16a34a">
    {['urls', 'views', 'models', 'db'].map((label, i) => (
      <g key={label}>
        <rect
          x="118"
          y={18 + i * 33}
          width="164"
          height="26"
          rx="6"
          fill="rgba(255,255,255,0.13)"
          stroke="rgba(255,255,255,0.5)"
        />
        <rect
          x="118"
          y={18 + i * 33}
          width="164"
          height="26"
          rx="6"
          fill="#ffffff"
          stroke="none"
          className="cov-layer"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
        <text
          x="200"
          y={35 + i * 33}
          textAnchor="middle"
          fill="#ffffff"
          stroke="none"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9.5"
          fontWeight="600"
        >
          {label}
        </text>
      </g>
    ))}
    <path d="M110 31H84v96h26" stroke="rgba(255,255,255,0.4)" />
    <path d="M106 123l6 4-6 4" stroke="rgba(255,255,255,0.6)" />
    <Label x={60} y={82} o={0.6}>
      req
    </Label>
    <path d="M290 127h26V31h-26" stroke="rgba(255,255,255,0.4)" />
    <path d="M294 27l-6 4 6 4" stroke="rgba(255,255,255,0.6)" />
    <Label x={342} y={82} o={0.6}>
      res
    </Label>
  </Cover>
);

// A form filling itself in, and the four operations behind it taking turns.
const VisualNetCover = () => (
  <Cover id="cov-visualnet" from="#3b0764" to="#8b5cf6">
    <g>
      <rect x="24" y="22" width="206" height="116" rx="8" fill="rgba(255,255,255,0.12)" />
      <rect x="24" y="22" width="206" height="116" rx="8" stroke="rgba(255,255,255,0.55)" />
      <path d="M24 44h206" stroke="rgba(255,255,255,0.45)" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={38 + i * 11}
          cy="33"
          r="3"
          fill="#ffffff"
          stroke="none"
          opacity={0.7 - i * 0.18}
        />
      ))}
    </g>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect
          x="40"
          y={60 + i * 24}
          width="36"
          height="10"
          rx="2"
          fill="rgba(255,255,255,0.35)"
          stroke="none"
        />
        <rect
          x="86"
          y={56 + i * 24}
          width="126"
          height="18"
          rx="4"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.45)"
        />
        <rect
          x="90"
          y={60 + i * 24}
          width="118"
          height="10"
          rx="2"
          fill="#ffffff"
          stroke="none"
          className="cov-fill"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      </g>
    ))}
    {['create', 'read', 'update', 'delete'].map((label, i) => (
      <g key={label} className="cov-turn" style={{ animationDelay: `${i * 0.9}s` }}>
        <Chip x={250} y={22 + i * 30} w={100} h={24} label={label} />
      </g>
    ))}
  </Cover>
);

// Something handed across, over and over, which is the whole product.
const ShareCover = () => (
  <Cover id="cov-share" from="#831843" to="#ec4899">
    {[70, 330].map((cx) => (
      <g key={cx} opacity="0.9">
        <circle cx={cx} cy="58" r="17" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.75)" />
        <path
          d={`M${cx - 29} 116a29 29 0 0 1 58 0`}
          fill="rgba(255,255,255,0.16)"
          stroke="rgba(255,255,255,0.75)"
        />
      </g>
    ))}
    <path d="M100 74h200" stroke="rgba(255,255,255,0.28)" strokeDasharray="5 7" className="cov-flow" />
    <g className="cov-handover">
      <rect x="170" y="52" width="60" height="44" rx="7" fill="rgba(255,255,255,0.2)" stroke="#ffffff" />
      <path d="M170 68h60" stroke="rgba(255,255,255,0.6)" />
      <path d="M200 78v12M194 84l6-6 6 6" stroke="#ffffff" />
    </g>
    <Label x={200} y={140} o={0.6}>
      share me something
    </Label>
  </Cover>
);

// A terminal, and the only line in it that counts — typed out, every loop.
const CtfCover = () => (
  <Cover id="cov-ctf" from="#022c22" to="#065f46">
    <defs>
      <clipPath id="cov-ctf-type" clipPathUnits="userSpaceOnUse">
        <rect x="46" y="96" width="200" height="22" className="cov-type" />
      </clipPath>
    </defs>
    <rect
      x="24"
      y="18"
      width="352"
      height="124"
      rx="8"
      fill="rgba(0,0,0,0.38)"
      stroke="rgba(74,222,128,0.45)"
    />
    <path d="M24 40h352" stroke="rgba(74,222,128,0.32)" />
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx={40 + i * 12}
        cy="29"
        r="3.2"
        fill="#4ade80"
        stroke="none"
        opacity={0.65 - i * 0.18}
      />
    ))}

    <Label x={46} y={62} anchor="start" o={0.5} fill="#4ade80" size={9}>
      $ strings challenge | grep pico
    </Label>
    <Label x={46} y={80} anchor="start" o={0.3} fill="#4ade80" size={9}>
      $ nc saturn.picoctf.net 52981
    </Label>

    <g clipPath="url(#cov-ctf-type)">
      <text
        x="46"
        y="112"
        fill="#4ade80"
        stroke="none"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.04em"
      >
        picoCTF&#123;r3v3rs3d&#125;
      </text>
    </g>
    <rect x="46" y="101" width="8" height="13" fill="#4ade80" stroke="none" className="cov-caret" />
  </Cover>
);

// Three trees, and the vote they take, which is what a forest is for.
const ForestCover = () => {
  const tree = (x, delay) => (
    <g key={x}>
      <path
        d={`m${x - 5} 31-12 22M${x + 5} 31l12 22M${x - 25} 65l-6 20M${x - 15} 65l6 20M${x + 25} 65l6 20`}
        stroke="rgba(255,255,255,0.4)"
      />
      {[
        [x, 26],
        [x - 21, 59],
        [x + 21, 59],
        [x - 34, 92],
        [x - 9, 92],
        [x + 32, 92],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="8"
          fill="rgba(255,255,255,0.18)"
          stroke="rgba(255,255,255,0.8)"
          className="cov-visit"
          style={{ animationDelay: `${delay + i * 0.16}s` }}
        />
      ))}
    </g>
  );
  return (
    <Cover id="cov-forest" from="#0c4a6e" to="#0ea5e9">
      {[84, 200, 316].map((x, i) => tree(x, i * 0.5))}
      <path d="M84 104v10h232v-10M200 114v8" stroke="rgba(255,255,255,0.35)" />
      <g>
        <rect
          x="140"
          y="126"
          width="120"
          height="15"
          rx="7.5"
          fill="rgba(255,255,255,0.15)"
          stroke="rgba(255,255,255,0.5)"
        />
        <rect
          x="140"
          y="126"
          width="120"
          height="15"
          rx="7.5"
          fill="#ffffff"
          stroke="none"
          className="cov-vote"
        />
      </g>
      <Label x={200} y={137} o={0.9} size={8.5} fill="#0c4a6e">
        majority vote
      </Label>
    </Cover>
  );
};

// The game, as its own arcade poster: the laptop runs, the bugs come at it.
const PlayCover = () => (
  <Cover id="cov-play" from="#0f172a" to="#f59e0b">
    <rect width={W} height={H} fill="rgba(15,23,42,0.6)" stroke="none" />
    <g className="cov-ground">
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={i * 24}
          y="120"
          width="12"
          height="2.5"
          fill="#ffffff"
          stroke="none"
          opacity="0.4"
        />
      ))}
    </g>

    {/* the laptop, in the game's own blocks, hopping forever */}
    <g className="cov-hop">
      <g fill="#ffffff" stroke="none">
        <rect x="74" y="66" width="36" height="24" />
        <rect x="77" y="69" width="30" height="18" fill="#0f172a" />
        <rect x="82" y="74" width="5" height="5" />
        <rect x="97" y="74" width="5" height="5" />
        <rect x="70" y="92" width="44" height="5" />
        <rect x="66" y="97" width="52" height="5" />
      </g>
    </g>

    {[
      ['404', 0],
      ['NaN', 1.9],
      ['off-by-one', 3.8],
    ].map(([label, delay]) => (
      <g key={label} className="cov-bug" style={{ animationDelay: `${delay}s` }}>
        <g fill="#fbbf24" stroke="none">
          <rect x="0" y="96" width="24" height="18" />
          <rect x="8" y="90" width="8" height="6" />
          <rect x="-4" y="100" width="5" height="3" />
          <rect x="23" y="100" width="5" height="3" />
        </g>
        <text
          x="12"
          y="134"
          textAnchor="middle"
          fill="#ffffff"
          stroke="none"
          opacity="0.6"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="9"
          fontWeight="600"
        >
          {label}
        </text>
      </g>
    ))}

    <Label x={376} y={34} anchor="end" o={0.8} size={12}>
      00000
    </Label>
  </Cover>
);

/* ------------------------------------------------------------- the lookup */

const COVERS = {
  play: PlayCover,
  etl: EtlCover,
  pubsub: PubSubCover,
  sockets: SocketsCover,
  pooedd: PooEddCover,
  frameworks: FrameworksCover,
  visualnet: VisualNetCover,
  sharemesomething: ShareCover,
  picoctf: CtfCover,
  stroke: ForestCover,
};

/**
 * The drawn cover for a project, or null when it does not have one — in which
 * case the card falls back to the generated Truchet signature.
 */
const ProjectCover = ({ projectKey }) => {
  const Drawn = COVERS[projectKey];
  return Drawn ? <Drawn /> : null;
};

export const hasCover = (projectKey) => Boolean(COVERS[projectKey]);

export default ProjectCover;
