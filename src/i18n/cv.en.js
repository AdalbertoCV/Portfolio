// English mirror of cv.es.js. Same key shape, same array lengths — the
// dictionary test walks both and fails on any key present in one and not the
// other, array indices included.

const cvEn = {
  cv: {
    badge: 'Résumé',
    role: 'Full-Stack Software Engineer',
    location: 'Zacatecas, Mexico',
    availability: 'Open to collaborate',
    contactLabel: 'Contact',

    profileTitle: 'Professional profile',
    profileKicker: 'Who I am',
    profileBody: 'Full-stack software engineer building backend services, cloud infrastructure and AI systems. At Radii Manufacturing I design the services behind core manufacturing workflows, build cloud workers on AWS and Azure, develop AI agents with LangGraph and LangChain, and maintain the CI/CD pipelines and observability of a microservices platform.',
    profileBody2: 'I work across Python, Java, JavaScript and C#, with Django, Spring Boot and React, and my interests run to distributed systems, event-driven architecture, LLM systems and RAG, and platform engineering. What drives me is continuous innovation: using emerging technology to shape where the software industry is going, and combining engineering with design and business thinking to build solutions that last.',

    nowKicker: 'Right now',
    nowTitle: 'Four fronts in parallel',
    now: {
      radii: {
        label: 'Founding Software Engineer',
        org: 'Radii Manufacturing',
        body: 'AI-powered manufacturing platform. Backend services, cloud workers, agents and platform.',
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
    skillsLede: 'Chosen for the problem, not out of habit. What I use daily is at the top; what I explore is at the end.',

    practiceKicker: 'Engineering practice',
    practiceTitle: 'How I work, not just what with',
    practiceLede: 'A stack can be learned. What separates a system that holds from one that does not is these decisions.',
    practice: {
      systems: 'Systems design and architecture',
      systemsItems: [
        'System design and architecture thinking',
        'Technical decision-making and trade-off analysis',
        'Data modeling and consistency trade-offs',
        'Scalability and capacity planning',
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
      english: { name: 'English', level: 'C1 — Advanced' },
    },

    certsKicker: 'Certifications',
    certsTitle: 'Certifications and achievements',
    certs: {
      icp: { name: 'Web 3.0 — Internet Computer', issuer: 'ICP Hub Latam', year: '2023' },
      langchain: { name: 'AI Agents with LangChain', issuer: 'Platzi', year: '2025' },
      santander: { name: 'Emerging Technologies', issuer: 'Santander', year: '2024' },
      somece: { name: 'SOMECE International Congress', issuer: 'SOMECE', year: '2024' },
    },
    certsProofLabel: 'Credentials',
    certsProofHint: 'Tap a credential to enlarge it',

    interestsKicker: 'Interests',
    interestsTitle: 'Where the way I think comes from',
    interestsLede: 'Not filler hobbies. Each one trains something that ends up showing in how I solve problems — and several of them decide outright what I build and why.',
    interests: {
      innovation: {
        title: 'Constant innovation and foresight',
        body: 'I soak up information every day: documentaries, podcasts, scientific and business reading, papers, and tracking emerging technology. It is not passive consumption. It is where knowing what is becoming possible before it is obvious comes from, and what lets me choose technology on judgement rather than on fashion.',
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
        body: 'I run two companies of my own, and that forces you to learn the other half of the problem: how what you build gets funded, what turns an idea into a business rather than just a system, and when the right call is not the technical one. I follow venture capital, fundraising, and how a company gets structured to survive its own first product.',
        tags: [
          'Startups',
          'Fundraising',
          'Venture capital',
          'Product strategy',
          'Business models',
          'Fintech and investing',
        ],
      },
      science: {
        title: 'Automation, science and physical frontiers',
        body: 'I look at a process and the first thing I think is how it gets automated, or what technology would have to be invented for it to stop being done by hand. It is the same curiosity that pulled me into software, and it never stayed on the screen: I follow robotics, mechatronics and hardware closely — where code stops being abstract and has to move something — and I read about nanotechnology, quantum computing, aeronautics and astronomy, the places where engineering still runs into real physical limits.',
        tags: [
          'Process automation',
          'Robotics',
          'Mechatronics',
          'Hardware and electronics',
          'Nanotechnology',
          'Quantum computing',
          'Aeronautics and space',
          'Astronomy',
        ],
      },
      arts: {
        title: 'Art, in all its forms',
        body: 'Art is not a break from the technical work: it is the other half of how I think. Music, literature, cinema, theatre, fashion, drawing and animation are things I follow with the same seriousness I give engineering. I write novels and songs, run musical projects of my own, and draw. That is where structure, rhythm and aesthetic judgement are trained — three things that cannot be improvised later in front of an interface.',
        tags: [
          'Music',
          'Literature',
          'Novel writing',
          'Composition',
          'Digital drawing',
          'Animation',
          'Games',
          'Cinema',
          'Theatre',
          'Fashion',
        ],
      },
      sports: {
        title: 'Sport, discipline and movement',
        body: 'I train at the gym consistently and do parkour, and any team sport interests me for the coordination it demands. Extreme sports — BMX, skate — pull me in for the same reason engineering does: you have to read the terrain, price the risk and commit to the decision. That is where consistency, resilience and the conviction that sustainable performance beats a peak all come from.',
        tags: [
          'Gym',
          'Parkour',
          'Team sports',
          'BMX',
          'Skate',
          'Extreme sports',
          'Consistency and resilience',
        ],
      },
      culture: {
        title: 'Food, travel and other cultures',
        body: 'Travelling and eating well are not the point: they are the excuse. What I am after is understanding how people who did not grow up where I did live and think, because every culture solves the same problems in ways that would never have occurred to me. That curiosity is exactly the one I use walking into a technical domain I do not know, which is why it enriches the work rather than competing with it.',
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
