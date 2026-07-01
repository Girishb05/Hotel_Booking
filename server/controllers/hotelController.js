import Hotel from "../models/Hotel.js";
import User from "../models/user.js";

export const registerHotel = async (req, res) => {
    try {
        const {
            name,
            address,
            contactNumber,
            city
        } = req.body;

        const ownerId = req.user._id;

        // Check if owner already has a hotel
        const hotel = await Hotel.findOne({
            owner: ownerId
        });

        if (hotel) {
            return res.json({
                success: false,
                message:
                    "You have already registered a hotel"
            });
        }

        await Hotel.create({
            name,
            address,
            contactNumber,
            city,
            owner: ownerId
        });

        await User.findByIdAndUpdate(
            ownerId,
            {
                role: "hotelOwner"
            }
        );

        res.json({
            success: true,
            message:
                "Hotel registered successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};