# 📄 PROGANADO SAAS — DOCUMENTO TÉCNICO EJECUTIVO FINAL (12 TABLAS 3FN)
**CESDE - Escuela de Nuevas Tecnologías | Semestre 2026-2**
**Momento 1: Integración de Capa de Datos, Lógica y Presentación Visual**

---

## 1. RESUMEN EJECUTIVO
ProGanado es una plataforma SaaS B2B agropecuaria diseñada para la gestión integral de fincas lecheras y doble propósito en Colombia. Permite registrar la trazabilidad histórica de los bovinos (marcaciones 1:N), la rotación de praderas bajo Pastoreo Racional Voisin (PRV), el control de pesajes diarios con discriminación horaria (`hora_pesaje: TIME`), la inocuidad lechera con semáforo Cinta Roja (tiempos de retiro normativos del ICA), el control de los 100 días abiertos reproductivos y la liquidación quincenal con acopiadores (Colanta / UFC).

---

## 2. ARQUITECTURA DEL SISTEMA (3 CAPAS)
1. **Capa de Persistencia (Base de Datos):**
   - Motor SQLite 3 (Desarrollo) / PostgreSQL (Producción Supabase y AWS RDS Multi-AZ).
   - **12 Tablas relacionales en Tercera Forma Normal (3FN)** con llaves primarias, foráneas, restricciones CHECK e índices optimizados:
     `usuarios`, `fincas`, `suscripciones_saas`, `entregas_acopio`, `potreros`, `razas`, `bovinos`, `marcaciones`, `medicamentos`, `tratamientos_sanitarios`, `pesajes_leche`, `eventos_reproductivos`.
2. **Capa Lógica (Algoritmia PSeInt & TypeScript):**
   - Validación de inocuidad lechera (Cinta Roja Fail-Closed por tiempo de retiro ICA).
   - Cálculo automatizado de días abiertos reproductivos (meta <= 100 días post-parto).
   - Liquidación estimada de entrega de leche con bonificación/penalización por recuento bacteriano UFC.
3. **Capa Visual (HTML5 Semántico):**
   - Dashboard administrativo semántico con tablas de ocupación de potreros y producción.
   - Formulario accesible con `<fieldset>`, `<legend>`, `<label>` y validaciones nativas de entrada.

---

## 3. INTEGRANTES Y ROLES DEL EQUIPO
- **Jeiser Abraham Gutiérrez:** Tech Lead, Arquitecto de Base de Datos y QA Lead.
- **Sebastián Gómez:** Diseñador Frontend & Estructura HTML5 Semántica.
- **Emilio Villanueva:** Desarrollador de Lógica & Algoritmos PSeInt.
- **Camila Salas:** Directora Legal, Administrativa & S.A.S. (Ley 1780 / RST / 0% IVA Cloud).
- **Dr. Humberto Pinto:** Asesor Médico Veterinario & QA Inocuidad.
