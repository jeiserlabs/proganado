# ProGanado SaaS — Contrato Operativo para Agentes de IA

> **SSOT (Single Source of Truth) del Proyecto Integrador CESDE Nivel 1**  
> **Proyecto:** ProGanado (Software Integral de Gestión Ganadera e Inocuidad Lechera)  
> **Repositorio Oficial:** `https://github.com/jeiserlabs/proganado`  
> **Ubicación Local:** `E:\PROYECTOS\Mis_Proyectos\ProGanado`

---

## 📌 1. Principio de Aislamiento de Contexto (Zero Context Bleed)
- **Ámbito Exclusivo:** Este repositorio contiene única y exclusivamente el desarrollo, arquitectura, base de datos, lógica algorítmica, frontend y documentación del **Proyecto Integrador ProGanado**.
- **Cero Mezcla de Dominios:** Queda estrictamente prohibido contaminar o vincular información de finanzas personales, expedientes legales ajenos, tránsito o actividades no relacionadas con ProGanado en este espacio.
- **Fuentes de Verdad Internas:**
  1. `docs/contexto/CEREBRO_PROGANADO.md` — Mapa técnico y funcional del sistema.
  2. `docs/contexto/ESTADO_VIVO_PROGANADO.md` — Estado vivo del desarrollo, asignaciones y backlog.
  3. `README.md` — Documentación pública oficial del repositorio.
  4. `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` — DDL oficial de las 12 tablas en 3FN.

---

## 👥 2. Roles del Equipo y Directivas de Trabajo
- **Jeiser Gutiérrez:** Tech Lead & Arquitecto de Base de Datos / Cloud AWS.
- **Sebastián Correa:** Frontend Lead (HTML5 Semántico, Accesibilidad WCAG 2.1, UI/UX).
- **Emilio Villanueva:** Desarrollador de Lógica & Algoritmos PSeInt.
- **Camila Salas:** Directora Legal, Administrativa y Financiera (S.A.S., RST, 0% IVA Cloud E.T. Art 476).
- **Dr. Humberto Pinto:** Asesor Médico Veterinario, Protocolos de Inocuidad Lechera y QA.

---

## 📐 3. Reglas Técnicas Inmutables
1. **Base de Datos 3FN:** 12 tablas normalizadas con llaves compuestas, FKs con integridad referencial estricta y restricciones CHECK.
2. **Inocuidad Cinta Roja (Fail-Closed):** Bloqueo inmediato de ordeño si `fecha_actual < fecha_tratamiento + dias_retiro_ica`.
3. **Maquetación HTML5 Semántica Pura:** Uso exclusivo de etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), formularios con `<fieldset>`, `<legend>`, `<label>` y tablas con `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`.
4. **Clean Code & Modularidad:** Archivos < 300 líneas, funciones puras, separación estricta de capas (Datos -> Lógica -> Presentación).
5. **Arquitectura Cloud Evolutiva:** Inicio a $0 COP (Local / Vercel / Render / Supabase) con hoja de ruta documentada de migración a AWS Enterprise (S3, CloudFront, Lambda/Fargate, RDS PostgreSQL Multi-AZ).
6. **Diagramación de BD (MER en Draw.io vs Relacional en Mermaid):** El **Modelo Entidad-Relación (MER Chen: rectángulos y óvalos)** se diseña exclusivamente en **Draw.io** (`.drawio`). El **Modelo Relacional (MR: tablas, PKs, FKs)** se documenta exclusivamente en **Mermaid.js** (`erDiagram`).
7. **Formato de Evidencias HTML (CESDE):** Mapeo vertical por secciones: Captura parcial de la interfaz renderizada arriba $\rightarrow$ Captura correspondiente del fragmento de código HTML abajo, repitiendo secuencialmente hasta cubrir toda la página y todo el código.
8. **Algoritmos en PSeInt (Formato CESDE - Jonathan Piedrahita):** En PSeInt las variables se declaran e inicializan directamente con el signo `=` (`variable = 0`, `texto = ""`, una por línea al inicio). Queda prohibido usar `Definir ... Como Entero` o flechas `<-`. La estructura obligatoria consta de 3 bloques comentados: `// DATOS DE ENTRADA`, `// PROCESO` y `// DATOS DE SALIDA` + bloc de notas anexo de análisis de entrada/proceso/salida.


## Verificación obligatoria antes de tocar el modelo de datos (2026-09-15)

El mismo modelo vive en 6 lugares (DDL, DBML, Mermaid, README, Zod, TypeScript) y copiarlo a
mano ya produjo un desajuste real: el README y los contratos describían un `bovinos` con
`alerta_cinta_roja` y `estado_lactancia` cuando la tabla v3 tiene `sexo`, `estado_fisiologico`
y `estado_vital`.

- **Antes de commitear cualquier cambio al DDL:** `npm run paridad` (debe imprimir "Paridad total").
- **Para alinear las copias:** correr `node tools/gen_readme_diagrama.mjs` y ajustar DBML/Zod/TS.
- **Deuda declarada:** `tools/paridad_excepciones.json` (con motivo y fecha de revisión; el gate falla si vence o si ya no tapa nada).

---

## GOLDEN FREEZE v1.0.0 (2026-09-03)

- **ESTADO: CONGELADO**. Repo entregables academicos CESDE (SQL 12 tablas 3FN + HTML5 + PSeInt + docs). Sin suite automatizada.
- **MANDATO**: NO cambios sin orden del equipo + doble confirmacion.
- **Verify (2026-09-03)**: git limpio, 43 files, 0 binarios, 0 secrets.
