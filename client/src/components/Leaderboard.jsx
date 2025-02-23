import React, { useEffect, useState } from "react";
import { getUserById } from "./api";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserById(localStorage.getItem("id"));
        const sortedUsers = data.sort((a, b) => b.BioScore - a.BioScore);
        setUsers(sortedUsers);
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-6">
        🏆 Leaderboard
      </h2>
      <div className="space-y-4">
        {users.map((user, index) => {
          let cardStyle = "bg-gray-100 hover:bg-gray-200 transition-all";
          let textStyle = "text-gray-800";
          let crown = "";

          if (index === 0) {
            cardStyle =
              "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold shadow-xl";
            textStyle = "text-black";
            crown = "👑"; // Zlatna krunica
          } else if (index === 1) {
            cardStyle =
              "bg-gradient-to-r from-gray-300 to-gray-400 text-black font-semibold shadow-lg";
            crown = "🥈"; // Srebrna medalja
          } else if (index === 2) {
            cardStyle =
              "bg-gradient-to-r from-orange-300 to-orange-400 text-black font-medium shadow-md";
            crown = "🥉"; // Bronzana medalja
          }

          return (
            <motion.div
              key={user._id}
              className={`p-6 rounded-lg ${cardStyle} flex justify-between items-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-xl font-bold ${textStyle}`}>
                  {index + 1} {crown}
                </span>
                <span className={`text-lg ${textStyle}`}>{user.name}</span>
              </div>
              <span className={`font-bold text-green-700 text-lg ${textStyle}`}>
                {user.BioScore}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;