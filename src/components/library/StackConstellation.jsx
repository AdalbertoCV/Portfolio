import { useEffect, useRef } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { normalize } from '../about/stackSearch';

// The stack as a constellation. Every area of the wall is a cluster of points,
// one point per technology, and the clusters are tied to their nearest
// neighbours, so the whole of it reads as one map of what I work with and which
// areas touch which. It is the top of the page, and it is wired to the page
// below it the way the drawings beside the rails are wired to their cards:
// turning to an area lights its cluster and sends a wave out across every other
// one, lighting the points as it passes; typing in the search lights the areas
// that have a match and the points that are it; and a cluster can be clicked to
// open its area in the panel. A pointer over a point names it.
//
// One canvas, no library. The layout is computed for the canvas's own shape (a
// wide band on a desktop, a short block on a phone), so neither is a small map
// in a big frame, and it is computed again when the size changes. A phone draws
// fewer points per area, because a thousand of them in the width of a phone is
// not a constellation but a blur; the areas, their links and their names are the
// same. The loop only runs while the panel is on screen and the tab is visible,
// and with reduced motion it draws one still frame and stops.

const rgbOf = (h, s, l) => {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
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

// One hue per area, spread round the wheel by the golden angle so neighbours in
// the list are never neighbours in colour.
const toneOf = (index) => rgbOf((index * 137.5 + 190) % 360, 0.72, 0.64);

// The points of a group, evenly spread through its list rather than its first n,
// so a cut-down cluster is still a sample of the whole area.
const sample = (items, max) => {
  if (items.length <= max) return items;
  return Array.from({ length: max }, (_, i) => items[Math.floor((i * items.length) / max)]);
};

// Where everything goes, for a canvas of this size.
const arrange = (groups, width, height, perGroup) => {
  const random = seeded(17);
  const count = groups.length;
  const aspect = width / height;
  const cols = Math.max(3, Math.round(Math.sqrt(count * aspect)));
  const rows = Math.ceil(count / cols);
  const cellW = width / cols;
  const cellH = height / rows;
  const largest = Math.max(...groups.map((g) => Math.min(g.items.length, perGroup)));

  // The last row, when it is short, is centred instead of left-heavy.
  const order = groups.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const clusters = [];
  const nodes = [];
  order.forEach((groupIndex, slot) => {
    const row = Math.floor(slot / cols);
    const inRow = row === rows - 1 ? count - cols * (rows - 1) : cols;
    const col = slot - row * cols;
    const offset = row === rows - 1 ? ((cols - inRow) * cellW) / 2 : 0;
    const cx = offset + (col + 0.5) * cellW + (random() - 0.5) * cellW * 0.22;
    const cy = (row + 0.5) * cellH + (random() - 0.5) * cellH * 0.22;
    const group = groups[groupIndex];
    const chosen = sample(group.items, perGroup);
    const radius = Math.min(cellW, cellH) * 0.5 * (0.42 + 0.58 * Math.sqrt(chosen.length / largest));
    const start = nodes.length;
    chosen.forEach((item, k) => {
      const angle = k * 2.39996 + groupIndex;
      const reach = radius * Math.sqrt((k + 0.5) / chosen.length);
      nodes.push({
        name: item.name,
        norm: normalize(item.name),
        group: groupIndex,
        hx: cx + Math.cos(angle) * reach * 1.12 + (random() - 0.5) * 2,
        hy: cy + Math.sin(angle) * reach * 0.94 + (random() - 0.5) * 2,
        x: 0,
        y: 0,
        phase: random() * 6.28,
        flash: 0,
        near: [],
      });
    });
    const end = nodes.length;
    // Each point to its two nearest in the same cluster.
    for (let a = start; a < end; a += 1) {
      const ranked = [];
      for (let b = start; b < end; b += 1) {
        if (b !== a) ranked.push([b, (nodes[a].hx - nodes[b].hx) ** 2 + (nodes[a].hy - nodes[b].hy) ** 2]);
      }
      ranked.sort((p, q) => p[1] - q[1]);
      nodes[a].near = ranked.slice(0, 2).map(([b]) => b);
    }
    clusters[groupIndex] = { id: group.id, cx, cy, radius, start, end, tone: toneOf(groupIndex), flash: 0, links: [], total: group.items.length };
  });

  // The backbone: each area tied to its two nearest, once.
  const seen = new Set();
  clusters.forEach((a, i) => {
    clusters
      .map((b, j) => [j, (a.cx - b.cx) ** 2 + (a.cy - b.cy) ** 2])
      .filter(([j]) => j !== i)
      .sort((p, q) => p[1] - q[1])
      .slice(0, 2)
      .forEach(([j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        a.links.push(j);
        clusters[j].links.push(i);
      });
  });
  const backbone = [...seen].map((key) => key.split('-').map(Number));
  return { clusters, nodes, backbone };
};

const StackConstellation = ({ groups, active, query, live, onSelect }) => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const stateRef = useRef({ active, query, burst: null, onSelect });
  const activeIndex = Math.max(0, groups.findIndex((group) => group.id === active));
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  useEffect(() => {
    stateRef.current.onSelect = onSelect;
  }, [onSelect]);
  useEffect(() => {
    stateRef.current.active = active;
    stateRef.current.burst = performance.now();
  }, [active]);
  useEffect(() => {
    stateRef.current.query = query;
  }, [query]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !live) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let graph = null;
    let last = performance.now();
    let hue = toneOf(0);
    const waves = [];
    const packets = [];
    let nextSpark = last + 700;
    let pointer = null;
    let hover = -1;
    let raf = 0;

    const groupIndexOf = (id) => Math.max(0, groups.findIndex((group) => group.id === id));

    const fit = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const narrow = width < 560;
      dpr = Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const perGroup = narrow ? 20 : width < 900 ? 40 : 66;
      graph = arrange(groups, width, height, perGroup);
      graph.nodes.forEach((node) => {
        node.x = node.hx;
        node.y = node.hy;
      });
    };

    const send = (from, to, color, energy) => {
      if (packets.length > 60) return;
      packets.push({ from, to, t: 0, speed: 0.9 + Math.random() * 0.6, color, energy });
    };

    const nearestNode = (x, y, within) => {
      let best = -1;
      let distance = within * within;
      graph.nodes.forEach((node, i) => {
        const d = (node.x - x) ** 2 + (node.y - y) ** 2;
        if (d < distance) {
          distance = d;
          best = i;
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
      const { nodes, clusters, backbone } = graph;
      const state = stateRef.current;
      const at = groupIndexOf(state.active);
      const home = clusters[at];
      const needle = normalize(state.query || '');
      const searching = needle.length > 0;

      if (state.burst !== null) {
        waves.push({ x: home.cx, y: home.cy, at: now, tone: home.tone });
        home.flash = 1;
        home.links.forEach((j, n) => send(at, j, home.tone, 1 - n * 0.2));
        state.burst = null;
      }
      hue = mix(hue, home.tone, Math.min(1, dt * 3));

      if (!still && now > nextSpark) {
        const [a, b] = backbone[Math.floor(Math.random() * backbone.length)];
        const flip = Math.random() < 0.5;
        send(flip ? a : b, flip ? b : a, Math.random() < 0.6 ? hue : BASE, 0.4);
        nextSpark = now + 320 + Math.random() * 420;
      }

      // Match counts per cluster, when searching.
      const hits = clusters.map(() => 0);
      if (searching) {
        groups.forEach((group, i) => {
          hits[i] = group.items.reduce((sum, item) => sum + (normalize(item.name).includes(needle) ? 1 : 0), 0);
        });
      }

      // Every point drifts a little round its place, so the whole is alive and
      // no two frames are the same.
      nodes.forEach((node) => {
        if (!still) {
          node.x = node.hx + Math.sin(now / 1900 + node.phase) * 1.3;
          node.y = node.hy + Math.cos(now / 2300 + node.phase) * 1.1;
        }
        node.flash *= Math.exp(-dt * 2.6);
      });
      clusters.forEach((cluster) => {
        cluster.flash *= Math.exp(-dt * 2.2);
      });

      ctx.clearRect(0, 0, width, height);

      // Light behind the area in view, in its colour.
      const glow = ctx.createRadialGradient(home.cx, home.cy, 0, home.cx, home.cy, Math.max(width, height) * 0.45);
      glow.addColorStop(0, rgba(hue, 0.18));
      glow.addColorStop(1, rgba(hue, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // The wave from the area that was just opened: a ring out across the whole
      // of it, lighting every point it crosses.
      for (let i = waves.length - 1; i >= 0; i -= 1) {
        const wave = waves[i];
        const age = (now - wave.at) / 1000;
        const front = age * Math.max(width, 420) * 0.85;
        if (age > 1.8) {
          waves.splice(i, 1);
        } else {
          const fade = 1 - age / 1.8;
          ctx.strokeStyle = rgba(wave.tone, 0.45 * fade);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.ellipse(wave.x, wave.y, front, front * 0.62, 0, 0, Math.PI * 2);
          ctx.stroke();
          nodes.forEach((node) => {
            const dx = node.x - wave.x;
            const dy = (node.y - wave.y) / 0.62;
            const d = Math.hypot(dx, dy);
            if (Math.abs(d - front) < 14) node.flash = Math.max(node.flash, 0.85 * fade);
          });
        }
      }

      // A soft cloud of each area's own colour behind its points, so the whole is
      // a map of colours and not one grey: faint for all, strong for the area in
      // view and for any area with a match.
      clusters.forEach((cluster, i) => {
        const strong = searching ? hits[i] > 0 : i === at;
        const reach = cluster.radius * 1.9;
        const cloud = ctx.createRadialGradient(cluster.cx, cluster.cy, 0, cluster.cx, cluster.cy, reach);
        cloud.addColorStop(0, rgba(cluster.tone, (strong ? 0.22 : searching ? 0.02 : 0.075) + cluster.flash * 0.15));
        cloud.addColorStop(1, rgba(cluster.tone, 0));
        ctx.fillStyle = cloud;
        ctx.beginPath();
        ctx.arc(cluster.cx, cluster.cy, reach, 0, Math.PI * 2);
        ctx.fill();
      });

      // The backbone between areas, dim, and lit where it touches the area in
      // view.
      ctx.lineWidth = 1;
      backbone.forEach(([a, b]) => {
        const touching = a === at || b === at;
        ctx.strokeStyle = touching ? rgba(mix(clusters[a].tone, clusters[b].tone, 0.5), 0.42) : rgba(BASE, 0.1);
        ctx.setLineDash(touching ? [] : [2, 6]);
        ctx.beginPath();
        ctx.moveTo(clusters[a].cx, clusters[a].cy);
        ctx.lineTo(clusters[b].cx, clusters[b].cy);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Links inside every cluster, in one pass; then the area in view, and any
      // area with a match, again over them in their own colours.
      ctx.strokeStyle = rgba(BASE, searching ? 0.04 : 0.07);
      ctx.beginPath();
      nodes.forEach((node) => {
        node.near.forEach((b) => {
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
        });
      });
      ctx.stroke();
      clusters.forEach((cluster, i) => {
        const lit = searching ? (hits[i] ? 0.4 : 0) : i === at ? 0.45 : 0;
        if (!lit) return;
        ctx.strokeStyle = rgba(cluster.tone, lit);
        ctx.beginPath();
        for (let a = cluster.start; a < cluster.end; a += 1) {
          nodes[a].near.forEach((b) => {
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
          });
        }
        ctx.stroke();
      });

      ctx.globalCompositeOperation = 'lighter';

      // Impulses along the backbone.
      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        if (!still) p.t += p.speed * dt;
        const a = clusters[p.from];
        const b = clusters[p.to];
        const head = Math.min(p.t, 1);
        const tail = Math.max(0, head - 0.3);
        const hx = a.cx + (b.cx - a.cx) * head;
        const hy = a.cy + (b.cy - a.cy) * head;
        const trail = ctx.createLinearGradient(a.cx + (b.cx - a.cx) * tail, a.cy + (b.cy - a.cy) * tail, hx, hy);
        trail.addColorStop(0, rgba(p.color, 0));
        trail.addColorStop(1, rgba(p.color, 0.9 * p.energy + 0.05));
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(a.cx + (b.cx - a.cx) * tail, a.cy + (b.cy - a.cy) * tail);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        if (p.t >= 1) {
          packets.splice(i, 1);
          b.flash = Math.max(b.flash, p.energy);
          if (p.energy > 0.6) {
            const options = b.links.filter((j) => j !== p.from);
            if (options.length) send(p.to, options[Math.floor(Math.random() * options.length)], p.color, p.energy * 0.55);
          }
        }
      }

      // The points. The area in view, and the areas with a match, are in their
      // colour; the rest are the quiet grey of the field, dimmer still while a
      // search is running and they have nothing to show for it.
      if (pointer) {
        hover = nearestNode(pointer.x, pointer.y, 22);
        if (hover >= 0) nodes[hover].flash = Math.max(nodes[hover].flash, 0.9);
      } else {
        hover = -1;
      }
      nodes.forEach((node) => {
        const cluster = clusters[node.group];
        const isHome = node.group === at;
        const matched = searching && node.norm.includes(needle);
        const areaLit = searching ? hits[node.group] > 0 : isHome;
        const pulse = still ? 0.5 : 0.5 + 0.5 * Math.sin(now / 900 + node.phase);
        let alpha = areaLit ? 0.85 : searching ? 0.14 : 0.5 + pulse * 0.14;
        if (node.flash > 0.05) alpha = Math.min(1, alpha + node.flash * 0.7);
        const color = areaLit || node.flash > 0.2 ? mix(BASE, cluster.tone, Math.min(1, 0.55 + node.flash)) : mix(BASE, cluster.tone, 0.3);
        const r = 1.25 + (areaLit ? 0.55 : 0) + node.flash * 1.6 + (matched ? 1.6 : 0);
        if (node.flash > 0.25 || matched) {
          const reach = 6 + node.flash * 12 + (matched ? 8 : 0);
          const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, reach);
          halo.addColorStop(0, rgba(matched ? WHITE : cluster.tone, 0.5 * Math.max(node.flash, matched ? 0.8 : 0)));
          halo.addColorStop(1, rgba(cluster.tone, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(node.x, node.y, reach, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(matched ? WHITE : color, alpha);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      // Names. Each area's, when there is room for all of them and always for the
      // one in view; a point's when the pointer is on it.
      ctx.font = '500 9.5px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      // Sixty characters of area name over a cluster forty pixels across is a
      // smear; so only the area in view, the one under the pointer and the ones
      // with a match are named.
      const pointed = hover >= 0 ? nodes[hover].group : -1;
      clusters.forEach((cluster, i) => {
        const isHome = i === at;
        const matchedArea = searching && hits[i] > 0;
        if (!(isHome || matchedArea || i === pointed)) return;
        const label = t(`skills.groups.${cluster.id}`).toUpperCase() + (matchedArea ? `  ${hits[i]}` : '');
        ctx.fillStyle = rgba(mix(cluster.tone, WHITE, 0.55), 0.96);
        ctx.fillText(label, cluster.cx, Math.min(height - 8, cluster.cy + cluster.radius + 11));
      });
      if (hover >= 0) {
        const node = nodes[hover];
        const cluster = clusters[node.group];
        const text = node.name;
        const w = ctx.measureText(text).width + 14;
        const x = Math.min(Math.max(node.x, w / 2 + 4), width - w / 2 - 4);
        const y = node.y < 30 ? node.y + 18 : node.y - 16;
        ctx.fillStyle = 'rgba(7,9,13,0.88)';
        ctx.strokeStyle = rgba(cluster.tone, 0.6);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect?.(x - w / 2, y - 9, w, 18, 5);
        if (!ctx.roundRect) ctx.rect(x - w / 2, y - 9, w, 18);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = rgba(mix(cluster.tone, WHITE, 0.6), 1);
        ctx.fillText(text, x, y);
      }
      ctx.textAlign = 'start';
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    fit();
    if (still) {
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

    const place = (event) => {
      const box = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const onDown = (event) => {
      place(event);
      const hit = nearestNode(pointer.x, pointer.y, 26);
      if (hit >= 0) {
        stateRef.current.onSelect?.(groups[graph.nodes[hit].group].id);
        return;
      }
      // Not on a point: the nearest cluster centre within reach.
      let best = -1;
      let distance = 60 * 60;
      graph.clusters.forEach((cluster, i) => {
        const d = (cluster.cx - pointer.x) ** 2 + (cluster.cy - pointer.y) ** 2;
        if (d < distance) {
          distance = d;
          best = i;
        }
      });
      if (best >= 0) stateRef.current.onSelect?.(groups[best].id);
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
    // Laid out again only when the groups themselves change; the area in view and
    // the search are read through the ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, groups]);

  const toneHex = (() => {
    const [r, g, b] = toneOf(activeIndex);
    return `rgb(${r}, ${g}, ${b})`;
  })();

  return (
    <div className="cv-mind stack-sky" style={{ '--tone': toneHex }} aria-hidden="true">
      <canvas ref={canvasRef} className="cv-mind-canvas" />
      <span className="cv-mind-tag cv-mind-tag--subject">
        <i />
        {t(`skills.groups.${groups[activeIndex]?.id}`)}
      </span>
      <span className="cv-mind-tag cv-mind-tag--rate">
        <b>{total}</b> {t('cv.constellationTech')} · <b>{groups.length}</b> {t('cv.constellationAreas')}
      </span>
    </div>
  );
};

export default StackConstellation;
