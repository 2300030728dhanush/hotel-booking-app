import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import HotelCard from '../components/HotelCard';
import { getHotels } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data = await getHotels();
                setHotels(data.slice(0, 4)); // Show top 4 trending
            } catch (error) {
                console.error("Failed to fetch hotels", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <HeroBanner />

            <section className="container mx-auto px-4 py-16">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">Trending Destinations</h2>
                        <p className="text-slate-500">Most popular choices for travelers from around the world</p>
                    </div>
                    <a href="/hotels" className="hidden md:block text-primary-600 font-medium hover:text-primary-700 transition-colors">
                        View all hotels &rarr;
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hotels.map((hotel, index) => (
                            <motion.div
                                key={hotel.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <HotelCard hotel={hotel} />
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
                    <a href="/hotels" className="btn-secondary inline-block">
                        View all hotels
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure Booking</h3>
                            <p className="text-slate-500">We ensure your personal information and payments are always safe and secure.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
                            <p className="text-slate-500">Find a lower price? We'll match it and give you an additional discount.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                            <p className="text-slate-500">Our dedicated support team is available round the clock to assist you.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
