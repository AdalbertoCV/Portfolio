// English mirror of brands.es.js. Same key shape — the dictionary test walks
// both and fails on any key present in one and missing in the other.

const brandsEn = {
  timeline: {
    badge: 'Track record',
    title: 'Four fronts, one standard',
    lede: 'Four development contexts carrying responsibility for the outcome: an AI-powered manufacturing platform, a custom development house, an independent client portfolio, and the public laboratory where my professional training began.',
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
    statusBuilding: 'Building',
    stackselectPitch: 'Bootcamps and a technical assessment platform directed at placing developers with no prior experience into employment.',
    moonphasePitch: 'Building the future of technology: real automation and R&D on what nobody has solved, with method and a written record.',
    projectsTitle: 'Want to see more of my work?',
    projectsLede: 'Explore my projects: the full catalogue of what I have built, from APIs and data pipelines to interfaces and a jazz-hop track composed as code.',
    projectsCta: 'Explore projects',
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

    buildTitle: 'What I build there',
    buildLede: 'Joining as a founding engineer means direct participation in defining the stack, the architecture and the engineering practices the platform is built on, both in their initial design and in their evolution.',
    build: {
      backend: {
        title: 'Core backend services',
        body: 'I design and develop the services powering core manufacturing workflows, with a focus on system scalability and reliability.',
      },
      workers: {
        title: 'Cloud workers',
        body: 'I build and maintain workers on AWS and Azure that automate data processing and reduce the team’s manual operational load.',
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
    period: 'Present',
    title: 'Software Engineer',
    short: 'Custom software, equipment and technology prototypes shaped around each client.',
    body: 'Evodeps develops software, equipment and custom technology prototypes and implementations, sized to each client’s needs and budget. Its main differentiator is adaptability: adjusting process, scope and technology to what the project actually asks for, rather than selling the same solution every time. I work there as a Software Engineer, inside cross-functional teams of development, design and prototyping.',
    valuesLabel: 'How they work',
    values: 'Innovation · Quality development · Collaborative teams · Adaptability · Client focus · Security',
  },
};

export default brandsEn;
