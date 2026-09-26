import fs from 'fs';
import path from 'path';

const css = (file) => fs.readFileSync(path.join(__dirname, '..', file), 'utf8').replace(/\r\n/g, '\n');

// The rule body for `selector` inside the first `@media (max-width: 1199px)`.
const collapsedRule = (selector) => {
  const source = css('App.css');
  const block = source.slice(source.indexOf('@media (max-width: 1199px)'));
  const start = block.indexOf(`\n    ${selector} {`);
  return block.slice(start, block.indexOf('\n    }', start));
};

// Seven entries are taller than a landscape phone. A sheet hanging off a fixed
// bar cannot be scrolled to, so it has to scroll inside itself.
test('the menu sheet scrolls within the viewport instead of running off it', () => {
  const rule = collapsedRule('.nav-sheet');
  expect(rule).toMatch(/max-height:\s*calc\(100dvh - var\(--navbar-h/);
  expect(rule).toMatch(/overflow-y:\s*auto/);
});

// tsLit starts at fill-opacity 0.6; a milestone resting at 1 would snap down to
// it the moment its first cycle begins, a flicker rather than a light-up.
test('timeline milestones rest at the opacity their light cycle starts from', () => {
  const source = fs.readFileSync(path.join(__dirname, 'hub.css'), 'utf8').replace(/\r\n/g, '\n');
  const start = source.indexOf('\n.ts-role,\n.ts-milestone {');
  const rule = source.slice(start, source.indexOf('}', start));
  expect(rule).toMatch(/fill-opacity:\s*0\.6/);
});

// Under 900px every hand-off strip drops below the button at full width, so
// the chain of cards reads the same on every page. The narrow rule has to come
// after the strip's own rule, or the strip's max-width wins the cascade.
test('every hand-off strip spans the card under 900px', () => {
  const source = fs.readFileSync(path.join(__dirname, 'hub.css'), 'utf8').replace(/\r\n/g, '\n');
  ['.timeline-strip', '.ventures-roadmap', '.projects-mosaic', '.stack-tiles', '.shelf-strip'].forEach((strip) => {
    const base = source.indexOf(`\n${strip} {`);
    const narrow = source.indexOf('@media (max-width: 900px)', base);
    expect(narrow).toBeGreaterThan(base);
    const block = source.slice(narrow, source.indexOf('\n}\n', narrow));
    expect(block).toContain(strip);
    expect(block).toContain('max-width: none');
  });
});
