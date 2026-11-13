import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, fmtFechaAnio } from '../data/seedData.js';

export default function GanadoView() {
  const { db, getRetiroPendiente, exportarCSV, selectedCowId, setSelectedCowId, updateBovino, addBovino } = useProGanado();
  const [filterState, setFilterState] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Cow state
  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newRaza, setNewRaza] = useState('raza_holstein');
  const [newSexo, setNewSexo] = useState('Hembra');
  const [newEstado, setNewEstado] = useState('En Ordeño');
  const [newPotrero, setNewPotrero] = useState('pot_norte');
  const [newBirth, setNewBirth] = useState('2022-01-15');

  // Filter list
  const list = (db.bovinos || []).filter(b => {
    const matchState = filterState === 'Todos' || b.estado === filterState;
    const q = searchQuery.toLowerCase();
    const matchQuery = !q || (String(b.name || '') + ' ' + String(b.tag || '')).toLowerCase().includes(q);
    return matchState && matchQuery;
  });

  const selectedCow = selectedCowId ? db.bovinos.find(b => b.id_bovino === selectedCowId) : null;

  const handleSaveCow = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const tag = newTag.trim();
    const newCow = {
      id_bovino: 'bov_' + tag,
      name: newName.trim(),
      tag: tag,
      id_raza: newRaza,
      sexo: newSexo,
      estado: newEstado,
      id_potrero: newPotrero,
      birth: newBirth,
      marca: 'LP',
      foto: 'assets/ganado/vaca_' + tag + '.jpg',
      lote: 'Lote 1',
      situacion: 'Activo',
      procedencia: 'Finca La Pradera',
      padre: '',
      madre: '',
      ultimo_parto: '',
      servicios: 0,
      partos: 0,
      peso_kg: '450',
      peso_fecha: newBirth
    };
    addBovino(newCow);
    setShowAddModal(false);
    setNewTag('');
    setNewName('');
  };

  return (
    <div className="page-content">
      {/* Action Bar */}
      <div className="action-bar">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por arete, nombre o número..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {['Todos', 'En Ordeño', 'Horra Seca', 'Novilla Vientre', 'Ternero', 'Ternera', 'Toro'].map(st => (
            <button
              key={st}
              className={`filter-btn ${filterState === st ? 'active' : ''}`}
              onClick={() => setFilterState(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="button-group">
          <button className="btn-secondary" onClick={exportarCSV} title="Descargar inventario CSV seguro">
            ⬇ Exportar CSV
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            + Nuevo Bovino
          </button>
        </div>
      </div>

      {/* Main Grid: Table + Detail Drawer */}
      <div className="bovinos-layout">
        <div className="table-responsive" style={{ flex: 1 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Arete / ID</th>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Sexo</th>
                <th>Estado</th>
                <th>Potrero</th>
                <th>Cinta Roja</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {list.map(b => {
                const retiro = getRetiroPendiente(b.id_bovino);
                const razaName = (db.razas.find(r => r.id_raza === b.id_raza) || {}).nombre_raza || 'Brahman';
                const potreroName = (db.potreros.find(p => p.id_potrero === b.id_potrero) || {}).nombre_potrero || 'Norte';
                return (
                  <tr
                    key={b.id_bovino}
                    className={selectedCowId === b.id_bovino ? 'selected-row' : ''}
                    onClick={() => setSelectedCowId(b.id_bovino)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <img
                        src={b.foto}
                        alt={`Vaca ${b.tag}`}
                        className="cow-avatar"
                        onError={e => { e.target.src = 'assets/ganado/vaca_452.jpg'; }}
                      />
                    </td>
                    <td><strong className="tag-number">#{b.tag}</strong></td>
                    <td>{b.name || <span className="muted">Sin nombre</span>}</td>
                    <td>{razaName}</td>
                    <td>{b.sexo}</td>
                    <td>
                      <span className={`badge ${b.estado === 'En Ordeño' ? 'b-green' : 'b-amber'}`}>
                        {b.estado}
                      </span>
                    </td>
                    <td>{potreroName}</td>
                    <td>
                      {retiro > 0 ? (
                        <span className="badge-cinta-roja">
                          ⛔ {retiro}d ICA
                        </span>
                      ) : (
                        <span className="badge b-green">Libre</span>
                      )}
                    </td>
                    <td>
                      <button className="mini-btn" onClick={(e) => { e.stopPropagation(); setSelectedCowId(b.id_bovino); }}>
                        Ver Ficha
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cow Detail Panel */}
        {selectedCow && (
          <aside className="cow-drawer">
            <div className="drawer-header">
              <h3>Ficha Técnica Bovino</h3>
              <button className="close-btn" onClick={() => setSelectedCowId(null)}>✕</button>
            </div>
            <div className="drawer-body">
              <div className="cow-profile-header">
                <img
                  src={selectedCow.foto}
                  alt={selectedCow.tag}
                  className="drawer-foto"
                  onError={e => { e.target.src = 'assets/ganado/vaca_452.jpg'; }}
                />
                <div>
                  <h4>{selectedCow.name || `Vaca #${selectedCow.tag}`}</h4>
                  <p className="tag-badge">Arete ICA: {selectedCow.tag}</p>
                </div>
              </div>

              {getRetiroPendiente(selectedCow.id_bovino) > 0 && (
                <div className="cinta-roja-alert-box">
                  <strong>⛔ ANIMAL EN RETIRO ICA (CINTA ROJA)</strong>
                  <p>Restan {getRetiroPendiente(selectedCow.id_bovino)} días de retención obligatoria. Leche bloqueada para entrega.</p>
                </div>
              )}

              <div className="cow-details-grid">
                <div><strong>Raza:</strong> {(db.razas.find(r => r.id_raza === selectedCow.id_raza) || {}).nombre_raza}</div>
                <div><strong>Sexo:</strong> {selectedCow.sexo}</div>
                <div><strong>Estado:</strong> {selectedCow.estado}</div>
                <div><strong>Nacimiento:</strong> {fmtFechaAnio(selectedCow.birth)}</div>
                <div><strong>Potrero:</strong> {(db.potreros.find(p => p.id_potrero === selectedCow.id_potrero) || {}).nombre_potrero}</div>
                <div><strong>Lote:</strong> {selectedCow.lote || 'Lote 1'}</div>
                <div><strong>Partos:</strong> {selectedCow.partos || 0}</div>
                <div><strong>Peso:</strong> {selectedCow.peso_kg ? `${selectedCow.peso_kg} kg` : '460 kg'}</div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Modal Add Cow */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Registrar Nuevo Bovino al Hato</h3>
            <form onSubmit={handleSaveCow}>
              <div className="form-group">
                <label>Número de Arete (Único)</label>
                <input
                  type="text"
                  placeholder="Ej. 1850"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre del Animal (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Manzanilla"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Raza</label>
                  <select value={newRaza} onChange={e => setNewRaza(e.target.value)}>
                    {(db.razas || []).map(r => (
                      <option key={r.id_raza} value={r.id_raza}>{r.nombre_raza}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sexo</label>
                  <select value={newSexo} onChange={e => setNewSexo(e.target.value)}>
                    <option value="Hembra">Hembra</option>
                    <option value="Macho">Macho</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Estado Productivo</label>
                  <select value={newEstado} onChange={e => setNewEstado(e.target.value)}>
                    <option value="En Ordeño">En Ordeño</option>
                    <option value="Horra Seca">Horra Seca</option>
                    <option value="Novilla Vientre">Novilla Vientre</option>
                    <option value="Ternero">Ternero</option>
                    <option value="Ternera">Ternera</option>
                    <option value="Toro">Toro</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Potrero Inicial</label>
                  <select value={newPotrero} onChange={e => setNewPotrero(e.target.value)}>
                    {(db.potreros || []).map(p => (
                      <option key={p.id_potrero} value={p.id_potrero}>{p.nombre_potrero}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={newBirth}
                  onChange={e => setNewBirth(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar Bovino
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
