import LiquidGauge from "./LiquidGauge";
import React, { useState } from "react";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";

const ActivityTab = ({ state = {}, dispatch }) => {
  const CO2_EMISSIONS = {
    walking: -0.1,
    running: -0.15,
    biking: -0.1,
    transport: -0.3,
  };
  const [selectedActivity, setSelectedActivity] = useState(null);
  const totalCO2 = Number(state?.totalCO2?.toFixed(2)) || 0;

  const getColor = (value) => {
    if (value > 0) return "red";
    if (value >= -1) return "yellow";
    return "green";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <LiquidGauge value={totalCO2} fillColor={getColor()} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(CO2_EMISSIONS).map(([activity]) => (
            <ActivityIcon
              key={activity}
              activity={activity}
              count={state?.[activity] ?? 0}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>

        {totalCO2 !== 0 && (
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="w-full max-w-xs mx-auto block px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Reset Activities
          </button>
        )}

        <ActivityForm
          activity={selectedActivity}
          isOpen={!!selectedActivity}
          onSubmit={(activity, minutes) => {
            dispatch({ type: "INCREMENT", activity, minutes });
          }}
          onClose={() => setSelectedActivity(null)}
        />
      </div>
    </div>
  );
};

export default ActivityTab;
