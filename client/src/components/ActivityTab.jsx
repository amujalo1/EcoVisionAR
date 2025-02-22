import React, { useState } from "react";
import ActivityIcon from "./ActivityIcon";
import ActivityForm from "./ActivityForm";
import ReactApexChart from "react-apexcharts";

const ActivityTab = ({ state = {}, dispatch }) => {
  const CO2_EMISSIONS = {
    walking: -0.1,
    running: -0.15,
    biking: -0.1,
    transport: -0.3,
  };
  const [selectedActivity, setSelectedActivity] = useState(null);
  const totalCO2 = Number(state?.totalCO2?.toFixed(2)) || 7; // Početna vrijednost je 7

  // Funkcija za određivanje boje na temelju vrijednosti CO2
  const getColor = (value) => {
    if (value > 0) return "#E74C3C"; // Crvena
    if (value >= -1) return "#F1C40F"; // Žuta
    return "#2ECC71"; // Zelena
  };

  // Opcije za donut grafikon
  const chartOptions = {
    series: [33.3, 33.3, 33.3], // Tri jednaka segmenta
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: "70%", // Veličina donut grafikona
          labels: {
            show: false,
          },
        },
      },
    },
    colors: ["#E74C3C", "#F1C40F", "#2ECC71"], // Crvena, žuta, zelena
    labels: ["High", "Moderate", "Low"],
    grid: {
      padding: {
        bottom: -100,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%", // Prilagodi širinu za manje ekrane
          },
          plotOptions: {
            pie: {
              donut: {
                size: "60%", // Prilagodi veličinu donut grafikona za manje ekrane
              },
            },
          },
        },
      },
    ],
  };

  // Proračun ugla strelice (od -90 do 90 stepeni)
  const arrowAngle = Math.min(Math.max(totalCO2 * 90, -90), 90);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex justify-center relative">
          {/* Donut grafikon */}
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <ReactApexChart
              options={chartOptions}
              series={chartOptions.series}
              type="donut"
              height={300}
            />
          </div>

          {/* Strelica */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${arrowAngle}deg)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <div
              className="w-0 h-0 border-l-8 border-r-8 border-b-[20px] border-transparent mx-auto"
              style={{
                borderBottomColor: getColor(totalCO2),
              }}
            />
          </div>
        </div>

        {/* Prikaz trenutne vrijednosti CO2 */}
        <div className="text-center mb-8">
          <div className="text-lg font-semibold">Trenutni CO2 utjecaj:</div>
          <div className="text-2xl font-bold text-gray-800">
            {totalCO2} kg CO2
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(CO2_EMISSIONS).map(([activity]) => (
            <ActivityIcon
              key={activity}
              activity={activity}
              count={state?.[activity] ?? 0}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>

        {totalCO2 !== 7 && ( // Reset button se prikazuje samo ako totalCO2 nije početna vrijednost
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="w-full max-w-xs mx-auto block px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Reset Activities
          </button>
        )}

        <ActivityForm
          activity={selectedActivity}
          isOpen={!!selectedActivity}
          onSubmit={(activity, minutes) => {
            dispatch({ type: "INCREMENT", activity, minutes });
          }}
          onClose={() => setSelectedActivity(null)}
        />
      </div>
    </div>
  );
};

export default ActivityTab;