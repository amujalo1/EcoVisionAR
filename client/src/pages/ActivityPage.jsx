import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { stateAtom, dispatchAtom, userAtom } from "../store/store"; // Imported atoms
import TopBar from "../components/TopBar";
import ActivityTab from "../components/ActivityTab";
import GPSTracker from "../components/GPSTracker";
import { getUserById, updateDailyActivity } from "../api/api";
import Layout from "../components/Layout";

const dailyQuests = [
  { activity: "walking", minutes: 30 },
  { activity: "running", minutes: 20 },
  { activity: "biking", minutes: 45 },
];

function ActivityPage() {
  const userId = localStorage.getItem("id");
  const [state, setState] = useAtom(stateAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, dispatch] = useAtom(dispatchAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    getUserById(userId)
      .then((userData) => {
        dispatch({
          type: "SET_INITIAL_STATE",
          payload: userData, // Šaljemo cijeli korisnički objekt
        });

        setUser(userData); // Postavljanje korisničkog stanja
        setLoading(false);
      })
      .catch((error) => {
        console.error("Greška pri dohvatanju korisničkih podataka:", error);
        setLoading(false);
      });
  }, [userId]);

  // Učitaj i ažuriraj bazu kad god se promijeni stanje (uključujući XP)
  useEffect(() => {
    if (!loading && userId && user) {
      updateDailyActivity(userId, { ...state, experience: user.experience })
        .then(() => {
          console.log("Stanje uspješno ažurirano u bazi");
        })
        .catch((error) => {
          console.error("Greška pri ažuriranju stanja:", error);
        });
    }
  }, [state, userId, loading, user]);

  return (
    <Layout>
      <TopBar />
      <div className="flex flex-col h-full">
        <ActivityTab state={state} dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
        {<GPSTracker dispatch={dispatch} />}
      </div>
    </Layout>
  );
}

export default ActivityPage;
