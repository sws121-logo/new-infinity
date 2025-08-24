import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  Hotel,
  LayoutDashboard,
  Bed,
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, currentUser, logout } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Rooms', href: '/admin/rooms', icon: Bed },
    { name: 'Party Halls', href: '/admin/halls', icon: Calendar },
    { name: 'Bookings', href: '/admin/bookings', icon: Users },
    { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
              <Hotel className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 flex-1">
          <div className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? 'text-blue-700' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info and logout */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome back, {currentUser.name}
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;