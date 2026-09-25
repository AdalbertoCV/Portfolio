import en from '../../i18n/en';
import es from '../../i18n/es';
import REFERENCES from './references';

test('Nestor is listed with his own links, as a software engineer with no company named', () => {
  const nestor = REFERENCES.find((person) => person.id === 'nestor');
  expect(nestor).toMatchObject({
    name: 'Nestor García',
    linkedin: 'https://www.linkedin.com/in/ngarcia12/',
    site: 'https://nestorportf.vercel.app/',
  });
  expect(nestor.roles).toEqual([{ id: 'nestor' }]);
  expect(es.cv.references.nestor).toBe('Software Engineer');
  expect(en.cv.references.nestor).toBe('Software Engineer');
});

test.each([
  ['es', es],
  ['en', en],
])('every role has its line in %s', (_name, dictionary) => {
  const missing = REFERENCES.flatMap((person) => person.roles).filter(({ id }) => !dictionary.cv.references[id]);
  expect(missing).toEqual([]);
});

// Each person's colour is theirs alone, so a reader can find them again by it.
test('no two people share a glow', () => {
  const glows = REFERENCES.map((person) => person.glow.toLowerCase());
  expect(new Set(glows).size).toBe(glows.length);
});
