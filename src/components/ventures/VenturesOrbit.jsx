import { useEffect, useRef } from 'react';
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

   A dark instrument panel in both themes (see .vo-panel). Nothing in it
   follows the scroll; it runs only while on screen (useLive) and is drawn
   once, still, under reduced motion.
   ========================================================================== */

const MOON = [167, 139, 250];
const STACK = [52, 211, 153];
const AMBER = [245, 185, 66];
const WHITE = [236, 242, 255];
const BASE = [150, 172, 205];

const TAU = Math.PI * 2;
const RINGS = [0.36, 0.58, 0.79, 1];
const SQUASH = 0.7;

const rgba = (c, a) => `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${Math.max(0, Math.min(a, 1)).toFixed(3)})`;
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const NOW = Math.max(0, STAGES.findIndex((stage) => stage.id === CURRENT_STAGE));

const VenturesOrbit = ({ live, labels, onSelect }) => {
  const canvasRef = useRef(null);
  const tagRef = useRef(null);
  const stateRef = useRef({ labels, onSelect });

  useEffect(() => {
    stateRef.current = { labels, onSelect };
  }, [labels, onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let narrow = false;
    let systems = [];
    let seed = { x: 0, y: 0 };
    let last = performance.now();
    let clock = 0;
    let raf = 0;
    let pointer = null;
    let shown = '';
    let nextImpulse = 0;
    const impulses = [];
    const feeds = [];
    let nextFeed = 0;

    const build = () => {
      const random = seeded(17);
      const r = Math.min(width * 0.225, (height * 0.46) / SQUASH);
      const cy = height * 0.47;
      const make = (x, tone, id) => ({
        id,
        x,
        y: cy,
        r,
        tone,
        flare: RINGS.map(() => 0),
        sats: RINGS.flatMap((ring, ring_i) => {
          const count = ring_i === NOW ? 3 : 2 + ring_i;
          return Array.from({ length: count }, (_, k) => ({
            ring: ring_i,
            angle: (k / count) * TAU + random() * 0.8,
            speed: (ring_i === NOW ? 0.5 : 0.22) * (ring_i % 2 ? -1 : 1) * (0.85 + random() * 0.3),
            size: ring_i === NOW ? 2.1 : 1.4,
          }));
        }),
      });
      systems = [make(width * 0.25, MOON, 'moonphase'), make(width * 0.75, STACK, 'stackselect')];
      seed = { x: width / 2, y: cy };
    };

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      narrow = width < 560;
      const dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const tag = (text) => {
      if (text === shown) return;
      shown = text;
      if (tagRef.current) tagRef.current.textContent = text;
    };

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

    const ellipsePoint = (s, fraction, angle) => [
      s.x + Math.cos(angle) * s.r * fraction,
      s.y + Math.sin(angle) * s.r * fraction * SQUASH,
    ];

    const glow = (x, y, radius, tone, alpha) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, rgba(tone, alpha));
      g.addColorStop(1, rgba(tone, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
    };

    const moonCore = (s, radius) => {
      glow(s.x, s.y, radius * 3.4, s.tone, 0.32);
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
      const shift = Math.sin(clock * 0.45) * radius * 2.05;
      ctx.fillStyle = 'rgba(7,9,13,0.93)';
      ctx.beginPath();
      ctx.arc(s.x + shift, s.y, radius * 1.02, 0, TAU);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = rgba(s.tone, 0.65);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, radius, 0, TAU);
      ctx.stroke();
    };

    const netCore = (s, radius) => {
      glow(s.x, s.y, radius * 3.4, s.tone, 0.3);
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
        // An impulse going round the hexagon and in to the middle.
        const t = (clock * 0.7 + k * 0.37) % 1;
        const px = n[0] + (s.x - n[0]) * t;
        const py = n[1] + (s.y - n[1]) * t;
        ctx.fillStyle = rgba(mix(s.tone, WHITE, 0.6), 0.8 * (1 - t));
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, TAU);
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

    const draw = (now) => {
      // A canvas with no size (a page swapped out from under it, a hidden tab) has
      // nothing to draw on, and a gradient on it throws.
      if (!(width > 1) || !(height > 1)) return;
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!still) clock += dt;

      ctx.clearRect(0, 0, width, height);
      const hover = pointer ? ringAt(pointer.x, pointer.y) : null;
      const { labels: text } = stateRef.current;
      tag(hover === null || !text?.stages?.[hover] ? '' : text.stages[hover]);
      canvas.style.cursor = hover === null ? '' : 'pointer';

      // Impulses leave each core on a slow random heading and climb.
      if (!still && clock >= nextImpulse) {
        nextImpulse = clock + (narrow ? 0.9 : 0.55);
        const s = systems[Math.floor(Math.random() * systems.length)];
        impulses.push({ s, angle: Math.random() * TAU, t: 0.08, speed: 0.22 + Math.random() * 0.12 });
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
          ctx.lineDashOffset = -clock * (current ? 0 : 6);
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
        const mx = (seed.x + s.x) / 2;
        const my = seed.y - height * 0.22;
        ctx.strokeStyle = rgba(AMBER, 0.14);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(seed.x, seed.y);
        ctx.quadraticCurveTo(mx, my, s.x, s.y);
        ctx.stroke();
      });
      for (let i = feeds.length - 1; i >= 0; i -= 1) {
        const f = feeds[i];
        if (!still) f.t += dt * 0.42;
        if (f.t >= 1) {
          feeds.splice(i, 1);
          continue;
        }
        const s = systems[f.to];
        const mx = (seed.x + s.x) / 2;
        const my = seed.y - height * 0.22;
        const u = 1 - f.t;
        const x = u * u * seed.x + 2 * u * f.t * mx + f.t * f.t * s.x;
        const y = u * u * seed.y + 2 * u * f.t * my + f.t * f.t * s.y;
        glow(x, y, 7, mix(AMBER, s.tone, f.t), 0.7);
        ctx.fillStyle = rgba(WHITE, 0.9);
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, TAU);
        ctx.fill();
      }

      // The incubator.
      const beat = 0.5 + 0.5 * Math.sin(clock * 2.2);
      glow(seed.x, seed.y, 24 + beat * 8, AMBER, 0.42);
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
          continue;
        }
        const [x, y] = ellipsePoint(p.s, p.t, p.angle + p.t * 0.9);
        // Past the orbit the plan has reached, an impulse is only a hope.
        const reach = p.t <= RINGS[NOW] + 0.02 ? 1 : 0.45;
        glow(x, y, 8, p.s.tone, 0.6 * reach * (1 - Math.max(0, p.t - 0.9) * 6));
        ctx.fillStyle = rgba(WHITE, 0.9 * reach);
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, TAU);
        ctx.fill();
      }

      // Satellites.
      systems.forEach((s) => {
        s.sats.forEach((sat) => {
          if (!still) sat.angle += sat.speed * dt;
          const [x, y] = ellipsePoint(s, RINGS[sat.ring], sat.angle);
          const current = sat.ring === NOW;
          if (current) glow(x, y, 9, s.tone, 0.45);
          ctx.fillStyle = rgba(mix(s.tone, WHITE, current ? 0.6 : 0.3), current ? 0.95 : 0.5);
          ctx.beginPath();
          ctx.arc(x, y, sat.size, 0, TAU);
          ctx.fill();
        });
      });

      ctx.globalCompositeOperation = 'source-over';

      // Cores.
      const core = Math.min(systems[0].r * 0.17, 22);
      moonCore(systems[0], core);
      netCore(systems[1], core * 0.9);

      // Names.
      const { labels: names } = stateRef.current;
      if (names) {
        ctx.font = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        systems.forEach((s) => {
          ctx.fillStyle = rgba(mix(s.tone, WHITE, 0.55), 0.92);
          ctx.fillText((names[s.id] || '').toUpperCase(), s.x, height - 16);
        });
        ctx.fillStyle = rgba(mix(AMBER, WHITE, 0.3), 0.85);
        ctx.fillText((names.freelance || '').toUpperCase(), seed.x, seed.y + 30);
        ctx.textAlign = 'start';
      }
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      draw(performance.now());
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            fit();
            if (still) draw(performance.now());
          });
    observer?.observe(canvas);

    const place = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const onDown = (event) => {
      place(event);
      if (ringAt(pointer.x, pointer.y) !== null) stateRef.current.onSelect?.();
    };
    const onLeave = () => {
      pointer = null;
    };
    canvas.addEventListener('pointermove', place);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas.removeEventListener('pointermove', place);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [live]);

  return (
    <div className="vo-panel" aria-hidden="true">
      <canvas ref={canvasRef} className="vo-canvas" />
      <span className="vo-tag" ref={tagRef} />
    </div>
  );
};

export default VenturesOrbit;

