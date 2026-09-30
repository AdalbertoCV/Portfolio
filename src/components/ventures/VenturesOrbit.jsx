import Scene, { BASE, MONO, TAU, WHITE, glow, mix, rgba, seeded } from '../brand/Scene';
import { CURRENT_STAGE, STAGES } from './plan';

/* ==========================================================================
   THE TWO COMPANIES AS TWO SYSTEMS
   Each company is a core with four orbits around it, one per stage of the plan
   on this page. The orbit the plan is in now is lit and busy; the ones still
   ahead are drawn, dashed and quiet, waiting to be reached. Between the two,
   amber: Freelance, the incubator both came out of, feeding each core.

   Moonphase is a moon that goes through its phases; StackSelect is a small
   network of nodes passing impulses. Impulses leave each core outwards and
   light every orbit they cross, which is the whole idea of the plan put where
   it can be seen: one trajectory, crossed stage by stage.

   The panel itself is the standard one (brand/Scene.jsx).
   ========================================================================== */

const MOON = [167, 139, 250];
const STACK = [52, 211, 153];
const AMBER = [245, 185, 66];
const RINGS = [0.36, 0.58, 0.79, 1];
const SQUASH = 0.7;
const NOW = Math.max(0, STAGES.findIndex((stage) => stage.id === CURRENT_STAGE));

const WASH = [
  'radial-gradient(34% 80% at 25% 48%, rgba(167, 139, 250, 0.12), transparent 70%)',
  'radial-gradient(34% 80% at 75% 48%, rgba(52, 211, 153, 0.1), transparent 70%)',
  'radial-gradient(14% 40% at 50% 48%, rgba(245, 185, 66, 0.1), transparent 70%)',
].join(', ');

const make = (ctx, { width, height, narrow }, getData) => {
  const random = seeded(17);
  const r = Math.min(width * 0.225, (height * 0.46) / SQUASH);
  const cy = height * 0.47;
  const build = (x, tone, id) => ({
    id,
    x,
    y: cy,
    r,
    tone,
    flare: RINGS.map(() => 0),
    sats: RINGS.flatMap((ring, ringIndex) => {
      const count = ringIndex === NOW ? 3 : 2 + ringIndex;
      return Array.from({ length: count }, (_, k) => ({
        ring: ringIndex,
        angle: (k / count) * TAU + random() * 0.8,
        speed: (ringIndex === NOW ? 0.5 : 0.22) * (ringIndex % 2 ? -1 : 1) * (0.85 + random() * 0.3),
        size: ringIndex === NOW ? 2.1 : 1.4,
      }));
    }),
  });
  const systems = [build(width * 0.25, MOON, 'moonphase'), build(width * 0.75, STACK, 'stackselect')];
  const seed = { x: width / 2, y: cy };
  const impulses = [];
  const feeds = [];
  let nextImpulse = 0;
  let nextFeed = 0;

  const ringAt = (x, y) => {
    let best = null;
    let distance = 0.09;
    systems.forEach((s) => {
      const d = Math.hypot((x - s.x) / s.r, (y - s.y) / (s.r * SQUASH));
      RINGS.forEach((ring, i) => {
        const gap = Math.abs(d - ring);
        if (gap < distance) {
          distance = gap;
          best = i;
        }
      });
    });
    return best;
  };

  const onRing = (s, fraction, angle) => [
    s.x + Math.cos(angle) * s.r * fraction,
    s.y + Math.sin(angle) * s.r * fraction * SQUASH,
  ];

  const moonCore = (s, radius, clock) => {
    glow(ctx, s.x, s.y, radius * 3.4, s.tone, 0.32);
    ctx.save();
    ctx.beginPath();
    ctx.arc(s.x, s.y, radius, 0, TAU);
    ctx.clip();
    const body = ctx.createRadialGradient(s.x - radius * 0.35, s.y - radius * 0.4, radius * 0.1, s.x, s.y, radius);
    body.addColorStop(0, rgba(mix(s.tone, WHITE, 0.75), 1));
    body.addColorStop(1, rgba(mix(s.tone, WHITE, 0.15), 1));
    ctx.fillStyle = body;
    ctx.fillRect(s.x - radius, s.y - radius, radius * 2, radius * 2);
    // The phase: a shadow sliding across the disc and out the other side.
    ctx.fillStyle = 'rgba(7,9,13,0.93)';
    ctx.beginPath();
    ctx.arc(s.x + Math.sin(clock * 0.45) * radius * 2.05, s.y, radius * 1.02, 0, TAU);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = rgba(s.tone, 0.65);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, radius, 0, TAU);
    ctx.stroke();
  };

  const netCore = (s, radius, clock) => {
    glow(ctx, s.x, s.y, radius * 3.4, s.tone, 0.3);
    const nodes = Array.from({ length: 6 }, (_, k) => {
      const a = (k / 6) * TAU + clock * 0.18;
      return [s.x + Math.cos(a) * radius, s.y + Math.sin(a) * radius];
    });
    ctx.lineWidth = 1;
    nodes.forEach((n, k) => {
      const m = nodes[(k + 1) % 6];
      const o = nodes[(k + 2) % 6];
      ctx.strokeStyle = rgba(s.tone, 0.4);
      ctx.beginPath();
      ctx.moveTo(n[0], n[1]);
      ctx.lineTo(m[0], m[1]);
      ctx.moveTo(n[0], n[1]);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.strokeStyle = rgba(s.tone, 0.16);
      ctx.beginPath();
      ctx.moveTo(n[0], n[1]);
      ctx.lineTo(o[0], o[1]);
      ctx.stroke();
      // An impulse going in to the middle.
      const t = (clock * 0.7 + k * 0.37) % 1;
      ctx.fillStyle = rgba(mix(s.tone, WHITE, 0.6), 0.8 * (1 - t));
      ctx.beginPath();
      ctx.arc(n[0] + (s.x - n[0]) * t, n[1] + (s.y - n[1]) * t, 1.5, 0, TAU);
      ctx.fill();
    });
    nodes.forEach((n) => {
      ctx.fillStyle = rgba(mix(s.tone, WHITE, 0.45), 1);
      ctx.beginPath();
      ctx.arc(n[0], n[1], 2.4, 0, TAU);
      ctx.fill();
    });
    ctx.fillStyle = rgba(WHITE, 1);
    ctx.beginPath();
    ctx.arc(s.x, s.y, 3.6, 0, TAU);
    ctx.fill();
  };

  const curve = (to, t) => {
    const s = systems[to];
    const mx = (seed.x + s.x) / 2;
    const my = seed.y - height * 0.22;
    const u = 1 - t;
    return [u * u * seed.x + 2 * u * t * mx + t * t * s.x, u * u * seed.y + 2 * u * t * my + t * t * s.y];
  };

  const frame = ({ dt, clock, pointer, still }) => {
    const hover = pointer ? ringAt(pointer.x, pointer.y) : null;
    const text = getData();

    if (!still && clock >= nextImpulse) {
      nextImpulse = clock + (narrow ? 0.9 : 0.55);
      impulses.push({
        s: systems[Math.floor(Math.random() * systems.length)],
        angle: Math.random() * TAU,
        t: 0.08,
        speed: 0.22 + Math.random() * 0.12,
      });
      if (impulses.length > 28) impulses.shift();
    }
    if (!still && clock >= nextFeed) {
      nextFeed = clock + 1.1;
      feeds.push({ to: feeds.length % 2, t: 0 });
      if (feeds.length > 8) feeds.shift();
    }

    // Orbits.
    systems.forEach((s) => {
      s.flare = s.flare.map((f) => f * Math.exp(-dt * 2.4));
      RINGS.forEach((ring, i) => {
        const current = i === NOW;
        const passed = i < NOW;
        const lit = (hover === i ? 0.3 : 0) + s.flare[i];
        ctx.lineWidth = current ? 1.6 : 1;
        ctx.strokeStyle = rgba(mix(BASE, s.tone, current || passed ? 0.85 : 0.45), (current ? 0.6 : passed ? 0.4 : 0.26) + lit * 0.6);
        ctx.setLineDash(current ? [] : [3, 6]);
        ctx.lineDashOffset = current ? 0 : -clock * 6;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.r * ring, s.r * ring * SQUASH, 0, 0, TAU);
        ctx.stroke();
        if (current) {
          // The orbit the plan is in: a halo that breathes.
          ctx.setLineDash([]);
          ctx.lineWidth = 5;
          ctx.strokeStyle = rgba(s.tone, 0.06 + 0.05 * Math.sin(clock * 1.6));
          ctx.beginPath();
          ctx.ellipse(s.x, s.y, s.r * ring, s.r * ring * SQUASH, 0, 0, TAU);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);
    });

    ctx.globalCompositeOperation = 'lighter';

    // Amber from the incubator to each core, in a curve that bows upward.
    systems.forEach((s) => {
      ctx.strokeStyle = rgba(AMBER, 0.14);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(seed.x, seed.y);
      ctx.quadraticCurveTo((seed.x + s.x) / 2, seed.y - height * 0.22, s.x, s.y);
      ctx.stroke();
    });
    for (let i = feeds.length - 1; i >= 0; i -= 1) {
      const f = feeds[i];
      if (!still) f.t += dt * 0.42;
      if (f.t >= 1) {
        feeds.splice(i, 1);
      } else {
        const [x, y] = curve(f.to, f.t);
        glow(ctx, x, y, 7, mix(AMBER, systems[f.to].tone, f.t), 0.7);
        ctx.fillStyle = rgba(WHITE, 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, TAU);
        ctx.fill();
      }
    }

    // The incubator.
    glow(ctx, seed.x, seed.y, 24 + (0.5 + 0.5 * Math.sin(clock * 2.2)) * 8, AMBER, 0.42);
    ctx.fillStyle = rgba(mix(AMBER, WHITE, 0.5), 1);
    ctx.beginPath();
    ctx.arc(seed.x, seed.y, 3.4, 0, TAU);
    ctx.fill();

    // Impulses climbing the orbits.
    for (let i = impulses.length - 1; i >= 0; i -= 1) {
      const p = impulses[i];
      const before = p.t;
      if (!still) p.t += p.speed * dt;
      RINGS.forEach((ring, k) => {
        if (before < ring && p.t >= ring) p.s.flare[k] = 1;
      });
      if (p.t >= 1.04) {
        impulses.splice(i, 1);
      } else {
        const [x, y] = onRing(p.s, p.t, p.angle + p.t * 0.9);
        // Past the orbit the plan has reached, an impulse is only a hope.
        const reach = p.t <= RINGS[NOW] + 0.02 ? 1 : 0.45;
        glow(ctx, x, y, 8, p.s.tone, 0.6 * reach * (1 - Math.max(0, p.t - 0.9) * 6));
        ctx.fillStyle = rgba(WHITE, 0.9 * reach);
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, TAU);
        ctx.fill();
      }
    }

    // Satellites.
    systems.forEach((s) => {
      s.sats.forEach((sat) => {
        if (!still) sat.angle += sat.speed * dt;
        const [x, y] = onRing(s, RINGS[sat.ring], sat.angle);
        const current = sat.ring === NOW;
        if (current) glow(ctx, x, y, 9, s.tone, 0.45);
        ctx.fillStyle = rgba(mix(s.tone, WHITE, current ? 0.6 : 0.3), current ? 0.95 : 0.5);
        ctx.beginPath();
        ctx.arc(x, y, sat.size, 0, TAU);
        ctx.fill();
      });
    });

    ctx.globalCompositeOperation = 'source-over';

    const core = Math.min(systems[0].r * 0.17, 22);
    moonCore(systems[0], core, clock);
    netCore(systems[1], core * 0.9, clock);

    if (text) {
      ctx.font = MONO;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      systems.forEach((s) => {
        ctx.fillStyle = rgba(mix(s.tone, WHITE, 0.55), 0.92);
        ctx.fillText((text[s.id] || '').toUpperCase(), s.x, height - 16);
      });
      ctx.fillStyle = rgba(mix(AMBER, WHITE, 0.3), 0.85);
      ctx.fillText((text.freelance || '').toUpperCase(), seed.x, seed.y + 30);
      ctx.textAlign = 'start';
    }

    return hover === null ? null : text?.stages?.[hover] || '';
  };

  return { frame, pick: (x, y) => (ringAt(x, y) === null ? null : true) };
};

const VenturesOrbit = ({ live, labels, onSelect }) => (
  <Scene live={live} make={make} data={labels} onSelect={onSelect} wash={WASH} />
);

export default VenturesOrbit;
