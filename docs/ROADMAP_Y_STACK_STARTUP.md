# ProGanado — Roadmap de escalabilidad y stack tecnológico

> **Documento canónico de fases y tecnología.**  
> **Versión:** 2.0.0 · **Fecha:** 08-nov-2026 · **Dueño:** Jeiser Gutiérrez (CTO / Tech Lead)  
> **Reemplaza en materia de fases y stack a:** `ARQUITECTURA_Y_PLAN_ESCALABILIDAD.md`, `HOJA_DE_RUTA_CRONOLOGICA_IMPLEMENTACION.md`, `PLAN_MEJORA_ARQUITECTURA_PRODUCCION.md` y `ARQUITECTURA_FREE_TIER_STACK.md`. Esos documentos quedan como anexos históricos o técnicos; si contradicen este, manda este.  
> **Estado medido (no promesa):** `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md` y `npm run verify`.

---

## 0. Cómo leer este documento

- **Hoy** significa 08-nov-2026: MVP local, sin nube, sin clientes pagando.
- **Decidido** significa que se implementa así salvo un trigger documentado.
- **A evaluar** significa que no se instala todavía y se decide con métricas.
- **Criterio de aceptación** es un oráculo verificable, no una intención.
- Las fechas son ventanas de planificación; el paso a la siguiente fase lo autoriza el criterio de aceptación, no el calendario.

---

## 1. Punto de partida medido

| Capa | Qué existe hoy | Evidencia |
|---|---|---|
| Modelo de datos | 12 tablas en 3FN, FKs, CHECKs, índices y vista de inocuidad fail-closed | `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`; gate de paridad |
| Dominio tipado | Reglas puras en TypeScript estricto: cinta roja, días abiertos, liquidación UFC | `src/domain/`; 37 tests en verde |
| Contratos | Tipos e interfaces + esquemas Zod del modelo | `src/types/`, `src/schemas/` |
| Producto | MVP HTML/CSS/JS + servidor Python + SQLite, login/2FA, 8 módulos | `Producto_MVP` / `ProGanado_M2`; auditoría de navegador 07-nov |
| Entregas académicas | 3 PDFs (M2, NoSQL, SQL), 4 integrantes | `Desktop/ENTREGAS` y hub |
| Defensa | Guion y deck de 7 pasos para el 14-nov-2026 | `Desktop/ENTREGAS/05_PRESENTACION_PROGANADO/` |
| Nube | Nada desplegado | Declarado en `CEREBRO_PROGANADO.md` |

**Lo que esto significa para una startup:** hay un activo real (modelo, reglas y producto demostrable), pero todavía no hay producto SaaS: la autenticación vive en el cliente, la API local no exige token, no hay respaldo automático ni multiusuario en red. La Fase 1 cierra esa brecha antes de cobrar.

---

## 2. Tesis de producto y cliente

**Cliente inicial (ICP):** finca lechera de 15 a 150 vacas en Antioquia (cuenca norte: Santa Rosa de Osos, San Pedro de los Milagros, Entrerríos), con mayordomo que registra en campo y dueño que decide desde la ciudad.

**Dolor que se cobra:**
1. Un tanque contaminado por leche de una vaca en retiro cuesta 5M–25M COP por evento (estimación del escenario, no medición propia).
2. Una vaca abierta más de 120 días cuesta cerca de 20k COP/día (estimación del escenario).
3. La libreta y el Excel no avisan a tiempo; el software debe bloquear, no solo reportar.

**Propuesta:** software local-first que hace cumplir la inocuidad (cinta roja fail-closed), calcula días abiertos y liquida la leche con la tabla UFC de Colanta. El dueño paga por evitar una pérdida, no por “digitalizar”.

**Modelo:** Free hasta 15 vacas · Pro 119k COP/mes por finca · Multi-Predio 299k COP/mes. El MVP actual no cobra: es validación.

---

## 3. Principios de arquitectura (no negociables)

1. **Local-first:** la finca opera sin internet; la nube sincroniza y respalda, no es requisito para ordeñar.
2. **Fail-closed en inocuidad:** el último día de retiro la vaca sigue bloqueada; ningún `confirm()` permite saltarse la cinta roja.
3. **TypeScript-first:** el dominio, los contratos y la API se escriben en TypeScript estricto. JavaScript sin tipos solo en código heredado del MVP, con fecha de retiro.
4. **Un solo modelo:** el DDL de 12 tablas es el SSOT; Zod, TypeScript y la base se verifican con un gate de paridad.
5. **Cero costo hasta tener ingreso:** free tiers y equipo local; no se paga infraestructura para una promesa.
6. **Seguridad por defecto:** auth de servidor, sesiones httpOnly, RBAC, validación en el borde, *prepared statements*, bitácora de accesos.
7. **Medir antes de optimizar:** no microservicios, Kubernetes, Kafka ni CRDT sin una métrica que los justifique.
8. **Trazabilidad:** todo cambio de estado relevante para ICA o dinero queda auditado con usuario, fecha y motivo.

---

## 4. Stack objetivo (TypeScript-first)

| Capa | Decisión | Por qué | Alternativa descartada |
|---|---|---|---|
| Lenguaje | **TypeScript 5.9+ en modo estricto** (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) | El dominio ya está tipado; los errores se atrapan antes del runtime | JavaScript sin tipos (solo MVP heredado) |
| Runtime | **Node.js 24 LTS** | LTS actual, soporte de la máquina de desarrollo y del ecosistema | Deno/Bun (buenos, pero menos librerías maduras para este equipo) |
| Paquetes | **pnpm 10 + workspaces** | Monorepo simple, instalación rápida y determinista | npm workspaces (más lento), Turborepo (innecesario al inicio) |
| API | **Fastify 5 + Zod 4** | Validación de esquema en el borde, tipos inferidos, rendimiento y ecosistema de plugins | Express (menos tipado y más manual), NestJS (demasiada ceremonia) |
| Base local | **SQLite + better-sqlite3 (WAL)** | Cero servidor, transacciones síncronas, respaldo por archivo | MariaDB local (más instalación para una finca) |
| Base nube | **PostgreSQL 17+ gestionado (Supabase)** | Multiusuario, respaldo, RLS y ecosistema | MySQL (menos funciones para este caso) |
| ORM / migraciones | **Drizzle ORM + drizzle-kit** | TypeScript real, SQL legible, migraciones versionadas y soporte SQLite/PostgreSQL | Prisma (runtime más pesado y menos control del SQL) |
| Auth Fase 1 | **Sesión de servidor + argon2id + CSRF + rate limit** | La autenticación sale del navegador; cookie httpOnly y RBAC | JWT en `localStorage` (robable por XSS) |
| Auth Fase 3 | **Supabase Auth o Better Auth** | Sesiones gestionadas, recuperación y verificación sin construir todo | Auth propia para siempre (deuda de seguridad) |
| Frontend Fase 2 | **React 19 + Vite 7 + Tailwind CSS 4 + TanStack Query** | Dashboard interactivo, sin necesidad de SSR; build estático barato | Next.js (SSR innecesario para una app tras login) |
| Formularios | **React Hook Form + Zod** | Validación compartida con la API y el dominio | Formularios manuales (más código y más bugs) |
| Estado servidor | **TanStack Query** | Caché, reintentos y sincronización de peticiones | Redux (demasiado para este tamaño) |
| PWA / offline | **vite-plugin-pwa + IndexedDB (Dexie) + outbox** | Registrar sin red y reintentar al volver | PowerSync/ElectricSQL en Fase 2 (se evalúan en Fase 3) |
| Tests | **Vitest + Fastify `inject` + Playwright** | Unitarias rápidas, integración sin abrir puerto y E2E reales | Solo tests manuales (no escala) |
| Logs | **pino** | JSON estructurado, bajo costo, compatible con agregadores | `console.log` en producción |
| Errores | **Sentry** | Stack trace y frecuencia reales | Solo revisar el servidor a mano |
| Producto | **PostHog** (eventos mínimos y sin PII) | Medir activación y retención | Analítica casera desde el día uno |
| CI/CD | **GitHub Actions** | Ya existe el repo; cache de pnpm, typecheck, tests, build y migraciones | Jenkins (infraestructura extra) |
| Hosting Fase 3 | **Cloudflare (DNS/CDN) + Render o Fly.io (API) + Supabase (datos)** | Costo bajo y despliegue simple | Vercel free (su tier gratuito es para uso no comercial; no sirve para una startup que cobra) |
| Hosting Fase 4 | **AWS ECS Fargate + RDS Multi-AZ + S3 + CloudFront + EventBridge** | Escala, SLA y servicios gestionados | Kubernetes propio (complejidad sin equipo de plataforma) |

### 4.1 Versiones y fijación

- Las versiones exactas se fijan con `pnpm-lock.yaml` al iniciar cada fase; este documento fija la **familia** y la razón, no un número que caduca.
- Node 24 LTS es el runtime de desarrollo; el repo declara `engines` y, cuando se active el CI, usará la misma versión.
- TypeScript se actualiza solo con `typecheck` y suite en verde; una versión nueva no entra por moda.

### 4.2 Lo que no se instala todavía

- **Next.js:** no hay SEO ni SSR en un dashboard tras login. Si más adelante se necesita una landing pública con SSR, se evalúa aparte.
- **Kubernetes, Kafka, microservicios:** no hay escala que los justifique. Un monolito modular con Fastify es más barato de operar y de entender.
- **CRDT propio:** el conflicto real se resuelve con outbox, idempotencia y última escritura por campo; un CRDT casero es un proyecto de meses.
- **IA generativa en el producto:** primero datos limpios y adopción; después, si acaso, asistencia para reportes.

---

## 5. Arquitectura objetivo por fase

| Fase | Cliente | API | Datos | Infraestructura |
|---|---|---|---|---|
| 0. Académica (hoy → 14-nov-2026) | MVP HTML/CSS/JS + Python | API local de `servidor.py` | SQLite local | PC de la finca / equipo de la demo |
| 1. Hardening (15-nov → 31-dic-2026) | MVP actual + fixes | Fastify + TypeScript (reemplaza la API Python) | SQLite WAL + respaldo verificado | Local; sin nube obligatoria |
| 2. Producto TS (Q1 2027) | React 19 + Vite + PWA | Fastify 5 + Zod + Drizzle | PostgreSQL local de desarrollo + SQLite de campo | CI + demo estática honesta |
| 3. SaaS con pilotos (Q2 2027) | PWA instalable | Fastify en Render/Fly | Supabase PostgreSQL + Storage | Cloudflare + Supabase + Render/Fly |
| 4. Escala (2027–2028) | PWA + integraciones | Servicios modulares en ECS/Fargate | RDS Multi-AZ + réplicas + particiones | AWS + observabilidad y SLA |

**Regla de transición:** no se abre una fase nueva hasta que la anterior tenga su criterio de aceptación cumplido y medido. La fase 3 no empieza sin 3 fincas piloto usando el producto y sin respaldo/restauración probados.

---

## 6. Fases, alcance y criterios de aceptación

### Fase 0 — Cierre académico (hoy → 14-nov-2026)

**Alcance:** defender el MVP, no reescribirlo. Congelar el 13-nov.  
**Criterios:**
- `npm run verify` en verde (typecheck + paridad + 37 tests).
- Login/2FA, 8 módulos, alta, búsqueda, CSV y logout verificados en navegador.
- Cinta roja bloqueando el pesaje sin override (corregido 08-nov en el MVP y en el espejo `producto_mvp/`).
- Presentación exportada y auditada con `deck:audit`.

### Fase 1 — Hardening del MVP (15-nov → 31-dic-2026)

**Objetivo:** que el MVP sea seguro y operable en una finca real, todavía sin nube.

**Alcance:**
1. Autenticación de servidor: contraseñas con argon2id, sesión httpOnly, CSRF, bloqueo por intentos, RBAC (`Administrador`, `Veterinario`, `Operario`, `Asistente`).
2. API local con token de sesión y validación Zod en cada endpoint; el navegador deja de ser la autoridad.
3. Respaldo diario verificado (volcado SQLite + copia externa + restauración probada).
4. Bitácora de accesos y cambios críticos (quién, cuándo, qué).
5. Migración de los datos del MVP al esquema de 12 tablas; script de importación idempotente.
6. Tests de integración de API y E2E de los flujos críticos.
7. Retirar la API Python al final de la fase; el frontend del MVP se conecta a la API TypeScript por `fetch`.
8. Conectar las reglas de dominio que hoy solo viven en TypeScript: días abiertos con categorías (óptimo < 90, alerta 90–119, crítico ≥ 120) calculados desde el último parto, no desde la inseminación; y liquidación UFC con ajuste por litro (+80/+40/0/−120) en el módulo de producción.
9. Registro de leche bloqueada o segregada: si hay vacas en retiro, la entrega no se registra sin declarar qué litros se descartaron; se elimina el `confirm()` genérico.

**Criterios de aceptación:**
- Login real sin `localStorage`; una petición sin sesión recibe 401.
- Restauración desde respaldo probada en un equipo limpio.
- `npm run verify` + suite de API + E2E en verde.
- Cero secretos en Git; `correo_config.json` y `datos/` fuera del índice.
- Una vaca con 120 días o más desde el último parto aparece como crítica y genera alerta; una con 90–119 como alerta temprana.
- La entrega calcula el ajuste UFC y el valor liquidado con la regla TS; no se acepta un valor manual sin trazabilidad.
- Una entrega con vacas en retiro exige declarar la leche descartada o segregada; no hay override genérico.

**Riesgo principal:** subestimar la migración de datos. Mitigación: importación idempotente y comparación de conteos/reglas antes de borrar nada.

### Fase 2 — Producto TypeScript (Q1 2027)

**Objetivo:** un solo producto tipado, con API y frontend separados, sin perder la operación offline.

**Alcance:**
1. Monorepo: `apps/api`, `apps/web`, `packages/domain`, `packages/contracts`, `packages/db`.
2. API Fastify con Zod, Drizzle y migraciones versionadas.
3. Frontend React 19 + Vite + Tailwind, reutilizando los flujos y la identidad visual del MVP.
4. PWA con IndexedDB y outbox para registrar sin red; sincronización idempotente al volver.
5. Demo estática honesta: sin prometer persistencia que no existe.
6. Pruebas de contrato y de migración SQLite → PostgreSQL.

**Criterios de aceptación:**
- Paridad funcional con el MVP en los 8 módulos.
- Lighthouse ≥ 90 en accesibilidad y rendimiento en las pantallas principales.
- 0 regresiones en los flujos críticos (alta, pesaje, tratamiento, entrega, cierre de sesión).
- Una operación registrada offline se sincroniza una sola vez (idempotencia probada).
- `tsc --noEmit` sin errores y sin `any` en el código nuevo.

### Fase 3 — SaaS con pilotos (Q2 2027)

**Objetivo:** 3–5 fincas piloto pagando o en prueba formal, con datos reales y soporte.

**Alcance:**
1. Supabase PostgreSQL + Auth + Storage; RLS por `id_finca`.
2. API en Render o Fly.io; frontend estático en Cloudflare Pages o servido por la API.
3. Multi-finca, roles, invitaciones y facturación básica (pasarela por definir con el contador).
4. Respaldos automáticos, restauración documentada y monitoreo con Sentry/pino.
5. Tablero de métricas de producto y de operación.
6. Contrato de piloto, política de tratamiento de datos y soporte por WhatsApp/correo.

**Criterios de aceptación:**
- Dos fincas aisladas: una no puede leer ni escribir datos de la otra (test de aislamiento).
- Restauración desde respaldo cloud probada.
- 99.5% de disponibilidad medida en el piloto (o el SLA que se firme).
- Costo mensual dentro del presupuesto de validación; si se acerca al límite, se recorta alcance, no se activa cobro sorpresa.
- Un cliente piloto completa el ciclo: alta → ordeño → entrega → reporte.

**Riesgo principal:** confundir un piloto con tracción. Métrica honesta: fincas que usan el sistema al menos 4 días por semana durante 4 semanas.

### Fase 4 — Escala comercial (2027–2028)

**Objetivo:** vender a asociaciones y fincas medianas sin multiplicar el equipo.

**Alcance:**
1. AWS: ECS Fargate, RDS PostgreSQL Multi-AZ, S3, CloudFront, EventBridge, SES/SNS, Route 53, WAF, Secrets Manager y CloudWatch.
2. Integraciones: archivos/tiquetes de Colanta (no se asume API pública), reportes ICA (verificar resolución vigente), básculas y RFID SINIGAN (investigación de compatibilidad).
3. Particionamiento de `pesajes_leche` por mes y archivo histórico.
4. Controles tipo SOC 2: gestión de accesos, cambios, incidentes y respaldos.
5. Soporte con niveles y documentación para mayordomos.

**Criterios de aceptación:**
- SLA y costos definidos antes de vender.
- Prueba de carga con el volumen del cliente más grande del pipeline.
- Plan de continuidad y recuperación probado.
- Seguridad revisada por un tercero antes de un contrato corporativo.

---

## 7. Plan de migración a TypeScript

**Estado actual:** 6 archivos TS (dominio, esquemas, tipos y un test). El MVP sigue en JavaScript heredado. La migración es incremental, no un big bang.

| Paso | Qué se hace | Criterio |
|---|---|---|
| 1 | Extraer `src/domain`, `src/schemas` y `src/types` a `packages/domain` y `packages/contracts` | Los tests actuales siguen en verde sin cambiar reglas |
| 2 | Crear `apps/api` con Fastify + Zod y un endpoint de salud | `GET /health` responde 200 y `tsc --noEmit` limpio |
| 3 | Modelar la base con Drizzle y migraciones | La migración crea las 12 tablas y el gate de paridad sigue verde |
| 4 | Portar los endpoints críticos: bovinos, tratamientos, pesajes, entregas | Tests de integración con base temporal |
| 5 | Portar el frontend a React 19 por módulos, empezando por pesaje y sanidad | Paridad funcional del módulo y E2E en verde |
| 6 | Retirar el JavaScript heredado | Cero archivos `.js` de producto sin fecha de retiro |

**Reglas de tipado:**
- Prohibido `any` en código nuevo; `unknown` + validación Zod en los bordes.
- Los tipos del dominio no dependen de Fastify, React ni Drizzle.
- Las fechas se manejan como `YYYY-MM-DD` en el dominio y se convierten a `Date` solo en la capa de presentación.
- Todo cálculo de “hoy” usa la zona local de Colombia; nunca UTC implícito.

---

## 8. Datos, multi-inquilino y migración a PostgreSQL

**Modelo:** 12 tablas 3FN. La columna `id_finca` es la frontera de inquilino en bovinos, potreros, entregas y suscripciones; las tablas hijas heredan el aislamiento por su padre.

**Reglas:**
1. Toda consulta de aplicación filtra por `id_finca`; ningún endpoint acepta `id_finca` del cliente sin verificar la sesión.
2. En Supabase se activa RLS por `id_finca` además del filtro de aplicación (defensa en profundidad).
3. Índices obligatorios: `bovinos(id_finca)`, `pesajes_leche(id_bovino, fecha_pesaje)`, `tratamientos_sanitarios(fecha_tratamiento)`, `marcaciones(codigo_valor)` activo.
4. Migración SQLite → PostgreSQL: script idempotente, comparación de conteos por tabla, verificación de reglas de inocuidad y fechas, y ventana de corte documentada.
5. Respaldo: volcado diario, retención mínima de 30 días, restauración probada cada trimestre.
6. Datos personales: minimizar (correo y nombre), no enviar PII a analítica, y documentar la finalidad.

**Escalabilidad de datos:**

| Nivel | Escala | Infraestructura | Trigger para subir |
|---|---|---|---|
| 0 | 1–10 fincas | SQLite local / Supabase free | Primer piloto pagando |
| 1 | 10–100 fincas | PostgreSQL gestionado + API | 10 fincas activas o 1M pesajes |
| 2 | 100–1.000 fincas | Réplicas de lectura + caché Redis | Latencia de reportes > 1 s sostenida |
| 3 | 1.000–20.000 fincas | AWS ECS/RDS Multi-AZ + particiones | Contrato corporativo o SLA |
| 4 | 10M+ bovinos | Sharding por `id_finca`, streaming IoT | Métrica real, no diapositiva |

---

## 9. Seguridad, privacidad y cumplimiento

**Decidido:**
- Auth de servidor, sesiones httpOnly, CSRF, rate limit y bloqueo por intentos.
- RBAC con permisos explícitos; el rol no se acepta desde el cliente.
- Validación Zod en el borde y *prepared statements* en la base.
- Secretos en variables de entorno o gestor; nunca en Git (Regla 49).
- Bitácora de accesos y cambios críticos; retención definida.
- Respaldos cifrados y restauración probada.

**A verificar con profesional antes de cobrar:**
- Ley 1581 de 2012 y Decreto 1377 de 2013: política de tratamiento, aviso de privacidad y registro de bases de datos ante la SIC cuando aplique.
- Régimen societario: S.A.S. (Ley 1258 de 2008) y beneficios de emprendimiento juvenil (Ley 1780 de 2016) — confirmar requisitos y vigencia con contador/abogado.
- IVA de servicios en la nube (Estatuto Tributario, artículo 476, numeral 24): confirmar alcance con contador; no se afirma exención sin concepto.
- Normativa ICA aplicable a reportes y trazabilidad: confirmar la resolución vigente con el asesor veterinario; no se cita un número sin verificar.
- Colanta: no se asume una API pública; la integración inicial será por archivo/tiquete y se valida con la cooperativa.

---

## 10. QA y CI/CD

**Pirámide:**
1. **Unitarias (Vitest):** reglas de dominio, cálculos de fechas, validaciones Zod.
2. **Integración (Fastify `inject` + base temporal):** endpoints, permisos, aislamiento por finca, migraciones.
3. **E2E (Playwright):** login, alta, pesaje, tratamiento, entrega, reporte y cierre de sesión; un flujo offline con IndexedDB.
4. **Contrato:** los esquemas Zod son la única definición de payload; el frontend y la API los comparten.
5. **Migración:** aplicar migraciones desde cero y desde la versión anterior en CI.

**Gate de CI (obligatorio):**
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm db:migrate:check`
- `npm run paridad` (mientras el DDL viva en este repo)
- `npm run verify` (mientras el repo académico siga siendo el SSOT del modelo)

**Regla:** un rojo en CI no se ignora con `--no-verify`; se corrige o se revierte.

---

## 11. Observabilidad y soporte

- **Logs:** pino en JSON, con `requestId`, `id_finca`, usuario y duración; sin contraseñas ni tokens.
- **Errores:** Sentry con release y entorno; alerta si un error nuevo afecta a más de un usuario.
- **Métricas técnicas:** latencia p95, tasa de error, cola de sincronización, respaldos fallidos.
- **Soporte:** canal único (WhatsApp/correo), tiempo de respuesta declarado y base de conocimiento para mayordomos.
- **Incidentes:** plantilla de postmortem sin culpa, con causa raíz, impacto y acción correctiva con fecha.

---

## 12. Métricas de producto y unidad económica

**Activación:** finca que registra 10 animales y su primer ordeño en la primera semana.  
**Uso:** fincas activas semanales (al menos 4 días de registro), litros registrados, tratamientos con retiro, bloqueos de cinta roja.  
**Valor:** eventos de contaminación evitados (declarados por el cliente), días abiertos reducidos, horas de libreta ahorradas.  
**Negocio:** conversión Free → Pro, churn mensual, CAC por canal, LTV, margen bruto.  
**Honestidad:** los ahorros de 5M–25M COP y 20k COP/día son escenarios para dimensionar el problema; no son mediciones propias hasta que un piloto las documente.

**Unit economics objetivo (a validar):** Pro 119k COP/mes; costo variable por finca bajo (infraestructura compartida); margen bruto alto. No se promete un TAM: se mide la cuenca concreta y se expande con evidencia.

**Proyección cuantitativa 1/5/10 años:** ver [`PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md`](PROYECCION_ESCALABILIDAD_Y_RENTABILIDAD.md) (clientes, cargas, DB, costos, ingresos, punto de equilibrio, load balancer y mantenibilidad).

---

## 13. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El MVP se presenta como SaaS en producción | Pérdida de credibilidad | Etiquetar demo, local-first y fases; este documento como fuente |
| Bug de retiro libera leche contaminada | Daño sanitario y legal | Regla única fail-closed, tests de frontera y bloqueo sin override |
| Migración de datos pierde registros | Pérdida de confianza | Importación idempotente, conteos y respaldo antes de borrar |
| Free tiers cambian o desaparecen | Costo inesperado | Verificar límites al iniciar la fase; presupuesto y plan B |
| Un solo desarrollador (bus factor) | Bloqueo del proyecto | Documentación, tests y CI; no depender de memoria |
| Integración Colanta/ICA asumida | Promesa incumplible | Validar con la entidad antes de vender la función |
| El MVP muestra “días abiertos” desde la inseminación y no liquida UFC | La demo promete más de lo que hace | Fase 1 conecta las reglas TS, con pruebas de dominio y criterios de aceptación |
| Complejidad prematura | Retraso y deuda | Lista de “no construir” y revisión por fase |

---

## 14. Lo que NO se construye todavía

- App móvil nativa (la PWA cubre el caso).
- Microservicios, Kubernetes, Kafka, colas complejas.
- IA generativa en el flujo de ordeño.
- Facturación electrónica propia (se integra o se usa un proveedor).
- Integración IoT antes de validar que el cliente paga por ella.
- Multi-idioma y multi-país antes de dominar Colombia.

**Deuda aceptada hasta la Fase 2:** el frontend heredado tiene `proganado.js` monolítico (más de 2.000 líneas) y `prototipo_interfaz/app.js` (668 líneas), por encima de la regla de 300 líneas. No se refactoriza antes de la defensa: se divide al portar cada módulo a React. La regla de inocuidad ya está extraída y probada, que es la parte que no admite deuda.

---

## 15. Registro de decisiones (ADR)

| Fecha | Decisión | Motivo |
|---|---|---|
| 07-nov-2026 | El producto canónico es el MVP de Emilio, no React | Es lo que se ejecuta y se auditó; React queda como referencia |
| 08-nov-2026 | Cinta roja fail-closed también en el MVP | El cálculo por horas liberaba la vaca al mediodía del último día |
| 08-nov-2026 | El pesaje bloquea sin `confirm()` | Un override convierte una regla de inocuidad en una sugerencia |
| 08-nov-2026 | TypeScript-first para la API y el frontend nuevos | Tipado compartido, menos bugs y contratos Zod reutilizables |
| 08-nov-2026 | Fastify + Drizzle + React/Vite (no Next.js) | Simplicidad, costo y encaje con un dashboard tras login |
| 08-nov-2026 | Nube solo en Fase 3, con pilotos | No se paga infraestructura sin ingreso ni uso real |

---

## 16. Fuentes de verdad y documentos reemplazados

| Tema | Fuente vigente |
|---|---|
| Fases y stack | **Este documento** |
| Estado medido y evidencia | `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md` |
| Rutas, repos y timeline | `docs/sustentacion_2026/SSOT_Y_TIMELINE.md` |
| Modelo de datos | `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` |
| Reglas de dominio | `src/domain/` + `prototipo_interfaz/reglas_retiro.js` + `producto_mvp/reglas_retiro.js` |
| Producto actual | `producto_mvp/` (espejo filtrado) y `ProGanado_M2` (copia ejecutable) |
| Seguridad | `docs/GUIA_SEGURIDAD_Y_ESCALABILIDAD.md` (anexo) |
| Opciones gratuitas | `docs/ARQUITECTURA_FREE_TIER_STACK.md` (anexo; verificar límites al usar) |
| Detalle de dominio y UX | `docs/PLAN_MEJORA_ARQUITECTURA_PRODUCCION.md` (anexo) |

**Documentos históricos:** `docs/_archivo_2026-08/` y `docs/_archivo_2026-11/`. No se usan para decidir.
