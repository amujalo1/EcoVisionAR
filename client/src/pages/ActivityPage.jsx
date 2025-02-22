import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { stateAtom, dispatchAtom } from "../store/store"; // Import atoms

import ActivityTab from "../components/ActivityTab";
import GPSTracker from "../components/GPSTracker";
import { getUserById, updateDailyActivity } from "../api/api";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

const dailyQuests = [
  { activity: "walking", minutes: 30 },
  { activity: "running", minutes: 20 },
  { activity: "biking", minutes: 45 },
];

function ActivityPage() {
  const userId = localStorage.getItem("id");
  const [state, setState] = useAtom(stateAtom); // Correct way to use the stateAtom
  const [, dispatch] = useAtom(dispatchAtom); // Access dispatch function correctly
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
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!loading && userId) {
      updateDailyActivity(userId, state);
    }
  }, [state, userId, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <TopBar />
      <div className="flex flex-col">
        <ActivityTab state={state} dispatch={dispatch} />
        <GPSTracker dispatch={dispatch} />
      </div>
      <BottomBar />
    </>
  );
}

export default ActivityPage;
