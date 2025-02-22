import React from "react";
import { NavLink } from "react-router-dom";
import { FaCalculator } from "react-icons/fa6";
import { LuSquareActivity } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

const BottomBar = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white shadow-lg rounded-full flex justify-around items-center py-3 px-4 border border-gray-200 backdrop-blur-md">
      <NavLink
        to="/calculate"
        className="flex flex-col items-center text-gray-500 transition-all duration-300 hover:text-green-500"
        activeClassName="text-green-600"
      >
        <FaCalculator className="text-xl transition-transform duration-300 hover:scale-110" />
        <span className="text-xs mt-1">Calc</span>
      </NavLink>
      <NavLink
        to="/activity"
        className="flex flex-col items-center text-gray-500 transition-all duration-300 hover:text-green-500"
        activeClassName="text-green-600"
      >
        <LuSquareActivity className="text-xl transition-transform duration-300 hover:scale-110" />
        <span className="text-xs mt-1">Activity</span>
      </NavLink>
      <NavLink
        to="/stats"
        className="flex flex-col items-center text-gray-500 transition-all duration-300 hover:text-green-500"
        activeClassName="text-green-600"
      >
        <IoStatsChart className="text-xl transition-transform duration-300 hover:scale-110" />
        <span className="text-xs mt-1">Stats</span>
      </NavLink>
      <NavLink
        to="/shop"
        className="flex flex-col items-center text-gray-500 transition-all duration-300 hover:text-green-500"
        activeClassName="text-green-600"
      >
        <FaShoppingCart className="text-xl transition-transform duration-300 hover:scale-110" />
        <span className="text-xs mt-1">Shop</span>
      </NavLink>
    </div>
  );
};

export default BottomBar;
