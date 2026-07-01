import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logo.svg";
import search from "../assets/searchIcon.svg";
import menuIcon from "../assets/menuIcon.svg";
import closeIcon from "../assets/closeIcon.svg";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  
  const location = useLocation();
  const {user,navigate,isOwner,setShowHotelReg}=useAppContext()

  useEffect(() => {
    setIsScrolled(location.pathname !== "/");

    const handleScroll = () => {
      if (location.pathname === "/") {
        setIsScrolled(window.scrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleHotelAction = () => {
    if (isOwner) {
      navigate("/owner");
      return;
    }

    setShowHotelReg(true);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-lg py-3 md:py-4"
          : "bg-indigo-500 py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                isScrolled ? "bg-gray-700" : "bg-white"
              }`}
            />
          </Link>
        ))}



       {user && ( <button
          className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all ${
            isScrolled
              ? "text-black border-black"
              : "text-white border-white"
          }`}
          onClick={handleHotelAction}
        >
          {isOwner?  "Dashboard" : "List Your Hotel"}
        </button>)}

      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={search}
          alt="Search"
          className={`h-7 transition-all duration-500 ${
            isScrolled ? "invert" : ""
          }`}
        />

        {user ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/my-bookings")}
              className={`border px-4 py-1 rounded-full transition-all ${
                isScrolled
                  ? "text-black border-black"
                  : "text-white border-white"
              }`}
            >
              My Bookings
            </button>

            <UserButton />
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              isScrolled
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <img
          src={menuIcon}
          alt="Menu"
          className={`h-7 cursor-pointer ${
            isScrolled ? "invert" : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-gray-800 transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={closeIcon}
            alt="Close"
            className="h-6"
          />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="text-lg"
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            className="border px-4 py-1 rounded-full"
            onClick={handleHotelAction}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <UserButton />

            <button
              onClick={() => {
                navigate("/my-bookings");
                setIsMenuOpen(false);
              }}
              className="border px-6 py-2 rounded-full"
            >
              My Bookings
            </button>
          </div>
        ) : (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;