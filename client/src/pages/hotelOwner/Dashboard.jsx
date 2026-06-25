import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);

  return (
    <div>
      <Title
        title="Dashboard"
        subtitle="Monitor your hotel performance, manage rooms, and track bookings from one place."
        align="left"
      />

      <div className="flex flex-wrap gap-6 my-8">
        {/* Total Revenue */}
        <div className="flex items-center gap-4 bg-white shadow-md rounded-xl p-5 min-w-[250px]">
          <img
            src={assets.totalRevenueIcon}
            alt="Revenue"
            className="w-12 h-12"
          />

          <div>
            <p className="text-gray-500 text-sm">
              Total Revenue
            </p>

            <p className="text-2xl font-bold text-gray-800">
              ${dashboardData.totalRevenue}
            </p>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="flex items-center gap-4 bg-whites rounded-xl p-5 min-w-[250px]">
          <img
            src={assets.totalBookingIcon}
            alt="Bookings"
            className="w-12 h-12"
          />

          <div>
            <p className="text-gray-500 text-sm">
              Total Bookings
            </p>

            <p className="text-2xl font-bold text-gray-800">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>
      </div>

     <h2 className="text-xl font-semibold text-gray-800 mb-4">
  Recent Bookings
</h2>

<div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
  <table className="w-full text-left">
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-6 py-4 font-semibold text-gray-700">
          User Name
        </th>

        <th className="px-6 py-4 font-semibold text-gray-700">
          Room Name
        </th>

        <th className="px-6 py-4 font-semibold text-gray-700">
          Total Amount
        </th>

        <th className="px-6 py-4 font-semibold text-gray-700">
          Payment Status
        </th>
      </tr>
    </thead>

    <tbody>
      {dashboardData.bookings.map((booking) => (
        <tr
          key={booking._id}
          className="border-b hover:bg-gray-50"
        >
          <td className="px-6 py-4">
            {booking.user.username}
          </td>

          <td className="px-6 py-4">
            {booking.room.roomType}
          </td>

          <td className="px-6 py-4">
            ${booking.totalPrice}
          </td>

          <td className="px-6 py-4">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                booking.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.isPaid ? "Paid" : "Pending"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Dashboard;