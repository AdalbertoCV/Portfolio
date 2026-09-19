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

const RouteMeta = () => {
  const { pathname } = useLocation();
  const { t, lang } = useTranslation();

  useEffect(() => {
    const page = PAGES[pathname] || 'home';
    const title = t(`meta.${page}.title`);
    const description = t(`meta.${page}.description`);
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'es' ? 'es_MX' : 'en_US');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [pathname, lang, t]);

  return null;
};

export default RouteMeta;
