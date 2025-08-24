import React, { useState } from 'react';
import { useAdminApp } from '../../contexts/AppContext';
import { DollarSign, CreditCard, Calendar, User, Eye, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminPayments: React.FC = () => {
  const { payments, bookings, updatePayment } = useAdminApp();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed' | 'failed' | 'refunded'>('all');
  const [viewingPayment, setViewingPayment] = useState<any>(null);

  const filteredPayments = payments.filter(payment => {
    return selectedStatus === 'all' || payment.status === selectedStatus;
  });

  const getBookingDetails = (bookingId: string) => {
    return bookings.find(b => b.id === bookingId);
  };

  const handleStatusChange = (paymentId: string, newStatus: any) => {
    updatePayment(paymentId, { status: newStatus });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <RefreshCw className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  // Calculate stats
  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((acc, payment) => acc + payment.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  const monthlyRevenue = payments
    .filter(p => {
      const paymentDate = new Date(p.createdAt);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return p.status === 'completed' && 
             paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    })
    .reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Payments Management</h1>
        <p className="text-gray-600">Monitor and manage all payment transactions</p>
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
              <div className="text-2xl font-bold text-blue-600">₹{monthlyRevenue.toLocaleString()}</div>
              <div className="text-gray-600">This Month</div>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{completedPayments}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{pendingPayments}</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const booking = getBookingDetails(payment.bookingId);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">
                        {payment.transactionId || payment.id.slice(-8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {booking?.customerName || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking?.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ₹{payment.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900 capitalize">
                          {payment.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={payment.status}
                        onChange={(e) => handleStatusChange(payment.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(payment.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setViewingPayment({ ...payment, booking })}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      {viewingPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
                <button
                  onClick={() => setViewingPayment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Payment Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment ID</label>
                    <p className="text-gray-800 font-mono text-sm">
                      {viewingPayment.transactionId || viewingPayment.id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Amount</label>
                    <p className="text-gray-800 font-semibold text-lg">
                      ₹{viewingPayment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Method</label>
                    <p className="text-gray-800 capitalize">{viewingPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingPayment.status)}`}>
                        {getStatusIcon(viewingPayment.status)}
                        <span className="ml-1">{viewingPayment.status}</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Payment Date</label>
                    <p className="text-gray-800">{new Date(viewingPayment.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-gray-800">{new Date(viewingPayment.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Customer & Booking Info */}
              {viewingPayment.booking && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Booking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Customer Name</label>
                      <p className="text-gray-800">{viewingPayment.booking.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-800">{viewingPayment.booking.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-800">{viewingPayment.booking.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Booking Type</label>
                      <p className="text-gray-800 capitalize">{viewingPayment.booking.type} Booking</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Check-in Date</label>
                      <p className="text-gray-800">{new Date(viewingPayment.booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Guests</label>
                      <p className="text-gray-800">{viewingPayment.booking.guests}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <select
                  value={viewingPayment.status}
                  onChange={(e) => {
                    handleStatusChange(viewingPayment.id, e.target.value);
                    setViewingPayment({ ...viewingPayment, status: e.target.value });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <button
                  onClick={() => setViewingPayment(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No payments message */}
      {filteredPayments.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No payments found</h3>
          <p className="text-gray-600">No payments match your current filter.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;