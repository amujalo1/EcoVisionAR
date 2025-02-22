import React from "react";
import { FaSeedling, FaTree, FaLeaf } from "react-icons/fa";
import { GiTreeGrowth, GiForest } from "react-icons/gi";
import logo from "/logo.png";

const getStreakIcon = (streak) => {
  if (streak <= 3) return <FaSeedling className="text-green-400 text-lg" />;
  if (streak <= 7) return <FaLeaf className="text-green-500 text-lg" />;
  if (streak <= 14) return <FaTree className="text-green-600 text-lg" />;
  if (streak <= 21) return <GiTreeGrowth className="text-green-700 text-lg" />;
  return <GiForest className="text-green-800 text-lg" />;
};

const TopBar = ({ streak }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white text-black flex justify-between items-center py-3 px-6 shadow-md border-b border-gray-200">
      {/* Points Section */}
      <div className="flex items-center space-x-2">
        <span className="font-semibold">Points:</span>
        <span className="bg-green-500 px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
          100
        </span>
      </div>
      
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
      </div>
      
      {/* Streak Section */}
      <div className="flex items-center space-x-2">
        {getStreakIcon(streak)}
        <span className="font-semibold">Streak:</span>
        <span className="bg-yellow-500 px-3 py-1.5 rounded-full text-sm font-medium shadow-md">{streak}</span>
      </div>
    </div>
  );
};

export default TopBar;
