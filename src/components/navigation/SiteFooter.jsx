import { useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import './siteFooter.css';

/**
 * The foot of every page, and the only place on the site that is not serious.
 *
 * The carousel advances on click and never on a timer: a line of text that
 * swaps itself while somebody is reading it is a worse joke than the one it
 * replaces. Arrows wrap in both directions, so there is no dead end.
 */
const SiteFooter = () => {
  const { t, tl } = useTranslation();
  const jokes = tl('footer.jokes');
  const [index, setIndex] = useState(0);

  const move = (step) => setIndex((n) => (n + step + jokes.length) % jokes.length);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-joke">
          <span className="site-footer-kicker">{t('footer.kicker')}</span>
          <p className="site-footer-text">{jokes[index]}</p>
        </div>

        <div className="site-footer-controls">
          <button
            type="button"
            className="site-footer-arrow"
            onClick={() => move(-1)}
            aria-label={t('footer.prev')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m14.5 5-7 7 7 7" />
            </svg>
          </button>

          {/* Dots double as the position readout, so the row does not need a
              "3 of 5" label in two languages. */}
          <div className="site-footer-dots">
            {jokes.map((joke, i) => (
              <button
                type="button"
                key={joke}
                className="site-footer-dot"
                data-active={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                aria-label={`${t('footer.go')} ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="site-footer-arrow"
            onClick={() => move(1)}
            aria-label={t('footer.next')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9.5 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="site-footer-credit">{t('footer.credit')}</p>
    </footer>
  );
};

export default SiteFooter;
