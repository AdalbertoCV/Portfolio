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
    // Three seats held at once. This is the line the page is aimed at — it
    // replaced a count of years, which is the weakest number on the page and
    // was occupying the best space on it.
    standing: 'Founding Engineer · CTO · Fundador',
    contactLabel: 'Contacto',

    profileTitle: 'Perfil profesional',
    profileKicker: 'Quién soy',
    profileBody: 'Ingeniero de software full-stack que construye servicios backend, infraestructura en la nube y sistemas de IA. En Radii Manufacturing diseño los servicios que sostienen los flujos centrales de manufactura, desarrollo workers en la nube sobre AWS y Azure, creo agentes de IA con LangGraph y LangChain, y mantengo los pipelines de CI/CD y la observabilidad de una plataforma de microservicios.',
    profileBody2: 'Trabajo con Python, Java, JavaScript, TypeScript, C#, Go y PHP, sobre Django, Spring Boot, Laravel y React. Mis áreas de interés técnico son los sistemas distribuidos, la arquitectura orientada a eventos, los sistemas LLM y RAG, y la ingeniería de plataforma. Mi enfoque profesional combina la adopción rigurosa de tecnología emergente con criterios de ingeniería, diseño y negocio, orientado a construir sistemas sostenibles en el tiempo.',

    nowKicker: 'Ahora mismo',
    nowTitle: 'Cuatro frentes simultáneos',
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
    skillsLede: 'Seleccionadas en función del problema y no por familiaridad. El listado avanza de uso cotidiano a áreas en exploración.',

    practiceKicker: 'Práctica de ingeniería',
    practiceTitle: 'Cómo trabajo, no solo con qué',
    practiceLede: 'Un stack se aprende; el criterio con el que se toman estas decisiones es lo que determina si un sistema resiste en producción.',
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
    interestsLede: 'Cada uno desarrolla una capacidad que se traslada al trabajo técnico, y varios de ellos influyen directamente en qué construyo y con qué criterio.',
    interests: {
      innovation: {
        title: 'Innovación constante y prospectiva',
        body: 'Mantengo una rutina diaria de actualización: documentales, podcasts, publicaciones científicas y de negocio, y seguimiento sistemático de tecnología emergente. El objetivo es identificar qué capacidades se vuelven viables antes de que se generalicen, y sostener decisiones tecnológicas sobre criterio verificable en lugar de sobre tendencia.',
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
        body: 'Dirigir dos empresas propias exige comprender la dimensión que no es técnica: cómo se financia lo que se construye, qué distingue un negocio viable de un sistema bien hecho, y en qué casos la decisión correcta no corresponde al criterio de ingeniería. Sigo de cerca el capital de riesgo, los procesos de levantamiento de fondos y la estructuración de compañías más allá de su primer producto.',
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
        body: 'Analizo los procesos que observo en términos de automatización: qué parte es sistematizable y qué tecnología haría falta para eliminar la intervención manual. Ese mismo criterio se extiende más allá del software hacia la robótica, la mecatrónica y el hardware, donde el código debe producir un efecto físico verificable. Sigo además la nanotecnología, la computación cuántica, la aeronáutica y la astronomía, campos donde la ingeniería opera contra límites físicos reales.',
        body2: 'Lo que sostiene ese interés es un cambio en la naturaleza del problema: el software que opera sobre materia no admite la corrección diferida. Un sistema embebido o de control trabaja bajo restricciones de tiempo real, tolerancia a fallos y verificación previa al despliegue, porque no existe la opción de parchear en producción — la misma exigencia que impone un instrumento en órbita o un sistema de vuelo. En el extremo opuesto, la computación cuántica y la nanotecnología reconstruyen las capas de abstracción sobre las que trabajo hoy: un modelo de cómputo con su propio régimen de error y su propia clase de algoritmos, y una escala en la que el material deja de comportarse como lo describe la ingeniería clásica. Sigo ambos frentes porque determinan qué será construible en la próxima década y con qué herramientas.',
        tags: [
          'Automatización de procesos',
          'Robótica',
          'Mecatrónica',
          'Hardware y electrónica',
          'Sistemas embebidos',
          'Control y tiempo real',
          'Sistemas autónomos',
          'Nanotecnología',
          'Computación cuántica',
          'Algoritmos cuánticos',
          'Aeronáutica y espacio',
          'Astronomía',
        ],
      },
      arts: {
        title: 'El arte, en todas sus formas',
        body: 'La formación artística ocupa un lugar equivalente al técnico en mi criterio profesional. Sigo con rigor la música, la literatura, el cine, el teatro, la moda, el dibujo y la animación. En el plano práctico escribo novela y canción, y desarrollo proyectos musicales propios. Esa disciplina desarrolla el manejo de la estructura, el ritmo y el criterio estético, competencias directamente aplicables al diseño de interfaces y de producto.',
        body2: 'El videojuego y los medios inmersivos concentran mi atención de forma particular: son la única disciplina donde narrativa, composición musical, arte visual y arquitectura de software se resuelven en un mismo artefacto, y donde la decisión estética es indistinguible de la decisión técnica. Estudio el diseño de sistemas de juego, los motores gráficos y el trabajo en tiempo real en 3D, junto con la realidad virtual y aumentada como los formatos que están redefiniendo la relación entre interfaz, espacio y usuario.',
        tags: [
          'Música',
          'Literatura',
          'Escritura de novela',
          'Composición',
          'Dibujo digital',
          'Animación',
          'Videojuegos',
          'Diseño de sistemas de juego',
          'Motores gráficos y 3D',
          'Realidad virtual y aumentada',
          'Medios inmersivos',
          'Cine',
          'Teatro',
          'Moda',
        ],
      },
      sports: {
        title: 'Deporte y disciplina física',
        body: 'Mantengo una rutina de entrenamiento constante. Me interesan los deportes de equipo por la coordinación y la lectura de situación que demandan, y disciplinas como el parkour, el BMX y el skate por la relación que establecen entre riesgo calculado y ejecución precisa. De esa práctica provienen la constancia, la resiliencia y el criterio de que el rendimiento sostenido supera al pico aislado.',
        tags: [
          'Entrenamiento de fuerza',
          'Deportes de equipo',
          'Parkour',
          'BMX',
          'Skate',
          'Deportes extremos',
          'Constancia y resiliencia',
        ],
      },
      culture: {
        title: 'Gastronomía, viajes y otras culturas',
        body: 'El viaje y la gastronomía funcionan como vía de acceso a otras culturas. El interés real está en observar cómo poblaciones con contextos distintos resuelven problemas equivalentes, con soluciones que no surgirían desde un solo marco de referencia. Es el mismo ejercicio que aplico al incorporarme a un dominio técnico desconocido, y por eso constituye un complemento del trabajo y no una distracción.',
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
