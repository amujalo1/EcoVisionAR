import React from "react";
import DailyQuest from "../components/DailyQuest";
import WeeklyQuest from "../components/WeeklyQuest";
import MonthlyQuest from "../components/MonthlyQuest";
import { stateAtom } from "../store/store";
import { useAtom } from "jotai";

const dailyQuests = [
  { activity: "walking", minutes: 30, points: 10 },
  { activity: "running", minutes: 20, points: 15 },
  { activity: "biking", minutes: 45, points: 25 },
];

const QuestPage = () => {
  const [state] = useAtom(stateAtom);

  return (
    <div className="space-y-8">
      <DailyQuest quests={dailyQuests} currentState={state} />
      <WeeklyQuest currentState={state} />
      <MonthlyQuest currentState={state} />
    </div>
  );
};

export default QuestPage;
