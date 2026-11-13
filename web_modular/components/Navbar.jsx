import React from 'react';
import {
  LayoutDashboard,
  Layers,
  AlertTriangle,
  Heart,
  Milk,
  Compass,
  DollarSign,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenRegister, icaAlertsCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'inventory', label: 'Ganado', icon: Layers },
    { id: 'health', label: 'Salud', icon: AlertTriangle, badge: icaAlertsCount },
    { id: 'reproduction', label: 'Reproducción', icon: Heart },
    { id: 'production', label: 'Producción', icon: Milk },
    { id: 'pastures', label: 'Potreros PRV', icon: Compass },
    { id: 'accounting', label: 'Contabilidad', icon: DollarSign },
    { id: 'users', label: 'Usuarios', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b291b] border-b-2 border-[#1f5038] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('dashboard')}>
            <img
              src="assets/proganado-logo-blanco.png"
              alt="ProGanado Logo"
              className="h-8 2xl:h-10 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">ProGanado</span>
                <span className="hidden 2xl:inline text-[10px] font-bold bg-[#133d2a] text-[#75b798] border border-[#2d6e4d] px-2 py-0.5 rounded-full">
                  SaaS 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#cfe3d7] font-medium hidden 2xl:block">Finca La Pradera · Acopio Colanta</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white bg-[#133d2a] border border-[#2d6e4d] shadow-sm'
                      : 'text-[#cfe3d7] hover:text-white hover:bg-[#133d2a]/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#75b798]' : 'text-[#cfe3d7]/70'}`} />
                  {item.label}
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold bg-[#ffc107] text-[#0b291b] rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenRegister}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-[#198754] hover:bg-[#0f5132] text-white shadow-sm border border-[#2d6e4d] transition-all hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nuevo Bovino</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav overflow */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-[#082015] overflow-x-auto text-xs border-t border-[#1f5038]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg shrink-0 ${
                isActive ? 'bg-[#198754] text-white font-bold' : 'text-[#cfe3d7]'
              }`}
            >
              <Icon className="w-3 h-3" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
