// Search over the stack wall. Forgiving on purpose: a reader types "nextjs",
// "vue js" or "c++" and should find Next.js, Vue and C++ regardless of how the
// tile spells them. Case, accents and punctuation are ignored; + and # are
// spelled out first, or C, C++ and C# would all collapse to "c".

export const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]/g, '');

// Null when the query is blank (no search is running), otherwise the groups
// that have matches, each holding only its matching items — an empty list
// when nothing matches, so "no results" and "not searching" stay distinct.
export const searchStack = (groups, query) => {
  const needle = normalize(query);
  if (!needle) return null;
  return groups
    .map((group) => ({ id: group.id, items: group.items.filter((item) => normalize(item.name).includes(needle)) }))
    .filter((group) => group.items.length);
};
