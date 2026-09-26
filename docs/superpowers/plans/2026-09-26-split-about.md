# Split About into Stack and Library — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the technology wall to `/stack` and interests + reading to `/library`, add both to the navbar, and chain every page to the next with a themed animated card.

**Architecture:** Two new page components reuse the existing section markup and `about.css` classes unchanged. Three new SVG teaser strips follow the shape of `VenturesRoadmap` / `ProjectsMosaic` (420×140, draw on `is-visible`, loop, reduced-motion lands finished). The navbar gets two links and its own collapse breakpoint; `RouteMeta`, the terminal and both dictionaries learn the new routes.

**Tech Stack:** React 18, react-router-dom 6, CRA (react-scripts 5, Jest + Testing Library), plain CSS.

**Spec:** `docs/superpowers/specs/2026-09-26-split-about-design.md`

## Global Constraints

- Navbar order: Sobre mí · Experiencia · Ventures · Proyectos · Stack · Biblioteca · Contacto (EN: About Me · Experience · Ventures · Projects · Stack · Library · Contact).
- Routes: `/stack` and `/library`.
- Card chain: About→Experience (TimelineStrip), Experience→Ventures (unchanged), Ventures→Projects (unchanged), Projects→Stack (StackTiles), Stack→Library (ShelfStrip), Library→Contact (TalkBand, moved from Projects).
- Every new string exists in both `src/i18n/en.js` and `src/i18n/es.js` with the same key shape (`src/i18n` has a test that fails on any mismatch).
- New teaser strips: 420×140 viewBox, `aria-hidden="true"`, `currentColor`, start on `.hub-teaser.is-visible`, and under `prefers-reduced-motion: reduce` render finished with no animation. CSS lives in `src/styles/hub.css`.
- Moved sections keep their class names; no visual change to them.
- Book titles and tech names stay in English in both languages.
- Several source files use CRLF line endings (`about.jsx`, `cv.*.js`, `en.js`, `es.js`, `App.css`). Keep each file's existing line endings when editing.
- Run the suite with `CI=true npx react-scripts test --watchAll=false`.
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Push to `main` once a task is verified.

## Review Focus

1. A direct visit or reload of `/stack` or `/library` has to render the page with its own `<title>`, not the home one → RouteMeta test in Task 4 and Task 5.
2. From 769px up to the width the seven links need, the inline row must not wrap or overflow the bar → measured breakpoint in Task 7, checked in the browser in Task 8.
3. With reduced motion on, the three new strips must still show their finished picture (no hidden tiles, no parked pulse) → CSS in Tasks 1–3, checked in Task 8.
4. Anything that still sends a visitor to "About, halfway down" for the stack: the terminal `stack` command, and `open stack` / `open library` → tests in Task 7.
5. Switching language on `/stack` or `/library` has to translate the header, the notes and the card, with no raw keys showing → the dictionary test plus a Spanish render in Task 5.

---

## File Structure

- Create `src/components/about/TimelineStrip.jsx`: About→Experience teaser art.
- Create `src/components/stack/StackTiles.jsx`: Projects→Stack teaser art.
- Create `src/components/library/ShelfStrip.jsx`: Stack→Library teaser art.
- Create `src/components/stack/StackPage.jsx`: the `/stack` page.
- Create `src/components/library/LibraryPage.jsx`: the `/library` page.
- Create tests: `src/components/about/TimelineStrip.test.jsx`, `src/components/stack/StackTiles.test.jsx`, `src/components/library/ShelfStrip.test.jsx`, `src/components/stack/StackPage.test.jsx`, `src/components/library/LibraryPage.test.jsx`, `src/components/about/about.test.jsx`, `src/components/navigation/navbar.test.jsx`, `src/components/terminal/commands.test.js`.
- Modify `src/styles/hub.css` (strip CSS), `src/components/about/about.jsx` (remove three sections, animate card), `src/components/projects/projects.jsx` (card to Stack instead of TalkBand), `src/App.js` (two routes), `src/components/navigation/navbar.jsx` (links), `src/App.css` (collapse breakpoint), `src/components/navigation/RouteMeta.jsx` (pages), `src/components/terminal/commands.js` (stack, library, destinations), `src/i18n/en.js`, `src/i18n/es.js`, `src/i18n/repos.en.js`, `src/i18n/repos.es.js`.

---

### Task 1: TimelineStrip, on About's card to Experience

**Files:**
- Create: `src/components/about/TimelineStrip.jsx`
- Create: `src/components/about/TimelineStrip.test.jsx`
- Modify: `src/styles/hub.css` (append section)
- Modify: `src/components/about/about.jsx` (the final `hub-teaser`)

**Interfaces:**
- Produces: `export default TimelineStrip` — a component with no props, rendering `<div className="timeline-strip" aria-hidden="true">`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/about/TimelineStrip.test.jsx
import { render } from '@testing-library/react';
import TimelineStrip from './TimelineStrip';

test('draws a line of five milestones, hidden from assistive tech', () => {
  const { container } = render(<TimelineStrip />);
  const strip = container.querySelector('.timeline-strip');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.ts-milestone')).toHaveLength(5);
  expect(strip.querySelector('.ts-pulse')).not.toBeNull();
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/about/TimelineStrip.test.jsx`
Expected: FAIL, "Cannot find module './TimelineStrip'".

- [ ] **Step 3: Write the component**

```jsx
// src/components/about/TimelineStrip.jsx

// The teaser art that sends a reader from About to Experience. The sibling of
// VenturesRoadmap and ProjectsMosaic: same 420x140 strip, same "draw in on
// reveal, then loop" shape. Experience is a timeline, so the strip is one: the
// line draws itself, the roles stand up off it, and a pulse runs the line on a
// loop lighting each milestone as it passes. The delays come from where each
// milestone sits along the run, so the lighting is caused by the pulse.

const START = 24;
const END = 396;
const RUN = END - START;
const Y = 70;

// Seconds. The pulse only starts once the line has finished drawing.
const DRAW_DELAY = 1.1;
const PULSE_DURATION = 3.2;

// tsLit peaks 6% into its cycle; pull the delay back by that much so the
// milestone is brightest as the pulse reaches it, not after.
const LIT_PEAK = 0.06;

// Alternating up and down, like roles on the page they point at.
const MILESTONES = [
  { x: 64, up: true },
  { x: 138, up: false },
  { x: 212, up: true },
  { x: 286, up: false },
  { x: 360, up: true },
];

const TimelineStrip = () => (
  <div className="timeline-strip" aria-hidden="true">
    <svg className="ts-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path className="ts-line" d={`M${START} ${Y} H${END}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {MILESTONES.map(({ x, up }, index) => {
        const stemEnd = up ? Y - 26 : Y + 26;
        const cardY = up ? stemEnd - 16 : stemEnd;
        const reach = (x - START) / RUN;
        return (
          <g key={x}>
            <g className="ts-role" style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
              <path d={`M${x} ${Y} V${stemEnd}`} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
              <rect x={x - 22} y={cardY} width="44" height="16" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
            </g>
            <circle
              className="ts-milestone"
              cx={x}
              cy={Y}
              r="6"
              fill="currentColor"
              style={{ animationDelay: `${0.6 + index * 0.1}s, ${DRAW_DELAY + (reach - LIT_PEAK) * PULSE_DURATION}s` }}
            />
          </g>
        );
      })}

      <circle className="ts-pulse" cx={START} cy={Y} r="4" fill="currentColor" />
    </svg>
  </div>
);

export default TimelineStrip;
```

- [ ] **Step 4: Append its CSS to `src/styles/hub.css`**

```css
/* ============================================================================
   ABOUT TEASER — the timeline strip
   ----------------------------------------------------------------------------
   The line draws itself once on reveal, the roles stand up off it, then a
   pulse runs the line on a loop and each milestone lights as it passes. The
   per-milestone delays come from the component.
   ========================================================================= */

.timeline-strip {
    position: relative;
    flex: 1 1 260px;
    max-width: 340px;
    min-width: 210px;
    aspect-ratio: 3 / 1;
    color: var(--color-text-tertiary);
}

.ts-track {
    width: 100%;
    height: 100%;
    overflow: visible;
}

.ts-line {
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
}

.hub-teaser.is-visible .ts-line {
    animation: tsDraw 1s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards;
}

.ts-role,
.ts-milestone {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
}

.hub-teaser.is-visible .ts-role {
    animation: tsRise 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hub-teaser.is-visible .ts-milestone {
    animation:
        tsPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
        tsLit 3.2s linear infinite;
}

.ts-pulse {
    opacity: 0;
}

.hub-teaser.is-visible .ts-pulse {
    animation: tsPulse 3.2s linear 1.1s infinite;
}

@keyframes tsDraw {
    to { stroke-dashoffset: 0; }
}

@keyframes tsRise {
    from { opacity: 0; transform: scaleY(0.2); }
    to { opacity: 1; transform: scaleY(1); }
}

@keyframes tsPop {
    from { opacity: 0; transform: scale(0.3); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes tsLit {
    0% { fill-opacity: 0.6; transform: scale(1); filter: none; }
    6% { fill-opacity: 1; transform: scale(1.5); filter: drop-shadow(0 0 5px currentColor); }
    20% { fill-opacity: 0.6; transform: scale(1); filter: none; }
    100% { fill-opacity: 0.6; transform: scale(1); filter: none; }
}

/* translate in user units: 372 is END - START in the component. */
@keyframes tsPulse {
    0% { opacity: 0; transform: translateX(0); }
    6% { opacity: 1; }
    94% { opacity: 1; }
    100% { opacity: 0; transform: translateX(372px); }
}

@media (prefers-reduced-motion: reduce) {
    /* Land finished: the line, the roles and the milestones, still. */
    .ts-line {
        stroke-dashoffset: 0 !important;
        animation: none !important;
    }

    .ts-role,
    .ts-milestone {
        opacity: 1 !important;
        fill-opacity: 0.6;
        transform: none !important;
        animation: none !important;
    }

    .ts-pulse {
        display: none;
    }
}
```

- [ ] **Step 5: Put it on About's card**

In `src/components/about/about.jsx`, add `import TimelineStrip from './TimelineStrip';` beside the other local imports, and change the final teaser so the strip sits between the copy and the link, the way `experience.jsx` places `VenturesRoadmap`. It also switches the arrow to `ArrowRight`, the one the other hand-offs use:

```jsx
      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('timeline.title')}</h2>
          <p className="brand-p">{t('timeline.lede')}</p>
        </div>
        <TimelineStrip />
        <Link className="brand-link-out hub-teaser-cta" to="/experience">
          {t('nav.experience')}
          <ArrowRight />
        </Link>
      </Reveal>
```

- [ ] **Step 6: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all suites pass, including the new one.

- [ ] **Step 7: Commit**

```bash
git add src/components/about/TimelineStrip.jsx src/components/about/TimelineStrip.test.jsx src/styles/hub.css src/components/about/about.jsx
git commit -m "A timeline on the card from About to Experience" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: StackTiles

**Files:**
- Create: `src/components/stack/StackTiles.jsx`
- Create: `src/components/stack/StackTiles.test.jsx`
- Modify: `src/styles/hub.css` (append section)

**Interfaces:**
- Produces: `export default StackTiles`, a component with no props, rendering `<div className="stack-tiles" aria-hidden="true">`. Used by Task 6.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/stack/StackTiles.test.jsx
import { render } from '@testing-library/react';
import StackTiles from './StackTiles';

test('lays out a wall of thirty tiles with four stars, hidden from assistive tech', () => {
  const { container } = render(<StackTiles />);
  const strip = container.querySelector('.stack-tiles');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.st-tile')).toHaveLength(30);
  expect(strip.querySelectorAll('.st-star')).toHaveLength(4);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/stack/StackTiles.test.jsx`
Expected: FAIL, "Cannot find module './StackTiles'".

- [ ] **Step 3: Write the component**

```jsx
// src/components/stack/StackTiles.jsx

// The teaser art that sends a reader from Projects to the Stack. Same 420x140
// strip as its siblings. The stack is a wall of tiles, so the strip is one:
// the tiles drop into the grid a column at a time, then, on a loop, the four
// that carry projects light up in turn with their count — the way The Stars
// sit at the top of the real wall.

const COLS = 10;
const ROWS = 3;
const SIZE = 30;
const GAP = 8;
const STEP = SIZE + GAP;
const LEFT = (420 - (COLS * STEP - GAP)) / 2;
const TOP = (140 - (ROWS * STEP - GAP)) / 2;

// Seconds. Each star holds the light for a quarter of the loop.
const LOOP = 4.8;

const STARS = [
  { col: 1, row: 1, count: 3 },
  { col: 4, row: 0, count: 5 },
  { col: 6, row: 2, count: 2 },
  { col: 8, row: 1, count: 4 },
];

const TILES = [];
for (let row = 0; row < ROWS; row += 1) {
  for (let col = 0; col < COLS; col += 1) {
    TILES.push({
      key: `${row}-${col}`,
      x: LEFT + col * STEP,
      y: TOP + row * STEP,
      // Bottom row lands first, so the wall is built up rather than hung down.
      delay: col * 0.05 + (ROWS - 1 - row) * 0.12,
    });
  }
}

const StackTiles = () => (
  <div className="stack-tiles" aria-hidden="true">
    <svg className="st-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      {TILES.map(({ key, x, y, delay }) => (
        <rect
          key={key}
          className="st-tile"
          x={x}
          y={y}
          width={SIZE}
          height={SIZE}
          rx="7"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {STARS.map(({ col, row, count }, index) => {
        const x = LEFT + col * STEP;
        const y = TOP + row * STEP;
        return (
          <g
            key={`${col}-${row}`}
            className="st-star"
            style={{ animationDelay: `${1.2 + index * (LOOP / STARS.length)}s` }}
          >
            <rect x={x} y={y} width={SIZE} height={SIZE} rx="7" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="2" />
            <circle cx={x + SIZE} cy={y} r="7.5" fill="currentColor" />
            <text className="st-count" x={x + SIZE} y={y + 3.4} textAnchor="middle" fontSize="9.5" fontWeight="700">
              {count}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
);

export default StackTiles;
```

- [ ] **Step 4: Append its CSS to `src/styles/hub.css`**

```css
/* ============================================================================
   PROJECTS TEASER — the stack tiles
   ----------------------------------------------------------------------------
   Tiles drop into the grid once on reveal; then the four with projects behind
   them light in turn, each with its count.
   ========================================================================= */

.stack-tiles {
    position: relative;
    flex: 1 1 260px;
    max-width: 340px;
    min-width: 210px;
    aspect-ratio: 3 / 1;
    color: var(--color-text-tertiary);
}

.st-track {
    width: 100%;
    height: 100%;
    overflow: visible;
}

.st-tile {
    opacity: 0;
}

.hub-teaser.is-visible .st-tile {
    animation: stDrop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.st-star {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
}

.hub-teaser.is-visible .st-star {
    animation: stLit 4.8s ease-in-out infinite;
}

/* The count sits on a filled disc of the strip's own colour, so it takes the
   page background to stay legible in both themes. */
.st-count {
    fill: var(--color-bg-primary, #fff);
}

@keyframes stDrop {
    from { opacity: 0; transform: translateY(-18px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes stLit {
    0% { opacity: 0; transform: scale(0.9); }
    6% { opacity: 1; transform: scale(1.08); filter: drop-shadow(0 0 6px currentColor); }
    18% { opacity: 1; transform: scale(1); filter: none; }
    25% { opacity: 0; transform: scale(1); }
    100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .st-tile {
        opacity: 1 !important;
        animation: none !important;
    }

    /* One star stays lit, so the still picture still says "some of these
       have projects behind them". */
    .st-star {
        animation: none !important;
        opacity: 0 !important;
    }

    .st-star:first-of-type {
        opacity: 1 !important;
    }
}
```

`.st-star:first-of-type` would match the first `<g>` in the SVG, and the tiles are `rect`s, so it lands on the first star. If `--color-bg-primary` is not the page-background token in this project, use the token `body` uses: check with `grep -n "background" src/App.css | head`.

- [ ] **Step 5: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/stack/StackTiles.jsx src/components/stack/StackTiles.test.jsx src/styles/hub.css
git commit -m "Stack tiles: the teaser art for the stack" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: ShelfStrip

**Files:**
- Create: `src/components/library/ShelfStrip.jsx`
- Create: `src/components/library/ShelfStrip.test.jsx`
- Modify: `src/styles/hub.css` (append section)

**Interfaces:**
- Produces: `export default ShelfStrip`, a component with no props, rendering `<div className="shelf-strip" aria-hidden="true">`. Used by Task 4.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/library/ShelfStrip.test.jsx
import { render } from '@testing-library/react';
import ShelfStrip from './ShelfStrip';

test('stands a row of books on a shelf, one of them pulled, hidden from assistive tech', () => {
  const { container } = render(<ShelfStrip />);
  const strip = container.querySelector('.shelf-strip');
  expect(strip).toHaveAttribute('aria-hidden', 'true');
  expect(strip.querySelectorAll('.ss-book').length).toBeGreaterThanOrEqual(12);
  expect(strip.querySelectorAll('.ss-book.ss-pulled')).toHaveLength(1);
  expect(strip.querySelector('.ss-shelf')).not.toBeNull();
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/library/ShelfStrip.test.jsx`
Expected: FAIL, "Cannot find module './ShelfStrip'".

- [ ] **Step 3: Write the component**

```jsx
// src/components/library/ShelfStrip.jsx

// The teaser art that sends a reader from the Stack to the Library. Same
// 420x140 strip as its siblings. The shelf draws itself, the spines slide in
// and stand on it, then, on a loop, one leans out the way a book does when
// somebody reaches for it.

const SHELF_Y = 122;

// Widths and heights by hand, not by a seed: a shelf reads as real when the
// rhythm is uneven in the way books are, and a hash does that badly.
const SPINES = [
  [18, 78], [14, 64], [22, 88], [16, 70], [20, 92], [13, 58], [19, 80],
  [24, 72], [15, 86], [17, 66], [21, 90], [14, 74], [18, 62], [23, 84],
];
const GAP = 3;
const PULLED = 8;

const TOTAL = SPINES.reduce((sum, [w]) => sum + w + GAP, -GAP);
const LEFT = (420 - TOTAL) / 2;

const BOOKS = SPINES.reduce((books, [width, height], index) => {
  const x = index === 0 ? LEFT : books[index - 1].x + books[index - 1].width + GAP;
  books.push({ x, width, height, index, shade: 0.06 + ((index * 5) % 7) * 0.025 });
  return books;
}, []);

const ShelfStrip = () => (
  <div className="shelf-strip" aria-hidden="true">
    <svg className="ss-track" viewBox="0 0 420 140" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path className="ss-shelf" d={`M${LEFT - 14} ${SHELF_Y} H${LEFT + TOTAL + 14}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {BOOKS.map(({ x, width, height, index, shade }) => (
        <g
          key={index}
          className={`ss-book${index === PULLED ? ' ss-pulled' : ''}`}
          style={{ animationDelay: index === PULLED ? `${0.5 + index * 0.06}s, 2s` : `${0.5 + index * 0.06}s` }}
        >
          <rect x={x} y={SHELF_Y - height - 1.5} width={width} height={height} rx="2.5" fill="currentColor" fillOpacity={shade} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <path d={`M${x + 3} ${SHELF_Y - height + 10} H${x + width - 3} M${x + 3} ${SHELF_Y - 14} H${x + width - 3}`} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  </div>
);

export default ShelfStrip;
```

- [ ] **Step 4: Append its CSS to `src/styles/hub.css`**

```css
/* ============================================================================
   STACK TEASER — the shelf
   ----------------------------------------------------------------------------
   The shelf draws once on reveal, the spines slide in and stand on it, then
   one leans out on a loop, pivoting on its bottom corner.
   ========================================================================= */

.shelf-strip {
    position: relative;
    flex: 1 1 260px;
    max-width: 340px;
    min-width: 210px;
    aspect-ratio: 3 / 1;
    color: var(--color-text-tertiary);
}

.ss-track {
    width: 100%;
    height: 100%;
    overflow: visible;
}

.ss-shelf {
    stroke-dasharray: 440;
    stroke-dashoffset: 440;
}

.hub-teaser.is-visible .ss-shelf {
    animation: ssDraw 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards;
}

.ss-book {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: left bottom;
}

.hub-teaser.is-visible .ss-book {
    animation: ssSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hub-teaser.is-visible .ss-book.ss-pulled {
    animation:
        ssSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards,
        ssLean 4s ease-in-out infinite;
}

@keyframes ssDraw {
    to { stroke-dashoffset: 0; }
}

@keyframes ssSlide {
    from { opacity: 0; transform: translateX(-16px); }
    to { opacity: 1; transform: translateX(0); }
}

/* Out, a pause in your hand, and back. opacity is held at 1 so the second
   animation never undoes the first. */
@keyframes ssLean {
    0%, 50% { opacity: 1; transform: rotate(0deg); }
    62%, 82% { opacity: 1; transform: rotate(-13deg) translateY(-4px); }
    94%, 100% { opacity: 1; transform: rotate(0deg); }
}

@media (prefers-reduced-motion: reduce) {
    .ss-shelf {
        stroke-dashoffset: 0 !important;
        animation: none !important;
    }

    .ss-book {
        opacity: 1 !important;
        transform: none !important;
        animation: none !important;
    }
}
```

- [ ] **Step 5: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/library/ShelfStrip.jsx src/components/library/ShelfStrip.test.jsx src/styles/hub.css
git commit -m "Shelf strip: the teaser art for the library" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: The `/stack` page

**Files:**
- Create: `src/components/stack/StackPage.jsx`
- Create: `src/components/stack/StackPage.test.jsx`
- Modify: `src/App.js` (import and route)
- Modify: `src/components/navigation/RouteMeta.jsx` (`PAGES`)
- Modify: `src/i18n/en.js`, `src/i18n/es.js` (`stackPage.*`, `meta.stack`)

**Interfaces:**
- Consumes: `ShelfStrip` (Task 3), `StackExplorer` from `../about/StackExplorer`, `Reveal` and `ArrowRight` from `../brand/parts`.
- Produces: `export default StackPage`, routed at `/stack`. The i18n keys `stackPage.libraryTitle`, `stackPage.libraryLede`, `stackPage.libraryCta`, `meta.stack.title`, `meta.stack.description`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/stack/StackPage.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import StackPage from './StackPage';
import en from '../../i18n/en';

const renderPage = () =>
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/stack']}>
        <StackPage />
      </MemoryRouter>
    </I18nProvider>
  );

test('carries the whole wall under its own heading', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: en.cv.skillsTitle })).toBeInTheDocument();
  expect(screen.getByRole('searchbox', { name: 'Search technologies' })).toBeInTheDocument();
});

test('ends on the card to the library', () => {
  renderPage();
  expect(screen.getByRole('link', { name: en.stackPage.libraryCta })).toHaveAttribute('href', '/library');
});

test('has its own page title', () => {
  expect(en.meta.stack.title).toMatch(/Stack/);
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/stack/StackPage.test.jsx`
Expected: FAIL, "Cannot find module './StackPage'".

- [ ] **Step 3: Add the strings**

In `src/i18n/en.js`, add a top-level block directly above `  meta: {`:

```js
  stackPage: {
    libraryTitle: 'The library',
    libraryLede: 'Ten shelves of twenty books, from AI to the history of the chip, and the interests they grew out of.',
    libraryCta: 'Open the library',
  },
```

and inside `meta`, directly after the `study` entry:

```js
    stack: {
      title: 'Stack · Adal Cerrillo',
      description:
        'The technologies I build with, grouped and searchable, and the frontiers I am exploring next.',
    },
```

In `src/i18n/es.js`, the same two places:

```js
  stackPage: {
    libraryTitle: 'La biblioteca',
    libraryLede: 'Diez estantes de veinte libros, de la IA a la historia del chip, y los intereses de los que salieron.',
    libraryCta: 'Abrir la biblioteca',
  },
```

```js
    stack: {
      title: 'Stack · Adal Cerrillo',
      description:
        'Las tecnologías con las que construyo, agrupadas y con búsqueda, y las fronteras que estoy explorando.',
    },
```

- [ ] **Step 4: Write the page**

```jsx
// src/components/stack/StackPage.jsx
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, Reveal } from '../brand/parts';
import StackExplorer from '../about/StackExplorer';
import ShelfStrip from '../library/ShelfStrip';
import '../about/about.css';

// The technology wall, on a page of its own. It used to sit halfway down
// About, where it was the longest thing on a page that was supposed to be
// about a person. The explorer is unchanged; only its address moved.
const StackPage = () => {
  const { t } = useTranslation();

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('cv.skillsKicker')}</span>
        <h1 className="hub-title">{t('cv.skillsTitle')}</h1>
        <p className="hub-lede">{t('cv.skillsLede')}</p>
      </Reveal>

      <Reveal>
        <StackExplorer />
      </Reveal>

      {/* The hand-off every page makes: to the next one in the bar. */}
      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('stackPage.libraryTitle')}</h2>
          <p className="brand-p">{t('stackPage.libraryLede')}</p>
        </div>
        <ShelfStrip />
        <Link className="brand-link-out hub-teaser-cta" to="/library">
          {t('stackPage.libraryCta')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default StackPage;
```

- [ ] **Step 5: Route it and register its meta**

In `src/App.js`, add `import StackPage from './components/stack/StackPage';` next to the other page imports, and `<Route path="/stack" element={<StackPage />} />` directly after the `/projects` route.

In `src/components/navigation/RouteMeta.jsx`, add `'/stack': 'stack',` to `PAGES` after `'/projects': 'projects',`.

- [ ] **Step 6: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all pass, including the i18n dictionary test.

- [ ] **Step 7: Commit**

```bash
git add src/components/stack/StackPage.jsx src/components/stack/StackPage.test.jsx src/App.js src/components/navigation/RouteMeta.jsx src/i18n/en.js src/i18n/es.js
git commit -m "The stack gets its own page" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: The `/library` page

**Files:**
- Create: `src/components/library/LibraryPage.jsx`
- Create: `src/components/library/LibraryPage.test.jsx`
- Modify: `src/App.js`, `src/components/navigation/RouteMeta.jsx`, `src/i18n/en.js`, `src/i18n/es.js`

**Interfaces:**
- Consumes: `READING` (`../about/reading`), `BOOK_COVERS` (`../about/bookCovers`), `ConceptIcon` (`../about/ConceptIcons`), `INTEREST_ICONS`, `INTEREST_KEYS`, `INTEREST_LINKS` (`../about/interestsData`), `ArrowUpRight`, `Reveal`, `Section`, `TalkBand` (`../brand/parts`).
- Produces: `export default LibraryPage`, routed at `/library`. The keys `library.badge`, `library.title`, `library.lede`, `meta.library.title`, `meta.library.description`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/library/LibraryPage.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import LibraryPage from './LibraryPage';
import READING from '../about/reading';
import en from '../../i18n/en';
import es from '../../i18n/es';

const renderPage = () =>
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/library']}>
        <LibraryPage />
      </MemoryRouter>
    </I18nProvider>
  );

test('opens on its own heading, then the interests, then every shelf', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: en.library.title })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: en.cv.interestsTitle })).toBeInTheDocument();
  READING.forEach(({ id }) => {
    expect(screen.getByRole('heading', { name: en.cv.readingGroups[id] })).toBeInTheDocument();
  });
  expect(screen.getByText('Cosmos')).toBeInTheDocument();
  expect(screen.getByText(en.cv.readingAside)).toBeInTheDocument();
});

test('ends on the card to contact', () => {
  renderPage();
  expect(screen.getByRole('link', { name: new RegExp(en.talk.cta) })).toHaveAttribute('href', '/contact');
});

test('reads in Spanish too, with no raw keys', () => {
  window.localStorage.setItem('lang', 'es');
  renderPage();
  window.localStorage.removeItem('lang');
  expect(screen.queryByText(/^library\./)).toBeNull();
  expect(es.library.title).toBeTruthy();
});
```

Before writing Step 1 for real, check how `I18nProvider` picks its starting language (`grep -n "localStorage\|navigator" src/i18n/I18nProvider.jsx`). If it does not read `localStorage.lang`, switch the third test to whatever it does read, or to a `LanguageToggle` click. The point of the test is one Spanish render with no key text showing.

- [ ] **Step 2: Run it and watch it fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/library/LibraryPage.test.jsx`
Expected: FAIL, "Cannot find module './LibraryPage'".

- [ ] **Step 3: Add the strings**

`src/i18n/en.js`, above `  meta: {`:

```js
  library: {
    badge: 'Library',
    title: 'Interests and reading',
    lede: 'What I follow outside the job description, and the books I hand to whoever asks where to start.',
  },
```

and in `meta`, after the `stack` entry from Task 4:

```js
    library: {
      title: 'Library · Adal Cerrillo',
      description:
        'Where the way I think comes from: the interests behind the work and two hundred books on ten shelves, each with a note on why it is worth reading.',
    },
```

`src/i18n/es.js`:

```js
  library: {
    badge: 'Biblioteca',
    title: 'Intereses y lectura',
    lede: 'Lo que sigo fuera de la descripción del puesto, y los libros que le paso a quien pregunta por dónde empezar.',
  },
```

```js
    library: {
      title: 'Biblioteca · Adal Cerrillo',
      description:
        'De dónde sale la forma en que pienso: los intereses detrás del trabajo y doscientos libros en diez estantes, cada uno con por qué vale la pena leerlo.',
    },
```

- [ ] **Step 4: Write the page**

The interests and reading markup is moved as-is from `about.jsx` (the `interests` and `reading` sections). Copy them from there so nothing drifts. This is what they are at the time of writing:

```jsx
// src/components/library/LibraryPage.jsx
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight, Reveal, Section, TalkBand } from '../brand/parts';
import READING from '../about/reading';
import BOOK_COVERS from '../about/bookCovers';
import ConceptIcon from '../about/ConceptIcons';
import { INTEREST_ICONS, INTEREST_KEYS, INTEREST_LINKS } from '../about/interestsData';
import '../about/about.css';

// Where the way I think comes from, and what to read about it. Both used to
// close About; together they were a third of its length and neither was about
// the person the page is named for. Interests come first because the shelves
// are the reading those interests grew into.
const LibraryPage = () => {
  const { t, tl } = useTranslation();

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('library.badge')}</span>
        <h1 className="hub-title">{t('library.title')}</h1>
        <p className="hub-lede">{t('library.lede')}</p>
      </Reveal>

      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        <Reveal className="cv-interests" stagger>
          {INTEREST_KEYS.map((key) => (
            <article className="cv-interest" key={key}>
              <div className="cv-interest-icon">{INTEREST_ICONS[key]}</div>
              <h3>{t(`cv.interests.${key}.title`)}</h3>
              <p>{t(`cv.interests.${key}.body`)}</p>
              {/* Optional second paragraph: translate() hands back the key
                  itself on a miss, so a card without one renders nothing. */}
              {t(`cv.interests.${key}.body2`) !== `cv.interests.${key}.body2` && (
                <p>{t(`cv.interests.${key}.body2`)}</p>
              )}
              {INTEREST_LINKS[key] && (
                <a
                  className="cv-interest-link"
                  href={INTEREST_LINKS[key].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={INTEREST_LINKS[key].mark} alt="" aria-hidden="true" />
                  {t(`cv.interests.${key}.link`)}
                  <ArrowUpRight />
                </a>
              )}
              <div className="brand-chips">
                {tl(`cv.interests.${key}.tags`).map((tag) => (
                  <span className="brand-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- reading */}
      <Section
        kicker={t('cv.readingKicker')}
        title={t('cv.readingTitle')}
        lede={t('cv.readingLede')}
      >
        {READING.map(({ id, books }) => (
          <Reveal className="practice-block" key={id}>
            {/* What the shelf is for and why it is worth the time, so the
                column beside the books says something instead of holding a
                single line over empty space. */}
            <div className="reading-shelf-head">
              <h3 className="practice-title">{t(`cv.readingGroups.${id}`)}</h3>
              <p className="reading-shelf-note">{t(`cv.readingNotes.${id}`)}</p>
            </div>
            <ul className="reading-list">
              {books.map(({ title, author, icon }) => (
                <li key={title}>
                  {/* The cover is how a book is recognised on a shelf; the drawn
                      icon stays only as a fallback for one without a cover. */}
                  {BOOK_COVERS[title] ? (
                    <img className="reading-cover" src={BOOK_COVERS[title]} alt="" loading="lazy" width="40" height="60" />
                  ) : (
                    <ConceptIcon className="list-icon" name={icon} />
                  )}
                  <span className="reading-book">
                    <span className="reading-title">{title}</span>
                    <span className="reading-author">{author}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        {/* The shelves are the reading that has a use; the rest is taste, and
            taste is not something to recommend. */}
        <p className="reading-aside">{t('cv.readingAside')}</p>
      </Section>

      {/* The end of the tour: the next page in the bar is Contact. */}
      <TalkBand />
    </div>
  );
};

export default LibraryPage;
```

- [ ] **Step 5: Route it and register its meta**

`src/App.js`: `import LibraryPage from './components/library/LibraryPage';` and `<Route path="/library" element={<LibraryPage />} />` directly after the `/stack` route.

`RouteMeta.jsx`: `'/library': 'library',` after `'/stack': 'stack',`.

- [ ] **Step 6: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/library src/App.js src/components/navigation/RouteMeta.jsx src/i18n/en.js src/i18n/es.js
git commit -m "Interests and reading get their own page" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Trim About; Projects hands off to the Stack

**Files:**
- Modify: `src/components/about/about.jsx`
- Modify: `src/components/projects/projects.jsx`
- Modify: `src/i18n/repos.en.js`, `src/i18n/repos.es.js` (`repos.stack*`)
- Create: `src/components/about/about.test.jsx`
- Create: `src/components/projects/projectsHandoff.test.jsx`

**Interfaces:**
- Consumes: `StackTiles` (Task 2). `/stack` and `/library` exist (Tasks 4–5).
- Produces: the keys `repos.stackTitle`, `repos.stackLede`, `repos.stackCta`.

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/about/about.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import About from './about';
import en from '../../i18n/en';

const renderAbout = () =>
  render(
    <I18nProvider>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </I18nProvider>
  );

test('About is about the person: no wall, no shelves, no interests', () => {
  renderAbout();
  expect(screen.queryByRole('searchbox', { name: 'Search technologies' })).toBeNull();
  expect(screen.queryByText('Cosmos')).toBeNull();
  expect(screen.queryByRole('heading', { name: en.cv.interestsTitle })).toBeNull();
});

test('About still ends on the card to Experience', () => {
  const { container } = renderAbout();
  const teaser = container.querySelector('.hub-teaser');
  expect(teaser.querySelector('a[href="/experience"]')).not.toBeNull();
  expect(teaser.querySelector('.timeline-strip')).not.toBeNull();
});
```

```jsx
// src/components/projects/projectsHandoff.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import MyProjects from './projects';
import en from '../../i18n/en';

test('Projects hands off to the stack, not to contact', () => {
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/projects']}>
        <MyProjects />
      </MemoryRouter>
    </I18nProvider>
  );
  expect(screen.getByRole('link', { name: new RegExp(en.repos.stackCta) })).toHaveAttribute('href', '/stack');
  expect(screen.queryByRole('link', { name: new RegExp(en.talk.cta) })).toBeNull();
});
```

If `About` or `MyProjects` touches a browser API jsdom lacks (for example `matchMedia` or `scrollTo`), stub that one API at the top of the test file with `window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));`. Stub only what the error names.

- [ ] **Step 2: Run them and watch them fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/about/about.test.jsx src/components/projects/projectsHandoff.test.jsx`
Expected: FAIL. About still has the searchbox, and `en.repos.stackCta` is undefined.

- [ ] **Step 3: Trim About**

In `src/components/about/about.jsx`:
- Delete the whole `stack` section, from its `{/* --- stack */}` comment through its closing `</Section>`.
- Delete the `reading` section, from its comment through its closing `</Section>` (including the `reading-aside` paragraph).
- Delete the `interests` section, from its comment through its closing `</Section>`.
- Delete the imports that are now unused: `StackExplorer`, `READING`, `BOOK_COVERS`, `ConceptIcon` (only if nothing else in the file uses it: `grep -n "ConceptIcon" src/components/about/about.jsx`), and `INTEREST_ICONS, INTEREST_KEYS, INTEREST_LINKS`. Run `npx eslint src/components/about/about.jsx` and remove anything else it reports as unused, such as `ArrowUpRight` if it is no longer referenced.

- [ ] **Step 4: Add the Projects hand-off strings**

In the `repos` block of `src/i18n/repos.en.js` (the `repos` strings live in their own files, merged into the dictionaries), add:

```js
    stackTitle: 'The stack behind them',
    stackLede: 'Every technology on the wall, grouped and searchable; the ones with a number link back to these projects.',
    stackCta: 'See the stack',
```

and in `src/i18n/repos.es.js`:

```js
    stackTitle: 'El stack detrás de ellos',
    stackLede: 'Todas las tecnologías del muro, agrupadas y con búsqueda; las que llevan número enlazan de vuelta a estos proyectos.',
    stackCta: 'Ver el stack',
```

- [ ] **Step 5: Swap the TalkBand in Projects for the card to the Stack**

In `src/components/projects/projects.jsx`:
- Change the parts import to drop `TalkBand` and add `ArrowRight`: `import { ArrowRight, ArrowUpRight, Reveal } from '../brand/parts';`. Keep whatever else that line already imports.
- Add `import StackTiles from '../stack/StackTiles';`, and add `Link` to the `react-router-dom` import if the file does not import it yet.
- Replace `<TalkBand />` with:

```jsx
      {/* The hand-off every page makes: to the next one in the bar. The
          closing band that used to end here moved to the end of the tour. */}
      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('repos.stackTitle')}</h2>
          <p className="brand-p">{t('repos.stackLede')}</p>
        </div>
        <StackTiles />
        <Link className="brand-link-out hub-teaser-cta" to="/stack">
          {t('repos.stackCta')}
          <ArrowRight />
        </Link>
      </Reveal>
```

- [ ] **Step 6: Run the tests and lint**

Run: `CI=true npx react-scripts test --watchAll=false && npx eslint src/components/about/about.jsx src/components/projects/projects.jsx`
Expected: all tests pass, and eslint prints nothing.

- [ ] **Step 7: Commit**

```bash
git add src/components/about src/components/projects src/i18n/repos.en.js src/i18n/repos.es.js
git commit -m "About keeps what is about the person; Projects hands off to the stack" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Navbar, its breakpoint, and the terminal

**Files:**
- Modify: `src/components/navigation/navbar.jsx` (`LINKS`)
- Modify: `src/App.css` (collapse breakpoint)
- Modify: `src/components/terminal/commands.js`
- Modify: `src/i18n/en.js`, `src/i18n/es.js` (`nav.stack`, `nav.library`, `term.stack.line`, `term.library.line`, `term.desc.library`)
- Create: `src/components/navigation/navbar.test.jsx`, `src/components/terminal/commands.test.js`

**Interfaces:**
- Consumes: the `/stack` and `/library` routes.
- Produces: the terminal command `library` (aliases `biblioteca`, `lectura`), and `DESTINATIONS.stack` / `DESTINATIONS.library`.

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/navigation/navbar.test.jsx
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import Navbar from './navbar';

test('the bar carries the seven pages in order', () => {
  const { container } = render(
    <ThemeProvider>
      <I18nProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </I18nProvider>
    </ThemeProvider>
  );
  const row = container.querySelector('.nav-links-inline');
  const hrefs = within(row).getAllByRole('link').map((link) => link.getAttribute('href'));
  expect(hrefs).toEqual(['/', '/experience', '/ventures', '/projects', '/stack', '/library', '/contact']);
});
```

```js
// src/components/terminal/commands.test.js
import { COMMANDS, DESTINATIONS } from './commands';

const ctx = (go) => ({ t: (key) => key, tl: () => [], go, toggleTheme() {}, setLang() {}, lang: 'en', clear() {}, close() {} });
const find = (name) => COMMANDS.find((command) => command.id === name || (command.aliases || []).includes(name));

test('stack opens the stack page, not About', () => {
  const go = jest.fn();
  find('stack').run(ctx(go));
  expect(go).toHaveBeenCalledWith('/stack');
});

test('library and its Spanish names open the library', () => {
  ['library', 'biblioteca', 'lectura'].forEach((name) => {
    const go = jest.fn();
    find(name).run(ctx(go));
    expect(go).toHaveBeenCalledWith('/library');
  });
});

test('open knows both new pages', () => {
  expect(DESTINATIONS.stack).toBe('/stack');
  expect(DESTINATIONS.library).toBe('/library');
});
```

If `Navbar` is not the default export of `navbar.jsx`, or renders only a sheet in jsdom, adjust the import and selector to what the file exports (`grep -n "export" src/components/navigation/navbar.jsx`). The assertion, the seven hrefs in order, stays.

- [ ] **Step 2: Run them and watch them fail**

Run: `CI=true npx react-scripts test --watchAll=false src/components/navigation/navbar.test.jsx src/components/terminal/commands.test.js`
Expected: FAIL. There are five links instead of seven, `stack` goes to `/`, and `library` does not exist.

- [ ] **Step 3: Links and strings**

`navbar.jsx`, `LINKS`:

```js
const LINKS = [
    { to: '/', labelKey: 'nav.about' },
    { to: '/experience', labelKey: 'nav.experience' },
    { to: '/ventures', labelKey: 'nav.ventures' },
    { to: '/projects', labelKey: 'nav.projects' },
    { to: '/stack', labelKey: 'nav.stack' },
    { to: '/library', labelKey: 'nav.library' },
    { to: '/contact', labelKey: 'nav.contact' },
];
```

`en.js` `nav`: add `stack: 'Stack',` and `library: 'Library',` after `ventures`. `es.js` `nav`: `stack: 'Stack',` and `library: 'Biblioteca',`.

`en.js` `term.stack.line` → `'Opening the stack.'`. Add after the `stack` block: `library: { line: 'Opening the library. Two hundred books, ten shelves.' },`. In `term.desc`, add after `stack`: `library: 'the books worth reading, and why',`.

`es.js` `term.stack.line` → `'Abriendo el stack.'`, then `library: { line: 'Abriendo la biblioteca. Doscientos libros, diez estantes.' },`, and in `term.desc`: `library: 'los libros que vale la pena leer, y por qué',`.

- [ ] **Step 4: Terminal commands**

In `src/components/terminal/commands.js`:
- In `DESTINATIONS`, after `projects: '/projects',`, add `stack: '/stack',` and `library: '/library',`.
- In the `stack` command, change `go('/');` to `go('/stack');`.
- Directly after the `stack` command, add:

```js
  {
    id: 'library',
    aliases: ['biblioteca', 'lectura'],
    run: ({ t, go }) => {
      go('/library');
      return [say(t('term.library.line'))];
    },
  },
```

- [ ] **Step 5: Run the tests**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all pass.

- [ ] **Step 6: Measure where seven links stop fitting**

Start the app (`BROWSER=none PORT=3000 npm start`) and open `/` in a browser at several widths between 769 and 1440px. At each width, run this in the console:

```js
(() => { const row = document.querySelector('.nav-links-inline'); const bar = row.closest('nav') || row.parentElement; return { rowRight: Math.round(row.getBoundingClientRect().right), controlsLeft: Math.round([...bar.querySelectorAll('button')].map((b) => b.getBoundingClientRect().left).sort((a, b) => a - b)[0]), wrapped: row.getBoundingClientRect().height > 60 }; })()
```

`NAV_BREAK` is the smallest width at which `rowRight < controlsLeft - 16` and `wrapped` is false, in both languages ("Biblioteca" is longer than "Library"). Round it up to the next multiple of 20.

- [ ] **Step 7: Give the navbar its own collapse breakpoint**

In `src/App.css`, the navbar collapses inside `@media (max-width: 768px)` (around line 764), next to rules for other components. Move out of that block every rule whose selector starts with `.nav-links-inline`, `.navbar-menu-button` or `.nav-sheet`, and put them in a new block right after it:

```css
/* The bar collapses to the menu at its own width, not the phone breakpoint:
   seven links need more room than five did, and a row that wraps inside a
   fixed bar is the bug the sheet exists to prevent. NAV_BREAK was measured
   with both languages. */
@media (max-width: NAV_BREAKpx) {
    /* the moved rules, unchanged */
}
```

Replace `NAV_BREAK` with the value measured in Step 6. Leave every other rule in the 768 block where it is. Reload and check at `NAV_BREAK - 1` (menu button, no row) and `NAV_BREAK` (row fits, no wrap), in both languages.

- [ ] **Step 8: Commit**

```bash
git add src/components/navigation src/components/terminal src/App.css src/i18n/en.js src/i18n/es.js
git commit -m "Stack and Library in the navbar and the terminal" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Browser verification and push

**Files:** none unless a defect is found. Fix it in the task that owns the file, then come back here.

- [ ] **Step 1: Walk the chain, desktop, light theme, English**

With the app running, visit `/`, `/experience`, `/ventures`, `/projects`, `/stack`, `/library` and `/contact` in that order, using each page's final card to reach the next. Check on each page:
- The page shows its own content and the tab title changes: `document.title` on `/stack` is `Stack · Adal Cerrillo`, and on `/library` it is `Library · Adal Cerrillo`.
- The final card, where there is one, links to the next page in the bar, and its strip animates once it scrolls into view: the timeline on `/`, the tiles on `/projects`, the shelf on `/stack`.
- `/library` shows the interests, then ten shelves of twenty, the aside, and the contact band.

- [ ] **Step 2: Repeat in dark theme and in Spanish**

Toggle the theme and the language. The strips must stay visible against the dark background, the star count in `StackTiles` must stay legible, and no raw i18n key may appear anywhere.

- [ ] **Step 3: Reduced motion**

Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering) and reload `/`, `/projects` and `/stack`. Each strip shows its finished picture: the line and milestones, the full wall with one star lit, and the full shelf. Nothing is hidden and no pulse is parked at an edge.

- [ ] **Step 4: Mobile, 390px**

At 390×844, check that the menu sheet lists all seven pages, that each teaser card stacks its copy, strip and button without horizontal scroll, and that `/library`'s shelf notes sit above their books.

- [ ] **Step 5: Reload directly on the new routes**

Load `http://localhost:3000/stack` and `http://localhost:3000/library` fresh. Both render, with the right titles and the right navbar entry marked current.

- [ ] **Step 6: Full suite, then push**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all suites pass.

```bash
git push origin main
```
