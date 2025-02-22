import { useEffect, useReducer, useState } from "react";
import ActivityTab from "../components/ActivityTab";
import DailyQuest from "../components/DailyQuest";
import GPSTracker from "../components/GPSTracker";
import { getUserById, updateDailyActivity } from "../api/api";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

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

const defaultState = {
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
    case "RESET":
      return defaultState;
    case "SET_INITIAL_STATE":
      return action.payload;
    default:
      return state;
  }
}

function ActivityPage() {
  const userId = localStorage.getItem("id");
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    getUserById(userId)
      .then((user) => {
        dispatch({
          type: "SET_INITIAL_STATE",
          payload: user.dailyActivity || defaultState,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju korisnika:", error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!loading && userId) {
      updateDailyActivity(userId, state);
    }
  }, [state, userId, loading]);

  if (loading) {
    return <p>Učitavanje podataka...</p>;
  }

  return (
    <>
      <TopBar />
      <div className="flex">
        <ActivityTab state={state} dispatch={dispatch} />
        <DailyQuest quests={dailyQuests} currentState={state} />
        <GPSTracker dispatch={dispatch} />
      </div>
      <BottomBar />
    </>
  );
}

export default ActivityPage;
