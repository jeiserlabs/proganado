import React from 'react';
import { Heart, Activity, Calendar, Award, AlertCircle } from 'lucide-react';

export default function ReproductionModule({ reproData }) {
  const gestantesCount = reproData.filter((r) => r.evento.includes('Gestación')).length;
  const celosCount = reproData.filter((r) => r.evento.includes('Celo')).length;
  const partosCount = reproData.filter((r) => r.evento.includes('Parto')).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#198754] uppercase tracking-wider">Ciclo Biológico & Genética</span>
          <h2 className="text-2xl font-black text-[#2b3b32] tracking-tight">Reproducción & Trazabilidad Bovina</h2>
          <p className="text-xs text-[#52665a]">Control sistemático de celos, inseminaciones artificiales, gestaciones confirmadas y partos</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#fff3cd] text-[#664d03]">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">En Gestación Confirmada</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{gestantesCount} {gestantesCount === 1 ? 'Vaca' : 'Vacas'}</h3>
            <span className="text-[10px] text-[#198754] font-bold">Ecografía positiva</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#f8d7da] text-[#842029]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Celos por Servir</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{celosCount} {celosCount === 1 ? 'Animal' : 'Animales'}</h3>
            <span className="text-[10px] text-[#842029] font-bold">Ventana fértil de 18 horas</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Partos del Año</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{partosCount} {partosCount === 1 ? 'Cría' : 'Crías'}</h3>
            <span className="text-[10px] text-[#198754] font-bold">100% Supervivencia neonatal</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-[#e2ece6] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e2ece6] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#2b3b32]">Bitácora de Eventos Reproductivos</h3>
          <span className="text-xs text-[#52665a]">{reproData.length} registros sincronizados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fbf9] text-[#52665a] border-b border-[#e2ece6] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Bovino</th>
                <th className="py-3 px-4">Evento Reproductivo</th>
                <th className="py-3 px-4">Fecha Evento</th>
                <th className="py-3 px-4">Días Abiertos</th>
                <th className="py-3 px-4">Dictamen Técnico & Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ece6]">
              {reproData.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#f8fbf9] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{ev.vaca}</td>
                  <td className="py-3 px-4 font-semibold text-[#198754]">{ev.evento}</td>
                  <td className="py-3 px-4 text-[#52665a]">{ev.fecha}</td>
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{ev.diasAbiertos} días</td>
                  <td className="py-3 px-4 text-[#52665a]">{ev.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
