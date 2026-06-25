import React, { useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen">
      <Title
        title="My Bookings"
        subtitle="Manage your hotel reservations"
        align="left"
        font="3xl"
      />

      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="flex bg-gray-100 font-semibold text-gray-700 p-4">
          <div className="w-1/3">Hotel</div>
          <div className="w-1/3">Date & Time</div>
          <div className="w-1/3">Payment</div>
        </div>

       {bookings.map((booking) => (
  <div
    key={booking._id}
    className="flex flex-col md:flex-row items-start md:items-center p-4 border-t gap-4"
  >
    {/* Hotel Image + Details */}
    <div className="w-full md:w-1/3 flex gap-4">
      <img
        src={booking.room.images[0]}
        alt={booking.hotel.name}
        className="w-24 h-24 rounded-lg object-cover"
      />

      <div>
        <p className="font-semibold text-lg">
          {booking.hotel.name}
        </p>

        <p className="text-sm text-gray-500">
          {booking.room.roomType}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <img
            src={assets.locationIcon}
            alt="location"
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-500">
            {booking.hotel.address}
          </span>
        </div>
      </div>
    </div>

    {/* Date & Guests */}
    <div className="w-full md:w-1/3">
      <p className="font-medium">
        Check In: {booking.checkInDate}
      </p>

      <p className="font-medium">
        Check Out: {booking.checkOutDate}
      </p>

      <p className="text-gray-600 mt-1">
        Guests: {booking.guests}
      </p>
    </div>

    {/* Payment */}
    <div className="w-full md:w-1/3">
      <p className="font-semibold text-lg">
        ${booking.totalPrice}
      </p>

      <span
        className={`font-medium ${
          booking.isPaid
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {booking.isPaid ? "Paid" : "Pending"}
      </span>
    </div>
  </div>
))}
      </div>
    </div>
  );
};

export default MyBookings;