import React from "react";
import { assets } from "../assets/assets";

const HotelReg = () => {
  const cities = [
    "Chennai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Pune",
    "Kolkata",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-white rounded-xl shadow-lg overflow-hidden flex max-w-4xl w-full mx-4">
        
        {/* Left Image */}
        <img
          src={assets.regImage}
          alt="Register Hotel"
          className="w-1/2 object-cover hidden md:block"
        />

        {/* Right Content */}
        <div className="flex-1 p-8 relative">
          <img
            src={assets.closeIcon}
            alt="Close"
            className="w-5 h-5 absolute top-5 right-5 cursor-pointer"
          />

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Register your Hotel
          </h2>

          <p className="text-gray-500 mb-6">
            Join our platform and start receiving bookings from travelers worldwide.
          </p>

          <div className="space-y-4">
            {/* Hotel Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter hotel name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                required
                placeholder="Enter hotel address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>

              <select
                id="city"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Register Hotel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;