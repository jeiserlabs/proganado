/**
 * ProGanado SaaS — Regla Pura de Negocio: Liquidación y Dictamen Higiénico de Leche (Colanta)
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Architect)
 * @version 1.0.0 (Zero-Any / Domain-Driven)
 * 
 * Regla de Oro: La liquidación de leche para acopio formal en Colombia se rige por
 * volumen en frío, recuento de bacterias (UFC/ml) y mermas de carrotanque.
 */

import type { CalidadHigienicaLeche } from '../types/domain.types.ts';

export interface ParametrosLiquidacion {
  readonly precioBaseLitroCop: number; // Ej: 2.150 COP
  readonly recuentoUfc?: number | null; // Unidades Formadoras de Colonia
  readonly litrosEntregadosTanque: number;
  readonly litrosFacturadosCamion?: number | null;
}

export interface ResultadoLiquidacionLeche {
  readonly calidadHigienica: CalidadHigienicaLeche;
  readonly bonificacionPenalizacionUfcCop: number; // Por litro
  readonly precioFinalLitroCop: number;
  readonly valorBrutoFincaCop: number;
  readonly valorLiquidadoRealCop?: number;
  readonly mermaLitros: number;
  readonly porcentajeMerma: number;
}

/**
 * Determina el dictamen de calidad higiénica según el recuento UFC/ml oficial Colanta.
 */
export function clasificarCalidadUfc(recuentoUfc?: number | null): {
  readonly calidad: CalidadHigienicaLeche;
  readonly ajusteCopPorLitro: number;
} {
  if (recuentoUfc === null || recuentoUfc === undefined || recuentoUfc < 0) {
    return { calidad: 'Aceptable', ajusteCopPorLitro: 0 };
  }

  if (recuentoUfc <= 25000) {
    return { calidad: 'Excelente_Clase_A', ajusteCopPorLitro: 80 };
  }
  if (recuentoUfc <= 50000) {
    return { calidad: 'Buena_Clase_B', ajusteCopPorLitro: 40 };
  }
  if (recuentoUfc <= 100000) {
    return { calidad: 'Aceptable', ajusteCopPorLitro: 0 };
  }
  return { calidad: 'Deficiente_Penalizada', ajusteCopPorLitro: -120 };
}

/**
 * Calcula la liquidación completa de un despacho de leche a carrotanque.
 */
export function liquidarEntregaLeche(params: ParametrosLiquidacion): ResultadoLiquidacionLeche {
  if (params.litrosEntregadosTanque <= 0) {
    throw new Error('El volumen de leche entregado debe ser mayor a 0 litros');
  }

  const { calidad, ajusteCopPorLitro } = clasificarCalidadUfc(params.recuentoUfc);
  const precioFinalLitro = Math.max(0, params.precioBaseLitroCop + ajusteCopPorLitro);
  const valorBrutoFinca = Math.round(params.litrosEntregadosTanque * precioFinalLitro);

  let mermaLitros = 0;
  let porcentajeMerma = 0;
  let valorLiquidadoReal: number | undefined;

  if (params.litrosFacturadosCamion !== undefined && params.litrosFacturadosCamion !== null) {
    mermaLitros = Math.max(0, params.litrosEntregadosTanque - params.litrosFacturadosCamion);
    porcentajeMerma = Number(((mermaLitros / params.litrosEntregadosTanque) * 100).toFixed(2));
    valorLiquidadoReal = Math.round(params.litrosFacturadosCamion * precioFinalLitro);
  }

  return {
    calidadHigienica: calidad,
    bonificacionPenalizacionUfcCop: ajusteCopPorLitro,
    precioFinalLitroCop: precioFinalLitro,
    valorBrutoFincaCop: valorBrutoFinca,
    ...(valorLiquidadoReal !== undefined ? { valorLiquidadoRealCop: valorLiquidadoReal } : {}),
    mermaLitros,
    porcentajeMerma,
  };
}
