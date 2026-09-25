import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { StackSelectMark } from '../marks/StackSelectMark';
import { MoonphaseMark } from '../marks/MoonphaseMark';
import { ArrowRight, Reveal } from '../brand/parts';
import ProjectsMosaic from '../projects/ProjectsMosaic';
import VenturesPlan from './VenturesPlan';

// The two companies Adalberto founded, as opposed to the roles on /experience
// where someone else hired him. The split is the whole point of this page
// existing: "CEO" next to "intern" on one timeline flattens both.
// Moonphase first: it is the higher-priority venture, and the one where the
// role is CEO rather than CTO.
const VENTURES = [
  {
    brand: 'moonphase',
    to: '/moonphase',
    roleKey: 'ventures.roleCeo',
    pitchKey: 'ventures.moonphasePitch',
    Mark: MoonphaseMark,
  },
  {
    brand: 'stackselect',
    to: '/stackselect',
    roleKey: 'ventures.roleCto',
    pitchKey: 'ventures.stackselectPitch',
    Mark: StackSelectMark,
  },
];

const Ventures = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  // The chips on each company's page land here. App resets the scroll to the
  // top on every route change and its effect runs after this one, so the jump
  // waits a tick to land after that reset rather than be undone by it.
  useEffect(() => {
    if (hash !== '#plan') return undefined;
    const timer = window.setTimeout(() => document.getElementById('plan')?.scrollIntoView({ block: 'start' }), 0);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('ventures.badge')}</span>
        <h1 className="hub-title">{t('ventures.title')}</h1>
        <p className="hub-lede">{t('ventures.lede')}</p>
      </Reveal>

      <Reveal className="venture-grid" stagger>
        {VENTURES.map(({ brand, to, roleKey, pitchKey, Mark }) => (
          <Link className="venture-card" data-brand={brand} to={to} key={brand}>
            <span className="venture-glow" aria-hidden="true" />
            <div className="venture-mark">
              <Mark className="brand-mark-lg" />
            </div>
            <div className="venture-body">
              <span className="venture-role">{t(`${brand}.badge`)}</span>
              <h2 className="venture-name">{t(`${brand}.company`)}</h2>
              <p className="venture-pitch">{t(pitchKey)}</p>
            </div>
            <div className="venture-foot">
              <span className="venture-status">
                <span className="venture-status-dot" aria-hidden="true" />
                {t(`${brand}.period`)}
              </span>
              {/* Both companies exist before their websites do. Saying so is
                  better than a card that quietly offers no way out to a
                  reader who came looking for the company itself. */}
              <span className="venture-soon">{t('ventures.siteSoon')}</span>
              <span className="venture-enter">
                {t('ventures.enter')}
                <ArrowRight />
              </span>
            </div>
            {/* The role is already announced inside the card; this keeps the
                link's own accessible name from being just the company word. */}
            <span className="sr-only">{` — ${t(roleKey)}`}</span>
          </Link>
        ))}
      </Reveal>

      {/* The plan both companies are working to, right under their cards. */}
      <VenturesPlan />

      {/* The same hand-off the timeline makes to Ventures: a page ends by
          pointing at the next one rather than at nothing. */}
      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('ventures.projectsTitle')}</h2>
          <p className="brand-p">{t('ventures.projectsLede')}</p>
        </div>
        <ProjectsMosaic />
        <Link className="brand-link-out hub-teaser-cta" to="/projects">
          {t('ventures.projectsCta')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default Ventures;
