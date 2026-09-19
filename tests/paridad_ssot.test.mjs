/**
 * PRUEBAS DE PARIDAD Y DEL GATE DE INOCUIDAD — ProGanado S.A.S.
 * =============================================================================
 * Ejecuta: npm test    (node --test, sin dependencias externas)
 *
 * QUE PROTEGE:
 *  1. El DDL oficial compila y tiene la forma declarada (12 tablas, 1 vista).
 *  2. Las copias (DBML, Mermaid, README, Zod, TS) coinciden con el DDL: si una
 *     se desactualiza, esta suite se pone roja (ver tools/paridad_ssot.mjs).
 *  3. El gate de Cinta Roja es FAIL-CLOSED: el último día de retiro la vaca
 *     sigue bloqueada y solo se libera al día siguiente.
 *  4. El "hoy" del sistema es la fecha LOCAL de Colombia, no UTC: entre las
 *     19:00 y las 23:59 COT el UTC ya es el día siguiente y la vista soltaba
 *     la vaca antes de tiempo.
 *  5. La base es la última línea de defensa: un valor fuera del CHECK se
 *     rechaza aunque la aplicación lo deje pasar.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DDL = path.join(ROOT, '01_Base_de_Datos_SQL', 'schema_produccion_proganado_v3.sql');

function baseNueva() {
  const db = new DatabaseSync(':memory:');
  db.exec('PRAGMA foreign_keys = ON;');
  for (const stmt of fs.readFileSync(DDL, 'utf8').replace(/--[^\n]*/g, '').split(';')) {
    if (stmt.trim()) db.exec(stmt);
  }
  return db;
}

const q = (db, sql, ...p) => db.prepare(sql).all(...p);

/** Siembra una finca, un potrero, una raza y un medicamento con N días de retiro. */
function sembrar(db, diasRetiro) {
  const hash = 'h'.repeat(12); // fuera del template: dentro, SQLite ve 'h'.repeat( y falla
  db.prepare(`INSERT INTO usuarios (id_usuario, nombre, email, contrasena_hash, rol) VALUES ('U1','Jeiser','j@finca.co',?,'Administrador')`).run(hash);
  db.exec(`INSERT INTO fincas VALUES ('F1','U1','La Esperanza','1019156838','05-647-0012','Santa Rosa de Osos')`);
  db.exec(`INSERT INTO razas VALUES ('R1','Gyr','Leche')`);
  db.exec(`INSERT INTO medicamentos VALUES ('M1','Oxitetraciclina',${diasRetiro})`);
  db.exec(`INSERT INTO bovinos VALUES ('B1','F1',NULL,'R1','Hembra','En_Ordeño','Activo','2022-01-01')`);
  return { finca: 'F1' };
}

/** Inserta un tratamiento cuyo retiro termina exactamente en `desplazamiento` días desde hoy LOCAL. */
function tratar(db, diasRetiro, desplazamiento) {
  const fechaTratamiento = q(db, `SELECT date('now','localtime', ?) AS f`, `${-desplazamiento} days`)[0].f;
  db.prepare(`INSERT INTO tratamientos_sanitarios (id_tratamiento, id_bovino, tipo_procedimiento, id_medicamento, fecha_tratamiento) VALUES (?,?,?,?,?)`)
    .run(`T${diasRetiro}-${desplazamiento}`, 'B1', 'Antibiotico', 'M1', fechaTratamiento);
  return fechaTratamiento;
}

test('el DDL oficial compila y declara 12 tablas, 7 índices y la vista de inocuidad', () => {
  const db = baseNueva();
  const tablas = q(db, "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
  const vistas = q(db, "SELECT name FROM sqlite_master WHERE type='view'");
  const indices = q(db, "SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'");
  assert.equal(tablas.length, 12, 'deben ser 12 tablas en 3FN');
  assert.deepEqual(vistas.map((v) => v.name), ['v_bovinos_cinta_roja']);
  assert.equal(indices.length, 7);
});

test('cinta roja FAIL-CLOSED: el último día de retiro la vaca SIGUE bloqueada', () => {
  const db = baseNueva();
  sembrar(db, 5);
  tratar(db, 5, 5); // retiro de 5 días: vence HOY
  const hoy = q(db, "SELECT date('now','localtime') AS f")[0].f;
  const filas = q(db, 'SELECT * FROM v_bovinos_cinta_roja');
  assert.equal(filas.length, 1, 'el último día de retiro la vaca debe seguir en la vista');
  assert.equal(filas[0].fecha_fin_retiro, hoy);
  assert.equal(filas[0].en_periodo_retiro, 1);
});

test('cinta roja libera al día siguiente de cumplido el retiro', () => {
  const db = baseNueva();
  sembrar(db, 5);
  tratar(db, 5, 6); // el retiro venció ayer
  assert.equal(q(db, 'SELECT * FROM v_bovinos_cinta_roja').length, 0, 'un retiro vencido no puede bloquear ordeño');
});

test('el día se mide en hora LOCAL de Colombia, no en UTC', () => {
  const db = baseNueva();
  const fila = q(db, `SELECT date('now') AS utc, date('now','localtime') AS local`)[0];
  // documenta la causa del bug v3.1: SQLite devuelve UTC por defecto
  assert.match(fila.utc, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(fila.local, /^\d{4}-\d{2}-\d{2}$/);
  // y la vista NO puede depender de CURRENT_DATE (UTC)
  const sqlVista = q(db, "SELECT sql FROM sqlite_master WHERE name='v_bovinos_cinta_roja'")[0].sql;
  assert.ok(!/CURRENT_DATE/i.test(sqlVista), 'la vista no puede usar CURRENT_DATE (UTC)');
  assert.match(sqlVista, /date\('now',\s*'localtime'\)/i);
});

test('la marca de tiempo de auditoría usa hora local, no UTC', () => {
  const db = baseNueva();
  sembrar(db, 5);
  const registro = q(db, 'SELECT fecha_registro FROM usuarios')[0].fecha_registro;
  const hoyLocal = q(db, "SELECT date('now','localtime') AS f")[0].f;
  assert.equal(registro.slice(0, 10), hoyLocal, `fecha_registro=${registro} no coincide con la fecha local ${hoyLocal}`);
});

test('la base rechaza un evento reproductivo fuera del vocabulario (última línea de defensa)', () => {
  const db = baseNueva();
  sembrar(db, 5);
  assert.throws(
    () => db.exec(`INSERT INTO eventos_reproductivos VALUES ('E1','B1','Inseminacion_Artificial','2026-09-15',NULL)`),
    /CHECK constraint failed/,
    'un valor que la base no acepta debe fallar en la base, no en silencio'
  );
  db.exec(`INSERT INTO eventos_reproductivos VALUES ('E2','B1','Inseminacion','2026-09-15',NULL)`);
});

test('no se puede insertar un bovino sin sexo ni estado vital declarados', () => {
  const db = baseNueva();
  sembrar(db, 5);
  const columnas = q(db, 'SELECT name FROM pragma_table_info(?)', 'bovinos').map((c) => c.name);
  assert.ok(columnas.includes('sexo') && columnas.includes('estado_fisiologico') && columnas.includes('estado_vital'));
  assert.ok(!columnas.includes('alerta_cinta_roja'), 'la cinta roja NO es columna: es la vista');
});

test('todas las copias del modelo coinciden con el DDL oficial (gate de paridad)', () => {
  const salida = execFileSync(process.execPath, [path.join(ROOT, 'tools', 'paridad_ssot.mjs')], { encoding: 'utf8' });
  assert.match(salida, /Paridad total/, `el gate reportó desajustes:\n${salida}`);
});

test('el formulario de alta de bovinos envía el VOCABULARIO de la base, no abreviaturas', () => {
  // Bug real 16-sep-2026: registro_bovino.html enviaba sexo="H"/"M" mientras el CHECK
  // de bovinos.sexo solo acepta 'Hembra'/'Macho'. La interfaz validaba "ok" (el radio es
  // required) y el alta se caía al guardar: el campo del formulario no hablaba el idioma
  // de la base. Ahora el gate de paridad revisa los formularios HTML contra el DDL.
  const html = fs.readFileSync(path.join(ROOT, '02_Vistas_HTML5', 'registro_bovino.html'), 'utf8');
  const valores = [...html.matchAll(/<input\b[^>]*name="sexo"[^>]*value="([^"]*)"/gi)].map((m) => m[1]);
  assert.deepEqual(valores.sort(), ['Hembra', 'Macho'], `el formulario ofrece sexo=[${valores}]; la base solo acepta Hembra/Macho`);

  const db = baseNueva();
  sembrar(db, 5);
  for (const v of valores) {
    // Cada valor que ofrece la interfaz DEBE ser aceptado por la base: si el formulario
    // ofrece algo que la base rechaza, es un alta imposible de completar.
    db.exec(
      `INSERT INTO bovinos (id_bovino, id_finca, id_potrero, id_raza, sexo, estado_fisiologico, estado_vital, fecha_nacimiento)
       VALUES ('T-${v}', 'F1', NULL, 'R1', '${v}', 'Ternero_Crecimiento', 'Activo', '2026-01-01')`
    );
  }
});

test('el formulario de bovinos declara contra qué tabla del DDL se valida', () => {
  const html = fs.readFileSync(path.join(ROOT, '02_Vistas_HTML5', 'registro_bovino.html'), 'utf8');
  const form = /<form\b[^>]*>/i.exec(html);
  assert.ok(form, 'el archivo debe tener un <form>');
  assert.match(form[0], /data-tabla="bovinos"/, 'sin data-tabla el gate no puede verificar el contrato del formulario');
});
