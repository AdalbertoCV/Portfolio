import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal } from '../brand/parts';
import { CRITERIA, CURRENT_STAGE, FRONTS, STAGES, VENTURES } from './plan';

// The ventures' operating plan, as a section of /ventures. It is our own
// reminder of where the focus goes before it is anything else, which is why
// the current stage's actions sit above everything and the section opens on
// the current stage.

const currentIndex = STAGES.findIndex((stage) => stage.id === CURRENT_STAGE);
const current = STAGES[currentIndex];

// Narrow screens get a different composition, not a smaller one: the rail
// turns vertical and the workstreams fold into disclosures, so the page does
// not become seven long boxes in a row.
const NARROW = '(max-width: 720px)';
const useNarrow = () => {
  const query = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(NARROW).matches : false);
  const [narrow, setNarrow] = useState(query);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia(NARROW);
    const onChange = () => setNarrow(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return narrow;
};

// The standard tablist keys, with wrap-around. Up and Down work too, because
// the stage rail is vertical on a phone.
const moveFor = (key, index, count) =>
  ({ ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: count - 1 })[
    key
  ];

// Drawn, not typed: a check for done, a half disc for in progress, a ring for
// pending, in the same stroke as the rest of the section.
const StateIcon = ({ state }) => (
  <svg className={`plan-state-icon is-${state}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    {state === 'done' ? (
      <>
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M4.8 8.2l2.1 2.1 4.3-4.6" fill="none" stroke="var(--brand-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : null}
    {state === 'active' ? (
      <>
        <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor" />
      </>
    ) : null}
    {state === 'pending' ? <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" /> : null}
  </svg>
);

const Tabs = ({ label, items, selected, onSelect, idPrefix, render, className, orientation = 'horizontal' }) => {
  const refs = useRef([]);
  const select = (index) => {
    const wrapped = (index + items.length) % items.length;
    onSelect(items[wrapped]);
    refs.current[wrapped]?.focus();
  };
  return (
    <div className={className} role="tablist" aria-label={label} aria-orientation={orientation}>
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
  const narrow = useNarrow();
  const [stage, setStage] = useState(CURRENT_STAGE);
  const [ventureId, setVentureId] = useState(VENTURES[0].id);
  const panelRef = useRef(null);
  const venture = VENTURES.find((item) => item.id === ventureId);
  const base = `plan.${ventureId}.${stage}`;
  const criteria = CRITERIA[ventureId][stage];

  const ventureName = (id) =>
    id === 'moonphase' && stage === 'incubate' ? t('plan.names.freelanceMoonphase') : t(`plan.names.${id}`);

  // On a phone the company switch stays pinned while the panel scrolls under
  // it; switching from far down would otherwise leave the reader in the
  // middle of the other company's card.
  const pickVenture = (id) => {
    setVentureId(id);
    const panel = panelRef.current;
    if (narrow && panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: 'start' });
  };

  return (
    <section className="plan-section" id="plan" aria-labelledby="plan-title">
      <Reveal className="plan-head">
        <h2 className="brand-h2" id="plan-title">
          {t('plan.title')}
        </h2>
        <p className="brand-p">{t('plan.lede')}</p>
      </Reveal>

      <section className="plan-focus" aria-labelledby="plan-focus-title">
        <div className="plan-focus-head">
          <h3 className="plan-focus-title" id="plan-focus-title">
            {t('plan.focusTitle')}
          </h3>
          <p className="plan-focus-stage">
            {t(`plan.stages.${current.id}.name`)} · {t(`plan.stages.${current.id}.window`)}
          </p>
        </div>
        <ol className="plan-focus-list">
          {current.focusNow.map((action) => (
            <li key={action}>{t(`plan.stages.${current.id}.now.${action}`)}</li>
          ))}
        </ol>
      </section>

      <Tabs
        className="plan-rail"
        label={t('plan.stageTabs')}
        orientation={narrow ? 'vertical' : 'horizontal'}
        items={STAGES.map((item) => item.id)}
        selected={stage}
        onSelect={setStage}
        idPrefix="plan-stage"
        render={(id, index) => {
          const phase = index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future';
          return {
            className: `plan-stage is-${phase}${id === stage ? ' is-selected' : ''}`,
            children: (
              <>
                <span className="plan-node" aria-hidden="true">
                  {phase === 'past' ? <StateIcon state="done" /> : null}
                </span>
                <span className="plan-stage-text">
                  <span className="plan-stage-name">{t(`plan.stages.${id}.name`)}</span>
                  <span className="plan-stage-window">{t(`plan.stages.${id}.window`)}</span>
                  {phase === 'current' ? <span className="plan-here">{t('plan.here')}</span> : null}
                  {id === stage ? <span className="plan-stage-tagline">{t(`plan.stages.${id}.tagline`)}</span> : null}
                </span>
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
        onSelect={pickVenture}
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
        ref={panelRef}
        aria-labelledby={`plan-venture-${ventureId}`}
        tabIndex={0}
        data-brand={venture.brand}
      >
        <header className="plan-panel-head">
          <h3 className="plan-venture-title">{ventureName(ventureId)}</h3>
          <p className="plan-panel-stage">
            {t(`plan.stages.${stage}.name`)} · {t(`plan.stages.${stage}.window`)}
          </p>
        </header>

        <div className="plan-objective">
          <h4 className="plan-label">{t('plan.objectiveTitle')}</h4>
          <p>{t(`${base}.objective`)}</p>
        </div>

        <div className="plan-summary">
          <div className="plan-summary-cell">
            <h4 className="plan-label">{t('plan.modelTitle')}</h4>
            <p>{t(`${base}.model`)}</p>
          </div>
          <div className="plan-summary-cell">
            <h4 className="plan-label">{t('plan.metricsTitle')}</h4>
            <ul className="plan-metrics">
              {tl(`${base}.metrics`).map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
          </div>
        </div>

        <h4 className="plan-label plan-block-label">{t('plan.frontsTitle')}</h4>
        <div className="plan-fronts">
          {FRONTS[ventureId][stage].map((front) => {
            const featured = front === venture.featured;
            const actions = tl(`${base}.fronts.${front}`);
            const name = t(`plan.frontNames.${ventureId}.${front}`);
            const list = (
              <ul>
                {actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            );
            return (
              <article className={`plan-front${featured ? ' is-featured' : ''}`} key={`${ventureId}-${stage}-${front}`}>
                {/* Only a phone folds the workstreams, with the featured one
                    open. A wide screen shows them all, so it renders a plain
                    heading: a <summary> there would be a tab stop that can
                    hide a list with nothing to say it was collapsible. */}
                {narrow ? (
                  <details className="plan-front-details" open={featured}>
                    <summary className="plan-front-title">
                      <span>{name}</span>
                      <span className="plan-front-count" aria-hidden="true">
                        {actions.length}
                      </span>
                    </summary>
                    {list}
                  </details>
                ) : (
                  <>
                    <h5 className="plan-front-title">{name}</h5>
                    {list}
                  </>
                )}
              </article>
            );
          })}
        </div>

        <h4 className="plan-label plan-block-label">{t('plan.risksTitle')}</h4>
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

        <h4 className="plan-label plan-block-label">{t('plan.exitTitle')}</h4>
        {criteria.length ? (
          <ul className="plan-exit">
            {criteria.map((criterion) => (
              <li className={`plan-exit-item is-${criterion.state}`} key={criterion.key}>
                <StateIcon state={criterion.state} />
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
