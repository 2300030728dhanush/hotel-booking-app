import React, { useState } from 'react';
import { getUserBookings } from '../services/api';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookings = () => {
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await getUserBookings(email);
            setBookings(data);
            setSearched(true);
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">My Bookings</h1>
                    <p className="text-slate-500">Enter your email address to view your upcoming and past stays.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-primary whitespace-nowrap">
                            Find Bookings
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {searched && bookings.length === 0 && (
                            <div className="text-center text-slate-500 py-10">
                                No bookings found for this email address.
                            </div>
                        )}

                        {bookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6"
                            >
                                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                                    {/* Handle optional image or fallback */}
                                    <img src={booking.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} alt={booking.hotelName} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">{booking.hotelName || "Hotel Booking"}</h3>
                                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                <MapPin size={14} />
                                                <span>{booking.location || "Location"}</span>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Check-in</span>
                                            <div className="flex items-center gap-1 font-medium text-slate-900">
                                                <Calendar size={14} className="text-primary-500" />
                                                {new Date(booking.checkIn).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Check-out</span>
                                            <div className="flex items-center gap-1 font-medium text-slate-900">
                                                <Calendar size={14} className="text-primary-500" />
                                                {new Date(booking.checkOut).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Room Type</span>
                                            <div className="font-medium text-slate-900">{booking.roomType || "Standard Room"}</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1">Total Price</span>
                                            <div className="font-bold text-primary-600">${booking.price || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
