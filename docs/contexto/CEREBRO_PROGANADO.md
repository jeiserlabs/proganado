# 🧠 CEREBRO PROGANADO — MAPA TÉCNICO Y ARQUITECTURA DEL SISTEMA

> **Mapa Técnico Exhaustivo de ProGanado (Proyecto Integrador CESDE)**  
> **Ámbito:** 100% Aislado a la operación y desarrollo de ProGanado SaaS.
> **Rutas, repos y timeline:** [`docs/sustentacion_2026/SSOT_Y_TIMELINE.md`](../sustentacion_2026/SSOT_Y_TIMELINE.md).

---

## 🏛️ 1. Arquitectura de 3 Capas
1. **Capa de Persistencia (Base de Datos):**
   - Motor: SQLite (Desarrollo local) / PostgreSQL (Producción Cloud Supabase / AWS RDS).
   - Estándar: 3FN con 12 tablas, integridad referencial estricta, restricciones CHECK y llaves compuestas.
   - Scripts: `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`.
   - Diagramas: `docs/diagramas/ER_PROGANADO.drawio`, `01_Base_de_Datos_SQL/proganado_mer.mmd`.
2. **Capa Lógica y Algorítmica:**
   - Pseudocódigo: `03_Logica_PSeInt/asistente_logica_proganado_completo.psc`.
   - Módulos:
     1. Inocuidad Lechera y Cinta Roja (Fail-Closed: `fecha_tratamiento + dias_retiro_ica`).
     2. Eficiencia Reproductiva y Días Abiertos (`dias_postparto > 100` -> Alerta IATF).
     3. Liquidación Acopio Lechero (Litros * Precio Base +/- Ajuste UFC Colanta).
3. **Capa de Presentación y Frontend:**
   - Estándar: HTML5 Semántico + Bootstrap 5.3 + WCAG 2.1 (Accesibilidad para operarios de campo).
   - Entrega oficial del Momento 2: repo `jeiserlabs/proganado-producto-momento-2` (`index.html`, `landing.html`, `dashboard.html`).
   - Vistas base del Momento 1: `02_Vistas_HTML5/` (Dashboard, Registro Bovino, Pesajes, Tratamientos, Acopio, Potreros). Son referencia, no la maqueta publicada.
   - Blueprints y manuales: en `docs/_archivo_2026-08/` (M1).

---

## ⚖️ 2. Marco Legal, Administrativo y Tributario (referencia histórica)

> Camila Salas se retiró del proyecto y del curso el **26-sep-2026**. Esta sección queda como referencia documental; el responsable actual del frente administrativo es Jeiser Gutiérrez.
- **Constitución S.A.S.:** Ley 1780 de 2016 (Jóvenes Emprendedores, 100% exención matrícula mercantil Cámara de Comercio).
- **Régimen Tributario:** Régimen Simple de Tributación (RST 1.8% a 5.4%).
- **Exención de IVA:** Estatuto Tributario Art. 476 Numeral 24 (Software SaaS en la Nube excluido de IVA 19%).
- **Habeas Data:** Ley 1581 de 2012 (Protección de datos productivos y confidencialidad zootécnica de fincas).
- **Política Zero Data Loss:** Modo solo lectura en mora de pago, sin borrado de registros históricos.

---

## ☁️ 3. Pila Tecnológica y hoja de ruta cloud (NO desplegado)

> **Estado real (31-oct-2026):** maqueta estática en GitHub Pages + demo SQLite local. No hay backend, PostgreSQL ni AWS en producción. Lo siguiente es planificado para después del 14-nov-2026.

- **Hoy:** HTML5 + Bootstrap 5.3.3 + CSS propio; Python + SQLite para la demo didáctica; Node.js + TypeScript + Zod + `node:test` en el repo de código.
- **Hoja de ruta (planificada):** AWS S3 + CloudFront para hosting y multimedia; ECS Fargate/App Runner para la API; RDS PostgreSQL Multi-AZ; EventBridge + SNS para alertas; Route 53 para DNS.
