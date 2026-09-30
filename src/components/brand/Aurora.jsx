import { useEffect, useRef } from 'react';

// The background of the whole site: an aurora over a living grid.
//
// Three wide ribbons of light undulate across the page, each in its own hue,
// and under them a grid of points that a slow wave travels through, that swells
// round the pointer like a lens, and along whose lines small pulses of light
// run now and then, the way data does. It is meant to be seen: it is the first
// thing that says the site is alive and current. The content sits above it on
// its own surfaces, and the ribbons are kept soft enough behind bare text that
// nothing is harder to read for it.
//
// It follows the theme. In the dark theme the ribbons are luminous on a near
// black ground and the points are pale; in the light theme the ribbons are
// pastel washes and the points are slate. Switching theme does not cut: the
// palette eases from one to the other in about half a second.
//
// It is one fixed canvas, so nothing on it moves with the scroll. It is built to
// cost little, because a full-screen effect that costs the first paint is not
// worth having (the grain this page used to carry took two seconds of it on a
// slow phone): the canvas is drawn at standard resolution, since soft light has
// no detail to lose; it runs at about thirty frames a second; it does not start
// until the page has painted and the browser is idle; it stops while the tab is
// hidden; a phone gets fewer points and two ribbons; and under reduced motion it
// draws one still frame and stops.

const HUES = {
  dark: {
    ribbons: [
      [34, 211, 238],
      [139, 112, 246],
      [244, 114, 182],
    ],
    dot: [196, 214, 255],
    line: [160, 184, 230],
    glow: 0.165,
    dots: 0.34,
    lines: 0.045,
  },
  light: {
    ribbons: [
      [70, 140, 255],
      [167, 139, 250],
      [255, 150, 110],
    ],
    dot: [44, 58, 92],
    line: [60, 76, 110],
    glow: 0.22,
    dots: 0.3,
    lines: 0.05,
  },
};

const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;

const themeOf = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

const Aurora = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let narrow = false;
    let cell = 38;
    let raf = 0;
    let started = false;
    let last = 0;
    let idleId = 0;
    let paintWatch = null;
    let timer = 0;
    const pulses = [];
    let nextPulse = 0;
    const pointer = { x: -999, y: -999, tx: -999, ty: -999, on: false };
    // The palette in use, eased toward the theme's.
    let look = JSON.parse(JSON.stringify(HUES[themeOf()]));
    let target = themeOf();

    const fit = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      narrow = width < 640;
      cell = narrow ? 46 : 38;
      // Standard resolution on purpose: soft light and small points do not need
      // a retina canvas, and four times the pixels is four times the cost.
      canvas.width = width;
      canvas.height = height;
    };

    const ease = (dt) => {
      const goal = HUES[target];
      const k = Math.min(1, dt * 5);
      look.ribbons = look.ribbons.map((c, i) => mix(c, goal.ribbons[i], k));
      look.dot = mix(look.dot, goal.dot, k);
      look.line = mix(look.line, goal.line, k);
      look.glow += (goal.glow - look.glow) * k;
      look.dots += (goal.dots - look.dots) * k;
      look.lines += (goal.lines - look.lines) * k;
    };

    const draw = (now) => {
      const t = now / 1000;
      const dt = Math.min((now - last) / 1000 || 0.033, 0.1);
      last = now;
      ease(dt);
      ctx.clearRect(0, 0, width, height);

      // The pointer, smoothed, so the lens follows and never snaps.
      if (pointer.on) {
        pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 8);
        pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 8);
      }

      // --- The aurora: ribbons, each a few strokes of falling width and
      // alpha, which is a soft edge without the cost of a blur.
      const bands = narrow ? 2 : 3;
      for (let b = 0; b < bands; b += 1) {
        const tone = look.ribbons[b];
        const base = height * (0.22 + b * 0.27);
        const phase = b * 2.1;
        const sway = (still ? 0 : t) * (0.16 + b * 0.05);
        const points = [];
        const steps = narrow ? 14 : 22;
        for (let s = 0; s <= steps; s += 1) {
          const x = (s / steps) * (width + 240) - 120;
          const y =
            base +
            Math.sin(x * 0.0042 + sway + phase) * height * 0.11 +
            Math.sin(x * 0.0091 - sway * 1.3 + phase * 1.7) * height * 0.05;
          points.push([x, y]);
        }
        // Many thin steps rather than a few wide ones: each is a little wider and
        // a little fainter than the next, and together they are a soft edge.
        const widths = narrow ? [190, 150, 112, 76, 42] : [270, 230, 192, 156, 122, 90, 60, 34];
        // A plain loop, not forEach: a function made inside the loop over the ribbons
        // is what the linter (and so the production build) refuses.
        for (let k = 0; k < widths.length; k += 1) {
          const w = widths[k];
          const alpha = look.glow * (0.16 + k * 0.085);
          const grad = ctx.createLinearGradient(0, 0, width, 0);
          grad.addColorStop(0, rgba(tone, alpha * 0.25));
          grad.addColorStop(0.35, rgba(tone, alpha));
          grad.addColorStop(0.7, rgba(mix(tone, look.ribbons[(b + 1) % 3], 0.55), alpha));
          grad.addColorStop(1, rgba(tone, alpha * 0.2));
          ctx.strokeStyle = grad;
          ctx.lineWidth = w;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.stroke();
        }
      }

      // --- The grid lines, very faint, and the pulses that run along them.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(look.line, look.lines);
      ctx.beginPath();
      for (let x = cell / 2; x < width; x += cell) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = cell / 2; y < height; y += cell) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      if (!still && now > nextPulse) {
        const horizontal = Math.random() < 0.55;
        const lines = Math.floor((horizontal ? height : width) / cell);
        pulses.push({
          horizontal,
          at: cell / 2 + Math.floor(Math.random() * lines) * cell,
          pos: -80,
          speed: 360 + Math.random() * 280,
          tone: look.ribbons[Math.floor(Math.random() * 3)],
          from: Math.random() < 0.5,
        });
        nextPulse = now + 650 + Math.random() * 1100;
      }
      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        p.pos += p.speed * dt;
        const span = p.horizontal ? width : height;
        if (p.pos > span + 200) {
          pulses.splice(i, 1);
        } else {
          const head = p.from ? p.pos : span - p.pos;
          const dir = p.from ? 1 : -1;
          const tail = head - dir * 150;
          const x0 = p.horizontal ? tail : p.at;
          const y0 = p.horizontal ? p.at : tail;
          const x1 = p.horizontal ? head : p.at;
          const y1 = p.horizontal ? p.at : head;
          const streak = ctx.createLinearGradient(x0, y0, x1, y1);
          streak.addColorStop(0, rgba(p.tone, 0));
          streak.addColorStop(1, rgba(p.tone, look.glow * 3.4));
          ctx.strokeStyle = streak;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          ctx.fillStyle = rgba(mix(p.tone, [255, 255, 255], 0.4), Math.min(0.9, look.glow * 4));
          ctx.beginPath();
          ctx.arc(x1, y1, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- The points. Each is at a crossing of the grid; its size and strength
      // come from a wave that travels diagonally, and from the pointer's lens.
      const lens = narrow ? 0 : 120;
      for (let x = cell / 2; x < width; x += cell) {
        for (let y = cell / 2; y < height; y += cell) {
          const wave = still ? 0.45 : 0.5 + 0.5 * Math.sin((x + y) * 0.011 - t * 0.9);
          const ridge = wave * wave;
          let size = 0.9 + ridge * 1.5;
          let alpha = look.dots * (0.35 + ridge * 0.9);
          if (lens && pointer.on) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            if (d < lens * 1.6) {
              const swell = Math.exp(-((d / lens) ** 2));
              size += swell * 3.2;
              alpha += swell * 0.5;
            }
          }
          // The hue of a point follows where it is, so the grid is tinted the way
          // the ribbons are above it.
          const u = (x / width + (still ? 0 : t * 0.02)) % 1;
          const tone =
            u < 0.5
              ? mix(look.ribbons[0], look.ribbons[1], u * 2)
              : mix(look.ribbons[1], look.ribbons[2], (u - 0.5) * 2);
          const color = mix(look.dot, tone, 0.35 + ridge * 0.5);
          ctx.fillStyle = rgba(color, Math.min(alpha, 0.95));
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < 32) return;
      draw(now);
    };

    const start = () => {
      if (started) return;
      started = true;
      fit();
      // It comes in, it does not pop: the canvas fades up once there is something on it.
      canvas.classList.add('is-on');
      last = performance.now();
      if (still) draw(last);
      else raf = requestAnimationFrame(loop);
    };

    // As soon as the page has something on it, and not before. The first screen has
    // to appear without this, but it must not wait for this either: a background
    // that only shows up after a few seconds, or once the reader has scrolled, is a
    // background that is not there. So it starts when the first content has been
    // painted (a short beat later, in an idle moment), and in any case no later than
    // a second and a half after the page mounts, which is what covers a browser that
    // does not report the paint.
    let waited = false;
    const go = () => {
      if (waited) return;
      waited = true;
      if (window.requestIdleCallback) idleId = window.requestIdleCallback(start, { timeout: 300 });
      else start();
    };
    const begin = () => {
      timer = window.setTimeout(go, 1500);
      const painted = performance.getEntriesByName?.('first-contentful-paint')?.length;
      if (painted) {
        window.setTimeout(go, 200);
      } else if (typeof PerformanceObserver !== 'undefined') {
        try {
          paintWatch = new PerformanceObserver((list) => {
            if (list.getEntries().some((entry) => entry.name === 'first-contentful-paint')) {
              window.setTimeout(go, 250);
              paintWatch.disconnect();
            }
          });
          paintWatch.observe({ type: 'paint', buffered: true });
        } catch (error) {
          // The timer above is the fallback.
        }
      }
    };
    begin();

    const onResize = () => {
      if (!started) return;
      fit();
      if (still) draw(performance.now());
    };
    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      if (!pointer.on) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        pointer.on = true;
      }
    };
    const onLeave = () => {
      pointer.on = false;
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    // The theme: the palette eases toward it; under reduced motion, which does not
    // run the loop, it is redrawn once.
    const watcher = new MutationObserver(() => {
      target = themeOf();
      if (still && started) {
        look = JSON.parse(JSON.stringify(HUES[target]));
        draw(performance.now());
      }
    });
    watcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      window.clearTimeout(timer);
      paintWatch?.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      watcher.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="aurora" aria-hidden="true" />;
};

export default Aurora;
