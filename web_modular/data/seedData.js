// src/data/seedData.js - Generador y datos semilla oficiales de ProGanado M2
import { calcularFinRetiro, calcularRetiroPendiente } from './reglasRetiro.js';

export const DB_KEY = 'proGanadoDB_v4';
export const hoy = () => new Date().toISOString().slice(0, 10);
export const diasAtras = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };

export const fechaValida = f => {
  const d = new Date(String(f || '') + 'T12:00:00');
  return isNaN(d.getTime()) ? null : d;
};

export const fmtFecha = f => {
  const d = fechaValida(f);
  return d ? d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : '—';
};

export const fmtFechaAnio = f => {
  const d = fechaValida(f);
  return d ? d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
};

export const mesCorto = f => {
  const d = fechaValida(f);
  return d ? d.toLocaleDateString('es-CO', { month: 'short' }).replace('.', '').slice(0, 3).toUpperCase() : '—';
};

export const uid = p => p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const TODOS_ARETES = '452,458,627,629,635,972,1047,1069,1074,1075,1078,1095,1106,1151,1153,1162,1164,1172,1201,1225,1226,1227,1233,1234,1236,1237,1239,1249,1253,1261,1293,1297,1311,1317,1320,1322,1324,1327,1330,1331,1332,1342,1343,1348,1349,1353,1355,1363,1366,1369,1377,1379,1381,1386,1387,1388,1389,1391,1393,1399,1400,1403,1408,1410,1413,1418,1420,1421,1422,1428,1430,1431,1436,1441,1466,1467,1469,1478,1479,1483,1485,1488,1492,1493,1496,1497,1507,1511,1513,1516,1519,1520,1522,1527,1534,1537,1559,1563,1566,1575,1580,1587,1589,1592,1593,1598,1599,1601,1603,1604,1606,1609,1610,1611,1612,1844'.split(',');

/* Completa el hato con TODAS las vacas fotografiadas (arete real + foto).
   Los datos de cada animal se completan después desde la ficha. */
function completarHato(lista) {
  const yaEstan = new Set(lista.map(b => b.tag));
  const razasIds = ['raza_holstein', 'raza_brahman', 'raza_gyr', 'raza_simmental'];
  const potrerosIds = ['pot_norte', 'pot_sur', 'pot_este'];
  for (const tag of TODOS_ARETES) {
    if (yaEstan.has(tag)) continue;
    const n = Number(tag) || 0;
    const esMacho = n % 9 === 0;
    const year = 2018 + (n % 7);
    const month = String((n % 12) + 1).padStart(2, '0');
    const day = String((n % 27) + 1).padStart(2, '0');
    const edad = 2026 - year;
    let estado;
    if (esMacho) estado = edad <= 2 ? 'Ternero' : 'Toro';
    else if (edad <= 2) estado = 'Ternera';
    else if (edad === 3) estado = 'Novilla Vientre';
    else estado = (n % 5 === 0) ? 'Horra Seca' : 'En Ordeño';
    lista.push({
      id_bovino: 'bov_' + tag, name: '', tag: tag, id_raza: razasIds[n % razasIds.length],
      sexo: esMacho ? 'Macho' : 'Hembra', estado: estado, id_potrero: potrerosIds[n % potrerosIds.length],
      birth: year + '-' + month + '-' + day, marca: 'LP', foto: 'assets/ganado/vaca_' + tag + '.jpg',
      chip: '', color: '', hierro: '', lote: 'Lote ' + ((n % 3) + 1), situacion: 'Activo',
      procedencia: 'Finca La Pradera', padre: '', madre: '',
      ultimo_parto: '', ultimo_celo: '', fecha_prenez: '', parto_esperado: '',
      reproductor: '', tipo_servicio: '', servicios: 0, partos: 0, abortos: 0,
      peso_kg: '', peso_fecha: '', condicion_corporal: '', notas_salud: '', observaciones: ''
    });
  }
  return lista;
}


function seed() {
  const razaBrahman = 'raza_brahman', razaHolstein = 'raza_holstein', razaGyr = 'raza_gyr', razaSim = 'raza_simmental';
  const potNorte = 'pot_norte', potSur = 'pot_sur', potEste = 'pot_este';
  const medAftosa = 'med_aftosa', medOxi = 'med_oxi', medDesp = 'med_desp';
  return {
    razas: [
      { id_raza: razaHolstein, nombre_raza: 'Holstein', descripcion_proposito: 'Lechera especializada' },
      { id_raza: razaBrahman, nombre_raza: 'Brahman', descripcion_proposito: 'Doble propósito' },
      { id_raza: razaGyr, nombre_raza: 'Gyr', descripcion_proposito: 'Lechera tropical' },
      { id_raza: razaSim, nombre_raza: 'Simmental', descripcion_proposito: 'Doble propósito' }
    ],
    potreros: [
      { id_potrero: potNorte, nombre_potrero: 'Potrero Norte', dias_ocupacion: 1, dias_descanso_prv: 35, estado: 'Ocupado', desde: hoy() },
      { id_potrero: potSur, nombre_potrero: 'Potrero Sur', dias_ocupacion: 1, dias_descanso_prv: 35, estado: 'Descanso', desde: hoy() },
      { id_potrero: potEste, nombre_potrero: 'Potrero Este', dias_ocupacion: 2, dias_descanso_prv: 30, estado: 'Libre', desde: null }
    ],
    bovinos: (() => {
      const animal = (tag, name, raza, sexo, estado, potrero, birth, extra) => Object.assign({
        id_bovino: 'bov_' + tag, name: name, tag: tag, id_raza: raza, sexo: sexo, estado: estado,
        id_potrero: potrero, birth: birth, marca: 'LP',
        foto: 'assets/ganado/vaca_' + tag + '.jpg',
        chip: '', color: '', hierro: '', lote: 'Lote 1', situacion: 'Activo',
        procedencia: 'Finca La Pradera', padre: '', madre: '',
        ultimo_parto: '', ultimo_celo: '', fecha_prenez: '', parto_esperado: '',
        reproductor: '', tipo_servicio: '', servicios: 0, partos: 0, abortos: 0,
        peso_kg: '', peso_fecha: '', condicion_corporal: '', notas_salud: '', observaciones: ''
      }, extra || {});
      const l = [
        animal('1074', 'Esmeralda', razaHolstein, 'Hembra', 'En Ordeño', potNorte, '2021-03-15', { padre: 'Jersey Sovereign USA', madre: 'Esmeralda Madre #452', partos: 2, ultimo_parto: '2025-08-10', peso_kg: 460, condicion_corporal: 3.75, lote: 'Lote Ordeño A' }),
        animal('1075', 'Marquesa', razaHolstein, 'Hembra', 'En Ordeño', potNorte, '2020-11-02', { partos: 3, ultimo_parto: '2025-05-20', peso_kg: 485, condicion_corporal: 3.5, lote: 'Lote Ordeño A' }),
        animal('1078', 'Paloma', razaGyr, 'Hembra', 'En Ordeño', potNorte, '2022-01-20', { partos: 1, ultimo_parto: '2025-09-15', peso_kg: 420, condicion_corporal: 3.25, lote: 'Lote Ordeño A' }),
        animal('1095', 'Campanera', razaHolstein, 'Hembra', 'En Ordeño', potNorte, '2019-07-08', { partos: 4, ultimo_parto: '2025-04-02', peso_kg: 510, condicion_corporal: 4.0, lote: 'Lote Ordeño A' }),
        animal('1106', 'Gitana', razaBrahman, 'Hembra', 'Horra Seca', potSur, '2020-02-14', { partos: 3, ultimo_parto: '2024-12-01', peso_kg: 470, condicion_corporal: 3.5, lote: 'Lote Secas' }),
        animal('1151', 'Princesa', razaHolstein, 'Hembra', 'En Ordeño', potNorte, '2021-06-30', { partos: 2, ultimo_parto: '2025-07-07', peso_kg: 450, condicion_corporal: 3.5, lote: 'Lote Ordeño A' }),
        animal('1153', 'Canela', razaSim, 'Hembra', 'Novilla Vientre', potSur, '2023-04-18', { peso_kg: 390, condicion_corporal: 3.25, lote: 'Lote Novillas' }),
        animal('1162', 'Titán', razaBrahman, 'Macho', 'Toro', potEste, '2019-01-12', { peso_kg: 780, condicion_corporal: 4.25, lote: 'Lote Reproductores' }),
        animal('1164', 'Lucero', razaHolstein, 'Hembra', 'En Ordeño', potNorte, '2020-09-09', { partos: 3, ultimo_parto: '2025-06-11', peso_kg: 475, condicion_corporal: 3.75, lote: 'Lote Ordeño A' }),
        animal('1172', 'Estrella', razaGyr, 'Hembra', 'En Ordeño', potSur, '2022-08-25', { partos: 1, ultimo_parto: '2025-10-01', peso_kg: 430, condicion_corporal: 3.5, lote: 'Lote Ordeño B' }),
        animal('635', 'Dulce', razaHolstein, 'Hembra', 'Horra Seca', potSur, '2018-12-05', { partos: 5, ultimo_parto: '2024-10-20', peso_kg: 520, condicion_corporal: 3.75, lote: 'Lote Secas' }),
        animal('1201', 'Mora', razaGyr, 'Hembra', 'En Ordeño', potNorte, '2021-10-14', { partos: 2, ultimo_parto: '2025-08-30', peso_kg: 440, condicion_corporal: 3.5, lote: 'Lote Ordeño B' }),
        animal('1261', 'Nube', razaHolstein, 'Hembra', 'Ternera', potEste, '2024-09-01', { peso_kg: 180, condicion_corporal: 3.0, lote: 'Lote Crías' }),
        animal('1293', 'Coral', razaSim, 'Hembra', 'En Ordeño', potSur, '2022-05-19', { partos: 1, ultimo_parto: '2025-09-05', peso_kg: 455, condicion_corporal: 3.5, lote: 'Lote Ordeño B' }),
        animal('1311', 'Perla', razaGyr, 'Hembra', 'Novilla Vientre', potEste, '2023-02-22', { peso_kg: 370, condicion_corporal: 3.25, lote: 'Lote Novillas' }),
        animal('1320', 'Trueno', razaBrahman, 'Macho', 'Toro', potEste, '2020-03-03', { peso_kg: 760, condicion_corporal: 4.0, lote: 'Lote Reproductores' })
      ];
      return completarHato(l);
    })(),
    medicamentos: [
      { id_medicamento: medAftosa, nombre_farmaco: 'Vacuna Aftosa', dias_retiro_ica: 0 },
      { id_medicamento: medOxi, nombre_farmaco: 'Oxitetraciclina LA', dias_retiro_ica: 6 },
      { id_medicamento: medDesp, nombre_farmaco: 'Ivermectina 1%', dias_retiro_ica: 8 }
    ],
    tratamientos: [
      { id_tratamiento: uid('trat'), id_bovino: 'bov_1078', id_medicamento: medOxi, tipo_procedimiento: 'Tratamiento mastitis', fecha_tratamiento: diasAtras(2), dosis_ml: 20, nota: 'Cuarto posterior derecho' },
      { id_tratamiento: uid('trat'), id_bovino: 'bov_1151', id_medicamento: medDesp, tipo_procedimiento: 'Desparasitación', fecha_tratamiento: diasAtras(5), dosis_ml: 10, nota: 'Control de parásitos' },
      { id_tratamiento: uid('trat'), id_bovino: 'bov_1095', id_medicamento: medOxi, tipo_procedimiento: 'Tratamiento general', fecha_tratamiento: diasAtras(20), dosis_ml: 20, nota: 'Retiro cumplido' },
      { id_tratamiento: uid('trat'), id_bovino: 'bov_1074', id_medicamento: medAftosa, tipo_procedimiento: 'Vacunación', fecha_tratamiento: diasAtras(1), dosis_ml: 2, nota: 'Ciclo anual aftosa' }
    ],
    eventos: [
      { id_evento: uid('ev'), id_bovino: 'bov_1074', tipo_evento: 'Inseminación', fecha_evento: diasAtras(60), dias_abiertos_calc: 60, nota: 'Pajilla Holstein USA' },
      { id_evento: uid('ev'), id_bovino: 'bov_1095', tipo_evento: 'Inseminación', fecha_evento: diasAtras(30), dias_abiertos_calc: 30, nota: 'Pajilla Gyr' },
      { id_evento: uid('ev'), id_bovino: 'bov_1078', tipo_evento: 'Celo Observable', fecha_evento: diasAtras(5), dias_abiertos_calc: null, nota: 'Ciclo de 21 días' },
      { id_evento: uid('ev'), id_bovino: 'bov_1153', tipo_evento: 'Parto', fecha_evento: diasAtras(200), dias_abiertos_calc: null, nota: 'Parto normal' },
      { id_evento: uid('ev'), id_bovino: 'bov_1164', tipo_evento: 'Monta Natural', fecha_evento: diasAtras(90), dias_abiertos_calc: 90, nota: 'Toro Titán' },
      { id_evento: uid('ev'), id_bovino: 'bov_1201', tipo_evento: 'Diagnóstico de Gestación', fecha_evento: diasAtras(25), dias_abiertos_calc: null, nota: 'Ecografía positiva' }
    ],
    pesajes: (() => {
      const out = [];
      const vacas = ['bov_1074', 'bov_1075', 'bov_1095', 'bov_1164'];
      const litros = [[12.5, 11.8], [11.8, 11.2], [14.0, 13.4], [13.2, 12.6]];
      for (let d = 0; d < 7; d++) {
        const fecha = diasAtras(d);
        for (let i = 0; i < vacas.length; i++) {
          out.push({ id_pesaje: uid('pes'), id_bovino: vacas[i], fecha_pesaje: fecha, hora_pesaje: '05:30', litros_obtenidos: litros[i][0] });
          out.push({ id_pesaje: uid('pes'), id_bovino: vacas[i], fecha_pesaje: fecha, hora_pesaje: '14:30', litros_obtenidos: litros[i][1] });
        }
      }
      return out;
    })(),
    entregas: [
      { id_entrega: uid('ent'), fecha_entrega: diasAtras(1), litros_totales: 420, valor_bruto_est: 1050000, recuento_ufc: 14000 },
      { id_entrega: uid('ent'), fecha_entrega: diasAtras(4), litros_totales: 405, valor_bruto_est: 1010000, recuento_ufc: 18000 },
      { id_entrega: uid('ent'), fecha_entrega: diasAtras(7), litros_totales: 398, valor_bruto_est: 995000, recuento_ufc: 12000 }
    ],
    movimientos: [
      { id_mov: uid('mov'), id_potrero: potNorte, accion: 'Entrada', fecha: hoy(), cantidad: 8 },
      { id_mov: uid('mov'), id_potrero: potSur, accion: 'Salida', fecha: diasAtras(2), cantidad: 6 },
      { id_mov: uid('mov'), id_potrero: potEste, accion: 'Salida', fecha: diasAtras(5), cantidad: 5 }
    ],
    contabilidad: [
      { id: uid('cnt'), tipo: 'Entrada', fecha: diasAtras(1), concepto: 'Liquidación leche Colanta', tercero: 'Colanta', numero: 'COL-2026-1106', categoria: 'Venta de leche', metodo: 'Transferencia', valor: 1050000, notas: 'Acopio semanal', fotoId: null, creado: hoy() },
      { id: uid('cnt'), tipo: 'Entrada', fecha: diasAtras(10), concepto: 'Venta de ternero', tercero: 'Ganadería El Roble', numero: 'FV-2026-091', categoria: 'Venta de ganado', metodo: 'Efectivo', valor: 1800000, notas: 'Ternero macho', fotoId: null, creado: hoy() },
      { id: uid('cnt'), tipo: 'Salida', fecha: diasAtras(3), concepto: 'Concentrado lechero', tercero: 'Nutrición Animal S.A.S.', numero: 'FAC-8821', categoria: 'Alimentación', metodo: 'Transferencia', valor: 620000, notas: 'Bultos de concentrado', fotoId: null, creado: hoy() },
      { id: uid('cnt'), tipo: 'Salida', fecha: diasAtras(5), concepto: 'Sales mineralizadas', tercero: 'Agroinsumos La Pradera', numero: 'FAC-7742', categoria: 'Alimentación', metodo: 'Transferencia', valor: 180000, notas: 'Sacos de 25 kg', fotoId: null, creado: hoy() },
      { id: uid('cnt'), tipo: 'Salida', fecha: diasAtras(6), concepto: 'Medicamentos veterinarios', tercero: 'Veterinaria San Rafael', numero: 'FAC-3310', categoria: 'Medicamentos y sanidad', metodo: 'Nequi / Daviplata', valor: 95000, notas: 'Oxitetraciclina y jeringas', fotoId: null, creado: hoy() },
      { id: uid('cnt'), tipo: 'Salida', fecha: diasAtras(12), concepto: 'Mantenimiento de cercas', tercero: 'Jornalero temporal', numero: 'REC-004', categoria: 'Insumos y potreros', metodo: 'Efectivo', valor: 120000, notas: 'Reparación de alambre', fotoId: null, creado: hoy() }
    ]
  };
}

export { TODOS_ARETES, completarHato, seed };

export function getInitialDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.bovinos) && parsed.bovinos.length >= 10) {
        return parsed;
      }
    }
  } catch (e) { console.error('Error loading DB from localStorage', e); }
  const data = seed();
  try { localStorage.setItem(DB_KEY, JSON.stringify(data)); } catch(e){}
  return data;
}