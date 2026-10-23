# GEMINI.md — ProGanado SaaS (Antigravity / Gemini Flash)

Repo: `C:\PROYECTOS\Mis_Proyectos\ProGanado` | GitHub: `jeiserlabs/proganado`

---

## ⚡ REGLAS DE HIERRO

**R1 — Aislamiento total:** Este repo es SOLO ProGanado. Cero mezcla con LifeOS, DIAN, DiDi.  
**R2 — Golden Freeze académico:** No cambiar DDL (`schema_produccion_proganado_v3.sql`) sin correr `npm run paridad` primero.  
**R3 — Paridad SSOT:** Cada cambio al modelo de datos → actualizar DDL + types + schemas + README diagrama simultáneamente. `npm run paridad` debe imprimir "Paridad total".  
**R4 — Zero-Any TypeScript:** Prohibido `any`. Todos los tipos en `src/types/domain.types.ts`.  
**R5 — Fail-Closed Cinta Roja:** La lógica de inocuidad NUNCA puede liberar una vaca antes de `fecha_tratamiento + dias_retiro_ica + 1 día`. Fail-closed siempre.  
**R6 — Fecha local Colombia:** SIEMPRE `date('now','localtime')` en SQLite. NUNCA `CURRENT_DATE` ni `CURRENT_TIMESTAMP` (devuelven UTC, bug v3.0 ya corregido en v3.1).  
**R7 — SRP <300L:** Ningún archivo supera 300 líneas.  
**R8 — Tests antes de código:** `npm test` debe pasar antes y después de cualquier cambio.  

---

## Protocolo de Carga al Iniciar Sesión

1. `AGENTS.md` — contrato del equipo + reglas técnicas
2. `docs/contexto/CEREBRO_PROGANADO.md` — arquitectura 3 capas, stack, APIs
3. `docs/contexto/ESTADO_VIVO_PROGANADO.md` — estado actual del desarrollo
4. `docs/HOJA_DE_RUTA_CRONOLOGICA_IMPLEMENTACION.md` — fases y próximos pasos
5. `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` — DDL oficial (SSOT)
6. `src/types/domain.types.ts` — contratos TypeScript vigentes

---

## Stack actual

- **Lenguaje:** TypeScript (Node.js) + SQL
- **BD dev:** SQLite (`better-sqlite3`) | **BD prod:** PostgreSQL (Supabase / AWS RDS)
- **Validación:** Zod v3
- **Tests:** Node.js `--test` nativo (19/19 PASS)
- **Typecheck:** `tsc --noEmit` (0 errores)
- **Paridad:** `node tools/paridad_ssot.mjs`

---

## Fases de implementación — ROADMAP PARA GEMINI

### FASE 1 — COMPLETADA ✅ (Momento 1 CESDE)
- [x] DDL 12 tablas 3FN (`schema_produccion_proganado_v3.sql`)
- [x] Types TypeScript (`src/types/domain.types.ts`)
- [x] Schemas Zod (`src/schemas/validation.schemas.ts`)
- [x] 3 reglas de dominio puras con tests (cinta_roja, dias_abiertos, liquidacion_leche)
- [x] Maquetación HTML5 semántica (`02_Vistas_HTML5/`)
- [x] Algoritmos PSeInt (`03_Logica_PSeInt/`)
- [x] Paridad SSOT gate (19/19 tests)

### FASE 2 — SIGUIENTE PRIORIDAD (post sustentación 14-Nov-2026)
Objetivo: API funcional conectada a la base de datos real.

**Paso 2.1 — Setup servidor Express**
```
src/server/
  index.ts          ← entry point (puerto 3000)
  db.ts             ← conexión better-sqlite3 singleton
  middleware/
    auth.ts         ← JWT verify middleware
    validate.ts     ← Zod middleware
```
Comando de inicio: `node --loader ts-node/esm src/server/index.ts`

**Paso 2.2 — Endpoints CRUD prioritarios (en este orden)**
1. `POST /auth/login` — username + password → JWT
2. `POST /fincas` — registrar predio (valida código ICA único)
3. `POST /bovinos` — alta bovino (valida sexo, estado_vital, raza FK)
4. `POST /tratamientos` — registrar fármaco (activa cinta roja automático)
5. `GET  /bovinos/:id/inocuidad` — usa `evaluarCintaRoja()` ya existente
6. `POST /pesajes` — registrar litros AM/PM (bloquea si cinta roja activa)
7. `GET  /dashboard` — resumen finca: total vacas, en cinta roja, días abiertos >100

**Paso 2.3 — Conectar formulario HTML existente**
- `02_Vistas_HTML5/registro_bovino.html` → `fetch('POST /bovinos')`
- Mostrar respuesta Zod como errores inline en el form

**Paso 2.4 — Auth simple**
- `bcryptjs` para hash de contraseña
- `jsonwebtoken` para JWT (exp: 24h)
- Middleware que protege todas las rutas excepto `/auth/login`

### FASE 3 — PWA Offline-First (después de CESDE)
- SQLite en cliente (wa-sqlite / OPFS)
- Sync bidireccional con servidor central
- UI de campo: teclado gigante, modo alto contraste solar, alerta roja bloqueante

### FASE 4 — QA E2E Playwright
- Test: registrar tratamiento → verificar bloqueo cinta roja → intentar pesaje → debe rechazar
- Test: marcar fin retiro → pesaje del día siguiente → debe aprobar

### FASE 5 — SaaS Multi-tenant
- Multi-finca por usuario (`id_usuario → n fincas`)
- Suscripciones: Free (15 vacas) / Pro 119k / Multi 299k
- Stripe o PSE Colombia para pagos

---

## Comandos clave

```bash
npm test              # 19/19 tests — DEBE PASAR SIEMPRE
npm run typecheck     # 0 errores TypeScript
npm run paridad       # "Paridad total" — antes de commitear cambios al modelo
npm run verify        # typecheck + paridad + test (todo en uno)
```

---

## Estructura de archivos

```
ProGanado/
├── 01_Base_de_Datos_SQL/
│   └── schema_produccion_proganado_v3.sql   ← DDL SSOT (no tocar sin paridad)
├── 02_Vistas_HTML5/                          ← Frontend semántico HTML5
├── 03_Logica_PSeInt/                         ← Algoritmos académicos
├── src/
│   ├── domain/        ← Reglas de negocio puras (TypeScript, testeadas)
│   ├── schemas/       ← Validación Zod
│   ├── types/         ← Interfaces TypeScript
│   └── server/        ← [FASE 2] Express API (por crear)
├── tests/             ← 19 tests, todos pasan
├── docs/
│   ├── contexto/      ← CEREBRO + ESTADO_VIVO
│   └── *.md           ← Roadmap, arquitectura, guías del equipo
├── AGENTS.md          ← Contrato operativo del equipo
└── GEMINI.md          ← Este archivo — instrucciones para Gemini
```
