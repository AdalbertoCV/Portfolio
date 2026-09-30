import someceImage from '../../images/Achievements/constancia1.webp';
import ICPImage from '../../images/Achievements/constancia2.webp';

/*
 * The credentials, as data. They used to be a list of keys in about.jsx with the
 * links and the two proof images defined beside it; the rail that shows them
 * needs the year (the sky lays the stars out in the order they were earned), a
 * tone per credential and the kind of thing each one is, so the list moved here
 * and about.jsx only renders it.
 *
 * Adding a certification is adding an entry here and its text under
 * cv.certs.<key> in both dictionaries. Nothing else has to know: the rail, the
 * sky and the counter all read this list, and once it is longer than a row of
 * dots can carry the rail switches to a counter and filters by `domain` on its
 * own.
 *
 * `year` is a number, for ordering and for the label on the star; the text the
 * reader sees is still the dictionary's, which may carry more than a year.
 */

// The order the cards open in. Kept as it was on the page before the rail.
export const CERT_ITEMS = [
  { key: 'icp', domain: 'web3', year: 2023, tone: '#a78bfa', proof: ICPImage },
  { key: 'langchain', domain: 'ai', year: 2025, tone: '#34d399' },
  { key: 'santander', domain: 'emerging', year: 2024, tone: '#f2624c' },
  {
    key: 'somece',
    domain: 'research',
    year: 2024,
    tone: '#facc15',
    proof: someceImage,
    // A certificate only carries links when there is something published to
    // point at. SOMECE has two: the proceedings the paper appears in, and the
    // recording of the talk itself — which is the one thing on that channel that
    // is evidence of a claim this page already makes, rather than a video.
    links: [
      {
        id: 'paper',
        href: 'https://www.google.com.mx/books/edition/Proleg%C3%B3menos_de_la_Inteligencia_Artific/m-I2EQAAQBAJ?hl=es&gbpv=1&pg=PA111&printsec=frontcover',
      },
      { id: 'talk', href: 'https://www.youtube.com/watch?v=WPH80wfQbXg' },
    ],
  },
];

export const CERT_DOMAINS = ['web3', 'ai', 'emerging', 'research'];
