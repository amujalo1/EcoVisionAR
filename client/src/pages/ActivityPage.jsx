import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { stateAtom, dispatchAtom, userAtom } from "../store/store"; // Imported atoms
import ActivityTab from "../components/ActivityTab";
import GPSTracker from "../components/GPSTracker";
import { getUserById, updateDailyActivity } from "../api/api";
import Layout from "../components/Layout";

function ActivityPage() {
  const userId = localStorage.getItem("id");
  const [isStreak, setIsStreak] = useState(false);
  const [state, setState] = useAtom(stateAtom);
  const [user, setUser] = useAtom(userAtom);
  const [, dispatch] = useAtom(dispatchAtom);
  const [loading, setLoading] = useState(true);

  // Učitavanje korisničkih podataka
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

  // Ažuriranje dnevne aktivnosti korisnika
  useEffect(() => {
    if (!loading && userId && user) {
      // Ako je totalCO2 ispod pola, postavi isStreak na true
      if (
        user.dailyActivity.totalCO2 <= user.dailyActivity.totalCO2 / 2 &&
        !isStreak
      ) {
        setIsStreak(true); // Samo postavi ako je potrebno
      }
      // Ako je totalCO2 iznad pola, resetuj isStreak na false
      else if (
        user.dailyActivity.totalCO2 > user.dailyActivity.totalCO2 / 2 &&
        isStreak
      ) {
        setIsStreak(false); // Samo resetuj ako je potrebno
      }

      // Ažuriraj dnevnu aktivnost korisnika
      updateDailyActivity(userId, { ...state, experience: user.experience })
        .then(() => {
          console.log("Stanje uspješno ažurirano u bazi");
        })
        .catch((error) => {
          console.error("Greška pri ažuriranju stanja:", error);
        });
    }
  }, [user, loading, state, userId, isStreak]); // Sada su zavisnosti ispravno postavljene

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <ActivityTab state={state} dispatch={dispatch} isStreak={isStreak} />
        {<GPSTracker dispatch={dispatch} />}
      </div>
    </Layout>
  );
}

export default ActivityPage;
