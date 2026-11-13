import React from 'react';
import { ShieldAlert, CheckCircle2, Clock, Pill, AlertOctagon, Info } from 'lucide-react';

export default function HealthModule({ bovinos, onOpenRegister }) {
  const withdrawalCows = bovinos.filter((b) => b.diasRetiroIca > 0);
  const cleanCows = bovinos.filter((b) => b.diasRetiroIca === 0);

  return (
    <div className="space-y-6">
      
      {/* ICA Banner Institucional */}
      <div className="p-6 rounded-2xl bg-[#fffdf5] border border-[#ffe69c] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#856404] font-extrabold text-sm">
          <ShieldAlert className="w-5 h-5 text-[#856404]" />
          Módulo de Inocuidad y Tiempo de Retiro ICA (Resolución 067449)
        </div>
        <p className="text-[#664d03] text-xs sm:text-sm leading-relaxed max-w-3xl">
          El control estricto de los días de retiro de antibióticos y antiparasitarios garantiza leche
          100% libre de residuos químicos e inhibidores para la entrega a plantas Colanta.
        </p>
      </div>

      {/* Active Withdrawals */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#2b3b32] flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-[#856404]" />
          Bovinos en Tratamiento con Leche Segregada ({withdrawalCows.length})
        </h3>

        {withdrawalCows.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-[#e2ece6] text-center space-y-2 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-[#198754] mx-auto" />
            <h4 className="font-bold text-[#2b3b32] text-base">Hato 100% Libre de Medicamentos</h4>
            <p className="text-xs text-[#52665a]">Toda la leche producida hoy es apta para tanque frío Colanta.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {withdrawalCows.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white border-2 border-[#ffe69c] flex items-start gap-4 shadow-sm"
              >
                <img
                  src={c.foto}
                  alt={c.nombre}
                  className="w-20 h-20 rounded-xl object-cover border border-[#ffe69c]"
                  onError={(e) => {
                    e.target.src = 'assets/foto-pastoreo.jpg';
                  }}
                />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#2b3b32] text-base">{c.nombre}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#fff3cd] text-[#664d03] border border-[#ffe69c]">
                      {c.chapa}
                    </span>
                  </div>
                  <div className="text-xs text-[#856404] flex items-center gap-1.5 font-bold">
                    <Pill className="w-3.5 h-3.5" />
                    {c.medicamento || 'Tratamiento Intramamario'}
                  </div>
                  <div className="text-xs text-[#52665a] flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#856404]" />
                    <span>Días restantes de retiro: <strong className="text-[#856404]">{c.diasRetiroIca} días</strong></span>
                  </div>
                  <p className="text-[11px] text-[#856404] font-semibold italic pt-1">
                    ⚠️ PROHIBIDO verter leche de este animal al tanque general.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clean Cows Summary */}
      <div className="p-6 rounded-2xl bg-white border border-[#e2ece6] shadow-sm space-y-3">
        <h4 className="text-sm font-bold text-[#2b3b32] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#198754]" />
          Resumen Sanitario del Hato
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
            <span className="text-[#52665a] block font-medium">Total Bovinos:</span>
            <span className="font-extrabold text-[#2b3b32] text-lg">{bovinos.length}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
            <span className="text-[#52665a] block font-medium">Inocuidad Aprobada:</span>
            <span className="font-extrabold text-[#198754] text-lg">{cleanCows.length} ({Math.round((cleanCows.length/bovinos.length)*100)}%)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
            <span className="text-[#52665a] block font-medium">Fiebre Aftosa:</span>
            <span className="font-bold text-[#198754] text-sm mt-1 block">Al día (Ciclo I)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
            <span className="text-[#52665a] block font-medium">Brucelosis / TB:</span>
            <span className="font-bold text-[#198754] text-sm mt-1 block">Hato Libre</span>
          </div>
        </div>
      </div>

    </div>
  );
}
