import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import image from '../../images/AboutMe.jpg';
import linkedinLogo from '../../images/linkedin.png';
import mailLogo from '../../images/Mail.jpg';
import GitHubLogo from '../../images/GitHub.png';
import YoutubeLogo from '../../images/Youtube.png';
import UAZLogo from '../../images/UAZ.jpg';
import someceImage from '../../images/Achievements/constancia1.png';
import ICPImage from '../../images/Achievements/constancia2.png';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Reveal, Section } from '../brand/parts';
import TECH_GROUPS, { monogram } from './techStack';
import ConceptIcon from './ConceptIcons';
import './about.css';

const EMAIL = 'adalc3488@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/adalbertocerrillo/';
const GITHUB = 'https://github.com/AdalbertoCV';
const YOUTUBE = 'https://www.youtube.com/@acerrillosoftware';

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

const PRACTICE_GROUPS = ['systems', 'delivery', 'breadth'];
const LOOKING_KEYS = ['business', 'creative', 'arts', 'science'];

// One icon per card: a climbing trajectory, a frame with a stylus, a theatre
// mask, and an orbit with something in it. Drawn here rather than reused from the
// concept set — these are section marks at 30px, not skill tiles.
const LOOK_ICONS = {
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 20h18" />
      <path d="M5 17V9M10 17V5M15 17v-7M20 17V7" />
      <path d="m3.5 6 4-3 4 2.5L20 2" />
      <path d="M17 2h3v3" />
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.6" y="2.6" width="8.4" height="8.4" rx="2" />
      <path d="m6 5.4 2.8 1.4L6 8.2z" />
      <path d="m16.4 12 3.6 3.6L12.4 23H8.8v-3.6z" />
      <path d="m14.6 13.8 3.6 3.6" />
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
const INTEREST_KEYS = ['innovation', 'arts', 'literature', 'gastronomy', 'sports'];
const CERT_KEYS = ['icp', 'langchain', 'santander', 'somece'];

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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 7v5l3.2 1.9" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              {t('experience.badge')}
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

      {/* --------------------------------------------------- looking ahead */}
      <Section
        kicker={t('cv.lookingKicker')}
        title={t('cv.lookingTitle')}
        lede={t('cv.lookingLede')}
      >
        <Reveal className="cv-looking" stagger>
          {LOOKING_KEYS.map((key) => (
            <article className="cv-look" key={key}>
              <div className="cv-look-icon">{LOOK_ICONS[key]}</div>
              <h3>{t(`cv.looking.${key}.title`)}</h3>
              <p>{t(`cv.looking.${key}.body`)}</p>
              <div className="brand-chips">
                {tl(`cv.looking.${key}.tags`).map((tag) => (
                  <span className="brand-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
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
          {CERT_KEYS.map((key) => (
            <article className="cv-cert" key={key}>
              <svg className="cv-cert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="9" r="5.5" />
                <path d="m8.2 13.6-1.4 7L12 18l5.2 2.6-1.4-7" />
              </svg>
              <h3>{t(`cv.certs.${key}.name`)}</h3>
              <p className="cv-cert-issuer">
                {t(`cv.certs.${key}.issuer`)} · {t(`cv.certs.${key}.year`)}
              </p>
            </article>
          ))}
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
              <h3>{t(`cv.interests.${key}.title`)}</h3>
              <p>{t(`cv.interests.${key}.body`)}</p>
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
