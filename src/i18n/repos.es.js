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
    viewRepo: 'Ver repositorio',
    viewShots: 'Ver capturas',

    groups: {
      clients: 'Clientes e instituciones',
      creative: 'Creativo y experimental',
      systems: 'Sistemas y arquitectura',
      web: 'Web y aplicaciones',
      practice: 'Práctica de ingeniería',
      security: 'Seguridad y datos',
    },

    items: {
      nocturno: {
        title: 'Nocturno 108',
        body: 'Pista de jazz-hop compuesta como código en Strudel, con reproductor propio: motor de audio sintetizado desde cero sobre Web Audio —sin samples ni librerías externas—, avatar sincronizado al pulso, piano-roll en tiempo real y mezcladora.',
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
