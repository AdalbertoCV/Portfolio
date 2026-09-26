import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { CONTACT_EMAIL, CV_FILENAME, CV_PATH, GITHUB, LINKEDIN, YOUTUBE } from '../../site';
import { openTerminal } from '../terminal/Terminal';
import './siteFooter.css';

/**
 * The foot of every page.
 *
 * It used to be the joke and nothing else — no links at all — which made every
 * page on the site end in a cul-de-sac. The joke is still here, because it is
 * the one place on the site that is not serious and it should stay that way;
 * it just no longer occupies the whole footer on its own.
 *
 * The carousel advances on click and never on a timer: a line of text that
 * swaps itself while somebody is reading it is a worse joke than the one it
 * replaces. Arrows wrap in both directions, so there is no dead end. The eleven
 * dots it used to carry are gone — eleven 7px controls for a gag was eleven
 * tab stops and eleven missed touch targets; the counter says the same thing.
 */

const EXPLORE = [
  { to: '/', key: 'nav.about' },
  { to: '/experience', key: 'nav.experience' },
  { to: '/ventures', key: 'nav.ventures' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/stack', key: 'nav.stack' },
  { to: '/contact', key: 'nav.contact' },
];

const REACH = [
  { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL, external: false },
  { href: LINKEDIN, label: 'LinkedIn', external: true },
  { href: GITHUB, label: 'GitHub', external: true },
  { href: YOUTUBE, label: 'YouTube', external: true },
];

const SiteFooter = () => {
  const { t, tl } = useTranslation();
  const jokes = tl('footer.jokes');
  const [index, setIndex] = useState(0);

  const move = (step) => setIndex((n) => (n + step + jokes.length) % jokes.length);

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <p className="site-footer-name">Adal Cerrillo</p>
          <p className="site-footer-tagline">{t('footer.tagline')}</p>
        </div>

        <nav className="site-footer-nav" aria-label={t('footer.exploreLabel')}>
          <h2 className="site-footer-label">{t('footer.exploreLabel')}</h2>
          <ul>
            {EXPLORE.map(({ to, key }) => (
              <li key={to}>
                <Link to={to}>{t(key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer-nav">
          <h2 className="site-footer-label">{t('footer.reachLabel')}</h2>
          <ul>
            {REACH.map(({ href, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-nav">
          <h2 className="site-footer-label">{t('footer.cvLabel')}</h2>
          <ul>
            <li>
              <a href={CV_PATH} download={CV_FILENAME}>
                {t('footer.cvDownload')}
              </a>
            </li>
            <li>
              <a href={CV_PATH} target="_blank" rel="noopener noreferrer">
                {t('footer.cvOpen')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer-inner">
        <div className="site-footer-joke">
          <span className="site-footer-kicker">{t('footer.kicker')}</span>
          <p className="site-footer-text">{jokes[index]}</p>
          {/* The door to the game. Here rather than in the navigation: this is
              the corner of the site that is already not serious. */}
          <div className="site-footer-extras">
            <Link className="site-footer-play" to="/study">
              {t('footer.study')}
            </Link>
            <Link className="site-footer-play" to="/decisions">
              {t('footer.decisions')}
            </Link>
            <Link className="site-footer-play" to="/play">
              {t('footer.play')}
            </Link>
          {/* The other way around the site, for whoever would rather type than
              click. Quiet: the people who will use it mostly pressed ⌘K
              before reading this. */}
            <button type="button" className="term-hint" onClick={openTerminal}>
              {t('term.footer')}
              <kbd>⌘K</kbd>
            </button>
          </div>
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

          <span className="site-footer-count">
            {index + 1} / {jokes.length}
          </span>

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

      <p className="site-footer-credit">
        {t('footer.credit')}
        {' · '}
        <Link to="/changelog">{t('footer.changelog')}</Link>
      </p>
    </footer>
  );
};

export default SiteFooter;
