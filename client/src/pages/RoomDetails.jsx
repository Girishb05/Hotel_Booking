import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  roomsDummyData,
  assets,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const selectedRoom = roomsDummyData.find(
      (room) => room._id === id
    );

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

  return (
    room && (
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen">
        <div>
          {/* Hotel Name + Room Type */}
          <h1 className="text-3xl font-bold text-gray-800">
            {room.hotel.name}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({room.roomType})
            </span>
          </h1>

          {/* Offer Badge */}
          <p className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            20% OFF
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <StarRating rating={room.rating || 4} />
            <p className="text-sm text-gray-500">
              200+ Reviews
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-3">
            <img
              src={assets.locationIcon}
              alt="location"
              className="w-4 h-4"
            />
            <span className="text-gray-500">
              {room.hotel.address}
            </span>
          </div>

          {/* Main Image */}
          <div className="flex flex-col lg:flex-row mt-8 gap-8">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              <img
                src={mainImage}
                alt={room.hotel.name}
                className="w-full max-w-4xl rounded-xl shadow-md object-cover"
              />
            </div>

            <div>
              {room?.images.length > 1 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`room-${index}`}
                      onClick={() => setMainImage(image)}
                      className={`w-52 h-32 object-cover rounded-lg cursor-pointer border-2 ${
                        mainImage === image
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Room Description */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Experience the Comfort of Our Luxurious Rooms
              </h2>

              <div className="flex flex-wrap text-gray-600 text-sm leading-relaxed">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mr-2 mb-2"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5 mr-2"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mt-8 flex justify-end">
            <p className="text-2xl font-bold text-gray-800">
              ${room.pricePerNight}
              <span className="text-base font-normal text-gray-500">
                {" "}
                / night
              </span>
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form className="mt-8 mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Check-in Date */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Check-in Date
              </span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Check-out Date */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Check-out Date
              </span>
              <input
                type="date"
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Guests */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">
                Guests
              </span>
              <input
                type="number"
                min="1"
                placeholder="Guests"
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Button */}
            <button
              type="submit"
              className="bg-blue-600 w-full text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Check Availability
            </button>
          </div>
        </form>

        {/* Room Common Data */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomCommonData.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={item.icon}
                alt={item.title}
                className="w-6 h-6"
              />

              <div>
                <p className="font-semibold">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-8 border-y border-gray-300 py-6 text-gray-600 text-sm leading-relaxed shadow-md p-6 rounded-lg">
            <p>Guests will be notified of any changes to their booking. Two bedroom suites offer spacious living areas and modern amenities for a comfortable stay.The guest will be allocated a room based on availability.You can cancel or modify your booking up to 24 hours before arrival.</p>
        </div>
<div className="mt-8 border rounded-lg p-4">
  <div className="flex items-center gap-4">
    
    <img
      src={room.hotel.owner.image}
      alt={room.hotel.owner.name}
      className="w-14 h-14 rounded-full object-cover"
    />

    <div>
      <p className="font-semibold text-lg">
        Hosted by {room.hotel.owner.name}
      </p>

      <div className="flex items-center gap-2 mt-1">
        <StarRating rating={4} />

        <p className="text-sm text-gray-500">
          200+ Reviews
        </p>
      </div>
    </div>

  </div>
</div>
<button className="bg-blue-600 mt-8 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
  Contact Now
</button>

      </div>
    )
  );
};

export default RoomDetails;