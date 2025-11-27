import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from '../services/api';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotel, room } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
        guests: 1
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!hotel || !room) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">No booking details found</h2>
                <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Format dates to YYYY-MM-DD
            const formatDate = (date) => {
                const d = new Date(date);
                let month = '' + (d.getMonth() + 1);
                let day = '' + d.getDate();
                const year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            };

            await createBooking({
                ...formData,
                checkIn: formatDate(formData.checkIn),
                checkOut: formatDate(formData.checkOut),
                hotelId: hotel.id,
                roomId: room.id
            });
            alert('Booking successful!');
            navigate('/bookings');
        } catch (error) {
            console.error(error);
            alert('Failed to book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nights = Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24));
    const total = nights * room.price;

    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-6">Confirm Your Booking</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="input-field"
                                            value={formData.firstName}
                                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="input-field"
                                            value={formData.lastName}
                                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="input-field"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="input-field"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Check-in Date</label>
                                        <DatePicker
                                            selected={formData.checkIn}
                                            onChange={date => setFormData({ ...formData, checkIn: date })}
                                            selectsStart
                                            startDate={formData.checkIn}
                                            endDate={formData.checkOut}
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Check-out Date</label>
                                        <DatePicker
                                            selected={formData.checkOut}
                                            onChange={date => setFormData({ ...formData, checkOut: date })}
                                            selectsEnd
                                            startDate={formData.checkIn}
                                            endDate={formData.checkOut}
                                            minDate={formData.checkIn}
                                            className="input-field w-full"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary py-4 text-lg font-bold mt-4"
                                >
                                    {isSubmitting ? 'Processing...' : `Confirm Booking - $${total}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Booking Summary</h3>

                            <div className="flex gap-4 mb-6">
                                <img src={hotel.image} alt={hotel.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{hotel.name}</h4>
                                    <p className="text-sm text-slate-500">{hotel.location}</p>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-slate-100 pt-4">
                                <div className="flex justify-between text-slate-600">
                                    <span>Room Type</span>
                                    <span className="font-medium text-slate-900 text-right">{room.type}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Duration</span>
                                    <span className="font-medium text-slate-900">{nights} nights</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Price per night</span>
                                    <span className="font-medium text-slate-900">${room.price}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Taxes & Fees</span>
                                    <span className="font-medium text-slate-900">$0</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-slate-100 pt-4">
                                    <span>Total</span>
                                    <span className="text-primary-600">${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingForm;
