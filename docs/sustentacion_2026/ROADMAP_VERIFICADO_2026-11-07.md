# ProGanado — roadmap verificado al 07-nov-2026

> **Propósito:** dejar por escrito qué existe de verdad, qué es demo, qué falta y en qué orden se construye. No es una promesa de marketing: es el estado medido y el plan con criterios de aceptación.

## 1. Qué está construido y verificado

| Capa | Estado real | Evidencia |
|---|---|---|
| Modelo relacional | 12 tablas en 3FN, claves foráneas, CHECKs, vista de inocuidad | `npm run verify` 32/32 tests; `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql` |
| Reglas de dominio | Cinta roja fail-closed, días abiertos, liquidación Colanta/UFC | Tests de `tests/` y `src/domain/` en verde |
| Producto MVP | App HTML/CSS/JS vanilla + servidor Python 3 + SQLite; login/2FA; 8 módulos | `ProGanado_M2`; auditoría de navegador 07-nov: login, alta, búsqueda, CSV, logout, 0 errores de consola, 0 overflow a 390/768/1440 px |
| Entregas académicas | 3 PDFs (M2, NoSQL, SQL), un PDF por entrega, 4 integrantes | `Desktop/ENTREGAS` y hub `ENTREGAS_PARA_SUBIR` |
| NoSQL | 5 colecciones MongoDB con documentos de ejemplo y capturas de Compass | `02_MOMENTO_3_NOSQL_PROGANADO.pdf`; `PROGANADO_NOSQL_MONGODB/` |
| SQL Server | 10 consultas T-SQL (4 básicas, 6 intermedias) con salidas | `03_MOMENTO_3_SQL_PROGANADO.pdf`; `10_CONSULTAS_SQL_PROGANADO.sql` |
| Defensa | Deck y guion de 7 pasos | `04_EXPOSICION_7_PASOS/` |

## 2. Qué es demo y qué no

- **Real:** el modelo de datos, las reglas de dominio, la app local, la persistencia SQLite, el login/2FA local y el servidor Python.
- **Demo:** los 116–119 animales y los movimientos contables son datos de ejemplo; el 2FA en modo prueba muestra el código en pantalla; la autenticación vive en `localStorage` y la API no exige token.
- **No implementado:** multiusuario en red, HTTPS, respaldo automático, auditoría de accesos, app móvil, integración con Colanta/ICA, nube.

## 3. Objetivo del MVP

**Estable, utilizable, 0 costo y escalable**, en ese orden:

1. **Estable:** un solo proceso, SQLite, sin dependencias externas, datos a salvo de un cierre inesperado. Criterio: `npm run verify` en verde; arranque limpio; 0 errores de consola en los 8 módulos.
2. **Utilizable:** un mayordomo puede registrar un animal, un tratamiento, un pesaje y una entrega sin capacitación larga. Criterio: flujo completo en menos de 3 minutos; textos en español; teclado y lector de pantalla.
3. **0 costo:** Python estándar + SQLite + HTML/CSS/JS; sin SaaS obligatorio. Criterio: funciona sin internet y sin pagar servidores.
4. **Escalable:** el modelo y las reglas no cambian al pasar a API y nube. Criterio: DDL/3FN como SSOT; dominio TypeScript/Zod reutilizable; contratos de datos estables.

## 4. Brechas entre el MVP y el SaaS

| Brecha | Riesgo | Mitigación |
|---|---|---|
| Autenticación en cliente | Cualquiera con acceso al equipo puede alterar usuarios/hashes | Fase 2.1: auth de servidor con JWT/sesión, RBAC y auditoría |
| API sin token | La API local no distingue usuarios | Fase 2.1: middleware de sesión y permisos por rol |
| Un solo equipo | No hay acceso desde el potrero ni desde la ciudad | Fase 2.2: PWA + API en LAN; Fase 3: nube |
| Sin respaldo automático | Pérdida de datos si falla el disco | Fase 2.1: volcado diario verificado + copia externa |
| Sin cifrado en reposo | Lectura del disco o del perfil del navegador | Fase 3: cifrado gestionado por el proveedor cloud |
| GitHub Pages muestra React | El escaparate no coincide con el producto | Fase 2.2: publicar el MVP estático o una demo sin promesas de persistencia |
| Refactor React pendiente | Deuda de mantenimiento del frontend vanilla | Fase 2.2: migrar flujos a React 19 + Tailwind, sin cambiar el dominio |

## 5. Fases y criterios de aceptación

### Fase 2.1 — API y autenticación de servidor (después del 14-nov, 4–6 semanas)

- API Node/TypeScript (Express/Fastify) con Zod, `better-sqlite3` en WAL y los 7 endpoints prioritarios del ODD.
- Login de servidor con sesión/JWT, RBAC (`Administrador`, `Usuario`, `Veterinario`), bloqueo de intentos y bitácora de accesos.
- Los datos de `ProGanado_M2` se migran al esquema de 12 tablas; la app actual se conecta por `fetch`.
- **Aceptación:** `npm run verify` + suite de API en verde; login real sin `localStorage`; respaldo diario probado con restauración.

### Fase 2.2 — React 19 + Tailwind y PWA (Q1 2027)

- Refactor del frontend reutilizando los flujos y la identidad visual de Emilio.
- PWA instalable con IndexedDB para registrar sin internet y sincronizar al volver a la red.
- Publicar una demo estática honesta (sin prometer persistencia que no existe).
- **Aceptación:** paridad funcional con el MVP; Lighthouse ≥ 90 en accesibilidad y rendimiento; 0 regresiones en los flujos críticos.

### Fase 3 — SaaS cloud $0 (Q2 2027)

- PostgreSQL gestionado (Supabase free), API en Render/Railway free, almacenamiento de fotos.
- Multi-finca, roles, facturación básica y reportes.
- **Aceptación:** dos fincas aisladas; backup y restauración; pruebas E2E; costo mensual 0 dentro de los límites gratuitos.

### Fase 4 — Escala comercial (2028+)

- AWS/GCP, réplicas, CDN, IoT (básculas/RFID), integraciones Colanta/ICA.
- **Aceptación:** SLA, seguridad y costos definidos antes de vender.

## 6. Plan inmediato hasta la defensa (07 → 14-nov-2026)

| Fecha | Acción | Responsable |
|---|---|---|
| 07-nov | Cerrar auditoría del MVP, archivar variantes y actualizar SSOT | Jeiser |
| 08–09-nov | Ensayar los 7 pasos con cronómetro; probar la demo en el equipo de la sala | Todo el equipo |
| 10–11-nov | Repasar las 20 preguntas técnicas y la guía desde cero | Cada integrante |
| 12-nov | Ensayo general con proyector y datos limpios; verificar PDFs y enlaces | Jeiser |
| 13-nov | Respaldo del hub y de la base demo; congelar material | Jeiser |
| 14-nov | Sustentación | Todo el equipo |

## 7. Riesgos abiertos

1. **El jurado pide una URL en vivo y se muestra React, no el MVP.** Decir la verdad: el producto canónico es local; la página React es una referencia visual. Si se exige URL, publicar una demo estática etiquetada como demo.
2. **El 2FA en modo prueba parece inseguridad.** Explicar que es una app de finca en un solo equipo; la Fase 2.1 mueve la autenticación al servidor.
3. **El jurado pregunta por el respaldo.** Declarar que es manual hoy y que la Fase 2.1 lo automatiza.
4. **Se confunde el MVP vanilla con la variante React.** El SSOT y el hub ya separan ambos; no presentar React como producto actual.
5. **Cambios de última hora rompen la demo.** Congelar el 13-nov; no tocar código después del ensayo general.

## 8. Evidencia de verificación (07-nov-2026)

- `npm run verify` en `ProGanado`: typecheck + paridad + 32 tests en verde.
- Auditoría de navegador del MVP: login/2FA, 8 módulos, alta de animal, búsqueda, CSV, logout; 0 errores de consola; 0 overflow a 390/768/1440 px; 0 imágenes rotas.
- Correcciones de UI: banner de Contabilidad, etiquetas ARIA, foco visible, contraste, objetivos táctiles y Playfair local.
- Entregas: 3 PDFs, un archivo por entrega, con los 4 integrantes.
- Hub: variantes viejas en `_ARCHIVO_2026-11-07/`; producto canónico en `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/ProGanado_MVP/`.
