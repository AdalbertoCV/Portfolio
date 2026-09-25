import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowLeft, Reveal } from '../brand/parts';
import { CRITERIA, CURRENT_STAGE, DIMENSIONS, STAGES, VENTURES } from './plan';

// The ventures' operating plan: four stages, two companies, and what has to be
// true to move on. It is Adal's own reminder of where the focus goes before it
// is anything else, which is why it opens on the current stage and puts that
// stage's actions first.

const STATE_MARK = { done: '✓', active: '◐', pending: '○' };

const currentIndex = STAGES.findIndex((stage) => stage.id === CURRENT_STAGE);

const VenturesPlan = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(CURRENT_STAGE);
  const tabRefs = useRef([]);

  const stage = STAGES.find((item) => item.id === selected);

  const select = (index) => {
    const wrapped = (index + STAGES.length) % STAGES.length;
    setSelected(STAGES[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  };

  // The standard tablist keys, with wrap-around: the rail is short enough that
  // stopping dead at either end would only feel broken.
  const onKeyDown = (event, index) => {
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: STAGES.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  const ventureName = (id) =>
    id === 'moonphase' && selected === 'incubate' ? t('plan.names.freelanceMoonphase') : t(`plan.names.${id}`);

  return (
    <div className="hub-page plan-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('plan.badge')}</span>
        <h1 className="hub-title">{t('plan.title')}</h1>
        <p className="hub-lede">{t('plan.lede')}</p>
      </Reveal>

      <div className="plan-rail" role="tablist" aria-label={t('plan.tabsLabel')}>
        {STAGES.map((item, index) => {
          const isSelected = item.id === selected;
          const phase = index < currentIndex ? 'past' : index === currentIndex ? 'current' : 'future';
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`plan-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls="plan-panel"
              tabIndex={isSelected ? 0 : -1}
              className={`plan-stage plan-stage-${phase}${isSelected ? ' is-selected' : ''}`}
              onClick={() => setSelected(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="plan-node" aria-hidden="true" />
              <span className="plan-stage-name">{t(`plan.stages.${item.id}.name`)}</span>
              <span className="plan-stage-window">{t(`plan.stages.${item.id}.window`)}</span>
              {phase === 'current' ? <span className="plan-here">{t('plan.here')}</span> : null}
            </button>
          );
        })}
      </div>

      <div className="plan-panel" role="tabpanel" id="plan-panel" aria-labelledby={`plan-tab-${selected}`}>
        <p className="plan-tagline">{t(`plan.stages.${selected}.tagline`)}</p>

        {stage.focusNow.length ? (
          <section className="plan-focus">
            <h2 className="brand-h2">{t('plan.focusTitle')}</h2>
            <ol className="plan-focus-list">
              {stage.focusNow.map((action) => (
                <li key={action}>{t(`plan.stages.${selected}.now.${action}`)}</li>
              ))}
            </ol>
          </section>
        ) : null}

        <div className="plan-cards">
          {VENTURES.map(({ id, brand }) => {
            const criteria = CRITERIA[id][selected];
            return (
              <article className="plan-card" data-brand={brand} key={id}>
                <h2 className="plan-card-title">{ventureName(id)}</h2>
                <dl className="plan-dims">
                  {DIMENSIONS.map((dimension) => (
                    <div className="plan-dim" key={dimension}>
                      <dt>{t(`plan.dims.${dimension}`)}</dt>
                      <dd>{t(`plan.${id}.${selected}.${dimension}`)}</dd>
                    </div>
                  ))}
                </dl>
                <h3 className="plan-exit-title">{t('plan.exitTitle')}</h3>
                {criteria.length ? (
                  <ul className="plan-exit">
                    {criteria.map((criterion) => (
                      <li className={`plan-exit-item is-${criterion.state}`} key={criterion.key}>
                        <span className="plan-exit-mark" aria-hidden="true">
                          {STATE_MARK[criterion.state]}
                        </span>
                        <span className="plan-exit-text">{t(`plan.${id}.${selected}.exit.${criterion.key}`)}</span>
                        <span className="plan-exit-state">{t(`plan.states.${criterion.state}`)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="plan-exit-open">{t('plan.exitOpen')}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* Out to each company's own story, and back to the hub. */}
      <Reveal className="brand-footer-nav plan-footer">
        <Link className="brand-footer-link" to="/ventures">
          <ArrowLeft />
          {t('plan.back')}
        </Link>
        {VENTURES.map(({ id }) => (
          <Link className="brand-link-out" to={`/${id}`} key={id}>
            {t(`plan.names.${id}`)}
          </Link>
        ))}
      </Reveal>
    </div>
  );
};

export default VenturesPlan;
