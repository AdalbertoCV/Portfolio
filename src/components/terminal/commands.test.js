import { COMMANDS, DESTINATIONS } from './commands';

const ctx = (go) => ({ t: (key) => key, tl: () => [], go, toggleTheme() {}, setLang() {}, lang: 'en', clear() {}, close() {} });
const find = (name) => COMMANDS.find((command) => command.id === name || (command.aliases || []).includes(name));

test('stack opens the stack page, not About', () => {
  const go = jest.fn();
  find('stack').run(ctx(go));
  expect(go).toHaveBeenCalledWith('/stack');
});

test('library and its Spanish names open the shelves on the stack page', () => {
  ['library', 'biblioteca', 'lectura'].forEach((name) => {
    const go = jest.fn();
    find(name).run(ctx(go));
    expect(go).toHaveBeenCalledWith('/stack#library');
  });
});

test('open knows both new pages', () => {
  expect(DESTINATIONS.stack).toBe('/stack');
  expect(DESTINATIONS.library).toBe('/stack#library');
});
