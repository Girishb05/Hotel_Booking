import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: assets.dashboardIcon,
    },
    {
      name: "Add Room",
      path: "/owner/add-room",
      icon: assets.addIcon,
    },
    {
      name: "List Rooms",
      path: "/owner/list-rooms",
      icon: assets.listIcon,
    },
    {
      name: "Bookings",
      path: "/owner/bookings",
      icon: assets.bookingIcon,
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-73px)] bg-white border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Hotel Owner
        </h2>
      </div>

      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 transition ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-5 h-5"
            />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;