import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import InvestmentCalculator from "./pages/InvestmentCalculator";
import MortgageCalculator from "./pages/MortgageCalculator";
import FitnessCalculator from "./pages/FitnessCalculator";

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
                <Route path="/" element={<Home />} />
                <Route path="/investment-calculator" element={<InvestmentCalculator />} />
                <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
                <Route path="/fitness-calculator" element={<FitnessCalculator />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
