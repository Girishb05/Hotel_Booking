import React, { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import Sidebar from "../../components/hotelOwner/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

const Layout = () => {
  const { isOwner } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOwner) {
      navigate('/');
    }
  }, [isOwner, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;