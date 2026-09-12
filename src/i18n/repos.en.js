// English mirror of repos.es.js.

const reposEn = {
  repos: {
    badge: 'Projects',
    title: 'Everything I have built',
    lede: 'Systems delivered to real institutions, university projects, architecture exercises and engineering practice. The ones with an interface carry their screenshots; the rest — APIs, pipelines, data structures — carry a signature generated from their name.',
    countLabel: 'projects',
    privateLabel: 'Private',
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
        body: 'A jazz-hop track written as code in Strudel, with a player of its own: an audio engine synthesised from scratch in Web Audio — no samples, no libraries — a dancing avatar on the beat, a live piano roll and a mixer.',
      },
      etl: {
        title: 'ETL → Dgraph',
        body: 'A pipeline consolidating four heterogeneous formats — CSV, XML, HTM and TXT — into one Dgraph graph database, orchestrated with Luigi and served through an analytics dashboard in Dash.',
      },
      pubsub: {
        title: 'SMAM — Publish/Subscribe',
        body: 'The publisher-subscriber pattern applied to real-time vital-sign monitoring: wearable publishers and three independent subscribers over ActiveMQ with STOMP. Producers never learn who consumes them.',
      },
      sockets: {
        title: 'TCP Sockets',
        body: 'Client-server chat over raw TCP sockets, with file transfer and a Swing interface. No framework hiding the handshake; concurrency handled by hand, MVC at both ends.',
      },
      pooedd: {
        title: 'OOP and Data Structures',
        body: 'Around 340 Java classes. Lists, stacks, queues, trees, graphs and heaps built from scratch — no Collections — plus OOP practice with JDBC, a DAO layer, REST services and Android.',
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
        body: 'Sustained practice on the problems that show up in technical interviews: algorithms, data structures and complexity.',
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
        body: 'The full route in C#: from console OOP to Windows Forms, and on to ASP.NET Core MVC with Entity Framework Core, migrations and Identity.',
      },
      picoctf: {
        title: 'CTF writeups',
        body: 'Around 160 picoCTF and OverTheWire Bandit challenges solved and documented: web, cryptography, forensics, reverse engineering and binary exploitation. The reasoning, not just the flag.',
      },
      stroke: {
        title: 'Stroke prediction',
        body: 'Stroke risk classification on a dataset that is only ~5% positive: imputation, feature selection with Boruta, class balancing with ROSE, and evaluation by ROC/AUC.',
      },
      sharemesomething: {
        title: 'Share me something',
        body: 'A shared diary between two people: a Python API and a JavaScript web client. Private repository.',
      },
    },
  },
};

export default reposEn;
