// One drawn mark per line of the engineering-practice lists.
//
// Index-aligned with the `cv.practice.*Items` arrays in the dictionary rather
// than keyed by the text: the strings are translated and the keys would have
// to be too, which is a second list to keep in step for no gain. The
// dictionary test already enforces that both languages carry arrays of the
// same length, and PRACTICE_ICONS is checked against them in development —
// see the guard in PracticeExplorer.jsx.
//
// Every name resolves to an icon in ConceptIcons.jsx. The security marks are
// the same ones the stack uses for the tools that do the work: a padlock for
// security by design, a network for infrastructure, a keyhole for auth, a mask
// for secrets, a crate for packages, a shield for guardrails. Reusing them is
// the point — the mark says what the line is before the words are read.
const PRACTICE_ICONS = {
  systems: [
    'architecture', // System design and architecture thinking
    'tradeoff', // Technical decision-making and trade-off analysis
    'dataModel', // Data modeling and consistency trade-offs
    'scale', // Scalability and capacity planning
    'saas', // Multi-tenant SaaS architecture
    'microservices', // Service design and API contracts
    'eventDriven', // Asynchronous messaging, queues and backpressure
    'risk', // Failure mode and risk analysis
    'resilience', // Reliability and fault tolerance
    'postmortem', // Incident analysis and postmortems
    'debt', // Technical debt management
    'observability', // Observability and production monitoring
    'experiment', // Metrics-driven and experimentation-based engineering
    'optimization', // Performance analysis and optimisation
    'endToEnd', // End-to-end solution design
  ],
  ai: [
    'ml', // LLM application engineering
    'rag', // RAG and knowledge retrieval
    'agents', // Agent and tool orchestration
    'multiAgent', // Multi-agent systems and coordination
    'prompt', // Prompt engineering
    'contextEng', // Context, memory and tools
    'testTime', // Model and response evaluation
    'finops', // AI cost, latency and observability
    'moe', // Model selection and routing
    'slm', // Model adaptation and fine-tuning
    'alignment', // Guardrails and AI safety
    'langgraph', // Agents in production: deployment and supervision
  ],
  security: [
    'secureDesign', // Security by design
    'cloudSecurity', // Infrastructure and cloud security
    'oauth', // Authentication and authorisation
    'confidential', // Secrets and credential management
    'sandbox', // Dependency and supply chain security
    'ethicalHacking', // Penetration testing and ethical hacking
    'privacyComputing', // Privacy and data protection
    'portScan', // Attack surface analysis
    'postQuantum', // Applied cryptography
  ],
  delivery: [
    'team', // Teamwork
    'scrum', // SCRUM methodology
    'kan', // Kanban and workflow management
    'projectPlan', // Project management
    'cicd', // CI/CD and delivery automation
    'docs', // Software documentation
    'crossFunctional', // Cross-functional teams
    'prototype', // Rapid prototyping and PoCs
    'mentoring', // Mentoring and training
    'ownership', // Ownership mindset
  ],
  product: [
    'entrepreneur', // Entrepreneurial mindset
    'strategy', // Product and tech strategy
    'subscription', // SaaS products: subscriptions, metering and unit economics
    'ecommerce', // Pricing and monetisation models
    'marketing', // Digital marketing vision and sales strategy
    'radar', // User and market research
    'timeSeries', // Product metrics and cohorts
    'payments', // Fintech and payments
    'finance', // Finance and investing
  ],
  breadth: [
    'robotics', // Robotics and advanced manufacturing
    'networking', // Computing and networks
    'iot', // Electronics, hardware and IoT
    'exactSciences', // Exact sciences
    'research', // Scientific and literary research
    'integration', // Basic mechanics and software integrations
    'ethics', // Ethics applied to technology
  ],
};

export default PRACTICE_ICONS;
