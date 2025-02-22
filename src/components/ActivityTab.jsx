import React, { useReducer, useState } from "react";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.05,
  driving: 0.3,
};
const initialState = {
  walking: 0,
  running: 0,
  biking: 0,
  driving: 0,
  totalCO2: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT": {
      const newMinutes = state[action.activity] + Number(action.minutes);
      const co2Impact = CO2_EMISSIONS[action.activity] * Number(action.minutes);
      return {
        ...state,
        [action.activity]: newMinutes,
        totalCO2: state.totalCO2 + co2Impact,
      };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
}

const ActivityTab = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-6">
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

        <div className="text-center">
          <div className="text-lg font-semibold">Total CO2 Impact</div>
          <div className={`text-2xl font-bold ${co2Color}`}>
            {totalCO2} kg CO2
          </div>
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
