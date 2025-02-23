import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("id");
    navigate("/login");
  }

  return (
    <button
      onClick={logout}
      className="px-6 py-2 bg-orange-400 text-white font-semibold rounded-lg shadow-md cursor:pointer hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200 m-2"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
