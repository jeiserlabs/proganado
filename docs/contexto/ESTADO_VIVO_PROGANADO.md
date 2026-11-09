# 🐄 ESTADO VIVO — PROGANADO SAAS (Contexto Maestro del Proyecto Integrador)

> **SSOT (Single Source of Truth) del Proyecto Integrador CESDE Nivel 1**  
> **Repositorio Oficial:** `https://github.com/jeiserlabs/proganado` (el slug viejo `jeiser270997-source/ProGanado` ya no corresponde)  
> **Ubicación Local:** `C:\PROYECTOS\Mis_Proyectos\ProGanado`
> **Página Local:** `C:\PROYECTOS\Mis_Proyectos\ProGanado_M2` (MVP final M2) · `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web` (React + Tailwind, anexo M3)
> **SSOT de rutas y timeline:** [`docs/sustentacion_2026/SSOT_Y_TIMELINE.md`](../sustentacion_2026/SSOT_Y_TIMELINE.md)
> **Última Actualización:** 08-nov-2026 (auditoría del repo, espejo filtrado del MVP en `producto_mvp/`, fix de retiro fail-closed y pesaje sin override, roadmap canónico de escalabilidad y stack TypeScript-first; se mantiene la exposición de 7 pasos para el 14-nov)

---

## 📌 1. Resumen de Estado Actual (Momentos 2 y 3 — defensa 14-nov-2026)
- **Estado:** Momento 1 radicado. Momento 2 cerrado con la app local de ProGanado como producto final; Momento 3 con las entregas SQL y NoSQL. Defensa: **14-nov-2026** (7 pasos del elevator pitch + demo + preguntas).
- **Producto final (MVP):** `C:\PROYECTOS\Mis_Proyectos\ProGanado_M2` — HTML5, CSS3 y JavaScript vanilla; servidor Python 3; SQLite local; login/2FA; 8 módulos internos; 116 animales de ejemplo. Copia canónica en el hub: `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/ProGanado_MVP/`. El PDF del M2 (página + código) tiene 18 páginas y una versión de subida de 2 MB; el original de 18 MB quedó en `_ARCHIVO_2026-11-07/escritorio/_ORIGINAL_M2_18MB/`.
- **Auditoría del MVP (07-nov-2026):** login/2FA, 8 módulos, alta de animal, búsqueda, CSV y logout verificados en navegador; 0 errores de consola; 0 overflow a 390/768/1440 px; 0 imágenes rotas. Correcciones: banner de Contabilidad sin solapamiento, etiquetas ARIA en filtros, foco visible, contraste de texto secundario, objetivos táctiles de 24 px y Playfair Display local. Commit local `b72d266` en `ProGanado_M2`.
- **Página principal:** app de Emilio (`ProGanado_M2`). La variante React 19 + Tailwind (`ProGanado_Web`) queda como referencia para la refactorización futura; la maqueta Bootstrap y la demo SQLite anterior están archivadas en el hub, no son el producto actual.
- **Entregas M3 (un PDF por entrega):** NoSQL 7 páginas (base creada en MongoDB Compass, 12 tablas agrupadas en 5 colecciones, un documento de ejemplo por colección y capturas); SQL 7 páginas (10 consultas T-SQL con salidas). Carpeta de subida: `C:\Users\dev\Desktop\ENTREGAS`.
- **Entorno NoSQL local:** MongoDB Server 9.0.4 (servicio), Compass 1.53.2 y mongosh 2.14.1; base `proganado_nosql` con 5 colecciones y un documento de ejemplo por colección.
- **Exposición 14-nov:** guion y deck de 7 pasos (Problema, Solución, Arquitectura, Modelo de Datos, Demo/Frontend, Escalabilidad, Conclusiones) en `04_EXPOSICION_7_PASOS/`; reemplaza el deck de 12 slides como material de defensa.
- **Modelo de datos:** el DDL académico de 12 tablas 3FN sigue siendo el SSOT relacional; el MVP guarda las 12 entidades como JSON en SQLite y la migración NoSQL las agrupa en 5 colecciones.
- **Protocolo de Escalabilidad:** `docs/ROADMAP_Y_STACK_STARTUP.md` es el documento canónico (fases con criterios de aceptación, stack TypeScript-first, migración SQLite → PostgreSQL, seguridad y costos). `docs/ARQUITECTURA_Y_PLAN_ESCALABILIDAD.md` queda como histórico; AWS es hoja de ruta, no despliegue actual.
- **Auditoría 08-nov-2026 (repo):** se corrigió en la copia local `ProGanado_M2` y en el espejo `producto_mvp/` el cálculo de retiro que liberaba la vaca al mediodía del último día; el pesaje ahora bloquea sin `confirm()`. Se agregaron `reglas_retiro.js` (SSOT de la regla en el cliente) y el test del espejo. `npm run verify` = 37/37. El remoto de Emilio no tiene commits nuevos desde el 07-nov; el fix y el commit `b72d266` son locales y quedan pendientes de compartir.
- **Brechas funcionales detectadas (Fase 1):** el MVP etiqueta como “días abiertos” los días desde la inseminación (deben contarse desde el último parto y clasificarse en 90/120); el módulo de producción muestra el UFC pero no aplica la liquidación (+80/+40/0/−120) y la entrega usa un valor manual; si hay vacas en retiro, la entrega solo advierte con `confirm()`. Las tres están en `docs/ROADMAP_Y_STACK_STARTUP.md`, Fase 1.

---

## 👥 2. Asignación de Roles y Responsabilidades (Oficial 4 Integrantes — 26-Sep-2026)
| Integrante | Rol | Entregables Clave |
|---|---|---|
| **Jeiser Gutiérrez** | Tech Lead & Arquitecto BD / QA | Modelo Relacional 12 tablas 3FN, SQL/NoSQL, arquitectura, QA y control Git. |
| **Sebastián Correa** | Frontend Lead & Diseñador | HTML5 semántico, CSS3 (Grid/Flexbox), responsive, accesibilidad y demo. |
| **Emilio Villanueva** | Algoritmia, Lógica PSeInt & Diagramas | Algoritmos de Cinta Roja, Días Abiertos, Liquidación Leche y diagramación. |
| **Humberto Pinto** | Asesor Clínico | Sanidad animal ICA, farmacopea, normativa lechera, inocuidad y apoyo al pitch. |

*(Nota de auditoría: Camila Salas se retiró formalmente del proyecto y del curso el 26-Sep-2026; equipo consolidado en 4 integrantes en piedra).*

---

## 🗃️ 3. Estructura de Datos (12 Tablas 3FN)
1. `usuarios`: Cuentas y roles (Administrador, Asistente, Veterinario, Operario).
2. `fincas`: Propiedades ganaderas multi-inquilino con Código ICA Predio.
3. `suscripciones_saas`: Modelo Freemium / Pro (119k COP/mes) con política *Zero Data Loss* (modo Solo_Lectura en mora).
4. `entregas_acopio`: Despacho diario/quincenal a Colanta con litros y recuento UFC.
5. `potreros`: Manejo de pasturas bajo Pastoreo Racional Voisin (PRV: ocupación y descanso).
6. `razas`: Catálogo zootécnico (Holstein, Jersey, Normando, Gyr, Girolando).
7. `bovinos`: Ficha central del animal con `sexo`, `estado_fisiologico`, `estado_vital` y fecha de nacimiento. La Cinta Roja **no es columna**: se calcula en la vista `v_bovinos_cinta_roja` (fail-closed, nadie la apaga a mano).
8. `marcaciones`: Historial 1:N de aretes (ICA, SINIGAN, manejo, tatuajes) con flag `estado_activo`.
9. `medicamentos`: Farmacopea veterinaria con días de retiro oficial ICA.
10. `tratamientos_sanitarios`: Historial clínico flexible (procedimientos con o sin fármacos).
11. `pesajes_leche`: Registro de pesajes AM/PM con `hora_pesaje: TIME` (04:30:00 / 14:30:00). Los valores de la maqueta son ejemplos, no telemetría real.
12. `eventos_reproductivos`: Ciclo reproductivo con cálculo de días abiertos (meta < 100).

---

## ☁️ 4. Hoja de Ruta de Infraestructura Cloud
> **Estado real 07-nov-2026:** MVP local con servidor Python + SQLite; no hay backend desplegado, ni PostgreSQL en producción, ni AWS. La variante React es una referencia, no el producto. Hoja de ruta verificada: `docs/sustentacion_2026/ROADMAP_VERIFICADO_2026-11-07.md`.
- **Fase 2.1 (post-sustentación, 4–6 semanas):** API Node/TypeScript con Zod, autenticación de servidor, RBAC, respaldo diario verificado y migración al esquema de 12 tablas.
- **Fase 2.2 (Q1 2027):** refactor React 19 + Tailwind, PWA con IndexedDB y demo estática honesta.
- **Fase 3 (Q2 2027):** SaaS cloud $0 (Supabase PostgreSQL + Render/Railway), multi-finca y roles.
- **Fase 4 (2028+ / AWS Enterprise ~180k-300k COP mes):**
  - AWS S3 (imágenes de aretes y actas ICA).
  - AWS CloudFront (CDN global SSL).
  - AWS App Runner / ECS Fargate (API Express en contenedores Docker auto-escalables).
  - AWS RDS PostgreSQL Multi-AZ (alta disponibilidad y failover automático).
  - AWS EventBridge + SNS (Alertas automáticas por WhatsApp/SMS).

---

## 📋 5. Backlog del Momento 2
- [ ] **Frontend:** Maquetación de las 6 vistas HTML5 por Sebastián (`dashboard.html`, `registro_bovino.html`, `pesaje_leche.html`, `tratamientos_sanitarios.html`, `entregas_acopio.html`, `potreros_prv.html`).
- [ ] **Backend API:** Creación del servidor Node.js / Express con rutas modulares `/api/v1/bovinos`, `/api/v1/pesajes`, `/api/v1/sanidad`.
- [ ] **Testing E2E:** Suite de pruebas automatizadas con Playwright para flujos críticos (Cinta Roja y registro de ordeño).

> **Nota 07-nov-2026:** este backlog es histórico. El MVP final es `C:\PROYECTOS\Mis_Proyectos\ProGanado_M2` (HTML/CSS/JS + Python 3 + SQLite), con login/2FA y 8 módulos. La exposición del 14-nov usa los 7 pasos en `04_EXPOSICION_7_PASOS`.
