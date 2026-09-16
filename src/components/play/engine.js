/*
 * The runner, as a plain module: no React, no dependencies, one canvas and a
 * loop. The component mounts it and gets a stop() back, which is the whole
 * surface between the two.
 *
 * Everything is authored against a fixed 800x220 world and scaled to whatever
 * the canvas actually is, so the game plays identically on a phone and on a
 * 27-inch monitor rather than being easier on the bigger one.
 */

export const WORLD = { w: 800, h: 220 };
const GROUND = 178;

// Pixels per frame at 60fps. The loop is delta-timed, so these are speeds, not
// per-tick nudges: a 144Hz screen must not play the game four times as fast.
const START_SPEED = 5.2;
const MAX_SPEED = 12.5;
const ACCELERATION = 0.0011;

const GRAVITY = 0.62;
const JUMP = -11.4;
const COYOTE = 90; // ms of forgiveness after leaving the ground

// The obstacles. Real failures, in the order a career meets them.
const BUGS = [
  { label: 'null', w: 26, h: 26 },
  { label: '404', w: 30, h: 24 },
  { label: 'NaN', w: 28, h: 26 },
  { label: 'off-by-one', w: 44, h: 22 },
  { label: '500', w: 30, h: 30 },
  { label: 'race condition', w: 58, h: 24 },
  { label: 'memory leak', w: 52, h: 28 },
  { label: 'timeout', w: 40, h: 26 },
  { label: 'CORS', w: 36, h: 26 },
  { label: 'merge conflict', w: 60, h: 26 },
];

// Every so often a deploy comes past, above head height. Catching it is worth
// points; missing it costs nothing, which is the only honest way to price a
// bonus in a game where the floor is already lava.
const DEPLOY = { w: 30, h: 22, points: 25 };

const rand = (min, max) => min + Math.random() * (max - min);

/**
 * @param {HTMLCanvasElement} canvas
 * @param {(state: {score:number, best:number, status:string}) => void} onState
 * @param {number} best   score to beat, from storage
 */
export function createGame(canvas, onState, best = 0) {
  const ctx = canvas.getContext('2d');

  let raf = null;
  let last = 0;
  let running = false;
  let status = 'ready'; // ready | running | over

  let speed = START_SPEED;
  let distance = 0;
  let score = 0;
  let dodged = 0;
  let bestScore = best;

  const laptop = { x: 96, y: GROUND, vy: 0, w: 46, h: 32, grounded: true, lastGround: 0 };
  let obstacles = [];
  let deploys = [];
  let sparks = [];
  let nextObstacle = 900;
  let nextDeploy = 4200;
  let elapsed = 0;

  const publish = () => onState({ score: Math.floor(score), best: Math.floor(bestScore), status, dodged });

  const reset = () => {
    speed = START_SPEED;
    distance = 0;
    score = 0;
    dodged = 0;
    obstacles = [];
    deploys = [];
    sparks = [];
    nextObstacle = 900;
    nextDeploy = 4200;
    elapsed = 0;
    laptop.y = GROUND;
    laptop.vy = 0;
    laptop.grounded = true;
  };

  const start = () => {
    if (status === 'running') return;
    reset();
    status = 'running';
    publish();
  };

  const jump = () => {
    if (status !== 'running') {
      start();
      return;
    }
    const canJump = laptop.grounded || elapsed - laptop.lastGround < COYOTE;
    if (!canJump) return;
    laptop.vy = JUMP;
    laptop.grounded = false;
  };

  const die = () => {
    status = 'over';
    if (score > bestScore) bestScore = score;
    publish();
  };

  /* ------------------------------------------------------------- drawing */

  // One colour, taken from the page, so the game belongs to the site rather
  // than arriving from somewhere else.
  const ink = () =>
    getComputedStyle(canvas).getPropertyValue('--play-ink').trim() || '#111111';

  const pixel = (x, y, w, h) => ctx.fillRect(Math.round(x), Math.round(y), w, h);

  // The laptop, drawn as blocks rather than as a path: this is the one place
  // on the site that is allowed to be pixels.
  const drawLaptop = (bob) => {
    const x = laptop.x;
    const y = laptop.y + bob;

    // screen
    pixel(x + 6, y - 30, 34, 22);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    pixel(x + 9, y - 27, 28, 16);
    ctx.restore();

    // two eyes on the screen, because a laptop with a face is a character and
    // a laptop without one is a rectangle
    pixel(x + 14, y - 22, 4, 4);
    pixel(x + 28, y - 22, 4, 4);

    // hinge and base
    pixel(x + 2, y - 8, 42, 4);
    pixel(x, y - 4, 46, 4);
  };

  const drawBug = (bug) => {
    const { x, y, w, h, label } = bug;
    // body
    pixel(x + 4, y - h + 6, w - 8, h - 8);
    // head
    pixel(x + w / 2 - 4, y - h, 8, 6);
    // legs
    pixel(x, y - h + 10, 4, 3);
    pixel(x + w - 4, y - h + 10, 4, 3);
    pixel(x, y - 8, 4, 3);
    pixel(x + w - 4, y - 8, 4, 3);
    // its name, under it, which is the joke
    ctx.font = '600 9px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.55;
    ctx.fillText(label, x + w / 2, GROUND + 14);
    ctx.globalAlpha = 1;
  };

  const drawDeploy = (d) => {
    // a little rocket-less package: a box with an upward chevron
    pixel(d.x, d.y, d.w, d.h);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    pixel(d.x + 4, d.y + 4, d.w - 8, d.h - 8);
    ctx.restore();
    pixel(d.x + d.w / 2 - 1, d.y + 6, 2, 10);
    pixel(d.x + d.w / 2 - 5, d.y + 10, 4, 2);
    pixel(d.x + d.w / 2 + 1, d.y + 10, 4, 2);
  };

  const draw = () => {
    const scale = canvas.width / WORLD.w;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, WORLD.w, WORLD.h);
    ctx.fillStyle = ink();

    // ground: a dashed line that moves, so speed is visible even when nothing
    // else is on screen
    const dash = 14;
    const offset = distance % (dash * 2);
    for (let x = -offset; x < WORLD.w; x += dash * 2) {
      ctx.globalAlpha = 0.35;
      pixel(x, GROUND + 2, dash, 2);
    }
    ctx.globalAlpha = 1;

    const bob = status === 'running' && laptop.grounded ? Math.sin(distance / 9) * 1.5 : 0;
    drawLaptop(bob);
    obstacles.forEach(drawBug);
    deploys.forEach(drawDeploy);

    // the little burst when a deploy is caught
    sparks.forEach((s) => {
      ctx.globalAlpha = Math.max(0, s.life / 380);
      pixel(s.x, s.y, 3, 3);
      ctx.globalAlpha = 1;
    });
  };

  /* --------------------------------------------------------------- update */

  const step = (dt) => {
    // dt in 60fps-equivalent frames, clamped so an alt-tab does not teleport
    // the laptop into a bug on return.
    const f = Math.min(dt / 16.667, 3);
    elapsed += dt;

    speed = Math.min(MAX_SPEED, speed + ACCELERATION * dt);
    distance += speed * f;
    score += (speed * f) / 6;

    laptop.vy += GRAVITY * f;
    laptop.y += laptop.vy * f;
    if (laptop.y >= GROUND) {
      laptop.y = GROUND;
      laptop.vy = 0;
      if (!laptop.grounded) laptop.lastGround = elapsed;
      laptop.grounded = true;
    } else {
      laptop.grounded = false;
      laptop.lastGround = elapsed;
    }

    nextObstacle -= dt;
    if (nextObstacle <= 0) {
      const bug = BUGS[Math.floor(rand(0, BUGS.length))];
      obstacles.push({ ...bug, x: WORLD.w + 40, y: GROUND });
      // The gap shrinks with speed but never below what a jump can clear.
      const gap = rand(1500, 2400) * (START_SPEED / speed);
      nextObstacle = Math.max(620, gap);
    }

    nextDeploy -= dt;
    if (nextDeploy <= 0) {
      deploys.push({ ...DEPLOY, x: WORLD.w + 40, y: GROUND - rand(78, 104) });
      nextDeploy = rand(6000, 11000);
    }

    obstacles.forEach((o) => {
      o.x -= speed * f;
    });
    deploys.forEach((d) => {
      d.x -= speed * f;
    });
    sparks.forEach((s) => {
      s.x += s.vx * f;
      s.y += s.vy * f;
      s.life -= dt;
    });

    const passed = obstacles.filter((o) => o.x + o.w < laptop.x && !o.counted);
    passed.forEach((o) => {
      o.counted = true;
      dodged += 1;
    });

    obstacles = obstacles.filter((o) => o.x > -90);
    deploys = deploys.filter((d) => d.x > -60);
    sparks = sparks.filter((s) => s.life > 0);

    // Hitboxes are inset: pixel-perfect collision on a 32px sprite feels like
    // cheating to the person holding the spacebar.
    const lx = laptop.x + 6;
    const lw = laptop.w - 12;
    const ly = laptop.y - 30 + 4;
    const lh = 30 - 6;

    for (const o of obstacles) {
      const ox = o.x + 5;
      const ow = o.w - 10;
      const oy = o.y - o.h + 3;
      const oh = o.h - 4;
      if (lx < ox + ow && lx + lw > ox && ly < oy + oh && ly + lh > oy) {
        die();
        return;
      }
    }

    for (const d of deploys) {
      if (lx < d.x + d.w && lx + lw > d.x && ly < d.y + d.h && ly + lh > d.y) {
        d.x = -999;
        score += DEPLOY.points;
        for (let i = 0; i < 8; i += 1) {
          sparks.push({
            x: d.x + d.w / 2,
            y: d.y + d.h / 2,
            vx: rand(-2, 2),
            vy: rand(-2, 1),
            life: 380,
          });
        }
      }
    }
  };

  const frame = (time) => {
    if (!running) return;
    const dt = last ? time - last : 16.667;
    last = time;
    if (status === 'running') {
      step(dt);
      publish();
    }
    draw();
    raf = requestAnimationFrame(frame);
  };

  running = true;
  raf = requestAnimationFrame(frame);
  draw();
  publish();

  return {
    jump,
    start,
    // Pausing on blur rather than running in a hidden tab: nobody wants to
    // come back to a game over they did not see.
    pause: () => {
      if (status === 'running') {
        status = 'over';
        if (score > bestScore) bestScore = score;
        publish();
      }
    },
    stop: () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    },
  };
}
