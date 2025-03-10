import React, { useEffect, useState } from "react";
import { getAll } from "../api/api";

const StatsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAll();
        console.log(usersData);
        const sortedUsers = usersData.sort(
          (a, b) => b.experience - a.experience
        );
        console.log(sortedUsers);
        setUsers(sortedUsers);
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
        Leaderboard
      </h2>
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-green-600 text-white text-sm">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Exp</th>
            <th className="p-3 text-left">Streak</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            let rowStyle = "bg-gray-50"; // Standardna pozadina
            let textStyle = "text-gray-800"; // Standardna boja teksta
            let medal = ""; // Default bez medalje

            if (index === 0) {
              rowStyle = "bg-yellow-100 font-semibold"; // ZLATO
              medal = " 🏅";
            } else if (index === 1) {
              rowStyle = "bg-gray-200"; // SREBRO
              medal = " 🥈";
            } else if (index === 2) {
              rowStyle = "bg-orange-100"; // BRONZA
              medal = " 🥉";
            }

            return (
              <tr key={user._id} className={`${rowStyle} transition-all`}>
                <td className={`p-3 text-md font-medium ${textStyle}`}>
                  {index + 1} {medal}
                </td>
                <td className={`p-3 text-md ${textStyle}`}>{user.username}</td>
                <td className={`p-3 font-medium text-green-700 text-center `}>
                  {Math.round(user.experience)}
                </td>
                <td className={`p-3 font-medium text-green-700 text-center`}>
                  {user.streak}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
