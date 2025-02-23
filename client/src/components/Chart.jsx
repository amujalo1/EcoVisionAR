import React, { useState } from "react";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";
import ReactApexChart from "react-apexcharts";

const CO2_EMISSIONS = {
  walking: -0.1,
  running: -0.15,
  biking: -0.05,
  transport: 0.3,
};

const ActivityTab = ({ state = {}, dispatch }) => {
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

  const totalCO2 = Number(state?.totalCO2?.toFixed(2)) || 0;

  console.log("Current state:", state);

  const getArrowColor = (value) => {
    if (value < -0.5) return "#2ECC71"; // Zeleno
    if (value < 0) return "#F1C40F"; // Žuto
    return "#E74C3C"; // Crveno
  };

  // Proračun ugla strelice (od -90 do 90 stepeni)
  const arrowAngle = Math.min(Math.max(totalCO2 * 90, -90), 90);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-300 rounded-2xl">
      <div className="text-center mb-6">
        <div className="text-lg font-semibold">Total CO2 Impact</div>
        <div className="text-2xl font-bold text-gray-800">
          {totalCO2} kg CO2
        </div>
      </div>

      <div className="flex flex-col items-center mb-8 relative">
        <ReactApexChart
          options={{
            chart: { type: "donut" },
            plotOptions: {
              pie: {
                startAngle: -90, // Početni ugao (vertikalno)
                endAngle: 90, // Krajnji ugao (vertikalno)
                offsetY: 10, // Pomeranje grafikona prema gore
                donut: {
                  labels: {
                    show: false, // Sakrij labele
                  },
                },
              },
            },
            colors: ["#2ECC71", "#F1C40F", "#E74C3C"], // Boje za Low, Moderate, High
            labels: ["Low", "Moderate", "High"],
            grid: { padding: { bottom: -100 } }, // Smanji padding za bolji izgled
            legend: { show: false }, // Sakrij legendu
            dataLabels: { enabled: false }, // Sakrij procente na grafikonu
          }}
          series={[33.3, 33.3, 33.3]} // Jednake sekcije
          type="donut"
          height={200}
        />

        {/* Strelica */}
        <div
          className="absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 align-middle item"
          style={{
            transform: `translate(-50%, -50%) rotate(${arrowAngle}deg)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div
            className="w-0 h-0 border-l-8 border-r-8 border-b-[20px] border-transparent mx-auto"
            style={{
              borderBottomColor: getArrowColor(totalCO2),
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {CO2_EMISSIONS && typeof CO2_EMISSIONS === "object" ? (
          Object.entries(CO2_EMISSIONS).map(([activity, value]) => (
            <ActivityIcon
              key={activity}
              activity={activity}
              count={state?.[activity] ?? 0}
              onClick={() => handleActivityClick(activity)}
            />
          ))
        ) : (
          <p>Loading activities...</p>
        )}
      </div>

      {/* {totalCO2 !== 0 && (
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      )} */}

      <ActivityForm
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onSubmit={handleFormSubmit}
        onClose={closeForm}
      />
    </div>
  );
};

export default ActivityTab;
