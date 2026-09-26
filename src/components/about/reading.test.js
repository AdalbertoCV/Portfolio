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

// No shelf should read as an afterthought beside the AI one.
test('every shelf holds the same number of books', () => {
  const sizes = READING.map((shelf) => shelf.books.length);
  expect(new Set(sizes).size).toBe(1);
});

test('no book sits on two shelves', () => {
  const titles = READING.flatMap((shelf) => shelf.books.map((book) => book.title));
  expect(titles.filter((title, index) => titles.indexOf(title) !== index)).toEqual([]);
});

test('there is a shelf for the sciences', () => {
  const science = READING.find((shelf) => shelf.id === 'science');
  expect(science.books.map((book) => book.title)).toEqual(
    expect.arrayContaining(['Cosmos', 'The Feynman Lectures on Physics', 'The Disappearing Spoon']),
  );
});
