import { Sequelize, DataTypes } from 'sequelize';
import { hotels as initialHotels } from './data.js';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'hotel',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'Dhanush@7777',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
    }
);

// Define Models

const Hotel = sequelize.define('Hotel', {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    price: { type: DataTypes.INTEGER, allowNull: false }, // Base price for display
    image: { type: DataTypes.STRING, allowNull: false },
    amenities: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    }
});

const Room = sequelize.define('Room', {
    type: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    amenities: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    }
});

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
});

const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.STRING, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    checkIn: { type: DataTypes.DATEONLY, allowNull: false },
    checkOut: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Confirmed' },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false }
});

// Relationships
Hotel.hasMany(Room, { as: 'rooms' });
Room.belongsTo(Hotel);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Room.hasMany(Booking);
Booking.belongsTo(Room);

// Database Initialization
export const initDB = async () => {
    const maxRetries = 10;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            // Sync models (alter: true updates tables if they exist)
            await sequelize.sync({ alter: true });
            console.log('Database synced.');

            // Seed data if empty
            const count = await Hotel.count();
            if (count === 0) {
                console.log('Seeding initial data...');
                for (const h of initialHotels) {
                    const hotel = await Hotel.create({
                        name: h.name,
                        location: h.location,
                        description: h.description,
                        rating: h.rating,
                        price: h.price,
                        image: h.image,
                        amenities: h.amenities
                    });

                    for (const r of h.rooms) {
                        await Room.create({
                            HotelId: hotel.id,
                            type: r.type,
                            price: r.price,
                            capacity: r.capacity,
                            image: r.image,
                            amenities: r.amenities
                        });
                    }
                }
                console.log('Seeding complete.');
            }
            return; // Success
        } catch (error) {
            retries++;
            console.log(`Failed to connect to DB (Attempt ${retries}/${maxRetries}). Retrying in 5s...`);
            console.error(error.message);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    console.error('Unable to connect to the database after multiple attempts.');
};

export { sequelize, Hotel, Room, Booking, User };
