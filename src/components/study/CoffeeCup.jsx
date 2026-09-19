/* A cup of coffee, in blocks, with steam that keeps going.

   Pixel art rather than a line drawing because this is the second place on
   the site allowed to be pixels — the first is the game — and because a
   hand-placed grid reads as made by a person, which is the whole tone of the
   page it sits on. */

const Px = ({ x, y, w = 1, h = 1, c }) => (
  <rect x={x} y={y} width={w} height={h} fill={c} />
);

const CoffeeCup = () => (
  <svg
    className="study-cup"
    viewBox="0 0 34 34"
    shapeRendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    {/* Three ribbons of steam, each on its own rhythm so they never line up
        into one pulsing blob. */}
    <g className="study-steam">
      {[
        [11, 1, 0],
        [16, 0, 0.6],
        [21, 2, 1.2],
      ].map(([x, y, delay]) => (
        <g key={x} style={{ animationDelay: `${delay}s` }}>
          <Px x={x} y={y + 4} c="var(--study-steam)" />
          <Px x={x + 1} y={y + 3} c="var(--study-steam)" />
          <Px x={x + 1} y={y + 2} c="var(--study-steam)" />
          <Px x={x} y={y + 1} c="var(--study-steam)" />
        </g>
      ))}
    </g>

    {/* The cup. Lip, body, and the coffee sitting a row below the rim. */}
    <Px x={6} y={12} w={20} h={2} c="var(--study-ink)" />
    <Px x={8} y={14} w={16} h={1} c="var(--study-brew)" />
    <Px x={6} y={14} w={2} h={12} c="var(--study-ink)" />
    <Px x={24} y={14} w={2} h={12} c="var(--study-ink)" />
    <Px x={8} y={24} w={16} h={2} c="var(--study-ink)" />
    <Px x={8} y={15} w={16} h={9} c="var(--study-cupface)" />

    {/* The handle, and the saucer it all stands on. */}
    <Px x={26} y={16} w={4} h={2} c="var(--study-ink)" />
    <Px x={28} y={18} w={2} h={4} c="var(--study-ink)" />
    <Px x={26} y={22} w={4} h={2} c="var(--study-ink)" />
    <Px x={4} y={26} w={24} h={2} c="var(--study-ink)" />
  </svg>
);

export default CoffeeCup;
