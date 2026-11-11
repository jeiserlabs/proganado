# ProGanado — SSOT de rutas, repositorios y timeline única

> **Este archivo manda.** Si otro documento dice una ruta, un repo o una fecha distinta, se corrige aquí y se actualiza el otro.
> **Última actualización:** 11-nov-2026 (duración de defensa confirmada en ~5 min por el titular; deck canónico = V3 de 9 slides y 4 voces; material textual de defensa dentro del repo en `docs/sustentacion_2026/DEFENSA_5MIN_V3/`; copia del Escritorio gitignoreada por PII).

## 1. Identidad del proyecto

- **Proyecto:** ProGanado S.A.S. — gestión ganadera e inocuidad lechera.
- **Curso:** CESDE, Proyecto Integrador Nivel 1, semestre 2026-2.
- **Defensa:** sábado **14 de noviembre de 2026**, **~5 minutos** (confirmado por el titular el 11-nov-2026) + preguntas del jurado.
- **Equipo oficial (4):** Jeiser Gutiérrez (Tech Lead, BD/QA), Sebastián Correa (Frontend), Emilio Villanueva (Lógica/PSeInt/UI), Humberto Pinto (médico cardiólogo, sanidad animal).
- **Retirada:** Camila Salas se retiró del proyecto y del curso el **26-sep-2026**. No se menciona en material vigente.

## 2. Dónde se trabaja cada cosa

| Qué | Ruta local canónica | Repositorio / destino |
|---|---|---|
| Modelo relacional, DDL, TypeScript, Zod, PSeInt, tests | `C:\PROYECTOS\Mis_Proyectos\ProGanado` | https://github.com/jeiserlabs/proganado |
| Roadmap de fases y stack (canónico) | `docs/ROADMAP_Y_STACK_STARTUP.md` | GitHub `jeiserlabs/proganado` |
| Espejo filtrado del MVP (solo código) | `producto_mvp/` dentro del repo del modelo | GitHub `jeiserlabs/proganado` |
| **Producto principal (MVP)** — app de Emilio depurada | `C:\PROYECTOS\Mis_Proyectos\ProGanado_M2` | https://github.com/eavillas1991-ctrl/proyecto-progadado (remoto original; los commits de auditoría 07-nov y del fix de retiro 08-nov son locales) |
| Copia canónica del MVP para consulta | `C:\Users\dev\Documents\Proyectos_Y_Estudio\Entregables_CESDE_Y_Segaso\ProGanado\03_PAGINAS_WEB_Y_DEMO_EN_VIVO\ProGanado_MVP` | Hub local (no es repo Git) |
| Referencia React 19 + Tailwind (no es el producto actual) | `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web` | https://github.com/jeiserlabs/proganado-producto-momento-2 |
| Página React en vivo (escaparate histórico) | — | https://jeiserlabs.github.io/proganado-producto-momento-2/ |
| PDFs, PPTX, assets, ZIP, evidencias | — | Hub local + Drive: https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns |
| Entregas finales para subir | `C:\Users\dev\Desktop\ENTREGAS` y hub `ENTREGAS_PARA_SUBIR/` | 3 PDFs, uno por entrega |
| Exposición 14-nov (canónico) | `docs/sustentacion_2026/DEFENSA_5MIN_V3/` | Deck V3 (9 slides, 4 voces, 5:00) + guion + contrato + evidencia; PDF y PNG en Escritorio, hub y Drive |
| Exposición 14-nov (histórico) | Hub `04_EXPOSICION_7_PASOS/` | Deck de 7 pasos del 07-nov; reemplazado por el V3 |

**Decisión del 07-nov-2026:** la página principal es la app depurada de Emilio (`ProGanado_M2`). La variante React 19 + Tailwind queda archivada como referencia para la refactorización futura; la maqueta monolítica Bootstrap y la demo SQLite antigua se movieron a `_ARCHIVO_2026-11-07/web_variantes/`. Nada se borró.

**Decisión del 08-nov-2026:** el repo del modelo incluye un espejo filtrado del MVP en `producto_mvp/` (solo código; assets, base y credenciales fuera de Git). La regla de retiro del cliente se centraliza en `reglas_retiro.js` y el pesaje bloquea sin override. El plan de fases y stack vive en `docs/ROADMAP_Y_STACK_STARTUP.md`.

## 3. Regla de trabajo (local → GitHub → Drive)

1. **Local:** editar en la ruta canónica que corresponda.
2. **Verificar:** `npm run verify` en el repo de código; abrir la app si se tocó HTML/CSS/JS.
3. **GitHub:** commit + push al repo correcto (texto/código). Los binarios no van a Git.
4. **Hub/Drive:** PDFs, PPTX, ZIP, capturas y evidencias.
5. **Timeline:** anotar el hito en este archivo, en la sección 5.

Un cambio no está terminado hasta que está en el destino que le corresponde (GitHub para texto/código; hub/Drive para binarios), o se declara por qué no aplica.

## 4. Qué vive en cada lugar (regla anti-duplicado)

| Tipo | Lugar | Nunca |
|---|---|---|
| Código, SQL, TS, Zod, PSeInt, tests | GitHub `proganado` | En Drive como código suelto. |
| App principal (HTML/CSS/JS + Python + SQLite) | `ProGanado_M2` y copia en el hub | En el Escritorio como copia de trabajo. |
| Página React | GitHub `proganado-producto-momento-2`, solo como referencia | Presentarla como producto actual. |
| PDFs, PPTX, imágenes, videos, ZIP | Hub/Drive | En GitHub (Regla 29). |
| Documentos `.md` de estudio | GitHub `docs/sustentacion_2026/` | Duplicados en el Escritorio. |
| Datos de la app (`proganado.sqlite3`, fotos de facturas) | `ProGanado_M2/datos/` (gitignoreado) | En Git o en el hub. |
| Secretos, `.env`, `correo_config.json` | Local, gitignoreado | En GitHub o Drive. |

## 5. Timeline única

| Fecha | Hito | Evidencia |
|---|---|---|
| 2026-08-30 | Entrega del Momento 1: DDL, HTML5, PSeInt y documentos base. | `04_Documentos_Sustentacion/PROGANADO_ENTREGA_MOMENTO_1_CESDE.md` |
| 2026-09-15 | Auditoría de paridad: el modelo se alinea entre DDL, DBML, Mermaid, README, Zod y TS. | `docs/AUDITORIA_PARIDAD_2026-09-15.md` |
| 2026-09-26 | Camila Salas se retira; el equipo queda en 4 integrantes. | `AGENTS.md`, actas del curso |
| 2026-10-23/24 | Se publica la maqueta del Momento 2 en GitHub Pages. | Repo `proganado-producto-momento-2` |
| 2026-10-29 | Se arma el paquete del Momento 2: landing, login, dashboard y demo SQLite. | `docs/sustentacion_2026/` |
| 2026-10-31 | Auditoría end-to-end y P0 de código resueltos: PSeInt fail-closed, tabla UFC única, defaults del DDL, gate de clon limpio y login demo del prototipo. | Commits `944a346` (web) y los de `proganado`; `npm run verify` 23/23 |
| 2026-11-07 | Cierre del Momento 2 y 3: se entregan los 3 PDFs; se audita el MVP de Emilio (login/2FA, 8 módulos, CRUD, CSV, 0 errores de consola, 0 overflow a 390/768/1440 px); se corrige el banner de Contabilidad, se agregan etiquetas ARIA, foco visible y Playfair local; se archivan las variantes Bootstrap/React; se actualiza la guía de 7 pasos. | `ProGanado_M2` commit local `b72d266`; `Desktop/ENTREGAS`; hub `_ARCHIVO_2026-11-07/`; `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md` |
| 2026-11-08 | Auditoría del repo: espejo `producto_mvp/`, fix de retiro fail-closed y bloqueo de pesaje sin override; roadmap canónico de fases y stack. | `docs/ROADMAP_Y_STACK_STARTUP.md`; `producto_mvp/`; `npm run verify` 37/37 |
| **2026-11-14** | **Sustentación CESDE.** | — |
| Después del 14-nov | Fase 1 (auth de servidor, API, respaldo) y Fase 2 (producto TypeScript) según `docs/ROADMAP_Y_STACK_STARTUP.md`. | `docs/ROADMAP_Y_STACK_STARTUP.md` |

## 6. Deuda declarada (no ocultar)

| P0/P1 | Estado | Dueño |
|---|---|---|
| PSeInt libera el último día de retiro (no es fail-closed) | Resuelto 31-oct-2026 | Emilio / Jeiser |
| Tabla UFC: TS +80/+40/0/−120 vs PSeInt +120/+50/0/−150 | Resuelto 31-oct-2026: tabla única | Emilio |
| PDF del Momento 1 con esquema `bovinos` viejo | Resuelto 31-oct-2026: archivado y marcado histórico | Jeiser |
| `npm run verify` en clon limpio falla porque `bootstrap_m2/` está gitignoreado | Resuelto 31-oct-2026: copia stale retirada | Jeiser |
| Defaults del DDL (admin, bovino, antibiótico sin medicamento) | Resuelto 31-oct-2026: defaults peligrosos retirados + CHECK | Jeiser |
| Prototipo `auth_config.js` 404 en navegador limpio | Resuelto 31-oct-2026: login demo sin archivo externo | Jeiser |
| **Autenticación del MVP es del lado del cliente** (usuarios y hashes en `localStorage`; la API local no exige token) | **Abierto y declarado**; aceptable para app de finca en un solo equipo, no para internet; Fase 1 lo mueve al servidor | Jeiser |
| Retiro del MVP calculado por horas (liberaba al mediodía del último día) | Resuelto 08-nov-2026: delegado en `reglas_retiro.js`, fail-closed y con test de frontera | Jeiser |
| Pesaje permitía registrar leche de una vaca en retiro con `confirm()` | Resuelto 08-nov-2026: bloqueo duro sin override | Jeiser |
| **Sin cifrado en reposo ni copia automática** de SQLite | **Abierto**; el README/SEGURIDAD lo declaran; el respaldo es manual | Jeiser |
| **GitHub Pages sigue sirviendo la variante React**, no el MVP de Emilio | **Abierto**; el producto canónico se ejecuta local con Python porque necesita SQLite y 2FA | Jeiser |
| **Refactor React pendiente** | **Planificado** para después de la sustentación; la app actual es vanilla a propósito | Jeiser / Sebastián |
| **El commit de auditoría del MVP está local en el clon de Emilio**, no en un repo de jeiserlabs | **Abierto**; requiere decisión de publicar en un fork propio | Jeiser |

**Regla:** si el jurado pregunta por uno de estos, se declara como deuda y se explica el plan. No se inventa que ya está resuelto.

## 7. Contacto y material

- Hub local: `C:\Users\dev\Documents\Proyectos_Y_Estudio\Entregables_CESDE_Y_Segaso\ProGanado`
- Carpeta de estudio: https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns
- Entregas: `ENTREGAS_PARA_SUBIR/00_LEEME_ENTREGAS.txt`
- Guías desde cero: `02_GUIAS_DE_ESTUDIO_POR_INTEGRANTE/GUIAS_DESDE_CERO/`
- Exposición: `docs/sustentacion_2026/DEFENSA_5MIN_V3/` (deck V3 de 9 slides, canónico desde el 11-nov-2026; los binarios van a Drive/hub)
- Roadmap verificado: `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md`
- Elevator pitch: `docs/sustentacion_2026/ELEVATOR_PITCH_PROGANADO.md` (copia en el hub `04_EXPOSICION_7_PASOS/`)
