import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { Calendar, User, Phone, Mail, Eye, Edit3, Trash2, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

const AdminBookings: React.FC = () => {
  const { bookings, rooms, partyHalls, updateBooking, deleteBooking } = useAdminApp();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'room' | 'hall'>('all');
  const [viewingBooking, setViewingBooking] = useState<any>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    const matchesType = selectedType === 'all' || booking.type === selectedType;
    return matchesStatus && matchesType;
  });

  const getItemName = (booking: any) => {
    if (booking.type === 'room') {
      const room = rooms.find(r => r.id === booking.roomId);
      return room?.name || 'Unknown Room';
    } else {
      const hall = partyHalls.find(h => h.id === booking.hallId);
      return hall?.name || 'Unknown Hall';
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: any) => {
    updateBooking(bookingId, { status: newStatus });
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(bookingId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, booking) => acc + booking.totalAmount, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Bookings Management</h1>
        <p className="text-gray-600">Manage all room and hall bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{pendingBookings}</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
              <div className="text-gray-600">Confirmed</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{completedBookings}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="room">Room Bookings</option>
              <option value="hall">Hall Bookings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {booking.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {booking.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{getItemName(booking)}</div>
                    <div className="text-sm text-gray-500">
                      {booking.type === 'room' ? 'Room Booking' : 'Hall Booking'} • {booking.guests} guests
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </div>
                      {booking.checkOut !== booking.checkIn && (
                        <div className="text-sm text-gray-500">
                          to {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹{booking.totalAmount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    {booking.paymentId && (
                      <div className="text-xs text-gray-500 mt-1">
                        ID: {booking.paymentId.slice(-8)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingBooking(booking)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                <button
                  onClick={() => setViewingBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-800">{viewingBooking.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{viewingBooking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phone</label>
                    <p className="text-gray-800">{viewingBooking.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Guests</label>
                    <p className="text-gray-800">{viewingBooking.guests}</p>
                  </div>
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Booking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type</label>
                    <p className="text-gray-800 capitalize">{viewingBooking.type} Booking</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{viewingBooking.type === 'room' ? 'Room' : 'Hall'}</label>
                    <p className="text-gray-800">{getItemName(viewingBooking)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Check-in Date</label>
                    <p className="text-gray-800">{new Date(viewingBooking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Check-out Date</label>
                    <p className="text-gray-800">{new Date(viewingBooking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingBooking.status)}`}>
                      {viewingBooking.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Total Amount</label>
                    <p className="text-gray-800 font-semibold">₹{viewingBooking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(viewingBooking.paymentStatus)}`}>
                      {viewingBooking.paymentStatus}
                    </span>
                  </div>
                  {viewingBooking.paymentId && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment ID</label>
                      <p className="text-gray-800 font-mono text-sm">{viewingBooking.paymentId}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Booking Date</label>
                    <p className="text-gray-800">{new Date(viewingBooking.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-gray-800">{new Date(viewingBooking.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <select
                  value={viewingBooking.status}
                  onChange={(e) => {
                    handleStatusChange(viewingBooking.id, e.target.value);
                    setViewingBooking({ ...viewingBooking, status: e.target.value });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => setViewingBooking(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No bookings message */}
      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-600">No bookings match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;