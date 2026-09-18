import { useTranslation } from '../../i18n/I18nProvider';
import './radiiSystem.css';

/* ==========================================================================
   THE SYSTEM, DRAWN

   "Lo que construyo ahí" was seven paragraphs, which means an engineer had to
   assemble the architecture in their own head before they could judge it.
   This is that architecture: the path a CAD file takes across the top, and
   underneath it the platform layer that actually does the work.

   Nothing here is new information. Every box is something this page already
   states in prose — the diagram only gives it a shape.

   It is drawn rather than written because the claim being made is structural:
   that these pieces fit together into one system, which is a thing you can
   show in a glance and cannot say in a list.
   ========================================================================= */

const W = 1000;
const H = 470;

// The pipeline across the top: what happens to a file, in order.
const FLOW = [
  { id: 'upload', x: 40 },
  { id: 'analyse', x: 272 },
  { id: 'quote', x: 504 },
  { id: 'produce', x: 736 },
];
const NODE_W = 196;
const NODE_Y = 64;
const NODE_H = 70;

// The layer underneath: the services, not the steps.
const PLATFORM = [
  { id: 'services', x: 40, w: 224 },
  { id: 'workers', x: 288, w: 224 },
  { id: 'agents', x: 536, w: 224 },
  { id: 'ml', x: 784, w: 176 },
];
const PLAT_Y = 256;
// The clear row the platform band label sits in, and the gap every riser
// leaves for it. Baseline is the midpoint, so the two stay in step.
const LABEL_GAP = [208, 238];
const BAND_Y = 227;
const PLAT_H = 74;

const Node = ({ x, y, w, h, title, sub, strong }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="12"
      className={`rsys-box${strong ? ' is-strong' : ''}`}
    />
    <text x={x + 18} y={y + 29} className="rsys-title">
      {title}
    </text>
    {sub ? (
      <text x={x + 18} y={y + 50} className="rsys-sub">
        {sub}
      </text>
    ) : null}
  </g>
);

const RadiiSystem = () => {
  const { t } = useTranslation();

  return (
    <figure className="rsys">
      <svg
        className="rsys-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t('radii.system.alt')}
      >
        <defs>
          {/* The token that travels the pipeline gets a soft core so it reads
              as something moving through, not a dot stuck on top. */}
          <radialGradient id="rsys-spark">
            <stop offset="0" stopColor="var(--brand-core)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--brand-core)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ------------------------------------------------- the flow, on top */}
        <text x={40} y={34} className="rsys-band">
          {t('radii.system.flowBand')}
        </text>

        {FLOW.map(({ id, x }, i) => (
          <g key={id}>
            {i < FLOW.length - 1 ? (
              <>
                <path
                  d={`M${x + NODE_W} ${NODE_Y + NODE_H / 2}h${232 - NODE_W}`}
                  className="rsys-wire rsys-wire-flow"
                />
                <path
                  d={`M${x + 218} ${NODE_Y + NODE_H / 2 - 4.5}l6 4.5-6 4.5`}
                  className="rsys-head"
                />
              </>
            ) : null}
            <Node
              x={x}
              y={NODE_Y}
              w={NODE_W}
              h={NODE_H}
              title={t(`radii.system.flow.${id}.title`)}
              sub={t(`radii.system.flow.${id}.sub`)}
              strong={id === 'quote'}
            />
          </g>
        ))}

        {/* The file itself, crossing the whole pipeline on a loop. */}
        <g className="rsys-token">
          <circle r="16" fill="url(#rsys-spark)" />
          <circle r="5" className="rsys-token-core" />
        </g>

        {/* Two badges, because the quoter has two paths and only one of them has
            a person in it. The default sits on top; the exception the five to
            one belongs to goes underneath, quieter, so the headline is the
            thing that is true most of the time. */}
        <g>
          <path d="M578 134v14" className="rsys-wire" />
          <rect x={504} y={148} width={150} height={26} rx="13" className="rsys-badge" />
          <text x={579} y={166} className="rsys-badge-text">
            {t('radii.system.quoteBadge')}
          </text>
          <text x={579} y={196} className="rsys-badge-alt">
            {t('radii.system.quoteBadgeAlt')}
          </text>
        </g>

        {/* --------------------------------------------- the platform, beneath */}
        <text x={40} y={BAND_Y} className="rsys-band">
          {t('radii.system.platformBand')}
        </text>

        {/* Each service reaches up into the stage it serves. Dashed, because
            these are not steps in the pipeline — they are what runs it.

            Each one is two segments with a gap between them, and the gap is
            the row the band label sits in. The leftmost wire used to run
            straight through "la plataforma que lo sostiene" and cut the words
            in half; breaking all four at the same height turns that collision
            into a channel the label lives in. */}
        {[
          [152, 152],
          [400, 400],
          [648, 648],
          [872, 834],
        ].map(([from, to], i) => (
          <g key={i} className="rsys-riser" style={{ animationDelay: `${i * 0.25}s` }}>
            <path d={`M${from} ${PLAT_Y}V${LABEL_GAP[1]}`} className="rsys-wire rsys-wire-up" />
            <path
              d={`M${from} ${LABEL_GAP[0]}V150Q${from} 134 ${to} 134`}
              className="rsys-wire rsys-wire-up"
            />
          </g>
        ))}

        {PLATFORM.map(({ id, x, w }, i) => (
          <g key={id} className="rsys-service" style={{ animationDelay: `${i * 0.55}s` }}>
            <Node
              x={x}
              y={PLAT_Y}
              w={w}
              h={PLAT_H}
              title={t(`radii.system.platform.${id}.title`)}
              sub={t(`radii.system.platform.${id}.sub`)}
            />
          </g>
        ))}

        {/* The agents carry the other number. */}
        <g>
          <rect x={536} y={344} width={196} height={26} rx="13" className="rsys-badge" />
          <text x={634} y={362} className="rsys-badge-text">
            {t('radii.system.agentsBadge')}
          </text>
        </g>

        {/* ------------------------------------------------ the rail, underneath */}
        <g className="rsys-rail">
          <rect x={40} y={400} width={920} height={44} rx="12" className="rsys-box is-rail" />
          {/* Before the labels, so it passes behind them rather than over. */}
          <rect x={40} y={400} width={120} height={44} rx="12" className="rsys-pulse" />
          <text x={58} y={427} className="rsys-title">
            {t('radii.system.rail.title')}
          </text>
          <text x={942} y={427} className="rsys-sub" textAnchor="end">
            {t('radii.system.rail.sub')}
          </text>
        </g>
      </svg>

      <figcaption className="rsys-caption">{t('radii.system.caption')}</figcaption>
    </figure>
  );
};

export default RadiiSystem;
