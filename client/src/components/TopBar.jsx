import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import { getUserById } from "../api/api";
import { FaUser } from "react-icons/fa";

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

  const { experience, points } = user;
  const currentLevel = getCurrentLevel(experience);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 shadow-lg p-3 rounded-xl flex items-center justify-between h-14">
      {/* Points Sistem */}
      <div className="flex items-center gap-1 text-green-700 font-medium text-sm">
        <span className="text-lg">🌱</span> {/* Seed emoji */}
        <span>{points} Points</span>
      </div>

      {/* Logo (centrirano) */}
      <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-green-700">
        🌍 LOGO
      </div>

      {/* Profil + Level */}
      <div className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <span>Lv. {currentLevel.level}</span>
        <FaUser className="text-green-700 text-lg" />
      </div>
    </div>
  );
};

export default TopBar;
