import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import CoffeeCup from './CoffeeCup';
import PROBLEMS from './problems';
import './study.css';

/* ==========================================================================
   STUDY ZONE

   Ten problems with their solutions, for whoever is learning this. The rest
   of the site argues that the work is good; this page does not argue anything
   — it is the only one here written for somebody who has not built any of it
   yet.

   Two rules shaped it. The hint and the solution are folded, because a page
   that shows you the answer next to the question has taught you nothing — the
   value is in the minute you spend stuck, and the fold is what protects that
   minute. And nothing on it is phrased as a test: no scores, no timer, no
   "if you cannot do this". Getting stuck is the job, and the page says so.
   ========================================================================= */

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M19 12H6" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const Study = () => {
  const { t, tl } = useTranslation();
  const navigate = useNavigate();
  const { key } = useLocation();
  const goBack = () => (key === 'default' ? navigate('/') : navigate(-1));

  return (
    <div className="study-page">
      <Reveal className="study-head">
        <div className="study-head-copy">
          <span className="hub-badge">{t('study.badge')}</span>
          <h1 className="study-title">{t('study.title')}</h1>
          <p className="study-lede">{t('study.lede')}</p>
          <p className="study-note">{t('study.note')}</p>
        </div>
        <CoffeeCup />
      </Reveal>

      <ol className="study-list">
        {PROBLEMS.map(({ id, level, tags, code }, index) => (
          <Reveal as="li" className="study-problem" key={id}>
            <div className="study-problem-head">
              <span className="study-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="study-problem-title">{t(`study.items.${id}.title`)}</h2>
                <p className="study-meta">
                  <span className={`study-level is-${level}`}>{t(`study.levels.${level}`)}</span>
                  {tags.map((tag) => (
                    <span className="study-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <p className="study-statement">{t(`study.items.${id}.statement`)}</p>

            {/* Native disclosure: it is keyboard-operable and linkable without
                a line of JavaScript, and the browser already knows how it
                should behave. */}
            <details className="study-fold">
              <summary>{t('study.hintLabel')}</summary>
              <p className="study-hint">{t(`study.items.${id}.hint`)}</p>
            </details>

            <details className="study-fold">
              <summary>{t('study.solutionLabel')}</summary>
              <pre className="study-code">
                <code>{code}</code>
              </pre>
              {tl(`study.items.${id}.solution`).map((paragraph) => (
                <p className="study-why" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </details>
          </Reveal>
        ))}
      </ol>

      <Reveal className="study-foot">
        <p className="study-closing">{t('study.closing')}</p>
        <button type="button" className="study-back" onClick={goBack}>
          <ArrowLeft />
          {t('study.back')}
        </button>
      </Reveal>
    </div>
  );
};

export default Study;
