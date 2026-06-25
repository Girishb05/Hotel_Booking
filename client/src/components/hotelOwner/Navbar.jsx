import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm border-b">
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-10"
        />
      </Link>

      <div className="flex items-center gap-4">
        <p className="text-gray-600 font-medium">
          Owner Dashboard
        </p>

        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;