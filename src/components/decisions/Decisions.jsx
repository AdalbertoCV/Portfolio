import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import ENTRIES from './entries';
import './decisions.css';

/* ==========================================================================
   DECISIONS

   The catalogue proves what was built and the stack proves what with. Neither
   shows the part a senior reader is actually assessing: what was chosen, over
   what, and why.

   Most of this engineer's work is in private repositories, so the code cannot
   be the evidence. The reasoning can — and reasoning is the thing a stack of
   395 marks can never demonstrate on its own.
   ======================================================================== */

// The four parts of an entry, in the order they are worth reading: what else
// was on the table, what was taken, the reason, and the bill.
const PARTS = ['options', 'chose', 'why', 'today'];

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M19 12H6" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

// Back where the reader came from. React Router marks the first entry of a
// session 'default', which is how we tell "they navigated here" from "they
// opened this link cold" — the second case has nothing to go back to, so it
// goes home instead.
const useGoBack = () => {
  const navigate = useNavigate();
  const { key } = useLocation();
  return () => (key === 'default' ? navigate('/') : navigate(-1));
};

const Decisions = () => {
  const { t, tl } = useTranslation();
  const goBack = useGoBack();

  return (
    <div className="dec-page">
      <Reveal className="dec-head">
        <span className="hub-badge">{t('decisions.badge')}</span>
        <h1 className="dec-title">{t('decisions.title')}</h1>
        <p className="dec-lede">{t('decisions.lede')}</p>
        <p className="dec-note">{t('decisions.note')}</p>
      </Reveal>

      <ol className="dec-list">
        {ENTRIES.map(({ id, date, where, tags }) => (
          <Reveal as="li" className="dec-entry" key={id}>
            <div className="dec-meta">
              <span className="dec-date">
                {/^\d/.test(date) ? date : t(`decisions.dates.${date}`)}
              </span>
              <span className="dec-where">{t(`decisions.where.${where}`)}</span>
            </div>

            <div className="dec-body">
              <h2 className="dec-entry-title">{t(`decisions.items.${id}.title`)}</h2>

              <dl className="dec-parts">
                {PARTS.map((part) => {
                  // `options` is a list; the other three are a paragraph each.
                  const isList = part === 'options';
                  return (
                    <div className="dec-part" key={part}>
                      <dt>{t(`decisions.parts.${part}`)}</dt>
                      <dd>
                        {isList ? (
                          <ul className="dec-options">
                            {tl(`decisions.items.${id}.options`).map((option) => (
                              <li key={option}>{option}</li>
                            ))}
                          </ul>
                        ) : (
                          t(`decisions.items.${id}.${part}`)
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <ul className="dec-tags">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="dec-foot">
        <p className="dec-more">{t('decisions.more')}</p>
        <button type="button" className="dec-back" onClick={goBack}>
          <ArrowLeft />
          {t('decisions.back')}
        </button>
      </Reveal>
    </div>
  );
};

export default Decisions;
