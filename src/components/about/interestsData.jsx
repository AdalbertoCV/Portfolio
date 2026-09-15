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

// One icon per card. Drawn here rather than reused from the skill-tile concept
// set: these are section marks at 30px, and they answer to a different
// vocabulary — a climbing trajectory, a theatre mask, a figure in motion.
export const INTEREST_ICONS = {
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 20h18" />
      <path d="M5 17V9M10 17V5M15 17v-7M20 17V7" />
      <path d="m3.5 6 4-3 4 2.5L20 2" />
      <path d="M17 2h3v3" />
    </svg>
  ),
  // A theatre mask: the one symbol that reads as "the arts" across music,
  // literature, cinema and stage, rather than picking one of them. The page
  // with a note it replaces said "sheet music" and nothing else.
  arts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.8 4.6h14.4v7.1c0 4.6-3.2 8.3-7.2 8.3s-7.2-3.7-7.2-8.3z" />
      <path d="M8.2 9.5c.7-.7 1.8-.7 2.5 0" />
      <path d="M13.3 9.5c.7-.7 1.8-.7 2.5 0" />
      <path d="M9.3 14.2c1.7 1.3 3.7 1.3 5.4 0" />
      <path d="M4.8 4.6 2.6 2.4M19.2 4.6l2.2-2.2" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.4 18.2h5.2" />
      <path d="M10.2 21h3.6" />
      <path d="M12 2.8a6.2 6.2 0 0 1 3.7 11.2c-.7.5-1.1 1.3-1.1 2.2H9.4c0-.9-.4-1.7-1.1-2.2A6.2 6.2 0 0 1 12 2.8z" />
      <path d="M20.4 5.2 22 4.4M3.6 5.2 2 4.4M21 11h1.6M1.4 11H3" />
    </svg>
  ),
  sports: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="15.4" cy="4.4" r="1.9" />
      <path d="m8.2 21 2.6-5.2-2.8-2.6.9-4.9" />
      <path d="m8.9 8.3 3.6-1.4 2.6 2.6 3 .9" />
      <path d="m10.8 15.8 3.9 1.2 1.7 4" />
      <path d="M5.2 11.2 8.9 8.3" />
    </svg>
  ),
  // A shield read from the inside: the seam down the middle is where an
  // attacker gets in, which is the half of security this card is about.
  security: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.6 4.4 5.8v6.1c0 4.6 3.1 8.1 7.6 9.5 4.5-1.4 7.6-4.9 7.6-9.5V5.8z" />
      <path d="M12 2.6v18.8" />
      <path d="M8.4 9.4h.01M8.4 13.4h.01" />
      <path d="M15.6 9.4h1.4M15.6 13.4h1.4" />
    </svg>
  ),
  // A head with a path through it: knowledge as a route that gets built, not a
  // container that gets filled. The node outside is the part that gets handed
  // to somebody else, which is the half of this card that is about teaching.
  learning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.4 21.2v-3.6a7.4 7.4 0 1 1 9.6-8.6c1.6.4 2.7 1.5 2.7 2.8 0 .9-.8 1.5-1.8 1.5h-1.3v2.4a1.9 1.9 0 0 1-1.9 1.9h-1.9v3.6" />
      <circle cx="9.8" cy="11.6" r="1.3" />
      <circle cx="13.8" cy="9.2" r="1.3" />
      <path d="m11 10.9 1.7-1" />
    </svg>
  ),
  culture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8c2.4 2.5 3.7 5.8 3.7 9.2s-1.3 6.7-3.7 9.2c-2.4-2.5-3.7-5.8-3.7-9.2S9.6 5.3 12 2.8z" />
    </svg>
  ),
  science: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.4" transform="rotate(120 12 12)" />
    </svg>
  ),
};
