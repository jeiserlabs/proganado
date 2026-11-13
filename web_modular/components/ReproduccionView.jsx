import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, hoy, uid, diasAtras } from '../data/seedData.js';

export default function ReproduccionView() {
  const { db, addEvento } = useProGanado();
  const [showModal, setShowModal] = useState(false);

  // New Event Form State
  const [bovinoId, setBovinoId] = useState(() => (db.bovinos && db.bovinos[0] ? db.bovinos[0].id_bovino : ''));
  const [tipo, setTipo] = useState('Inseminación');
  const [fecha, setFecha] = useState(hoy());
  const [nota, setNota] = useState('Pajilla toro élite');

  const handleSaveEvento = (e) => {
    e.preventDefault();
    const abiertos = ['Inseminación', 'Monta Natural'].includes(tipo) ? 30 : null;
    addEvento({
      id_evento: uid('ev'),
      id_bovino: bovinoId,
      tipo_evento: tipo,
      fecha_evento: fecha,
      dias_abiertos_calc: abiertos,
      nota: nota.trim()
    });
    setShowModal(false);
  };

  // Reproductive stats
  const totalEventos = (db.eventos || []).length;
  const inseminaciones = (db.eventos || []).filter(e => e.tipo_evento === 'Inseminación' || e.tipo_evento === 'Monta Natural').length;
  const diagnosticosPositivos = (db.eventos || []).filter(e => e.tipo_evento === 'Diagnóstico de Gestación').length;

  return (
    <div className="page-content">
      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Manejo Reproductivo y Días Abiertos</h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
            Seguimiento de celos, servicios, inseminaciones, confirmación de preñez y partos.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Registrar Evento Reproductivo
        </button>
      </div>

      <div className="kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Eventos Registrados</span>
            <span className="kpi-icon">🧬</span>
          </div>
          <div className="kpi-value">{totalEventos}</div>
          <div className="kpi-subtitle">Historial de fertilidad del hato</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Servicios / Inseminaciones</span>
            <span className="kpi-icon">💉</span>
          </div>
          <div className="kpi-value">{inseminaciones}</div>
          <div className="kpi-subtitle">IA y Monta controlada</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Gestaciones Confirmadas</span>
            <span className="kpi-icon">🌱</span>
          </div>
          <div className="kpi-value">{diagnosticosPositivos}</div>
          <div className="kpi-subtitle">Ecografía positiva activa</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Historial Reproductivo por Vaca</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Vaca / Arete</th>
                <th>Tipo de Evento</th>
                <th>Fecha del Evento</th>
                <th>Días Abiertos Estimados</th>
                <th>Observaciones / Semen</th>
              </tr>
            </thead>
            <tbody>
              {(db.eventos || []).map(e => {
                const cow = (db.bovinos || []).find(b => b.id_bovino === e.id_bovino);
                return (
                  <tr key={e.id_evento}>
                    <td><strong>#{cow ? cow.tag : '—'}</strong> {cow ? cow.name : ''}</td>
                    <td>
                      <span className={`badge ${e.tipo_evento === 'Parto' ? 'b-green' : e.tipo_evento === 'Diagnóstico de Gestación' ? 'b-amber' : 'b-blue'}`}>
                        {e.tipo_evento}
                      </span>
                    </td>
                    <td>{fmtFecha(e.fecha_evento)}</td>
                    <td>{e.dias_abiertos_calc != null ? `${e.dias_abiertos_calc} días` : '—'}</td>
                    <td>{e.nota || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Evento */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Evento Reproductivo</h3>
            <form onSubmit={handleSaveEvento}>
              <div className="form-group">
                <label>Hembra Bovina</label>
                <select value={bovinoId} onChange={e => setBovinoId(e.target.value)} required>
                  {(db.bovinos || []).filter(b => b.sexo === 'Hembra').map(b => (
                    <option key={b.id_bovino} value={b.id_bovino}>
                      Arete #{b.tag} {b.name ? `· ${b.name}` : ''} ({b.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Evento</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="Inseminación">Inseminación Artificial</option>
                    <option value="Monta Natural">Monta Natural</option>
                    <option value="Celo Observable">Celo Observable</option>
                    <option value="Diagnóstico de Gestación">Diagnóstico Gestación (Palpación/Eco)</option>
                    <option value="Parto">Parto</option>
                    <option value="Secado">Secado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Detalles / Toro o Pajilla / Veterinario</label>
                <input
                  type="text"
                  placeholder="Ej. Toro Titán (Registro ASOCEBU 12903)"
                  value={nota}
                  onChange={e => setNota(e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
