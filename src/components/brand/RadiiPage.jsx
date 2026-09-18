import { useTranslation } from '../../i18n/I18nProvider';
import RadiiSystem from './RadiiSystem';
import RadiiArt from '../marks/RadiiArt';
import radiiLogo from '../../images/radii.png';
import {
  ArrowUpRight,
  BrandFooterNav,
  BrandHero,
  CardGrid,
  ChipGroup,
  Closing,
  Reveal,
  Section,
  StatGrid,
  Steps,
} from './parts';

const RADII_URL = 'https://www.radii.com.mx/es';

const STAT_KEYS = ['tolerance', 'lead', 'quote', 'certs'];
const STEP_KEYS = ['upload', 'quote', 'produce', 'trace'];
// The outcome figures, which are the only numbers on this page that belong to
// the engineer rather than to the platform.
const IMPACT_KEYS = ['quote', 'ops', 'infra', 'tickets'];
const BUILD_KEYS = ['quoting', 'backend', 'workers', 'agents', 'ml', 'platform', 'product'];

// Product names stay in their own language in both dictionaries, so the stack
// lives in code rather than costing two translated copies of the same word.
/* What the platform is actually built on — the tools, exactly, plus the
   practices that run alongside them. It is deliberately shorter than the
   stack on the About page: that one is everything the engineer works with,
   this one is everything this product is made of. */
const STACK = {
  services: [
    'Python', 'Django', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis',
    'Microservices', 'Event-driven',
  ],
  cloud: [
    'AWS', 'Docker', 'Kubernetes', 'IaC', 'CI/CD',
    'Observability', 'Cloud security', 'FinOps',
  ],
  ai: [
    'LangGraph', 'LangChain', 'AI Agents', 'LLM & RAG',
    'Machine Learning', 'Multi-agent coordination',
  ],
  product: ['TypeScript', 'React', 'JavaScript'],
};

// One line-drawn icon per responsibility. Drawn here rather than imported as
// images: they inherit `currentColor`, so they pick up the brand accent and
// both themes for free, and they cost no extra request.
const ICONS = {
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  ),
  // A pricing curve with the quoted point marked on it: the algorithm and its
  // output, which is what this card is about.
  quoting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 19.5V4.5" />
      <path d="M3.5 19.5h16" />
      <path d="M6.5 16.5c3.4 0 4.2-8 11-8" />
      <circle cx="17.5" cy="8.5" r="1.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  workers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.5 3.75 3.75 0 0 0 6.75 19z" />
      <path d="M12 13v5" />
      <path d="M9.5 15.5 12 18l2.5-2.5" />
    </svg>
  ),
  agents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1.4" />
      <path d="M9.5 13h.01M14.5 13h.01" />
      <path d="M2.5 12v3M21.5 12v3" />
    </svg>
  ),
  ml: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17c3.5 0 4.5-10 8-10s4.5 10 8 10" />
      <circle cx="3" cy="17" r="1.6" />
      <circle cx="21" cy="17" r="1.6" />
      <circle cx="11" cy="7" r="1.6" />
    </svg>
  ),
  platform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7" />
      <path d="M6 8.5c0 5 3 7 6 7M18 8.5c0 5-3 7-6 7" />
    </svg>
  ),
  product: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 8.5 4.9v10.2L12 22l-8.5-4.9V6.9z" />
      <path d="M12 22V12" />
      <path d="m3.5 6.9 8.5 5.1 8.5-5.1" />
    </svg>
  ),
};

const RadiiPage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="radii">
      <BrandHero
        art={<RadiiArt />}
        backTo="/experience"
        backLabel={t('common.backToExperience')}
        mark={<img className="brand-hero-mark" src={radiiLogo} alt={t('radii.company')} />}
        eyebrow={t('radii.badge')}
        live
        title={t('radii.heroTitle')}
        tagline={t('radii.tagline')}
        lede={t('radii.heroLede')}
        meta={
          <>
            <strong>{t('radii.company')}</strong>
            <span>{t('radii.period')}</span>
          </>
        }
        actions={
          <a className="brand-link-out" href={RADII_URL} target="_blank" rel="noopener noreferrer">
            {t('radii.visitSite')}
            <ArrowUpRight />
          </a>
        }
      />

      <div className="brand-body">
        <Section kicker={t('radii.statsTitle')}>
          <StatGrid
            items={STAT_KEYS.map((key) => ({
              key,
              value: t(`radii.stats.${key}.value`),
              label: t(`radii.stats.${key}.label`),
            }))}
          />
        </Section>

        <Section kicker={t('radii.kickers.what')} title={t('radii.whatTitle')}>
          <Reveal>
            <p className="brand-p">{t('radii.whatLede')}</p>
            <p className="brand-note">{t('radii.whatNote')}</p>
          </Reveal>
        </Section>

        <Section kicker={t('radii.kickers.how')} title={t('radii.howTitle')} lede={t('radii.howLede')}>
          <Steps
            items={STEP_KEYS.map((key) => ({
              key,
              title: t(`radii.how.${key}.title`),
              body: t(`radii.how.${key}.body`),
            }))}
          />
        </Section>

        {/* Outcomes before responsibilities. "I design the services" is a job
            description; a quote that prices itself is the thing a reader cannot
            get from anybody else's page. */}
        <Section
          kicker={t('radii.kickers.impact')}
          title={t('radii.impactTitle')}
          lede={t('radii.impactLede')}
        >
          <StatGrid
            items={IMPACT_KEYS.map((key) => ({
              key,
              value: t(`radii.impact.${key}.value`),
              label: t(`radii.impact.${key}.label`),
            }))}
          />
          <Reveal>
            <p className="brand-note">{t('radii.impactNote')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('radii.kickers.build')}
          title={t('radii.buildTitle')}
          lede={t('radii.buildLede')}
        >
          {/* The shape first, then the seven cards that detail it. Reading the
              cards without this meant assembling the architecture in your head
              before you could judge any of it. */}
          <Reveal>
            <RadiiSystem />
          </Reveal>
          <CardGrid
            items={BUILD_KEYS.map((key) => ({
              key,
              icon: ICONS[key],
              title: t(`radii.build.${key}.title`),
              body: t(`radii.build.${key}.body`),
            }))}
          />
        </Section>

        <Section kicker={t('radii.kickers.stack')} title={t('radii.stackTitle')} lede={t('radii.stackLede')}>
          <Reveal>
            {Object.entries(STACK).map(([group, items]) => (
              <ChipGroup key={group} title={t(`radii.groups.${group}`)} items={items} />
            ))}
          </Reveal>
        </Section>

        <Closing title={t('radii.closingTitle')}>
          <p className="brand-p">{t('radii.closingBody')}</p>
          <div className="brand-hero-actions">
            <a className="brand-link-out" href={RADII_URL} target="_blank" rel="noopener noreferrer">
              {t('radii.visitSite')}
              <ArrowUpRight />
            </a>
          </div>
        </Closing>


        <BrandFooterNav to="/experience" labelKey="common.backToExperience" />
      </div>
    </div>
  );
};

export default RadiiPage;
