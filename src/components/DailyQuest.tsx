import React from "react";
import {
  FaWalking,
  FaRunning,
  FaBicycle,
  FaCar,
  FaTrophy,
  FaMedal,
} from "react-icons/fa";

const DailyQuest = ({ quests, currentState }) => {
  // Helper function to get icon by activity type
  const getIcon = (activity) => {
    const icons = {
      walking: FaWalking,
      running: FaRunning,
      biking: FaBicycle,
      transport: FaCar,
    };

    return icons[activity] || FaMedal;
  };

  // Calculate completion percentage for progress bar
  const calculateProgress = (quest) => {
    const current = currentState[quest.activity] || 0;
    const percentage = Math.min((current / quest.minutes) * 100, 100);
    return percentage;
  };

  // Check if quest is completed
  const isQuestCompleted = (quest) => {
    const current = currentState[quest.activity] || 0;
    return current >= quest.minutes;
  };

  return (
    <div className="bg-zinc-100 rounded-lg shadow-lg p-3 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <FaTrophy className="text-yellow-500 text-2xl" />
        <h2 className="text-xl font-bold">Daily Quests</h2>
      </div>

      <div className="space-y-4">
        {quests.map((quest, index) => {
          const Icon = getIcon(quest.activity);
          const progress = calculateProgress(quest);
          const completed = isQuestCompleted(quest);

          return (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-all ${
                completed
                  ? "bg-green-50 border-green-200"
                  : "bg-slate-200 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
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
                <div className="flex-1">
                  <h3 className="font-medium capitalize">
                    {quest.activity} Quest
                  </h3>
                  <p className="text-sm text-gray-600">
                    Complete {quest.minutes} minutes of {quest.activity}
                  </p>
                </div>
                {completed && (
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    Completed!
                  </div>
                )}
              </div>

              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 h-full transition-all duration-300 rounded-full ${
                    completed ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 text-sm text-gray-600 flex justify-between">
                <span>
                  Progress: {currentState[quest.activity] || 0}/{quest.minutes}{" "}
                  minutes
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

export default DailyQuest;
