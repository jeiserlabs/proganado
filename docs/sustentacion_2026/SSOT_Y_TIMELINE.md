# ProGanado — SSOT de rutas, repositorios y timeline única

> **Este archivo manda.** Si otro documento dice una ruta, un repo o una fecha distinta, se corrige aquí y se actualiza el otro.
> Última actualización: 31-oct-2026.

## 1. Identidad del proyecto

- **Proyecto:** ProGanado S.A.S. — gestión ganadera e inocuidad lechera.
- **Curso:** CESDE, Proyecto Integrador Nivel 1, semestre 2026-2.
- **Defensa:** sábado **14 de noviembre de 2026**, 10–12 minutos + 5 de preguntas.
- **Equipo oficial (4):** Jeiser Gutiérrez (Tech Lead, BD/QA), Sebastián Correa (Frontend), Emilio Villanueva (Lógica/PSeInt), Dr. Héctor Pinto (Sanidad veterinaria).
- **Retirada:** Camila Salas se retiró del proyecto y del curso el **26-sep-2026**. No se menciona en material vigente.

## 2. Dónde se trabaja cada cosa

| Qué | Ruta local canónica | Repositorio / destino |
|---|---|---|
| Código, DDL, TypeScript, Zod, PSeInt, tests | `C:\PROYECTOS\Mis_Proyectos\ProGanado` | https://github.com/jeiserlabs/proganado |
| Página web Bootstrap | `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web` | https://github.com/jeiserlabs/proganado-producto-momento-2 |
| Página en vivo | — | https://jeiserlabs.github.io/proganado-producto-momento-2/ |
| PDFs, PPTX, assets, ZIP, evidencias | — | Drive: https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns |
| Documentos fuente de estudio | `ProGanado\docs\sustentacion_2026\` | GitHub `proganado` |
| Fuente HTML de la guía de 101 páginas | `ProGanado\docs\sustentacion_2026\Guia_Completa_Momento2_v1.3_corregida.html` | GitHub `proganado` |
| Guía renderizada (PDF) | — | Drive `02_GUIAS_DE_ESTUDIO_POR_INTEGRANTE/` |

**No existe otra copia de trabajo válida.** Las carpetas `Proganado`, `Proganado_Material_Estudio`, `MOMENTO2_PROGANADO` y `_BACKUP_PROGANADO_GEMINI_*` del Escritorio se retiraron el 31-oct-2026.

## 3. Regla de trabajo (local → GitHub → Drive)

1. **Local:** editar en la ruta canónica que corresponda.
2. **Verificar:** `npm run verify` en el repo de código; abrir la página si se tocó HTML.
3. **GitHub:** commit + push al repo correcto.
4. **Drive:** subir el PDF/PPTX/ZIP actualizado a la carpeta oficial y verificar tamaño/md5.
5. **Timeline:** anotar el hito en este archivo, en la sección 5.

Un cambio no está terminado hasta que está en GitHub (texto/código) y en Drive (binarios), o se declara explícitamente por qué no aplica.

## 4. Qué vive en cada lugar (regla anti-duplicado)

| Tipo | Lugar | Nunca |
|---|---|---|
| Código, SQL, TS, Zod, PSeInt, HTML, tests | GitHub `proganado` | En Drive como código suelto. |
| Página web | GitHub `proganado-producto-momento-2` | En el Escritorio. |
| PDFs, PPTX, imágenes, videos, ZIP | Drive | En GitHub (Regla 29). |
| Documentos `.md` de estudio | GitHub `docs/sustentacion_2026/` | Duplicados en el Escritorio. |
| Secretos, `.env`, credenciales | Local, gitignoreado | En GitHub o Drive. |

## 5. Timeline única

| Fecha | Hito | Evidencia |
|---|---|---|
| 2026-08-30 | Entrega del Momento 1: DDL, HTML5, PSeInt y documentos base. | `04_Documentos_Sustentacion/PROGANADO_ENTREGA_MOMENTO_1_CESDE.md` |
| 2026-09-15 | Auditoría de paridad: el modelo se alinea entre DDL, DBML, Mermaid, README, Zod y TS. | `docs/AUDITORIA_PARIDAD_2026-09-15.md` |
| 2026-09-26 | Camila Salas se retira; el equipo queda en 4 integrantes. | `AGENTS.md`, actas del curso |
| 2026-10-23/24 | Se publica la maqueta Bootstrap del Momento 2 en GitHub Pages. | Repo `proganado-producto-momento-2` |
| 2026-10-29 | Se arma el paquete del Momento 2: landing, login, dashboard y demo SQLite. | `docs/sustentacion_2026/` |
| 2026-10-31 | Auditoría end-to-end y P0 de código resueltos: PSeInt fail-closed, tabla UFC única, defaults del DDL, gate de clon limpio y login demo del prototipo. Se re-renderiza la guía de 101 páginas (163→116) y se publica la web corregida. | Commits `944a346` (web) y los de `proganado`; `npm run verify` 23/23 |
| **2026-11-14** | **Sustentación CESDE.** | — |
| Después del 14-nov | Fase 2: API Node/TS, autenticación real y pruebas de integración. | `.odd/tasks/proganado_fase2_api.odd.md` |

## 6. Deuda declarada (no ocultar)

| P0 | Estado | Dueño |
|---|---|---|
| PSeInt libera el último día de retiro (no es fail-closed) | Resuelto 31-oct-2026 | Emilio / Jeiser |
| Tabla UFC: TS +80/+40/0/−120 vs PSeInt +120/+50/0/−150 | Resuelto 31-oct-2026: tabla única | Emilio |
| PDF del Momento 1 con esquema `bovinos` viejo | Resuelto 31-oct-2026: archivado y marcado histórico | Jeiser |
| `npm run verify` en clon limpio falla porque `bootstrap_m2/` está gitignoreado | Resuelto 31-oct-2026: copia stale retirada y excepciones depuradas | Jeiser |
| Defaults del DDL (admin, bovino, antibiótico sin medicamento) | Resuelto 31-oct-2026: defaults peligrosos retirados + CHECK | Jeiser |
| Prototipo `auth_config.js` 404 en navegador limpio | Resuelto 31-oct-2026: login demo sin archivo externo | Jeiser |

**Regla:** si el jurado pregunta por uno de estos, se declara como deuda y se explica el plan. No se inventa que ya está resuelto.

## 7. Contacto y material

- Carpeta de estudio: https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns
- Página en vivo: https://jeiserlabs.github.io/proganado-producto-momento-2/
- Guía de estudio: `02_GUIAS_DE_ESTUDIO_POR_INTEGRANTE/00_GUIA_MAESTRA_COMPLETA_101_PAGINAS.pdf`
- Plan y roles: `00_EMPIEZA_AQUI/00_PLAN_DE_SUSTENTACION_Y_ROLES.md`
