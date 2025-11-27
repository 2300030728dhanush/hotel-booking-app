import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
