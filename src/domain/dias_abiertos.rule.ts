/**
 * ProGanado SaaS — Regla Pura de Negocio: Días Abiertos y Ciclo Reproductivo
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Architect)
 * @version 1.0.0 (Zero-Any / Domain-Driven)
 * 
 * Regla de Oro: La meta zootécnica de una lechería especializada es 1 cría al año
 * (Intervalo Entre Partos IEP = 365 días), lo que exige preñez antes de los 85-100 días post-parto.
 */

export type CategoriaEficienciaReproductiva = 
  | 'OPTIMO'            // < 90 días
  | 'ALERTA_TEMPRANA'   // 90 a 119 días
  | 'CRITICO_PERDIDA';  // >= 120 días

export interface DiagnosticoDiasAbiertos {
  readonly id_bovino: string;
  readonly dias_abiertos: number;
  readonly categoria: CategoriaEficienciaReproductiva;
  readonly requiere_atencion_veterinaria: boolean;
  readonly recomendacion: string;
}

function parseFechaLocal(fechaStr: string): number {
  const partes = fechaStr.split('-').map(Number);
  const ano = partes[0] ?? 1970;
  const mes = (partes[1] ?? 1) - 1;
  const dia = partes[2] ?? 1;
  return new Date(ano, mes, dia, 0, 0, 0, 0).getTime();
}

/**
 * Calcula los días abiertos de una vaca a partir de la fecha de su último parto
 * y la fecha de referencia (o fecha de confirmación de preñez).
 */
export function calcularDiasAbiertos(
  idBovino: string,
  fechaUltimoPartoStr: string,
  fechaReferenciaOPrenezStr: string
): DiagnosticoDiasAbiertos {
  const tsParto = parseFechaLocal(fechaUltimoPartoStr);
  const tsRef = parseFechaLocal(fechaReferenciaOPrenezStr);

  if (tsRef < tsParto) {
    throw new Error('La fecha de evaluación o concepción no puede ser anterior al parto');
  }

  const diffMs = tsRef - tsParto;
  const diasAbiertos = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let categoria: CategoriaEficienciaReproductiva = 'OPTIMO';
  let requiereAtencion = false;
  let recomendacion = 'Vaca en ventana óptima de servicio reproductivo.';

  if (diasAbiertos >= 120) {
    categoria = 'CRITICO_PERDIDA';
    requiereAtencion = true;
    recomendacion = `Crítico: ${diasAbiertos} días abiertos. Pérdida económica por prolongación del intervalo entre partos. Programar palpación/ecografía urgente.`;
  } else if (diasAbiertos >= 90) {
    categoria = 'ALERTA_TEMPRANA';
    requiereAtencion = true;
    recomendacion = `Alerta: ${diasAbiertos} días abiertos. Ventana de inseminación próxima a cerrar. Monitorear celos activos o protocolo IATF.`;
  }

  return {
    id_bovino: idBovino,
    dias_abiertos: diasAbiertos,
    categoria,
    requiere_atencion_veterinaria: requiereAtencion,
    recomendacion,
  };
}
