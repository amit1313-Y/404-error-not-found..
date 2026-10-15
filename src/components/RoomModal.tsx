import React from 'react';
import { Room } from '../types';
import { X, Check, Star, BedDouble, Maximize, Users, ShieldCheck } from 'lucide-react';

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
  onProceedToBook: (room: Room) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  onClose,
  onProceedToBook
}) => {
  if (!room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="relative aspect-16/9 sm:aspect-21/9 bg-[#070D1E] overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B132B]/80 hover:bg-[#0B132B] text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay Details */}
          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold block mb-0.5">
                Suite {room.number} · Floor {room.floor}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold">{room.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-300 block">Tariff per night</span>
              <p className="text-2xl font-bold font-mono tabular-nums text-amber-300">₹{room.pricePerNight.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-amber-700" />
              <span>{room.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-amber-700" />
              <span className="font-mono tabular-nums">{room.sizeSqFt} sq ft living</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Up to {room.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="font-mono tabular-nums font-semibold">{room.rating} Rating</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Architectural Profile</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-light">{room.description}</p>
          </div>

          {/* Full Amenities */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Included Amenities & Services</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
              {room.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Guarantees & Policies */}
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Guaranteed Reservation & Flexible Cancellation Policy</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Check-in begins at 3:00 PM. Check-out is at 11:00 AM. Free cancellation up to 48 hours prior to arrival. All rates include daily housekeeping, optical fiber Wi-Fi, and 24/7 concierge assistance.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] text-slate-500">Transparent billing in INR (₹)</p>
              <p className="text-lg font-bold font-mono tabular-nums text-slate-900">
                ₹{room.pricePerNight.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/ night</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToBook(room);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all whitespace-nowrap shadow-xs hover:shadow-md cursor-pointer"
              >
                Proceed to Reserve Suite
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
