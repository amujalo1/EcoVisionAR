import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ActivityPage from "./pages/ActivityPage";
import StatsPage from "./pages/StatsPage";
import CalculatorPage from "./pages/CalculatorPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/calculate" element={<CalculatorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;