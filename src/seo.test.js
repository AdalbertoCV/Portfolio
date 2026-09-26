import fs from 'fs';
import path from 'path';

// Navbar entries are buttons, not links, so the sitemap is how a crawler
// learns every page in the bar exists.
test('the sitemap lists the stack page, and not the retired library address', () => {
  const sitemap = fs.readFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), 'utf8');
  expect(sitemap).toContain('<loc>https://portfolio-phi-ten-37.vercel.app/stack</loc>');
  expect(sitemap).not.toContain('<loc>https://portfolio-phi-ten-37.vercel.app/library</loc>');
});
