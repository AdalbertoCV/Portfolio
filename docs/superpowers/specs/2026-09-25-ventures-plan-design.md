# Plan de operaciones de las ventures — diseño (v2)

Fecha: 2026-09-25 · Estado: en revisión

v2 sustituye a v1: el plan vive en /ventures en lugar de una página propia, y
cada etapa se desglosa por frentes de trabajo en lugar de cinco renglones.

## Propósito

Convertir el "inicio de operación formal — enero 2027" de Moonphase y
StackSelect de promesa en plan ejecutable, atado a la misión y la visión de
cada empresa. Es, ante todo, el recordatorio de Adal de en qué ponemos el foco
en cada etapa; en segundo lugar, una carta de presentación ante socios,
clientes e inversionistas.

## Decisiones tomadas

| Decisión | Elección |
|---|---|
| Visibilidad | Pública y narrativa. Sin montos, precios, márgenes, pipeline, nombres de clientes (salvo PuntoBienestar, ya público), aliados sin cerrar ni rúbricas de evaluación. Los nichos se describen por tipo. |
| Voz | Primera persona del plural: "Estamos aquí", "En qué ponemos el foco". |
| Freelance | Incubadora de Moonphase: etapa 0. Su cartera pasa a Moonphase en enero de 2027. |
| Ritmo | Fechas objetivo más criterios de salida; se avanza por criterio cumplido. |
| Ubicación | Sección `#plan` dentro de /ventures, debajo de las tarjetas de las empresas. Sin página propia. |
| Profundidad | Por etapa y empresa: objetivo atado a la visión, modelo de negocio, métricas, frentes de trabajo con acciones, riesgos con mitigación y criterios de salida. |

## Estructura de la sección

1. Encabezado (h2): "De la promesa al plan" y lede.
2. "En qué ponemos el foco ahora": acciones de la etapa actual.
3. Selector de etapa (tablist): cuatro nodos con ventana de fechas; "Estamos
   aquí" en la etapa actual.
4. Selector de empresa (tablist): "Freelance → Moonphase" (en Incubar) o
   "Moonphase", y "StackSelect".
5. Panel de la empresa y etapa seleccionadas, a todo lo ancho, en el color de
   la marca:
   - Objetivo de la etapa.
   - Modelo de negocio y métricas que miramos.
   - Frentes de trabajo en cuadrícula, cada uno con su lista de acciones.
   - Riesgos, cada uno con su mitigación.
   - Criterios de salida (checklist con estado), u "horizonte" en Explotar.

Entradas: `StageChip` en /moonphase, /stackselect y /freelance, con destino
`/ventures#plan`; al llegar con `#plan`, la página baja a la sección. En el
hub no hay chip: el plan ya está ahí.

Se elimina: la ruta /ventures/plan, `meta.plan`, la entrada del sitemap, el
pie "Volver a Ventures" y las llaves `plan.back`, `plan.hubCta`, `plan.badge`.

Arreglos de la revisión de v1 que se incorporan: contraste del chip en tema
claro (texto con `--brand-text` y `--color-text-secondary`), anillo de foco
visible dentro del selector con scroll, línea del camino que no se corta en
celular, panel enfocable (`tabIndex=0`) y textos de estado de al menos 0.8rem.

## Frentes por empresa

- Moonphase: Operación y método · Tecnología e I+D · Comercial y cartera ·
  Finanzas y legal · Equipo y cultura · Marca y evidencia.
- StackSelect: Programa de formación · Plataforma de evaluación · Empresas
  contratantes · Captación de talento · Finanzas y legal · Equipo y cultura ·
  Marca y evidencia.

Una etapa puede omitir un frente cuando no tiene acción propia en ella.

## Contenido

### Etapas

- Incubar · Ene 2025 — Dic 2026 · Probar que el método aguanta antes de
  pedirle a alguien que apueste por él.
- Estabilizar · 2027 · Operación formal que se sostiene sola.
- Escalar · 2028 — 2029 · Crecer sin ser el cuello de botella.
- Explotar · 2030 en adelante · Convertir lo construido en activos.

En qué ponemos el foco ahora (Incubar):
1. Constituir las dos empresas antes de enero de 2027.
2. Convertir cada proyecto entregado en un expediente de Moonphase.
3. Cerrar las primeras colocaciones de StackSelect y, con ellas, el modelo de cobro.

---

### Moonphase · Incubar

**Objetivo:** Demostrar con proyectos entregados que el método convierte ideas
en sistemas que se adoptan. Es la primera evidencia de la visión: cosas que
existen porque existimos.

**Modelo:** Proyecto de alcance cerrado y precio fijo, cotizado contra un
entregable medible.

**Métricas:** Proyectos entregados con expediente · Sistemas que siguen en
operación después de la entrega · Clientes que repiten o refieren.

**Operación y método**
- Formalizar el método en una plantilla de factibilidad y un formato de expediente.
- Aplicarlo a cada proyecto nuevo, sin excepción.
- Reescribir PuntoBienestar y los proyectos freelance como expedientes.

**Tecnología e I+D**
- Abrir una bitácora de problemas abiertos: las ideas que llegan y todavía no son ejecutables.
- Elegir el primer problema de I+D y partirlo en pedazos ejecutables.

**Comercial y cartera**
- Proponer a cada cliente de la cartera freelance continuar con Moonphase.
- Elegir dos o tres nichos del carril 1 donde ya hay un caso resuelto: agenda clínica, trámites institucionales, inventario.
- Una oferta escrita con alcance, entregable y precio fijo.

**Finanzas y legal**
- Constituir la sociedad y darla de alta para facturar.
- Separar las finanzas de la empresa de las personales y formar una reserva operativa.
- Un contrato tipo donde el cliente acepta que el resultado negativo también se entrega documentado, con la propiedad intelectual definida por proyecto.

**Equipo y cultura**
- Los siete valores como criterio de admisión de proyectos.
- Una red de colaboradores por proyecto antes de contratar a nadie.

**Marca y evidencia**
- Sitio propio en enero de 2027, con los casos publicados.
- Cada expediente tratado como evidencia pública, incluido el negativo.

**Riesgos**
- Que todo dependa del tiempo de un solo fundador. → Alcance cerrado y un calendario de entregas realista.
- Aceptar proyectos fuera del método para tener ingreso. → Un criterio de admisión escrito, aplicado antes de cotizar.

**Criterios de salida:** ◐ Moonphase constituida legalmente · ◐ Los proyectos
entregados, reescritos como expedientes · ○ La cartera freelance transferida a
Moonphase como su cartera inicial.

### Moonphase · Estabilizar

**Objetivo:** Que el carril 1 pague la operación y el carril 2 empiece a
producir conocimiento: la visión deja de depender de un proyecto a la vez.

**Modelo:** Proyectos cerrados más contratos de mantenimiento y soporte sobre
lo entregado, que vuelven recurrente parte del ingreso.

**Métricas:** Proporción del ingreso que es recurrente · Margen por proyecto
contra lo cotizado · Expedientes del carril 2 abiertos y cerrados.

**Operación y método**
- Contratos de mantenimiento y soporte ofrecidos al cierre de cada entrega.
- Un tablero interno de proyectos: alcance, avance y desviación contra lo cotizado.
- Un catálogo de las soluciones del carril 1 que ya se repitieron.

**Tecnología e I+D**
- Una parte fija del ingreso y del tiempo destinada al carril 2, protegida del día a día.
- Cerrar el primer expediente de I+D con su mapa de condiciones.
- Someter el primer proyecto de I+D a una convocatoria pública de innovación.

**Comercial y cartera**
- De la referencia al canal: casos publicados por nicho y contacto directo con empresas de ese nicho.
- Alianzas con despachos, consultoras e integradores que ya atienden a esos nichos.

**Finanzas y legal**
- Contabilidad formal y precios revisados contra el margen real.
- Registro de marca y una política de propiedad intelectual sobre lo que se construye en el carril 2.

**Equipo y cultura**
- El primer colaborador recurrente en ingeniería, con el método como inducción.
- Cada proyecto cerrado, revisado contra los siete valores.

**Marca y evidencia**
- Un expediente publicado cada trimestre, positivo o negativo.
- Presencia en comunidades técnicas y de automatización de la región.

**Riesgos**
- Que el carril 1 se coma todo el tiempo y el carril 2 nunca arranque. → Tiempo y presupuesto del carril 2 asignados de antemano, no con lo que sobre.
- Ingreso concentrado en pocos clientes. → Ningún cliente por encima de una parte acotada del ingreso, y varios nichos abiertos.

**Criterios de salida:** ○ El ingreso recurrente cubre la operación · ○ El
primer expediente del carril 2 cerrado, con resultado positivo o negativo.

### Moonphase · Escalar

**Objetivo:** Que Moonphase entregue sin que el fundador sea el cuello de
botella, para que las ideas convertidas en realidad crezcan más rápido que el
equipo.

**Modelo:** Proyectos más una cartera de soporte, y los primeros componentes
reutilizables del carril 1 vendidos como producto.

**Métricas:** Proyectos entregados sin intervención directa del fundador ·
Ingreso por producto contra ingreso por proyecto · Tiempo desde la idea hasta
el primer entregable.

**Operación y método**
- El método escrito como manual, de modo que cualquier ingeniero lo ejecute igual.
- Líderes de proyecto que responden por el resultado de principio a fin.
- Componentes reutilizables del carril 1 empaquetados como producto.

**Tecnología e I+D**
- Un portafolio de problemas abiertos, priorizado por impacto.
- Colaboración con universidades y centros de investigación en los expedientes del carril 2.

**Comercial y cartera**
- Una industria ancla, con varios clientes que se parecen entre sí.
- Venta de producto además de proyecto.

**Finanzas y legal**
- Ronda ángel o pre-semilla, levantada sobre métricas reales.
- Gobierno corporativo básico: consejo asesor y reportes periódicos a inversionistas.

**Equipo y cultura**
- Primeras contrataciones técnicas de tiempo completo.
- La cultura escrita: cómo decidimos cuando la decisión no es obvia.

**Marca y evidencia**
- Reconocidos en el nicho por los expedientes, no por la publicidad.

**Riesgos**
- Crecer el equipo más rápido que el método. → Nadie lidera un proyecto sin haber ejecutado antes el método completo.
- Levantar capital antes de tener métricas. → La ronda se abre solo con los criterios de Estabilizar cumplidos.

**Criterios de salida:** ○ Un proyecto entregado de principio a fin sin
intervención directa del fundador · ○ Ronda levantada sobre métricas reales, no
sobre la promesa.

### Moonphase · Explotar

**Objetivo:** Convertir los expedientes de I+D que funcionaron en productos,
spin-offs y licencias. La medida de la visión es cuántas cosas existen porque
existimos.

**Modelo:** Producto y licenciamiento sobre la investigación propia, además de
la operación de servicios.

**Métricas:** Productos o spin-offs nacidos del carril 2 · Ingreso por
licenciamiento · Expedientes negativos reabiertos porque cambiaron las
condiciones.

**Tecnología e I+D**
- Un proceso para convertir un expediente exitoso en producto o en empresa.
- Reabrir los expedientes negativos cuando cambia el estado del arte.

**Comercial y cartera**
- Clientes de producto en más de una industria.

**Finanzas y legal**
- Ronda semilla o serie A según tracción, o crecimiento con capital propio.
- Una estructura para spin-offs: participación, licencias y propiedad intelectual.

**Equipo y cultura**
- Equipos por producto, con el método como lenguaje común.

**Riesgos**
- Perder el método al crecer. → El expediente sigue siendo obligatorio en todos los equipos, incluidos los de producto.

**Criterios de salida:** ninguno; es el horizonte.

---

### StackSelect · Incubar

**Objetivo:** Demostrar que el método coloca: que un desarrollador sin
experiencia sale de una generación con empleo, y que una empresa paga por
ello. Es la primera evidencia del propósito: talento joven dentro de la
industria.

**Modelo:** Validar quién paga y por qué: el candidato, la empresa contratante
o ambos. La hipótesis de trabajo es que paga la empresa, por colocación.

**Métricas:** Candidatos colocados por generación · Tiempo desde el ingreso
hasta la colocación · Empresas que entrevistan a nuestros candidatos.

**Programa de formación**
- Cerrar el temario de las primeras generaciones con la validación de profesionales en ejercicio.
- Evaluar a cada candidato al entrar y al salir, con el mismo criterio que usará la empresa.
- Documentar el caso de cada colocado: de dónde partió, qué se reforzó y dónde entró.

**Plataforma de evaluación**
- La primera versión de la evaluación técnica, aunque se opere a mano.
- Definir los criterios de certificación de un candidato.

**Empresas contratantes**
- Una lista corta de empresas dispuestas a entrevistar a las primeras generaciones.
- Conversaciones de precio con esas empresas: cuota por colocación y garantía de reemplazo.

**Captación de talento**
- Captación en universidades y comunidades de Zacatecas, empezando por la red de la UAZ.
- Criterios de admisión que midan disposición y base, no experiencia previa.

**Finanzas y legal**
- Constituir la sociedad y darla de alta para facturar.
- Un contrato con la empresa que defina cuota, garantía y plazo.
- Un acuerdo con el candidato que deje claro que el entregable es la colocación, no el curso.

**Equipo y cultura**
- Mentores e instructores en ejercicio como colaboradores por generación.
- Compromiso, empatía y solidaridad como criterio para elegirlos.

**Marca y evidencia**
- Sitio propio en enero de 2027.
- Las primeras historias de colocación publicadas, con permiso del candidato.

**Riesgos**
- Formar candidatos que ninguna empresa contrata. → Temario validado por empresas antes de cada generación, no después.
- Que el candidato cargue con el costo. → La hipótesis de cobro apunta a la empresa desde el inicio.

**Criterios de salida:** ◐ StackSelect constituida legalmente · ◐ Primeras
colocaciones reales, documentadas de principio a fin · ○ Modelo de cobro
validado con al menos una empresa que pague.

### StackSelect · Estabilizar

**Objetivo:** Que la colocación sea repetible: generaciones regulares, una tasa
de colocación sostenida y empresas que vuelven. El propósito deja de depender
de una sola generación.

**Modelo:** La empresa contratante paga una cuota por colocación. El costo para
el candidato se mantiene mínimo o nulo, porque es la población que todavía no
tiene ingreso.

**Métricas:** Tasa de colocación por generación · Empresas que vuelven a
contratar · Permanencia del colocado en su empleo.

**Programa de formación**
- Un calendario fijo de generaciones.
- Rutas por perfil: backend, frontend y datos.
- Seguimiento del colocado en sus primeros meses de empleo.

**Plataforma de evaluación**
- La evaluación como sistema propio, con reportes que la empresa entiende.
- Un banco de ejercicios y rúbricas versionado.

**Empresas contratantes**
- Convenios con empresas aliadas que contratan por generación.
- Presencia en ferias de empleo y bolsas de trabajo del sector.

**Captación de talento**
- Alianzas formales con universidades de la región.
- Becas o costo diferido para quien no puede pagar.

**Finanzas y legal**
- Fondos públicos de empleo juvenil y vinculación.
- Contabilidad formal y precio revisado contra el costo real por colocación.

**Equipo y cultura**
- El primer coordinador de generaciones.
- Evaluadores capacitados en el criterio de certificación.

**Marca y evidencia**
- La tasa de colocación publicada, calculada siempre de la misma forma.
- Testimonios de empresas y de colocados.

**Riesgos**
- Bajar el estándar de evaluación para colocar más. → La certificación no cambia por presión de volumen, y se reporta la tasa real.
- Depender de pocas empresas contratantes. → Una cartera de empresas aliadas en más de una industria.

**Criterios de salida:** ○ Tasa de colocación documentada y sostenida por
varias generaciones · ○ Empresas que vuelven a contratar.

### StackSelect · Escalar

**Objetivo:** Colocar a más jóvenes de los que el equipo fundador podría formar
solo, y convertir la evaluación en un producto que las empresas usan por su
cuenta.

**Modelo:** Se suma la evaluación como servicio: la empresa paga por evaluar a
sus propios candidatos con el criterio de StackSelect.

**Métricas:** Generaciones que corren sin los fundadores · Empresas que usan la
plataforma sin contratar por colocación · Costo por colocación.

**Programa de formación**
- Instructores y evaluadores propios, con el método como estándar.
- Nuevas rutas según lo que piden las empresas aliadas.

**Plataforma de evaluación**
- La plataforma de evaluación como producto independiente.
- Integración con los procesos de reclutamiento de las empresas.

**Empresas contratantes**
- La evaluación vendida como servicio a empresas que reclutan por su cuenta.

**Captación de talento**
- Captación en más estados, en línea y presencial.

**Finanzas y legal**
- Ronda ángel o pre-semilla sobre la tracción de colocación.
- La plataforma y los criterios de evaluación protegidos como propiedad intelectual.

**Equipo y cultura**
- Un equipo de producto para la plataforma.
- Liderazgo de operación separado del liderazgo técnico.

**Riesgos**
- Que la plataforma distraiga del entregable, que es la colocación. → La plataforma también se mide por las colocaciones que ayuda a producir.
- Perder calidad al crecer las generaciones. → El tamaño de cada generación lo limitan los evaluadores certificados, no la demanda.

**Criterios de salida:** ○ Generaciones que corren sin que los fundadores
impartan ni evalúen · ○ La plataforma con clientes propios.

### StackSelect · Explotar

**Objetivo:** Reducir de forma medible el desempleo de recién egresados en
tecnología, en más regiones y en más perfiles de talento.

**Modelo:** Colocación y plataforma en más mercados.

**Métricas:** Colocados acumulados · Regiones y verticales activas · Ingreso de
la plataforma.

**Programa de formación**
- Nuevas verticales de talento más allá del desarrollo de software.

**Plataforma de evaluación**
- La plataforma en más mercados, con el criterio de StackSelect como referencia de la industria.

**Empresas contratantes**
- Empresas fuera de la región de origen.

**Finanzas y legal**
- Ronda semilla o serie A según tracción.

**Riesgos**
- Perder el vínculo con el candidato al convertirse en plataforma. → La colocación sigue siendo la métrica principal de la empresa.

**Criterios de salida:** ninguno; es el horizonte.

La versión en inglés se traduce de este texto sin cambiar el contenido.

## Arquitectura

- `src/components/ventures/plan.js`: estructura. Etapas, `CURRENT_STAGE`,
  empresas, frentes por empresa (orden y claves), qué frentes aparecen en cada
  etapa, criterios de salida con estado y acciones de foco.
- Textos en `brands.es.js` y `brands.en.js` bajo `plan:`. Las listas
  (acciones, métricas, riesgos) son arreglos, leídos con `tl()`.
- `VenturesPlan.jsx`: la sección (h2, `id="plan"`), montada por `ventures.jsx`.
- `StageChip.jsx`: enlace a `/ventures#plan`.
- `ventures.jsx`: al montar con `#plan` en la URL, baja a la sección.

## Accesibilidad

- Dos tablists con flechas (con vuelta), Inicio y Fin; tabs con roving
  tabindex; panel con `aria-labelledby` y `tabIndex=0`.
- Estados de criterio anunciados en texto.

## Pruebas

- `plan.test.js`: `CURRENT_STAGE` válido; cada llave y lista referenciada existe
  y no está vacía en ambos idiomas; las listas tienen la misma longitud en
  español e inglés; cada riesgo tiene `risk` y `mitigation`.
- `VenturesPlan.test.jsx`: abre en la etapa actual y en Moonphase; las flechas
  dan la vuelta en ambos selectores; el título Freelance → Moonphase solo en
  Incubar; foco solo en la etapa actual; horizonte en Explotar; frentes y
  riesgos presentes; los estados se anuncian en texto.
- `StageChip.test.jsx`: enlace a `/ventures#plan`.
- `ventures.test.jsx`: /ventures contiene la sección; con `#plan` llama a
  `scrollIntoView` sobre ella.
- Build limpio; en el navegador, ambos temas, 1280 y 390, ambos idiomas.
