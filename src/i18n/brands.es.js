// Copy for the three brand pages and the two hub pages. Kept apart from the
// core dictionary because it is the bulk of the site's prose and changes on a
// different clock than the UI chrome (nav labels, toggles, alt text).

const brandsEs = {
  timeline: {
    badge: 'Trayectoria',
    title: 'Cuatro frentes, un mismo criterio',
    lede: 'Cuatro contextos de desarrollo con responsabilidad sobre el resultado: una plataforma de manufactura con IA, una casa de desarrollo a medida, cartera propia de clientes, y el laboratorio público donde inició mi formación profesional.',
    featuredLabel: 'Foco actual',
    present: 'Actualidad',
    readStory: 'Ver la historia completa',
    visitSite: 'Visitar sitio',
    yearsLabel: 'años construyendo',
    venturesTitle: 'Y dos empresas propias',
    venturesLede: 'Más allá del desarrollo, la responsabilidad incluye definir qué se construye, con qué criterio y para qué mercado.',
    venturesCta: 'Conocer Ventures',
  },

  ventures: {
    badge: 'Ventures',
    title: 'Dos empresas, dos responsabilidades',
    lede: 'En una dirijo la tecnología; en la otra, la compañía. Ambas parten del mismo diagnóstico: el talento y las ideas se pierden por ausencia de una estructura que los reciba y los ejecute.',
    roleCto: 'CTO y Cofundador',
    roleCeo: 'CEO y Fundador',
    enter: 'Entrar',
    statusBuilding: 'En construcción',
    stackselectPitch: 'Bootcamps y plataforma de evaluación técnica orientados a la colocación laboral de desarrolladores sin experiencia previa.',
    moonphasePitch: 'Construyendo el futuro de la tecnología: automatización real e I+D sobre lo que nadie ha resuelto, con método y expediente escrito.',
    projectsTitle: '¿Quieres ver más de mi trabajo?',
    projectsLede: 'Explora mis proyectos: el catálogo completo de lo que he construido, de APIs y pipelines de datos a interfaces y una pista de jazz-hop compuesta como código.',
    projectsCta: 'Explorar proyectos',
  },

  // ---------------------------------------------------------------- Radii
  radii: {
    badge: 'Founding Software Engineer',
    company: 'Radii Manufacturing',
    period: 'Jul 2025 — Actualidad',
    tagline: 'Piezas de alta precisión. Cotización instantánea. Entrega a tiempo.',
    heroTitle: 'La manufactura de precisión, resuelta por software',
    heroLede: 'Radii convierte un archivo CAD en una pieza fabricada, trazada y entregada. Yo construyo el sistema que lo hace posible: los servicios que sostienen los flujos centrales, los workers en la nube, los agentes de IA y la infraestructura sobre la que corre todo.',
    visitSite: 'radii.com.mx',

    kickers: {
      what: 'La plataforma',
      how: 'El proceso',
      build: 'Mi rol adentro',
      stack: 'Herramientas',
      closing: 'El porqué',
    },
    statsTitle: 'El terreno',
    stats: {
      tolerance: { value: '±0.005 mm', label: 'Tolerancia CNC alcanzable en la red' },
      lead: { value: '1–5 días', label: 'Lead time en piezas urgentes' },
      quote: { value: 'Segundos', label: 'De CAD a cotización con análisis DFM' },
      certs: { value: 'AS9100D', label: 'Junto a ISO 9001 e IATF 16949 en la red' },
    },

    whatTitle: 'Qué es Radii',
    whatLede: 'Una plataforma nearshore que automatiza el abastecimiento de piezas de precisión: análisis de factibilidad con IA, cotización instantánea, producción gestionada en una red auditada de fabricantes certificados, y trazabilidad completa del material hasta la entrega.',
    whatNote: 'Aeroespacial, automotriz e industrial. Proximidad geográfica, costos competitivos y beneficios T-MEC para cadenas de suministro de Estados Unidos.',

    howTitle: 'Cómo funciona',
    howLede: 'Cuatro etapas que en el proceso tradicional requieren semanas de intercambio manual.',
    how: {
      upload: {
        title: 'Análisis automático',
        body: 'El ingeniero sube su CAD 2D o 3D. La IA valida geometría, tolerancias y factibilidad del material antes de que nadie mire el archivo a mano.',
      },
      quote: {
        title: 'Cotización instantánea',
        body: 'Precio y tiempo de entrega en segundos, con material y acabado configurables, sin dependencia de un ciclo de respuesta comercial.',
      },
      produce: {
        title: 'Producción gestionada',
        body: 'El equipo de ingeniería asigna el trabajo a socios auditados y supervisa la ejecución. La selección de la red responde a capacidad verificada y no a disponibilidad inmediata.',
      },
      trace: {
        title: 'Trazabilidad completa',
        body: 'La entrega incluye documentación completa, certificados de material y reportes de inspección CMM: el expediente íntegro además de la pieza.',
      },
    },

    buildTitle: 'Lo que construyo ahí',
    buildLede: 'Mi incorporación como ingeniero fundador implica participación directa en la definición del stack, la arquitectura y las prácticas de ingeniería sobre las que se construye la plataforma, tanto en su diseño inicial como en su evolución.',
    build: {
      backend: {
        title: 'Servicios backend del núcleo',
        body: 'Diseño y desarrollo los servicios que sostienen los flujos centrales de manufactura, con foco en escalabilidad y confiabilidad del sistema.',
      },
      workers: {
        title: 'Workers en la nube',
        body: 'Construyo y mantengo workers sobre AWS y Azure que automatizan el procesamiento de datos y reducen la carga operativa manual del equipo.',
      },
      agents: {
        title: 'Agentes de IA',
        body: 'Desarrollo agentes con LangGraph y LangChain que automatizan decisiones y operaciones internas que previamente requerían intervención humana en cada etapa.',
      },
      ml: {
        title: 'Automatización con Machine Learning',
        body: 'Aplico soluciones de automatización basadas en ML que mejoran los flujos internos y elevan la eficiencia de las operaciones centrales del negocio.',
      },
      platform: {
        title: 'CI/CD y observabilidad',
        body: 'Implemento pipelines de CI/CD, despliegues automatizados y observabilidad en la nube a lo largo de un ecosistema de microservicios.',
      },
      product: {
        title: 'Producto y arquitectura',
        body: 'Participo en las discusiones de arquitectura y diseño de software, y aporto features del frontend en React cuando el producto lo pide.',
      },
    },

    stackTitle: 'El stack',
    stackLede: 'Seleccionado en función de los requisitos del problema.',
    groups: {
      services: 'Servicios y datos',
      cloud: 'Nube y plataforma',
      ai: 'IA y agentes',
      product: 'Producto',
    },

    closingTitle: 'Por qué importa',
    closingBody: 'Una pieza mal cotizada retrasa una línea de producción; un proveedor sin trazabilidad bloquea una certificación aeroespacial. El software desarrollado aquí no constituye una capa de conveniencia sobre un proceso preexistente: es el proceso mismo, y esa condición define el nivel de exigencia del trabajo.',
  },

  // ---------------------------------------------------------- StackSelect
  stackselect: {
    badge: 'CTO y Cofundador',
    company: 'StackSelect',
    period: 'En constitución',
    tagline: 'Talento.',
    heroTitle: 'El puente entre lo que enseña la universidad y lo que pide la industria',
    heroLede: 'StackSelect forma, evalúa y coloca desarrolladores sin experiencia laboral en su primer empleo profesional. El entregable no es el curso, sino el candidato en condiciones de incorporarse.',

    kickers: {
      name: 'El nombre',
      problem: 'El contexto',
      solution: 'La solución',
      edge: 'Diferenciador',
      values: 'Cultura',
      purpose: 'El propósito',
    },
    nameTitle: 'El nombre',
    nameBody: '«Stack» designa el conjunto de herramientas con las que trabaja un desarrollador. «Select» refiere a la selección y vinculación de ese talento con las empresas. La combinación describe la operación con precisión: identificar a los mejores desarrolladores y colocarlos en el mercado laboral.',

    problemTitle: 'El problema',
    problemBody: 'Existe una brecha documentada entre la formación universitaria y los requisitos reales del sector. Desarrolladores con capacidad técnica permanecen sin empleo por ausencia de experiencia práctica, sin preparación específica para una entrevista técnica ni referencias sobre lo que se espera de ellos en el ejercicio profesional.',
    problemStat: 'Recién egresados sin un primer contacto con un empleo real',

    solutionTitle: 'La solución',
    solutionLede: 'Bootcamps especializados para desarrolladores, en conjunto con una plataforma de evaluación técnica.',
    solution: {
      train: {
        title: 'Bootcamps especializados',
        body: 'Contenidos orientados al conocimiento que la industria requiere efectivamente, validados por profesionales en ejercicio dentro del sector.',
      },
      assess: {
        title: 'Evaluación técnica',
        body: 'Plataforma que evalúa bajo los mismos criterios que aplicará la empresa contratante, eliminando la incertidumbre del proceso de entrevista técnica.',
      },
      place: {
        title: 'Colocación real',
        body: 'El proceso evalúa, capacita donde es necesario y presenta al candidato en condiciones de incorporarse. La colocación constituye el entregable, no un servicio adicional.',
      },
    },

    edgeTitle: 'Qué nos distingue',
    edgeBody: 'La oferta del sector se concentra en la preparación. Nuestra propuesta es la colocación laboral efectiva y en plazos cortos: evaluación, capacitación cuando corresponde, y presentación del candidato en condiciones de incorporarse.',
    edgeHonest: 'Limitación actual: la marca es de creación reciente y aún no cuenta con reconocimiento de mercado ni casos de éxito documentados. Esa base se construye sobre resultados entregados.',

    valuesTitle: 'Valores',
    values: {
      commitment: { title: 'Compromiso', body: 'El acompañamiento al candidato se extiende hasta su colocación efectiva, no hasta el término del programa formativo.' },
      empathy: { title: 'Empatía', body: 'Comprender el punto de partida real de quien aún no ha accedido a su primera oportunidad profesional.' },
      solidarity: { title: 'Solidaridad', body: 'El conocimiento que habilita el acceso al mercado laboral se transmite, no se reserva.' },
    },

    purposeTitle: 'El propósito',
    purposeBody: 'Apoyar al talento joven mexicano a entrar a la industria de tecnologías de la información, y reducir la tasa de desempleo de recién graduados y titulados.',

    roleTitle: 'Mi rol como CTO',
    roleBody: 'Defino la dirección técnica de la compañía: arquitectura de la plataforma de evaluación, stack de construcción, contenido técnico de los bootcamps y criterios de certificación de un candidato. La promesa de colocación solo es sostenible si la evaluación es rigurosa, y esa evaluación constituye en sí misma un problema de ingeniería.',
  },

  // ------------------------------------------------------------ Moonphase
  moonphase: {
    badge: 'CEO y Fundador',
    company: 'Moonphase',
    period: 'En construcción',
    tagline: 'Construyendo el futuro de la tecnología.',
    heroTitle: 'Automatizamos industrias. Y atacamos lo que todavía nadie ha resuelto.',
    heroLede: 'Construir el futuro de la tecnología y llevarla a límites que todavía no tienen nombre: esa es la primera premisa, y el criterio con el que se elige cada proyecto. Moonphase acepta cualquier idea —incluidas las que suenan imposibles— y averigua cómo construirla: automatización de procesos para industrias, negocios y nichos concretos, e I+D sobre problemas que nadie ha resuelto. Las dos líneas con el mismo método —factibilidad, alcance acotado, construcción, y expediente escrito del resultado, incluido el negativo. La ambición es el punto de partida; el método es lo que la vuelve entregable.',

    kickers: {
      name: 'El nombre',
      method: 'Cómo se trabaja',
      lanes: 'Dónde entra cada proyecto',
      values: 'Criterios de decisión',
    },

    nameTitle: 'De dónde viene el nombre',
    nameBody: 'La luna no se ve igual desde todos los puntos de la Tierra al mismo tiempo: en un lugar es llena y en otro menguante, y las dos observaciones son correctas. Lo que cambia no es la luna — es desde dónde se mide.',
    nameBody2: 'La factibilidad de un problema se comporta igual: lo imposible casi siempre es un problema de perspectiva y de datos. Depende de qué datos existen, qué herramientas hay disponibles y cuánto se ha medido, no de qué tan razonable suena al decirlo en voz alta. Por eso aquí la factibilidad se analiza antes de opinar sobre ella.',

    missionLabel: 'Misión',
    visionLabel: 'Visión',
    missionBody: 'Convertir en sistemas operativos las ideas de automatización, innovación e invención que hoy solo existen en formulación. Cuando una solución no resulta viable, documentar formalmente qué la impide y qué condiciones la habilitarían, para retomarla cuando esas condiciones cambien.',
    visionBody: 'Ser la empresa que más ideas imposibles convirtió en realidad, y que dejó documentado el camino hacia las que todavía no. La métrica principal es el impacto: cuántas cosas existen en el mundo que no existirían sin nosotros. El tamaño viene después, y viene como consecuencia.',

    methodTitle: 'El método',
    methodLede: 'El mismo para automatizar el almacén de una distribuidora que para atacar un problema abierto. Lo que cambia es cuánto del camino ya está resuelto de antemano.',
    method: {
      feasibility: {
        title: 'Análisis de factibilidad',
        body: 'Toda idea entra como pregunta atacable: qué hay que lograr exactamente, con qué datos, bajo qué restricciones y con qué criterio se declara que funcionó. De ese análisis sale si es ejecutable hoy o si es I+D.',
      },
      scope: {
        title: 'Alcance y carril',
        body: 'Se acota a entregables medibles y se asigna carril. Un problema de I+D grande se parte en los pedazos que sí son ejecutables, y esos se trabajan primero para acortar la incertidumbre.',
      },
      build: {
        title: 'Construcción',
        body: 'Se construye lo que la pregunta requiera: el sistema, el prototipo o el instrumento de medición que hace falta para contestarla. Un resultado que no existe en código o en datos no cuenta como resultado.',
      },
      record: {
        title: 'Expediente',
        body: 'Cada proyecto deja un documento: qué se construyó, qué se midió, qué falló y qué falta. El caso negativo se entrega igual que el positivo, y se vuelve a revisar cuando la tecnología se mueve.',
      },
    },

    principleLabel: 'El principio operativo',
    principleLine1: 'Todo es posible hasta que se demuestre lo contrario.',
    principleLine2: 'Y cuando se demuestra lo contrario, queda escrito qué lo impide y qué haría falta.',
    principleBody: 'Esto no es optimismo: es carga de la prueba. Un «es imposible» dicho sin evidencia es exactamente tan poco riguroso como un «seguro funciona» dicho sin evidencia — las dos son hipótesis, y las dos se prueban. La diferencia práctica está en el archivo: cuando el «no se puede» llega con datos, esos datos se guardan en lugar de evaporarse, y se vuelven a mirar cuando cambia el estado del arte.',

    lanesTitle: 'Dos carriles',
    lanesLede: 'Uno sostiene la operación. El otro es la razón de tenerla.',
    laneOne: {
      label: 'Carril 1',
      title: 'Automatización aplicada',
      body: 'Procesos concretos de industrias, negocios y nichos: control de inventario manual, reportería sobre hojas de cálculo, operación sin trazabilidad, e integraciones resueltas mediante transferencia manual de datos entre sistemas. Alcance cerrado, entregable medible y cliente identificado.',
      note: 'Financia la operación y desarrolla la capacidad técnica que requiere el carril 2.',
    },
    laneTwo: {
      label: 'Carril 2',
      title: 'I+D sobre problemas abiertos',
      body: 'Tecnología que todavía no existe, preguntas abiertas y problemas que la industria dio por cerrados, de cualquier área del conocimiento. No se miden por éxito sino por conocimiento producido: qué se descartó, con qué evidencia, y qué haría falta para avanzar. Se parten en pedazos ejecutables siempre que el problema lo permita, y se atacan aunque la probabilidad esté en contra.',
      note: 'Es la línea de invención. Un resultado negativo con evidencia y mapa de condiciones constituye un entregable, no un proyecto fallido.',
    },

    valuesTitle: 'Siete valores',
    valuesLede: 'No son adornos de pared: son los criterios con los que se decide cuando la decisión no es obvia, y con los que se evalúa el trabajo de cualquiera aquí. Siguen el arco de un proyecto.',
    valuesHint: 'Toca cada valor para leerlo',
    values: {
      perspective: {
        title: 'Perspectiva',
        motto: 'Antes de descartar, revisa desde dónde estás midiendo.',
        body: 'Cuando algo parece imposible, la primera hipótesis no es «esto es imposible» — es «puede que me falten datos, herramientas o el ángulo correcto». Es humildad epistémica con dientes: sé que mi punto de vista es parcial, y por eso voy a buscar los otros.',
      },
      courage: {
        title: 'Valentía',
        motto: 'Empezar lo que no sabes terminar.',
        body: 'Aceptar proyectos cuyo resultado no está garantizado, y decir «no sé» o «esto está mal» temprano y delante de todos. No es imprudencia: es actuar con los riesgos contados en lugar de evitarlos eligiendo solo lo seguro.',
      },
      grit: {
        title: 'Garra',
        motto: 'Lo difícil se pone más difícil justo antes de resolverse.',
        body: 'Seguir cuando el problema ya no es divertido y la zona intermedia se alarga. Persistencia con dirección: la terquedad repite el mismo intento esperando otro resultado; la garra cambia de intento sin cambiar de objetivo.',
      },
      ownership: {
        title: 'Responsabilidad',
        motto: 'Lo que prometes, se cumple. Lo que rompes, lo arreglas.',
        body: 'Ser dueño del resultado, no solo de la tarea. Es el contrapeso exacto de la valentía: sin él, «explorar» se vuelve sinónimo de «no entregar», y es lo que hace que un cliente siga confiando después de un intento que no salió.',
      },
      documentNo: {
        title: 'Documentar el no',
        motto: 'El fracaso registrado es patrimonio. El callado es desperdicio.',
        body: 'En casi todas las organizaciones el conocimiento más caro —el de todo lo que se intentó y no funcionó— se evapora, y dos años después alguien más gasta los mismos seis meses en descubrirlo otra vez. Aquí ese resultado cambia de entregable: el producto pasa a ser el mapa de lo que falta.',
      },
      craft: {
        title: 'Oficio y sustento',
        motto: 'El proyecto operativo y el problema abierto, con el mismo estándar.',
        body: 'No existe el proyecto «menor». La capacidad técnica que se acumula resolviendo cien problemas concretos es la misma que se requiere al abordar uno sin solución conocida, y es la que financia la investigación.',
      },
      betterWorld: {
        title: 'Deseo de mejorar el mundo',
        motto: 'La razón por la que todo lo anterior importa.',
        body: 'Perspectiva, valentía y garra son fuerzas sin dirección propia: sirven igual para construir algo que vale la pena que para lo contrario. Este valor es el que apunta, y es el filtro final: ¿esto deja el mundo mejor de como lo encontramos?',
      },
    },

    roleTitle: 'Mi rol como CEO',
    roleBody: 'Fundé Moonphase y dirijo la compañía: criterios de admisión de proyectos, distribución del esfuerzo entre los dos carriles, y documentación de los resultados negativos. La dificultad del puesto no reside en decidir qué construir, sino en sostener el método cuando un proyecto de I+D acumula tres meses sin resultado y la alternativa cómoda es suspender su documentación.',
  },

  // ------------------------------------------------------------- Evodeps
  evodeps: {
    company: 'Evodeps',
    period: 'Actualidad',
    title: 'Software Engineer',
    short: 'Desarrollo de software, equipamiento y prototipos tecnológicos a la medida de cada cliente.',
    body: 'Evodeps desarrolla software, equipamiento y prototipos e implementaciones tecnológicas personalizadas según las necesidades y el presupuesto de cada cliente. Su mayor diferenciador es la adaptabilidad: ajustar procesos, alcance y tecnología a lo que el proyecto realmente pide, en lugar de vender siempre la misma solución. Trabajo ahí como Software Engineer, dentro de equipos interdisciplinarios de desarrollo, diseño y prototipado.',
    valuesLabel: 'Cómo trabajan',
    values: 'Innovación · Desarrollo de calidad · Equipo colaborativo · Adaptabilidad · Enfoque al cliente · Seguridad',
  },
};

export default brandsEs;
