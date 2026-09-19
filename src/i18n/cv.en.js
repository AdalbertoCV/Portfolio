// English mirror of cv.es.js. Same key shape, same array lengths — the
// dictionary test walks both and fails on any key present in one and not the
// other, array indices included.

const cvEn = {
  cv: {
    badge: 'Building',
    // The line under the name. "Full-Stack Software Engineer" is the title
    // two hundred thousand people share; this one is the one thing about the
    // page that nobody else can write.
    role: 'Founding Software Engineer · Founder of two companies',
    claim:
      'I build the backend, the cloud workers and the AI agents behind Radii Manufacturing’s platform — the software that turns a CAD file into a quoted, manufactured, traceable part. Alongside it I am building Moonphase and StackSelect.',
    location: 'Zacatecas, Mexico',
    availability: 'Open to collaborate',
    standing: 'Backend · Cloud · AI systems',
    contactLabel: 'Contact',

    profileTitle: 'What I do',
    profileKicker: 'Who I am',
    profileBody: 'Full-stack software engineer building backend services, cloud infrastructure and AI systems. At Radii Manufacturing I design the services behind core manufacturing workflows, build cloud workers on AWS and Azure, develop AI agents with LangGraph and LangChain, and maintain the CI/CD pipelines and observability of a microservices platform. I migrated the platform’s entire infrastructure in two weeks and built its automatic quoting engine — a mathematical pricing algorithm that took an account manager’s average quoting time from five days to one.',
    profileBody2: 'I work across Python, Java, JavaScript, TypeScript, C#, Go and PHP, with Django, Spring Boot, Laravel and React. My technical focus areas are distributed systems, event-driven architecture, LLM systems and RAG, and platform engineering. My professional approach combines the rigorous adoption of emerging technology with engineering, design and business criteria, directed at systems that remain sustainable over time.',

    nowKicker: 'Right now',
    // No count in the heading: it used to say "four", the grid renders three
    // cards, and the first claim on the page that the page itself contradicts
    // is an expensive one. Naming them says more than counting them anyway.
    nowTitle: 'Radii, two companies of my own, and independent clients',
    now: {
      radii: {
        label: 'Founding Software Engineer',
        org: 'Radii Manufacturing',
        body: 'AI-powered manufacturing platform. Backend services, cloud workers, agents and platform. Automatic quoting; what goes to review, down from five days to one. 80% of operations automated.',
        cta: 'Read the story',
      },
      ventures: {
        label: 'CEO · CTO',
        org: 'Moonphase and StackSelect',
        body: 'Two companies of my own: automation and R&D in one, training and talent placement in the other.',
        cta: 'See Ventures',
      },
      contract: {
        label: 'Software Engineer',
        org: 'Evodeps and my own clients',
        body: 'Custom development, prototypes and technology implementations inside cross-functional teams.',
        cta: 'See track record',
      },
    },

    skillsKicker: 'Stack',
    skillsTitle: 'What I build with',
    skillsLede: 'Selected according to the problem rather than to familiarity. The list runs from daily use through to areas under exploration; pick the part of it you came for.',
    skillsReceipt: 'projects with',
    skillsExpandAll: 'Open every group',
    skillsCollapseAll: 'Close every group',

    log: {
      label: 'Log',
      title: 'Decisions that shaped the way I work',
      body: 'Everything above is a claim about judgement. This is the judgement: what was on the table, what I took, why, and what it ended up costing.',
      cta: 'Read the log',
    },
    practiceKicker: 'Engineering practice',
    practiceTitle: 'How I work, not just what with',
    practiceLede: 'A stack can be learned; the judgement behind these decisions is what determines whether a system holds in production.',
    principlesLabel: 'Where it starts',
    principles: {
      aiFirst: {
        title: 'AI-first',
        body: 'Not bolting AI onto something it happens to fit: designing on the assumption that an agent can take the work, and deciding deliberately which part stays with a person and why. At Radii that is not a pilot — 80% of the operations team\'s recurring work is done by agents in production today.',
      },
      innovation: {
        title: 'Constant technology innovation',
        body: 'A daily updating routine, and a proof of concept scoped to the specific risk before committing to any decision. I judge a technology by its actual maturity — API stability, its record of breaking changes, who answers when something fails — rather than by the size of its announcement.',
      },
    },

    practice: {
      systems: 'Systems design and architecture',
      systemsItems: [
        'System design and architecture thinking',
        'Technical decision-making and trade-off analysis',
        'Data modeling and consistency trade-offs',
        'Scalability and capacity planning',
        'Multi-tenant SaaS architecture',
        'Failure mode and risk analysis',
        'Reliability and fault tolerance',
        'Incident analysis and postmortems',
        'Technical debt management',
        'Observability and production monitoring',
        'Security by design',
        'Metrics-driven and experimentation-based engineering',
        'Performance analysis and optimisation',
        'End-to-end solution design',
      ],
      delivery: 'Delivery and team',
      deliveryItems: [
        'Teamwork',
        'SCRUM methodology',
        'Project management',
        'Software documentation',
        'Cross-functional teams',
        'Rapid prototyping and PoCs',
        'Mentoring and training',
        'Ownership mindset',
      ],
      breadth: 'Multidisciplinary background',
      breadthItems: [
        'Entrepreneurial mindset',
        'Product and tech strategy',
        'SaaS products: subscriptions, usage metering and unit economics',
        'Digital marketing vision and sales strategy',
        'Fintech and investments knowledge',
        'Robotics and advanced manufacturing',
        'Networking and hardware fundamentals',
        'Exact sciences: mathematics, physics, chemistry, statistics',
        'Scientific and literary research',
        'Cybersecurity and ethical hacking',
        'Basic mechanics and software integrations',
      ],
    },

    educationKicker: 'Education',
    languagesKicker: 'Languages',
    languages: {
      spanish: { name: 'Spanish', level: 'Native' },
      english: {
        name: 'English',
        level: 'C1 — Advanced',
        note: 'Official TOEFL, sat at the UAZ PUDI (Programa Único de Inglés), 2024.',
      },
    },

    peul: {
      name: 'Programa de Extensión Universitario de Lenguas',
      meta: 'PEUL · Autonomous University of Zacatecas · 2018 — 2020',
      body: 'An English programme at the UAZ language centre, finished the same year I started the engineering degree. It is why technical documentation, papers and working in English were never an obstacle but the default mode.',
    },

    referencesKicker: 'References',
    referencesTitle: 'People I have built with',
    referencesLede:
      'People who have worked with me. They are here with their own links rather than with a sentence I wrote for them: whatever they have to say about my work, they can say it themselves.',
    referencesSite: 'Portfolio',
    references: {
      cesar: 'CTO at',
      viky: 'Software engineer at',
      elliot: 'Systems lead at',
      esmeralda: 'UX/UI designer at',
      rafael: 'Project manager at',
    },

    readingKicker: 'Reading',
    readingTitle: 'Recommended reading',
    readingLede:
      'The books I hand to somebody who asks where to start, and the ones I go back to.',
    readingGroups: {
      ai: 'AI and LLMs',
      craft: 'Engineering craft',
      leadership: 'Leadership and teams',
    },

    certsKicker: 'Certifications',
    certsTitle: 'Certifications and achievements',
    certs: {
      icp: {
        name: 'Web 3.0 — Internet Computer',
        issuer: 'ICP Hub Latam',
        year: '2023',
        body: 'The ICP Developer program run by the ICP Hub Latam community, taken from 11 to 18 September 2023: developer training on the Internet Computer protocol, the network where applications run on-chain instead of leaning on a conventional server.',
      },
      langchain: {
        name: 'AI Agents with LangChain',
        issuer: 'Platzi',
        year: '2025',
        body: 'Training on building agents with LangChain: tools, memory, and the orchestration that turns a language model from something that answers into something that acts. It is the same ground the agent work at Radii stands on, where those ideas run in production under LangGraph.',
      },
      santander: {
        name: 'Emerging Technologies',
        issuer: 'Santander',
        year: '2024',
        body: 'A survey of the technologies reshaping industry — artificial intelligence, data, cloud and distributed systems among them — framed by what each one changes for a business rather than by how it is implemented. It is the one credential on this list that is about the criteria for adopting a technology rather than about building with it.',
      },
      somece: {
        name: 'SOMECE International Congress',
        issuer: 'SOMECE',
        year: '2024',
        body: 'An international congress on the application of technology and artificial intelligence to education. I presented the paper “Evaluación de aplicaciones de software para fomentar la participación parental en la educación” there, published as part of that year’s congress proceedings.',
        link: 'Read the published paper',
      },
    },
    educationCta: 'See the degree in full',
    certsProofLabel: 'Credentials',
    certsProofHint: 'Tap a credential to enlarge it',

    eventsLabel: 'Events',
    events: {
      rbr: {
        name: 'Release Before Ready',
        issuer: 'Querétaro',
        year: 'August 2026',
        body: 'A hackathon series presented by 500 Global and Descubre.vc, run over a single day: build something and show it in public before it is finished, which is what gives the event its name. What I took there was a full Azure-to-AWS migration — moving the infrastructure from one cloud to the other inside that one day, between configuration, refactoring and migration. The hard part was not the move itself but the vision models: working out what actually changes when they go from Azure AI Foundry to AWS Bedrock. I finished the day with three services of the architecture migrated.',
        body2: 'The same day ran a parallel one-hour challenge, no winner and purely for the fun of it: composing music as code in Strudel. Nocturno 108 came out of it — the track with its own player, a production pad and instruments, and the avatar synced to the beat.',
        link: 'View the event',
        projectLink: 'View it in projects',
      },
      innovafest: {
        name: 'InnovaFest 2026',
        issuer: 'Querétaro Convention Centre',
        year: 'August 2026',
        body: 'The national innovation and entrepreneurship meeting: investment funds, prototypes, talks, and matchmaking between companies, universities and projects. This time I was not in the audience. I was on the other side of the stand, representing Radii and explaining the platform I build in person — what it solves, how it works, and why a manufactured part can be traced back to the CAD file it came from.',
        link: 'View the event',
      },
      talentland: {
        name: 'Talent Land 2024',
        issuer: 'Guadalajara, Jalisco',
        year: '2024',
        body: 'The largest talent and technology gathering in Mexico: founders, entrepreneurs and people who have already built something presenting their projects to thousands of young people, with the explicit aim of pushing them to build their own. I went as a student, which is exactly who it is for. Two years later I was back at an event like it, on the other side of the stand.',
        link: 'View the event',
      },
    },

    interestsKicker: 'Interests',
    interestsTitle: 'Where the way I think comes from',
    interestsLede: 'Each develops a capability that carries over into the technical work, and several of them bear directly on what I build and on what basis.',
    interests: {
      innovation: {
        title: 'Constant innovation and foresight',
        body: 'I maintain a daily research routine: documentaries, podcasts, scientific and business publications, and systematic tracking of emerging technology. The purpose is to identify which capabilities become viable before they are widely adopted, and to ground technology decisions in verifiable judgement rather than in trend.',
        body2: 'That tracking is only worth anything if it ends in a criterion for adoption. I judge a technology by its actual maturity — API stability, its record of breaking changes, the quality of the documentation, the size of the ecosystem, and who answers when something fails — rather than by the size of its announcement. Before committing to a decision I build a proof of concept scoped to the specific risk I want to measure, because adopting too early is paid for in maintenance and too late in platform debt. Foresight serves the same practical end: anticipating which of today\'s constraints — compute cost, latency, model size, regulation — stops being one within a project\'s horizon, and which architectural decisions are worth keeping reversible until then.',
        tags: [
          'Documentaries',
          'Podcasts',
          'Scientific reading',
          'Business reading',
          'Emerging technology',
          'Technology foresight',
        ],
      },
      business: {
        title: 'Business, startups and capital',
        body: 'Running two companies of my own requires understanding the dimension that is not technical: how the work gets funded, what separates a viable business from a well-built system, and where the correct decision does not follow from engineering criteria. I follow venture capital, fundraising processes, and how companies are structured to outlast their first product.',
        body2: 'The same interest runs through e-commerce and through markets. On the commerce side it is the operating detail of a store that has to sell: catalogue, checkout, payments, conversion and the numbers that say whether any of it worked. On the market side it is crypto, digital assets and investing — asset classes, risk, custody and the infrastructure underneath them, which is the point where the financial reading and the engineering one stop being separate subjects.',
        tags: [
          'Startups',
          'Fundraising',
          'Venture capital',
          'Product strategy',
          'Business models',
          'Fintech and investing',
          'E-commerce',
          'Cryptocurrency',
          'Digital assets',
          'Markets and investing',
        ],
      },
      security: {
        title: 'Cybersecurity and offensive security',
        body: 'I study systems from the attacking side as well, because it is the only way to know how well built the thing you are defending actually is. I work in controlled labs through the stages that make up an intrusion test: reconnaissance and network scanning, traffic analysis, reviewing web applications against the known classes of failure, and checking how much a credential is really worth.',
        body2: 'What interests me is not the tool but the judgement it leaves behind: an architecture reads differently once you have seen where it breaks. Attack surface, secret handling, trust boundaries between services, and what stays exposed when one component gives way are design decisions, not a layer added at the end.',
        tags: [
          'Pentesting',
          'Offensive security',
          'Network traffic analysis',
          'Web security and OWASP',
          'Reconnaissance and scanning',
          'Hardening',
          'Applied cryptography',
          'Threat modelling',
        ],
      },
      science: {
        title: 'Automation, science and physical frontiers',
        body: 'I analyse the processes I encounter in terms of automation: which parts are systematisable, and what technology would be required to remove manual intervention. The same criterion extends past software into robotics, mechatronics and hardware, where code has to produce a verifiable physical effect. I also follow nanotechnology, quantum computing, aeronautics and astronomy, fields where engineering operates against real physical limits.',
        body2: 'What sustains that interest is a change in the nature of the problem: software that operates on matter does not allow for deferred correction. An embedded or control system works under real-time constraints, fault tolerance and pre-deployment verification, because patching in production is not an option — the same demand imposed by an instrument in orbit or a flight system. At the opposite end, quantum computing and nanotechnology rebuild the abstraction layers I work on today: a computational model with its own error regime and its own class of algorithms, and a scale at which material stops behaving as classical engineering describes it. I follow both fronts because they determine what will be buildable over the next decade, and with which tools.',
        tags: [
          'Process automation',
          'Robotics',
          'Mechatronics',
          'Hardware and electronics',
          'Embedded systems',
          'Control and real time',
          'Autonomous systems',
          'Nanotechnology',
          'Quantum computing',
          'Quantum algorithms',
          'Aeronautics and space',
          'Astronomy',
        ],
      },
      learning: {
        title: 'Cognition, learning and teaching',
        body: 'I am interested in how something difficult is actually learned, and in why most technical material fails to explain it. I follow the work on memory, attention and cognitive load, and test it against my own study method: retrieval practice instead of rereading, spaced review, and real projects as the criterion for whether a concept was understood rather than merely recognised. Educational technology is where that interest turns into formal research — it is the subject of the paper I presented at the SOMECE International Congress in 2024.',
        body2: 'The other half is transmission. I run a company dedicated to training and placing technical talent, I mentor, and I document what I build; in all three the problem is the same: ordering a subject for someone who does not yet have the mental model you already read it with. That forces a separation between what is essential and what is incidental, naming things for what they do, and showing the path of decisions rather than only the result. The effect on engineering is direct: an API, an error message and an architecture document are problems of cognitive load before they are problems of style, and they are designed the way an explanation is — around what the reader has to hold in their head to use them well.',
        tags: [
          'Cognitive science',
          'Learning and memory',
          'Spaced repetition',
          'Cognitive load',
          'Educational technology',
          'Mentoring and training',
          'Knowledge management',
          'Technical writing',
        ],
      },
      arts: {
        title: 'Art, in all its forms',
        body: 'Artistic training holds a place equivalent to the technical one in how I work. I follow music, literature, cinema, theatre, fashion, drawing and animation with the same rigour. In practice I write novels and songs, and develop musical projects of my own. That discipline builds command of structure, rhythm and aesthetic judgement — competencies that apply directly to interface and product design.',
        link: 'Listen to the musical projects',
        body2: 'Video games and immersive media hold my attention in particular: they are the one discipline where narrative, musical composition, visual art and software architecture resolve into a single artefact, and where the aesthetic decision is indistinguishable from the technical one. I study game systems design, graphics engines and real-time 3D work, alongside virtual and augmented reality as the formats redefining the relationship between interface, space and user.',
        tags: [
          'Music',
          'Literature',
          'Novel writing',
          'Composition',
          'Digital drawing',
          'Animation',
          'Video games',
          'Game systems design',
          'Graphics engines and 3D',
          'Virtual and augmented reality',
          'Immersive media',
          'Cinema',
          'Theatre',
          'Fashion',
        ],
      },
      sports: {
        title: 'Sport and physical discipline',
        body: 'I keep a consistent training routine. Team sports interest me for the coordination and situational reading they demand, and disciplines such as parkour, BMX and skate for the relationship they establish between calculated risk and precise execution. That practice is the source of consistency, resilience, and the view that sustained performance outweighs an isolated peak.',
        body2: 'Training also works as a model for the work itself: progressive load, measurement against concrete variables, and planned recovery, with the evidence that effort without rest degrades the result rather than improving it. It is the same logic behind sustaining a long delivery pace instead of relying on heroic sprints. The risk disciplines supply the other half: in parkour or BMX the jump is assessed before it is attempted, trained in parts, and kept with a way out if the move does not land — the exact equivalent of bounding the blast radius of a change, rolling it out in stages, and having a reversion plan before touching production.',
        tags: [
          'Strength training',
          'Team sports',
          'Parkour',
          'BMX',
          'Skate',
          'Extreme sports',
          'Consistency and resilience',
        ],
      },
      culture: {
        title: 'Food, travel and other cultures',
        body: 'Travel and food serve as a route into other cultures. The real interest is in observing how populations with different contexts solve equivalent problems, arriving at solutions that would not emerge from a single frame of reference. It is the same exercise I apply when entering an unfamiliar technical domain, and for that reason it complements the work rather than competing with it.',
        body2: 'In professional practice this shows up in two places. The first is requirements gathering: understanding someone else\'s domain means observing how the people who operate it actually work, rather than imposing the mental model you arrived with — the difference between a system that gets adopted and one that sits unused. The second is building product for more than one market: language, date and currency formats, local regulation, payment methods and usage expectations are not a cosmetic pass at the end of a project; they are data-model and architecture decisions, made early or paid for later.',
        tags: [
          'World cultures',
          'Gastronomy',
          'Travel',
          'Cross-cultural learning',
          'History and society',
        ],
      },
    },
  },
};

export default cvEn;
