import React from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';

export default function Sidebar() {
  const { activeTab, setActiveTab, esAdmin, db, setShowPrivacy } = useProGanado();

  const admin = esAdmin();
  const bovinosTotal = db.bovinos ? db.bovinos.length : 0;
  const enRetiro = db.bovinos ? db.bovinos.filter(b => {
    // Check if cow has active treatment
    const treatments = (db.tratamientos || []).filter(t => t.id_bovino === b.id_bovino);
    return treatments.length > 0;
  }).length : 0;

  const menu = [
    { id: 'inicio', label: 'Inicio', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'ganado', label: 'Ganado', icon: 'M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z', badge: bovinosTotal },
    { id: 'salud', label: 'Salud', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', badge: enRetiro > 0 ? `${enRetiro} retiro` : null, badgeClass: 'badge-cinta-roja' },
    { id: 'reproduccion', label: 'Reproducción', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'produccion', label: 'Producción', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'movimientos', label: 'Potreros PRV', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { id: 'contabilidad', label: 'Contabilidad', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  if (admin) {
    menu.push({ id: 'usuarios', label: 'Usuarios', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h2>ProGanado</h2>
          <p className="farm-name">Finca La Pradera</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menu.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            data-page={item.id}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span>{item.label}</span>
            {item.badge != null && (
              <span className={`badge ${item.badgeClass || ''}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sync-badge">
          <span className="dot online"></span>
          <span>SQLite Local · WAL</span>
        </div>
        <p className="version-info">
          ProGanado v4.2 ·{' '}
          <a
            href="#privacidad"
            onClick={e => { e.preventDefault(); setShowPrivacy(true); }}
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            Privacidad
          </a>
        </p>
      </div>
    </aside>
  );
}
