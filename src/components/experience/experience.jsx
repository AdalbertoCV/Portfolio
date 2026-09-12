import { Link } from 'react-router-dom';
import labsolLogo from '../../images/Labsol.png';
import radii from '../../images/radii.png';
import evodeps from '../../images/evodeps.png';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Reveal } from '../brand/parts';
import RadiiArt from '../marks/RadiiArt';
import VenturesRoadmap from '../ventures/VenturesRoadmap';
import { EvodepsArt, FreelanceArt, FreelanceMark, LabsolArt } from '../marks/RoleArt';

// Roles where someone else did the hiring. The two companies Adalberto founded
// live on /ventures — see the note there for why they are not on this list.
//
// `base` is the dictionary path rather than a set of copied strings, so a role
// keeps one source of truth across this page and its own brand page.
//
// Each row carries the same artwork and colour world as its own story page, so
// the card is a preview of where it goes rather than a grey box that happens to
// link there.
const ROLES = [
  {
    id: 'evodeps',
    base: 'evodeps',
    logo: <img className="timeline-logo" src={evodeps} alt="" aria-hidden="true" />,
    Art: EvodepsArt,
    to: '/evodeps',
    link: 'https://evodeps.com/',
  },
  {
    id: 'freelance',
    base: 'experience.freelance',
    // The three overlapping rings rather than the stock illustration of a man
    // in a headset: that clipart is not an identity, and it fights the card's
    // own colour world.
    logo: <FreelanceMark className="timeline-logo timeline-logo-mark" />,
    Art: FreelanceArt,
    to: '/freelance',
  },
  {
    id: 'labsol',
    base: 'experience.labsol',
    logo: <img className="timeline-logo" src={labsolLogo} alt="" aria-hidden="true" />,
    Art: LabsolArt,
    to: '/labsol',
    link: 'https://labsol.cozcyt.gob.mx/',
  },
];

const RADII_URL = 'https://www.radii.com.mx/es';

const Experience = () => {
  const { t } = useTranslation();

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('timeline.badge')}</span>
        <h1 className="hub-title">{t('timeline.title')}</h1>
        <p className="hub-lede">{t('timeline.lede')}</p>
      </Reveal>

      {/* Radii is the headline act, so it gets its own colour world and a card
          roughly three times the visual weight of a timeline row. Anything less
          and "current focus" is a claim the layout contradicts. */}
      <Reveal className="featured-role" data-brand="radii">
        <div className="featured-art" aria-hidden="true">
          <RadiiArt />
        </div>
        <div className="featured-inner">
          <span className="featured-label">
            <span className="brand-eyebrow-dot" />
            {t('timeline.featuredLabel')}
          </span>
          <img className="featured-logo" src={radii} alt={t('radii.company')} />
          <h2 className="featured-name">{t('experience.radii.company')}</h2>
          <p className="featured-role-title">{t('experience.radii.title')}</p>
          <p className="featured-period">{t('experience.radii.period')}</p>
          <p className="featured-body">{t('experience.radii.body')}</p>
          <div className="featured-actions">
            <Link className="brand-link-out" to="/radii">
              {t('timeline.readStory')}
              <ArrowRight />
            </Link>
            <a
              className="featured-out"
              href={RADII_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('timeline.visitSite')}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </Reveal>

      {/* The list is a Reveal purely so the spark that runs down the spine
          starts for every row at the same moment. If each row gated its own
          spark, row two would start counting only once it scrolled into view
          and the light would stop reading as one continuous descent. The list's
          own fade is switched off in CSS — the rows still fade in themselves. */}
      <Reveal as="ol" className="timeline">
        {ROLES.map(({ id, base, logo, Art, to, link }, index) => (
          <li className="timeline-item" key={id}>
            {/* --row drives the stagger: each row's spark runs its own slice of
                the shared cycle, so the light descends rather than flashing
                everywhere at once. */}
            <Reveal className="timeline-row" data-brand={id} style={{ '--row': index }}>
              <span className="timeline-dot" aria-hidden="true" />
              <article className="timeline-card">
                <div className="timeline-art" aria-hidden="true">
                  <Art />
                </div>
                <div className="timeline-inner">
                  <div className="timeline-head">
                    {logo}
                    <div className="timeline-heading">
                      <h2>{t(`${base}.company`)}</h2>
                      <p className="timeline-role">{t(`${base}.title`)}</p>
                    </div>
                    <span className="timeline-period">{t(`${base}.period`)}</span>
                  </div>
                  <p className="timeline-body">{t(`${base}.body`)}</p>
                  {/* The story is the primary action; the company's own site is
                      secondary, so it reads as a footnote rather than competing
                      with it. */}
                  <div className="timeline-actions">
                    <Link className="brand-link-out" to={to}>
                      {t('timeline.readStory')}
                      <ArrowRight />
                    </Link>
                    {link ? (
                      <a
                        className="featured-out"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('timeline.visitSite')}
                        <ArrowUpRight />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </Reveal>

      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('timeline.venturesTitle')}</h2>
          <p className="brand-p">{t('timeline.venturesLede')}</p>
        </div>
        <VenturesRoadmap />
        <Link className="brand-link-out hub-teaser-cta" to="/ventures">
          {t('timeline.venturesCta')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default Experience;
