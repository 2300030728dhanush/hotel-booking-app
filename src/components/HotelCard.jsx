import React from 'react';
import { Star, MapPin, Wifi, Coffee, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HotelCard = ({ hotel }) => {
    const { id, name, location, rating, price, image, amenities = ['Wifi', 'Pool', 'Spa'] } = hotel;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-slate-900">{rating}</span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{name}</h3>
                        <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <MapPin size={14} />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 my-4">
                    {amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded-md border border-slate-100">
                            {amenity}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                        <span className="text-sm text-slate-500">Start from</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary-600">${price}</span>
                            <span className="text-sm text-slate-500">/night</span>
                        </div>
                    </div>
                    <Link
                        to={`/hotels/${id}`}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default HotelCard;
