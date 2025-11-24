import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const [location, setLocation] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [guests, setGuests] = useState(1);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/hotels?city=${location}&guests=${guests}`);
    };

    return (
        <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Hotel"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
                >
                    Discover Your Next <br />
                    <span className="text-primary-400">Luxury Escape</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-light"
                >
                    Book the finest hotels and resorts across the globe. Experience unmatched comfort and elegance.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto"
                >
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <MapPin size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500/20 text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="relative group md:col-span-1">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 group-focus-within:text-primary-500 transition-colors">
                                <Calendar size={20} />
                            </div>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                placeholderText="Check-in - Check-out"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500/20 text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                <Users size={20} />
                            </div>
                            <input
                                type="number"
                                min="1"
                                placeholder="Guests"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary-500/20 text-slate-900 font-medium placeholder:text-slate-400 outline-none transition-all"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-primary-600 text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/30 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            <span>Search</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
