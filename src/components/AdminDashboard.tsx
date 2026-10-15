import React, { useState } from 'react';
import { Room, Booking, HousekeepingTask, RoomStatus, ProjectTeam } from '../types';
import { formatIndianDate } from '../data/initialData';
import { 
  Building2, 
  BedDouble, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Search, 
  Sparkles, 
  TrendingUp, 
  LogOut, 
  LogIn, 
  XCircle, 
  FileText, 
  RotateCcw, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  UserCheck,
  GraduationCap,
  Award,
  Edit3,
  X,
  Printer
} from 'lucide-react';

interface AdminDashboardProps {
  rooms: Room[];
  bookings: Booking[];
  tasks: HousekeepingTask[];
  team?: ProjectTeam;
  onUpdateTeam?: (updated: ProjectTeam) => void;
  onUpdateRoomStatus: (roomId: string, status: RoomStatus) => void;
  onCheckInBooking: (bookingId: string) => void;
  onCheckOutBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onCreateWalkInBooking: (data: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomId: string;
    nights: number;
    adults: number;
  }) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  rooms,
  bookings,
  tasks,
  team,
  onUpdateTeam,
  onUpdateRoomStatus,
  onCheckInBooking,
  onCheckOutBooking,
  onCancelBooking,
  onCompleteTask,
  onCreateWalkInBooking,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'rack' | 'reservations' | 'housekeeping' | 'walkin' | 'team'>('rack');
  const [reservationSearch, setReservationSearch] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState<string>('all');
  
  // Selected booking for Folio view
  const [folioBooking, setFolioBooking] = useState<Booking | null>(null);

  // Walk-in form state
  const [walkInName, setWalkInName] = useState('');
  const [walkInEmail, setWalkInEmail] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInRoomId, setWalkInRoomId] = useState('');
  const [walkInNights, setWalkInNights] = useState('2');
  const [walkInAdults, setWalkInAdults] = useState('2');
  const [walkInError, setWalkInError] = useState<string | null>(null);

  // Reset confirmation state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Edit Team state
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editTeamLeader, setEditTeamLeader] = useState(team?.teamLeader?.name || 'Partik');
  const [editLeaderRoll, setEditLeaderRoll] = useState(team?.teamLeader?.rollNumber || '');
  const [editMember1, setEditMember1] = useState(team?.teamMembers?.[0]?.name || 'Amit');
  const [editMember1Roll, setEditMember1Roll] = useState(team?.teamMembers?.[0]?.rollNumber || '');
  const [editMember2, setEditMember2] = useState(team?.teamMembers?.[1]?.name || 'Kartik');
  const [editMember2Roll, setEditMember2Roll] = useState(team?.teamMembers?.[1]?.rollNumber || '');
  const [editMember3, setEditMember3] = useState(team?.teamMembers?.[2]?.name || 'Ashwani');
  const [editMember3Roll, setEditMember3Roll] = useState(team?.teamMembers?.[2]?.rollNumber || '');
  const [editGuide, setEditGuide] = useState(team?.facultyGuide?.name || 'Anjali Kapoor');

  // KPI Calculations
  const totalRooms = rooms.length;
  const availableCount = rooms.filter(r => r.status === 'available').length;
  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const reservedCount = rooms.filter(r => r.status === 'reserved').length;
  const cleaningCount = rooms.filter(r => r.status === 'cleaning').length;
  const maintenanceCount = rooms.filter(r => r.status === 'maintenance').length;

  const occupancyRate = totalRooms > 0 ? Math.round(((occupiedCount + reservedCount) / totalRooms) * 100) : 0;

  const todayInHouse = bookings.filter(b => b.status === 'checked-in').length;
  const todayCheckIns = bookings.filter(b => b.status === 'confirmed').length;

  const totalRevenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  // Ledger filtering
  const filteredBookings = bookings.filter((b) => {
    if (reservationStatusFilter !== 'all' && b.status !== reservationStatusFilter) {
      return false;
    }
    if (reservationSearch.trim()) {
      const q = reservationSearch.toLowerCase();
      return (
        b.bookingReference.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.roomNumber.toLowerCase().includes(q) ||
        b.guestEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const availableRoomsForWalkIn = rooms.filter(r => r.status === 'available');

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInRoomId || !walkInName || !walkInEmail) {
      setWalkInError('Please select a suite and fill in the guest name and email.');
      return;
    }
    setWalkInError(null);
    onCreateWalkInBooking({
      guestName: walkInName,
      guestEmail: walkInEmail,
      guestPhone: walkInPhone || '+91 98765 00000',
      roomId: walkInRoomId,
      nights: Number(walkInNights),
      adults: Number(walkInAdults)
    });
    // Reset form
    setWalkInName('');
    setWalkInEmail('');
    setWalkInPhone('');
    setWalkInRoomId('');
    setActiveTab('reservations');
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateTeam) {
      const updated: ProjectTeam = {
        teamId: team?.teamId || 'TEAM-2029-GUVI-042',
        teamName: '404 ERROR NOT FOUND',
        university: 'Galgotias University',
        section: '30',
        projectCategory: '3rd Semester Academic Project Portal',
        batch: team?.batch || '2029 Pass-Out',
        department: team?.department || 'Computer Science & Engineering',
        teamLeader: {
          name: editTeamLeader.trim() || 'Partik',
          rollNumber: editLeaderRoll.trim() || ''
        },
        teamMembers: [
          { name: editMember1.trim() || 'Amit', rollNumber: editMember1Roll.trim() || '' },
          { name: editMember2.trim() || 'Kartik', rollNumber: editMember2Roll.trim() || '' },
          { name: editMember3.trim() || 'Ashwani', rollNumber: editMember3Roll.trim() || '' }
        ],
        facultyGuide: {
          name: editGuide.trim() || 'Anjali Kapoor',
          department: team?.facultyGuide?.department || 'Computer Science & Engineering'
        },
        status: team?.status || 'Approved in Review Zero'
      };
      onUpdateTeam(updated);
    }
    setIsEditingTeam(false);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Academic & Executive Banner */}
      <div className="bg-[#0B132B] rounded-2xl p-6 sm:p-8 text-white border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
              Front Desk & Property Management Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl font-light">
              Live room rack matrix, instant guest check-in dispatch, housekeeping maintenance pipeline, and revenue ledger.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-[#070D1E] px-4 py-2.5 rounded-xl border border-amber-500/30 text-left">
              <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider block">Official Team</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider">
                {team?.teamName || '404 ERROR NOT FOUND'}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('walkin')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              New Walk-In Check-In
            </button>
            
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-2.5 text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between gap-4 flex-wrap text-xs text-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Reset room inventory and bookings to pristine initial state?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { onResetData(); setShowResetConfirm(false); }}
              className="px-3 py-1.5 bg-[#0B132B] hover:bg-slate-900 text-amber-300 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Yes, Reset Demo Data
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Occupancy Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Occupancy Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {occupancyRate}%
          </p>
          <span className="text-[11px] text-slate-400">
            {occupiedCount + reservedCount} of {totalRooms} rooms committed
          </span>
        </div>

        {/* Available Rooms */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Available</span>
            <BedDouble className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-emerald-700">
            {availableCount}
          </p>
          <span className="text-[11px] text-slate-400">Ready for check-in</span>
        </div>

        {/* Occupied In-House */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>In-House Guests</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {todayInHouse}
          </p>
          <span className="text-[11px] text-slate-400">Suites occupied</span>
        </div>

        {/* Pending Check-ins */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Arrivals Expected</span>
            <LogIn className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-amber-700">
            {todayCheckIns}
          </p>
          <span className="text-[11px] text-slate-400">Awaiting front desk check-in</span>
        </div>

        {/* Turnover & Cleaning */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Housekeeping</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-purple-700">
            {cleaningCount}
          </p>
          <span className="text-[11px] text-slate-400">{maintenanceCount} in maintenance</span>
        </div>

        {/* Total Folio Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500/30 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Folio Revenue</span>
            <span className="font-mono text-xs font-semibold text-amber-700">INR (₹)</span>
          </div>
          <p className="text-xl font-bold font-mono tabular-nums text-slate-900">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-400">Recorded bookings</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('rack')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'rack'
              ? 'bg-[#0B132B] text-amber-300 border border-amber-500/30 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Interactive Room Rack (Floors 1-3)
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'reservations'
              ? 'bg-[#0B132B] text-amber-300 border border-amber-500/30 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Reservations Master Ledger</span>
          <span className="px-1.5 py-0.2 bg-slate-200 text-slate-800 rounded-full text-[10px] font-mono">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('housekeeping')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'housekeeping'
              ? 'bg-[#0B132B] text-amber-300 border border-amber-500/30 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Housekeeping & Maintenance</span>
          <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-full text-[10px] font-mono">
            {tasks.filter(t => t.status !== 'completed').length} Active
          </span>
        </button>

        <button
          onClick={() => setActiveTab('walkin')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'walkin'
              ? 'bg-[#0B132B] text-amber-300 border border-amber-500/30 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Front Desk Walk-In Intake
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'team'
              ? 'bg-[#0B132B] text-amber-300 border border-amber-500/30 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
          <span>Team Management</span>
        </button>
      </div>

      {/* TAB 1: Interactive Room Rack */}
      {activeTab === 'rack' && (
        <div className="space-y-6">
          <div className="bg-slate-100 p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border border-slate-200">
            <span className="font-semibold text-slate-800">Suite Status Legend & Front-Desk Manual Override:</span>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available ({availableCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Occupied ({occupiedCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Reserved ({reservedCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Turnover Cleaning ({cleaningCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Maintenance ({maintenanceCount})
              </span>
            </div>
          </div>

          {[1, 2, 3].map((floorNumber) => {
            const floorRooms = rooms.filter(r => r.floor === floorNumber);

            return (
              <div key={floorNumber} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-serif font-semibold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-700" />
                    Floor {floorNumber} Matrix · {floorRooms.length} Suites
                  </h3>
                  <span className="text-xs text-slate-400">
                    {floorRooms.filter(r => r.status === 'available').length} available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {floorRooms.map((room) => {
                    const statusColors: Record<RoomStatus, string> = {
                      available: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
                      occupied: 'border-blue-200 bg-blue-50/40 text-blue-900',
                      reserved: 'border-amber-200 bg-amber-50/40 text-amber-900',
                      cleaning: 'border-purple-200 bg-purple-50/40 text-purple-900',
                      maintenance: 'border-rose-200 bg-rose-50/40 text-rose-900'
                    };

                    const currentBooking = bookings.find(b => b.id === room.currentBookingId && b.status !== 'cancelled');

                    return (
                      <div
                        key={room.id}
                        className={`p-4 rounded-xl border transition-all ${statusColors[room.status]} flex flex-col justify-between space-y-3`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <span className="font-mono font-bold text-base text-slate-900">
                                #{room.number}
                              </span>
                              <p className="text-xs font-medium text-slate-800 mt-0.5 leading-tight">{room.name}</p>
                              <span className="text-[10px] text-slate-500 font-mono">₹{room.pricePerNight.toLocaleString('en-IN')}/nt</span>
                            </div>

                            <span className="capitalize text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 shadow-2xs border border-black/5">
                              {room.status}
                            </span>
                          </div>

                          {currentBooking && (
                            <div className="mt-2 pt-2 border-t border-black/5 text-[11px] space-y-0.5">
                              <p className="font-semibold text-slate-900 truncate">
                                Guest: {currentBooking.guestName}
                              </p>
                              <p className="text-slate-500 truncate font-mono text-[10px]">
                                Ref: {currentBooking.bookingReference}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Status Change Dropdown */}
                        <div className="pt-2 border-t border-black/5">
                          <label className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">
                            Override Status:
                          </label>
                          <select
                            value={room.status}
                            onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as RoomStatus)}
                            className="w-full text-xs bg-white/90 border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="reserved">Reserved</option>
                            <option value="cleaning">Turnover Cleaning</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Reservations Master Ledger */}
      {activeTab === 'reservations' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-4">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Front-Desk Master Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Real-time booking verification, check-in dispatch, and checkout audit trail.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest, suite, ref..."
                  value={reservationSearch}
                  onChange={(e) => setReservationSearch(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <select
                value={reservationStatusFilter}
                onChange={(e) => setReservationStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed (Pending Arrival)</option>
                <option value="checked-in">Checked-In (In-House)</option>
                <option value="checked-out">Checked-Out (Archived)</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-semibold border-y border-slate-200">
                <tr>
                  <th className="px-5 py-3">Reference & Guest</th>
                  <th className="px-5 py-3">Suite Reserved</th>
                  <th className="px-5 py-3">Dates & Nights</th>
                  <th className="px-5 py-3">Folio Amount (INR)</th>
                  <th className="px-5 py-3">Reservation Status</th>
                  <th className="px-5 py-3 text-right">Front Desk Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      No reservation records match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-slate-900 block">{b.bookingReference}</span>
                        <span className="font-medium text-slate-800">{b.guestName}</span>
                        <span className="text-[10px] text-slate-400 block">{b.guestEmail}</span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-900 block">Suite #{b.roomNumber}</span>
                        <span className="text-slate-500 text-[11px]">{b.roomName}</span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span>{formatIndianDate(b.checkInDate)} → {formatIndianDate(b.checkOutDate)}</span>
                        <span className="text-[10px] text-slate-400 block">({b.nights} night{b.nights > 1 ? 's' : ''}, {b.adults}A)</span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-slate-900">
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-700 block capitalize">{b.paymentStatus}</span>
                      </td>

                      <td className="px-5 py-3.5">
                        {b.status === 'confirmed' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            Confirmed
                          </span>
                        )}
                        {b.status === 'checked-in' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                            In-House
                          </span>
                        )}
                        {b.status === 'checked-out' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            Checked Out
                          </span>
                        )}
                        {b.status === 'cancelled' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                            Cancelled
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right space-x-1 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setFolioBooking(b)}
                          className="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                        >
                          View Folio
                        </button>

                        {b.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => onCheckInBooking(b.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded transition-colors cursor-pointer shadow-2xs"
                          >
                            Check In
                          </button>
                        )}

                        {b.status === 'checked-in' && (
                          <button
                            type="button"
                            onClick={() => onCheckOutBooking(b.id)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded transition-colors cursor-pointer shadow-2xs"
                          >
                            Check Out
                          </button>
                        )}

                        {b.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => onCancelBooking(b.id)}
                            className="px-2 py-1 text-[11px] text-rose-600 hover:text-rose-800 rounded transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Housekeeping & Maintenance */}
      {activeTab === 'housekeeping' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Housekeeping Turnover & Maintenance Queue
              </h3>
              <p className="text-xs text-slate-500">
                Automatic task generation upon guest checkout. Mark tasks completed to return suites to Available inventory.
              </p>
            </div>
            <span className="text-xs text-purple-800 font-semibold bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200 self-start sm:self-auto">
              {tasks.filter(t => t.status !== 'completed').length} Tasks Pending
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => {
              const isDone = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    isDone
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-purple-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        Suite #{task.roomNumber}
                      </span>
                      <p className="text-xs font-semibold text-purple-900 mt-0.5">{task.taskType}</p>
                    </div>

                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      task.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-800'
                        : task.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{task.notes}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Staff: <strong className="text-slate-700">{task.assignedStaff}</strong></span>
                    <span>{task.scheduledTime}</span>
                  </div>

                  <div className="pt-1">
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed & Suite Released
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onCompleteTask(task.id)}
                        className="w-full py-1.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Complete Inspection & Release Suite
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Walk-In Intake */}
      {activeTab === 'walkin' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs max-w-2xl mx-auto space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider block">
              Front Desk Immediate Check-In
            </span>
            <h3 className="text-lg font-serif font-bold text-slate-900 mt-0.5">
              Guest Walk-In Registration
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Directly assign an available suite, generate instant booking folio in INR (₹), and execute front-desk check-in.
            </p>
          </div>

          {walkInError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
              {walkInError}
            </div>
          )}

          <form onSubmit={handleWalkInSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Available Suite *
              </label>
              <select
                required
                value={walkInRoomId}
                onChange={(e) => setWalkInRoomId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="">-- Choose from {availableRoomsForWalkIn.length} Available Suites --</option>
                {availableRoomsForWalkIn.map(r => (
                  <option key={r.id} value={r.id}>
                    Suite #{r.number} - {r.name} (₹{r.pricePerNight.toLocaleString('en-IN')}/night)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={walkInEmail}
                  onChange={(e) => setWalkInEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nights of Stay
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={walkInNights}
                  onChange={(e) => setWalkInNights(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Adults
                </label>
                <select
                  value={walkInAdults}
                  onChange={(e) => setWalkInAdults(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Create Walk-In & Check In
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: Team Management */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                <GraduationCap className="w-4 h-4 text-amber-700" />
                <span>Galgotias University · Section 30</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Academic Registration & Team Details
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                3rd Semester Academic Project Portal · Evaluator & Faculty Verification Record
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0B132B] px-4 py-2.5 rounded-xl border border-amber-500/30 text-white">
                <span className="text-[10px] uppercase font-semibold text-amber-400 block tracking-wider">Official Team Name</span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">
                  {team?.teamName || '404 ERROR NOT FOUND'}
                </span>
              </div>

              <button
                onClick={() => setIsEditingTeam(true)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                Edit Credentials
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Info Card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Team Profile & Registration</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Official Team Name</span>
                  <span className="font-mono font-bold text-slate-900 tracking-wider">
                    {team?.teamName || '404 ERROR NOT FOUND'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Team ID</span>
                  <span className="font-mono font-bold text-amber-700">
                    {team?.teamId || 'TEAM-2029-GUVI-042'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Batch</span>
                  <span className="font-semibold text-slate-900">{team?.batch || '2029 Pass-Out'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Evaluation Status</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {team?.status || 'Approved in Review Zero'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">University & Section</span>
                  <span className="text-slate-700">Galgotias University · Section 30</span>
                </div>
              </div>
            </div>

            {/* Team Leader Card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <UserCheck className="w-4 h-4 text-amber-700" />
                <span>Team Leader Details</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Team Leader</span>
                  <span className="font-semibold text-slate-900 text-sm">{team?.teamLeader?.name || 'Partik'}</span>
                </div>
                {team?.teamLeader?.rollNumber ? (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase block">University Roll Number</span>
                    <span className="font-mono text-slate-900 font-semibold">{team.teamLeader.rollNumber}</span>
                  </div>
                ) : null}
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Department</span>
                  <span className="text-slate-700">{team?.department || 'Computer Science & Engineering'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Academic Affiliation</span>
                  <span className="text-slate-700">Section 30 · Galgotias University</span>
                </div>
              </div>
            </div>

            {/* Faculty Guide Card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Faculty Guide / Mentor</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Faculty Guide / Mentor</span>
                  <span className="font-semibold text-slate-900 text-sm">{team?.facultyGuide?.name || 'Anjali Kapoor'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Department</span>
                  <span className="text-slate-700">{team?.facultyGuide?.department || 'Computer Science & Engineering'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Institution</span>
                  <span className="text-slate-700">Galgotias University</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              Registered Team Members
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(team?.teamMembers || [
                { name: 'Amit', rollNumber: '' },
                { name: 'Kartik', rollNumber: '' },
                { name: 'Ashwani', rollNumber: '' }
              ]).map((member, index) => (
                <div key={index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Team Member {index + 1}</span>
                  <p className="font-semibold text-slate-900 mt-0.5 text-sm">{member.name}</p>
                  {member.rollNumber ? (
                    <p className="font-mono text-[11px] text-slate-600 mt-0.5">Roll: {member.rollNumber}</p>
                  ) : null}
                  <span className="text-[10px] text-amber-800 font-medium block mt-1">Section 30 · Galgotias University</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {isEditingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-slate-900 text-base">
                Edit Academic Registration & Team Details
              </h3>
              <button
                onClick={() => setIsEditingTeam(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Team Name (Fixed)</label>
                <input
                  type="text"
                  disabled
                  value="404 ERROR NOT FOUND"
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Team Leader Name</label>
                  <input
                    type="text"
                    required
                    value={editTeamLeader}
                    onChange={(e) => setEditTeamLeader(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Leader Roll Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={editLeaderRoll}
                    onChange={(e) => setEditLeaderRoll(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2 font-mono focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-700 block">Team Members:</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Member 1 (Amit)"
                    value={editMember1}
                    onChange={(e) => setEditMember1(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number (Optional)"
                    value={editMember1Roll}
                    onChange={(e) => setEditMember1Roll(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 font-mono focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Member 2 (Kartik)"
                    value={editMember2}
                    onChange={(e) => setEditMember2(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number (Optional)"
                    value={editMember2Roll}
                    onChange={(e) => setEditMember2Roll(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 font-mono focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Member 3 (Ashwani)"
                    value={editMember3}
                    onChange={(e) => setEditMember3(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number (Optional)"
                    value={editMember3Roll}
                    onChange={(e) => setEditMember3Roll(e.target.value)}
                    className="border border-slate-300 rounded-lg p-2 font-mono focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty Guide / Mentor</label>
                <input
                  type="text"
                  value={editGuide}
                  onChange={(e) => setEditGuide(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingTeam(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B132B] hover:bg-slate-900 text-amber-300 font-semibold rounded-lg cursor-pointer"
                >
                  Save Team Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Folio Breakdown Modal */}
      {folioBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-xs text-slate-500 font-mono block">{folioBooking.bookingReference}</span>
                <h3 className="text-lg font-serif font-bold text-slate-900">Official Guest Folio Receipt</h3>
              </div>
              <button
                onClick={() => setFolioBooking(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Guest Name:</span>
                <span className="font-semibold text-slate-900">{folioBooking.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span>Suite Assigned:</span>
                <span className="font-semibold text-slate-900">Suite #{folioBooking.roomNumber} ({folioBooking.roomName})</span>
              </div>
              <div className="flex justify-between">
                <span>Stay Dates:</span>
                <span>{formatIndianDate(folioBooking.checkInDate)} → {formatIndianDate(folioBooking.checkOutDate)} ({folioBooking.nights} nt)</span>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between">
                  <span>Suite Charges:</span>
                  <span className="font-mono tabular-nums font-semibold">₹{folioBooking.roomRateTotal.toLocaleString('en-IN')}</span>
                </div>
                {folioBooking.addOnsTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Add-on Amenities:</span>
                    <span className="font-mono tabular-nums">+₹{folioBooking.addOnsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Resort Cess:</span>
                  <span className="font-mono tabular-nums">+₹{folioBooking.resortFeeTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (12%):</span>
                  <span className="font-mono tabular-nums">+₹{folioBooking.taxesTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-slate-900 font-bold text-sm">
                <span>Total Settled:</span>
                <span className="text-amber-900 font-mono tabular-nums text-lg">
                  ₹{folioBooking.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-500">
                Payment status: <span className="font-semibold text-emerald-800 uppercase">{folioBooking.paymentStatus}</span> ({folioBooking.paymentMethod})
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Folio
              </button>
              <button
                type="button"
                onClick={() => setFolioBooking(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0B132B] hover:bg-slate-900 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
