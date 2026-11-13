import React from 'react';
import { useProGanado } from './context/ProGanadoContext.jsx';
import LoginView from './components/LoginView.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import InicioView from './components/InicioView.jsx';
import GanadoView from './components/GanadoView.jsx';
import SaludView from './components/SaludView.jsx';
import ProduccionView from './components/ProduccionView.jsx';
import ReproduccionView from './components/ReproduccionView.jsx';
import PotrerosView from './components/PotrerosView.jsx';
import ContabilidadView from './components/ContabilidadView.jsx';
import UsuariosView from './components/UsuariosView.jsx';
import Modals from './components/Modals.jsx';
import './proganado.css';

export default function App() {
  const { sesion, activeTab } = useProGanado();

  if (!sesion) {
    return (
      <div className="login-screen-wrapper">
        <LoginView />
        <Modals />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-body">
          {activeTab === 'inicio' && <InicioView />}
          {activeTab === 'ganado' && <GanadoView />}
          {activeTab === 'salud' && <SaludView />}
          {activeTab === 'produccion' && <ProduccionView />}
          {activeTab === 'reproduccion' && <ReproduccionView />}
          {activeTab === 'movimientos' && <PotrerosView />}
          {activeTab === 'contabilidad' && <ContabilidadView />}
          {activeTab === 'usuarios' && <UsuariosView />}
        </main>
      </div>
      <Modals />
    </div>
  );
}
