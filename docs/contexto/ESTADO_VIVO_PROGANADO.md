# 🐄 ESTADO VIVO — PROGANADO SAAS (Contexto Maestro del Proyecto Integrador)

> **SSOT (Single Source of Truth) del Proyecto Integrador CESDE Nivel 1**  
> **Repositorio Oficial:** `https://github.com/jeiserlabs/proganado` (el slug viejo `jeiser270997-source/ProGanado` ya no corresponde)  
> **Ubicación Local:** `C:\PROYECTOS\Mis_Proyectos\ProGanado`
> **Página Local:** `C:\PROYECTOS\Mis_Proyectos\ProGanado_Web`
> **SSOT de rutas y timeline:** [`docs/sustentacion_2026/SSOT_Y_TIMELINE.md`](../sustentacion_2026/SSOT_Y_TIMELINE.md)
> **Última Actualización:** 31-oct-2026 (auditoría end-to-end del Momento 2, corrección de material, publicación de la web corregida y reorganización de Drive)

---

## 📌 1. Resumen de Estado Actual (Momento 2 — 14-nov-2026)
- **Estado:** Momento 1 completado y radicado. Momento 2 en preparación para la defensa del **14-nov-2026** (10–12 min + 5 de preguntas).
- **Material de estudio:** carpeta oficial de Drive [ProGanado_Sustentacion_Oficial_CESDE](https://drive.google.com/drive/folders/1_Ozo8XA7UjZPFWDf9WtDfhg5XgCmmKns). Guía maestra de 101 páginas corregida, 4 guías individuales, Dummies, deck de 12 slides y guion.
- **Página web:** https://jeiserlabs.github.io/proganado-producto-momento-2/ — maqueta Bootstrap 5.3; login demo, tabla/filtro/formulario visuales; la persistencia está en la demo SQLite.
- **Demo SQLite:** `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/demo_sqlite/` (una tabla didáctica; no es el DDL de 12 tablas).
- **Deuda P0 declarada:** PSeInt no es fail-closed en el último día; tabla UFC distinta entre TS y PSeInt; PDF del M1 con esquema viejo; gate de clon limpio; defaults del DDL; `auth_config.js` del prototipo. Detalle en `SSOT_Y_TIMELINE.md` §6.
- **Prototipo Interfaz:** `prototipo_interfaz/` (v1.0 interactivo aportado por Emilio con servidor local Python). No es la entrega oficial del Momento 2.
- **Protocolo de Escalabilidad:** `docs/ARQUITECTURA_Y_PLAN_ESCALABILIDAD.md` (4 fases; AWS es hoja de ruta, no despliegue actual).

---

## 👥 2. Asignación de Roles y Responsabilidades (Oficial 4 Integrantes — 26-Sep-2026)
| Integrante | Rol | Entregables Clave |
|---|---|---|
| **Jeiser Gutiérrez** | Tech Lead & Arquitecto BD / QA | Modelo Relacional 12 tablas 3FN, schema SQL, gobernanza TS/Zod, hoja de ruta cloud y control Git. |
| **Sebastián Correa** | Frontend Lead & Diseñador | Maquetación HTML5 semántica, Bootstrap 5.3, accesibilidad WCAG 2.1, UI/UX y demo. |
| **Emilio Villanueva** | Algoritmia, Lógica PSeInt & Diagramas | Algoritmos de Cinta Roja, Días Abiertos, Liquidación Leche y diagramación. |
| **Héctor Pinto (Dr. Pinto)** | Asesor Clínico Veterinario | Sanidad ICA, farmacopea, normativa lechera, inocuidad y apoyo al pitch. |

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
> **Estado real:** maqueta en GitHub Pages + demo SQLite local. No hay backend desplegado, ni PostgreSQL en producción, ni AWS. Lo siguiente es hoja de ruta.
- **Fase 0 (prototipo académico, no desplegado):** maqueta GitHub Pages, demo SQLite local; backend Express y PostgreSQL son fase 2.
- **Fase 1 (10-30 Clientes / ~120k COP mes):** Cloudflare Pages, VPS Hetzner/Railway, Managed PostgreSQL.
- **Fase 2 (50-500+ Fincas / AWS Enterprise ~180k-300k COP mes):**
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
