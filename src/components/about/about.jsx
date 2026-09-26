import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import image from '../../images/AboutMe.webp';
import linkedinLogo from '../../images/linkedin.png';
import mailLogo from '../../images/Mail.jpg';
import GitHubLogo from '../../images/GitHub.png';
import YoutubeLogo from '../../images/Youtube.png';
import UAZLogo from '../../images/UAZ.webp';
import someceImage from '../../images/Achievements/constancia1.webp';
import ICPImage from '../../images/Achievements/constancia2.webp';
import rbrMark from '../../images/releasebeforeready.svg';
import innovafestMark from '../../images/innovafest.svg';
import talentlandMark from '../../images/talentland.svg';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Reveal, Section } from '../brand/parts';
import {
  CONTACT_EMAIL,
  CV_FILENAME,
  CV_PATH,
  GITHUB,
  LINKEDIN,
  YOUTUBE,
} from '../../site';
import StackExplorer from './StackExplorer';
import READING from './reading';
import BOOK_COVERS from './bookCovers';
import REFERENCES from './references';
import RefHacker from './RefHacker';
import WorkBot from './WorkBot';
import TimelineStrip from './TimelineStrip';
import PRACTICE_ICONS from './practiceIcons';
import ConceptIcon from './ConceptIcons';
import { INTEREST_ICONS, INTEREST_KEYS, INTEREST_LINKS } from './interestsData';
import { openTerminal } from '../terminal/Terminal';
import './about.css';

// The events, newest first. Each one is a wordmark, a line of copy and at
// most two destinations: the event itself, and — where the day produced
// something catalogued here — the project it turned into.
const EVENTS = [
  {
    key: 'rbr',
    mark: rbrMark,
    url: 'https://www.releasebeforeready.com/es/eventos',
    project: '/projects',
    paragraphs: 2,
  },
  { key: 'innovafest', mark: innovafestMark, url: 'https://innovafest.mx/encuentros/queretaro' },
  { key: 'talentland', mark: talentlandMark, url: 'https://www.talent-land.mx/' },
];

const SOCIALS = [
  { href: `mailto:${CONTACT_EMAIL}`, img: mailLogo, label: 'Email', external: false },
  { href: LINKEDIN, img: linkedinLogo, label: 'LinkedIn', external: true },
  { href: GITHUB, img: GitHubLogo, label: 'GitHub', external: true },
  { href: YOUTUBE, img: YoutubeLogo, label: 'YouTube', external: true },
];

// The three things happening right now, each pointing at the page that tells
// the full story. The CV lists them as separate rows; here they are one strip,
// because the fronts running at once are the fact worth leading with.
const NOW = [
  { id: 'radii', to: '/radii' },
  { id: 'ventures', to: '/ventures' },
  { id: 'contract', to: '/experience' },
];

// The routes the navbar does not carry, which are also the ones worth finding.
const SHORTCUTS = [
  { id: 'decisions', to: '/decisions' },
  { id: 'study', to: '/study' },
  { id: 'play', to: '/play' },
];

const PRACTICE_GROUPS = ['systems', 'delivery', 'breadth'];

// The two that open the section rather than sit inside it.
const PRINCIPLES = [
  { id: 'aiFirst', icon: 'agents' },
  { id: 'innovation', icon: 'radar' },
];

const CERT_KEYS = ['icp', 'langchain', 'santander', 'somece'];

/* A certificate only carries links when there is something published to point
   at. SOMECE has two: the proceedings the paper appears in, and the recording
   of the talk itself — which is the one thing on that channel that is evidence
   of a claim this page already makes, rather than a video. */
const CERT_LINKS = {
  somece: [
    {
      id: 'paper',
      href: 'https://www.google.com.mx/books/edition/Proleg%C3%B3menos_de_la_Inteligencia_Artific/m-I2EQAAQBAJ?hl=es&gbpv=1&pg=PA111&printsec=frontcover',
    },
    { id: 'talk', href: 'https://www.youtube.com/watch?v=WPH80wfQbXg' },
  ],
};

const About = () => {
  const { t, tl } = useTranslation();
  const [activeImage, setActiveImage] = useState(null);

  // For whoever opens devtools on a portfolio, which is its own kind of
  // introduction. Runs once per mount, says nothing the page needs.
  useEffect(() => {
    console.log(
      '%cJ.A.R.V.I.S.%c  booting…  arc reactor at 100%%, suit still in v0.1.\n' +
        'Sí, leíste bien: el objetivo es ser el Tony Stark de la vida real.\n' +
        `¿Buscas al ingeniero detrás de esto? ${CONTACT_EMAIL}`,
      'font-weight:700;letter-spacing:.12em',
      'font-weight:400'
    );
  }, []);

  if (process.env.NODE_ENV === 'development') {
    PRACTICE_GROUPS.forEach((group) => {
      const items = tl(`cv.practice.${group}Items`).length;
      const icons = PRACTICE_ICONS[group]?.length || 0;
      if (items !== icons) {
        console.warn(`[practice] ${group}: ${items} items but ${icons} icons`);
      }
    });
  }

  const certificates = [
    { key: 'icp', src: ICPImage, label: t('cv.certs.icp.name') },
    { key: 'somece', src: someceImage, label: t('cv.certs.somece.name') },
  ];

  return (
    <div className="cv-page">
      {/* ------------------------------------------------------------ identity */}
      {/* No card. The type sits straight on the page so the drifting washes
          are visible in the one place a visitor is guaranteed to look, and the
          name gets the scale a name is supposed to get. Every fact the card
          carried is still here; the pill and the icon list became one line of
          terminal output, because this site already has a terminal and a
          readout is how it says where something stands. */}
      <header className="hero">
        <div className="hero-copy">
          <p className="hero-status">
            <b>{t('cv.badge')}</b>
            <span className="hero-sep" aria-hidden="true">/</span>
            <span className="hero-live" aria-hidden="true" />
            {t('cv.availability')}
          </p>

          {/* Split on the first space so each part can rise out of its own
              line. A one-word name simply renders one line. */}
          <h1 className="hero-name">
            {(() => {
              const [first, ...rest] = t('about.name').split(' ');
              return [first, rest.join(' ')].filter(Boolean).map((line) => (
                <span key={line}>
                  <b>{line}</b>
                </span>
              ));
            })()}
          </h1>

          <p className="hero-role">{t('cv.role')}</p>

          {/* The specific claim, in the first viewport. The five seconds a
              visitor spends here used to buy them a job title; now they buy
              the one sentence nobody else on the internet can write. */}
          <p className="hero-claim">{t('cv.claim')}</p>

          <p className="hero-meta">
            {t('cv.location')}
            <span className="hero-sep" aria-hidden="true">/</span>
            {t('cv.standing')}
          </p>

          {/* One action, not two. The navbar already carries every route this
              hero could point at, so a button that duplicated one of them was
              only competing with the CV for the same click. */}
          <div className="cv-actions">
            <a className="cv-secondary" href={CV_PATH} download={CV_FILENAME}>
              <svg className="cv-button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3v12" />
                <path d="M7 10l5 5 5-5" />
                <path d="M4 20h16" />
              </svg>
              {t('about.downloadCv')}
            </a>
            <a className="cv-link" href={CV_PATH} target="_blank" rel="noopener noreferrer">
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

        <div className="hero-portrait">
          <img src={image} alt={t('about.photoAlt')} />
        </div>
      </header>

      {/* A menu behind the menu. The home page runs nineteen screens, and the
          four things on this site somebody is most likely to remember — the
          log, the study zone, the game, the shell — are either deep inside it
          or on routes the navbar does not carry. One quiet row on the first
          screen makes them reachable without adding a fourteenth section. */}
      <Reveal className="shortcuts">
        <span className="shortcuts-label">{t('cv.shortcuts.label')}</span>
        <ul>
          {SHORTCUTS.map(({ id, to }) => (
            <li key={id}>
              <Link to={to}>
                <span className="shortcuts-name">{t(`cv.shortcuts.${id}.name`)}</span>
                <span className="shortcuts-hint">{t(`cv.shortcuts.${id}.hint`)}</span>
              </Link>
            </li>
          ))}
          <li>
            <button type="button" onClick={openTerminal}>
              <span className="shortcuts-name">{t('cv.shortcuts.terminal.name')}</span>
              <span className="shortcuts-hint">{t('cv.shortcuts.terminal.hint')}</span>
            </button>
          </li>
        </ul>
      </Reveal>

      {/* ----------------------------------------------------------------- now */}
      {/* First, because every reason somebody is on this page — building
          something together, hiring the ventures, or just arguing about the
          work — starts with what is running right now, not with a biography. */}
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

      {/* ------------------------------------------------------------- profile */}
      <Section kicker={t('cv.profileKicker')} title={t('cv.profileTitle')}>
        <Reveal>
          <p className="brand-p brand-lead-p">{t('cv.profileBody')}</p>
          <p className="brand-p">{t('cv.profileBody2')}</p>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ practice */}
      <Section
        kicker={t('cv.practiceKicker')}
        title={t('cv.practiceTitle')}
        lede={t('cv.practiceLede')}
      >
        {/* A ruled list rather than a pill cloud. Thirty-one chips of wildly
            different lengths wrap into ragged rows that read as a tag cloud —
            the shape used for keywords nobody is expected to read one by one.
            These are claims about how he works, so they get the form claims
            get: one per line, a hairline between them, the group name held
            alongside in its own column. */}
        {/* Two things stated before the lists, because they are not one more
            line among thirty-three: they are the posture the other thirty-three
            are downstream of. Both are load-bearing claims with something
            behind them — the agents are in production and the adoption
            criterion is written down. */}
        <Reveal className="practice-lead">
          <span className="practice-lead-label">{t('cv.principlesLabel')}</span>
          <div className="practice-principles">
            {PRINCIPLES.map(({ id, icon }) => (
              <article className="practice-principle" key={id}>
                <h3>
                  <ConceptIcon className="list-icon" name={icon} />
                  {t(`cv.principles.${id}.title`)}
                </h3>
                <p>{t(`cv.principles.${id}.body`)}</p>
              </article>
            ))}
          </div>
        </Reveal>

        {PRACTICE_GROUPS.map((group) => (
          <Reveal className="practice-block" key={group}>
            <h3 className="practice-title">{t(`cv.practice.${group}`)}</h3>
            <ul className="practice-list">
              {tl(`cv.practice.${group}Items`).map((item, index) => (
                <li key={item}>
                  <ConceptIcon className="list-icon" name={PRACTICE_ICONS[group][index]} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        {/* The one place on the site where the judgement this section claims
            is shown rather than asserted, so it gets a door rather than a line
            of link text. No entry count and no preview of the format: a number
            invites counting, and four chips explaining a link are three more
            things than the link needed. */}
        <Reveal className="practice-out">
          <Link className="log-door" to="/decisions">
            <span className="log-door-label">{t('cv.log.label')}</span>
            <span className="log-door-title">{t('cv.log.title')}</span>
            <span className="log-door-body">{t('cv.log.body')}</span>
            <span className="log-door-cta">
              {t('cv.log.cta')}
              <ArrowRight />
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------------- bot */}
      {/* Straight after the practice section, because "AI first" is stated up
          there as a principle and this is the only place on the site where
          there is something behind it. A principle with a working example
          underneath it is an argument; on its own it is a word everybody has
          on their profile. */}
      <Section kicker={t('cv.bot.kicker')} title={t('cv.bot.title')}>
        <Reveal className="bot">
          {/* The figure is seen once, whole, across the width of the section,
              and then it stays where it was put. It used to ride down the page
              in a sticky column beside the lists, which is not "always
              visible" — it is always moving, and the eye goes to the moving
              thing instead of the sentence. */}
          <div className="bot-stage">
            <WorkBot />
            <div>
              <p className="bot-claim">{t('cv.bot.lede')}</p>
              <p className="bot-line">
                <span>&gt;</span>
                {t('cv.bot.line')}
                <span className="bot-caret" />
              </p>
            </div>
          </div>

          <div className="bot-cols">
            <div className="bot-group">
              <h3>{t('cv.bot.taughtLabel')}</h3>
              <ul className="bot-taught">
                {tl('cv.bot.taught').map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bot-group">
              <h3>{t('cv.bot.dayLabel')}</h3>
              <ol className="bot-day">
                {tl('cv.bot.day').map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          <p className="bot-close">
            <b>{t('cv.bot.closeLead')}</b> {t('cv.bot.close')}
          </p>
        </Reveal>
      </Section>

      {/* --------------------------------------------------------------- stack */}
      {/* Twelve groups and nearly four hundred tiles is a wall, and a wall is
          something a reader scrolls past rather than reads. An index down the
          side and one group in the panel is the same content at a size a
          reader can actually take in. Nothing was cut. */}
      <Section kicker={t('cv.skillsKicker')} title={t('cv.skillsTitle')} lede={t('cv.skillsLede')}>
        {/* An index and a panel, rather than everything at once or nothing
            at all.

            Four earlier attempts argued about how to fold 315 entries into a
            page; all of them were answering the wrong question. The section
            does not need to show every group at once — it needs to say how
            many groups there are, let a reader pick one, and give that one
            room to breathe. Twelve names on the left, one group's marks on
            the right, and the wall never happens. */}
        <Reveal>
          <StackExplorer />
        </Reveal>
      </Section>

      {/* ----------------------------------------------- education + languages */}
      <Section kicker={t('cv.educationKicker')} title={t('education.heading').replace(':', '')}>
        <Reveal className="cv-split">
          <div className="cv-edu-column">
          {/* The whole card is the link, and it carries the degree page's own
              colour world rather than sitting in the page's white. It is the
              one card here that opens a story, and it was the quietest thing
              on a wall of coloured tiles. */}
          <Link className="cv-edu" data-brand="uaz" to="/uaz">
            <span className="cv-edu-glow" aria-hidden="true" />
            <img className="cv-edu-logo" src={UAZLogo} alt="" aria-hidden="true" />
            <div className="cv-edu-copy">
              <h3>{t('education.university')}</h3>
              <p className="cv-edu-meta">
                {t('about.role')} · {t('education.years')}
              </p>
              <p className="cv-edu-body">{t('education.body')}</p>
              <span className="cv-edu-cta">
                {t('cv.educationCta')}
                <ArrowRight />
              </span>
            </div>
          </Link>

            {/* The language school, under the degree rather than beside it:
                same university, smaller claim, and it is the thing the C1 in
                the panel to the right is actually standing on. */}
            <article className="cv-edu-minor">
              <h3>{t('cv.peul.name')}</h3>
              <p className="cv-edu-meta">{t('cv.peul.meta')}</p>
              <p className="cv-edu-body">{t('cv.peul.body')}</p>
            </article>
          </div>

          <aside className="cv-languages">
            <h3 className="brand-stack-title">{t('cv.languagesKicker')}</h3>
            {['spanish', 'english'].map((code) => (
              <div className="cv-language" key={code}>
                <span className="cv-language-name">{t(`cv.languages.${code}.name`)}</span>
                <span className="cv-language-level">{t(`cv.languages.${code}.level`)}</span>
                {/* Only English carries one: a level is a claim, and this is
                    the exam behind it. */}
                {code === 'english' ? (
                  <p className="cv-language-note">{t('cv.languages.english.note')}</p>
                ) : null}
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
                {CERT_LINKS[key] ? (
                  <div className="cv-cert-links">
                    {CERT_LINKS[key].map(({ id, href }) => (
                      <a
                        className="cv-interest-link cv-cert-link"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={id}
                      >
                        {t(`cv.certs.${key}.links.${id}`)}
                        <ArrowUpRight />
                      </a>
                    ))}
                  </div>
                ) : null}
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

        {/* Rooms I was in. Not credentials — which is why they sit after the
            certificates rather than among them — but they are the part of a
            career that a certificate cannot record: who I went as. */}
        <Reveal className="cv-events">
          <h3 className="brand-stack-title">{t('cv.eventsLabel')}</h3>
          {EVENTS.map((event) => (
            <article className="cv-event" key={event.key}>
              <span className="cv-event-mark">
                <img src={event.mark} alt="" aria-hidden="true" loading="lazy" />
              </span>
              <div className="cv-event-copy">
                <h4>{t(`cv.events.${event.key}.name`)}</h4>
                <p className="cv-cert-issuer">
                  {t(`cv.events.${event.key}.issuer`)} · {t(`cv.events.${event.key}.year`)}
                </p>
                <p className="cv-cert-body">{t(`cv.events.${event.key}.body`)}</p>
                {event.paragraphs === 2 ? (
                  <p className="cv-cert-body">{t(`cv.events.${event.key}.body2`)}</p>
                ) : null}
                <div className="cv-event-links">
                  <a
                    className="cv-interest-link"
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`cv.events.${event.key}.link`)}
                    <ArrowUpRight />
                  </a>
                  {/* Only where the day produced something catalogued here. */}
                  {event.project ? (
                    <Link className="cv-interest-link" to={event.project}>
                      {t(`cv.events.${event.key}.projectLink`)}
                      <ArrowRight />
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- references */}
      {/* After the events, because both answer the same question — who has been
          in the room. Nobody here is quoted: none of them was asked for a
          sentence, so the section hands over their links instead of putting
          words in their mouths. */}
      <Section
        kicker={t('cv.referencesKicker')}
        title={t('cv.referencesTitle')}
        lede={t('cv.referencesLede')}
      >
        <Reveal className="refs" stagger>
          {REFERENCES.map(({ id, name, figure, glow, roles, site, linkedin }) => (
            <article className="ref-card" key={id}>
              <RefHacker name={name} figure={figure} glow={glow} />
              <h3 className="ref-name">{name}</h3>
              <div className="ref-roles">
                {roles.map(({ id: roleId, org }) => (
                  <p className="ref-role" key={roleId}>
                    {t(`cv.references.${roleId}`)}
                    {/* A role can stand without a company, when the company is
                        not known. */}
                    {org ? <span className="ref-org">{org}</span> : null}
                  </p>
                ))}
              </div>
              <div className="ref-links">
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <ArrowUpRight />
                </a>
                {site ? (
                  <a href={site} target="_blank" rel="noopener noreferrer">
                    {t('cv.referencesSite')}
                    <ArrowUpRight />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- reading */}
      {/* Open, in the same shape as the practice list above it: the shelf name
          held in its own column beside its books. Folding it made a reader
          click three times to find out that the answer to "what should I read"
          was thirty titles — and a recommendation nobody opens is not a
          recommendation. */}
      <Section
        kicker={t('cv.readingKicker')}
        title={t('cv.readingTitle')}
        lede={t('cv.readingLede')}
      >
        {READING.map(({ id, books }) => (
          <Reveal className="practice-block" key={id}>
            {/* What the shelf is for and why it is worth the time, so the
                column beside the books says something instead of holding a
                single line over empty space. */}
            <div className="reading-shelf-head">
              <h3 className="practice-title">{t(`cv.readingGroups.${id}`)}</h3>
              <p className="reading-shelf-note">{t(`cv.readingNotes.${id}`)}</p>
            </div>
            <ul className="reading-list">
              {books.map(({ title, author, icon }) => (
                <li key={title}>
                  {/* The cover is how a book is recognised on a shelf; the drawn
                      icon stays only as a fallback for one without a cover. */}
                  {BOOK_COVERS[title] ? (
                    <img className="reading-cover" src={BOOK_COVERS[title]} alt="" loading="lazy" width="40" height="60" />
                  ) : (
                    <ConceptIcon className="list-icon" name={icon} />
                  )}
                  <span className="reading-book">
                    <span className="reading-title">{title}</span>
                    <span className="reading-author">{author}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        {/* The shelves are the reading that has a use; the rest is taste, and
            taste is not something to recommend. */}
        <p className="reading-aside">{t('cv.readingAside')}</p>
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
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('timeline.title')}</h2>
          <p className="brand-p">{t('timeline.lede')}</p>
        </div>
        <TimelineStrip />
        <Link className="brand-link-out hub-teaser-cta" to="/experience">
          {t('nav.experience')}
          <ArrowRight />
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
