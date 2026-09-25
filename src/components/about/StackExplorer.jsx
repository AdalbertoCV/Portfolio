import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import TECH_GROUPS from './techStack';
import TechMark from './TechMark';
import { searchStack } from './stackSearch';

// The stack wall: an index of groups, one group in the panel, and a search
// across all of them. With eleven hundred tiles, "is X on here?" is the
// question most visitors arrive with, and no index answers it faster than
// typing the name.

const TOTAL = TECH_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const SearchIcon = () => (
  <svg className="stack-search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 16l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StackExplorer = () => {
  const { t } = useTranslation();
  // Which group the panel shows. The first one, so the section is never an
  // empty frame waiting to be clicked — and it is The Stars.
  const [group, setGroup] = useState(TECH_GROUPS[0].id);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const results = searchStack(TECH_GROUPS, query);
  const searching = results !== null;
  const counts = searching ? Object.fromEntries(results.map((r) => [r.id, r.items.length])) : {};
  const found = searching ? results.reduce((sum, r) => sum + r.items.length, 0) : 0;

  // On a phone the index is a row that scrolls sideways, so the group being
  // shown can end up off-screen after an arrow key. Only the rail moves:
  // scrollIntoView would take the page with it.
  useEffect(() => {
    const tab = document.getElementById(`stack-tab-${group}`);
    const rail = tab?.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: Math.max(0, tab.offsetLeft - 24), behavior: 'smooth' });
  }, [group]);

  // "/" jumps to the search from anywhere on the page, the way it does on most
  // sites with one — unless the reader is already typing somewhere.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName || '') || target.isContentEditable) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Arrow keys walk the index, which is what a tablist is expected to do.
  const stepGroup = (event, id) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = TECH_GROUPS.findIndex((entry) => entry.id === id);
    const next = TECH_GROUPS[(index + step + TECH_GROUPS.length) % TECH_GROUPS.length];
    setGroup(next.id);
    document.getElementById(`stack-tab-${next.id}`)?.focus();
  };

  // Picking a group while searching ends the search there: the reader has
  // chosen where to look.
  const openGroup = (id) => {
    setQuery('');
    setGroup(id);
  };

  return (
    <div className="stack-explorer">
      <div className="stack-search">
        <label className="sr-only" htmlFor="stack-search">
          {t('cv.skillsSearchLabel')}
        </label>
        <SearchIcon />
        <input
          ref={inputRef}
          id="stack-search"
          className="stack-search-input"
          type="search"
          autoComplete="off"
          spellCheck="false"
          placeholder={t('cv.skillsSearchPlaceholder').replace('{count}', TOTAL)}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setQuery('');
            }
          }}
        />
        {query ? (
          <button type="button" className="stack-search-clear" onClick={() => setQuery('')} aria-label={t('cv.skillsSearchClear')}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <kbd className="stack-search-key" aria-hidden="true">
            /
          </kbd>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {searching ? t('cv.skillsSearchCount').replace('{count}', found) : ''}
      </p>

      <div className="stack">
        <div className="stack-index" role="tablist" aria-label={t('cv.skillsTitle')}>
          {TECH_GROUPS.map(({ id }) => (
            <button
              type="button"
              role="tab"
              id={`stack-tab-${id}`}
              aria-selected={!searching && group === id}
              aria-controls={searching ? undefined : `stack-panel-${id}`}
              tabIndex={group === id ? 0 : -1}
              className="stack-tab"
              data-empty={searching && !counts[id] ? 'true' : undefined}
              key={id}
              onClick={() => openGroup(id)}
              onKeyDown={(event) => stepGroup(event, id)}
            >
              <span className="stack-tab-name">{t(`skills.groups.${id}`)}</span>
              {searching && counts[id] ? <span className="stack-tab-count">{counts[id]}</span> : null}
            </button>
          ))}
        </div>

        {searching ? (
          <section className="stack-results" aria-label={t('cv.skillsSearchResults')}>
            {results.length ? (
              results.map(({ id, items }) => (
                <div className="stack-results-group" key={id}>
                  <h3 className="stack-results-title">
                    {t(`skills.groups.${id}`)}
                    <span className="stack-results-count">{items.length}</span>
                  </h3>
                  <ul className="stack-marks">
                    {items.map((item) => (
                      <TechMark item={item} t={t} key={item.name} />
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="stack-results-empty">{t('cv.skillsSearchEmpty').replace('{query}', query.trim())}</p>
            )}
          </section>
        ) : (
          <div
            className="stack-panel"
            role="tabpanel"
            id={`stack-panel-${group}`}
            aria-labelledby={`stack-tab-${group}`}
            key={group}
          >
            <ul className="stack-marks">
              {(TECH_GROUPS.find((entry) => entry.id === group)?.items || []).map((item) => (
                <TechMark item={item} t={t} key={item.name} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackExplorer;
