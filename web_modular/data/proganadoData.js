/**
 * proganadoData.js
 * Almacén maestro de datos para ProGanado SaaS en React 19.
 * Integra fielmente el modelo zootécnico y contable de Emilio Villanueva.
 */

export const INITIAL_HERD = [
  {
    id: '1074',
    chapa: 'CO-1074-LP',
    nombre: 'Esmeralda',
    raza: 'Jersey Puro',
    sexo: 'Hembra',
    estado: 'En Ordeño',
    litrosDia: 22.8,
    partos: 2,
    diasLactancia: 88,
    potrero: 'Potrero Norte (Ocupado)',
    salud: 'Óptima',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_1074.jpg',
    peso: '460 kg',
    condicionCorporal: '3.75 / 5',
    padre: 'Jersey Sovereign USA',
    madre: 'Esmeralda Madre #452',
    fpp: '15-Mar-2027'
  },
  {
    id: '1075',
    chapa: 'CO-1075-LP',
    nombre: 'Marquesa',
    raza: 'Holstein',
    sexo: 'Hembra',
    estado: 'En Ordeño',
    litrosDia: 26.5,
    partos: 3,
    diasLactancia: 120,
    potrero: 'Potrero Norte (Ocupado)',
    salud: 'Óptima',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_1075.jpg',
    peso: '540 kg',
    condicionCorporal: '3.5 / 5',
    padre: 'Holstein Starfire',
    madre: 'Marquesa Senior #310',
    fpp: '02-Feb-2027'
  },
  {
    id: '1106',
    chapa: 'CO-1106-LP',
    nombre: 'Paloma',
    raza: 'Girolando F1',
    sexo: 'Hembra',
    estado: 'En Ordeño',
    litrosDia: 28.1,
    partos: 4,
    diasLactancia: 65,
    potrero: 'Potrero Norte (Ocupado)',
    salud: 'Alerta ICA (Tratamiento)',
    diasRetiroIca: 4,
    medicamento: 'Oxitetraciclina LA',
    foto: 'assets/ganado/vaca_1106.jpg',
    peso: '510 kg',
    condicionCorporal: '3.5 / 5',
    padre: 'Gyr Sansao',
    madre: 'Paloma Holstein #890',
    fpp: 'Sin servicio'
  },
  {
    id: '1151',
    chapa: 'CO-1151-LP',
    nombre: 'Campanera',
    raza: 'Holstein',
    sexo: 'Hembra',
    estado: 'En Ordeño',
    litrosDia: 24.2,
    partos: 2,
    diasLactancia: 140,
    potrero: 'Potrero Norte (Ocupado)',
    salud: 'Óptima',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_1151.jpg',
    peso: '525 kg',
    condicionCorporal: '3.25 / 5',
    padre: 'Holstein Mogul',
    madre: 'Campanera I #629',
    fpp: '18-Ene-2027'
  },
  {
    id: '1172',
    chapa: 'CO-1172-LP',
    nombre: 'Gitana',
    raza: 'Pardo Suizo',
    sexo: 'Hembra',
    estado: 'Horra Seca',
    litrosDia: 0,
    partos: 2,
    diasLactancia: 0,
    potrero: 'Potrero Sur (Descanso)',
    salud: 'Gestante (7 meses)',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_1172.jpg',
    peso: '580 kg',
    condicionCorporal: '4.0 / 5',
    padre: 'Brown Swiss Vigor',
    madre: 'Gitana Reina #458',
    fpp: '24-Dic-2026'
  },
  {
    id: '1201',
    chapa: 'CO-1201-LP',
    nombre: 'Princesa',
    raza: 'Jersey',
    sexo: 'Hembra',
    estado: 'En Ordeño',
    litrosDia: 21.4,
    partos: 1,
    diasLactancia: 45,
    potrero: 'Potrero Norte (Ocupado)',
    salud: 'Alerta ICA (Tratamiento)',
    diasRetiroIca: 2,
    medicamento: 'Cefalexina Intramamaria',
    foto: 'assets/ganado/vaca_1201.jpg',
    peso: '430 kg',
    condicionCorporal: '3.5 / 5',
    padre: 'Jersey Valentino',
    madre: 'Princesa Madre #972',
    fpp: 'Sin servicio'
  },
  {
    id: '1162',
    chapa: 'CO-1162-LP',
    nombre: 'Canela',
    raza: 'Simmental Doble Propósito',
    sexo: 'Hembra',
    estado: 'Novilla Vientre',
    litrosDia: 0,
    partos: 0,
    diasLactancia: 0,
    potrero: 'Potrero Este (Libre)',
    salud: 'Óptima (Celo detectado)',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_1162.jpg',
    peso: '390 kg',
    condicionCorporal: '3.75 / 5',
    padre: 'Simmental Raldi',
    madre: 'Canela Sim #1492',
    fpp: 'Lista para Inseminación'
  },
  {
    id: '635',
    chapa: 'CO-0635-LP',
    nombre: 'Titán',
    raza: 'Brahman Blanco',
    sexo: 'Macho',
    estado: 'Toro',
    litrosDia: 0,
    partos: 0,
    diasLactancia: 0,
    potrero: 'Potrero Este (Libre)',
    salud: 'Óptima (Reproductor activo)',
    diasRetiroIca: 0,
    medicamento: null,
    foto: 'assets/ganado/vaca_635.jpg',
    peso: '820 kg',
    condicionCorporal: '4.5 / 5',
    padre: 'Brahman El Caney #500',
    madre: 'Brahman Dama #1493',
    fpp: 'Macho Reproductor'
  }
];

export const INITIAL_POTREROS = [
  { id: 'pot_norte', nombre: 'Potrero Norte (Trébol & Kikuyo)', diasOcupacion: 1, diasDescanso: 35, estado: 'Ocupado', areaHa: 4.5, carga: '8 Bovinos' },
  { id: 'pot_sur', nombre: 'Potrero Sur (Raidgrass Perenne)', diasOcupacion: 0, diasDescanso: 38, estado: 'Descanso', areaHa: 5.2, carga: '0 Bovinos' },
  { id: 'pot_este', nombre: 'Potrero Este (Brachiaria Decumbens)', diasOcupacion: 0, diasDescanso: 42, estado: 'Libre', areaHa: 3.8, carga: '0 Bovinos' },
  { id: 'pot_colina', nombre: 'Potrero La Colina (Pastura Estrella)', diasOcupacion: 0, diasDescanso: 30, estado: 'Descanso', areaHa: 4.0, carga: '0 Bovinos' }
];

export const INITIAL_TRATAMIENTOS = [
  { id: 't1', idBovino: '1106', vaca: 'Paloma (1106)', farmaco: 'Oxitetraciclina LA', fecha: '2026-11-04', dosis: '25 ml', retiroIca: 6, diasRestantes: 3, estado: 'En Retiro Activo' },
  { id: 't2', idBovino: '1201', vaca: 'Princesa (1201)', farmaco: 'Cefalexina Intramamaria', fecha: '2026-11-05', dosis: '1 Jeringa C/12h', retiroIca: 3, diasRestantes: 1, estado: 'En Retiro Activo' },
  { id: 't3', idBovino: '1075', vaca: 'Marquesa (1075)', farmaco: 'Vacuna Antiaftosa', fecha: '2026-10-20', dosis: '2 ml Subcutánea', retiroIca: 0, diasRestantes: 0, estado: 'Completado (Inocuo)' }
];

export const INITIAL_REPRO = [
  { id: 'r1', vaca: 'Gitana (1172)', evento: 'Confirmación Gestación', fecha: '2026-06-15', diasAbiertos: 85, nota: 'Ecografía positiva. Preñada de Toro Titán (Brahman).' },
  { id: 'r2', vaca: 'Canela (1162)', evento: 'Celo Observado (Celo 1)', fecha: '2026-11-05', diasAbiertos: 0, nota: 'Moco cristalino y reflejo de inmovilidad. Programar IA.' },
  { id: 'r3', vaca: 'Campanera (1151)', evento: 'Inseminación Artificial', fecha: '2026-10-12', diasAbiertos: 92, nota: 'Pajilla Holstein Mogul importada. Esperar chequeo.' },
  { id: 'r4', vaca: 'Esmeralda (1074)', evento: 'Parto Normal', fecha: '2026-08-11', diasAbiertos: 60, nota: 'Nació ternera sana (18 kg). Calostrado exitoso.' }
];

export const INITIAL_ENTREGAS_COLANTA = [
  { id: 'col_01', fecha: '2026-11-06', litros: 1420, valorEstCop: '3.19M COP', ufc: '14.000 UFC/ml', estado: 'Aceptado · Grado A Bonificado' },
  { id: 'col_02', fecha: '2026-11-04', litros: 1390, valorEstCop: '3.12M COP', ufc: '16.500 UFC/ml', estado: 'Aceptado · Grado A' },
  { id: 'col_03', fecha: '2026-11-02', litros: 1410, valorEstCop: '3.17M COP', ufc: '15.000 UFC/ml', estado: 'Aceptado · Grado A' }
];

export const INITIAL_CONTABILIDAD = [
  { id: 'c1', fecha: '2026-11-05', tipo: 'Entrada', concepto: 'Pago Quincenal Acopio Leche', tercero: 'Colanta Cooperativa', factura: 'FAC-COL-8921', valorCop: '12.8M COP', categoria: 'Venta Leche', metodo: 'Transferencia Bancolombia', tieneFoto: true },
  { id: 'c2', fecha: '2026-11-03', tipo: 'Salida', concepto: 'Concentrado Lechero 18% (40 Bultos)', tercero: 'Agroinsumos del Norte', factura: 'FAC-AGR-4412', valorCop: '3.9M COP', categoria: 'Nutrición Animal', metodo: 'Factura Crédito 15d', tieneFoto: true },
  { id: 'c3', fecha: '2026-10-28', tipo: 'Salida', concepto: 'Oxitetraciclina + Agujas + Yodo', tercero: 'Farmacia Veterinaria San Pedro', factura: 'FAC-VET-1102', valorCop: '480k COP', categoria: 'Sanidad & Fármacos', metodo: 'Efectivo', tieneFoto: true },
  { id: 'c4', fecha: '2026-10-25', tipo: 'Salida', concepto: 'Mantenimiento Cerca Eléctrica PRV', tercero: 'Servicios Rurales Don José', factura: 'REC-CER-009', valorCop: '350k COP', categoria: 'Infraestructura', metodo: 'Efectivo', tieneFoto: false }
];

export const INITIAL_USUARIOS = [
  { id: 'u1', nombre: 'Jeiser Abraham Gutiérrez Torres', email: 'jeiser@proganado.co', rol: 'Administrador (Tech Lead)', ultimoAcceso: 'Hoy 10:20 AM', auth2FA: 'Activo' },
  { id: 'u2', nombre: 'Emilio Villanueva', email: 'emilio@proganado.co', rol: 'Administrador (UI/UX)', ultimoAcceso: 'Hoy 09:45 AM', auth2FA: 'Activo' },
  { id: 'u3', nombre: 'Sebastián Correa', email: 'scorrea@proganado.co', rol: 'Usuario Operativo (Backend)', ultimoAcceso: 'Ayer 06:15 PM', auth2FA: 'Activo' },
  { id: 'u4', nombre: 'Humberto Pinto', email: 'humberto@proganado.co', rol: 'Usuario Operativo (Zootecnia)', ultimoAcceso: 'Ayer 04:30 PM', auth2FA: 'Activo' }
];
