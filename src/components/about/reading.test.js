import READING from './reading';

test("Don't Make Me Think sits on the engineering-craft shelf", () => {
  const craft = READING.find((shelf) => shelf.id === 'craft');
  expect(craft.books).toContainEqual({ title: 'Don’t Make Me Think', author: 'Steve Krug', icon: 'usability' });
});
