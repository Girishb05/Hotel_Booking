import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

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