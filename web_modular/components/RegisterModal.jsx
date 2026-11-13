import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';

export default function RegisterModal({ isOpen, onClose, onAddBovino }) {
  const [formData, setFormData] = useState({
    nombre: '',
    chapa: '',
    raza: 'Holstein Puro',
    estado: 'En Ordeño',
    litrosDia: '24.0',
    potrero: 'Potrero 2 (Kikuyo)',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.chapa.trim()) return;

    const newCow = {
      id: Date.now().toString().slice(-4),
      nombre: formData.nombre.trim(),
      chapa: formData.chapa.trim().toUpperCase(),
      raza: formData.raza,
      estado: formData.estado,
      litrosDia: parseFloat(formData.litrosDia) || 0,
      partos: 1,
      diasLactancia: formData.estado === 'En Ordeño' ? 30 : 0,
      potrero: formData.potrero,
      salud: 'Óptima',
      diasRetiroIca: 0,
      foto: 'assets/foto-pastoreo.jpg',
    };

    onAddBovino(newCow);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-[#e2ece6] overflow-hidden shadow-2xl space-y-5">
        
        {/* Header Dark Emerald */}
        <div className="bg-[#0b291b] p-5 flex items-center justify-between text-white border-b-2 border-[#1f5038]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#133d2a] text-[#75b798] border border-[#2d6e4d]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Registrar Nuevo Bovino</h3>
              <p className="text-[11px] text-[#cfe3d7]">Ingreso a inventario oficial Finca La Pradera</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#cfe3d7] hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Nombre Animal</label>
              <input
                required
                type="text"
                placeholder="Ej. Serena"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Chapa / Identificador</label>
              <input
                required
                type="text"
                placeholder="Ej. CO-1490-LP"
                value={formData.chapa}
                onChange={(e) => setFormData({ ...formData, chapa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Raza</label>
              <select
                value={formData.raza}
                onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              >
                <option value="Holstein Puro">Holstein Puro</option>
                <option value="Jersey">Jersey</option>
                <option value="Girolando F1">Girolando F1</option>
                <option value="Pardo Suizo">Pardo Suizo</option>
                <option value="Normando">Normando</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Estado Reproductivo</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              >
                <option value="En Ordeño">En Ordeño</option>
                <option value="Seca">Seca</option>
                <option value="Gestante">Gestante</option>
                <option value="Ternera">Ternera</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Litros Estimados / Día</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.litrosDia}
                onChange={(e) => setFormData({ ...formData, litrosDia: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#2b3b32] block mb-1">Potrero Asignado</label>
              <input
                type="text"
                value={formData.potrero}
                onChange={(e) => setFormData({ ...formData, potrero: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-[#2b3b32] text-xs focus:outline-none focus:border-[#198754]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#e2ece6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#52665a] hover:text-[#2b3b32]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#198754] hover:bg-[#0f5132] text-white shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Guardar Registro
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
