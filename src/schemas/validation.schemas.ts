/**
 * ProGanado SaaS — Esquemas de Validación en Runtime (Zod)
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Lead)
 * @version 1.0.0 (Fail-Closed Input Validation)
 * 
 * Regla de Oro: Validación bidireccional estricta en Frontend y Backend.
 * Prevención de datos corruptos, fechas imposibles, inyecciones y malas prácticas de operarios.
 */

import { z } from 'zod';

// =============================================================================
// PATRONES REGEX DE VALIDACIÓN ESTRICTA
// =============================================================================

const REGEX_HORA_MILITAR = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/; // HH:MM:SS
const REGEX_FECHA_ISO = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // YYYY-MM-DD
const REGEX_CODIGO_ICA = /^[0-9]{2}-[0-9]{3,5}-[0-9]{3,6}$/; // Ej: 05-647-00129
const REGEX_CODIGO_ARETE = /^[A-Z0-9\-_]{2,20}$/i; // Arete alfanumérico limpio

// =============================================================================
// ESQUEMAS DE VALIDACIÓN POR ENTIDAD
// =============================================================================

/** 1. Schema Usuario */
export const UsuarioSchema = z.object({
  id_usuario: z.string().min(1, 'El ID de usuario es obligatorio'),
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(100),
  email: z.string().email('El formato del correo electrónico no es válido'),
  contrasena_hash: z.string().min(8, 'La contraseña debe tener un hash de al menos 8 caracteres'),
  rol: z.enum(['Administrador', 'Asistente', 'Veterinario', 'Operario'], {
    errorMap: () => ({ message: 'Rol no autorizado en el sistema' })
  }),
  fecha_registro: z.string().datetime({ message: 'Formato de fecha de registro inválido' }).optional()
});

/** 2. Schema Finca */
export const FincaSchema = z.object({
  id_finca: z.string().min(1, 'El ID de la finca es obligatorio'),
  id_usuario: z.string().min(1, 'El usuario propietario es obligatorio'),
  nombre_finca: z.string().min(2, 'El nombre de la finca debe tener al menos 2 caracteres').max(100),
  documento_titular: z.string().min(6, 'Documento de identidad no válido').max(20),
  codigo_ica_predio: z.string().regex(REGEX_CODIGO_ICA, 'El código ICA debe cumplir el formato oficial (ej: 05-647-0012)'),
  municipio: z.string().min(2, 'Municipio obligatorio').max(80)
});

/** 3. Schema SuscripcionSaas */
export const SuscripcionSaasSchema = z.object({
  id_suscripcion: z.string().min(1),
  id_finca: z.string().min(1),
  plan_tipo: z.enum(['Free', 'Pro_119k', 'Multi_Predio_299k']),
  estado_acceso: z.enum(['Activo', 'Solo_Lectura', 'Suspendido']),
  limite_vacas: z.number().int().min(1, 'El límite debe ser al menos 1 vaca'),
  fecha_inicio: z.string().regex(REGEX_FECHA_ISO, 'Fecha de inicio debe ser YYYY-MM-DD'),
  fecha_vencimiento: z.string().regex(REGEX_FECHA_ISO, 'Fecha de vencimiento debe ser YYYY-MM-DD').nullable().optional()
});

/** 4. Schema EntregaAcopio */
export const EntregaAcopioSchema = z.object({
  id_entrega: z.string().min(1),
  id_finca: z.string().min(1),
  fecha_entrega: z.string().regex(REGEX_FECHA_ISO, 'Fecha de entrega inválida'),
  litros_totales: z.number().positive('El volumen entregado debe ser mayor a 0 litros').max(50000, 'Volumen excede capacidad máxima de carrotanque'),
  valor_bruto_est: z.number().nonnegative('El valor estimado no puede ser negativo'),
  recuento_ufc: z.number().int().nonnegative('El recuento UFC no puede ser negativo').nullable().optional()
});

/** 5. Schema Potrero */
export const PotreroSchema = z.object({
  id_potrero: z.string().min(1),
  id_finca: z.string().min(1),
  nombre_potrero: z.string().min(1, 'El nombre del potrero es obligatorio').max(50),
  dias_ocupacion: z.number().int().min(1, 'Días de ocupación mínimo 1').max(5, 'Máximo 5 días de ocupación bajo norma PRV'),
  dias_descanso_prv: z.number().int().min(15, 'El descanso biológico del pasto no puede ser menor a 15 días').max(90)
});

/** 6. Schema Raza */
export const RazaSchema = z.object({
  id_raza: z.string().min(1),
  nombre_raza: z.string().min(2).max(50),
  descripcion_proposito: z.string().min(3).max(150)
});

/** 7. Schema Bovino */
export const BovinoSchema = z.object({
  id_bovino: z.string().min(1, 'ID de bovino obligatorio'),
  id_finca: z.string().min(1, 'ID de finca obligatorio'),
  id_potrero: z.string().nullable().optional(),
  id_raza: z.string().min(1, 'Raza obligatoria'),
  fecha_nacimiento: z.string().regex(REGEX_FECHA_ISO, 'Fecha de nacimiento debe ser YYYY-MM-DD'),
  alerta_cinta_roja: z.boolean().default(false),
  estado_lactancia: z.enum(['En_Ordeño', 'Horra_Seca', 'Novilla', 'Crecimiento', 'Toro'], {
    errorMap: () => ({ message: 'Estado zootécnico no reconocido' })
  })
});

/** 8. Schema Marcacion (Aretes) */
export const MarcacionSchema = z.object({
  id_marcacion: z.string().min(1),
  id_bovino: z.string().min(1),
  tipo_marca: z.enum(['Arete_ICA', 'Arete_SINIGAN', 'Chapeta_Manejo', 'Hierro_Caliente', 'Tatuaje', 'Chip_RFID']),
  codigo_valor: z.string().regex(REGEX_CODIGO_ARETE, 'El código del arete solo permite caracteres alfanuméricos, guiones y sin espacios (ej: CO-8942)'),
  estado_activo: z.boolean().default(true)
});

/** 9. Schema Medicamento */
export const MedicamentoSchema = z.object({
  id_medicamento: z.string().min(1),
  nombre_farmaco: z.string().min(2, 'Nombre del fármaco obligatorio').max(100),
  dias_retiro_ica: z.number().int().nonnegative('Los días de retiro no pueden ser negativos')
});

/** 10. Schema TratamientoSanitario (EHR Clínico Flexible) */
export const TratamientoSanitarioSchema = z.object({
  id_tratamiento: z.string().min(1),
  id_bovino: z.string().min(1, 'Bovino tratado obligatorio'),
  tipo_procedimiento: z.enum([
    'Antibiotico', 
    'Vacunacion_Aftosa', 
    'Vacunacion_Brucelosis', 
    'Desparasitacion_Interna', 
    'Desparasitacion_Externa', 
    'Podologia_Correctiva', 
    'Curacion_Herida', 
    'Descorne', 
    'Sincronizacion_IATF', 
    'Vitaminas_Minerales'
  ]),
  id_medicamento: z.string().nullable().optional(),
  fecha_tratamiento: z.string().regex(REGEX_FECHA_ISO, 'Fecha de tratamiento inválida'),
  dosis_ml: z.number().positive('La dosis debe ser mayor a 0 ml').nullable().optional()
}).refine((data) => {
  // Si el procedimiento es Antibiótico o Vacuna, el medicamento es obligatorio
  if (['Antibiotico', 'Vacunacion_Aftosa', 'Vacunacion_Brucelosis'].includes(data.tipo_procedimiento)) {
    return data.id_medicamento !== null && data.id_medicamento !== undefined && data.id_medicamento.length > 0;
  }
  return true;
}, {
  message: 'Para tratamientos de tipo Antibiótico o Vacunación es obligatorio seleccionar el fármaco correspondiente',
  path: ['id_medicamento']
});

/** 11. Schema PesajeLeche (Telemetría de Ordeño) */
export const PesajeLecheSchema = z.object({
  id_pesaje: z.string().min(1),
  id_bovino: z.string().min(1, 'Bovino pesado obligatorio'),
  fecha_pesaje: z.string().regex(REGEX_FECHA_ISO, 'Fecha de pesaje inválida (YYYY-MM-DD)'),
  hora_pesaje: z.string().regex(REGEX_HORA_MILITAR, 'Hora de pesaje debe cumplir formato HH:MM:SS (ej: 04:30:00)'),
  litros_obtenidos: z.number().positive('Los litros pesados deben ser mayores a 0').max(60, 'Producción sospechosa (> 60 L/ordeño). Verifique báscula.')
});

/** 12. Schema EventoReproductivo (Control 100 Días) */
export const EventoReproductivoSchema = z.object({
  id_evento: z.string().min(1),
  id_bovino: z.string().min(1),
  tipo_evento: z.enum(['Celo_Observable', 'Inseminacion_Artificial', 'Monta_Natural', 'Diagnostico_Palpacion_Positivo', 'Diagnostico_Palpacion_Vacia', 'Parto', 'Aborto']),
  fecha_evento: z.string().regex(REGEX_FECHA_ISO, 'Fecha de evento inválida (YYYY-MM-DD)'),
  dias_abiertos_calc: z.number().int().nonnegative('Los días abiertos no pueden ser negativos').nullable().optional()
});
