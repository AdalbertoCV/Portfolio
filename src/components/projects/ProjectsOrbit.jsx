import { useEffect, useRef } from 'react';
import CATALOGUE from './catalogue';
import { languageColor } from './ProjectGlyph';

// The catalogue as a system. Every project is a planet, in the colour of its
// language, on an arm of a spiral that is one of the catalogue's categories. The
// technologies that stand behind more than one project are bridges hung between
// the projects that share them, so what ties the work together is drawn rather
// than claimed: Django is a point with lines to every project that used it. A
// technology only one project used is a moon going round that project.
//
// It is the top of the page and it is wired to the filters under it: a language,
// a technology from the stack, or something typed in the search lights the
// planets that answer it and the bridges between them; a pointer over a planet
// lights it, its technologies and the projects that share any of them; and a
// planet or a bridge can be clicked to filter the page to it.
//
// One canvas, no library. Laid out for the canvas's own shape (a wide band on a
// desktop, a short block on a phone), and again when it changes. It loops only
// while on screen and with the tab visible, and stands still under reduced
// motion. It sits in the flow of the page and does not follow it.

const rgbOf = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const WHITE = [236, 242, 255];
const BASE = [150, 172, 205];

const norm = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');

const seeded = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// What the catalogue says, reshaped once: the projects in order, and for every
// technology the projects that used it. The technology list is the project's
// language and its tags, once each, which is what the page's own filter matches.
const buildData = () => {
  const projects = [];
  CATALOGUE.forEach((group, groupIndex) => {
    group.projects.forEach((project, j) => {
      projects.push({
        key: project.key,
        name: project.name,
        language: project.language,
        tags: [...new Set([project.language, ...(project.tags || [])].filter(Boolean))],
        groupIndex,
        j,
        n: group.projects.length,
        lead: Boolean(group.lead),
      });
    });
  });
  const uses = new Map();
  projects.forEach((project, i) => {
    project.tags.forEach((tag) => {
      if (!uses.has(tag)) uses.set(tag, []);
      uses.get(tag).push(i);
    });
  });
  const bridges = [...uses].filter(([, members]) => members.length > 1).map(([name, members]) => ({ name, members }));
  return { projects, uses, bridges, groups: CATALOGUE.length };
};

export const ORBIT_DATA = buildData();

const arrange = (width, height, narrow) => {
  const { projects, uses, bridges, groups } = ORBIT_DATA;
  const random = seeded(29);
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.43;
  const ry = height * 0.43;
  const scale = narrow ? 0.72 : 1;

  const planets = projects.map((project) => {
    const base = -Math.PI / 2 + (project.groupIndex / groups) * Math.PI * 2;
    const t = project.lead ? 0.26 : 0.36 + 0.6 * ((project.j + 0.5) / project.n);
    const angle = base + t * 1.25 + (random() - 0.5) * 0.12;
    return {
      ...project,
      x: cx + Math.cos(angle) * rx * t,
      y: cy + Math.sin(angle) * ry * t,
      r: (4.2 + Math.min(project.tags.length, 7) * 0.75) * scale,
      tone: mix(rgbOf(languageColor(project.language)), WHITE, 0.22),
      phase: random() * 6.28,
      l: 0.75,
      flare: 0,
      bobX: 0,
      bobY: 0,
    };
  });

  // The arms: the spiral each category lies along, faint, in its own hue.
  const arms = Array.from({ length: groups }, (_, g) => {
    const base = -Math.PI / 2 + (g / groups) * Math.PI * 2;
    const points = [];
    for (let s = 0; s <= 24; s += 1) {
      const t = 0.18 + (s / 24) * 0.82;
      const angle = base + t * 1.25;
      points.push([cx + Math.cos(angle) * rx * t, cy + Math.sin(angle) * ry * t]);
    }
    return { points, tone: mix(rgbOf('#22d3ee'), rgbOf('#f472b6'), g / Math.max(groups - 1, 1)) };
  });

  // A bridge hangs at the middle of the projects that share it, then is pushed
  // off whatever it landed on.
  const hung = bridges.map((bridge) => {
    const members = bridge.members.map((i) => planets[i]);
    return {
      name: bridge.name,
      members: bridge.members,
      x: members.reduce((s, p) => s + p.x, 0) / members.length,
      y: members.reduce((s, p) => s + p.y, 0) / members.length,
      l: 0.75,
      flare: 0,
    };
  });
  for (let pass = 0; pass < 14; pass += 1) {
    hung.forEach((b, i) => {
      const push = (ox, oy, gap) => {
        const dx = b.x - ox;
        const dy = b.y - oy;
        const d = Math.hypot(dx, dy) || 0.01;
        if (d < gap) {
          b.x += (dx / d) * (gap - d) * 0.5;
          b.y += (dy / d) * (gap - d) * 0.5;
        }
      };
      planets.forEach((p) => push(p.x, p.y, p.r + 11 * scale));
      hung.forEach((o, j) => {
        if (i !== j) push(o.x, o.y, 15 * scale);
      });
      b.x = Math.min(Math.max(b.x, 12), width - 12);
      b.y = Math.min(Math.max(b.y, 12), height - 12);
    });
  }

  // The technologies only one project used, going round it.
  const moons = [];
  uses.forEach((members, name) => {
    if (members.length !== 1) return;
    const owner = planets[members[0]];
    const taken = moons.filter((m) => m.owner === owner).length;
    if (taken >= 4) return;
    moons.push({
      name,
      owner,
      orbit: owner.r + (7 + taken * 4.2) * scale,
      angle: random() * 6.28,
      speed: (taken % 2 ? -1 : 1) * (0.35 + random() * 0.3),
      l: 0.75,
    });
  });

  return { planets, arms, bridges: hung, moons, cx, cy };
};

const ProjectsOrbit = ({ query, language, tech, live, onSelect }) => {
  const canvasRef = useRef(null);
  const tagRef = useRef(null);
  const stateRef = useRef({ query, language, tech, onSelect });

  useEffect(() => {
    stateRef.current = { query, language, tech, onSelect };
  }, [query, language, tech, onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let narrow = false;
    let graph = null;
    let last = performance.now();
    let pointer = null;
    let hover = null;
    let shown = '';
    let raf = 0;
    const packets = [];
    let nextSpark = last + 500;

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      narrow = width < 560;
      dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = arrange(width, height, narrow);
    };

    const tag = (text) => {
      if (text === shown) return;
      shown = text;
      if (tagRef.current) tagRef.current.textContent = text;
    };

    const pick = (x, y) => {
      let best = null;
      let distance = Infinity;
      graph.planets.forEach((p, i) => {
        const d = Math.hypot(p.x - x, p.y - y) - p.r;
        if (d < 14 && d < distance) {
          distance = d;
          best = { kind: 'planet', i };
        }
      });
      if (best) return best;
      graph.bridges.forEach((b, i) => {
        const d = Math.hypot(b.x - x, b.y - y);
        if (d < 13 && d < distance) {
          distance = d;
          best = { kind: 'bridge', i };
        }
      });
      return best;
    };

    const draw = (now) => {
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const { planets, arms, bridges, moons, cx, cy } = graph;
      const state = stateRef.current;

      // What is lit: the pointer's choice if there is one, otherwise whatever the
      // filters under the panel have narrowed the page to.
      const litP = new Set();
      const litT = new Set();
      const relatedP = new Set();
      let focused = false;
      if (hover?.kind === 'planet') {
        focused = true;
        const p = planets[hover.i];
        litP.add(hover.i);
        p.tags.forEach((tagName) => litT.add(tagName));
        bridges.forEach((b) => {
          if (b.members.includes(hover.i)) b.members.forEach((m) => relatedP.add(m));
        });
      } else if (hover?.kind === 'bridge') {
        focused = true;
        const b = bridges[hover.i];
        litT.add(b.name);
        b.members.forEach((m) => litP.add(m));
      } else if (state.tech || state.language || state.query) {
        focused = true;
        const needle = norm(state.query || '');
        planets.forEach((p, i) => {
          const okTech = !state.tech || p.tags.includes(state.tech);
          const okLang = !state.language || p.language === state.language;
          const haystack = norm([p.name, p.language, ...p.tags].join(' '));
          const okQuery = !needle || haystack.includes(needle);
          if (okTech && okLang && okQuery) {
            litP.add(i);
            p.tags.forEach((tagName) => {
              if (!state.tech || tagName === state.tech) litT.add(tagName);
            });
          }
        });
      }
      if (hover?.kind === 'planet') {
        tag(`${planets[hover.i].name} · ${planets[hover.i].language}`);
      } else if (hover?.kind === 'bridge') {
        tag(bridges[hover.i].name);
      } else if (state.tech) {
        tag(state.tech);
      } else {
        tag('');
      }

      // Everything eases toward where it should be, so a filter is a light
      // coming on and not a cut.
      const ease = Math.min(1, dt * 7);
      planets.forEach((p, i) => {
        const target = !focused ? 0.78 : litP.has(i) ? 1 : relatedP.has(i) ? 0.6 : 0.18;
        p.l += (target - p.l) * ease;
        p.flare *= Math.exp(-dt * 2.4);
        if (!still) {
          p.bobX = Math.sin(now / 2100 + p.phase) * 1.2;
          p.bobY = Math.cos(now / 2600 + p.phase) * 1.1;
        }
      });
      bridges.forEach((b) => {
        const target = !focused ? 0.7 : litT.has(b.name) ? 1 : 0.14;
        b.l += (target - b.l) * ease;
      });
      moons.forEach((m) => {
        const target = !focused ? 0.65 : litT.has(m.name) ? 1 : 0.12;
        m.l += (target - m.l) * ease;
        if (!still) m.angle += m.speed * dt;
      });

      if (!still && now > nextSpark && bridges.length) {
        const b = bridges[Math.floor(Math.random() * bridges.length)];
        const member = b.members[Math.floor(Math.random() * b.members.length)];
        if (packets.length < 40) packets.push({ from: planets[member], to: b, t: 0, speed: 0.8 + Math.random() * 0.7 });
        nextSpark = now + 380 + Math.random() * 500;
      }

      ctx.clearRect(0, 0, width, height);

      // The core: a quiet light at the middle of the system.
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.42);
      core.addColorStop(0, rgba([120, 170, 255], 0.16));
      core.addColorStop(1, rgba([120, 170, 255], 0));
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

      // The arms.
      ctx.lineWidth = 1;
      arms.forEach((arm) => {
        ctx.strokeStyle = rgba(arm.tone, 0.1);
        ctx.beginPath();
        arm.points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
      });

      // The tethers from each bridge to the projects that share it.
      bridges.forEach((b) => {
        b.members.forEach((m) => {
          const p = planets[m];
          const lit = Math.min(b.l, p.l);
          ctx.strokeStyle = rgba(mix(BASE, p.tone, lit), 0.1 + lit * 0.4);
          ctx.lineWidth = lit > 0.85 ? 1.4 : 1;
          ctx.beginPath();
          ctx.moveTo(p.x + p.bobX, p.y + p.bobY);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        });
      });

      ctx.globalCompositeOperation = 'lighter';

      // Impulses from a project to a technology it shares.
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const k = packets[i];
        if (!still) k.t += k.speed * dt;
        const head = Math.min(k.t, 1);
        const tail = Math.max(0, head - 0.35);
        const ax = k.from.x + k.from.bobX;
        const ay = k.from.y + k.from.bobY;
        const hx = ax + (k.to.x - ax) * head;
        const hy = ay + (k.to.y - ay) * head;
        const tx = ax + (k.to.x - ax) * tail;
        const ty = ay + (k.to.y - ay) * tail;
        const trail = ctx.createLinearGradient(tx, ty, hx, hy);
        trail.addColorStop(0, rgba(k.from.tone, 0));
        trail.addColorStop(1, rgba(k.from.tone, 0.85));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        if (k.t >= 1) {
          packets.splice(i, 1);
          k.to.flare = 1;
        }
      }

      // Moons.
      moons.forEach((m) => {
        const x = m.owner.x + m.owner.bobX + Math.cos(m.angle) * m.orbit;
        const y = m.owner.y + m.owner.bobY + Math.sin(m.angle) * m.orbit * 0.8;
        m.x = x;
        m.y = y;
        ctx.fillStyle = rgba(mix(BASE, m.owner.tone, 0.5 + m.l * 0.5), 0.25 + m.l * 0.7);
        ctx.beginPath();
        ctx.arc(x, y, 1.2 + m.l * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Bridges: a small diamond, lit when the technology is what is asked for.
      bridges.forEach((b) => {
        const s = 3.4 + b.l * 2 + b.flare * 2.4;
        b.flare *= Math.exp(-dt * 3);
        const reach = 8 + b.l * 10;
        const halo = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, reach);
        halo.addColorStop(0, rgba(WHITE, 0.3 * b.l + b.flare * 0.4));
        halo.addColorStop(1, rgba(WHITE, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(b.x, b.y, reach, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(WHITE, 0.35 + b.l * 0.6);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y - s);
        ctx.lineTo(b.x + s, b.y);
        ctx.lineTo(b.x, b.y + s);
        ctx.lineTo(b.x - s, b.y);
        ctx.closePath();
        ctx.fill();
      });

      // Planets.
      if (pointer) {
        const near = pick(pointer.x, pointer.y);
        hover = near;
      } else {
        hover = null;
      }
      planets.forEach((p, i) => {
        const x = p.x + p.bobX;
        const y = p.y + p.bobY;
        const r = p.r * (0.92 + p.l * 0.14) + (hover?.kind === 'planet' && hover.i === i ? 1.5 : 0);
        const reach = r * (2.2 + p.l * 1.6);
        const glow = ctx.createRadialGradient(x, y, r * 0.4, x, y, reach);
        glow.addColorStop(0, rgba(p.tone, 0.55 * p.l));
        glow.addColorStop(1, rgba(p.tone, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, reach, 0, Math.PI * 2);
        ctx.fill();
        const body = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
        body.addColorStop(0, rgba(mix(p.tone, WHITE, 0.55), 0.35 + p.l * 0.6));
        body.addColorStop(1, rgba(mix(p.tone, [10, 14, 24], 0.35), 0.3 + p.l * 0.65));
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        // A ring on the ones with the most behind them.
        if (p.tags.length >= 5) {
          ctx.strokeStyle = rgba(p.tone, 0.25 + p.l * 0.4);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(x, y, r * 1.7, r * 0.55, -0.4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.globalCompositeOperation = 'source-over';

      // Names: the project under the pointer, and the projects a filter has
      // narrowed the page to when there are few enough to name.
      ctx.font = '500 9.5px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      planets.forEach((p, i) => {
        const named = (hover?.kind === 'planet' && hover.i === i) || (!hover && focused && litP.size <= 6 && litP.has(i));
        if (!named) return;
        ctx.fillStyle = rgba(mix(p.tone, WHITE, 0.6), 0.97);
        ctx.fillText(p.name, Math.min(Math.max(p.x + p.bobX, 50), width - 50), p.y + p.bobY - p.r - 11);
      });
      bridges.forEach((b, i) => {
        if (!((hover?.kind === 'bridge' && hover.i === i) || (!hover && litT.size <= 2 && litT.has(b.name) && focused))) return;
        ctx.fillStyle = rgba(WHITE, 0.97);
        ctx.fillText(b.name, Math.min(Math.max(b.x, 40), width - 40), b.y - 14);
      });
      ctx.textAlign = 'start';
      canvas.style.cursor = hover ? 'pointer' : '';
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
      const hit = pick(pointer.x, pointer.y);
      if (!hit) return;
      if (hit.kind === 'planet') {
        stateRef.current.onSelect?.({ stack: graph.planets[hit.i].name, tech: '', lang: '' });
      } else {
        stateRef.current.onSelect?.({ tech: graph.bridges[hit.i].name, stack: '', lang: '' });
      }
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
    <div className="po-panel" aria-hidden="true">
      <canvas ref={canvasRef} className="po-canvas" />
      <span className="po-tag" ref={tagRef} />
    </div>
  );
};

export default ProjectsOrbit;
