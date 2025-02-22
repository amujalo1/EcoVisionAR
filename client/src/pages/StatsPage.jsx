import React, { useEffect, useState } from "react";
import { getUserById } from "../api/api";

const StatsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUserById(localStorage.getItem("id"));
        console.log(data);
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Leaderboard</h2>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">BioScore</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}>
              <td className="p-3 font-semibold">{index + 1}</td>
              <td className="p-3">{user.username}</td>
              <td className="p-3 font-bold text-green-600">{user.BioScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;
