/* ==========================================================================
   WHAT CHANGED, AND WHEN

   The site had no date on it anywhere except the decision log, so a visitor
   could not tell whether they were reading something from today or from
   March. For a site meant to be come back to, that is the one thing worth
   fixing with four lines of data.

   Both languages live here rather than in the dictionary on purpose. An entry
   that needs a round trip through two dictionary files is an entry that does
   not get written, and a changelog nobody updates is worse than none — it is
   "disponible muy pronto" all over again.

   ISO dates, formatted at render time in whichever language the site is in.
   Newest first; only the first few are shown.
   ======================================================================== */

const UPDATES = [
  {
    date: '2026-09-22',
    es: 'Radii abre el catálogo de proyectos, con capturas de la plataforma',
    en: 'Radii opens the project catalogue, with shots of the platform',
  },
  {
    date: '2026-09-22',
    es: 'Las tres empresas dicen dónde están hoy, con fechas',
    en: 'All three ventures say where they stand, with dates',
  },
  {
    date: '2026-09-21',
    es: 'Zona de estudio: diez problemas con pista y solución',
    en: 'Study zone: ten problems, with a hint and a solution',
  },
  {
    date: '2026-09-19',
    es: 'Bitácora de decisiones',
    en: 'The decision log',
  },
  {
    date: '2026-09-18',
    es: 'Terminal en ⌘K, y el diagrama del sistema de Radii',
    en: 'A ⌘K terminal, and the Radii system diagram',
  },
];

/** How many the footer prints. Enough to read as momentum, not as a feed. */
export const SHOWN = 3;

/** "22 sep 2026" / "22 Sep 2026", from the ISO date and the active language. */
export const formatDate = (iso, lang) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
};

export default UPDATES;
