import { useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import { CRITERIA, CURRENT_STAGE, FRONTS, STAGES, VENTURES } from './plan';

// The ventures' operating plan, as a section of /ventures. It is our own
// reminder of where the focus goes before it is anything else, which is why
// the current stage's actions sit above everything and the section opens on
// the current stage.

const STATE_MARK = { done: '✓', active: '◐', pending: '○' };
const currentIndex = STAGES.findIndex((stage) => stage.id === CURRENT_STAGE);
const current = STAGES[currentIndex];

// The standard tablist keys, with wrap-around: both rails are short enough
// that stopping dead at either end would only feel broken.
const moveFor = (key, index, count) =>
  ({ ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1 })[key];

const Tabs = ({ label, items, selected, onSelect, idPrefix, render, className }) => {
  const refs = useRef([]);
  const select = (index) => {
    const wrapped = (index + items.length) % items.length;
    onSelect(items[wrapped]);
    refs.current[wrapped]?.focus();
  };
  return (
    <div className={className} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button
          key={item}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-${item}`}
          aria-selected={item === selected}
          aria-controls="plan-panel"
          tabIndex={item === selected ? 0 : -1}
          onClick={() => onSelect(item)}
          onKeyDown={(event) => {
            const move = moveFor(event.key, index, items.length);
            if (move === undefined) return;
            event.preventDefault();
            select(move);
          }}
          {...render(item, index)}
        />
      ))}
    </div>
  );
};

const VenturesPlan = () => {
  const { t, tl } = useTranslation();
  const [stage, setStage] = useState(CURRENT_STAGE);
  const [ventureId, setVentureId] = useState(VENTURES[0].id);
  const venture = VENTURES.find((item) => item.id === ventureId);
  const base = `plan.${ventureId}.${stage}`;
  const criteria = CRITERIA[ventureId][stage];

  const ventureName = (id) =>
    id === 'moonphase' && stage === 'incubate' ? t('plan.names.freelanceMoonphase') : t(`plan.names.${id}`);

  return (
    <section className="plan-section" id="plan" aria-labelledby="plan-title">
      <Reveal className="plan-head">
        <h2 className="brand-h2" id="plan-title">
          {t('plan.title')}
        </h2>
        <p className="brand-p">{t('plan.lede')}</p>
      </Reveal>

      <section className="plan-focus" aria-labelledby="plan-focus-title">
        <h3 className="plan-focus-title" id="plan-focus-title">
          {t('plan.focusTitle')}
        </h3>
        <p className="plan-focus-stage">{t(`plan.stages.${current.id}.name`)}</p>
        <ol className="plan-focus-list">
          {current.focusNow.map((action) => (
            <li key={action}>{t(`plan.stages.${current.id}.now.${action}`)}</li>
          ))}
        </ol>
      </section>

      <Tabs
        className="plan-rail"
        label={t('plan.stageTabs')}
        items={STAGES.map((item) => item.id)}
        selected={stage}
        onSelect={setStage}
        idPrefix="plan-stage"
        render={(id, index) => {
          const phase = index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future';
          return {
            className: `plan-stage plan-stage-${phase}${id === stage ? ' is-selected' : ''}`,
            children: (
              <>
                <span className="plan-node" aria-hidden="true" />
                <span className="plan-stage-name">{t(`plan.stages.${id}.name`)}</span>
                <span className="plan-stage-window">{t(`plan.stages.${id}.window`)}</span>
                {phase === 'current' ? <span className="plan-here">{t('plan.here')}</span> : null}
              </>
            ),
          };
        }}
      />

      <p className="plan-tagline">{t(`plan.stages.${stage}.tagline`)}</p>

      <Tabs
        className="plan-ventures"
        label={t('plan.ventureTabs')}
        items={VENTURES.map((item) => item.id)}
        selected={ventureId}
        onSelect={setVentureId}
        idPrefix="plan-venture"
        render={(id) => ({
          className: `plan-venture-tab${id === ventureId ? ' is-selected' : ''}`,
          'data-brand': id,
          children: ventureName(id),
        })}
      />

      <div
        className="plan-panel"
        role="tabpanel"
        id="plan-panel"
        aria-labelledby={`plan-venture-${ventureId}`}
        tabIndex={0}
        data-brand={venture.brand}
      >
        <h3 className="plan-venture-title">{ventureName(ventureId)}</h3>

        <div className="plan-objective">
          <span className="plan-label">{t('plan.objectiveTitle')}</span>
          <p>{t(`${base}.objective`)}</p>
        </div>

        <div className="plan-summary">
          <div>
            <h4 className="plan-label">{t('plan.modelTitle')}</h4>
            <p>{t(`${base}.model`)}</p>
          </div>
          <div>
            <h4 className="plan-label">{t('plan.metricsTitle')}</h4>
            <ul className="plan-metrics">
              {tl(`${base}.metrics`).map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </div>
        </div>

        <h4 className="plan-label">{t('plan.frontsTitle')}</h4>
        <div className="plan-fronts">
          {FRONTS[ventureId][stage].map((front) => (
            <article className={`plan-front${front === venture.featured ? ' is-featured' : ''}`} key={front}>
              <h5 className="plan-front-title">{t(`plan.frontNames.${ventureId}.${front}`)}</h5>
              <ul>
                {tl(`${base}.fronts.${front}`).map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h4 className="plan-label">{t('plan.risksTitle')}</h4>
        <ul className="plan-risks">
          {tl(`${base}.risks`).map(({ risk, mitigation }) => (
            <li key={risk}>
              <p className="plan-risk">{risk}</p>
              <p className="plan-mitigation">
                <span className="plan-mitigation-label">{t('plan.mitigationLabel')}</span>
                {mitigation}
              </p>
            </li>
          ))}
        </ul>

        <h4 className="plan-label">{t('plan.exitTitle')}</h4>
        {criteria.length ? (
          <ul className="plan-exit">
            {criteria.map((criterion) => (
              <li className={`plan-exit-item is-${criterion.state}`} key={criterion.key}>
                <span className="plan-exit-mark" aria-hidden="true">
                  {STATE_MARK[criterion.state]}
                </span>
                <span className="plan-exit-text">{t(`${base}.exit.${criterion.key}`)}</span>
                <span className="plan-exit-state">{t(`plan.states.${criterion.state}`)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="plan-exit-open">{t('plan.exitOpen')}</p>
        )}
      </div>
    </section>
  );
};

export default VenturesPlan;
