import React from 'react';
import HeroSection from '../../components/hotel/HeroSection';
import { useApp } from '../../contexts/AppContext';
import RoomCard from '../../components/hotel/RoomCard';
import HallCard from '../../components/hotel/HallCard';
import ReviewCard from '../../components/hotel/ReviewCard';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Users, Award, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  const { rooms, partyHalls, reviews } = useApp();

  const features = [
    {
      icon: Star,
      title: '5-Star Service',
      description: 'Experience world-class hospitality with our premium services and amenities.',
    },
    {
      icon: Users,
      title: 'Happy Guests',
      description: 'Over 10,000 satisfied customers have made memories with us.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in hospitality and customer service.',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: '24/7 security and safety protocols for your peace of mind.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Hotel Infinity?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes us the premier choice for luxury accommodation and event hosting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Rooms</h2>
              <p className="text-xl text-gray-600">
                Discover comfort and luxury in our carefully designed accommodations
              </p>
            </div>
            <Link
              to="/rooms"
              className="group flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Rooms
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Party Halls */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Event Venues</h2>
              <p className="text-xl text-gray-600">
                Create unforgettable moments in our elegant party halls
              </p>
            </div>
            <Link
              to="/halls"
              className="group flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Halls
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partyHalls.slice(0, 3).map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Guest Reviews</h2>
              <p className="text-xl text-gray-600">
                See what our guests have to say about their experience
              </p>
            </div>
            <Link
              to="/reviews"
              className="group flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All Reviews
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your stay or event today and discover what makes Hotel Infinity special
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
            >
              Book a Room
            </Link>
            <Link
              to="/halls"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              Plan an Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;