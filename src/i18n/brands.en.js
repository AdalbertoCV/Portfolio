// English mirror of brands.es.js. Same key shape — the dictionary test walks
// both and fails on any key present in one and missing in the other.

const brandsEn = {
  timeline: {
    badge: 'Track record',
    title: 'Four fronts, one obsession',
    lede: 'I build software where the outcome matters: an AI-powered manufacturing platform, a custom development house, my own clients, and the lab where it all started.',
    featuredLabel: 'Current focus',
    present: 'Present',
    readStory: 'Read the full story',
    visitSite: 'Visit site',
    yearsLabel: 'years building',
    venturesTitle: 'And two companies of my own',
    venturesLede: "I don't just write the code. I also decide what gets built, why, and for whom.",
    venturesCta: 'See Ventures',
  },

  ventures: {
    badge: 'Ventures',
    title: 'Two companies, two seats',
    lede: 'In one I run the technology. In the other I run the company. Both started from the same idea: talent and ideas go to waste for lack of somewhere to land.',
    roleCto: 'CTO & Co-founder',
    roleCeo: 'CEO & Founder',
    enter: 'Enter',
    statusBuilding: 'Building',
    stackselectPitch: 'Bootcamps and technical assessment that take a developer with no experience all the way to a real first job.',
    moonphasePitch: 'Accepts any idea — the impossible ones included — and works out how to build it: real automation and R&D with method and a written record.',
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
    howLede: 'Four steps that used to take weeks of email back and forth.',
    how: {
      upload: {
        title: 'Automatic analysis',
        body: 'The engineer uploads a 2D or 3D CAD file. AI validates geometry, tolerances and material feasibility before anyone opens the file by hand.',
      },
      quote: {
        title: 'Instant quote',
        body: 'Price and lead time in seconds, with material and finishing configurable. No waiting on a sales rep to reply.',
      },
      produce: {
        title: 'Managed production',
        body: 'The engineering team assigns the work to audited partners and supervises execution. The network is chosen on real capability, not on who happens to be free.',
      },
      trace: {
        title: 'Full traceability',
        body: 'Delivery arrives with documentation, material certificates and CMM inspection reports. The whole file, not just the part.',
      },
    },

    buildTitle: 'What I build there',
    buildLede: 'I joined as a founding engineer. That means the stack, the architecture and the engineering practices the platform stands on were decided — and still are — with my voice at the table.',
    build: {
      backend: {
        title: 'Core backend services',
        body: 'I design and develop the services powering core manufacturing workflows, with a focus on system scalability and reliability.',
      },
      workers: {
        title: 'Cloud workers',
        body: 'I build and maintain workers on AWS and Azure that automate data processing and take manual load off the team.',
      },
      agents: {
        title: 'AI agents',
        body: 'I develop agents with LangGraph and LangChain that automate decisions and internal operations that used to need human judgement at every step.',
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
    stackLede: 'Chosen for the problem, not out of habit.',
    groups: {
      services: 'Services and data',
      cloud: 'Cloud and platform',
      ai: 'AI and agents',
      product: 'Product',
    },

    closingTitle: 'Why it matters',
    closingBody: 'A mis-quoted part stalls a production line. A supplier without traceability blocks an aerospace certification. The software I write here is not a convenience layer over a process that already worked: it is the process. That is the part that keeps me here.',
  },

  // ---------------------------------------------------------- StackSelect
  stackselect: {
    badge: 'CTO & Co-founder',
    company: 'StackSelect',
    period: 'Incorporating',
    tagline: 'Talent.',
    heroTitle: 'The bridge between what university teaches and what industry asks for',
    heroLede: 'StackSelect trains, assesses and places developers with no work experience into a real first job. We do not sell courses: we send the person ready to work.',

    kickers: {
      name: 'The name',
      problem: 'The context',
      solution: 'The solution',
      edge: 'What sets us apart',
      values: 'Culture',
      purpose: 'The purpose',
    },
    nameTitle: 'The name',
    nameBody: '"Stack" is the technology stack — the tools a developer works with. "Select" is selecting that talent and connecting it to companies. Together they say exactly what we do: choose the best developers and place them in the job market.',

    problemTitle: 'The problem',
    problemBody: 'There is an enormous gap between what university teaches and what companies actually ask for. Talented developers stay unemployed for lack of practical experience, with no idea how to prepare for a technical interview or what is expected of them on day one.',
    problemStat: 'Recent graduates with no first contact with a real job',

    solutionTitle: 'The solution',
    solutionLede: 'Specialised bootcamps for developers, paired with a technical assessment platform.',
    solution: {
      train: {
        title: 'Specialised bootcamps',
        body: 'Content focused on the real knowledge industry asks for, backed by the experience of professionals already inside it.',
      },
      assess: {
        title: 'Technical assessment',
        body: 'A platform that measures what the company is going to measure, so the technical interview stops being unfamiliar ground.',
      },
      place: {
        title: 'Real placement',
        body: 'We assess, train where needed, and send the candidate ready to work. Placement is the deliverable, not an add-on.',
      },
    },

    edgeTitle: 'What sets us apart',
    edgeBody: 'The competition sells preparation. We sell real, fast job placement: we assess, train if necessary, and send the candidate ready to work.',
    edgeHonest: 'And what we do not have yet: we are a new brand. There is no recognition and no success stories to show. That gets built by delivering, not by promising.',

    valuesTitle: 'Values',
    values: {
      commitment: { title: 'Commitment', body: 'To the candidate until they are placed, not until the course ends.' },
      empathy: { title: 'Empathy', body: 'Understanding where someone comes from when they have never had a first chance.' },
      solidarity: { title: 'Solidarity', body: 'Knowledge that opens a door does not get hoarded.' },
    },

    purposeTitle: 'The purpose',
    purposeBody: 'To help young Mexican talent get into the information technology industry, and to lower the unemployment rate among recent graduates.',

    roleTitle: 'My role as CTO',
    roleBody: 'I set the technical direction of the company: the architecture of the assessment platform, the stack it is built on, the technical content of the bootcamps, and the standard by which a candidate is judged ready. The placement promise only holds if the assessment is honest — and that assessment is an engineering problem.',
  },

  // ------------------------------------------------------------ Moonphase
  moonphase: {
    badge: 'CEO & Founder',
    company: 'Moonphase',
    period: 'Building',
    tagline: 'Impossible is almost always a problem of perspective and data.',
    heroTitle: 'We automate industries. And we attack what nobody has solved yet.',
    heroLede: 'Moonphase accepts any idea — including the ones that sound impossible — and works out how to build it. Two lines of work: process automation for specific industries, businesses and niches, and R&D on problems nobody has solved. Both run the same method: feasibility analysis, bounded scope, build, and a written record of the result, negative ones included. Ambition is the starting point; the method is what turns it into a deliverable.',

    kickers: {
      name: 'The name',
      method: 'How the work runs',
      lanes: 'Where each project lands',
      values: 'Decision criteria',
    },

    nameTitle: 'Where the name comes from',
    nameBody: 'The moon does not look the same from every point on Earth at the same time: in one place it is full and in another it is waning, and both observations are correct. What changes is not the moon — it is where you are measuring from.',
    nameBody2: 'A problem’s feasibility behaves the same way. It depends on what data exists, what tools are available and how much has been measured — not on how reasonable it sounds said out loud. So here feasibility gets analysed before anyone has an opinion about it.',

    missionLabel: 'Mission',
    visionLabel: 'Vision',
    missionBody: 'Turn the automation, innovation and invention ideas that today exist only in someone’s head into systems that work. And when something is not possible yet, put in writing what blocks it and what it would take — so we can come back the day it is.',
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
      body: 'Concrete processes in industries, businesses and niches: inventory tracked by hand, reporting that lives in spreadsheets, operations with no traceability, integrations a person currently handles by copying data between systems. Closed scope, measurable deliverable, real client.',
      note: 'It funds the operation and builds the technical muscle lane 2 needs.',
    },
    laneTwo: {
      label: 'Lane 2',
      title: 'R&D on open problems',
      body: 'Technology that does not exist yet, open questions, and problems the industry has written off, from any field of knowledge. They are measured not by success but by knowledge produced: what was ruled out, on what evidence, and what it would take to move forward. They get split into buildable pieces wherever the problem allows, and they get attacked even when the odds are against them.',
      note: 'This is where invention happens. An "it cannot be done" with evidence and a map is a deliverable, not a failed project.',
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
        motto: 'The warehouse and the open problem, taken equally seriously.',
        body: 'There is no such thing as a "minor" project. The technical muscle built solving a hundred concrete problems is exactly the one needed the day you attack one nobody has solved — and it is what pays for the research.',
      },
      betterWorld: {
        title: 'Wanting a better world',
        motto: 'The reason all of the above matters.',
        body: 'Perspective, courage and grit are forces with no direction of their own: they serve building something worthwhile just as well as the opposite. This value is the one that points, and it is the final filter: does this leave the world better than we found it?',
      },
    },

    roleTitle: 'My role as CEO',
    roleBody: 'I founded Moonphase and I run the company: what gets accepted as a project, how effort is split between the two lanes, and what gets written down when something turns out to be impossible. The hard part of the job is not choosing what to build — it is holding the method when an R&D project has gone three months without a result and the comfortable way out is to stop documenting it.',
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
