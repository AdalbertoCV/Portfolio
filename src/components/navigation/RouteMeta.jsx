import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';

/**
 * Keeps <title>, the description, the canonical URL and the Open Graph pair in
 * step with the current route and language.
 *
 * What this is NOT for: link previews. LinkedIn, Slack, WhatsApp and X never
 * run the bundle, so they read public/index.html and only that — which is why
 * the strongest version of the pitch is hard-coded there. This exists for the
 * browser tab, the bookmark, the history entry, the screen-reader page
 * announcement, and the crawlers that do render JavaScript.
 *
 * Rendered once inside the Router rather than per page, so a new route is one
 * line in the map below instead of a component every page has to remember.
 */

export const SITE_URL = 'https://portfolio-phi-ten-37.vercel.app';

// Path to dictionary key. A route missing from this map falls back to `home`,
// which is wrong but never blank.
const PAGES = {
  '/': 'home',
  '/experience': 'experience',
  '/ventures': 'ventures',
  '/projects': 'projects',
  '/stack': 'stack',
  '/contact': 'contact',
  '/radii': 'radii',
  '/stackselect': 'stackselect',
  '/moonphase': 'moonphase',
  '/evodeps': 'evodeps',
  '/freelance': 'freelance',
  '/labsol': 'labsol',
  '/case': 'case',
  '/uaz': 'uaz',
  '/decisions': 'decisions',
  '/study': 'study',
  '/changelog': 'changelog',
  '/play': 'play',
};

// Creates the tag on first use rather than assuming index.html already has it,
// so this cannot silently no-op if the template is edited.
const setMeta = (selector, attribute, value, content) => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
};

const setLink = (rel, href, hreflang) => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    if (hreflang) node.setAttribute('hreflang', hreflang);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
};

const RouteMeta = () => {
  const { pathname } = useLocation();
  const { t, lang } = useTranslation();

  useEffect(() => {
    const page = PAGES[pathname] || 'home';
    const title = t(`meta.${page}.title`);
    const description = t(`meta.${page}.description`);

    // `pathname` has already had the Router's basename stripped off it, so the
    // language prefix goes back on here. Spanish is the unprefixed one.
    const spanish = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    const english = `${SITE_URL}/en${pathname === '/' ? '' : pathname}`;
    const url = lang === 'en' ? english : spanish;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'es' ? 'es_MX' : 'en_US');

    setLink('canonical', url);

    // Without these two a crawler reads the Spanish and English versions of a
    // page as duplicates of each other and picks one. With them it knows they
    // are the same page in two languages and serves whichever matches the
    // reader. x-default points at Spanish because that is what an address with
    // no language in it means here.
    setLink('alternate', spanish, 'es');
    setLink('alternate', english, 'en');
    setLink('alternate', spanish, 'x-default');
  }, [pathname, lang, t]);

  return null;
};

export default RouteMeta;
