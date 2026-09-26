import soundcloudMark from '../../images/soundcloud.svg';

/*
 * The data behind the interest cards, lifted out of about.jsx when the cards
 * moved to their own route. Two pages render them now — the home page shows
 * nothing but a teaser, /interests shows all eight — and neither should own
 * the list.
 */

// An interest card can carry one outbound link, where the card makes a claim
// that has somewhere to be verified. The arts card says he writes songs and
// runs musical projects; this is where that stops being an assertion.
export const INTEREST_LINKS = {
  arts: {
    href: 'https://soundcloud.com/adal-cerrillo-oficial',
    mark: soundcloudMark,
  },
};

export const INTEREST_KEYS = [
  'innovation',
  'business',
  'science',
  'security',
  'learning',
  'arts',
  'sports',
  'culture',
];

// One tone per card, taken from the site's brand palette so the grid reads as
// eight subjects rather than eight grey boxes. Each is distinct from its
// neighbours in the grid order above.
export const INTEREST_TONES = {
  innovation: '#facc15',
  business: '#34d399',
  science: '#a78bfa',
  security: '#22d3ee',
  learning: '#6a9bff',
  arts: '#f472b6',
  sports: '#f2624c',
  culture: '#fb923c',
};
