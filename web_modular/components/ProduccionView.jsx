import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, hoy, uid } from '../data/seedData.js';

export default function ProduccionView() {
  const { db, addPesaje, addEntrega, getRetiroPendiente } = useProGanado();
  const [showPesajeModal, setShowPesajeModal] = useState(false);
  const [showEntregaModal, setShowEntregaModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // New Pesaje state
  const [bovinoId, setBovinoId] = useState(() => (db.bovinos && db.bovinos[0] ? db.bovinos[0].id_bovino : ''));
  const [fechaPesaje, setFechaPesaje] = useState(hoy());
  const [horaPesaje, setHoraPesaje] = useState('05:30');
  const [litros, setLitros] = useState('14.5');

  // New Entrega state
  const [fechaEntrega, setFechaEntrega] = useState(hoy());
  const [litrosEntrega, setLitrosEntrega] = useState('420');
  const [valorEntrega, setValorEntrega] = useState('1050000');
  const [ufcEntrega, setUfcEntrega] = useState('14000');

  const handleSavePesaje = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict Fail-Closed check
    const retiro = getRetiroPendiente(bovinoId);
    if (retiro > 0) {
      const cow = db.bovinos.find(b => b.id_bovino === bovinoId);
      const name = (cow ? (cow.name || ('Vaca ' + cow.tag)) : bovinoId);
      setErrorMsg(`⛔ BLOQUEO FAIL-CLOSED: ${name} está en CINTA ROJA (${retiro} días de retiro restantes). No se permite ingresar pesaje para acopio.`);
      return;
    }

    try {
      addPesaje({
        id_pesaje: uid('pes'),
        id_bovino: bovinoId,
        fecha_pesaje: fechaPesaje,
        hora_pesaje: horaPesaje,
        litros_obtenidos: Number(litros)
      });
      setShowPesajeModal(false);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleSaveEntrega = (e) => {
    e.preventDefault();
    addEntrega({
      id_entrega: uid('ent'),
      fecha_entrega: fechaEntrega,
      litros_totales: Number(litrosEntrega),
      valor_bruto_est: Number(valorEntrega),
      recuento_ufc: Number(ufcEntrega)
    });
    setShowEntregaModal(false);
  };

  return (
    <div className="page-content">
      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Control Lechero y Entregas a Acopio</h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
            Registro individual por vaca con bloqueo automático contra contaminación cruzada.
          </p>
        </div>
        <div className="button-group">
          <button className="btn-secondary" onClick={() => setShowEntregaModal(true)}>
            + Registrar Entrega a Planta
          </button>
          <button className="btn-primary" onClick={() => { setErrorMsg(''); setShowPesajeModal(true); }}>
            + Registrar Ordeño Individual
          </button>
        </div>
      </div>

      {/* Grid: Pesajes recientes + Entregas Acopio */}
      <div className="grid-2-col">
        {/* Pesajes */}
        <div className="card">
          <div className="card-header">
            <h3>Ordeños Registrados Recientes</h3>
            <span className="badge">{(db.pesajes || []).length} registros</span>
          </div>
          <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vaca</th>
                  <th>Fecha / Hora</th>
                  <th>Litros Obtenidos</th>
                </tr>
              </thead>
              <tbody>
                {(db.pesajes || []).slice(0, 20).map(p => {
                  const cow = (db.bovinos || []).find(b => b.id_bovino === p.id_bovino);
                  return (
                    <tr key={p.id_pesaje}>
                      <td><strong>#{cow ? cow.tag : '—'}</strong> {cow ? cow.name : ''}</td>
                      <td>{fmtFecha(p.fecha_pesaje)} · {p.hora_pesaje}</td>
                      <td><strong>{p.litros_obtenidos} L</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Entregas Acopio */}
        <div className="card">
          <div className="card-header">
            <h3>Historial de Entregas (Colanta / Alquería)</h3>
            <span className="badge b-green">Calidad Tipo A</span>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Litros Totales</th>
                  <th>UFC/ml</th>
                  <th>Valor Bruto COP</th>
                </tr>
              </thead>
              <tbody>
                {(db.entregas || []).map(e => (
                  <tr key={e.id_entrega}>
                    <td>{fmtFecha(e.fecha_entrega)}</td>
                    <td><strong>{e.litros_totales} L</strong></td>
                    <td>
                      <span className={`badge ${e.recuento_ufc < 25000 ? 'b-green' : 'b-amber'}`}>
                        {e.recuento_ufc.toLocaleString()}
                      </span>
                    </td>
                    <td><strong>${(e.valor_bruto_est || 0).toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Pesaje */}
      {showPesajeModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Pesaje de Ordeño</h3>
            {errorMsg && (
              <div className="cinta-roja-alert-box" style={{ marginBottom: '1rem' }}>
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSavePesaje}>
              <div className="form-group">
                <label>Vaca en Ordeño</label>
                <select value={bovinoId} onChange={e => { setBovinoId(e.target.value); setErrorMsg(''); }} required>
                  {(db.bovinos || []).map(b => {
                    const ret = getRetiroPendiente(b.id_bovino);
                    return (
                      <option key={b.id_bovino} value={b.id_bovino}>
                        Arete #{b.tag} {b.name ? `· ${b.name}` : ''} {ret > 0 ? `[⛔ CINTA ROJA ${ret}d]` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={fechaPesaje} onChange={e => setFechaPesaje(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Turno / Hora</label>
                  <select value={horaPesaje} onChange={e => setHoraPesaje(e.target.value)}>
                    <option value="05:30">Mañana (05:30 AM)</option>
                    <option value="14:30">Tarde (02:30 PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Litros Producidos</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="40"
                  value={litros}
                  onChange={e => setLitros(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPesajeModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Confirmar Pesaje
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Entrega Acopio */}
      {showEntregaModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Entrega de Acopio a Planta</h3>
            <form onSubmit={handleSaveEntrega}>
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Entrega</label>
                  <input type="date" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Litros Totales Entregados</label>
                  <input
                    type="number"
                    value={litrosEntrega}
                    onChange={e => setLitrosEntrega(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Recuento Bacteriano (UFC/ml)</label>
                  <input
                    type="number"
                    value={ufcEntrega}
                    onChange={e => setUfcEntrega(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valor Bruto Estimado (COP)</label>
                  <input
                    type="number"
                    value={valorEntrega}
                    onChange={e => setValorEntrega(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEntregaModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar Entrega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
