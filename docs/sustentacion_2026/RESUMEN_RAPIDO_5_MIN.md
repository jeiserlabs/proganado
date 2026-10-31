# Resumen rápido — ProGanado (5 minutos antes de entrar)

> Esta versión reemplaza el resumen viejo de 12–15 minutos. El formato oficial es **10 a 12 minutos + 5 de preguntas**.
> Equipo: Jeiser Gutiérrez, Sebastián Correa, Emilio Villanueva y Dr. Héctor Pinto.

## Las 10 ideas que deben quedar

1. **HTML es el esqueleto**, no un lenguaje de programación.
2. **CSS es la presentación**: color, espacio, borde, tipografía y responsive.
3. **`id` es único; `class` se repite; `name` es la llave del dato** que viaja al servidor.
4. **`div` es una caja genérica; `section` es una sección con tema y título.**
5. **Modelo de caja**: contenido, padding, borde y margen; `border-box` incluye todo en el ancho.
6. **Flexbox** alinea en un eje principal y uno cruzado; el grid de Bootstrap es Flexbox con nombres.
7. **Bootstrap 5.3.3** da componentes y utilidades; su bundle activa carrusel, modal y menú móvil.
8. **La maqueta oficial no tiene JavaScript propio**: solo el bundle de Bootstrap y dos atributos inline (`window.print()` y `onsubmit="return false"`).
9. **SQLite es un archivo, no un servidor**: el formulario envía POST, Python valida y guarda, la tabla relee.
10. **La IA fue una herramienta auditada**, no la autora: prototipo, revisión y documentación con verificación humana.

## Reparto oficial (10–12 min + 5)

| Tiempo | Quién | Idea que debe quedar |
|---|---|---|
| 0:00–2:30 | Dr. Héctor Pinto | El dolor de Colanta y el riesgo sanitario. |
| 2:30–5:30 | Emilio Villanueva | Cinta Roja, telemetría AM/PM y pastoreo PRV. |
| 5:30–7:00 | Jeiser Gutiérrez | Modelo relacional de 12 tablas 3FN e integridad. |
| 7:00–9:00 | Sebastián Correa | Frontend Bootstrap y demo en navegador. |
| 9:00–11:30 | Jeiser Gutiérrez | Modelo B2B, ROI, equipo y hoja de ruta cloud. |
| 11:30–12:00 | Todo el equipo | Cierre. |
| 12:00–17:00 | Todo el equipo | Preguntas del jurado. |

## Números canónicos

- **12 tablas, 7 índices, 1 vista.** SQLite dev / PostgreSQL prod.
- **116 aretes de ejemplo**, no 163 vacas reales.
- **8 registros** en el dashboard; **480 L** y **4.0 °C** son ejemplos.
- **90 alerta / 100 meta / 120 crítico** días abiertos.
- **Free 0 / Pro 119k / Multi-Predio 299k COP/mes.
- **23/23 tests** de Node.
- **FK:** RESTRICT historial clínico, CASCADE dependientes, SET NULL potrero.

## Lo que NO se dice

- “JWT”, “CI/CD”, “Playwright E2E”, “100% en producción” o “telemetría real”.
- “163 bovinos” o “249k COP” como si fueran datos reales.
- “SQL Server”; el motor es SQLite/PostgreSQL.
- “Camila” en el equipo; se retiró el 26-sep-2026.

## Demo en 6 pasos

1. Abrir la página en vivo: https://jeiserlabs.github.io/proganado-producto-momento-2/
2. Landing → login demo → dashboard.
3. Señalar el aviso: “tabla, filtro y formulario son visuales”.
4. Abrir `demo_sqlite/iniciar_demo.bat`.
5. Registrar un bovino y mostrar la tabla SQLite.
6. Cerrar con: “la persistencia real de esta fase está en la demo SQLite; el modelo completo está en el DDL”.

## Top 8 preguntas

1. **¿La página guarda?** La maqueta no; la demo SQLite sí, en una tabla didáctica.
2. **¿Hay login real?** No: GET a dashboard, sin JWT ni rol.
3. **¿Por qué Bootstrap?** Se vio en clase, trae componentes y no exige build.
4. **¿Por qué SQLite?** Es un archivo; ideal para demo y para enseñar el flujo.
5. **¿Por qué PostgreSQL?** Producción: concurrencia, tipos y respaldo.
6. **¿Qué es Cinta Roja?** Bloqueo por retiro de antibiótico; fail-closed en SQL/TS.
7. **¿PSeInt es fail-closed?** Sí: bloquea el último día y libera al siguiente; quedó alineado con SQL/TS el 31-oct-2026.
8. **¿La IA hizo el proyecto?** No: se usó como herramienta y se auditó; el equipo explica cada decisión.

## Tres frases para memorizar

1. “La IA nos dio el qué; el estudio nos dio el cómo; SQLite nos dio el dónde.”
2. “No presentamos una página perfecta: presentamos una página que entendemos.”
3. “Si no lo podemos explicar, no lo incluimos.”
