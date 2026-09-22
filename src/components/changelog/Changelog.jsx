import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import UPDATES, { formatDate } from '../../updates';
import './changelog.css';

/* ==========================================================================
   CHANGELOG

   Notes about the site rather than about the work, which is exactly why this
   is a page of its own and not a block in the footer: it answers "is this
   still being worked on" for whoever wonders, and stays out of the way of
   everyone who does not.

   Reached from one small link in the credit line at the very bottom. That is
   the right amount of prominence for a page about the page.
   ========================================================================= */

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M19 12H6" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const Changelog = () => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const { key } = useLocation();
  const goBack = () => (key === 'default' ? navigate('/') : navigate(-1));

  return (
    <div className="clog-page">
      <Reveal className="clog-head">
        <span className="hub-badge">{t('changelog.badge')}</span>
        <h1 className="clog-title">{t('changelog.title')}</h1>
        <p className="clog-lede">{t('changelog.lede')}</p>
      </Reveal>

      <Reveal as="ol" className="clog-list">
        {UPDATES.map((entry) => (
          <li key={entry.date}>
            <time dateTime={entry.date}>{formatDate(entry.date, lang)}</time>
            <span>{entry[lang] || entry.es}</span>
          </li>
        ))}
      </Reveal>

      <Reveal className="clog-foot">
        <button type="button" className="clog-back" onClick={goBack}>
          <ArrowLeft />
          {t('changelog.back')}
        </button>
      </Reveal>
    </div>
  );
};

export default Changelog;
