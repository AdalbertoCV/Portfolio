/* ==========================================================================
   THE FIGURE, AS PIXELS

   One drawing, used twice: the one watching the contact form, and the small
   avatars on the reference cards. Shared rather than copied, because the two
   drifting apart would be worse than either of them being wrong.

   Every entry is [x, y, w, h] in the grid below. Rows are listed the way the
   shape was drawn instead of folded into paths, so a pixel can be moved by
   changing one number.
   ======================================================================== */

import './hacker.css';

export const W = 48;
export const H = 34;

// Where each eye's top-left pixel sits. The face opening runs x 16–32 and
// y 10–20, so a 4x3 eye at 18,13 has exactly two pixels of travel in each
// direction before it touches the hood.
export const EYES = [18, 26];
export const EYE_Y = 13;
export const REACH = 2;

export const HOOD = [
  [21, 2, 6, 1],
  [19, 3, 10, 1],
  [17, 4, 14, 1],
  [16, 5, 16, 1],
  [15, 6, 18, 1],
  [14, 7, 20, 1],
  [13, 8, 22, 1],
  [12, 9, 24, 13],
  [11, 22, 26, 1],
  [10, 23, 28, 1],
];

// The opening, cut out of the hood. Darker than the fabric, which is what
// makes the fabric read as fabric.
export const VOID = [
  [20, 7, 8, 1],
  [18, 8, 12, 1],
  [17, 9, 14, 1],
  [16, 10, 16, 11],
  [17, 21, 14, 1],
  [19, 22, 10, 1],
];

// Hair, for the figures that have it: the band of hood between the opening
// and the outer edge, filled in a lighter tone so it reads as falling in
// front of the fabric rather than as part of it. It is the only difference
// between the two figures — no bow, no lashes, nothing that would be a
// costume rather than a person.
export const HAIR = [
  [14, 8, 2, 1],
  [13, 9, 3, 2],
  [12, 11, 4, 11],
  [11, 22, 5, 6],
  [32, 8, 2, 1],
  [32, 9, 3, 2],
  [32, 11, 4, 11],
  [32, 22, 5, 6],
];

// A light down the left silhouette. One column at low opacity, and the whole
// figure stops being a dark blob.
export const RIM = [
  [21, 2, 3, 1],
  [19, 3, 2, 1],
  [17, 4, 2, 1],
  [16, 5, 1, 1],
  [15, 6, 1, 1],
  [14, 7, 1, 1],
  [13, 8, 1, 1],
  [12, 9, 1, 13],
  [11, 22, 1, 1],
  [10, 23, 1, 1],
];

export const SHOULDERS = [
  [8, 24, 32, 1],
  [6, 25, 36, 1],
  [4, 26, 40, 1],
  [3, 27, 42, 1],
  [2, 28, 44, 6],
];

// The same light carried along the top of the near shoulder, so the figure
// has one continuous edge instead of a lit head on an unlit body.
export const SHOULDER_RIM = [
  [8, 24, 2, 1],
  [6, 25, 2, 1],
  [4, 26, 2, 1],
  [3, 27, 1, 1],
  [2, 28, 1, 6],
];

// Top right, clear of the hood. Four rows is the smallest heart that still
// reads as one rather than as a smudge.
export const HEART = [
  [38, 4, 2, 1],
  [41, 4, 2, 1],
  [38, 5, 5, 1],
  [39, 6, 3, 1],
  [40, 7, 1, 1],
];

export const Px = ({ r: [x, y, w, h], className }) => (
  <rect className={className} x={x} y={y} width={w} height={h} />
);
