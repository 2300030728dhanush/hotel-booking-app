import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { Filter, X } from 'lucide-react';
import { getHotels } from '../services/api';

const HotelList = () => {
    const [searchParams] = useSearchParams();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const city = searchParams.get('city') || '';
                const guests = searchParams.get('guests') || '';
                const data = await getHotels({ city, guests });
                setHotels(data);
            } catch (error) {
                console.error("Failed to fetch hotels", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [searchParams]);

    const filteredHotels = hotels.filter(hotel =>
        hotel.price <= priceRange && hotel.rating >= selectedRating
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 w-max"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={20} />
                        <span>Filters</span>
                    </button>

                    {/* Sidebar Filters */}
                    <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold font-serif">Filters</h3>
                                <button className="lg:hidden" onClick={() => setShowFilters(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 mb-3">Price Range (Max: ${priceRange})</label>
                                <input
                                    type="range"
                                    min="100"
                                    max="1000"
                                    step="50"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <div className="flex justify-between text-sm text-slate-500 mt-2">
                                    <span>$100</span>
                                    <span>$1000+</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Star Rating</label>
                                <div className="space-y-2">
                                    {[5, 4, 3].map((rating) => (
                                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                                                checked={selectedRating === rating}
                                                onChange={() => setSelectedRating(rating)}
                                            />
                                            <span className="flex items-center gap-1 text-slate-600">
                                                {rating}+ <span className="text-yellow-400">★</span>
                                            </span>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                                            checked={selectedRating === 0}
                                            onChange={() => setSelectedRating(0)}
                                        />
                                        <span className="text-slate-600">Any</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Hotel Grid */}
                    <div className="lg:w-3/4">
                        <div className="mb-6">
                            <h1 className="text-3xl font-serif font-bold text-slate-900">
                                {searchParams.get('city') ? `Hotels in ${searchParams.get('city')}` : 'All Hotels'}
                            </h1>
                            <p className="text-slate-500">{filteredHotels.length} properties found</p>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className="bg-white rounded-2xl h-96 animate-pulse">
                                        <div className="h-48 bg-slate-200 rounded-t-2xl" />
                                        <div className="p-5 space-y-4">
                                            <div className="h-6 bg-slate-200 rounded w-3/4" />
                                            <div className="h-4 bg-slate-200 rounded w-1/2" />
                                            <div className="h-10 bg-slate-200 rounded w-full mt-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} />
                                ))}
                            </div>
                        )}

                        {!loading && filteredHotels.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No hotels found</h3>
                                <p className="text-slate-500">Try adjusting your filters to find more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelList;
