/**
 * tests/reglas_retiro.test.mjs
 * Regresión del incidente 2026-11-01: el prototipo liberaba la leche al mediodía del
 * último día de retiro, mientras el dominio y el schema la declaraban bloqueada hasta
 * las 23:59. Aquí se fija la frontera y, sobre todo, que dominio y prototipo den EL
 * MISMO número para los mismos tratamientos.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { evaluarCintaRoja } from '../src/domain/cinta_roja.rule.ts';

// El módulo es un script de navegador (se carga con <script> en index.html), así que
// se evalúa igual que lo haría el navegador: define el global `ReglasRetiro`.
const fuenteModulo = readFileSync(
  new URL('../prototipo_interfaz/reglas_retiro.js', import.meta.url), 'utf8'
);
assert.ok(/ReglasRetiro/.test(fuenteModulo), 'reglas_retiro.js debe exponer el global ReglasRetiro');
new Function(fuenteModulo)();
const ReglasRetiro = globalThis.ReglasRetiro;
assert.ok(ReglasRetiro && typeof ReglasRetiro.calcularRetiroPendiente === 'function',
  'el módulo no quedó expuesto para Node');

const TRATAMIENTO = { fecha_tratamiento: '2026-10-10', dias_retiro_ica: 3 };
// Vence el 2026-10-13 y ese día sigue bloqueado (convención del schema y del dominio).

test('regla: el día del tratamiento cuenta los 4 días bloqueados (10,11,12,13 inclusive)', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 9, 10, 8, 0)), 4);
});

test('regla: mediodía del último día sigue bloqueado (esta es la regresión exacta)', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 9, 13, 12, 0)), 1);
});

test('regla: 23:59 del último día sigue bloqueado (fail-closed)', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 9, 13, 23, 59)), 1);
});

test('regla: se libera apenas al día siguiente, de madrugada', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([TRATAMIENTO], new Date(2026, 9, 14, 0, 30)), 0);
});

test('regla: sin tratamientos o con retiro cero no bloquea', () => {
  assert.equal(ReglasRetiro.calcularRetiroPendiente([], new Date(2026, 9, 11)), 0);
  assert.equal(ReglasRetiro.calcularRetiroPendiente([{ fecha_tratamiento: '2026-10-10', dias_retiro_ica: 0 }]), 0);
  assert.equal(ReglasRetiro.calcularRetiroPendiente([{ fecha_tratamiento: 'fechero' }]), 0);
});

test('regla: gana el tratamiento más largo cuando hay varios', () => {
  // A: 10-10 + 3 => vence 10-13; hoy 10-12 => quedan 2 (12 y 13).
  // B: 10-11 + 5 => vence 10-16; hoy 10-12 => quedan 5 (12..16).
  const dos = [TRATAMIENTO, { fecha_tratamiento: '2026-10-11', dias_retiro_ica: 5 }];
  assert.equal(ReglasRetiro.calcularRetiroPendiente(dos, new Date(2026, 9, 12)), 5);
});

test('paridad: prototipo y dominio TS dan el mismo número en cada día crítico', () => {
  const tratamientos = [{ id_bovino: 'BOV-001', fecha_tratamiento: '2026-10-10', dias_retiro_ica: 3 }];
  for (const [ymd, hora] of [['2026-10-10', 18], ['2026-10-12', 6], ['2026-10-13', 12], ['2026-10-13', 23], ['2026-10-14', 5]]) {
    const [y, m, d] = ymd.split('-').map(Number);
    const momento = new Date(y, m - 1, d, hora, 30);
    const esperado = evaluarCintaRoja('BOV-001', tratamientos, ymd).dias_restantes;
    assert.equal(
      ReglasRetiro.calcularRetiroPendiente(tratamientos, momento),
      esperado,
      `divergen en ${ymd} ${hora}:30 (prototipo vs dominio)`
    );
  }
});

test('carga: index.html importa el módulo ANTES de app.js (si no, RetornoReferenceError)', () => {
  const html = readFileSync(new URL('../prototipo_interfaz/index.html', import.meta.url), 'utf8');
  const posicionModulo = html.indexOf('reglas_retiro.js');
  const posicionApp = html.indexOf('app.js?v=');
  assert.ok(posicionModulo > -1, 'index.html no carga reglas_retiro.js');
  assert.ok(posicionModulo < posicionApp, 'reglas_retiro.js debe cargarse antes de app.js');
  assert.ok(!/retiroPendiente\(idBov, ahora\)[\s\S]{0,400}Math\.ceil/.test(
    readFileSync(new URL('../prototipo_interfaz/app.js', import.meta.url), 'utf8')
  ), 'app.js volvió a calcular el retiro por horas');
});

test('bloqueo: el pesaje no ofrece override a un animal en cinta roja', () => {
  const app = readFileSync(new URL('../prototipo_interfaz/app.js', import.meta.url), 'utf8');
  // Se recorta SOLO el handler de pesaje (hasta el handler de entrega, que avisa pero
  // no registra leche de un animal bloqueado). Un regex sobre todo el archivo daría
  // falso positivo porque más abajo existe otro confirm() legítimo.
  const inicio = app.indexOf("$('#formPesaje')");
  const fin = app.indexOf("$('#formEntrega')");
  assert.ok(inicio > -1 && fin > inicio, 'no se pudo localizar el handler de pesaje');
  const handler = app.slice(inicio, fin);
  assert.ok(!handler.includes('confirm('), 'el pesaje sigue permitiendo registrar con un confirm()');
  assert.ok(/retiroPendiente\(f\.bovino\)/.test(handler), 'el pesaje dejó de consultar la regla de retiro');
  assert.ok(handler.includes('return;'), 'el bloqueo del pesaje debe cortar el submit');
});
