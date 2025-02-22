import { useEffect } from "react";

const GPSTracker = ({ dispatch }) => {
  useEffect(() => {
    let watchId;

    // Funkcija koja se poziva kad se pozicija promijeni
    const handlePositionChange = (position) => {
      const { latitude, longitude } = position.coords;

      // Provjera postoji li pozicija i odmah inkrementiraj za hodanje
      if (latitude && longitude) {
        dispatch({ type: "INCREMENT", activity: "walking", minutes: 5 }); // Povećaj hodanje za 5 minuta svaki put kad se pozicija promijeni
        localStorage.setItem("lastPosition", JSON.stringify({ latitude, longitude })); // Pohrani trenutnu poziciju
      }
    };

    // Provjera geolokacije
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(handlePositionChange, (error) => {
        console.error("Geolocation error", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // Očisti watch ID kada komponenta bude demontirana
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [dispatch]);

  return null; // Ova komponenta samo prati GPS, ne prikazuje ništa u UI-u
};

export default GPSTracker;
