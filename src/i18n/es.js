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
      decisions: 'las decisiones técnicas y por qué',
      study: 'diez problemas con pista y solución',
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
    decisions: {
      line: 'Abriendo la bitácora de decisiones…',
    },
    study: {
      line: 'Abriendo la zona de estudio. Hay café.',
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

  // La bitácora. El formato es un ADR a propósito: una decisión escrita sin
  // las opciones que descartó no es una decisión, es un anuncio.
  decisions: {
    badge: 'Bitácora',
    title: 'Decisiones',
    lede: 'El catálogo demuestra qué construí y el stack con qué. Ninguno de los dos muestra lo que un lector técnico realmente está evaluando: qué se eligió, sobre qué, y por qué.',
    note: 'Casi todo mi trabajo vive en repositorios privados, así que el código no puede ser la evidencia. El razonamiento sí.',
    parts: {
      options: 'Opciones',
      chose: 'Elegí',
      why: 'Por qué',
      today: 'Hoy',
    },
    dates: {
      ongoing: 'En curso',
    },
    where: {
      radii: 'Radii Manufacturing',
      rbr: 'Release Before Ready',
      own: 'Proyecto propio',
      personal: 'Decisión personal',
      freelance: 'Freelance',
    },
    items: {
      breadth: {
        title: 'Por qué tantas herramientas y áreas en vez de especializarme',
        options: [
          'Especializarme en un stack y ser el mejor posible en ese',
          'Aprender sólo lo que el trabajo pida, cuando lo pida',
          'Amplitud deliberada: probar mucho, y profundizar donde se queda',
        ],
        chose: 'Amplitud.',
        why: 'La industria va a la velocidad de la luz, y hoy aprender algo nuevo o probarlo cuesta una fracción de lo que costaba. Eso cambia el cálculo: especializarse temprano es apostar a que la cosa en la que te especializaste siga siendo la importante. Pero la razón honesta no es estratégica — es curiosidad, y cariño por esta industria. Me interesa cómo funcionan las cosas antes de saber si las voy a usar.',
        today: 'Es la razón de que la lista de tecnologías de este sitio sea tan larga, y también la razón de que sólo catorce de ellas tengan un proyecto público detrás. La amplitud es real; la profundidad está donde estuvo el trabajo, y esas dos cosas no son la misma y no deberían leerse igual.',
      },
      services: {
        title: 'Por qué microservicios, y no un monolito ni algo más complicado',
        options: [
          'Un monolito: un solo despliegue, cómodo al principio',
          'Un monolito modular, con las fronteras sostenidas sólo por convención',
          'Servicios separados, uno por responsabilidad',
        ],
        chose: 'Servicios separados, uno por responsabilidad.',
        why: 'La decisión es simple y corre en las dos direcciones: un proyecto no puede ser un monolito, y tampoco puede estar sobre-complicado. Separar por responsabilidad es justamente la línea entre esas dos cosas. Cada servicio hace una cosa, y por eso se puede mantener y escalar sin arrastrar al resto con él. No hay servicios porque el patrón suene moderno: hay tantos como responsabilidades distintas existen, y ni uno más.',
        today: 'Es lo que hizo posible mover la plataforma completa de una nube a otra en dos semanas: se migró servicio por servicio, no todo de golpe.',
      },
      parallel: {
        title: 'Construir cosas propias mientras trabajo en Radii',
        options: [
          'Enfocarme sólo en Radii y dejar lo demás para después',
          'Esperar a tener más tiempo o más estabilidad',
          'Construir en paralelo',
        ],
        chose: 'Construir en paralelo.',
        why: 'Radii inspira a intentar cosas locas y a resolver problemas, y eso es la razón, no el obstáculo. Tener proyectos propios corriendo al mismo tiempo es exactamente la visión y el hambre que este trabajo pide. No son una distracción de lo que hago aquí: son la misma disposición, aplicada a problemas que elegí yo.',
        today: 'Moonphase y StackSelect siguen en construcción, en paralelo.',
      },
      quoter: {
        title: 'Poner precio a una pieza sin tener datos con qué entrenar',
        options: [
          'Esperar a acumular historial suficiente y entrenar un modelo mientras tanto se cotiza a mano',
          'Entrenar igual, con los pocos datos que había',
          'Un algoritmo matemático derivado del dominio: geometría, material, acabado y volumen',
        ],
        chose: 'El algoritmo matemático.',
        why: 'No había con qué entrenar. Una empresa nueva no tiene un corpus de cotizaciones históricas, y con un puñado de ejemplos un modelo no aprende a poner precio a una pieza: aprende las costumbres de quien cotizó esas. Además un precio equivocado no es una recomendación mala que el usuario ignora, es un trabajo que se pierde o que se hace perdiendo dinero, y eso obliga a poder señalar con el dedo el término que lo produjo. Pero la falta de datos no era excusa para no intentar nada: el problema tenía estructura —la geometría, el material, el acabado y el volumen sí determinan un costo— y esa estructura se podía escribir.',
        today: 'Sigue en producción y es lo que hace que el precio salga solo. La conversación de ML se reabre cuando el historial que este algoritmo lleva generando alcance para entrenar contra algo real.',
      },
      cloud: {
        title: 'Mover la infraestructura completa de una nube a otra, en dos semanas',
        options: [
          'Quedarnos en Azure y absorber el costo',
          'Portar servicio por servicio detrás de una capa de abstracción propia',
          'Portar directo contra los SDKs de cada proveedor, sin capa intermedia',
        ],
        chose: 'Portar directo, sin capa de abstracción.',
        why: 'Una capa que ocultara las dos nubes habría costado más de mantener que los dos SDKs juntos, y habría que escribirla para una migración que ocurre una sola vez. Lo difícil nunca fue mover cómputo y almacenamiento: fueron los modelos de visión. Entender qué cambia realmente al pasarlos de Azure AI Foundry a AWS Bedrock —qué se comporta igual, qué no, y dónde la diferencia se nota en el resultado— es el trabajo que no se puede abstraer, porque la abstracción es justamente la que te esconde la diferencia que necesitas ver.',
        today: 'Lo volvería a hacer igual. La plataforma corre hoy sobre AWS y no quedó deuda de compatibilidad con la nube que dejamos.',
      },
    },
    more: 'Voy agregando entradas conforme las decisiones se decantan. Las que están aquí ya se pagaron: son decisiones que llevan tiempo corriendo, no propuestas.',
    back: 'Regresar',
  },

  // La zona de estudio. El tono es deliberado: es la única página del sitio
  // escrita para alguien que todavía no ha construido nada de lo demás.
  study: {
    badge: 'Zona de estudio',
    title: 'Diez problemas y un café',
    lede: 'Los mismos diez que le paso a quien me pregunta por dónde empezar. Cada uno enseña una idea distinta y ninguno está aquí por ser difícil: están porque el día que los entendí, algo más quedó claro.',
    note: 'La pista y la solución están dobladas a propósito. El minuto que pasas atorado es el que sirve — si abres la respuesta de inmediato, la página no te enseñó nada. Y si te atoras, tranquilo: atorarse es el trabajo, no un síntoma.',
    hintLabel: 'Una pista',
    solutionLabel: 'Ver la solución',
    levels: { easy: 'accesible', medium: 'intermedio', hard: 'para pensarle' },
    closing: 'Si resolviste alguno de otra forma, la tuya probablemente también está bien: casi nunca hay una sola respuesta. Y si alguno te dejó pensando, escríbeme — me da gusto ese tipo de mensajes.',
    back: 'Regresar',
    items: {
      fizzbuzz: {
        title: 'FizzBuzz',
        statement: 'Imprime los números del 1 al 100. Si el número es múltiplo de 3, imprime «Fizz». Si es múltiplo de 5, «Buzz». Si es múltiplo de los dos, «FizzBuzz».',
        hint: '¿Qué pasa con el 15? Es múltiplo de 3 y de 5 a la vez. Si preguntas primero por el 3, nunca vas a llegar a la pregunta que importa.',
        solution: [
          'El problema no es el módulo: es el orden. La condición más específica va primero, porque la primera que se cumple es la que gana. Si preguntas por el 3 antes que por el 15, el 15 sale como «Fizz» y el error es silencioso — el programa corre, el resultado está mal.',
          'Es la primera vez que muchos se topan con que el orden de los ifs es lógica, no estilo. Esa lección vale mucho más que el ejercicio.',
        ],
      },
      floats: {
        title: '¿Por qué 0.1 + 0.2 no es 0.3?',
        statement: 'Abre la consola del navegador y escribe 0.1 + 0.2. No te va a dar 0.3. ¿Por qué, y cómo comparas dos decimales sin que te muerda?',
        hint: 'Escribe 1/3 en decimal. No terminas nunca. Ahora piensa que la computadora no cuenta en base 10, sino en base 2 — ¿qué fracciones no terminan nunca ahí?',
        solution: [
          'En binario, 0.1 y 0.2 son fracciones periódicas: no caben exactas en los 64 bits de un double, igual que 1/3 no cabe exacto en decimal. Lo que guardas no es 0.1, es el número representable más cercano. Suma dos aproximaciones y obtienes una tercera aproximación.',
          'No es un bug de JavaScript: es IEEE 754 y lo hace Python, Java y C igual. La regla práctica es comparar con una tolerancia en vez de con igualdad — y para dinero, no usar flotantes: se guardan centavos como enteros.',
        ],
      },
      reverse: {
        title: 'Invertir una cadena',
        statement: 'Dada una cadena, devuélvela al revés. Primero como quieras; después, sin usar reverse().',
        hint: 'Piensa en dos dedos: uno al principio y otro al final. Los intercambias y los acercas. ¿Cuándo paras?',
        solution: [
          'La versión de una línea está bien y es la que escribirías en el trabajo. La segunda existe para que veas el patrón de dos punteros, que vas a reusar en el resto de la lista.',
          'El detalle: el bucle para cuando i alcanza a j, no cuando llega al final. Si sigues, vuelves a intercambiar todo y regresas a la cadena original. Y ojo con [...s] en vez de s.split(\'\'): el primero respeta emojis y acentos compuestos, el segundo los parte a la mitad.',
        ],
      },
      palindrome: {
        title: '¿Es palíndromo?',
        statement: 'Decide si un texto se lee igual al derecho y al revés. «Anita lava la tina» sí lo es, aunque tenga espacios y mayúsculas.',
        hint: 'Antes de comparar, ¿qué tienen de diferente «Anita» y «anita»? ¿Y los espacios? Limpia primero, compara después.',
        solution: [
          'Casi todo el problema es la normalización, no la comparación. Bajas a minúsculas, quitas acentos con normalize(\'NFD\') y tiras lo que no sea letra o número. Sólo entonces empieza el algoritmo, que son los mismos dos punteros del problema anterior.',
          'Es un patrón que se repite toda la carrera: cuando un problema de texto se ve difícil, casi siempre es porque estás comparando cosas que todavía no están en el mismo formato.',
        ],
      },
      brackets: {
        title: 'Paréntesis balanceados',
        statement: 'Dado un texto con (), [] y {}, decide si están bien cerrados. «([]{})» sí; «([)]» no, aunque tenga la misma cantidad de cada uno.',
        hint: 'Contar no alcanza: «([)]» tiene dos de cada uno. Lo que importa es el orden. ¿Qué estructura te devuelve siempre lo último que guardaste?',
        solution: [
          'Una pila. Cada símbolo que abre se empuja; cada uno que cierra tiene que corresponder con el que está hasta arriba. Si no corresponde, o si la pila ya estaba vacía, el texto está mal.',
          'El último detalle es el que se olvida: al terminar, la pila tiene que quedar vacía. Si sobró algo abierto, nunca se cerró. Este es el mismo algoritmo con el que un compilador revisa tu código, a otra escala.',
        ],
      },
      twosum: {
        title: 'Dos números que suman N',
        statement: 'Dado un arreglo de números y un objetivo, encuentra las posiciones de los dos que suman ese objetivo. Hazlo recorriendo el arreglo una sola vez.',
        hint: 'Si vas en el número 7 y el objetivo es 10, sabes exactamente qué estás buscando. ¿Puedes preguntar si ya lo viste, sin volver a recorrer?',
        solution: [
          'La versión obvia son dos bucles anidados: O(n²). La buena da una sola pasada guardando en un Map lo que ya viste. En cada número calculas lo que te falta y preguntas si ya pasó por ahí.',
          'Este es el ejercicio donde se entiende para qué sirve un hash map: cambias memoria por tiempo. Guardas n números para dejar de recorrer n veces. Ese intercambio está detrás de la mitad de las optimizaciones que vas a escribir.',
        ],
      },
      missing: {
        title: 'El número que falta',
        statement: 'Tienes los números del 1 al n, desordenados, pero falta exactamente uno. Encuéntralo sin ordenar el arreglo y sin buscar uno por uno.',
        hint: 'Si nada faltara, ¿cuánto sumarían todos? Gauss resolvió esto a los nueve años y sin computadora.',
        solution: [
          'La suma de 1 a n es n(n+1)/2. Sumas lo que sí tienes, restas, y lo que sobra es el que falta. Una pasada y nada de memoria extra.',
          'Vale la pena saber que con muchos números esa suma puede desbordar un entero, y que hay otra solución con XOR que no desborda nunca. Pero el punto del ejercicio es anterior: antes de programar, pregúntate si el problema ya tiene una respuesta matemática.',
        ],
      },
      binary: {
        title: 'Búsqueda binaria',
        statement: 'Busca un número en un arreglo ya ordenado. Cada comparación debe descartar la mitad de lo que queda.',
        hint: 'Escríbela y pruébala con un arreglo de un solo elemento, y luego con uno vacío. Ahí es donde se rompe.',
        solution: [
          'La idea la entiende todo el mundo; la implementación se rompe en los bordes. Los tres lugares donde falla: si el while usa < en vez de <=, nunca revisas el último candidato; si mueves low o high a mid en vez de mid+1 y mid-1, el bucle se queda girando para siempre.',
          'El mid se calcula como low + (high - low) / 2 y no como (low + high) / 2. En JavaScript da igual, pero en lenguajes con enteros de tamaño fijo la segunda forma desborda con arreglos grandes — es un bug que estuvo en la librería estándar de Java durante nueve años.',
        ],
      },
      fib: {
        title: 'Fibonacci, de exponencial a lineal',
        statement: 'Escribe Fibonacci recursivo. Pídele el término 45 y cuenta los segundos. Después arréglalo.',
        hint: 'Dibuja el árbol de llamadas de fib(6). ¿Cuántas veces calculas fib(3)? ¿Y si lo apuntaras la primera vez?',
        solution: [
          'La recursión ingenua recalcula lo mismo una y otra vez: para llegar a fib(45) hace más de mil millones de llamadas. Guardar cada resultado la primera vez que lo calculas convierte un algoritmo exponencial en uno lineal, y son tres líneas.',
          'Eso es memoización, y es la puerta de entrada a la programación dinámica. Lo que cambia no es el algoritmo, es darse cuenta de que estabas resolviendo el mismo subproblema muchas veces — un patrón que se repite en muchísimos problemas que parecen no tener relación.',
        ],
      },
      cycle: {
        title: 'La liebre y la tortuga',
        statement: 'Una lista enlazada puede tener un ciclo: un nodo que apunta hacia atrás y hace que nunca termine. Detéctalo sin usar memoria extra.',
        hint: 'Dos corredores en una pista circular, uno al doble de velocidad que el otro. Si la pista es circular, ¿qué pasa tarde o temprano? ¿Y si es recta?',
        solution: [
          'Dos punteros: uno avanza de uno en uno, el otro de dos en dos. Si hay ciclo, el rápido le da la vuelta al lento y en algún momento caen en el mismo nodo. Si no hay ciclo, el rápido llega al final y se acabó.',
          'Se llama algoritmo de Floyd. Lo interesante no es que funcione, sino que use memoria constante: la solución obvia es guardar todos los nodos vistos en un Set, y esta no guarda nada. Cuando alguien te pida resolver algo «sin memoria extra», casi siempre está pidiendo dos punteros.',
        ],
      },
    },
  },

  // Notas sobre el sitio, no sobre el trabajo. Por eso vive aparte.
  changelog: {
    badge: 'Registro',
    title: 'Qué ha cambiado aquí',
    lede: 'Este sitio se sigue construyendo. Aquí queda lo que se le ha ido agregando y cuándo, por si alguien se pregunta si esto sigue vivo.',
    back: 'Regresar',
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
    study: {
      title: 'Zona de estudio · Adal Cerrillo',
      description:
        'Diez problemas de programación con pista y solución, para quien va empezando.',
    },
    changelog: {
      title: 'Cambios · Adal Cerrillo',
      description: 'Qué se le ha ido agregando a este sitio, y cuándo.',
    },
    decisions: {
      title: 'Decisiones · Adal Cerrillo',
      description:
        'Bitácora de decisiones técnicas: las opciones que había, la que tomé, por qué, y qué costó.',
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
    changelog: 'Cambios',
    kicker: 'Nota al pie',
    study: 'Zona de estudio',
    decisions: 'Bitácora de decisiones',
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
    lede: 'Aquí empieza cualquier cosa que terminemos haciendo juntos. Abajo está lo que normalmente busco, por si te ahorra la mitad del mensaje. Respondo todo lo que llega.',
    reasonsKicker: 'A quién busco',
    reasonsTitle: 'Por qué suele escribirme la gente',
    reasons: {
      radii: {
        title: 'Comprar piezas de manufactura',
        body: 'Radii convierte un archivo CAD en una pieza fabricada, trazada y entregada. Si necesitas manufactura de precisión, ahí la cotización sale sola y llega con expediente completo.',
        link: 'Ver Radii',
      },
      moonphase: {
        title: 'Un cliente para Moonphase',
        body: 'Automatización, sistemas a la medida y problemas que todavía no tienen una solución conocida. Si el tuyo entra en la última categoría, mejor.',
        link: 'Ver Moonphase',
      },
      evodeps: {
        title: 'Un cliente para Evodeps',
        body: 'Software, equipamiento y prototipos para operaciones que hoy corren a mano. Sector público y empresa privada desde 2025.',
        link: 'Ver Evodeps',
      },
      stackselect: {
        title: 'Entrar a StackSelect',
        body: 'Si terminaste la carrera y sigues sin encontrar tu primer empleo, esto se construyó exactamente para eso. Empieza formalmente en enero de 2027.',
        link: 'Ver StackSelect',
      },
      build: {
        title: 'Construir algo juntos',
        body: 'Socios, gente con quien colaborar en proyectos, o cualquiera con una idea que ninguno de los dos pueda sacar solo.',
      },
      ideas: {
        title: 'Compartir ideas y hacer comunidad',
        body: 'Discutir del oficio, enseñarme algo que estés construyendo, o armar cosas con la gente técnica de por acá. Esos mensajes me dan gusto y no necesitan pretexto.',
      },
    },
    reasonsNote: 'Y si no eres ninguna de esas, escríbeme igual. La lista es para ahorrarte tiempo, no para filtrarte.',
    // Lo que dice el de la capucha, abajo del dibujo. Una linea de terminal:
    // por eso va en minusculas y sin punto final.
    watcher: {
      idle: 'esperando entrada',
      reading: 'leyendo:',
      sending: 'transmitiendo',
      sent: 'mensaje recibido',
      failed: 'no salio, intenta de nuevo',
    },

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
    bio: 'Ingeniero de software full-stack que construye servicios backend, infraestructura en la nube y sistemas de IA. En Radii Manufacturing diseño los servicios que sostienen los flujos centrales de manufactura, desarrollo workers en la nube sobre AWS que automatizan el procesamiento de datos, creo agentes de IA con LangGraph y LangChain, y mantengo los pipelines de CI/CD y la observabilidad que sostienen una plataforma de microservicios. Trabajo con Python, Java, JavaScript y C#, sobre Django, Spring Boot y React, y mis intereses van hacia los sistemas distribuidos, la arquitectura orientada a eventos, los sistemas LLM y RAG, y la ingeniería de plataforma. Me formé como Ingeniero de Software en la Universidad Autónoma de Zacatecas. Mi eje de trabajo es la innovación continua: aplicar tecnología emergente para incidir en la dirección de la industria del software, e integrar ingeniería, diseño y criterio de negocio en soluciones sostenibles a largo plazo.',
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
      agents: 'Stacks de agentes e ingeniería de LLM',
      aitools: 'Agentes y modelos con los que trabajo',
      cloud: 'Nube, hosting y DevOps',
      netlab: 'Redes y laboratorio',
      security: 'Seguridad y herramientas ofensivas',
      data: 'Datos',
      frontend: 'Frontend y móvil',
      web: 'CMS, e-commerce y web',
      media: 'Videojuegos, animación y multimedia',
      hardware: 'Hardware, robótica y manufactura',
      tools: 'Herramientas y práctica',
      diagrams: 'Diagramas y documentación',
      learning: 'Donde aprendo',
      collab: 'Colaboración y comunicación',
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
      body: 'Founding Software Engineer en Radii Manufacturing, una startup que automatiza procesos de manufactura mediante una plataforma con inteligencia artificial y una red de fabricantes, y una de las startups más prometedoras de Latinoamérica. Defino la dirección técnica de la empresa junto al equipo fundador — el stack, la arquitectura y las prácticas de ingeniería sobre las que se construye la plataforma — convirtiendo un producto en etapa temprana en un sistema sobre el que el negocio puede escalar. En el primer año: la infraestructura completa de la plataforma migrada en dos semanas, el cotizador automático construido sobre un algoritmo matemático de precios — que entrega el precio sin intervención humana, y bajó de cinco días a uno lo que la IA sí manda a revisión manual — y el 80% del trabajo recurrente del equipo operativo automatizado con agentes de IA.',
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
