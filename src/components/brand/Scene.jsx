import { useEffect, useRef } from 'react';

/* ==========================================================================
   THE STANDARD PANEL AT THE HEAD OF A PAGE
   Ventures, Experience and Contact each open with one of these: a dark
   instrument panel with a living scene on a canvas, made of the page's own
   content (the companies and their stages, the roles in order, the reasons to
   write). This file is everything the three have in common, so a fourth is a
   scene and nothing else:

     <Scene live={live} make={makeMyScene} data={...} onSelect={...} wash="radial-gradient(...)" />

   `wash` is the page's own tint, a list of gradients laid over the panel.

   `make` is called whenever the panel is sized, with the context, its size and a
   getter for the latest `data`. It returns
     frame({ dt, clock, pointer, still }) -> string | null
       draws one frame; returns the text for the tag when the pointer is on
       something ('' if it is on something with nothing to say), else null;
     pick(x, y) -> payload | null
       what a click at that point means, handed to `onSelect`.

   The panel is dark in both themes (a screen showing the work is dark whatever
   the room is), sits in the flow of the page and never follows the scroll.
   It runs only while on screen (`live`, from useLive) and is drawn once, still,
   under reduced motion.
   ========================================================================== */

export const TAU = Math.PI * 2;
export const WHITE = [236, 242, 255];
export const BASE = [150, 172, 205];

export const rgba = (c, a) =>
  `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${Math.max(0, Math.min(a, 1)).toFixed(3)})`;
export const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
export const rgbOf = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
export const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// A soft round light.
export const glow = (ctx, x, y, radius, tone, alpha) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, rgba(tone, alpha));
  g.addColorStop(1, rgba(tone, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fill();
};

export const MONO = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const Scene = ({ live, make, data, onSelect, wash }) => {
  const canvasRef = useRef(null);
  const tagRef = useRef(null);
  const dataRef = useRef(data);
  const selectRef = useRef(onSelect);

  useEffect(() => {
    dataRef.current = data;
    selectRef.current = onSelect;
  }, [data, onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let scene = null;
    let last = performance.now();
    let clock = 0;
    let raf = 0;
    let pointer = null;
    let shown = '';

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const narrow = width < 560;
      const dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (width > 1 && height > 1) scene = make(ctx, { width, height, narrow }, () => dataRef.current);
    };

    const draw = (now) => {
      // A canvas with no size (a page swapped out from under it, a hidden tab) has
      // nothing to draw on, and a gradient on it throws.
      if (!scene || !(width > 1) || !(height > 1)) return;
      if (document.hidden) {
        last = now;
        return;
      }
      // Never negative: a frame's own timestamp can be a hair older than the moment
      // the loop was set up, and a scene that integrates it would run backwards.
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
      last = now;
      if (!still) clock += dt;
      ctx.clearRect(0, 0, width, height);
      const hovered = scene.frame({ dt, clock, pointer, still });
      const text = hovered === null || hovered === undefined ? null : hovered;
      canvas.style.cursor = text === null ? '' : 'pointer';
      const next = text || '';
      if (next !== shown) {
        shown = next;
        if (tagRef.current) tagRef.current.textContent = next;
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
      const hit = scene?.pick?.(pointer.x, pointer.y);
      if (hit !== null && hit !== undefined) selectRef.current?.(hit);
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
  }, [live, make]);

  return (
    <div className="scene-panel" aria-hidden="true" style={wash ? { '--scene-wash': wash } : undefined}>
      <canvas ref={canvasRef} className="scene-canvas" />
      <span className="scene-tag" ref={tagRef} />
    </div>
  );
};

export default Scene;
