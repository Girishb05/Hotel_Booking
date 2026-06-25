import React from "react";
import HotelCard from "./HotelCard";
import { roomsDummyData } from "../assets/assets";
import Title from "./Title";
import {useNavigate} from "react-router-dom";

const FeaturedDestination = () => {
  console.log(roomsDummyData);
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center">
        Featured Destinations
      </h1>
    

   <Title
 
  subtitle="Explore our top destinations for your next getaway."
  align="center"
  font="text-3xl"
/>   <div className="flex flex-wrap justify-center gap-6 mt-8">
        {roomsDummyData?.slice(0, 4).map((room, index) => (
          <HotelCard
            key={room._id}
            room={room}
            index={index}
          />
        ))}
      </div>

     <div className="flex justify-center mt-8">
  <button
    onClick={() => navigate("/rooms")}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    View All Destinations
  </button>
</div>
    </div>
  );
};

export default FeaturedDestination;