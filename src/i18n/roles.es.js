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
      tagline: 'Adaptarse es el producto.',
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
      offerLede: 'Lo que el proyecto pida, no lo que sea más cómodo de producir.',
      offer: {
        software: {
          title: 'Desarrollo de software',
          body: 'Sistemas construidos alrededor del proceso real del cliente, no alrededor de una plantilla. Es donde paso la mayor parte del tiempo.',
        },
        equipment: {
          title: 'Equipamiento',
          body: 'La parte física del encargo: el equipo que hace falta para que la solución funcione en el lugar donde tiene que funcionar.',
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
      valuesLede: 'No están en la pared: describen cómo se decide cuando el cliente, el presupuesto y el plazo empujan en direcciones distintas.',
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
          body: 'Colaboración entre los equipos interdisciplinarios de desarrollo, diseño y prototipado, para que la sinergia sea efectiva y no declarativa.',
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
      roleBody: 'Construyo el software de los proyectos y trabajo dentro de equipos interdisciplinarios, con diseño y prototipado en la misma mesa. La parte que más me ha enseñado es la adaptabilidad como requisito técnico y no como discurso comercial: cuando cada cliente trae un proceso, un presupuesto y un plazo distintos, la arquitectura tiene que poder doblarse sin romperse, y eso se decide desde la primera conversación.',
    },

    // ----------------------------------------------------------- Freelance
    freelance: {
      badge: 'Software Engineer · Independiente',
      company: 'Trabajo independiente',
      period: 'Ene 2025 — Actualidad',
      tagline: 'La puerta a los equipos multidisciplinarios.',
      heroTitle: 'Trabajo por mi cuenta, con equipos que no son solo de ingeniería',
      heroLede: 'Desarrollo software para clientes de industrias distintas como ingeniero independiente. Es lo que me abrió las puertas a trabajar dentro de equipos multidisciplinarios —diseñadores, expertos del dominio, otros ingenieros— y en proyectos de alto impacto donde el resultado se mide fuera del repositorio.',

      kickers: {
        why: 'Por qué existe',
        how: 'Cómo trabajo',
        gave: 'Qué me dio',
        role: 'Lo que sostengo',
      },

      whyTitle: 'Lo que abrió',
      whyBody: 'Trabajar por cuenta propia me puso en mesas donde la ingeniería era una voz entre varias. Ahí aprendí que un sistema no se juzga por su elegancia interna sino por si el experto del dominio lo reconoce como su proceso, si el diseñador puede sostener la experiencia encima, y si el negocio puede operarlo el lunes.',
      whyBody2: 'Esa es la diferencia entre escribir código que cumple el requerimiento y construir algo que la gente realmente usa. No la aprendí en un curso: la aprendí teniendo que responder yo por el resultado, desde la primera conversación hasta la entrega.',

      howTitle: 'Cómo trabajo',
      howLede: 'El mismo método con un cliente de una industria que de otra. Lo que cambia es cuánto dominio tengo que aprender antes de escribir la primera línea.',
      how: {
        domain: {
          title: 'Entender el dominio primero',
          body: 'Antes de proponer arquitectura, entender el proceso real: quién lo hace hoy, con qué, y qué se rompe cuando falla. Un sistema que no modela el dominio correctamente es deuda desde el primer commit.',
        },
        choose: {
          title: 'Elegir por el problema',
          body: 'Tecnología de vanguardia y bien respaldada según lo que el problema pide, no por costumbre ni por lo que ya sé. La decisión se justifica con trade-offs, no con preferencia.',
        },
        build: {
          title: 'Construir con el equipo',
          body: 'Dentro de equipos multidisciplinarios: diseño, expertos del dominio y otros ingenieros. La arquitectura se discute con quien va a vivir encima de ella.',
        },
        own: {
          title: 'Responder por el resultado',
          body: 'De la primera conversación a la entrega. Sin un equipo detrás sobre el cual repartir la responsabilidad, entregar mal se nota de inmediato — y esa presión mejora el trabajo.',
        },
      },

      gaveTitle: 'Lo que me dejó',
      gave: {
        interdisciplinary: {
          title: 'Equipos interdisciplinarios',
          body: 'Trabajar con diseñadores y expertos del dominio como pares, no como clientes internos a los que se entrega un producto terminado.',
        },
        impact: {
          title: 'Proyectos de alto impacto',
          body: 'Sistemas donde el resultado se mide fuera del código: un proceso que deja de doler, un negocio que puede escalar, una decisión que ahora tiene datos.',
        },
        judgement: {
          title: 'Criterio tecnológico',
          body: 'Aplicar arquitecturas modernas, tecnología emergente y buenas prácticas para resolver problemas complejos — y saber cuándo lo emergente todavía no es la respuesta.',
        },
        ownership: {
          title: 'Responsabilidad completa',
          body: 'Alcance, tiempos, entrega y lo que pasa después. Es la escuela más rápida que conozco para aprender a estimar.',
        },
      },

      roleTitle: 'Lo que sigo sosteniendo',
      roleBody: 'Sigo tomando proyectos propios en paralelo a Radii y Evodeps, y no por el ingreso: es donde mantengo el músculo de entrar a un dominio que no conozco y salir con un sistema que sus expertos reconocen como suyo. Es el mismo músculo que necesito para todo lo demás que construyo.',
    },

    // -------------------------------------------------------------- Labsol
    labsol: {
      badge: 'Software Developer Intern',
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      tagline: 'Innovation Techs & Open Labs.',
      heroTitle: 'El laboratorio donde Zacatecas forma a quienes construyen su tecnología',
      heroLede: 'El Laboratorio de Software Libre del COZCYT es el lugar por donde pasan miles de estudiantes zacatecanos a hacer sus prácticas, y desde donde se construye software real para las instituciones del estado. Estuve ahí catorce meses, y salí con dos sistemas entregados y en uso.',

      kickers: {
        what: 'El lugar',
        delivered: 'Lo que entregué',
        learned: 'Lo que me formó',
        role: 'Por qué cuenta',
      },

      whatTitle: 'Qué es Labsol',
      whatBody: 'Un laboratorio de software libre del Consejo Zacatecano de Ciencia, Tecnología e Innovación. Dos cosas a la vez: la escuela práctica donde miles de estudiantes del estado hacen sus prácticas profesionales y su servicio social, y el equipo que construye el software que usan las instituciones públicas de Zacatecas.',
      whatNote: 'Las dos cosas se sostienen entre sí: los proyectos son reales porque hay instituciones esperándolos, y los estudiantes se forman porque el trabajo tiene consecuencias.',

      deliveredTitle: 'Dos sistemas, dos instituciones',
      deliveredLede: 'No fueron ejercicios. Los dos se entregaron y se usan.',
      delivered: {
        cosiap: {
          title: 'COSIAP — Sistema de Apoyos',
          org: 'Consejo Zacatecano de Ciencia, Tecnología e Innovación',
          body: 'Cada solicitud de financiamiento público para investigación y emprendimiento se entregaba en papel. La plataforma digitalizó el proceso completo: los solicitantes suben su documentación y los administradores gestionan todo en un solo sistema.',
        },
        cargas: {
          title: 'Sistema de Cargas UAIE',
          org: 'Universidad Autónoma de Zacatecas',
          body: 'Los coordinadores arman el horario de cada semestre, asignan profesores y concentran la información de los cursos en un lugar, mientras el sistema detecta conflictos entre profesores y grupos antes de publicar — el problema para el que se encargó.',
        },
      },
      deliveredCta: 'Ver ambos en Proyectos',

      learnedTitle: 'Lo que se aprende entregando',
      learnedLede: 'Liderar dos proyectos de punta a punta enseña cosas que un curso no alcanza a cubrir.',
      learned: {
        endToEnd: {
          title: 'Entrega de principio a fin',
          body: 'Ser responsable del resultado completo, no de una tarea dentro de él. Es lo que afianzó mi desarrollo full-stack más que cualquier otra cosa.',
        },
        requirements: {
          title: 'Análisis de requerimientos',
          body: 'Traducir lo que una institución dice que necesita a lo que su proceso realmente hace. Casi nunca es lo mismo.',
        },
        design: {
          title: 'Diseño y pruebas',
          body: 'Diseño de software y pruebas sobre sistemas que iban a usarse de verdad, con usuarios que no podían darse el lujo de que fallara.',
        },
        management: {
          title: 'Gestión de proyecto',
          body: 'Ciclos ágiles, planeación, y la conversación incómoda de avisar un retraso antes de la fecha y no el día de la entrega.',
        },
      },

      roleTitle: 'Por qué sigue contando',
      roleBody: 'Fue mi primer contacto con software que le importa a alguien más que a mí. Dos instituciones públicas dependiendo de que algo funcione cambia por completo cómo escribes: no hay "ya después lo arreglo" cuando del otro lado hay un investigador esperando su apoyo o un coordinador publicando horarios. Ese estándar es el que me llevé, y es el que sigo usando.',
    },
  },
};

export default rolesEs;
