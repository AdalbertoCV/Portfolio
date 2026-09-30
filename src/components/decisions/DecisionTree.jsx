import { useEffect, useRef } from 'react';

// The drawing beside the log: a tree of the decisions, drawn the way the entries
// are written. Every entry is a fork. The options that lost are branches that
// grow out to the side and die away, because a decision written without the
// options it beat is not a decision; the one that was taken is the trunk, which
// carries on down to the next fork. It listens to the page: the entry being read
// is the fork that is lit, a comet runs down the trunk to it from wherever the
// last one was, its rejected branches grow out again, and the camera follows so
// the fork in view is always near the same place in the panel however long the
// log gets. A node can be clicked, and takes the reader to its entry.
//
// One canvas, no library. Everything is laid out in the panel's own pixels, so a
// tall column beside the log on a desktop and a wide strip over it on a phone
// are the same drawing at two shapes. The loop only runs while the log is on
// screen, and with reduced motion it draws one still frame and stops.

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const WHITE = [236, 242, 255];
const BASE = [150, 172, 205];
const LOST = [214, 122, 130];

const seeded = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const DecisionTree = ({ entries, active, live, onSelect, subject, meta }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ active, burst: null, entries, onSelect });
  const signature = entries.map((entry) => `${entry.id}:${entry.options}`).join('|');
  const tone = entries[active]?.tone || '#22d3ee';

  useEffect(() => {
    stateRef.current.entries = entries;
    stateRef.current.onSelect = onSelect;
  }, [entries, onSelect]);
  useEffect(() => {
    stateRef.current.active = active;
    stateRef.current.burst = performance.now();
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const list = stateRef.current.entries;
    const random = seeded(19);
    // Each fork's lost branches: how far out and how far up or down each goes.
    const forks = list.map((entry) => {
      const lostCount = Math.max(entry.options - 1, 1);
      return {
      tone: rgb(entry.tone),
      year: String(entry.year),
      short: entry.short,
      grow: 1,
      flare: 0,
      lost: Array.from({ length: lostCount }, (_, j) => ({
        reach: 0.5 + random() * 0.42,
        drop: (j - (lostCount - 1) / 2) * 34 + (random() - 0.5) * 12,
        bend: 0.5 + random() * 0.3,
      })),
      };
    });

    let width = 0;
    let height = 0;
    let dpr = 1;
    let ambient = [];
    let last = performance.now();
    let camY = 0;
    let comet = stateRef.current.active;
    let hue = forks[stateRef.current.active]?.tone || [34, 211, 238];
    let pointer = null;
    let raf = 0;
    const rings = [];
    let nextRing = last + 1400;

    const layout = () => {
      const gap = Math.max(96, Math.min(132, height / 3.3));
      return { gap, trunkX: Math.max(70, Math.min(width * 0.28, 120)), first: 74 };
    };
    const forkY = (i, geometry) => geometry.first + i * geometry.gap;

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = seeded(11);
      const total = Math.min(90, Math.round((width * height) / 4400));
      ambient = Array.from({ length: total }, () => ({
        x: r() * width,
        y: r() * height,
        vx: (r() - 0.5) * 7,
        vy: (r() - 0.5) * 7,
        r: 0.6 + r() * 1.1,
      }));
    };

    const branchPoint = (fork, branch, geometry, y, t) => {
      const length = (width - geometry.trunkX - 44) * branch.reach;
      const x0 = geometry.trunkX;
      const cx1 = x0 + length * 0.35;
      const cx2 = x0 + length * branch.bend;
      const x3 = x0 + length;
      const y3 = y + branch.drop;
      const u = 1 - t;
      return [
        u * u * u * x0 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x3,
        u * u * u * y + 3 * u * u * t * y + 3 * u * t * t * (y + branch.drop * 0.9) + t * t * t * y3,
      ];
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const state = stateRef.current;
      const geometry = layout();
      const { trunkX } = geometry;
      const at = Math.min(state.active, forks.length - 1);
      const current = forks[at];
      if (!current) return;

      if (state.burst !== null) {
        forks[at].grow = still ? 1 : 0;
        forks[at].flare = 1;
        rings.push({ fork: at, at: now });
        state.burst = null;
      }
      forks.forEach((fork, i) => {
        fork.grow = Math.min(1, fork.grow + dt * 1.25);
        fork.flare *= Math.exp(-dt * 2.4);
        if (i !== at && fork.grow < 1) fork.grow = 1;
      });
      hue = mix(hue, current.tone, Math.min(1, dt * 3));
      comet += (at - comet) * Math.min(1, dt * (still ? 60 : 2.2));

      // The camera keeps the fork in view about two-fifths of the way down, and
      // never scrolls past the ends of the tree.
      const treeEnd = forkY(forks.length - 1, geometry) + 96;
      const wantCam = Math.min(Math.max(forkY(at, geometry) - height * 0.42, 0), Math.max(0, treeEnd - height));
      camY += (wantCam - camY) * Math.min(1, dt * 2.6);
      const sy = (y) => y - camY;

      if (!still && now > nextRing) {
        rings.push({ fork: at, at: now, quiet: true });
        nextRing = now + 2600;
      }

      ctx.clearRect(0, 0, width, height);

      // Light behind the fork in view, in its colour.
      const glow = ctx.createRadialGradient(trunkX, sy(forkY(at, geometry)), 0, trunkX, sy(forkY(at, geometry)), Math.max(width, height) * 0.7);
      glow.addColorStop(0, rgba(hue, 0.16));
      glow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // The looser network behind, drifting.
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
      for (let i = 0; i < ambient.length; i += 1) {
        const a = ambient[i];
        for (let j = i + 1; j < ambient.length; j += 1) {
          const b = ambient[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 84) {
            ctx.strokeStyle = rgba(BASE, (1 - d / 84) * 0.1);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = rgba(BASE, 0.3);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // The trunk: dim the whole way, lit down to the comet in the colours of
      // the forks it has passed. It runs off both ends of the panel.
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = rgba(WHITE, 0.14);
      ctx.beginPath();
      ctx.moveTo(trunkX, 0);
      ctx.lineTo(trunkX, height);
      ctx.stroke();

      ctx.lineWidth = 2;
      for (let i = 0; i < forks.length - 1; i += 1) {
        if (comet <= i) break;
        const y0 = sy(forkY(i, geometry));
        const end = sy(forkY(i, geometry) + Math.min(comet - i, 1) * geometry.gap);
        const beam = ctx.createLinearGradient(0, y0, 0, y0 + geometry.gap);
        beam.addColorStop(0, rgba(forks[i].tone, 0.9));
        beam.addColorStop(1, rgba(forks[i + 1].tone, 0.9));
        ctx.strokeStyle = beam;
        ctx.beginPath();
        ctx.moveTo(trunkX, y0);
        ctx.lineTo(trunkX, end);
        ctx.stroke();
      }

      // Above the first fork the trunk is what led to it, lit in its colour.
      ctx.strokeStyle = rgba(forks[0].tone, 0.5);
      ctx.beginPath();
      ctx.moveTo(trunkX, 0);
      ctx.lineTo(trunkX, sy(forkY(0, geometry)));
      ctx.stroke();

      ctx.globalCompositeOperation = 'lighter';

      // The branches that lost. On the fork in view they grow out and fade as
      // they go; on the others they are drawn once, dim, and stay.
      forks.forEach((fork, i) => {
        const y = forkY(i, geometry);
        if (sy(y) < -120 || sy(y) > height + 120) return;
        const isActive = i === at;
        const strength = isActive ? 0.9 : 0.26;
        fork.lost.forEach((branch) => {
          const steps = 28;
          const reachT = isActive ? fork.grow : 1;
          for (let s = 0; s < steps * reachT; s += 1) {
            const t0 = s / steps;
            const t1 = (s + 1) / steps;
            const [ax, ay] = branchPoint(fork, branch, geometry, y, t0);
            const [bx, by] = branchPoint(fork, branch, geometry, y, Math.min(t1, reachT));
            ctx.strokeStyle = rgba(mix(LOST, fork.tone, 0.2), strength * (1 - t0) ** 1.3);
            ctx.lineWidth = isActive ? 1.6 : 1.1;
            ctx.beginPath();
            ctx.moveTo(ax, sy(ay));
            ctx.lineTo(bx, sy(by));
            ctx.stroke();
          }
          // The end of a branch: a small cross where the option was dropped.
          if (reachT > 0.86) {
            const [ex, ey] = branchPoint(fork, branch, geometry, y, 0.86);
            const cross = 3.2;
            ctx.strokeStyle = rgba(LOST, strength * 0.7);
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(ex - cross, sy(ey) - cross);
            ctx.lineTo(ex + cross, sy(ey) + cross);
            ctx.moveTo(ex + cross, sy(ey) - cross);
            ctx.lineTo(ex - cross, sy(ey) + cross);
            ctx.stroke();
          }
        });
      });

      // The comet down the trunk while it travels.
      if (Math.abs(at - comet) > 0.02) {
        const yHead = sy(forkY(comet, geometry));
        const dir = Math.sign(at - comet);
        const yTail = sy(forkY(comet - dir * 0.6, geometry));
        const trail = ctx.createLinearGradient(0, yTail, 0, yHead);
        trail.addColorStop(0, rgba(hue, 0));
        trail.addColorStop(1, rgba(mix(hue, WHITE, 0.55), 0.95));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(trunkX, yTail);
        ctx.lineTo(trunkX, yHead);
        ctx.stroke();
        const spark = ctx.createRadialGradient(trunkX, yHead, 0, trunkX, yHead, 15);
        spark.addColorStop(0, rgba(WHITE, 0.95));
        spark.addColorStop(1, rgba(hue, 0));
        ctx.fillStyle = spark;
        ctx.beginPath();
        ctx.arc(trunkX, yHead, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rings from the fork in view.
      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i];
        const age = (now - ring.at) / (ring.quiet ? 2400 : 1900);
        if (age >= 1) {
          rings.splice(i, 1);
        } else {
          const fork = forks[ring.fork];
          const count = ring.quiet ? 1 : 3;
          for (let k = 0; k < count; k += 1) {
            const local = age - k * 0.14;
            if (local > 0 && local < 1) {
              ctx.strokeStyle = rgba(fork.tone, (1 - local) * (ring.quiet ? 0.28 : 0.6));
              ctx.lineWidth = ring.quiet ? 1 : 1.5;
              ctx.beginPath();
              ctx.arc(trunkX, sy(forkY(ring.fork, geometry)), 7 + local * 44, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      // The forks. Lit ones are in their own colour; the one in view is larger
      // and pulses.
      if (pointer) {
        forks.forEach((fork, i) => {
          if (Math.hypot(trunkX - pointer.x, sy(forkY(i, geometry)) - pointer.y) < 22) fork.flare = Math.max(fork.flare, 0.8);
        });
      }
      const pulse = still ? 0.5 : 0.5 + 0.5 * Math.sin(now / 800);
      forks.forEach((fork, i) => {
        const y = sy(forkY(i, geometry));
        if (y < -40 || y > height + 40) return;
        const isActive = i === at;
        const lit = Math.max(isActive ? 0.75 + 0.25 * pulse : 0.3, fork.flare);
        const reach = 10 + lit * 18;
        const halo = ctx.createRadialGradient(trunkX, y, 0, trunkX, y, reach);
        halo.addColorStop(0, rgba(fork.tone, 0.55 * lit + 0.08));
        halo.addColorStop(1, rgba(fork.tone, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(trunkX, y, reach, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(mix(fork.tone, WHITE, 0.55), 0.95);
        ctx.beginPath();
        ctx.arc(trunkX, y, 3.4 + lit * 2 + (isActive ? 1.4 : 0), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      // Labels: the year and the room, to the left of the trunk, the way a
      // timeline is read.
      ctx.font = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      forks.forEach((fork, i) => {
        const y = sy(forkY(i, geometry));
        if (y < -30 || y > height + 30) return;
        const isActive = i === at;
        ctx.fillStyle = rgba(isActive ? mix(fork.tone, WHITE, 0.6) : WHITE, isActive ? 0.98 : 0.5);
        ctx.fillText(fork.year, trunkX - 16, y - 6);
        ctx.fillStyle = rgba(isActive ? mix(fork.tone, WHITE, 0.4) : WHITE, isActive ? 0.8 : 0.32);
        ctx.font = '500 8.5px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText(fork.short, trunkX - 16, y + 7);
        ctx.font = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      });
      ctx.textAlign = 'start';
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      comet = stateRef.current.active;
      stateRef.current.burst = null;
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

    const over = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
      const geometry = layout();
      let hit = -1;
      forks.forEach((fork, i) => {
        if (Math.hypot(geometry.trunkX - pointer.x, forkY(i, geometry) - camY - pointer.y) < 22) hit = i;
      });
      canvas.style.cursor = hit >= 0 ? 'pointer' : '';
      return hit;
    };
    const onMove = (event) => {
      over(event);
    };
    const onDown = (event) => {
      const hit = over(event);
      if (hit >= 0) stateRef.current.onSelect?.(hit);
    };
    const onLeave = () => {
      pointer = null;
      canvas.style.cursor = '';
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
    };
    // The tree is laid out again only when the set of entries changes; the one
    // being read is taken through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, signature]);

  return (
    <div className="dec-tree" style={{ '--tone': tone }} aria-hidden="true">
      <canvas ref={canvasRef} className="dec-tree-canvas" />
      <span className="dec-tree-tag dec-tree-tag--subject">
        <i />
        {subject}
      </span>
      <span className="dec-tree-tag dec-tree-tag--meta">{meta}</span>
    </div>
  );
};

export default DecisionTree;
