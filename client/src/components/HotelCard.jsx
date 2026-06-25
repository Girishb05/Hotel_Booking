
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="w-full md:w-1/2 lg:w-1/3 p-4"
    >
      <img
        src={room.images[0]}
        alt={room.name}
        className="w-50 h-48 object-cover rounded-lg mb-4"
      />

      {index % 2 !== 0 && (
        <p className="text-lg font-bold text-gray-800 p-4" style={{ fontSize: '30px' }}>
          Best Seller
        </p>
      )}

      <div className="p-5 pt-5">
        <div className="flex justify-between items-center">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>

          <div className="flex items-center gap-1">
            <img
              src={assets.starIconFilled}
              alt="Star"
              className="w-4 h-4"
            />
            4.5
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <img
            src={assets.locationIcon}
            alt="Location"
            className="w-4 h-4"
          />
          <span className="text-gray-600 text-sm">
            {room.hotel.address}
          </span>
        </div>

        <div>
          <p>
            <span className="font-bold">
              ${room.pricePerNight}
            </span>{" "}
            per night
          </p>

          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
