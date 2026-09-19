/**
 * ProGanado SaaS — Contratos y Tipos de Dominio Estrictos (TypeScript)
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Lead)
 * @version 1.0.0 (3FN / Zero-Any Policy)
 * 
 * Regla de Oro: Cero uso de 'any'. Tipado estricto para blindar la S.A.S.
 * desde la capa de entrada de datos hasta la persistencia relacional.
 */

// =============================================================================
// ENUMS Y TIPOS LITERALES DE DOMINIO
// =============================================================================

export type RolUsuario = 'Administrador' | 'Asistente' | 'Veterinario' | 'Operario';

export type PlanSaaS = 'Free' | 'Pro_119k' | 'Multi_Predio_299k';

export type EstadoAccesoSaaS = 'Activo' | 'Solo_Lectura' | 'Suspendido';

/**
 * Estado fisiológico/zootécnico REAL del animal (columna `bovinos.estado_fisiologico`).
 * Antes se llamaba `EstadoLactancia` con un vocabulario distinto al del CHECK de la
 * base: Zod aprobaba 'Novilla'/'Crecimiento'/'Toro', que el motor rechazaba.
 */
export type EstadoFisiologico =
  | 'En_Ordeño'
  | 'Horra_Seca'
  | 'Novilla_Vientre'
  | 'Ternero_Crecimiento'
  | 'Toro_Reproductor';

export type SexoBovino = 'Hembra' | 'Macho';

export type EstadoVital = 'Activo' | 'Muerto' | 'Vendido' | 'Descarte';

export type TipoMarca = 
  | 'Arete_ICA' 
  | 'Arete_SINIGAN' 
  | 'Chapeta_Manejo' 
  | 'Hierro_Caliente' 
  | 'Tatuaje' 
  | 'Chip_RFID';

export type TipoProcedimientoSanitario = 
  | 'Antibiotico' 
  | 'Vacunacion_Aftosa' 
  | 'Vacunacion_Brucelosis' 
  | 'Desparasitacion_Interna' 
  | 'Desparasitacion_Externa' 
  | 'Podologia_Correctiva' 
  | 'Curacion_Herida' 
  | 'Descorne' 
  | 'Sincronizacion_IATF' 
  | 'Vitaminas_Minerales';

/** PARIDAD v3.1: vocabulario idéntico al CHECK de `eventos_reproductivos`. */
export type TipoEventoReproductivo =
  | 'Parto'
  | 'Celo_Observable'
  | 'Inseminacion'
  | 'Palpacion'
  | 'Aborto';

export type CalidadHigienicaLeche = 'Excelente_Clase_A' | 'Buena_Clase_B' | 'Aceptable' | 'Deficiente_Penalizada';

// =============================================================================
// INTERFACES DE ENTIDADES DEL DOMINIO (12 TABLAS 3FN)
// =============================================================================

/** 1. USUARIOS: Autenticación, Auditoría y Roles */
export interface Usuario {
  readonly id_usuario: string; // UUID o Serial
  nombre: string;
  email: string;
  contrasena_hash: string;
  rol: RolUsuario;
  readonly fecha_registro: string; // ISO 8601 YYYY-MM-DDTHH:mm:ssZ
}

/** 2. FINCAS: Propiedades Ganaderas Multi-Inquilino */
export interface Finca {
  readonly id_finca: string;
  id_usuario: string; // FK -> Usuario
  nombre_finca: string;
  documento_titular: string; // Cédula o NIT
  codigo_ica_predio: string; // Formato oficial ICA (ej: 05-647-0012)
  municipio: string;
}

/** 3. SUSCRIPCIONES SAAS: Control de Acceso y Facturación */
export interface SuscripcionSaas {
  readonly id_suscripcion: string;
  id_finca: string; // FK -> Finca
  plan_tipo: PlanSaaS;
  estado_acceso: EstadoAccesoSaaS;
  limite_vacas: number;
  fecha_inicio: string; // YYYY-MM-DD
  fecha_vencimiento?: string | null; // YYYY-MM-DD
}

/** 4. ENTREGAS ACOPIO: Liquidación y Despacho a Carrotanque (Colanta) */
export interface EntregaAcopio {
  readonly id_entrega: string;
  id_finca: string; // FK -> Finca
  fecha_entrega: string; // YYYY-MM-DD
  litros_totales: number; // Decimal (ej: 1450.50) medidos en tanque de finca
  valor_bruto_est: number; // Moneda COP estimada
  recuento_ufc?: number | null; // Unidades Formadoras de Colonia por ml
  calidad_dictamen?: CalidadHigienicaLeche;
  numero_tiquete?: string | null; // Tiquete físico entregado por el conductor
  litros_facturados?: number | null; // Litros registrados por el flujómetro del camión
  precio_litro_real?: number | null; // Precio neto liquidado por litro COP
  valor_pagado_real?: number | null; // Consignación neta bancaria Colanta
  diferencia_litros?: number | null; // Merma o retención (litros_totales - litros_facturados)
}

/** Payload de inserción: excluye la columna virtual diferencia_litros calculada en SQLite */
export type CrearEntregaAcopioInput = Omit<EntregaAcopio, 'diferencia_litros'>;

/** 5. POTREROS: Manejo de Pasturas bajo Pastoreo Racional Voisin (PRV) */
export interface Potrero {
  readonly id_potrero: string;
  id_finca: string; // FK -> Finca
  nombre_potrero: string;
  dias_ocupacion: number; // Mínimo 1 (validación Zod: máximo 5)
  dias_descanso_prv: number; // Mínimo 15, Óptimo 35-42
}

/** 6. RAZAS: Catálogo Genético Zootécnico */
export interface Raza {
  readonly id_raza: string;
  nombre_raza: string;
  descripcion_proposito: string; // Leche, Carne o Doble Propósito
}

/**
 * 7. BOVINOS: Ficha Central del Animal.
 * Campos que NO son columna (derivados de la vista `v_bovinos_cinta_roja`):
 * `alerta_cinta_roja` y `fecha_fin_retiro`. Se exponen como SOLO LECTURA para que
 * ningún formulario pueda apagar la cinta roja a mano (fail-closed).
 */
export interface Bovino {
  readonly id_bovino: string;
  id_finca: string; // FK -> Finca
  id_potrero?: string | null; // FK -> Potrero (Opcional)
  id_raza: string; // FK -> Raza
  sexo: SexoBovino;
  estado_fisiologico: EstadoFisiologico;
  estado_vital: EstadoVital;
  fecha_nacimiento: string; // YYYY-MM-DD
  readonly alerta_cinta_roja?: boolean; // DERIVADO de la vista (fail-closed)
  readonly fecha_fin_retiro?: string | null; // DERIVADO de la vista (YYYY-MM-DD)
}

/** Payload de creación: sin los campos derivados de la vista. */
export type CrearBovinoInput = Omit<Bovino, 'alerta_cinta_roja' | 'fecha_fin_retiro'>;

/** Fila de la vista de inocuidad `v_bovinos_cinta_roja`. */
export interface CintaRojaBovino {
  readonly id_bovino: string;
  readonly id_finca: string;
  readonly id_tratamiento: string;
  readonly nombre_farmaco: string;
  readonly fecha_tratamiento: string;
  readonly dias_retiro_ica: number;
  readonly fecha_fin_retiro: string;
  readonly en_periodo_retiro: 0 | 1;
}

/** 8. MARCACIONES: Historial 1:N de Identificaciones */
export interface Marcacion {
  readonly id_marcacion: string;
  id_bovino: string; // FK -> Bovino
  tipo_marca: TipoMarca;
  codigo_valor: string; // Código alfanumérico visible en el arete
  estado_activo: boolean; // 1 = Arete actual, 0 = Arete histórico/perdido
}

/** 9. MEDICAMENTOS: Farmacopea Veterinaria y Tiempos de Retiro ICA */
export interface Medicamento {
  readonly id_medicamento: string;
  nombre_farmaco: string;
  dias_retiro_ica: number; // Días obligatorios de cuarentena de leche/carne
}

/** 10. TRATAMIENTOS SANITARIOS: Ficha Clínica Flexible (EHR) */
export interface TratamientoSanitario {
  readonly id_tratamiento: string;
  id_bovino: string; // FK -> Bovino
  tipo_procedimiento: TipoProcedimientoSanitario;
  id_medicamento?: string | null; // FK -> Medicamento (Opcional si es podología/descorne)
  fecha_tratamiento: string; // YYYY-MM-DD
  dosis_ml?: number | null; // Dosis en mililitros
}

/** 11. PESAJES LECHE: Telemetría de Producción por Turno */
export interface PesajeLeche {
  readonly id_pesaje: string;
  id_bovino: string; // FK -> Bovino
  fecha_pesaje: string; // YYYY-MM-DD
  hora_pesaje: string; // Formato HH:MM:SS (ej: '04:30:00' o '14:30:00')
  litros_obtenidos: number; // Litros pesados (ej: 18.75)
}

/** 12. EVENTOS REPRODUCTIVOS: Control Biológico y Días Abiertos */
export interface EventoReproductivo {
  readonly id_evento: string;
  id_bovino: string; // FK -> Bovino
  tipo_evento: TipoEventoReproductivo;
  fecha_evento: string; // YYYY-MM-DD
  dias_abiertos_calc?: number | null; // Días post-parto calculados
}
