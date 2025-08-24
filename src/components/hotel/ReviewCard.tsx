import React from 'react';
import { Review } from '../../contexts/AppContext';
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {review.image ? (
            <img
              src={review.image}
              alt={review.customerName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {review.customerName}
            </h3>
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
          </div>

          {/* Room/Hall Type */}
          {review.roomType && (
            <p className="text-sm text-blue-600 font-medium mb-2">
              {review.roomType}
            </p>
          )}

          {/* Comment */}
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {review.comment}
          </p>

          {/* Date */}
          <p className="text-xs text-gray-400">
            {new Date(review.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;