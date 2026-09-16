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
    // La línea bajo el nombre. "Full-Stack Software Engineer" es el título que
    // comparten doscientas mil personas; esta es la única cosa de la página que
    // nadie más puede escribir.
    role: 'Founding Software Engineer · Fundador de dos empresas',
    claim:
      'Construyo el backend, los workers en la nube y los agentes de IA detrás de la plataforma de Radii Manufacturing: el software que convierte un archivo CAD en una pieza cotizada, fabricada y trazable. En paralelo construyo Moonphase y StackSelect.',
    location: 'Zacatecas, México',
    availability: 'Abierto a colaborar',
    // Three seats held at once. This is the line the page is aimed at — it
    // replaced a count of years, which is the weakest number on the page and
    // was occupying the best space on it.
    standing: 'Backend · Nube · Sistemas de IA',
    contactLabel: 'Contacto',

    profileTitle: 'Perfil profesional',
    profileKicker: 'Quién soy',
    profileBody: 'Ingeniero de software full-stack que construye servicios backend, infraestructura en la nube y sistemas de IA. En Radii Manufacturing diseño los servicios que sostienen los flujos centrales de manufactura, desarrollo workers en la nube sobre AWS y Azure, creo agentes de IA con LangGraph y LangChain, y mantengo los pipelines de CI/CD y la observabilidad de una plataforma de microservicios. Migré la infraestructura completa de la plataforma en dos semanas y construí su cotizador automático: un algoritmo matemático de precios que llevó el tiempo promedio de cotización de un account manager de cinco días a uno.',
    profileBody2: 'Trabajo con Python, Java, JavaScript, TypeScript, C#, Go y PHP, sobre Django, Spring Boot, Laravel y React. Mis áreas de interés técnico son los sistemas distribuidos, la arquitectura orientada a eventos, los sistemas LLM y RAG, y la ingeniería de plataforma. Mi enfoque profesional combina la adopción rigurosa de tecnología emergente con criterios de ingeniería, diseño y negocio, orientado a construir sistemas sostenibles en el tiempo.',

    nowKicker: 'Ahora mismo',
    // Sin número en el título: decía "cuatro", la retícula renderiza tres
    // tarjetas, y la primera afirmación de la página que la página misma
    // contradice sale cara. Nombrarlos dice más que contarlos.
    nowTitle: 'Radii, dos empresas propias y clientes independientes',
    now: {
      radii: {
        label: 'Founding Software Engineer',
        org: 'Radii Manufacturing',
        body: 'Plataforma de manufactura con IA. Servicios backend, workers en la nube, agentes y plataforma. Cotización de cinco días a uno; 80% de la operación automatizada.',
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
    skillsLede: 'Seleccionadas en función del problema y no por familiaridad. El listado avanza de uso cotidiano a áreas en exploración; elige la parte por la que viniste.',
    skillsReceipt: 'proyectos con',
    foldItems: 'elementos — abre para verlos',
    skillsExpandAll: 'Abrir todos los grupos',
    skillsCollapseAll: 'Cerrar todos los grupos',

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
        'Arquitectura SaaS multi-tenant',
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
        'Producto SaaS: suscripciones, medición de uso y unit economics',
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

    readingKicker: 'Lectura',
    readingTitle: 'Literatura recomendada',
    readingLede:
      'Los libros que le paso a quien pregunta por dónde empezar, y los que vuelvo a abrir.',
    readingGroups: {
      ai: 'IA y LLMs',
      craft: 'Oficio de ingeniería',
      leadership: 'Liderazgo y equipos',
    },
    readingExpandAll: 'Abrir todas las estanterías',
    readingCollapseAll: 'Cerrar todas las estanterías',

    certsKicker: 'Certificaciones',
    certsTitle: 'Certificaciones y logros',
    certs: {
      icp: {
        name: 'Web 3.0 — Internet Computer',
        issuer: 'ICP Hub Latam',
        year: '2023',
        body: 'Programa ICP Developer de la comunidad ICP Hub Latam, cursado del 11 al 18 de septiembre de 2023: entrenamiento enfocado a la capacitación de desarrolladores en el protocolo de Internet Computer, la red sobre la que las aplicaciones se ejecutan on-chain en lugar de apoyarse en un servidor tradicional.',
      },
      langchain: {
        name: 'Agentes de IA con LangChain',
        issuer: 'Platzi',
        year: '2025',
        body: 'Formación en construcción de agentes con LangChain: herramientas, memoria y la orquestación que convierte a un modelo de lenguaje en algo que actúa y no solo responde. Es el mismo terreno sobre el que se apoya el trabajo con agentes en Radii, donde esas ideas corren en producción bajo LangGraph.',
      },
      santander: {
        name: 'Tecnologías Emergentes',
        issuer: 'Santander',
        year: '2024',
        body: 'Un recorrido por las tecnologías que están reconfigurando la industria —inteligencia artificial, datos, nube y sistemas distribuidos entre ellas— planteado desde qué cambia cada una para un negocio y no desde cómo se implementa. Es la única credencial de esta lista que trata sobre el criterio para adoptar una tecnología y no sobre construir con ella.',
      },
      somece: {
        name: 'Congreso Internacional SOMECE',
        issuer: 'SOMECE',
        year: '2024',
        body: 'Congreso internacional dedicado a la aplicación de la tecnología y la inteligencia artificial en la educación. Ahí presenté el artículo «Evaluación de aplicaciones de software para fomentar la participación parental en la educación», que forma parte de la memoria del congreso de ese año.',
        link: 'Leer el artículo publicado',
      },
    },
    educationCta: 'Ver la carrera a fondo',
    certsProofLabel: 'Constancias',
    certsProofHint: 'Toca una constancia para ampliarla',

    eventsLabel: 'Eventos',
    events: {
      rbr: {
        name: 'Release Before Ready',
        issuer: 'Querétaro',
        year: 'Agosto 2026',
        body: 'Serie de hackathones presentada por 500 Global y Descubre.vc, con formato de un solo día: construir algo y mostrarlo en público antes de que esté terminado, que es justo lo que le da nombre al evento. Lo que llevé ahí fue una migración completa de Azure a AWS, es decir mover la infraestructura de una nube a otra dentro de esa única jornada, entre configuración, refactorización y migración. La parte difícil no fue el traslado en sí sino los modelos de visión: entender qué cambia realmente al pasarlos de Azure AI Foundry a AWS Bedrock. Terminé el día con tres servicios de la arquitectura migrados.',
        body2: 'El mismo día hubo un reto paralelo de una hora, sin ganador y por puro gusto: componer música como código en Strudel. De ahí salió Nocturno 108, la pista con reproductor propio, pad de producción e instrumentos y el avatar sincronizado al pulso.',
        link: 'Ver el evento',
        projectLink: 'Ver en proyectos',
      },
      innovafest: {
        name: 'InnovaFest 2026',
        issuer: 'Querétaro Centro de Congresos',
        year: 'Agosto 2026',
        body: 'Encuentro nacional de innovación y emprendimiento: fondos de inversión, prototipos, conferencias y vinculación entre empresas, universidades y proyectos. Esta vez no fui de público. Estuve del otro lado del stand, representando a Radii y explicando en persona la plataforma que construyo: qué resuelve, cómo funciona y por qué una pieza fabricada puede rastrearse hasta el archivo CAD del que salió.',
        link: 'Ver el evento',
      },
      talentland: {
        name: 'Talent Land 2024',
        issuer: 'Guadalajara, Jalisco',
        year: '2024',
        body: 'El encuentro de talento y tecnología más grande de México: empresarios, emprendedores y gente que ya construyó algo presentando sus proyectos ante miles de jóvenes, con la idea explícita de empujarlos a construir los suyos. Fui como estudiante, que es exactamente para quien está hecho. Dos años después volví a un evento así, pero del otro lado del stand.',
        link: 'Ver el evento',
      },
    },

    interestsKicker: 'Intereses',
    interestsTitle: 'De dónde sale la forma en que pienso',
    interestsLede: 'Cada uno desarrolla una capacidad que se traslada al trabajo técnico, y varios de ellos influyen directamente en qué construyo y con qué criterio.',
    interests: {
      innovation: {
        title: 'Innovación constante y prospectiva',
        body: 'Mantengo una rutina diaria de actualización: documentales, podcasts, publicaciones científicas y de negocio, y seguimiento sistemático de tecnología emergente. El objetivo es identificar qué capacidades se vuelven viables antes de que se generalicen, y sostener decisiones tecnológicas sobre criterio verificable en lugar de sobre tendencia.',
        body2: 'Ese seguimiento solo sirve si termina en criterio de adopción. Evalúo una tecnología por su madurez real —estabilidad de la API, historial de cambios incompatibles, calidad de la documentación, tamaño del ecosistema y quién responde cuando algo falla— y no por la magnitud de su anuncio. Antes de comprometer una decisión construyo una prueba de concepto acotada al riesgo que quiero medir, porque adoptar demasiado pronto se paga en mantenimiento y demasiado tarde se paga en deuda de plataforma. La prospectiva tiene el mismo fin práctico: anticipar qué restricción de hoy —costo de cómputo, latencia, tamaño de modelo, regulación— deja de serlo en el horizonte de un proyecto, y qué decisiones de arquitectura conviene dejar reversibles hasta entonces.',
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
        body2: 'El mismo interés se extiende al e-commerce y a los mercados. Del lado del comercio es el detalle operativo de una tienda que tiene que vender: catálogo, checkout, pagos, conversión y los números que indican si algo de eso funcionó. Del lado de los mercados son las criptomonedas, los activos digitales y la inversión — clases de activo, riesgo, custodia y la infraestructura que los sostiene, que es el punto donde la lectura financiera y la de ingeniería dejan de ser temas separados.',
        tags: [
          'Startups',
          'Fundraising',
          'Venture capital',
          'Estrategia de producto',
          'Modelos de negocio',
          'Fintech e inversiones',
          'E-commerce',
          'Criptomonedas',
          'Activos digitales',
          'Mercados e inversión',
        ],
      },
      security: {
        title: 'Ciberseguridad y seguridad ofensiva',
        body: 'Estudio los sistemas también desde el lado del atacante, porque es la única forma de saber qué tan bien construido está lo que uno defiende. Trabajo en laboratorios controlados sobre las etapas que componen una prueba de intrusión: reconocimiento y escaneo de red, análisis de tráfico, revisión de aplicaciones web contra las clases de falla conocidas, y verificación de qué tan resistente es realmente una credencial.',
        body2: 'Lo que me interesa no es la herramienta sino el criterio que deja: una arquitectura se evalúa distinto cuando uno ya vio por dónde se rompe. Superficie de ataque, manejo de secretos, límites de confianza entre servicios y qué queda expuesto cuando un componente cede son decisiones de diseño, no una capa que se agrega al final.',
        tags: [
          'Pentesting',
          'Seguridad ofensiva',
          'Análisis de tráfico de red',
          'Seguridad web y OWASP',
          'Reconocimiento y escaneo',
          'Hardening',
          'Criptografía aplicada',
          'Modelado de amenazas',
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
      learning: {
        title: 'Cognición, aprendizaje y enseñanza',
        body: 'Me interesa cómo se aprende algo difícil, y por qué la mayoría de los materiales técnicos fallan en explicarlo. Sigo el trabajo sobre memoria, atención y carga cognitiva, y lo pongo a prueba en mi propio método de estudio: práctica de recuperación en lugar de relectura, repaso espaciado, y proyectos reales como criterio de que un concepto quedó entendido y no solo reconocido. La tecnología educativa es el terreno donde ese interés se vuelve investigación formal — es el tema del artículo que presenté en el Congreso Internacional SOMECE 2024.',
        body2: 'La otra mitad es la transmisión. Dirijo una empresa dedicada a formar y colocar talento técnico, doy mentoría y documento lo que construyo, y en los tres casos el problema es el mismo: ordenar un tema para alguien que todavía no tiene el modelo mental con el que uno ya lo lee. Eso obliga a distinguir entre lo esencial y lo accesorio, a nombrar las cosas por lo que hacen y a mostrar el camino de decisión y no solo el resultado. El efecto sobre la ingeniería es directo: una API, un mensaje de error y un documento de arquitectura son problemas de carga cognitiva antes que de estilo, y se diseñan igual que una explicación — por lo que el lector tiene que sostener en la cabeza para usarlos bien.',
        tags: [
          'Ciencia cognitiva',
          'Aprendizaje y memoria',
          'Repaso espaciado',
          'Carga cognitiva',
          'Tecnología educativa',
          'Mentoría y formación',
          'Gestión del conocimiento',
          'Divulgación técnica',
        ],
      },
      arts: {
        title: 'El arte, en todas sus formas',
        body: 'La formación artística ocupa un lugar equivalente al técnico en mi criterio profesional. Sigo con rigor la música, la literatura, el cine, el teatro, la moda, el dibujo y la animación. En el plano práctico escribo novela y canción, y desarrollo proyectos musicales propios. Esa disciplina desarrolla el manejo de la estructura, el ritmo y el criterio estético, competencias directamente aplicables al diseño de interfaces y de producto.',
        link: 'Escuchar los proyectos musicales',
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
        body2: 'El entrenamiento funciona además como modelo de trabajo: carga progresiva, medición sobre variables concretas y recuperación planificada, con la evidencia de que el sobreesfuerzo sin descanso degrada el resultado en lugar de mejorarlo. Es la misma lógica con la que sostengo un ritmo de entrega largo sin depender de sprints heroicos. Las disciplinas de riesgo aportan la otra mitad: en parkour o en BMX el salto se evalúa antes de ejecutarlo, se entrena por partes y se conserva una salida si la maniobra no sale — el equivalente exacto de acotar el radio de impacto de un cambio, probarlo por etapas y tener un plan de reversión antes de tocar producción.',
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
        body2: 'En la práctica profesional eso se traduce en dos cosas. La primera es el levantamiento de requerimientos: entender un dominio ajeno exige observar cómo trabaja realmente quien lo opera, en lugar de imponer el modelo mental con el que uno llegó — la diferencia entre un sistema que se adopta y uno que se queda sin usar. La segunda es la construcción de producto para más de un mercado: idioma, formato de fecha y moneda, normativa local, medios de pago y expectativas de uso no son un ajuste cosmético al final del proyecto, son decisiones de modelo de datos y de arquitectura que se toman al principio o se pagan después.',
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
