import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { Star, Eye, Trash2, CheckCircle, XCircle, User, MessageSquare } from 'lucide-react';

const AdminReviews: React.FC = () => {
  const { reviews, approveReview, deleteReview, updateReview } = useAdminApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [viewingReview, setViewingReview] = useState<any>(null);

  const filteredReviews = reviews.filter(review => {
    if (selectedFilter === 'approved') return review.approved;
    if (selectedFilter === 'pending') return !review.approved;
    return true;
  });

  const handleApproveReview = (reviewId: string) => {
    approveReview(reviewId);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
    }
  };

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

  const averageRating = reviews.length > 0 
    ? reviews.filter(r => r.approved).reduce((acc, review) => acc + review.rating, 0) / reviews.filter(r => r.approved).length 
    : 0;

  const approvedReviews = reviews.filter(r => r.approved).length;
  const pendingReviews = reviews.filter(r => !r.approved).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reviews Management</h1>
        <p className="text-gray-600">Manage customer reviews and ratings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <Star className="h-8 w-8 text-yellow-600 fill-current" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{approvedReviews}</div>
              <div className="text-gray-600">Approved</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">{pendingReviews}</div>
              <div className="text-gray-600">Pending Approval</div>
            </div>
            <XCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter Reviews</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Reviews</option>
              <option value="approved">Approved Only</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
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
                <div>
                  <h3 className="font-semibold text-gray-800">{review.customerName}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!review.approved && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Pending
                  </span>
                )}
                {review.approved && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Approved
                  </span>
                )}
              </div>
            </div>

            {review.roomType && (
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {review.roomType}
                </span>
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{review.comment}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewingReview(review)}
                className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              
              {!review.approved && (
                <button
                  onClick={() => handleApproveReview(review.id)}
                  className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </button>
              )}
              
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Details Modal */}
      {viewingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Review Details</h2>
                <button
                  onClick={() => setViewingReview(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                {viewingReview.image ? (
                  <img
                    src={viewingReview.image}
                    alt={viewingReview.customerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{viewingReview.customerName}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(viewingReview.rating)}
                    <span className="ml-2 text-gray-600">({viewingReview.rating}/5)</span>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(viewingReview.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Room/Hall Type */}
              {viewingReview.roomType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Room/Hall Type</label>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {viewingReview.roomType}
                  </span>
                </div>
              )}

              {/* Review Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Review</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">{viewingReview.comment}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Status</label>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    viewingReview.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {viewingReview.approved ? 'Approved' : 'Pending Approval'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                {!viewingReview.approved && (
                  <button
                    onClick={() => {
                      handleApproveReview(viewingReview.id);
                      setViewingReview({ ...viewingReview, approved: true });
                    }}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve Review
                  </button>
                )}
                
                <button
                  onClick={() => {
                    handleDeleteReview(viewingReview.id);
                    setViewingReview(null);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete Review
                </button>
                
                <button
                  onClick={() => setViewingReview(null)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No reviews message */}
      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No reviews found</h3>
          <p className="text-gray-600">No reviews match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;