import brandsEn from './brands.en';
import rolesEn from './roles.en';
import reposEn from './repos.en';
import cvEn from './cv.en';

const en = {
  ...brandsEn,
  ...cvEn,
  ...reposEn,
  ...rolesEn,
  nav: {
    about: 'About Me',
    projects: 'Projects',
    experience: 'Experience',
    ventures: 'Ventures',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },
  common: {
    language: 'Language',
    back: 'Back',
    backToExperience: 'Back to Experience',
    backToVentures: 'Back to Ventures',
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
    bio: 'Full-stack software engineer building backend services, cloud infrastructure, and AI systems. At Radii Manufacturing I design the services behind core manufacturing workflows, build cloud workers on AWS and Azure that automate data processing, develop AI agents with LangGraph and LangChain, and maintain the CI/CD pipelines and observability that hold a microservices platform together. I work across Python, Java, JavaScript and C#, with Django, Spring Boot and React, and my interests run to distributed systems, event-driven architecture, LLM systems and RAG, and platform engineering. I trained as a software engineer at the Autonomous University of Zacatecas. What drives me is continuous innovation — using emerging technology to shape where the software industry is going, and combining engineering with design and business thinking to build solutions that last.',
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
      ai: 'AI, agents & Machine Learning',
      aitools: 'AI tooling & coding agents',
      cloud: 'Cloud, platform & DevOps',
      data: 'Data',
      frontend: 'Frontend & mobile',
      tools: 'Tooling & practice',
      frontier: 'Frontiers I explore',
    },
  },
  education: {
    heading: 'Education:',
    university: 'Autonomous University of Zacatecas',
    years: '(2020 - 2024)',
    body: 'I obtained my academic training as a Software Engineer at the Academic Unit of Electrical Engineering at the Autonomous University of Zacatecas. It was there that I nurtured my curiosity and creativity in software system development, in addition to acquiring solid knowledge for developing high-quality solutions, always supported by best practices.',
    description: 'The Autonomous University of Zacatecas Francisco García Salinas (UAZ) is the leading higher education institution in Zacatecas, Mexico. It is organized into academic areas and units focused on teaching, research, extension, and academic management. UAZ serves students from Zacatecas and other states in fields such as biology, humanities, engineering, languages, arts, agriculture, and exact sciences. The university actively promotes science, technology, and innovation.',
  },
  certifications: {
    heading: 'Certifications & Achievements:',
    icp: 'Internet Computer Certification (2023)',
    somece: 'INTERNATIONAL CONGRESS SOMECE 2024',
  },
  experience: {
    badge: '2+ Years of Experience',
    radii: {
      company: 'Radii Manufacturing',
      period: 'Jul 2025 — Present',
      title: 'Founding Software Engineer',
      body: "Founding Software Engineer at Radii Manufacturing, a startup automating manufacturing through an AI-powered platform and a network of manufacturers, and one of the most promising startups in Latin America. I define the company's technical direction alongside the founding team — the stack, the architecture, and the engineering practices the platform is built on — turning an early-stage product into a system the business can scale on.",
    },
    freelance: {
      company: 'Freelance',
      period: 'Jan 2025 — Present',
      title: 'Software Engineer',
      body: 'I build software for clients as an independent engineer, working inside multidisciplinary teams — designers, domain experts, and other engineers — to turn business problems into systems people actually use. I pick modern, well-supported technology to fit each problem rather than out of habit, and stay accountable for the result from the first conversation through to delivery.',
    },
    labsol: {
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      title: 'Software Developer Intern',
      body: 'Part of the Free Software Laboratory team at COZCYT, where I led two projects delivered to the Autonomous University of Zacatecas and the Zacatecan Council of Science, Technology and Innovation. Owning delivery end to end sharpened my full-stack development, requirements analysis, software design, testing, and project management.',
    },
  },
  projects: {
    badge: 'Featured Projects & Portfolio',
    pbienestar: {
      title: 'Appointment Scheduling System',
      label: 'Punto Bienestar',
      body: "Appointment scheduling system for a professional psychological care clinic. Administrators manage specialists' availability and review appointment details before confirming, keeping clinical judgement in the loop rather than handing scheduling to an automated queue. The system notifies patients, specialists, and administrators by email as appointments change, and writes confirmed appointments into users' Google Calendars through the Calendar API, so reminders arrive where people already look. Access is protected with JSON Web Token authentication.",
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
      body: 'E-commerce platform for a clothing retailer, built as a university project. Administrators own the catalogue: adding stock, adjusting prices, and maintaining product descriptions. Customers browse it, keep a private favourites list, and add items to a cart to reserve them for later.',
    },
    rentazac: {
      title: 'RentaZac',
      label: 'RentaZac',
      body: 'Rental listings platform for the student community in Zacatecas. Students and landlords in the city were coordinating housing through social media posts; RentaZac gives both sides a dedicated place to publish and browse rentals instead. Built as a university project.',
    },
  },
};

export default en;
