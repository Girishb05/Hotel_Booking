import React, { useState } from "react";
import { assets ,cities} from "../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const HotelReg = () => {
  // const cities = [
  //   "Chennai",
  //   "Bangalore",
  //   "Hyderabad",
  //   "Mumbai",
  //   "Delhi",
  //   "Pune",
  //   "Kolkata",
  // ];
  


  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!name.trim() || !address.trim() || !contact.trim() || !city) {
      toast.error("Please fill in all hotel details");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        "/api/hotels",
        { name, address, contactNumber: contact, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message || "Hotel registered successfully");
        setIsOwner(true);
        setShowHotelReg(false);
        setName("");
        setAddress("");
        setContact("");
        setCity("");
      } else {
        toast.error(data.message || "Unable to register hotel");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to register hotel");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div onClick={() => setShowHotelReg(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-lg overflow-hidden flex max-w-4xl w-full mx-4">
        
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
            onClick={() => setShowHotelReg(false)}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                type="text" id="name" onChange={(e)=> setName(e.target.value)} value={name}
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
                required onChange={(e)=> setContact(e.target.value)} value={contact}
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
                type="text" onChange={(e)=> setAddress(e.target.value)} value={address}
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
                id="city" onChange={(e)=> setCity(e.target.value)} value={city}
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register Hotel"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;