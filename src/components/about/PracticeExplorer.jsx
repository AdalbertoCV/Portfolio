import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowLeft, ArrowRight } from '../brand/parts';
import ConceptIcon from './ConceptIcons';
import PRACTICE_ICONS from './practiceIcons';

// The same shape as the stack and the library: an index of areas, and only the
// area you pick in the panel. The three groups this section used to open all at
// once were thirty-three hairlines under one question — is this a person who
// designs systems, or one who ships them? The answer is all of them, but it has
// to be asked one at a time or the section answers a question nobody asked.
//
// The index is the claim: six ways of working, each with its own rows, each one
// a list of things already in use rather than a keyword wall. It is a rail of
// cards rather than a column of tabs, because a column is a table of contents:
// it asks the reader to scroll back up to change area, and on a phone it was a
// screen of index above the answer.

const GROUPS = ['systems', 'ai', 'security', 'delivery', 'product', 'breadth'];

const PracticeExplorer = () => {
  const { t, tl } = useTranslation();
  // Which area the panel shows. The first one, so the section is never an empty
  // frame waiting to be clicked.
  const [group, setGroup] = useState(GROUPS[0]);
  const railRef = useRef(null);
  // Six cards that all fit need no arrows: two buttons that move nothing are
  // worse than no buttons. Measured, not assumed, because it depends on the
  // width of the window the reader arrived with.
  const [overflows, setOverflows] = useState(false);

  if (process.env.NODE_ENV === 'development') {
    GROUPS.forEach((id) => {
      const items = tl(`cv.practice.${id}Items`).length;
      const icons = PRACTICE_ICONS[id]?.length || 0;
      if (items !== icons) {
        console.warn(`[practice] ${id}: ${items} items but ${icons} icons`);
      }
    });
  }

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setOverflows(rail.scrollWidth > rail.clientWidth + 1);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    // The rail changes width when a font lands or the window is rotated, which
    // is not a resize event in every browser.
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (observer && railRef.current) observer.observe(railRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      if (observer) observer.disconnect();
    };
  }, [measure]);

  // A swipe that only slides the strip while the panel keeps the old area is a
  // carousel that does nothing, and on a phone there is no other way to reach
  // the middle of the rail. So the area nearest the centre once the swipe
  // settles becomes the open one — the same thing a tap on a card does.
  const settle = useRef(null);

  const onRailScroll = () => {
    measure();
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail || rail.scrollWidth <= rail.clientWidth + 1) return;
      const middle = rail.scrollLeft + rail.clientWidth / 2;
      let closest = GROUPS[0];
      let distance = Infinity;
      GROUPS.forEach((id) => {
        const card = document.getElementById(`practice-tab-${id}`);
        if (!card) return;
        const offset = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
        if (offset < distance) {
          distance = offset;
          closest = id;
        }
      });
      setGroup((current) => (current === closest ? current : closest));
    }, 180);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  // Keep the open card in view after any change of area, by keyboard, by arrow
  // or by swipe. Only the rail moves: scrollIntoView would take the page with
  // it. Centred when there is room for that, against an end when there is not.
  useEffect(() => {
    const rail = railRef.current;
    const card = document.getElementById(`practice-tab-${group}`);
    if (!rail || !card) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    if (!max) return;
    const left = Math.min(
      Math.max(0, card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2),
      max
    );
    rail.scrollTo({ left, behavior: 'smooth' });
  }, [group]);

  // Arrow keys walk the index, which is what a tablist is expected to do, and
  // they wrap: the rail is horizontal, so there is no end to fall off.
  const walk = (event, id) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = GROUPS.indexOf(id);
    const next = GROUPS[(index + step + GROUPS.length) % GROUPS.length];
    setGroup(next);
    document.getElementById(`practice-tab-${next}`)?.focus();
  };

  // The arrows stop at the ends instead of wrapping: a carousel that jumps from
  // the last card back to the first is a cut, not a slide.
  const nudge = (step) => {
    const next = GROUPS[GROUPS.indexOf(group) + step];
    if (next) setGroup(next);
  };

  return (
    <div className="practice-explorer">
      {overflows && (
        <div className="practice-rail-nav">
          <button
            type="button"
            className="practice-rail-step"
            onClick={() => nudge(-1)}
            disabled={group === GROUPS[0]}
            aria-label={t('cv.practice.prevArea')}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="practice-rail-step"
            onClick={() => nudge(1)}
            disabled={group === GROUPS[GROUPS.length - 1]}
            aria-label={t('cv.practice.nextArea')}
          >
            <ArrowRight />
          </button>
        </div>
      )}

      <div
        className="practice-rail"
        role="tablist"
        aria-label={t('cv.listsLabel')}
        aria-orientation="horizontal"
        ref={railRef}
        onScroll={onRailScroll}
      >
        {GROUPS.map((id) => (
          <button
            type="button"
            role="tab"
            id={`practice-tab-${id}`}
            aria-selected={group === id}
            aria-controls={`practice-panel-${id}`}
            tabIndex={group === id ? 0 : -1}
            className="practice-card"
            key={id}
            onClick={() => setGroup(id)}
            onKeyDown={(event) => walk(event, id)}
          >
            <span className="practice-card-name">{t(`cv.practice.${id}`)}</span>
          </button>
        ))}
      </div>

      <div
        className="stack-panel"
        role="tabpanel"
        id={`practice-panel-${group}`}
        aria-labelledby={`practice-tab-${group}`}
        key={group}
      >
        {/* What this group is for, in one line, read once before the rows take
            over. The library panel does the same with the shelf note. */}
        <p className="practice-note">{t(`cv.practice.${group}Lede`)}</p>
        <ul className="practice-list">
          {tl(`cv.practice.${group}Items`).map((item, index) => (
            <li key={item}>
              <ConceptIcon className="list-icon" name={PRACTICE_ICONS[group][index]} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PracticeExplorer;
