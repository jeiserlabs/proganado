import React from 'react';
import { Milk, Activity, AlertTriangle, ShieldCheck, Thermometer, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import CountUp from './CountUp';

export default function DashboardView({ bovinos, milkHistory, onSelectTab, onOpenRegister }) {
  const vacasOrdenio = bovinos.filter((b) => b.estado === 'En Ordeño');
  const totalLitros = vacasOrdenio.reduce((acc, b) => acc + (b.litrosDia || 0), 0);
  const promedioLitros = vacasOrdenio.length > 0 ? (totalLitros / vacasOrdenio.length).toFixed(1) : 0;
  const vacasEnRetiro = bovinos.filter((b) => b.diasRetiroIca > 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Institucional (Paleta Oficial: Dark Emerald & Campo) */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#1f5038] p-8 sm:p-10 hero-proganado">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b291b]/90 border border-[#75b798]/40 text-[#cfe3d7] text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#75b798]" />
            BPG Normativa ICA · Acopio Certificado Colanta
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Gestión Ganadera de Precisión para el Hato Moderno
          </h1>
          <p className="text-[#cfe3d7] text-sm sm:text-base leading-relaxed font-normal">
            Plataforma web integral para el control de inventario bovino, pesaje de leche para acopio Colanta,
            resguardo sanitario de medicamentos y rotación inteligente de potreros Voisin (PRV).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('inventory')}
              className="px-5 py-2.5 rounded-xl bg-[#198754] hover:bg-[#0f5132] text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              Ver Inventario ({bovinos.length} Bovinos)
            </button>
            <button
              onClick={() => onSelectTab('health')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-sm backdrop-blur-md transition-all"
            >
              Control Sanitario ICA
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics con React Bits SpotlightCard (Cards Blancas Oficiales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Leche Hoy */}
        <SpotlightCard>
          <div className="flex items-center justify-between text-[#52665a] text-xs font-bold mb-3">
            <span>ACOPIO COLANTA HOY</span>
            <span className="p-2.5 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
              <Milk className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-[#2b3b32] mb-1">
            <CountUp to={totalLitros} decimals={1} suffix=" L" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#198754] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Tanque 100% Inocuo</span>
          </div>
        </SpotlightCard>

        {/* KPI 2: Vacas en Ordeño */}
        <SpotlightCard>
          <div className="flex items-center justify-between text-[#52665a] text-xs font-bold mb-3">
            <span>VACAS EN ORDEÑO</span>
            <span className="p-2.5 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-[#2b3b32] mb-1">
            <CountUp to={vacasOrdenio.length} suffix={` / ${bovinos.length}`} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#52665a] font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-[#198754]" />
            <span>Promedio: <strong>{promedioLitros} L / vaca</strong></span>
          </div>
        </SpotlightCard>

        {/* KPI 3: Alerta Sanitaria / ICA */}
        <SpotlightCard className={vacasEnRetiro.length > 0 ? 'border-[#ffe69c] bg-[#fffdf5]' : ''}>
          <div className="flex items-center justify-between text-[#52665a] text-xs font-bold mb-3">
            <span>RETIRO SANITARIO ICA</span>
            <span className={`p-2.5 rounded-xl ${vacasEnRetiro.length > 0 ? 'bg-[#fff3cd] text-[#664d03]' : 'bg-[#d1e7dd] text-[#0f5132]'}`}>
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className={`text-3xl font-black mb-1 ${vacasEnRetiro.length > 0 ? 'text-[#856404]' : 'text-[#2b3b32]'}`}>
            <CountUp to={vacasEnRetiro.length} suffix={vacasEnRetiro.length === 1 ? ' Vaca' : ' Vacas'} />
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${vacasEnRetiro.length > 0 ? 'text-[#856404]' : 'text-[#198754]'}`}>
            <span>{vacasEnRetiro.length > 0 ? 'Leche segregada del acopio' : 'Cero retiro pendiente'}</span>
          </div>
        </SpotlightCard>

        {/* KPI 4: Tanque Frío */}
        <SpotlightCard>
          <div className="flex items-center justify-between text-[#52665a] text-xs font-bold mb-3">
            <span>TEMPERATURA TANQUE</span>
            <span className="p-2.5 rounded-xl bg-[#cfe2ff] text-[#084298]">
              <Thermometer className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-[#2b3b32] mb-1">
            <CountUp to={3.4} decimals={1} suffix=" °C" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#084298] font-semibold">
            <span>Cadena de frío óptima Colanta</span>
          </div>
        </SpotlightCard>

      </div>

      {/* Production Chart (Card Blanca Oficial) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e2ece6] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e2ece6] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#2b3b32] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#198754]" />
              Curva de Acopio Semanal a Colanta
            </h2>
            <p className="text-xs text-[#52665a]">Entrega diaria en litros con porcentaje de grasa y temperatura de recibo</p>
          </div>
          <span className="text-xs font-bold bg-[#d1e7dd] text-[#0a3622] border border-[#a3cfbb] px-3 py-1 rounded-full">
            Semana en curso · Promedio: 474.7 L/día
          </span>
        </div>

        {/* Bar visualization */}
        <div className="grid grid-cols-7 gap-3 pt-4">
          {milkHistory.map((item) => {
            const heightPercent = Math.round(((item.litros - 440) / (500 - 440)) * 100);
            return (
              <div key={item.day} className="flex flex-col items-center gap-2 group">
                <div className="text-[11px] font-black text-[#198754] group-hover:scale-110 transition-transform">
                  {item.litros}L
                </div>
                <div className="w-full bg-[#f1f8f4] rounded-xl h-44 flex items-end p-1.5 relative overflow-hidden border border-[#e2ece6]">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-gradient-to-t from-[#0f5132] to-[#198754] rounded-lg transition-all duration-500 group-hover:from-[#198754] group-hover:to-[#20c997] shadow-sm"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-[#2b3b32] block">{item.day}</span>
                  <span className="text-[10px] font-semibold text-[#52665a]">{item.calidadGrasa}% G</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
