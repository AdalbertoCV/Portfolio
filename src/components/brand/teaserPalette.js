// Colours for the hand-off strips at the foot of each page. The site is
// monochrome, so colour in a strip has to mean something: a role's brand, a
// language, a technology. Where a brand scope can carry the colour
// (data-brand + --brand-core in brand.css) the strips use that; these hex
// values are only for what a scope cannot reach, such as gradient stops, and
// they mirror brand.css.

export const BRAND_CORE = {
  labsol: '#f2624c',
  case: '#f472b6',
  freelance: '#f5b942',
  evodeps: '#6a9bff',
  radii: '#22d3ee',
  moonphase: '#a78bfa',
  stackselect: '#34d399',
};

// Marks from the wall, by their own brand colour. Order is the reading order
// across the strip, so neighbours never share a hue.
export const TECH_COLOURS = [
  '#61dafb', // React
  '#3776ab', // Python
  '#ff9900', // AWS
  '#44b78b', // Django
  '#2496ed', // Docker
  '#dc382d', // Redis
  '#3178c6', // TypeScript
  '#f05032', // Git
  '#5fa04e', // Node.js
  '#a78bfa', // LangGraph-ish violet, the agents
  '#f7df1e', // JavaScript
  '#4169e1', // PostgreSQL
  '#e535ab', // GraphQL
];
