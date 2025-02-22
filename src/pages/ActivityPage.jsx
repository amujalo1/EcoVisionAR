import { useReducer } from "react";
import ActivityTab from "../components/ActivityTab";
import DailyQuest from "../components/DailyQuest";
import GPSTracker from "../components/GPSTracker"; // Importujemo GPSTracker

const dailyQuests = [
  { activity: "walking", minutes: 30 },
  { activity: "running", minutes: 20 },
  { activity: "biking", minutes: 45 },
];

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.1,
  transport: -0.3,
};

const initialState = {
  walking: 0,
  running: 0,
  biking: 0,
  transport: 0,
  totalCO2: 6.9,
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

function ActivityPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="flex">
      <ActivityTab state={state} dispatch={dispatch} />
      <DailyQuest quests={dailyQuests} currentState={state} />
      <GPSTracker dispatch={dispatch} /> {/* Dodajemo GPS komponentu */}
    </div>
  );
}

export default ActivityPage;
