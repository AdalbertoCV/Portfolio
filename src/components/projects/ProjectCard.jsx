import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import PlayGlyph from './PlayGlyph';
import ProjectGlyph, { languageColor } from './ProjectGlyph';

/* ==========================================================================
   One card shape for every project.

   The only difference between a project with screenshots and one without is
   what fills the cover: real shots, or a signature generated from the name.
   Everything below the cover — title, slug, description, tags, language,
   link — is identical, so a repository never reads as a second-class entry.
   ======================================================================== */

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M9 3H3v6" />
    <path d="M15 21h6v-6" />
    <path d="M3 3l7 7" />
    <path d="M21 21l-7-7" />
  </svg>
);

const ProjectCard = ({ project, onExpand }) => {
  const { t } = useTranslation();
  const { key, copy, name, url, to, language, tags, shots, isPrivate } = project;
  // Which shot the cover is showing. Kept here (not in the lightbox) so the
  // card stays on whatever slide the reader left the expanded view on.
  const [index, setIndex] = useState(0);

  const title = t(`${copy}.title`);
  const hasShots = Array.isArray(shots) && shots.length > 0;

  return (
    <article className={`project-card${isPrivate && !url && !to ? ' is-private' : ''}`}>
      {hasShots ? (
        <button
          type="button"
          className="project-cover project-cover-button"
          onClick={() => onExpand({ images: shots, index, setIndex, label: title })}
          aria-label={`${title} — ${t('repos.viewShots')}`}
        >
          <img src={shots[index]} alt="" aria-hidden="true" loading="lazy" />
          <span className="project-cover-badge">
            <ExpandIcon />
            {shots.length}
          </span>
        </button>
      ) : (
        <div className="project-cover">
          {to ? <PlayGlyph /> : <ProjectGlyph name={name} language={language} />}
        </div>
      )}

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-slug">{name}</p>
        <p className="project-desc">{t(`${copy}.body`)}</p>
        <ul className="project-tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <div className="project-foot">
        <span className="project-lang">
          {/* The same colour that tints a generated cover, so the dot and the
              artwork are visibly the same fact. */}
          <span
            className="project-lang-dot"
            style={{ background: languageColor(language) }}
            aria-hidden="true"
          />
          {language}
        </span>

        {to ? (
          // Internal: the game is two clicks away on this same site, so it
          // gets a router link and its own verb rather than "view repository".
          <Link className="project-open" to={to} data-key={key}>
            {t('repos.playIt')}
            <ArrowRight />
          </Link>
        ) : url ? (
          // Stretched link: the anchor's ::after covers the whole card, so the
          // card is clickable without nesting the cover button inside a link
          // (which is invalid, and would swallow the lightbox).
          <a
            className="project-open"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-key={key}
          >
            {t('repos.viewRepo')}
            <ArrowUpRight />
          </a>
        ) : (
          <span className="project-private">
            <LockIcon />
            {t('repos.privateLabel')}
          </span>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
