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
      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition ease-in-out duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
