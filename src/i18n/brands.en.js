// English mirror of brands.es.js. Same key shape — the dictionary test walks
// both and fails on any key present in one and missing in the other.

const brandsEn = {
  timeline: {
    badge: 'Track record',
    title: 'Five fronts, one standard',
    lede: 'Five fronts carrying responsibility for the outcome: an AI-powered manufacturing platform, a custom development house, an independent client portfolio, the public laboratory where my professional training began, and two years of peer mentoring on the subjects the degree is built on.',
    featuredLabel: 'Current focus',
    present: 'Present',
    readStory: 'Read the full story',
    visitSite: 'Visit site',
    yearsLabel: 'years building',
    venturesTitle: 'And two companies of my own',
    venturesLede: 'Beyond development, the responsibility extends to defining what gets built, on what basis, and for which market.',
    venturesCta: 'See Ventures',
  },

  ventures: {
    badge: 'Ventures',
    title: 'Two companies, two roles',
    lede: 'In one I run the technology; in the other, the company. Both proceed from the same diagnosis: talent and ideas are lost for want of a structure to receive and execute them.',
    roleCto: 'CTO & Co-founder',
    roleCeo: 'CEO & Founder',
    enter: 'Enter',
    siteSoon: 'Website in build — January 2027',
    statusBuilding: 'Building',
    stackselectPitch: 'Bootcamps and a technical assessment platform directed at placing developers with no prior experience into employment.',
    moonphasePitch: 'Building the future of technology: real automation and R&D on what nobody has solved, with method and a written record.',
    projectsTitle: 'Want to see more of my work?',
    projectsLede: 'Explore my projects: the full catalogue of what I have built, from APIs and data pipelines to interfaces and a jazz-hop track composed as code.',
    projectsCta: 'Explore projects',
  },

  // ------------------------------------------------------ Operating plan
  // Public on purpose, and narrative on purpose: stages, focus and exit
  // criteria, but no amounts and no client names beyond what the site
  // already tells. The structure (order, current stage, states) is in
  // components/ventures/plan.js.
  plan: {
    badge: 'Ventures · Operating plan',
    title: 'From promise to plan',
    lede: 'January 2027 is when both companies start formal operations. This page is how we get there and what comes after, in four stages. Each stage has a target date, but we leave it when we meet its criteria, not when the date arrives.',
    here: 'We are here',
    tabsLabel: 'Plan stages',
    focusTitle: 'Where our focus goes now',
    exitTitle: 'Exit criteria',
    exitOpen: 'No exit criterion: this stage is the horizon.',
    back: 'Back to Ventures',
    chipLabel: 'Current stage',
    chipCta: 'See the plan',
    hubCta: 'See the operating plan',
    states: { done: 'Done', active: 'In progress', pending: 'Pending' },
    dims: {
      focus: 'Focus',
      model: 'Business model',
      clients: 'Client base',
      funding: 'Funding',
    },
    names: {
      freelanceMoonphase: 'Freelance → Moonphase',
      moonphase: 'Moonphase',
      stackselect: 'StackSelect',
    },
    stages: {
      incubate: {
        name: 'Incubate',
        window: 'Jan 2025 — Dec 2026',
        tagline: 'Prove the method holds before asking anyone to bet on it.',
        now: {
          constitute: 'Incorporate both companies before January 2027.',
          records: 'Turn every delivered project into a Moonphase record.',
          placements: 'Close StackSelect’s first placements and, with them, its pricing model.',
        },
      },
      stabilize: {
        name: 'Stabilize',
        window: '2027',
        tagline: 'Formal operations that pay for themselves.',
      },
      scale: {
        name: 'Scale',
        window: '2028 — 2029',
        tagline: 'Grow without being the bottleneck.',
      },
      exploit: {
        name: 'Exploit',
        window: '2030 onwards',
        tagline: 'Turn what was built into assets.',
      },
    },
    moonphase: {
      incubate: {
        focus: 'Deliver automation projects with the Moonphase method —feasibility, scope, build, record— to show it holds outside theory.',
        model: 'Fixed-scope, fixed-price projects, quoted against a measurable deliverable.',
        clients: 'The client base the independent practice already built, starting with PuntoBienestar. Won by referral and by delivery, not by advertising.',
        funding: 'Self-funded from the projects’ own revenue.',
        exit: {
          legal: 'Moonphase legally incorporated.',
          records: 'Delivered projects rewritten as Moonphase records: what was built, what was measured, what failed.',
          portfolio: 'The freelance client base moved to Moonphase as its starting portfolio.',
        },
      },
      stabilize: {
        focus: 'Lane 1, applied automation, covers operations, and the first lane 2 records, R&D, are opened.',
        model: 'Fixed-scope projects plus maintenance and support contracts on what was delivered, which make part of the revenue recurring.',
        clients: 'From referral to channel: published cases, the company’s own site from January 2027, and specific niches where the method has already proven itself.',
        funding: 'Lane 1 funds lane 2. Public science, technology and innovation funds for the first R&D projects.',
        exit: {
          recurring: 'Recurring revenue covers operations.',
          firstRd: 'The first lane 2 record closed, with a positive or negative result.',
        },
      },
      scale: {
        focus: 'First technical hires, and the method written down so another engineer runs it the same way.',
        model: 'Projects plus a support portfolio, and the first reusable lane 1 components sold as product.',
        clients: 'Industries and niches with more than one solved case, where the next client looks like the last one.',
        funding: 'Angel or pre-seed round, raised once there are metrics to back it.',
        exit: {
          handsOff: 'A project delivered end to end without the founder directly involved.',
          round: 'A round raised on real metrics, not on the promise.',
        },
      },
      exploit: {
        focus: 'The R&D records that worked become products or spin-offs.',
        model: 'Product and licensing on our own research, alongside the services business.',
        clients: 'Product customers, not only project clients.',
        funding: 'Seed or Series A depending on traction, or growth on our own capital.',
      },
    },
    stackselect: {
      incubate: {
        focus: 'Run the first training and assessment cohorts, under way since June 2026, and check that the method produces candidates who get hired.',
        model: 'Validate who pays and why: the candidate, the hiring company, or both. The working hypothesis is that the company pays, per placement.',
        clients: 'The first companies willing to interview candidates from the early cohorts.',
        funding: 'Self-funded.',
        exit: {
          legal: 'StackSelect legally incorporated.',
          placements: 'First real placements, documented end to end.',
          pricing: 'Pricing validated with at least one paying company.',
        },
      },
      stabilize: {
        focus: 'Formal operations: regular cohorts, with the placement as the unit that is measured.',
        model: 'The hiring company pays a fee per placement. The cost to the candidate stays minimal or zero, because they are the people who do not yet have an income.',
        clients: 'Partner companies that hire repeatedly, not once.',
        funding: 'Placement revenue, and public youth-employment and industry-linkage funds.',
        exit: {
          rate: 'A placement rate documented and sustained across several cohorts.',
          repeat: 'Companies that hire again.',
        },
      },
      scale: {
        focus: 'Our own instructors and assessors, and the assessment platform as a standalone product.',
        model: 'Assessment as a service is added: companies pay to assess their own candidates with StackSelect’s criteria.',
        clients: 'Companies that use the platform even when they do not hire by placement.',
        funding: 'Angel or pre-seed round on placement traction.',
        exit: {
          handsOff: 'Cohorts that run without the founders teaching or assessing.',
          platform: 'The platform with its own customers.',
        },
      },
      exploit: {
        focus: 'Regional expansion and new talent verticals.',
        model: 'Placement and platform in more markets.',
        clients: 'Companies outside the home region.',
        funding: 'Seed or Series A depending on traction.',
      },
    },
  },

  // ------------------------------------------------------------------ UAZ
  uaz: {
    badge: 'Education',
    heroTitle: 'Software Engineering',
    tagline: 'Nine semesters, 310 credits, and the degree that gave me judgement.',
    heroLede: 'I did not study programming: I studied software engineering, which is a different thing. The programme is built on the premise that writing code is the easy part, and that the hard part — working out what has to be built, deciding how, and holding the quality of what was built — can be taught too. That distinction is the one I still use every day.',
    period: '2020 — 2024',

    statsTitle: 'The plan, in numbers',
    stats: {
      semesters: { value: '9', label: 'Semesters' },
      subjects: { value: '42', label: 'Subjects' },
      labs: { value: '8', label: 'Laboratories' },
      credits: { value: '310', label: 'Total credits' },
    },

    kickers: {
      program: 'The programme',
      plan: 'The curriculum',
      teaching: 'The faculty',
    },

    programTitle: 'A degree the state needed to exist',
    programBody: 'The UAZ software engineering programme was not created as a variant of computer engineering. It was designed after a study of the state of the software development industry and presented to the people of Zacatecas on 3 December 2009, with the explicit purpose of training the professionals that industry needed in the state. Construction of the building that now houses software and computer engineering began in 2010, at Ciudad Universitaria Siglo XXI.',
    programBody2: 'That origin shows in the plan. It is not a computing core with a few software courses on top: software engineering is the spine, and everything else — mathematics, programming, databases — is there to hold it up. It is why I came out able to elicit requirements and argue an architecture, rather than only to write a program that compiles.',
    programNote: 'The programme details and its founding date come from the degree’s own official site.',

    planTitle: 'Five chains running in parallel',
    planLede: 'The curriculum reads in columns — nine semesters — but it is understood in rows: chains of subjects where each is the prerequisite for the next. These are the five that hold it up, with their actual courses.',
    chains: {
      maths: {
        title: 'Mathematics',
        body: 'The first semesters are mathematics before they are code, and rightly so. Linear algebra and discrete maths are what later surface in a graph algorithm or a data transformation; probability and statistics is what lets you read a model instead of believing it. None of it feels useful while you are taking it, and all of it turns up years later.',
      },
      programming: {
        title: 'Programming and algorithms',
        body: 'The chain that runs from logic to algorithm analysis, with a laboratory at nearly every rung. What mattered was not learning syntax but learning to reason about cost: why this data structure and not that one, and what that decision charges you once the volume grows. I took that part outside the classroom too: I competed in several ICPC contests during the degree, which is the same reasoning against a clock, with no room to negotiate with the problem.',
      },
      engineering: {
        title: 'Software engineering',
        body: 'The spine of the degree and what sets it apart. Ten subjects running from eliciting requirements to maintaining what is already in production, by way of architecture, quality and project management. Personal Software Process and Team Software Process are the two that marked me most: measuring your own work and then sustaining a team’s is a discipline almost nobody learns from a course.',
      },
      data: {
        title: 'Data, web and security',
        body: 'Two database courses with laboratories, web application development, network and systems security, and electronic business at the end. This is the chain that connects the degree to what actually gets deployed, and where security appears as a subject of its own rather than as an appendix.',
      },
      practice: {
        title: 'Research and professional practice',
        body: 'The degree does not end in an exam. It ends in two seminars — research and thesis — and in two periods of professional practice: social service and a placement. That is where I joined Labsol, and where what I had learned in class first met a user who was not the lecturer.',
      },
    },

    teachingTitle: 'Faculty who taught judgement, not a syllabus',
    teachingBody: 'I had excellent teachers. I say it knowing it is the sentence everyone writes about their university, so it is worth being precise about how: they taught the why behind decisions, not the procedure for reaching the expected answer. An architecture had to be defended, a requirement had to be argued, and a delivery was judged by what it solved rather than by whether it ran.',
    teachingBody2: 'That left two things. The first is the technical base, demanding and resting on a well-built plan. The second, and the one I did not expect, is creativity: once you are taught that there is almost always more than one defensible solution, you stop looking for the correct answer and start designing. A good deal of how I work now — weighing trade-offs in writing, building a scoped proof before committing to a decision — began as a classroom habit.',

    closingTitle: 'What I took with me',
    closingBody: 'I came out with the judgement to decide what to build and by what method, which is what holds up everything else on this site: the two companies, the contract work, and the platform I help build at Radii. The degree did not teach me the technologies I work with today — several did not exist when I started — but how to evaluate and adopt them, which is the only part that does not expire.',
  },

  // ---------------------------------------------------------------- Radii
  radii: {
    badge: 'Founding Software Engineer',
    company: 'Radii Manufacturing',
    period: 'Jul 2025 — Present',
    tagline: 'High-precision parts. Instant quoting. On-time delivery.',
    heroTitle: 'Precision manufacturing, solved in software',
    heroLede: 'Radii turns a CAD file into a part that is manufactured, traced and delivered. I build the system that makes it possible: the services behind the core workflows, the cloud workers, the AI agents, and the infrastructure it all runs on.',
    visitSite: 'radii.com.mx',

    kickers: {
      what: 'The platform',
      how: 'The process',
      build: 'My role inside',
      impact: 'What changed',
      stack: 'Tooling',
      closing: 'The why',
    },
    statsTitle: 'The terrain',
    stats: {
      tolerance: { value: '±0.005 mm', label: 'CNC tolerance reachable across the network' },
      lead: { value: '1–5 days', label: 'Lead time on urgent parts' },
      quote: { value: 'Seconds', label: 'From CAD to quote with DFM analysis' },
      certs: { value: 'AS9100D', label: 'Alongside ISO 9001 and IATF 16949 in the network' },
    },

    whatTitle: 'What Radii is',
    whatLede: 'A nearshore platform that automates precision part sourcing: AI feasibility analysis, instant quoting, managed production across an audited network of certified manufacturers, and full material traceability through to delivery.',
    whatNote: 'Aerospace, automotive and industrial. Geographic proximity, competitive cost and USMCA advantages for United States supply chains.',

    howTitle: 'How it works',
    howLede: 'Four stages that in the traditional process require weeks of manual exchange.',
    how: {
      upload: {
        title: 'Automatic analysis',
        body: 'The engineer uploads a 2D or 3D CAD file. AI validates geometry, tolerances and material feasibility before anyone opens the file by hand.',
      },
      quote: {
        title: 'Instant quote',
        body: 'Price and lead time in seconds, with material and finishing configurable, without dependence on a commercial response cycle.',
      },
      produce: {
        title: 'Managed production',
        body: 'The engineering team assigns the work to audited partners and supervises execution. Network selection responds to verified capability rather than immediate availability.',
      },
      trace: {
        title: 'Full traceability',
        body: 'Delivery includes complete documentation, material certificates and CMM inspection reports: the full record alongside the part itself.',
      },
    },

    // Every number on this page above this point belongs to Radii. These are
    // the only ones that belong to the engineer, which is the whole reason the
    // section exists: "I design the services" is a job description, and a
    // reader cannot tell it apart from someone who watched a course.
    impactTitle: 'What has changed since I joined',
    impactLede: 'Founding engineer on a platform in its first year. These are the figures the work has moved, not the platform’s specifications.',
    impact: {
      quote: {
        value: 'Automatic',
        label:
          'The quote comes out on its own when the analysis flags nothing. What the AI does send to manual review went from five days to one.',
      },
      ops: {
        value: '80%',
        label: 'Of the operations team’s recurring work, automated with AI agents',
      },
      infra: {
        value: '2 weeks',
        label: 'To migrate the platform’s entire infrastructure',
      },
      tickets: {
        value: '700+',
        label: 'Tickets closed',
      },
    },
    impactNote: 'Over 4,000 code contributions since July 2025, across the whole platform.',

    buildTitle: 'What I build there',
    buildLede: 'Joining as a founding engineer means direct participation in defining the stack, the architecture and the engineering practices the platform is built on, both in their initial design and in their evolution.',
    build: {
      backend: {
        title: 'Core backend services',
        body: 'I design and develop the services powering core manufacturing workflows, with a focus on system scalability and reliability.',
      },
      quoting: {
        title: 'The automatic quoting engine',
        body: 'I built the engine that prices a part: a mathematical algorithm that turns geometry, material, finishing and volume into a price and a lead time. When the analysis finds nothing to review the price comes out automatically and passes through nobody. What does get flagged for manual review reaches an account manager, and that path went from five days to one.',
      },
      workers: {
        title: 'Cloud workers',
        body: 'I build and maintain workers on AWS that automate data processing and reduce the team’s manual operational load.',
      },
      agents: {
        title: 'AI agents',
        body: 'I develop agents with LangGraph and LangChain that automate decisions and internal operations previously requiring human intervention at every stage.',
      },
      ml: {
        title: 'Machine Learning automation',
        body: 'I apply ML-driven automation that improves internal workflows and lifts the efficiency of core business operations.',
      },
      platform: {
        title: 'CI/CD and observability',
        body: 'I implement CI/CD pipelines, automated deployments and cloud observability across a microservices ecosystem.',
      },
      product: {
        title: 'Product and architecture',
        body: 'I take part in software architecture and design discussions, and contribute React frontend features when the product calls for it.',
      },
    },

    // The diagram. Every box is something this page already states in prose;
    // the drawing only gives it a shape.
    system: {
      alt: 'System diagram: a CAD file passes through analysis, quoting, production and traceability, over a layer of services, cloud workers, AI agents and machine learning, with CI/CD and observability underneath.',
      flowBand: 'What happens to a part',
      platformBand: 'The platform underneath it',
      flow: {
        upload: { title: '2D / 3D CAD', sub: 'from the engineer' },
        analyse: { title: 'Automatic analysis', sub: 'geometry · tolerances' },
        quote: { title: 'Quote', sub: 'pricing algorithm' },
        produce: { title: 'Production and delivery', sub: 'audited network · CMM' },
      },
      platform: {
        services: { title: 'Core services', sub: 'microservices' },
        workers: { title: 'Cloud workers', sub: 'AWS · Kubernetes' },
        agents: { title: 'AI agents', sub: 'LangGraph · LangChain' },
        ml: { title: 'Machine learning', sub: 'automation' },
      },
      rail: { title: 'CI/CD and observability', sub: 'automated deployment · production monitoring' },
      quoteBadge: 'automatic price',
      quoteBadgeAlt: 'if flagged for review: 5 days → 1',
      agentsBadge: '80% of recurring work',
      caption: 'The boxes on top are the product; the ones underneath are what I build. Quoting is automatic unless the analysis flags something for manual review, which is the case the five-to-one belongs to.',
    },

    stackTitle: 'The stack',
    stackLede: 'Selected against the requirements of the problem.',
    groups: {
      services: 'Services and data',
      cloud: 'Cloud and platform',
      ai: 'AI and agents',
      product: 'Product',
    },

    closingTitle: 'Why it matters',
    closingBody: 'A mis-quoted part stalls a production line; a supplier without traceability blocks an aerospace certification. The software built here is not a convenience layer over a pre-existing process: it is the process itself, and that condition sets the standard the work is held to.',
  },

  // ---------------------------------------------------------- StackSelect
  stackselect: {
    badge: 'CTO & Co-founder',
    company: 'StackSelect',
    period: 'Incorporating',
    tagline: 'Talent.',
    heroTitle: 'The bridge between what university teaches and what industry asks for',
    heroLede: 'StackSelect trains, assesses and places developers with no work experience into their first professional role. The deliverable is not the course, but the candidate in a position to start.',

    kickers: {
      name: 'The name',
      problem: 'The context',
      solution: 'The solution',
      edge: 'What sets us apart',
      values: 'Culture',
      purpose: 'The purpose',
    },
    nameTitle: 'The name',
    nameBody: '"Stack" denotes the set of tools a developer works with. "Select" refers to selecting that talent and connecting it to companies. The combination describes the operation precisely: identify the strongest developers and place them in the job market.',

    statusTitle: 'Where it stands today',
    statusLede: 'StackSelect has been running since June, training and assessing before it formally opens. The deliverable is measured in placements, so the date that matters is when those start.',
    status: {
      operating: { value: 'Jun 2026', label: 'Running: training and assessment under way' },
      official: { value: 'Jan 2027', label: 'Formal operation begins' },
      deliverable: { value: 'Placement', label: 'The unit it is measured in, not a finished course' },
    },
    statusNote: 'The months before formal operation are not preparation: they are the first cohorts, and they are what decides whether the method holds before it is scaled.',

    problemTitle: 'The problem',
    problemBody: 'There is a documented gap between university training and the sector’s actual requirements. Technically capable developers remain unemployed for want of practical experience, with no specific preparation for a technical interview and no reference for what professional practice expects of them.',
    problemStat: 'Recent graduates with no first contact with a real job',

    solutionTitle: 'The solution',
    solutionLede: 'Specialised bootcamps for developers, paired with a technical assessment platform.',
    solution: {
      train: {
        title: 'Specialised bootcamps',
        body: 'Content directed at the knowledge industry effectively requires, validated by professionals currently practising in the sector.',
      },
      assess: {
        title: 'Technical assessment',
        body: 'A platform that assesses against the same criteria the hiring company will apply, removing the uncertainty of the technical interview process.',
      },
      place: {
        title: 'Real placement',
        body: 'The process assesses, trains where required, and presents the candidate in a position to start. Placement is the deliverable, not an additional service.',
      },
    },

    edgeTitle: 'What sets us apart',
    edgeBody: 'The sector’s offering concentrates on preparation. Our proposition is effective placement on short timelines: assessment, training where appropriate, and presentation of the candidate in a position to start.',
    edgeHonest: 'Current limitation: the brand is recently established and holds no market recognition or documented track record. That base is built on delivered results.',

    valuesTitle: 'Values',
    values: {
      commitment: { title: 'Commitment', body: 'Support for the candidate extends through to effective placement, not to the end of the training programme.' },
      empathy: { title: 'Empathy', body: 'Understanding the actual starting point of someone who has not yet accessed a first professional opportunity.' },
      solidarity: { title: 'Solidarity', body: 'Knowledge that enables access to the job market is transmitted, not withheld.' },
    },

    purposeTitle: 'The purpose',
    purposeBody: 'To help young Mexican talent get into the information technology industry, and to lower the unemployment rate among recent graduates.',

    roleTitle: 'My role as CTO',
    roleBody: 'I set the technical direction of the company: architecture of the assessment platform, the stack it is built on, the technical content of the bootcamps, and the criteria by which a candidate is certified ready. The placement promise is only sustainable if the assessment is rigorous, and that assessment is itself an engineering problem.',
  },

  // ------------------------------------------------------------ Moonphase
  moonphase: {
    badge: 'CEO & Founder',
    company: 'Moonphase',
    period: 'Building',
    tagline: 'Building the future of technology.',
    heroTitle: 'We automate industries. And we attack what nobody has solved yet.',
    heroLede: 'Building the future of technology and pushing it to limits that do not have names yet: that is the first premise, and the standard every project is chosen against. Moonphase accepts any idea — including the ones that sound impossible — and works out how to build it: process automation for specific industries, businesses and niches, and R&D on problems nobody has solved. Both lines run the same method — feasibility, bounded scope, build, and a written record of the result, negative ones included. Ambition is the starting point; the method is what turns it into a deliverable.',

    kickers: {
      name: 'The name',
      method: 'How the work runs',
      lanes: 'Where each project lands',
      values: 'Decision criteria',
    },

    statusTitle: 'Where it stands today',
    statusLede: 'Moonphase did not start from nothing in August. It started in January 2025 as an independent practice, and the company is what that practice had already shown worked.',
    status: {
      first: { value: 'Jan 2025', label: 'First project delivered: PuntoBienestar, before the company existed' },
      operating: { value: 'Aug 2026', label: 'Operating as Moonphase' },
      official: { value: 'Jan 2027', label: 'Formal operation begins' },
    },
    statusNote: 'The culture and the judgement the company works with were not written in a founding meeting: they came out of two years of delivering projects and finding out what holds a result up and what does not.',

    nameTitle: 'Where the name comes from',
    nameBody: 'The moon does not look the same from every point on Earth at the same time: in one place it is full and in another it is waning, and both observations are correct. What changes is not the moon — it is where you are measuring from.',
    nameBody2: 'A problem’s feasibility behaves the same way: impossible is almost always a problem of perspective and data. It depends on what data exists, what tools are available and how much has been measured — not on how reasonable it sounds said out loud. So here feasibility gets analysed before anyone has an opinion about it.',

    missionLabel: 'Mission',
    visionLabel: 'Vision',
    missionBody: 'Turn the automation, innovation and invention ideas that today exist only as proposals into operating systems. Where a solution is not viable, formally document what prevents it and what conditions would enable it, so it can be resumed when those conditions change.',
    visionBody: 'To be the company that turned the most impossible ideas into reality, and that documented the road to the ones still out of reach. The primary metric is impact: how many things exist in the world that would not exist without us. Size comes later, and it comes as a consequence.',

    methodTitle: 'The method',
    methodLede: 'The same one for automating a distributor’s warehouse as for attacking an open problem. What changes is how much of the path is already settled going in.',
    method: {
      feasibility: {
        title: 'Feasibility analysis',
        body: 'Every idea enters as an attackable question: what exactly has to be achieved, with what data, under what constraints, and by what criterion it is declared working. That analysis decides whether it is buildable today or whether it is R&D.',
      },
      scope: {
        title: 'Scope and lane',
        body: 'It gets bounded to measurable deliverables and assigned a lane. A large R&D problem is split into the pieces that are buildable, and those are done first to cut the uncertainty down.',
      },
      build: {
        title: 'Build',
        body: 'Whatever the question needs gets built: the system, the prototype, or the measuring instrument required to answer it. A result that does not exist in code or in data does not count as a result.',
      },
      record: {
        title: 'The record',
        body: 'Every project leaves a document: what was built, what was measured, what failed and what is missing. The negative case is delivered exactly like the positive one, and is revisited when the technology moves.',
      },
    },

    principleLabel: 'The operating principle',
    principleLine1: 'Everything is possible until proven otherwise.',
    principleLine2: 'And when it is proven otherwise, what blocks it and what it would take are written down.',
    principleBody: 'This is not optimism: it is burden of proof. An "it is impossible" said without evidence is exactly as unrigorous as an "it will definitely work" said without evidence — both are hypotheses, and both get tested. The practical difference is the archive: when the "it cannot be done" arrives with data, that data is kept instead of evaporating, and it gets looked at again when the state of the art shifts.',

    lanesTitle: 'Two lanes',
    lanesLede: 'One sustains the operation. The other is the reason for having one.',
    laneOne: {
      label: 'Lane 1',
      title: 'Applied automation',
      body: 'Concrete processes in industries, businesses and niches: manual inventory control, spreadsheet-based reporting, operations without traceability, and integrations resolved by transferring data between systems by hand. Closed scope, measurable deliverable, identified client.',
      note: 'It funds the operation and develops the technical capability lane 2 requires.',
    },
    laneTwo: {
      label: 'Lane 2',
      title: 'R&D on open problems',
      body: 'Technology that does not exist yet, open questions, and problems the industry has written off, from any field of knowledge. They are measured not by success but by knowledge produced: what was ruled out, on what evidence, and what it would take to move forward. They get split into buildable pieces wherever the problem allows, and they get attacked even when the odds are against them.',
      note: 'This is the invention line. A negative result with evidence and a map of conditions is a deliverable, not a failed project.',
    },

    valuesTitle: 'Seven values',
    valuesLede: 'Not wall decorations: they are the criteria used to decide when the decision is not obvious, and the ones anyone’s work here is judged by. They follow the arc of a project.',
    valuesHint: 'Tap a value to read it',
    values: {
      perspective: {
        title: 'Perspective',
        motto: 'Before ruling it out, check where you are measuring from.',
        body: 'When something looks impossible, the first hypothesis is not "this is impossible" — it is "maybe I am missing data, tools, or the right angle." Epistemic humility with teeth: I know my view is partial, so I go looking for the others.',
      },
      courage: {
        title: 'Courage',
        motto: 'Start what you do not know how to finish.',
        body: 'Take on projects whose outcome is not guaranteed, and say "I do not know" or "this is wrong" early and in front of everyone. Not recklessness: acting with the risks counted rather than dodging them by only picking the safe work.',
      },
      grit: {
        title: 'Grit',
        motto: 'Hard things get harder right before they give.',
        body: 'Keep going once the problem stops being fun and the middle stretch drags. Persistence with direction: stubbornness repeats the same attempt expecting a different result; grit changes the attempt without changing the goal.',
      },
      ownership: {
        title: 'Ownership',
        motto: 'What you promise gets done. What you break, you fix.',
        body: 'Own the outcome, not just the task. It is the exact counterweight to courage: without it, "exploring" becomes a synonym for "not delivering" — and it is what keeps a client trusting you after an attempt that did not land.',
      },
      documentNo: {
        title: 'Document the no',
        motto: 'Recorded failure is an asset. Silent failure is waste.',
        body: 'In almost every organisation the most expensive knowledge — everything that was tried and did not work — evaporates, and two years later someone else spends the same six months rediscovering it. Here that result changes deliverable: the product becomes the map of what is missing.',
      },
      craft: {
        title: 'Craft and livelihood',
        motto: 'The operational project and the open problem, held to one standard.',
        body: 'There is no such thing as a "minor" project. The technical capability accumulated solving a hundred concrete problems is the same one required when addressing a problem with no known solution, and it is what funds the research.',
      },
      betterWorld: {
        title: 'Wanting a better world',
        motto: 'The reason all of the above matters.',
        body: 'Perspective, courage and grit are forces with no direction of their own: they serve building something worthwhile just as well as the opposite. This value is the one that points, and it is the final filter: does this leave the world better than we found it?',
      },
    },

    roleTitle: 'My role as CEO',
    roleBody: 'I founded Moonphase and I run the company: the criteria by which projects are admitted, how effort is distributed across the two lanes, and the documentation of negative results. The difficulty of the role is not choosing what to build, but holding the method when an R&D project has run three months without a result and the comfortable option is to suspend its documentation.',
  },

  // ------------------------------------------------------------- Evodeps
  evodeps: {
    company: 'Evodeps',
    period: '2025 — Present',
    title: 'Software Engineer',
    short: 'Custom software, equipment and technology prototypes shaped around each client.',
    body: 'Evodeps develops software, equipment and custom technology prototypes and implementations, sized to each client’s needs and budget. Its main differentiator is adaptability: adjusting process, scope and technology to what the project actually asks for, rather than selling the same solution every time. I work there as a Software Engineer, inside cross-functional teams of development, design and prototyping.',
    valuesLabel: 'How they work',
    values: 'Innovation · Quality development · Collaborative teams · Adaptability · Client focus · Security',
  },
};

export default brandsEn;
