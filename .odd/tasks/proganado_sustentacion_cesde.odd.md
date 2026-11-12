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
- [ ] **T4: Ensayo General Técnico:** simulación cronometrada a **5:00** con las preguntas del jurado de las 4 guías. (Reprogramado: el 07-nov no se hizo.)
- [ ] **T5: DEFENSA ANTE JURADO (14-Nov-2026):** sustentación presencial en aula CESDE.

---

## 5. Acceptance Criteria & Oráculo Determinista
- `npm test`: 37/37 PASS (Paridad SSOT, reglas biológicas y espejo del MVP en verde).
- `npm run typecheck`: 0 errores.
- Servidor local: `python prototipo_interfaz/servidor.py` responde HTTP 200 en `localhost:8000`.

---

## 6. Baseline de Errores Conocidos (Known Baseline)
- Tolerancias controladas en `tools/paridad_excepciones.json` para campos didácticos de PSeInt y maquetación visual.

---

## 7. Progreso y Evidencia In-Place
- **2026-10-25:** Suite de paridad 100% en verde (19/19 PASS). Prototipo verificado para sustentación.
- **2026-11-08:** `npm run verify` → 37/37 PASS. Se agregó el espejo `producto_mvp/` y se corrigió el retiro fail-closed con bloqueo de pesaje sin override.
- **2026-11-11:** Duración de defensa confirmada en **~5 min** por el titular. Deck canónico: **V3 de 9 slides y 4 voces** (auditado con `deck:audit`: 9 páginas, pie en 8 slides, 0 frases prohibidas). Material textual dentro del repo en `docs/sustentacion_2026/DEFENSA_5MIN_V3/`; la copia del Escritorio quedó gitignoreada por contener PII (Regla 49). `npm run verify` → 37/37 PASS, typecheck 0, paridad total.
- **2026-11-12 (T4 medido, no aprobado):** ensayo grabado a las 12:30 medido con `ffprobe` + `silencedetect`: **5:20 de 5:00 (+20 s)**, habla efectiva 313 s, **6.9 s de silencio (2.2 %)**, ritmo 3.39 sílabas/s. El ritmo es correcto; sobra texto y faltan pausas. Hoja de corte de 5 frases (−34 s, proyecta 4:53 con pausas) y checkpoints por slide en `docs/sustentacion_2026/DEFENSA_5MIN_V3/ENSAYO_12NOV_RESULTADO.md`. T4 sigue abierto: exige re-ensayo ≤ 5:00 y decidir si se regeneran las 4 guías PDF tras el corte.
