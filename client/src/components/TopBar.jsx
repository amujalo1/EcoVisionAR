import React, { useEffect } from "react";
import { FaSeedling, FaTree, FaLeaf } from "react-icons/fa";
import { GiTreeGrowth, GiForest } from "react-icons/gi";
import { getUserById } from "../api/api";
import { useAtom } from "jotai";
import { userAtom } from "../store/store";

const levels = [
  { level: 1, xp: 0, title: "Eco Seedling 🌱" },
  { level: 2, xp: 100, title: "Green Sprout 🌿" },
  { level: 3, xp: 300, title: "Nature Explorer 🍃" },
  { level: 4, xp: 600, title: "Eco Guardian 🌾" },
  { level: 5, xp: 1000, title: "Eco Warrior 🌍" },
  { level: 6, xp: 1500, title: "Sustainable Hero 🌎" },
  { level: 7, xp: 2100, title: "Climate Champion 🌏" },
  { level: 8, xp: 2800, title: "Environmental Master 🌲" },
  { level: 9, xp: 3600, title: "Planet Protector 🌳" },
  { level: 10, xp: 4500, title: "Earth Guardian 🏔️" },
];

const getCurrentLevel = (xp) => {
  let current = levels[0];
  for (let lvl of levels) {
    if (xp >= lvl.xp) current = lvl;
    else break;
  }
  return current;
};

const getNextLevelXP = (level) => {
  const next = levels.find((lvl) => lvl.level === level + 1);
  return next ? next.xp : levels[levels.length - 1].xp;
};

const TopBar = () => {
  const [user, setUser] = useAtom(userAtom);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
        } catch (err) {
          console.error("Greška pri dohvatanju korisničkih podataka:", err);
        }
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div className="text-center py-2">Učitavanje...</div>;
  }

  const { experience } = user;
  const currentLevel = getCurrentLevel(experience);
  const nextLevelXP = getNextLevelXP(currentLevel.level);
  const progress =
    ((experience - currentLevel.xp) / (nextLevelXP - currentLevel.xp)) * 100;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full rounded-xl max-w-md bg-white border-t border-gray-200 z-50 shadow-lg p-3">
      <div className="flex flex-col items-center text-center">
        <span className="text-lg font-semibold text-green-600">
          {currentLevel.title} (Level {currentLevel.level})
        </span>

        <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mt-2">
          <div
            className="absolute left-0 h-full bg-transparent rounded-full transition-all flex items-center justify-center"
            style={{ width: "100%" }} // Prazna traka zauzima 100% širine
          >
            XP: {experience}/{nextLevelXP}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
