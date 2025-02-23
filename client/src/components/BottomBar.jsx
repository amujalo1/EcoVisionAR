import React from "react";
import { NavLink } from "react-router-dom";
import { FaCalculator, FaChessKnight } from "react-icons/fa6";
import { LuSquareActivity } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 px-4">
        <NavLink
          to="/calculate"
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
            }`
          }
        >
          <FaUserFriends className="text-xl transition-transform duration-300 hover:scale-110" />
          <span className="text-xs mt-1">Friends</span>
        </NavLink>
        <NavLink
          to="/quests"
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
            }`
          }
        >
          <FaChessKnight className="text-xl transition-transform duration-300 hover:scale-110" />
          <span className="text-xs mt-1">Quests</span>
        </NavLink>
        <NavLink
          to="/activity"
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
            }`
          }
        >
          <LuSquareActivity className="text-xl transition-transform duration-300 hover:scale-110" />
          <span className="text-xs mt-1">Activity</span>
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
            }`
          }
        >
          <IoStatsChart className="text-xl transition-transform duration-300 hover:scale-110" />
          <span className="text-xs mt-1">Stats</span>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
            }`
          }
        >
          <FaShoppingCart className="text-xl transition-transform duration-300 hover:scale-110" />
          <span className="text-xs mt-1">Shop</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
