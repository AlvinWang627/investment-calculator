import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import InvestmentCalculator from "./pages/InvestmentCalculator";
import MortgageCalculator from "./pages/MortgageCalculator";
import FitnessCalculator from "./pages/FitnessCalculator";
import FiveByFive from "./pages/FiveByFive";
import FiveThreeOne from "./pages/FiveThreeOne";
import PushPullLegs from "./pages/PushPullLegs";
import UpperLowerSplit from "./pages/UpperLowerSplit";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="main-content" style={{ marginLeft: isCollapsed ? '60px' : '250px' }}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
            <div className="container mx-auto">
              <Routes>
                <Route path="/calculator" element={<Home />} />
                <Route path="/calculator/investment" element={<InvestmentCalculator />} />
                <Route path="/calculator/mortgage" element={<MortgageCalculator />} />
                <Route path="/calculator/fitness" element={<FitnessCalculator />} />
                <Route path="/calculator/strength/5x5" element={<FiveByFive />} />
                <Route path="/calculator/strength/531" element={<FiveThreeOne />} />
                <Route path="/calculator/hypertrophy/ppl" element={<PushPullLegs />} />
                <Route path="/calculator/hypertrophy/upper-lower" element={<UpperLowerSplit />} />
              </Routes>
            </div>
          </div>
        </main>
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
