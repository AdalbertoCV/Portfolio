import { Link } from 'react-router-dom';
import labsolLogo from '../../images/Labsol.png';
import freelance from '../../images/freelance.png';
import radii from '../../images/radii.png';
import evodeps from '../../images/evodeps.png';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight, Reveal } from '../brand/parts';
import RadiiArt from '../marks/RadiiArt';

// Roles where someone else did the hiring. The two companies Adalberto founded
// live on /ventures — see the note there for why they are not on this list.
//
// `base` is the dictionary path rather than a set of copied strings, so a role
// keeps one source of truth across this page and its own brand page.
const ROLES = [
  { id: 'evodeps', base: 'evodeps', logo: evodeps, to: '/evodeps', link: 'https://evodeps.com/' },
  { id: 'freelance', base: 'experience.freelance', logo: freelance, to: '/freelance' },
  {
    id: 'labsol',
    base: 'experience.labsol',
    logo: labsolLogo,
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

      <ol className="timeline">
        {ROLES.map(({ id, base, logo, to, link }) => (
          <li className="timeline-item" key={id}>
            <Reveal className="timeline-row">
              <span className="timeline-dot" aria-hidden="true" />
              <article className="timeline-card">
                <div className="timeline-head">
                  <img className="timeline-logo" src={logo} alt={t(`${base}.company`)} />
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
                  <Link className="timeline-story" to={to}>
                    {t('timeline.readStory')}
                    <ArrowRight />
                  </Link>
                  {link ? (
                    <a
                      className="timeline-link"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('timeline.visitSite')}
                      <ArrowUpRight />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal className="hub-teaser">
        <div>
          <h2 className="brand-h2">{t('timeline.venturesTitle')}</h2>
          <p className="brand-p">{t('timeline.venturesLede')}</p>
        </div>
        <Link className="brand-link-out hub-teaser-cta" to="/ventures">
          {t('timeline.venturesCta')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default Experience;
