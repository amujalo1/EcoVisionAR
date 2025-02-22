import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ActivityPage from "./pages/ActivityPage";
import StatsPage from "./pages/StatsPage";
import ShopPage from "./pages/ShopPage";
import CalculatorPage from "./pages/CalculatorPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/calculate" element={<CalculatorPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
