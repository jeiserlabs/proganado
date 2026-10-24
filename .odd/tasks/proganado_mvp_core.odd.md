# [ODD] ProGanado SaaS — Core MVP & Sustentación Académica CESDE

> **Metodología:** ODD (One-Document-Driven Development / Gentle-AI).  
> **Abolición SDD:** Sustituye la burocracia multi-documento de SDD por este único documento vivo y atómico.  
> **Fecha de Creación:** 2026-10-23 | **Sustentación CESDE:** 14-Nov-2026 (Momento 1)

---

## 1. Objetivo y Problema (Why & What)
- **Problema:** La ganadería lechera colombiana (Antioquia / San Pedro de los Milagros) sufre pérdidas millonarias por sanciones de inocuidad del ICA y castigos de Colanta al entregar leche con trazas de antibióticos (violación de días de retiro), sumado al descontrol de días abiertos (>120 días).
- **Objetivo:** Proporcionar un MVP de gestión ganadera con base de datos en 3FN (12 tablas), reglas puras de dominio testeadas (Cinta Roja Fail-Closed ICA, Días Abiertos, Liquidación Colanta) e interfaz web interactiva SPA (100% autónoma y funcional para sustentación presencial sin internet o con servidor local).

---

## 2. Scope Rule Estricto (Gentleman Scope)
- **Touchables (Archivos Permitidos):**
  - `src/domain/*.ts` (reglas de dominio puras)
  - `src/schemas/*.ts` (esquemas Zod)
  - `src/types/*.ts` (contratos TypeScript sin any)
  - `prototipo_interfaz/*` (interfaz visual, dashboard SPA, landing SaaS, servidor local)
  - `tests/*` (pruebas unitarias y de integración)
  - `.odd/tasks/*` (seguimiento vivo de features)
- **Forbidden (Archivos Prohibidos sin doble confirmación):**
  - `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` (SSOT DDL 12 tablas — protegido por Golden Freeze v1.0.0 y gate de paridad)
  - `02_Vistas_HTML5/registro_bovino.html` (blindado por `paridad_ssot.mjs`)
  - `03_Logica_PSeInt/*` (entregables de algoritmos congelados para el instructor)

---

## 3. Guardrails Anti-Sobreingeniería (Anti-Overengineering)
- **Zero-Cloud Requirement para Demo:** La interfaz y la base funcionan 100% en local sin requerir AWS ni Supabase para el día de la sustentación (0 latencia, fail-safe si no hay WiFi en el aula).
- **Zero-Any TypeScript:** Prohibido el uso de `any` en todos los tipos y esquemas.
- **Fail-Closed Biológico:** El último día de retiro ICA una vaca SIGUE bloqueada (`fecha_actual <= fecha_tratamiento + dias_retiro`).

---

## 4. Tareas Atómicas Secuenciales (Tasks)
- [x] Tarea 1: DDL oficial de 12 tablas normalizadas en 3FN con checks y fechas locales Colombia (`schema_produccion_proganado_v3.sql`).
- [x] Tarea 2: Tipos estrictos TypeScript (`src/types/domain.types.ts`) y esquemas Zod (`src/schemas/validation.schemas.ts`).
- [x] Tarea 3: Reglas de dominio puras (`cinta_roja.rule.ts`, `dias_abiertos.rule.ts`, `liquidacion_leche.rule.ts`).
- [x] Tarea 4: Suite de tests con Node.js test runner (19/19 PASS) y gate de paridad SSOT total (`tools/paridad_ssot.mjs`).
- [x] Tarea 5: Maquetación HTML5 semántica obligatoria para CESDE (`02_Vistas_HTML5/`).
- [x] Tarea 6: Prototipo interactivo SPA con persistencia local, 2FA offline y landing SaaS moderna (`prototipo_interfaz/`).
- [x] Tarea 7: Scripts de arranque automático sin permisos de administrador (`Iniciar ProGanado.bat`).
- [ ] Tarea 8 (Fase 2 Post-Sustentación): Servidor Express + SQLite local persistente con endpoints CRUD conectados vía fetch.

---

## 5. Acceptance Criteria & Oráculo Determinista
- Typecheck: `npm run typecheck` $\rightarrow$ 0 errores.
- Paridad SSOT: `npm run paridad` $\rightarrow$ "Paridad total: todas las copias coinciden con el DDL oficial".
- Tests: `npm test` $\rightarrow$ 19/19 PASS (3 suites, 0 fallos).
- Compuerta integral: `npm run verify` $\rightarrow$ Exit code 0.

---

## 6. Baseline de Errores Conocidos (Known Baseline)
- 21 excepciones controladas en `tools/paridad_excepciones.json` (campos derivados en TS y reglas de sintaxis de PSeInt para el instructor Jonathan Piedrahita). No son bugs; son tolerancias documentadas del modelo académico.

---

## 7. Progreso y Evidencia In-Place
- **2026-10-23:** Deep audit completado. `npm run verify` ejecutado con éxito total (19/19 tests PASS, typecheck 0 errores, paridad total verificada). Prototipo interactivo 100% funcional.
