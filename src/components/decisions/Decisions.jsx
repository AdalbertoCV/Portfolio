import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, Reveal } from '../brand/parts';
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

const Decisions = () => {
  const { t, tl } = useTranslation();

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
              <span className="dec-date">{date}</span>
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
        <Link className="dec-back" to="/projects">
          {t('decisions.toProjects')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default Decisions;
