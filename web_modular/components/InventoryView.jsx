import React, { useState } from 'react';
import { Search, Eye, Milk, Tag } from 'lucide-react';

export default function InventoryView({ bovinos, onSelectCow }) {
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('ALL');

  const filtered = bovinos.filter((b) => {
    const matchesSearch =
      b.nombre.toLowerCase().includes(search.toLowerCase()) ||
      b.chapa.toLowerCase().includes(search.toLowerCase()) ||
      b.raza.toLowerCase().includes(search.toLowerCase());

    if (filterState === 'ALL') return matchesSearch;
    return matchesSearch && b.estado === filterState;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2b3b32] tracking-tight">Inventario Bovino</h2>
          <p className="text-xs text-[#52665a]">Población activa, lactancias y registro fotográfico en alta definición</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search box */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-[#52665a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por chapa o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#e2ece6] text-[#2b3b32] placeholder-[#52665a]/60 text-xs focus:outline-none focus:border-[#198754] transition-colors shadow-sm"
            />
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-1 bg-[#f1f8f4] p-1 rounded-xl border border-[#e2ece6] text-xs">
            {['ALL', 'En Ordeño', 'Seca', 'Gestante'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterState === st
                    ? 'bg-[#198754] text-white shadow-sm'
                    : 'text-[#52665a] hover:text-[#2b3b32] hover:bg-white'
                }`}
              >
                {st === 'ALL' ? 'Todos' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bovine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((vaca) => {
          const isWarning = vaca.diasRetiroIca > 0;
          return (
            <div
              key={vaca.id}
              onClick={() => onSelectCow(vaca)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#e2ece6] hover:border-[#198754] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm scroll-reveal"
            >
              {/* Photo */}
              <div className="h-44 w-full bg-[#f1f8f4] relative overflow-hidden">
                <img
                  src={vaca.foto}
                  alt={vaca.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'assets/foto-pastoreo.jpg';
                  }}
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0b291b]/90 text-white border border-white/20 backdrop-blur-md">
                    {vaca.chapa}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md ${
                      isWarning
                        ? 'bg-[#fff3cd] text-[#664d03] border border-[#ffe69c]'
                        : 'bg-[#d1e7dd] text-[#0a3622] border border-[#a3cfbb]'
                    }`}
                  >
                    {isWarning ? 'Retiro ICA' : vaca.estado}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#2b3b32] text-base group-hover:text-[#198754] transition-colors">
                    {vaca.nombre}
                  </h3>
                  <span className="text-xs font-semibold text-[#52665a]">{vaca.raza}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-[#e2ece6]">
                  <div>
                    <span className="text-[#52665a] block">Producción:</span>
                    <span className="font-bold text-[#198754] flex items-center gap-1">
                      <Milk className="w-3 h-3" /> {vaca.litrosDia > 0 ? `${vaca.litrosDia} L/día` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#52665a] block">Lactancia:</span>
                    <span className="font-bold text-[#2b3b32]">{vaca.diasLactancia} días ({vaca.partos} partos)</span>
                  </div>
                </div>

                <div className="text-[11px] text-[#52665a] pt-1 flex items-center justify-between">
                  <span className="truncate">{vaca.potrero}</span>
                  <span className="text-[#198754] font-bold group-hover:underline flex items-center gap-1">
                    Ver ficha <Eye className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
