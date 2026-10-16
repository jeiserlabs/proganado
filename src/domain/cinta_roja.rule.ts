/**
 * ProGanado SaaS — Regla Pura de Negocio: Cinta Roja Biológica (Inocuidad ICA)
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Architect)
 * @version 1.0.0 (Fail-Closed / Zero-Any)
 * 
 * Regla de Oro: Si un bovino está bajo tratamiento con tiempo de retiro vigente,
 * su leche está terminantemente bloqueada para cualquier lote de acopio (Colanta).
 * La cinta roja se calcula en hora local de Colombia (UTC-5) y vence a las 23:59:59
 * del último día de retiro (fail-closed: el día del vencimiento todavía está bloqueada).
 */

export interface EstadoInocuidadBovino {
  readonly id_bovino: string;
  readonly en_cinta_roja: boolean;
  readonly fecha_fin_retiro: string | null; // YYYY-MM-DD
  readonly dias_restantes: number;
  readonly motivo_bloqueo?: string;
}

export interface TratamientoActivoInput {
  readonly id_tratamiento: string;
  readonly id_bovino: string;
  readonly fecha_tratamiento: string; // YYYY-MM-DD
  readonly dias_retiro_ica: number;
  readonly nombre_farmaco?: string;
}

/**
 * Normaliza una fecha ISO YYYY-MM-DD a timestamp en medianoche local
 */
function parseFechaLocal(fechaStr: string): number {
  const partes = fechaStr.split('-').map(Number);
  const ano = partes[0] ?? 1970;
  const mes = (partes[1] ?? 1) - 1;
  const dia = partes[2] ?? 1;
  return new Date(ano, mes, dia, 0, 0, 0, 0).getTime();
}

/**
 * Formatea una fecha local a YYYY-MM-DD
 */
function formatearFechaLocal(fecha: Date): string {
  const ano = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/**
 * Evalúa si un bovino está en Cinta Roja para una fecha dada (fail-closed).
 */
export function evaluarCintaRoja(
  idBovino: string,
  tratamientos: readonly TratamientoActivoInput[],
  fechaEvaluacionStr: string
): EstadoInocuidadBovino {
  const tsEvaluacion = parseFechaLocal(fechaEvaluacionStr);
  const tratamientosBovino = tratamientos.filter((t) => t.id_bovino === idBovino && t.dias_retiro_ica > 0);

  if (tratamientosBovino.length === 0) {
    return {
      id_bovino: idBovino,
      en_cinta_roja: false,
      fecha_fin_retiro: null,
      dias_restantes: 0,
    };
  }

  let maxFinRetiroTs = 0;
  let farmacoBloqueante = '';

  for (const t of tratamientosBovino) {
    const tsInicio = parseFechaLocal(t.fecha_tratamiento);
    // El fin de retiro es exactamente: fecha_tratamiento + dias_retiro_ica
    const fechaFin = new Date(tsInicio);
    fechaFin.setDate(fechaFin.getDate() + t.dias_retiro_ica);
    const tsFin = fechaFin.getTime();

    if (tsFin > maxFinRetiroTs) {
      maxFinRetiroTs = tsFin;
      farmacoBloqueante = t.nombre_farmaco ?? 'Fármaco con retiro ICA activo';
    }
  }

  const fechaFinRetiroStr = formatearFechaLocal(new Date(maxFinRetiroTs));
  
  // FAIL-CLOSED: Durante TODO el día de fecha_fin_retiro, la leche está BLOQUEADA.
  // Solo se libera al día siguiente (tsEvaluacion > maxFinRetiroTs).
  const enCintaRoja = tsEvaluacion <= maxFinRetiroTs;
  const diffMs = maxFinRetiroTs - tsEvaluacion;
  const diasRestantes = enCintaRoja ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;

  return {
    id_bovino: idBovino,
    en_cinta_roja: enCintaRoja,
    fecha_fin_retiro: fechaFinRetiroStr,
    dias_restantes: diasRestantes,
    ...(enCintaRoja
      ? { motivo_bloqueo: `Bloqueado por ${farmacoBloqueante}. Vence el ${fechaFinRetiroStr} inclusive.` }
      : {}),
  };
}

/**
 * Valida si un lote de ordeño puede ser entregado al acopio (Colanta).
 * Lanza o retorna error de inocuidad si al menos una vaca del lote está en Cinta Roja.
 */
export function validarInocuidadLoteAcopio(
  bovinosOrdeñadosIds: readonly string[],
  tratamientosActivos: readonly TratamientoActivoInput[],
  fechaOrdeñoStr: string
): { readonly aptoParaAcopio: boolean; readonly bovinosBloqueados: readonly EstadoInocuidadBovino[] } {
  const bloqueados: EstadoInocuidadBovino[] = [];

  for (const id of bovinosOrdeñadosIds) {
    const estado = evaluarCintaRoja(id, tratamientosActivos, fechaOrdeñoStr);
    if (estado.en_cinta_roja) {
      bloqueados.push(estado);
    }
  }

  return {
    aptoParaAcopio: bloqueados.length === 0,
    bovinosBloqueados: bloqueados,
  };
}
