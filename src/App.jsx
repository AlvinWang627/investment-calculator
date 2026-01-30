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
import OneRepMax from "./pages/OneRepMax";
import NutrientTracker from "./pages/NutrientTracker";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router basename="/calculator">
      <div className="app-container">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className="main-content" style={{ marginLeft: isCollapsed ? '60px' : '250px' }}>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/investment" element={<InvestmentCalculator />} />
                <Route path="/mortgage" element={<MortgageCalculator />} />
                <Route path="/fitness" element={<FitnessCalculator />} />
                <Route path="/fitness/1rm" element={<OneRepMax />} />
                <Route path="/fitness/nutrient-tracker" element={<NutrientTracker />} />
                <Route path="/strength/5x5" element={<FiveByFive />} />
                <Route path="/strength/531" element={<FiveThreeOne />} />
                <Route path="/hypertrophy/ppl" element={<PushPullLegs />} />
                <Route path="/hypertrophy/upper-lower" element={<UpperLowerSplit />} />
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
