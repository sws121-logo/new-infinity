import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';

// Hotel Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/hotel/HomePage';
import RoomsPage from './pages/hotel/RoomsPage';
import HallsPage from './pages/hotel/HallsPage';
import ReviewsPage from './pages/hotel/ReviewsPage';
import ContactPage from './pages/hotel/ContactPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRooms from './pages/admin/AdminRooms';
import AdminHalls from './pages/admin/AdminHalls';
import AdminBookings from './pages/admin/AdminBookings';
import AdminReviews from './pages/admin/AdminReviews';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="rooms" element={<AdminRooms />} />
                <Route path="halls" element={<AdminHalls />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="" element={<AdminDashboard />} />
              </Routes>
            </AdminLayout>
          } />
          
          {/* Hotel Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/rooms" element={<RoomsPage />} />
                  <Route path="/halls" element={<HallsPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;