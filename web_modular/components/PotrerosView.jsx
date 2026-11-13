import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, hoy, uid } from '../data/seedData.js';

export default function PotrerosView() {
  const { db, addMovimiento } = useProGanado();
  const [showModal, setShowModal] = useState(false);

  // New Movement Form
  const [potreroId, setPotreroId] = useState(() => (db.potreros && db.potreros[0] ? db.potreros[0].id_potrero : ''));
  const [accion, setAccion] = useState('Entrada');
  const [fecha, setFecha] = useState(hoy());
  const [cantidad, setCantidad] = useState('8');

  const handleSaveMovement = (e) => {
    e.preventDefault();
    addMovimiento({
      id_mov: uid('mov'),
      id_potrero: potreroId,
      accion: accion,
      fecha: fecha,
      cantidad: Number(cantidad)
    });
    setShowModal(false);
  };

  return (
    <div className="page-content">
      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Pastoreo Racional Voisin (PRV)</h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
            Manejo rotacional de praderas para máxima biomasa, cero degradación de suelos y descanso fisiológico.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Registrar Movimiento de Lote
        </button>
      </div>

      {/* Potreros Status Cards */}
      <div className="kpi-grid" style={{ marginBottom: '1.5rem' }}>
        {(db.potreros || []).map(p => {
          const isOcupado = p.estado === 'Ocupado';
          return (
            <div key={p.id_potrero} className={`kpi-card ${isOcupado ? 'kpi-alert' : ''}`}>
              <div className="kpi-header">
                <span className="kpi-title">{p.nombre_potrero}</span>
                <span className="kpi-icon">{isOcupado ? '🐄' : '🌿'}</span>
              </div>
              <div className="kpi-value">
                <span className={`badge ${isOcupado ? 'b-amber' : 'b-green'}`}>
                  {p.estado}
                </span>
              </div>
              <div className="kpi-subtitle">
                Ocupación: {p.dias_ocupacion} días · Descanso: {p.dias_descanso_prv} días
                {p.desde && ` · Desde: ${fmtFecha(p.desde)}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Movements Table */}
      <div className="card">
        <div className="card-header">
          <h3>Historial de Movimientos de Potrero</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Potrero</th>
                <th>Acción</th>
                <th>Fecha</th>
                <th>Cantidad de Animales</th>
              </tr>
            </thead>
            <tbody>
              {(db.movimientos || []).map(m => {
                const p = (db.potreros || []).find(x => x.id_potrero === m.id_potrero);
                return (
                  <tr key={m.id_mov}>
                    <td><strong>{p ? p.nombre_potrero : 'Potrero'}</strong></td>
                    <td>
                      <span className={`badge ${m.accion.startsWith('Entrada') ? 'b-green' : 'b-amber'}`}>
                        {m.accion}
                      </span>
                    </td>
                    <td>{fmtFecha(m.fecha)}</td>
                    <td><strong>{m.cantidad} bovinos</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Movement */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Movimiento de Potrero</h3>
            <form onSubmit={handleSaveMovement}>
              <div className="form-group">
                <label>Potrero Destino</label>
                <select value={potreroId} onChange={e => setPotreroId(e.target.value)} required>
                  {(db.potreros || []).map(p => (
                    <option key={p.id_potrero} value={p.id_potrero}>
                      {p.nombre_potrero} ({p.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Acción</label>
                  <select value={accion} onChange={e => setAccion(e.target.value)}>
                    <option value="Entrada">Entrada al potrero (Inicio pastoreo)</option>
                    <option value="Salida">Salida del potrero (Pasa a descanso)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha del Movimiento</label>
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Número de Animales Movilizados</label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={cantidad}
                  onChange={e => setCantidad(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Confirmar Rotación PRV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
