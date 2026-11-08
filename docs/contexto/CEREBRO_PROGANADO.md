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
   - **Producto principal (07-nov-2026):** app `ProGanado_M2` — HTML5 semántico + CSS3 + JavaScript vanilla, servidor Python 3, SQLite, login/2FA y 8 módulos. Copia en el hub: `03_PAGINAS_WEB_Y_DEMO_EN_VIVO/ProGanado_MVP/`.
   - **Referencia React (no es el producto actual):** `ProGanado_Web` / `jeiserlabs/proganado-producto-momento-2` (React 19 + Tailwind), archivada para la Fase 2.2.
   - **Archivadas:** maqueta monolítica Bootstrap (`_ARCHIVO_2026-11-07/web_variantes/bootstrap_m2/`) y demo SQLite anterior (`.../demo_sqlite/`).
   - Vistas base del Momento 1: `02_Vistas_HTML5/` (Dashboard, Registro Bovino, Pesajes, Tratamientos, Acopio, Potreros). Son referencia histórica.
   - Blueprints y manuales: en `docs/_archivo_2026-08/` (M1).

---

## ⚖️ 2. Marco Legal, Administrativo y Tributario (referencia histórica)

> Camila Salas se retiró del proyecto y del curso el **26-sep-2026**. Esta sección queda como referencia documental; el responsable actual del frente administrativo es Jeiser Gutiérrez.
- **Constitución S.A.S.:** Ley 1780 de 2016 (Jóvenes Emprendedores, 100% exención matrícula mercantil Cámara de Comercio).
- **Régimen Tributario:** Régimen Simple de Tributación (RST 1.8% a 5.4%).
- **IVA:** a verificar con contador. El Estatuto Tributario, artículo 476, numeral 24, excluye servicios de computación en la nube; no se afirma exención para el SaaS sin concepto profesional.
- **Habeas Data:** Ley 1581 de 2012 (Protección de datos productivos y confidencialidad zootécnica de fincas).
- **Política Zero Data Loss:** Modo solo lectura en mora de pago, sin borrado de registros históricos.

---

## ☁️ 3. Pila Tecnológica y hoja de ruta cloud (NO desplegado)

> **Estado real (08-nov-2026):** MVP local con Python 3 + SQLite + HTML/CSS/JS (`ProGanado_M2`), espejo filtrado en `producto_mvp/`. No hay backend desplegado, PostgreSQL ni AWS en producción. La página React de GitHub Pages es un escaparate histórico, no el producto. El plan vigente está en [`docs/ROADMAP_Y_STACK_STARTUP.md`](../ROADMAP_Y_STACK_STARTUP.md): Fase 1 (auth de servidor, API, respaldo) y Fase 2 (React 19 + Vite + PWA) después del 14-nov-2026.

- **Hoy:** HTML5 semántico + CSS3 + JavaScript vanilla; Python 3 (servidor estándar) + SQLite; TypeScript + Zod + `node:test` en el repo del modelo.
- **Hoja de ruta:** Fase 1 con Fastify + TypeScript y respaldo verificado; Fase 2 con React 19 + Vite y PWA; Fase 3 con PostgreSQL gestionado; Fase 4 con AWS (S3 + CloudFront, ECS Fargate, RDS Multi-AZ, EventBridge + SNS, Route 53). El detalle y los criterios están en el roadmap canónico; AWS no es el siguiente paso.
