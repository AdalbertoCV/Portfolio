import { useEffect, useState } from 'react';
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
import rbrMark from '../../images/releasebeforeready.svg';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Chevron, Reveal, Section } from '../brand/parts';
import {
  CONTACT_EMAIL,
  CV_FILENAME,
  CV_PATH,
  GITHUB,
  LINKEDIN,
  YOUTUBE,
} from '../../site';
import TECH_GROUPS, { monogram } from './techStack';
import { PROJECT_TECH } from '../projects/catalogue';
import READING from './reading';
import PRACTICE_ICONS from './practiceIcons';
import ConceptIcon from './ConceptIcons';
import { INTEREST_ICONS, INTEREST_KEYS, INTEREST_LINKS } from './interestsData';
import './about.css';

const RBR_URL = 'https://www.releasebeforeready.com/es/eventos';

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

const PRACTICE_GROUPS = ['systems', 'delivery', 'breadth'];

const CERT_KEYS = ['icp', 'langchain', 'santander', 'somece'];

/* A certificate only carries a link when there is something published to point
   at — the SOMECE proceedings the paper appears in. */
const CERT_LINKS = {
  somece:
    'https://www.google.com.mx/books/edition/Proleg%C3%B3menos_de_la_Inteligencia_Artific/m-I2EQAAQBAJ?hl=es&gbpv=1&pg=PA111&printsec=frontcover',
};

/**
 * One folded row, used by the reading shelves.
 *
 * The stack tried this three times and none of them held: a section whose
 * value is visual disappoints the moment it is a list of headings, and no
 * amount of affordance fixes that — so the stack is open and this is not its
 * problem any more. A shelf of book titles is a different case: it is text,
 * it reads fine folded, and three rows beat thirty.
 *
 * One signal, at the left, where reading starts: a bordered plus. It is the
 * oldest disclosure control there is and the only thing on the row that looks
 * like a control.
 */
const Fold = ({ id, title, open, onToggle, label, children }) => (
  <li className={`fold-row${open ? ' is-open' : ''}`}>
    <h3>
      <button
        type="button"
        className="fold-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="fold-sign" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" focusable="false">
            <path d="M5 12h14" />
            <path className="fold-sign-bar" d="M12 5v14" />
          </svg>
        </span>

        <span className="fold-name">{title}</span>
        <span className="sr-only">{` — ${label}`}</span>
      </button>
    </h3>
    <div id={id} hidden={!open}>
      {open && children}
    </div>
  </li>
);

/**
 * The control above a set of folds. Its label states what the click does, not
 * what the current state is, which is the one that stays true after the click.
 */
const FoldAll = ({ allOpen, onToggle, openLabel, closeLabel }) => (
  <Reveal className="fold-all">
    <button type="button" className="fold-all-button" onClick={onToggle}>
      {allOpen ? closeLabel : openLabel}
      <Chevron className={`fold-chevron${allOpen ? ' is-open' : ''}`} />
    </button>
  </Reveal>
);

/**
 * One technology: its mark, its name, and — where the catalogue can prove it —
 * how many projects stand behind it, linking to exactly those.
 *
 * No card around it. Cards were what made 315 of these into a wall; with one
 * group on screen the grid itself is the container, and the marks can have the
 * room they were never given.
 */
const TechMark = ({ item, t }) => {
  const built = PROJECT_TECH[item.name];

  const face = (
    <>
      <span className="stack-mark-art">
        {item.icon ? (
          <img
            className="tech-icon"
            src={item.icon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            data-mono={item.mono ? 'true' : undefined}
            data-flat={item.flat ? 'true' : undefined}
          />
        ) : item.concept ? (
          <ConceptIcon className="tech-concept" name={item.concept} />
        ) : (
          // Last resort only — every current entry has either a logo or a
          // concept icon, so this should never render.
          <span className="tech-monogram" aria-hidden="true">
            {monogram(item.name)}
          </span>
        )}
        {built ? (
          <span className="tech-receipt" aria-hidden="true">
            {built}
          </span>
        ) : null}
      </span>
      <span className="tech-name">{item.name}</span>
    </>
  );

  return (
    <li className={`stack-mark${built ? ' is-linked' : ''}`}>
      {built ? (
        <Link
          className="stack-mark-link"
          to={`/projects?tech=${encodeURIComponent(item.name)}`}
          aria-label={`${item.name} — ${built} ${t('cv.skillsReceipt')}`}
        >
          {face}
        </Link>
      ) : (
        face
      )}
    </li>
  );
};

const About = () => {
  const { t, tl } = useTranslation();
  const [activeImage, setActiveImage] = useState(null);
  // Which group the stack is showing. The first one, so the section is never
  // an empty frame waiting to be clicked.
  const [group, setGroup] = useState(TECH_GROUPS[0].id);

  // On a phone the index is a row that scrolls sideways, so the group being
  // shown can end up off-screen after an arrow key. Only the rail moves:
  // scrollIntoView would take the page with it, which on a section this far
  // down reads as the page throwing the reader somewhere.
  useEffect(() => {
    const tab = document.getElementById(`stack-tab-${group}`);
    const rail = tab?.parentElement;
    if (!rail || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: Math.max(0, tab.offsetLeft - 24), behavior: 'smooth' });
  }, [group]);

  // Arrow keys walk the index, which is what a tablist is expected to do and
  // what makes it usable without a mouse.
  const stepGroup = (event, id) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const step = keys[event.key];
    if (!step) return;
    event.preventDefault();
    const index = TECH_GROUPS.findIndex((entry) => entry.id === id);
    const next = TECH_GROUPS[(index + step + TECH_GROUPS.length) % TECH_GROUPS.length];
    setGroup(next.id);
    document.getElementById(`stack-tab-${next.id}`)?.focus();
  };

  const [openShelves, setOpenShelves] = useState([]);
  const allShelvesOpen = openShelves.length === READING.length;

  const toggleShelf = (id) =>
    setOpenShelves((open) => (open.includes(id) ? open.filter((x) => x !== id) : [...open, id]));

  const toggleAllShelves = () =>
    setOpenShelves((open) => (open.length === READING.length ? [] : READING.map((g) => g.id)));

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
      <Reveal className="cv-hero">
        <div className="cv-hero-portrait">
          <img src={image} alt={t('about.photoAlt')} />
        </div>
        <div className="cv-hero-copy">
          <span className="hub-badge">{t('cv.badge')}</span>
          <h1 className="cv-name">{t('about.name')}</h1>
          <p className="cv-role">{t('cv.role')}</p>
          {/* The specific claim, in the first viewport. The five seconds a
              visitor spends here used to buy them a job title; now they buy
              the one sentence nobody else on the internet can write. */}
          <p className="cv-claim">{t('cv.claim')}</p>
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

          {/* The proof is the primary action and the CV is secondary, which is
              the reverse of how this read before. A PDF is what somebody
              downloads once they are already interested; it is a poor thing to
              ask for on a phone from a reader who is not yet. */}
          <div className="cv-actions">
            <Link className="brand-link-out cv-primary" to="/radii">
              {t('cv.seeWork')}
              <ArrowRight />
            </Link>
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
      {/* Twelve groups and 285 tiles is a wall, and a wall is something a
          reader scrolls past rather than reads. Folded, the same content is
          twelve rows: the group name, how many marks are in it, and a way in.
          Nothing was cut — the count on each row is the whole group. */}
      <Section kicker={t('cv.skillsKicker')} title={t('cv.skillsTitle')} lede={t('cv.skillsLede')}>
        {/* An index and a panel, rather than everything at once or nothing
            at all.

            Four earlier attempts argued about how to fold 315 entries into a
            page; all of them were answering the wrong question. The section
            does not need to show every group at once — it needs to say how
            many groups there are, let a reader pick one, and give that one
            room to breathe. Twelve names on the left, one group's marks on
            the right, and the wall never happens. */}
        <Reveal className="stack">
          <div className="stack-index" role="tablist" aria-label={t('cv.skillsTitle')}>
            {TECH_GROUPS.map(({ id, items }) => (
              <button
                type="button"
                role="tab"
                id={`stack-tab-${id}`}
                aria-selected={group === id}
                aria-controls={`stack-panel-${id}`}
                tabIndex={group === id ? 0 : -1}
                className="stack-tab"
                key={id}
                onClick={() => setGroup(id)}
                onKeyDown={(event) => stepGroup(event, id)}
              >
                <span className="stack-tab-name">{t(`skills.groups.${id}`)}</span>
                <span className="stack-tab-count">{items.length}</span>
              </button>
            ))}
          </div>

          <div
            className="stack-panel"
            role="tabpanel"
            id={`stack-panel-${group}`}
            aria-labelledby={`stack-tab-${group}`}
            key={group}
          >
            <ul className="stack-marks">
              {(TECH_GROUPS.find((entry) => entry.id === group)?.items || []).map((item) => (
                <TechMark item={item} t={t} key={item.name} />
              ))}
            </ul>
          </div>
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
      </Section>

      {/* ----------------------------------------------- education + languages */}
      <Section kicker={t('cv.educationKicker')} title={t('education.heading').replace(':', '')}>
        <Reveal className="cv-split">
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

      {/* ------------------------------------------------------------- reading */}
      {/* Folded like the stack, and for the same reason: twenty-five books
          listed flat is a wall, and the shelf a reader wants is the one they
          came looking for. */}
      <Section
        kicker={t('cv.readingKicker')}
        title={t('cv.readingTitle')}
        lede={t('cv.readingLede')}
      >
        <FoldAll
          allOpen={allShelvesOpen}
          onToggle={toggleAllShelves}
          openLabel={t('cv.readingExpandAll')}
          closeLabel={t('cv.readingCollapseAll')}
        />

        <Reveal as="ul" className="fold-list">
          {READING.map(({ id, books }) => (
            <Fold
              key={id}
              id={`shelf-${id}`}
              title={t(`cv.readingGroups.${id}`)}
              open={openShelves.includes(id)}
              onToggle={() => toggleShelf(id)}
              label={`${books.length} ${t('cv.foldItems')}`}
            >
              <ul className="reading-list">
                {books.map(({ title, author, icon }) => (
                  <li key={title}>
                    <ConceptIcon className="list-icon" name={icon} />
                    <span className="reading-book">
                      <span className="reading-title">{title}</span>
                      <span className="reading-author">{author}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Fold>
          ))}
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
        <div className="hub-teaser-copy">
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
