import { useEffect, useRef } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { INTEREST_KEYS, INTEREST_TONES } from '../about/interestsData';

// The drawing beside the eight subjects: a brain in side view, wired as a
// network, with impulses running along it. It is not a loop that plays next to
// the rail, it listens to it. Every subject has a region of the brain, and
// turning to a subject fires a burst from that region in the colour of its card,
// so the dots, the card and the drawing say the same thing: this is the part of
// the thinking that came from here.
//
// One canvas, no library. The geometry is drawn in a 400 × 330 box and fitted
// to whatever the column is (a tall panel beside the rail on a desktop, a wide
// strip over it on a phone); what the brain does not fill, a looser network
// drifting around it does, so neither shape reads as a frame with a hole in it.
// The loop only runs while the section is on screen, and with reduced motion it
// draws one still frame and stops.

// Cubic segments of the cerebrum's outline, the cerebellum and the stem, facing
// left: frontal lobe on the left, occipital on the right. Kept as numbers rather
// than an SVG string because the nodes on the rim are sampled from the same
// curves the outline is stroked from.
const CEREBRUM = [
  [78, 205],
  [52, 180, 48, 128, 78, 96],
  [100, 62, 150, 40, 200, 42],
  [250, 38, 300, 52, 330, 82],
  [362, 110, 372, 150, 358, 184],
  [350, 208, 330, 222, 304, 224],
  [288, 236, 262, 238, 244, 230],
  [228, 246, 196, 250, 170, 240],
  [140, 244, 112, 236, 100, 222],
  [90, 220, 82, 214, 78, 205],
];
const CEREBELLUM = [
  [258, 232],
  [262, 262, 304, 276, 330, 258],
  [348, 246, 346, 222, 328, 218],
  [306, 226, 282, 232, 258, 232],
];
const STEM = [
  [236, 236],
  [240, 262, 238, 290, 230, 318],
  [238, 318, 244, 318, 250, 318],
  [256, 292, 260, 262, 258, 236],
];
// The folds. Open curves, stroked faintly, so the shape reads as a brain and
// not as a cloud that happens to have that outline.
const SULCI = [
  [[112, 196], [150, 178, 200, 176, 250, 196]],
  [[214, 46], [206, 90, 222, 130, 206, 176]],
  [[140, 60], [128, 100, 152, 130, 130, 168]],
  [[272, 56], [262, 100, 290, 130, 272, 172]],
  [[330, 104], [304, 132, 326, 160, 304, 204]],
  [[86, 134], [108, 118, 132, 146, 156, 126]],
  [[162, 214], [192, 224, 220, 214, 238, 222]],
  [[176, 86], [196, 104, 176, 128, 190, 150]],
  [[282, 240], [300, 250, 318, 246, 330, 238]],
];

// Where each subject lives, in the same box. Roughly where the kind of thinking
// sits (planning up front, vision at the back, movement in the cerebellum), and
// spread out so that walking the dots walks the whole brain.
const REGIONS = {
  innovation: [100, 128],
  business: [158, 74],
  science: [252, 72],
  security: [336, 146],
  learning: [184, 214],
  arts: [296, 196],
  sports: [300, 250],
  culture: [212, 132],
};

const BOX_W = 400;
const BOX_H = 330;

const bez = (p0, [x1, y1, x2, y2, x3, y3], t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
    u * u * u * p0[1] + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
  ];
};

const toPath = (shape) => {
  const path = new Path2D();
  path.moveTo(shape[0][0], shape[0][1]);
  shape.slice(1).forEach((c) => path.bezierCurveTo(...c));
  path.closePath();
  return path;
};

// `count` points spread along a closed shape, for the rim nodes.
const along = (shape, count) => {
  const points = [];
  const segments = shape.length - 1;
  for (let i = 0; i < count; i += 1) {
    const at = (i / count) * segments;
    const s = Math.floor(at);
    points.push(bez(shape[s], shape[s + 1], at - s));
  }
  return points;
};

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// A tone deepened for a light page, where a yellow line on white is a line
// nobody can see. The same mix the cards use for --tone-ink.
const ink = (hex, light) => {
  const [r, g, b] = rgb(hex);
  if (!light) return [r, g, b];
  return [r * 0.7 + 26 * 0.3, g * 0.7 + 26 * 0.3, b * 0.7 + 26 * 0.3].map(Math.round);
};

const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

// Seeded, so the brain is wired the same way on every visit and the drawing is
// a thing rather than a dice roll.
const seeded = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// The wiring: nodes on the rim and inside, each joined to its nearest few.
const buildBrain = (probe) => {
  const random = seeded(7);
  const cerebrum = toPath(CEREBRUM);
  const cerebellum = toPath(CEREBELLUM);
  const nodes = [];
  const add = (x, y, rim) => nodes.push({ x, y, rim, flash: 0, heat: 0, links: [] });

  along(CEREBRUM, 44).forEach(([x, y]) => add(x, y, true));
  along(CEREBELLUM, 14).forEach(([x, y]) => add(x, y, true));

  const far = (x, y, gap) => nodes.every((n) => (n.x - x) ** 2 + (n.y - y) ** 2 > gap * gap);
  for (let tries = 0; tries < 4000 && nodes.length < 150; tries += 1) {
    const x = 50 + random() * 320;
    const y = 36 + random() * 240;
    const inside = probe.isPointInPath(cerebrum, x, y) || probe.isPointInPath(cerebellum, x, y);
    if (inside && far(x, y, 19)) add(x, y, false);
  }
  // The stem: a short column of nodes, so the impulses have somewhere to leave by.
  [248, 266, 284, 302].forEach((y, i) => add(246 - i * 2, y, false));

  const edges = [];
  const seen = new Set();
  nodes.forEach((node, a) => {
    nodes
      .map((other, b) => [b, (other.x - node.x) ** 2 + (other.y - node.y) ** 2])
      .filter(([b]) => b !== a)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 3)
      .forEach(([b, d]) => {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (seen.has(key) || d > 44 * 44) return;
        seen.add(key);
        edges.push([a, b]);
        node.links.push(b);
        nodes[b].links.push(a);
      });
  });

  return { nodes, edges, cerebrum, cerebellum, stem: toPath(STEM) };
};

const NeuralMind = ({ index, live }) => {
  const { t } = useTranslation();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rateRef = useRef(null);
  // The loop reads these through refs, so a new subject changes the drawing
  // without tearing the canvas down and wiring the brain again.
  const stateRef = useRef({ index, burst: null });
  const key = INTEREST_KEYS[index];

  useEffect(() => {
    stateRef.current.index = index;
    stateRef.current.burst = performance.now();
  }, [index]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const brain = buildBrain(ctx);
    const { nodes, edges } = brain;
    const signals = [];
    let ambient = [];
    let width = 0;
    let height = 0;
    let scale = 1;
    let ox = 0;
    let oy = 0;
    let light = false;
    let dpr = 1;
    let frame = 0;
    let last = performance.now();
    let nextSpark = 0;
    let fired = 0;
    let rateClock = last;
    let pointer = null;

    const readTheme = () => {
      light = getComputedStyle(wrap).getPropertyValue('--mind-mode').trim() === 'light';
    };

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The brain takes the short side; the long side is the network's.
      scale = Math.min(width / BOX_W, height / BOX_H) * 0.9;
      ox = (width - BOX_W * scale) / 2;
      oy = (height - BOX_H * scale) / 2 + 4 * scale;
      const random = seeded(11);
      const count = Math.min(90, Math.round((width * height) / 3600));
      ambient = Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 9,
        vy: (random() - 0.5) * 9,
        r: 0.6 + random() * 1.2,
      }));
      readTheme();
    };

    const tone = () => ink(INTEREST_TONES[INTEREST_KEYS[stateRef.current.index]], light);

    const fire = (from, energy, color) => {
      const node = nodes[from];
      node.flash = Math.max(node.flash, energy);
      fired += 1;
      if (signals.length > 220) return;
      const options = node.links;
      if (!options.length) return;
      const branches = energy > 0.8 ? 3 : energy > 0.45 ? 2 : 1;
      for (let i = 0; i < branches; i += 1) {
        const to = options[Math.floor(Math.random() * options.length)];
        signals.push({ from, to, t: 0, speed: 1.6 + Math.random() * 1.4, energy, color });
      }
    };

    const nearest = (bx, by) => {
      let best = 0;
      let distance = Infinity;
      nodes.forEach((n, i) => {
        const d = (n.x - bx) ** 2 + (n.y - by) ** 2;
        if (d < distance) {
          distance = d;
          best = i;
        }
      });
      return [best, Math.sqrt(distance)];
    };

    const sx = (x) => ox + x * scale;
    const sy = (y) => oy + y * scale;

    const draw = (now) => {
      // A canvas with no size (a page swapped out from under it, a hidden tab) has
      // nothing to draw on, and a gradient on it throws.
      if (!(width > 1) || !(height > 1)) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      frame += 1;
      if (frame % 30 === 0) readTheme();

      const state = stateRef.current;
      const hue = tone();
      const base = light ? [40, 48, 60] : [168, 184, 204];
      const region = REGIONS[INTEREST_KEYS[state.index]];

      // A new subject: a burst from its region, then the region keeps warm.
      if (state.burst !== null) {
        const [origin] = nearest(region[0], region[1]);
        fire(origin, 1, hue);
        [1, 2].forEach(() => fire(nodes[origin].links[0] ?? origin, 0.9, hue));
        state.burst = null;
      }

      if (!still && now > nextSpark) {
        const from = Math.floor(Math.random() * nodes.length);
        fire(from, 0.35 + Math.random() * 0.3, Math.random() < 0.6 ? hue : base);
        nextSpark = now + 140 + Math.random() * 260;
      }

      nodes.forEach((n) => {
        const target = Math.max(0, 1 - Math.hypot(n.x - region[0], n.y - region[1]) / 78);
        n.heat += (target - n.heat) * Math.min(1, dt * 3);
        n.flash *= Math.exp(-dt * 3.2);
      });

      ctx.clearRect(0, 0, width, height);

      // The network around the brain: drifting points, joined when close, and
      // tied to the rim when they come near it, so the brain sits inside the
      // net instead of in front of it.
      ctx.lineWidth = 1;
      ambient.forEach((p) => {
        if (!still) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }
      });
      const reach = 92;
      for (let i = 0; i < ambient.length; i += 1) {
        const a = ambient[i];
        for (let j = i + 1; j < ambient.length; j += 1) {
          const b = ambient[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < reach) {
            ctx.strokeStyle = rgba(base, (1 - d / reach) * (light ? 0.16 : 0.13));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = rgba(base, light ? 0.4 : 0.35);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ambient.forEach((a) => {
        const [i, d] = nearest((a.x - ox) / scale, (a.y - oy) / scale);
        const px = d * scale;
        if (nodes[i].rim && px < 70) {
          ctx.strokeStyle = rgba(hue, (1 - px / 70) * 0.22);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(sx(nodes[i].x), sy(nodes[i].y));
          ctx.stroke();
        }
      });

      // The brain: a soft glow of the subject's colour behind it, the outline,
      // the folds.
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);
      const glow = ctx.createRadialGradient(region[0], region[1], 0, region[0], region[1], 180);
      glow.addColorStop(0, rgba(hue, light ? 0.14 : 0.2));
      glow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = glow;
      ctx.fill(brain.cerebrum);
      ctx.fill(brain.cerebellum);
      ctx.fillStyle = rgba(base, light ? 0.06 : 0.05);
      ctx.fill(brain.stem);
      ctx.lineWidth = 1.4 / scale;
      ctx.strokeStyle = rgba(hue, light ? 0.55 : 0.5);
      ctx.stroke(brain.cerebrum);
      ctx.stroke(brain.cerebellum);
      ctx.strokeStyle = rgba(base, 0.28);
      ctx.stroke(brain.stem);
      ctx.lineWidth = 1 / scale;
      ctx.strokeStyle = rgba(base, light ? 0.2 : 0.16);
      SULCI.forEach(([p0, c]) => {
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.bezierCurveTo(...c);
        ctx.stroke();
      });
      ctx.restore();

      // Synapses, in one pass, then the warm ones of the region over them.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(base, light ? 0.2 : 0.14);
      ctx.beginPath();
      edges.forEach(([a, b]) => {
        ctx.moveTo(sx(nodes[a].x), sy(nodes[a].y));
        ctx.lineTo(sx(nodes[b].x), sy(nodes[b].y));
      });
      ctx.stroke();
      edges.forEach(([a, b]) => {
        const heat = Math.min(nodes[a].heat, nodes[b].heat);
        if (heat < 0.05) return;
        ctx.strokeStyle = rgba(hue, heat * 0.45);
        ctx.beginPath();
        ctx.moveTo(sx(nodes[a].x), sy(nodes[a].y));
        ctx.lineTo(sx(nodes[b].x), sy(nodes[b].y));
        ctx.stroke();
      });

      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';

      // Impulses: a short comet along the synapse. When one arrives, the node
      // lights and passes a weaker impulse on, so a burst spreads and fades.
      for (let i = signals.length - 1; i >= 0; i -= 1) {
        const s = signals[i];
        if (!still) s.t += s.speed * dt;
        const a = nodes[s.from];
        const b = nodes[s.to];
        const head = Math.min(s.t, 1);
        const tail = Math.max(0, head - 0.45);
        const hx = sx(a.x + (b.x - a.x) * head);
        const hy = sy(a.y + (b.y - a.y) * head);
        const trail = ctx.createLinearGradient(sx(a.x + (b.x - a.x) * tail), sy(a.y + (b.y - a.y) * tail), hx, hy);
        trail.addColorStop(0, rgba(s.color, 0));
        trail.addColorStop(1, rgba(s.color, 0.95 * s.energy + 0.05));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(sx(a.x + (b.x - a.x) * tail), sy(a.y + (b.y - a.y) * tail));
        ctx.lineTo(hx, hy);
        ctx.stroke();
        ctx.fillStyle = rgba(s.color, 0.9);
        ctx.beginPath();
        ctx.arc(hx, hy, 1.6 + s.energy, 0, Math.PI * 2);
        ctx.fill();
        if (s.t >= 1) {
          signals.splice(i, 1);
          if (s.energy > 0.22) fire(s.to, s.energy * 0.74, s.color);
          else b.flash = Math.max(b.flash, s.energy);
        }
      }

      // Neurons. A lit one gets a halo; a warm one is tinted.
      nodes.forEach((n) => {
        const x = sx(n.x);
        const y = sy(n.y);
        const lit = Math.min(1, n.flash);
        if (lit > 0.08) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, 6 + lit * 12);
          halo.addColorStop(0, rgba(hue, lit * 0.7));
          halo.addColorStop(1, rgba(hue, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, 6 + lit * 12, 0, Math.PI * 2);
          ctx.fill();
        }
        const warm = Math.max(lit, n.heat * 0.7);
        ctx.fillStyle = warm > 0.1 ? rgba(hue, 0.5 + warm * 0.5) : rgba(base, n.rim ? 0.6 : 0.45);
        ctx.beginPath();
        ctx.arc(x, y, (n.rim ? 1.5 : 1.8) + lit * 1.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // The scan: a band of light that crosses the brain every few seconds.
      if (!still) {
        const period = 6.5;
        const phase = ((now / 1000) % period) / period;
        const scanX = ox - 40 + phase * (BOX_W * scale + 80);
        const band = ctx.createLinearGradient(scanX - 36, 0, scanX, 0);
        band.addColorStop(0, rgba(hue, 0));
        band.addColorStop(1, rgba(hue, light ? 0.1 : 0.14));
        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(scale, scale);
        ctx.clip(brain.cerebrum);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = band;
        ctx.fillRect(scanX - 36, 0, 36, height);
        ctx.restore();
      }

      ctx.globalCompositeOperation = 'source-over';

      // The reader can fire it too: a pointer near a neuron sets it off.
      if (pointer && now - pointer.at < 120) {
        const [i, d] = nearest((pointer.x - ox) / scale, (pointer.y - oy) / scale);
        if (d * scale < 26 && nodes[i].flash < 0.3) fire(i, 0.85, hue);
      }

      if (now - rateClock > 1000) {
        if (rateRef.current) rateRef.current.textContent = String(Math.round((fired * 1000) / (now - rateClock)));
        fired = 0;
        rateClock = now;
      }
    };

    let raf = 0;
    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      // One frame, with the region of the subject lit, and nothing moving.
      nodes.forEach((n) => {
        const region = REGIONS[INTEREST_KEYS[stateRef.current.index]];
        n.heat = Math.max(0, 1 - Math.hypot(n.x - region[0], n.y - region[1]) / 78);
      });
      stateRef.current.burst = null;
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      fit();
      if (still) draw(performance.now());
    });
    observer?.observe(canvas);

    const onPointer = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top, at: performance.now() };
    };
    canvas.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerdown', onPointer);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerdown', onPointer);
    };
  }, [live]);

  return (
    <div
      className="cv-mind"
      ref={wrapRef}
      style={{ '--tone': INTEREST_TONES[key] }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="cv-mind-canvas" />
      <span className="cv-mind-tag cv-mind-tag--subject">
        <i />
        {t(`cv.interests.${key}.title`)}
      </span>
      <span className="cv-mind-tag cv-mind-tag--rate">
        <b ref={rateRef}>0</b> {t('cv.mindRate')}
      </span>
    </div>
  );
};

export default NeuralMind;
