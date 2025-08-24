import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import HallCard from '../../components/hotel/HallCard';
import BookingModal from '../../components/hotel/BookingModal';
import { Filter, Search } from 'lucide-react';

const HallsPage: React.FC = () => {
  const { partyHalls } = useApp();
  const [selectedHall, setSelectedHall] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityRange, setCapacityRange] = useState<'all' | 'small' | 'medium' | 'large'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredHalls = partyHalls.filter((hall) => {
    const matchesSearch = hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hall.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCapacity = true;
    if (capacityRange === 'small') matchesCapacity = hall.capacity <= 100;
    else if (capacityRange === 'medium') matchesCapacity = hall.capacity > 100 && hall.capacity <= 150;
    else if (capacityRange === 'large') matchesCapacity = hall.capacity > 150;

    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = hall.price <= 15000;
    else if (priceRange === 'medium') matchesPrice = hall.price > 15000 && hall.price <= 20000;
    else if (priceRange === 'high') matchesPrice = hall.price > 20000;

    return matchesSearch && matchesCapacity && matchesPrice;
  });

  const handleBookNow = (hall: any) => {
    setSelectedHall(hall);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Party Halls & Event Venues</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Host your special events in our elegant and well-equipped party halls designed to make every occasion memorable
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold">Filter Venues</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search halls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Capacity */}
            <div>
              <select
                value={capacityRange}
                onChange={(e) => setCapacityRange(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Capacities</option>
                <option value="small">Up to 100 guests</option>
                <option value="medium">101-150 guests</option>
                <option value="large">150+ guests</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="low">Under ₹15,000</option>
                <option value="medium">₹15,000 - ₹20,000</option>
                <option value="high">Above ₹20,000</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setCapacityRange('all');
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
            Showing {filteredHalls.length} of {partyHalls.length} venues
          </p>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHalls.map((hall) => (
            <HallCard 
              key={hall.id} 
              hall={hall} 
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredHalls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCapacityRange('all');
                setPriceRange('all');
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
        item={selectedHall}
        type="hall"
      />
    </div>
  );
};

export default HallsPage;