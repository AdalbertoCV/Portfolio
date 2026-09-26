/* ==========================================================================
   THE COMMAND SET

   Every command is a plain object with an id, the argument shape it accepts,
   and a run() that returns lines to print, a route to go to, or both. The
   component knows nothing about what any of them do, which is what keeps the
   list editable without touching the terminal itself.

   Labels and output come from the dictionary — this file holds behaviour, not
   words, so the shell speaks whichever language the site is in.
   ======================================================================== */

import { CONTACT_EMAIL, CV_PATH, GITHUB, LINKEDIN } from '../../site';
import { PROJECT_COUNT } from '../projects/catalogue';

// Where `open` can go. The keys are what a visitor types, so they are short
// and in no particular language: a path is a path.
export const DESTINATIONS = {
  about: '/',
  experience: '/experience',
  ventures: '/ventures',
  projects: '/projects',
  stack: '/stack',
  library: '/stack#library',
  contact: '/contact',
  decisions: '/decisions',
  study: '/study',
  radii: '/radii',
  moonphase: '/moonphase',
  stackselect: '/stackselect',
  evodeps: '/evodeps',
  freelance: '/freelance',
  labsol: '/labsol',
  case: '/case',
  uaz: '/uaz',
  play: '/play',
};

/**
 * @typedef {Object} Ctx
 * @property {(key: string) => string} t
 * @property {(key: string) => string[]} tl
 * @property {(path: string) => void} go        navigate
 * @property {() => void} toggleTheme
 * @property {(next: string) => void} setLang
 * @property {string} lang
 * @property {() => void} clear
 * @property {() => void} close
 */

// A line is either plain output, a dim note, or a link. Keeping them as data
// rather than JSX means the transcript can be replayed, measured and tested.
const say = (text) => ({ kind: 'out', text });
const dim = (text) => ({ kind: 'dim', text });
const link = (text, href, external = false) => ({ kind: 'link', text, href, external });

export const COMMANDS = [
  {
    id: 'help',
    aliases: ['?', 'ayuda'],
    run: ({ t }) => [
      say(t('term.help.intro')),
      dim(t('term.help.hint')),
    ],
  },
  {
    id: 'whoami',
    run: ({ t }) => [
      say(t('term.whoami.line1')),
      say(t('term.whoami.line2')),
      dim(t('term.whoami.line3')),
    ],
  },
  {
    id: 'ls',
    // `ls` alone lists what there is to list; `ls projects` is the interesting
    // one, so it is what the suggestion offers.
    arg: 'projects',
    run: ({ t, go }, arg) => {
      if (!arg || arg === 'projects' || arg === 'proyectos') {
        go('/projects');
        return [say(t('term.ls.projects').replace('{n}', String(PROJECT_COUNT)))];
      }
      if (arg === 'pages' || arg === 'paginas' || arg === 'páginas') {
        return Object.keys(DESTINATIONS).map((k) => dim(`  ${k}`));
      }
      return [dim(t('term.ls.unknown').replace('{arg}', arg))];
    },
  },
  {
    id: 'cat',
    arg: 'cv',
    run: ({ t }, arg) => {
      if (arg && arg !== 'cv') return [dim(t('term.cat.unknown').replace('{arg}', arg))];
      return [
        say(t('term.cat.line')),
        link(t('term.cat.download'), CV_PATH, false),
      ];
    },
  },
  {
    id: 'open',
    arg: 'radii',
    run: ({ t, go }, arg) => {
      const key = (arg || '').toLowerCase();
      const path = DESTINATIONS[key];
      if (!path) {
        return [
          dim(t('term.open.unknown').replace('{arg}', arg || '—')),
          dim(`  ${Object.keys(DESTINATIONS).join(' · ')}`),
        ];
      }
      go(path);
      return [say(t('term.open.going').replace('{page}', key))];
    },
  },
  {
    id: 'decisions',
    aliases: ['adr'],
    run: ({ t, go }) => {
      go('/decisions');
      return [say(t('term.decisions.line'))];
    },
  },
  {
    id: 'study',
    aliases: ['estudio'],
    run: ({ t, go }) => {
      go('/study');
      return [say(t('term.study.line'))];
    },
  },
  {
    id: 'stack',
    run: ({ t, go }) => {
      go('/stack');
      return [
        say(t('term.stack.line')),
        dim(t('term.stack.hint')),
      ];
    },
  },
  {
    id: 'library',
    aliases: ['biblioteca', 'lectura'],
    run: ({ t, go }) => {
      go('/stack#library');
      return [say(t('term.library.line'))];
    },
  },
  {
    id: 'play',
    run: ({ t, go }) => {
      go('/play');
      return [say(t('term.play.line'))];
    },
  },
  {
    id: 'contact',
    aliases: ['contacto'],
    run: ({ t }) => [
      say(t('term.contact.line')),
      link(CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`, false),
      link('LinkedIn', LINKEDIN, true),
      link('GitHub', GITHUB, true),
    ],
  },
  {
    id: 'theme',
    run: ({ t, toggleTheme }) => {
      toggleTheme();
      return [say(t('term.theme.line'))];
    },
  },
  {
    id: 'lang',
    run: ({ t, lang, setLang }) => {
      setLang(lang === 'es' ? 'en' : 'es');
      return [say(t('term.lang.line'))];
    },
  },
  {
    id: 'clear',
    aliases: ['cls'],
    run: ({ clear }) => {
      clear();
      return [];
    },
  },
  {
    // The joke, and the only command that is also the most useful thing a
    // visitor can do here. It gets the same treatment as the rest.
    id: 'sudo',
    arg: 'hire me',
    run: ({ t, go }, arg) => {
      const said = (arg || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (said !== 'hire me' && said !== 'contratame' && said !== 'contrátame') {
        return [dim(t('term.sudo.nope'))];
      }
      go('/contact');
      return [say(t('term.sudo.granted')), dim(t('term.sudo.note'))];
    },
  },
  {
    id: 'exit',
    aliases: ['quit', 'salir'],
    run: ({ t, close }) => {
      close();
      return [dim(t('term.exit.line'))];
    },
  },
];

const BY_NAME = COMMANDS.reduce((map, command) => {
  map[command.id] = command;
  (command.aliases || []).forEach((alias) => {
    map[alias] = command;
  });
  return map;
}, {});

/** Split what was typed into a command and the rest of the line. */
export const parse = (input) => {
  const trimmed = input.trim().replace(/\s+/g, ' ');
  if (!trimmed) return { command: null, arg: '' };
  const [head, ...rest] = trimmed.split(' ');
  return { command: BY_NAME[head.toLowerCase()] || null, arg: rest.join(' '), head };
};

/**
 * Commands matching what has been typed so far, for the suggestion list.
 * An exact match sorts first, then prefixes, then anything containing it —
 * so typing "co" offers contact before it offers anything else.
 */
export const suggest = (input) => {
  const query = input.trim().toLowerCase().split(' ')[0];
  if (!query) return COMMANDS;
  const score = (command) => {
    const names = [command.id, ...(command.aliases || [])];
    if (names.includes(query)) return 0;
    if (names.some((n) => n.startsWith(query))) return 1;
    if (names.some((n) => n.includes(query))) return 2;
    return 3;
  };
  return COMMANDS.map((c) => [c, score(c)])
    .filter(([, s]) => s < 3)
    .sort((a, b) => a[1] - b[1])
    .map(([c]) => c);
};
