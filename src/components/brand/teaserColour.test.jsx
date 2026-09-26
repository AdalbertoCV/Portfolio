import { render } from '@testing-library/react';
import TimelineStrip from '../about/TimelineStrip';
import VenturesRoadmap from '../ventures/VenturesRoadmap';
import ProjectsMosaic from '../projects/ProjectsMosaic';
import StackTiles from '../stack/StackTiles';
import ContactChain from '../contact/ContactChain';

// Every colour a strip paints with: inline colours, gradient stops, and the
// brand scopes that resolve --brand-core in CSS.
const coloursOf = (container) => {
  const found = new Set();
  container.querySelectorAll('*').forEach((node) => {
    if (node.style?.color) found.add(node.style.color);
    const stop = node.getAttribute('stop-color');
    if (stop && stop !== 'currentColor') found.add(stop);
    const brand = node.getAttribute('data-brand');
    if (brand) found.add(`brand:${brand}`);
  });
  return found;
};

test.each([
  ['TimelineStrip', TimelineStrip],
  ['VenturesRoadmap', VenturesRoadmap],
  ['ProjectsMosaic', ProjectsMosaic],
  ['StackTiles', StackTiles],
  ['ContactChain', ContactChain],
])('%s is drawn in colour, not in grey', (_name, Strip) => {
  const { container } = render(<Strip />);
  expect(coloursOf(container).size).toBeGreaterThanOrEqual(4);
});

// A shape is coloured when it paints with a gradient, or when it or an
// ancestor inside the strip sets a colour or a brand scope for currentColor.
const isColoured = (shape, root) => {
  if (/url\(/.test(shape.getAttribute('stroke') || '') || /url\(/.test(shape.getAttribute('fill') || '')) return true;
  for (let node = shape; node && node !== root; node = node.parentElement) {
    if (node.style?.color || node.getAttribute('data-brand')) return true;
  }
  return false;
};

test.each([
  ['TimelineStrip', TimelineStrip],
  ['VenturesRoadmap', VenturesRoadmap],
  ['ProjectsMosaic', ProjectsMosaic],
  ['StackTiles', StackTiles],
  ['ContactChain', ContactChain],
])('most of %s is in colour, not only an accent', (_name, Strip) => {
  const { container } = render(<Strip />);
  const root = container.firstChild;
  const shapes = [...root.querySelectorAll('svg path, svg rect, svg circle')].filter((shape) => !shape.closest('defs'));
  const coloured = shapes.filter((shape) => isColoured(shape, root));
  expect(coloured.length / shapes.length).toBeGreaterThanOrEqual(0.6);
});
