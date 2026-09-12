// Hand-drawn icons for the skills that have no vendor logo, because a
// two-letter monogram is a placeholder and reads as one. Each icon draws the
// thing itself — a pub/sub fan-out, a feedback loop, a chain of blocks — so the
// grid stays legible as engineering rather than as a wall of initials.
//
// All of them share one grammar with the icons on the brand pages: 24×24,
// `currentColor`, 1.6 stroke, round caps. That is what keeps 37 vendor logos
// and 26 drawn marks reading as one set.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

const ICONS = {
  // A stack of platters — the shape every database has been drawn as since
  // the tape reel.
  sql: (
    <svg {...base}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  ),

  // Independent services, each its own box, talking across a seam.
  microservices: (
    <svg {...base}>
      <rect x="2.5" y="3" width="7" height="7" rx="1.8" />
      <rect x="14.5" y="3" width="7" height="7" rx="1.8" />
      <rect x="8.5" y="14" width="7" height="7" rx="1.8" />
      <path d="M9.5 6.5h5" />
      <path d="M6 10v2.5a1.5 1.5 0 0 0 1.5 1.5h1" />
      <path d="M18 10v2.5a1.5 1.5 0 0 1-1.5 1.5h-1" />
    </svg>
  ),

  // One producer, many subscribers: the fan-out is the whole idea.
  eventDriven: (
    <svg {...base}>
      <circle cx="4.5" cy="12" r="2.5" />
      <circle cx="19.5" cy="5" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <circle cx="19.5" cy="19" r="2" />
      <path d="M7 11.2 17.6 5.8" />
      <path d="M7 12h10.5" />
      <path d="M7 12.8 17.6 18.2" />
    </svg>
  ),

  // Peers in a ring, no centre — which is the point.
  distributed: (
    <svg {...base}>
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="9" r="2" />
      <circle cx="16.5" cy="18" r="2" />
      <circle cx="7.5" cy="18" r="2" />
      <circle cx="5" cy="9" r="2" />
      <path d="M13.7 5.1 17.4 7.8M18.6 11 17.2 16M14.6 18h-5.2M5.9 16 6.9 11M6.7 7.8l3.6-2.7" />
    </svg>
  ),

  // A delegated key: the token, not the password.
  oauth: (
    <svg {...base}>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9" />
      <path d="M17.5 12v3.2" />
      <path d="M20.5 12v2.2" />
    </svg>
  ),

  // Work leaving a queue and being picked up later, out of step.
  async: (
    <svg {...base}>
      <rect x="2.5" y="8.5" width="12" height="7" rx="2" />
      <path d="M6 12h5" />
      <path d="M17 6.5a6 6 0 0 1 0 11" />
      <path d="m15.2 4.7 2 1.8-2 1.8" />
    </svg>
  ),

  // A directed graph with a cycle — what makes it a graph and not a chain.
  langgraph: (
    <svg {...base}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.2 6h9.6" />
      <path d="M18 8.1 13.4 16" />
      <path d="M10.6 16 6 8.1" />
      <path d="m16.2 15.1 1.9-.6.1 2" />
    </svg>
  ),

  // An agent: a head that perceives and acts on its own.
  agents: (
    <svg {...base}>
      <rect x="4.5" y="8" width="15" height="11" rx="3.5" />
      <path d="M12 8V4.6" />
      <circle cx="12" cy="3.4" r="1.4" />
      <path d="M9 12.6h.01M15 12.6h.01" />
      <path d="M9.8 15.8h4.4" />
    </svg>
  ),

  // Retrieval: a document pulled into the model that answers with it.
  rag: (
    <svg {...base}>
      <path d="M4 3.5h6l3.5 3.5v5" />
      <path d="M4 3.5V16a1.5 1.5 0 0 0 1.5 1.5H9" />
      <path d="M10 3.5V7h3.5" />
      <circle cx="16" cy="15" r="4" />
      <path d="m19.2 18.2 2.3 2.3" />
    </svg>
  ),

  // A fitted curve through scattered observations.
  ml: (
    <svg {...base}>
      <path d="M3 19c4.5 0 6.5-13 9.5-13S17 15 21 15" />
      <circle cx="6.5" cy="14" r="1.1" />
      <circle cx="10" cy="8.5" r="1.1" />
      <circle cx="14.5" cy="10" r="1.1" />
      <circle cx="18" cy="16.5" r="1.1" />
    </svg>
  ),

  // Several agents negotiating a shared result.
  multiAgent: (
    <svg {...base}>
      <rect x="2.5" y="4" width="7" height="6" rx="2" />
      <rect x="14.5" y="4" width="7" height="6" rx="2" />
      <rect x="8.5" y="14.5" width="7" height="6" rx="2" />
      <path d="M9.5 7h5" />
      <path d="M6.5 10.5c0 2.5 1.5 4 4 4" />
      <path d="M17.5 10.5c0 2.5-1.5 4-4 4" />
    </svg>
  ),

  // A terminal that writes its own next line.
  codeAgents: (
    <svg {...base}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m6.5 10 2.2 2.2-2.2 2.2" />
      <path d="M11.5 14.6h3" />
      <path d="m18 7.4.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" />
    </svg>
  ),

  // Infrastructure written down: a blueprint, not a console session.
  iac: (
    <svg {...base}>
      <path d="M5 3.5h9L19 8v12.5H5z" />
      <path d="M14 3.5V8h5" />
      <path d="M8.5 12.5h7M8.5 16h4.5" />
      <circle cx="12" cy="12.5" r="0" />
    </svg>
  ),

  // Commit to production and back around again.
  cicd: (
    <svg {...base}>
      <path d="M20 12a8 8 0 0 1-8 8" />
      <path d="M4 12a8 8 0 0 1 8-8" />
      <path d="m17.6 4.6.6 3.4-3.4.6" />
      <path d="m6.4 19.4-.6-3.4 3.4-.6" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  ),

  // Watching a live signal, not reading a log after the fact.
  observability: (
    <svg {...base}>
      <path d="M1.8 12S5.5 5.5 12 5.5 22.2 12 22.2 12 18.5 18.5 12 18.5 1.8 12 1.8 12z" />
      <path d="M8 12h1.8l1.4-2.6 1.6 5 1.2-2.4H16" />
    </svg>
  ),

  // The cloud, locked.
  cloudSecurity: (
    <svg {...base}>
      <path d="M7 17.5a4.2 4.2 0 0 1-.4-8.37A5.6 5.6 0 0 1 17.3 9.2a4 4 0 0 1 1.5 7.6" />
      <rect x="9.2" y="14" width="5.6" height="5" rx="1.4" />
      <path d="M10.7 14v-1.3a1.3 1.3 0 0 1 2.6 0V14" />
    </svg>
  ),

  // What the cloud costs, going the right way.
  finops: (
    <svg {...base}>
      <path d="M7 13.5a4 4 0 0 1-.4-7.97A5.4 5.4 0 0 1 16.9 5.6a3.9 3.9 0 0 1 1.6 7.4" />
      <path d="M4 21c2.5 0 3.5-4 6-4s3.5 4 6 4 4-2 4-2" />
      <path d="M12 7.5v4M10.6 8.6h2.4a1 1 0 0 1 0 2h-2a1 1 0 0 0 0 2h2.4" />
    </svg>
  ),

  // A continuous flow being processed as it passes, not in a batch.
  stream: (
    <svg {...base}>
      <path d="M2.5 7.5c3 0 3-2 6-2s3 2 6 2 3-2 6-2" />
      <path d="M2.5 12.5c3 0 3-2 6-2s3 2 6 2 3-2 6-2" />
      <path d="M2.5 17.5c3 0 3-2 6-2s3 2 6 2 3-2 6-2" />
    </svg>
  ),

  // Measurements over time.
  timeSeries: (
    <svg {...base}>
      <path d="M3 4v16h18" />
      <path d="m6 15 3.5-4.5 3 2.5L17 7l3 3" />
      <circle cx="9.5" cy="10.5" r="0.9" />
      <circle cx="12.5" cy="13" r="0.9" />
      <circle cx="17" cy="7" r="0.9" />
    </svg>
  ),

  // Blocks, chained, each carrying the one before it.
  blockchain: (
    <svg {...base}>
      <rect x="2.5" y="9" width="6" height="6" rx="1.6" />
      <rect x="15.5" y="9" width="6" height="6" rx="1.6" />
      <rect x="9" y="2.5" width="6" height="6" rx="1.6" />
      <rect x="9" y="15.5" width="6" height="6" rx="1.6" />
      <path d="M8.5 12h7M12 8.5v7" />
    </svg>
  ),

  // A device on the floor, reporting in.
  iot: (
    <svg {...base}>
      <rect x="7.5" y="10.5" width="9" height="9" rx="2" />
      <path d="M12 14.5v1.5" />
      <path d="M5.5 8.5a9 9 0 0 1 13 0" />
      <path d="M8.3 5.4a13 13 0 0 1 7.4 0" />
    </svg>
  ),

  // Compute that sits at the edge of the network instead of the middle.
  edge: (
    <svg {...base}>
      <rect x="8" y="8" width="8" height="8" rx="2" />
      <path d="M12 8V4.5M12 19.5V16M8 12H4.5M19.5 12H16" />
      <circle cx="12" cy="3.2" r="1.3" />
      <circle cx="12" cy="20.8" r="1.3" />
      <circle cx="3.2" cy="12" r="1.3" />
      <circle cx="20.8" cy="12" r="1.3" />
    </svg>
  ),

  // The real thing and its live model, kept in step.
  digitalTwin: (
    <svg {...base}>
      <path d="M7 3.5 11 6v5l-4 2.5L3 11V6z" />
      <path d="M17 10.5 21 13v5l-4 2.5-4-2.5v-5z" />
      <path d="M11.5 8.2h3.2M12.7 6.8l1.8 1.4-1.8 1.4" />
      <path d="M12.5 15.8H9.3M10.5 17.2l-1.8-1.4 1.8-1.4" />
    </svg>
  ),

  // A deadline that is part of the specification.
  realtime: (
    <svg {...base}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.6 1.6" />
      <path d="M9.6 2.5h4.8" />
      <path d="m19.6 6.4 1.6-1.6" />
    </svg>
  ),

  // Descending to the minimum, then landing on it.
  optimization: (
    <svg {...base}>
      <path d="M3 5c0 8 3 12 6.5 12S16 13 16 5" />
      <path d="M3 20h18" />
      <circle cx="9.5" cy="17" r="1.6" />
      <path d="M19.5 6.5v7" />
      <path d="m17.6 11.6 1.9 1.9 1.9-1.9" />
    </svg>
  ),

  // Measure, compare against setpoint, correct, repeat.
  control: (
    <svg {...base}>
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.8" />
      <path d="M12 3.5v5" />
      <path d="M12 15.5v5" />
      <path d="M4 20.5v-6a1.5 1.5 0 0 1 1.5-1.5H8" />
      <path d="M20 3.5v6a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="m10.2 5.3 1.8-1.8 1.8 1.8" />
      <path d="m14.2 12.7 1.8-1.8-1.8-1.8" />
    </svg>
  ),
};

const ConceptIcon = ({ name, className }) => {
  const icon = ICONS[name];
  if (!icon) return null;
  // The icon is authored once above; cloning here applies the caller's class
  // without every entry having to declare it.
  return <span className={className}>{icon}</span>;
};

export default ConceptIcon;
