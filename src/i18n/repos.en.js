// English mirror of repos.es.js.

const reposEn = {
  repos: {
    badge: 'Projects',
    title: 'Everything I have built',
    lede: 'Systems delivered to institutions, academic projects, architecture exercises and engineering practice. Projects with an interface include screenshots; the rest — APIs, pipelines and data structures — are identified by a signature generated from their name.',
    countLabel: 'projects',
    privateLabel: 'Private',
    searchLabel: 'Search the catalogue',
    searchPlaceholder: 'Django, Kafka, a project name…',
    filterLabel: 'Filter by language',
    allLanguages: 'All',
    noMatches: 'Nothing in the catalogue matches that.',
    clearFilters: 'Clear the filters',
    viewRepo: 'View repository',
    viewShots: 'View screenshots',

    groups: {
      clients: 'Clients and institutions',
      creative: 'Creative and experimental',
      systems: 'Systems and architecture',
      web: 'Web and apps',
      practice: 'Engineering practice',
      security: 'Security and data',
    },

    items: {
      nocturno: {
        title: 'Nocturno 108',
        body: 'A jazz-hop track composed as code in Strudel, with a purpose-built player: an audio engine synthesised from scratch on Web Audio — no samples, no external libraries — an avatar synchronised to the beat, a real-time piano roll and a mixer.',
      },
      etl: {
        title: 'ETL → Dgraph',
        body: 'A pipeline consolidating four heterogeneous formats — CSV, XML, HTM and TXT — into one Dgraph graph database, orchestrated with Luigi and served through an analytics dashboard in Dash.',
      },
      pubsub: {
        title: 'SMAM — Publish/Subscribe',
        body: 'The publisher-subscriber pattern applied to real-time vital-sign monitoring: wearable publishers and three independent subscribers over ActiveMQ with STOMP, with full decoupling between producers and consumers.',
      },
      sockets: {
        title: 'TCP Sockets',
        body: 'Client-server chat over raw TCP sockets, with file transfer and a Swing interface. The handshake and concurrency are implemented explicitly, with no framework abstraction, and MVC at both ends.',
      },
      pooedd: {
        title: 'OOP and Data Structures',
        body: 'Around 340 Java classes: lists, stacks, queues, trees, graphs and heaps implemented from scratch, without recourse to Collections, alongside OOP practice over JDBC, a DAO layer, REST services and Android.',
      },
      testing: {
        title: 'Software testing',
        body: 'The full pyramid over a Django voting system: doctest, unittest with coverage measurement, BDD with Behave, and end-to-end tests with Selenium.',
      },
      psp: {
        title: 'Personal Software Process',
        body: 'Five Java programs with their complete process record under the SEI PSP: PROBE estimation, time logs, defect logs and a postmortem for each one.',
      },
      dbs: {
        title: 'Database practice',
        body: '31 scripts across four Oracle schemas: joins, subqueries, analytic functions, views and transactions in PL/SQL.',
      },
      retos: {
        title: 'Coding challenges',
        body: 'Sustained practice on the class of problem a technical interview sets: algorithms, data structures and complexity analysis.',
      },
      frameworks: {
        title: 'Web frameworks with Django',
        body: 'An academic enrolment system: email activation, custom validators, a subject graph with prerequisites, and AJAX-chained selects.',
      },
      codecompany: {
        title: 'The Code Company',
        body: 'A fully admin-managed corporate site in Django: editable sections, team profiles, a client portfolio, and a questions section with moderated comments.',
      },
      visualnet: {
        title: 'Visual .NET',
        body: 'A full run through C#: console applications with OOP, Windows Forms, and ASP.NET Core MVC with Entity Framework Core, migrations and Identity.',
      },
      picoctf: {
        title: 'CTF writeups',
        body: 'Around 160 picoCTF and OverTheWire Bandit challenges solved and documented: web, cryptography, forensics, reverse engineering and binary exploitation. The write-ups record the full reasoning, not only the result.',
      },
      stroke: {
        title: 'Stroke prediction',
        body: 'Stroke risk classification in R, on a dataset that is only ~5% positive: imputation, feature selection with Boruta, class balancing with ROSE, and evaluation by ROC/AUC.',
      },
      sharemesomething: {
        title: 'Share me something',
        body: 'A shared journal between two users: a Python API and a JavaScript web client. Private repository.',
      },
    },
  },
};

export default reposEn;
