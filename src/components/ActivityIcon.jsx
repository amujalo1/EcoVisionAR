import React, { act } from "react";
import { FaWalking, FaRunning, FaBicycle, FaCar } from "react-icons/fa";

const CO2_EMISSIONS = {
  walking: -0.1, // Example value, in kg CO2 per minute
  running: -0.15, // Example value, in kg CO2 per minute
  biking: -0.05, // Example value, in kg CO2 per minute
  driving: 0.3, // Example value for an average car, in kg CO2 per minute
};

const calculateCO2 = (activity, minutes) => {
  return CO2_EMISSIONS[activity] * minutes;
};

const ActivityIcon = ({ activity, onClick, count }) => {
  const icons = {
    walking: FaWalking,
    running: FaRunning,
    biking: FaBicycle,
    driving: FaCar,
  };

  const Icon = icons[activity];
  const isGreen = CO2_EMISSIONS[activity] < 0;
  const bgColor = isGreen ? "bg-green-300" : "bg-red-300";
  const hoverBg = isGreen ? "hover:bg-green-400" : "hover:bg-red-400";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className={`p-3 rounded-2xl transition-colors ${bgColor} ${hoverBg}`}
        onClick={onClick}
      >
        <Icon size={48} />
      </button>
      <div className="text-center">
        <div className="font-medium capitalize">{activity}</div>
        <div className="text-sm">{count} mins</div>
        <div className="text-sm">{count * CO2_EMISSIONS[activity]} KG CO2</div>
      </div>
    </div>
  );
};

export default ActivityIcon;
