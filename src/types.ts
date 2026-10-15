export type RoomType = 'deluxe' | 'suite' | 'penthouse' | 'villa' | 'standard';

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'cleaning' | 'maintenance';

export interface Room {
  id: string;
  number: string;
  name: string;
  type: RoomType;
  pricePerNight: number;
  capacity: number;
  beds: string;
  sizeSqFt: number;
  floor: number;
  image: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  status: RoomStatus;
  currentBookingId?: string;
}

export type BookingStatus = 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface BookingAddOns {
  breakfast: boolean;
  airportPickup: boolean;
  spaPackage: boolean;
  lateCheckout: boolean;
}

export interface Booking {
  id: string;
  bookingReference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomType: RoomType;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  addOns: BookingAddOns;
  roomRateTotal: number;
  addOnsTotal: number;
  taxesTotal: number;
  resortFeeTotal: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  specialRequests?: string;
  createdAt: string;
  checkedInTime?: string;
  checkedOutTime?: string;
}

export type TaskType = 'Cleaning' | 'Turn-down' | 'Deep Clean' | 'Inspection' | 'Maintenance';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface HousekeepingTask {
  id: string;
  roomId: string;
  roomNumber: string;
  taskType: TaskType;
  priority: TaskPriority;
  assignedStaff: string;
  status: TaskStatus;
  notes: string;
  scheduledTime: string;
}

export interface SearchFilters {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  roomType: string;
  minPrice: number;
  maxPrice: number;
  amenity: string;
  searchQuery: string;
}

export interface ProjectTeam {
  teamId: string;
  teamName: string;
  university?: string;
  section?: string;
  projectCategory?: string;
  batch?: string;
  department?: string;
  teamLeader: {
    name: string;
    rollNumber?: string;
  };
  teamMembers: Array<{
    name: string;
    rollNumber?: string;
  }>;
  facultyGuide: {
    name: string;
    department: string;
  };
  status: string;
}
