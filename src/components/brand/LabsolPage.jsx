import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { LabsolArt } from '../marks/RoleArt';
import labsolLogo from '../../images/Labsol.png';
import {
  ArrowRight,
  ArrowUpRight,
  BrandFooterNav,
  BrandHero,
  CardGrid,
  Closing,
  Reveal,
  Section,
} from './parts';

const LABSOL_URL = 'https://labsol.cozcyt.gob.mx/';

const DELIVERED_KEYS = ['cosiap', 'cargas'];
const LEARNED_KEYS = ['endToEnd', 'requirements', 'design', 'management'];

const ICONS = {
  endToEnd: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="4.5" cy="12" r="2.5" />
      <circle cx="19.5" cy="12" r="2.5" />
      <path d="M7 12h10" />
      <path d="m14.5 9 3 3-3 3" />
    </svg>
  ),
  requirements: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3.5h9L19 8v12.5H5z" />
      <path d="M14 3.5V8h5" />
      <path d="M8.5 12.5h7M8.5 16h4" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3.5 16.5 6-13 6 13" />
      <path d="M6 12h7" />
      <path d="M17 14.5 19 19l-4.5-1.4" />
      <circle cx="18.5" cy="12" r="2" />
    </svg>
  ),
  management: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="m8.5 15 2 2 4-4" />
    </svg>
  ),
};

const LabsolPage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="labsol">
      <BrandHero
        art={<LabsolArt />}
        backTo="/experience"
        backLabel={t('common.backToExperience')}
        mark={<img className="brand-hero-mark" src={labsolLogo} alt={t('roles.labsol.company')} />}
        eyebrow={t('roles.labsol.badge')}
        title={t('roles.labsol.heroTitle')}
        tagline={t('roles.labsol.tagline')}
        lede={t('roles.labsol.heroLede')}
        meta={
          <>
            <strong>{t('roles.labsol.company')}</strong>
            <span>{t('roles.labsol.period')}</span>
          </>
        }
        actions={
          <a className="brand-link-out" href={LABSOL_URL} target="_blank" rel="noopener noreferrer">
            labsol.cozcyt.gob.mx
            <ArrowUpRight />
          </a>
        }
      />

      <div className="brand-body">
        <Section kicker={t('roles.labsol.kickers.what')} title={t('roles.labsol.whatTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('roles.labsol.whatBody')}</p>
            <p className="brand-note">{t('roles.labsol.whatNote')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.labsol.kickers.delivered')}
          title={t('roles.labsol.deliveredTitle')}
          lede={t('roles.labsol.deliveredLede')}
        >
          {/* The two systems get the lane treatment rather than a card grid:
              there are only two, and each carries the institution it went to,
              which a card's single heading has nowhere to put. */}
          <Reveal className="brand-lanes" stagger>
            {DELIVERED_KEYS.map((key, index) => (
              <article className="brand-lane" data-lane={index === 1 ? 'two' : undefined} key={key}>
                <span className="brand-lane-label">{t(`roles.labsol.delivered.${key}.org`)}</span>
                <h3>{t(`roles.labsol.delivered.${key}.title`)}</h3>
                <p>{t(`roles.labsol.delivered.${key}.body`)}</p>
              </article>
            ))}
          </Reveal>

          <Reveal className="brand-hero-actions">
            <Link className="brand-link-out" to="/projects">
              {t('roles.labsol.deliveredCta')}
              <ArrowRight />
            </Link>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.labsol.kickers.learned')}
          title={t('roles.labsol.learnedTitle')}
          lede={t('roles.labsol.learnedLede')}
        >
          <CardGrid
            items={LEARNED_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`roles.labsol.learned.${key}.title`),
              body: t(`roles.labsol.learned.${key}.body`),
            }))}
          />
        </Section>

        <Closing title={t('roles.labsol.roleTitle')}>
          <p className="brand-p">{t('roles.labsol.roleBody')}</p>
        </Closing>

        <BrandFooterNav to="/experience" labelKey="common.backToExperience" />
      </div>
    </div>
  );
};

export default LabsolPage;
