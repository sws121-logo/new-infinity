import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import RoomCard from '../../components/hotel/RoomCard';
import BookingModal from '../../components/hotel/BookingModal';
import { Filter, Search } from 'lucide-react';

const RoomsPage: React.FC = () => {
  const { rooms } = useApp();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'AC' | 'Non-AC'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    let matchesPrice = true;
    
    if (priceRange === 'low') matchesPrice = room.price <= 2000;
    else if (priceRange === 'medium') matchesPrice = room.price > 2000 && room.price <= 3000;
    else if (priceRange === 'high') matchesPrice = room.price > 3000;

    return matchesSearch && matchesType && matchesPrice;
  });

  const handleBookNow = (room: any) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Rooms & Suites</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose from our collection of luxurious AC and Non-AC rooms designed for your comfort and convenience
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold">Filter Rooms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Room Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="AC">AC Rooms</option>
                <option value="Non-AC">Non-AC Rooms</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹2,000</option>
                <option value="medium">₹2,000 - ₹3,000</option>
                <option value="high">Above ₹3,000</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setPriceRange('all');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rooms found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setPriceRange('all');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        item={selectedRoom}
        type="room"
      />
    </div>
  );
};

export default RoomsPage;