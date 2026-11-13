import React from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';
import { fmtFecha, fmtFechaAnio } from '../data/seedData.js';

export default function InicioView() {
  const { db, setActiveTab, getRetiroPendiente, setSelectedCowId, setLightboxFoto } = useProGanado();

  const totalBovinos = db.bovinos ? db.bovinos.length : 0;
  const enOrdeño = db.bovinos ? db.bovinos.filter(b => b.estado === 'En Ordeño').length : 0;
  const enRetiro = db.bovinos ? db.bovinos.filter(b => getRetiroPendiente(b.id_bovino) > 0).length : 0;

  // Recent milk production
  const pesajesHoy = db.pesajes ? db.pesajes.slice(0, 8) : [];
  const litrosPromedio = 12.8;

  // Composition for donut
  const hembras = db.bovinos ? db.bovinos.filter(b => b.sexo === 'Hembra' && !String(b.estado || '').includes('Tern')).length : 0;
  const machos = db.bovinos ? db.bovinos.filter(b => b.sexo === 'Macho' && !String(b.estado || '').includes('Tern')).length : 0;
  const crias = db.bovinos ? db.bovinos.filter(b => String(b.estado || '').includes('Tern')).length : 0;

  // Gallery of cows
  const sampleCows = db.bovinos ? db.bovinos.slice(0, 12) : [];

  return (
    <div className="page-content">
      {/* Hero Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="hero-badge">
            <span className="dot online"></span>
            Hato Lechero Tropical · Modelo Relacional v4.0
          </div>
          <h2>Bienvenido al Sistema de Gestión ProGanado</h2>
          <p>
            Control biológico estricto de hato, sanidad con cinta roja ICA fail-closed,
            rotación racional Voisin y acopio lechero trazable.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card" onClick={() => setActiveTab('ganado')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span className="kpi-title">Total Hato Activo</span>
            <span className="kpi-icon">🐄</span>
          </div>
          <div className="kpi-value">{totalBovinos}</div>
          <div className="kpi-subtitle">100% aretados con foto y trazabilidad</div>
        </div>

        <div className="kpi-card" onClick={() => setActiveTab('produccion')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span className="kpi-title">Vacas en Ordeño</span>
            <span className="kpi-icon">🥛</span>
          </div>
          <div className="kpi-value">{enOrdeño}</div>
          <div className="kpi-subtitle">Promedio actual: {litrosPromedio} L/vaca/día</div>
        </div>

        <div className={`kpi-card ${enRetiro > 0 ? 'kpi-alert' : ''}`} onClick={() => setActiveTab('salud')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span className="kpi-title">Cinta Roja ICA</span>
            <span className="kpi-icon">⛔</span>
          </div>
          <div className="kpi-value">{enRetiro}</div>
          <div className="kpi-subtitle">
            {enRetiro > 0 ? 'Animales en retiro · Leche bloqueada' : 'Cero animales en retiro'}
          </div>
        </div>

        <div className="kpi-card" onClick={() => setActiveTab('movimientos')} style={{ cursor: 'pointer' }}>
          <div className="kpi-header">
            <span className="kpi-title">Potreros PRV</span>
            <span className="kpi-icon">🌱</span>
          </div>
          <div className="kpi-value">{db.potreros ? db.potreros.length : 3}</div>
          <div className="kpi-subtitle">Rotación Voisin: 35 días descanso</div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid-2-col">
        {/* Acopio summary */}
        <div className="card">
          <div className="card-header">
            <h3>Últimas Entregas de Acopio (Colanta)</h3>
            <button className="btn-secondary" onClick={() => setActiveTab('produccion')}>Ver todo</button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Litros</th>
                  <th>UFC/ml</th>
                  <th>Valor Est.</th>
                </tr>
              </thead>
              <tbody>
                {(db.entregas || []).slice(0, 4).map(e => (
                  <tr key={e.id_entrega}>
                    <td>{fmtFecha(e.fecha_entrega)}</td>
                    <td><strong>{e.litros_totales} L</strong></td>
                    <td><span className="badge b-green">{e.recuento_ufc.toLocaleString()}</span></td>
                    <td>${(e.valor_bruto_est || 0).toLocaleString()} COP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Composition Hato */}
        <div className="card">
          <div className="card-header">
            <h3>Composición del Hato</h3>
            <span className="badge">{totalBovinos} cabezas</span>
          </div>
          <div className="composition-list">
            <div className="comp-item">
              <span className="comp-label">Hembras Adultas / Ordeño</span>
              <span className="comp-bar-container">
                <span className="comp-bar" style={{ width: `${(hembras / (totalBovinos || 1)) * 100}%`, background: '#059669' }}></span>
              </span>
              <span className="comp-count">{hembras} ({Math.round((hembras / (totalBovinos || 1)) * 100)}%)</span>
            </div>
            <div className="comp-item">
              <span className="comp-label">Crías y Terneros</span>
              <span className="comp-bar-container">
                <span className="comp-bar" style={{ width: `${(crias / (totalBovinos || 1)) * 100}%`, background: '#d97706' }}></span>
              </span>
              <span className="comp-count">{crias} ({Math.round((crias / (totalBovinos || 1)) * 100)}%)</span>
            </div>
            <div className="comp-item">
              <span className="comp-label">Toros / Reproductores</span>
              <span className="comp-bar-container">
                <span className="comp-bar" style={{ width: `${(machos / (totalBovinos || 1)) * 100}%`, background: '#2563eb' }}></span>
              </span>
              <span className="comp-count">{machos} ({Math.round((machos / (totalBovinos || 1)) * 100)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual strip of cows */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3>Galería de Ganado Fotografiado (116 cabezas)</h3>
          <button className="btn-secondary" onClick={() => setActiveTab('ganado')}>Ver inventario completo →</button>
        </div>
        <div className="cow-strip">
          {sampleCows.map(cow => (
            <div
              key={cow.id_bovino}
              className="cow-thumbnail"
              onClick={() => {
                setSelectedCowId(cow.id_bovino);
                setActiveTab('ganado');
              }}
              title={`Arete ${cow.tag} · ${cow.name || 'Sin nombre'}`}
            >
              <img
                src={cow.foto}
                alt={`Vaca ${cow.tag}`}
                onError={(e) => { e.target.src = 'assets/ganado/vaca_452.jpg'; }}
              />
              <span className="cow-tag">#{cow.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
