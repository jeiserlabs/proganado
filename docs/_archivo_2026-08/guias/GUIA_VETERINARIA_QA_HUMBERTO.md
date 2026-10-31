# 🩺 GUÍA DE VETERINARIA, INOCUIDAD & QA — DR. HUMBERTO PINTO
> **Destinatario:** Dr. Humberto Pinto (Chief Scientific Officer / Asesor Médico & QA)  
> **Propósito:** Orientación técnica, protocolos de inocuidad biológica, vademécum ICA y directrices de QA clínico para validar la plataforma con o sin IA.  
> **Filosofía Gentleman Programming / Clinical Precision:** Protocolos fail-closed, validaciones estrictas y cero tolerancia a contaminación de leche.

---

## 🐄 1. PROTOCOLOS CLÍNICOS CORE EN PROGANADO

1. **El Semáforo Fail-Closed de Inocuidad ("Cinta Roja"):**
   * Cuando se prescribe un fármaco con tiempo de retiro (ej: Penicilina, Oxitetraciclina, Cefalosporinas con 72h / 3 días de retiro ICA), el sistema activa automáticamente `bovinos.alerta_cinta_roja = 1`.
   * **Bloqueo Físico y Digital:** El ordeñador ve el semáforo rojo en la app y la cinta roja en la pata/cola de la vaca. El ordeño se realiza **en balde de descarte** (prohibido a tubería de tanque Colanta).
2. **Telemetría de Curva de Lactancia & Mastitis Subclínica:**
   * Doble pesaje diario (Mañana 04:30 AM y Tarde 02:30 PM).
   * **Regla de Detección:** Si una vaca presenta una caída $\ge 15\%$ en su producción semanal sin causa climática/nutricional, el sistema emite alerta preventiva para prueba de California Mastitis Test (CMT) o revisión de pezones.
3. **Protocolo Reproductivo de los 100 Días Abiertos:**
   * **Día 30:** Vitamina ADE + Fósforo (reactivación ovárica).
   * **Día 50:** Parche Estrotect detector de celo.
   * **Día 90:** Alerta roja si la vaca sigue vacía (revisión veterinaria de anestro o quistes ováricos).
   * **Día 45-60 Post-Servicio:** Jornada de Palpación en Lote para diagnóstico de preñez.

---

## 📋 2. LISTA DE CHEQUEO QA CLÍNICO (TESTING DE CAMPO)

Antes de aprobar cualquier cambio en el software, el Dr. Pinto verifica:
- [ ] ¿El tiempo de retiro del medicamento bloquea el ordeño comercial exactamente durante las horas reglamentadas?
- [ ] ¿La dosis en ml y vía de administración (IM, IV, SC, Intramamaria) corresponden a la ficha técnica del ICA?
- [ ] ¿El reporte de palpación permite clasificar rápidamente a las vacas en Preñada / Vacía / En Tratamiento?

---

## 🤖 3. PROMPT MAESTRO PARA TRABAJAR CON INTELIGENCIA ARTIFICIAL

Copia y pega este prompt en Claude, ChatGPT o DeepSeek para generar protocolos veterinarios:

```text
Actúa como Médico Veterinario Zootecnista (MVZ) y Auditor de Inocuidad Láctea en Colombia (normatividad ICA / Fedegán).
Estoy validando las reglas médicas del software "ProGanado" para fincas lecheras en Antioquia.
Reglas clave:
- Tiempos de retiro de antibióticos y desparasitantes en leche (Cinta Roja).
- Control de mastitis subclínica por caída de producción en pesajes AM/PM.
- Manejo reproductivo: Límite de 100 días abiertos post-parto y jornadas de palpación a los 45-60 días.

Por favor elabora: [ESCRIBE AQUÍ LO QUE QUIERES: Ej. El protocolo de evaluación veterinaria para vacas que caen más del 15% de leche en el pesaje semanal].
```
