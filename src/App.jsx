import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import Auth from './pages/Auth';
import { AnimatePresence } from 'framer-motion';

import ProtectedRoute from './components/ProtectedRoute';

import AdminDashboard from './pages/AdminDashboard';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/book" element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
