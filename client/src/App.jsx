import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ActivityPage from "./pages/ActivityPage";
import StatsPage from "./pages/StatsPage";
import ShopPage from "./pages/ShopPage";
import CalculatorPage from "./pages/CalculatorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestPage from "./pages/QuestPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/quests" element={<QuestPage />} />
        <Route path="/calculate" element={<CalculatorPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
