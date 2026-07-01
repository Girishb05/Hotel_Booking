import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, axios, getToken, navigate, currency, user } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isChecking, setIsChecking] = useState(false);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadRoom = async () => {
      setLoading(true);

      const selectedRoom = rooms.find((item) => item._id === id);
      if (selectedRoom) {
        if (isMounted) {
          setRoom(selectedRoom);
          setMainImage(selectedRoom.images?.[0] || "");
          setLoading(false);
        }
        return;
      }

      try {
        const { data } = await axios.get("/api/rooms");
        if (isMounted && data.success) {
          const fetchedRoom = data.rooms.find((item) => item._id === id);
          if (fetchedRoom) {
            setRoom(fetchedRoom);
            setMainImage(fetchedRoom.images?.[0] || "");
          } else {
            toast.error("Room not found");
          }
        } else if (isMounted) {
          toast.error(data.message || "Unable to load room details");
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error.message || "Unable to load room details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRoom();

    return () => {
      isMounted = false;
    };
  }, [id, rooms, axios]);

  const resetAvailability = () => {
    setAvailabilityChecked(false);
    setIsAvailable(false);
  };

  const handleCheckAvailability = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      toast.error("Please select your check-in and check-out dates");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    if (!guests || guests < 1) {
      toast.error("Please enter at least one guest");
      return;
    }

    setIsChecking(true);

    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      });

      setAvailabilityChecked(true);
      setIsAvailable(Boolean(data.isAvailable));

      if (data.isAvailable) {
        toast.success("This room is available for the selected dates.");
      } else {
        toast.error("This room is not available for the selected dates.");
      }
    } catch (error) {
      setAvailabilityChecked(true);
      setIsAvailable(false);
      toast.error(error.message || "Unable to check availability");
    } finally {
      setIsChecking(false);
    }
  };

  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please sign in to book this room");
      navigate("/");
      return;
    }

    if (!checkIn || !checkOut || !guests) {
      toast.error("Please enter your booking details first");
      return;
    }

    setIsBooking(true);

    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/bookings/book",
        {
          room: id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message || "Booking created successfully");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "Booking failed");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen flex items-center justify-center text-gray-600">
        Loading room details...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen flex items-center justify-center text-gray-600">
        Room not found.
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {room.hotel?.name || "Hotel"}
          <span className="ml-2 text-sm font-normal text-gray-500">({room.roomType})</span>
        </h1>

        <p className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          20% OFF
        </p>

        <div className="flex items-center gap-2 mt-4">
          <StarRating rating={room.rating || 4} />
          <p className="text-sm text-gray-500">200+ Reviews</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3 text-gray-500">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel?.address || "Address available soon"}</span>
          {room.hotel?.city ? <span>• {room.hotel.city}</span> : null}
          {room.hotel?.contactNumber ? <span>• {room.hotel.contactNumber}</span> : null}
        </div>

        <div className="flex flex-col lg:flex-row mt-8 gap-8">
          <div className="w-full lg:w-3/4">
            <img
              src={mainImage || room.images?.[0]}
              alt={room.hotel?.name || room.roomType}
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>

          <div className="w-full lg:w-1/4">
            {room.images?.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`room-${index}`}
                    onClick={() => setMainImage(image)}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      mainImage === image ? "border-blue-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">Experience the Comfort of Our Luxurious Rooms</h2>

            <p className="text-gray-600 leading-relaxed">
              {room.description || "Enjoy a relaxing stay with premium amenities, comfortable interiors, and a host that makes every visit feel special."}
            </p>

            <div className="flex flex-wrap text-gray-600 text-sm leading-relaxed">
              {room.amenities?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg mr-2 mb-2"
                >
                  <img src={facilityIcons[item]} alt={item} className="w-5 h-5 mr-2" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <p className="text-2xl font-bold text-gray-800">
            {currency}
            {room.pricePerNight}
            <span className="text-base font-normal text-gray-500"> / night</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleCheckAvailability} className="mt-8 mb-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Check-in Date</span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                resetAvailability();
              }}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Check-out Date</span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                resetAvailability();
              }}
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Guests</span>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value));
                resetAvailability();
              }}
              placeholder="Guests"
              className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <button
            type="submit"
            disabled={isChecking}
            className="bg-blue-600 w-full text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-70"
          >
            {isChecking ? "Checking..." : "Check Availability"}
          </button>
        </div>

        {availabilityChecked && !isAvailable && (
          <p className="mt-3 text-sm text-red-600">This room is not available for the selected dates.</p>
        )}

        {availabilityChecked && isAvailable && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="text-sm text-green-600">This room is available. You can book it now.</p>
            <button
              type="button"
              disabled={isBooking}
              onClick={handleBookNow}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-70"
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomCommonData.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <img src={item.icon} alt={item.title} className="w-6 h-6" />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-8 border-y border-gray-300 py-6 text-gray-600 text-sm leading-relaxed shadow-md p-6 rounded-lg">
        <p>
          Guests will be notified of any changes to their booking. The room is prepared for a comfortable stay and can be adjusted up to 24 hours before arrival.
        </p>
      </div>

      <div className="mt-8 border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <img
            src={room.hotel?.owner?.image || assets.userIcon}
            alt={room.hotel?.owner?.name || "Host"}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-lg">Hosted by {room.hotel?.owner?.name || "the property host"}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={4} />
              <p className="text-sm text-gray-500">200+ Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <button className="bg-blue-600 mt-8 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
        Contact Now
      </button>
    </div>
  );
};

export default RoomDetails;
