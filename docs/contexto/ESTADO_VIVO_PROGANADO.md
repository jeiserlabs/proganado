# 🐄 ESTADO VIVO — PROGANADO SAAS (Contexto Maestro del Proyecto Integrador)

> **SSOT (Single Source of Truth) del Proyecto Integrador CESDE Nivel 1**  
> **Repositorio Oficial:** `https://github.com/jeiser270997-source/ProGanado.git`  
> **Ubicación Local:** `E:\PROYECTOS\Mis_Proyectos\ProGanado`  
> **Última Actualización:** 30-Ago-2026 (Entrega Momento 1 Completada)

---

## 📌 1. Resumen de Estado Actual (Momento 1)
- **Estado de Entrega:** Momento 1 (Bases de Datos, Algoritmia, HTML5 Semántico, Emprendimiento Tech) COMPLETADO y RADICADO.
- **Documento PDF Oficial:** `04_Documentos_Sustentacion/PROGANADO_ENTREGA_MOMENTO_1_CESDE.pdf` (Generado con Playwright y respaldado en Escritorio).
- **Git Commit:** `39f515b` en rama `main`.
- **Salvedades Académicas:**
  1. *Capa Visual:* Maqueta HTML5 semántica pura en construcción activa modular bajo responsabilidad de Sebastián Gómez.
  2. *Capa de Persistencia:* MER Chen y Modelo Relacional 12 tablas 3FN en diseño base de lanzamiento, sujeto a optimizaciones iterativas en Momento 2.

---

## 👥 2. Asignación de Roles y Responsabilidades
| Integrante | Rol | Entregables Clave |
|---|---|---|
| **Jeiser Gutiérrez** | Tech Lead & Arquitecto BD | Modelo Relacional 12 tablas 3FN, schema SQL, arquitectura Cloud AWS, control Git. |
| **Sebastián Gómez** | Frontend Lead & Diseñador | Maquetación HTML5 semántica de las 6 vistas, accesibilidad WCAG 2.1, UI/UX. |
| **Emilio Villanueva** | Algoritmia & Lógica PSeInt | Algoritmos de Cinta Roja, Días Abiertos y Liquidación Leche con UFC Colanta. |
| **Camila Salas** | Legal, Admin & S.A.S. | Constitución S.A.S. Ley 1780 ($0 registro), Régimen Simple (RST), 0% IVA Cloud E.T. Art 476. |
| **Dr. Humberto Pinto** | Asesor Clínico & QA | Inocuidad biológica, telemetría clínica (pesaje AM/PM), pitch y defensa. |

---

## 🗃️ 3. Estructura de Datos (12 Tablas 3FN)
1. `usuarios`: Cuentas y roles (Administrador, Asistente, Veterinario).
2. `fincas`: Propiedades ganaderas multi-inquilino con Código ICA Predio.
3. `suscripciones_saas`: Modelo Freemium / Pro (119k COP/mes) con política *Zero Data Loss* (modo Solo_Lectura en mora).
4. `entregas_acopio`: Despacho diario/quincenal a Colanta con litros y recuento UFC.
5. `potreros`: Manejo de pasturas bajo Pastoreo Racional Voisin (PRV: ocupación y descanso).
6. `razas`: Catálogo zootécnico (Holstein, Jersey, Normando, Gyr, Girolando).
7. `bovinos`: Ficha central del animal con estado de lactancia y flag Cinta Roja.
8. `marcaciones`: Historial 1:N de aretes (ICA, SINIGAN, manejo, tatuajes) con flag `estado_activo`.
9. `medicamentos`: Farmacopea veterinaria con días de retiro oficial ICA.
10. `tratamientos_sanitarios`: Historial clínico flexible (procedimientos con o sin fármacos).
11. `pesajes_leche`: Telemetría exacta con `hora_pesaje: TIME` (04:30:00 AM / 14:30:00 PM).
12. `eventos_reproductivos`: Ciclo reproductivo con cálculo de días abiertos (meta < 100).

---

## ☁️ 4. Hoja de Ruta de Infraestructura Cloud
- **Fase 0 (Actual / $0 COP):** Frontend Vercel/GitHub Pages, Backend Express en Render Free, PostgreSQL en Supabase Free (500 MB).
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
