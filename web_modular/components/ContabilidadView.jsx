import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, hoy, uid } from '../data/seedData.js';

export default function ContabilidadView() {
  const { db, addContabilidad, setLightboxFoto } = useProGanado();
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [tipo, setTipo] = useState('Salida');
  const [concepto, setConcepto] = useState('Concentrado lechero');
  const [tercero, setTercero] = useState('Nutrición Animal S.A.S.');
  const [categoria, setCategoria] = useState('Alimentación');
  const [valor, setValor] = useState('650000');
  const [fecha, setFecha] = useState(hoy());
  const [metodo, setMetodo] = useState('Transferencia Bancolombia');
  const [notas, setNotas] = useState('10 bultos concentrado 16%');

  const entradasTotal = (db.contabilidad || []).filter(c => c.tipo === 'Entrada').reduce((acc, c) => acc + (Number(c.valor) || 0), 0);
  const salidasTotal = (db.contabilidad || []).filter(c => c.tipo === 'Salida').reduce((acc, c) => acc + (Number(c.valor) || 0), 0);
  const balance = entradasTotal - salidasTotal;

  const handleSaveItem = (e) => {
    e.preventDefault();
    addContabilidad({
      id: uid('cnt'),
      tipo,
      fecha,
      concepto,
      tercero,
      categoria,
      metodo,
      valor: Number(valor),
      notas,
      fotoId: null,
      creado: hoy()
    });
    setShowModal(false);
  };

  return (
    <div className="page-content">
      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Caja y Contabilidad Ganadera</h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
            Ingresos por venta de leche/ganado y costos operacionales (insumos, sanidad, nómina).
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Registrar Movimiento Contable
        </button>
      </div>

      {/* Balance Cards */}
      <div className="kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Ingresos Totales</span>
            <span className="kpi-icon">📈</span>
          </div>
          <div className="kpi-value" style={{ color: '#059669' }}>
            ${entradasTotal.toLocaleString()} COP
          </div>
          <div className="kpi-subtitle">Venta de leche y ganado</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Egresos / Costos</span>
            <span className="kpi-icon">📉</span>
          </div>
          <div className="kpi-value" style={{ color: '#dc2626' }}>
            ${salidasTotal.toLocaleString()} COP
          </div>
          <div className="kpi-subtitle">Alimentación, sanidad y jornales</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Margen Neto Operacional</span>
            <span className="kpi-icon">💰</span>
          </div>
          <div className="kpi-value" style={{ color: balance >= 0 ? '#059669' : '#dc2626' }}>
            ${balance.toLocaleString()} COP
          </div>
          <div className="kpi-subtitle">Balance de caja verificado</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Libro Diario de Movimientos</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Concepto / Detalle</th>
                <th>Tercero / Proveedor</th>
                <th>Categoría</th>
                <th>Método</th>
                <th>Valor COP</th>
              </tr>
            </thead>
            <tbody>
              {(db.contabilidad || []).map(c => (
                <tr key={c.id}>
                  <td>{fmtFecha(c.fecha)}</td>
                  <td>
                    <span className={`badge ${c.tipo === 'Entrada' ? 'b-green' : 'b-amber'}`}>
                      {c.tipo}
                    </span>
                  </td>
                  <td><strong>{c.concepto}</strong></td>
                  <td>{c.tercero}</td>
                  <td>{c.categoria}</td>
                  <td>{c.metodo}</td>
                  <td>
                    <strong style={{ color: c.tipo === 'Entrada' ? '#059669' : '#dc2626' }}>
                      {c.tipo === 'Entrada' ? '+' : '-'}${Number(c.valor).toLocaleString()}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Contabilidad */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Movimiento de Caja</h3>
            <form onSubmit={handleSaveItem}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Flujo</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="Salida">Egreso / Gasto</option>
                    <option value="Entrada">Ingreso / Venta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Concepto</label>
                <input
                  type="text"
                  placeholder="Ej. Compra de concentrado"
                  value={concepto}
                  onChange={e => setConcepto(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tercero / Empresa</label>
                  <input
                    type="text"
                    value={tercero}
                    onChange={e => setTercero(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Medicamentos y sanidad">Medicamentos y sanidad</option>
                    <option value="Venta de leche">Venta de leche</option>
                    <option value="Venta de ganado">Venta de ganado</option>
                    <option value="Insumos y potreros">Insumos y potreros</option>
                    <option value="Mano de obra">Mano de obra / Jornales</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Valor (COP)</label>
                  <input
                    type="number"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Método de Pago</label>
                  <select value={metodo} onChange={e => setMetodo(e.target.value)}>
                    <option value="Transferencia Bancolombia">Transferencia Bancolombia</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Nequi / Daviplata">Nequi / Daviplata</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Notas Adicionales</label>
                <input
                  type="text"
                  value={notas}
                  onChange={e => setNotas(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Registrar en Libro Diario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
