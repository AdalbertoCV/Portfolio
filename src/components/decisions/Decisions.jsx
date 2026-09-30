import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import ENTRIES, { TONES } from './entries';
import DecisionTree from './DecisionTree';
import { useLive } from '../library/SpotlightRail';
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
  const [liveRef, live] = useLive();
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // The tree beside the log follows the entry being read: whichever one crosses
  // a line a little above the middle of the screen is the current one. Between
  // two entries nothing crosses it, and the last one stays.
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (hits) => {
        hits.forEach((hit) => {
          if (hit.isIntersecting) setActive(Number(hit.target.dataset.index));
        });
      },
      { rootMargin: '-38% 0px -52% 0px' },
    );
    [...list.children].forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // A node in the tree takes the reader to its entry.
  const goTo = useCallback((index) => {
    const node = listRef.current?.children[index];
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const treeEntries = ENTRIES.map(({ id, date, where }) => ({
    id,
    tone: TONES[where] || '#22d3ee',
    year: /^\d/.test(date) ? date : t(`decisions.dates.${date}`),
    short: where.toUpperCase(),
    options: tl(`decisions.items.${id}.options`).length,
    title: t(`decisions.items.${id}.title`),
  }));

  return (
    <div className="dec-page">
      <Reveal className="dec-head">
        <span className="hub-badge">{t('decisions.badge')}</span>
        <h1 className="dec-title">{t('decisions.title')}</h1>
        <p className="dec-lede">{t('decisions.lede')}</p>
        <p className="dec-note">{t('decisions.note')}</p>
      </Reveal>

      <div ref={liveRef} className="dec-layout">
      <DecisionTree
        entries={treeEntries}
        active={active}
        live={live}
        onSelect={goTo}
        subject={treeEntries[active] ? `${treeEntries[active].year} · ${t(`decisions.where.${ENTRIES[active].where}`)}` : ""}
        meta={
          <>
            <b>{treeEntries.length}</b> {t('decisions.treeCount')}
          </>
        }
      />
      <ol className="dec-list" ref={listRef}>
        {ENTRIES.map(({ id, date, where, tags }, index) => (
          <Reveal as="li" className="dec-entry" key={id} data-index={index} id={`decision-${id}`}>
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
      </div>

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
