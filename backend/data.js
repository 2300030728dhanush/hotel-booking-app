export const hotels = [
    {
        id: 1,
        name: "The Grand Budapest",
        location: "Budapest, Hungary",
        description: "Experience the golden age of travel in this historic hotel. Located in the heart of Budapest, The Grand Budapest offers luxurious accommodations, world-class dining, and a legendary spa.",
        rating: 4.8,
        price: 350,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        amenities: ['Free Wifi', 'Spa & Wellness', 'Fine Dining', 'Airport Shuttle', 'Swimming Pool', 'Fitness Center'],
        rooms: [
            {
                id: 101,
                type: "Deluxe King Room",
                price: 350,
                capacity: 2,
                amenities: ['King Bed', 'City View', 'Mini Bar', 'Free Wifi'],
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 102,
                type: "Executive Suite",
                price: 550,
                capacity: 3,
                amenities: ['Living Area', 'Balcony', 'Jacuzzi', 'Executive Lounge Access'],
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: 103,
                type: "Presidential Suite",
                price: 1200,
                capacity: 4,
                amenities: ['2 Bedrooms', 'Private Butler', 'Panoramic View', 'Private Pool'],
                image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        id: 2,
        name: "Ocean View Resort",
        location: "Maldives",
        description: "A tropical paradise awaiting your arrival. Stay in our overwater bungalows and wake up to the sound of the ocean.",
        rating: 4.9,
        price: 850,
        image: "https://images.unsplash.com/photo-1571896349842-6e53ce41be03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ['Private Beach', 'Infinity Pool', 'Water Sports', 'Spa', 'Free Wifi'],
        rooms: [
            {
                id: 201,
                type: "Overwater Bungalow",
                price: 850,
                capacity: 2,
                amenities: ['Ocean View', 'Direct Sea Access', 'Private Deck'],
                image: "https://images.unsplash.com/photo-1571896349842-6e53ce41be03?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        id: 3,
        name: "Alpine Lodge",
        location: "Swiss Alps",
        description: "Cozy up in the mountains. Perfect for skiing enthusiasts and nature lovers.",
        rating: 4.7,
        price: 420,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ['Ski-in/Ski-out', 'Sauna', 'Fireplace', 'Restaurant'],
        rooms: [
            {
                id: 301,
                type: "Mountain View Room",
                price: 420,
                capacity: 2,
                amenities: ['Mountain View', 'Fireplace', 'Balcony'],
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        id: 4,
        name: "Urban Oasis",
        location: "Tokyo, Japan",
        description: "A sanctuary in the middle of the bustling city. Modern design meets traditional Japanese hospitality.",
        rating: 4.6,
        price: 280,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ['Rooftop Bar', 'Gym', 'Concierge', 'Free Wifi'],
        rooms: [
            {
                id: 401,
                type: "City View King",
                price: 280,
                capacity: 2,
                amenities: ['City View', 'High Floor', 'Rain Shower'],
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        id: 5,
        name: "Desert Mirage",
        location: "Dubai, UAE",
        description: "Luxury redefined in the desert. Experience the ultimate in comfort and style.",
        rating: 4.9,
        price: 600,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        amenities: ['Desert Safari', 'Luxury Spa', 'Private Pool', 'Fine Dining'],
        rooms: [
            {
                id: 501,
                type: "Royal Suite",
                price: 600,
                capacity: 4,
                amenities: ['Private Pool', 'Desert View', 'Butler Service'],
                image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        ]
    }
];
