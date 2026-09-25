import { normalize, searchStack } from './stackSearch';

const GROUPS = [
  { id: 'languages', items: [{ name: 'C++' }, { name: 'C#' }, { name: 'Python' }] },
  { id: 'frontend', items: [{ name: 'Next.js' }, { name: 'Vue' }] },
  { id: 'ai', items: [{ name: 'LangChain' }, { name: 'LangGraph' }] },
];

describe('normalize', () => {
  test('ignores case, accents and punctuation', () => {
    expect(normalize('Next.js')).toBe('nextjs');
    expect(normalize('Árbol Ñandú')).toBe('arbolnandu');
  });

  // Otherwise C, C++ and C# would all normalise to "c".
  test('spells out + and # so C++ and C# stay distinct', () => {
    expect(normalize('C++')).toBe('cplusplus');
    expect(normalize('C#')).toBe('csharp');
  });
});

describe('searchStack', () => {
  test('returns only the groups with matches, each with its matching items', () => {
    expect(searchStack(GROUPS, 'lang')).toEqual([{ id: 'ai', items: [{ name: 'LangChain' }, { name: 'LangGraph' }] }]);
  });

  test('matches however the name is typed', () => {
    expect(searchStack(GROUPS, 'nextjs')[0].items).toEqual([{ name: 'Next.js' }]);
    expect(searchStack(GROUPS, 'c++')[0].items).toEqual([{ name: 'C++' }]);
    expect(searchStack(GROUPS, 'csharp')[0].items).toEqual([{ name: 'C#' }]);
  });

  test('a blank query is no search at all', () => {
    expect(searchStack(GROUPS, '   ')).toBeNull();
    expect(searchStack(GROUPS, '.')).toBeNull();
  });

  test('no match is an empty list, not null', () => {
    expect(searchStack(GROUPS, 'cobol')).toEqual([]);
  });
});
