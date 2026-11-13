import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, hoy, uid } from '../data/seedData.js';
import { calcularFinRetiro } from '../data/reglasRetiro.js';

export default function SaludView() {
  const { db, addTratamiento, getRetiroPendiente } = useProGanado();
  const [showAddModal, setShowAddModal] = useState(false);

  // New treatment fields
  const [bovinoId, setBovinoId] = useState(() => (db.bovinos && db.bovinos[0] ? db.bovinos[0].id_bovino : ''));
  const [medId, setMedId] = useState(() => (db.medicamentos && db.medicamentos[0] ? db.medicamentos[0].id_medicamento : ''));
  const [fecha, setFecha] = useState(hoy());
  const [dosis, setDosis] = useState('20 ml');
  const [via, setVia] = useState('Intramuscular');
  const [diagnostico, setDiagnostico] = useState('Mastitis clínica');
  const [veterinario, setVeterinario] = useState('Dr. Carlos Gómez (TP 18921)');

  const selectedMed = db.medicamentos ? db.medicamentos.find(m => m.id_medicamento === medId) : null;

  const handleSaveTreatment = (e) => {
    e.preventDefault();
    if (!bovinoId || !medId) return;

    const med = db.medicamentos.find(m => m.id_medicamento === medId);
    const diasRetiro = med ? (med.dias_retiro_leche_ica || 0) : 0;

    const nuevoTratamiento = {
      id_tratamiento: uid('trat'),
      id_bovino: bovinoId,
      id_medicamento: medId,
      fecha_tratamiento: fecha,
      dosis_aplicada: dosis,
      via_administracion: via,
      diagnostico: diagnostico,
      veterinario_responsable: veterinario,
      dias_retiro_ica: diasRetiro
    };

    addTratamiento(nuevoTratamiento);
    setShowAddModal(false);
  };

  return (
    <div className="page-content">
      {/* Banner explicativo Cinta Roja */}
      <div className="card ribbon-banner" style={{ borderLeft: '4px solid #ef4444', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>⛔</div>
          <div>
            <h3 style={{ margin: 0, color: '#ef4444' }}>Cinta Roja y Residuos ICA (Inocuidad Alimentaria)</h3>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>
              Todo animal tratado con antimicrobianos o antiparasitarios entra en bloqueo estricto (fail-closed).
              La leche producida durante el periodo de retiro está vetada para entrega a acopio (Resolución ICA 067449).
            </p>
          </div>
        </div>
      </div>

      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <h3>Historial de Tratamientos Sanitarios</h3>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Registrar Tratamiento Sanitario
        </button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vaca / Arete</th>
              <th>Fecha Aplicación</th>
              <th>Medicamento (ICA)</th>
              <th>Diagnóstico</th>
              <th>Dosis / Vía</th>
              <th>Vencimiento Retiro</th>
              <th>Estado Inocuidad</th>
            </tr>
          </thead>
          <tbody>
            {(db.tratamientos || []).map(t => {
              const cow = (db.bovinos || []).find(b => b.id_bovino === t.id_bovino);
              const med = (db.medicamentos || []).find(m => m.id_medicamento === t.id_medicamento);
              const fin = calcularFinRetiro(t.fecha_tratamiento, t.dias_retiro_ica);
              const diasRestantes = getRetiroPendiente(t.id_bovino);

              return (
                <tr key={t.id_tratamiento}>
                  <td>
                    <strong>#{cow ? cow.tag : '—'}</strong> {cow ? cow.name : ''}
                  </td>
                  <td>{fmtFecha(t.fecha_tratamiento)}</td>
                  <td>
                    <strong>{med ? med.nombre_comercial : 'Medicamento'}</strong>
                    <br />
                    <small className="muted">ICA: {med ? med.registro_ica : '—'}</small>
                  </td>
                  <td>{t.diagnostico}</td>
                  <td>{t.dosis_aplicada} · {t.via_administracion}</td>
                  <td><strong>{fmtFecha(fin)}</strong></td>
                  <td>
                    {diasRestantes > 0 ? (
                      <span className="badge-cinta-roja">
                        ⛔ BLOQUEADO ({diasRestantes}d)
                      </span>
                    ) : (
                      <span className="badge b-green">✓ Retiro Cumplido</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Medicamentos Catalog Card */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h3>Vademécum de Finca (Medicamentos con Registro ICA)</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre Comercial</th>
                <th>Principio Activo</th>
                <th>Registro ICA</th>
                <th>Días Retiro Leche</th>
                <th>Días Retiro Carne</th>
              </tr>
            </thead>
            <tbody>
              {(db.medicamentos || []).map(m => (
                <tr key={m.id_medicamento}>
                  <td><strong>{m.nombre_comercial}</strong></td>
                  <td>{m.principio_activo}</td>
                  <td>{m.registro_ica}</td>
                  <td>
                    <span className="badge b-amber" style={{ fontWeight: 'bold' }}>
                      {m.dias_retiro_leche_ica} días
                    </span>
                  </td>
                  <td>{m.dias_retiro_carne_ica} días</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Treatment */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Tratamiento Veterinario</h3>
            <form onSubmit={handleSaveTreatment}>
              <div className="form-group">
                <label>Seleccionar Bovino (Arete / Nombre)</label>
                <select value={bovinoId} onChange={e => setBovinoId(e.target.value)} required>
                  {(db.bovinos || []).map(b => (
                    <option key={b.id_bovino} value={b.id_bovino}>
                      Arete #{b.tag} {b.name ? `· ${b.name}` : ''} ({b.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Medicamento a Administrar</label>
                <select value={medId} onChange={e => setMedId(e.target.value)} required>
                  {(db.medicamentos || []).map(m => (
                    <option key={m.id_medicamento} value={m.id_medicamento}>
                      {m.nombre_comercial} ({m.principio_activo} · Retiro: {m.dias_retiro_leche_ica} días)
                    </option>
                  ))}
                </select>
              </div>

              {selectedMed && selectedMed.dias_retiro_leche_ica > 0 && (
                <div className="cinta-roja-alert-box" style={{ marginBottom: '1rem' }}>
                  ⚠️ Este fármaco activará <strong>Cinta Roja durante {selectedMed.dias_retiro_leche_ica} días</strong>.
                  La vaca no podrá ser ordeñada para entrega comercial durante este periodo.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Aplicación</label>
                  <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Dosis</label>
                  <input type="text" value={dosis} onChange={e => setDosis(e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vía de Administración</label>
                  <select value={via} onChange={e => setVia(e.target.value)}>
                    <option value="Intramuscular">Intramuscular</option>
                    <option value="Subcutánea">Subcutánea</option>
                    <option value="Intramamaria">Intramamaria</option>
                    <option value="Intravenosa">Intravenosa</option>
                    <option value="Oral">Oral</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Diagnóstico</label>
                  <input type="text" value={diagnostico} onChange={e => setDiagnostico(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label>Veterinario Responsable / Tarjeta Profesional</label>
                <input type="text" value={veterinario} onChange={e => setVeterinario(e.target.value)} required />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Aplicar Tratamiento y Activar Cinta Roja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
