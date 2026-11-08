/**
 * tests/producto_mvp.test.mjs
 * Blindaje del espejo filtrado del MVP (producto_mvp/).
 *
 * El MVP de Emilio calculaba el retiro por horas y liberaba la vaca al mediodía
 * del último día; además el pesaje permitía saltarse la cinta roja con un
 * confirm(). Este test fija las dos correcciones para que no vuelvan.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const raiz = new URL('../producto_mvp/', import.meta.url);
const fuente = readFileSync(new URL('reglas_retiro.js', raiz), 'utf8');
assert.ok(/ReglasRetiro/.test(fuente), 'reglas_retiro.js debe exponer el global ReglasRetiro');
new Function(fuente)();
const ReglasRetiro = globalThis.ReglasRetiro;
assert.ok(ReglasRetiro && typeof ReglasRetiro.calcularRetiroPendiente === 'function',
  'el módulo no quedó expuesto para Node');

const TRATAMIENTO = { fecha_tratamiento: '2026-11-01', dias_retiro_ica: 6 };
// Vence el 2026-11-07 y ese día sigue bloqueado (fail-closed).

test('espejo MVP: a las 15:00 del último día sigue bloqueado', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 10, 7, 15, 0)), 1);
});

test('espejo MVP: se libera al día siguiente de madrugada', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 10, 8, 5, 0)), 0);
});

test('espejo MVP: index.html carga la regla antes de proganado.js', () => {
  const html = readFileSync(new URL('index.html', raiz), 'utf8');
  const posicionModulo = html.indexOf('reglas_retiro.js');
  const posicionApp = html.indexOf('proganado.js');
  assert.ok(posicionModulo > -1, 'index.html no carga reglas_retiro.js');
  assert.ok(posicionModulo < posicionApp, 'reglas_retiro.js debe cargarse antes de proganado.js');
});

test('espejo MVP: proganado.js delega el cálculo y no lo recalcula por horas', () => {
  const js = readFileSync(new URL('proganado.js', raiz), 'utf8');
  assert.ok(js.includes('calcularRetiroPendiente'), 'proganado.js no delega en el módulo');
  assert.ok(!/Math\.ceil\(\(fin/.test(js), 'proganado.js volvió a calcular el retiro por horas');
});

test('espejo MVP: el pesaje bloquea sin override', () => {
  const js = readFileSync(new URL('proganado.js', raiz), 'utf8');
  const inicio = js.indexOf("$('#formPesaje')");
  const fin = js.indexOf("$('#formEntrega')");
  assert.ok(inicio > -1 && fin > inicio, 'no se pudo localizar el handler de pesaje');
  const handler = js.slice(inicio, fin);
  assert.ok(handler.includes('retiroPendiente(f.bovino)'), 'el pesaje dejó de consultar la regla');
  assert.ok(!handler.includes('confirm('), 'el pesaje volvió a permitir registrar con un confirm()');
  assert.ok(handler.includes('return;'), 'el bloqueo del pesaje debe cortar el submit');
});
