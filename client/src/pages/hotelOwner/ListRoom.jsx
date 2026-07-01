import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  // Fetch Rooms of the Hotel Owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message || 'Unable to fetch rooms');
      }
    } catch (error) {
      toast.error(error.message || 'Unable to fetch rooms');
    }
  };
  
  //Toggle Availability of the room

  const toggleAvailability=async(roomId)=>{
    const {data}=await axios.post('/api/rooms/toggle-availability',{roomId},{
        headers: { Authorization: `Bearer ${await getToken()}`}})

        if(data.success){
          toast.success(data.message)
          fetchRooms()
        }
        else{
          toast.error(data.message)
        }
  }


  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);


  return (
    <div>
      <Title
        title="All Rooms"
        subtitle="Manage and view all available rooms"
        align="left"
      />

      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Room Type</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-t">
                <td className="px-6 py-4">
                  <img
                    src={room.images[0]}
                    alt={room.roomType}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4">
                  {room.roomType}
                </td>

                <td className="px-6 py-4">
                  ${room.pricePerNight}
                </td>

                <td className="px-6 py-4">
                  <span className="text-green-600 font-medium">
                    Available
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;