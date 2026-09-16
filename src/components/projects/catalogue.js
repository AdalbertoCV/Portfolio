// One catalogue for every project, grouped by what the project actually was —
// work for a real institution, a university assignment, a systems exercise —
// rather than by whether screenshots happen to exist.
//
// The five projects that DO have screenshots use them as the card cover and
// open the lightbox; everything else gets a generated cover from ProjectGlyph.
// Both kinds are the same card, which is the point: a repository with no
// screenshot is not a lesser project, it is a project you cannot photograph.

import BSImage1 from '../../images/Projects/bazar_sol_1.png';
import BSImage2 from '../../images/Projects/bazar_sol_2.png';
import BSImage3 from '../../images/Projects/bazar_sol_3.png';
import RZImage1 from '../../images/Projects/rentazac1.png';
import RZImage2 from '../../images/Projects/rentazac2.png';
import RZImage3 from '../../images/Projects/rentazac3.png';
import cargasI1 from '../../images/Projects/cargas1.png';
import cargasI2 from '../../images/Projects/cargas2.png';
import cargasI3 from '../../images/Projects/cargas3.png';
import cosiap1 from '../../images/Projects/COSIAP1.png';
import cosiap2 from '../../images/Projects/COSIAP2.png';
import cosiap3 from '../../images/Projects/COSIAP3.png';
import cosiap4 from '../../images/Projects/COSIAP4.png';
import pbienestar1 from '../../images/Projects/PuntoBienestar1.jpeg';
import pbienestar2 from '../../images/Projects/PuntoBienestar2.jpeg';
import pbienestar3 from '../../images/Projects/PuntoBienestar3.jpeg';

const OWNER = 'https://github.com/AdalbertoCV';

// `copy` is the dictionary path for title + body. The five screenshot projects
// keep their existing `projects.*` entries; the rest live under `repos.items.*`.
const CATALOGUE = [
  {
    id: 'clients',
    // Wider cards: these are the ones with real interface screenshots, and a
    // 310px cover wastes them.
    wide: true,
    projects: [
      {
        key: 'pbienestar',
        copy: 'projects.pbienestar',
        name: 'PuntoBienestar',
        language: 'Java',
        tags: ['Spring Boot', 'React', 'JWT', 'Google Calendar API'],
        shots: [pbienestar1, pbienestar2, pbienestar3],
        isPrivate: true,
      },
      {
        key: 'cosiap',
        copy: 'projects.cosiap',
        name: 'Sistema-de-Apoyos-COZCyT',
        url: `${OWNER}/Sistema-de-Apoyos-COZCyT`,
        language: 'JavaScript',
        tags: ['Django', 'Docker', 'PostgreSQL'],
        shots: [cosiap1, cosiap2, cosiap3, cosiap4],
      },
      {
        key: 'cargas',
        copy: 'projects.cargas',
        name: 'Sistema-de-Cargas-UAIE',
        url: `${OWNER}/Sistema-de-Cargas-UAIE`,
        language: 'SCSS',
        tags: ['Django', 'Docker', 'SCSS'],
        shots: [cargasI1, cargasI2, cargasI3],
      },
    ],
  },
  {
    id: 'creative',
    projects: [
      {
        key: 'nocturno',
        copy: 'repos.items.nocturno',
        name: 'nocturno-108',
        url: `${OWNER}/nocturno-108`,
        language: 'JavaScript',
        tags: ['Strudel', 'Web Audio', 'JS'],
      },
      {
        key: 'etl',
        copy: 'repos.items.etl',
        name: 'ETL-Equipo4',
        url: `${OWNER}/ETL-Equipo4`,
        language: 'Python',
        tags: ['Python', 'Dgraph', 'Luigi', 'Dash'],
      },
    ],
  },
  {
    id: 'systems',
    projects: [
      {
        key: 'pubsub',
        copy: 'repos.items.pubsub',
        name: 'Publica-Suscribe-Equipo4',
        url: `${OWNER}/Publica-Suscribe-Equipo4`,
        language: 'Python',
        tags: ['Python', 'ActiveMQ', 'STOMP'],
      },
      {
        key: 'sockets',
        copy: 'repos.items.sockets',
        name: 'Sockets',
        url: `${OWNER}/Sockets`,
        language: 'Java',
        tags: ['Java', 'TCP', 'Swing'],
      },
      {
        key: 'pooedd',
        copy: 'repos.items.pooedd',
        name: 'POO-EDD',
        url: `${OWNER}/POO-EDD`,
        language: 'Java',
        tags: ['Java', 'JDBC', 'Gradle'],
      },
    ],
  },
  {
    id: 'web',
    projects: [
      // The portfolio repository is deliberately not listed: the visitor is
      // already looking at it.
      {
        key: 'bazarSol',
        copy: 'projects.bazarSol',
        name: 'Bazar_Sol',
        url: `${OWNER}/Bazar_Sol`,
        language: 'CSS',
        tags: ['HTML', 'CSS', 'E-commerce'],
        shots: [BSImage1, BSImage2, BSImage3],
      },
      {
        key: 'rentazac',
        copy: 'projects.rentazac',
        name: 'RentaZac',
        url: 'https://github.com/Viky-Gomez/RentaZac',
        language: 'JavaScript',
        tags: ['Web', 'Listings'],
        shots: [RZImage1, RZImage2, RZImage3],
      },
      {
        key: 'frameworks',
        copy: 'repos.items.frameworks',
        name: 'Frameworks',
        url: `${OWNER}/Frameworks`,
        language: 'CSS',
        tags: ['Django', 'MariaDB', 'AJAX'],
      },
      {
        key: 'codecompany',
        copy: 'repos.items.codecompany',
        name: 'The-Code-Company-Website',
        url: `${OWNER}/The-Code-Company-Website`,
        language: 'CSS',
        tags: ['Django', 'SCSS'],
      },
      {
        key: 'visualnet',
        copy: 'repos.items.visualnet',
        name: 'Visual.NET',
        url: `${OWNER}/Visual.NET`,
        language: 'C#',
        tags: ['C#', 'ASP.NET Core', 'EF Core'],
      },
      {
        key: 'sharemesomething',
        copy: 'repos.items.sharemesomething',
        name: 'ShareMeSomething',
        language: 'Python',
        tags: ['Python', 'JavaScript'],
        isPrivate: true,
      },
    ],
  },
  {
    id: 'security',
    projects: [
      {
        key: 'picoctf',
        copy: 'repos.items.picoctf',
        name: 'Writeups_picoCTF',
        url: `${OWNER}/Writeups_picoCTF`,
        language: 'Shell',
        tags: ['picoCTF', 'Bandit', 'Forensics'],
      },
      {
        key: 'stroke',
        copy: 'repos.items.stroke',
        name: 'stroke_classification_RF',
        url: `${OWNER}/stroke_classification_RF`,
        language: 'R',
        tags: ['R', 'Random Forest', 'Boruta', 'ROSE'],
      },
    ],
  },
  {
    // A card gives a project a cover, a body and two actions — the weight of
    // something somebody uses. These four are exercises from the degree, and
    // at that weight they were dragging the client systems down to their
    // level. Listed rather than carded: still here, still linked, no longer
    // competing with a clinic's scheduling system.
    id: 'practice',
    compact: true,
    projects: [
      {
        key: 'testing',
        copy: 'repos.items.testing',
        name: 'Ejercicios_Testing_ENEDIC24',
        url: `${OWNER}/Ejercicios_Testing_ENEDIC24`,
        language: 'Python',
        tags: ['Behave', 'Selenium', 'Django'],
      },
      {
        key: 'psp',
        copy: 'repos.items.psp',
        name: 'Personal_Software_Process_03',
        url: `${OWNER}/Personal_Software_Process_03`,
        language: 'Java',
        tags: ['Java', 'PSP (SEI)'],
      },
      {
        key: 'dbs',
        copy: 'repos.items.dbs',
        name: 'DBS_Practices',
        url: `${OWNER}/DBS_Practices`,
        language: 'PLSQL',
        tags: ['Oracle', 'PL/SQL'],
      },
      {
        key: 'retos',
        copy: 'repos.items.retos',
        name: 'retos_coding',
        url: `${OWNER}/retos_coding`,
        language: 'Java',
        tags: ['Java', 'Algorithms'],
      },
    ],
  },
];

// How many projects stand behind each technology, keyed by the exact string
// the stack tiles use. The About page reads this to turn a tile into a link:
// "I know this" becomes "here is where I used it", which is a different claim.
export const PROJECT_TECH = CATALOGUE.reduce((counts, { projects }) => {
  projects.forEach(({ language, tags }) => {
    [language, ...(tags || [])].filter(Boolean).forEach((name) => {
      counts[name] = (counts[name] || 0) + 1;
    });
  });
  return counts;
}, {});

// Every language in the catalogue, in the order the projects appear, so the
// filter row is built from the data rather than from a second list somebody
// has to remember to update.
export const LANGUAGES = [
  ...new Set(CATALOGUE.flatMap(({ projects }) => projects.map((project) => project.language))),
].filter(Boolean);

export const PROJECT_COUNT = CATALOGUE.reduce(
  (total, group) => total + group.projects.length,
  0
);

export default CATALOGUE;
