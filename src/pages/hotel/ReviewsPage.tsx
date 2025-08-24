import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import ReviewCard from '../../components/hotel/ReviewCard';
import { Star, Plus, User, Upload } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const { reviews, addReview } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    roomType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview(formData);
    setFormData({
      customerName: '',
      rating: 5,
      comment: '',
      roomType: '',
    });
    setShowForm(false);
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Guest Reviews</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Read what our guests have to say about their experience at Hotel Infinity
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl font-bold text-yellow-500">{averageRating.toFixed(1)}</span>
                <Star className="h-8 w-8 text-yellow-400 fill-current ml-2" />
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{reviews.length}</div>
              <p className="text-gray-600">Total Reviews</p>
            </div>
            
            <div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room/Hall Type (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.roomType}
                    onChange={(e) => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
                    placeholder="e.g., Deluxe AC Suite"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= formData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Tell us about your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200"
                >
                  Submit Review
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* No Reviews */}
        {reviews.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">No reviews yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Be the first to review!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;