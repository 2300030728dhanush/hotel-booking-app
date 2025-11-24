import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Coffee, Tv, Car, Utensils } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import { getHotelById } from '../services/api';
import { motion } from 'framer-motion';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const data = await getHotelById(id);
                setHotel(data);
            } catch (error) {
                console.error("Failed to fetch hotel details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    const handleBook = (room) => {
        navigate('/booking', { state: { hotel, room } });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!hotel) return <div>Hotel not found</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Image */}
            <div className="h-[60vh] relative">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <Star size={14} className="fill-slate-900" />
                                    {hotel.rating}
                                </div>
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">Luxury Hotel</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{hotel.name}</h1>
                            <div className="flex items-center gap-2 text-lg text-slate-200">
                                <MapPin size={20} />
                                <span>{hotel.location}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-2xl font-serif font-bold mb-4 text-slate-900">About the Hotel</h2>
                            <p className="text-slate-600 leading-relaxed text-lg">{hotel.description}</p>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold mb-4 text-slate-900">Popular Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {hotel.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 text-slate-600 p-3 bg-slate-50 rounded-xl">
                                            <CheckIcon amenity={amenity} />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Rooms */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Available Rooms</h2>
                            <div className="space-y-6">
                                {hotel.rooms.map((room) => (
                                    <RoomCard key={room.id} room={room} onBook={handleBook} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">Good to Know</h3>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex justify-between border-b border-slate-100 pb-3">
                                    <span>Check-in</span>
                                    <span className="font-medium text-slate-900">3:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-100 pb-3">
                                    <span>Check-out</span>
                                    <span className="font-medium text-slate-900">11:00 AM</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-100 pb-3">
                                    <span>Cancellation</span>
                                    <span className="font-medium text-green-600">Free until 24h before</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Pets</span>
                                    <span className="font-medium text-slate-900">Allowed (on request)</span>
                                </li>
                            </ul>

                            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-100">
                                <h4 className="font-bold text-primary-800 mb-2">Need Help?</h4>
                                <p className="text-sm text-primary-600 mb-3">Call our concierge for special requests.</p>
                                <a href="tel:+1234567890" className="text-primary-700 font-bold hover:underline">+1 (555) 123-4567</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for amenity icons
const CheckIcon = ({ amenity }) => {
    if (amenity.includes('Wifi')) return <Wifi size={20} className="text-primary-500" />;
    if (amenity.includes('Dining')) return <Utensils size={20} className="text-primary-500" />;
    if (amenity.includes('Shuttle')) return <Car size={20} className="text-primary-500" />;
    if (amenity.includes('Tv')) return <Tv size={20} className="text-primary-500" />;
    return <Star size={20} className="text-primary-500" />;
};

export default HotelDetails;
