import { useTranslation } from '../../i18n/I18nProvider';
import { EvodepsArt } from '../marks/RoleArt';
import evodepsLogo from '../../images/evodeps.png';
import {
  ArrowUpRight,
  BrandFooterNav,
  BrandHero,
  CardGrid,
  Closing,
  Reveal,
  Section,
  Steps,
} from './parts';

const EVODEPS_URL = 'https://evodeps.com/';

const OFFER_KEYS = ['software', 'equipment', 'prototypes'];
const VALUE_KEYS = ['innovation', 'quality', 'team', 'adaptability', 'client', 'security'];

const ICONS = {
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-.9 1.1-.9 1.8H9.3c0-.7-.3-1.3-.9-1.8A6 6 0 0 1 12 3z" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 6.5 10 17l-5.5-5.5" />
      <path d="M20.5 12.5v5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h9" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.6" />
      <path d="M2.5 19v-1.6A4.4 4.4 0 0 1 6.9 13h2.2a4.4 4.4 0 0 1 4.4 4.4V19" />
      <path d="M15.5 13.2h1.6a4.4 4.4 0 0 1 4.4 4.4V19" />
    </svg>
  ),
  adaptability: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="3" width="8" height="8" rx="2" />
      <rect x="13.5" y="13" width="8" height="8" rx="4" />
      <path d="M13.5 7h5a2 2 0 0 1 2 2v1.5" />
      <path d="m18.2 4.4 2.6 2.6-2.6 2.6" />
    </svg>
  ),
  client: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4.5 6v6c0 4.4 3.1 7.9 7.5 9 4.4-1.1 7.5-4.6 7.5-9V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  ),
};

const EvodepsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="evodeps">
      <BrandHero
        art={<EvodepsArt />}
        backTo="/experience"
        backLabel={t('common.backToExperience')}
        mark={<img className="brand-hero-mark" src={evodepsLogo} alt={t('roles.evodeps.company')} />}
        eyebrow={t('roles.evodeps.badge')}
        live
        title={t('roles.evodeps.heroTitle')}
        tagline={t('roles.evodeps.tagline')}
        lede={t('roles.evodeps.heroLede')}
        meta={
          <>
            <strong>{t('roles.evodeps.company')}</strong>
            <span>{t('roles.evodeps.period')}</span>
          </>
        }
        actions={
          <a className="brand-link-out" href={EVODEPS_URL} target="_blank" rel="noopener noreferrer">
            evodeps.com
            <ArrowUpRight />
          </a>
        }
      />

      <div className="brand-body">
        <Section kicker={t('roles.evodeps.kickers.what')} title={t('roles.evodeps.whatTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('roles.evodeps.whatBody')}</p>
            <p className="brand-note">{t('roles.evodeps.whatNote')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.evodeps.kickers.offer')}
          title={t('roles.evodeps.offerTitle')}
          lede={t('roles.evodeps.offerLede')}
        >
          <Steps
            items={OFFER_KEYS.map((key) => ({
              key,
              title: t(`roles.evodeps.offer.${key}.title`),
              body: t(`roles.evodeps.offer.${key}.body`),
            }))}
          />
        </Section>

        <Section kicker={t('roles.evodeps.kickers.purpose')}>
          <Reveal className="brand-lanes" stagger>
            <article className="brand-lane">
              <span className="brand-lane-label">{t('roles.evodeps.missionLabel')}</span>
              <p className="brand-lane-statement">{t('roles.evodeps.missionBody')}</p>
            </article>
            <article className="brand-lane" data-lane="two">
              <span className="brand-lane-label">{t('roles.evodeps.visionLabel')}</span>
              <p className="brand-lane-statement">{t('roles.evodeps.visionBody')}</p>
            </article>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.evodeps.kickers.values')}
          title={t('roles.evodeps.valuesTitle')}
          lede={t('roles.evodeps.valuesLede')}
        >
          <CardGrid
            items={VALUE_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`roles.evodeps.values.${key}.title`),
              body: t(`roles.evodeps.values.${key}.body`),
            }))}
          />
        </Section>

        <Closing title={t('roles.evodeps.roleTitle')}>
          <p className="brand-p">{t('roles.evodeps.roleBody')}</p>
        </Closing>


        <BrandFooterNav to="/experience" labelKey="common.backToExperience" />
      </div>
    </div>
  );
};

export default EvodepsPage;
