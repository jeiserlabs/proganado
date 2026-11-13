import React from 'react';
import { Milk, TrendingUp, CheckCircle2, Factory, Scale } from 'lucide-react';

export default function ProductionModule({ herd, entregasColanta }) {
  const totalLitrosHoy = herd.reduce((acc, c) => acc + (c.litrosDia || 0), 0);
  const vacasOrdenio = herd.filter((c) => c.estado === 'En Ordeño').length;
  const promedioPorVaca = vacasOrdenio > 0 ? (totalLitrosHoy / vacasOrdenio).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#198754] uppercase tracking-wider">Ordeño Mecánico & Calidad Higiénica</span>
          <h2 className="text-2xl font-black text-[#2b3b32] tracking-tight">Producción Láctea & Acopio Colanta</h2>
          <p className="text-xs text-[#52665a]">Pesajes diarios por animal, conciliación de tanques de frío y reportes de laboratorio UFC</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#cff4fc] text-[#055160]">
            <Milk className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Producción Total Hoy</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{totalLitrosHoy.toFixed(1)} Litros</h3>
            <span className="text-[10px] text-[#055160] font-bold">Turnos AM (60%) + PM (40%)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Promedio por Vaca</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">{promedioPorVaca} L / día</h3>
            <span className="text-[10px] text-[#198754] font-bold">{vacasOrdenio} vacas activas en ordeño</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#e2ece6] text-[#0b291b]">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Calidad Bacteriológica</p>
            <h3 className="text-2xl font-black text-[#2b3b32]">14.000 UFC</h3>
            <span className="text-[10px] text-[#198754] font-bold">Grado A (Bonificación +180 COP/L)</span>
          </div>
        </div>
      </div>

      {/* Colanta Deliveries Table */}
      <div className="rounded-2xl bg-white border border-[#e2ece6] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e2ece6] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#2b3b32]">Historial de Entregas al Carro Tanque Colanta</h3>
          <span className="text-xs text-[#52665a]">Planta Santa Rosa de Osos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fbf9] text-[#52665a] border-b border-[#e2ece6] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Fecha Despacho</th>
                <th className="py-3 px-4">Litros Recibidos</th>
                <th className="py-3 px-4">Liquidación Estimada</th>
                <th className="py-3 px-4">Recuento UFC</th>
                <th className="py-3 px-4">Dictamen de Inocuidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ece6]">
              {entregasColanta.map((ent) => (
                <tr key={ent.id} className="hover:bg-[#f8fbf9] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{ent.fecha}</td>
                  <td className="py-3 px-4 font-bold text-[#198754]">{ent.litros.toLocaleString('es-CO')} L</td>
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{ent.valorEstCop}</td>
                  <td className="py-3 px-4 text-[#52665a]">{ent.ufc}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#d1e7dd] text-[#0f5132]">
                      <CheckCircle2 className="w-3 h-3" /> {ent.estado}
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
