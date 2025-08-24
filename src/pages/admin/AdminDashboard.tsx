import React from 'react';
import { useApp } from '../../contexts/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  DollarSign,
  Users,
  Bed,
  Calendar,
  TrendingUp,
  TrendingDown,
  Star,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { rooms, partyHalls, bookings, reviews } = useApp();

  // Calculate stats
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.available).length;
  const totalHalls = partyHalls.length;
  const availableHalls = partyHalls.filter(hall => hall.available).length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((acc, booking) => acc + booking.totalAmount, 0);
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  // Sample data for charts
  const salesData = [
    { month: 'Jan', revenue: 45000, bookings: 12 },
    { month: 'Feb', revenue: 52000, bookings: 15 },
    { month: 'Mar', revenue: 48000, bookings: 13 },
    { month: 'Apr', revenue: 61000, bookings: 18 },
    { month: 'May', revenue: 55000, bookings: 16 },
    { month: 'Jun', revenue: 67000, bookings: 20 },
  ];

  const roomTypeData = [
    { name: 'AC Rooms', value: rooms.filter(r => r.type === 'AC').length, color: '#3B82F6' },
    { name: 'Non-AC Rooms', value: rooms.filter(r => r.type === 'Non-AC').length, color: '#10B981' },
  ];

  const bookingStatusData = [
    { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#10B981' },
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#F59E0B' },
    { name: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#3B82F6' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#EF4444' },
  ];

  const ratingDistribution = [
    { rating: '5 Star', count: reviews.filter(r => r.rating === 5).length },
    { rating: '4 Star', count: reviews.filter(r => r.rating === 4).length },
    { rating: '3 Star', count: reviews.filter(r => r.rating === 3).length },
    { rating: '2 Star', count: reviews.filter(r => r.rating === 2).length },
    { rating: '1 Star', count: reviews.filter(r => r.rating === 1).length },
  ];

  const stats = [
    {
      name: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'increase',
      color: 'bg-green-500',
    },
    {
      name: 'Total Bookings',
      value: totalBookings.toString(),
      icon: Calendar,
      change: '+8.2%',
      changeType: 'increase',
      color: 'bg-blue-500',
    },
    {
      name: 'Available Rooms',
      value: `${availableRooms}/${totalRooms}`,
      icon: Bed,
      change: '-2.1%',
      changeType: 'decrease',
      color: 'bg-purple-500',
    },
    {
      name: 'Customer Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      change: '+0.3',
      changeType: 'increase',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to Hotel Infinity Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Bookings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Room Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Room Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
                  }
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Ratings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Ratings</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="rating" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.type === 'room' ? 'Room Booking' : 'Hall Booking'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹{booking.totalAmount.toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-800">{review.customerName}</p>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;