# Partir "Sobre mí" en Stack y Biblioteca — diseño

Fecha: 2026-09-26 · Estado: en revisión

## Propósito

"Sobre mí" creció hasta once secciones, y dos de ellas —el muro de tecnologías
y la lectura— son catálogos que se exploran, no una presentación. Juntas son
más de la mitad del scroll. Salen a sus propias páginas en el navbar, y la
página que queda vuelve a ser lo que dice su nombre.

## Decisiones tomadas

| Decisión | Elección |
|---|---|
| Páginas nuevas | `/stack` (el muro, incluidas las fronteras) y `/library` (intereses y lectura). |
| Intereses | Van en `/library`, encima de los estantes: primero de dónde sale la forma en que pienso, luego qué leer. |
| Navbar | Sobre mí · Experiencia · Ventures · Proyectos · Stack · Biblioteca · Contacto (EN: Stack, Library). |
| Recorrido | Cada página termina en una card hacia la siguiente del navbar, con una animación temática de la página destino. |
| About | Se queda con identidad, ahora, perfil, práctica, WorkBot, educación e idiomas, certificaciones y referencias. Termina en su card a Experiencia. Sin avances a Stack ni a Biblioteca: se llega por el navbar y por la cadena. |

## Estructura

### `/stack`

1. Encabezado como el de Decisiones: badge, h1 y lede (ES/EN). Reutiliza los
   textos actuales `cv.skillsKicker`, `cv.skillsTitle` y `cv.skillsLede`.
2. `StackExplorer` tal cual, con todos sus grupos (incluida "Fronteras que
   exploro") y su búsqueda.
3. Card hacia Biblioteca.

### `/library`

1. Encabezado: badge, h1 y lede propios de la página (ES/EN).
2. Intereses: las tarjetas actuales (`INTEREST_KEYS`, iconos, enlaces, tags),
   sin cambios.
3. Lectura: los 10 estantes de 20, cada uno con su descripción, y la nota
   final ("también leemos…").
4. Card hacia Contacto: la `TalkBand` actual, que deja de cerrar Proyectos.

### About

Pierde las secciones del muro, la lectura y los intereses, con sus imports. Su
card final a Experiencia gana una animación.

## La cadena de cards

| Página | Card → | Animación |
|---|---|---|
| Sobre mí | Experiencia | Nueva — `TimelineStrip`: una línea de tiempo se dibuja y sus hitos se encienden en orden conforme un pulso la recorre. |
| Experiencia | Ventures | Sin cambios (`VenturesRoadmap`). |
| Ventures | Proyectos | Sin cambios (`ProjectsMosaic`). |
| Proyectos | Stack | Nueva — `StackTiles`: fichas redondeadas caen y se asientan en la cuadrícula del muro; después, en bucle, una se enciende con su contador, como las de "The Stars". |
| Stack | Biblioteca | Nueva — `ShelfStrip`: lomos de libros de alturas distintas se deslizan hasta pararse en un estante; después, en bucle, uno se inclina hacia fuera y vuelve. |
| Biblioteca | Contacto | `TalkBand` con `ContactChain`, movida desde Proyectos. |

Las tres animaciones nuevas siguen la forma de `VenturesRoadmap` y
`ProjectsMosaic`:

- Tira SVG de 420×140 dibujada a mano, con `currentColor` y los tokens del tema,
  así que funciona en claro y en oscuro.
- Entran una vez cuando la card recibe `is-visible` de `Reveal` y después
  repiten un bucle discreto.
- Con `prefers-reduced-motion: reduce` aparecen en su estado final, sin
  movimiento.
- `aria-hidden`: son decoración; el texto y el botón de la card cargan el
  significado.
- Su CSS vive en `src/styles/hub.css`, junto a las de sus hermanas.

## Enlaces y metadatos

- `LINKS` del navbar suma `/stack` y `/library`, con `nav.stack` y
  `nav.library` en los dos diccionarios. Se comprueba en qué ancho dejan de
  caber los siete enlaces en línea y, si hace falta, se sube el punto en que el
  navbar pasa al menú.
- `RouteMeta` registra `/stack` → `stack` y `/library` → `library`, con título
  y descripción en `meta.*` de ES y EN.
- Terminal: el comando `stack` abre `/stack` y deja de decir "a media página";
  se agrega `library` (alias `biblioteca`, `lectura`), que abre `/library`.
- El texto de `timeline.*` de la card de About no cambia.

## Código

- `src/components/stack/StackPage.jsx` y `src/components/library/LibraryPage.jsx`.
- Las secciones movidas conservan sus clases (`practice-block`,
  `reading-*`, `cv-interests`…), así que la apariencia no cambia. Los estilos
  que usan siguen en `about.css`, que las páginas nuevas importan.
- `reading.js`, `bookCovers.js`, `techStack.js`, `interestsData.jsx` y
  `StackExplorer` no cambian de sitio.
- Las animaciones: `src/components/about/TimelineStrip.jsx`,
  `src/components/stack/StackTiles.jsx`, `src/components/library/ShelfStrip.jsx`.

## Pruebas

- `/stack` renderiza el explorador y la card hacia `/library`.
- `/library` renderiza intereses, los 10 estantes y la card hacia `/contact`.
- About ya no contiene el explorador, los estantes ni los intereses, y sigue
  enlazando a `/experience`.
- El navbar trae los siete enlaces en el orden acordado.
- Proyectos enlaza a `/stack` y ya no carga la `TalkBand`.
- Las pruebas de datos existentes (`reading`, `techStack`, `StackExplorer`…)
  pasan sin cambios.
- Revisión en navegador, escritorio y móvil: cada página, cada card y cada
  animación, en claro y oscuro, y con movimiento reducido.

## Fuera de alcance

- Rediseñar el contenido del muro, los estantes o los intereses.
- Cambiar las animaciones existentes.
- Tocar el pie de página (`SiteFooter`).
