import React, { useState } from 'react'
import heroImage from '../assets/heroImage.png'
import { assets, cities } from '../assets/assets' // change if your file is index.js
import { useAppContext } from '../../context/AppContext'

const Hero = () => {

const [destination, setDestination] = useState("");
  const { navigate, getToken, axios, setSearchedCities } = useAppContext();

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);

    // call api to save recent searched city
    await axios.post(
      '/api/user/recentlySearchedCities',
      { recentSearchedCity: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    //add destination to searchedCiies max 3 recent searched cities

    setSearchedCities((prevSearchedCities)=>{
      const updatedSearchedCities=[...prevSearchedCities,destination];

      if(updatedSearchedCities.length > 3){
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities
    })
  }



  return (
    <div
      className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 bg-cover bg-center bg-no-repeat h-screen text-white"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <p
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="font-bold text-lg md:text-xl px-3 py-1 rounded"
      >
        The Ultimate Hotel Experience
      </p>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-4 text-center">
        Discover Your Perfect Stay
      </h1>

      <p className="text-base md:text-lg text-center mb-8 max-w-2xl">
        Unforgettable moments await you at our luxurious hotels.
        Experience luxury like never before. Feel the difference with us.
      </p>

      <form onSubmit={onSearch} className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="Calendar"
              className="h-5"
            />
            <label htmlFor="destinationInput">Destination</label>
          </div>

          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
            onChange={e=> setDestination(e.target.value)}   value={destination}
          />

          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="Calendar"
              className="h-5"
            />
            <label htmlFor="checkIn">Check In</label>
          </div>

          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="Calendar"
              className="h-5"
            />
            <label htmlFor="checkOut">Check Out</label>
          </div>

          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>

          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="1"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img
            src={assets.searchIcon}
            alt="Search"
            className="h-5"
          />
          <span>Search</span>
        </button>
      </form>
    </div>
  )
}

export default Hero