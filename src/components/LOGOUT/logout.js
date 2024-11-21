import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../SIDEBAR-data/Authentication"; // Update the path as needed

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Logout</h2>
        <p className="text-gray-600 mb-8">Are you sure you want to logout?</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition duration-200 shadow-md"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
