import Scene, { BASE, MONO, TAU, WHITE, glow, mix, rgbOf, rgba, seeded } from '../brand/Scene';
import { BRAND_CORE } from '../brand/teaserPalette';

/* ==========================================================================
   THE SIGNAL
   The six reasons people write, each in the colour of what it is about, around
   one receiver in the middle. Messages leave the reasons and arrive; every
   arrival rings the receiver in the sender's colour, and now and then an answer
   goes back out. That is the whole page in a picture: write, and it gets here.

   Hover names a reason; a click takes the reader to the form. The panel itself
   is the standard one (brand/Scene.jsx).
   ========================================================================== */

// Same ids, same order as the reasons on the page below it.
export const SIGNAL_REASONS = ['radii', 'moonphase', 'evodeps', 'stackselect', 'build', 'ideas'];

const TONES = {
  radii: rgbOf(BRAND_CORE.radii),
  moonphase: rgbOf(BRAND_CORE.moonphase),
  evodeps: rgbOf(BRAND_CORE.evodeps),
  stackselect: rgbOf(BRAND_CORE.stackselect),
  build: rgbOf(BRAND_CORE.freelance),
  ideas: rgbOf(BRAND_CORE.case),
};

const WASH = 'radial-gradient(40% 80% at 50% 50%, rgba(120, 170, 255, 0.11), transparent 72%)';

const make = (ctx, { width, height, narrow }, getData) => {
  const random = seeded(31);
  const cx = width / 2;
  const cy = height * 0.5;
  const rx = Math.min(width * 0.36, 360);
  const ry = height * 0.36;
  const nodes = SIGNAL_REASONS.map((id, i) => {
    const angle = -Math.PI / 2 + (i / SIGNAL_REASONS.length) * TAU + 0.35;
    return {
      id,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
      tone: TONES[id],
      phase: random() * TAU,
      flare: 0,
    };
  });
  const dust = Array.from({ length: narrow ? 24 : 50 }, () => ({
    x: random() * width,
    y: random() * height,
    s: 0.4 + random() * 0.9,
    p: random() * TAU,
  }));
  const messages = [];
  const replies = [];
  const rings = [];
  let nextMessage = 0;
  let nextReply = 2.2;
  let hit = 0;

  const nodeAt = (x, y) => {
    let best = null;
    let distance = 28;
    nodes.forEach((n, i) => {
      const d = Math.hypot(n.x - x, n.y - y);
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    return best;
  };

  const bob = (n, clock) => [n.x + Math.cos(clock * 0.6 + n.phase) * 3, n.y + Math.sin(clock * 0.8 + n.phase) * 3];

  const frame = ({ dt, clock, pointer, still }) => {
    const hover = pointer ? nodeAt(pointer.x, pointer.y) : null;
    const data = getData();

    dust.forEach((d) => {
      ctx.fillStyle = rgba(WHITE, 0.14 + 0.2 * (0.5 + 0.5 * Math.sin(clock * 0.8 + d.p)));
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.s, 0, TAU);
      ctx.fill();
    });

    // The links: faint curves from each reason to the receiver.
    nodes.forEach((n, i) => {
      const [x, y] = bob(n, clock);
      const lit = hover === i ? 0.3 : 0;
      ctx.strokeStyle = rgba(mix(BASE, n.tone, 0.6), 0.14 + lit + n.flare * 0.3);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo((x + cx) / 2 + (cy - y) * 0.18, (y + cy) / 2 - (cx - x) * 0.18, cx, cy);
      ctx.stroke();
    });

    if (!still && clock >= nextMessage) {
      nextMessage = clock + (narrow ? 0.75 : 0.5);
      messages.push({ i: Math.floor(Math.random() * nodes.length), t: 0 });
      if (messages.length > 20) messages.shift();
    }
    if (!still && clock >= nextReply) {
      nextReply = clock + 3.2;
      replies.push({ i: Math.floor(Math.random() * nodes.length), t: 0 });
    }

    ctx.globalCompositeOperation = 'lighter';

    const along = (n, t) => {
      const [x, y] = bob(n, clock);
      const qx = (x + cx) / 2 + (cy - y) * 0.18;
      const qy = (y + cy) / 2 - (cx - x) * 0.18;
      const u = 1 - t;
      return [u * u * x + 2 * u * t * qx + t * t * cx, u * u * y + 2 * u * t * qy + t * t * cy];
    };

    // Messages arriving.
    for (let k = messages.length - 1; k >= 0; k -= 1) {
      const m = messages[k];
      if (!still) m.t += dt * 0.55;
      if (m.t >= 1) {
        messages.splice(k, 1);
        rings.push({ tone: nodes[m.i].tone, t: 0 });
        nodes[m.i].flare = 1;
        hit = 1;
      } else {
        const [x, y] = along(nodes[m.i], m.t);
        glow(ctx, x, y, 9, nodes[m.i].tone, 0.65);
        ctx.fillStyle = rgba(WHITE, 0.95);
        ctx.fillRect(x - 1.6, y - 1.1, 3.2, 2.2);
      }
    }
    // And an answer going back.
    for (let k = replies.length - 1; k >= 0; k -= 1) {
      const m = replies[k];
      if (!still) m.t += dt * 0.4;
      if (m.t >= 1) {
        replies.splice(k, 1);
        nodes[m.i].flare = 1;
      } else {
        const [x, y] = along(nodes[m.i], 1 - m.t);
        glow(ctx, x, y, 11, WHITE, 0.55);
        ctx.fillStyle = rgba(WHITE, 1);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, TAU);
        ctx.fill();
      }
    }

    // The receiver rings on every arrival.
    hit *= Math.exp(-dt * 3);
    for (let k = rings.length - 1; k >= 0; k -= 1) {
      const ring = rings[k];
      if (!still) ring.t += dt * 0.9;
      if (ring.t >= 1) {
        rings.splice(k, 1);
      } else {
        ctx.strokeStyle = rgba(ring.tone, 0.6 * (1 - ring.t));
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(cx, cy, 14 + ring.t * 46, 0, TAU);
        ctx.stroke();
      }
    }
    glow(ctx, cx, cy, 34 + hit * 14, WHITE, 0.26 + hit * 0.25);
    ctx.fillStyle = rgba(WHITE, 1);
    ctx.beginPath();
    ctx.arc(cx, cy, 5 + hit * 1.5, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = rgba(WHITE, 0.55);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, TAU);
    ctx.stroke();

    // The reasons.
    nodes.forEach((n, i) => {
      const [x, y] = bob(n, clock);
      n.flare *= Math.exp(-dt * 2.2);
      const lit = n.flare + (hover === i ? 0.5 : 0);
      glow(ctx, x, y, 22 + lit * 14, n.tone, 0.34 + lit * 0.4);
      ctx.fillStyle = rgba(mix(n.tone, WHITE, 0.4 + lit * 0.3), 1);
      ctx.beginPath();
      ctx.arc(x, y, 6 + lit * 1.6, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = rgba(mix(n.tone, WHITE, 0.6), 0.6);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 10 + lit * 3, 0, TAU);
      ctx.stroke();
    });

    ctx.globalCompositeOperation = 'source-over';

    if (data?.email && !narrow) {
      ctx.font = MONO;
      ctx.textAlign = 'center';
      ctx.fillStyle = rgba(WHITE, 0.75);
      ctx.fillText(data.email, cx, cy + 46);
      ctx.textAlign = 'start';
    }

    return hover === null ? null : data?.titles?.[nodes[hover].id] || '';
  };

  return { frame, pick: (x, y) => (nodeAt(x, y) === null ? null : true) };
};

const ContactSignal = ({ live, titles, email, onSelect }) => (
  <Scene live={live} make={make} data={{ titles, email }} onSelect={onSelect} wash={WASH} />
);

export default ContactSignal;
