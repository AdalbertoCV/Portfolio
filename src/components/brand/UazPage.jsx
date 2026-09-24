import { useTranslation } from '../../i18n/I18nProvider';
import { UazArt } from '../marks/RoleArt';
import uazShield from '../../images/UAZ.webp';
import {
  ArrowUpRight,
  BrandFooterNav,
  BrandHero,
  Closing,
  Reveal,
  Section,
  StatGrid,
} from './parts';

const PROGRAM_URL = 'https://ingsoftware.uaz.edu.mx/';

const STAT_KEYS = ['semesters', 'subjects', 'labs', 'credits'];
const CHAIN_KEYS = ['maths', 'programming', 'engineering', 'data', 'practice'];

// The plan's own subject names, which stay in Spanish in both dictionaries
// because that is what the degree calls them — translating "Proceso de
// Software Personal" would name a course that does not exist.
const CHAIN_SUBJECTS = {
  maths: [
    'Álgebra', 'Álgebra Lineal', 'Cálculo Diferencial', 'Cálculo Integral',
    'Ecuaciones Diferenciales', 'Matemáticas Discretas', 'Probabilidad y Estadística',
  ],
  programming: [
    'Lógica y Algoritmos', 'Introducción a la Programación', 'POO I', 'POO II',
    'Estructura de Datos', 'Análisis y Diseño de Algoritmos',
  ],
  engineering: [
    'Introducción a la Ingeniería de Software', 'Ingeniería de Requerimientos',
    'Análisis y Diseño Orientado a Objetos', 'Análisis y Diseño de Interfaces de Usuario',
    'Arquitecturas de Software', 'Proceso de Software Personal',
    'Proceso de Software en Equipo', 'Calidad del Software',
    'Pruebas y Mantenimiento de Software', 'Administración de Proyectos de Software',
  ],
  data: [
    'Sistemas de Base de Datos I', 'Sistemas de Base de Datos II',
    'Introducción al Desarrollo de Aplicaciones Web',
    'Seguridad en Redes y Sistemas de Software', 'Negocios Electrónicos',
  ],
  practice: [
    'Seminario de Investigación', 'Seminario de Tesis',
    'Prácticas Profesionales I', 'Prácticas Profesionales II',
  ],
};

const ICONS = {
  maths: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h9L7.5 12 13 19H4" />
      <path d="M16 9.5 21 15M21 9.5 16 15" />
    </svg>
  ),
  programming: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 8-4.5 4L8 16" />
      <path d="m16 8 4.5 4L16 16" />
      <path d="m13.5 5-3 14" />
    </svg>
  ),
  engineering: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="14" y="13.5" width="7" height="7" rx="1.5" />
      <path d="M10 7h4a3 3 0 0 1 3 3v3.5" />
      <path d="M6.5 10.5V17a3 3 0 0 0 3 3H14" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </svg>
  ),
  practice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5 22 8l-10 4.5L2 8z" />
      <path d="M6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
      <path d="M22 8v6" />
    </svg>
  ),
};

const UazPage = () => {
  const { t } = useTranslation();

  return (
    <div className="brand-page" data-brand="uaz">
      <BrandHero
        art={<UazArt />}
        backTo="/"
        backLabel={t('common.backToAbout')}
        mark={<img className="brand-hero-mark" src={uazShield} alt={t('education.university')} />}
        eyebrow={t('uaz.badge')}
        title={t('uaz.heroTitle')}
        tagline={t('uaz.tagline')}
        lede={t('uaz.heroLede')}
        meta={
          <>
            <strong>{t('education.university')}</strong>
            <span>{t('uaz.period')}</span>
          </>
        }
        actions={
          <a className="brand-link-out" href={PROGRAM_URL} target="_blank" rel="noopener noreferrer">
            ingsoftware.uaz.edu.mx
            <ArrowUpRight />
          </a>
        }
      />

      <div className="brand-body">
        <Section kicker={t('uaz.statsTitle')}>
          <StatGrid
            items={STAT_KEYS.map((key) => ({
              key,
              value: t(`uaz.stats.${key}.value`),
              label: t(`uaz.stats.${key}.label`),
            }))}
          />
        </Section>

        <Section kicker={t('uaz.kickers.program')} title={t('uaz.programTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('uaz.programBody')}</p>
            <p className="brand-p">{t('uaz.programBody2')}</p>
            <p className="brand-note">{t('uaz.programNote')}</p>
          </Reveal>
        </Section>

        <Section
          kicker={t('uaz.kickers.plan')}
          title={t('uaz.planTitle')}
          lede={t('uaz.planLede')}
        >
          {/* Each chain carries its own subject list rather than being summed
              up in a card and then listed again below it. A claim about a
              curriculum that never shows the curriculum is just an adjective. */}
          <Reveal className="uaz-chains" stagger>
            {CHAIN_KEYS.map((key) => (
              <article className="uaz-chain" key={key}>
                <div className="uaz-chain-head">
                  <span className="uaz-chain-icon">{ICONS[key]}</span>
                  <h3>{t(`uaz.chains.${key}.title`)}</h3>
                </div>
                <p>{t(`uaz.chains.${key}.body`)}</p>
                <div className="brand-chips">
                  {CHAIN_SUBJECTS[key].map((subject) => (
                    <span className="brand-chip" key={subject}>
                      {subject}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </Reveal>
        </Section>

        <Section kicker={t('uaz.kickers.teaching')} title={t('uaz.teachingTitle')}>
          <Reveal>
            <p className="brand-p brand-lead-p">{t('uaz.teachingBody')}</p>
            <p className="brand-p">{t('uaz.teachingBody2')}</p>
          </Reveal>
        </Section>

        <Closing title={t('uaz.closingTitle')}>
          <p className="brand-p">{t('uaz.closingBody')}</p>
        </Closing>


        <BrandFooterNav to="/" labelKey="common.backToAbout" />
      </div>
    </div>
  );
};

export default UazPage;
