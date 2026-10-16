/**
 * ProGanado SaaS — Suite de Pruebas Unitarias de Reglas de Negocio (SSD)
 * @author Jeiser Abraham Gutiérrez (Tech Lead & QA Architect)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { evaluarCintaRoja, validarInocuidadLoteAcopio } from '../src/domain/cinta_roja.rule.ts';
import { calcularDiasAbiertos } from '../src/domain/dias_abiertos.rule.ts';
import { clasificarCalidadUfc, liquidarEntregaLeche } from '../src/domain/liquidacion_leche.rule.ts';

describe('Regla Pura: Cinta Roja Biológica (Inocuidad ICA)', () => {
  test('Vaca sin tratamientos sanitarios activos reporta libre de cinta roja', () => {
    const estado = evaluarCintaRoja('BOV-001', [], '2026-10-15');
    assert.equal(estado.en_cinta_roja, false);
    assert.equal(estado.fecha_fin_retiro, null);
    assert.equal(estado.dias_restantes, 0);
  });

  test('Vaca tratada con antibiótico (3 días retiro) SIGUE bloqueada el último día de retiro (fail-closed)', () => {
    // Tratamiento aplicado el 2026-10-10 con 3 días de retiro -> vence el 2026-10-13 inclusive
    const tratamientos = [
      {
        id_tratamiento: 'TRAT-01',
        id_bovino: 'BOV-002',
        fecha_tratamiento: '2026-10-10',
        dias_retiro_ica: 3,
        nombre_farmaco: 'Ceftiofur Sódico',
      },
    ];

    const estadoUltimoDia = evaluarCintaRoja('BOV-002', tratamientos, '2026-10-13');
    assert.equal(estadoUltimoDia.en_cinta_roja, true);
    assert.equal(estadoUltimoDia.fecha_fin_retiro, '2026-10-13');
    assert.ok(estadoUltimoDia.motivo_bloqueo?.includes('Ceftiofur'));

    // Al día siguiente (2026-10-14) queda formalmente liberada
    const estadoDiaSiguiente = evaluarCintaRoja('BOV-002', tratamientos, '2026-10-14');
    assert.equal(estadoDiaSiguiente.en_cinta_roja, false);
    assert.equal(estadoDiaSiguiente.dias_restantes, 0);
  });

  test('Lote de acopio rechaza entrega si una vaca del grupo está en cinta roja', () => {
    const tratamientos = [
      {
        id_tratamiento: 'TRAT-02',
        id_bovino: 'BOV-INFECTADA',
        fecha_tratamiento: '2026-10-14',
        dias_retiro_ica: 5,
        nombre_farmaco: 'Oxitetraciclina L.A.',
      },
    ];

    const resultado = validarInocuidadLoteAcopio(
      ['BOV-SANA-1', 'BOV-INFECTADA', 'BOV-SANA-2'],
      tratamientos,
      '2026-10-15'
    );

    assert.equal(resultado.aptoParaAcopio, false);
    assert.equal(resultado.bovinosBloqueados.length, 1);
    assert.equal(resultado.bovinosBloqueados[0]?.id_bovino, 'BOV-INFECTADA');
  });
});

describe('Regla Pura: Días Abiertos y Fertilidad', () => {
  test('Intervalo menor a 90 días califica como OPTIMO', () => {
    const res = calcularDiasAbiertos('BOV-100', '2026-08-01', '2026-10-15'); // 75 días
    assert.equal(res.categoria, 'OPTIMO');
    assert.equal(res.requiere_atencion_veterinaria, false);
  });

  test('Intervalo entre 90 y 119 días califica como ALERTA_TEMPRANA', () => {
    const res = calcularDiasAbiertos('BOV-101', '2026-07-01', '2026-10-15'); // 106 días
    assert.equal(res.categoria, 'ALERTA_TEMPRANA');
    assert.equal(res.requiere_atencion_veterinaria, true);
  });

  test('Intervalo superior a 120 días califica como CRITICO_PERDIDA', () => {
    const res = calcularDiasAbiertos('BOV-102', '2026-05-01', '2026-10-15'); // > 160 días
    assert.equal(res.categoria, 'CRITICO_PERDIDA');
    assert.equal(res.requiere_atencion_veterinaria, true);
  });
});

describe('Regla Pura: Liquidación de Leche Colanta (UFC y Mermas)', () => {
  test('Leche Excelente (<=25k UFC) bonifica +80 COP por litro', () => {
    const ufc = clasificarCalidadUfc(18000);
    assert.equal(ufc.calidad, 'Excelente_Clase_A');
    assert.equal(ufc.ajusteCopPorLitro, 80);
  });

  test('Leche Deficiente (>100k UFC) castiga -120 COP por litro', () => {
    const ufc = clasificarCalidadUfc(140000);
    assert.equal(ufc.calidad, 'Deficiente_Penalizada');
    assert.equal(ufc.ajusteCopPorLitro, -120);
  });

  test('Liquidación completa calcula merma de carrotanque y total liquidado', () => {
    const liq = liquidarEntregaLeche({
      precioBaseLitroCop: 2150,
      recuentoUfc: 20000, // +80 COP -> 2.230 COP/L
      litrosEntregadosTanque: 1000,
      litrosFacturadosCamion: 980, // Merma de 20 L (2%)
    });

    assert.equal(liq.precioFinalLitroCop, 2230);
    assert.equal(liq.valorBrutoFincaCop, 2230000);
    assert.equal(liq.valorLiquidadoRealCop, 980 * 2230); // 2.185.400 COP
    assert.equal(liq.mermaLitros, 20);
    assert.equal(liq.porcentajeMerma, 2.0);
  });
});
