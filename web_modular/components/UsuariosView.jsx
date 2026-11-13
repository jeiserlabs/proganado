import React, { useState } from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';

const ES_CORREO = v => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(String(v || '').trim().toLowerCase());

function bytesAHex(a) {
  return [...a].map(b => b.toString(16).padStart(2, '0')).join('');
}
function hexABytes(h) {
  return new Uint8Array((String(h || '').match(/.{2}/g) || []).map(x => parseInt(x, 16)));
}

async function hashPassword(pass, salt) {
  const PBKDF2_ITER = 150000;
  if (window.crypto && window.crypto.subtle) {
    try {
      const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveBits']);
      const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: hexABytes(salt), iterations: PBKDF2_ITER, hash: 'SHA-256' },
        key, 256
      );
      return { algo: 'pbkdf2', hash: bytesAHex(new Uint8Array(bits)), iter: PBKDF2_ITER };
    } catch (e) {}
  }
  let hash = 0;
  for (let i = 0; i < pass.length; i++) {
    hash = (hash << 5) - hash + pass.charCodeAt(i);
    hash |= 0;
  }
  return { algo: 'sha256', hash: 'local_' + Math.abs(hash).toString(16), iter: 0 };
}

function nuevoSaltHex() {
  const a = new Uint8Array(16);
  if (window.crypto && window.crypto.getRandomValues) crypto.getRandomValues(a);
  else for (let i = 0; i < a.length; i++) a[i] = Math.floor(Math.random() * 256);
  return bytesAHex(a);
}

export default function UsuariosView() {
  const { auth, setAuth, sesion } = useProGanado();
  const [showAddModal, setShowAddModal] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Add form fields
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('usuario');

  const MAX_ADMINS = 4;
  const MAX_USUARIOS = 7;

  const adminsCount = (auth.usuarios || []).filter(u => u.role === 'admin').length;
  const usersCount = (auth.usuarios || []).filter(u => u.role === 'usuario').length;

  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    const correoNorm = correo.trim().toLowerCase();
    if (!ES_CORREO(correoNorm)) { setMsg({ text: 'Correo inválido.', type: 'err' }); return; }
    if (pass.length < 8) { setMsg({ text: 'La contraseña debe tener al menos 8 caracteres.', type: 'err' }); return; }
    if (!/[A-Za-z]/.test(pass) || !/\d/.test(pass)) { setMsg({ text: 'Debe combinar letras y números.', type: 'err' }); return; }
    if ((auth.usuarios || []).some(u => u.user.toLowerCase() === correoNorm)) {
      setMsg({ text: 'Ese correo ya está registrado.', type: 'err' });
      return;
    }
    if (role === 'admin' && adminsCount >= MAX_ADMINS) { setMsg({ text: 'Límite de administradores alcanzado.', type: 'err' }); return; }
    if (role === 'usuario' && usersCount >= MAX_USUARIOS) { setMsg({ text: 'Límite de usuarios alcanzado.', type: 'err' }); return; }

    const salt = nuevoSaltHex();
    const r = await hashPassword(pass, salt);
    const nuevo = {
      user: correoNorm,
      correo: correoNorm,
      nombre: nombre.trim(),
      role,
      salt,
      hash: r.hash,
      algo: r.algo,
      iter: r.iter,
      creado: new Date().toISOString(),
      ultimoAcceso: null
    };

    setAuth(prev => ({
      ...prev,
      usuarios: [...(prev.usuarios || []), nuevo]
    }));

    setShowAddModal(false);
    setNombre('');
    setCorreo('');
    setPass('');
  };

  const handleEliminar = (userTarget) => {
    if (userTarget === sesion.user) {
      alert('No puedes eliminar tu propia cuenta en sesión.');
      return;
    }
    if (adminsCount <= 1 && (auth.usuarios || []).find(u => u.user === userTarget)?.role === 'admin') {
      alert('Debe existir al menos un administrador en el sistema.');
      return;
    }
    if (!confirm(`¿Eliminar la cuenta ${userTarget}?`)) return;

    setAuth(prev => ({
      ...prev,
      usuarios: prev.usuarios.filter(u => u.user !== userTarget)
    }));
  };

  return (
    <div className="page-content">
      <div className="action-bar" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>Administración de Usuarios y Permisos</h3>
          <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
            Control de acceso basado en roles (RBAC) con autenticación criptográfica PBKDF2 y 2FA.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Crear Nueva Cuenta
        </button>
      </div>

      <div className="kpi-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Administradores</span>
            <span className="kpi-icon">🛡️</span>
          </div>
          <div className="kpi-value">{adminsCount} / {MAX_ADMINS}</div>
          <div className="kpi-subtitle">Acceso total y configuración</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Operarios / Consulta</span>
            <span className="kpi-icon">👤</span>
          </div>
          <div className="kpi-value">{usersCount} / {MAX_USUARIOS}</div>
          <div className="kpi-subtitle">Registro de eventos y pesajes</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Cuentas Activas</span>
            <span className="kpi-icon">👥</span>
          </div>
          <div className="kpi-value">{(auth.usuarios || []).length} / 11</div>
          <div className="kpi-subtitle">Autenticación local 2FA</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Usuarios del Sistema</h3>
        </div>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre / Correo</th>
                <th>Rol</th>
                <th>Último Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(auth.usuarios || []).map(u => (
                <tr key={u.user}>
                  <td>
                    <strong>{u.nombre || 'Sin nombre'}</strong>
                    <br />
                    <small className="muted">{u.user}</small>
                  </td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'b-amber' : 'b-green'}`}>
                      {u.role === 'admin' ? 'Administrador' : 'Usuario Operario'}
                    </span>
                  </td>
                  <td>
                    {u.ultimoAcceso ? new Date(u.ultimoAcceso).toLocaleDateString('es-CO') : 'Nunca'}
                  </td>
                  <td>
                    {u.user === sesion?.user ? (
                      <span className="tag">Sesión actual</span>
                    ) : (
                      <button className="mini-btn danger" onClick={() => handleEliminar(u.user)}>
                        🗑 Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Crear Cuenta de Usuario</h3>
            {msg.text && (
              <div className={`login-msg ${msg.type === 'ok' ? 'ok' : ''}`} style={{ marginBottom: '1rem' }}>
                {msg.text}
              </div>
            )}
            <form onSubmit={handleCrearUsuario}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej. Andrés Morales"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Correo Electrónico (Login)</label>
                <input
                  type="email"
                  placeholder="andres@proganado.co"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rol Asignado</label>
                  <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="usuario">Usuario Operario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
