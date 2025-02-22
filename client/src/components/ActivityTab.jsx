import React, { useState } from "react";
import { RadialBarChart, RadialBar } from "recharts";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.05,
  transport: 0.3,
};

const ActivityTab = ({ state, dispatch }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleFormSubmit = (activity, minutes) => {
    dispatch({ type: "INCREMENT", activity, minutes });
  };

  const closeForm = () => {
    setSelectedActivity(null);
  };

  const totalCO2 = state.totalCO2.toFixed(2);
  const getColor = (value) => {
    if (value < -0.5) return "#2ECC71";
    if (value < 0) return "#F1C40F";
    return "#E74C3C";
  };

  const data = [
    { name: "CO2 Impact", value: totalCO2, fill: getColor(totalCO2) },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm px-4 py-6 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Daily Activity Tracker
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* CO2 Impact Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Total CO2 Impact</div>
            <div
              className="text-3xl font-bold"
              style={{ color: getColor(totalCO2) }}
            >
              {totalCO2} kg
            </div>
          </div>

          {/* Chart */}
          <div className="flex justify-center">
            <RadialBarChart
              width={200}
              height={200}
              innerRadius="75%"
              outerRadius="100%"
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                minAngle={15}
                background
                dataKey="value"
                cornerRadius={30}
              />
            </RadialBarChart>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(CO2_EMISSIONS).map((activity) => (
            <button
              key={activity}
              onClick={() => handleActivityClick(activity)}
              className="bg-white rounded-xl p-4 shadow-sm active:bg-gray-50 transition-colors"
            >
              <ActivityIcon
                activity={activity}
                count={state[activity]}
                className="w-full h-24 mb-2"
              />
              <div className="text-center">
                <div className="text-sm font-medium capitalize">{activity}</div>
                <div className="text-xs text-gray-500">
                  {state[activity] || 0} mins
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        {state.totalCO2 !== 0 && (
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="w-full mt-6 px-6 py-3 bg-gray-200 rounded-full text-gray-700 font-medium active:bg-gray-300 transition-colors"
          >
            Reset Activities
          </button>
        )}
      </div>

      {/* Activity Form */}
      <ActivityForm
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onSubmit={handleFormSubmit}
        onClose={closeForm}
      />
    </div>
  );
};

export default ActivityTab;
