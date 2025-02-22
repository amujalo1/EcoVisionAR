import React from 'react';
import "./App.css";
import ActivityTab from "./components/ActivityTab";
import Leaderboard from "./components/Leaderboard"; // Make sure the path is correct

function App() {
  return (
    <>
      <ActivityTab />
      <Leaderboard /> {/* The leaderboard should appear here */}

    </>
  );
}

export default App;
