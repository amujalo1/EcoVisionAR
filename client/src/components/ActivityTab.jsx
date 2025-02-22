import React, { useState } from "react";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";
import { RadialBarChart, RadialBar, Legend } from "recharts";

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
  console.log(totalCO2);
  const co2Percentage = Math.min(Math.max(state.totalCO2 / 10, 0), 1) * 100;

  // Promjena boje na osnovu totalCO2 vrijednosti
  const getColor = (value) => {
    if (value < -0.5) return "#2ECC71"; // Zeleno za veoma nizak CO2
    if (value < 0) return "#F1C40F"; // Žuto za umjerene vrijednosti
    return "#E74C3C"; // Crveno za visoke vrijednosti
  };

  // Podaci za grafikon
  const data = [
    { name: "CO2 Impact", value: totalCO2, fill: getColor(totalCO2) },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-300 rounded-2xl">
      <div className="text-center mb-6">
        <div className="text-lg font-semibold">Total CO2 Impact</div>
        <div className="text-2xl font-bold text-gray-800">
          {totalCO2} kg CO2
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <RadialBarChart
          width={250}
          height={250}
          innerRadius="80%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#111" }}
            background
            dataKey="value"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
        </RadialBarChart>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.keys(CO2_EMISSIONS).map((activity) => (
          <ActivityIcon
            key={activity}
            activity={activity}
            count={state[activity]}
            onClick={() => handleActivityClick(activity)}
          />
        ))}
      </div>

      {state.totalCO2 !== 0 && (
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      )}

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
