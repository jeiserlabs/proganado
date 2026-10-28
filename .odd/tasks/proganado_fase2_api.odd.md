# [ODD] ProGanado Fase 2 — Backend REST API & Persistencia SQLite

> **Metodología:** ODD (One-Document-Driven Development / Gentle-AI).  
> **Abolición SDD:** Sustituye la burocracia de especificaciones multi-documento por este único documento vivo.  
> **Fecha:** 2026-10-25 | **Ejecución:** Post-Sustentación (Noviembre 2026)

---

## 1. Objetivo y Problema (Why & What)
- **Problema:** Tras la sustentación académica, el prototipo actual en memoria requiere convertirse en un backend de producción modular con persistencia real en base de datos y autenticación de usuarios para evolucionar a SaaS comercial.
- **Objetivo:** Implementar la API REST en Node.js/TypeScript con:
  1. Servidor Express con middleware de autenticación JWT y validación Zod.
  2. Capa de persistencia con `better-sqlite3` en WAL mode contra el DDL oficial.
  3. 7 Endpoints CRUD prioritarios: `/auth/login`, `/fincas`, `/bovinos`, `/tratamientos`, `/bovinos/:id/inocuidad`, `/pesajes` y `/dashboard`.

---

## 2. Scope Rule Estricto (Gentleman Scope)
- **Touchables:**
  - `src/server/*`
  - `src/domain/*`
  - `src/schemas/*`
  - `tests/api/*.test.ts`
  - `.odd/tasks/*`
- **Forbidden:**
  - Modificar el DDL oficial sin correr `npm run paridad`.
  - Usar `any` en TypeScript.

---

## 3. Guardrails Anti-Sobreingeniería (Anti-Overengineering)
- **Singleton Database:** Conexión única `better-sqlite3` sin ORMs pesados (TypeORM/Prisma vetados).
- **SRP Estricto:** Rutas, controladores y servicios desacoplados en módulos < 300 líneas.

---

## 4. Tareas Atómicas Secuenciales (Tasks)
- [ ] **T1: Bootstrap Express y Singleton DB:** Configurar `src/server/index.ts` y `src/server/db.ts`.
- [ ] **T2: Middleware de Autenticación & Zod:** Verificación JWT y validación contra `validation.schemas.ts`.
- [ ] **T3: Endpoints de Inocuidad y Bovinos:** Conectar `cinta_roja.rule.ts` a `/bovinos/:id/inocuidad`.
- [ ] **T4: Conexión Frontend:** Integrar formulario de alta HTML con `fetch('POST /bovinos')`.
- [ ] **T5: Suite E2E de API:** Pruebas automatizadas de flujo completo con Vitest / Node test runner.

---

## 5. Acceptance Criteria & Oráculo Determinista
- `npm test`: 100% PASS en tests de dominio y endpoints.
- `npm run typecheck`: 0 errores de tipos.

---

## 6. Baseline de Errores Conocidos (Known Baseline)
- Ninguno activo.

---

## 7. Progreso y Evidencia In-Place
- **2026-10-25:** Hoja de ruta y arquitectura ODD formalizada para la Fase 2.
