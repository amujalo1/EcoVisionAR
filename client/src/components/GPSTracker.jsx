import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  console.log(lon1, lon2, lat1, lat2);
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance in meters
};

const GPSTracker = ({ dispatch }) => {
  const [positions, setPositions] = useState([]);
  const [distance, setDistance] = useState(0);

  console.log(positions);
  console.log(distance);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (isNaN(latitude) || isNaN(longitude)) {
            console.error("Invalid GPS coordinates:", latitude, longitude);
            return;
          }

          setPositions((prevPositions) => {
            const updatedPositions = [
              ...prevPositions,
              { lat: latitude, lng: longitude },
            ];
            if (prevPositions.length > 0) {
              const prev = prevPositions[prevPositions.length - 1];
              const dist = calculateDistance(
                prev.lat,
                prev.lng,
                latitude,
                longitude
              );

              if (dist > 1) {
                setDistance((prevDistance) => prevDistance + dist);

                // Calculate activity type and update
                let activity = "walking";
                let speedFactor = 80;
                if (dist >= 5 && dist < 10) {
                  activity = "running";
                  speedFactor = 150;
                } else if (dist >= 10 && dist < 25) {
                  activity = "biking";
                  speedFactor = 300;
                } else if (dist >= 25) {
                  activity = "transport";
                  speedFactor = 600;
                }

                // Dispatch activity update only if valid
                dispatch({
                  type: "INCREMENT",
                  activity,
                  minutes: dist / speedFactor,
                });
              }
            }

            return updatedPositions;
          });
        },
        (error) => console.error("GPS Error:", error),
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Activity Tracker</h2>
      <p>Distance Traveled: {distance.toFixed(2)} meters</p>

      {positions.length > 0 ? (
        <MapContainer
          center={positions[0]}
          zoom={18}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={positions} color="green" />
          <Marker position={positions[positions.length - 1]} />
        </MapContainer>
      ) : (
        <p>Waiting for GPS signal...</p>
      )}
    </div>
  );
};

export default GPSTracker;
