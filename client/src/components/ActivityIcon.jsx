import React from "react";
import { FaWalking, FaRunning, FaBicycle, FaTram } from "react-icons/fa";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.1,
  transport: -0.05,
};

const ActivityIcon = ({ activity, onClick, count }) => {
  const icons = {
    walking: FaWalking,
    running: FaRunning,
    biking: FaBicycle,
    transport: FaTram,
  };

  const Icon = icons[activity];
  const isGreen = CO2_EMISSIONS[activity] < 0;
  const bgColor = isGreen ? "bg-green-300" : "bg-red-300";
  const hoverBg = isGreen ? "hover:bg-green-400" : "hover:bg-red-400";

  return (
    <div className="flex flex-col items-center w-32 p-4 rounded-lg shadow-lg bg-white">
      <button
        type="button"
        className={`p-4 rounded-full transition-colors ${bgColor} ${hoverBg} hover:cursor-pointer`}
        onClick={onClick}
      >
        <Icon size={48} />
      </button>
      <div className="text-center mt-3">
        <div className="text-lg font-semibold capitalize">{activity}</div>
        <div className="text-gray-700 text-sm mt-1">{count} mins</div>
        <div className={`text-sm font-bold mt-1 ${isGreen ? "text-green-600" : "text-red-600"}`}>
          {(count * CO2_EMISSIONS[activity]).toFixed(2)} KG CO2
        </div>
      </div>
    </div>
  );
};

export default ActivityIcon;