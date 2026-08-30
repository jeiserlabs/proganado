# PITCH DECK & ESPECIFICACIÓN PROGANADO (7 SLIDES) | CAVEMAN ULTRA

## SLIDE 1: PORTADA & PROPÓSITO
- **Nombre:** ProGanado
- **Subtítulo:** Del registro en el potrero a la hoja de vida digital de cada bovino.
- **Pilares:** Identificación individual · Trazabilidad por etapas · Automatización sanitaria y reproductiva.

## SLIDE 2: EL PROBLEMA (COSTO REAL SIN TRAZABILIDAD)
- 80%+ predios en Colombia usan cuadernos/planillas de papel.
- **Impacto Financiero:**
  - $350.000 COP perdidos por cada ciclo estral (21 días) no detectado a tiempo.
  - Tanque completo decomisado por mezclar leche de vaca en tiempo de retiro (antibióticos).
  - 20% caída en producción láctea por consanguinidad no controlada.

## SLIDE 3: GESTIÓN DE IDENTIFICACIÓN (ARETE VS HOJA DE VIDA)
- **Falla actual:** Arete visual se cae, se rompe o se reutiliza cuando un animal muere/vende.
- **Solución ProGanado:** ID interno permanente (PK) en software + Historial de marcaciones (1:N aretes/chips) -> Trazabilidad total de qué animal tuvo qué arete en cada fecha.

## SLIDE 4: SOLUCIÓN INTEGRAL (HOJA DE VIDA DIGITAL)
- ID permanente vincula 4 subsistemas:
  1. `Genealogía:` Árbol genealógico (Padre/Madre) anti-consanguinidad.
  2. `Marcación:` Historial de aretes y marcas.
  3. `Potrero:` Ubicación actual, rotación y capacidad de carga.
  4. `Ficha Médica:` Diagnósticos, vacunación, retiro y estado reproductivo.

## SLIDE 5: TRAZABILIDAD POR ETAPAS DE VIDA Y POTREROS
- **Etapas de desarrollo:**
  - Cría / Levante vacas pequeñas.
  - Destete (~4 meses).
  - Levante (1 a 1.5 años).
  - Preñez (vigilancia sanitaria y gestación).
  - Secado (día 223 de gestación / ~60 días antes del parto para descanso glandular).
- Potreros asociados a propósito, rotación de pastos y alertas automáticas de cambio de lote.

## SLIDE 6: AUTOMATIZACIONES Y REGLAS DE NEGOCIO (TRIGGERS / PROCEDURES)
1. **Ciclo Estral (21 días):** Detección y alerta automática de vacas en celo según último parto o celo.
2. **Tiempo de Retiro Sanitario:** Bloqueo automático de leche para venta (`apta_para_venta = FALSE`) mientras dure el periodo de carencia del fármaco.
3. **Control de Consanguinidad:** Validación previa a la monta/inseminación; alerta roja si comparten ascendencia en 1ª y 2ª generación.

## SLIDE 7: MODELO DE NEGOCIO SAAS
- **Finca Básica:** <50 reses | $50.000 COP/mes.
- **Hato Lechero:** <200 reses | $120.000 COP/mes.
- **Hacienda Total:** >200 reses | $250.000 COP/mes.