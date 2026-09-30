import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Chevron, Reveal } from '../brand/parts';

// One card at a time, with a drawing beside it that listens to which card it is.
// This is the engine the interest cards were built on, lifted out so that the
// certifications, the events and the people can be the same object with a
// different drawing and different cards in it. Nothing here knows what a card
// says or what the drawing draws: it owns the rail, the position, the dots (or,
// once there are too many for dots, a counter and filters) and the arrows, and
// hands the current position to whatever panel it was given.
//
// The classes are the interest rail's own, on purpose. The look of the card, the
// dots and the instrument panel was settled there, and a second set of classes
// for the same objects would only be a chance for the two to drift apart.
//
// All the cards stay in the document, because this is not a slideshow that
// throws the rest away; the ones off screen are marked inert, so a keyboard
// cannot land inside a card the reader cannot see.

// True while the element is on screen. The drawings loop, and a loop nobody can
// see is work for nothing. Without IntersectionObserver it stays on.
export const useLive = () => {
  const ref = useRef(null);
  const [live, setLive] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, live];
};

// True on a phone or a narrow window, where the rail becomes a list. Follows the
// window, because a phone turned on its side is a different width.
const COMPACT = '(max-width: 1079px)';
const useCompact = () => {
  const [compact, setCompact] = useState(() => Boolean(window.matchMedia?.(COMPACT).matches));
  useEffect(() => {
    const query = window.matchMedia?.(COMPACT);
    if (!query) return undefined;
    const on = () => setCompact(query.matches);
    on();
    query.addEventListener?.('change', on);
    return () => query.removeEventListener?.('change', on);
  }, []);
  return compact;
};

const pad = (n, width) => String(n).padStart(width, '0');

const SpotlightRail = ({
  items,
  idPrefix = 'spot',
  prevLabel,
  nextLabel,
  groups,
  allLabel,
  counterLabel,
  dotsMax = 9,
  className = '',
  renderCard,
  renderPanel,
}) => {
  const [liveRef, live] = useLive();
  const compact = useCompact();
  // In the list, which row is open. Nothing at first: the section is a few short
  // rows, and the reader opens the one they want.
  const [open, setOpen] = useState(null);
  const anchor = useRef(null);
  const railRef = useRef(null);
  const settle = useRef(null);
  // Which card is on screen. The first one, so the section is never a rail with
  // nothing in it.
  const [index, setIndex] = useState(0);
  const [group, setGroup] = useState('all');

  const visible = useMemo(
    () => (groups && group !== 'all' ? items.filter((item) => item.group === group) : items),
    [items, groups, group],
  );
  const count = visible.length;
  const at = Math.min(index, Math.max(count - 1, 0));
  const current = visible[at];
  const idOf = (kind, key) => `${idPrefix}-${kind}-${key}`;

  // Move the rail so the chosen card sits at its left edge, which is where the
  // snap puts it after a swipe. Only the rail moves: scrollIntoView would take
  // the page with it, and the reader is halfway down a long section. Instant,
  // not smooth: the card does not travel, it is replaced where it stands.
  useEffect(() => {
    const rail = railRef.current;
    const card = current && document.getElementById(idOf('card', current.key));
    if (!rail || !card) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    if (!max) return;
    // Top as well: a hidden overflow can still be scrolled by the browser (a
    // focus, a find-in-page), and a card left halfway up its rail is a card
    // with a hole under it.
    rail.scrollTo({ left: Math.min(card.offsetLeft, max), top: 0, behavior: 'auto' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, count, group]);

  // The rail is given the height of the card being read, so the card ends where
  // its content ends and what is under it is the page's own air. Re-measured
  // whenever the card changes and whenever that card changes size, because the
  // same text is a different height on a different width or with a different
  // font loaded. The drawing beside the card is stretched to the same height by
  // the layout, so the two are always the same size, whatever the card says.
  useEffect(() => {
    const rail = railRef.current;
    const card = rail && rail.children[at];
    if (!rail || !card) return undefined;

    const fit = () => {
      const { paddingTop, paddingBottom } = getComputedStyle(rail);
      const air = (parseFloat(paddingTop) || 0) + (parseFloat(paddingBottom) || 0);
      rail.style.height = `${card.offsetHeight + air}px`;
    };

    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(fit);
    observer.observe(card);
    return () => observer.disconnect();
  }, [at, count, group]);

  // A swipe that slides the strip while the dots still say "one" is a carousel
  // that lies about where it is. The card the rail comes to rest against is the
  // one that becomes current, once it has stopped moving.
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;
      const max = rail.scrollWidth - rail.clientWidth;
      // The last card cannot reach the left edge, so the end of the rail is its
      // resting place and the last card is what the reader is looking at.
      if (max - rail.scrollLeft < 2) {
        setIndex((now) => (now === count - 1 ? now : count - 1));
        return;
      }
      let closest = 0;
      let distance = Infinity;
      [...rail.querySelectorAll('.cv-interest')].forEach((card, position) => {
        const away = Math.abs(card.offsetLeft - rail.scrollLeft);
        if (away < distance) {
          distance = away;
          closest = position;
        }
      });
      setIndex((now) => (now === closest ? now : closest));
    }, 180);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  // The arrows stop at the ends: a rail that jumps from the last card back to
  // the first is a cut, not a slide.
  const step = (delta) => {
    const next = at + delta;
    if (next < 0 || next >= count) return;
    setIndex(next);
  };

  // Arrow keys on the dots, which is what a row of position markers is
  // expected to answer to.
  const walkDots = (event, position) => {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    const next = Math.min(Math.max(position + delta, 0), count - 1);
    event.preventDefault();
    setIndex(next);
    document.getElementById(idOf('dot', visible[next].key))?.focus();
  };

  const pick = (id) => {
    setGroup(id);
    setIndex(0);
    setOpen(null);
  };

  // One row opens at a time, in place. When the row that was open is above the
  // one just tapped, closing it would pull the tapped row up the screen, away
  // from the thumb. So the row's distance from the top of the screen is noted
  // before the change and put back right after it, in the same frame: the row
  // stays where it was tapped and nothing is seen to move.
  const toggle = (position, node) => {
    anchor.current = { node, top: node.getBoundingClientRect().top };
    setOpen((now) => (now === position ? null : position));
    setIndex(position);
  };
  useLayoutEffect(() => {
    const held = anchor.current;
    anchor.current = null;
    if (!held || !held.node.isConnected) return;
    const delta = held.node.getBoundingClientRect().top - held.top;
    if (Math.abs(delta) > 1) window.scrollBy(0, delta);
  }, [open]);

  const filtered = groups && groups.length > 1 && items.length > dotsMax;
  const width = String(items.length).length;

  if (compact) {
    return (
      // A list, not a rail. On a phone every card is taller than the screen, so a
      // rail meant going back up to the controls to turn it. Here each item is a
      // short row and only the one the reader opens shows its card, in place. The
      // drawing stays on top, once, and follows whichever row was opened last.
      <div ref={liveRef} className={`cv-interests-live cv-interests-live--list${live ? ' is-live' : ''}${className ? ` ${className}` : ''}`}>
        {renderPanel({ index: at, live, item: current, count, items: visible })}
        <div className="cv-acc">
          {filtered ? (
            <div className="cv-spot-filter" role="group">
              {[{ id: 'all', label: allLabel }, ...groups].map(({ id, label }) => (
                <button type="button" key={id} className="cv-spot-chip" aria-pressed={group === id} onClick={() => pick(id)}>
                  {label}
                </button>
              ))}
            </div>
          ) : null}
          {visible.map((item, position) => {
            const isOpen = open === position;
            return (
              <article className={`cv-acc-item${isOpen ? ' is-open' : ''}`} key={item.key} style={{ '--tone': item.tone }}>
                <h3 className="cv-acc-head">
                  <button
                    type="button"
                    id={idOf('dot', item.key)}
                    aria-expanded={isOpen}
                    aria-controls={idOf('card', item.key)}
                    onClick={(event) => toggle(position, event.currentTarget)}
                  >
                    <i aria-hidden="true" />
                    <span className="cv-acc-name">
                      <span className="cv-acc-title">{item.label}</span>
                      {item.meta ? <span className="cv-acc-meta">{item.meta}</span> : null}
                    </span>
                    <Chevron className="cv-acc-chevron" />
                  </button>
                </h3>
                {isOpen ? (
                  <div id={idOf('card', item.key)} className="cv-acc-body cv-interest" role="region" aria-labelledby={idOf('dot', item.key)}>
                    {renderCard(item, position)}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    // The live flag sits on a wrapper, not on the Reveal: Reveal adds its own
    // class by hand, and a re-render of its className would drop it.
    <div ref={liveRef} className={`cv-interests-live${live ? ' is-live' : ''}${className ? ` ${className}` : ''}`}>
      {renderPanel({ index: at, live, item: current, count, items: visible })}
      <Reveal className="cv-interest-rail">
        {filtered ? (
          // Once there are more cards than a row of dots can carry, the reader
          // narrows by kind first; the counter then says where they are inside
          // that kind.
          <div className="cv-spot-filter" role="group">
            {[{ id: 'all', label: allLabel }, ...groups].map(({ id, label }) => (
              <button
                type="button"
                key={id}
                className="cv-spot-chip"
                aria-pressed={group === id}
                onClick={() => pick(id)}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="cv-interest-nav">
          {count <= dotsMax ? (
            // One dot per card, in the tone of the card it opens. Dots that all
            // look alike would be a page indicator; coloured ones are the
            // palette of the section.
            <div className="cv-interest-dots">
              {visible.map((item, position) => (
                <button
                  type="button"
                  id={idOf('dot', item.key)}
                  className="cv-interest-dot"
                  key={item.key}
                  style={{ '--tone': item.tone }}
                  aria-label={item.label}
                  aria-current={at === position ? 'true' : undefined}
                  onClick={() => setIndex(position)}
                  onKeyDown={(event) => walkDots(event, position)}
                />
              ))}
            </div>
          ) : (
            <p className="cv-spot-count" style={{ '--tone': current?.tone }} aria-live="polite">
              <b>{pad(at + 1, width)}</b>
              <span> / {pad(count, width)}</span>
              {counterLabel ? <em>{counterLabel}</em> : null}
            </p>
          )}
          <div className="cv-interest-steps">
            <button
              type="button"
              className="cv-interest-step"
              onClick={() => step(-1)}
              disabled={at === 0}
              aria-label={prevLabel}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="cv-interest-step"
              onClick={() => step(1)}
              disabled={at === count - 1}
              aria-label={nextLabel}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="cv-interests" ref={railRef} onScroll={onScroll}>
          {visible.map((item, position) => (
            <article
              className="cv-interest"
              id={idOf('card', item.key)}
              key={item.key}
              style={{ '--tone': item.tone }}
              // Off screen means off limits: without this, tabbing forward
              // from the dots lands in a card the rail has scrolled past, and
              // the browser pulls the page sideways to show it.
              inert={at === position ? undefined : ''}
            >
              {renderCard(item, position)}
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default SpotlightRail;
