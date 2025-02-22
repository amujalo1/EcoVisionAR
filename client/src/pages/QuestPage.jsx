import React from "react";
import DailyQuest from "../components/DailyQuest";
import { stateAtom } from "../store/store";
import { useAtom } from "jotai";
const dailyQuests = [
  { activity: "walking", minutes: 30 },
  { activity: "running", minutes: 20 },
  { activity: "biking", minutes: 45 },
];

const QuestPage = () => {
  const [state, setState] = useAtom(stateAtom); // Correct way to use the stateAtom
  return <DailyQuest quests={dailyQuests} currentState={state} />;
};

export default QuestPage;
