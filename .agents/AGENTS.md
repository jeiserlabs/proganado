# ProGanado SaaS — Contrato Operativo para Agentes de IA

> **SSOT (Single Source of Truth) del Proyecto Integrador CESDE Nivel 1**  
> **Proyecto:** ProGanado (Software Integral de Gestión Ganadera e Inocuidad Lechera)  
> **Repositorio Oficial:** `https://github.com/jeiser270997-source/ProGanado.git`  
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
- **Sebastián Gómez:** Frontend Lead (HTML5 Semántico, Accesibilidad WCAG 2.1, UI/UX).
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

