import React, { useState } from "react";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

function CalculatorPage() {
  const [fuel, setFuel] = useState("");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [emission, setEmission] = useState(null);

  // Emisijski faktori (kg CO₂ po jedinici)
  const fuelEmissionFactor = 2.31; // kg CO₂ po litru goriva
  const electricityEmissionFactor = 0.4; // kg CO₂ po kWh (prosječna vrijednost)

  const calculateCO2 = () => {
    const fuelEmission = (parseFloat(fuel) || 0) * fuelEmissionFactor;
    const electricityEmission =
      (parseFloat(electricity) || 0) * electricityEmissionFactor;
    const totalEmission = fuelEmission + electricityEmission;

    setEmission(totalEmission.toFixed(2));
  };

  return (
    <>
      <TopBar />

      <div className="h-full flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold mb-4">CO₂ Kalkulator</h1>

        <div className="flex flex-col gap-3 w-full max-w-md">
          <label className="flex flex-col">
            Gorivo (litara):
            <input
              type="number"
              className="border p-2 rounded"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Udaljenost (km):
            <input
              type="number"
              className="border p-2 rounded"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            Električna energija (kWh):
            <input
              type="number"
              className="border p-2 rounded"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
            />
          </label>

          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            onClick={calculateCO2}
          >
            Izračunaj CO₂ emisiju
          </button>
        </div>

        {emission !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="text-lg font-semibold">
              Ukupna CO₂ emisija: {emission} kg
            </p>
          </div>
        )}
      </div>
      <BottomBar />
    </>
  );
}

export default CalculatorPage;
