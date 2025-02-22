import React, { useState } from "react";
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
  const co2Color = state.totalCO2 < 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-300 rounded-2xl">
      <div className="text-center mb-12">
        <div className="text-lg font-semibold">Total CO2 Impact</div>
        <div className={`text-2xl font-bold ${co2Color}`}>
          {totalCO2} kg CO2
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 mt-32">
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
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
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
    </div>
  );
};

export default ActivityTab;
