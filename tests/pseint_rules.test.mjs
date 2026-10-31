/**
 * Guard de las reglas PSeInt que no se pueden ejecutar desde Node.
 * No valida sintaxis de PSeInt: valida que el texto conserve la regla canónica.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PSC = path.join(ROOT, '03_Logica_PSeInt', 'asistente_logica_proganado_completo.psc');
const src = fs.readFileSync(PSC, 'utf8');

test('PSeInt bloquea el último día de retiro y libera al siguiente', () => {
  assert.match(src, /dias_transcurridos\s*<=\s*dias_retiro/, 'la condición debe ser <=, no <');
  assert.ok(!/dias_transcurridos\s*<\s*dias_retiro/.test(src), 'no puede quedar la condición que libera el último día');
});

test('PSeInt usa la misma tabla UFC que la regla TS probada', () => {
  assert.match(src, /bonificacion\s*<-\s*80\.0/);
  assert.match(src, /bonificacion\s*<-\s*40\.0/);
  assert.match(src, /bonificacion\s*<-\s*0\.0/);
  assert.match(src, /bonificacion\s*<-\s*-120\.0/);
  assert.ok(!/bonificacion\s*<-\s*120\.0/.test(src), 'no puede quedar la tabla vieja +120');
  assert.ok(!/bonificacion\s*<-\s*50\.0/.test(src), 'no puede quedar la tabla vieja +50');
  assert.ok(!/bonificacion\s*<-\s*-150\.0/.test(src), 'no puede quedar la tabla vieja -150');
});
