import { useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { MoonphaseArt, MoonphaseMark } from '../marks/MoonphaseMark';
import {
  BrandFooterNav,
  BrandHero,
  Chevron,
  Closing,
  Reveal,
  Section,
  StatGrid,
  Steps,
} from './parts';

const METHOD_KEYS = ['feasibility', 'scope', 'build', 'record'];

// Ordered deliberately: the seven values follow the arc of a project, from
// seeing it through to knowing why it mattered.
const VALUE_KEYS = [
  'perspective',
  'courage',
  'grit',
  'ownership',
  'documentNo',
  'craft',
  'betterWorld',
];

/**
 * One value per row, expanding in place. An accordion rather than seven open
 * paragraphs: the list of seven names is itself the argument, and it only reads
 * as a list if you can see all seven at once.
 */
const ValueList = () => {
  const { t } = useTranslation();
  // Multiple rows may be open at once — this is reading material, not a
  // single-choice control, and collapsing one to read the next loses the
  // comparison the reader was making.
  const [open, setOpen] = useState(() => new Set());

  const toggle = (key) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <Reveal className="brand-values">
      {VALUE_KEYS.map((key, index) => {
        const isOpen = open.has(key);
        const panelId = `mp-value-${key}`;
        return (
          <div className={`brand-value${isOpen ? ' is-open' : ''}`} key={key}>
            <button
              type="button"
              className="brand-value-trigger"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="brand-value-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="brand-value-name">{t(`moonphase.values.${key}.title`)}</span>
              <span className="brand-value-motto">{t(`moonphase.values.${key}.motto`)}</span>
              <Chevron className="brand-value-chevron" />
            </button>
            {/* Always rendered and never `hidden`: the grid-row trick in
                brand.css animates the height, and `[hidden]` sets display:none,
                which would snap it open instead of opening it. The panel holds
                prose only, so nothing focusable is reachable while collapsed. */}
            <div className="brand-value-panel" id={panelId} role="region">
              <div>
                <p>
                  <span className="brand-value-motto-inline">
                    {t(`moonphase.values.${key}.motto`)}
                  </span>
                  {t(`moonphase.values.${key}.body`)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
};

const MoonphasePage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="moonphase">
      <BrandHero
        art={<MoonphaseArt />}
        backTo="/ventures"
        backLabel={t('common.backToVentures')}
        mark={<MoonphaseMark className="brand-hero-mark" title={t('moonphase.company')} />}
        eyebrow={t('moonphase.badge')}
        live
        title={t('moonphase.heroTitle')}
        tagline={t('moonphase.tagline')}
        lede={t('moonphase.heroLede')}
        meta={
          <>
            <strong>{t('moonphase.company')}</strong>
            <span>{t('moonphase.period')}</span>
          </>
        }
        actions={<span className="brand-soon">{t('ventures.siteSoon')}</span>}
      />

      <div className="brand-body">
        {/* Dates, because dates are the only proof a company that has not opened
            yet can honestly give — and a dated commitment can be checked, which
            "coming soon" never could. */}
        <Section title={t('moonphase.statusTitle')} lede={t('moonphase.statusLede')}>
          <StatGrid
            items={['first', 'operating', 'official'].map((key) => ({
              key,
              value: t(`moonphase.status.${key}.value`),
              label: t(`moonphase.status.${key}.label`),
            }))}
          />
          <Reveal>
            <p className="brand-note">{t('moonphase.statusNote')}</p>
          </Reveal>
        </Section>

        <Section kicker={t('moonphase.kickers.name')} title={t('moonphase.nameTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('moonphase.nameBody')}</p>
            <p className="brand-p">{t('moonphase.nameBody2')}</p>
          </Reveal>
        </Section>

        <Section kicker={`${t('moonphase.missionLabel')} · ${t('moonphase.visionLabel')}`}>
          <Reveal className="brand-lanes" stagger>
            {/* No heading inside these two: the label above already names the
                card, and the statement itself is the content. A heading here
                could only repeat one or the other. */}
            <article className="brand-lane">
              <span className="brand-lane-label">{t('moonphase.missionLabel')}</span>
              <p className="brand-lane-statement">{t('moonphase.missionBody')}</p>
            </article>
            <article className="brand-lane" data-lane="two">
              <span className="brand-lane-label">{t('moonphase.visionLabel')}</span>
              <p className="brand-lane-statement">{t('moonphase.visionBody')}</p>
            </article>
          </Reveal>
        </Section>

        {/* The method comes before the lanes on purpose: the two lanes only
            read as a business model once you know both are run the same way. */}
        <Section
          kicker={t('moonphase.kickers.method')}
          title={t('moonphase.methodTitle')}
          lede={t('moonphase.methodLede')}
        >
          <Steps
            items={METHOD_KEYS.map((key) => ({
              key,
              title: t(`moonphase.method.${key}.title`),
              body: t(`moonphase.method.${key}.body`),
            }))}
          />
        </Section>

        <Section>
          <Reveal className="brand-principle">
            <p className="brand-principle-label">{t('moonphase.principleLabel')}</p>
            <p className="brand-principle-line">{t('moonphase.principleLine1')}</p>
            <p className="brand-principle-line">{t('moonphase.principleLine2')}</p>
            <p className="brand-principle-body">{t('moonphase.principleBody')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('moonphase.kickers.lanes')}
          title={t('moonphase.lanesTitle')}
          lede={t('moonphase.lanesLede')}
        >
          <Reveal className="brand-lanes" stagger>
            <article className="brand-lane">
              <span className="brand-lane-label">{t('moonphase.laneOne.label')}</span>
              <h3>{t('moonphase.laneOne.title')}</h3>
              <p>{t('moonphase.laneOne.body')}</p>
              <p className="brand-lane-note">{t('moonphase.laneOne.note')}</p>
            </article>
            <article className="brand-lane" data-lane="two">
              <span className="brand-lane-label">{t('moonphase.laneTwo.label')}</span>
              <h3>{t('moonphase.laneTwo.title')}</h3>
              <p>{t('moonphase.laneTwo.body')}</p>
              <p className="brand-lane-note">{t('moonphase.laneTwo.note')}</p>
            </article>
          </Reveal>
        </Section>

        <Section
          kicker={t('moonphase.kickers.values')}
          title={t('moonphase.valuesTitle')}
          lede={t('moonphase.valuesLede')}
        >
          <p className="brand-values-hint">{t('moonphase.valuesHint')}</p>
          <ValueList />
        </Section>

        <Closing title={t('moonphase.roleTitle')}>
          <p className="brand-p">{t('moonphase.roleBody')}</p>
        </Closing>


        <BrandFooterNav to="/ventures" labelKey="common.backToVentures" />
      </div>
    </div>
  );
};

export default MoonphasePage;
