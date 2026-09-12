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
    interestsLede: 'No son pasatiempos de relleno. Cada uno entrena algo que termina apareciendo en cómo resuelvo problemas — y varios de ellos deciden directamente qué construyo y por qué.',
    interests: {
      innovation: {
        title: 'Innovación constante y prospectiva',
        body: 'Me empapo de información todos los días: documentales, podcasts, lectura científica y de negocio, papers y seguimiento de tecnología emergente. No es consumo pasivo. Es de donde sale saber qué se está volviendo posible antes de que sea obvio, y lo que me permite elegir tecnología por criterio en lugar de por moda.',
        tags: [
          'Documentales',
          'Podcasts',
          'Lectura científica',
          'Lectura de negocio',
          'Tecnología emergente',
          'Prospectiva tecnológica',
        ],
      },
      business: {
        title: 'Negocio, startups y capital',
        body: 'Dirijo dos empresas propias, y eso obliga a aprender el otro lado del problema: cómo se financia lo que se construye, qué convierte una idea en un negocio y no solo en un sistema, y cuándo la decisión correcta no es la técnica. Me interesan el capital de riesgo, el levantamiento de fondos y cómo se estructura una compañía que tiene que sobrevivir a su primer producto.',
        tags: [
          'Startups',
          'Fundraising',
          'Venture capital',
          'Estrategia de producto',
          'Modelos de negocio',
          'Fintech e inversiones',
        ],
      },
      science: {
        title: 'Automatización, ciencia y fronteras físicas',
        body: 'Veo un proceso y lo primero que pienso es cómo se automatiza, o qué tecnología habría que inventar para que deje de hacerse a mano. Es la misma curiosidad que me llevó al software, y nunca se quedó en la pantalla: sigo de cerca la robótica, la mecatrónica y el hardware —donde el código deja de ser abstracto y tiene que mover algo— y leo sobre nanotecnología, computación cuántica, aeronáutica y astronomía, los lugares donde la ingeniería todavía choca con límites físicos de verdad.',
        tags: [
          'Automatización de procesos',
          'Robótica',
          'Mecatrónica',
          'Hardware y electrónica',
          'Nanotecnología',
          'Computación cuántica',
          'Aeronáutica y espacio',
          'Astronomía',
        ],
      },
      arts: {
        title: 'El arte, en todas sus formas',
        body: 'El arte no es un descanso del trabajo técnico: es la otra mitad de cómo pienso. La música, la literatura, el cine, el teatro, la moda, el dibujo y la animación los sigo con la misma seriedad con la que sigo la ingeniería. Escribo novelas y canciones, llevo proyectos musicales propios y dibujo. Ahí se entrenan la estructura, el ritmo y el criterio estético — tres cosas que después no se pueden improvisar frente a una interfaz.',
        tags: [
          'Música',
          'Literatura',
          'Escritura de novela',
          'Composición',
          'Dibujo digital',
          'Animación',
          'Videojuegos',
          'Cine',
          'Teatro',
          'Moda',
        ],
      },
      sports: {
        title: 'Deporte, disciplina y movimiento',
        body: 'Entreno en el gimnasio de forma constante y hago parkour, y cualquier deporte de equipo me resulta interesante por la coordinación que exige. Los deportes extremos —BMX, skate— me atraen por la misma razón que la ingeniería: hay que leer el terreno, calcular el riesgo y comprometerse con la decisión. De ahí salen la constancia, la resiliencia y la convicción de que un rendimiento sostenible vale más que un pico.',
        tags: [
          'Gimnasio',
          'Parkour',
          'Deportes de equipo',
          'BMX',
          'Skate',
          'Deportes extremos',
          'Constancia y resiliencia',
        ],
      },
      culture: {
        title: 'Gastronomía, viajes y otras culturas',
        body: 'Viajar y comer bien no son el objetivo: son la excusa. Lo que busco es entender cómo vive y piensa gente que no creció donde yo, porque cada cultura resuelve los mismos problemas de formas que a mí no se me habrían ocurrido. Esa curiosidad es exactamente la misma que uso al entrar a un dominio técnico que no conozco, y por eso enriquece el trabajo en lugar de competir con él.',
        tags: [
          'Culturas del mundo',
          'Gastronomía',
          'Viajes',
          'Aprendizaje intercultural',
          'Historia y sociedad',
        ],
      },
    },
  },
};

export default cvEs;
