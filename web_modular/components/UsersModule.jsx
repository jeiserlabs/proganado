import React, { useState } from 'react';
import { ShieldCheck, UserCheck, KeyRound, Lock, Smartphone, CheckCircle2 } from 'lucide-react';

export default function UsersModule({ usuarios }) {
  const [testCode, setTestCode] = useState('784921');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(testCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#198754] uppercase tracking-wider">Ciberseguridad & Control de Acceso</span>
          <h2 className="text-2xl font-black text-[#2b3b32] tracking-tight">Usuarios & Verificación en Dos Pasos (2FA)</h2>
          <p className="text-xs text-[#52665a]">Gestión de credenciales con hashing PBKDF2-SHA256 y autenticación de un solo uso por correo o token</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#fff3cd] text-[#664d03]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Administradores</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">2 / 4</h3>
            <span className="text-[10px] text-[#664d03] font-bold">Control total de la finca</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#cff4fc] text-[#055160]">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Usuarios Operativos</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">2 / 7</h3>
            <span className="text-[10px] text-[#055160] font-bold">Consulta y captura de campo</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Protección 2FA Activa</p>
            <h3 className="text-2xl font-black text-[#0f5132]">100% Cuentas</h3>
            <span className="text-[10px] text-[#198754] font-bold">Blindaje contra intrusiones</span>
          </div>
        </div>
      </div>

      {/* 2FA Demonstration Banner */}
      <div className="p-5 rounded-2xl bg-[#0b291b] text-white border border-[#1f5038] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#133d2a] text-[#75b798] border border-[#2d6e4d]">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Simulador de Código de Seguridad 2FA (Modo Prueba)</h4>
            <p className="text-xs text-[#cfe3d7]">En producción el código de 6 dígitos se despacha vía SMTP cifrado al correo registrado del mayordomo o administrador.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#133d2a] px-4 py-2 rounded-xl border border-[#2d6e4d]">
          <span className="font-mono text-lg font-black tracking-widest text-[#75b798]">{testCode}</span>
          <button
            onClick={handleCopyCode}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#198754] hover:bg-[#0f5132] text-white transition-colors"
          >
            {isCopied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-[#e2ece6] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e2ece6] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#2b3b32]">Cuentas de Usuario Registradas</h3>
          <span className="text-xs text-[#52665a]">4 de 11 cupos utilizados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fbf9] text-[#52665a] border-b border-[#e2ece6] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Nombre Completo</th>
                <th className="py-3 px-4">Correo Electrónico</th>
                <th className="py-3 px-4">Rol en ProGanado</th>
                <th className="py-3 px-4">Última Sesión</th>
                <th className="py-3 px-4">Estado 2FA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ece6]">
              {usuarios.map((u) => (
                <tr key={u.id} className="hover:bg-[#f8fbf9] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{u.nombre}</td>
                  <td className="py-3 px-4 text-[#52665a]">{u.email}</td>
                  <td className="py-3 px-4 font-semibold text-[#198754]">{u.rol}</td>
                  <td className="py-3 px-4 text-[#52665a]">{u.ultimoAcceso}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d1e7dd] text-[#0f5132]">
                      <CheckCircle2 className="w-3 h-3" /> {u.auth2FA}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
