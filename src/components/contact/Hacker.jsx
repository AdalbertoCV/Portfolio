import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';

/* ==========================================================================
   The one watching the form.

   A hooded figure in pixels, on the same dark plate and the same green as the
   ⌘K terminal, because this site already has a terminal and a second colour
   scheme for a second piece of screen furniture would just be a third thing
   to keep in step.

   He does not follow the focused field, he follows the caret. A field is a box
   a few hundred pixels wide, and eyes aimed at the middle of a box sit still
   while somebody types, which reads as broken rather than as watching. Aimed
   at the caret they travel along the line as the words arrive and drop down
   the message box line by line, which is the whole trick.

   Finding the caret means measuring text, and the only honest way to measure
   text in a field is to lay the same text out again in the same font. That is
   what the mirror below is: one hidden div, restyled from whichever field is
   being typed in, holding the characters before the caret and a zero-width
   marker after them. Where the marker lands is where the caret is.

   The eyes move in whole pixels of the drawing's own grid. Sub-pixel gliding
   would blur the one thing that makes this pixel art, and the snap is better
   anyway: it reads as a machine tracking you rather than as a cartoon.

   All of it is decoration, so the whole thing is aria-hidden, and it stands
   down under prefers-reduced-motion — eyes that chase a caret are motion, and
   dressing that up as an exception would be a lie. The readout stays, because
   a line of text that changes when you focus a field is not motion.
   ======================================================================== */

// The drawing's grid. Every coordinate below is one pixel of it.
const W = 48;
const H = 34;

// Where each eye's top-left pixel sits, and how far it may travel. Two in each
// direction: the face opening runs x 16–32 and y 10–20, and a 4x3 eye at 18,13
// has exactly that much room before it touches the hood.
const EYES = [18, 26];
const EYE_Y = 13;
const REACH = 2;

// A target this far away or further gets the full deflection; anything closer
// gets proportionally less, so he does not slam to the stops the instant a
// field is focused.
const FULL_LOOK = 150;

/* ------------------------------------------------------------ the drawing */

// x, y, w, h. Listed as rows the way the shape was drawn, rather than folded
// into paths, so a pixel can be moved by changing one number.
const HOOD = [
  [21, 2, 6, 1],
  [19, 3, 10, 1],
  [17, 4, 14, 1],
  [16, 5, 16, 1],
  [15, 6, 18, 1],
  [14, 7, 20, 1],
  [13, 8, 22, 1],
  [12, 9, 24, 13],
  [11, 22, 26, 1],
  [10, 23, 28, 1],
];

// The opening, cut out of the hood. Darker than the fabric, which is what
// makes the fabric read as fabric.
const VOID = [
  [20, 7, 8, 1],
  [18, 8, 12, 1],
  [17, 9, 14, 1],
  [16, 10, 16, 11],
  [17, 21, 14, 1],
  [19, 22, 10, 1],
];

// A light down the left silhouette. One column of green at low opacity, and
// the whole figure stops being a black blob.
const RIM = [
  [21, 2, 3, 1],
  [19, 3, 2, 1],
  [17, 4, 2, 1],
  [16, 5, 1, 1],
  [15, 6, 1, 1],
  [14, 7, 1, 1],
  [13, 8, 1, 1],
  [12, 9, 1, 13],
  [11, 22, 1, 1],
  [10, 23, 1, 1],
];

const SHOULDERS = [
  [8, 24, 32, 1],
  [6, 25, 36, 1],
  [4, 26, 40, 1],
  [3, 27, 42, 1],
  [2, 28, 44, 6],
];

// The same light, carried along the top of the near shoulder, so the figure
// has one continuous edge instead of a lit head on an unlit body.
const SHOULDER_RIM = [
  [8, 24, 2, 1],
  [6, 25, 2, 1],
  [4, 26, 2, 1],
  [3, 27, 1, 1],
  [2, 28, 1, 6],
];

const Px = ({ r: [x, y, w, h], className }) => (
  <rect className={className} x={x} y={y} width={w} height={h} />
);

/* -------------------------------------------------------------- the caret */

// Copied onto the mirror so its layout matches the field's exactly. Borders
// are deliberately absent: the mirror has none and the border width is added
// back by hand, which keeps offsetLeft measuring from a known edge.
const MIRROR_STYLE = [
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'fontVariant',
  'letterSpacing', 'wordSpacing', 'lineHeight', 'textTransform', 'textIndent',
  'whiteSpace', 'overflowWrap', 'tabSize',
];

let mirror = null;

const getMirror = () => {
  if (mirror) return mirror;
  mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  Object.assign(mirror.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    visibility: 'hidden',
    pointerEvents: 'none',
    border: '0',
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
  });
  document.body.appendChild(mirror);
  return mirror;
};

// Where this field's caret sits, in viewport coordinates.
const caretPoint = (el) => {
  const rect = el.getBoundingClientRect();
  const cs = window.getComputedStyle(el);
  const box = getMirror();

  MIRROR_STYLE.forEach((prop) => {
    box.style[prop] = cs[prop];
  });

  const multiline = el.tagName === 'TEXTAREA';
  // A single-line field never wraps however long the value is: it scrolls.
  box.style.whiteSpace = multiline ? 'pre-wrap' : 'pre';
  // clientWidth excludes the border and any scrollbar, which is exactly the
  // width the text is laid out in.
  box.style.width = multiline ? `${el.clientWidth}px` : 'auto';

  // An email or number field has no selection to read — the browser refuses.
  // The end of the value is where the caret is while somebody types anyway,
  // so that is the honest fallback rather than a guess.
  let caret;
  try {
    caret = el.selectionStart == null ? el.value.length : el.selectionStart;
  } catch (error) {
    caret = el.value.length;
  }
  box.textContent = el.value.slice(0, caret);

  const marker = document.createElement('span');
  // A zero-width space rather than an empty span: an empty inline box gets no
  // line of its own, so a caret just after a newline measured as if it were
  // still on the line above.
  marker.textContent = '​';
  box.appendChild(marker);

  const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
  const x = rect.left + parseFloat(cs.borderLeftWidth) + marker.offsetLeft - el.scrollLeft;
  const y =
    rect.top + parseFloat(cs.borderTopWidth) + marker.offsetTop - el.scrollTop + lineHeight / 2;

  // A caret scrolled out of sight would otherwise send him looking somewhere
  // the reader cannot see, so the aim is clamped to the field itself.
  return {
    x: Math.min(Math.max(x, rect.left + 6), rect.right - 6),
    y: Math.min(Math.max(y, rect.top + 6), rect.bottom - 6),
  };
};

const isField = (el) =>
  el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.type !== 'checkbox';

/* --------------------------------------------------------------- the whole */

const Hacker = ({ formRef, status }) => {
  const { t } = useTranslation();
  const svgRef = useRef(null);
  const pupils = useRef([]);

  // null | 'one' | 'two'. The value picks the keyframe; the animation ending
  // is what clears it.
  const [blink, setBlink] = useState(null);
  // Which field is being typed in, for the readout. Focus changes only, so
  // this does not re-render the form on every keystroke.
  const [field, setField] = useState(null);

  const [still, setStill] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setStill(query.matches);
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Written straight to the DOM. Putting a look direction in state would
  // re-render the whole form on every keystroke to move two rectangles by a
  // pixel each.
  const aim = useCallback((point) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    const scale = rect.width / W;

    EYES.forEach((ex, i) => {
      const node = pupils.current[i];
      if (!node) return;

      if (!point) {
        node.style.transform = 'translate(0px, 0px)';
        return;
      }

      // The eye's own centre on screen: two pixels in from its left edge, and
      // a pixel and a half down from its top.
      const eyeX = rect.left + (ex + 2) * scale;
      const eyeY = rect.top + (EYE_Y + 1.5) * scale;
      const dx = point.x - eyeX;
      const dy = point.y - eyeY;
      const distance = Math.hypot(dx, dy) || 1;
      const pull = Math.min(1, distance / FULL_LOOK) * REACH;

      // Rounded to whole pixels of the drawing: see the note at the top.
      const px = Math.round((dx / distance) * pull);
      const py = Math.round((dy / distance) * pull);
      node.style.transform = `translate(${px}px, ${py}px)`;
    });
  }, []);

  /* ------------------------------------------------------------- tracking */

  useEffect(() => {
    if (still || status === 'sent') {
      aim(null);
      return undefined;
    }

    const form = formRef.current;
    let frame = 0;
    let pointer = null;

    const look = () => {
      frame = 0;
      const active = document.activeElement;

      if (isField(active) && form && form.contains(active)) {
        aim(caretPoint(active));
        return;
      }

      // Nothing focused: he follows whoever is moving the pointer, and faces
      // front when nobody is.
      aim(pointer);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(look);
    };

    const onPointer = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };

    const onLeave = () => {
      pointer = null;
      schedule();
    };

    // Every one of these can move the caret, and none of them fires for all
    // the others: typing is `input`, arrow keys are `keyup`, a click into the
    // middle of a word is `click`, a drag-select is `select`.
    const events = ['input', 'keyup', 'click', 'select', 'focusin', 'focusout'];
    events.forEach((name) => document.addEventListener(name, schedule, true));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    look();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      events.forEach((name) => document.removeEventListener(name, schedule, true));
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [aim, formRef, still, status]);

  /* -------------------------------------------------------------- readout */

  useEffect(() => {
    const form = formRef.current;
    if (!form) return undefined;

    const onIn = (event) =>
      setField(isField(event.target) && event.target.name ? event.target.name : null);
    const onOut = () => setField(null);

    form.addEventListener('focusin', onIn);
    form.addEventListener('focusout', onOut);
    return () => {
      form.removeEventListener('focusin', onIn);
      form.removeEventListener('focusout', onOut);
    };
  }, [formRef]);

  /* --------------------------------------------------------------- blinks */

  // A CSS animation rather than a class held for a tenth of a second by a
  // timer: a browser throttles timers in a background tab but pauses
  // animations outright, so with a timer a tab backgrounded mid-blink came
  // back with his eyes still shut.
  useEffect(() => {
    if (still || status === 'sent') return undefined;

    let next;
    const schedule = () => {
      next = window.setTimeout(() => {
        // Roughly one blink in four comes in a pair. Anything that blinks on a
        // perfect metronome is a machine; the double is what sells it.
        setBlink(Math.random() < 0.26 ? 'two' : 'one');
        schedule();
      }, 2600 + Math.random() * 4800);
    };

    schedule();
    return () => window.clearTimeout(next);
  }, [still, status]);

  /* --------------------------------------------------------------- render */

  const happy = status === 'sent';

  // One line of terminal output under him. It is the only place on the page
  // that says out loud what he is doing, which is what turns a decoration into
  // a readout.
  let readout = t('contact.watcher.idle');
  if (status === 'sending') readout = t('contact.watcher.sending');
  else if (happy) readout = t('contact.watcher.sent');
  else if (status === 'error') readout = t('contact.watcher.failed');
  else if (field) readout = `${t('contact.watcher.reading')} ${t(`contact.fields.${field}`)}`;

  return (
    <div
      className="watcher"
      data-blink={blink || undefined}
      data-happy={happy ? 'true' : undefined}
      aria-hidden="true"
    >
      <div className="watcher-plate">
        <svg
          ref={svgRef}
          className="watcher-art"
          viewBox={`0 0 ${W} ${H}`}
          shapeRendering="crispEdges"
          focusable="false"
        >
          {SHOULDERS.map((r) => (
            <Px key={`s${r[1]}`} r={r} className="hk-hood" />
          ))}
          {HOOD.map((r) => (
            <Px key={`h${r[1]}`} r={r} className="hk-hood" />
          ))}
          {[...RIM, ...SHOULDER_RIM].map((r) => (
            <Px key={`r${r[0]}-${r[1]}`} r={r} className="hk-rim" />
          ))}
          {VOID.map((r) => (
            <Px key={`v${r[1]}`} r={r} className="hk-void" />
          ))}

          {EYES.map((ex, i) => (
            <g
              className="hk-eye"
              key={ex}
              ref={(node) => {
                pupils.current[i] = node;
              }}
            >
              {/* Three drawings of the same eye, one shown at a time. Swapping
                  whole shapes rather than tweening one keeps every state on
                  the pixel grid. */}
              <rect className="hk-open" x={ex} y={EYE_Y} width="4" height="3" />
              <rect className="hk-shut" x={ex} y={EYE_Y + 1} width="4" height="1" />
              <g className="hk-glad">
                <rect x={ex + 1} y={EYE_Y} width="1" height="1" />
                <rect x={ex} y={EYE_Y + 1} width="1" height="1" />
                <rect x={ex + 2} y={EYE_Y + 1} width="1" height="1" />
                <rect x={ex - 1} y={EYE_Y + 2} width="1" height="1" />
                <rect x={ex + 3} y={EYE_Y + 2} width="1" height="1" />
              </g>
            </g>
          ))}
        </svg>
      </div>

      <p className="watcher-line">
        <span className="watcher-prompt">&gt;</span>
        {readout}
        <span className="watcher-caret" />
      </p>
    </div>
  );
};

export default Hacker;
