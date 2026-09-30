import { useEffect, useRef } from 'react';

// The drawing beside the events: Mexico as a field of dots, and every event a
// pin on it. It listens to the rail the way the brain and the sky do. Turning to
// an event drops a sonar from its city that runs out across the dots and lights
// them as it passes, the camera leans toward the pin, and a comet rides the arc
// from wherever the last event was. The arcs join the events in the order they
// happened, so the map is a route and not a scatter, and it fills in as the list
// does: forty events are forty pins on the same map, not forty cards.
//
// One canvas, no library, and the country is a hand-simplified outline in
// degrees, projected once; the dots are a hex grid clipped to it. The geometry
// lives in a 400 × 330 box fitted to whatever the column is (a tall panel beside
// the rail on a desktop, a wide strip over it on a phone). The loop only runs
// while the section is on screen, and with reduced motion it draws one still
// frame and stops.

const BOX_W = 400;
const BOX_H = 330;
const CENTER = [200, 168];
// Equirectangular, with longitude shortened by the cosine of the middle of the
// country so it is not stretched sideways, and a scale that puts its width at
// about 380 of the box's 400.
const COS = 0.917;
const K = 12.97;
const project = (lon, lat) => [CENTER[0] + (lon + 102) * COS * K, CENTER[1] + (23.6 - lat) * K];

// The outline, [lon, lat]: the northern border west to east, the Gulf coast, the
// Yucatán, the southern border, the Pacific coast back up to the head of the Gulf
// of California, down the far side of Baja and up its Pacific coast to Tijuana.
const OUTLINE = [
  [-117.12, 32.53], [-114.72, 32.72], [-111.07, 31.33], [-108.21, 31.33], [-108.21, 31.78],
  [-106.53, 31.78], [-105.0, 30.65], [-104.5, 29.65], [-103.3, 29.0], [-102.7, 29.7],
  [-101.4, 29.77], [-100.7, 29.1], [-100.3, 28.3], [-99.5, 27.5], [-99.1, 26.4],
  [-98.2, 26.05], [-97.15, 25.95], [-97.2, 25.0], [-97.7, 23.0], [-97.85, 22.25],
  [-97.5, 21.3], [-97.3, 20.7], [-96.9, 19.9], [-96.3, 19.35], [-96.1, 19.1],
  [-95.2, 18.6], [-94.4, 18.15], [-93.6, 18.4], [-92.5, 18.65], [-91.6, 18.75],
  [-90.75, 19.4], [-90.5, 20.0], [-90.35, 21.0], [-89.6, 21.3], [-88.3, 21.55],
  [-87.2, 21.5], [-86.8, 21.1], [-87.05, 20.5], [-87.45, 19.6], [-87.55, 18.6],
  [-88.3, 18.5], [-89.15, 17.82], [-90.98, 17.82], [-90.98, 17.25], [-91.4, 16.9],
  [-91.7, 16.1], [-92.2, 15.25], [-92.2, 14.55], [-93.4, 15.5], [-94.7, 16.2],
  [-95.6, 15.95], [-96.6, 15.7], [-97.7, 15.9], [-99.0, 16.6], [-99.9, 16.85],
  [-101.0, 17.3], [-102.2, 17.95], [-103.5, 18.3], [-104.35, 19.05], [-105.25, 20.65],
  [-105.55, 21.7], [-105.7, 22.6], [-106.4, 23.2], [-107.5, 24.5], [-108.3, 25.4],
  [-109.1, 26.3], [-109.9, 27.0], [-110.9, 27.9], [-111.7, 28.5], [-112.3, 29.1],
  [-112.95, 30.5], [-113.3, 31.3], [-114.4, 31.6], [-114.8, 31.8], [-114.8, 31.0],
  [-114.3, 30.0], [-113.4, 29.3], [-112.9, 28.6], [-112.27, 27.34], [-111.98, 26.9],
  [-111.3, 25.8], [-110.7, 24.9], [-110.3, 24.15], [-109.9, 23.1], [-109.9, 22.87],
  [-110.3, 23.4], [-111.4, 24.0], [-112.1, 24.6], [-112.2, 25.5], [-113.0, 26.4],
  [-114.1, 27.0], [-114.7, 27.7], [-115.1, 28.2], [-115.7, 29.8], [-116.05, 30.5],
  [-116.6, 31.85],
].map(([lon, lat]) => project(lon, lat));

// Cities nobody visited on this list, so the country has a shape of places and
// not only of pins.
const CITIES = [
  [-99.13, 19.43], [-100.31, 25.69], [-103.35, 20.66], [-100.39, 20.59], [-117.04, 32.51],
  [-89.62, 20.97], [-86.85, 21.16], [-98.2, 19.04], [-101.68, 21.12], [-106.09, 28.63],
  [-102.57, 22.77], [-96.73, 17.06], [-96.13, 19.18], [-107.39, 24.8], [-110.96, 29.07],
  [-100.97, 22.15], [-102.3, 21.88], [-101.19, 19.7], [-92.93, 17.99], [-93.12, 16.75],
  [-115.47, 32.62], [-110.31, 24.14], [-104.67, 24.02],
].map(([lon, lat]) => project(lon, lat));

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const WHITE = [236, 242, 255];
const BASE = [150, 172, 205];

// The dots: a hex grid over the country's box, kept where it falls inside.
const dotField = (probe) => {
  const path = new Path2D();
  OUTLINE.forEach(([x, y], i) => (i ? path.lineTo(x, y) : path.moveTo(x, y)));
  path.closePath();
  const dots = [];
  const gap = 5.6;
  for (let row = 0; row * gap * 0.866 < BOX_H; row += 1) {
    const y = 40 + row * gap * 0.866;
    for (let x = 6 + (row % 2 ? gap / 2 : 0); x < BOX_W; x += gap) {
      if (probe.isPointInPath(path, x, y)) dots.push({ x, y, seed: (x * 12.9898 + y * 78.233) % 6.283 });
    }
  }
  return { dots, path };
};

// Arcs between consecutive events, sampled so a comet can ride them.
const arcs = (pins, per = 22) => {
  const out = [];
  for (let i = 0; i < pins.length - 1; i += 1) {
    const a = pins[i];
    const b = pins[i + 1];
    const same = Math.hypot(a.x - b.x, a.y - b.y) < 1;
    const lift = Math.hypot(a.x - b.x, a.y - b.y) * 0.32;
    const cx = (a.x + b.x) / 2;
    const cy = (a.y + b.y) / 2 - lift;
    for (let s = 0; s < per; s += 1) {
      const t = s / per;
      const u = 1 - t;
      out.push({
        x: same ? a.x : u * u * a.x + 2 * u * t * cx + t * t * b.x,
        y: same ? a.y : u * u * a.y + 2 * u * t * cy + t * t * b.y,
        u: i + t,
      });
    }
  }
  const last = pins[pins.length - 1];
  out.push({ x: last.x, y: last.y, u: pins.length - 1 });
  return out;
};

const EventsMap = ({ items, index, live, subject, meta }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ index, burst: null, items });
  const signature = items.map((item) => item.key).join('|');
  const tone = items[index]?.tone || '#22d3ee';

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
    const { dots } = dotField(ctx);

    // Pins in the order things happened. Events in one city are spread on a
    // small circle around it, so two of them are two pins and not one.
    const order = list.map((item, i) => i).sort((a, b) => list[a].when - list[b].when || b - a);
    const rankOf = [];
    order.forEach((i, rank) => {
      rankOf[i] = rank;
    });
    const perCity = {};
    const pins = order.map((i) => {
      const item = list[i];
      const [x, y] = project(item.lon, item.lat);
      const n = (perCity[item.city] = (perCity[item.city] || 0) + 1) - 1;
      const total = list.filter((other) => other.city === item.city).length;
      const angle = -Math.PI / 2 + (n / Math.max(total, 1)) * Math.PI * 2 + 0.5;
      const spread = total > 1 ? 7 : 0;
      return {
        x: x + Math.cos(angle) * spread,
        y: y + Math.sin(angle) * spread * 0.7,
        cx: x,
        cy: y,
        city: item.city,
        tone: rgb(item.tone),
        flare: 0,
      };
    });
    const curve = pins.length > 1 ? arcs(pins) : [];

    let width = 0;
    let height = 0;
    let scale = 1;
    let dpr = 1;
    let last = performance.now();
    let comet = rankOf[stateRef.current.index] ?? 0;
    const cam = { x: 0, y: 0 };
    let hue = pins[rankOf[stateRef.current.index] ?? 0]?.tone || [34, 211, 238];
    let heat = 0;
    const sonar = [];
    let nextSonar = last + 1400;
    let pointer = null;
    let raf = 0;
    let motes = [];
    const zoomWant = 1.1;
    let zoom = 1;

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The country takes the width; on a wide strip the height decides.
      scale = Math.min(width / BOX_W, height / 262) * 0.9;
      // Motes drifting up through the whole panel, so a tall column is a field
      // and not a small map in a big box.
      const total = Math.min(90, Math.round((width * height) / 5200));
      motes = Array.from({ length: total }, (_, i) => ({
        x: (Math.sin(i * 12.9898) * 43758.5453) % 1,
        y: (Math.sin(i * 78.233) * 12543.5453) % 1,
        v: 5 + ((i * 37) % 11),
        r: 0.6 + ((i * 17) % 10) / 9,
        ph: i * 1.3,
      }));
    };

    const sx = (x, depth = 1) => width / 2 + (x - CENTER[0] - cam.x * depth) * scale * zoom;
    const sy = (y, depth = 1) => height / 2 + (y - CENTER[1] - cam.y * depth) * scale * zoom;

    const at = (u) => {
      if (!curve.length) return null;
      const s = Math.min(Math.max(u, 0), pins.length - 1) * 22;
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
      const target = pins[rank];
      if (!target) return;

      if (state.burst !== null) {
        sonar.push({ x: target.x, y: target.y, at: now, tone: target.tone, big: true });
        target.flare = 1;
        // The warmth around the pin starts again from nothing, so a new event
        // is a light coming on rather than a light already there.
        heat = 0;
        state.burst = null;
      }
      if (!still && now > nextSonar) {
        sonar.push({ x: target.x, y: target.y, at: now, tone: target.tone, big: false });
        nextSonar = now + 2600;
      }

      hue = mix(hue, target.tone, Math.min(1, dt * 3));
      zoom += (zoomWant - zoom) * Math.min(1, dt * 1.6);
      const wantX = (target.x - CENTER[0]) * 0.4 + (pointer ? (pointer.nx - 0.5) * 14 : 0);
      const wantY = (target.y - CENTER[1]) * 0.4 + (pointer ? (pointer.ny - 0.5) * 10 : 0);
      cam.x += (wantX - cam.x) * Math.min(1, dt * 2.2);
      cam.y += (wantY - cam.y) * Math.min(1, dt * 2.2);
      comet += (rank - comet) * Math.min(1, dt * (still ? 60 : 2));
      heat = Math.min(1, heat + dt * 2);

      ctx.clearRect(0, 0, width, height);

      // The motes: faint points rising through the panel, tinted by the event in
      // view.
      ctx.fillStyle = rgba(mix(BASE, hue, 0.5), 0.3);
      motes.forEach((mote) => {
        const rise = still ? 0 : (now / 1000) * mote.v;
        const px = (((mote.x % 1) + 1) % 1) * width + (still ? 0 : Math.sin(now / 2400 + mote.ph) * 6);
        const py = ((((mote.y % 1) + 1) % 1) * height - rise + height * 40) % height;
        ctx.globalAlpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(now / 1500 + mote.ph));
        ctx.beginPath();
        ctx.arc(px, py, mote.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Graticule: the lines of longitude and latitude, faint, so the panel
      // reads as a chart and the country as a place on it.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(WHITE, 0.045);
      for (let lon = -120; lon <= -84; lon += 6) {
        const [x] = project(lon, 23.6);
        ctx.beginPath();
        ctx.moveTo(sx(x, 0.7), 0);
        ctx.lineTo(sx(x, 0.7), height);
        ctx.stroke();
      }
      for (let lat = 12; lat <= 36; lat += 4) {
        const [, y] = project(-102, lat);
        ctx.beginPath();
        ctx.moveTo(0, sy(y, 0.7));
        ctx.lineTo(width, sy(y, 0.7));
        ctx.stroke();
      }

      // Soft light in the hue of the event in view, behind the map.
      const glow = ctx.createRadialGradient(sx(target.x), sy(target.y), 0, sx(target.x), sy(target.y), 190 * scale * zoom);
      glow.addColorStop(0, rgba(hue, 0.2));
      glow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // The coast.
      ctx.save();
      ctx.beginPath();
      OUTLINE.forEach(([x, y], i) => (i ? ctx.lineTo(sx(x), sy(y)) : ctx.moveTo(sx(x), sy(y))));
      ctx.closePath();
      ctx.fillStyle = rgba(BASE, 0.035);
      ctx.fill();
      ctx.strokeStyle = rgba(mix(BASE, hue, 0.45), 0.34);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // The dots, lit by three things: the warmth around the pin in view, the
      // sonar wave passing through them, and a scan that crosses the country
      // every few seconds.
      const scanX = (((now / 1000) % 8) / 8) * (BOX_W + 120) - 60;
      const size = 1.7 * scale * zoom;
      ctx.globalCompositeOperation = 'lighter';
      dots.forEach((dot) => {
        const d = Math.hypot(dot.x - target.x, dot.y - target.y);
        let light = 0.2 + 0.05 * (still ? 0.5 : Math.sin(now / 1200 + dot.seed));
        light += Math.exp(-((d / 62) ** 2)) * 0.5 * heat;
        for (let i = 0; i < sonar.length; i += 1) {
          const wave = sonar[i];
          const age = (now - wave.at) / (wave.big ? 2300 : 2600);
          const front = age * (wave.big ? 230 : 170);
          const dd = Math.hypot(dot.x - wave.x, dot.y - wave.y);
          light += Math.exp(-(((dd - front) / 13) ** 2)) * (1 - Math.min(age, 1)) * (wave.big ? 0.95 : 0.5);
        }
        if (!still) light += Math.exp(-(((dot.x - scanX) / 16) ** 2)) * 0.28;
        const near = Math.min(1, Math.exp(-((d / 90) ** 2)) * 1.2);
        ctx.fillStyle = rgba(mix(BASE, hue, near), Math.min(0.95, light));
        ctx.fillRect(sx(dot.x) - size / 2, sy(dot.y) - size / 2, size, size);
      });

      // The other cities: a small light each, joined to their neighbours.
      ctx.lineWidth = 1;
      for (let i = 0; i < CITIES.length; i += 1) {
        for (let j = i + 1; j < CITIES.length; j += 1) {
          const d = Math.hypot(CITIES[i][0] - CITIES[j][0], CITIES[i][1] - CITIES[j][1]);
          if (d < 58) {
            ctx.strokeStyle = rgba(WHITE, (1 - d / 58) * 0.12);
            ctx.beginPath();
            ctx.moveTo(sx(CITIES[i][0]), sy(CITIES[i][1]));
            ctx.lineTo(sx(CITIES[j][0]), sy(CITIES[j][1]));
            ctx.stroke();
          }
        }
      }
      CITIES.forEach(([x, y], i) => {
        const twinkle = still ? 0.7 : 0.5 + 0.5 * Math.sin(now / 1100 + i * 1.9);
        ctx.fillStyle = rgba(WHITE, 0.35 + twinkle * 0.3);
        ctx.beginPath();
        ctx.arc(sx(x), sy(y), 1.6 * scale * zoom, 0, Math.PI * 2);
        ctx.fill();
      });

      // The route: the arcs, dim the whole way, lit up to the comet.
      if (curve.length) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(WHITE, 0.18);
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        curve.forEach((p, i) => (i ? ctx.lineTo(sx(p.x), sy(p.y)) : ctx.moveTo(sx(p.x), sy(p.y))));
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.lineWidth = 1.9;
        for (let seg = 0; seg < pins.length - 1; seg += 1) {
          if (comet <= seg) break;
          const from = seg * 22;
          const to = Math.min(from + 22, Math.floor(comet * 22));
          ctx.strokeStyle = rgba(mix(pins[seg].tone, pins[seg + 1].tone, 0.5), 0.8);
          ctx.beginPath();
          for (let k = from; k <= to && k < curve.length; k += 1) {
            if (k === from) ctx.moveTo(sx(curve[k].x), sy(curve[k].y));
            else ctx.lineTo(sx(curve[k].x), sy(curve[k].y));
          }
          ctx.stroke();
        }

        const head = at(comet);
        if (head && Math.abs(rank - comet) > 0.02) {
          const tail = at(comet - Math.sign(rank - comet) * 0.5);
          const hx = sx(head[0]);
          const hy = sy(head[1]);
          const trail = ctx.createLinearGradient(sx(tail[0]), sy(tail[1]), hx, hy);
          trail.addColorStop(0, rgba(hue, 0));
          trail.addColorStop(1, rgba(mix(hue, WHITE, 0.5), 0.95));
          ctx.strokeStyle = trail;
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(sx(tail[0]), sy(tail[1]));
          ctx.lineTo(hx, hy);
          ctx.stroke();
          const spark = ctx.createRadialGradient(hx, hy, 0, hx, hy, 15);
          spark.addColorStop(0, rgba(WHITE, 0.95));
          spark.addColorStop(1, rgba(hue, 0));
          ctx.fillStyle = spark;
          ctx.beginPath();
          ctx.arc(hx, hy, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Sonar rings on the ground: ellipses, because the map lies flat.
      for (let i = sonar.length - 1; i >= 0; i -= 1) {
        const wave = sonar[i];
        const age = (now - wave.at) / (wave.big ? 2300 : 2600);
        if (age >= 1) {
          sonar.splice(i, 1);
        } else {
          const rings = wave.big ? 3 : 1;
          for (let k = 0; k < rings; k += 1) {
            const local = age - k * 0.13;
            if (local > 0 && local < 1) {
              const r = (5 + local * (wave.big ? 74 : 54)) * scale * zoom;
              ctx.strokeStyle = rgba(wave.tone, (1 - local) * (wave.big ? 0.75 : 0.4));
              ctx.lineWidth = wave.big ? 1.6 : 1;
              ctx.beginPath();
              ctx.ellipse(sx(wave.x), sy(wave.y), r, r * 0.62, 0, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      // The pins: a stem, a lit head and a base on the map. The one in view is
      // taller and brighter; a pointer over another wakes it.
      if (pointer) {
        pins.forEach((pin) => {
          if (Math.hypot(sx(pin.x) - pointer.x, sy(pin.y - 8) - pointer.y) < 26) pin.flare = Math.max(pin.flare, 0.85);
        });
      }
      pins.forEach((pin, k) => {
        pin.flare *= Math.exp(-dt * 2.2);
        const chosen = k === rank ? 1 : 0;
        const pulse = still ? 0.5 : 0.5 + 0.5 * Math.sin(now / 800 + k);
        const lit = Math.max(chosen * (0.75 + 0.25 * pulse), pin.flare, 0.35);
        const x = sx(pin.x);
        const y = sy(pin.y);
        const stem = (8 + chosen * 12 + pin.flare * 6) * scale * zoom;
        const beam = ctx.createLinearGradient(x, y, x, y - stem);
        beam.addColorStop(0, rgba(pin.tone, 0.85 * lit));
        beam.addColorStop(1, rgba(pin.tone, 0));
        ctx.strokeStyle = beam;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - stem);
        ctx.stroke();
        const halo = ctx.createRadialGradient(x, y - stem, 0, x, y - stem, (9 + lit * 14) * scale * zoom);
        halo.addColorStop(0, rgba(pin.tone, 0.6 * lit));
        halo.addColorStop(1, rgba(pin.tone, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y - stem, (9 + lit * 14) * scale * zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(mix(pin.tone, WHITE, 0.7), 0.95);
        ctx.beginPath();
        ctx.arc(x, y - stem, (1.9 + lit * 1.6 + chosen) * scale * zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(pin.tone, 0.5 * lit);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(x, y, (3.5 + chosen * 2) * scale * zoom, (3.5 + chosen * 2) * 0.62 * scale * zoom, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.globalCompositeOperation = 'source-over';

      // The city beside the pin in view, the way a chart names a place.
      const shown = list[state.index];
      if (shown) {
        ctx.font = '500 10px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(mix(target.tone, WHITE, 0.55), 0.95);
        ctx.fillText(shown.city.toUpperCase(), sx(target.x) + 14 * scale, sy(target.y) - 22 * scale);
      }
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      comet = rankOf[stateRef.current.index] ?? 0;
      const target = pins[comet];
      if (target) {
        cam.x = (target.x - CENTER[0]) * 0.4;
        cam.y = (target.y - CENTER[1]) * 0.4;
      }
      zoom = zoomWant;
      heat = 1;
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
    // The map is built again only when the set of events changes; the event in
    // view is read through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, signature]);

  return (
    <div className="cv-mind cv-map" style={{ '--tone': tone }} aria-hidden="true">
      <canvas ref={canvasRef} className="cv-mind-canvas" />
      <span className="cv-mind-tag cv-mind-tag--subject">
        <i />
        {subject}
      </span>
      <ol className="cv-map-log">
        {items.slice(0, 6).map((item, position) => (
          <li key={item.key} className={position === index ? 'is-on' : undefined}>
            <b>{item.year}</b>
            <span>{item.city}</span>
          </li>
        ))}
      </ol>
      <span className="cv-mind-tag cv-mind-tag--rate">{meta}</span>
    </div>
  );
};

export default EventsMap;
