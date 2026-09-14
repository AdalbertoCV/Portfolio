import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import image from '../../images/AboutMe.jpg';
import linkedinLogo from '../../images/linkedin.png';
import mailLogo from '../../images/Mail.jpg';
import GitHubLogo from '../../images/GitHub.png';
import YoutubeLogo from '../../images/Youtube.png';
import soundcloudMark from '../../images/soundcloud.svg';
import UAZLogo from '../../images/UAZ.jpg';
import someceImage from '../../images/Achievements/constancia1.png';
import ICPImage from '../../images/Achievements/constancia2.png';
import rbrMark from '../../images/releasebeforeready.svg';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Reveal, Section } from '../brand/parts';
import TECH_GROUPS, { monogram } from './techStack';
import ConceptIcon from './ConceptIcons';
import './about.css';

const EMAIL = 'adalc3488@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/adalbertocerrillo/';
const GITHUB = 'https://github.com/AdalbertoCV';
const YOUTUBE = 'https://www.youtube.com/@acerrillosoftware';
const RBR_URL = 'https://www.releasebeforeready.com/es/eventos';

const SOCIALS = [
  { href: `mailto:${EMAIL}`, img: mailLogo, label: 'Email', external: false },
  { href: LINKEDIN, img: linkedinLogo, label: 'LinkedIn', external: true },
  { href: GITHUB, img: GitHubLogo, label: 'GitHub', external: true },
  { href: YOUTUBE, img: YoutubeLogo, label: 'YouTube', external: true },
];

// The three things happening right now, each pointing at the page that tells
// the full story. The CV lists them as separate rows; here they are one strip,
// because "four fronts at once" is the fact worth leading with.
const NOW = [
  { id: 'radii', to: '/radii' },
  { id: 'ventures', to: '/ventures' },
  { id: 'contract', to: '/experience' },
];

// An interest card can carry one outbound link, where the card makes a claim
// that has somewhere to be verified. The arts card says he writes songs and
// runs musical projects; this is where that stops being an assertion.
const INTEREST_LINKS = {
  arts: {
    href: 'https://soundcloud.com/adal-cerrillo-oficial',
    mark: soundcloudMark,
  },
};

const PRACTICE_GROUPS = ['systems', 'delivery', 'breadth'];
const INTEREST_KEYS = [
  'innovation',
  'business',
  'science',
  'security',
  'learning',
  'arts',
  'sports',
  'culture',
];

// One icon per card. Drawn here rather than reused from the skill-tile concept
// set: these are section marks at 30px, and they answer to a different
// vocabulary — a climbing trajectory, a theatre mask, a figure in motion.
const INTEREST_ICONS = {
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 20h18" />
      <path d="M5 17V9M10 17V5M15 17v-7M20 17V7" />
      <path d="m3.5 6 4-3 4 2.5L20 2" />
      <path d="M17 2h3v3" />
    </svg>
  ),
  // A theatre mask: the one symbol that reads as "the arts" across music,
  // literature, cinema and stage, rather than picking one of them. The page
  // with a note it replaces said "sheet music" and nothing else.
  arts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.8 4.6h14.4v7.1c0 4.6-3.2 8.3-7.2 8.3s-7.2-3.7-7.2-8.3z" />
      <path d="M8.2 9.5c.7-.7 1.8-.7 2.5 0" />
      <path d="M13.3 9.5c.7-.7 1.8-.7 2.5 0" />
      <path d="M9.3 14.2c1.7 1.3 3.7 1.3 5.4 0" />
      <path d="M4.8 4.6 2.6 2.4M19.2 4.6l2.2-2.2" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.4 18.2h5.2" />
      <path d="M10.2 21h3.6" />
      <path d="M12 2.8a6.2 6.2 0 0 1 3.7 11.2c-.7.5-1.1 1.3-1.1 2.2H9.4c0-.9-.4-1.7-1.1-2.2A6.2 6.2 0 0 1 12 2.8z" />
      <path d="M20.4 5.2 22 4.4M3.6 5.2 2 4.4M21 11h1.6M1.4 11H3" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="15.4" cy="4.4" r="1.9" />
      <path d="m8.2 21 2.6-5.2-2.8-2.6.9-4.9" />
      <path d="m8.9 8.3 3.6-1.4 2.6 2.6 3 .9" />
      <path d="m10.8 15.8 3.9 1.2 1.7 4" />
      <path d="M5.2 11.2 8.9 8.3" />
    </svg>
  ),
  // A shield read from the inside: the seam down the middle is where an
  // attacker gets in, which is the half of security this card is about.
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.6 4.4 5.8v6.1c0 4.6 3.1 8.1 7.6 9.5 4.5-1.4 7.6-4.9 7.6-9.5V5.8z" />
      <path d="M12 2.6v18.8" />
      <path d="M8.4 9.4h.01M8.4 13.4h.01" />
      <path d="M15.6 9.4h1.4M15.6 13.4h1.4" />
    </svg>
  ),
  // A head with a path through it: knowledge as a route that gets built, not a
  // container that gets filled. The node outside is the part that gets handed
  // to somebody else, which is the half of this card that is about teaching.
  learning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.4 21.2v-3.6a7.4 7.4 0 1 1 9.6-8.6c1.6.4 2.7 1.5 2.7 2.8 0 .9-.8 1.5-1.8 1.5h-1.3v2.4a1.9 1.9 0 0 1-1.9 1.9h-1.9v3.6" />
      <circle cx="9.8" cy="11.6" r="1.3" />
      <circle cx="13.8" cy="9.2" r="1.3" />
      <path d="m11 10.9 1.7-1" />
    </svg>
  ),
  culture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8c2.4 2.5 3.7 5.8 3.7 9.2s-1.3 6.7-3.7 9.2c-2.4-2.5-3.7-5.8-3.7-9.2S9.6 5.3 12 2.8z" />
    </svg>
  ),
  science: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)" />
    </svg>
  ),
};
const CERT_KEYS = ['icp', 'langchain', 'santander', 'somece'];

/* A certificate only carries a link when there is something published to point
   at — the SOMECE proceedings the paper appears in. */
const CERT_LINKS = {
  somece:
    'https://www.google.com.mx/books/edition/Proleg%C3%B3menos_de_la_Inteligencia_Artific/m-I2EQAAQBAJ?hl=es&gbpv=1&pg=PA111&printsec=frontcover',
};

const TechTile = ({ item }) => (
  <li className="tech-tile">
    {item.icon ? (
      <img
        className="tech-icon"
        src={item.icon}
        alt=""
        aria-hidden="true"
        loading="lazy"
        data-mono={item.mono ? 'true' : undefined}
        data-plate={item.plate ? 'true' : undefined}
      />
    ) : item.concept ? (
      <ConceptIcon className="tech-concept" name={item.concept} />
    ) : (
      // Last resort only — every current entry has either a logo or a concept
      // icon, so this should never render.
      <span className="tech-monogram" aria-hidden="true">
        {monogram(item.name)}
      </span>
    )}
    <span className="tech-name">{item.name}</span>
  </li>
);

const About = () => {
  const { t, tl } = useTranslation();
  const [activeImage, setActiveImage] = useState(null);

  // For whoever opens devtools on a portfolio, which is its own kind of
  // introduction. Runs once per mount, says nothing the page needs.
  useEffect(() => {
    console.log(
      '%cJ.A.R.V.I.S.%c  booting…  arc reactor at 100%%, suit still in v0.1.\n' +
        'Sí, leíste bien: el objetivo es ser el Tony Stark de la vida real.\n' +
        `¿Buscas al ingeniero detrás de esto? ${EMAIL}`,
      'font-weight:700;letter-spacing:.12em',
      'font-weight:400'
    );
  }, []);

  const certificates = [
    { key: 'icp', src: ICPImage, label: t('cv.certs.icp.name') },
    { key: 'somece', src: someceImage, label: t('cv.certs.somece.name') },
  ];

  return (
    <div className="cv-page">
      {/* ------------------------------------------------------------ identity */}
      <Reveal className="cv-hero">
        <div className="cv-hero-portrait">
          <img src={image} alt={t('about.photoAlt')} />
        </div>
        <div className="cv-hero-copy">
          <span className="hub-badge">{t('cv.badge')}</span>
          <h1 className="cv-name">{t('about.name')}</h1>
          <p className="cv-role">{t('cv.role')}</p>
          <ul className="cv-facts">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
                <circle cx="12" cy="10" r="2.8" />
              </svg>
              {t('cv.location')}
            </li>
            <li>
              <span className="cv-dot" aria-hidden="true" />
              {t('cv.availability')}
            </li>
            <li>
              {/* Stacked planes, not a clock: the fact this line carries is
                  three roles held at the same time, not elapsed time. */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3.2 21 7.6 12 12 3 7.6z" />
                <path d="m3 12 9 4.4 9-4.4" />
                <path d="m3 16.4 9 4.4 9-4.4" />
              </svg>
              {t('cv.standing')}
            </li>
          </ul>

          <div className="cv-actions">
            <a
              className="brand-link-out"
              href={`${process.env.PUBLIC_URL}/CV.pdf`}
              download="Adal-Cerrillo-CV.pdf"
            >
              <svg className="cv-button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3v12" />
                <path d="M7 10l5 5 5-5" />
                <path d="M4 20h16" />
              </svg>
              {t('about.downloadCv')}
            </a>
            <a
              className="cv-link"
              href={`${process.env.PUBLIC_URL}/CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('about.openInBrowser')}
            </a>
          </div>

          <ul className="cv-socials" aria-label={t('cv.contactLabel')}>
            {SOCIALS.map(({ href, img, label, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <img src={img} alt="" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ------------------------------------------------------------- profile */}
      <Section kicker={t('cv.profileKicker')} title={t('cv.profileTitle')}>
        <Reveal>
          <p className="brand-p brand-lead-p">{t('cv.profileBody')}</p>
          <p className="brand-p">{t('cv.profileBody2')}</p>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------------- now */}
      <Section kicker={t('cv.nowKicker')} title={t('cv.nowTitle')}>
        <Reveal className="cv-now" stagger>
          {NOW.map(({ id, to }) => (
            <Link className="cv-now-card" to={to} key={id}>
              <span className="cv-now-label">{t(`cv.now.${id}.label`)}</span>
              <h3>{t(`cv.now.${id}.org`)}</h3>
              <p>{t(`cv.now.${id}.body`)}</p>
              <span className="cv-now-cta">
                {t(`cv.now.${id}.cta`)}
                <ArrowRight />
              </span>
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* --------------------------------------------------------------- stack */}
      <Section kicker={t('cv.skillsKicker')} title={t('cv.skillsTitle')} lede={t('cv.skillsLede')}>
        {TECH_GROUPS.map(({ id, items }) => (
          <Reveal className="tech-group" key={id}>
            <h3 className="brand-stack-title">{t(`skills.groups.${id}`)}</h3>
            <ul className="tech-grid">
              {items.map((item) => (
                <TechTile item={item} key={item.name} />
              ))}
            </ul>
          </Reveal>
        ))}
      </Section>

      {/* ------------------------------------------------------------ practice */}
      <Section
        kicker={t('cv.practiceKicker')}
        title={t('cv.practiceTitle')}
        lede={t('cv.practiceLede')}
      >
        {PRACTICE_GROUPS.map((group) => (
          <Reveal className="brand-stack-group" key={group}>
            <h3 className="brand-stack-title">{t(`cv.practice.${group}`)}</h3>
            <div className="brand-chips">
              {tl(`cv.practice.${group}Items`).map((item) => (
                <span className="brand-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </Section>

      {/* ----------------------------------------------- education + languages */}
      <Section kicker={t('cv.educationKicker')} title={t('education.heading').replace(':', '')}>
        <Reveal className="cv-split">
          <article className="cv-edu">
            <img className="cv-edu-logo" src={UAZLogo} alt={t('education.university')} />
            <div>
              <h3>{t('education.university')}</h3>
              <p className="cv-edu-meta">
                {t('about.role')} · {t('education.years')}
              </p>
              <p className="brand-p">{t('education.body')}</p>
              <Link className="cv-interest-link cv-cert-link" to="/uaz">
                {t('cv.educationCta')}
                <ArrowRight />
              </Link>
            </div>
          </article>

          <aside className="cv-languages">
            <h3 className="brand-stack-title">{t('cv.languagesKicker')}</h3>
            {['spanish', 'english'].map((code) => (
              <div className="cv-language" key={code}>
                <span className="cv-language-name">{t(`cv.languages.${code}.name`)}</span>
                <span className="cv-language-level">{t(`cv.languages.${code}.level`)}</span>
              </div>
            ))}
          </aside>
        </Reveal>
      </Section>

      {/* -------------------------------------------------------------- certs */}
      <Section kicker={t('cv.certsKicker')} title={t('cv.certsTitle')}>
        <Reveal className="cv-certs" stagger>
          {CERT_KEYS.map((key) => {
            /* translate() hands back the key itself on a miss, so a card
               without a written-up context renders as the plain credential. */
            const body = t(`cv.certs.${key}.body`);
            const hasBody = body !== `cv.certs.${key}.body`;

            return (
              <article className="cv-cert" key={key} data-detail={hasBody ? 'true' : undefined}>
                <svg className="cv-cert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="9" r="5.5" />
                  <path d="m8.2 13.6-1.4 7L12 18l5.2 2.6-1.4-7" />
                </svg>
                <h3>{t(`cv.certs.${key}.name`)}</h3>
                <p className="cv-cert-issuer">
                  {t(`cv.certs.${key}.issuer`)} · {t(`cv.certs.${key}.year`)}
                </p>
                {hasBody && <p className="cv-cert-body">{body}</p>}
                {CERT_LINKS[key] && (
                  <a
                    className="cv-interest-link cv-cert-link"
                    href={CERT_LINKS[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`cv.certs.${key}.link`)}
                    <ArrowUpRight />
                  </a>
                )}
              </article>
            );
          })}
        </Reveal>

        <Reveal className="cv-proofs">
          <h3 className="brand-stack-title">{t('cv.certsProofLabel')}</h3>
          <p className="brand-values-hint">{t('cv.certsProofHint')}</p>
          <div className="cv-proof-row">
            {certificates.map(({ key, src, label }) => (
              <button
                type="button"
                className="cv-proof"
                key={key}
                onClick={() => setActiveImage({ src, label })}
                aria-label={label}
              >
                <img src={src} alt={label} loading="lazy" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* A hackathon is not a credential, so it sits after the certificates
            rather than among them: one card, the organiser's own wordmark, and
            what was actually built there. */}
        <Reveal className="cv-events">
          <h3 className="brand-stack-title">{t('cv.eventsLabel')}</h3>
          <article className="cv-event">
            <span className="cv-event-mark">
              <img src={rbrMark} alt="" aria-hidden="true" loading="lazy" />
            </span>
            <div className="cv-event-copy">
              <h4>{t('cv.events.rbr.name')}</h4>
              <p className="cv-cert-issuer">
                {t('cv.events.rbr.issuer')} · {t('cv.events.rbr.year')}
              </p>
              <p className="cv-cert-body">{t('cv.events.rbr.body')}</p>
              <p className="cv-cert-body">{t('cv.events.rbr.body2')}</p>
              {/* Two destinations, because the day produced two things: the
                  event itself, and the track that is already catalogued as a
                  project on this site. */}
              <div className="cv-event-links">
                <a
                  className="cv-interest-link"
                  href={RBR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('cv.events.rbr.link')}
                  <ArrowUpRight />
                </a>
                <Link className="cv-interest-link" to="/projects">
                  {t('cv.events.rbr.projectLink')}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        <Reveal className="cv-interests" stagger>
          {INTEREST_KEYS.map((key) => (
            <article className="cv-interest" key={key}>
              <div className="cv-interest-icon">{INTEREST_ICONS[key]}</div>
              <h3>{t(`cv.interests.${key}.title`)}</h3>
              <p>{t(`cv.interests.${key}.body`)}</p>
              {/* Optional second paragraph: translate() hands back the key
                  itself on a miss, so a card without one renders nothing. */}
              {t(`cv.interests.${key}.body2`) !== `cv.interests.${key}.body2` && (
                <p>{t(`cv.interests.${key}.body2`)}</p>
              )}
              {INTEREST_LINKS[key] && (
                <a
                  className="cv-interest-link"
                  href={INTEREST_LINKS[key].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={INTEREST_LINKS[key].mark} alt="" aria-hidden="true" />
                  {t(`cv.interests.${key}.link`)}
                  <ArrowUpRight />
                </a>
              )}
              <div className="brand-chips">
                {tl(`cv.interests.${key}.tags`).map((tag) => (
                  <span className="brand-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      <Reveal className="hub-teaser">
        <div>
          <h2 className="brand-h2">{t('timeline.title')}</h2>
          <p className="brand-p">{t('timeline.lede')}</p>
        </div>
        <Link className="brand-link-out hub-teaser-cta" to="/experience">
          {t('nav.experience')}
          <ArrowUpRight />
        </Link>
      </Reveal>

      {/* Portalled: `.cv-page` is a stacking context, so a nested overlay would
          render underneath the navbar. */}
      {activeImage &&
        createPortal(
          <div className="fullscreen-overlay" onClick={() => setActiveImage(null)}>
            <img src={activeImage.src} alt={activeImage.label} className="fullscreen-image" />
          </div>,
          document.body
        )}
    </div>
  );
};

export default About;
