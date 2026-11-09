# ProGanado — Elevator Pitch 4 voces (14-nov-2026)

> **Versión 1 — 08-nov-2026.** El profesor solo pide un elevator pitch; no exige retitular diapositivas.
>
> **Equipo:** Emilio Villanueva (problema y reglas de negocio) · Humberto Pinto (consecuencias clínicas) · Sebastián Correa (diseño) · Jeiser Gutiérrez (sistema, rendimiento y escalabilidad).
>
> **Duración:** dos versiones: corta de 90-100 segundos (§1) y extendida de 4:45 minutos (§1.1). El profesor no exige una duración; la extendida es la recomendada para la defensa.
>
> **Repositorio oficial:** https://github.com/jeiserlabs/proganado
>
> **Página en vivo (maqueta del Momento 2):** https://jeiserlabs.github.io/proganado-producto-momento-2/

---

## 1. Guion corto (90-100 segundos)

### 0:00-0:17 — Emilio (problema y lo que vinimos a resolver)

> "Buenos días. En una finca de Antioquia, el dato más importante vive en una libreta que se moja. Si el mayordomo olvida una fecha, la vaca se ordeña antes de tiempo y el tanque se contamina. ProGanado nació para que ese dato viva en el teléfono, no en la memoria."

### 0:17-0:45 — Humberto (consecuencias clínicas y ventaja)

> "Yo soy Humberto Pinto, médico y asesor clínico del proyecto. Una vaca que pasa la fecha de parto sin seguimiento pierde fertilidad y produce menos leche. Y una vaca con antibiótico, ordeñada antes del retiro del ICA, contamina hasta 5.000 litros: la finca puede perder entre 5 y 25 millones de pesos. Por eso la cinta roja es un bloqueo, no un aviso. La ventaja es simple: menos riesgo y más leche vendible."

### 0:45-1:03 — Sebastián (diseño, color, forma, intuición)

> "Soy Sebastián Correa, diseño. Esa gravedad exige una interfaz obvia: botones grandes para usar con guantes, alto contraste para el sol y un rojo que el mayordomo entiende sin leer. El color no es decoración: es una señal de seguridad."

### 1:03-1:40 — Jeiser (sistema, 3G, base de datos, escalabilidad)

> "Soy Jeiser, tech lead. Lo resolvimos local-first: el teléfono registra sin señal y la base vive en el potrero. El MVP es HTML, CSS y JavaScript vanilla: 54 KB comprimido, cero peticiones externas. Modelo de doce tablas en 3FN, transacciones atómicas y ruta a PostgreSQL y a cientos de predios. En la Fase 2, Astro para la landing y React para el panel administrativo. La app del potrero sigue liviana porque el teléfono es 3G y de gama baja. Buscamos tres fincas piloto. Todo está en github.com/jeiserlabs/proganado. Quedamos atentos a sus preguntas."

---

## 1.1. Guion extendido (4:45, versión recomendada)

> Ensayar con cronómetro. Si el profesor aprieta, recortar la demo (30 s) y el roadmap; no recortar la cinta roja ni el cierre.

### 0:00-1:00 — Emilio (problema y lo que vinimos a resolver)

> "Buenos días. Somos ProGanado: Emilio Villanueva, Humberto Pinto, Sebastián Correa y Jeiser Gutiérrez. En una finca de Antioquia, el dato más importante vive en una libreta que se moja. El mayordomo anota el ordeño, el tratamiento, la fecha de parto; si se equivoca o se le olvida, la vaca se ordeña antes de tiempo y el tanque se contamina. No es un problema de falta de información: es información que llega tarde y en papel. ProGanado nació para que ese dato viva en el teléfono del potrero, sin internet, con una mano y en tres toques. Hoy tiene ocho módulos, login con segundo factor y un modelo de doce tablas; queremos que sea la hoja de vida digital de cada bovino en la finca colombiana."

### 1:00-2:15 — Humberto (consecuencias clínicas y ventaja)

> "Yo soy Humberto Pinto, médico y asesor clínico del proyecto. Cuando una vaca pasa la fecha de parto sin seguimiento, el riesgo no es solo perder un día: puede haber retención de placenta, metritis, problemas de fertilidad y más días abiertos. Cada día abierto es comida sin retorno: unos 20 mil pesos diarios por vaca en un escenario conservador. Y cuando una vaca recibe un antibiótico, la leche tiene un período de retiro del ICA. Si se ordeña antes, el residuo contamina hasta 5.000 litros del tanque: la finca puede perder entre 5 y 25 millones de pesos, además de la sanción y la pérdida de confianza de la cooperativa. Por eso la cinta roja no es un aviso: es un bloqueo. La ventaja es simple: menos riesgo clínico, menos leche descartada y más leche vendible. No soy veterinario; soy médico cardiólogo y estoy aprendiendo la parte veterinaria, pero el principio clínico es el mismo: un tratamiento sin trazabilidad es un riesgo."

### 2:15-3:30 — Sebastián (diseño, página e identidad visual)

> "Soy Sebastián Correa, diseño. Esa gravedad exige una interfaz obvia: botones grandes para usar con guantes, alto contraste para el sol y un rojo que el mayordomo entiende sin leer. El color no es decoración: es una señal de seguridad. En la página estamos unificando la identidad: hoy hay varios logos y textos que compiten; la idea es un solo logotipo distintivo, un símbolo para el favicon y las redes, y una organización clara: header con el logo, hero con la promesa, módulos con iconos consistentes y footer con la información legal. La paleta es verde bosque, verde esmeralda, dorado y rojo solo para la cinta roja; la tipografía es Inter para el cuerpo y Montserrat para los títulos. En 30 segundos les muestro cómo se ve en el teléfono: landing, login, dashboard, ficha del animal y el bloqueo de cinta roja."

**Demo (30 s, dentro del bloque de Sebastián):**

> "Este es el dashboard: los ocho módulos, el hato, la producción del día. Abro la ficha de una vaca, registro un tratamiento y el sistema calcula el retiro; si intento pesar leche, me bloquea. Todo corre local, sin internet."

### 3:30-4:45 — Jeiser (sistema, 3G, base de datos, escalabilidad y cierre)

> "Soy Jeiser, tech lead. Por dentro, ProGanado es local-first: el navegador habla con un servidor local en Python y una base SQLite; no hay nube en el MVP. El modelo formal son doce tablas en 3FN, con índices, una vista de cinta roja y transacciones atómicas: si falla el registro de un tratamiento, se hace rollback y no queda un registro huérfano. El frontend es HTML, CSS y JavaScript vanilla: 54 KB comprimido, cero peticiones externas. Eso es lo que permite que corra en un teléfono 3G de gama baja; las imágenes son el siguiente ajuste, de 1,4 MB a menos de 300 KB. Para escalar, la ruta es PostgreSQL, una API en TypeScript, multi-finca y un balanceador de carga cuando haya disponibilidad que proteger; no desde el día uno. En el roadmap están los números: 50 fincas el primer año, 500 al quinto, 5.000 al décimo; el punto de equilibrio cash llega con 3-5 fincas pagas y un sueldo de fundador con unas 135 fincas activas. En la Fase 2, Astro para la landing y React para el panel administrativo. Buscamos tres fincas piloto. Todo está en github.com/jeiserlabs/proganado. Gracias; quedamos atentos a sus preguntas."

**Cifras de respaldo del roadmap:** ver [`../PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md`](../PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md). Los paquetes de diapositivas y el brief de identidad están en `Desktop/ENTREGAS/06_DEFENSA_5MIN_GLM` y `Desktop/ENTREGAS/07_IDENTIDAD_VISUAL_SEBASTIAN` (fuera del repo: son binarios, Regla 29).

## 2. Qué dice cada uno y qué no

| Persona | Su terreno | No dice |
|---|---|---|
| **Emilio** | El problema operativo: libreta húmeda, arete perdido, dato que llega tarde; la promesa de ProGanado | Antibióticos, ICA, código, tablas, frameworks |
| **Humberto** | El riesgo clínico y económico: parto pasado, fertilidad, residuos, tanque, sanción; la ventaja de inocuidad | "Soy veterinario"; código, tablas, frameworks |
| **Sebastián Correa** | El diseño: paleta, contraste, botones, color semántico, uso con una mano y con guantes | "Bootstrap es el producto"; "React es el producto" |
| **Jeiser** | Sistema local-first, rendimiento en 3G, 12 tablas, ACID, ruta a PostgreSQL, escalabilidad | "React está en el MVP"; "Astro está en el MVP"; "AWS desplegado"; "las 12 tablas ya son físicas en el MVP"; "las 116 vacas son reales" |

### Ficha de Humberto (para que se defienda en su punto)

Humberto es **médico cardiólogo**, no veterinario, y está aprendiendo la parte veterinaria. No debe decir que es veterinario. Si el jurado pregunta por su rol, esta es la respuesta:

> "Soy médico cardiólogo y asesor clínico del proyecto. No soy veterinario; estoy aprendiendo la parte veterinaria. Pero el principio clínico es el mismo: un tratamiento sin trazabilidad es un riesgo. Mi aporte es la disciplina clínica y la lectura del riesgo, no la farmacopea veterinaria."

En el pitch se presenta como **"médico y asesor clínico del proyecto"**. Es verdad, no infla el cargo y le permite hablar de riesgo clínico sin invadir el terreno del veterinario.

### Ficha de Sebastián

Sebastián es el diseñador, no el desarrollador. Si le preguntan "¿tú hiciste el código?", la respuesta honesta es:

> "El diseño y la experiencia de usuario son míos; la implementación es del equipo. Yo defiendo por qué la interfaz se ve y se usa así."

---

## 3. Respuestas rápidas para Q&A

- **¿Por qué no usaron React en la app del potrero?**  
  "Porque el teléfono es 3G y de gama baja; React añade un runtime que no necesitamos en campo. Usamos vanilla en el MVP; React entra en la Fase 2 para el panel administrativo, donde hay Wi-Fi y estado complejo."

- **¿Astro entonces para qué?**  
  "Astro es un framework, no una librería: manda HTML estático y carga JavaScript solo en las islas que lo necesitan. Va para la landing pública en la Fase 2; la app del potrero sigue liviana."

- **¿Qué significa "atómico" en la base de datos?**  
  "ACID: una transacción se ejecuta completa o no se ejecuta. Si falla el registro del tratamiento o del retiro, se hace rollback y no queda un registro huérfano. No lo confundimos con Atomic Design, que es el concepto de diseño de Sebastián."

- **¿Las 12 tablas ya están en el MVP?**  
  "El modelo formal son 12 tablas en 3FN; el MVP operativo guarda JSON en SQLite para velocidad local. La normalización completa es la Fase 1, cuando conectemos PostgreSQL."

- **¿Los 116 animales son reales?**  
  "Son datos de prueba para demostrar el flujo; el piloto en finca es el siguiente paso."

- **¿Qué pasa si el teléfono no tiene señal?**  
  "La app es local-first: el registro vive en el teléfono y en la base local; cuando vuelve la señal, se sincroniza. El demo corre en 127.0.0.1:8899 sin internet."

- **¿Y el backend?**  
  "Python estándar + SQLite local en 127.0.0.1:8899; sin nube y sin dependencias externas. La conexión a PostgreSQL es la Fase 1 del roadmap, no una promesa del MVP actual."

- **¿Y las imágenes?**  
  "El código pesa 54 KB comprimido; las imágenes son el siguiente ajuste: medimos ~1,4 MB en el primer render y el objetivo es bajarlas a <300 KB con WebP/SVG. En 3G eso baja de ~11 s a ~2,4 s."

- **¿Qué hizo cada uno?**  
  Emilio: problema y reglas de negocio. Humberto: riesgo clínico. Sebastián: diseño y UX. Jeiser: arquitectura, datos, rendimiento y QA.

---

## 4. Checklist antes de salir

- Cada uno memoriza **su bloque**, no el guion completo.
- Pausa después de los números: 5.000 litros, 5-25 millones, 54 KB, 12 tablas.
- Mirar al jurado, no a la pantalla.
- El enlace del repositorio va en la última diapositiva y se dice una vez.
- Si alguien se pierde, el siguiente empieza con su frase de entrada; no hay silencio.
- No leer. No decir "Atom". No decir "veterinario". No decir "React está en el MVP".
