import brandsEs from './brands.es';
import rolesEs from './roles.es';
import reposEs from './repos.es';
import cvEs from './cv.es';

const es = {
  ...brandsEs,
  ...cvEs,
  ...reposEs,
  ...rolesEs,
  nav: {
    about: 'Sobre Mí',
    projects: 'Proyectos',
    experience: 'Experiencia',
    ventures: 'Ventures',
    menu: 'Menú',
    closeMenu: 'Cerrar menú',
  },
  common: {
    language: 'Idioma',
    back: 'Volver',
    backToExperience: 'Volver a Experiencia',
    backToVentures: 'Volver a Ventures',
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
      tools: 'Herramientas y práctica',
      joke: 'Y sobre todo, experto en PSeInt',
      frontier: 'Fronteras que exploro',
    },
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
      body: 'Founding Software Engineer en Radii Manufacturing, una startup que automatiza procesos de manufactura mediante una plataforma con inteligencia artificial y una red de fabricantes, y una de las startups más prometedoras de Latinoamérica. Defino la dirección técnica de la empresa junto al equipo fundador — el stack, la arquitectura y las prácticas de ingeniería sobre las que se construye la plataforma — convirtiendo un producto en etapa temprana en un sistema sobre el que el negocio puede escalar.',
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
