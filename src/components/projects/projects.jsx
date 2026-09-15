import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight, Reveal, TalkBand } from '../brand/parts';
import ProjectCard from './ProjectCard';
import { languageColor } from './ProjectGlyph';
import CATALOGUE, { LANGUAGES, PROJECT_COUNT } from './catalogue';
import './projects.css';

const SWIPE_THRESHOLD = 50;

// Matches a project against the search box. Name, language and tags rather
// than the body copy: a reader typing "django" wants the Django projects, not
// every paragraph that mentions it.
const matches = (project, query, language) => {
  if (language && project.language !== language) return false;
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [project.name, project.language, ...(project.tags || [])]
    .filter(Boolean)
    .some((field) => field.toLowerCase().includes(needle));
};
const MAX_SCROLLBAR_WIDTH = 40;

const ChevronIcon = ({ direction }) => (
  <svg className="chevron-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={direction === 'left' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

const CloseIcon = () => (
  <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

const ExpandIcon = () => (
  <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9 3H3v6" />
    <path d="M15 21h6v-6" />
    <path d="M3 3l7 7" />
    <path d="M21 21l-7-7" />
  </svg>
);

const CollapseIcon = () => (
  <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3 9h6V3" />
    <path d="M21 15h-6v6" />
    <path d="M10 10L3 3" />
    <path d="M14 14l7 7" />
  </svg>
);

const MyProjects = () => {
  const { t } = useTranslation();
  // Holds the whole slide list, not a single image, so the expanded view can be
  // navigated without closing it. `setIndex` belongs to the card that opened
  // the view, so its cover stays on whatever slide you leave on.
  const [lightbox, setLightbox] = useState(null);
  // These are ~1920x890 desktop screenshots. Fitted to a portrait phone they
  // come out around a fifth of the screen height, which is unreadable, so the
  // expanded view can switch from fit-the-whole-thing to fill-the-height and
  // pan sideways.
  const [zoomed, setZoomed] = useState(false);
  // The catalogue carries 46 tags and nine languages and used none of them.
  // Twenty cards is more than a reader scans, and "show me the Django ones" is
  // the question they actually arrive with.
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [canZoom, setCanZoom] = useState(false);
  const touchStartX = useRef(null);
  const viewportRef = useRef(null);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setZoomed(false);
  }, []);

  const stepLightbox = useCallback((delta) => {
    setZoomed(false);
    setLightbox((current) => {
      if (!current) return current;
      const nextIndex = (current.index + delta + current.images.length) % current.images.length;
      return { ...current, index: nextIndex };
    });
  }, []);

  // Whether filling the height would actually buy anything on this screen.
  const measureFit = (event) => {
    const img = event.currentTarget;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const narrow = vw <= 768;
    const availableW = Math.min(1200, vw * (narrow ? 0.94 : 0.88));
    const availableH = vh * (narrow ? 0.68 : 0.78);
    const fittedH = Math.min(availableH, availableW / (img.naturalWidth / img.naturalHeight));
    setCanZoom(fittedH < vh * 0.6);
  };

  // Start a zoom in the middle of the shot rather than at its left edge.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !zoomed) return;
    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
  }, [zoomed]);

  // Mirror the expanded slide back onto the card that opened it.
  useEffect(() => {
    if (!lightbox) return;
    lightbox.setIndex(lightbox.index);
  }, [lightbox]);

  // Keyed on open/closed rather than on `lightbox` itself, so stepping through
  // slides doesn't tear the scroll lock down and put it back on every press.
  const isOpen = lightbox !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

    // Hiding the overflow takes the scrollbar away, which widens the viewport
    // and makes the fixed navbar and every centred element jump sideways on
    // open and back again on close. Hold the width it freed while locked.
    // Clamped: this difference is only the scrollbar under normal conditions,
    // and a bogus reading applied as padding would shove the whole page across.
    const measured = window.innerWidth - root.clientWidth;
    const gutter = measured > 0 && measured <= MAX_SCROLLBAR_WIDTH ? measured : 0;
    if (gutter > 0) {
      document.body.style.paddingRight = `${gutter}px`;
      root.style.setProperty('--scroll-lock-gutter', `${gutter}px`);
    }

    // Hand the overlay the area that is actually visible. Sizing it off the
    // initial containing block put it wider than the window, which centred the
    // image on the wrong middle and pushed the controls off the right edge.
    const syncViewport = () => {
      root.style.setProperty('--viewport-w', `${root.clientWidth}px`);
      root.style.setProperty('--viewport-h', `${root.clientHeight}px`);
    };
    syncViewport();
    window.addEventListener('resize', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      root.style.removeProperty('--scroll-lock-gutter');
      root.style.removeProperty('--viewport-w');
      root.style.removeProperty('--viewport-h');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') stepLightbox(1);
      if (event.key === 'ArrowLeft') stepLightbox(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, stepLightbox]);

  const handleTouchStart = (event) => {
    // While zoomed a drag pans the image, so it must not also change slide.
    touchStartX.current = zoomed ? null : event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const travelled = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
    stepLightbox(travelled < 0 ? 1 : -1);
  };

  const hasMultiple = lightbox && lightbox.images.length > 1;

  const filtered = CATALOGUE.map((group) => ({
    ...group,
    projects: group.projects.filter((project) => matches(project, query, language)),
  })).filter((group) => group.projects.length > 0);

  const shown = filtered.reduce((total, group) => total + group.projects.length, 0);
  const filtering = Boolean(query || language);

  return (
    <div className="projects-page">
      <Reveal className="projects-header">
        <span className="hub-badge">{t('repos.badge')}</span>
        <h1 className="projects-title">{t('repos.title')}</h1>
        <p className="projects-lede">{t('repos.lede')}</p>
        <p className="projects-count">
          <strong>{filtering ? `${shown} / ${PROJECT_COUNT}` : PROJECT_COUNT}</strong>{' '}
          {t('repos.countLabel')}
        </p>
      </Reveal>

      <Reveal className="projects-filter">
        <label className="projects-search">
          <span className="sr-only">{t('repos.searchLabel')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
               strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('repos.searchPlaceholder')}
          />
        </label>

        {/* Languages rather than all 46 tags: nine chips is a row, and the tags
            are reachable through the search box anyway. */}
        <div className="projects-langs" role="group" aria-label={t('repos.filterLabel')}>
          <button
            type="button"
            className="projects-lang"
            data-active={language === '' ? 'true' : undefined}
            aria-pressed={language === ''}
            onClick={() => setLanguage('')}
          >
            {t('repos.allLanguages')}
          </button>
          {LANGUAGES.map((name) => (
            <button
              type="button"
              className="projects-lang"
              key={name}
              data-active={language === name ? 'true' : undefined}
              aria-pressed={language === name}
              onClick={() => setLanguage(language === name ? '' : name)}
            >
              {name}
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.map(({ id, projects, wide, compact }) => (
        <Reveal className="project-group" key={id}>
          <h2 className="brand-stack-title">{t(`repos.groups.${id}`)}</h2>
          {compact ? (
            <ul className="project-compact">
              {projects.map(({ key, name, url, language: lang, tags }) => (
                <li key={key}>
                  <span className="project-compact-dot" style={{ background: languageColor(lang) }} />
                  <span className="project-compact-copy">
                    <span className="project-compact-name">{t(`repos.items.${key}.title`)}</span>
                    {/* Several entries carry their own language among the tags,
                        so it is not printed twice. */}
                    <span className="project-compact-meta">
                      {[lang, ...(tags || []).filter((tag) => tag !== lang)].join(' · ')}
                    </span>
                  </span>
                  {url ? (
                    <a
                      className="project-compact-link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                      <ArrowUpRight />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className={`project-grid${wide ? ' is-wide' : ''}`}>
              {projects.map((project) => (
                <ProjectCard project={project} onExpand={setLightbox} key={project.key} />
              ))}
            </div>
          )}
        </Reveal>
      ))}

      {shown === 0 && (
        <Reveal className="projects-empty">
          <p>{t('repos.noMatches')}</p>
          <button
            type="button"
            className="tech-toggle"
            onClick={() => {
              setQuery('');
              setLanguage('');
            }}
          >
            {t('repos.clearFilters')}
          </button>
        </Reveal>
      )}

      <TalkBand />

      {/* Portalled to <body>: the page is a stacking context, so a nested
          overlay would render underneath the navbar. */}
      {lightbox &&
        createPortal(
          <div className="fullscreen-overlay" onClick={closeLightbox}>
            <button
              className="fullscreen-close"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              aria-label={t('common.close')}
            >
              <CloseIcon />
            </button>

            {canZoom && (
              <button
                className="fullscreen-zoom"
                onClick={(event) => {
                  event.stopPropagation();
                  setZoomed((current) => !current);
                }}
                aria-label={zoomed ? t('common.zoomOut') : t('common.zoomIn')}
              >
                {zoomed ? <CollapseIcon /> : <ExpandIcon />}
              </button>
            )}

            {hasMultiple && (
              <button
                className="fullscreen-nav left"
                onClick={(event) => {
                  event.stopPropagation();
                  stepLightbox(-1);
                }}
                aria-label={t('common.prevShot')}
              >
                <ChevronIcon direction="left" />
              </button>
            )}

            <figure
              className={`fullscreen-figure${zoomed ? ' is-zoomed' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="fullscreen-viewport"
                ref={viewportRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={`${lightbox.label} ${lightbox.index + 1} ${t('common.of')} ${lightbox.images.length}`}
                  className="fullscreen-image"
                  onLoad={measureFit}
                  onClick={canZoom ? () => setZoomed((current) => !current) : undefined}
                  style={canZoom ? { cursor: zoomed ? 'zoom-out' : 'zoom-in' } : undefined}
                />
              </div>
              <figcaption className="fullscreen-counter">
                {lightbox.label}
                {hasMultiple && (
                  <>
                    <span aria-hidden="true">·</span>
                    <strong>{lightbox.index + 1}</strong> / {lightbox.images.length}
                  </>
                )}
                {canZoom && (
                  <span className="fullscreen-hint">
                    {zoomed ? t('common.dragToExplore') : t('common.tapToZoom')}
                  </span>
                )}
              </figcaption>
            </figure>

            {hasMultiple && (
              <button
                className="fullscreen-nav right"
                onClick={(event) => {
                  event.stopPropagation();
                  stepLightbox(1);
                }}
                aria-label={t('common.nextShot')}
              >
                <ChevronIcon direction="right" />
              </button>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default MyProjects;
