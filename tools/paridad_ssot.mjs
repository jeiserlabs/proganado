#!/usr/bin/env node
/**
 * GATE DE PARIDAD SSOT — ProGanado S.A.S.
 * =============================================================================
 * POR QUE EXISTE:
 * El repositorio declara UN solo origen de verdad para la base de datos
 * (`01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql`, ver AGENTS.md §1).
 * Pero el mismo modelo se copia a mano en 5 lugares mas: DBML, Mermaid, los
 * contratos TypeScript, los esquemas Zod y el bloque SQL embebido del README.
 * Copiar a mano es la forma mas barata de mentir sin querer: se corrige la
 * tabla real y queda una copia vieja afirmando otra cosa.
 *
 * QUE VERIFICA (por maquina, sin leer a ojo):
 *  1. El DDL real COMPILA en SQLite (si el .sql tiene sintaxis rota, falla aqui).
 *  2. El bloque SQL embebido en el README produce EXACTAMENTE las mismas tablas,
 *     columnas, indices y vistas que el DDL oficial. (Aqui vivia el drift real:
 *     el README describia un `bovinos` con `alerta_cinta_roja` + `estado_lactancia`
 *     que la tabla oficial no tiene desde la v3.)
 *  3. El DBML y el Mermaid declaran las mismas columnas que la tabla real.
 *  4. Cada campo de los contratos TS y de los esquemas Zod es una columna real.
 *  5. Los enums (CHECK del DDL vs z.enum de Zod vs union literal de TS) tienen
 *     EXACTAMENTE el mismo vocabulario. Un enum mas permisivo que el CHECK
 *     significa que Zod aprueba datos que la base rechaza con "CHECK failed".
 *
 * QUE **NO** VERIFICA: reglas de negocio, normalizacion 3FN ni interpretacion
 * zootecnica. Verifica forma, no verdad de dominio.
 *
 * USO: node tools/paridad_ssot.mjs [--verbose]
 * Deuda conocida y aceptada: `tools/paridad_excepciones.json` (con motivo + fecha).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERBOSE = process.argv.includes('--verbose');

const RUTAS = {
  ddl: '01_Base_de_Datos_SQL/schema_produccion_proganado_v3.sql',
  dbml: '01_Base_de_Datos_SQL/proganado_mr.dbml',
  mmd: '01_Base_de_Datos_SQL/proganado_mer.mmd',
  ts: 'src/types/domain.types.ts',
  zod: 'src/schemas/validation.schemas.ts',
  readme: 'README.md',
  excepciones: 'tools/paridad_excepciones.json'
};

const lee = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

/** Mapeo explicito nombre-de-contrato -> tabla real. Sin convenciones magicas. */
const MAPA = {
  usuarios: { ts: 'Usuario', zod: 'UsuarioSchema' },
  fincas: { ts: 'Finca', zod: 'FincaSchema' },
  suscripciones_saas: { ts: 'SuscripcionSaas', zod: 'SuscripcionSaasSchema' },
  entregas_acopio: { ts: 'EntregaAcopio', zod: 'EntregaAcopioSchema' },
  potreros: { ts: 'Potrero', zod: 'PotreroSchema' },
  razas: { ts: 'Raza', zod: 'RazaSchema' },
  bovinos: { ts: 'Bovino', zod: 'BovinoSchema' },
  marcaciones: { ts: 'Marcacion', zod: 'MarcacionSchema' },
  medicamentos: { ts: 'Medicamento', zod: 'MedicamentoSchema' },
  tratamientos_sanitarios: { ts: 'TratamientoSanitario', zod: 'TratamientoSanitarioSchema' },
  pesajes_leche: { ts: 'PesajeLeche', zod: 'PesajeLecheSchema' },
  eventos_reproductivos: { ts: 'EventoReproductivo', zod: 'EventoReproductivoSchema' }
};

const hallazgos = [];
const push = (nivel, codigo, detalle) => hallazgos.push({ nivel, codigo, detalle });

const excepciones = fs.existsSync(path.join(ROOT, RUTAS.excepciones))
  ? JSON.parse(lee(RUTAS.excepciones)).excepciones || []
  : [];
/**
 * Una excepcion solo calla el gate si declara motivo y fecha de revision.
 * Se marca como USADA: una excepcion que ya no tapa nada es deuda podrida y
 * el gate la denuncia (ver seccion 6).
 */
const usadas = new Set();
const excusado = (codigo, ident) => {
  const hit = excepciones.findIndex((e) => e.codigo === codigo && (!e.ident || e.ident === ident));
  if (hit < 0) return false;
  const e = excepciones[hit];
  if (!e.motivo || e.motivo.length < 20 || !e.fecha) {
    push('ERROR', 'EXCEPCION_SIN_SUSTENTO', `excepcion ${codigo}/${e.ident || '*'} sin motivo (>=20 char) o sin fecha: no se admite`);
    return false;
  }
  usadas.add(hit);
  return true;
};

/** Quita comentarios SQL para no confundir CHECKs comentados con CHECKs vivos. */
const sinComentarios = (sql) => sql.replace(/--[^\n]*/g, '');

// ---------------------------------------------------------------------------
// 1. CARGA DEL DDL REAL (SSOT) + de cualquier DDL embebido en markdown
// ---------------------------------------------------------------------------

/** Ejecuta un DDL completo y devuelve el mapa real de estructura. */
function estructuraDesdeDDL(ddl, etiqueta) {
  const db = new DatabaseSync(':memory:');
  try {
    for (const stmt of sinComentarios(ddl).split(';')) {
      if (stmt.trim()) db.exec(stmt);
    }
  } catch (err) {
    push('ERROR', 'DDL_NO_COMPILA', `${etiqueta}: ${err.message}`);
    return null;
  }
  const q = (sql, ...p) => db.prepare(sql).all(...p);
  const tablas = {};
  for (const t of q("select name from sqlite_master where type='table' and name not like 'sqlite_%'")) {
    // table_xinfo (no table_info) incluye las columnas GENERADAS, que si existen en el
    // DDL aunque no se puedan insertar: omitirlas aqui genera falsos "campo fantasma".
    const columnas = q(`select name, type, "notnull" as es_notnull, dflt_value, pk, hidden from pragma_table_xinfo(?)`, t.name);
    const enums = {};
    const sqlTabla = q("select sql from sqlite_master where type='table' and name=?", t.name)[0].sql;
    for (const m of sqlTabla.matchAll(/CHECK\s*\(\s*(\w+)\s+IN\s*\(([^)]*)\)\s*\)/gi)) {
      enums[m[1]] = [...m[2].matchAll(/'([^']*)'/g)].map((v) => v[1]);
    }
    tablas[t.name] = {
      columnas: Object.fromEntries(columnas.map((c) => [c.name, { ...c, generada: c.hidden >= 2 }])),
      enums
    };
  }
  const indices = q("select name from sqlite_master where type='index' and name not like 'sqlite_%'").map((r) => r.name).sort();
  const vistas = q("select name from sqlite_master where type='view'").map((r) => r.name).sort();
  return { tablas, indices, vistas };
}

const ssot = estructuraDesdeDDL(lee(RUTAS.ddl), RUTAS.ddl);
if (!ssot) {
  console.error('❌ El DDL oficial ni siquiera compila. Nada mas que verificar.');
  process.exit(1);
}

/** DDL embebido en README: extrae los bloques ```sql y los compara con el SSOT. */
function ddlEmbebido(markdown) {
  return [...markdown.matchAll(/```sql\r?\n([\s\S]*?)```/g)].map((m) => m[1]).join('\n');
}
const ddlReadme = ddlEmbebido(lee(RUTAS.readme));
if (ddlReadme.includes('CREATE TABLE')) {
  const real = estructuraDesdeDDL(ddlReadme, 'README.md (bloque SQL embebido)');
  if (real) {
    const faltanEnReadme = Object.keys(ssot.tablas).filter((t) => !real.tablas[t]);
    const sobranEnReadme = Object.keys(real.tablas).filter((t) => !ssot.tablas[t]);
    for (const t of faltanEnReadme) push('ERROR', 'README_SQL_TABLA_AUSENTE', `README.md no define la tabla '${t}' que si existe en el DDL oficial`);
    for (const t of sobranEnReadme) push('ERROR', 'README_SQL_TABLA_FANTASMA', `README.md define '${t}', que NO existe en el DDL oficial`);
    for (const t of Object.keys(real.tablas).filter((t) => ssot.tablas[t])) {
      for (const c of Object.keys(real.tablas[t].columnas)) {
        if (!ssot.tablas[t].columnas[c]) {
          push('ERROR', 'README_SQL_COLUMNA_FANTASMA', `README.md: '${t}.${c}' no existe en el DDL oficial (la copia quedo vieja)`);
        }
      }
      for (const c of Object.keys(ssot.tablas[t].columnas)) {
        if (!real.tablas[t].columnas[c]) {
          push('ERROR', 'README_SQL_COLUMNA_FALTANTE', `README.md: al bloque SQL le falta '${t}.${c}' del DDL oficial`);
        }
      }
      for (const [col, vals] of Object.entries(ssot.tablas[t].enums)) {
        const enReadme = real.tablas[t].enums[col];
        if (enReadme && JSON.stringify(enReadme) !== JSON.stringify(vals)) {
          push('ERROR', 'README_SQL_ENUM_DISTINTO', `README.md: CHECK de '${t}.${col}' = [${enReadme}] vs DDL oficial [${vals}]`);
        }
      }
    }
    if (JSON.stringify(real.indices) !== JSON.stringify(ssot.indices)) {
      push('ERROR', 'README_SQL_INDICES_DISTINTOS', `README.md declara indices [${real.indices}] y el DDL oficial [${ssot.indices}]`);
    }
    if (JSON.stringify(real.vistas) !== JSON.stringify(ssot.vistas)) {
      push('ERROR', 'README_SQL_VISTAS_DISTINTAS', `README.md no reproduce las vistas del DDL oficial: [${ssot.vistas}]`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. LECTORES DE LAS COPIAS (DBML, Mermaid, TS, Zod)
// ---------------------------------------------------------------------------

/** DBML: `Table nombre {` ... `}` con lineas `columna tipo [flags]`. */
function parseDBML(texto) {
  const out = {};
  for (const m of texto.matchAll(/Table\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
    const cols = {};
    for (const linea of m[2].split('\n')) {
      const c = /^\s{2}(\w+)\s+([\w()]+)/.exec(linea);
      if (c && !/^(Note|indexes|ref)$/i.test(c[1])) {
        cols[c[1]] = { tipo: c[2], nota: /note:\s*'([^']*)'/.exec(linea)?.[1] ?? null };
      }
    }
    out[m[1]] = cols;
  }
  return out;
}

/** Mermaid erDiagram: bloques `tabla {` con lineas `tipo columna [PK|FK|UK]`. */
function parseMMD(texto) {
  const out = {};
  for (const m of texto.matchAll(/^\s{4}(\w+)\s*\{([\s\S]*?)^\s{4}\}/gm)) {
    const cols = {};
    for (const linea of m[2].split('\n')) {
      const c = /^\s+(\w+)\s+(\w+)/.exec(linea);
      if (c) cols[c[2]] = { tipo: c[1], nota: /"([^"]*)"/.exec(linea)?.[1] ?? null };
    }
    out[m[1]] = cols;
  }
  return out;
}

/** TS: `export interface X { ... }` -> nombres de campo + uniones literales. */
function parseTS(texto) {
  const out = {};
  for (const m of texto.matchAll(/export\s+interface\s+(\w+)\s*\{([\s\S]*?)\n\}/g)) {
    const cols = {};
    for (const linea of m[2].split('\n')) {
      const c = /^\s*(?:readonly\s+)?(\w+)\??\s*:\s*(.+?);/.exec(linea);
      if (c) cols[c[1]] = { tipo: c[2].trim() };
    }
    out[m[1]] = cols;
  }
  // Uniones literales: export type X = 'a' | 'b' | ...;
  const uniones = {};
  for (const m of texto.matchAll(/export\s+type\s+(\w+)\s*=\s*([\s\S]*?);/g)) {
    const vals = [...m[2].matchAll(/'([^']+)'/g)].map((v) => v[1]);
    if (vals.length) uniones[m[1]] = vals;
  }
  return { interfaces: out, uniones };
}

/** Zod: `export const XSchema = z.object({ ... })` -> claves + valores de z.enum. */
function parseZOD(texto) {
  const out = {};
  const cuerpoDe = (desde) => {
    let i = texto.indexOf('{', desde), nivel = 0, fin = i;
    for (; fin < texto.length; fin++) {
      if (texto[fin] === '{') nivel++;
      else if (texto[fin] === '}') { nivel--; if (nivel === 0) break; }
    }
    return texto.slice(i + 1, fin);
  };
  for (const m of texto.matchAll(/export\s+const\s+(\w+)\s*=\s*z\.object\s*\(/g)) {
    const cuerpo = cuerpoDe(m.index + m[0].length);
    const cols = {};
    // Claves de OPCIONES de Zod (errorMap, required_error, message...) no son campos del modelo.
    const OPCIONES = new Set(['errorMap', 'message', 'required_error', 'invalid_type_error', 'path', 'description', 'fatal']);
    for (const linea of cuerpo.split('\n')) {
      const c = /^\s*(\w+)\s*:\s*(.+?),?\s*$/.exec(linea);
      if (!c || OPCIONES.has(c[1])) continue;
      const vals = [...c[2].matchAll(/'([^']+)'/g)].map((v) => v[1]).filter((v) => !v.includes(' '));
      cols[c[1]] = { tipo: c[2].trim(), enum: vals.length > 1 ? vals : null };
    }
    if (Object.keys(cols).length) out[m[1]] = cols;
  }
  return out;
}

const dbml = parseDBML(lee(RUTAS.dbml));
const mmd = parseMMD(lee(RUTAS.mmd));
const ts = parseTS(lee(RUTAS.ts));
const zod = parseZOD(lee(RUTAS.zod));

// ---------------------------------------------------------------------------
// 3. COMPARACIONES
// ---------------------------------------------------------------------------

/** Columnas reales de una tabla que NO son derivadas de una vista. */
const columnasSSOT = (t) => Object.keys(ssot.tablas[t].columnas);

// 3.1 DBML y Mermaid contra el DDL real
for (const [etiqueta, doc] of [['proganado_mr.dbml', dbml], ['proganado_mer.mmd', mmd]]) {
  for (const t of Object.keys(ssot.tablas)) {
    if (!doc[t]) { push('ERROR', 'COPIA_SIN_TABLA', `${etiqueta}: falta la tabla '${t}'`); continue; }
    for (const c of Object.keys(doc[t])) {
      if (!ssot.tablas[t].columnas[c]) push('ERROR', 'COPIA_COLUMNA_FANTASMA', `${etiqueta}: '${t}.${c}' no existe en el DDL oficial`);
    }
    for (const c of columnasSSOT(t)) {
      if (!doc[t][c]) push('ERROR', 'COPIA_COLUMNA_FALTANTE', `${etiqueta}: falta '${t}.${c}' del DDL oficial`);
    }
    for (const [col, vals] of Object.entries(ssot.tablas[t].enums)) {
      const nota = doc[t][col]?.nota;
      if (nota && !vals.every((v) => nota.includes(v))) {
        push('WARN', 'COPIA_ENUM_INCOMPLETO', `${etiqueta}: la nota de '${t}.${col}' no lista el vocabulario completo [${vals}]: "${nota}"`);
      }
    }
  }
}

// 3.1b Diagrama Mermaid embebido en el README (misma tabla dibujada dos veces)
const mermaidReadme = Object.entries(parseMMD([...lee(RUTAS.readme).matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((m) => m[1]).join('\n')))
  .reduce((acc, [t, cols]) => (acc[t.toLowerCase()] = cols, acc), {});
for (const [t, cols] of Object.entries(mermaidReadme)) {
  if (!ssot.tablas[t]) continue;
  for (const c of Object.keys(cols)) {
    if (!ssot.tablas[t].columnas[c]) {
      push('ERROR', 'README_ER_COLUMNA_FANTASMA', `README.md (erDiagram): '${t}.${c}' no existe en el DDL oficial`);
    }
  }
  for (const c of Object.keys(ssot.tablas[t].columnas)) {
    if (!cols[c]) {
      push('ERROR', 'README_ER_COLUMNA_FALTANTE', `README.md (erDiagram): al diagrama de '${t}' le falta la columna real '${c}'`);
    }
  }
}

// 3.2 TS y Zod contra el DDL real (nombres + vocabularios de enum)
for (const [tabla, { ts: nTS, zod: nZod }] of Object.entries(MAPA)) {
  const reales = columnasSSOT(tabla);

  const iface = ts.interfaces[nTS];
  if (!iface) push('ERROR', 'TS_SIN_INTERFACE', `no existe la interface '${nTS}' para la tabla '${tabla}'`);
  else {
    for (const campo of Object.keys(iface)) {
      if (reales.includes(campo)) continue;
      if (excusado('TS_CAMPO_DERIVADO', `${tabla}.${campo}`)) continue;
      push('ERROR', 'TS_CAMPO_INEXISTENTE', `${nTS}.${campo} no es columna de '${tabla}' (columnas reales: ${reales.join(', ')})`);
    }
    for (const col of reales) {
      if (!iface[col] && !excusado('TS_COLUMNA_SIN_CONTRATO', `${tabla}.${col}`)) {
        push('ERROR', 'TS_COLUMNA_SIN_CONTRATO', `${nTS} no declara la columna real '${tabla}.${col}'`);
      }
    }
    // Vocabularios: union literal del TS vs CHECK del DDL
    for (const [col, vals] of Object.entries(ssot.tablas[tabla].enums)) {
      const tipo = iface[col]?.tipo;
      if (!tipo) continue;
      const nombreUnion = /^(\w+)/.exec(tipo)?.[1];
      const declarado = ts.uniones[tipo] || ts.uniones[nombreUnion];
      if (!declarado) continue;
      if (JSON.stringify([...declarado].sort()) !== JSON.stringify([...vals].sort())) {
        push('ERROR', 'TS_ENUM_DISTINTO', `'${tabla}.${col}': TS permite [${declarado}] y el CHECK de la base acepta [${vals}]`);
      }
    }
  }

  const esquema = zod[nZod];
  if (!esquema) push('ERROR', 'ZOD_SIN_ESQUEMA', `no existe el esquema '${nZod}' para la tabla '${tabla}'`);
  else {
    for (const campo of Object.keys(esquema)) {
      if (reales.includes(campo)) continue;
      if (excusado('ZOD_CAMPO_DERIVADO', `${tabla}.${campo}`)) continue;
      push('ERROR', 'ZOD_CAMPO_INEXISTENTE', `${nZod}.${campo} no es columna de '${tabla}'`);
    }
    for (const col of reales) {
      if (!esquema[col] && !excusado('ZOD_COLUMNA_SIN_VALIDACION', `${tabla}.${col}`)) {
        push('ERROR', 'ZOD_COLUMNA_SIN_VALIDACION', `${nZod} no valida la columna real '${tabla}.${col}'`);
      }
    }
    for (const [col, def] of Object.entries(esquema)) {
      if (!def.enum) continue;
      const real = ssot.tablas[tabla].enums[col];
      if (!real) {
        push('WARN', 'ZOD_ENUM_SIN_CHECK', `'${tabla}.${col}': Zod restringe [${def.enum}] pero la base NO tiene CHECK (un typo entra por SQL directo)`);
        continue;
      }
      if (JSON.stringify([...def.enum].sort()) !== JSON.stringify([...real].sort())) {
        push('ERROR', 'ZOD_ENUM_DISTINTO', `'${tabla}.${col}': Zod acepta [${def.enum}] y el CHECK de la base acepta [${real}]`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 4. COHERENCIA DE IDENTIDAD DEL REPOSITORIO
// ---------------------------------------------------------------------------
const remoto = (() => {
  try {
    const cfg = fs.readFileSync(path.join(ROOT, '.git', 'config'), 'utf8');
    return /url\s*=\s*(\S+)/.exec(cfg)?.[1] || null;
  } catch { return null; }
})();
if (remoto) {
  const slug = remoto.replace(/\.git$/, '').replace(/^.*github\.com[:/]/, '');
  for (const archivo of ['README.md', 'AGENTS.md', 'docs/contexto/CEREBRO_PROGANADO.md', 'docs/contexto/ESTADO_VIVO_PROGANADO.md', 'docs/DICCIONARIO_VALIDACION_INPUTS_Y_CELDAS.md']) {
    if (!fs.existsSync(path.join(ROOT, archivo))) continue;
    const texto = lee(archivo);
    // Cualquier URL de GitHub citada en un documento debe apuntar al remoto real:
    // un AGENTS.md que manda a clonar OTRO repositorio desvia a cualquiera.
    for (const m of texto.matchAll(/github\.com[:/]+([\w.-]+\/[\w.-]+?)(?:\.git)?(?![\w.\/-])/gm)) {
      const citado = m[1];
      const conocido = citado.toLowerCase();
      if (conocido !== slug.toLowerCase() && !excusado('REPO_SLUG_DISTINTO', `${archivo}:${citado}`)) {
        push('ERROR', 'REPO_SLUG_DISTINTO', `${archivo} cita '${citado}' pero el remoto real es '${slug}'`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 5. FORMATO PSeInt (regla tecnica inmutable 8 del AGENTS.md del repo)
// ---------------------------------------------------------------------------
for (const archivo of fs.readdirSync(path.join(ROOT, '03_Logica_PSeInt')).filter((f) => f.endsWith('.psc'))) {
  const texto = fs.readFileSync(path.join(ROOT, '03_Logica_PSeInt', archivo), 'utf8');
  const reglas = [
    { codigo: 'PSEINT_DEFINIR', rx: /^\s*Definir\s/m, prohibido: true, msg: 'usa "Definir ... Como" (prohibido por la regla 8)' },
    { codigo: 'PSEINT_FLECHA', rx: /<-/, prohibido: true, msg: 'usa la flecha "<-" (prohibido por la regla 8)' },
    { codigo: 'PSEINT_SIN_INICIALIZACION', rx: /^\s*[A-Za-z_]\w*\s*=\s*\S/m, prohibido: false, msg: 'no inicializa variables con "variable = valor" al inicio (regla 8)' },
    { codigo: 'PSEINT_BLOQUE_ENTRADA', rx: /^\s*\/\/\s*DATOS DE ENTRADA/m, prohibido: false, msg: 'falta el bloque "// DATOS DE ENTRADA" (regla 8)' },
    { codigo: 'PSEINT_BLOQUE_PROCESO', rx: /^\s*\/\/\s*PROCESO/m, prohibido: false, msg: 'falta el bloque "// PROCESO" (regla 8)' },
    { codigo: 'PSEINT_BLOQUE_SALIDA', rx: /^\s*\/\/\s*DATOS DE SALIDA/m, prohibido: false, msg: 'falta el bloque "// DATOS DE SALIDA" (regla 8)' }
  ];
  for (const r of reglas) {
    const presente = r.rx.test(texto);
    const viola = r.prohibido ? presente : !presente;
    if (viola && !excusado(r.codigo, archivo)) {
      push('ERROR', r.codigo, `03_Logica_PSeInt/${archivo}: ${r.msg}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5.5. FORMULARIOS HTML vs DDL (el contrato de entrada del front-end)
// ---------------------------------------------------------------------------
// El formulario es la puerta por donde entran los datos: si un `name` no es columna
// de la tabla declarada, o si sus `value` no están en el CHECK de esa columna, el
// alta falla al guardar (o guarda basura) AUNQUE la interfaz valide "ok". Caso real
// 16-sep-2026: registro_bovino.html enviaba sexo="H"/"M" y la base solo acepta
// 'Hembra'/'Macho'; además mandaba codigo_arete, peso_kg, id_madre y
// id_padre_genetica, que no existen en ninguna tabla del v3.1.
function archivosHtmlRecursivo(dir) {
  const salida = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) salida.push(...archivosHtmlRecursivo(p));
    else if (e.name.endsWith('.html')) salida.push(p);
  }
  return salida;
}

/** Campos de un formulario con los valores que ofrece (options de select + radios). */
function camposDeFormulario(html) {
  const campos = new Map();
  const anota = (nombre, valor) => {
    if (!nombre) return;
    if (!campos.has(nombre)) campos.set(nombre, new Set());
    if (valor) campos.get(nombre).add(valor);
  };
  for (const s of html.matchAll(/<select\b[^>]*\bname="([^"]+)"[^>]*>([\s\S]*?)<\/select>/gi)) {
    for (const o of s[2].matchAll(/<option\b[^>]*\bvalue="([^"]*)"/gi)) anota(s[1], o[1]);
    if (!campos.has(s[1])) anota(s[1], null);
  }
  for (const i of html.matchAll(/<input\b[^>]*>/gi)) {
    const nombre = /\bname="([^"]+)"/i.exec(i[0]);
    if (!nombre) continue;
    const tipo = /\btype="([^"]*)"/i.exec(i[0]);
    const valor = /\bvalue="([^"]*)"/i.exec(i[0]);
    anota(nombre[1], tipo && /radio|checkbox/i.test(tipo[1]) ? valor && valor[1] : null);
  }
  return campos;
}

const columnasGlobales = new Set();
const enumPorColumna = new Map();
for (const [tabla, v] of Object.entries(ssot.tablas)) {
  for (const c of Object.keys(v.columnas)) columnasGlobales.add(c);
  for (const [c, vals] of Object.entries(v.enums || {})) enumPorColumna.set(c, { tabla, valores: vals });
}

for (const abs of archivosHtmlRecursivo(path.join(ROOT, '02_Vistas_HTML5'))) {
  const html = fs.readFileSync(abs, 'utf8');
  const form = /<form\b[^>]*>/i.exec(html);
  if (!form) continue;
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const decl = /\bdata-tabla="([^"]+)"/i.exec(form[0]);
  if (!decl) {
    if (!excusado('HTML_SIN_TABLA_DECLARADA', rel)) {
      push('ERROR', 'HTML_SIN_TABLA_DECLARADA', `${rel}: el <form> no declara data-tabla="<tabla>" y no se puede verificar contra el DDL`);
    }
    continue;
  }
  const tabla = decl[1];
  if (!ssot.tablas[tabla]) {
    push('ERROR', 'HTML_TABLA_INEXISTENTE', `${rel}: data-tabla="${tabla}" no existe en el DDL oficial`);
    continue;
  }
  const reales = Object.keys(ssot.tablas[tabla].columnas);
  for (const [nombre, valores] of camposDeFormulario(html)) {
    const ident = `${rel}:${nombre}`;
    if (!reales.includes(nombre)) {
      const codigo = columnasGlobales.has(nombre) ? 'HTML_CAMPO_OTRA_TABLA' : 'HTML_CAMPO_FANTASMA';
      const extra = codigo === 'HTML_CAMPO_OTRA_TABLA' ? ' (existe en otra tabla del modelo)' : '';
      if (!excusado(codigo, ident)) {
        push('ERROR', codigo, `${rel}: name="${nombre}" no es columna de '${tabla}'${extra}. Columnas reales: ${reales.join(', ')}`);
      }
      continue;
    }
    const enu = enumPorColumna.get(nombre);
    if (!enu || !valores.size) continue;
    const fuera = [...valores].filter((v) => !enu.valores.includes(v));
    const faltan = enu.valores.filter((v) => !valores.has(v));
    if (fuera.length) {
      if (!excusado('HTML_ENUM_DISTINTO', ident)) {
        push('ERROR', 'HTML_ENUM_DISTINTO', `${rel}: '${tabla}.${nombre}' ofrece [${[...valores]}] y la base acepta [${enu.valores}]; sobran [${fuera}]`);
      }
    } else if (faltan.length) {
      push('WARN', 'HTML_ENUM_INCOMPLETO', `${rel}: '${tabla}.${nombre}' no ofrece [${faltan}] del vocabulario real [${enu.valores}]`);
    }
  }
}

// ---------------------------------------------------------------------------
// 6. CADUCIDAD DE LAS EXCEPCIONES (anti pudricion de la deuda declarada)
// ---------------------------------------------------------------------------
const hoy = new Date();
for (const [i, e] of excepciones.entries()) {
  if (e.revisar_antes_de && new Date(e.revisar_antes_de) < hoy) {
    push('ERROR', 'EXCEPCION_CADUCADA', `excepcion ${e.codigo}/${e.ident || '*'}: vencio el ${e.revisar_antes_de} y sigue tapando un desajuste`);
  }
  if (!usadas.has(i)) {
    push('ERROR', 'EXCEPCION_OBSOLETA', `excepcion ${e.codigo}/${e.ident || '*'}: ya no tapa ningun desajuste, borrela`);
  }
}

// ---------------------------------------------------------------------------
// 7. SALIDA
// ---------------------------------------------------------------------------
const errores = hallazgos.filter((h) => h.nivel === 'ERROR');
const avisos = hallazgos.filter((h) => h.nivel === 'WARN');
const tabla = (arr) => arr.map((h) => `  [${h.codigo}] ${h.detalle}`).join('\n');

console.log(`SSOT: ${RUTAS.ddl}`);
console.log(`Real: ${Object.keys(ssot.tablas).length} tablas, ${ssot.indices.length} indices, ${ssot.vistas.length} vista(s) [${ssot.vistas}]`);
console.log(`Copias verificadas: README(SQL+erDiagram), ${RUTAS.dbml}, ${RUTAS.mmd}, ${RUTAS.ts}, ${RUTAS.zod}`);
console.log(`Excepciones declaradas: ${excepciones.length}`);
if (excepciones.length) {
  console.log('Deuda declarada (justificada, no bloqueante):');
  for (const e of excepciones) console.log(`  · ${e.codigo} ${e.ident || '*'} (revisar antes de ${e.revisar_antes_de || 's/f'})`);
}
console.log('');

if (VERBOSE) {
  for (const [t, v] of Object.entries(ssot.tablas)) {
    console.log(`  ${t}: ${Object.keys(v.columnas).join(', ')}${Object.keys(v.enums).length ? ' || enums: ' + JSON.stringify(v.enums) : ''}`);
  }
  console.log('');
}

if (errores.length) console.log(`❌ ${errores.length} DESAJUSTE(S) DE PARIDAD:\n${tabla(errores)}\n`);
if (avisos.length) console.log(`⚠️  ${avisos.length} aviso(s):\n${tabla(avisos)}\n`);
if (!errores.length && !avisos.length) console.log('✅ Paridad total: todas las copias coinciden con el DDL oficial.\n');

process.exit(errores.length ? 1 : 0);
