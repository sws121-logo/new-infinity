import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Room {
  id: string;
  name: string;
  type: 'AC' | 'Non-AC';
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  available: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartyHall {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
  roomType?: string;
  approved: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId?: string;
  hallId?: string;
  type: 'room' | 'hall';
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'razorpay' | 'cash' | 'card';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface HotelSettings {
  hotelName: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  taxRate: number;
}

interface AppContextType {
  rooms: Room[];
  partyHalls: PartyHall[];
  reviews: Review[];
  bookings: Booking[];
  payments: Payment[];
  hotelSettings: HotelSettings;
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // Room management
  addRoom: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRoom: (roomId: string, updates: Partial<Room>) => void;
  deleteRoom: (roomId: string) => void;
  
  // Hall management
  addHall: (hall: Omit<PartyHall, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateHall: (hallId: string, updates: Partial<PartyHall>) => void;
  deleteHall: (hallId: string) => void;
  
  // Review management
  addReview: (review: Omit<Review, 'id' | 'date' | 'approved'>) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  deleteReview: (reviewId: string) => void;
  approveReview: (reviewId: string) => void;
  
  // Booking management
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBooking: (bookingId: string, updates: Partial<Booking>) => void;
  deleteBooking: (bookingId: string) => void;
  
  // Payment management
  addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePayment: (paymentId: string, updates: Partial<Payment>) => void;
  
  // Settings management
  updateHotelSettings: (settings: Partial<HotelSettings>) => void;
  
  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Deluxe AC Suite',
    type: 'AC',
    price: 3500,
    capacity: 2,
    amenities: ['Free WiFi', 'AC', 'TV', 'Mini Bar', 'Room Service', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Luxurious AC suite with modern amenities and stunning city view.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Standard AC Room',
    type: 'AC',
    price: 2500,
    capacity: 2,
    amenities: ['Free WiFi', 'AC', 'TV', 'Room Service'],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Comfortable AC room perfect for business and leisure travelers.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Economy Non-AC Room',
    type: 'Non-AC',
    price: 1500,
    capacity: 2,
    amenities: ['Free WiFi', 'Fan', 'TV', 'Attached Bathroom'],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Budget-friendly room with essential amenities for comfortable stay.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const initialPartyHalls: PartyHall[] = [
  {
    id: '1',
    name: 'Grand Ballroom',
    capacity: 200,
    price: 25000,
    amenities: ['Sound System', 'Projector', 'Stage', 'AC', 'Catering Service', 'Decoration'],
    images: [
      'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Elegant ballroom perfect for weddings, conferences, and grand celebrations.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Crystal Hall',
    capacity: 100,
    price: 15000,
    amenities: ['Sound System', 'AC', 'Stage', 'Lighting', 'Catering Service'],
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    available: true,
    description: 'Mid-size hall ideal for corporate events, birthday parties, and family gatherings.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const initialReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Exceptional service and beautiful rooms! The AC suite was spotless and the staff was incredibly helpful.',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-15',
    roomType: 'Deluxe AC Suite',
    approved: true
  },
  {
    id: '2',
    customerName: 'Mike Chen',
    rating: 4,
    comment: 'Great value for money. The party hall was perfect for our corporate event.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-20',
    roomType: 'Crystal Hall',
    approved: true
  }
];

const initialHotelSettings: HotelSettings = {
  hotelName: 'Hotel Infinity',
  address: '123 Luxury Avenue, City Center, State 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@hotelinfinity.com',
  description: 'Experience luxury and comfort at Hotel Infinity. We provide exceptional hospitality with world-class amenities in the heart of the city.',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  cancellationPolicy: 'Free cancellation up to 24 hours before check-in. After that, one night charge applies.',
  taxRate: 18
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hotel_rooms');
    return saved ? JSON.parse(saved) : initialRooms;
  });
  
  const [partyHalls, setPartyHalls] = useState<PartyHall[]>(() => {
    const saved = localStorage.getItem('hotel_halls');
    return saved ? JSON.parse(saved) : initialPartyHalls;
  });
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('hotel_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('hotel_bookings');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('hotel_payments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [hotelSettings, setHotelSettings] = useState<HotelSettings>(() => {
    const saved = localStorage.getItem('hotel_settings');
    return saved ? JSON.parse(saved) : initialHotelSettings;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('hotel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hotel_halls', JSON.stringify(partyHalls));
  }, [partyHalls]);

  useEffect(() => {
    localStorage.setItem('hotel_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('hotel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hotel_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('hotel_settings', JSON.stringify(hotelSettings));
  }, [hotelSettings]);

  // Room management
  const addRoom = (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRoom: Room = {
      ...roomData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (roomId: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, ...updates, updatedAt: new Date().toISOString() }
        : room
    ));
  };

  const deleteRoom = (roomId: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    // Also cancel any pending bookings for this room
    setBookings(prev => prev.map(booking => 
      booking.roomId === roomId && booking.status === 'pending'
        ? { ...booking, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  // Hall management
  const addHall = (hallData: Omit<PartyHall, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newHall: PartyHall = {
      ...hallData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPartyHalls(prev => [...prev, newHall]);
  };

  const updateHall = (hallId: string, updates: Partial<PartyHall>) => {
    setPartyHalls(prev => prev.map(hall => 
      hall.id === hallId 
        ? { ...hall, ...updates, updatedAt: new Date().toISOString() }
        : hall
    ));
  };

  const deleteHall = (hallId: string) => {
    setPartyHalls(prev => prev.filter(hall => hall.id !== hallId));
    // Also cancel any pending bookings for this hall
    setBookings(prev => prev.map(booking => 
      booking.hallId === hallId && booking.status === 'pending'
        ? { ...booking, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  // Review management
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'approved'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      approved: false // Reviews need admin approval
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const updateReview = (reviewId: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, ...updates } : review
    ));
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const approveReview = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, approved: true } : review
    ));
  };

  // Booking management
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);

    // Create corresponding payment record
    if (bookingData.paymentId) {
      const newPayment: Payment = {
        id: Date.now().toString() + '_payment',
        bookingId: newBooking.id,
        amount: bookingData.totalAmount,
        status: bookingData.paymentStatus,
        paymentMethod: 'razorpay',
        transactionId: bookingData.paymentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setPayments(prev => [newPayment, ...prev]);
    }
  };

  const updateBooking = (bookingId: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, ...updates, updatedAt: new Date().toISOString() }
        : booking
    ));
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    setPayments(prev => prev.filter(payment => payment.bookingId !== bookingId));
  };

  // Payment management
  const addPayment = (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const updatePayment = (paymentId: string, updates: Partial<Payment>) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { ...payment, ...updates, updatedAt: new Date().toISOString() }
        : payment
    ));
  };

  // Settings management
  const updateHotelSettings = (settings: Partial<HotelSettings>) => {
    setHotelSettings(prev => ({ ...prev, ...settings }));
  };

  // Mock admin credentials
  const adminCredentials = {
    email: 'admin@hotelinfinity.com',
    password: 'admin123',
    name: 'Admin User'
  };

  const login = (email: string, password: string): boolean => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      const user: User = {
        id: '1',
        email: adminCredentials.email,
        name: adminCredentials.name,
        role: 'admin'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const register = (email: string, password: string, name: string): boolean => {
    // For demo purposes, only allow admin registration
    if (email === adminCredentials.email) {
      return login(email, password);
    }
    return false;
  };

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const value: AppContextType = {
    rooms,
    partyHalls,
    reviews: reviews.filter(r => r.approved), // Only show approved reviews on frontend
    bookings,
    payments,
    hotelSettings,
    currentUser,
    isAuthenticated,
    addRoom,
    updateRoom,
    deleteRoom,
    addHall,
    updateHall,
    deleteHall,
    addReview,
    updateReview,
    deleteReview,
    approveReview,
    addBooking,
    updateBooking,
    deleteBooking,
    addPayment,
    updatePayment,
    updateHotelSettings,
    login,
    logout,
    register
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Admin-only hook that includes unapproved reviews
export const useAdminApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAdminApp must be used within an AppProvider');
  }
  
  // Return all reviews for admin (including unapproved)
  const adminContext = {
    ...context,
    reviews: JSON.parse(localStorage.getItem('hotel_reviews') || '[]')
  };
  
  return adminContext;
};