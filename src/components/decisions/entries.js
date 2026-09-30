/* ==========================================================================
   THE DECISION LOG

   Shape only. Every word a reader sees comes from the dictionary, because
   these are claims about judgement and they have to exist in both languages
   or not at all.

   The form is an ADR, deliberately: options, the one taken, the reason, and
   what it turned out to cost. A decision written without the options it beat
   is not a decision, it is an announcement — and the options are the part a
   reader is actually judging.

   Entries are newest first. `where` names the room the call was made in, so
   a reader can tell a production decision from a one-day hackathon one, and
   `date` is either a year — which needs no translating — or a key into the
   dictionary for the ones that are still running.
   ======================================================================== */

const ENTRIES = [
  {
    id: 'cloud',
    date: '2026',
    where: 'radii',
    tags: ['AWS', 'Azure', 'Bedrock', 'Vision models'],
  },
  {
    id: 'quoter',
    date: '2025',
    where: 'radii',
    tags: ['Pricing', 'Machine Learning', 'Deterministic', 'Domain model'],
  },
  {
    id: 'services',
    date: '2025',
    where: 'radii',
    tags: ['Microservices', 'Monolith', 'Single responsibility', 'Scalability'],
  },
  {
    id: 'parallel',
    date: '2025',
    where: 'personal',
    tags: ['Moonphase', 'StackSelect', 'Focus'],
  },
  {
    id: 'breadth',
    date: 'ongoing',
    where: 'personal',
    tags: ['Breadth', 'Specialism', 'Curiosity'],
  },
];

export default ENTRIES;
