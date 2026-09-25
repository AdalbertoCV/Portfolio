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
    date: '2026-09-25',
    es: 'El plan de operaciones de Moonphase y StackSelect, por etapas, en Ventures',
    en: 'The operating plan for Moonphase and StackSelect, stage by stage, in Ventures',
  },
  {
    date: '2026-09-24',
    es: 'Agent skills en el muro: Archify, Ponytail y las que todos instalan',
    en: 'Agent skills on the wall: Archify, Ponytail and the ones everybody installs',
  },
  {
    date: '2026-09-24',
    es: 'Laya en el muro, y lo que hace falta cuando decidir ya no es lo lento',
    en: 'Laya on the wall, and what you need once deciding stopped being the slow part',
  },
  {
    date: '2026-09-24',
    es: 'El idioma vive en la URL: /en abre en inglés para quien reciba el link',
    en: 'The language lives in the URL: /en opens in English for whoever gets the link',
  },
  {
    date: '2026-09-24',
    es: 'Hermes, Capy y la capa de memoria que hace útil a un agente',
    en: 'Hermes, Capy and the memory layer that makes an agent useful',
  },
  {
    date: '2026-09-24',
    es: 'Android Studio y su cadena de herramientas entran al muro',
    en: 'Android Studio and its toolchain join the wall',
  },
  {
    date: '2026-09-23',
    es: 'acompanar entra al catálogo, con su portada animada',
    en: 'acompanar joins the catalogue, with a cover of its own',
  },
  {
    date: '2026-09-23',
    es: 'Diez agentes más en el muro, entre ellos ARTEMIS y Accio',
    en: 'Ten more agents on the wall, ARTEMIS and Accio among them',
  },
  {
    date: '2026-09-23',
    es: 'El sitio pesa 3.6 MB en vez de 16: las imágenes ya no son PNG gigantes',
    en: 'The site weighs 3.6 MB instead of 16: no more giant PNGs',
  },
  {
    date: '2026-09-23',
    es: 'La foto y el nombre por fin pesan lo mismo en la portada',
    en: 'The photograph and the name finally carry the same weight up top',
  },
  {
    date: '2026-09-23',
    es: 'Las páginas se cruzan en vez de cortarse, y una barra marca el avance',
    en: 'Pages cross instead of cutting, and a rail marks how far down you are',
  },
  {
    date: '2026-09-23',
    es: 'La portada ya no es una tarjeta de CV: el nombre a escala completa',
    en: 'The opening is no longer a CV card: the name at full scale',
  },
  {
    date: '2026-09-23',
    es: 'Tipografía nueva: Space Grotesk en los títulos, y el mono por fin carga',
    en: 'New type: Space Grotesk on the headings, and the mono finally loads',
  },
  {
    date: '2026-09-23',
    es: 'Las tecnologías nuevas ya traen su logo, no sus iniciales',
    en: 'The new technologies carry their own mark now, not their initials',
  },
  {
    date: '2026-09-23',
    es: '120 tecnologías más en el muro: la cosecha 2024-2026',
    en: '120 more technologies on the wall: the 2024-2026 intake',
  },
  {
    date: '2026-09-23',
    es: 'El bot que le enseñé a trabajar como yo tiene su propia sección',
    en: 'The bot I taught to work the way I do gets its own section',
  },
  {
    date: '2026-09-22',
    es: 'El fondo respira: tres lavados que se mueven muy despacio detrás de todo',
    en: 'The background breathes: three washes drifting slowly behind everything',
  },
  {
    date: '2026-09-22',
    es: 'Cada referencia tiene su propia figura y su propio color',
    en: 'Every reference gets their own figure and their own colour',
  },
  {
    date: '2026-09-22',
    es: 'Alguien vigila el formulario de contacto y sigue tu cursor',
    en: 'Somebody watches the contact form, and follows your caret',
  },
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
