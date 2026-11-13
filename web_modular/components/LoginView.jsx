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

export default function LoginView() {
  const { auth, setAuth, login, setShowPrivacy } = useProGanado();
  const [step, setStep] = useState(() => (auth && auth.usuarios && auth.usuarios.length === 0 ? 'config' : 'credenciales'));
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Form fields
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [codigo, setCodigo] = useState('');

  // Setup fields
  const [setupName, setSetupName] = useState('');
  const [setupUser, setSetupUser] = useState('');
  const [setupPass, setSetupPass] = useState('');
  const [setupPass2, setSetupPass2] = useState('');

  // 2FA pending
  const [pendiente, setPendiente] = useState(null);
  const [testCode, setTestCode] = useState(null);

  const handleCrearAdmin = async (e) => {
    e.preventDefault();
    if (!setupName.trim()) { setMsg({ text: 'Escribe el nombre del administrador.', type: 'err' }); return; }
    if (!ES_CORREO(setupUser)) { setMsg({ text: 'Escribe un correo válido.', type: 'err' }); return; }
    if (setupPass.length < 8) { setMsg({ text: 'La contraseña debe tener al menos 8 caracteres.', type: 'err' }); return; }
    if (!/[A-Za-z]/.test(setupPass) || !/\d/.test(setupPass)) { setMsg({ text: 'Debe combinar letras y números.', type: 'err' }); return; }
    if (setupPass !== setupPass2) { setMsg({ text: 'Las contraseñas no coinciden.', type: 'err' }); return; }

    setLoading(true);
    const salt = nuevoSaltHex();
    const r = await hashPassword(setupPass, salt);
    const nuevoAdmin = {
      user: setupUser.trim().toLowerCase(),
      correo: setupUser.trim().toLowerCase(),
      nombre: setupName.trim(),
      role: 'admin',
      salt,
      hash: r.hash,
      algo: r.algo,
      iter: r.iter,
      creado: new Date().toISOString(),
      ultimoAcceso: null
    };

    setAuth(prev => ({
      ...prev,
      usuarios: [nuevoAdmin]
    }));

    // Pass to 2FA
    const fakeCode = String(100000 + Math.floor(Math.random() * 900000));
    sessionStorage.setItem('proGanadoCodigoLocal', JSON.stringify({
      correo: nuevoAdmin.correo,
      codigo: fakeCode,
      exp: Date.now() + 5 * 60000,
      intentos: 0
    }));

    setPendiente({ correo: nuevoAdmin.correo, nombre: nuevoAdmin.nombre, role: nuevoAdmin.role });
    setTestCode(fakeCode);
    setStep('codigo');
    setLoading(false);
    setMsg({ text: 'Cuenta creada. Ingresa el código de 6 dígitos enviado a tu correo.', type: 'ok' });
  };

  const handleCredenciales = async (e) => {
    e.preventDefault();
    const correoNorm = user.trim().toLowerCase();
    if (!ES_CORREO(correoNorm)) { setMsg({ text: 'Escribe tu correo completo (ej. admin@proganado.co).', type: 'err' }); return; }
    if (!pass.trim()) { setMsg({ text: 'Escribe tu contraseña.', type: 'err' }); return; }

    setLoading(true);
    const u = auth.usuarios ? auth.usuarios.find(x => x.user.toLowerCase() === correoNorm) : null;
    if (!u) {
      setLoading(false);
      setMsg({ text: 'Correo o contraseña incorrectos.', type: 'err' });
      return;
    }

    // Direct check (supports pbkdf2 and sha256)
    const salt = u.salt || '';
    const hashed = await hashPassword(pass, salt);
    const match = hashed.hash === u.hash;

    if (!match) {
      setLoading(false);
      setMsg({ text: 'Correo o contraseña incorrectos.', type: 'err' });
      return;
    }

    const fakeCode = String(100000 + Math.floor(Math.random() * 900000));
    sessionStorage.setItem('proGanadoCodigoLocal', JSON.stringify({
      correo: u.correo,
      codigo: fakeCode,
      exp: Date.now() + 5 * 60000,
      intentos: 0
    }));

    setPendiente({ correo: u.correo, nombre: u.nombre, role: u.role });
    setTestCode(fakeCode);
    setStep('codigo');
    setLoading(false);
    setMsg({ text: '', type: '' });
  };

  const handleValidarCodigo = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(codigo.trim())) {
      setMsg({ text: 'El código debe tener 6 dígitos.', type: 'err' });
      return;
    }

    setLoading(true);
    let valid = false;
    try {
      const stored = JSON.parse(sessionStorage.getItem('proGanadoCodigoLocal'));
      if (stored && stored.codigo === codigo.trim() && Date.now() <= stored.exp) {
        valid = true;
      }
    } catch (e) {}

    if (!valid && codigo.trim() !== testCode) {
      setLoading(false);
      setMsg({ text: 'Código incorrecto o expirado.', type: 'err' });
      return;
    }

    const sesionData = {
      user: pendiente.correo,
      nombre: pendiente.nombre,
      role: pendiente.role,
      ts: Date.now(),
      expira: Date.now() + 7 * 86400000
    };

    login(sesionData, recordar);
  };

  return (
    <div id="loginView" style={{ display: 'flex' }}>
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1>ProGanado</h1>
            <p>Gestión ganadera integral</p>
          </div>
        </div>

        <div className="login-form">
          <h2>{step === 'config' ? 'Primer Acceso' : step === 'credenciales' ? 'Iniciar Sesión' : 'Verificación 2FA'}</h2>
          <p>
            {step === 'config' && 'Primer uso: crea la cuenta administradora de la finca.'}
            {step === 'credenciales' && 'Ingresa tus credenciales para entrar al sistema.'}
            {step === 'codigo' && `Enviamos un código de 6 dígitos a ${pendiente ? pendiente.correo : ''}.`}
          </p>

          {msg.text && (
            <div className={`login-msg ${msg.type === 'ok' ? 'ok' : ''}`}>
              {msg.text}
            </div>
          )}

          {step === 'config' && (
            <form onSubmit={handleCrearAdmin} id="formLogin">
              <div className="form-group">
                <label>Nombre del Administrador</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={setupName}
                  onChange={e => setSetupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo Electrónico (Usuario)</label>
                <input
                  type="email"
                  placeholder="admin@proganado.co"
                  value={setupUser}
                  onChange={e => setSetupUser(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres (letras y números)"
                  value={setupPass}
                  onChange={e => setSetupPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="Repite la contraseña"
                  value={setupPass2}
                  onChange={e => setSetupPass2(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                {loading ? 'Creando cuenta…' : 'Crear cuenta de administrador'}
              </button>
            </form>
          )}

          {step === 'credenciales' && (
            <form onSubmit={handleCredenciales}>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="admin@proganado.co"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Tu contraseña"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  required
                />
              </div>
              <div className="form-row" style={{ alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={recordar}
                    onChange={e => setRecordar(e.target.checked)}
                  />
                  Recordar sesión por 7 días
                </label>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Verificando…' : 'Entrar'}
              </button>
              {auth.usuarios && auth.usuarios.length === 0 && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  onClick={() => setStep('config')}
                >
                  Configurar primer administrador
                </button>
              )}
            </form>
          )}

          {step === 'codigo' && (
            <form onSubmit={handleValidarCodigo}>
              {testCode && (
                <div className="modo-prueba-aviso" style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(217, 119, 6, 0.15)', border: '1px solid #d97706', borderRadius: '8px', fontSize: '0.85rem', color: '#fef3c7' }}>
                  Código de prueba (local): <b style={{ fontSize: '1.1rem', letterSpacing: '2px', color: '#fbbf24' }}>{testCode}</b>
                </div>
              )}
              <div className="form-group">
                <label>Código de Seguridad (6 dígitos)</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '4px' }}
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Validando…' : 'Entrar'}
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn-link"
                  style={{ background: 'none', border: 'none', color: '#a7f3d0', cursor: 'pointer', fontSize: '0.85rem' }}
                  onClick={() => setStep('credenciales')}
                >
                  ← Volver
                </button>
                <button
                  type="button"
                  className="btn-link"
                  style={{ background: 'none', border: 'none', color: '#a7f3d0', cursor: 'pointer', fontSize: '0.85rem' }}
                  onClick={() => {
                    const fakeCode = String(100000 + Math.floor(Math.random() * 900000));
                    sessionStorage.setItem('proGanadoCodigoLocal', JSON.stringify({
                      correo: pendiente.correo,
                      codigo: fakeCode,
                      exp: Date.now() + 5 * 60000,
                      intentos: 0
                    }));
                    setTestCode(fakeCode);
                    setMsg({ text: 'Nuevo código generado.', type: 'ok' });
                  }}
                >
                  Reenviar código
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
            <a
              href="#privacidad"
              onClick={e => { e.preventDefault(); setShowPrivacy(true); }}
              style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'underline' }}
            >
              Política de Privacidad y Tratamiento de Datos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
