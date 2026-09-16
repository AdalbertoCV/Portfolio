import brandsEn from './brands.en';
import rolesEn from './roles.en';
import reposEn from './repos.en';
import cvEn from './cv.en';

const en = {
  ...brandsEn,
  ...cvEn,
  ...reposEn,
  ...rolesEn,
  // Per-route <title> and description, applied by <RouteMeta>. Unfurlers never
  // run JavaScript, so public/index.html carries the version a link preview
  // shows; these exist for the browser tab, the bookmark, the history entry,
  // and the crawlers that do render the page.
  // The closing band under the project catalogue. Every other route reaches
  // Contact through the navbar and the footer, so this is the one page that
  // earns a band of its own: it is where a reader who has gone through the
  // whole body of work ends up.
  talk: {
    title: 'Want to work together, or just share ideas?',
    lede:
      'Write to me. A project you want built, a team you want me on, or an idea you want to think through out loud — all three are good reasons to start the conversation.',
    cta: 'Get in touch',
  },
  // The game. Two voices: one for somebody who chose to come here, one for
  // somebody who arrived by mistyping a URL and deserves better than a blank
  // page.
  play: {
    badge: 'Coffee break',
    title: 'A laptop that jumps bugs',
    lede:
      'Every bug on the track is one I have actually shipped. The deploys floating past are worth 25 points, and missing one costs nothing — which is the only honest way to price a bonus in a game where the floor is already lava.',
    lostBadge: 'Error 404',
    lostTitle: 'This page does not exist',
    lostLede:
      'Something in the URL is off, or something on this site is. Either way, here is a laptop that jumps bugs while you decide where you meant to go.',
    score: 'Score',
    dodged: 'Bugs dodged',
    best: 'Best',
    ready: 'Ready when you are.',
    over: 'A bug got through. It happens in production too.',
    start: 'Start',
    again: 'Again',
    hint: 'Space, arrow up, or tap to jump.',
    canvasLabel: 'A pixel-art laptop running and jumping over bugs',
    note:
      'Written for this page: one canvas, no dependencies, and a hitbox slightly smaller than the sprite because pixel-perfect collision feels like cheating to the person holding the spacebar.',
    back: 'Back to the serious pages',
  },
  meta: {
    home: {
      title: 'Adal Cerrillo — Founding Software Engineer',
      description:
        'Founding Software Engineer at Radii Manufacturing, building the backend, cloud and AI systems behind an AI manufacturing platform. Founder of Moonphase and StackSelect.',
    },
    experience: {
      title: 'Experience · Adal Cerrillo',
      description:
        'Five fronts, one standard: Radii Manufacturing, independent clients, Evodeps, LABSOL Network and peer mentoring at CASE.',
    },
    ventures: {
      title: 'Ventures · Adal Cerrillo',
      description:
        'Moonphase and StackSelect: the two companies I founded, what each one is for, and where each one stands today.',
    },
    projects: {
      title: 'Projects · Adal Cerrillo',
      description:
        'Twenty projects, from systems delivered to public institutions to research and experiments: what each one solves, its stack, and its repository.',
    },
    contact: {
      title: 'Contact · Adal Cerrillo',
      description:
        'A project you want built, a team you want me on, or an idea you want to think through out loud. Write to me.',
    },
    radii: {
      title: 'Radii Manufacturing · Adal Cerrillo',
      description:
        'Founding Software Engineer: the backend, the cloud workers and the AI agents behind a platform that turns a CAD file into a quoted, manufactured, traceable part.',
    },
    stackselect: {
      title: 'StackSelect · Adal Cerrillo',
      description:
        'Bootcamps and a technical assessment platform aimed at placing developers with no prior experience into their first job.',
    },
    moonphase: {
      title: 'Moonphase · Adal Cerrillo',
      description:
        'Real automation and R&D on what nobody has solved yet, with method and a written record.',
    },
    evodeps: {
      title: 'Evodeps · Adal Cerrillo',
      description: 'Software, equipment and prototypes built to each client’s measure.',
    },
    freelance: {
      title: 'Independent engineering · Adal Cerrillo',
      description:
        'Engineering inside multidisciplinary teams: turning business problems into systems that are actually adopted.',
    },
    labsol: {
      title: 'LABSOL Network · Adal Cerrillo',
      description:
        'The free-software lab at COZCYT, where I led two projects delivered to the Autonomous University of Zacatecas and the state science council.',
    },
    case: {
      title: 'CASE · Adal Cerrillo',
      description:
        'Two years as a peer mentor, teaching the five subjects that decide who stays in an engineering degree.',
    },
    play: {
      title: 'A laptop that jumps bugs · Adal Cerrillo',
      description:
        'A small endless runner written for this site: a pixel-art laptop jumping the bugs I have actually shipped.',
    },
    uaz: {
      title: 'Software Engineering, UAZ · Adal Cerrillo',
      description:
        'The degree behind the work: Software Engineering at the Autonomous University of Zacatecas, and what it actually taught.',
    },
  },
  footer: {
    tagline: 'Founding Software Engineer. Backend, cloud and AI systems — and the two companies I am building.',
    exploreLabel: 'Explore',
    reachLabel: 'Reach me',
    cvLabel: 'Curriculum',
    cvDownload: 'Download CV (PDF)',
    cvOpen: 'Open in the browser',
    kicker: 'Footnote',
    play: 'Or go jump some bugs →',
    prev: 'Previous joke',
    next: 'Next joke',
    credit: '© 2026 Adal Cerrillo · Handmade, on more coffee than advisable.',
    jokes: [
      'Stated life goal: to be the real-life Tony Stark, Jarvis included. The suit is on version 0.1, but Jarvis already runs locally — and unlike the original, this one asks for approval before deploying to production.',
      'When the suit is finally ready, the first ticket will be "the arc reactor has no integration tests".',
      'My favourite stack is still coffee, a terminal, and the phrase "it works on my machine".',
      'I know exactly how many unfinished projects I have. That figure is classified.',
      'The most elegant architecture I have ever designed is still the one I diagrammed before reading the full requirements.',
      'I ran a penetration test against my own house. The router won.',
      'I know seven programming languages and still google "how to center a div".',
      'My estimates are honest, and they always have to be doubled. Both of those are true at once.',
      'My disaster recovery plan is thoroughly documented. It is called git push.',
      'PSeInt is still the only environment that never broke a migration on me.',
      'I have forty tabs open and every one of them is "the important one".',
    ],
  },
  nav: {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    ventures: 'Ventures',
    contact: 'Contact',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },
  contact: {
    badge: 'Contact',
    title: 'Let’s talk',
    lede: 'If you have a project, want to collaborate on something, want to be part of my community, or just want to share an idea, write to me. I answer everything that comes in.',
    fields: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      name: 'What should I call you?',
      email: 'you@email.com',
      subject: 'What is this about?',
      message: 'Tell me what you have in mind.',
    },
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Message sent. I will reply as soon as I read it.',
    error: 'That did not send. Write to me directly at adalc3488@gmail.com.',
  },
  common: {
    skipToContent: 'Skip to content',
    language: 'Language',
    back: 'Back',
    backToExperience: 'Back to Experience',
    backToVentures: 'Back to Ventures',
    backToAbout: 'Back to About',
    scroll: 'Scroll',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    openRepo: 'source repository',
    prevShot: 'Previous screenshot',
    nextShot: 'Next screenshot',
    of: 'of',
    screenshots: 'screenshots',
    close: 'Close',
    zoomIn: 'Fill screen height',
    zoomOut: 'Fit image to screen',
    tapToZoom: 'Tap image to zoom',
    dragToExplore: 'Drag to explore',
    enlargedImage: 'Enlarged image',
  },
  about: {
    badge: 'About Me & Education',
    heading: 'About Me:',
    name: 'Adal Cerrillo',
    role: 'Software Engineer',
    bio: 'Full-stack software engineer building backend services, cloud infrastructure, and AI systems. At Radii Manufacturing I design the services behind core manufacturing workflows, build cloud workers on AWS and Azure that automate data processing, develop AI agents with LangGraph and LangChain, and maintain the CI/CD pipelines and observability that hold a microservices platform together. I work across Python, Java, JavaScript and C#, with Django, Spring Boot and React, and my interests run to distributed systems, event-driven architecture, LLM systems and RAG, and platform engineering. I trained as a software engineer at the Autonomous University of Zacatecas. My working axis is continuous innovation: applying emerging technology to influence the direction of the software industry, and integrating engineering, design and business judgement into solutions that hold up over time.',
    downloadCv: 'Download CV',
    cvFormat: 'PDF',
    openInBrowser: 'Open in browser',
    photoAlt: 'About Me',
  },
  skills: {
    heading: 'Skills',
    subheading: 'Technologies & Tools I Work With',
    groups: {
      languages: 'Languages',
      backend: 'Backend & architecture',
      ai: 'AI systems I build',
      aitools: 'Agents and models I work with',
      cloud: 'Cloud, hosting & DevOps',
      security: 'Security & offensive tooling',
      data: 'Data',
      frontend: 'Frontend & mobile',
      web: 'CMS, e-commerce & web',
      media: 'Games, animation & multimedia',
      tools: 'Tooling & practice',
      frontier: 'Frontiers I explore',
    },
    pseint: 'PSeInt (joke)',
  },
  education: {
    heading: 'Education:',
    university: 'Autonomous University of Zacatecas',
    years: '(2020 - 2024)',
    body: 'I completed my Software Engineering degree at the Academic Unit of Electrical Engineering at the Autonomous University of Zacatecas, where I consolidated the technical foundation of systems development and the judgement required to build high-quality solutions grounded in sound engineering practice.',
    description: 'The Autonomous University of Zacatecas Francisco García Salinas (UAZ) is the leading higher education institution in Zacatecas, Mexico. It is organized into academic areas and units focused on teaching, research, extension, and academic management. UAZ serves students from Zacatecas and other states in fields such as biology, humanities, engineering, languages, arts, agriculture, and exact sciences. The university actively promotes science, technology, and innovation.',
  },
  certifications: {
    heading: 'Certifications & Achievements:',
    icp: 'Internet Computer Certification (2023)',
    somece: 'INTERNATIONAL CONGRESS SOMECE 2024',
  },
  experience: {
    radii: {
      company: 'Radii Manufacturing',
      period: 'Jul 2025 — Present',
      title: 'Founding Software Engineer',
      body: "Founding Software Engineer at Radii Manufacturing, a startup automating manufacturing through an AI-powered platform and a network of manufacturers, and one of the most promising startups in Latin America. I define the company's technical direction alongside the founding team — the stack, the architecture, and the engineering practices the platform is built on — turning an early-stage product into a system the business can scale on. In the first year: the platform’s entire infrastructure migrated in two weeks, the automatic quoting engine built on a mathematical pricing algorithm — which took an account manager’s average quoting time from five days to one — and 80% of the operations team’s recurring work automated with AI agents.",
    },
    freelance: {
      company: 'Freelance',
      period: 'Jan 2025 — Present',
      title: 'Software Engineer',
      body: 'I build software for clients as an independent engineer, within multidisciplinary teams — design, domain experts and other engineers — to translate business problems into systems that are actually adopted. Technology selection responds to the requirements of the problem and is documented through trade-off analysis, with full accountability for the result from initial gathering through to delivery.',
    },
    labsol: {
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      title: 'Software Developer Intern',
      body: 'Part of the Free Software Laboratory team at COZCYT, where I led two projects delivered to the Autonomous University of Zacatecas and the Zacatecan Council of Science, Technology and Innovation. Owning delivery end to end sharpened my full-stack development, requirements analysis, software design, testing, and project management.',
    },
    case: {
      company: 'Centre for Learning and Student Services',
      period: '2022 — 2023',
      title: 'Peer Mentor · Student Volunteer',
      body: 'Two years volunteering at CASE while I was an undergraduate myself, helping other Software Engineering and Computer Engineering students through the subjects giving them trouble: Algebra, Calculus, Object-Oriented Programming, Data Structures, and Discrete Mathematics. More than thirty students came through those sessions. It was the student community looking after itself, and it is where I learned to hand knowledge over rather than just hold it.',
    },
  },
  projects: {
    badge: 'Featured Projects & Portfolio',
    pbienestar: {
      title: 'Appointment Scheduling System',
      label: 'Punto Bienestar',
      body: "Appointment scheduling system for a professional psychological care clinic. Administrators manage specialists' availability and review appointment details before confirming, keeping clinical judgement in the loop rather than handing scheduling to an automated queue. The system notifies patients, specialists, and administrators by email as appointments change, and writes confirmed appointments into users' Google Calendars through the Calendar API, so reminders operate within the scheduling tool they already use. Access is protected with JSON Web Token authentication.",
    },
    cosiap: {
      title: 'Sistema de Apoyos COZCyT',
      label: 'Cosiap',
      body: 'Grant management platform for the Zacatecan Council of Science, Technology and Innovation. Before it, every application for public research and entrepreneurship funding was submitted on paper. The platform moved the process online: applicants upload their documentation digitally and administrators manage the applications in one system. Built during my internship at LABSOL Network as part of the delivery team.',
    },
    cargas: {
      title: 'Sistema de Cargas UAIE',
      label: 'Cargas',
      body: "Course-load and scheduling platform for the Faculty of Electrical Engineering at the Autonomous University of Zacatecas. Program coordinators build each semester's timetable, assign professors, and keep course information in one place, with the system catching conflicts between professors and class groups before a timetable is published — the problem the platform was commissioned to solve. Built during my social service with LABSOL Network.",
    },
    bazarSol: {
      title: 'Bazar Sol',
      label: 'Bazar Sol',
      body: 'E-commerce platform for a clothing retailer, built as a university project. Administrators own the catalogue: adding stock, adjusting prices, and maintaining product descriptions. Customers consult the catalogue, keep a private favourites list, and add items to a cart to reserve them.',
    },
    rentazac: {
      title: 'RentaZac',
      label: 'RentaZac',
      body: 'Rental listings platform for the student community in Zacatecas. Students and landlords in the city were coordinating housing through scattered social media posts; RentaZac centralises listing and search in a dedicated platform. Built as a university project.',
    },
  },
};

export default en;
