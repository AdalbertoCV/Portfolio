import { useTranslation } from '../../i18n/I18nProvider';
import { CaseArt, CaseMark } from '../marks/RoleArt';
import {
  BrandFooterNav,
  BrandHero,
  CardGrid,
  Closing,
  Reveal,
  Section,
  StatGrid,
} from './parts';

const STAT_KEYS = ['years', 'students', 'subjects', 'programs'];
const SUBJECT_KEYS = ['algebra', 'calculus', 'oop', 'dataStructures', 'discrete'];
const LEARNED_KEYS = ['transfer', 'teamwork', 'support', 'lead'];

const ICONS = {
  // Knowledge handed over: one node passing to another, which is the mark's
  // idea at icon scale.
  transfer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="4.6" cy="12" r="2.8" fill="currentColor" stroke="none" />
      <circle cx="19.4" cy="12" r="2.8" />
      <path d="M8.2 12h4.4" />
      <path d="m13 9.6 2.4 2.4-2.4 2.4" />
    </svg>
  ),
  teamwork: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 14.5a4.5 4.5 0 0 1 4.5 4.3" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 8.6a4.1 4.1 0 0 1 7.5 2.5c0 5-7.5 9.4-7.5 9.4z" />
      <path d="M12 8.6V3.5" />
    </svg>
  ),
  lead: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 20.5V3.5" />
      <path d="M5 5h10.5l-1.8 3.4 1.8 3.4H5" />
      <circle cx="5" cy="20.5" r="1.4" />
    </svg>
  ),
};

const CasePage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="case">
      <BrandHero
        art={<CaseArt />}
        backTo="/experience"
        backLabel={t('common.backToExperience')}
        mark={<CaseMark className="brand-hero-mark" title={t('roles.case.company')} />}
        eyebrow={t('roles.case.badge')}
        title={t('roles.case.heroTitle')}
        tagline={t('roles.case.tagline')}
        lede={t('roles.case.heroLede')}
        meta={
          <>
            <strong>{t('roles.case.company')}</strong>
            <span>{t('roles.case.period')}</span>
          </>
        }
      />

      <div className="brand-body">
        <Section kicker={t('roles.case.statsTitle')}>
          <StatGrid
            items={STAT_KEYS.map((key) => ({
              key,
              value: t(`roles.case.stats.${key}.value`),
              label: t(`roles.case.stats.${key}.label`),
            }))}
          />
        </Section>

        <Section kicker={t('roles.case.kickers.what')} title={t('roles.case.whatTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('roles.case.whatBody')}</p>
            <p className="brand-note">{t('roles.case.whatNote')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.case.kickers.subjects')}
          title={t('roles.case.subjectsTitle')}
          lede={t('roles.case.subjectsLede')}
        >
          {/* A syllabus rather than five cards: each subject carries the one
              line that says how it fails, which is the content a card heading
              has nowhere to put. */}
          <Reveal className="case-subjects" stagger>
            {SUBJECT_KEYS.map((key, index) => (
              <article className="case-subject" key={key}>
                <span className="case-subject-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{t(`roles.case.subjects.${key}.title`)}</h3>
                <span className="case-subject-wall">
                  {t(`roles.case.subjects.${key}.wall`)}
                </span>
                <p className="case-subject-body">{t(`roles.case.subjects.${key}.body`)}</p>
              </article>
            ))}
          </Reveal>
        </Section>

        <Section
          kicker={t('roles.case.kickers.learned')}
          title={t('roles.case.learnedTitle')}
          lede={t('roles.case.learnedLede')}
        >
          <CardGrid
            items={LEARNED_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`roles.case.learned.${key}.title`),
              body: t(`roles.case.learned.${key}.body`),
            }))}
          />
        </Section>

        <Closing title={t('roles.case.roleTitle')}>
          <p className="brand-p">{t('roles.case.roleBody')}</p>
        </Closing>

        <BrandFooterNav to="/experience" labelKey="common.backToExperience" />
      </div>
    </div>
  );
};

export default CasePage;
