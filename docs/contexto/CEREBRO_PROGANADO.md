# 🧠 CEREBRO PROGANADO — MAPA TÉCNICO Y ARQUITECTURA DEL SISTEMA

> **Mapa Técnico Exhaustivo de ProGanado (Proyecto Integrador CESDE)**  
> **Ámbito:** 100% Aislado a la operación y desarrollo de ProGanado SaaS.

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
   - Estándar: HTML5 Semántico Puro + WCAG 2.1 (Accesibilidad para operarios de campo).
   - Vistas: `02_Vistas_HTML5/` (Dashboard, Registro Bovino, Pesajes, Tratamientos, Acopio, Potreros).
   - Blueprints y Manual LEGO: `docs/GUIA_MAQUETACION_LANDING_PROGANADO_SEBASTIAN.pdf`, `docs/MANUAL_LEGO_HTML5_PROGANADO_SEBASTIAN.md`.

---

## ⚖️ 2. Marco Legal, Administrativo y Tributario (Camila Salas)
- **Constitución S.A.S.:** Ley 1780 de 2016 (Jóvenes Emprendedores, 100% exención matrícula mercantil Cámara de Comercio).
- **Régimen Tributario:** Régimen Simple de Tributación (RST 1.8% a 5.4%).
- **Exención de IVA:** Estatuto Tributario Art. 476 Numeral 24 (Software SaaS en la Nube excluido de IVA 19%).
- **Habeas Data:** Ley 1581 de 2012 (Protección de datos productivos y confidencialidad zootécnica de fincas).
- **Política Zero Data Loss:** Modo solo lectura en mora de pago, sin borrado de registros históricos.

---

## ☁️ 3. Pila Tecnológica & Servicios Cloud AWS
- **Frontend Hosting:** AWS S3 + AWS CloudFront (CDN global con HTTPS).
- **Multimedia Storage:** AWS S3 Bucket privado (fotos de aretes, actas ICA, reportes PDF).
- **Compute API:** AWS App Runner / AWS ECS Fargate (Contenedores Docker Express.js).
- **Database:** AWS RDS PostgreSQL Multi-AZ (backups diarios continuos).
- **Messaging & Notifications:** AWS EventBridge + AWS SNS (WhatsApp/SMS a mayordomos).
- **Domain & DNS:** AWS Route 53 (`proganado.co`).
