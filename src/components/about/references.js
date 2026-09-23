/* ==========================================================================
   REFERENCES

   People, not quotes. Nobody here was asked for a sentence about the work, so
   nobody here is quoted saying one — they are listed with their own links so
   a reader can go and ask them directly.

   Names and organisations are proper nouns and stay as written. Only the role
   is translated, which is why it lives in the dictionary and not here. Each
   person carries a list of positions rather than one, because at least one of
   them holds two and a special case for a single card is worse than a list
   everybody uses. `site`
   is optional — not everyone has one, and an absent link is better than a
   dead one.

   `figure` and `glow` draw the little hooded avatar on the card. The colour
   belongs to the person and is used nowhere else on the page, so a reader who
   has scrolled past once can find them again by it.
   ======================================================================== */

const REFERENCES = [
  {
    // First: the closest of these to the work the rest of the site is about.
    id: 'cesar',
    figure: 'm',
    glow: '#7dd3a0',
    name: 'César Aranda',
    roles: [{ id: 'cesar', org: 'Radii Manufacturing' }],
    linkedin: 'https://www.linkedin.com/in/cesararandaa/',
  },
  {
    id: 'viky',
    figure: 'f',
    glow: '#b191f2',
    name: 'Viky Gómez',
    roles: [{ id: 'viky', org: 'Radii Manufacturing' }],
    site: 'https://v0-portfolio-nu-five-98.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/viktoria-g%C3%B3mez-91990428a',
  },
  {
    id: 'elliot',
    figure: 'm',
    glow: '#e8b464',
    name: 'Elliot Noriega',
    roles: [{ id: 'elliot', org: 'Rancho El Tirón' }],
    site: 'https://portafolio-web-psi-five.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/elliot-axel-noriega-41005528a/',
  },
  {
    // No site of her own to point at, which the card handles: the portfolio
    // link is optional, not an empty one.
    id: 'esmeralda',
    figure: 'f',
    glow: '#6ec8e8',
    name: 'Esmeralda Pacheco',
    roles: [{ id: 'esmeralda', org: 'Evodeps' }],
    linkedin: 'https://www.linkedin.com/in/esmeralda-pacheco-glez/',
  },
  {
    id: 'rafael',
    figure: 'm',
    glow: '#ec8fa8',
    name: 'Rafael Rangel',
    // Two of them, newest first.
    roles: [
      { id: 'rafaelCto', org: 'Evodeps' },
      { id: 'rafaelPm', org: 'Zig Zag Zacatecas' },
    ],
    site: 'https://doublerre.com/',
    linkedin: 'https://www.linkedin.com/in/doublerre/',
  },
];

export default REFERENCES;
