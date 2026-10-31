# Cómo estudiar ProGanado para el 14-Nov-2026

> **Defensa:** sábado 14 de noviembre de 2026 · CESDE Medellín · 10 a 12 minutos + 5 de preguntas.
> **Equipo:** Jeiser Gutiérrez (Tech Lead, BD/QA), Sebastián Correa (Frontend), Emilio Villanueva (Lógica/PSeInt), Dr. Héctor Pinto (Sanidad veterinaria).
> **Regla de oro:** si no lo puedes explicar, no lo incluyas. Todo dato de esta carpeta está verificado contra el código, el DDL o la maqueta.

## Ruta de estudio en 7 sesiones

| Sesión | Qué leer | Qué debes poder explicar |
|---|---|---|
| 1 | `00_PLAN_DE_SUSTENTACION_Y_ROLES.md` | Quién habla, en qué minuto y con qué diapositiva. |
| 2 | `01_PRESENTACION_PITCH_DECK/GUION_Y_NOTAS_ORADOR_12_SLIDES.md` | Tu guion palabra por palabra y la transición a tu compañero. |
| 3 | `02_GUIAS_DE_ESTUDIO_POR_INTEGRANTE/00_GUIA_MAESTRA_COMPLETA_101_PAGINAS.pdf` (tu bloque) | El concepto técnico de tu rol con ejemplo. |
| 4 | Tu guía individual (`01` a `04`) | Respuestas cortas a las preguntas del jurado. |
| 5 | `06_RESUMEN_RAPIDO_5_MIN.md` + `05_GUIA_PROGANADO_FOR_DUMMIES.pdf` | Repaso sin apuntes. |
| 6 | `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/` y la página en vivo | Recorrido completo: landing → login demo → dashboard → SQLite. |
| 7 | Ensayo cronometrado | Quedar en 10–12 min, con demo y preguntas. |

## Qué mostrar en la demo

1. **Página en vivo:** https://jeiserlabs.github.io/proganado-producto-momento-2/
2. **Landing:** `landing.html` (si la abres en local, está en `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/bootstrap_m2/`).
3. **Login demo:** `index.html` → el formulario hace un GET a `dashboard.html`; no valida credenciales ni crea sesión.
4. **Dashboard:** tabla, buscador y filtro son visuales; el aviso en pantalla lo dice.
5. **Persistencia real:** `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/demo_sqlite/iniciar_demo.bat` → `http://127.0.0.1:8000`. Es una demo didáctica de **una tabla**, no el DDL de 12 tablas.

## Datos que no se cambian

- **12 tablas 3FN, 7 índices, 1 vista.** SQLite en desarrollo, PostgreSQL en producción.
- **116 aretes de ejemplo.** No son 163 vacas reales ni tracción comercial.
- **FK:** RESTRICT en historial clínico, CASCADE en tablas dependientes, SET NULL al desasignar potrero.
- **Cinta Roja:** fin = `fecha_tratamiento + dias_retiro_ica`; se bloquea si hoy <= fin. SQL/TS son fail-closed; **PSeInt todavía libera el último día** (deuda declarada).
- **UFC:** TypeScript probado con +80/+40/0/−120; PSeInt usa +120/+50/0/−150. Es una inconsistencia conocida, no la escondas.
- **Planes:** Free 0 / Pro 119k COP/mes / Multi-Predio 299k COP/mes.
- **Días abiertos:** 90 alerta, 100 meta, 120 crítico (TS).
- **Demo:** 8 registros en el dashboard; 480 L y 4.0 °C son datos de ejemplo, no telemetría real.

## Preguntas que te van a hacer

| Pregunta | Respuesta corta |
|---|---|
| ¿La página guarda datos? | La maqueta no; la demo SQLite sí, en una tabla didáctica. |
| ¿Hay login real? | No en esta fase: es un acceso demo sin JWT ni rol real. |
| ¿Es un SaaS en producción? | No. Es un prototipo académico con datos de ejemplo. |
| ¿Por qué SQLite? | Es un archivo, no un servidor; sirve para la demo y para aprender el flujo. |
| ¿Por qué PostgreSQL? | Es el motor previsto para producción por concurrencia e integridad. |
| ¿Qué pasa si una vaca está en Cinta Roja? | Se bloquea el ordeño hasta cumplir el retiro; el último día es el P0 de PSeInt. |
| ¿Qué es la vista de Cinta Roja? | `v_bovinos_cinta_roja`; no es una columna de `bovinos`. |

## Reglas de honestidad

- No digas “100%” si no está medido.
- No digas “en producción” si es GitHub Pages con una maqueta.
- No digas “JWT”, “CI/CD”, “Playwright” ni “telemetría real” si no está en esta fase.
- Si te preguntan por un P0, dilo: “está declarado y es lo siguiente que corregimos”.
- El médico del equipo es el **Dr. Héctor Pinto**. Camila Salas se retiró el 26-sep-2026 y no se menciona.
