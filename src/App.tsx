import React, { useState, useEffect } from 'react';
import { Room, Booking, HousekeepingTask, SearchFilters, RoomStatus, ProjectTeam } from './types';
import { 
  loadStoredRooms, 
  saveStoredRooms, 
  loadStoredBookings, 
  saveStoredBookings, 
  loadStoredTasks, 
  saveStoredTasks, 
  loadStoredTeam,
  saveStoredTeam,
  INITIAL_ROOMS, 
  INITIAL_BOOKINGS, 
  INITIAL_TASKS,
  INITIAL_TEAM
} from './data/initialData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoomCatalog } from './components/RoomCatalog';
import { RoomModal } from './components/RoomModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectSubmissionModal } from './components/ProjectSubmissionModal';
import { Hotel, Award, CheckCircle } from 'lucide-react';

export default function App() {
  // Navigation View: 'guest' | 'admin'
  const [currentView, setCurrentView] = useState<'guest' | 'admin'>('guest');

  // Core Data State
  const [rooms, setRooms] = useState<Room[]>(() => loadStoredRooms());
  const [bookings, setBookings] = useState<Booking[]>(() => loadStoredBookings());
  const [tasks, setTasks] = useState<HousekeepingTask[]>(() => loadStoredTasks());

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>({
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-15',
    guests: 2,
    roomType: 'all',
    minPrice: 0,
    maxPrice: 1000,
    amenity: 'all',
    searchQuery: ''
  });

  // Modals
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [team, setTeam] = useState<ProjectTeam>(() => loadStoredTeam());
  const [notification, setNotification] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveStoredRooms(rooms);
  }, [rooms]);

  useEffect(() => {
    saveStoredBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredTeam(team);
  }, [team]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearchSubmit = () => {
    const el = document.getElementById('rooms');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Booking handlers
  const handleSelectRoom = (room: Room) => {
    setSelectedRoomForDetail(room);
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoomForDetail(null);
    setSelectedRoomForBooking(room);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    
    // Update room status
    setRooms(prev => prev.map(r => {
      if (r.id === newBooking.roomId) {
        return {
          ...r,
          status: 'reserved',
          currentBookingId: newBooking.bookingReference
        };
      }
      return r;
    }));

    triggerNotification(`Reservation confirmed: Reference ${newBooking.bookingReference}`);
  };

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)));

    // Free up room
    setRooms(prev => prev.map(r => {
      if (r.id === booking.roomId) {
        return {
          ...r,
          status: 'available',
          currentBookingId: undefined
        };
      }
      return r;
    }));

    triggerNotification(`Reservation ${booking.bookingReference} has been cancelled. Room released.`);
  };

  // PMS Admin Handlers
  const handleUpdateRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms(prev => prev.map(r => (r.id === roomId ? { ...r, status } : r)));
    triggerNotification(`Room status updated to "${status}".`);
  };

  const handleCheckInBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => (b.id === bookingId ? {
      ...b,
      status: 'checked-in',
      checkedInTime: new Date().toISOString()
    } : b)));

    setRooms(prev => prev.map(r => (r.id === booking.roomId ? {
      ...r,
      status: 'occupied',
      currentBookingId: booking.bookingReference
    } : r)));

    triggerNotification(`Guest ${booking.guestName} successfully checked into Room #${booking.roomNumber}.`);
  };

  const handleCheckOutBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => (b.id === bookingId ? {
      ...b,
      status: 'checked-out',
      checkedOutTime: new Date().toISOString()
    } : b)));

    // Shift room to cleaning
    setRooms(prev => prev.map(r => (r.id === booking.roomId ? {
      ...r,
      status: 'cleaning',
      currentBookingId: undefined
    } : r)));

    // Auto-dispatch housekeeping task
    const newTask: HousekeepingTask = {
      id: `task-${Date.now()}`,
      roomId: booking.roomId,
      roomNumber: booking.roomNumber,
      taskType: 'Cleaning',
      priority: 'High',
      assignedStaff: 'Elena Ramos',
      status: 'in-progress',
      notes: `Departure turnover cleaning following check-out of ${booking.guestName}. Full sanitization and linen reset.`,
      scheduledTime: 'Immediate'
    };

    setTasks(prev => [newTask, ...prev]);

    triggerNotification(`Room #${booking.roomNumber} checked out. Housekeeping task automatically dispatched!`);
  };

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status: 'completed' } : t)));

    // If room is in cleaning, return to available!
    setRooms(prev => prev.map(r => {
      if (r.id === task.roomId && r.status === 'cleaning') {
        return {
          ...r,
          status: 'available'
        };
      }
      return r;
    }));

    triggerNotification(`Room #${task.roomNumber} inspected and verified Available!`);
  };

  const handleCreateWalkInBooking = (data: {
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomId: string;
    nights: number;
    adults: number;
  }) => {
    const room = rooms.find(r => r.id === data.roomId);
    if (!room) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `GV-2029-${randomSuffix}`;

    const today = new Date().toISOString().split('T')[0];
    const checkOutDateObj = new Date();
    checkOutDateObj.setDate(checkOutDateObj.getDate() + data.nights);
    const checkOut = checkOutDateObj.toISOString().split('T')[0];

    const roomRateTotal = room.pricePerNight * data.nights;
    const resortFeeTotal = 200 * data.nights;
    const taxesTotal = Number((roomRateTotal * 0.12).toFixed(2));
    const totalAmount = Number((roomRateTotal + taxesTotal + resortFeeTotal).toFixed(2));

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingReference: reference,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      roomId: room.id,
      roomNumber: room.number,
      roomName: room.name,
      roomType: room.type,
      checkInDate: today,
      checkOutDate: checkOut,
      nights: data.nights,
      adults: data.adults,
      children: 0,
      addOns: {
        breakfast: true,
        airportPickup: false,
        spaPackage: false,
        lateCheckout: false
      },
      roomRateTotal,
      addOnsTotal: 0,
      taxesTotal,
      resortFeeTotal,
      totalAmount,
      status: 'checked-in',
      paymentStatus: 'paid',
      paymentMethod: 'Front Desk Walk-In',
      createdAt: new Date().toISOString(),
      checkedInTime: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    setRooms(prev => prev.map(r => {
      if (r.id === room.id) {
        return {
          ...r,
          status: 'occupied',
          currentBookingId: reference
        };
      }
      return r;
    }));

    triggerNotification(`Walk-in guest ${data.guestName} assigned to Room #${room.number} and checked in!`);
  };

  const handleResetData = () => {
    setRooms(INITIAL_ROOMS);
    setBookings(INITIAL_BOOKINGS);
    setTasks(INITIAL_TASKS);
    saveStoredRooms(INITIAL_ROOMS);
    saveStoredBookings(INITIAL_BOOKINGS);
    saveStoredTasks(INITIAL_TASKS);
    triggerNotification('All room statuses and reservations restored to initial demo data.');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B132B] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-amber-500/30 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium text-slate-100">{notification}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
        team={team}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'guest' ? (
          <div>
            {/* Hero & Real-time search */}
            <HeroSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Room catalog & suites */}
            <RoomCatalog
              rooms={rooms}
              onSelectRoom={handleSelectRoom}
              onBookRoom={handleBookRoom}
            />
          </div>
        ) : (
          /* Staff PMS Console */
          <AdminDashboard
            rooms={rooms}
            bookings={bookings}
            tasks={tasks}
            team={team}
            onUpdateTeam={setTeam}
            onUpdateRoomStatus={handleUpdateRoomStatus}
            onCheckInBooking={handleCheckInBooking}
            onCheckOutBooking={handleCheckOutBooking}
            onCancelBooking={handleCancelBooking}
            onCompleteTask={handleCompleteTask}
            onCreateWalkInBooking={handleCreateWalkInBooking}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Modals */}
      <RoomModal
        room={selectedRoomForDetail}
        onClose={() => setSelectedRoomForDetail(null)}
        onProceedToBook={handleBookRoom}
      />

      <BookingModal
        room={selectedRoomForBooking}
        initialCheckIn={filters.checkInDate}
        initialCheckOut={filters.checkOutDate}
        initialGuests={filters.guests}
        onClose={() => setSelectedRoomForBooking(null)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        rooms={rooms}
        onCancelBooking={handleCancelBooking}
      />

      <ProjectSubmissionModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
        team={team}
      />

      {/* Footer */}
      <footer className="bg-[#070D1E] text-slate-400 border-t border-amber-500/20 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-white font-serif text-lg mb-2">
                <Hotel className="w-5 h-5 text-amber-400" />
                <span>GrandVue Luxury Suites & PMS</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light">
                Curated luxury living and front-desk property management system engineered for Galgotias University Section 30 academic evaluation.
              </p>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-3">System Portals</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setCurrentView('guest')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Suites & Reservation Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsMyBookingsOpen(true)} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Reservation Lookup & Folios
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('admin')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Front-Desk PMS & Room Rack
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsProjectInfoOpen(true)} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Academic Review Documentation
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-semibold mb-3">Academic Registration & Team Details</h4>
              <div className="bg-[#0B132B] p-3.5 rounded-xl border border-amber-500/30 space-y-1.5 text-[11px]">
                <p className="text-amber-300 font-semibold uppercase tracking-wider text-[10px]">Galgotias University · Section 30</p>
                <p className="text-white font-mono font-bold tracking-wider">Team: {team.teamName}</p>
                <p className="text-slate-300">Team Leader: {team.teamLeader.name}{team.teamLeader.rollNumber ? ` (${team.teamLeader.rollNumber})` : ''}</p>
                <p className="text-slate-300">Team Members: {team.teamMembers.map(m => m.name).join(', ')}</p>
                <p className="text-slate-400">Team ID: <span className="font-mono text-amber-300/80">{team.teamId}</span></p>
                <p className="text-slate-400">Faculty Guide: {team.facultyGuide.name}</p>
                <p className="text-emerald-400 text-[10px] font-medium">{team.status || 'Approved in Review Zero'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 text-slate-500 text-[11px]">
            <div className="flex items-center gap-4">
              <span>Official Team: <strong className="text-amber-400 font-mono tracking-wider">{team.teamName}</strong></span>
              <span>·</span>
              <span className="text-slate-400">Review One Evaluation Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
