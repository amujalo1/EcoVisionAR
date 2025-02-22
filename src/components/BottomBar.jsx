import React from "react";
import { Link } from "react-router-dom";
import { LuSquareActivity } from "react-icons/lu";
import { FaCalculator, FaShoppingCart } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-300 py-3 shadow-md">
      {[
        { to: "/calculate", icon: <FaCalculator size={24} />, label: "Calculate" },
        { to: "/activity", icon: <LuSquareActivity size={24} />, label: "Activity" },
        { to: "/stats", icon: <IoStatsChartSharp size={24} />, label: "Stats" },
        { to: "/shop", icon: <FaShoppingCart size={24} />, label: "Shop" },
      ].map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-all"
        >
          {icon}
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;
