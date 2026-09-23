import { useEffect, useState } from 'react';
import '../brand/hacker.css';

/* ==========================================================================
   THE BOT, FULL LENGTH

   The hooded figure's colleague: same grid, same green, same rule that
   nothing ever fades — a pixel is on or it is off. Standing rather than
   cropped at the shoulders, because this one is not watching anything, it is
   working, and work is something a body does.

   Four things move, each on its own clock so they never line up into one
   pulse: the antenna pings, a block of light crosses the chest bar, the three
   status lamps come up left to right, and the whole figure rises a single
   pixel and settles. One pixel is the entire idle animation. At this scale it
   is enough to read as breathing, and anything more would read as fidgeting.

   All of it is decoration, so the drawing is aria-hidden and the section it
   sits in carries the words.
   ======================================================================== */

const W = 40;
const H = 64;

const Px = ({ r: [x, y, w, h], className }) => (
  <rect className={className} x={x} y={y} width={w} height={h} />
);

// x, y, w, h. Symmetric about 19.5, which is why every pair of numbers below
// adds up the way it does — a robot that is a pixel off-centre looks broken
// rather than hand-made.
const SHELL = [
  // Antenna stalk.
  [19, 4, 2, 4],
  // Head.
  [13, 7, 14, 1],
  [11, 8, 18, 1],
  [10, 9, 20, 11],
  [11, 20, 18, 1],
  [13, 21, 14, 1],
  // Neck.
  [17, 22, 6, 2],
  // Shoulders and torso.
  [11, 24, 18, 2],
  [10, 26, 20, 14],
  [11, 40, 18, 2],
  // Arms, and the blocks at the end of them. One pixel clear of the torso
  // on each side: touching, they read as part of the body rather than as
  // limbs, and the figure loses its shoulders.
  [4, 25, 5, 2],
  [4, 27, 5, 12],
  [3, 39, 6, 4],
  [31, 25, 5, 2],
  [31, 27, 5, 12],
  [31, 39, 6, 4],
  // Hips.
  [12, 42, 16, 3],
  // Legs.
  [13, 45, 6, 12],
  [21, 45, 6, 12],
  // Feet.
  [11, 57, 9, 4],
  [20, 57, 9, 4],
];

// Cut out of the shell: the visor and the chest panel. Darker than the shell,
// which is what makes the shell read as a surface.
const INSET = [
  [13, 11, 14, 1],
  [12, 12, 16, 6],
  [13, 18, 14, 1],
  [14, 29, 12, 8],
];

// The light down the left side, as on the hooded figure — one column, so the
// two of them are lit by the same lamp.
const RIM = [
  [19, 4, 1, 4],
  [13, 7, 2, 1],
  [11, 8, 1, 1],
  [10, 9, 1, 11],
  [10, 26, 1, 14],
  [4, 25, 1, 2],
  [4, 27, 1, 12],
  [3, 39, 1, 4],
  [13, 45, 1, 12],
  [11, 57, 1, 4],
];

const EYES = [15, 21];
const EYE_Y = 14;

// Three lamps under the chest bar, lit left to right.
const LAMPS = [16, 19, 22];

const WorkBot = () => {
  const [blink, setBlink] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let next;
    const schedule = () => {
      next = window.setTimeout(() => {
        setBlink(Math.random() < 0.26 ? 'two' : 'one');
        schedule();
      }, 3000 + Math.random() * 5200);
    };

    schedule();
    return () => window.clearTimeout(next);
  }, []);

  return (
    <div
      className="workbot"
      data-blink={blink || undefined}
      onAnimationEnd={(event) => {
        // The bob, the ping and the bar never stop, so only the blink's own
        // animation is allowed to clear the blink.
        if (event.animationName.startsWith('watcherBlink')) setBlink(null);
      }}
      aria-hidden="true"
    >
      <svg className="wb-art" viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" focusable="false">
        {/* Everything but the shadow rises together, so the bob is the figure
            leaving the ground rather than the drawing sliding. */}
        <g className="wb-body">
          {SHELL.map((r) => (
            <Px key={`s${r[0]}-${r[1]}`} r={r} className="wb-shell" />
          ))}
          {INSET.map((r) => (
            <Px key={`i${r[0]}-${r[1]}`} r={r} className="wb-inset" />
          ))}
          {RIM.map((r) => (
            <Px key={`r${r[0]}-${r[1]}`} r={r} className="wb-rim" />
          ))}

          {/* The antenna's bulb, pinging on its own clock. */}
          <g className="wb-ping">
            <Px r={[18, 1, 4, 3]} />
          </g>

          {EYES.map((ex) => (
            <g className="wb-eye" key={ex}>
              <rect className="hk-open" x={ex} y={EYE_Y} width="4" height="3" />
              <rect className="hk-shut" x={ex} y={EYE_Y + 1} width="4" height="1" />
            </g>
          ))}

          {/* The chest. A bar with a block of light crossing it, and three
              lamps that come up under it in order: the readout of something
              running, which is the only thing this drawing has to say. */}
          <g className="wb-work">
            <Px r={[16, 33, 8, 1]} className="wb-track" />
            <g className="wb-runner">
              <Px r={[16, 33, 2, 1]} />
            </g>
            {LAMPS.map((lx, i) => (
              <g className="wb-lamp" key={lx} style={{ animationDelay: `${i * 0.42}s` }}>
                <Px r={[lx, 30, 2, 2]} />
              </g>
            ))}
          </g>
        </g>

        {/* Stays on the ground while the body rises, and narrows a pixel when
            it does — the only reason the bob reads as a lift. */}
        <Px r={[11, 62, 18, 1]} className="wb-shadow" />
      </svg>
    </div>
  );
};

export default WorkBot;
