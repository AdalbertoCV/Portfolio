import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import READING from '../about/reading';
import BOOK_COVERS from '../about/bookCovers';
import ConceptIcon from '../about/ConceptIcons';

// The shelves work the way the stack does: an index of shelves, and only the
// shelf you pick in the panel. Open at once it was two hundred lines of book
// before a reader could decide to stop, and the page carried all of them
// whether they wanted one shelf or all ten.
//
// The stack also has a search, and a shelf list does not need one: ten named
// shelves with twenty books each is a set you browse, not a wall you interrogate
// for one tile.

const ReadingExplorer = () => {
  const { t } = useTranslation();
  // Which shelf the panel shows. The first one, so the section is never an
  // empty frame waiting to be clicked.
  const [shelf, setShelf] = useState(READING[0].id);

  // On a phone the index is a row that scrolls sideways, so the shelf being
  // shown can end up off-screen after an arrow key. Only the rail moves:
  // scrollIntoView would take the page with it.
  useEffect(() => {
    const tab = document.getElementById(`reading-tab-${shelf}`);
    const rail = tab?.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: Math.max(0, tab.offsetLeft - 24), behavior: 'smooth' });
  }, [shelf]);

  // Arrow keys walk the index, which is what a tablist is expected to do.
  const stepShelf = (event, id) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = READING.findIndex((entry) => entry.id === id);
    const next = READING[(index + step + READING.length) % READING.length];
    setShelf(next.id);
    document.getElementById(`reading-tab-${next.id}`)?.focus();
  };

  const current = READING.find((entry) => entry.id === shelf) || READING[0];

  return (
    <div className="stack">
      <div className="stack-index" role="tablist" aria-label={t('cv.readingTitle')}>
        {READING.map(({ id }) => (
          <button
            type="button"
            role="tab"
            id={`reading-tab-${id}`}
            aria-selected={shelf === id}
            aria-controls={`reading-panel-${id}`}
            tabIndex={shelf === id ? 0 : -1}
            className="stack-tab"
            key={id}
            onClick={() => setShelf(id)}
            onKeyDown={(event) => stepShelf(event, id)}
          >
            <span className="stack-tab-name">{t(`cv.readingGroups.${id}`)}</span>
          </button>
        ))}
      </div>

      <div
        className="stack-panel"
        role="tabpanel"
        id={`reading-panel-${shelf}`}
        aria-labelledby={`reading-tab-${shelf}`}
        key={shelf}
      >
        <p className="reading-shelf-note">{t(`cv.readingNotes.${shelf}`)}</p>
        <ul className="reading-list">
          {current.books.map(({ title, author, icon }) => (
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
      </div>
    </div>
  );
};

export default ReadingExplorer;
