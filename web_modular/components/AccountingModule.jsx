import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, Search, Filter } from 'lucide-react';

export default function AccountingModule({ contabilidad }) {
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = contabilidad.filter((m) => {
    const matchesSearch =
      m.concepto.toLowerCase().includes(search.toLowerCase()) ||
      m.tercero.toLowerCase().includes(search.toLowerCase()) ||
      m.factura.toLowerCase().includes(search.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && m.tipo === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#198754] uppercase tracking-wider">Gestión Financiera & Trazabilidad Fiscal</span>
          <h2 className="text-2xl font-black text-[#2b3b32] tracking-tight">Contabilidad & Soporte de Facturas</h2>
          <p className="text-xs text-[#52665a]">Libro de entradas y salidas de dinero con respaldo fotográfico de facturas de concentrados y medicamentos</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#d1e7dd] text-[#0f5132]">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Entradas (Mes)</p>
            <h3 className="text-xl font-black text-[#0f5132]">12.8M COP</h3>
            <span className="text-[10px] text-[#52665a]">Liquidación leche Colanta</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#f8d7da] text-[#842029]">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Salidas (Gastos)</p>
            <h3 className="text-xl font-black text-[#842029]">4.73M COP</h3>
            <span className="text-[10px] text-[#52665a]">Concentrados y sanidad</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#cff4fc] text-[#055160]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Saldo Neto Operativo</p>
            <h3 className="text-xl font-black text-[#055160]">8.07M COP</h3>
            <span className="text-[10px] text-[#055160] font-bold">Margen bruto: 63%</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e2ece6] shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#fff3cd] text-[#664d03]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#52665a] font-medium">Soportes con Foto</p>
            <h3 className="text-xl font-black text-[#2b3b32]">3 / 4</h3>
            <span className="text-[10px] text-[#198754] font-bold">100% Cuentas claras</span>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="rounded-2xl bg-white border border-[#e2ece6] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#e2ece6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#52665a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por concepto o tercero..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#f8fbf9] border border-[#e2ece6] text-xs"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#f1f8f4] p-1 rounded-xl text-xs">
            {['ALL', 'Entrada', 'Salida'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  filterType === t ? 'bg-[#198754] text-white' : 'text-[#52665a]'
                }`}
              >
                {t === 'ALL' ? 'Todos' : t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fbf9] text-[#52665a] border-b border-[#e2ece6] uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Tercero / Proveedor</th>
                <th className="py-3 px-4">No. Factura</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Valor COP</th>
                <th className="py-3 px-4">Foto Soporte</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2ece6]">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-[#f8fbf9] transition-colors">
                  <td className="py-3 px-4 text-[#52665a]">{m.fecha}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.tipo === 'Entrada' ? 'bg-[#d1e7dd] text-[#0f5132]' : 'bg-[#f8d7da] text-[#842029]'
                      }`}
                    >
                      {m.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{m.concepto}</td>
                  <td className="py-3 px-4 text-[#52665a]">{m.tercero}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#52665a]">{m.factura}</td>
                  <td className="py-3 px-4 text-[#52665a]">{m.categoria}</td>
                  <td className="py-3 px-4 font-bold text-[#2b3b32]">{m.valorCop}</td>
                  <td className="py-3 px-4">
                    {m.tieneFoto ? (
                      <span className="text-[10px] font-bold text-[#198754] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Adjunta
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#52665a]">Sin foto</span>
                    )}
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
