#!/usr/bin/env node
/**
 * GENERADOR DEL DIAGRAMA RELACIONAL DEL README — ProGanado S.A.S.
 * =============================================================================
 * POR QUE EXISTE:
 * El `erDiagram` de Mermaid del README era una copia hecha a mano del modelo.
 * Copiar a mano fue justo lo que dejo el diagrama describiendo un `bovinos` con
 * `alerta_cinta_roja` y `estado_lactancia` cuando la tabla real ya tenia
 * `sexo`, `estado_fisiologico` y `estado_vital` (v3). Este script dibuja el
 * diagrama LEYENDO la estructura real de SQLite, asi que el diagrama no puede
 * volver a mentir: si la base cambia, se regenera.
 *
 * Conserva a mano la seccion de RELACIONES (los verbos en espanol aportan
 * legibilidad y no dependen de nombres de columnas), y regenera las tablas.
 *
 * USO: node tools/gen_readme_diagrama.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DDL = '01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql';
const README = 'README.md';

const TIPOS = {
  TEXT: 'string', VARCHAR: 'string', INTEGER: 'int', INT: 'int', DECIMAL: 'decimal',
  NUMERIC: 'decimal', REAL: 'real', DATE: 'date', TIME: 'time', DATETIME: 'datetime',
  BOOLEAN: 'boolean'
};

const db = new DatabaseSync(':memory:');
for (const stmt of fs.readFileSync(path.join(ROOT, DDL), 'utf8').replace(/--[^\n]*/g, '').split(';')) {
  if (stmt.trim()) db.exec(stmt);
}
const q = (sql, ...p) => db.prepare(sql).all(...p);

/** Vocabulario de un CHECK(col IN (...)) declarado en la tabla. */
function enumsDe(sqlTabla) {
  const out = {};
  for (const m of sqlTabla.matchAll(/CHECK\s*\(\s*(\w+)\s+IN\s*\(([^)]*)\)\s*\)/gi)) {
    out[m[1]] = [...m[2].matchAll(/'([^']*)'/g)].map((v) => v[1]);
  }
  return out;
}

const tablas = q("select name, sql from sqlite_master where type='table' and name not like 'sqlite_%' order by rootpage");
const bloques = tablas.map(({ name, sql }) => {
  const cols = q('select name, type, pk, hidden from pragma_table_xinfo(?)', name);
  const fks = new Set(q('select "from" as c from pragma_foreign_key_list(?)', name).map((r) => r.c));
  const unicos = new Set([...sql.matchAll(/(\w+)\s+TEXT[^,]*UNIQUE/gi)].map((m) => m[1]));
  const enums = enumsDe(sql);
  const lineas = cols.map((c) => {
    const marcas = [];
    if (c.pk) marcas.push('PK');
    if (fks.has(c.name)) marcas.push('FK');
    if (unicos.has(c.name)) marcas.push('UK');
    const nota = enums[c.name] ? ` "${enums[c.name].join(', ')}"` : '';
    return `        ${TIPOS[(c.type || '').toUpperCase()] || 'string'} ${c.name}${marcas.length ? ' ' + marcas.join(' ') : ''}${nota}`;
  });
  return `    ${name.toUpperCase()} {\n${lineas.join('\n')}\n    }`;
});

const readme = fs.readFileSync(path.join(ROOT, README), 'utf8').replace(/\r\n/g, '\n');
const bloque = /```mermaid\n([\s\S]*?)```/.exec(readme);
if (!bloque) throw new Error('README.md no tiene bloque ```mermaid que regenerar');

// Se conservan las lineas de RELACION (las que no pertenecen a un bloque de tabla).
const conservar = [];
let dentro = false;
for (const linea of bloque[1].split('\n')) {
  if (/^\s{4}\w+\s*\{\s*$/.test(linea)) { dentro = true; continue; }
  if (dentro) { if (/^\s{4}\}\s*$/.test(linea)) dentro = false; continue; }
  if (linea.trim()) conservar.push(linea);
}

const nuevo = [...conservar, '', ...bloques].join('\n');
fs.writeFileSync(path.join(ROOT, README), readme.replace(bloque[0], '```mermaid\n' + nuevo + '\n```'));
console.log(`README.md: diagrama regenerado desde el DDL oficial (${tablas.length} tablas, ${conservar.length} relaciones conservadas)`);
