import { useTranslation } from '../../i18n/I18nProvider';
import StageChip from '../ventures/StageChip';
import { StackSelectArt, StackSelectMark } from '../marks/StackSelectMark';
import {
  BrandFooterNav,
  BrandHero,
  CardGrid,
  Closing,
  Reveal,
  Section,
  StatGrid,
} from './parts';

const SOLUTION_KEYS = ['train', 'assess', 'place'];
const VALUE_KEYS = ['commitment', 'empathy', 'solidarity'];

const ICONS = {
  train: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 12 4l9 4.5-9 4.5z" />
      <path d="M7 10.8V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.2" />
      <path d="M21 8.5V14" />
    </svg>
  ),
  assess: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="m8 12 2.6 2.6L16 9.2" />
    </svg>
  ),
  place: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20v-2.5A3.5 3.5 0 0 1 7.5 14h3A3.5 3.5 0 0 1 14 17.5V20" />
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M17 11.5V4" />
      <path d="m14 7 3-3 3 3" />
    </svg>
  ),
};

const StackSelectPage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="stackselect">
      <BrandHero
        art={<StackSelectArt />}
        backTo="/ventures"
        backLabel={t('common.backToVentures')}
        mark={<StackSelectMark className="brand-hero-mark" title={t('stackselect.company')} />}
        eyebrow={t('stackselect.badge')}
        live
        title={t('stackselect.heroTitle')}
        lede={t('stackselect.heroLede')}
        meta={
          <>
            <strong>{t('stackselect.company')}</strong>
            <span>{t('stackselect.period')}</span>
          </>
        }
        actions={<span className="brand-soon">{t('ventures.siteSoon')}</span>}
      />

      <div className="brand-body">
        {/* Dates, because dates are the only proof a company that has not opened
            yet can honestly give — and a dated commitment can be checked, which
            "coming soon" never could. */}
        <Section title={t('stackselect.statusTitle')} lede={t('stackselect.statusLede')}>
          <StatGrid
            items={['operating', 'official', 'deliverable'].map((key) => ({
              key,
              value: t(`stackselect.status.${key}.value`),
              label: t(`stackselect.status.${key}.label`),
            }))}
          />
          <Reveal>
            <p className="brand-note">{t('stackselect.statusNote')}</p>
            <StageChip />
          </Reveal>
        </Section>

        <Section kicker={t('stackselect.kickers.name')} title="Stack · Select">
          <Reveal>
            <p className="brand-p">{t('stackselect.nameBody')}</p>
          </Reveal>
        </Section>

        <Section kicker={t('stackselect.kickers.problem')} title={t('stackselect.problemTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('stackselect.problemBody')}</p>
            <p className="brand-note">{t('stackselect.problemStat')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('stackselect.kickers.solution')}
          title={t('stackselect.solutionLede')}
        >
          <CardGrid
            items={SOLUTION_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`stackselect.solution.${key}.title`),
              body: t(`stackselect.solution.${key}.body`),
            }))}
          />
        </Section>

        <Section kicker={t('stackselect.kickers.edge')} title={t('stackselect.edgeTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('stackselect.edgeBody')}</p>
            {/* Kept deliberately: a founder page that only lists strengths reads
                as a brochure. The brief named this weakness outright. */}
            <p className="brand-note">{t('stackselect.edgeHonest')}</p>
          </Reveal>
        </Section>

        <Section kicker={t('stackselect.kickers.values')} title={t('stackselect.valuesTitle')}>
          <CardGrid
            items={VALUE_KEYS.map((key) => ({
              key,
              title: t(`stackselect.values.${key}.title`),
              body: t(`stackselect.values.${key}.body`),
            }))}
          />
        </Section>

        <Section kicker={t('stackselect.kickers.purpose')}>
          <Reveal className="brand-principle">
            <p className="brand-principle-label">{t('stackselect.tagline')}</p>
            <p className="brand-principle-line">{t('stackselect.purposeBody')}</p>
          </Reveal>
        </Section>

        <Closing title={t('stackselect.roleTitle')}>
          <p className="brand-p">{t('stackselect.roleBody')}</p>
        </Closing>


        <BrandFooterNav to="/ventures" labelKey="common.backToVentures" />
      </div>
    </div>
  );
};

export default StackSelectPage;
