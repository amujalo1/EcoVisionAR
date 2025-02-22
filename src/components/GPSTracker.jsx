import { useEffect, useState } from "react";

const GPSTracker = ({ dispatch }) => {
  const [lastPosition, setLastPosition] = useState(null);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0); // Za praćenje vremena kada je zadnja promjena
  const MIN_DISTANCE = 20; // Minimalna udaljenost za inkrementiranje (20 metara)
  const INCREMENT_INTERVAL = 60 * 1000; // 1 minuta u milisekundama

  useEffect(() => {
    let watchId;

    // Funkcija za izračunavanje udaljenosti između dvije GPS pozicije (Haversineova formula)
    const calculateDistance = (pos1, pos2) => {
      const R = 6371; // Radius Zemlje u kilometrima
      const dLat = (pos2.latitude - pos1.latitude) * (Math.PI / 180);
      const dLon = (pos2.longitude - pos1.longitude) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(pos1.latitude * (Math.PI / 180)) *
          Math.cos(pos2.latitude * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Vrati udaljenost u metrima
      return distance;
    };

    // Funkcija za praćenje promjena pozicije
    const handlePositionChange = (position) => {
      const { latitude, longitude } = position.coords;
      const currentPosition = { latitude, longitude };

      // Provjera da li imamo prethodnu poziciju za izračun udaljenosti
      if (lastPosition) {
        const distance = calculateDistance(lastPosition, currentPosition);

        // Ako pređena udaljenost premaši minimalnu udaljenost, inkrementiraj hodanje
        if (distance >= MIN_DISTANCE) {
          setDistanceCovered((prevDistance) => {
            const newDistance = prevDistance + distance;

            // Ako pređena udaljenost premašuje prag, inkrementiraj minut hodanja
            if (newDistance >= MIN_DISTANCE) {
              dispatch({ type: "INCREMENT", activity: "walking", minutes: 1 });
              setDistanceCovered(0); // Resetiraj pređenu udaljenost
            }
            return newDistance;
          });

          // Pohrani trenutnu poziciju za narednu provjeru
          setLastPosition(currentPosition);
        }
      } else {
        // Ako nema prethodne pozicije, pohrani trenutnu poziciju
        setLastPosition(currentPosition);
      }
    };

    // Funkcija koja se poziva kad se pozicija promijeni
    const trackPosition = () => {
      // Provjera geolokacije
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(handlePositionChange, (error) => {
          console.error("Geolocation error", error);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    // Početno pokretanje praćenja pozicije
    trackPosition();

    // Očisti watch ID kada komponenta bude demontirana
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [dispatch, lastPosition]);

  return null; // Ova komponenta samo prati GPS, ne prikazuje ništa u UI-u
};

export default GPSTracker;
