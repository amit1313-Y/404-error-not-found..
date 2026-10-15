import React, { useState } from 'react';
import { Room } from '../types';
import { Check, Star, ArrowUpDown, SlidersHorizontal, Eye } from 'lucide-react';

interface RoomCatalogProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  onBookRoom: (room: Room) => void;
}

export const RoomCatalog: React.FC<RoomCatalogProps> = ({
  rooms,
  onSelectRoom,
  onBookRoom
}) => {
  const [activeType, setActiveType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('all');

  const roomTypes = [
    { id: 'all', label: 'All Accommodations' },
    { id: 'deluxe', label: 'Deluxe King' },
    { id: 'suite', label: 'Executive Suites' },
    { id: 'penthouse', label: 'Ocean Penthouse' },
    { id: 'villa', label: 'Garden Villas' }
  ];

  const amenityOptions = [
    'all',
    'Ocean View',
    'Balcony',
    'Rain Shower',
    'Espresso Machine',
    'Private Jacuzzi',
    'Private Patio'
  ];

  // Filtering
  const filteredRooms = rooms.filter((room) => {
    if (activeType !== 'all' && room.type !== activeType) return false;
    if (selectedAmenity !== 'all') {
      const match = room.amenities.some(a => a.toLowerCase().includes(selectedAmenity.toLowerCase()));
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended order
  });

  return (
    <section id="rooms" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-700 uppercase block mb-1">
            Curated Living Spaces
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
            Suites & Private Villas
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Each accommodation is appointed with bespoke teak and travertine finishes, acoustic glazing, and private verandas.
          </p>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-700" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="recommended">Featured / Curated</option>
              <option value="price-asc">Rate: Low to High</option>
              <option value="price-desc">Rate: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Amenity Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        {/* Type Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {roomTypes.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeType === tab.id
                  ? 'bg-[#0B132B] text-amber-300 border border-amber-500/40 shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Amenity Filter Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
            Feature:
          </span>
          <select
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            <option value="all">All Amenities</option>
            {amenityOptions.filter(a => a !== 'all').map(amenity => (
              <option key={amenity} value={amenity}>{amenity}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      {sortedRooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm">No accommodations match your current filter selection.</p>
          <button
            onClick={() => { setActiveType('all'); setSelectedAmenity('all'); }}
            className="mt-3 text-xs font-semibold text-amber-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedRooms.map((room) => {
            const isAvailable = room.status === 'available';

            return (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(11,19,43,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(11,19,43,0.12)] transition-all duration-300 flex flex-col group hover:border-amber-500/30"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                  
                  {/* Status Overlay Ribbon */}
                  <div className="absolute top-3 right-3">
                    {isAvailable ? (
                      <span className="text-[11px] font-semibold bg-[#0B132B]/85 backdrop-blur-sm text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md shadow-xs">
                        Available Today
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold bg-[#0B132B]/85 backdrop-blur-sm text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md shadow-xs">
                        {room.status === 'cleaning' ? 'Turnover Prep' : 'Currently Reserved'}
                      </span>
                    )}
                  </div>

                  {/* Room Number Indicator */}
                  <div className="absolute bottom-3 left-3 bg-[#0B132B]/85 backdrop-blur-sm text-slate-200 text-[11px] px-2.5 py-1 rounded-md font-mono border border-white/10">
                    Suite {room.number} · Floor {room.floor}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Title and Star Rating */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-serif font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                        {room.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-medium text-slate-700 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="tabular-nums font-mono font-semibold">{room.rating.toFixed(1)}</span>
                        <span className="text-slate-400">({room.reviewCount})</span>
                      </div>
                    </div>

                    {/* Zero-Pill Unboxed Metadata */}
                    <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-3">
                      <span>{room.beds}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-mono">{room.sizeSqFt} sq ft</span>
                      <span aria-hidden="true">·</span>
                      <span>Up to {room.capacity} Guests</span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-light">
                      {room.description}
                    </p>

                    {/* Amenity Highlights */}
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 mb-5">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Strip */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-slate-400">Tariff from</div>
                      <div className="text-xl font-bold text-slate-900">
                        <span className="font-mono tabular-nums text-slate-900">₹{room.pricePerNight.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] font-normal text-slate-500 ml-1">/ night</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectRoom(room)}
                        className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Full Room Specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onBookRoom(room)}
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all duration-150 whitespace-nowrap shadow-xs hover:shadow-md cursor-pointer"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
