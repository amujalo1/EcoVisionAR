import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivityPage from "./pages/ActivityPage";
import StatsPage from "./pages/StatsPage";
import ShopPage from "./pages/ShopPage";
import CalculatorPage from "./pages/CalculatorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuestPage from "./pages/QuestPage";
import Layout from "./components/Layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/activity"
          element={
            <Layout>
              <ActivityPage />
            </Layout>
          }
        />
        <Route
          path="/stats"
          element={
            <Layout>
              <StatsPage />
            </Layout>
          }
        />
        <Route
          path="/quests"
          element={
            <Layout>
              <QuestPage />
            </Layout>
          }
        />
        <Route
          path="/calculate"
          element={
            <Layout>
              <CalculatorPage />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <ShopPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
