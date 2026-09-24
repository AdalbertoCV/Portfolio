import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import es from './es';
import {
  detectLanguage,
  languageFromPath,
  pathWithLanguage,
  readStoredLanguage,
  translate,
  translateList,
  writeStoredLanguage,
} from './i18n';

const DICTIONARIES = { en, es };
const I18nContext = createContext(null);

/* Resolved once, at import, before anything renders — the Router reads the
   URL on its first mount and the two have to already agree.

   The URL wins when it says anything. A link somebody was sent is a decision
   that person's browser preference does not get to override, and it is the
   whole reason for doing this.

   When the URL says nothing and the reader would get English, the URL is
   rewritten to say so. Otherwise /projects would serve English while claiming
   to be the Spanish page, which is wrong for a crawler and wrong for anyone
   who copies the address out of the bar. */
const bootLanguage = () => {
  if (typeof window === 'undefined') return 'es';

  const asked = languageFromPath(window.location.pathname);
  if (asked) return asked;

  const navigatorLanguages = navigator.languages || (navigator.language ? [navigator.language] : []);
  const preferred = detectLanguage(readStoredLanguage(), navigatorLanguages);

  if (preferred === 'en') {
    const target = pathWithLanguage('en', window.location.pathname);
    window.history.replaceState(null, '', target + window.location.search + window.location.hash);
  }

  return preferred;
};

const BOOT_LANGUAGE = bootLanguage();

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(BOOT_LANGUAGE);

  // Screen readers and the browser's own translation prompt both read this.
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  /* The address changes first and the state second. The Router's basename is
     fixed for the life of a Router, so App remounts it on this change — and it
     has to find the URL already rewritten when it does. */
  const setLang = useCallback(
    (next) => {
      if (next === lang) return;
      writeStoredLanguage(next);
      const target = pathWithLanguage(next, window.location.pathname);
      window.history.replaceState(null, '', target + window.location.search + window.location.hash);
      setLangState(next);
    },
    [lang]
  );

  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'es' : 'en'), [lang, setLang]);

  const value = useMemo(() => {
    const dictionary = DICTIONARIES[lang] || en;
    return {
      lang,
      setLang,
      toggleLang,
      t: (key) => translate(dictionary, key),
      tl: (key) => translateList(dictionary, key),
    };
  }, [lang, setLang, toggleLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useTranslation must be used inside an I18nProvider');
  return context;
};
