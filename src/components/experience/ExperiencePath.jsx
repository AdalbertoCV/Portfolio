import Scene, { MONO, TAU, WHITE, glow, mix, rgbOf, rgba, seeded } from '../brand/Scene';
import { BRAND_CORE } from '../brand/teaserPalette';

/* ==========================================================================
   THE PATH
   The roles in the order they happened, as one climb: CASE at the start, each
   later role a bigger light further along, Radii at the top and still burning.
   A pulse runs the whole path on a loop and lights every role it reaches, so
   the trajectory reads as one thing that kept building rather than five
   unrelated entries. Each light is the role's own brand colour.

   Hover names a role and its period; a click opens its story. The panel itself
   is the standard one (brand/Scene.jsx).
   ========================================================================== */

// Chronological, which is the reverse of the list below it on the page.
export const PATH = ['case', 'labsol', 'freelance', 'evodeps', 'radii'];

const TONES = PATH.map((id) => rgbOf(BRAND_CORE[id]));

const WASH = [
  'radial-gradient(40% 70% at 88% 18%, rgba(34, 211, 238, 0.14), transparent 70%)',
  'radial-gradient(50% 60% at 12% 90%, rgba(244, 114, 182, 0.09), transparent 70%)',
].join(', ');

const make = (ctx, { width, height, narrow }, getData) => {
  const random = seeded(23);
  const left = width * (narrow ? 0.1 : 0.08);
  const span = width * (narrow ? 0.8 : 0.84);
  const floor = height * 0.72;
  const rise = height * 0.44;

  // The climb: slow at the start, steeper towards the present.
  const at = (u) => [left + span * u, floor - Math.pow(u, 1.45) * rise];
  const stops = PATH.map((id, i) => {
    const u = i / (PATH.length - 1);
    const [x, y] = at(u);
    return { id, u, x, y, r: 5 + i * 1.9 + (i === PATH.length - 1 ? 2 : 0), tone: TONES[i], flare: 0 };
  });
  const samples = Array.from({ length: 90 }, (_, k) => {
    const u = k / 89;
    const [x, y] = at(u);
    return { u, x, y };
  });
  const stars = Array.from({ length: narrow ? 22 : 46 }, () => ({
    x: random() * width,
    y: random() * height * 0.8,
    s: 0.4 + random() * 1,
    p: random() * TAU,
  }));
  const pulses = [{ u: 0 }];
  let nextPulse = 3.4;

  const stopAt = (x, y) => {
    let best = null;
    let distance = 26;
    stops.forEach((stop, i) => {
      const d = Math.hypot(stop.x - x, stop.y - y);
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    return best;
  };

  const tone = (u) => {
    const f = Math.min(Math.max(u, 0), 1) * (PATH.length - 1);
    const i = Math.min(Math.floor(f), PATH.length - 2);
    return mix(TONES[i], TONES[i + 1], f - i);
  };

  const frame = ({ dt, clock, pointer, still }) => {
    const hover = pointer ? stopAt(pointer.x, pointer.y) : null;
    const data = getData();

    // The ground under the climb.
    ctx.beginPath();
    ctx.moveTo(samples[0].x, height);
    samples.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(samples[samples.length - 1].x, height);
    ctx.closePath();
    const ground = ctx.createLinearGradient(0, floor - rise, 0, height);
    ground.addColorStop(0, rgba(TONES[4], 0.11));
    ground.addColorStop(1, rgba(TONES[0], 0));
    ctx.fillStyle = ground;
    ctx.fill();

    // A few fixed stars.
    stars.forEach((s) => {
      ctx.fillStyle = rgba(WHITE, 0.2 + 0.25 * (0.5 + 0.5 * Math.sin(clock * 0.9 + s.p)));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.s, 0, TAU);
      ctx.fill();
    });

    // The path, in the colour of whatever it is between.
    ctx.lineCap = 'round';
    for (let k = 1; k < samples.length; k += 1) {
      const a = samples[k - 1];
      const b = samples[k];
      ctx.strokeStyle = rgba(tone(b.u), 0.75);
      ctx.lineWidth = 1.6 + b.u * 1.6;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    ctx.globalCompositeOperation = 'lighter';

    // Pulses running the climb.
    if (!still && clock >= nextPulse) {
      nextPulse = clock + 4.2;
      pulses.push({ u: 0 });
    }
    for (let i = pulses.length - 1; i >= 0; i -= 1) {
      const p = pulses[i];
      const before = p.u;
      if (!still) p.u += dt * 0.2;
      stops.forEach((stop) => {
        if (before < stop.u && p.u >= stop.u) stop.flare = 1;
      });
      if (p.u >= 1.02) {
        pulses.splice(i, 1);
      } else {
        const [x, y] = at(Math.min(p.u, 1));
        glow(ctx, x, y, 16, tone(Math.min(p.u, 1)), 0.75);
        // The trail behind it.
        for (let k = 1; k <= 6; k += 1) {
          const [tx, ty] = at(Math.max(0, p.u - k * 0.012));
          glow(ctx, tx, ty, 9 - k, tone(Math.max(0, p.u - k * 0.012)), 0.4 - k * 0.055);
        }
        ctx.fillStyle = rgba(WHITE, 1);
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, TAU);
        ctx.fill();
      }
    }

    // The roles.
    stops.forEach((stop, i) => {
      stop.flare *= Math.exp(-dt * 1.8);
      const last = i === stops.length - 1;
      const lit = stop.flare + (hover === i ? 0.5 : 0);
      glow(ctx, stop.x, stop.y, stop.r * (3 + lit * 2.4), stop.tone, 0.28 + lit * 0.4 + (last ? 0.12 : 0));
      ctx.fillStyle = rgba(mix(stop.tone, WHITE, 0.35 + lit * 0.3), 1);
      ctx.beginPath();
      ctx.arc(stop.x, stop.y, stop.r * (1 + lit * 0.12), 0, TAU);
      ctx.fill();
      ctx.strokeStyle = rgba(mix(stop.tone, WHITE, 0.6), 0.6);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(stop.x, stop.y, stop.r + 4 + lit * 3, 0, TAU);
      ctx.stroke();
      if (last) {
        // Radii is the present: a ring that keeps going out, and rays.
        const t = (clock * 0.5) % 1;
        ctx.strokeStyle = rgba(stop.tone, 0.5 * (1 - t));
        ctx.beginPath();
        ctx.arc(stop.x, stop.y, stop.r + 6 + t * 26, 0, TAU);
        ctx.stroke();
        for (let k = 0; k < 8; k += 1) {
          const a = (k / 8) * TAU + clock * 0.25;
          ctx.strokeStyle = rgba(stop.tone, 0.3);
          ctx.beginPath();
          ctx.moveTo(stop.x + Math.cos(a) * (stop.r + 8), stop.y + Math.sin(a) * (stop.r + 8));
          ctx.lineTo(stop.x + Math.cos(a) * (stop.r + 15), stop.y + Math.sin(a) * (stop.r + 15));
          ctx.stroke();
        }
      }
    });

    ctx.globalCompositeOperation = 'source-over';

    // Names under each role.
    if (data) {
      ctx.font = MONO;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      stops.forEach((stop, i) => {
        const name = (data.names?.[stop.id] || '').toUpperCase();
        ctx.fillStyle = rgba(mix(stop.tone, WHITE, 0.6), hover === i ? 1 : 0.85);
        ctx.fillText(name, Math.min(Math.max(stop.x, 34), width - 34), stop.y + stop.r + 22);
      });
      ctx.textAlign = 'start';
    }

    return hover === null ? null : data?.tags?.[stops[hover].id] || '';
  };

  return { frame, pick: (x, y) => { const i = stopAt(x, y); return i === null ? null : stops[i].id; } };
};

const ExperiencePath = ({ live, names, tags, onSelect }) => (
  <Scene live={live} make={make} data={{ names, tags }} onSelect={onSelect} wash={WASH} />
);

export default ExperiencePath;
