import React from 'react';
import { useProGanado } from '../context/ProGanadoContext.jsx';

export default function Modals() {
  const { lightboxFoto, setLightboxFoto, showPrivacy, setShowPrivacy } = useProGanado();

  return (
    <>
      {/* Lightbox Foto */}
      {lightboxFoto && (
        <div className="modal-overlay" onClick={() => setLightboxFoto(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxFoto} alt="Foto ampliada" className="lightbox-img" />
            <button className="close-btn-lightbox" onClick={() => setLightboxFoto(null)}>✕</button>
          </div>
        </div>
      )}

      {/* Privacy Policy Dialog */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-card modal-large" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Política de Privacidad y Tratamiento de Datos</h3>
              <button className="close-btn" onClick={() => setShowPrivacy(false)}>✕</button>
            </div>
            <div className="privacy-body" style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#e2e8f0' }}>
              <p>
                <strong>ProGanado</strong> opera conforme al principio de <em>local-first</em>. Todos los datos
                sanitarios, reproductivos, contables y del hato bovino se almacenan de manera local y encriptada
                en el dispositivo del usuario.
              </p>
              <h4>1. Responsable del Tratamiento</h4>
              <p>
                La administración de la Finca La Pradera es responsable exclusiva de los registros ganaderos,
                trazabilidad animal ante el ICA y cumplimiento de periodos de retiro sanitario.
              </p>
              <h4>2. Finalidad de los Datos</h4>
              <ul>
                <li>Cumplimiento estricto de la Resolución ICA de inocuidad en leche y carne.</li>
                <li>Gestión zootécnica de días abiertos, partos e inventario bovino.</li>
                <li>Control contable de ingresos y gastos operacionales.</li>
              </ul>
              <h4>3. Seguridad y Cifrado</h4>
              <p>
                Las contraseñas se derivan mediante PBKDF2-SHA256 con salt criptográfico individual. El sistema
                no transfiere información personal a servidores de terceros sin autorización explícita.
              </p>
            </div>
            <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn-primary" onClick={() => setShowPrivacy(false)}>
                Entendido y Aceptado
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
