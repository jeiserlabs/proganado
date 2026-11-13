import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInitialDB, DB_KEY, seed, uid, hoy, diasAtras } from '../data/seedData.js';
import { calcularRetiroPendiente } from '../data/reglasRetiro.js';

const AUTH_KEY = 'proGanadoAuth_v2';
const ProGanadoContext = createContext(null);

export function ProGanadoProvider({ children }) {
  // DB State
  const [db, setDb] = useState(() => getInitialDB());
  
  // Auth State
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { usuarios: [], intentos: {} };
  });

  const [sesion, setSesion] = useState(() => {
    try {
      const raw = sessionStorage.getItem('proGanadoSesion') || localStorage.getItem('proGanadoSesion');
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.expira && Date.now() < s.expira) return s;
      }
    } catch (e) {}
    return null;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('inicio');

  // Active cow for detailed drawer / modal
  const [selectedCowId, setSelectedCowId] = useState(null);

  // Active photo modal
  const [lightboxFoto, setLightboxFoto] = useState(null);

  // Active Privacy Modal
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Active Change Password Modal
  const [passwordTarget, setPasswordTarget] = useState(null);

  // Persist DB changes
  useEffect(() => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [db]);

  // Persist Auth changes
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    } catch (e) {}
  }, [auth]);

  // Actions
  const login = (sesionData, recordar = false) => {
    try {
      sessionStorage.removeItem('proGanadoSesion');
      localStorage.removeItem('proGanadoSesion');
      const store = recordar ? localStorage : sessionStorage;
      store.setItem('proGanadoSesion', JSON.stringify(sesionData));
    } catch (e) {}
    setSesion(sesionData);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem('proGanadoSesion');
      localStorage.removeItem('proGanadoSesion');
      sessionStorage.removeItem('proGanadoCodigoLocal');
    } catch (e) {}
    setSesion(null);
  };

  const esAdmin = () => (sesion && sesion.role === 'admin');

  // Safe withdrawal days calculation for any animal
  const getRetiroPendiente = (bovinoId) => {
    if (!bovinoId || !db.tratamientos || !db.medicamentos) return 0;
    const tratamientosVaca = db.tratamientos
      .filter(t => t.id_bovino === bovinoId)
      .map(t => {
        const med = db.medicamentos.find(m => m.id_medicamento === t.id_medicamento);
        const dias = t.dias_retiro_ica != null 
          ? t.dias_retiro_ica 
          : (med ? (med.dias_retiro_ica || med.dias_retiro_leche_ica || 0) : 0);
        return dias > 0 ? { fecha_tratamiento: t.fecha_tratamiento, dias_retiro_ica: dias } : null;
      })
      .filter(Boolean);
    return calcularRetiroPendiente(tratamientosVaca);
  };

  // Add Bovino
  const addBovino = (bovinoData) => {
    setDb(prev => ({
      ...prev,
      bovinos: [bovinoData, ...prev.bovinos]
    }));
  };

  // Update Bovino
  const updateBovino = (id, updatedFields) => {
    setDb(prev => ({
      ...prev,
      bovinos: prev.bovinos.map(b => b.id_bovino === id ? { ...b, ...updatedFields } : b)
    }));
  };

  // Add Treatment
  const addTratamiento = (tratamiento) => {
    setDb(prev => ({
      ...prev,
      tratamientos: [tratamiento, ...prev.tratamientos]
    }));
  };

  // Add Milking (Pesaje) with strict fail-closed Cinta Roja check
  const addPesaje = (pesaje) => {
    const retiro = getRetiroPendiente(pesaje.id_bovino);
    if (retiro > 0) {
      const cow = db.bovinos.find(b => b.id_bovino === pesaje.id_bovino);
      const name = (cow ? (cow.name || ('Vaca ' + cow.tag)) : pesaje.id_bovino);
      throw new Error(`Leche bloqueada: ${name} está en cinta roja (${retiro} día(s) de retiro ICA). No se puede registrar para acopio.`);
    }
    setDb(prev => ({
      ...prev,
      pesajes: [pesaje, ...prev.pesajes]
    }));
  };

  // Add Delivery (Entrega acopio)
  const addEntrega = (entrega) => {
    setDb(prev => ({
      ...prev,
      entregas: [entrega, ...prev.entregas]
    }));
  };

  // Add Reproductive Event
  const addEvento = (evento) => {
    setDb(prev => {
      let updatedBovinos = prev.bovinos;
      if (evento.tipo_evento === 'Parto') {
        updatedBovinos = prev.bovinos.map(b => 
          b.id_bovino === evento.id_bovino && b.sexo === 'Hembra'
            ? { ...b, estado: 'En Ordeño' }
            : b
        );
      }
      return {
        ...prev,
        bovinos: updatedBovinos,
        eventos: [evento, ...prev.eventos]
      };
    });
  };

  // Add Potrero Movement
  const addMovimiento = (mov) => {
    setDb(prev => {
      const updatedPotreros = prev.potreros.map(p => {
        if (p.id_potrero === mov.id_potrero) {
          return {
            ...p,
            estado: mov.accion.startsWith('Entrada') ? 'Ocupado' : 'Descanso',
            desde: mov.fecha
          };
        }
        return p;
      });
      return {
        ...prev,
        potreros: updatedPotreros,
        movimientos: [mov, ...prev.movimientos]
      };
    });
  };

  // Add Accounting Item
  const addContabilidad = (item) => {
    setDb(prev => ({
      ...prev,
      contabilidad: [item, ...prev.contabilidad]
    }));
  };

  // Export CSV helper
  const exportarCSV = () => {
    const csvSeguro = v => {
      let s = String(v == null ? '' : v);
      if (/^[=+\-@]/.test(s)) s = "'" + s;
      return '"' + s.replaceAll('"', '""') + '"';
    };
    const rows = [
      ['Nombre', 'Arete', 'Raza', 'Sexo', 'Estado', 'Situación', 'Potrero', 'Lote', 'Nacimiento', 'Marca', 'Chip', 'Padre', 'Madre', 'Peso kg', 'Último parto', 'Partos', 'Parto esperado', 'Reproductor', 'Retiro dias restantes']
    ].concat(
      db.bovinos.map(b => {
        const rName = (db.razas.find(r => r.id_raza === b.id_raza) || {}).nombre_raza || '';
        const pName = (db.potreros.find(p => p.id_potrero === b.id_potrero) || {}).nombre_potrero || '';
        return [
          b.name || '', b.tag || '', rName, b.sexo, b.estado, b.situacion || '',
          pName, b.lote || '', b.birth, b.marca || '', b.chip || '',
          b.padre || '', b.madre || '', b.peso_kg || '', b.ultimo_parto || '',
          b.partos || 0, b.parto_esperado || '', b.reproductor || '',
          getRetiroPendiente(b.id_bovino)
        ];
      })
    );
    const blob = new Blob(['\ufeff' + rows.map(r => r.map(csvSeguro).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const link = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: 'proganado-inventario.csv'
    });
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 0);
  };

  const value = {
    db,
    setDb,
    auth,
    setAuth,
    sesion,
    login,
    logout,
    esAdmin,
    activeTab,
    setActiveTab,
    selectedCowId,
    setSelectedCowId,
    lightboxFoto,
    setLightboxFoto,
    showPrivacy,
    setShowPrivacy,
    passwordTarget,
    setPasswordTarget,
    getRetiroPendiente,
    addBovino,
    updateBovino,
    addTratamiento,
    addPesaje,
    addEntrega,
    addEvento,
    addMovimiento,
    addContabilidad,
    exportarCSV
  };

  return (
    <ProGanadoContext.Provider value={value}>
      {children}
    </ProGanadoContext.Provider>
  );
}

export function useProGanado() {
  const ctx = useContext(ProGanadoContext);
  if (!ctx) throw new Error('useProGanado must be used within a ProGanadoProvider');
  return ctx;
}
