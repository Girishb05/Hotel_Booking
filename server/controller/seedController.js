import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import {
  seedUsers,
  seedHotels,
  seedRooms,
  seedBookings,
} from "../data/seedData.js";

export const seedAllData = async (req, res) => {
  try {
    await Promise.all([
      Booking.deleteMany({}),
      Room.deleteMany({}),
      Hotel.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.insertMany(seedUsers);
    const hotels = await Hotel.insertMany(seedHotels);
    const rooms = await Room.insertMany(seedRooms);
    const bookings = await Booking.insertMany(seedBookings);

    res.json({
      success: true,
      message: "Seed data inserted successfully",
      counts: {
        users: users.length,
        hotels: hotels.length,
        rooms: rooms.length,
        bookings: bookings.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
