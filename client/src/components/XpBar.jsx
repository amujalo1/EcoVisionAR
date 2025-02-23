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

const XpBar = () => {
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

    // Dodajemo interval za periodično osvježavanje
    const interval = setInterval(fetchUser, 30000); // Svakih 30 sekundi

    return () => clearInterval(interval);
  }, [userId, setUser]);

  if (!user) {
    return <div className="text-center py-2">Učitavanje...</div>;
  }

  const { experience } = user;
  const fixedExperience = Math.round(experience);
  const currentLevel = getCurrentLevel(fixedExperience);
  const nextLevelXP = getNextLevelXP(currentLevel.level);
  const progress = Math.min(
    ((fixedExperience - currentLevel.xp) / (nextLevelXP - currentLevel.xp)) *
      100,
    100
  );

  return (
    <div className="flex flex-col items-center text-center mt-6">
      <span className="text-lg font-semibold text-green-600">
        {currentLevel.title} (Level {currentLevel.level})
      </span>

      <span className="text-sm text-gray-600 mt-1">
        XP: {fixedExperience}/{nextLevelXP}
      </span>

      <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mt-2">
        <div
          className="absolute left-0 h-full bg-orange-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XpBar;
