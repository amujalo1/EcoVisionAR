import React from 'react';

// Fake database with static data
const fakeDatabase = [
  { rank: 1, name: 'John Doe', BioScore: 1500 },
  { rank: 2, name: 'Jane Smith', BioScore: 1400 },
  { rank: 3, name: 'Alice Brown', BioScore: 1300 },
  { rank: 4, name: 'Bob White', BioScore: 1200 },
  { rank: 5, name: 'Charlie Green', BioScore: 1100 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>BioScore</th>
          </tr>
        </thead>
        <tbody>
          {fakeDatabase.map((entry) => (
            <tr key={entry.rank}>
              <td>{entry.rank}</td>
              <td>{entry.name}</td>
              <td>{entry.BioScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
