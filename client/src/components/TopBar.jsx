import React, { useEffect, useState } from "react";
import { FaSeedling, FaTree, FaLeaf } from "react-icons/fa";
import { GiTreeGrowth, GiForest } from "react-icons/gi";
import logo from "/logo.png";
import LogoutButton from "./LogoutButton";
import { getUserById } from "../api/api"; // Import the function to get user by ID

const getStreakIcon = (streak) => {
  if (streak <= 3) return <FaSeedling className="text-green-400 text-lg" />;
  if (streak <= 7) return <FaLeaf className="text-green-500 text-lg" />;
  if (streak <= 14) return <FaTree className="text-green-600 text-lg" />;
  if (streak <= 21) return <GiTreeGrowth className="text-green-700 text-lg" />;
  return <GiForest className="text-green-800 text-lg" />;
};

const TopBar = ({ streak }) => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("id"); // Get the userId from localStorage

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId); // Fetch user data using the userId from localStorage
          setUser(userData); // Store the user data in the state
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUser(); // Fetch the user data when the component is mounted
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white text-black flex items-center justify-between py-3 px-6 shadow-md border-b border-gray-200 z-10">
      {/* Left Section - Points and Username */}
      <div className="flex items-center gap-3">
        <span className="font-semibold">Points:</span>
        <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
          {user.points} {/* Display user points */}
        </span>
        <span className="font-semibold">{user.username}</span> {/* Display username */}
      </div>

      {/* Center Section - Logo */}
      <div className="flex-1 flex justify-center">
        <img src={logo} alt="Logo" className="h-12 object-contain" />
      </div>

      {/* Right Section - Streak and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getStreakIcon(streak)}
          <span className="font-semibold">Streak:</span>
          <span className="bg-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
            {streak}
          </span>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default TopBar;
