import React from 'react';
import { Check, User } from 'lucide-react';
import { motion } from 'framer-motion';

const RoomCard = ({ room, onBook }) => {
    const { type, price, capacity, amenities, image } = room;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="h-48 md:h-auto relative">
                    <img src={image} alt={type} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 md:col-span-2 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-slate-900">{type}</h3>
                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                                <User size={16} />
                                <span>Up to {capacity} guests</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                    <Check size={14} className="text-green-500" />
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                            <span className="text-3xl font-bold text-primary-600">${price}</span>
                            <span className="text-slate-500 text-sm">/night</span>
                        </div>
                        <button
                            onClick={() => onBook(room)}
                            className="btn-primary py-2 px-6"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
