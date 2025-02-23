import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import { getUserById } from "../api/api";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

const TopBar = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Stanje za otvaranje/zatvaranje dijaloga
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

  const handleLogout = () => {
    localStorage.removeItem("id"); // Uklanjanje ID-a iz localStorage
    window.location.reload(); // Osvežavanje stranice za logout
  };

  if (!user) {
    return <div className="text-center py-2">Učitavanje...</div>;
  }

  const { points, username } = user;

  // Generiranje referal linka
  const referralCode = user.username;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 shadow-lg p-3 rounded-xl flex items-center justify-between h-14">
      {/* Points Sistem */}
      <div className="flex items-center gap-1 text-green-700 font-medium text-sm">
        <span>{points}</span>
        <span className="text-lg">🌱</span> {/* Seed emoji */}
      </div>

      {/* Logo (centrirano) */}
      <div className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-green-700">
        🌍 LOGO
      </div>

      {/* Profil + Level */}
      <div className="flex items-center gap-1 text-sm text-gray-700 font-medium">
        <button
          onClick={() => setIsDialogOpen(!isDialogOpen)} // Otvaranje/zatvaranje dijaloga
          className="focus:outline-none"
        >
          <FaUser className="text-green-700 text-4xl ml-4 bg-green-200 rounded-full p-2 hover:bg-green-300 transition-colors" />
        </button>
      </div>

      {/* Dijalog */}
      {isDialogOpen && (
        <div className="fixed top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50 flex flex-col align-middle">
          <div className="text-sm text-gray-700">
            <p className="font-semibold">Your Referral Code:</p>
            <p className="mt-2 p-2 bg-gray-100 rounded-lg break-words text-center">
              {referralCode}
            </p>
          </div>

          {/* Gumb za logout */}
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default TopBar;
