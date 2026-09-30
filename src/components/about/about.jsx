import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import linkedinLogo from '../../images/linkedin.png';
import mailLogo from '../../images/Mail.jpg';
import GitHubLogo from '../../images/GitHub.png';
import YoutubeLogo from '../../images/Youtube.png';
import UAZLogo from '../../images/UAZ.webp';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, Collapsible, Reveal, Section, WhenNear } from '../brand/parts';
import {
  CONTACT_EMAIL,
  CV_FILENAME,
  CV_PATH,
  GITHUB,
  LINKEDIN,
  YOUTUBE,
} from '../../site';
import WorkBot from './WorkBot';
import CertsRail from '../library/CertsRail';
import EventsRail from '../library/EventsRail';
import PeopleRail from '../library/PeopleRail';
import TimelineStrip from './TimelineStrip';
import PracticeExplorer from './PracticeExplorer';
import ConceptIcon from './ConceptIcons';
import { openTerminal } from '../terminal/Terminal';
import './about.css';

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

// The two that open the section rather than sit inside it.
const PRINCIPLES = [
  { id: 'aiFirst', icon: 'agents' },
  { id: 'innovation', icon: 'radar' },
];

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
          {/* The largest thing on the first screen, so it is the first thing asked
              for: two sizes (a phone draws it at about 140px and does not need
              the file a 420px desktop circle does), a high fetch priority, and a
              preload in index.html with the same sizes so the browser starts on
              it from the HTML and not from the script that renders this. */}
          <img
            src={`${process.env.PUBLIC_URL}/about/me-840.webp`}
            srcSet={`${process.env.PUBLIC_URL}/about/me-480.webp 480w, ${process.env.PUBLIC_URL}/about/me-840.webp 840w`}
            sizes="(max-width: 860px) 142px, (max-width: 1100px) 33vw, 420px"
            width="840"
            height="840"
            fetchPriority="high"
            decoding="async"
            alt={t('about.photoAlt')}
          />
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
          {/* The second paragraph opens from a button on a phone. */}
          <Collapsible label={t('cv.profileMore')} closeLabel={t('cv.showLess')}>
            <p className="brand-p">{t('cv.profileBody2')}</p>
          </Collapsible>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ practice */}
      <WhenNear minHeight={2000} after={2600}>
      <Section
          kicker={t('cv.practiceKicker')}
          title={t('cv.practiceTitle')}
          lede={t('cv.practiceLede')}
        >
          {/* A ruled list rather than a pill cloud. Eleven chips of wildly
              different lengths wrap into ragged rows that read as a tag cloud —
              the shape used for keywords nobody is expected to read one by one.
              These are claims about how he works, so they get the form claims
              get: one per line, a hairline between them, the group name held
              alongside in its own column. */}
          {/* Two things stated before everything else, because they are not one
              more line among sixty-five: they are the posture the other
              sixty-five are downstream of. The first one has the bot standing
              right underneath it, which is what keeps it from being a word
              everybody has on their profile. */}
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

          {/* The bot, straight under the two principles and inside this section,
              because that is what it is: the AI-first claim with something built
              behind it. As a section of its own it read as an interruption — a
              story about a bot that happened to be nearby. */}
          {/* The figure is seen once, whole, across the width of the section,
              and then it stays where it was put. It used to ride down the page
              in a sticky column beside the lists, which is not "always
              visible" — it is always moving, and the eye goes to the moving
              thing instead of the sentence. */}
          <Reveal className="practice-example">
            <div className="practice-example-head">
              <span className="practice-example-label">{t('cv.bot.exampleLabel')}</span>
              <h3 className="practice-example-title">{t('cv.bot.title')}</h3>
            </div>
            <div className="bot">
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

              {/* On a phone the story stops at the bot and its claim; what it was
                  taught and what a day with it looks like open from a button. */}
              <Collapsible label={t('cv.bot.more')} closeLabel={t('cv.showLess')}>
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
              </Collapsible>
            </div>
          </Reveal>

          {/* Sixty-five hairlines in three columns is a wall, and a wall cannot
              answer "which of these is the one that matters to you". The index
              says what the six areas are; the panel shows the one you picked. */}
          <Reveal className="practice-lists">
            <span className="practice-lists-label">{t('cv.listsLabel')}</span>
            <p className="practice-lists-lede">{t('cv.listsLede')}</p>
          </Reveal>

          <Reveal>
            {/* The areas and their rows open from a button on a phone. */}
            <Collapsible label={t('cv.listsMore')} closeLabel={t('cv.showLess')}>
              <PracticeExplorer />
            </Collapsible>
          </Reveal>

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
      </WhenNear>

      {/* ----------------------------------------------- education + languages */}
      <WhenNear minHeight={800} after={3100}>
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
              <Collapsible label={t('cv.peulMore')} closeLabel={t('cv.showLess')}>
                <article className="cv-edu-minor">
                  <h3>{t('cv.peul.name')}</h3>
                  <p className="cv-edu-meta">{t('cv.peul.meta')}</p>
                  <p className="cv-edu-body">{t('cv.peul.body')}</p>
                </article>
              </Collapsible>
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
      </WhenNear>

      {/* -------------------------------------------------------------- certs */}
      <WhenNear minHeight={800} after={3600}>
      <Section kicker={t('cv.certsKicker')} title={t('cv.certsTitle')} lede={t('cv.certsLede')}>
          {/* One credential at a time, with the sky that grows as the list does.
              The constancias are inside the cards now: a certificate and the
              paper it was issued on are one thing, and once there are many of
              them a separate row of thumbnails would be a second list to keep in
              step with the first. */}
          <CertsRail onProof={setActiveImage} />
        </Section>
      </WhenNear>

      {/* -------------------------------------------------------------- events */}
      {/* Rooms I was in. Not credentials — which is why they are a section of
          their own after the certificates rather than among them — but they are
          the part of a career that a certificate cannot record: who I went as. */}
      <WhenNear minHeight={800} after={4100}>
      <Section kicker={t('cv.eventsKicker')} title={t('cv.eventsTitle')} lede={t('cv.eventsLede')}>
          <EventsRail />
        </Section>
      </WhenNear>

      {/* ---------------------------------------------------------- references */}
      {/* After the events, because both answer the same question — who has been
          in the room. Nobody here is quoted: none of them was asked for a
          sentence, so the section hands over their links instead of putting
          words in their mouths. */}
      <WhenNear minHeight={700} after={4600}>
      <Section
          kicker={t('cv.referencesKicker')}
          title={t('cv.referencesTitle')}
          lede={t('cv.referencesLede')}
        >
          <PeopleRail />
        </Section>
      </WhenNear>

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
