import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import ConceptIcon from './ConceptIcons';
import PRACTICE_ICONS from './practiceIcons';

// The same shape as the stack and the library: an index of areas, and only the
// area you pick in the panel. Three groups open at once were sixty-two hairlines
// under one question — is this a person who designs systems, or one who ships
// them? The answer is all of them, but it has to be asked one at a time or the
// section answers a question nobody asked.
//
// The index is the claim: six ways of working, each with its own rows, each one
// a list of things already in use rather than a keyword wall.

const GROUPS = ['systems', 'ai', 'security', 'delivery', 'product', 'breadth'];

const PracticeExplorer = () => {
  const { t, tl } = useTranslation();
  // Which area the panel shows. The first one, so the section is never an empty
  // frame waiting to be clicked.
  const [group, setGroup] = useState(GROUPS[0]);

  if (process.env.NODE_ENV === 'development') {
    GROUPS.forEach((id) => {
      const items = tl(`cv.practice.${id}Items`).length;
      const icons = PRACTICE_ICONS[id]?.length || 0;
      if (items !== icons) {
        console.warn(`[practice] ${id}: ${items} items but ${icons} icons`);
      }
    });
  }

  // On a phone the index is a row that scrolls sideways, so the tab being
  // shown can end up off-screen after an arrow key. Only the rail moves:
  // scrollIntoView would take the page with it.
  useEffect(() => {
    const tab = document.getElementById(`practice-tab-${group}`);
    const rail = tab?.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: Math.max(0, tab.offsetLeft - 24), behavior: 'smooth' });
  }, [group]);

  // Arrow keys walk the index, which is what a tablist is expected to do.
  const stepGroup = (event, id) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = GROUPS.indexOf(id);
    const next = GROUPS[(index + step + GROUPS.length) % GROUPS.length];
    setGroup(next);
    document.getElementById(`practice-tab-${next}`)?.focus();
  };

  return (
    <div className="stack">
      <div className="stack-index" role="tablist" aria-label={t('cv.listsLabel')}>
        {GROUPS.map((id) => (
          <button
            type="button"
            role="tab"
            id={`practice-tab-${id}`}
            aria-selected={group === id}
            aria-controls={`practice-panel-${id}`}
            tabIndex={group === id ? 0 : -1}
            className="stack-tab"
            key={id}
            onClick={() => setGroup(id)}
            onKeyDown={(event) => stepGroup(event, id)}
          >
            <span className="stack-tab-name">{t(`cv.practice.${id}`)}</span>
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
