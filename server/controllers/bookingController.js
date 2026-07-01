import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../config/nodemailer.js";

// function to check room availability
const checkRoomAvailability = async ({
    checkInDate,
    checkOutDate,
    room,
}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        });

        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (err) {
        throw new Error("Error checking room availability");
    }
};

// API to check room availability
// POST /api/bookings/check-availability

export const checkAvailability = async (req, res) => {
    try {
        const room = req.body.room || req.body.roomId;
        const checkInDate = req.body.checkInDate || req.body.checkIn;
        const checkOutDate = req.body.checkOutDate || req.body.checkOut;

        if (!room || !checkInDate || !checkOutDate) {
            return res.status(400).json({
                success: false,
                message: "Missing room or dates for availability check",
            });
        }

        const isAvailable = await checkRoomAvailability({
            checkInDate,
            checkOutDate,
            room,
        });

        res.json({ success: true, isAvailable });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// API to create a new booking
// POST /api/bookings

export const createBooking = async (req, res) => {
    try {
        const room = req.body.room || req.body.roomId;
        const checkInDate = req.body.checkInDate || req.body.checkIn;
        const checkOutDate = req.body.checkOutDate || req.body.checkOut;
        const guests = req.body.guests;
        const user = req.user._id;

        if (!room || !checkInDate || !checkOutDate) {
            return res.status(400).json({
                success: false,
                message: "Missing booking details",
            });
        }

        // Before booking check if the room is available
        const isAvailable = await checkRoomAvailability({
            checkInDate,
            checkOutDate,
            room,
        });

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Room is not available for the selected dates",
            });
        }

        // Get total price of the booking
        const roomData = await Room.findById(room).populate("hotel");

        if (!roomData) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        let totalPrice = roomData.pricePerNight;

        // Calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        const timeDiff =
            checkOut.getTime() - checkIn.getTime();

        const nights = Math.ceil(
            timeDiff / (1000 * 3600 * 24)
        );

        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests: +guests,
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html: `
                <p>Dear ${req.user.username || req.user.email},</p>
                <p>Thank you for booking with us! Here are your booking details:</p>
                <ul>
                    <li><strong>Booking Id:</strong> ${booking._id}</li>
                    <li><strong>Check-In Date:</strong> ${checkInDate}</li>
                    <li><strong>Check-Out Date:</strong> ${checkOutDate}</li>
                    <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Room Type:</strong> ${roomData.roomType}</li>
                    <li><strong>Total Price:</strong> $${totalPrice}</li>
                </ul>
                <p>We look forward to hosting you and hope you have a wonderful stay!</p>
                <p>Best regards,</p>
                <p>Hotel Booking Team</p>
            `,
        };

        if (transporter && process.env.SMTP_USERNAME && process.env.SMTP_PASSWORD) {
            try {
                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error("Booking email failed:", emailError.message);
            }
        }


        res.json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: err.message,
        });
    }
};

// API to get all bookings of a user
// GET /api/bookings/user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;

        const bookings = await Booking.find({ user })
            .populate("room hotel")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings,
        });
    } catch (err) {
        console.error(err);

        res.json({
            success: false,
            message: "Failed to fetch user bookings",
        });
    }
};

// API to get hotel bookings

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({
            owner: req.user._id,
        });

        if (!hotel) {
            return res.json({
                success: false,
                message: "Hotel not found for the owner",
            });
        }

        const bookings = await Booking.find({
            hotel: hotel._id,
        })
            .populate("room hotel user")
            .sort({ createdAt: -1 });

        // Total bookings
        const totalBookings = bookings.length;

        // Total revenue
        const totalRevenue = bookings.reduce(
            (acc, booking) => acc + booking.totalPrice,
            0
        );

        res.json({
            success: true,
            dashboard: {
                totalBookings,
                totalRevenue,
                bookings,
            },
        });
    } catch (error) {
        console.error(error);

        res.json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};