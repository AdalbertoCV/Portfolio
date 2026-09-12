// Copy for the three brand pages and the two hub pages. Kept apart from the
// core dictionary because it is the bulk of the site's prose and changes on a
// different clock than the UI chrome (nav labels, toggles, alt text).

const brandsEs = {
  timeline: {
    badge: 'Trayectoria',
    title: 'Cuatro frentes, una misma obsesión',
    lede: 'Construyo software donde el resultado importa: una plataforma de manufactura con IA, una casa de desarrollo a medida, clientes propios y el laboratorio donde empezó todo.',
    featuredLabel: 'Foco actual',
    present: 'Actualidad',
    readStory: 'Ver la historia completa',
    visitSite: 'Visitar sitio',
    yearsLabel: 'años construyendo',
    venturesTitle: 'Y dos empresas propias',
    venturesLede: 'No solo escribo el código. También decido qué se construye, por qué y para quién.',
    venturesCta: 'Conocer Ventures',
  },

  ventures: {
    badge: 'Ventures',
    title: 'Dos empresas, dos sillas',
    lede: 'En una dirijo la tecnología. En la otra dirijo la compañía. Las dos nacieron de la misma idea: que el talento y las ideas se desperdician por falta de un lugar donde aterrizar.',
    roleCto: 'CTO y Cofundador',
    roleCeo: 'CEO y Fundador',
    enter: 'Entrar',
    statusBuilding: 'En construcción',
    stackselectPitch: 'Bootcamps y evaluación técnica que llevan al desarrollador sin experiencia hasta su primer empleo real.',
    moonphasePitch: 'Acepta cualquier idea —incluidas las imposibles— y averigua cómo construirla: automatización real e I+D con método y expediente.',
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
    howLede: 'Cuatro pasos que antes tomaban semanas de ida y vuelta por correo.',
    how: {
      upload: {
        title: 'Análisis automático',
        body: 'El ingeniero sube su CAD 2D o 3D. La IA valida geometría, tolerancias y factibilidad del material antes de que nadie mire el archivo a mano.',
      },
      quote: {
        title: 'Cotización instantánea',
        body: 'Precio y tiempo de entrega en segundos, con material y acabado configurables. Sin esperar a que un vendedor conteste.',
      },
      produce: {
        title: 'Producción gestionada',
        body: 'El equipo de ingeniería asigna el trabajo a socios auditados y supervisa la ejecución. La red se elige por capacidad real, no por disponibilidad.',
      },
      trace: {
        title: 'Trazabilidad completa',
        body: 'La entrega llega con documentación, certificados de material y reportes de inspección CMM. Todo el expediente, no solo la pieza.',
      },
    },

    buildTitle: 'Lo que construyo ahí',
    buildLede: 'Entré como ingeniero fundador. Eso significa que el stack, la arquitectura y las prácticas de ingeniería sobre las que se levanta la plataforma se decidieron —y se siguen decidiendo— con mi voz en la mesa.',
    build: {
      backend: {
        title: 'Servicios backend del núcleo',
        body: 'Diseño y desarrollo los servicios que sostienen los flujos centrales de manufactura, con foco en escalabilidad y confiabilidad del sistema.',
      },
      workers: {
        title: 'Workers en la nube',
        body: 'Construyo y mantengo workers sobre AWS y Azure que automatizan el procesamiento de datos y eliminan carga manual del equipo.',
      },
      agents: {
        title: 'Agentes de IA',
        body: 'Desarrollo agentes con LangGraph y LangChain que automatizan decisiones y operaciones internas que antes exigían criterio humano en cada paso.',
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
    stackLede: 'Elegido por el problema, no por costumbre.',
    groups: {
      services: 'Servicios y datos',
      cloud: 'Nube y plataforma',
      ai: 'IA y agentes',
      product: 'Producto',
    },

    closingTitle: 'Por qué importa',
    closingBody: 'Una pieza mal cotizada retrasa una línea de producción. Un proveedor sin trazabilidad frena una certificación aeroespacial. El software que escribo aquí no es una capa de conveniencia sobre un proceso que ya funcionaba: es el proceso. Esa es la parte que me mantiene.',
  },

  // ---------------------------------------------------------- StackSelect
  stackselect: {
    badge: 'CTO y Cofundador',
    company: 'StackSelect',
    period: 'En constitución',
    tagline: 'Talento.',
    heroTitle: 'El puente entre lo que enseña la universidad y lo que pide la industria',
    heroLede: 'StackSelect prepara, evalúa y coloca desarrolladores sin experiencia laboral en su primer empleo real. No vendemos cursos: mandamos a la persona lista a trabajar.',

    kickers: {
      name: 'El nombre',
      problem: 'El contexto',
      solution: 'La solución',
      edge: 'Diferenciador',
      values: 'Cultura',
      purpose: 'El propósito',
    },
    nameTitle: 'El nombre',
    nameBody: '«Stack» es el stack tecnológico —las herramientas con las que trabaja un desarrollador. «Select» es seleccionar y conectar ese talento con las empresas. Juntos dicen exactamente lo que hacemos: elegir a los mejores desarrolladores y colocarlos en el mercado laboral.',

    problemTitle: 'El problema',
    problemBody: 'Existe una brecha enorme entre lo que se aprende en la universidad y lo que realmente piden las empresas. Desarrolladores talentosos se quedan sin empleo por falta de experiencia práctica, sin saber cómo prepararse para una entrevista técnica ni qué se espera de ellos el primer día.',
    problemStat: 'Recién egresados sin un primer contacto con un empleo real',

    solutionTitle: 'La solución',
    solutionLede: 'Bootcamps especializados para desarrolladores, en conjunto con una plataforma de evaluación técnica.',
    solution: {
      train: {
        title: 'Bootcamps especializados',
        body: 'Contenidos enfocados en el conocimiento real que pide la industria, respaldados por experiencias de profesionales que ya están adentro.',
      },
      assess: {
        title: 'Evaluación técnica',
        body: 'Una plataforma que mide lo que la empresa va a medir, para que la entrevista técnica deje de ser un terreno desconocido.',
      },
      place: {
        title: 'Colocación real',
        body: 'Evaluamos, capacitamos si hace falta, y enviamos al candidato listo a trabajar. La colocación es el entregable, no un extra.',
      },
    },

    edgeTitle: 'Qué nos distingue',
    edgeBody: 'La competencia vende preparación. Nosotros vendemos colocación laboral real y rápida: evaluamos, capacitamos si es necesario, y enviamos al candidato listo a trabajar.',
    edgeHonest: 'Y lo que todavía no tenemos: somos una marca nueva. Aún no hay reconocimiento ni casos de éxito que mostrar. Eso se construye entregando, no prometiendo.',

    valuesTitle: 'Valores',
    values: {
      commitment: { title: 'Compromiso', body: 'Con el candidato hasta que está colocado, no hasta que termina el curso.' },
      empathy: { title: 'Empatía', body: 'Entender de dónde viene quien todavía no ha tenido su primera oportunidad.' },
      solidarity: { title: 'Solidaridad', body: 'El conocimiento que abre una puerta no se guarda.' },
    },

    purposeTitle: 'El propósito',
    purposeBody: 'Apoyar al talento joven mexicano a entrar a la industria de tecnologías de la información, y reducir la tasa de desempleo de recién graduados y titulados.',

    roleTitle: 'Mi rol como CTO',
    roleBody: 'Defino la dirección técnica de la compañía: la arquitectura de la plataforma de evaluación, el stack sobre el que se construye, el contenido técnico de los bootcamps y el criterio con el que se decide si un candidato está listo. La promesa de colocación solo se sostiene si la evaluación es honesta — y esa evaluación es un problema de ingeniería.',
  },

  // ------------------------------------------------------------ Moonphase
  moonphase: {
    badge: 'CEO y Fundador',
    company: 'Moonphase',
    period: 'En construcción',
    tagline: 'Lo imposible casi siempre es un problema de perspectiva y de datos.',
    heroTitle: 'Automatizamos industrias. Y atacamos lo que todavía nadie ha resuelto.',
    heroLede: 'Moonphase acepta cualquier idea —incluidas las que suenan imposibles— y averigua cómo construirla. Dos líneas de trabajo: automatización de procesos para industrias, negocios y nichos concretos, e I+D sobre problemas que nadie ha resuelto. Las dos con el mismo método: análisis de factibilidad, alcance acotado, construcción, y un expediente escrito del resultado —incluido el negativo. La ambición es el punto de partida; el método es lo que la vuelve entregable.',

    kickers: {
      name: 'El nombre',
      method: 'Cómo se trabaja',
      lanes: 'Dónde entra cada proyecto',
      values: 'Criterios de decisión',
    },

    nameTitle: 'De dónde viene el nombre',
    nameBody: 'La luna no se ve igual desde todos los puntos de la Tierra al mismo tiempo: en un lugar es llena y en otro menguante, y las dos observaciones son correctas. Lo que cambia no es la luna — es desde dónde se mide.',
    nameBody2: 'La factibilidad de un problema se comporta igual. Depende de qué datos existen, qué herramientas hay disponibles y cuánto se ha medido, no de qué tan razonable suena al decirlo en voz alta. Por eso aquí la factibilidad se analiza antes de opinar sobre ella.',

    missionLabel: 'Misión',
    visionLabel: 'Visión',
    missionBody: 'Convertir en sistemas que funcionan las ideas de automatización, innovación e invención que hoy solo existen en la cabeza de alguien. Y cuando algo todavía no se puede, dejar por escrito qué lo impide y qué haría falta — para volver el día que sí se pueda.',
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
      body: 'Procesos concretos de industrias, negocios y nichos: inventario que se lleva a mano, reportería que vive en hojas de cálculo, operación sin trazabilidad, integraciones que hoy resuelve una persona copiando datos entre sistemas. Alcance cerrado, entregable medible y cliente real.',
      note: 'Financia la operación y construye el músculo técnico que el carril 2 necesita.',
    },
    laneTwo: {
      label: 'Carril 2',
      title: 'I+D sobre problemas abiertos',
      body: 'Tecnología que todavía no existe, preguntas abiertas y problemas que la industria dio por cerrados, de cualquier área del conocimiento. No se miden por éxito sino por conocimiento producido: qué se descartó, con qué evidencia, y qué haría falta para avanzar. Se parten en pedazos ejecutables siempre que el problema lo permita, y se atacan aunque la probabilidad esté en contra.',
      note: 'Aquí es donde se inventa. Un «no se puede» con evidencia y mapa es un entregable, no un proyecto fallido.',
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
        motto: 'El almacén y el problema abierto, con la misma seriedad.',
        body: 'No existe el proyecto «menor». El músculo técnico que se construye resolviendo cien problemas concretos es exactamente el que hace falta el día que atacas uno que nadie ha resuelto — y es el que paga la investigación.',
      },
      betterWorld: {
        title: 'Deseo de mejorar el mundo',
        motto: 'La razón por la que todo lo anterior importa.',
        body: 'Perspectiva, valentía y garra son fuerzas sin dirección propia: sirven igual para construir algo que vale la pena que para lo contrario. Este valor es el que apunta, y es el filtro final: ¿esto deja el mundo mejor de como lo encontramos?',
      },
    },

    roleTitle: 'Mi rol como CEO',
    roleBody: 'Fundé Moonphase y dirijo la compañía: qué entra como proyecto, cómo se reparte el esfuerzo entre los dos carriles, y qué queda escrito cuando algo no se puede. La parte difícil del puesto no es elegir qué construir — es sostener el método cuando un proyecto de I+D lleva tres meses sin resultado y la salida cómoda es dejar de documentarlo.',
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
