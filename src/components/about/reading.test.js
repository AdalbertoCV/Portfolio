import BOOK_COVERS from './bookCovers';
import READING from './reading';

test("Don't Make Me Think sits on the engineering-craft shelf", () => {
  const craft = READING.find((shelf) => shelf.id === 'craft');
  expect(craft.books).toContainEqual({ title: 'Don’t Make Me Think', author: 'Steve Krug', icon: 'usability' });
});

// A shelf of covers with one icon in the middle reads as a broken image.
test('every book on the list has its cover', () => {
  const missing = READING.flatMap((shelf) => shelf.books).filter((book) => !BOOK_COVERS[book.title]);
  expect(missing.map((book) => book.title)).toEqual([]);
});
