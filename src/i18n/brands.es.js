// Copy for the three brand pages and the two hub pages. Kept apart from the
// core dictionary because it is the bulk of the site's prose and changes on a
// different clock than the UI chrome (nav labels, toggles, alt text).

const brandsEs = {
  timeline: {
    badge: 'Trayectoria',
    title: 'Cinco frentes, un mismo criterio',
    lede: 'Cinco frentes con responsabilidad sobre el resultado: una plataforma de manufactura con IA, una casa de desarrollo a medida, cartera propia de clientes, el laboratorio público donde inició mi formación profesional, y dos años de mentoría entre pares sobre las materias que sostienen la carrera.',
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
    siteSoon: 'Sitio web en construcción — enero 2027',
    statusBuilding: 'En construcción',
    stackselectPitch: 'Bootcamps y plataforma de evaluación técnica orientados a la colocación laboral de desarrolladores sin experiencia previa.',
    moonphasePitch: 'Construyendo el futuro de la tecnología: automatización real e I+D sobre lo que nadie ha resuelto, con método y expediente escrito.',
    projectsTitle: '¿Quieres ver más de mi trabajo?',
    projectsLede: 'Explora mis proyectos: el catálogo completo de lo que he construido, de APIs y pipelines de datos a interfaces y una pista de jazz-hop compuesta como código.',
    projectsCta: 'Explorar proyectos',
  },

  // ------------------------------------------------ Plan de operaciones
  // Public on purpose, and narrative on purpose: stages, workstreams and exit
  // criteria, but no amounts, prices, pipeline or client names beyond what the
  // site already tells. The structure (order, current stage, which workstreams
  // appear, criteria states) is in components/ventures/plan.js.
  plan: {
    title: 'De la promesa al plan',
    lede: 'Enero de 2027 es la fecha de operación formal de las dos empresas. Aquí está cómo llegamos a ella y qué viene después, en cuatro etapas. Cada etapa tiene una fecha objetivo, pero salimos de ella cuando cumplimos sus criterios, no cuando llega la fecha. En Moonphase, la investigación y la tecnología propia van al frente de cada etapa; en StackSelect, la colocación es la medida de todo.',
    here: 'Estamos aquí',
    stageTabs: 'Etapas del plan',
    ventureTabs: 'Empresa',
    focusTitle: 'En qué ponemos el foco ahora',
    objectiveTitle: 'Objetivo de la etapa',
    modelTitle: 'Modelo de negocio',
    metricsTitle: 'Métricas que miramos',
    frontsTitle: 'Frentes de trabajo',
    risksTitle: 'Riesgos',
    mitigationLabel: 'Cómo lo mitigamos',
    exitTitle: 'Criterios de salida',
    exitOpen: 'Sin criterio de salida: esta etapa es el horizonte.',
    chipLabel: 'Etapa actual',
    chipCta: 'Ver el plan',
    states: { done: 'Cumplido', active: 'En curso', pending: 'Pendiente' },
    names: {
      freelanceMoonphase: 'Freelance → Moonphase',
      moonphase: 'Moonphase',
      stackselect: 'StackSelect',
    },
    frontNames: {
      moonphase: {
        rd: 'Investigación y desarrollo',
        operation: 'Operación y método',
        commercial: 'Comercial y cartera',
        financeLegal: 'Finanzas y legal',
        team: 'Equipo y cultura',
        brand: 'Marca y evidencia',
      },
      stackselect: {
        program: 'Programa de formación',
        platform: 'Plataforma de evaluación',
        employers: 'Empresas contratantes',
        talent: 'Captación de talento',
        financeLegal: 'Finanzas y legal',
        team: 'Equipo y cultura',
        brand: 'Marca y evidencia',
      },
    },
    stages: {
      incubate: {
        name: 'Incubar',
        window: 'Ene 2025 — Dic 2026',
        tagline: 'Probar que el método aguanta antes de pedirle a alguien que apueste por él.',
        now: {
          constitute: 'Constituir las dos empresas antes de enero de 2027.',
          records: 'Convertir cada proyecto entregado en un expediente de Moonphase.',
          placements: 'Cerrar las primeras colocaciones de StackSelect y, con ellas, el modelo de cobro.',
        },
      },
      stabilize: { name: 'Estabilizar', window: '2027', tagline: 'Operación formal que se sostiene sola.' },
      scale: { name: 'Escalar', window: '2028 — 2029', tagline: 'Crecer sin ser el cuello de botella.' },
      exploit: { name: 'Explotar', window: '2030 en adelante', tagline: 'Convertir lo construido en activos.' },
    },
    moonphase: {
      incubate: {
        objective: 'Demostrar dos cosas con proyectos entregados: que nuestra metodología hace que una empresa de verdad adopte tecnología de vanguardia, y que somos capaces de crear tecnología propia en lugar de solo integrar la que ya existe. Es la primera evidencia de la visión: cosas que existen porque existimos.',
        model: 'Diagnóstico de adopción como puerta de entrada, y proyecto de alcance cerrado y precio fijo, cotizado contra un entregable medible.',
        metrics: [
          'Problemas abiertos en la bitácora y en ataque',
          'Proyectos entregados con expediente',
          'Sistemas que siguen en operación después de la entrega',
          'Clientes que repiten o refieren',
        ],
        fronts: {
          rd: [
            'Abrir una bitácora de problemas abiertos: las ideas que llegan y todavía no son ejecutables.',
            'Elegir el primer problema de I+D y partirlo en pedazos ejecutables.',
            'En cada proyecto, al menos una pieza creada por nosotros —un modelo, un agente, una herramienta— y no solo integración de lo que ya existe.',
            'Publicar el primer expediente de investigación, aunque su resultado sea negativo.',
          ],
          operation: [
            'Formalizar la metodología de adopción: diagnóstico, factibilidad, construcción, adopción y expediente.',
            'Medir la adopción, no solo la entrega: que el sistema se use en la operación del cliente.',
            'Aplicarla a cada proyecto nuevo, sin excepción.',
            'Reescribir PuntoBienestar y los proyectos freelance como expedientes.',
          ],
          commercial: [
            'Proponer a cada cliente de la cartera freelance continuar con Moonphase.',
            'Una oferta escrita por tipo de adopción —plataformas, flujos agénticos, LLM, ML y tecnología de vanguardia, incluida la que desarrollamos— vendible a una empresa de cualquier industria.',
            'Cada oferta con alcance, entregable y precio fijo.',
          ],
          financeLegal: [
            'Constituir la sociedad y darla de alta para facturar.',
            'Separar las finanzas de la empresa de las personales y formar una reserva operativa.',
            'Un contrato tipo donde el cliente acepta que el resultado negativo también se entrega documentado, con la propiedad intelectual definida por proyecto.',
          ],
          team: [
            'Los siete valores como criterio de admisión de proyectos.',
            'Una red de colaboradores por proyecto antes de contratar a nadie.',
          ],
          brand: [
            'Sitio propio en enero de 2027, con los casos publicados.',
            'Cada expediente tratado como evidencia pública, incluido el negativo.',
          ],
        },
        risks: [
          { risk: 'Que todo dependa del tiempo de un solo fundador.', mitigation: 'Alcance cerrado y un calendario de entregas realista.' },
          { risk: 'Aceptar proyectos fuera del método para tener ingreso.', mitigation: 'Un criterio de admisión escrito, aplicado antes de cotizar.' },
        ],
        exit: {
          legal: 'Moonphase constituida legalmente.',
          records: 'Los proyectos entregados, reescritos como expedientes de Moonphase: qué se construyó, qué se midió, qué falló.',
          portfolio: 'La cartera freelance transferida a Moonphase como su cartera inicial.',
        },
      },
      stabilize: {
        objective: 'Que el carril 1 pague la operación y el carril 2 produzca la primera tecnología propia de Moonphase: dejamos de depender de un proyecto a la vez y de la tecnología que otros crean.',
        model: 'Proyectos cerrados más contratos de mantenimiento y soporte sobre lo entregado, que vuelven recurrente parte del ingreso.',
        metrics: [
          'Proporción del ingreso que es recurrente',
          'Margen por proyecto contra lo cotizado',
          'Expedientes del carril 2 abiertos y cerrados',
          'Tecnología propia en uso',
        ],
        fronts: {
          rd: [
            'Una parte fija del ingreso y del tiempo destinada al carril 2, protegida del día a día.',
            'La primera tecnología propia de Moonphase —un modelo, un framework o una herramienta— en uso dentro de proyectos de clientes.',
            'Cerrar el primer expediente de I+D con su mapa de condiciones.',
            'Someter el primer proyecto de I+D a una convocatoria pública de innovación.',
            'Una agenda de investigación anual: qué problemas abiertos atacamos, por qué y con qué criterio de avance.',
          ],
          operation: [
            'Contratos de mantenimiento y soporte ofrecidos al cierre de cada entrega.',
            'Un tablero interno de proyectos: alcance, avance y desviación contra lo cotizado.',
            'Un catálogo de lo que ya construimos y se repite: agentes, modelos y plataformas propios.',
          ],
          commercial: [
            'De la referencia al canal: casos publicados por tipo de tecnología y venta directa a empresas de cualquier industria.',
            'Alianzas con despachos, consultoras e integradores que ya atienden a empresas que necesitan adoptar tecnología.',
          ],
          financeLegal: [
            'Contabilidad formal y precios revisados contra el margen real.',
            'Registro de marca y una política de propiedad intelectual sobre lo que se construye en el carril 2.',
          ],
          team: [
            'El primer colaborador recurrente en ingeniería, con el método como inducción.',
            'Cada proyecto cerrado, revisado contra los siete valores.',
          ],
          brand: [
            'Un expediente publicado cada trimestre, positivo o negativo.',
            'Presencia en comunidades técnicas y de automatización de la región.',
          ],
        },
        risks: [
          { risk: 'Que el carril 1 se coma todo el tiempo y el carril 2 nunca arranque.', mitigation: 'Tiempo y presupuesto del carril 2 asignados de antemano, no con lo que sobre.' },
          { risk: 'Ingreso concentrado en pocos clientes.', mitigation: 'Ningún cliente por encima de una parte acotada del ingreso, y clientes en varias industrias.' },
        ],
        exit: {
          recurring: 'El ingreso recurrente cubre la operación.',
          firstRd: 'El primer expediente del carril 2 cerrado, con resultado positivo o negativo.',
        },
      },
      scale: {
        objective: 'Que Moonphase entregue sin que el fundador sea el cuello de botella, y que una parte creciente de lo que entregamos sea tecnología creada por nosotros, no solo integrada.',
        model: 'Proyectos más una cartera de soporte, y la tecnología propia vendida como producto.',
        metrics: [
          'Proyectos entregados sin intervención directa del fundador',
          'Proporción de lo entregado que es tecnología propia',
          'Expedientes de I+D cerrados por año',
          'Ingreso por producto contra ingreso por proyecto',
        ],
        fronts: {
          rd: [
            'Un portafolio de problemas abiertos, priorizado por impacto, con investigación continua y no por temporadas.',
            'Un equipo dedicado a I+D, separado de la operación del carril 1.',
            'Colaboración con universidades y centros de investigación en los expedientes del carril 2.',
            'Publicaciones técnicas, código abierto o patentes sobre lo que creamos.',
          ],
          operation: [
            'El método escrito como manual, de modo que cualquier ingeniero lo ejecute igual.',
            'Líderes de proyecto que responden por el resultado de principio a fin.',
            'La tecnología propia empaquetada como producto, además del proyecto.',
          ],
          commercial: [
            'Industrias ancla donde la metodología ya se probó varias veces, sin cerrarnos a ninguna.',
            'La metodología de adopción enseñada o licenciada a los equipos internos de las empresas.',
            'Venta de producto además de proyecto.',
          ],
          financeLegal: [
            'Ronda ángel o pre-semilla, levantada sobre métricas reales.',
            'Gobierno corporativo básico: consejo asesor y reportes periódicos a inversionistas.',
          ],
          team: [
            'Primeras contrataciones técnicas de tiempo completo.',
            'La cultura escrita: cómo decidimos cuando la decisión no es obvia.',
          ],
          brand: [
            'Reconocidos como referencia en adopción de tecnología por los expedientes, no por la publicidad.',
          ],
        },
        risks: [
          { risk: 'Crecer el equipo más rápido que el método.', mitigation: 'Nadie lidera un proyecto sin haber ejecutado antes el método completo.' },
          { risk: 'Levantar capital antes de tener métricas.', mitigation: 'La ronda se abre solo con los criterios de Estabilizar cumplidos.' },
        ],
        exit: {
          handsOff: 'Un proyecto entregado de principio a fin sin intervención directa del fundador.',
          round: 'Ronda levantada sobre métricas reales, no sobre la promesa.',
        },
      },
      exploit: {
        objective: 'Ser fuente de tecnología de vanguardia, no solo usuarios de ella: lo que creamos en el carril 2 se vuelve producto, spin-off o licencia que otros adoptan. La medida de la visión es cuántas cosas existen porque existimos.',
        model: 'Producto y licenciamiento sobre la investigación propia, además de la operación de servicios.',
        metrics: [
          'Productos o spin-offs nacidos del carril 2',
          'Ingreso por licenciamiento',
          'Expedientes negativos reabiertos porque cambiaron las condiciones',
        ],
        fronts: {
          rd: [
            'Un proceso para convertir un expediente exitoso en producto o en empresa.',
            'Reabrir los expedientes negativos cuando cambia el estado del arte.',
            'Un laboratorio propio atacando los problemas que la industria dio por cerrados.',
          ],
          commercial: ['Clientes de producto en más de una industria.'],
          financeLegal: [
            'Ronda semilla o serie A según tracción, o crecimiento con capital propio.',
            'Una estructura para spin-offs: participación, licencias y propiedad intelectual.',
          ],
          team: ['Equipos por producto, con el método como lenguaje común.'],
        },
        risks: [
          { risk: 'Perder el método al crecer.', mitigation: 'El expediente sigue siendo obligatorio en todos los equipos, incluidos los de producto.' },
        ],
      },
    },
    stackselect: {
      incubate: {
        objective: 'Demostrar que el método coloca: que un desarrollador sin experiencia sale de una generación con empleo, y que una empresa paga por ello. Es la primera evidencia del propósito: talento joven dentro de la industria.',
        model: 'Validar quién paga y por qué: el candidato, la empresa contratante o ambos. La hipótesis de trabajo es que paga la empresa, por colocación.',
        metrics: [
          'Candidatos colocados por generación',
          'Tiempo desde el ingreso hasta la colocación',
          'Empresas que entrevistan a nuestros candidatos',
        ],
        fronts: {
          program: [
            'Cerrar el temario de las primeras generaciones con la validación de profesionales en ejercicio.',
            'Evaluar a cada candidato al entrar y al salir, con el mismo criterio que usará la empresa.',
            'Documentar el caso de cada colocado: de dónde partió, qué se reforzó y dónde entró.',
          ],
          platform: [
            'La primera versión de la evaluación técnica, aunque se opere a mano.',
            'Definir los criterios de certificación de un candidato.',
          ],
          employers: [
            'Una lista corta de empresas dispuestas a entrevistar a las primeras generaciones.',
            'Conversaciones de precio con esas empresas: cuota por colocación y garantía de reemplazo.',
          ],
          talent: [
            'Captación en universidades y comunidades de Zacatecas, empezando por la red de la UAZ.',
            'Criterios de admisión que midan disposición y base, no experiencia previa.',
          ],
          financeLegal: [
            'Constituir la sociedad y darla de alta para facturar.',
            'Un contrato con la empresa que defina cuota, garantía y plazo.',
            'Un acuerdo con el candidato que deje claro que el entregable es la colocación, no el curso.',
          ],
          team: [
            'Mentores e instructores en ejercicio como colaboradores por generación.',
            'Compromiso, empatía y solidaridad como criterio para elegirlos.',
          ],
          brand: [
            'Sitio propio en enero de 2027.',
            'Las primeras historias de colocación publicadas, con permiso del candidato.',
          ],
        },
        risks: [
          { risk: 'Formar candidatos que ninguna empresa contrata.', mitigation: 'Temario validado por empresas antes de cada generación, no después.' },
          { risk: 'Que el candidato cargue con el costo.', mitigation: 'La hipótesis de cobro apunta a la empresa desde el inicio.' },
        ],
        exit: {
          legal: 'StackSelect constituida legalmente.',
          placements: 'Primeras colocaciones reales, documentadas de principio a fin.',
          pricing: 'Modelo de cobro validado con al menos una empresa que pague.',
        },
      },
      stabilize: {
        objective: 'Que la colocación sea repetible: generaciones regulares, una tasa de colocación sostenida y empresas que vuelven. El propósito deja de depender de una sola generación.',
        model: 'La empresa contratante paga una cuota por colocación. El costo para el candidato se mantiene mínimo o nulo, porque es la población que todavía no tiene ingreso.',
        metrics: [
          'Tasa de colocación por generación',
          'Empresas que vuelven a contratar',
          'Permanencia del colocado en su empleo',
        ],
        fronts: {
          program: [
            'Un calendario fijo de generaciones.',
            'Rutas por perfil: backend, frontend y datos.',
            'Seguimiento del colocado en sus primeros meses de empleo.',
          ],
          platform: [
            'La evaluación como sistema propio, con reportes que la empresa entiende.',
            'Un banco de ejercicios y rúbricas versionado.',
          ],
          employers: [
            'Convenios con empresas aliadas que contratan por generación.',
            'Presencia en ferias de empleo y bolsas de trabajo del sector.',
          ],
          talent: [
            'Alianzas formales con universidades de la región.',
            'Becas o costo diferido para quien no puede pagar.',
          ],
          financeLegal: [
            'Fondos públicos de empleo juvenil y vinculación.',
            'Contabilidad formal y precio revisado contra el costo real por colocación.',
          ],
          team: [
            'El primer coordinador de generaciones.',
            'Evaluadores capacitados en el criterio de certificación.',
          ],
          brand: [
            'La tasa de colocación publicada, calculada siempre de la misma forma.',
            'Testimonios de empresas y de colocados.',
          ],
        },
        risks: [
          { risk: 'Bajar el estándar de evaluación para colocar más.', mitigation: 'La certificación no cambia por presión de volumen, y se reporta la tasa real.' },
          { risk: 'Depender de pocas empresas contratantes.', mitigation: 'Una cartera de empresas aliadas en más de una industria.' },
        ],
        exit: {
          rate: 'Tasa de colocación documentada y sostenida por varias generaciones.',
          repeat: 'Empresas que vuelven a contratar.',
        },
      },
      scale: {
        objective: 'Colocar a más jóvenes de los que el equipo fundador podría formar solo, y convertir la evaluación en un producto que las empresas usan por su cuenta.',
        model: 'Se suma la evaluación como servicio: la empresa paga por evaluar a sus propios candidatos con el criterio de StackSelect.',
        metrics: [
          'Generaciones que corren sin los fundadores',
          'Empresas que usan la plataforma sin contratar por colocación',
          'Costo por colocación',
        ],
        fronts: {
          program: [
            'Instructores y evaluadores propios, con el método como estándar.',
            'Nuevas rutas según lo que piden las empresas aliadas.',
          ],
          platform: [
            'La plataforma de evaluación como producto independiente.',
            'Integración con los procesos de reclutamiento de las empresas.',
          ],
          employers: ['La evaluación vendida como servicio a empresas que reclutan por su cuenta.'],
          talent: ['Captación en más estados, en línea y presencial.'],
          financeLegal: [
            'Ronda ángel o pre-semilla sobre la tracción de colocación.',
            'La plataforma y los criterios de evaluación protegidos como propiedad intelectual.',
          ],
          team: [
            'Un equipo de producto para la plataforma.',
            'Liderazgo de operación separado del liderazgo técnico.',
          ],
        },
        risks: [
          { risk: 'Que la plataforma distraiga del entregable, que es la colocación.', mitigation: 'La plataforma también se mide por las colocaciones que ayuda a producir.' },
          { risk: 'Perder calidad al crecer las generaciones.', mitigation: 'El tamaño de cada generación lo limitan los evaluadores certificados, no la demanda.' },
        ],
        exit: {
          handsOff: 'Generaciones que corren sin que los fundadores impartan ni evalúen.',
          platform: 'La plataforma con clientes propios.',
        },
      },
      exploit: {
        objective: 'Reducir de forma medible el desempleo de recién egresados en tecnología, en más regiones y en más perfiles de talento.',
        model: 'Colocación y plataforma en más mercados.',
        metrics: ['Colocados acumulados', 'Regiones y verticales activas', 'Ingreso de la plataforma'],
        fronts: {
          program: ['Nuevas verticales de talento más allá del desarrollo de software.'],
          platform: ['La plataforma en más mercados, con el criterio de StackSelect como referencia de la industria.'],
          employers: ['Empresas fuera de la región de origen.'],
          financeLegal: ['Ronda semilla o serie A según tracción.'],
        },
        risks: [
          { risk: 'Perder el vínculo con el candidato al convertirse en plataforma.', mitigation: 'La colocación sigue siendo la métrica principal de la empresa.' },
        ],
      },
    },
  },

  // ------------------------------------------------------------------ UAZ
  uaz: {
    badge: 'Formación',
    heroTitle: 'Ingeniería de Software',
    tagline: 'Nueve semestres, 310 créditos y la carrera que me dio criterio.',
    heroLede: 'No estudié programación: estudié ingeniería de software, que es otra cosa. El programa está construido sobre la idea de que escribir código es la parte fácil, y que lo difícil —entender qué hay que construir, decidir cómo, y sostener la calidad de lo construido— también se enseña. Esa diferencia es la que sigo usando todos los días.',
    period: '2020 — 2024',

    statsTitle: 'El plan, en números',
    stats: {
      semesters: { value: '9', label: 'Semestres' },
      subjects: { value: '42', label: 'Asignaturas' },
      labs: { value: '8', label: 'Laboratorios' },
      credits: { value: '310', label: 'Créditos totales' },
    },

    kickers: {
      program: 'El programa',
      plan: 'La malla',
      teaching: 'Los profesores',
    },

    programTitle: 'Una carrera que el estado necesitaba que existiera',
    programBody: 'El programa de Ingeniería de Software de la UAZ no nació como una variante de Ingeniería en Computación. Se creó después de estudiar la situación de la industria del desarrollo de software y se presentó ante la sociedad zacatecana el 3 de diciembre de 2009, con el propósito explícito de formar a los profesionales que esa industria necesitaba en el estado. En 2010 comenzó la construcción del edificio que hoy aloja a Ingeniería de Software e Ingeniería en Computación, en Ciudad Universitaria Siglo XXI.',
    programBody2: 'Ese origen se nota en el plan. No es un tronco común de computación con unas materias de software encima: la ingeniería de software es la columna, y todo lo demás —matemáticas, programación, bases de datos— está ahí para sostenerla. Es la razón por la que salí sabiendo levantar requerimientos y discutir una arquitectura, y no solamente escribir un programa que compila.',
    programNote: 'Los datos del programa y de su fundación provienen del sitio oficial de la licenciatura.',

    planTitle: 'Cinco cadenas que corren en paralelo',
    planLede: 'La malla se lee por columnas —nueve semestres— pero se entiende por renglones: cadenas de asignaturas donde cada una es prerrequisito de la siguiente. Estas son las cinco que la sostienen, con sus materias reales.',
    chains: {
      maths: {
        title: 'Matemáticas',
        body: 'Los primeros semestres son de matemáticas antes que de código, y es lo correcto. El álgebra lineal y las discretas son las que después aparecen en un algoritmo de grafos o en una transformación de datos; la probabilidad y estadística es la que permite leer un modelo en lugar de creerle. Nada de esto se siente útil mientras se cursa, y todo aparece años después.',
      },
      programming: {
        title: 'Programación y algoritmos',
        body: 'La cadena que va de la lógica al análisis de algoritmos, con laboratorio en casi cada peldaño. Lo importante no fue aprender sintaxis sino aprender a razonar sobre costo: por qué una estructura de datos y no otra, y qué se paga por esa decisión cuando el volumen crece. Esa parte la llevé también fuera del aula: participé en varios concursos ICPC durante la carrera, que es el mismo razonamiento pero contra reloj y sin posibilidad de negociar con el problema.',
      },
      engineering: {
        title: 'Ingeniería de software',
        body: 'La columna de la carrera y lo que la distingue. Diez asignaturas que van de levantar requerimientos a mantener lo que ya está en producción, pasando por arquitectura, calidad y administración de proyectos. Proceso de Software Personal y Proceso de Software en Equipo son las dos que más me marcaron: medir el propio trabajo y después sostener el de un equipo es una disciplina que casi nadie aprende en un curso.',
      },
      data: {
        title: 'Datos, web y seguridad',
        body: 'Dos cursos de bases de datos con laboratorio, desarrollo de aplicaciones web, seguridad en redes y sistemas, y negocios electrónicos al final. Es la cadena que conecta la carrera con lo que efectivamente se despliega, y donde la seguridad aparece como materia propia y no como un apéndice.',
      },
      practice: {
        title: 'Investigación y práctica profesional',
        body: 'La carrera no termina en un examen. Termina en dos seminarios —investigación y tesis— y en dos periodos de práctica profesional: servicio social y estancia. Ahí fue donde entré a Labsol, y donde lo aprendido en clase se encontró por primera vez con un usuario que no era el profesor.',
      },
    },

    teachingTitle: 'Profesores que enseñaban criterio, no temario',
    teachingBody: 'Tuve excelentes profesores. Lo digo sabiendo que es la frase que todo el mundo escribe sobre su universidad, así que vale la pena precisar en qué lo fueron: enseñaban el porqué de las decisiones, no el procedimiento para llegar a la respuesta esperada. Una arquitectura se defendía, un requerimiento se discutía, y una entrega se evaluaba por lo que resolvía y no por si corría.',
    teachingBody2: 'Eso dejó dos cosas. La primera es la base técnica, exigente y sostenida por un plan bien construido. La segunda, y la que no esperaba, es la creatividad: cuando a alguien se le enseña que casi siempre hay más de una solución defendible, deja de buscar la respuesta correcta y empieza a diseñar. Buena parte de cómo trabajo hoy —evaluar trade-offs por escrito, construir una prueba acotada antes de comprometer una decisión— empezó como un hábito de aula.',

    closingTitle: 'Lo que me llevé',
    closingBody: 'Salí con el criterio para decidir qué construir y con qué método, que es lo que sostiene todo lo demás en este sitio: las dos empresas, el trabajo por contrato y la plataforma que ayudo a construir en Radii. La carrera no me enseñó las tecnologías con las que trabajo hoy —varias no existían cuando entré— sino la forma de evaluarlas y adoptarlas, que es lo único que no caduca.',
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
      impact: 'Lo que cambió',
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

    // Todos los números de esta página hasta aquí son de Radii. Estos son los
    // únicos que son del ingeniero, que es justo la razón de la sección:
    // "diseño los servicios" es una descripción de puesto, y un lector no
    // puede distinguirla de alguien que vio un curso.
    impactTitle: 'Qué ha cambiado desde que entré',
    impactLede: 'Ingeniero fundador de una plataforma en su primer año. Estas son las cifras que ha movido el trabajo, no las especificaciones de la plataforma.',
    impact: {
      quote: {
        value: 'Automática',
        label:
          'La cotización sale sola cuando el análisis no marca nada. Lo que la IA envía a revisión manual pasó de cinco días a uno.',
      },
      ops: {
        value: '80%',
        label: 'Del trabajo recurrente del equipo operativo, automatizado con agentes de IA',
      },
      infra: {
        value: '2 semanas',
        label: 'Para migrar la infraestructura completa de la plataforma',
      },
      tickets: {
        value: '700+',
        label: 'Tickets cerrados',
      },
    },
    impactNote: 'Más de 4,000 aportaciones de código desde julio de 2025, sobre toda la plataforma.',

    buildTitle: 'Lo que construyo ahí',
    buildLede: 'Mi incorporación como ingeniero fundador implica participación directa en la definición del stack, la arquitectura y las prácticas de ingeniería sobre las que se construye la plataforma, tanto en su diseño inicial como en su evolución.',
    build: {
      backend: {
        title: 'Servicios backend del núcleo',
        body: 'Diseño y desarrollo los servicios que sostienen los flujos centrales de manufactura, con foco en escalabilidad y confiabilidad del sistema.',
      },
      quoting: {
        title: 'El cotizador automático',
        body: 'Construí el motor que pone precio a una pieza: un algoritmo matemático que convierte geometría, material, acabado y volumen en un precio y un tiempo de entrega. Cuando el análisis no encuentra nada que revisar, el precio sale automático y no pasa por nadie. Lo que sí se marca para revisión manual llega a un account manager, y ese camino bajó de cinco días a uno.',
      },
      workers: {
        title: 'Workers en la nube',
        body: 'Construyo y mantengo workers sobre AWS que automatizan el procesamiento de datos y reducen la carga operativa manual del equipo.',
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

    // El diagrama. Cada caja es algo que esta misma página ya afirma en prosa;
    // el dibujo sólo le da forma.
    system: {
      alt: 'Diagrama del sistema: un archivo CAD recorre análisis, cotización, producción y trazabilidad, sobre una capa de servicios, workers, agentes de IA y machine learning, con CI/CD y observabilidad por debajo.',
      flowBand: 'El recorrido de una pieza',
      platformBand: 'La plataforma que lo sostiene',
      flow: {
        upload: { title: 'CAD 2D / 3D', sub: 'lo sube el ingeniero' },
        analyse: { title: 'Análisis automático', sub: 'geometría · tolerancias' },
        quote: { title: 'Cotización', sub: 'algoritmo de precio' },
        produce: { title: 'Producción y entrega', sub: 'red auditada · CMM' },
      },
      platform: {
        services: { title: 'Servicios del núcleo', sub: 'microservicios' },
        workers: { title: 'Workers en la nube', sub: 'AWS · Kubernetes' },
        agents: { title: 'Agentes de IA', sub: 'LangGraph · LangChain' },
        ml: { title: 'Machine learning', sub: 'automatización' },
      },
      rail: { title: 'CI/CD y observabilidad', sub: 'despliegue automatizado · monitoreo en producción' },
      quoteBadge: 'precio automático',
      quoteBadgeAlt: 'si va a revisión: 5 días → 1',
      agentsBadge: '80% del trabajo recurrente',
      caption: 'Las cajas de arriba son el producto; las de abajo son lo que construyo. La cotización es automática salvo que el análisis marque algo para revisión manual, que es el caso al que corresponde el cinco a uno.',
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

    statusTitle: 'Dónde está hoy',
    statusLede: 'StackSelect lleva operando desde junio, formando y evaluando antes de abrir formalmente. El entregable se mide en colocaciones, así que la fecha que importa es cuándo empiezan.',
    status: {
      operating: { value: 'Jun 2026', label: 'Operando: formación y evaluación en marcha' },
      official: { value: 'Ene 2027', label: 'Inicio de operación formal' },
      deliverable: { value: 'Colocación', label: 'La unidad con la que se mide, no el curso terminado' },
    },
    statusNote: 'Los meses previos a la operación formal no son preparación: son las primeras generaciones, y son las que definen si el método aguanta antes de escalarlo.',

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

    statusTitle: 'Dónde está hoy',
    statusLede: 'Moonphase no arrancó de cero en agosto. Arrancó en enero de 2025, como práctica independiente, y la empresa es lo que esa práctica ya había demostrado que funcionaba.',
    status: {
      first: { value: 'Ene 2025', label: 'Primer proyecto entregado: PuntoBienestar, antes de que la empresa existiera' },
      operating: { value: 'Ago 2026', label: 'Operando como Moonphase' },
      official: { value: 'Ene 2027', label: 'Inicio de operación formal' },
    },
    statusNote: 'La cultura y el criterio con los que trabaja la empresa no se escribieron en una junta fundacional: salieron de dos años de entregar proyectos y descubrir qué sostiene un resultado y qué no.',

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
    period: '2025 — Actualidad',
    title: 'Software Engineer',
    short: 'Desarrollo de software, equipamiento y prototipos tecnológicos a la medida de cada cliente.',
    body: 'Evodeps desarrolla software, equipamiento y prototipos e implementaciones tecnológicas personalizadas según las necesidades y el presupuesto de cada cliente. Su mayor diferenciador es la adaptabilidad: ajustar procesos, alcance y tecnología a lo que el proyecto realmente pide, en lugar de vender siempre la misma solución. Trabajo ahí como Software Engineer, dentro de equipos interdisciplinarios de desarrollo, diseño y prototipado.',
    valuesLabel: 'Cómo trabajan',
    values: 'Innovación · Desarrollo de calidad · Equipo colaborativo · Adaptabilidad · Enfoque al cliente · Seguridad',
  },
};

export default brandsEs;
