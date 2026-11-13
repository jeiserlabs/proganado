import React from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';

export default function Header() {
  const { sesion, logout, esAdmin, activeTab } = useProGanado();

  const titleMap = {
    inicio: 'Panel de control',
    ganado: 'Inventario de Ganado',
    salud: 'Sanidad y Cinta Roja (ICA)',
    reproduccion: 'Eventos Reproductivos',
    produccion: 'Ordeño y Control Lechero',
    movimientos: 'Rotación de Potreros (PRV)',
    contabilidad: 'Caja y Contabilidad Ganadera',
    usuarios: 'Gestión de Usuarios y Accesos'
  };

  const nombre = (sesion && (sesion.nombre || sesion.user)) || 'Usuario';
  const iniciales = nombre.split(/\s+/).map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'US';
  const admin = esAdmin();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 id="pageTitle">{titleMap[activeTab] || 'Panel de control'}</h1>
      </div>
      <div className="topbar-right">
        <div className="farm-selector">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11" />
          </svg>
          <span>Finca La Pradera</span>
        </div>

        <div className="user-profile">
          <div className={`user-avatar ${admin ? 'es-admin' : ''}`} title={`${nombre} (${admin ? 'Admin' : 'Operario'})`}>
            {iniciales}
          </div>
          <div className="user-info">
            <span className="user-name">{nombre}</span>
            <span className="user-role">{admin ? 'Administrador' : 'Operario'}</span>
          </div>
          <button className="btn-logout" onClick={logout} title="Cerrar sesión">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
