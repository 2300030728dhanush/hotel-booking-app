import express from 'express';
import cors from 'cors';
import { initDB, Hotel, Room, Booking, User } from './db.js';
import { Op } from 'sequelize';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize DB
initDB();

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ email, password, firstName, lastName });
        res.status(201).json({ id: user.id, email: user.email, firstName: user.firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ id: user.id, email: user.email, firstName: user.firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Routes

// Get all hotels
app.get('/api/hotels', async (req, res) => {
    try {
        const { city, guests } = req.query;

        const whereClause = {};
        if (city) {
            whereClause.location = { [Op.like]: `%${city}%` };
        }

        const includeClause = [{
            model: Room,
            as: 'rooms',
        }];

        // Filter by guest capacity if provided
        if (guests) {
            includeClause[0].where = {
                capacity: { [Op.gte]: parseInt(guests) }
            };
        }

        const hotels = await Hotel.findAll({
            where: whereClause,
            include: includeClause
        });

        res.json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get hotel by ID
app.get('/api/hotels/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id, {
            include: [{ model: Room, as: 'rooms' }]
        });

        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
    try {
        const bookingData = req.body;
        const { hotelId, roomId, checkIn, checkOut } = bookingData;

        // Calculate total price (simplified)
        const room = await Room.findByPk(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * room.price;

        const newBooking = await Booking.create({
            id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            ...bookingData,
            HotelId: hotelId,
            RoomId: roomId,
            totalPrice
        });

        res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

// Get user bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const bookings = await Booking.findAll({
            where: { email },
            include: [
                { model: Hotel },
                { model: Room }
            ]
        });

        // Transform for frontend
        const formattedBookings = bookings.map(b => ({
            id: b.id,
            hotelName: b.Hotel.name,
            location: b.Hotel.location,
            checkIn: b.checkIn,
            checkOut: b.checkOut,
            roomType: b.Room.type,
            price: b.totalPrice,
            status: b.status,
            image: b.Hotel.image
        }));

        res.json(formattedBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
