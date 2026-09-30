import { useEffect, useRef } from 'react';

// The drawing beside the people: a network with the one who wrote this page at
// the middle, the organisations they built things with around it as hubs, and
// every person orbiting the hub they worked in, in the colour that is theirs
// and only theirs across the page. It listens to the rail the way the brain, the
// sky and the map do. Turning to a person sends an impulse from the middle out
// to their organisation and on to them, lights the route, and flares the node it
// lands on. Someone who worked in two places is tied to both hubs; someone with
// no organisation on the page hangs from the middle on their own. It grows with
// the list: forty people are forty nodes on the same hubs, not forty cards.
//
// One canvas, no library. The geometry is drawn around a centre point and fitted to whatever the
// column is (a tall panel beside the rail on a desktop, a wide strip over it on a
// phone), with a looser network drifting through the rest so neither shape reads
// as a frame with a hole in it. The loop only runs while the section is on
// screen, and with reduced motion it draws one still frame and stops.

const CENTER = [200, 166];
const HUB_RING = 100;

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = ([r, g, b], a) => `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const WHITE = [236, 242, 255];
const BASE = [150, 172, 205];

const seeded = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// The graph: the middle, one hub per organisation, one node per person, and the
// edges between them. Returns nodes with an orbit each, so a frame only has to
// ask where they are now.
const build = (list) => {
  const random = seeded(31);
  const nodes = [{ kind: 'core', x: CENTER[0], y: CENTER[1], flash: 0, tone: WHITE, label: '' }];
  const edges = [];
  const hubs = {};
  const names = [];
  list.forEach((person) => (person.orgs || []).forEach((org) => {
    if (!names.includes(org)) names.push(org);
  }));

  names.forEach((org, i) => {
    const angle = -Math.PI / 2 + (i / names.length) * Math.PI * 2 + 0.4;
    hubs[org] = nodes.length;
    nodes.push({
      kind: 'org',
      angle,
      x: CENTER[0] + Math.cos(angle) * HUB_RING * 1.22,
      y: CENTER[1] + Math.sin(angle) * HUB_RING * 0.9,
      flash: 0,
      label: org,
      tone: WHITE,
      people: 0,
    });
    edges.push([0, nodes.length - 1]);
  });

  const perHub = {};
  const orphans = list.filter((person) => !(person.orgs || []).length);
  const personIndex = [];
  list.forEach((person, i) => {
    const orgs = person.orgs || [];
    let orbit;
    if (orgs.length) {
      const hub = nodes[hubs[orgs[0]]];
      const k = (perHub[orgs[0]] = (perHub[orgs[0]] || 0) + 1) - 1;
      const total = list.filter((other) => (other.orgs || [])[0] === orgs[0]).length;
      const fan = (k - (total - 1) / 2) * 0.95;
      orbit = { around: hub, radius: 34 + (k % 2) * 8 + random() * 3, angle: hub.angle + fan, speed: (k % 2 ? -1 : 1) * (0.09 + random() * 0.05) };
      hub.people += 1;
    } else {
      const slot = orphans.indexOf(person);
      // The widest stretch of the ring with no hub in it, so they hang from the
      // middle in open space rather than on top of somebody's orbit.
      const angles = names.map((org) => nodes[hubs[org]].angle).sort((p, q) => p - q);
      let from = -Math.PI / 2;
      let gap = Math.PI * 2;
      if (angles.length) {
        gap = 0;
        angles.forEach((angle, k) => {
          const next = k === angles.length - 1 ? angles[0] + Math.PI * 2 : angles[k + 1];
          if (next - angle > gap) {
            gap = next - angle;
            from = angle;
          }
        });
      }
      const angle = from + (gap / (orphans.length + 1)) * (slot + 1);
      orbit = { around: nodes[0], radius: HUB_RING * 1.32, angle, speed: 0.02 };
    }
    personIndex[i] = nodes.length;
    nodes.push({
      kind: 'person',
      orbit,
      phase: random() * 6.28,
      x: 0,
      y: 0,
      flash: 0,
      tone: rgb(person.tone),
      label: String(person.label).split(' ')[0],
      full: person.label,
      first: orgs[0],
    });
    const self = nodes.length - 1;
    edges.push([orgs.length ? hubs[orgs[0]] : 0, self]);
    // A second position ties the person to that hub too.
    orgs.slice(1).forEach((org) => edges.push([self, hubs[org]]));
  });
  return { nodes, edges, personIndex, hubs };
};

const PeopleNet = ({ items, index, live, subject, meta }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ index, burst: null, items });
  const signature = items.map((item) => item.key).join('|');
  const tone = items[index]?.tone || '#7dd3a0';

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
    const graph = build(list);
    const { nodes, edges, personIndex, hubs } = graph;
    const adjacent = nodes.map(() => []);
    edges.forEach(([a, b]) => {
      adjacent[a].push(b);
      adjacent[b].push(a);
    });

    const packets = [];
    const rings = [];
    let width = 0;
    let height = 0;
    let scale = 1;
    let dpr = 1;
    let ambient = [];
    let last = performance.now();
    let nextSpark = last + 900;
    const cam = { x: 0, y: 0 };
    let hue = rgb(list[stateRef.current.index]?.tone || '#7dd3a0');
    let route = [];
    let pointer = null;
    let raf = 0;
    const zoom = 1;

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fitted to the network itself (about 340 × 262 of the box), not to the whole
      // box, so it fills the panel instead of sitting small in the middle of it.
      scale = Math.min(width / 340, height / 262) * 0.94;
      const random = seeded(11);
      const total = Math.min(90, Math.round((width * height) / 4200));
      ambient = Array.from({ length: total }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 8,
        vy: (random() - 0.5) * 8,
        r: 0.6 + random() * 1.1,
      }));
    };

    const sx = (x) => width / 2 + (x - CENTER[0] - cam.x) * scale * zoom;
    const sy = (y) => height / 2 + (y - CENTER[1] - cam.y) * scale * zoom;

    const send = (from, to, color, energy, delay = 0, speed = 1.7) => {
      if (packets.length > 160) return;
      packets.push({ from, to, t: -delay * speed, speed, energy, color });
    };

    // The route to a person: the middle, their hub if they have one, them.
    const routeTo = (person) => {
      const node = nodes[personIndex[person]];
      const path = [0];
      if (node.first) path.push(hubs[node.first]);
      path.push(personIndex[person]);
      return path;
    };

    const draw = (now) => {
      // A canvas with no size (a page swapped out from under it, a hidden tab) has
      // nothing to draw on, and a gradient on it throws.
      if (!(width > 1) || !(height > 1)) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const state = stateRef.current;
      const chosen = personIndex[state.index];
      const target = nodes[chosen];
      if (!target) return;

      if (state.burst !== null) {
        route = routeTo(state.index);
        route.slice(0, -1).forEach((from, hop) => send(from, route[hop + 1], target.tone, 1, hop * 0.5, 1.9));
        nodes[0].flash = 1;
        rings.push({ node: chosen, at: now + route.length * 380 });
        state.burst = null;
      }

      hue = mix(hue, target.tone, Math.min(1, dt * 3));

      // Orbits: every person goes round the hub they belong to, each at their
      // own pace, and the hubs breathe a little.
      nodes.forEach((node, i) => {
        if (node.kind === 'org') {
          node.x += (CENTER[0] + Math.cos(node.angle) * HUB_RING * 1.22 + Math.sin(now / 2600 + i) * (still ? 0 : 3) - node.x) * Math.min(1, dt * 4);
          node.y += (CENTER[1] + Math.sin(node.angle) * HUB_RING * 0.9 + Math.cos(now / 3100 + i) * (still ? 0 : 3) - node.y) * Math.min(1, dt * 4);
        }
      });
      nodes.forEach((node) => {
        if (node.kind === 'person') {
          if (!still) node.orbit.angle += node.orbit.speed * dt;
          node.x = node.orbit.around.x + Math.cos(node.orbit.angle) * node.orbit.radius * 1.15;
          node.y = node.orbit.around.y + Math.sin(node.orbit.angle) * node.orbit.radius * 0.85;
        }
        node.flash *= Math.exp(-dt * 2.6);
      });

      cam.x += ((target.x - CENTER[0]) * 0.1 + (pointer ? (pointer.nx - 0.5) * 12 : 0) - cam.x) * Math.min(1, dt * 2.2);
      cam.y += ((target.y - CENTER[1]) * 0.1 + (pointer ? (pointer.ny - 0.5) * 10 : 0) - cam.y) * Math.min(1, dt * 2.2);

      if (!still && now > nextSpark) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        const flip = Math.random() < 0.5;
        send(flip ? e[0] : e[1], flip ? e[1] : e[0], Math.random() < 0.55 ? hue : BASE, 0.35 + Math.random() * 0.25, 0, 1.2);
        nextSpark = now + 260 + Math.random() * 380;
      }

      ctx.clearRect(0, 0, width, height);

      // Soft light in the hue of the person in view.
      const glow = ctx.createRadialGradient(sx(target.x), sy(target.y), 0, sx(target.x), sy(target.y), 200 * scale * zoom);
      glow.addColorStop(0, rgba(hue, 0.17));
      glow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // The looser network around it all.
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
      const reach = 88;
      for (let i = 0; i < ambient.length; i += 1) {
        const a = ambient[i];
        for (let j = i + 1; j < ambient.length; j += 1) {
          const b = ambient[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < reach) {
            ctx.strokeStyle = rgba(BASE, (1 - d / reach) * 0.11);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = rgba(BASE, 0.32);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbits, faint: the rings the people go round.
      ctx.strokeStyle = rgba(WHITE, 0.05);
      ctx.setLineDash([2, 7]);
      nodes.forEach((node) => {
        if (node.kind !== 'org') return;
        ctx.beginPath();
        ctx.ellipse(sx(node.x), sy(node.y), 42 * 1.15 * scale * zoom, 42 * 0.85 * scale * zoom, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.ellipse(sx(CENTER[0]), sy(CENTER[1]), HUB_RING * 1.22 * scale * zoom, HUB_RING * 0.9 * scale * zoom, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Edges: dim, and the route to the person in view lit in their colour.
      ctx.strokeStyle = rgba(BASE, 0.2);
      ctx.beginPath();
      edges.forEach(([a, b]) => {
        ctx.moveTo(sx(nodes[a].x), sy(nodes[a].y));
        ctx.lineTo(sx(nodes[b].x), sy(nodes[b].y));
      });
      ctx.stroke();
      const shownRoute = routeTo(state.index);
      ctx.lineWidth = 1.7;
      for (let i = 0; i < shownRoute.length - 1; i += 1) {
        const a = nodes[shownRoute[i]];
        const b = nodes[shownRoute[i + 1]];
        const beam = ctx.createLinearGradient(sx(a.x), sy(a.y), sx(b.x), sy(b.y));
        beam.addColorStop(0, rgba(mix(WHITE, hue, 0.4), 0.85));
        beam.addColorStop(1, rgba(hue, 0.9));
        ctx.strokeStyle = beam;
        ctx.beginPath();
        ctx.moveTo(sx(a.x), sy(a.y));
        ctx.lineTo(sx(b.x), sy(b.y));
        ctx.stroke();
      }
      // A second position lights its second tie too.
      edges.forEach(([a, b]) => {
        if (a === chosen && nodes[b].kind === 'org') {
          ctx.strokeStyle = rgba(hue, 0.5);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(sx(nodes[a].x), sy(nodes[a].y));
          ctx.lineTo(sx(nodes[b].x), sy(nodes[b].y));
          ctx.stroke();
        }
      });

      ctx.globalCompositeOperation = 'lighter';

      // Impulses along the edges. One that arrives lights its node.
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        if (!still) p.t += p.speed * dt;
        if (p.t < 0) continue;
        const a = nodes[p.from];
        const b = nodes[p.to];
        const head = Math.min(p.t, 1);
        const tail = Math.max(0, head - 0.4);
        const hx = sx(a.x + (b.x - a.x) * head);
        const hy = sy(a.y + (b.y - a.y) * head);
        const tx = sx(a.x + (b.x - a.x) * tail);
        const ty = sy(a.y + (b.y - a.y) * tail);
        const trail = ctx.createLinearGradient(tx, ty, hx, hy);
        trail.addColorStop(0, rgba(p.color, 0));
        trail.addColorStop(1, rgba(p.color, 0.95 * p.energy + 0.05));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        ctx.fillStyle = rgba(p.color, 0.9);
        ctx.beginPath();
        ctx.arc(hx, hy, 1.6 + p.energy * 1.4, 0, Math.PI * 2);
        ctx.fill();
        if (p.t >= 1) {
          packets.splice(i, 1);
          b.flash = Math.max(b.flash, p.energy);
          // A strong one carries on to a neighbour, weaker each hop, so a burst
          // spreads and fades.
          if (p.energy > 0.5 && adjacent[p.to].length > 1) {
            const options = adjacent[p.to].filter((n) => n !== p.from);
            if (options.length) send(p.to, options[Math.floor(Math.random() * options.length)], p.color, p.energy * 0.5, 0, 1.6);
          }
        }
      }

      // Rings from the person when the impulse lands.
      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i];
        const age = (now - ring.at) / 1700;
        if (age >= 1) {
          rings.splice(i, 1);
        } else if (age > 0) {
          const n = nodes[ring.node];
          if (age < 0.05) n.flash = 1;
          for (let k = 0; k < 2; k += 1) {
            const local = age - k * 0.16;
            if (local > 0 && local < 1) {
              ctx.strokeStyle = rgba(n.tone, (1 - local) * 0.55);
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.arc(sx(n.x), sy(n.y), (6 + local * 40) * scale * zoom, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }
      }

      // The nodes. The middle pulses; a hub is a hexagon named in mono; a person
      // is a light in their own colour, larger and lit when in view.
      const core = nodes[0];
      const pulse = still ? 0.5 : 0.5 + 0.5 * Math.sin(now / 900);
      [0, 1].forEach((k) => {
        const local = still ? 0.4 + k * 0.3 : ((now / 2600 + k * 0.5) % 1);
        ctx.strokeStyle = rgba(WHITE, (1 - local) * 0.25);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx(core.x), sy(core.y), (7 + local * 26) * scale * zoom, 0, Math.PI * 2);
        ctx.stroke();
      });
      const coreGlow = ctx.createRadialGradient(sx(core.x), sy(core.y), 0, sx(core.x), sy(core.y), (16 + core.flash * 14) * scale * zoom);
      coreGlow.addColorStop(0, rgba(WHITE, 0.55 + core.flash * 0.4));
      coreGlow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(sx(core.x), sy(core.y), (16 + core.flash * 14) * scale * zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(WHITE, 0.95);
      ctx.beginPath();
      ctx.arc(sx(core.x), sy(core.y), (3.2 + pulse * 0.8) * scale * zoom, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
      const hexagon = (x, y, r) => {
        ctx.beginPath();
        for (let k = 0; k < 6; k += 1) {
          const a = (Math.PI / 3) * k + Math.PI / 6;
          const px = x + Math.cos(a) * r;
          const py = y + Math.sin(a) * r;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      };
      ctx.font = '500 9.5px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      const home = target.first;
      nodes.forEach((node) => {
        if (node.kind !== 'org') return;
        const isHome = node.label === home;
        const glowAmount = Math.max(node.flash, isHome ? 0.7 : 0);
        const x = sx(node.x);
        const y = sy(node.y);
        hexagon(x, y, (8 + glowAmount * 2.5) * scale * zoom);
        ctx.fillStyle = rgba(mix(BASE, hue, glowAmount), 0.14 + glowAmount * 0.18);
        ctx.fill();
        ctx.strokeStyle = rgba(mix(BASE, hue, glowAmount), 0.55 + glowAmount * 0.4);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = rgba(mix(WHITE, hue, isHome ? 0.5 : 0), isHome ? 0.95 : 0.5);
        const outward = node.y < CENTER[1] ? -1 : 1;
        ctx.fillText(node.label.toUpperCase(), x, y + outward * 19 * scale * zoom);
      });

      if (pointer) {
        nodes.forEach((node) => {
          if (node.kind === 'person' && Math.hypot(sx(node.x) - pointer.x, sy(node.y) - pointer.y) < 24) {
            node.flash = Math.max(node.flash, 0.8);
          }
        });
      }
      nodes.forEach((node) => {
        if (node.kind !== 'person') return;
        const isChosen = node === target;
        const x = sx(node.x);
        const y = sy(node.y);
        const lightUp = Math.max(node.flash, isChosen ? 0.75 + 0.25 * pulse : 0.28);
        const reachPx = (9 + lightUp * 15) * scale * zoom;
        ctx.globalCompositeOperation = 'lighter';
        const halo = ctx.createRadialGradient(x, y, 0, x, y, reachPx);
        halo.addColorStop(0, rgba(node.tone, 0.55 * lightUp + 0.08));
        halo.addColorStop(1, rgba(node.tone, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, reachPx, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = rgba(mix(node.tone, WHITE, 0.45), 0.95);
        ctx.beginPath();
        ctx.arc(x, y, (3.2 + lightUp * 2 + (isChosen ? 1.2 : 0)) * scale * zoom, 0, Math.PI * 2);
        ctx.fill();
        if (isChosen) {
          ctx.strokeStyle = rgba(node.tone, 0.7);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 9.5 * scale * zoom, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Only the person in view, and whoever the pointer is on, wear their name
        // on the drawing: the names are on the cards, and a label on every node
        // was the clutter.
        if (isChosen || node.flash > 0.5) {
          ctx.fillStyle = rgba(isChosen ? mix(node.tone, WHITE, 0.6) : WHITE, isChosen ? 0.98 : 0.42);
          const side = node.y < node.orbit.around.y ? -1 : 1;
          ctx.fillText(node.label.toUpperCase(), x, y + side * (isChosen ? 17 : 13) * scale * zoom);
        }
      });
      ctx.textAlign = 'start';
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
      stateRef.current.burst = null;
      route = routeTo(stateRef.current.index);
      const target = nodes[personIndex[stateRef.current.index]];
      draw(performance.now());
      if (target) {
        cam.x = (target.x - CENTER[0]) * 0.1;
        cam.y = (target.y - CENTER[1]) * 0.1;
        draw(performance.now());
      }
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
    // The network is built again only when the set of people changes; the
    // person in view is read through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, signature]);

  return (
    <div className="cv-mind cv-net" style={{ '--tone': tone }} aria-hidden="true">
      <canvas ref={canvasRef} className="cv-mind-canvas" />
      <span className="cv-mind-tag cv-mind-tag--subject">
        <i />
        {subject}
      </span>
      <span className="cv-mind-tag cv-mind-tag--rate">{meta}</span>
    </div>
  );
};

export default PeopleNet;
