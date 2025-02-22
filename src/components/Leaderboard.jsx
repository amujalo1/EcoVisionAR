import React from "react";

// Fake database with static data
const fakeDatabase = [
  { rank: 1, name: "John Doe", BioScore: 1500 },
  { rank: 2, name: "Jane Smith", BioScore: 1400 },
  { rank: 3, name: "Alice Brown", BioScore: 1300 },
  { rank: 4, name: "Bob White", BioScore: 1200 },
  { rank: 5, name: "Charlie Green", BioScore: 1100 },
  { rank: 6, name: "David Black", BioScore: 1000 },
  { rank: 7, name: "Emma Blue", BioScore: 900 },
  { rank: 8, name: "Frank Red", BioScore: 800 },
  { rank: 9, name: "Grace Yellow", BioScore: 700 },
  { rank: 10, name: "Henry Orange", BioScore: 600 },
];

const Leaderboard = () => {
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
          {fakeDatabase.map((entry, index) => (
            <tr
              key={entry.rank}
              className={
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
              }
            >
              <td className="p-3 font-semibold">{entry.rank}</td>
              <td className="p-3">{entry.name}</td>
              <td className="p-3 font-bold text-green-600">{entry.BioScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
