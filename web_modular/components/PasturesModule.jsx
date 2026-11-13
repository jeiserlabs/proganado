import React from 'react';
import { Compass, RotateCw, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function PasturesModule({ potreros }) {
  const ocupados = potreros.filter((p) => p.estado === 'Ocupado').length;
  const descanso = potreros.filter((p) => p.estado === 'Descanso').length;
  const libres = potreros.filter((p) => p.estado === 'Libre').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#198754] uppercase tracking-wider">Agroecología & Manejo Regenerativo</span>
          <h2 className="text-2xl font-black text-[#2b3b32] tracking-tight">Potreros PRV (Pastoreo Racional Voisin)</h2>
          <p className="text-xs text-[#52665a]">Monitoreo de leyes de Voisin: tiempo de ocupación corto (≤1 día) y descanso suficiente (30-45 días)</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
            <RotateCw className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">En Ocupación Actual</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{ocupados} Potrero(s)</h3>
            <span className="text-[10px] text-[#0f5132] font-bold">Carga: 8 vacas pastoreando</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#fff3cd] text-[#664d03]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">En Descanso Fisiológico</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{descanso} Potreros</h3>
            <span className="text-[10px] text-[#664d03] font-bold">Punto óptimo de reposo (POR)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#cff4fc] text-[#055160]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Listos para Entrada</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{libres} Potreros</h3>
            <span className="text-[10px] text-[#055160] font-bold">Pastura madura disponible</span>
          </div>
        </div>
      </div>

      {/* Pastures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {potreros.map((p) => {
          const isOcupado = p.estado === 'Ocupado';
          return (
            <div key={p.id} className="p-5 rounded-2xl bg-white border border-[#e2ece6] shadow-sm hover:border-[#198754] transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#198754]" />
                    <h4 className="font-black text-sm text-[#2b3b32]">{p.nombre}</h4>
                  </div>
                  <p className="text-xs text-[#52665a] mt-1">Área neta: {p.areaHa} Hectáreas · {p.carga}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                    isOcupado ? 'bg-[#d1e7dd] text-[#0f5132]' : 'bg-[#f1f8f4] text-[#52665a]'
                  }`}
                >
                  {p.estado}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2ece6] grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#52665a] block text-[10px] uppercase font-bold">Días de Ocupación:</span>
                  <span className="font-black text-sm text-[#2b3b32]">{p.diasOcupacion} día(s)</span>
                </div>
                <div>
                  <span className="text-[#52665a] block text-[10px] uppercase font-bold">Descanso Acumulado:</span>
                  <span className="font-black text-sm text-[#198754]">{p.diasDescanso} días</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
