import rbrMark from '../../images/releasebeforeready.svg';
import innovafestMark from '../../images/innovafest.svg';
import talentlandMark from '../../images/talentland.svg';

/*
 * The events, as data. They were a list in about.jsx with three wordmarks; the
 * rail that shows them needs where each one was (the map pins it there) and when
 * (the arcs join them in the order they happened), so the list moved here and
 * about.jsx only renders it.
 *
 * Adding an event is adding an entry here and its text under cv.events.<key> in
 * both dictionaries. `lon` and `lat` are the city's, in degrees; two events in
 * the same city are fine, the map spreads their pins a little around it. `when`
 * is a sortable number (year + month / 12) and `year` is what the filter chips
 * are made of once the list is long enough to need them.
 *
 * Newest first, which is the order the cards open in.
 *
 * Each one is a wordmark, a line of copy and at most two destinations: the event
 * itself, and — where the day produced something catalogued here — the project it
 * turned into.
 */
export const EVENT_ITEMS = [
  {
    key: 'rbr',
    mark: rbrMark,
    url: 'https://www.releasebeforeready.com/es/eventos',
    project: '/projects',
    paragraphs: 2,
    city: 'Querétaro',
    lon: -100.39,
    lat: 20.59,
    year: 2026,
    when: 2026 + 8 / 12,
    tone: '#22d3ee',
  },
  {
    key: 'innovafest',
    mark: innovafestMark,
    url: 'https://innovafest.mx/encuentros/queretaro',
    city: 'Querétaro',
    lon: -100.39,
    lat: 20.59,
    year: 2026,
    when: 2026 + 8 / 12 - 0.001,
    tone: '#f472b6',
  },
  {
    key: 'talentland',
    mark: talentlandMark,
    url: 'https://www.talent-land.mx/',
    city: 'Guadalajara',
    lon: -103.35,
    lat: 20.66,
    year: 2024,
    when: 2024 + 4 / 12,
    tone: '#fb923c',
  },
];
