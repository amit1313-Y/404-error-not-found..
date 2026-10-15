import React, { useState } from 'react';
import { Booking, Room } from '../types';
import { formatIndianDate } from '../data/initialData';
import { X, Search, CheckCircle2, AlertCircle, Printer, XCircle, ShieldCheck } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  rooms: Room[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  rooms,
  onCancelBooking
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [cancelCandidateId, setCancelCandidateId] = useState<string | null>(null);

  const trimmed = query.trim().toLowerCase();

  // Find matching bookings
  const matchedBookings = trimmed
    ? bookings.filter(
        b =>
          b.bookingReference.toLowerCase().includes(trimmed) ||
          b.guestEmail.toLowerCase().includes(trimmed) ||
          b.guestName.toLowerCase().includes(trimmed)
      )
    : bookings.slice(0, 4); // show latest 4 by default for easy inspection

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">Confirmed</span>;
      case 'checked-in':
        return <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">Currently In-House</span>;
      case 'checked-out':
        return <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">Completed Stay</span>;
      case 'cancelled':
        return <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">Cancelled</span>;
    }
  };

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancelCandidateId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Header */}
        <div className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between bg-[#0B132B] text-white">
          <div>
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest block">
              Guest Services Portal
            </span>
            <h3 className="text-lg font-serif font-semibold text-white">
              Manage Your Reservations & Folios
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Look up by Booking Reference (e.g. GV-2029-1021) or Guest Email:
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter booking reference (GV-...) or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-xs font-medium pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-colors"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Cancel Confirmation Alert modal */}
        {cancelCandidateId && (
          <div className="m-6 p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-900">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              <span>Are you sure you want to cancel this reservation?</span>
            </div>
            <p className="text-[11px] text-rose-800">
              The assigned suite will immediately be marked as available for other guests on the front desk rack.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleConfirmCancel(cancelCandidateId)}
                className="px-3 py-1.5 text-xs font-semibold bg-rose-700 hover:bg-rose-800 text-white rounded-lg transition-colors cursor-pointer"
              >
                Yes, Cancel Reservation
              </button>
              <button
                type="button"
                onClick={() => setCancelCandidateId(null)}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-rose-300 text-rose-800 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
              >
                Keep Reservation
              </button>
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {matchedBookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p>No reservations found matching "{query}".</p>
              <p className="text-[11px] text-slate-400 mt-1">Please double-check your confirmation reference or registered email.</p>
            </div>
          ) : (
            matchedBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400/60 transition-colors shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm tracking-wide">
                        {b.bookingReference}
                      </span>
                      {getStatusBadge(b.status)}
                    </div>
                    <p className="text-xs font-medium text-slate-900 mt-0.5">
                      {b.roomName} · Suite {b.roomNumber}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 block">Total Folio Amount</span>
                    <span className="text-sm font-bold font-mono text-slate-900">
                      ₹{b.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Primary Guest</span>
                    <span className="font-medium text-slate-800">{b.guestName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Stay Dates</span>
                    <span>{formatIndianDate(b.checkInDate)} to {formatIndianDate(b.checkOutDate)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Occupancy</span>
                    <span>{b.adults} Adults {b.children > 0 ? `, ${b.children} Ch` : ''}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Settlement</span>
                    <span className="capitalize">{b.paymentStatus} via {b.paymentMethod}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Booked on {new Date(b.createdAt).toLocaleDateString('en-IN')}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Folio
                    </button>

                    {b.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => setCancelCandidateId(b.id)}
                        className="px-3 py-1.5 text-xs text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer border border-rose-200"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
