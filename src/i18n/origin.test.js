import en from './en';
import es from './es';

// The 2016 Prezi note at the foot of the About page was cut: Prezi stays on
// the wall as a tool, without the anecdote.
test.each([
  ['es', es],
  ['en', en],
])('the About page carries no origin note in %s', (_name, dictionary) => {
  expect(dictionary.cv.origin).toBeUndefined();
});
