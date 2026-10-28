# [ODD] Sustentación Proyecto Integrador ProGanado — CESDE Momento 1

> **Metodología:** ODD (One-Document-Driven Development / Gentle-AI).  
> **Abolición SDD:** Sustituye la burocracia de especificaciones multi-documento por este único documento vivo.  
> **Fecha:** 2026-10-25 | **Fecha Dura de Sustentación:** 14-Nov-2026

---

## 1. Objetivo y Problema (Why & What)
- **Problema:** La defensa del proyecto integrador ante los jurados y docentes del CESDE requiere demostrar dominio técnico riguroso en Base de Datos (12 tablas 3FN), Lógica y Algoritmos, y Maquetación Web semántica, garantizando que el software funcione sin depender de internet en el aula de clases.
- **Objetivo:** Proporcionar una demostración determinista, 100% offline, con:
  1. Base de datos normalizada en 3FN poblada con datos realistas de ganado lechero colombiano.
  2. Prototipo interactivo SPA en local (`prototipo_interfaz/`) con simulación de Cinta Roja, pesajes y alertas biológicas.
  3. Guía de sustentación y diapositivas interactivas en HTML5.

---

## 2. Scope Rule Estricto (Gentleman Scope)
- **Touchables:**
  - `prototipo_interfaz/*`
  - `02_Vistas_HTML5/*`
  - `04_Documentos_Sustentacion/*`
  - `.odd/tasks/*`
- **Forbidden:**
  - Alterar el DDL congelado `schema_produccion_proganado_v3.sql`.
  - Introducir dependencias de nube externas para la sustentación.

---

## 3. Guardrails Anti-Sobreingeniería (Anti-Overengineering)
- **Offline First:** Cero llamadas a APIs externas en la demo presencial.
- **Fail-Closed Biológico:** Demostración en vivo del rechazo automático de leche si la vaca está en cinta roja.

---

## 4. Tareas Atómicas Secuenciales (Tasks)
- [x] **T1: DDL 12 Tablas 3FN Validado:** Paridad total con types, schemas y README.
- [x] **T2: Prototipo Interactivo SPA:** Servidor local liviano en `prototipo_interfaz/`.
- [x] **T3: Guiones de Sustentación:** Argumentario técnico de defensa ante el jurado.
- [ ] **T4: Ensayo General Técnico (07-Nov-2026):** Simulación de preguntas difíciles de jurados.
- [ ] **T5: DEFENSA ANTE JURADO (14-Nov-2026):** Sustentación presencial en aula CESDE.

---

## 5. Acceptance Criteria & Oráculo Determinista
- `npm test`: 19/19 PASS (Paridad SSOT y reglas biológicas en verde).
- `npm run typecheck`: 0 errores.
- Servidor local: `python prototipo_interfaz/servidor.py` responde HTTP 200 en `localhost:8000`.

---

## 6. Baseline de Errores Conocidos (Known Baseline)
- Tolerancias controladas en `tools/paridad_excepciones.json` para campos didácticos de PSeInt y maquetación visual.

---

## 7. Progreso y Evidencia In-Place
- **2026-10-25:** Suite de paridad 100% en verde (19/19 PASS). Prototipo verificado para sustentación.
