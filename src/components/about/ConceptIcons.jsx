// The site's drawn icon vocabulary: the skills that have no vendor logo, the
// fields on the frontier, the engineering practices, and the reading shelves.
// Each icon draws the thing itself — a pub/sub fan-out, a feedback loop, a
// balance for a trade-off — so a list stays legible as engineering rather than
// as a row of identical bullets.
//
// All of them share one grammar with the icons on the brand pages: 24×24,
// `currentColor`, 1.6 stroke, round caps. That is what keeps 37 vendor logos
// and every drawn mark reading as one set.

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
  // One product, many tenants: the window in front is the one a customer
  // sees, and the two receding corners behind it are the other tenants running
  // on the same deployment.
  saas: (
    <svg {...base}>
      <rect x="2.6" y="8.6" width="13" height="12" rx="2.2" />
      <path d="M2.6 12.2h13" />
      <path d="M5.2 10.4h.01" />
      <path d="M7.4 10.4h.01" />
      <path d="M6 6h11.4a2 2 0 0 1 2 2v9.6" strokeDasharray="2.2 1.8" />
      <path d="M9.4 3.4h9a2.6 2.6 0 0 1 2.6 2.6v8.6" strokeDasharray="2.2 1.8" />
    </svg>
  ),
  // Revenue that comes back: a card, and the cycle that charges it again.
  subscription: (
    <svg {...base}>
      <rect x="2" y="3" width="13" height="9" rx="2" />
      <path d="M2 6.2h13" />
      <path d="M4.6 9.2h3.2" />
      <path d="M21.4 17a4.6 4.6 0 1 1-1.5-3.4" />
      <path d="M21.6 12.4V15.6H18.4" />
    </svg>
  ),
  // A sweep and the returns coming back: what is out there before it is
  // everywhere, which is the point of watching at all.
  radar: (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.7" />
      <circle cx="12" cy="12" r="4.4" opacity="0.55" />
      <path d="M12 12 18.2 5.8" />
      <circle cx="15.9" cy="15.6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8.1" cy="8.4" r="1" fill="currentColor" stroke="none" opacity="0.55" />
    </svg>
  ),
  // Jev has no mark in simple-icons — it is four days old — so it gets a
  // drawn one: braces, because the output is a typed value rather than prose,
  // and a bolt, because the whole point is that it arrives at once.
  jev: (
    <svg {...base}>
      <path d="M9.4 3.6C7 3.6 6.8 5.4 6.8 7.6s-.3 3.6-2.2 4.4c1.9.8 2.2 2.2 2.2 4.4s.2 4 2.6 4" />
      <path d="M14.6 3.6c2.4 0 2.6 1.8 2.6 4s.3 3.6 2.2 4.4c-1.9.8-2.2 2.2-2.2 4.4s-.2 4-2.6 4" />
      <path d="M12.9 7.9 10.6 12h2.8l-2.3 4.1" />
    </svg>
  ),
  // A System One model answers all at once instead of a token at a time: one
  // node, three decisions leaving together, each with its own weight.
  systemOne: (
    <svg {...base}>
      <circle cx="5.6" cy="12" r="2.6" />
      <path d="M8.2 12h2.6" />
      <path d="M10.8 12 15 6.4M10.8 12h4.2M10.8 12 15 17.6" />
      <path d="M17.4 5.2v2.4M19.8 4.4v4M17.4 10.8v2.4M19.8 10.4v3.2M17.4 16.4v2.4M19.8 17.2v1.6" />
    </svg>
  ),
  // Thinking for longer at answer time: a clock whose hand has swept most of
  // the way round, and the answer getting better as it goes.
  testTime: (
    <svg {...base}>
      <circle cx="12" cy="13" r="8.4" />
      <path d="M12 8.2V13l3.4 2" />
      <path d="M12 2.4h.01M17.6 4.2l1.4-1.4" />
      <path d="M4.4 19.8h2M8.4 19.8h3.2M13.6 19.8h6" opacity="0.55" />
    </svg>
  ),
  // Opening the model rather than the output: a magnifier over the wiring.
  interpretability: (
    <svg {...base}>
      <circle cx="6" cy="6.4" r="2" />
      <circle cx="6" cy="13.6" r="2" />
      <circle cx="12.6" cy="10" r="2" />
      <path d="M8 7.2l3 2M8 12.8l3-2" />
      <circle cx="16.6" cy="15.6" r="4.2" />
      <path d="m19.7 18.7 1.9 1.9" />
    </svg>
  ),
  // The model on the device instead of in a data centre: a phone with the
  // network cut, still thinking.
  onDevice: (
    <svg {...base}>
      <rect x="6.6" y="2.8" width="10.8" height="18.4" rx="2.4" />
      <path d="M10.6 18.6h2.8" />
      <circle cx="12" cy="10.4" r="3" />
      <path d="M12 7.4V5.6M12 13.4v1.8M9 10.4H7.2M15 10.4h1.8" opacity="0.6" />
      <path d="M2.6 21.4 21.4 2.6" opacity="0.45" />
    </svg>
  ),
  // What you put in the window, and in what order: a frame being packed on
  // purpose rather than filled.
  contextEng: (
    <svg {...base}>
      <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="2.4" />
      <path d="M6.2 9h5.2M6.2 12h7.6M6.2 15h3.6" />
      <path d="M17.4 8.4v7.2M15.4 10.2l2-2 2 2" opacity="0.7" />
    </svg>
  ),
  // A sentence in, a running window out — which is the entire pitch.
  lovable: (
    <svg {...base}>
      <path d="M2.6 6.2h6.2M2.6 9.8h4.2" />
      <path d="M9.6 8 12 8" opacity="0.6" />
      <rect x="12.4" y="3.4" width="9" height="17.2" rx="2.2" />
      <path d="M12.4 7.4h9" />
      <path d="M15 10.8h4M15 13.6h3.2" opacity="0.7" />
      <path d="M2.6 17.4h5.4M2.6 14h3.4" opacity="0.45" />
    </svg>
  ),
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

  // A cart, because a store is a cart before it is anything else.
  ecommerce: (
    <svg {...base}>
      <path d="M2.6 3.4h2.2l2.4 10.4h9.6l2-7.2H6.1" />
      <circle cx="9.4" cy="19" r="1.6" />
      <circle cx="16.6" cy="19" r="1.6" />
    </svg>
  ),

  // A card being taken: the checkout, not the accounting.
  payments: (
    <svg {...base}>
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="2" />
      <path d="M2.6 9.8h18.8" />
      <path d="M6 14.6h3.4" />
      <path d="M16.8 14.6h1.6" />
    </svg>
  ),

  // What people searched for, and what the traffic did next.
  seo: (
    <svg {...base}>
      <circle cx="10.4" cy="10.4" r="6.2" />
      <path d="m15 15 5.4 5.4" />
      <path d="M7.6 12.2v-2M10.4 12.2V8.6M13.2 12.2v-4.6" />
    </svg>
  ),

  // A rack: the machine you rent and then have to run yourself.
  vps: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="6" rx="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" />
      <path d="M6.5 7h.01M9.5 7h.01M6.5 17h.01M9.5 17h.01" />
      <path d="M17.5 7h1.2M17.5 17h1.2" />
    </svg>
  ),

  // A topology, not a cloud: nodes wired through a centre, which is the thing
  // a network diagram is actually about.
  networking: (
    <svg {...base}>
      <circle cx="12" cy="12" r="2.4" />
      <circle cx="12" cy="3.6" r="1.8" />
      <circle cx="12" cy="20.4" r="1.8" />
      <circle cx="3.8" cy="17" r="1.8" />
      <circle cx="20.2" cy="17" r="1.8" />
      <path d="M12 5.4v4.2" />
      <path d="M12 14.4v4.2" />
      <path d="m10.1 13.3-4.6 2.8" />
      <path d="m13.9 13.3 4.6 2.8" />
    </svg>
  ),

  // A name resolving to an address: the globe and the record that points at it.
  dns: (
    <svg {...base}>
      <circle cx="9" cy="9" r="6.2" />
      <path d="M2.9 9h12.2" />
      <path d="M9 2.8c3.2 3.5 3.2 8.9 0 12.4-3.2-3.5-3.2-8.9 0-12.4z" />
      <path d="M13.6 19.2h7.5" />
      <path d="m18.4 16.5 2.7 2.7-2.7 2.7" />
    </svg>
  ),

  // A sweep across ports: some answer, most do not.
  portScan: (
    <svg {...base}>
      <rect x="3" y="8.5" width="18" height="7" rx="1.6" />
      <path d="M7 8.5v7M11 8.5v7M15 8.5v7" />
      <path d="M9 4.6V6.8M13 4.6V6.8" />
      <circle cx="17.8" cy="12" r="1.5" />
    </svg>
  ),

  // A key being worked on until the lock opens.
  passwordCrack: (
    <svg {...base}>
      <circle cx="7.2" cy="14.8" r="3.4" />
      <path d="m9.7 12.4 7.2-7.2" />
      <path d="m14.6 7.5 2 2" />
      <path d="m16.9 5.2 2 2" />
      <path d="M20.6 13.5 18 16.1M18 13.5l2.6 2.6" />
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
  // ---------------------------------------------------------------- frontier
  // Everything below is a field rather than a tool, so there is no vendor mark
  // to borrow and every one of them is drawn. Each draws the mechanism, not a
  // mascot: a qubit on its Bloch sphere, a lattice standing in for the hard
  // problem post-quantum cryptography rests on, weights travelling back to a
  // centre without the data that produced them.

  // A qubit: the Bloch sphere with its state vector, which is the whole point
  // — a position on a sphere rather than one of two poles.
  quantum: (
    <svg {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.4" />
      <path d="M12 12 16.4 6.6" />
      <circle cx="16.4" cy="6.6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),

  // The lattice problem the post-quantum schemes stand on, with the shortest
  // vector marked.
  postQuantum: (
    <svg {...base}>
      <path d="M3 18.5 9 6.5" />
      <path d="M9.5 20 16 5" />
      <path d="M2.5 13.5h18" />
      <path d="M5 8.5h15" />
      <circle cx="7.2" cy="13.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7.2 13.5 14.4 8.5" strokeWidth="2.2" />
    </svg>
  ),

  // A die with a neuron on it: computation shaped like the brain rather than
  // like a bus and a clock.
  neuromorphic: (
    <svg {...base}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2" />
      <circle cx="9.4" cy="10.4" r="1.5" />
      <circle cx="14.8" cy="9.2" r="1.2" />
      <circle cx="13.6" cy="14.6" r="1.2" />
      <path d="m10.8 10 2.8-.6M10.4 11.7l2.6 2.2" />
    </svg>
  ),

  // A frame held in space: the screen stops being the surface and becomes a
  // volume.
  spatial: (
    <svg {...base}>
      <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7z" />
      <path d="M3.5 7 12 11.3 20.5 7" />
      <path d="M12 11.3v9.9" />
    </svg>
  ),

  // A signal read off the head and turned into a line somebody can act on.
  bci: (
    <svg {...base}>
      <path d="M15.5 18.5v2.8" />
      <path d="M8.2 20.4v-3.2a6.8 6.8 0 1 1 9.4-7.9c1.4.4 2.4 1.4 2.4 2.6 0 .8-.7 1.4-1.6 1.4h-1.2v2.2a1.7 1.7 0 0 1-1.7 1.7h-1.7" />
      <path d="M5.5 10.6h1.6l1-2.2 1.4 4 1.1-2.4h1.5" />
    </svg>
  ),

  // Act, observe, get rewarded, act again — the loop that is the method.
  reinforcement: (
    <svg {...base}>
      <rect x="2.5" y="8.5" width="7" height="7" rx="1.8" />
      <rect x="14.5" y="8.5" width="7" height="7" rx="1.8" />
      <path d="M9.5 10.6h5" />
      <path d="m12.8 8.9 1.9 1.7-1.9 1.7" />
      <path d="M14.5 14h-5" />
      <path d="m11.2 12.3-1.9 1.7 1.9 1.7" />
      <path d="M12 2.5v3.4" />
      <path d="m10.3 4.6 1.7-2.1 1.7 2.1" />
    </svg>
  ),

  // An eye reading a grid: the picture arrives as numbers.
  vision: (
    <svg {...base}>
      <path d="M1.8 12s3.8-6.4 10.2-6.4S22.2 12 22.2 12s-3.8 6.4-10.2 6.4S1.8 12 1.8 12z" />
      <circle cx="12" cy="12" r="3.1" />
      <path d="M9.6 9.6h4.8v4.8H9.6z" strokeWidth="1.1" strokeDasharray="1.6 1.4" />
    </svg>
  ),

  // Weights travelling back to the centre; the data never leaves the edge.
  federated: (
    <svg {...base}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4.2" cy="5.4" r="2.2" />
      <circle cx="19.8" cy="5.4" r="2.2" />
      <circle cx="4.2" cy="18.6" r="2.2" />
      <circle cx="19.8" cy="18.6" r="2.2" />
      <path d="m6 6.8 3.6 3M18 6.8l-3.6 3M6 17.2l3.6-3M18 17.2l-3.6-3" strokeDasharray="2.2 1.8" />
    </svg>
  ),

  // A lock that stays shut while the work happens inside it.
  privacyComputing: (
    <svg {...base}>
      <rect x="3.5" y="10" width="17" height="10.5" rx="2.4" />
      <path d="M7.4 10V7.2a4.6 4.6 0 0 1 9.2 0V10" />
      <path d="M9.2 15.2h5.6" />
      <path d="M12 12.6v5.2" />
    </svg>
  ),

  // A property proved over the whole space, not sampled at a few points.
  formalVerification: (
    <svg {...base}>
      <path d="M8 3.5H6.2A1.7 1.7 0 0 0 4.5 5.2v5.1L2.8 12l1.7 1.7v5.1a1.7 1.7 0 0 0 1.7 1.7H8" />
      <path d="M16 3.5h1.8a1.7 1.7 0 0 1 1.7 1.7v5.1L21.2 12l-1.7 1.7v5.1a1.7 1.7 0 0 1-1.7 1.7H16" />
      <path d="m9.2 12.2 2 2 3.6-4.4" />
    </svg>
  ),

  // A part that exists because it was built up in layers, which is a different
  // set of constraints from one that was cut down from a block.
  additive: (
    <svg {...base}>
      <path d="M9 2.8h6v3.4l-1.4 2.2h-3.2L9 6.2z" />
      <path d="M12 8.4v2.2" />
      <path d="M6.5 20.5h11" />
      <path d="M8.2 17.4h7.6" />
      <path d="M9.4 14.3h5.2" />
    </svg>
  ),

  // Many cheap agents, one behaviour that none of them holds on its own.
  swarm: (
    <svg {...base}>
      <circle cx="6" cy="7.4" r="1.7" />
      <circle cx="12" cy="4.6" r="1.7" />
      <circle cx="18" cy="8" r="1.7" />
      <circle cx="8.4" cy="13.6" r="1.7" />
      <circle cx="15.2" cy="14.4" r="1.7" />
      <circle cx="11.4" cy="19.6" r="1.7" />
      <path d="m7.4 8.4 3.2 3.8M13.6 6l3.2 1.2M16.8 9.4l-.6 3.4M10.1 14.6l3.4.4M13.9 15.8l-1.7 2.4M9 15.2l1.6 3" strokeDasharray="2 1.6" />
    </svg>
  ),

  // The arrow that says which way the effect runs, which correlation cannot.
  causal: (
    <svg {...base}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.2 6h9.6" />
      <path d="m14.8 4.4 2 1.6-2 1.6" />
      <path d="M6.2 8 10.6 16" />
      <path d="m8.5 15 2.3 1 .3-2.5" />
      <path d="M17.8 8 13.4 16" strokeDasharray="2 1.8" />
    </svg>
  ),

  // Work measured by what it costs to run, not only by whether it runs.
  greenCompute: (
    <svg {...base}>
      <path d="M13 2.8 6.5 13h4.8l-1.3 8.2L17 10.6h-4.8z" />
      <path d="M3 20.5h4.4" />
      <path d="M16.8 20.5h4.4" />
    </svg>
  ),
  // --------------------------------------------------- practice and reading
  // The engineering-practice list and the reading shelves. These are not
  // technologies, so the rule is the same but the vocabulary is different: a
  // balance for a trade-off, a scale for capacity, a spike on a timeline for
  // a postmortem. Where an existing mark already says the thing — the eye for
  // observability, the descent for optimisation — it is reused rather than
  // redrawn in a second dialect.

  architecture: (
    <svg {...base}>
      <rect x="3" y="3.5" width="7" height="6" rx="1.5" />
      <rect x="14" y="3.5" width="7" height="6" rx="1.5" />
      <rect x="8.5" y="14.5" width="7" height="6" rx="1.5" />
      <path d="M6.5 9.5v2.5h11V9.5" />
      <path d="M12 12v2.5" />
    </svg>
  ),

  // A balance: two options, and the weight you have to accept either way.
  tradeoff: (
    <svg {...base}>
      <path d="M12 4v16" />
      <path d="M7.5 20h9" />
      <path d="M4 8h16" />
      <path d="M4 8 1.8 13a2.6 2.6 0 0 0 4.4 0z" />
      <path d="M20 8l2.2 5a2.6 2.6 0 0 1-4.4 0z" />
    </svg>
  ),

  dataModel: (
    <svg {...base}>
      <rect x="2.5" y="3" width="8" height="6" rx="1.4" />
      <rect x="13.5" y="15" width="8" height="6" rx="1.4" />
      <path d="M6.5 9v5.2a1.8 1.8 0 0 0 1.8 1.8h5.2" />
      <path d="M5 5.4h3.2M5 7h2" />
      <path d="M16 17.4h3.2M16 19h2" />
    </svg>
  ),

  // Same box, more of it, and the headroom you planned for.
  scale: (
    <svg {...base}>
      <rect x="2.5" y="14" width="5" height="6.5" rx="1.2" />
      <rect x="9.5" y="9.5" width="5" height="11" rx="1.2" />
      <rect x="16.5" y="5" width="5" height="15.5" rx="1.2" />
      <path d="M2.5 3.2h6" strokeDasharray="2 1.8" />
    </svg>
  ),

  // Where it breaks, and what it takes down with it.
  risk: (
    <svg {...base}>
      <path d="M12 3.2 21.4 19.4a1.6 1.6 0 0 1-1.4 2.4H4a1.6 1.6 0 0 1-1.4-2.4z" />
      <path d="M12 9.6v4.2" />
      <path d="M12 17.6h.01" />
    </svg>
  ),

  // One path fails, the other carries the traffic.
  resilience: (
    <svg {...base}>
      <circle cx="4" cy="12" r="2.2" />
      <circle cx="20" cy="12" r="2.2" />
      <path d="M6.2 12h11.6" />
      <path d="M6.6 10.4c2.6-4.6 8.2-4.6 10.8 0" strokeDasharray="2.2 1.8" />
      <path d="m10.4 16.4 3.2-3.2M10.4 13.2l3.2 3.2" />
    </svg>
  ),

  // The spike, after the fact, read rather than reacted to.
  postmortem: (
    <svg {...base}>
      <path d="M2.5 15.5h4l2-6 2.6 9 2.2-5.4 1.6 2.4h2" />
      <path d="M2.5 20.5h19" />
      <circle cx="17.6" cy="6.4" r="3.4" />
      <path d="m20.2 9 1.6 1.6" />
    </svg>
  ),

  // A ledger of what was borrowed to ship sooner.
  debt: (
    <svg {...base}>
      <rect x="3" y="3.5" width="18" height="17" rx="2.4" />
      <path d="M7.5 8.5h9" />
      <path d="M7.5 12.5h6" />
      <path d="m14.6 17.4 1.8-1.8 1.8 1.8" />
      <path d="M16.4 15.6v4.4" />
    </svg>
  ),

  // The shield drawn into the plan, not bolted on after it.
  secureDesign: (
    <svg {...base}>
      <path d="M4 5.6 12 2.8l8 2.8v6.1c0 4.6-3.3 8.2-8 9.5-4.7-1.3-8-4.9-8-9.5z" />
      <path d="M9 11.4h6" strokeDasharray="1.8 1.6" />
      <path d="M12 8.4v6" strokeDasharray="1.8 1.6" />
    </svg>
  ),

  // Two arms, one measurement, a decision that follows from it.
  experiment: (
    <svg {...base}>
      <path d="M12 3v4.4" />
      <path d="M12 7.4 6.2 18.6a1.5 1.5 0 0 0 1.3 2.2h9a1.5 1.5 0 0 0 1.3-2.2z" />
      <path d="M8.4 14.6h7.2" />
      <path d="M9.6 3h4.8" />
    </svg>
  ),

  // Request in at one end, value out at the other, everything in between owned.
  endToEnd: (
    <svg {...base}>
      <circle cx="3.6" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="20.4" cy="12" r="1.8" />
      <path d="M5.4 12h4M14.6 12h4" />
      <path d="M12 5.4v4M12 14.6v4" strokeDasharray="2 1.8" />
    </svg>
  ),

  team: (
    <svg {...base}>
      <circle cx="8.4" cy="8" r="3" />
      <circle cx="16.6" cy="9.4" r="2.4" />
      <path d="M2.8 19.6a5.6 5.6 0 0 1 11.2 0" />
      <path d="M15.4 14.6a4.4 4.4 0 0 1 5.8 4.3" />
    </svg>
  ),

  // A fixed-length loop that ends in something shippable.
  scrum: (
    <svg {...base}>
      <path d="M20.6 12a8.6 8.6 0 1 1-2.6-6.1" />
      <path d="M20.8 3.6v4.6h-4.6" />
      <path d="m9 12.4 2.2 2.2 4.2-4.6" />
    </svg>
  ),

  projectPlan: (
    <svg {...base}>
      <path d="M3 4.5h9" />
      <path d="M7 9.5h11" />
      <path d="M5 14.5h8" />
      <path d="M10 19.5h9" />
    </svg>
  ),

  docs: (
    <svg {...base}>
      <path d="M6 2.8h8.6L19 7.2v12.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V4.3A1.5 1.5 0 0 1 6 2.8z" />
      <path d="M14 2.8v4.6h4.6" />
      <path d="M8 12.6h7M8 16.2h5" />
    </svg>
  ),

  // Three different shapes, one table.
  crossFunctional: (
    <svg {...base}>
      <circle cx="6" cy="6.4" r="3" />
      <rect x="14.6" y="3.4" width="6" height="6" rx="1.4" />
      <path d="M12 14.6 15.4 21H8.6z" />
      <path d="M9 7.4h5" strokeDasharray="2 1.6" />
      <path d="M16.6 10.4 13.4 15" strokeDasharray="2 1.6" />
    </svg>
  ),

  // Rough, fast, and enough to answer the question.
  prototype: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="16" rx="2.4" strokeDasharray="3 2.4" />
      <path d="m13.4 8.4-4 4.6h3.4l-1.2 3.6 4.2-4.8h-3.4z" />
    </svg>
  ),

  // The thing being handed over, and the person it lands with.
  mentoring: (
    <svg {...base}>
      <circle cx="5" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="2.6" />
      <path d="M8 12h5.4" />
      <path d="m11.8 9.6 2.4 2.4-2.4 2.4" />
    </svg>
  ),

  // You carry it, including the part that went wrong.
  ownership: (
    <svg {...base}>
      <path d="M12 2.8 20 6.6v5.6c0 4.4-3.2 7.9-8 9-4.8-1.1-8-4.6-8-9V6.6z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  ),

  // Planted where nothing was.
  entrepreneur: (
    <svg {...base}>
      <path d="M6.5 21V3.2" />
      <path d="M6.5 4.4h11.2l-2 3.6 2 3.6H6.5" />
      <circle cx="6.5" cy="21" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),

  // Where it goes, and the fork you chose not to take.
  strategy: (
    <svg {...base}>
      <circle cx="4.4" cy="19.6" r="1.8" />
      <path d="M6 18.4C10 14 8.6 9 14.4 6.4" />
      <path d="M6.6 16.4c3-.4 5-1.6 6-4" strokeDasharray="2 1.8" />
      <circle cx="16.8" cy="5.4" r="2.6" />
      <path d="M19.4 5.4h2.2" />
    </svg>
  ),

  marketing: (
    <svg {...base}>
      <path d="M3.4 9.4v4.6a1.4 1.4 0 0 0 1.4 1.4h2.6l6.8 4.2V4.4L7.4 8.6H4.8a1.4 1.4 0 0 0-1.4 1.4z" />
      <path d="M17.6 8.6c1.4 1.8 1.4 5 0 6.8" />
      <path d="M20.4 6c2.4 3 2.4 9 0 12" />
    </svg>
  ),

  finance: (
    <svg {...base}>
      <path d="M7 4.4v15.2M7 7h.01" />
      <rect x="4.6" y="8.4" width="4.8" height="7.2" rx="1.2" />
      <path d="M17 4.4v15.2" />
      <rect x="14.6" y="6.6" width="4.8" height="10.8" rx="1.2" />
      <path d="M2.5 21h19" />
    </svg>
  ),

  robotics: (
    <svg {...base}>
      <rect x="7.4" y="2.8" width="9.2" height="6" rx="2" />
      <path d="M10.4 5.8h.01M13.6 5.8h.01" />
      <path d="M12 8.8v3.4" />
      <path d="M12 12.2 5 16v5" />
      <path d="M12 12.2 19 16" />
      <path d="M17.4 21v-3.4" />
      <path d="M3 21h4M15.4 21h4" />
    </svg>
  ),

  // Compass and curve: the two halves of how an exact science is done.
  exactSciences: (
    <svg {...base}>
      <path d="M12 3.4v3.2" />
      <circle cx="12" cy="4.4" r="1.6" />
      <path d="m11.2 6.2-5 14.4" />
      <path d="m12.8 6.2 5 14.4" />
      <path d="M8.8 14.6h6.4" />
    </svg>
  ),

  research: (
    <svg {...base}>
      <path d="M6 2.8h7.6L18 7.2v6" />
      <path d="M13 2.8v4.6h4.6" />
      <path d="M6 2.8A1.5 1.5 0 0 0 4.5 4.3v15.4A1.5 1.5 0 0 0 6 21.2h5" />
      <circle cx="16.8" cy="16.8" r="3.4" />
      <path d="m19.4 19.4 2 2" />
    </svg>
  ),

  ethicalHacking: (
    <svg {...base}>
      <path d="M4 5.6 12 2.8l8 2.8v6.1c0 4.6-3.3 8.2-8 9.5-4.7-1.3-8-4.9-8-9.5z" />
      <path d="m9.4 9.6 2.2 2.2-2.2 2.2" />
      <path d="M13.4 14.4h2.6" />
    </svg>
  ),

  // Two gears: the point is not either one, it is that they mesh.
  integration: (
    <svg {...base}>
      <circle cx="8.6" cy="8.6" r="3.2" />
      <path d="M8.6 2.6v1.6M8.6 13v1.6M2.6 8.6h1.6M13 8.6h1.6M4.4 4.4l1.1 1.1M11.7 11.7l1.1 1.1M12.8 4.4l-1.1 1.1M5.5 11.7l-1.1 1.1" />
      <circle cx="16.6" cy="16.6" r="2.6" />
      <path d="M16.6 11.6v1.2M16.6 20.4v1.2M11.6 16.6h1.2M20.4 16.6h1.2" />
    </svg>
  ),

  // Layers, and the edges between them. Drawn rather than borrowed from the
  // machine-learning mark, because the point of the tile is the difference.
  neuralNet: (
    <svg {...base}>
      <circle cx="4.4" cy="6.4" r="1.7" />
      <circle cx="4.4" cy="17.6" r="1.7" />
      <circle cx="12" cy="4.2" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19.8" r="1.7" />
      <circle cx="19.6" cy="9.2" r="1.7" />
      <circle cx="19.6" cy="15.6" r="1.7" />
      <path d="m6 5.6 4.4-1M6 7.4 10.6 11.4M6 16.8l4.4-4M6 18.4l4.4 1" />
      <path d="m13.6 4.8 4.6 3.6M13.6 11.4l4.4-1.6M13.6 12.6l4.4 2.4M13.6 19.2l4.6-2.8" />
    </svg>
  ),

  // ------------------------------------------------------------ the shelves
  // The books take a small vocabulary rather than one mark each: a shelf where
  // six titles share the "agents" mark is telling the reader something true
  // about those six, which thirty bespoke drawings would not.

  // The caret waiting for the instruction.
  prompt: (
    <svg {...base}>
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2.4" />
      <path d="m7 10 2.4 2.4L7 14.8" />
      <path d="M12.4 14.8h4.6" />
    </svg>
  ),

  // The weight a decision carries once a person is on the other side of it.
  ethics: (
    <svg {...base}>
      <circle cx="12" cy="5" r="2.4" />
      <path d="M12 7.4v4.2" />
      <path d="M4.6 11.6h14.8" />
      <path d="M4.6 11.6 2.6 16a2.4 2.4 0 0 0 4 0z" />
      <path d="m19.4 11.6 2 4.4a2.4 2.4 0 0 1-4 0z" />
      <path d="M8.6 21h6.8" />
      <path d="M12 11.6V21" />
    </svg>
  ),

  // The chisel, not the material.
  craft: (
    <svg {...base}>
      <path d="m14.6 3.4 6 6-8.8 8.8-6-6z" />
      <path d="m11.8 18.2-3 3H3.4l2.4-3z" />
      <path d="m12.6 5.4 6 6" />
    </svg>
  ),

  // Same behaviour, different shape.
  refactor: (
    <svg {...base}>
      <rect x="2.6" y="3.4" width="7.4" height="7.4" rx="1.6" />
      <circle cx="17.8" cy="17.2" r="3.8" />
      <path d="M14.2 4.6h5.4v5.4" />
      <path d="M19.6 4.6 14.6 9.6" />
      <path d="M9.6 19.4H4.2V14" />
      <path d="M4.2 19.4 9.2 14.4" />
    </svg>
  ),
  // Nine more fields, and like every other frontier they are drawn: there is
  // no vendor mark for "zero-knowledge proofs".

  // The model opened up: the answer, and the part of it you can point at.
  explainable: (
    <svg {...base}>
      <rect x="2.6" y="5" width="12" height="14" rx="2.2" />
      <path d="M5.6 9.2h6M5.6 12.4h6M5.6 15.6h3.4" />
      <circle cx="17.8" cy="12" r="3.6" />
      <path d="m20.6 14.8 1.4 1.4" />
    </svg>
  ),

  // A neuron wired to a rule: the two halves that spent forty years apart.
  neuroSymbolic: (
    <svg {...base}>
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="6" cy="17" r="2.2" />
      <path d="M8.2 8.2 10.6 12l-2.4 3.8" />
      <rect x="12.6" y="8" width="8.8" height="8" rx="2" />
      <path d="M15.2 11h3.6M15.2 13.4h2" />
    </svg>
  ),

  // A world kept inside the model, and rolled forward to see what happens.
  worldModel: (
    <svg {...base}>
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="2.4" />
      <circle cx="12" cy="12" r="4.2" />
      <path d="M7.8 12h8.4" />
      <path d="M12 7.8c1.7 1.9 1.7 6.5 0 8.4-1.7-1.9-1.7-6.5 0-8.4z" />
    </svg>
  ),

  // Intelligence with a body, and therefore with consequences.
  embodied: (
    <svg {...base}>
      <rect x="7.6" y="3" width="8.8" height="6.4" rx="2" />
      <path d="M10.4 6.2h.01M13.6 6.2h.01" />
      <path d="M12 9.4V13" />
      <path d="M8 21v-4.6a4 4 0 0 1 8 0V21" />
      <path d="M4.4 14.6a8 8 0 0 1 2.2-4.4" strokeDasharray="2 1.8" />
      <path d="M19.6 14.6a8 8 0 0 0-2.2-4.4" strokeDasharray="2 1.8" />
    </svg>
  ),

  // Proof that you know it, handed over without handing it over.
  zeroKnowledge: (
    <svg {...base}>
      <rect x="3.4" y="10.2" width="10.4" height="9.4" rx="2.2" />
      <path d="M6.2 10.2V7.6a3.4 3.4 0 0 1 6.8 0v2.6" />
      <path d="m15.6 14.6 2 2 4-4.6" />
    </svg>
  ),

  // The data stays sealed while the computation happens inside.
  confidential: (
    <svg {...base}>
      <path d="M12 2.6 20 5.6v6.2c0 4.5-3.2 8-8 9.2-4.8-1.2-8-4.7-8-9.2V5.6z" />
      <rect x="8.6" y="9.2" width="6.8" height="6.4" rx="1.4" />
      <path d="M10.4 7.6v1.6M13.6 7.6v1.6M10.4 15.6v1.6M13.6 15.6v1.6" />
    </svg>
  ),

  // Data generated from a seed rather than collected from the world.
  syntheticData: (
    <svg {...base}>
      <ellipse cx="7.6" cy="6" rx="4.8" ry="2.2" />
      <path d="M2.8 6v5.4c0 1.2 2.1 2.2 4.8 2.2s4.8-1 4.8-2.2V6" />
      <ellipse cx="16.4" cy="13.6" rx="4.8" ry="2.2" strokeDasharray="2.4 2" />
      <path d="M11.6 13.6V19c0 1.2 2.1 2.2 4.8 2.2s4.8-1 4.8-2.2v-5.4" strokeDasharray="2.4 2" />
      <path d="m10.6 9.6 3.4 2.4" />
    </svg>
  ),

  // The helix as a dataset, which is what it became.
  bioinformatics: (
    <svg {...base}>
      <path d="M7.4 2.8c0 5.4 9.2 7.2 9.2 12.6 0 3.2-2.4 5.8-4.6 5.8" />
      <path d="M16.6 2.8c0 5.4-9.2 7.2-9.2 12.6 0 3.2 2.4 5.8 4.6 5.8" />
      <path d="M8.6 7h6.8M7.6 11.4h8.8M8.8 16.4h6.4" />
    </svg>
  ),

  // A machine deciding its own next move, and the path it is checking.
  autonomous: (
    <svg {...base}>
      <rect x="3" y="10.6" width="18" height="6.4" rx="2" />
      <circle cx="7.6" cy="19" r="1.8" />
      <circle cx="16.4" cy="19" r="1.8" />
      <path d="M6.6 10.6 8.2 6.8h7.6l1.6 3.8" />
      <path d="M12 2.6v2.2" />
      <path d="M9 3.6c1.8-1.2 4.2-1.2 6 0" strokeDasharray="1.8 1.6" />
    </svg>
  ),
  // ------------------------------------------------------- the 2026 intake

  // A block of text resolving all at once instead of left to right: the rows
  // are half-formed on one side and settled on the other.
  diffusionLm: (
    <svg {...base}>
      <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="2.2" />
      <path d="M6 8.4h4.4" strokeDasharray="1.4 1.3" />
      <path d="M13 8.4h5" />
      <path d="M6 12h3" strokeDasharray="1.4 1.3" />
      <path d="M11.4 12h6.6" />
      <path d="M6 15.6h6" strokeDasharray="1.4 1.3" />
      <path d="M14.6 15.6h3.4" />
    </svg>
  ),

  // A box with walls and something running inside it: the agent gets a room,
  // not the house.
  sandbox: (
    <svg {...base}>
      <rect x="3" y="4.6" width="18" height="14.8" rx="2.4" />
      <path d="M3 8.6h18" />
      <rect x="8.4" y="11.4" width="7.2" height="5.2" rx="1.4" />
      <path d="M10.8 6.6h.01M13.2 6.6h.01" />
    </svg>
  ),

  // Two agents handing work to each other directly, with no human between
  // them — the arrows go both ways for a reason.
  a2a: (
    <svg {...base}>
      <rect x="2.4" y="8" width="7" height="8" rx="2" />
      <rect x="14.6" y="8" width="7" height="8" rx="2" />
      <path d="M10.2 10.6h3.6" />
      <path d="M12.4 9.2l1.6 1.4-1.6 1.4" />
      <path d="M13.8 13.4h-3.6" />
      <path d="M11.6 12l-1.6 1.4 1.6 1.4" />
    </svg>
  ),

  // A padlock with arithmetic happening inside it: the computation never sees
  // the plaintext, which is the whole claim.
  fhe: (
    <svg {...base}>
      <rect x="4" y="10" width="16" height="10.4" rx="2.4" />
      <path d="M7.6 10V7.4a4.4 4.4 0 0 1 8.8 0V10" />
      <path d="M10 15.2h4" />
      <path d="M12 13.2v4" />
    </svg>
  ),

  // One model, many bodies: a brain over an arm, a wheel and a gripper.
  roboticsFm: (
    <svg {...base}>
      <rect x="7.8" y="2.6" width="8.4" height="6" rx="2" />
      <path d="M10.2 5.6h.01M13.8 5.6h.01" />
      <path d="M12 8.6v2.6" />
      <path d="M5.4 11.2h13.2" />
      <path d="M6.6 11.2v3.2l-2 2.6" />
      <path d="M12 11.2v6.2" />
      <path d="M17.4 11.2v3.2l2 2.6" />
      <circle cx="12" cy="19.4" r="2" />
    </svg>
  ),

  // The same shape as a big model, drawn small, running on one box.
  slm: (
    <svg {...base}>
      <rect x="3.4" y="6.6" width="17.2" height="11.6" rx="2.4" />
      <circle cx="9.2" cy="12.4" r="1.5" />
      <circle cx="15.2" cy="9.8" r="1.2" />
      <circle cx="15.2" cy="15" r="1.2" />
      <path d="M10.6 11.6l3.4-1.4M10.6 13.2l3.4 1.4" />
      <path d="M6.6 4.2v2.4M17.4 4.2v2.4" />
    </svg>
  ),

  // Light through a chip instead of electrons: a beam crossing the die and
  // splitting on the far side.
  photonic: (
    <svg {...base}>
      <rect x="6.2" y="6.2" width="11.6" height="11.6" rx="2" />
      <path d="M2.6 12h3.6" />
      <path d="M17.8 9.6h3.6M17.8 12h3.6M17.8 14.4h3.6" />
      <path d="M8.8 12h3.4l2.8-2.4M12.2 12l2.8 2.4" />
      <path d="M9.6 2.6v3.6M14.4 17.8v3.6" />
    </svg>
  ),

  // A model that keeps learning after it ships: the loop closes, and the line
  // going into it never ends.
  continual: (
    <svg {...base}>
      <path d="M20.4 12a8.4 8.4 0 1 1-2.6-6.1" />
      <path d="M18.2 2.6v3.6h-3.6" />
      <path d="M8.6 12.6l2.2 2.2 4.4-4.8" />
      <path d="M2.6 18.4h3.4" strokeDasharray="1.4 1.3" />
    </svg>
  ),

  // A scene reconstructed rather than modelled: a frustum looking at a cloud
  // of points that resolves into a surface.
  neuralRendering: (
    <svg {...base}>
      <path d="M2.8 8.4l5.2-3v13.2l-5.2-3z" />
      <circle cx="12.6" cy="8.6" r="1.1" />
      <circle cx="16.8" cy="11.4" r="1.1" />
      <circle cx="12" cy="14.6" r="1.1" />
      <circle cx="17.6" cy="16.4" r="1.1" />
      <path d="M11.4 9.6l-1.6 3.6M13.7 9.2l2.2 1.6M13 14.2l3-2M13.1 15.2l3.6 1" strokeDasharray="1.2 1.2" />
    </svg>
  ),

  // Retrieval that does not only read: a page, an image and a waveform going
  // into the same index.
  multimodalRag: (
    <svg {...base}>
      <path d="M3 5.4h5.2v5.2H3z" />
      <path d="M3 13.4h5.2v5.2H3z" />
      <path d="M4.2 15.6l1.2 1.2M4.2 7.2h2.8M4.2 8.8h2" />
      <path d="M8.2 8v3.4h3.6M8.2 16v-3.4h3.6" />
      <circle cx="16.6" cy="12" r="4.4" />
      <path d="M19.9 15l1.5 1.6" />
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
