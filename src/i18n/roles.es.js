// The three roles that are not Radii, each with its own story page.
//
// Kept in a `roles` namespace of its own so it never collides with the short
// card copy the timeline uses (`experience.*` and `evodeps.*`). Same split
// Radii already has: the card says what the job was, the page says why it
// mattered.

const rolesEs = {
  roles: {
    // ------------------------------------------------------------- Evodeps
    evodeps: {
      badge: 'Software Engineer',
      company: 'Evodeps',
      period: 'Actualidad',
      tagline: 'La adaptabilidad como requisito técnico.',
      heroTitle: 'Software, equipamiento y prototipos a la medida de cada cliente',
      heroLede: 'Evodeps desarrolla software, equipamiento y prototipos e implementaciones tecnológicas personalizadas según las necesidades y el presupuesto de cada cliente. Trabajo ahí como Software Engineer, dentro de equipos interdisciplinarios de desarrollo, diseño y prototipado.',

      kickers: {
        what: 'La empresa',
        offer: 'Qué se entrega',
        purpose: 'Hacia dónde',
        values: 'Cómo se trabaja',
        role: 'Mi lugar ahí',
      },

      whatTitle: 'Quiénes son',
      whatBody: 'Una empresa especializada en el desarrollo de software, equipamiento y manejo de prototipos e implementaciones tecnológicas personalizadas, dimensionadas a las necesidades y el presupuesto de cada cliente.',
      whatNote: 'El mayor diferenciador es la capacidad de adaptarse a las necesidades específicas de cada cliente: mejores precios, calidad y eficiencia en el servicio, en lugar de vender siempre la misma solución.',

      offerTitle: 'Tres frentes, un mismo encargo',
      offerLede: 'El alcance lo define el proyecto, no la conveniencia de producción.',
      offer: {
        software: {
          title: 'Desarrollo de software',
          body: 'Sistemas construidos sobre el proceso real del cliente en lugar de sobre una plantilla. Concentra la mayor parte de mi trabajo en la empresa.',
        },
        equipment: {
          title: 'Equipamiento',
          body: 'El componente físico del proyecto: el equipamiento necesario para que la solución opere en su entorno real de uso.',
        },
        prototypes: {
          title: 'Prototipos e implementaciones',
          body: 'Prototipado y puesta en marcha de tecnología a la medida, desde la primera prueba hasta el sistema operando.',
        },
      },

      missionLabel: 'Misión',
      visionLabel: 'Visión',
      missionBody: 'Transformar ideas innovadoras en soluciones tecnológicas de vanguardia mediante desarrollo de software, equipamiento y prototipos personalizados, garantizando la satisfacción del cliente con productos que se adaptan a sus necesidades y presupuesto. Con enfoque en excelencia, eficiencia y creatividad, para impulsar el crecimiento de quienes nos contratan.',
      visionBody: 'Ser líderes en desarrollo tecnológico a nivel global, reconocidos por ofrecer soluciones personalizadas y de alta calidad que superen las expectativas. Un referente en innovación y adaptabilidad, promoviendo un futuro donde tecnología y creatividad transformen el panorama empresarial y social.',

      valuesTitle: 'Seis valores',
      valuesLede: 'Operan como criterios de decisión cuando cliente, presupuesto y plazo imponen restricciones incompatibles entre sí.',
      values: {
        innovation: {
          title: 'Innovación',
          body: 'Buscar continuamente nuevas tecnologías y enfoques para mejorar los productos y servicios que se ofrecen.',
        },
        quality: {
          title: 'Desarrollo de calidad',
          body: 'Compromiso con la creación de software eficiente, funcional y amigable de usar.',
        },
        team: {
          title: 'Equipo colaborativo',
          body: 'Colaboración efectiva entre los equipos interdisciplinarios de desarrollo, diseño y prototipado a lo largo de todo el ciclo del proyecto.',
        },
        adaptability: {
          title: 'Adaptabilidad',
          body: 'Ajustarse a los requisitos del cliente optimizando los procesos, para resolver con calidad y eficacia lo que se presente.',
        },
        client: {
          title: 'Enfoque al cliente',
          body: 'Comprender y satisfacer las necesidades específicas del cliente en cada proyecto, antes de proponer una solución.',
        },
        security: {
          title: 'Seguridad',
          body: 'Priorizar la seguridad en todos los aspectos del desarrollo y proteger la información confidencial.',
        },
      },

      roleTitle: 'Mi rol como Software Engineer',
      roleBody: 'Desarrollo el software de los proyectos dentro de equipos interdisciplinarios, en coordinación directa con diseño y prototipado. El aprendizaje central ha sido tratar la adaptabilidad como un requisito de arquitectura y no como un argumento comercial: cuando cada cliente presenta un proceso, un presupuesto y un plazo distintos, el sistema debe admitir variación sin comprometer su integridad, y esa condición se define desde el levantamiento inicial de requerimientos.',
    },

    // ----------------------------------------------------------- Freelance
    freelance: {
      badge: 'Software Engineer · Independiente',
      company: 'Trabajo independiente',
      period: 'Ene 2025 — Actualidad',
      tagline: 'El acceso a los equipos multidisciplinarios.',
      heroTitle: 'Ingeniería independiente dentro de equipos multidisciplinarios',
      heroLede: 'Desarrollo software para clientes de distintas industrias como ingeniero independiente. Esta vía dio acceso a equipos multidisciplinarios —diseño, expertos de dominio y otros ingenieros— y a proyectos de alto impacto cuyo resultado se evalúa fuera del repositorio.',

      kickers: {
        why: 'Por qué existe',
        how: 'Cómo trabajo',
        gave: 'Qué me dio',
        role: 'Lo que sostengo',
      },

      whyTitle: 'Lo que abrió',
      whyBody: 'El trabajo por cuenta propia sitúa a la ingeniería como una disciplina entre varias en la mesa de decisión. De ahí proviene el criterio central: un sistema no se evalúa por su elegancia interna, sino por si el experto de dominio lo reconoce como su proceso, si el diseño puede sostener una experiencia sobre él, y si la operación puede ejecutarlo desde el primer día.',
      whyBody2: 'Esa distinción separa el código que satisface un requerimiento del sistema que efectivamente se adopta. Es un criterio que se adquiere asumiendo la responsabilidad completa del resultado, desde el levantamiento inicial hasta la entrega.',

      howTitle: 'Cómo trabajo',
      howLede: 'El método se mantiene constante entre industrias. La variable es el volumen de conocimiento de dominio que debe incorporarse antes de escribir la primera línea.',
      how: {
        domain: {
          title: 'Entender el dominio primero',
          body: 'Antes de proponer arquitectura, documentar el proceso real: quién lo ejecuta, con qué herramientas y qué consecuencias tiene su falla. Un sistema que modela incorrectamente el dominio constituye deuda técnica desde el primer commit.',
        },
        choose: {
          title: 'Elegir por el problema',
          body: 'Selección de tecnología actual y con soporte sostenido en función de los requisitos del problema. Cada decisión se documenta mediante análisis de trade-offs y no por preferencia o familiaridad.',
        },
        build: {
          title: 'Construir con el equipo',
          body: 'Dentro de equipos multidisciplinarios de diseño, expertos de dominio y otros ingenieros. La arquitectura se valida con quienes construirán y operarán sobre ella.',
        },
        own: {
          title: 'Responder por el resultado',
          body: 'Responsabilidad completa desde el levantamiento hasta la entrega. Sin una estructura sobre la cual distribuir la rendición de cuentas, la calidad del resultado es directamente atribuible, lo que eleva el estándar de ejecución.',
        },
      },

      gaveTitle: 'Lo que me dejó',
      gave: {
        interdisciplinary: {
          title: 'Equipos interdisciplinarios',
          body: 'Colaboración con diseño y expertos de dominio en calidad de pares durante todo el desarrollo, y no como receptores de un producto ya terminado.',
        },
        impact: {
          title: 'Proyectos de alto impacto',
          body: 'Sistemas cuyo resultado se mide fuera del código: un proceso operativo corregido, un negocio en condiciones de escalar, una decisión respaldada por datos.',
        },
        judgement: {
          title: 'Criterio tecnológico',
          body: 'Aplicación de arquitecturas modernas, tecnología emergente y buenas prácticas a problemas complejos, incluido el criterio para determinar cuándo la opción emergente aún no es la adecuada.',
        },
        ownership: {
          title: 'Responsabilidad completa',
          body: 'Alcance, plazos, entrega y soporte posterior. Es el marco más exigente para desarrollar capacidad de estimación realista.',
        },
      },

      roleTitle: 'Lo que sigo sosteniendo',
      roleBody: 'Mantengo proyectos propios en paralelo a Radii y Evodeps por una razón concreta: sostienen la capacidad de incorporarse a un dominio desconocido y producir un sistema que sus propios especialistas validan. Esa competencia es transversal a todo lo demás que construyo.',
    },

    // -------------------------------------------------------------- Labsol
    labsol: {
      badge: 'Software Developer Intern',
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      tagline: 'Innovation Techs & Open Labs.',
      heroTitle: 'El laboratorio donde Zacatecas forma a quienes construyen su tecnología',
      heroLede: 'El Laboratorio de Software Libre del COZCYT concentra las prácticas profesionales de miles de estudiantes zacatecanos y desarrolla software en producción para las instituciones del estado. Permanecí catorce meses y entregué dos sistemas, ambos en uso.',

      kickers: {
        what: 'El lugar',
        delivered: 'Lo que entregué',
        learned: 'Lo que me formó',
        role: 'Por qué cuenta',
      },

      whatTitle: 'Qué es Labsol',
      whatBody: 'Laboratorio de software libre del Consejo Zacatecano de Ciencia, Tecnología e Innovación. Cumple dos funciones simultáneas: formación práctica para miles de estudiantes del estado que cursan ahí sus prácticas profesionales y servicio social, y desarrollo del software que operan las instituciones públicas de Zacatecas.',
      whatNote: 'Ambas funciones se refuerzan mutuamente: los proyectos son reales porque existen instituciones que dependen de ellos, y la formación es efectiva porque el trabajo tiene consecuencias verificables.',

      deliveredTitle: 'Dos sistemas, dos instituciones',
      deliveredLede: 'Ambos sistemas se entregaron formalmente y permanecen en operación.',
      delivered: {
        cosiap: {
          title: 'COSIAP — Sistema de Apoyos',
          org: 'Consejo Zacatecano de Ciencia, Tecnología e Innovación',
          body: 'Cada solicitud de financiamiento público para investigación y emprendimiento se tramitaba en papel. La plataforma digitalizó el proceso completo: los solicitantes cargan su documentación y los administradores gestionan el ciclo íntegro desde un solo sistema.',
        },
        cargas: {
          title: 'Sistema de Cargas UAIE',
          org: 'Universidad Autónoma de Zacatecas',
          body: 'Los coordinadores construyen el horario de cada semestre, asignan profesorado y centralizan la información de los cursos, mientras el sistema detecta conflictos entre docentes y grupos antes de la publicación, que era el requerimiento central del encargo.',
        },
      },
      deliveredCta: 'Ver ambos en Proyectos',

      learnedTitle: 'Lo que se aprende entregando',
      learnedLede: 'Liderar dos proyectos de punta a punta desarrolla competencias que la formación académica no alcanza a cubrir.',
      learned: {
        endToEnd: {
          title: 'Entrega de principio a fin',
          body: 'Responsabilidad sobre el resultado completo y no sobre una tarea dentro de él. Fue el factor determinante en la consolidación de mi perfil full-stack.',
        },
        requirements: {
          title: 'Análisis de requerimientos',
          body: 'Traducir lo que una institución declara necesitar a lo que su proceso ejecuta en la práctica. Rara vez coinciden.',
        },
        design: {
          title: 'Diseño y pruebas',
          body: 'Diseño de software y pruebas sobre sistemas destinados a producción, con usuarios para quienes una falla tenía consecuencias operativas directas.',
        },
        management: {
          title: 'Gestión de proyecto',
          body: 'Ciclos ágiles, planeación y comunicación temprana de desviaciones de cronograma, anticipándose a la fecha comprometida.',
        },
      },

      roleTitle: 'Por qué sigue contando',
      roleBody: 'Fue mi primer contacto con software del que dependen terceros. Dos instituciones públicas operando sobre el sistema modifican por completo el estándar de trabajo: la corrección diferida deja de ser una opción cuando del otro lado hay un investigador esperando la resolución de su apoyo o un coordinador publicando horarios. Ese estándar es el que conservo.',
    },
  },
};

export default rolesEs;
