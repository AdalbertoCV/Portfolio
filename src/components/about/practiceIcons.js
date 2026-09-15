// One drawn mark per line of the engineering-practice list.
//
// Index-aligned with the `cv.practice.*Items` arrays in the dictionary rather
// than keyed by the text: the strings are translated and the keys would have
// to be too, which is a second list to keep in step for no gain. The
// dictionary test already enforces that both languages carry arrays of the
// same length, and PRACTICE_ICONS is checked against them in development —
// see the guard in about.jsx.
//
// Every name resolves to an icon in ConceptIcons.jsx. Three of them are marks
// that already existed for a technology and say exactly the same thing here:
// the eye for observability, the descent for optimisation, the topology for
// networking.
const PRACTICE_ICONS = {
  systems: [
    'architecture', // System design and architecture thinking
    'tradeoff', // Technical decision-making and trade-off analysis
    'dataModel', // Data modeling and consistency trade-offs
    'scale', // Scalability and capacity planning
    'risk', // Failure mode and risk analysis
    'resilience', // Reliability and fault tolerance
    'postmortem', // Incident analysis and postmortems
    'debt', // Technical debt management
    'observability', // Observability and production monitoring
    'secureDesign', // Security by design
    'experiment', // Metrics-driven and experimentation-based engineering
    'optimization', // Performance analysis and optimisation
    'endToEnd', // End-to-end solution design
  ],
  delivery: [
    'team', // Teamwork
    'scrum', // SCRUM methodology
    'projectPlan', // Project management
    'docs', // Software documentation
    'crossFunctional', // Cross-functional teams
    'prototype', // Rapid prototyping and PoCs
    'mentoring', // Mentoring and training
    'ownership', // Ownership mindset
  ],
  breadth: [
    'entrepreneur', // Entrepreneurial mindset
    'strategy', // Product and tech strategy
    'marketing', // Digital marketing vision and sales strategy
    'finance', // Fintech and investments knowledge
    'robotics', // Robotics and advanced manufacturing
    'networking', // Networking and hardware fundamentals
    'exactSciences', // Exact sciences
    'research', // Scientific and literary research
    'ethicalHacking', // Cybersecurity and ethical hacking
    'integration', // Basic mechanics and software integrations
  ],
};

export default PRACTICE_ICONS;
