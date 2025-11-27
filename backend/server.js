import express from 'express';
import cors from 'cors';
import { initDB, Hotel, Room, Booking, User } from './db.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRole } from './middleware/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

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

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'user' // Default role
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                role: user.role
            }
        });
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

// Admin: Create Hotel
app.post('/api/hotels', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating hotel' });
    }
});

// Admin: Update Hotel
app.put('/api/hotels/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        await hotel.update(req.body);
        res.json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating hotel' });
    }
});

// Admin: Delete Hotel
app.delete('/api/hotels/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        await hotel.destroy();
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting hotel' });
    }
});

// Admin: Add Room to Hotel
app.post('/api/hotels/:hotelId/rooms', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.params.hotelId);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        const room = await Room.create({
            ...req.body,
            HotelId: hotel.id
        });
        res.status(201).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating room' });
    }
});

// Admin: Update Room
app.put('/api/rooms/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        await room.update(req.body);
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating room' });
    }
});

// Admin: Delete Room
app.delete('/api/rooms/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });

        await room.destroy();
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting room' });
    }
});

// Create booking
// Create booking (Protected)
app.post('/api/bookings', authenticateToken, async (req, res) => {
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
// Get user bookings (Protected)
app.get('/api/bookings', authenticateToken, async (req, res) => {
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
