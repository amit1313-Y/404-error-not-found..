import React from 'react';
import { Calendar, Users, Shield, Sparkles, Clock, BedDouble } from 'lucide-react';
import { SearchFilters } from '../types';

interface HeroSectionProps {
  filters: SearchFilters;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  onSearchSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit
}) => {
  return (
    <section className="relative bg-[#070D1E]">
      {/* Cinematic Hero Canvas */}
      <div className="relative min-h-[560px] lg:min-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Fallback */}
        <div className="absolute inset-0 z-0 bg-[#070D1E]">
          <img
            src="/src/assets/images/hero_luxury_hotel_exterior_1791546203659.jpg"
            alt="GrandVue luxury resort exterior at dusk with reflection pool"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 opacity-55"
          />
          {/* Measured deep midnight contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/75 to-[#070D1E]/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-white mb-5 text-balance max-w-4xl mx-auto leading-tight">
            Curated Luxury Living & Effortless Hospitality
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Architecturally designed suites, bespoke coastal villas, and front-desk property operations engineered for seamless reservations and instant confirmation.
          </p>

          {/* Real-time Interactive Booking Search Bar (Crisp White Luxury Card) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_-6px_rgba(0,0,0,0.35)] text-slate-900 border border-amber-500/20 max-w-4xl mx-auto text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Check-In */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Check-In
                </label>
                <input
                  type="date"
                  value={filters.checkInDate}
                  onChange={(e) => onFilterChange({ checkInDate: e.target.value })}
                  className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Check-Out */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Check-Out
                </label>
                <input
                  type="date"
                  value={filters.checkOutDate}
                  onChange={(e) => onFilterChange({ checkOutDate: e.target.value })}
                  className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  Guests
                </label>
                <select
                  value={filters.guests}
                  onChange={(e) => onFilterChange({ guests: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Guests (Family)</option>
                  <option value={4}>4 Guests (Suite)</option>
                </select>
              </div>

              {/* Room Tier */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-amber-600" />
                  Suite Tier
                </label>
                <select
                  value={filters.roomType}
                  onChange={(e) => onFilterChange({ roomType: e.target.value })}
                  className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors cursor-pointer"
                >
                  <option value="all">All Tiers & Suites</option>
                  <option value="deluxe">Deluxe King</option>
                  <option value="suite">Executive Suites</option>
                  <option value="penthouse">Oceanfront Penthouse</option>
                  <option value="villa">Garden Villas</option>
                </select>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Guaranteed luxury rates in INR (₹) · Complimentary flexible modification · Instant e-voucher
              </span>
              <button
                type="button"
                onClick={onSearchSubmit}
                className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all duration-150 whitespace-nowrap shadow-sm hover:shadow-md cursor-pointer"
              >
                Search Available Suites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4-column KPI & Service proof strip below the hero */}
      <div className="bg-[#0B132B] border-t border-b border-amber-500/20 py-6 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Direct Reservation</p>
                <p className="text-[11px] text-slate-400">Instant lock & transparent billing</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Hospitality Grade</p>
                <p className="text-[11px] text-slate-400">4.92 / 5.0 guest evaluation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">Contactless Check-In</p>
                <p className="text-[11px] text-slate-400">Digital key & automated invoice</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">24/7 Front Office</p>
                <p className="text-[11px] text-slate-400">Live Room Rack & PMS sync</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
