// The CV, in full. The About page is this document — profile, focus, skills,
// engineering practice, education, languages, certifications and interests —
// so that the page and the PDF never drift apart.
//
// List entries are real arrays, read through `tl()` rather than `t()`: the
// number of chips in a row is content, and it should be editable here instead
// of being mirrored by a matching array of keys in the component.

const cvEs = {
  cv: {
    badge: 'Currículum',
    role: 'Full-Stack Software Engineer',
    location: 'Zacatecas, México',
    availability: 'Abierto a colaborar',
    contactLabel: 'Contacto',

    profileTitle: 'Perfil profesional',
    profileKicker: 'Quién soy',
    profileBody: 'Ingeniero de software full-stack que construye servicios backend, infraestructura en la nube y sistemas de IA. En Radii Manufacturing diseño los servicios que sostienen los flujos centrales de manufactura, desarrollo workers en la nube sobre AWS y Azure, creo agentes de IA con LangGraph y LangChain, y mantengo los pipelines de CI/CD y la observabilidad de una plataforma de microservicios.',
    profileBody2: 'Trabajo con Python, Java, JavaScript y C#, sobre Django, Spring Boot y React, y mis intereses van hacia los sistemas distribuidos, la arquitectura orientada a eventos, los sistemas LLM y RAG, y la ingeniería de plataforma. Lo que me mueve es la innovación continua: usar tecnología emergente para influir en hacia dónde va la industria del software, y combinar ingeniería, diseño y visión de negocio para construir soluciones que perduren.',

    nowKicker: 'Ahora mismo',
    nowTitle: 'Cuatro frentes en paralelo',
    now: {
      radii: {
        label: 'Founding Software Engineer',
        org: 'Radii Manufacturing',
        body: 'Plataforma de manufactura con IA. Servicios backend, workers en la nube, agentes y plataforma.',
        cta: 'Ver la historia',
      },
      ventures: {
        label: 'CEO · CTO',
        org: 'Moonphase y StackSelect',
        body: 'Dos empresas propias: automatización e I+D en una, formación y colocación de talento en la otra.',
        cta: 'Ver Ventures',
      },
      contract: {
        label: 'Software Engineer',
        org: 'Evodeps y clientes propios',
        body: 'Desarrollo a medida, prototipos e implementaciones tecnológicas dentro de equipos interdisciplinarios.',
        cta: 'Ver trayectoria',
      },
    },

    skillsKicker: 'Stack',
    skillsTitle: 'Tecnologías con las que construyo',
    skillsLede: 'Elegidas por el problema, no por costumbre. Lo que uso a diario está arriba; lo que exploro, al final.',

    practiceKicker: 'Práctica de ingeniería',
    practiceTitle: 'Cómo trabajo, no solo con qué',
    practiceLede: 'Un stack se aprende. Lo que distingue un sistema que aguanta de uno que no son estas decisiones.',
    practice: {
      systems: 'Diseño de sistemas y arquitectura',
      systemsItems: [
        'Diseño de sistemas y pensamiento arquitectónico',
        'Decisiones técnicas y análisis de trade-offs',
        'Modelado de datos y trade-offs de consistencia',
        'Escalabilidad y planeación de capacidad',
        'Análisis de modos de falla y riesgo',
        'Confiabilidad y tolerancia a fallos',
        'Análisis de incidentes y post-mortems',
        'Gestión de deuda técnica',
        'Observabilidad y monitoreo en producción',
        'Seguridad por diseño',
        'Ingeniería guiada por métricas y experimentación',
        'Análisis y optimización de rendimiento',
        'Diseño de solución de punta a punta',
      ],
      delivery: 'Entrega y equipo',
      deliveryItems: [
        'Trabajo en equipo',
        'Metodología SCRUM',
        'Gestión de proyectos',
        'Documentación de software',
        'Equipos interdisciplinarios',
        'Prototipado rápido y PoC',
        'Mentoría y capacitación',
        'Mentalidad de ownership',
      ],
      breadth: 'Fondo multidisciplinario',
      breadthItems: [
        'Mentalidad emprendedora',
        'Estrategia de producto y tecnología',
        'Visión de marketing digital y estrategias de venta',
        'Conocimiento en fintech e inversiones',
        'Robótica y manufactura avanzada',
        'Fundamentos de redes y hardware',
        'Ciencias exactas: matemáticas, física, química, estadística',
        'Investigación científica y literaria',
        'Ciberseguridad y hacking ético',
        'Mecánica básica e integraciones de software',
      ],
    },

    educationKicker: 'Formación',
    languagesKicker: 'Idiomas',
    languages: {
      spanish: { name: 'Español', level: 'Nativo' },
      english: { name: 'Inglés', level: 'C1 — Avanzado' },
    },

    certsKicker: 'Certificaciones',
    certsTitle: 'Certificaciones y logros',
    certs: {
      icp: { name: 'Web 3.0 — Internet Computer', issuer: 'ICP Hub Latam', year: '2023' },
      langchain: { name: 'Agentes de IA con LangChain', issuer: 'Platzi', year: '2025' },
      santander: { name: 'Tecnologías Emergentes', issuer: 'Santander', year: '2024' },
      somece: { name: 'Congreso Internacional SOMECE', issuer: 'SOMECE', year: '2024' },
    },
    certsProofLabel: 'Constancias',
    certsProofHint: 'Toca una constancia para ampliarla',

    interestsKicker: 'Intereses',
    interestsTitle: 'De dónde sale la forma en que pienso',
    interestsLede: 'No son pasatiempos de relleno: cada uno entrena algo que termina apareciendo en cómo resuelvo problemas.',
    interests: {
      innovation: {
        title: 'Innovación interdisciplinaria y prospectiva tecnológica',
        body: 'Exploración continua de tecnología emergente, y la integración de ingeniería, arte y negocio para construir soluciones orientadas al futuro.',
      },
      arts: {
        title: 'Música, artes y expresión visual',
        body: 'Pensamiento creativo, reconocimiento de patrones, abstracción y sensibilidad de diseño aplicados a la resolución de problemas.',
      },
      literature: {
        title: 'Literatura, series culturales y documentales',
        body: 'Lectura analítica, pensamiento crítico y un interés profundo en historia, sociedad y perspectivas globales.',
      },
      gastronomy: {
        title: 'Gastronomía, experiencias culturales y viaje',
        body: 'Exploración impulsada por la curiosidad: cultura culinaria, creatividad y aprendizaje entre culturas.',
      },
      sports: {
        title: 'Deporte y actividades sociales',
        body: 'Constancia, resiliencia, trabajo en equipo, participación comunitaria y una mentalidad de rendimiento sostenible.',
      },
    },
  },
};

export default cvEs;
