import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en';
import es from './es';
import {
  detectLanguage,
  readStoredLanguage,
  translate,
  translateList,
  writeStoredLanguage,
} from './i18n';

const DICTIONARIES = { en, es };
const I18nContext = createContext(null);

const initialLanguage = () => {
  const navigatorLanguages =
    typeof navigator === 'undefined'
      ? []
      : navigator.languages || (navigator.language ? [navigator.language] : []);
  return detectLanguage(readStoredLanguage(), navigatorLanguages);
};

export const I18nProvider = ({ children }) => {
  const [lang, setLangState] = useState(initialLanguage);

  // Screen readers and the browser's own translation prompt both read this.
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    writeStoredLanguage(next);
  }, []);

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
