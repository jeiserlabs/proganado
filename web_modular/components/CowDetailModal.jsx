import React from 'react';
import { X, Milk, MapPin, Calendar, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CowDetailModal({ cow, onClose }) {
  if (!cow) return null;

  const isWarning = cow.diasRetiroIca > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white border border-[#e2ece6] overflow-hidden shadow-2xl space-y-4">
        
        {/* Photo header */}
        <div className="h-52 w-full bg-[#f1f8f4] relative">
          <img
            src={cow.foto}
            alt={cow.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'assets/foto-pastoreo.jpg';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-[#0b291b]/80 text-white hover:bg-[#0b291b] border border-white/20"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#0b291b]/90 text-white border border-white/20 backdrop-blur-md">
              {cow.chapa}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-0 space-y-4">
          <div>
            <h3 className="text-2xl font-black text-[#2b3b32]">{cow.nombre}</h3>
            <p className="text-xs text-[#52665a] font-medium">{cow.raza} · Finca La Pradera</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
              <span className="text-[#52665a] block font-medium">Producción Diaria:</span>
              <span className="font-extrabold text-[#198754] text-sm flex items-center gap-1 mt-0.5">
                <Milk className="w-3.5 h-3.5" /> {cow.litrosDia} L / día
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
              <span className="text-[#52665a] block font-medium">Lactancia:</span>
              <span className="font-bold text-[#2b3b32] text-sm flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#52665a]" /> {cow.diasLactancia} días ({cow.partos} partos)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
              <span className="text-[#52665a] block font-medium">Potrero Asignado:</span>
              <span className="font-bold text-[#2b3b32] text-xs flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#198754]" /> {cow.potrero}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#f8fbf9] border border-[#e2ece6]">
              <span className="text-[#52665a] block font-medium">Estado Inocuidad:</span>
              <span className={`font-bold text-xs flex items-center gap-1 mt-0.5 ${isWarning ? 'text-[#856404]' : 'text-[#198754]'}`}>
                {isWarning ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                {isWarning ? `${cow.diasRetiroIca} días retiro` : '100% Inocua'}
              </span>
            </div>
          </div>

          {isWarning && (
            <div className="p-3 rounded-xl bg-[#fffdf5] border border-[#ffe69c] text-[11px] text-[#664d03]">
              <strong>Advertencia Sanitaria:</strong> Animal en tratamiento con {cow.medicamento || 'medicamento'}. No verter leche al acopio.
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#f1f8f4] hover:bg-[#e2ece6] text-[#2b3b32] font-bold text-xs transition-colors border border-[#e2ece6]"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
}
