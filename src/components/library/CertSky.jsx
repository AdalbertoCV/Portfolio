import { useEffect, useRef } from 'react';

// The drawing beside the certifications: a night sky in which every credential
// is a star. It is not a loop that plays next to the rail, it listens to it, the
// way the brain beside the interests does. The stars are laid out in the order
// they were earned, on a spiral that grows outward from the first one, so the
// sky is a picture of a career and it fills up as the list does: forty
// certifications are forty stars on the same spiral, not a wall of cards. A
// thread runs through them in that order, and turning to a credential sends a
// comet along the thread from wherever the last one was, flares the star it
// lands on, and lets the whole sky drift a little toward it.
//
// One canvas, no library. The geometry is a 400 × 330 box fitted to whatever the
// column is (a tall panel beside the rail on a desktop, a wide strip over it on
// a phone); the field of background stars is the size of the canvas, so neither
// shape reads as a frame with a hole in it. The loop only runs while the section
// is on screen, and with reduced motion it draws one still frame and stops.

const BOX_W = 400;
const BOX_H = 330;
const CENTER = [200, 168];

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const WHITE = [236, 242, 255];

// Seeded, so the sky is the same one on every visit and the drawing is a thing
// rather than a dice roll.
const seeded = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// The spiral. The first star sits near the middle and each one after it goes
// further out along a golden-angle turn, so any number of stars spread evenly
// instead of piling up, and the newest is always on the rim.
const place = (count) => {
  const random = seeded(23);
  return Array.from({ length: count }, (_, i) => {
    const angle = 0.55 + i * 2.39996;
    const radius = 42 + 31 * Math.sqrt(i);
    const x = CENTER[0] + Math.cos(angle) * radius * 1.3 + (random() - 0.5) * 10;
    const y = CENTER[1] + Math.sin(angle) * radius * 0.92 + (random() - 0.5) * 8;
    return [Math.min(Math.max(x, 34), BOX_W - 34), Math.min(Math.max(y, 34), BOX_H - 34)];
  });
};

// A smooth thread through the stars (Catmull-Rom), sampled so a comet can ride
// it and the part already travelled can be lit.
const thread = (pts, per = 18) => {
  const out = [];
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    for (let s = 0; s < per; s += 1) {
      const t = s / per;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (k) =>
        0.5 *
        (2 * p1[k] +
          (-p0[k] + p2[k]) * t +
          (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
          (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3);
      out.push({ x: f(0), y: f(1), u: i + t });
    }
  }
  const last = pts[pts.length - 1];
  out.push({ x: last[0], y: last[1], u: pts.length - 1 });
  return out;
};

const CertSky = ({ items, index, live, subject, meta }) => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  // The loop reads these through refs, so a new credential changes the drawing
  // without tearing the canvas down and laying the sky out again.
  const stateRef = useRef({ index, burst: null, items });
  const signature = items.map((item) => item.key).join('|');
  const tone = items[index]?.tone || '#a78bfa';

  useEffect(() => {
    stateRef.current.items = items;
    stateRef.current.index = index;
    stateRef.current.burst = performance.now();
  }, [items, index]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const list = stateRef.current.items;

    // Stars in the order they were earned; the position in `list` is the
    // position in the rail, and `rank` is the position in the sky.
    const order = list.map((item, i) => i).sort((a, b) => list[a].year - list[b].year || a - b);
    const rankOf = [];
    order.forEach((i, rank) => {
      rankOf[i] = rank;
    });
    const spots = place(list.length);
    const stars = order.map((i, rank) => ({
      x: spots[rank][0],
      y: spots[rank][1],
      tone: rgb(list[i].tone),
      year: list[i].year,
      flare: 0,
      phase: rank * 1.7,
    }));
    const curve = stars.length > 1 ? thread(stars.map((s) => [s.x, s.y])) : [];

    let width = 0;
    let height = 0;
    let scale = 1;
    let dpr = 1;
    let ambient = [];
    let bright = [];
    let last = performance.now();
    let comet = rankOf[stateRef.current.index] ?? 0;
    const cam = { x: 0, y: 0 };
    let hue = stars[rankOf[stateRef.current.index] ?? 0]?.tone || [167, 139, 250];
    const ripples = [];
    const shooters = [];
    let nextShooter = last + 2500;
    let nextRipple = last + 1200;
    let pointer = null;
    let raf = 0;

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The spiral takes the short side; the long side is the field's.
      scale = Math.min(width / BOX_W, height / BOX_H) * 0.94;
      const random = seeded(41);
      const total = Math.min(220, Math.round((width * height) / 1500));
      ambient = Array.from({ length: total }, () => {
        const depth = random();
        return {
          x: random() * width,
          y: random() * height,
          z: 0.12 + depth * 0.7,
          r: 0.35 + depth * 1.05,
          tw: 0.6 + random() * 2.2,
          ph: random() * 6.28,
          warm: random() < 0.16,
        };
      });
      // The brighter few are joined into faint figures of their own, so the
      // sky has constellations that are nobody's credential.
      bright = ambient.filter((p) => p.r > 0.95).slice(0, 34);
    };

    // World to screen, with the camera pan and a slight zoom toward the star in
    // view. `depth` is how far a layer follows the camera: the far stars barely
    // move, which is what makes the sky look deep.
    const zoom = 1.1;
    const sx = (x, depth = 1) => width / 2 + (x - CENTER[0] - cam.x * depth) * scale * zoom;
    const sy = (y, depth = 1) => height / 2 + (y - CENTER[1] - cam.y * depth) * scale * zoom;

    const at = (u) => {
      if (!curve.length) return null;
      const s = Math.min(Math.max(u, 0), stars.length - 1) * 18;
      const a = curve[Math.min(Math.floor(s), curve.length - 1)];
      const b = curve[Math.min(Math.floor(s) + 1, curve.length - 1)];
      const k = s - Math.floor(s);
      return [a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k];
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const state = stateRef.current;
      const rank = rankOf[state.index] ?? 0;
      const target = stars[rank];
      if (!target) return;

      // A new credential: a ripple from its star, and the comet is already on
      // its way because `comet` chases `rank` below.
      if (state.burst !== null) {
        ripples.push({ rank, at: now, big: true });
        target.flare = 1;
        state.burst = null;
      }

      // Everything eases: the hue, the camera, the comet.
      hue = mix(hue, target.tone, Math.min(1, dt * 3));
      const wantX = (target.x - CENTER[0]) * 0.3 + (pointer ? (pointer.nx - 0.5) * 16 : 0);
      const wantY = (target.y - CENTER[1]) * 0.3 + (pointer ? (pointer.ny - 0.5) * 12 : 0);
      cam.x += (wantX - cam.x) * Math.min(1, dt * 2.4);
      cam.y += (wantY - cam.y) * Math.min(1, dt * 2.4);
      comet += (rank - comet) * Math.min(1, dt * (still ? 60 : 2.1));

      if (!still && now > nextRipple) {
        ripples.push({ rank, at: now, big: false });
        nextRipple = now + 2300;
      }
      if (!still && now > nextShooter) {
        const fromLeft = Math.random() < 0.5;
        shooters.push({
          x: fromLeft ? -20 : width + 20,
          y: Math.random() * height * 0.6,
          vx: (fromLeft ? 1 : -1) * (260 + Math.random() * 180),
          vy: 70 + Math.random() * 90,
          life: 0,
        });
        nextShooter = now + 4500 + Math.random() * 6000;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Two soft clouds behind everything, in the hue of the star in view, so a
      // new credential recolours the whole sky rather than only its own star.
      [
        [0.28 + 0.06 * Math.sin(now / 5200), 0.36, 0.7, 0.13],
        [0.74 + 0.05 * Math.cos(now / 6100), 0.66, 0.6, 0.1],
      ].forEach(([fx, fy, size, alpha]) => {
        const r = Math.max(width, height) * size;
        const cloud = ctx.createRadialGradient(width * fx, height * fy, 0, width * fx, height * fy, r);
        cloud.addColorStop(0, rgba(hue, alpha));
        cloud.addColorStop(1, rgba(hue, 0));
        ctx.fillStyle = cloud;
        ctx.fillRect(0, 0, width, height);
      });

      // The instrument: rings around the middle of the spiral, ticked, turning
      // slowly, the way a star chart is drawn.
      const spin = still ? 0 : now / 90000;
      [58, 112, 168].forEach((radius, ringIndex) => {
        const r = radius * scale * zoom;
        const cx = sx(CENTER[0], 0.6);
        const cy = sy(CENTER[1], 0.6);
        ctx.strokeStyle = rgba(WHITE, 0.055);
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 7]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        if (ringIndex === 2) {
          ctx.strokeStyle = rgba(hue, 0.2);
          for (let k = 0; k < 72; k += 1) {
            const a = spin + (k / 72) * Math.PI * 2;
            const inner = r - (k % 6 === 0 ? 8 : 3.5);
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
            ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
            ctx.stroke();
          }
        }
      });

      // The field. Three depths, each following the camera by a different
      // amount, twinkling out of step with each other.
      const wrapX = (v) => ((v % (width + 24)) + width + 24) % (width + 24) - 12;
      const wrapY = (v) => ((v % (height + 24)) + height + 24) % (height + 24) - 12;
      ambient.forEach((p) => {
        p.sx = wrapX(p.x - cam.x * scale * zoom * p.z);
        p.sy = wrapY(p.y - cam.y * scale * zoom * p.z);
      });
      ctx.lineWidth = 1;
      for (let i = 0; i < bright.length; i += 1) {
        for (let j = i + 1; j < bright.length; j += 1) {
          const d = Math.hypot(bright[i].sx - bright[j].sx, bright[i].sy - bright[j].sy);
          if (d < 92) {
            ctx.strokeStyle = rgba(WHITE, (1 - d / 92) * 0.11);
            ctx.beginPath();
            ctx.moveTo(bright[i].sx, bright[i].sy);
            ctx.lineTo(bright[j].sx, bright[j].sy);
            ctx.stroke();
          }
        }
      }
      ambient.forEach((p) => {
        const twinkle = still ? 0.8 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(now / 1000 * p.tw + p.ph));
        ctx.fillStyle = rgba(p.warm ? mix(WHITE, [255, 214, 170], 0.7) : WHITE, twinkle * (0.25 + p.z * 0.6));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // The thread: dim the whole way, lit up to the comet in the colours of the
      // stars it has passed.
      if (curve.length) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(WHITE, 0.16);
        ctx.beginPath();
        curve.forEach((p, i) => {
          if (i === 0) ctx.moveTo(sx(p.x), sy(p.y));
          else ctx.lineTo(sx(p.x), sy(p.y));
        });
        ctx.stroke();

        ctx.lineWidth = 1.7;
        for (let seg = 0; seg < stars.length - 1; seg += 1) {
          if (comet <= seg) break;
          const from = seg * 18;
          const to = Math.min(from + 18, Math.floor(comet * 18));
          ctx.strokeStyle = rgba(mix(stars[seg].tone, stars[seg + 1].tone, 0.5), 0.7);
          ctx.beginPath();
          for (let k = from; k <= to && k < curve.length; k += 1) {
            if (k === from) ctx.moveTo(sx(curve[k].x), sy(curve[k].y));
            else ctx.lineTo(sx(curve[k].x), sy(curve[k].y));
          }
          ctx.stroke();
        }

        // The comet: a bright head with a tail down the thread behind it.
        const head = at(comet);
        if (head && Math.abs(rank - comet) > 0.02) {
          const tail = at(comet - Math.sign(rank - comet) * 0.55);
          const hx = sx(head[0]);
          const hy = sy(head[1]);
          const trail = ctx.createLinearGradient(sx(tail[0]), sy(tail[1]), hx, hy);
          trail.addColorStop(0, rgba(hue, 0));
          trail.addColorStop(1, rgba(mix(hue, WHITE, 0.5), 0.95));
          ctx.strokeStyle = trail;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(sx(tail[0]), sy(tail[1]));
          ctx.lineTo(hx, hy);
          ctx.stroke();
          const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 14);
          glow.addColorStop(0, rgba(WHITE, 0.9));
          glow.addColorStop(1, rgba(hue, 0));
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(hx, hy, 14, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ripples from the star in view: three rings going out and fading.
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        const age = (now - ripple.at) / (ripple.big ? 1900 : 2300);
        if (age >= 1) {
          ripples.splice(i, 1);
        } else {
          const star = stars[ripple.rank];
          const rings = ripple.big ? 3 : 1;
          for (let k = 0; k < rings; k += 1) {
            const local = age - k * 0.14;
            if (local > 0 && local < 1) {
              ctx.strokeStyle = rgba(star.tone, (1 - local) * (ripple.big ? 0.6 : 0.3));
              ctx.lineWidth = ripple.big ? 1.6 : 1;
              ctx.beginPath();
              ctx.arc(sx(star.x), sy(star.y), (6 + local * (ripple.big ? 54 : 38)) * scale * zoom, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      // The stars. The one in view is big and flared; the rest are lit in their
      // own tone, and a pointer over one wakes it.
      if (pointer) {
        stars.forEach((star) => {
          if (Math.hypot(sx(star.x) - pointer.x, sy(star.y) - pointer.y) < 28) star.flare = Math.max(star.flare, 0.85);
        });
      }
      stars.forEach((star, k) => {
        star.flare *= Math.exp(-dt * 2.2);
        const chosen = k === rank ? 1 : 0;
        const pulse = still ? 0.5 : 0.5 + 0.5 * Math.sin(now / 900 + star.phase);
        const lit = Math.max(chosen * (0.7 + 0.3 * pulse), star.flare, 0.3 + 0.12 * pulse);
        const x = sx(star.x);
        const y = sy(star.y);
        const reach = (11 + lit * 26) * scale * zoom;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, reach);
        halo.addColorStop(0, rgba(star.tone, 0.5 * lit + 0.1));
        halo.addColorStop(1, rgba(star.tone, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, reach, 0, Math.PI * 2);
        ctx.fill();

        // Four-point flare, longer on the star in view.
        const arm = (6 + lit * 22 + chosen * 10) * scale * zoom;
        const beam = ctx.createLinearGradient(x - arm, y, x + arm, y);
        beam.addColorStop(0, rgba(star.tone, 0));
        beam.addColorStop(0.5, rgba(mix(star.tone, WHITE, 0.6), 0.85 * lit));
        beam.addColorStop(1, rgba(star.tone, 0));
        ctx.strokeStyle = beam;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x - arm, y);
        ctx.lineTo(x + arm, y);
        ctx.stroke();
        const beamV = ctx.createLinearGradient(x, y - arm, x, y + arm);
        beamV.addColorStop(0, rgba(star.tone, 0));
        beamV.addColorStop(0.5, rgba(mix(star.tone, WHITE, 0.6), 0.85 * lit));
        beamV.addColorStop(1, rgba(star.tone, 0));
        ctx.strokeStyle = beamV;
        ctx.beginPath();
        ctx.moveTo(x, y - arm);
        ctx.lineTo(x, y + arm);
        ctx.stroke();

        ctx.fillStyle = rgba(mix(star.tone, WHITE, 0.75), 0.95);
        ctx.beginPath();
        ctx.arc(x, y, (1.7 + lit * 1.9 + chosen * 0.9) * scale * zoom, 0, Math.PI * 2);
        ctx.fill();
      });

      // Shooting stars: a streak across the whole field, now and then.
      for (let i = shooters.length - 1; i >= 0; i -= 1) {
        const s = shooters[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life > 1.6 || s.x < -60 || s.x > width + 60 || s.y > height + 40) {
          shooters.splice(i, 1);
        } else {
          const len = 64;
          const norm = Math.hypot(s.vx, s.vy);
          const tx = s.x - (s.vx / norm) * len;
          const ty = s.y - (s.vy / norm) * len;
          const streak = ctx.createLinearGradient(tx, ty, s.x, s.y);
          streak.addColorStop(0, rgba(hue, 0));
          streak.addColorStop(1, rgba(WHITE, 0.85));
          ctx.strokeStyle = streak;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      // The year beside each star, the way a chart labels what it maps: all of
      // them while there are few, and only the one in view once there are many.
      ctx.font = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = 'middle';
      stars.forEach((star, k) => {
        if (stars.length > 12 && k !== rank) return;
        ctx.fillStyle = rgba(k === rank ? mix(star.tone, WHITE, 0.55) : WHITE, k === rank ? 0.95 : 0.42);
        ctx.fillText(String(star.year), sx(star.x) + 12 * scale, sy(star.y) - 11 * scale);
      });
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      comet = rankOf[stateRef.current.index] ?? 0;
      const target = stars[comet];
      if (target) {
        cam.x = (target.x - CENTER[0]) * 0.3;
        cam.y = (target.y - CENTER[1]) * 0.3;
      }
      stateRef.current.burst = null;
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

    const onPointer = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - box.left,
        y: event.clientY - box.top,
        nx: (event.clientX - box.left) / box.width,
        ny: (event.clientY - box.top) / box.height,
      };
    };
    const onLeave = () => {
      pointer = null;
    };
    canvas.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerdown', onPointer);
      canvas.removeEventListener('pointerleave', onLeave);
    };
    // The sky is laid out again only when the set of credentials changes; the
    // credential in view is read through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, signature]);

  return (
    <div className="cv-mind cv-sky" ref={wrapRef} style={{ '--tone': tone }} aria-hidden="true">
      <canvas ref={canvasRef} className="cv-mind-canvas" />
      <span className="cv-mind-tag cv-mind-tag--subject">
        <i />
        {subject}
      </span>
      <span className="cv-mind-tag cv-mind-tag--rate">{meta}</span>
    </div>
  );
};

export default CertSky;
