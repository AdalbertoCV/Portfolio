import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { CONTACT_EMAIL } from '../../site';
import ContactChain from '../contact/ContactChain';

/* ==========================================================================
   Shared building blocks for the three brand pages. They exist so a brand page
   is a list of content decisions, not a pile of repeated markup — the pages
   differ in what they say and in their artwork, never in their scaffolding.
   ======================================================================== */

/**
 * Adds `is-visible` the first time the element enters the viewport, then stops
 * observing it. One-shot rather than a toggle: content that re-hides on scroll
 * up reads as a glitch, not as an effect.
 */
export const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // No IntersectionObserver (old browser, jsdom in tests): show the content
    // rather than leaving the whole page at opacity 0.
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      // Fires slightly before the element is fully on screen, so the motion has
      // finished by the time the reader's eye arrives.
      //
      // threshold stays at 0: a ratio threshold is a share of the ELEMENT, and
      // a section taller than the viewport can never reach it — on a phone the
      // interests grid runs to ~6700px against an 800px screen, so 0.1 was
      // unreachable and the whole section stayed at opacity 0. The rootMargin
      // below already supplies the early trigger that the threshold was for.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
};

export const Reveal = ({ as: Tag = 'div', stagger = false, className = '', children, ...rest }) => {
  const ref = useReveal();
  const classes = ['reveal', stagger ? 'reveal-stagger' : '', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
};

/**
 * True while the window matches the query. Follows the window, because a phone
 * turned on its side is a different width. jsdom has no matchMedia, so it is
 * false there and the wide layout renders.
 */
export const useMedia = (query) => {
  const [matches, setMatches] = useState(() => Boolean(window.matchMedia?.(query).matches));
  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return undefined;
    const on = () => setMatches(list.matches);
    on();
    list.addEventListener?.('change', on);
    return () => list.removeEventListener?.('change', on);
  }, [query]);
  return matches;
};

/**
 * A long block that a phone gets as a summary. On a wide screen it is just its
 * children, exactly as if it were not here. On a phone the children are not
 * rendered until the reader asks for them with the button, which sits where the
 * block would start, so the page below stays a few lines under the summary
 * instead of a few screens. The button keeps its place when the block opens, so
 * the reader can close it from the same spot.
 */
export const Collapsible = ({ label, closeLabel, children, query = '(max-width: 768px)' }) => {
  const narrow = useMedia(query);
  const [open, setOpen] = useState(false);
  if (!narrow) return children;
  return (
    <div className={`collapsible${open ? ' is-open' : ''}`}>
      <button type="button" className="collapsible-toggle" aria-expanded={open} onClick={() => setOpen((now) => !now)}>
        {open ? closeLabel : label}
        <Chevron />
      </button>
      {open ? <div className="collapsible-body">{children}</div> : null}
    </div>
  );
};

/**
 * Holds the rendering of a block of page until it is near. The home page is long,
 * and a phone was building every section of it (and the drawings inside them)
 * before it could paint the first one. A block wrapped in this is a blank of the
 * height it is expected to be until the reader is within a screen or so of it, or
 * a few seconds have passed and the browser has had time to paint what is first;
 * then it mounts, and stays. The timer is what keeps the content in the page for
 * anything that does not scroll, and `after` staggers the blocks so they do not
 * all arrive in one long task. Without IntersectionObserver (jsdom, old browsers)
 * it renders at once.
 */
export const WhenNear = ({ children, minHeight = 600, after = 3000, margin = '1400px 0px' }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (mounted) return undefined;
    const node = ref.current;
    const observer = node
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setMounted(true);
          },
          { rootMargin: margin },
        )
      : null;
    observer?.observe(node);
    const timer = window.setTimeout(() => setMounted(true), after);
    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [mounted, margin, after]);

  return mounted ? children : <div ref={ref} style={{ minHeight }} aria-hidden="true" />;
};

/* ------------------------------------------------------------------ icons */

export const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export const Chevron = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true" focusable="false">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ------------------------------------------------------------------- hero */

/**
 * The full-bleed brand canvas. `art` is the animated SVG that sits behind the
 * copy; `mark` is the brand's own logo when it has one.
 */
export const BrandHero = ({
  art,
  backTo,
  backLabel,
  mark,
  eyebrow,
  live = false,
  title,
  tagline,
  lede,
  meta,
  actions,
}) => (
  <header className="brand-hero">
    {art}
    <div className="brand-hero-inner">
      {backTo ? (
        <Link className="brand-back" to={backTo}>
          <ArrowLeft />
          {backLabel}
        </Link>
      ) : null}

      {mark}

      {eyebrow ? (
        <p className="brand-eyebrow">
          {live ? <span className="brand-eyebrow-dot" /> : null}
          {eyebrow}
        </p>
      ) : null}

      <h1 className="brand-title">{title}</h1>
      {tagline ? <p className="brand-tagline">{tagline}</p> : null}
      {lede ? <p className="brand-lede">{lede}</p> : null}
      {meta ? <div className="brand-hero-meta">{meta}</div> : null}
      {actions ? <div className="brand-hero-actions">{actions}</div> : null}
    </div>
  </header>
);

/* --------------------------------------------------------------- sections */

export const Section = ({ kicker, title, lede, children, className = '' }) => (
  <section className={`brand-section${className ? ` ${className}` : ''}`}>
    {kicker || title || lede ? (
      <Reveal className="brand-section-head">
        {kicker ? <span className="brand-kicker">{kicker}</span> : null}
        {title ? <h2 className="brand-h2">{title}</h2> : null}
        {lede ? <p className="brand-p">{lede}</p> : null}
      </Reveal>
    ) : null}
    {children}
  </section>
);

export const StatGrid = ({ items }) => (
  <Reveal className="brand-stats" stagger>
    {items.map((item) => (
      <div className="brand-stat" key={item.key}>
        <span className="brand-stat-value">{item.value}</span>
        <p className="brand-stat-label">{item.label}</p>
      </div>
    ))}
  </Reveal>
);

export const Steps = ({ items }) => (
  <Reveal className="brand-steps" stagger>
    {items.map((item) => (
      <article className="brand-step" key={item.key}>
        <span className="brand-step-num" aria-hidden="true" />
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    ))}
  </Reveal>
);

export const CardGrid = ({ items }) => (
  <Reveal className="brand-grid" stagger>
    {items.map((item) => (
      <article className="brand-card" key={item.key}>
        {item.icon ? <div className="brand-card-icon">{item.icon}</div> : null}
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </article>
    ))}
  </Reveal>
);

export const ChipGroup = ({ title, items }) => (
  <div className="brand-stack-group">
    <h3 className="brand-stack-title">{title}</h3>
    <div className="brand-chips">
      {items.map((item) => (
        <span className="brand-chip" key={item}>
          {item}
        </span>
      ))}
    </div>
  </div>
);

export const Closing = ({ title, children }) => (
  <Reveal className="brand-closing">
    <h2 className="brand-h2">{title}</h2>
    {children}
  </Reveal>
);

/**
 * The closing band at the foot of the Library, the last page before Contact.
 *
 * Only there: Contact is one tap away in the navbar and in every footer, so a
 * band on each of the story pages would be the third invitation on the same
 * screen. The Library is the exception because it is the end of the tour: the
 * page where a reader who has followed every card runs out of pages.
 */
export const TalkBand = () => {
  const { t } = useTranslation();
  return (
    <Reveal className="hub-teaser talk-band">
      <div className="hub-teaser-copy">
        <h2 className="brand-h2">{t('talk.title')}</h2>
        <p className="brand-p">{t('talk.lede')}</p>
      </div>
      <ContactChain />
      <div className="talk-band-actions">
        <Link className="brand-link-out hub-teaser-cta" to="/contact">
          {t('talk.cta')}
          <ArrowRight />
        </Link>
        {/* The direct address next to the form, because some readers will never
            fill in a form and the alternative is that they close the tab. */}
        <a className="talk-band-direct" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </Reveal>
  );
};

/**
 * Back link rendered at the foot of a brand page, so a reader who has scrolled
 * the whole story does not have to travel back up to leave.
 */
export const BrandFooterNav = ({ to, labelKey }) => {
  const { t } = useTranslation();
  return (
    <Reveal className="brand-footer-nav">
      <Link className="brand-footer-link" to={to}>
        <ArrowLeft />
        {t(labelKey)}
      </Link>
    </Reveal>
  );
};
