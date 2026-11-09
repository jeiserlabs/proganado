# Cómo estudiar ProGanado para el 14-nov-2026

> **Defensa:** sábado 14 de noviembre de 2026 · CESDE Medellín · 10 a 12 minutos + 5 de preguntas.
> **Equipo:** Jeiser Gutiérrez (Tech Lead, BD/QA), Sebastián Correa (Frontend), Emilio Villanueva (Lógica/PSeInt/UI), Humberto Pinto (médico cardiólogo, sanidad animal).
> **Regla de oro:** si no lo puedes explicar, no lo incluyas. Todo dato de esta carpeta está verificado contra el código, el DDL o la app.

## Ruta de estudio en 7 sesiones

| Sesión | Qué leer | Qué debes poder explicar |
|---|---|---|
| 1 | Hub `04_EXPOSICION_7_PASOS/GUION_Y_PREGUNTAS_7_PASOS_PROGANADO.pdf` | Quién habla, en qué minuto y con qué paso. |
| 2 | Hub `04_EXPOSICION_7_PASOS/DECK_7_PASOS_PROGANADO.pdf` | El hilo Problema → Solución → Arquitectura → Datos → Demo → Escalabilidad → Cierre. |
| 3 | Hub `02_GUIAS_DE_ESTUDIO_POR_INTEGRANTE/GUIAS_DESDE_CERO/GUIA_01...pdf` | Qué es el producto web, cómo se conecta HTML/CSS/JS con Python y SQLite. |
| 4 | Guía 02 (NoSQL) y Guía 03 (SQL) | Las 5 colecciones, las 12 tablas y las 10 consultas T-SQL. |
| 5 | Tu guía individual (`01_GUIA_JEISER...`, `02_GUIA_FRONTEND...`, `03_GUIA_EMILIO...`) | El concepto técnico de tu rol con un ejemplo. |
| 6 | App `ProGanado_M2` | Recorrido: login/2FA → inicio → ganado → salud → producción → contabilidad. |
| 7 | Ensayo cronometrado | Quedar en 10–12 min, con demo y preguntas. |

## Qué mostrar en la demo

1. **Abrir la app:** `ProGanado_M2/Iniciar ProGanado.bat` o `python servidor.py` → `http://127.0.0.1:8899/index.html`.
2. **Primer uso:** crear la cuenta administradora; el código 2FA aparece en pantalla si no hay Gmail configurado.
3. **Inicio:** métricas del hato, agenda sanitaria, composición y última entrega.
4. **Ganado:** buscar por arete, filtro por estado, abrir hoja de vida y registrar un animal.
5. **Salud:** tratamiento con retiro ICA y bloqueo de leche.
6. **Producción / Contabilidad:** pesajes, entregas, CSV y reporte PDF.
7. **Persistencia:** explicar que los datos viven en `datos/proganado.sqlite3` y que la app funciona sin internet.

## Datos que no se cambian

- **12 tablas 3FN, 7 índices, 1 vista.** SQLite en el MVP; PostgreSQL en la hoja de ruta.
- **116 aretes de ejemplo** (la app puede mostrar 117–119 si se agregan animales en la demo). No son vacas reales.
- **FK:** RESTRICT en historial clínico, CASCADE en tablas dependientes, SET NULL al desasignar potrero.
- **Cinta Roja:** fin = `fecha_tratamiento + dias_retiro_ica`; se bloquea si hoy <= fin. SQL/TS **y PSeInt** son fail-closed desde el 31-oct-2026: el último día sigue bloqueado y se libera al siguiente.
- **UFC:** tabla única +80/+40/0/−120 en TypeScript y PSeInt; los tests la congelan.
- **Planes:** Free 0 / Pro 119k COP/mes / Multi-Predio 299k COP/mes.
- **Días abiertos:** 90 alerta, 100 meta, 120 crítico (TS).

## Preguntas que te van a hacer

| Pregunta | Respuesta corta |
|---|---|
| ¿La página guarda datos? | El MVP sí: SQLite local a través del servidor Python. La variante React de GitHub Pages no. |
| ¿Hay login real? | Hay login local con PBKDF2-SHA256 + 2FA; usuarios y sesión viven en `localStorage`. No es autenticación de servidor; eso es Fase 2.1. |
| ¿Es un SaaS en producción? | No. Es un MVP local con datos de ejemplo y una hoja de ruta explícita. |
| ¿Por qué SQLite? | Es un archivo, no un servidor; permite operar sin internet y sin costo. |
| ¿Por qué PostgreSQL? | Es el motor previsto para producción por concurrencia, respaldo y multiusuario. |
| ¿Qué pasa si una vaca está en Cinta Roja? | Se bloquea el ordeño hasta cumplir el retiro, incluido el último día; se libera al siguiente. |
| ¿Qué es la vista de Cinta Roja? | `v_bovinos_cinta_roja`; no es una columna de `bovinos`. |
| ¿Por qué la página de GitHub Pages es React y el producto es vanilla? | React quedó como referencia visual; el producto canónico es la app de Emilio porque necesita Python/SQLite para persistir. La refactorización React es Fase 2.2. |
| ¿Cómo se protege la leche? | La regla fail-closed bloquea el pesaje y la entrega de un animal en retiro; el último día sigue bloqueado. |

## Reglas de honestidad

1. No digas que hay JWT, HTTPS o multiusuario: no existen todavía.
2. No digas que la app está en la nube: se ejecuta en `127.0.0.1`.
3. No inventes cifras: usa las de esta guía y las de la app.
4. Si no sabes algo, di “está en la Fase 2.1/2.2” y explica el plan.
5. La deuda declarada no es debilidad: es madurez de ingeniería.
6. El asesor clínico es **Humberto Pinto**, médico cardiólogo. Camila Salas se retiró el 26-sep-2026 y no se menciona.
