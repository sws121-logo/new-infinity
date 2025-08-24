import React, { useState } from 'react';
import { PartyHall } from '../../contexts/AppContext';
import { Users, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface HallCardProps {
  hall: PartyHall;
  onBookNow?: (hall: PartyHall) => void;
}

const HallCard: React.FC<HallCardProps> = ({ hall, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hall.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hall.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={hall.images[currentImageIndex]}
          alt={hall.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Image Navigation */}
        {hall.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            hall.available 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {hall.available ? 'Available' : 'Booked'}
          </span>
        </div>

        {/* Image Dots */}
        {hall.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {hall.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {hall.name}
          </h3>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{hall.capacity}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {hall.description}
        </p>

        {/* Amenities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {hall.amenities.slice(0, 4).map((amenity, index) => (
              <div
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
              >
                {amenity}
              </div>
            ))}
            {hall.amenities.length > 4 && (
              <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                +{hall.amenities.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-left">
            <span className="text-2xl font-bold text-blue-600">₹{hall.price}</span>
            <span className="text-gray-600 text-sm ml-1">/event</span>
          </div>
          
          {onBookNow && (
            <button
              onClick={() => onBookNow(hall)}
              disabled={!hall.available}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                hall.available
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {hall.available ? 'Book Event' : 'Unavailable'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HallCard;