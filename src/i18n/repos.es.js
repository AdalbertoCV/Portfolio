// Every public repository from the GitHub profile table, plus the private ones
// worth naming. The five projects that have real screenshots live on as case
// studies with their carousels; everything here is a repository card.

const reposEs = {
  repos: {
    badge: 'Proyectos',
    title: 'Todo lo que he construido',
    lede: 'Sistemas entregados a instituciones, proyectos académicos, ejercicios de arquitectura y práctica de ingeniería. Los proyectos con interfaz incluyen capturas; el resto —APIs, pipelines y estructuras de datos— se identifica mediante una firma generada a partir de su nombre.',
    countLabel: 'proyectos',
    privateLabel: 'Privado',
    privateNote:
      'Esta es la mitad pública. La plataforma de Radii, los sistemas entregados bajo contrato y los productos de mis propias empresas viven en repositorios privados, así que lo catalogado aquí es lo que se puede abrir, no todo lo que se ha construido.',
    searchLabel: 'Buscar en el catálogo',
    searchPlaceholder: 'Django, Kafka, el nombre de un proyecto…',
    filterLabel: 'Filtrar por lenguaje',
    allLanguages: 'Todos',
    noMatches: 'Nada en el catálogo coincide con eso.',
    clearFilters: 'Limpiar los filtros',
    stackTitle: 'El stack detrás de ellos',
    stackLede: 'Todas las tecnologías del muro, agrupadas y con búsqueda; las que llevan número enlazan de vuelta a estos proyectos.',
    stackCta: 'Ver el stack',
    clearTech: 'Quitar el filtro de tecnología',
    viewRepo: 'Ver repositorio',
    viewProduct: 'Ver el producto',
    playIt: 'Jugar aquí',
    viewShots: 'Ver capturas',

    groups: {
      product: 'En producción, hoy',
      clients: 'Clientes e instituciones',
      creative: 'Creativo y experimental',
      systems: 'Sistemas y arquitectura',
      web: 'Web y aplicaciones',
      practice: 'Práctica de ingeniería',
      security: 'Seguridad y datos',
    },

    items: {
      radii: {
        title: 'Radii',
        body: 'La plataforma donde trabajo todos los días: subes un CAD y regresa cotizado, con material, post-procesamiento, certificaciones y fecha de entrega. Mi parte es el backend —servicios en Django y FastAPI, workers de Celery, agentes sobre LangGraph que leen la geometría, y el motor que arma el precio— corriendo en AWS sobre Kubernetes. El código es privado; lo que se abre aquí es el producto.',
      },
      nocturno: {
        title: 'Nocturno 108',
        body: 'Pista de jazz-hop compuesta como código en Strudel, con reproductor propio: motor de audio sintetizado desde cero sobre Web Audio —sin samples ni librerías externas—, avatar sincronizado al pulso, piano-roll en tiempo real y mezcladora.',
      },
      play: {
        title: 'Una laptop que salta bugs',
        body: 'Un endless runner escrito para este sitio: un canvas, cero dependencias, un loop con delta time para que una pantalla de 144Hz no lo juegue cuatro veces más rápido, y coyote time para que un salto presionado un frame tarde siga contando. Cada obstáculo lleva el nombre de un bug que de verdad he mandado a producción.',
      },
      acompanar: {
        title: 'acompanar',
        body: 'Le pone acompañamiento —piano, vibráfono, arpegios de guitarra, bajo y percusión— a una grabación casera de voz y guitarra sin volver a tocarla. Los generadores de música con IA rehacen la canción entera, voz incluida; este hace lo contrario: separa la pista con Demucs, encuentra el pulso con Beat This!, saca los acordes y afina cada nota a la afinación real de la guitarra, y escribe los instrumentos encima de la grabación que ya existe. La mezcla final agacha el acompañamiento bajo la voz y normaliza a −14 LUFS.',
      },
      etl: {
        title: 'ETL → Dgraph',
        body: 'Pipeline que consolida cuatro formatos heterogéneos —CSV, XML, HTM y TXT— en una sola base de grafos Dgraph, orquestado con Luigi y servido a través de un dashboard analítico en Dash.',
      },
      pubsub: {
        title: 'SMAM — Publica/Suscribe',
        body: 'Patrón publicador-suscriptor aplicado al monitoreo de signos vitales en tiempo real: publicadores wearables y tres suscriptores independientes sobre ActiveMQ con STOMP, con desacoplamiento total entre productores y consumidores.',
      },
      sockets: {
        title: 'Sockets TCP',
        body: 'Chat cliente-servidor sobre sockets TCP en crudo, con transferencia de archivos e interfaz Swing. El handshake y la concurrencia se implementan de forma explícita, sin abstracción de framework, con MVC en ambos extremos.',
      },
      pooedd: {
        title: 'POO y Estructuras de Datos',
        body: 'Cerca de 340 clases en Java: listas, pilas, colas, árboles, grafos y montículos implementados desde cero, sin recurrir a Collections, junto con prácticas de POO sobre JDBC, capa DAO, servicios REST y Android.',
      },
      testing: {
        title: 'Pruebas de software',
        body: 'La pirámide completa sobre un sistema de votaciones en Django: doctest, unittest con medición de cobertura, BDD con Behave y pruebas end-to-end con Selenium.',
      },
      psp: {
        title: 'Personal Software Process',
        body: 'Cinco programas en Java con su expediente de proceso completo según el PSP del SEI: estimación PROBE, registro de tiempos, registro de defectos y postmortem de cada uno.',
      },
      dbs: {
        title: 'Prácticas de bases de datos',
        body: '31 scripts sobre cuatro esquemas en Oracle: joins, subconsultas, funciones analíticas, vistas y transacciones en PL/SQL.',
      },
      retos: {
        title: 'Retos de programación',
        body: 'Práctica sostenida sobre el tipo de problema que plantea una entrevista técnica: algoritmos, estructuras de datos y análisis de complejidad.',
      },
      frameworks: {
        title: 'Frameworks Web con Django',
        body: 'Sistema de inscripciones académicas: activación por correo, validadores propios, grafo de materias con prerrequisitos y selects encadenados por AJAX.',
      },
      codecompany: {
        title: 'The Code Company',
        body: 'Sitio corporativo en Django completamente administrable: secciones editables, perfiles de equipo, cartera de clientes y una sección de preguntas con comentarios moderados.',
      },
      visualnet: {
        title: 'Visual .NET',
        body: 'Recorrido completo sobre C#: aplicaciones de consola con POO, Windows Forms, y ASP.NET Core MVC con Entity Framework Core, migraciones e Identity.',
      },
      picoctf: {
        title: 'Writeups de CTF',
        body: 'Cerca de 160 retos de picoCTF y OverTheWire Bandit resueltos y documentados: web, criptografía, forense, ingeniería inversa y explotación de binarios. La documentación registra el razonamiento completo, no únicamente el resultado.',
      },
      stroke: {
        title: 'Predicción de ictus',
        body: 'Clasificación de riesgo de accidente cerebrovascular en R, sobre un dataset con apenas ~5% de casos positivos: imputación, selección de variables con Boruta, balanceo con ROSE y evaluación por curva ROC/AUC.',
      },
      sharemesomething: {
        title: 'Share me something',
        body: 'Diario compartido entre dos usuarios: API en Python y cliente web en JavaScript. Repositorio privado.',
      },
    },
  },
};

export default reposEs;
