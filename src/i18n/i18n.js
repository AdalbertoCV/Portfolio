export const LANG_STORAGE_KEY = 'portfolio-lang';
export const LANGUAGES = ['en', 'es'];

export function detectLanguage(stored, navigatorLanguages) {
  if (LANGUAGES.includes(stored)) return stored;
  const tags = Array.isArray(navigatorLanguages) ? navigatorLanguages : [];
  const wantsSpanish = tags.some(
    (tag) => typeof tag === 'string' && tag.toLowerCase().startsWith('es')
  );
  return wantsSpanish ? 'es' : 'en';
}

export function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return LANGUAGES.includes(stored) ? stored : null;
  } catch (error) {
    return null;
  }
}

export function writeStoredLanguage(lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    // The choice just won't survive a reload.
  }
}

// Returns the key itself on a miss, so a missing string shows up as
// "experience.radii.body" rather than as blank space nobody notices.
// Own properties only: traversing the prototype chain would let a key like
// 'constructor.name' resolve to an unrelated string instead of reporting a miss.
// Same lookup as translate(), but for the dictionary's list entries — the CV's
// chip rows and interest cards, where the number of items is content, not code,
// and should be editable in one place per language.
// Returns [] on a miss rather than the key: a stray key string rendered as a
// chip looks like real content, where an empty row is visibly missing.
export function translateList(dictionary, key) {
  const value = readPath(dictionary, key);
  return Array.isArray(value) ? value : [];
}

export function translate(dictionary, key) {
  const value = readPath(dictionary, key);
  return typeof value === 'string' ? value : key;
}

// Own properties only: traversing the prototype chain would let a key like
// 'constructor.name' resolve to an unrelated string instead of reporting a miss.
function readPath(dictionary, key) {
  return String(key)
    .split('.')
    .reduce(
      (node, part) =>
        node != null && Object.prototype.hasOwnProperty.call(node, part)
          ? node[part]
          : undefined,
      dictionary
    );
}
