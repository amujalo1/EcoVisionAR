import { FaWalking, FaRunning, FaBicycle, FaTram } from "react-icons/fa";
const ActivityIcon = ({ activity, count, onClick }) => {
  const icons = {
    walking: FaWalking,
    running: FaRunning,
    biking: FaBicycle,
    transport: FaTram,
  };
  const CO2_EMISSIONS = {
    walking: -0.1,
    running: -0.15,
    biking: -0.1,
    transport: -0.3,
  };
  const Icon = icons[activity];
  const impact = CO2_EMISSIONS[activity];
  const isGreen = impact < 0;

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-col items-center">
        <div
          className={`p-4 rounded-full ${
            isGreen ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <span className="mt-2 font-medium capitalize">{activity}</span>
        <span className="text-sm text-gray-600">{count.toFixed(2)} mins</span>
        <span
          className={`text-sm font-medium ${
            isGreen ? "text-green-600" : "text-red-600"
          }`}
        >
          {(count * impact).toFixed(2)} kg CO2
        </span>
      </div>
    </button>
  );
};

export default ActivityIcon;
