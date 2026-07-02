import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { roomsDummyData, assets, facilityIcons } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CheckBox = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-600"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

const AllRooms = () => {

  const [searchparams,setSearchParams]=useSearchParams()
  const {rooms,navigate,currency}=useAppContext()

  
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters,setSelectedFilters]=useState({
    roomType:[],
    priceRange:[],
  
  })


  const [selectedSort,setSelectedSort]=useState('')

  const roomTypes = [
    "Single Room",
    "Double Room",
    "Luxury Suite",
    "Family Room",
  ];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 1500",
    "1500 to 2000",
    "2000+",
  ];

  // Handle changes for filters and sorting

  const handleFilteringChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const values = prevFilters[type] || [];
      const updatedValues = checked
        ? [...values, value]
        : values.filter((item) => item !== value);

      return {
        ...prevFilters,
        [type]: updatedValues,
      };
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  //Function to check if a room matches the selected room types 

  const matchesroomType=(room)=>{
    return selectedFilters.roomType.length ===0 || selectedFilters.roomType.includes(room.roomType)
  }

  //Function to check if a room matches the selected price ranges 

  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        if (range.includes("+")) {
          const min = Number(range.replace("+", "").trim());
          return room.pricePerNight >= min;
        }

        const [min, max] = range.split("to").map((value) => Number(value.trim()));
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };
  

  //Function to sort rooms based on the selected sort option
 const sortRooms=(a,b)=>{
  if(selectedSort === 'Price Low to High'){
    return a.pricePerNight-b.pricePerNight
  }

  if(selectedSort === "Price High to Low"){
    return b.pricePerNight - a.pricePerNight
  }

  if(selectedSort === "Newest First"){
    return new Date(b.createdAt)-new Date(a.createdAt)
  }
  
  return 0;

 }


 //Filter Destination 

 const filterDestination=(room)=>{
  const destination=searchparams.get('destination')

  if(!destination) return true

  return room.hotel?.city?.toLowerCase().includes(destination.toLowerCase()) || false;
 }

 //Filter and sort rooms based on the selected filters and sort option 

 const filteredRooms=useMemo(()=>{
  return rooms.filter(room => matchesroomType(room) && matchesPriceRange(room) && filterDestination(room)) .sort(sortRooms);

 },[rooms,selectedFilters,selectedSort,searchparams])

const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className="pt-28 md:pt-36 px-4 md:px-8 lg:px-24 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          All Rooms
        </h1>

        <p className="text-gray-600 mt-2">
          Take a look at all our available rooms and find the perfect one for your stay!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Rooms Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    window.scrollTo(0, 0);
                  }}
                />

                <div className="p-5">
                  <p className="text-sm text-gray-500">
                    {room.hotel?.city || "Unknown City"}
                  </p>

                  <h2
                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {room.hotel?.name || "Hotel"}
                  </h2>

                  <div className="flex items-center gap-2 mt-3">
                    <StarRating rating={room.rating || 4} />
                    <span className="text-sm text-gray-500">
                      200+ Reviews
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <img
                      src={assets.locationIcon}
                      alt="location"
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">
                      {room.hotel?.address || "Address not provided"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {room.amenities.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                      >
                        <img
                          src={facilityIcons[item]}
                          alt={item}
                          className="w-4 h-4"
                        />
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-lg font-bold">
                      ${room.pricePerNight}
                      <span className="text-sm font-normal text-gray-500">
                        {" "} / night
                      </span>
                    </p>

                    <button
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="w-full lg:w-72 bg-white shadow-md rounded-xl p-5 h-fit sticky top-28">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Filters</h2>

            <div className="flex items-center gap-4">
              <span
                onClick={() => setOpenFilters(!openFilters)}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
              >
                {openFilters ? "Hide" : "Show"}
              </span>

              <span
                onClick={clearFilters}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
              >
                Clear
              </span>
            </div>
          </div>

          <div
            className={`space-y-6 ${
              openFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div>
              <h3 className="font-medium mb-3">Room Type</h3>

              <div className="space-y-2">
                {roomTypes.map((type) => (
                  <CheckBox
                    key={type}
                    label={type}
                    selected={selectedFilters.roomType.includes(type)}
                    onChange={(checked) => handleFilteringChange(checked, type, 'roomType')}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>

              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <CheckBox
                    key={range}
                    label={`${currency} ${range}`}
                    selected={selectedFilters.priceRange.includes(range)}
                    onChange={(checked) => handleFilteringChange(checked, range, 'priceRange')}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;