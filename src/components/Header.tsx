import React, { useState } from 'react';
import { Building2, CalendarCheck, ShieldCheck, UserCheck, Hotel, Menu, X, Award } from 'lucide-react';
import { ProjectTeam } from '../types';

interface HeaderProps {
  currentView: 'guest' | 'admin';
  onViewChange: (view: 'guest' | 'admin') => void;
  onOpenMyBookings: () => void;
  onOpenProjectInfo: () => void;
  team?: ProjectTeam;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenMyBookings,
  onOpenProjectInfo,
  team
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const teamName = team?.teamName || '404 ERROR NOT FOUND';

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B] text-slate-100 border-b border-amber-500/20 shadow-md">
      {/* Top Academic Credential Strip */}
      <div className="bg-[#070D1E] border-b border-white/5 py-1.5 px-4 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden sm:inline">Official Team:</span>
            <span className="font-mono font-bold text-amber-300 tracking-wider bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
              {teamName}
            </span>
            <button
              onClick={onOpenProjectInfo}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
            >
              <Award className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Project Evaluation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          
          {/* Brand Wordmark & Crest */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
              <Hotel className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onViewChange('guest'); }}
                className="text-xl font-serif font-semibold tracking-tight text-white hover:text-amber-300 transition-colors flex items-baseline gap-2"
              >
                <span>GrandVue</span>
                <span className="font-sans text-[11px] font-medium text-amber-400/90 tracking-widest uppercase hidden lg:inline">
                  Luxury Suites & PMS
                </span>
              </a>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide">
            <button
              onClick={() => onViewChange('guest')}
              className={`transition-colors whitespace-nowrap py-2 relative cursor-pointer ${
                currentView === 'guest'
                  ? 'text-amber-300 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Suites & Villas
              {currentView === 'guest' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full" />
              )}
            </button>

            <button
              onClick={onOpenMyBookings}
              className="text-slate-300 hover:text-white transition-colors whitespace-nowrap py-2 cursor-pointer"
            >
              My Reservations
            </button>

            <button
              onClick={() => onViewChange('admin')}
              className={`transition-colors whitespace-nowrap py-2 relative flex items-center gap-1.5 cursor-pointer ${
                currentView === 'admin'
                  ? 'text-amber-300 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400/80" />
              Staff PMS Console
              {currentView === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full" />
              )}
            </button>

            <button
              onClick={onOpenProjectInfo}
              className="text-slate-300 hover:text-amber-300 transition-colors whitespace-nowrap py-2 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Academic Review Portal
            </button>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {currentView === 'guest' ? (
              <button
                onClick={() => onViewChange('admin')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Staff PMS Console
              </button>
            ) : (
              <button
                onClick={() => onViewChange('guest')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-slate-950" />
                Guest Booking Engine
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070D1E] border-t border-amber-500/20 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1 mb-2">
            <p className="text-amber-400 font-semibold uppercase tracking-wider text-[10px]">
              Galgotias University · Section 30
            </p>
            <p className="text-slate-300 text-xs">
              Official Team: <span className="font-mono text-amber-300 font-bold">{teamName}</span>
            </p>
          </div>

          <button
            onClick={() => { onViewChange('guest'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              currentView === 'guest' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Suites & Villas (Guest View)
          </button>

          <button
            onClick={() => { onOpenMyBookings(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors"
          >
            My Reservations Lookup
          </button>

          <button
            onClick={() => { onViewChange('admin'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
              currentView === 'admin' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Staff PMS Console
          </button>

          <button
            onClick={() => { onOpenProjectInfo(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-amber-300 hover:bg-white/5 transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Academic Review Portal
          </button>

          <div className="pt-2 border-t border-white/10">
            {currentView === 'guest' ? (
              <button
                onClick={() => { onViewChange('admin'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors"
              >
                Switch to Staff PMS Console
              </button>
            ) : (
              <button
                onClick={() => { onViewChange('guest'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-center text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
              >
                Switch to Guest Booking Engine
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
