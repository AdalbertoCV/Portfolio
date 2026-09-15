import { useTranslation } from '../../i18n/I18nProvider';
import { FreelanceArt, FreelanceMark } from '../marks/RoleArt';
import {
  BrandFooterNav,
  BrandHero,
  CardGrid,
  Closing,
  Reveal,
  Section,
  Steps,
} from './parts';

const HOW_KEYS = ['domain', 'choose', 'build', 'own'];
const GAVE_KEYS = ['interdisciplinary', 'impact', 'judgement', 'ownership'];

const ICONS = {
  interdisciplinary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="10" r="5.5" />
      <circle cx="15" cy="10" r="5.5" />
      <path d="M4 21v-.8A3.2 3.2 0 0 1 7.2 17h9.6a3.2 3.2 0 0 1 3.2 3.2V21" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  ),
  judgement: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7 2.5 13h5z" />
      <path d="M19 7l-2.5 6h5z" />
      <path d="M8.5 21h7" />
    </svg>
  ),
  ownership: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4.5 6.2v5.4c0 4.4 3.1 8.2 7.5 9.4 4.4-1.2 7.5-5 7.5-9.4V6.2z" />
      <path d="M12 8.5v4" />
      <path d="M12 15.5h.01" />
    </svg>
  ),
};

const FreelancePage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="freelance">
      <BrandHero
        art={<FreelanceArt />}
        backTo="/experience"
        backLabel={t('common.backToExperience')}
        mark={<FreelanceMark className="brand-hero-mark" title={t('roles.freelance.company')} />}
        eyebrow={t('roles.freelance.badge')}
        live
        title={t('roles.freelance.heroTitle')}
        tagline={t('roles.freelance.tagline')}
        lede={t('roles.freelance.heroLede')}
        meta={
          <>
            <strong>{t('roles.freelance.company')}</strong>
            <span>{t('roles.freelance.period')}</span>
          </>
        }
      />

      <div className="brand-body">
        <Section kicker={t('roles.freelance.kickers.why')} title={t('roles.freelance.whyTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('roles.freelance.whyBody')}</p>
            <p className="brand-p">{t('roles.freelance.whyBody2')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.freelance.kickers.how')}
          title={t('roles.freelance.howTitle')}
          lede={t('roles.freelance.howLede')}
        >
          <Steps
            items={HOW_KEYS.map((key) => ({
              key,
              title: t(`roles.freelance.how.${key}.title`),
              body: t(`roles.freelance.how.${key}.body`),
            }))}
          />
        </Section>

        <Section kicker={t('roles.freelance.kickers.gave')} title={t('roles.freelance.gaveTitle')}>
          <CardGrid
            items={GAVE_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`roles.freelance.gave.${key}.title`),
              body: t(`roles.freelance.gave.${key}.body`),
            }))}
          />
        </Section>

        <Closing title={t('roles.freelance.roleTitle')}>
          <p className="brand-p">{t('roles.freelance.roleBody')}</p>
        </Closing>


        <BrandFooterNav to="/experience" labelKey="common.backToExperience" />
      </div>
    </div>
  );
};

export default FreelancePage;
