import React from 'react';
import { Milk, ShieldCheck, Cpu, Database, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingView({ onEnterApp }) {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Inocuidad y Normativa ICA BPG',
      desc: 'Bloqueo automático de leche con residuos químicos o antibióticos para proteger el tanque de acopio Colanta.',
      tag: 'Resolución ICA 067449'
    },
    {
      icon: Milk,
      title: 'Acopio y Pesaje Diario Colanta',
      desc: 'Monitoreo de litros diarios, temperatura de tanque frío a 3.4°C y control de sólidos totales y grasa.',
      tag: 'Calidad Clase A'
    },
    {
      icon: Cpu,
      title: 'Rotación Inteligente Voisin (PRV)',
      desc: 'Cálculo de aforo, punto óptimo de reposo y rotación de potreros para máxima biomasa de pastura.',
      tag: 'Pastoreo Voisin'
    },
    {
      icon: Database,
      title: 'Trazabilidad y Árbol Genealógico',
      desc: 'Historial reproductivo, fechas de celo, servicios con pajillas sexadas y registro fotográfico.',
      tag: 'Genealogía Completa'
    }
  ];

  return (
    <div className="space-y-12 py-4 animate-fadeIn">
      
      {/* Hero Institucional ProGanado */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d1e7dd] border border-[#a3cfbb] text-[#0a3622] text-xs font-bold shadow-sm">
          <Award className="w-4 h-4 text-[#198754]" />
          Software Ganadero de Alto Rendimiento · CESDE 2026
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2b3b32] tracking-tight leading-tight">
          La Tecnología del Hato Lechero en tus Manos
        </h1>

        <p className="text-[#52665a] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Diseñado para productores de leche de la cuenca norte y oriente de Antioquia.
          Cero pérdidas por antibióticos, máxima rentabilidad por hectárea y control absoluto en campo.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnterApp}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#198754] hover:bg-[#0f5132] text-white font-bold text-base shadow-lg shadow-[#198754]/25 transition-all hover:-translate-y-0.5"
          >
            Abrir Panel Interactivo <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bento Grid Features con Tarjetas Blancas Oficiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="p-7 rounded-2xl bg-white border border-[#e2ece6] hover:border-[#198754] transition-all hover:shadow-lg space-y-3.5 shadow-sm scroll-reveal"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#d1e7dd] flex items-center justify-center text-[#0f5132]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#0a3622] bg-[#d1e7dd] border border-[#a3cfbb] px-3 py-1 rounded-full">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#2b3b32]">{f.title}</h3>
              <p className="text-sm text-[#52665a] leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="p-8 rounded-3xl bg-white border border-[#e2ece6] shadow-sm max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-[#52665a] text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#198754]" />
          <span>Cumplimiento ICA BPG</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#198754]" />
          <span>Integración Acopio Colanta</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#198754]" />
          <span>Modo Offline para Campo</span>
        </div>
      </div>

    </div>
  );
}
