import brandsEs from './brands.es';
import rolesEs from './roles.es';
import reposEs from './repos.es';
import cvEs from './cv.es';

const es = {
  ...brandsEs,
  ...cvEs,
  ...reposEs,
  ...rolesEs,
  // El pie de página: un chiste a la vez, con avance manual. Nada aquí se mueve
  // solo, porque una línea que se cambia mientras alguien la lee es peor chiste
  // que el que reemplaza.
  // Título y descripción por ruta, aplicados por <RouteMeta>. Los unfurlers no
  // ejecutan JavaScript, así que public/index.html lleva la versión que ve una
  // vista previa de enlace; estas existen para la pestaña, el marcador, el
  // historial y los rastreadores que sí renderizan la página.
  // La banda de cierre bajo el catálogo de proyectos. Al resto de las rutas se
  // llega a Contacto por el navbar y el pie, así que esta es la única página
  // que gana una banda propia: es donde termina quien recorrió todo el trabajo.
  talk: {
    title: '¿Quieres trabajar conmigo o compartir ideas?',
    lede:
      'Contáctame. Un proyecto que quieras construir, un equipo al que quieras sumarme o una idea que quieras pensar en voz alta: las tres son buenas razones para empezar la conversación.',
    cta: 'Escríbeme',
  },
  // El juego. Dos voces: una para quien vino a propósito y otra para quien
  // llegó equivocándose de URL y merece algo mejor que una página en blanco.
  play: {
    badge: 'Pausa para el café',
    title: 'Una laptop que salta bugs',
    lede:
      'Cada bug de la pista es uno que de verdad he mandado a producción. Los deploys que pasan volando valen 25 puntos, y fallar uno no cuesta nada: es la única forma honesta de cobrar un bonus en un juego donde el suelo ya es lava.',
    lostBadge: 'Error 404',
    lostTitle: 'Esta página no existe',
    lostLede:
      'Algo está mal en la URL, o algo está mal en este sitio. En cualquier caso, aquí hay una laptop saltando bugs mientras decides a dónde querías ir.',
    score: 'Puntos',
    dodged: 'Bugs esquivados',
    best: 'Récord',
    ready: 'Cuando quieras.',
    over: 'Se coló un bug. También pasa en producción.',
    start: 'Empezar',
    again: 'Otra vez',
    hint: 'Espacio, flecha arriba o toca para saltar.',
    canvasLabel: 'Una laptop en pixel art corriendo y saltando bugs',
    note:
      'Escrito para esta página: un canvas, cero dependencias, y una caja de colisión un poco más chica que el sprite, porque la colisión exacta al píxel se siente tramposa para quien tiene el dedo en la barra espaciadora.',
    back: 'Volver a las páginas serias',
  },
  // The shell. Terse on purpose — a command that answers in a paragraph is a
  // command nobody types twice.
  term: {
    label: 'Terminal del sitio',
    title: 'adal@portfolio — ~',
    placeholder: 'escribe un comando…  (tab para completar)',
    inputLabel: 'Comando',
    greeting: "Escribe 'help' si no sabes por dónde empezar.",
    unknown: "'{cmd}': no existe ese comando. Prueba 'help'.",
    desc: {
      help: 'qué se puede escribir aquí',
      whoami: 'quién soy, en tres líneas',
      ls: 'el catálogo de proyectos',
      cat: 'el CV',
      open: 'ir a cualquier página',
      stack: 'las tecnologías con las que construyo',
      play: 'una laptop que salta bugs',
      contact: 'correo y redes',
      theme: 'cambiar claro / oscuro',
      lang: 'cambiar español / inglés',
      clear: 'limpiar la pantalla',
      sudo: 'el único comando con privilegios',
      exit: 'cerrar la terminal',
    },
    help: {
      intro: 'Comandos disponibles abajo. Tab completa, ↑ repite, Esc cierra.',
      hint: 'Todo lo que hay en el navbar se puede llegar escribiéndolo.',
    },
    whoami: {
      line1: 'adal — Founding Software Engineer en Radii Manufacturing.',
      line2: 'Backend, nube y sistemas de IA. Fundador de dos empresas.',
      line3: 'Zacatecas, México · abierto a colaborar',
    },
    ls: {
      projects: '{n} proyectos catalogados. Abriendo el catálogo…',
      unknown: "no hay nada llamado '{arg}'. Prueba 'ls projects' o 'ls pages'.",
    },
    cat: {
      line: 'CV completo, dos páginas, actualizado.',
      download: 'descargar CV.pdf',
      unknown: "'{arg}': no hay tal archivo.",
    },
    open: {
      going: 'Abriendo {page}…',
      unknown: "'{arg}': no existe esa página. Las que sí:",
    },
    stack: {
      line: 'Volviendo a Sobre mí — la sección de tecnologías está a media página.',
      hint: '395 marcas en doce grupos. Las que tienen número enlazan a proyectos reales.',
    },
    play: {
      line: 'Arrancando el juego. Espacio para saltar.',
    },
    contact: {
      line: 'Por aquí llegas:',
    },
    theme: {
      line: 'Tema cambiado.',
    },
    lang: {
      line: 'Idioma cambiado.',
    },
    sudo: {
      granted: 'Permiso concedido. Abriendo contacto…',
      nope: "sudo: solo hay una cosa que puedas hacer con privilegios aquí.",
      note: 'Se aceptan propuestas, ideas y preguntas difíciles.',
    },
    exit: {
      line: 'Hasta luego.',
    },
    footer: 'Abrir la terminal',
  },

  meta: {
    home: {
      title: 'Adal Cerrillo — Founding Software Engineer',
      description:
        'Founding Software Engineer en Radii Manufacturing: construyo el backend, la nube y los sistemas de IA detrás de una plataforma de manufactura. Fundador de Moonphase y StackSelect.',
    },
    experience: {
      title: 'Experiencia · Adal Cerrillo',
      description:
        'Cinco frentes, un estándar: Radii Manufacturing, clientes independientes, Evodeps, LABSOL Network y mentoría entre pares en el CASE.',
    },
    ventures: {
      title: 'Ventures · Adal Cerrillo',
      description:
        'Moonphase y StackSelect: las dos empresas que fundé, para qué existe cada una y en qué punto está hoy.',
    },
    projects: {
      title: 'Proyectos · Adal Cerrillo',
      description:
        'Veinte proyectos, desde sistemas entregados a instituciones públicas hasta investigación y experimentos: qué resuelve cada uno, su stack y su repositorio.',
    },
    contact: {
      title: 'Contacto · Adal Cerrillo',
      description:
        'Un proyecto que quieras construir, un equipo al que quieras sumarme o una idea que quieras pensar en voz alta. Escríbeme.',
    },
    radii: {
      title: 'Radii Manufacturing · Adal Cerrillo',
      description:
        'Founding Software Engineer: el backend, los workers en la nube y los agentes de IA detrás de una plataforma que convierte un archivo CAD en una pieza cotizada, fabricada y trazable.',
    },
    stackselect: {
      title: 'StackSelect · Adal Cerrillo',
      description:
        'Bootcamps y plataforma de evaluación técnica orientados a colocar en su primer empleo a desarrolladores sin experiencia previa.',
    },
    moonphase: {
      title: 'Moonphase · Adal Cerrillo',
      description:
        'Automatización real e I+D sobre lo que nadie ha resuelto todavía, con método y expediente escrito.',
    },
    evodeps: {
      title: 'Evodeps · Adal Cerrillo',
      description: 'Software, equipo y prototipos hechos a la medida de cada cliente.',
    },
    freelance: {
      title: 'Ingeniería independiente · Adal Cerrillo',
      description:
        'Ingeniería dentro de equipos multidisciplinarios: convertir problemas de negocio en sistemas que de verdad se adoptan.',
    },
    labsol: {
      title: 'LABSOL Network · Adal Cerrillo',
      description:
        'El Laboratorio de Software Libre del COZCYT, donde lideré dos proyectos entregados a la Universidad Autónoma de Zacatecas y al consejo estatal de ciencia.',
    },
    case: {
      title: 'CASE · Adal Cerrillo',
      description:
        'Dos años como mentor par, explicando las cinco materias que deciden quién sigue en una carrera de ingeniería.',
    },
    play: {
      title: 'Una laptop que salta bugs · Adal Cerrillo',
      description:
        'Un pequeño endless runner escrito para este sitio: una laptop en pixel art saltando los bugs que de verdad he mandado a producción.',
    },
    uaz: {
      title: 'Ingeniería de Software, UAZ · Adal Cerrillo',
      description:
        'La carrera detrás del trabajo: Ingeniería de Software en la Universidad Autónoma de Zacatecas, y lo que realmente enseñó.',
    },
  },
  footer: {
    tagline: 'Founding Software Engineer. Backend, nube y sistemas de IA — y las dos empresas que estoy construyendo.',
    exploreLabel: 'Explorar',
    reachLabel: 'Contacto',
    cvLabel: 'Currículum',
    cvDownload: 'Descargar CV (PDF)',
    cvOpen: 'Abrir en el navegador',
    kicker: 'Nota al pie',
    play: 'O ve a saltar unos bugs →',
    prev: 'Chiste anterior',
    next: 'Siguiente chiste',
    credit: '© 2026 Adal Cerrillo · Hecho a mano, con más café del recomendable.',
    jokes: [
      'Objetivo de vida declarado: ser el Tony Stark de la vida real, con todo y su Jarvis. El traje va en la versión 0.1, pero Jarvis ya corre en local — y, a diferencia del original, este sí pide permiso antes de desplegar a producción.',
      'Cuando el traje esté listo, el primer ticket será «el reactor arc no tiene tests de integración».',
      'Mi stack favorito sigue siendo café, terminal y la frase «en mi máquina sí funciona».',
      'Sé exactamente cuántos proyectos tengo sin terminar. Esa cifra está clasificada.',
      'La arquitectura más elegante que he diseñado sigue siendo la del diagrama que hice antes de leer los requerimientos completos.',
      'Le hice una prueba de intrusión a mi propia casa. Ganó el router.',
      'Sé siete lenguajes de programación y aun así busco en Google «cómo centrar un div».',
      'Mis estimaciones son honestas y siempre hay que multiplicarlas por dos. Las dos cosas son ciertas al mismo tiempo.',
      'Mi plan de recuperación ante desastres está perfectamente documentado. Se llama git push.',
      'PSeInt sigue siendo el único entorno que jamás me rompió una migración.',
      'Tengo cuarenta pestañas abiertas y todas son «la importante».',
    ],
  },
  nav: {
    about: 'Sobre Mí',
    projects: 'Proyectos',
    experience: 'Experiencia',
    ventures: 'Ventures',
    contact: 'Contacto',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
  },
  contact: {
    badge: 'Contacto',
    title: 'Hablemos',
    lede: 'Si tienes un proyecto, quieres colaborar en algo, formar parte de mi comunidad o simplemente compartir una idea, escríbeme. Respondo a todo lo que llega.',
    fields: {
      name: 'Nombre',
      email: 'Correo',
      subject: 'Asunto',
      message: 'Mensaje',
    },
    placeholders: {
      name: '¿Cómo te llamas?',
      email: 'tu@correo.com',
      subject: '¿De qué se trata?',
      message: 'Cuéntame qué tienes en mente.',
    },
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sent: 'Mensaje enviado. Te respondo en cuanto lo lea.',
    error: 'No se pudo enviar. Escríbeme directo a adalc3488@gmail.com.',
  },
  common: {
    skipToContent: 'Saltar al contenido',
    language: 'Idioma',
    back: 'Volver',
    backToExperience: 'Volver a Experiencia',
    backToVentures: 'Volver a Ventures',
    backToAbout: 'Volver a Sobre Mí',
    scroll: 'Desplázate',
    themeToLight: 'Cambiar a tema claro',
    themeToDark: 'Cambiar a tema oscuro',
    openRepo: 'repositorio de código',
    prevShot: 'Captura anterior',
    nextShot: 'Siguiente captura',
    of: 'de',
    screenshots: 'capturas',
    close: 'Cerrar',
    zoomIn: 'Llenar la altura de la pantalla',
    zoomOut: 'Ajustar imagen a la pantalla',
    tapToZoom: 'Toca la imagen para hacer zoom',
    dragToExplore: 'Arrastra para explorar',
    enlargedImage: 'Imagen ampliada',
  },
  about: {
    badge: 'Sobre Mí y Educación',
    heading: 'Sobre Mí:',
    name: 'Adal Cerrillo',
    role: 'Software Engineer',
    bio: 'Ingeniero de software full-stack que construye servicios backend, infraestructura en la nube y sistemas de IA. En Radii Manufacturing diseño los servicios que sostienen los flujos centrales de manufactura, desarrollo workers en la nube sobre AWS y Azure que automatizan el procesamiento de datos, creo agentes de IA con LangGraph y LangChain, y mantengo los pipelines de CI/CD y la observabilidad que sostienen una plataforma de microservicios. Trabajo con Python, Java, JavaScript y C#, sobre Django, Spring Boot y React, y mis intereses van hacia los sistemas distribuidos, la arquitectura orientada a eventos, los sistemas LLM y RAG, y la ingeniería de plataforma. Me formé como Ingeniero de Software en la Universidad Autónoma de Zacatecas. Mi eje de trabajo es la innovación continua: aplicar tecnología emergente para incidir en la dirección de la industria del software, e integrar ingeniería, diseño y criterio de negocio en soluciones sostenibles a largo plazo.',
    downloadCv: 'Descargar CV',
    cvFormat: 'PDF',
    openInBrowser: 'Abrir en el navegador',
    photoAlt: 'Sobre Mí',
  },
  skills: {
    heading: 'Habilidades',
    subheading: 'Tecnologías y Herramientas que Utilizo',
    groups: {
      languages: 'Lenguajes',
      backend: 'Backend y arquitectura',
      ai: 'Sistemas de IA que construyo',
      aitools: 'Agentes y modelos con los que trabajo',
      cloud: 'Nube, hosting y DevOps',
      security: 'Seguridad y herramientas ofensivas',
      data: 'Datos',
      frontend: 'Frontend y móvil',
      web: 'CMS, e-commerce y web',
      media: 'Videojuegos, animación y multimedia',
      tools: 'Herramientas y práctica',
      frontier: 'Fronteras que exploro',
    },
    pseint: 'PSeInt (broma)',
  },
  education: {
    heading: 'Educación:',
    university: 'Universidad Autónoma de Zacatecas',
    years: '(2020 - 2024)',
    body: 'Cursé la formación de Ingeniero de Software en la Unidad Académica de Ingeniería Eléctrica de la Universidad Autónoma de Zacatecas, donde consolidé la base técnica del desarrollo de sistemas y el criterio para construir soluciones de alta calidad sustentadas en buenas prácticas de ingeniería.',
    description: 'La Universidad Autónoma de Zacatecas Francisco García Salinas (UAZ) es la principal institución de educación superior de Zacatecas, México. Está organizada en áreas y unidades académicas enfocadas en la docencia, la investigación, la extensión y la gestión académica. La UAZ recibe a estudiantes de Zacatecas y de otros estados en campos como biología, humanidades, ingeniería, idiomas, artes, agronomía y ciencias exactas. La universidad promueve activamente la ciencia, la tecnología y la innovación.',
  },
  certifications: {
    heading: 'Certificaciones y Logros:',
    icp: 'Certificación Internet Computer (2023)',
    somece: 'CONGRESO INTERNACIONAL SOMECE 2024',
  },
  experience: {
    radii: {
      company: 'Radii Manufacturing',
      period: 'Jul 2025 — Actualidad',
      title: 'Founding Software Engineer',
      body: 'Founding Software Engineer en Radii Manufacturing, una startup que automatiza procesos de manufactura mediante una plataforma con inteligencia artificial y una red de fabricantes, y una de las startups más prometedoras de Latinoamérica. Defino la dirección técnica de la empresa junto al equipo fundador — el stack, la arquitectura y las prácticas de ingeniería sobre las que se construye la plataforma — convirtiendo un producto en etapa temprana en un sistema sobre el que el negocio puede escalar. En el primer año: la infraestructura completa de la plataforma migrada en dos semanas, el cotizador automático construido sobre un algoritmo matemático de precios — que llevó el tiempo promedio de cotización de un account manager de cinco días a uno — y el 80% del trabajo recurrente del equipo operativo automatizado con agentes de IA.',
    },
    freelance: {
      company: 'Freelance',
      period: 'Ene 2025 — Actualidad',
      title: 'Software Engineer',
      body: 'Desarrollo software para clientes como ingeniero independiente, dentro de equipos multidisciplinarios —diseño, expertos del dominio y otros ingenieros— con el objetivo de traducir problemas de negocio en sistemas efectivamente adoptados. La selección tecnológica responde a los requisitos del problema y se documenta mediante análisis de trade-offs, con responsabilidad íntegra sobre el resultado desde el levantamiento inicial hasta la entrega.',
    },
    labsol: {
      company: 'Labsol Network',
      period: 'Sep 2023 — Nov 2024',
      title: 'Software Developer Intern',
      body: 'Formé parte del equipo del Laboratorio de Software Libre del COZCYT, donde lideré dos proyectos entregados a la Universidad Autónoma de Zacatecas y al Consejo Zacatecano de Ciencia, Tecnología e Innovación. Ser responsable de la entrega de principio a fin afianzó mi desarrollo full-stack, análisis de requerimientos, diseño de software, pruebas y gestión de proyectos.',
    },
    case: {
      company: 'Centro de Aprendizaje y Servicios Escolares',
      period: '2022 — 2023',
      title: 'Mentor par · Voluntariado estudiantil',
      body: 'Dos años de voluntariado en el CASE mientras yo mismo cursaba la carrera, apoyando a otros estudiantes de Ingeniería de Software e Ingeniería en Computación en las materias que se les dificultaban: Álgebra, Cálculo, Programación Orientada a Objetos, Estructura de Datos y Matemáticas Discretas. Más de treinta estudiantes pasaron por esas sesiones. Fue la comunidad estudiantil cuidándose a sí misma, y ahí aprendí a entregar el conocimiento en lugar de solo tenerlo.',
    },
  },
  projects: {
    badge: 'Proyectos Destacados y Portafolio',
    pbienestar: {
      title: 'Sistema de Agendamiento de Citas',
      label: 'Punto Bienestar',
      body: 'Sistema de agendamiento de citas para una clínica de atención psicológica profesional. Los administradores gestionan la disponibilidad de los especialistas y revisan los detalles de cada cita antes de confirmarla, manteniendo el criterio clínico en el proceso en lugar de dejar el agendamiento a una cola automatizada. El sistema notifica por correo electrónico a pacientes, especialistas y administradores cada vez que una cita cambia, y registra las citas confirmadas en el Google Calendar de los usuarios mediante la API de Calendar, de modo que los recordatorios operen sobre la herramienta de agenda que ya utilizan. El acceso está protegido con autenticación JSON Web Token.',
    },
    cosiap: {
      title: 'Sistema de Apoyos COZCyT',
      label: 'Cosiap',
      body: 'Plataforma de gestión de apoyos económicos para el Consejo Zacatecano de Ciencia, Tecnología e Innovación. Antes, cada solicitud de financiamiento público para investigación y emprendimiento se entregaba en papel. La plataforma digitalizó el proceso de principio a fin: los solicitantes suben su documentación y los administradores gestionan las solicitudes en un solo sistema. Desarrollada durante mi estancia como becario en LABSOL Network, como parte del equipo de entrega.',
    },
    cargas: {
      title: 'Sistema de Cargas UAIE',
      label: 'Cargas',
      body: 'Plataforma de carga académica y horarios para la Facultad de Ingeniería Eléctrica de la Universidad Autónoma de Zacatecas. Los coordinadores de programa arman el horario de cada semestre, asignan profesores y concentran la información de los cursos en un solo lugar, mientras el sistema detecta conflictos entre profesores y grupos antes de publicar el horario — el problema para el que se encargó la plataforma. Desarrollada durante mi servicio social en LABSOL Network.',
    },
    bazarSol: {
      title: 'Bazar Sol',
      label: 'Bazar Sol',
      body: 'Plataforma de comercio electrónico para una tienda de ropa, desarrollada como proyecto universitario. Los administradores gestionan el catálogo: dan de alta existencias, ajustan precios y mantienen las descripciones de los productos. Los clientes consultan el catálogo, mantienen una lista privada de favoritos y agregan artículos al carrito para reservarlos.',
    },
    rentazac: {
      title: 'RentaZac',
      label: 'RentaZac',
      body: 'Plataforma de anuncios de renta para la comunidad estudiantil de Zacatecas. Estudiantes y arrendadores de la ciudad coordinaban el alojamiento mediante publicaciones dispersas en redes sociales; RentaZac centraliza la publicación y la búsqueda en una plataforma dedicada. Desarrollada como proyecto universitario.',
    },
  },
};

export default es;
