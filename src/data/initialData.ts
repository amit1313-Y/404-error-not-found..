import { Room, Booking, HousekeepingTask, ProjectTeam } from '../types';

export const INITIAL_TEAM: ProjectTeam = {
  teamId: 'TEAM-2029-GUVI-042',
  teamName: '404 ERROR NOT FOUND',
  university: 'Galgotias University',
  section: '30',
  projectCategory: '3rd Semester Academic Project Portal',
  batch: '2029 Pass-Out',
  department: 'Computer Science & Engineering',
  teamLeader: {
    name: 'Partik',
    rollNumber: ''
  },
  teamMembers: [
    { name: 'Amit', rollNumber: '' },
    { name: 'Kartik', rollNumber: '' },
    { name: 'Ashwani', rollNumber: '' }
  ],
  facultyGuide: {
    name: 'Anjali Kapoor',
    department: 'Computer Science & Engineering'
  },
  status: 'Approved in Review Zero'
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    number: '101',
    name: 'Deluxe Garden King',
    type: 'deluxe',
    pricePerNight: 4500,
    capacity: 2,
    beds: '1 King Bed',
    sizeSqFt: 480,
    floor: 1,
    image: '/src/assets/images/room_deluxe_king_suite_1791546219172.jpg',
    description: 'Immerse yourself in tranquility with lush tropical garden courtyard views, handcrafted teak furnishings, high-thread-count cotton linens, and a marble rain shower.',
    amenities: ['Garden View', 'Rain Shower', 'Tea & Coffee Maker', 'High-Speed Wi-Fi', 'Smart TV', 'Balcony'],
    rating: 4.9,
    reviewCount: 48,
    status: 'available'
  },
  {
    id: 'room-102',
    number: '102',
    name: 'Sanctuary Garden Villa',
    type: 'villa',
    pricePerNight: 7500,
    capacity: 3,
    beds: '1 Four-Poster King + Daybed',
    sizeSqFt: 650,
    floor: 1,
    image: '/src/assets/images/room_garden_villa_1791546251252.jpg',
    description: 'A private sanctuary featuring an open-air veranda, custom teak canopy bed, private outdoor stone soaking tub, and direct garden pathway.',
    amenities: ['Private Patio', 'Stone Soaking Tub', 'Outdoor Daybed', 'Mini-Bar Barista', 'Personal Safe', 'High-Speed Wi-Fi'],
    rating: 5.0,
    reviewCount: 62,
    status: 'occupied',
    currentBookingId: 'GV-2029-1021'
  },
  {
    id: 'room-103',
    number: '103',
    name: 'Courtyard Superior Twin',
    type: 'standard',
    pricePerNight: 3800,
    capacity: 2,
    beds: '2 Queen Beds',
    sizeSqFt: 420,
    floor: 1,
    image: '/src/assets/images/room_deluxe_king_suite_1791546219172.jpg',
    description: 'Spacious twin accommodations ideal for traveling colleagues or companions, featuring ergonomic work desks, artisan bath amenities, and quiet courtyard orientation.',
    amenities: ['2 Queen Beds', 'Work Station', 'Acoustic Soundproofing', 'Mini Refrigerator', 'Safe Deposit', 'High-Speed Wi-Fi'],
    rating: 4.8,
    reviewCount: 34,
    status: 'cleaning'
  },
  {
    id: 'room-104',
    number: '104',
    name: 'Garden Terrace Deluxe',
    type: 'deluxe',
    pricePerNight: 5200,
    capacity: 2,
    beds: '1 King Bed',
    sizeSqFt: 510,
    floor: 1,
    image: '/src/assets/images/room_garden_villa_1791546251252.jpg',
    description: 'Features an expanded private sun deck, custom ambient dimming lighting, luxury bathrobes, and complimentary morning South Indian filter coffee & tea service.',
    amenities: ['Sun Deck', 'Custom Lighting', 'Deep Soaking Tub', 'Espresso Bar', 'Turndown Service', 'High-Speed Wi-Fi'],
    rating: 4.9,
    reviewCount: 41,
    status: 'available'
  },
  {
    id: 'room-201',
    number: '201',
    name: 'Executive Pacific Suite',
    type: 'suite',
    pricePerNight: 9500,
    capacity: 3,
    beds: '1 California King + Sleeper Sofa',
    sizeSqFt: 720,
    floor: 2,
    image: '/src/assets/images/room_oceanfront_penthouse_1791546238392.jpg',
    description: 'Corner executive suite with dual-aspect ocean vistas, separate living salon, dining table for 4, and an expansive walk-in dressing room.',
    amenities: ['Ocean Panorama', 'Separate Salon', 'Travertine Bath', 'Beverage Cooler', 'Butler Service', 'High-Speed Wi-Fi'],
    rating: 4.95,
    reviewCount: 79,
    status: 'reserved',
    currentBookingId: 'GV-2029-2015'
  },
  {
    id: 'room-202',
    number: '202',
    name: 'Azure Coastal Deluxe',
    type: 'deluxe',
    pricePerNight: 6200,
    capacity: 2,
    beds: '1 King Bed',
    sizeSqFt: 520,
    floor: 2,
    image: '/src/assets/images/room_deluxe_king_suite_1791546219172.jpg',
    description: 'Perched on the second tier with uninterrupted views of the sparkling coastline, floor-to-ceiling sliding acoustic glass, and premium Bose audio.',
    amenities: ['Coastline View', 'Bose Audio', 'Rain Shower', 'Complimentary Minibar', 'Balcony Seating', 'High-Speed Wi-Fi'],
    rating: 4.88,
    reviewCount: 53,
    status: 'available'
  },
  {
    id: 'room-203',
    number: '203',
    name: 'Seaside Junior Suite',
    type: 'suite',
    pricePerNight: 7000,
    capacity: 3,
    beds: '1 King Bed + Lounge Sofa',
    sizeSqFt: 600,
    floor: 2,
    image: '/src/assets/images/room_oceanfront_penthouse_1791546238392.jpg',
    description: 'An open-concept junior suite blending coastal elegance with residential comfort, including an oversized marble bath with panoramic coastal glass.',
    amenities: ['Marble Bath', 'Ocean View', 'Lounge Area', 'Nespresso Creatista', 'Designer Toiletries', 'High-Speed Wi-Fi'],
    rating: 4.92,
    reviewCount: 39,
    status: 'occupied',
    currentBookingId: 'GV-2029-2038'
  },
  {
    id: 'room-204',
    number: '204',
    name: 'Coastal Horizon Deluxe',
    type: 'deluxe',
    pricePerNight: 5800,
    capacity: 2,
    beds: '1 King Bed',
    sizeSqFt: 490,
    floor: 2,
    image: '/src/assets/images/room_deluxe_king_suite_1791546219172.jpg',
    description: 'Crisp contemporary aesthetics bathed in golden hour natural light, featuring custom walnut woodwork and a secluded balcony overlooking the resort grounds.',
    amenities: ['Private Balcony', 'Smart Climate', 'Dyson Haircare', 'Plush Robes', 'Tea Selection', 'High-Speed Wi-Fi'],
    rating: 4.85,
    reviewCount: 29,
    status: 'maintenance'
  },
  {
    id: 'room-301',
    number: '301',
    name: 'Grand Oceanfront Penthouse',
    type: 'penthouse',
    pricePerNight: 18500,
    capacity: 4,
    beds: '1 Master California King + 1 Queen',
    sizeSqFt: 1250,
    floor: 3,
    image: '/src/assets/images/room_oceanfront_penthouse_1791546238392.jpg',
    description: 'The pinnacle of luxury hospitality. Features a 400 sq ft wrap-around sky terrace, private plunge jacuzzi, private lounge bar, and VIP 24/7 dedicated butler service.',
    amenities: ['Private Jacuzzi', 'Wrap-around Terrace', 'VIP Butler', 'Lounge Bar', 'Sub-Zero Pantry', 'High-Speed Wi-Fi'],
    rating: 5.0,
    reviewCount: 94,
    status: 'occupied',
    currentBookingId: 'GV-2029-3012'
  },
  {
    id: 'room-302',
    number: '302',
    name: 'Panoramic Horizon Penthouse',
    type: 'penthouse',
    pricePerNight: 15000,
    capacity: 4,
    beds: '2 King Beds',
    sizeSqFt: 1100,
    floor: 3,
    image: '/src/assets/images/room_oceanfront_penthouse_1791546238392.jpg',
    description: 'Elevated luxury boasting 270-degree horizon views of sea and sunset, custom Indian teak and Italian modular lounge seating, dual master suites, and bespoke art pieces.',
    amenities: ['Dual En-Suites', 'Sunset Terrace', 'Premium Sound', 'Chef Pantry', 'Priority Spa Access', 'High-Speed Wi-Fi'],
    rating: 4.98,
    reviewCount: 57,
    status: 'available'
  },
  {
    id: 'room-303',
    number: '303',
    name: 'Skyline Terrace Suite',
    type: 'suite',
    pricePerNight: 11000,
    capacity: 3,
    beds: '1 King Bed + Chaise',
    sizeSqFt: 760,
    floor: 3,
    image: '/src/assets/images/room_deluxe_king_suite_1791546219172.jpg',
    description: 'High-floor sanctuary with elevated pergola sun lounger, walk-through wardrobe, double vanity marble sinks, and Ayurvedic herbal bath infusions.',
    amenities: ['Pergola Lounger', 'Double Vanity', 'Walk-in Closet', 'Herbal Spa Kit', 'Acoustic Glass', 'High-Speed Wi-Fi'],
    rating: 4.91,
    reviewCount: 46,
    status: 'available'
  },
  {
    id: 'room-304',
    number: '304',
    name: 'Imperial Garden Suite',
    type: 'suite',
    pricePerNight: 8500,
    capacity: 3,
    beds: '1 King Bed',
    sizeSqFt: 690,
    floor: 3,
    image: '/src/assets/images/room_garden_villa_1791546251252.jpg',
    description: 'An architectural synthesis of natural wood textures and minimalist luxury overlooking both botanical gardens and the southern coastline.',
    amenities: ['Garden & Sea View', 'Freestanding Tub', 'Curated Art', 'Espresso Station', 'Pillow Menu', 'High-Speed Wi-Fi'],
    rating: 4.89,
    reviewCount: 38,
    status: 'available'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-1021',
    bookingReference: 'GV-2029-1021',
    guestName: 'Priya Sharma',
    guestEmail: 'priya.sharma@techcorp.in',
    guestPhone: '+91 98201 45892',
    roomId: 'room-102',
    roomNumber: '102',
    roomName: 'Sanctuary Garden Villa',
    roomType: 'villa',
    checkInDate: '2026-10-08',
    checkOutDate: '2026-10-12',
    nights: 4,
    adults: 2,
    children: 0,
    addOns: {
      breakfast: true,
      airportPickup: true,
      spaPackage: true,
      lateCheckout: false
    },
    roomRateTotal: 30000,
    addOnsTotal: 6250,
    taxesTotal: 4350,
    resortFeeTotal: 800,
    totalAmount: 41400,
    status: 'checked-in',
    paymentStatus: 'paid',
    paymentMethod: 'UPI (Google Pay)',
    specialRequests: 'Celebrating wedding anniversary. Extra feather pillows requested.',
    createdAt: '2026-10-02T14:30:00Z',
    checkedInTime: '2026-10-08T15:14:00Z'
  },
  {
    id: 'book-2015',
    bookingReference: 'GV-2029-2015',
    guestName: 'Dr. Rajesh Iyer',
    guestEmail: 'r.iyer@aiims-research.ac.in',
    guestPhone: '+91 98450 12890',
    roomId: 'room-201',
    roomNumber: '201',
    roomName: 'Executive Pacific Suite',
    roomType: 'suite',
    checkInDate: '2026-10-09',
    checkOutDate: '2026-10-13',
    nights: 4,
    adults: 1,
    children: 0,
    addOns: {
      breakfast: true,
      airportPickup: false,
      spaPackage: false,
      lateCheckout: true
    },
    roomRateTotal: 38000,
    addOnsTotal: 2450,
    taxesTotal: 4854,
    resortFeeTotal: 800,
    totalAmount: 46104,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'RuPay Card •••• 9032',
    specialRequests: 'Quiet room requested for virtual national medical symposium.',
    createdAt: '2026-10-05T09:12:00Z'
  },
  {
    id: 'book-2038',
    bookingReference: 'GV-2029-2038',
    guestName: 'Ananya & Vikram Malhotra',
    guestEmail: 'vikram.malhotra@delhi-ventures.in',
    guestPhone: '+91 98112 30456',
    roomId: 'room-203',
    roomNumber: '203',
    roomName: 'Seaside Junior Suite',
    roomType: 'suite',
    checkInDate: '2026-10-07',
    checkOutDate: '2026-10-10',
    nights: 3,
    adults: 2,
    children: 1,
    addOns: {
      breakfast: true,
      airportPickup: true,
      spaPackage: false,
      lateCheckout: false
    },
    roomRateTotal: 21000,
    addOnsTotal: 4900,
    taxesTotal: 3108,
    resortFeeTotal: 600,
    totalAmount: 29608,
    status: 'checked-in',
    paymentStatus: 'paid',
    paymentMethod: 'Net Banking (HDFC Bank)',
    specialRequests: 'Baby crib requested in living area.',
    createdAt: '2026-10-01T18:45:00Z',
    checkedInTime: '2026-10-07T14:48:00Z'
  },
  {
    id: 'book-3012',
    bookingReference: 'GV-2029-3012',
    guestName: 'Arjun Singhania',
    guestEmail: 'arjun.singhania@mumbai-invest.in',
    guestPhone: '+91 98200 88712',
    roomId: 'room-301',
    roomNumber: '301',
    roomName: 'Grand Oceanfront Penthouse',
    roomType: 'penthouse',
    checkInDate: '2026-10-06',
    checkOutDate: '2026-10-11',
    nights: 5,
    adults: 2,
    children: 0,
    addOns: {
      breakfast: true,
      airportPickup: true,
      spaPackage: true,
      lateCheckout: true
    },
    roomRateTotal: 92500,
    addOnsTotal: 7800,
    taxesTotal: 12036,
    resortFeeTotal: 1000,
    totalAmount: 113336,
    status: 'checked-in',
    paymentStatus: 'paid',
    paymentMethod: 'Visa Signature •••• 1109',
    specialRequests: 'VIP private airport transfer requested with luxury chauffeur.',
    createdAt: '2026-09-28T11:00:00Z',
    checkedInTime: '2026-10-06T16:20:00Z'
  },
  {
    id: 'book-1008',
    bookingReference: 'GV-2029-1008',
    guestName: 'Kavita Nair',
    guestEmail: 'kavita.nair@bengaluru-tech.in',
    guestPhone: '+91 99001 76543',
    roomId: 'room-101',
    roomNumber: '101',
    roomName: 'Deluxe Garden King',
    roomType: 'deluxe',
    checkInDate: '2026-10-04',
    checkOutDate: '2026-10-08',
    nights: 4,
    adults: 1,
    children: 0,
    addOns: {
      breakfast: false,
      airportPickup: false,
      spaPackage: false,
      lateCheckout: false
    },
    roomRateTotal: 18000,
    addOnsTotal: 0,
    taxesTotal: 2160,
    resortFeeTotal: 800,
    totalAmount: 20960,
    status: 'checked-out',
    paymentStatus: 'paid',
    paymentMethod: 'UPI (PhonePe)',
    createdAt: '2026-09-29T10:15:00Z',
    checkedInTime: '2026-10-04T15:00:00Z',
    checkedOutTime: '2026-10-08T11:10:00Z'
  }
];

export const INITIAL_TASKS: HousekeepingTask[] = [
  {
    id: 'task-1',
    roomId: 'room-103',
    roomNumber: '103',
    taskType: 'Cleaning',
    priority: 'High',
    assignedStaff: 'Sunita Devi',
    status: 'in-progress',
    notes: 'Departure turnover cleaning. Restock all bathroom lotions, Ayurvedic soaps and minibar waters.',
    scheduledTime: '10:30 AM'
  },
  {
    id: 'task-2',
    roomId: 'room-204',
    roomNumber: '204',
    taskType: 'Maintenance',
    priority: 'Urgent',
    assignedStaff: 'Ramesh Kumar',
    status: 'in-progress',
    notes: 'Smart climate sensor calibration and balcony slider lubrication.',
    scheduledTime: '11:00 AM'
  },
  {
    id: 'task-3',
    roomId: 'room-201',
    roomNumber: '201',
    taskType: 'Inspection',
    priority: 'High',
    assignedStaff: 'Pooja Verma (Supervisor)',
    status: 'pending',
    notes: 'VIP arrival preparation for Dr. Rajesh Iyer. Check welcome fruit platter and jasmine garland.',
    scheduledTime: '01:30 PM'
  },
  {
    id: 'task-4',
    roomId: 'room-101',
    roomNumber: '101',
    taskType: 'Turn-down',
    priority: 'Low',
    assignedStaff: 'Sunita Devi',
    status: 'pending',
    notes: 'Evening turn-down setup with lemongrass pillow mist and bottled mineral water.',
    scheduledTime: '06:00 PM'
  }
];

// LocalStorage version 2 with INR amounts
const STORAGE_KEYS = {
  ROOMS: 'grandvue_hotel_rooms_inr_v2',
  BOOKINGS: 'grandvue_hotel_bookings_inr_v2',
  TASKS: 'grandvue_hotel_tasks_inr_v2',
  TEAM: 'grandvue_hotel_project_team_v2'
};

export function loadStoredTeam(): ProjectTeam {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TEAM);
    if (data) {
      const parsed = JSON.parse(data);
      const hasOldLeader = !parsed.teamLeader || parsed.teamLeader.name === 'Amit Yadav';
      const hasOldGuide = !parsed.facultyGuide || parsed.facultyGuide.name === 'Dr. K. S. Ramanathan';
      const hasOldMembers = !parsed.teamMembers || parsed.teamMembers.some((m: { name?: string }) => m.name === 'Rohit Verma' || m.name === 'Neha Patel');
      const hasOldId = !parsed.teamId || parsed.teamId === 'GU-SEC30-TEAM-042';

      if (hasOldLeader || hasOldGuide || hasOldMembers || hasOldId) {
        const updatedRecord: ProjectTeam = {
          ...INITIAL_TEAM,
          ...parsed,
          teamId: 'TEAM-2029-GUVI-042',
          teamName: '404 ERROR NOT FOUND',
          university: 'Galgotias University',
          section: '30',
          projectCategory: '3rd Semester Academic Project Portal',
          batch: '2029 Pass-Out',
          department: 'Computer Science & Engineering',
          teamLeader: {
            name: 'Partik',
            rollNumber: ''
          },
          teamMembers: [
            { name: 'Amit', rollNumber: '' },
            { name: 'Kartik', rollNumber: '' },
            { name: 'Ashwani', rollNumber: '' }
          ],
          facultyGuide: {
            name: 'Anjali Kapoor',
            department: 'Computer Science & Engineering'
          },
          status: 'Approved in Review Zero'
        };
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(updatedRecord));
        return updatedRecord;
      }

      return {
        ...INITIAL_TEAM,
        ...parsed,
        teamId: parsed.teamId || 'TEAM-2029-GUVI-042',
        teamName: '404 ERROR NOT FOUND',
        university: 'Galgotias University',
        section: '30',
        projectCategory: '3rd Semester Academic Project Portal',
        batch: '2029 Pass-Out',
        department: 'Computer Science & Engineering'
      };
    }
  } catch (e) {
    console.error('Failed to load team from localStorage', e);
  }
  return INITIAL_TEAM;
}

export function saveStoredTeam(team: ProjectTeam): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  } catch (e) {
    console.error('Failed to save team to localStorage', e);
  }
}

export function loadStoredRooms(): Room[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load rooms from localStorage', e);
  }
  return INITIAL_ROOMS;
}

export function saveStoredRooms(rooms: Room[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  } catch (e) {
    console.error('Failed to save rooms to localStorage', e);
  }
}

export function loadStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load bookings from localStorage', e);
  }
  return INITIAL_BOOKINGS;
}

export function saveStoredBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
}

export function loadStoredTasks(): HousekeepingTask[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load tasks from localStorage', e);
  }
  return INITIAL_TASKS;
}

export function saveStoredTasks(tasks: HousekeepingTask[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
}

// Helper to format ISO dates to Indian DD-MM-YYYY format
export function formatIndianDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('T')[0].split('-');
    if (year && month && day) {
      return `${day}-${month}-${year}`;
    }
  } catch {
    // fallback
  }
  return dateString;
}

// Helper to format numbers into Indian Rupee (₹) format (e.g. ₹4,500)
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

