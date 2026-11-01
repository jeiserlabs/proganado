/**
 * prototipo_interfaz/reglas_retiro.js
 * Regla de oro de cinta roja (retiro ICA), en un módulo puro y evaluable.
 *
 * Por qué existe este archivo: la regla vivía dentro de `app.js`, mezclada con DOM,
 * así que ningún test de Node podía ejercitarla. El resultado medido fue un fallo
 * de inocuidad: el cálculo anclaba el vencimiento al mediodía y usaba `Math.ceil`
 * sobre horas, de modo que a las 12:00 del último día de retiro devolvía 0 y la vaca
 * quedaba liberada a la hora del ordeño de la tarde. El SSOT dice lo contrario
 * (`src/domain/cinta_roja.rule.ts` y `01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql:185`:
 * bloqueado durante TODO el día de vencimiento, fail-closed).
 *
 * Convención (idéntica al dominio TS y al SQL):
 *   - fecha_fin_retiro = fecha_tratamiento + dias_retiro_ica  (día calendario)
 *   - BLOQUEADO mientras hoy <= fecha_fin_retiro  (el día de vencimiento cuenta)
 *   - liberada apenas al día siguiente
 *   - `dias_restantes` = días de leche bloqueada que faltan, INCLUSIVE hoy
 *     ⇒ siempre >= 1 mientras está bloqueada. Ese ">= 1" es lo que sostiene el
 *     contrato `> 0 ⇒ leche suspendida` que usan los 9 consumidores de app.js.
 *
 * Se compara por CALENDARIO LOCAL, nunca por horas ni por `toISOString()` (UTC),
 * porque Colombia (UTC-5) cruzaría la medianoche y bloquearía/liberaría un día
 * equivocado.
 */
(function (global) {
  'use strict';

  /** 'YYYY-MM-DD' -> Date local anclada a las 12:00 (mediodía evita el borde de la medianoche). */
  function fechaLocal(fechaStr) {
    if (typeof fechaStr !== 'string') return null;
    const partes = fechaStr.split('-').map(Number);
    if (partes.length !== 3 || partes.some(function (n) { return !Number.isFinite(n); })) return null;
    return new Date(partes[0], partes[1] - 1, partes[2], 12, 0, 0, 0);
  }

  /** 'YYYY-MM-DD' de una Date, en hora LOCAL (no UTC). */
  function ymdLocal(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  /** Días calendario enteros entre dos fechas locales. */
  function diasCalendario(desde, hasta) {
    return Math.round((hasta - desde) / 86400000);
  }

  /** Último día de retiro (Date local al mediodía) de un tratamiento. */
  function calcularFinRetiro(fechaTratamiento, diasRetiroIca) {
    const inicio = fechaLocal(fechaTratamiento);
    if (!inicio || !Number.isFinite(diasRetiroIca) || diasRetiroIca <= 0) return null;
    const fin = new Date(inicio.getTime());
    fin.setDate(fin.getDate() + diasRetiroIca);
    return fin;
  }

  /**
   * Días de leche bloqueada restantes, inclusive hoy. 0 => liberada.
   * @param {Array<{fecha_tratamiento: string, dias_retiro_ica: number}>} tratamientos
   *        Ya filtrados por bovino.
   * @param {Date} [ahora] Momento de evaluación (inyectable para poder probar).
   */
  function calcularRetiroPendiente(tratamientos, ahora) {
    if (!Array.isArray(tratamientos) || tratamientos.length === 0) return 0;
    const hoy = ahora instanceof Date ? ahora : new Date();
    const anclaHoy = fechaLocal(ymdLocal(hoy));
    let restante = 0;
    for (const t of tratamientos) {
      if (!t) continue;
      const fin = calcularFinRetiro(t.fecha_tratamiento, t.dias_retiro_ica);
      if (!fin) continue;
      // +1: el día del vencimiento sigue bloqueado (fail-closed).
      const dias = diasCalendario(anclaHoy, fin) + 1;
      if (dias > restante) restante = dias;
    }
    return restante > 0 ? restante : 0;
  }

  const ReglasRetiro = {
    fechaLocal,
    ymdLocal,
    calcularFinRetiro,
    calcularRetiroPendiente
  };

  // Mismo envoltorio que ya usa el ecosistema: global para el navegador,
  // module.exports para `node --test`. Sin esto, el require devuelve {} y el
  // test pasa vacio (lo aprendimos regenerando data.js en torneos).
  if (typeof module !== 'undefined' && module.exports) module.exports = ReglasRetiro;
  global.ReglasRetiro = ReglasRetiro;
})(typeof window !== 'undefined' ? window : globalThis);
