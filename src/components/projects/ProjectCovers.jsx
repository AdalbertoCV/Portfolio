import PlayGlyph from './PlayGlyph';

/* ==========================================================================
   DRAWN COVERS

   Most of this catalogue is APIs, pipelines, brokers and data structures.
   There is nothing to photograph, and a screenshot of a Swing window or a
   terminal would lower the grid rather than raise it — so each of these
   projects gets a cover drawn from what it actually does: the handshake, the
   fan-out, the tree, the forest, the flag.

   All of them are currentColor on the card's own ground, which is what keeps
   thirteen different drawings reading as one family and following the theme.
   The gradient on .project-cover fades the bottom into the card, so the
   subject lives in the upper two thirds and only quiet material goes below.
   ======================================================================== */

const W = 400;
const H = 160;

// Every cover is the same drawing surface with the same pen.
const Cover = ({ children }) => (
  <svg
    className="project-glyph project-glyph-drawn"
    viewBox={`0 0 ${W} ${H}`}
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

// A labelled box — the unit most of these diagrams are built from.
const Box = ({ x, y, w, h, label, o = 1 }) => (
  <g opacity={o}>
    <rect x={x} y={y} width={w} height={h} rx="4" />
    {label ? (
      <text
        x={x + w / 2}
        y={y + h / 2 + 3.2}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="9"
        fontWeight="600"
      >
        {label}
      </text>
    ) : null}
  </g>
);

// A small solid triangle, used as the head on every arrow so they all point
// the same way in the same weight.
const Head = ({ x, y, dir = 'right', o = 0.7 }) => {
  const p =
    dir === 'right'
      ? `M${x} ${y - 3.4}L${x + 5.4} ${y}L${x} ${y + 3.4}Z`
      : dir === 'down'
        ? `M${x - 3.4} ${y}L${x} ${y + 5.4}L${x + 3.4} ${y}Z`
        : `M${x} ${y - 3.4}L${x - 5.4} ${y}L${x} ${y + 3.4}Z`;
  return <path d={p} fill="currentColor" stroke="none" opacity={o} />;
};

const Mono = ({ x, y, children, size = 9, o = 0.55, anchor = 'middle', weight = 600 }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fill="currentColor"
    stroke="none"
    opacity={o}
    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize={size}
    fontWeight={weight}
  >
    {children}
  </text>
);

/* ---------------------------------------------------------------- the set */

// Four heterogeneous formats going into one graph. The sources are drawn as
// different shapes because that is the whole problem the pipeline solved.
const EtlCover = () => (
  <Cover>
    {['CSV', 'XML', 'HTM', 'TXT'].map((label, i) => (
      <Box key={label} x={28} y={22 + i * 28} w={52} h={20} label={label} o={0.9} />
    ))}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <path d={`M84 ${32 + i * 28}H132L162 78`} opacity={0.45} />
      </g>
    ))}
    <Head x={166} y={78} o={0.6} />

    <Box x={178} y={66} w={54} h={24} label="Luigi" o={0.9} />
    <path d="M236 78h22" opacity={0.5} />
    <Head x={260} y={78} o={0.6} />

    {/* the graph the whole thing lands in */}
    <g opacity={0.9}>
      <circle cx="316" cy="46" r="9" />
      <circle cx="352" cy="74" r="9" />
      <circle cx="304" cy="92" r="9" />
      <circle cx="340" cy="116" r="9" />
      <circle cx="286" cy="62" r="6" opacity="0.6" />
      <path d="m324 52 20 16M310 84l4-30M312 98l22 14M292 68l18 18" opacity="0.55" />
    </g>
    <Mono x={330} y={140}>
      dgraph
    </Mono>
  </Cover>
);

// One publisher, one topic, three subscribers. The fan-out is the point.
const PubSubCover = () => (
  <Cover>
    <Box x={24} y={64} w={64} h={26} label="publish" o={0.9} />
    <path d="M92 77h26" opacity={0.5} />
    <Head x={120} y={77} o={0.6} />

    {/* the broker, drawn as a queue with messages still in it */}
    <g opacity={0.9}>
      <rect x="132" y="56" width="98" height="42" rx="5" />
      <rect x="142" y="68" width="14" height="18" rx="2" opacity="0.75" />
      <rect x="162" y="68" width="14" height="18" rx="2" opacity="0.55" />
      <rect x="182" y="68" width="14" height="18" rx="2" opacity="0.35" />
    </g>
    <Mono x={181} y={112}>
      topic
    </Mono>

    {[34, 77, 120].map((y, i) => (
      <g key={y}>
        <path d={`M230 77H262L288 ${y}`} opacity={0.45} />
        <Head x={292} y={y} o={0.6} />
        <Box x={300} y={y - 13} w={72} h={26} label={`sub ${i + 1}`} o={0.85} />
      </g>
    ))}
  </Cover>
);

// Two endpoints and the three-way handshake between them, which is the thing
// the exercise was actually about.
const SocketsCover = () => (
  <Cover>
    <Box x={26} y={28} w={78} h={26} label="client" o={0.95} />
    <Box x={296} y={28} w={78} h={26} label="server" o={0.95} />
    <path d="M65 54v84M335 54v84" opacity={0.3} strokeDasharray="4 5" />

    <g opacity={0.9}>
      <path d="M68 76h258" />
      <Head x={330} y={76} o={0.85} />
      <path d="M332 100H74" />
      <Head x={70} y={100} dir="left" o={0.85} />
      <path d="M68 124h258" />
      <Head x={330} y={124} o={0.85} />
    </g>

    <Mono x={198} y={71} o={0.6}>
      SYN
    </Mono>
    <Mono x={198} y={95} o={0.6}>
      SYN-ACK
    </Mono>
    <Mono x={198} y={119} o={0.6}>
      ACK
    </Mono>
  </Cover>
);

// The two structures the course was built on, side by side: a tree that
// branches and a list that does not.
const PooEddCover = () => (
  <Cover>
    <g opacity={0.95}>
      <circle cx="108" cy="30" r="11" />
      <circle cx="68" cy="74" r="11" />
      <circle cx="148" cy="74" r="11" />
      <circle cx="42" cy="118" r="11" />
      <circle cx="94" cy="118" r="11" />
      <circle cx="174" cy="118" r="11" />
      <path d="m100 38-24 28M116 38l24 28M60 82l-10 26M76 82l10 26M156 82l10 26" opacity="0.6" />
    </g>

    {[0, 1, 2].map((i) => (
      <g key={i} opacity={0.9}>
        <rect x={232 + i * 54} y="62" width="40" height="26" rx="4" />
        <path d={`M${256 + i * 54} 62v26`} opacity="0.5" />
        {i < 2 ? (
          <>
            <path d={`M${272 + i * 54} 75h10`} opacity="0.55" />
            <Head x={286 + i * 54} y={75} o={0.6} />
          </>
        ) : (
          <path d="M346 68l10 14M356 68l-10 14" opacity="0.5" />
        )}
      </g>
    ))}
    <Mono x={288} y={112}>
      linked list
    </Mono>
  </Cover>
);

// A request going down through the layers a framework puts in its way, and
// the response coming back up.
const FrameworksCover = () => {
  const layers = ['urls', 'views', 'models', 'db'];
  return (
    <Cover>
      {layers.map((label, i) => (
        <Box key={label} x={126} y={18 + i * 32} w={148} h={24} label={label} o={0.95 - i * 0.12} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M200 ${42 + i * 32}v3`} opacity={0.5} />
          <Head x={200} y={45 + i * 32} dir="down" o={0.6} />
        </g>
      ))}
      <path d="M118 30H92v98h26" opacity={0.45} />
      <Head x={122} y={128} o={0.6} />
      <Mono x={70} y={82} o={0.5}>
        req
      </Mono>
      <path d="M282 128h26V30h-26" opacity={0.45} />
      <Head x={278} y={30} dir="left" o={0.6} />
      <Mono x={334} y={82} o={0.5}>
        res
      </Mono>
    </Cover>
  );
};

// A form window and the four operations behind it.
const VisualNetCover = () => (
  <Cover>
    <g opacity={0.95}>
      <rect x="36" y="24" width="200" height="112" rx="6" />
      <path d="M36 44h200" />
      <circle cx="48" cy="34" r="2.6" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="58" cy="34" r="2.6" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="68" cy="34" r="2.6" fill="currentColor" stroke="none" opacity="0.3" />
    </g>
    {[0, 1, 2].map((i) => (
      <g key={i} opacity={0.7}>
        <rect x="52" y={58 + i * 22} width="46" height="12" rx="2" opacity="0.5" />
        <rect x="108" y={56 + i * 22} width="112" height="16" rx="3" />
      </g>
    ))}
    {['create', 'read', 'update', 'delete'].map((label, i) => (
      <Box key={label} x={264} y={22 + i * 30} w={96} h={22} label={label} o={0.9 - i * 0.08} />
    ))}
  </Cover>
);

// Something handed from one side to the other, which is the whole product.
const ShareCover = () => (
  <Cover>
    <g opacity={0.9}>
      <circle cx="74" cy="60" r="16" />
      <path d="M46 116a28 28 0 0 1 56 0" />
      <circle cx="326" cy="60" r="16" />
      <path d="M298 116a28 28 0 0 1 56 0" />
    </g>
    <g opacity={0.95}>
      <rect x="164" y="52" width="72" height="50" rx="6" />
      <path d="M164 68h72" opacity="0.5" />
      <path d="M200 80v14M193 86l7-7 7 7" opacity="0.7" />
    </g>
    <path d="M108 74h46" opacity={0.45} />
    <Head x={158} y={74} o={0.6} />
    <path d="M292 74h-46" opacity={0.45} />
    <Head x={242} y={74} dir="left" o={0.6} />
    <Mono x={200} y={130}>
      share me something
    </Mono>
  </Cover>
);

// A terminal, and the only line in it that counts.
const CtfCover = () => (
  <Cover>
    <g opacity={0.95}>
      <rect x="36" y="22" width="328" height="114" rx="6" />
      <path d="M36 42h328" />
      <circle cx="48" cy="32" r="2.6" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="58" cy="32" r="2.6" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="68" cy="32" r="2.6" fill="currentColor" stroke="none" opacity="0.3" />
    </g>
    <Mono x={56} y={66} anchor="start" o={0.5}>
      $ strings challenge | grep pico
    </Mono>
    <Mono x={56} y={86} anchor="start" o={0.35}>
      $ nc saturn.picoctf.net 52981
    </Mono>
    <Mono x={56} y={112} anchor="start" o={0.9} size={12}>
      picoCTF&#123;r3v3rs3d&#125;
    </Mono>
    <rect x="196" y="103" width="7" height="12" fill="currentColor" stroke="none" opacity="0.9" />
  </Cover>
);

// Three trees and the vote they take, which is what a random forest is.
const ForestCover = () => {
  const tree = (x, o) => (
    <g key={x} opacity={o}>
      <circle cx={x} cy="26" r="7" />
      <circle cx={x - 20} cy="58" r="7" />
      <circle cx={x + 20} cy="58" r="7" />
      <circle cx={x - 32} cy="90" r="7" />
      <circle cx={x - 8} cy="90" r="7" />
      <circle cx={x + 32} cy="90" r="7" />
      <path
        d={`m${x - 5} 31-11 21M${x + 5} 31l11 21M${x - 25} 64l-5 19M${x - 15} 64l5 19M${x + 25} 64l5 19`}
        opacity="0.55"
      />
    </g>
  );
  return (
    <Cover>
      {[86, 200, 314].map((x, i) => tree(x, 0.95 - i * 0.14))}
      <path d="M86 100v12h228v-12" opacity={0.4} />
      <path d="M200 112v10" opacity={0.4} />
      <Head x={200} y={122} dir="down" o={0.55} />
      <Mono x={200} y={146} o={0.6}>
        majority vote
      </Mono>
    </Cover>
  );
};

/* ------------------------------------------------------------- the lookup */

const COVERS = {
  play: PlayGlyph,
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
