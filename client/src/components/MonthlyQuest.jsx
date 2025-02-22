import React from "react";
import {
  FaWalking,
  FaRunning,
  FaBicycle,
  FaCar,
  FaTrophy,
  FaMedal,
} from "react-icons/fa";

const MonthlyQuest = ({ currentState }) => {
  const monthlyQuests = [
    { activity: "walking", minutes: 600, points: 500 },
    { activity: "running", minutes: 500, points: 450 },
    { activity: "biking", minutes: 800, points: 600 },
  ];

  const getIcon = (activity) => {
    const icons = {
      walking: FaWalking,
      running: FaRunning,
      biking: FaBicycle,
      transport: FaCar,
    };
    return icons[activity] || FaMedal;
  };

  const calculateProgress = (quest) => {
    const current = currentState[quest.activity] || 0;
    return Math.min((current / quest.minutes) * 100, 100);
  };

  const isQuestCompleted = (quest) => {
    return (currentState[quest.activity] || 0) >= quest.minutes;
  };

  return (
    <div className="bg-zinc-100 rounded-lg shadow-lg p-3 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <FaTrophy className="text-yellow-500 text-2xl" />
        <h2 className="text-xl font-bold">Monthly Quests</h2>
      </div>

      <div className="space-y-4">
        {monthlyQuests.map((quest, index) => {
          const Icon = getIcon(quest.activity);
          const progress = calculateProgress(quest);
          const completed = isQuestCompleted(quest);

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-all relative ${
                completed
                  ? "bg-green-50 border-green-200"
                  : "bg-slate-200 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {/* Ikonica aktivnosti */}
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      completed ? "bg-green-200" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`text-xl ${
                        completed ? "text-green-700" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium capitalize">
                      {quest.activity} Quest
                    </h3>
                    <p className="text-sm text-gray-600">
                      Complete {quest.minutes} minutes of {quest.activity}
                    </p>
                  </div>
                </div>

                {/* Poeni i 🌱 ikonica */}
                <div className="flex items-center gap-1 text-black font-bold text-lg">
                  <span>{quest.points}</span>
                  <span>🌱</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 h-full transition-all duration-300 rounded-full ${
                    completed ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status aktivnosti */}
              <div className="mt-2 text-sm text-gray-600 flex justify-between">
                <span>
                  {currentState[quest.activity] || 0}/{quest.minutes} minutes
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyQuest;
