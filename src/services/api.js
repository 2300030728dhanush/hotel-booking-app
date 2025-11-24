import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHotels = async (params) => {
    const response = await api.get('/hotels', { params });
    return response.data;
};

export const getHotelById = async (id) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
};

export const getUserBookings = async (email) => {
    const response = await api.get(`/bookings?email=${email}`);
    return response.data;
};

export default api;
