import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Welcome to Investment Calculator</h1>
        <p className="subtitle">
          A simple tool to calculate your investment growth over time with compound interest and annual contributions.
        </p>
      </div>

      <div className="tools-grid">
        <Link to="/calculator/investment" className="tool-card">
          <div className="tool-icon">💰</div>
          <h2>Investment Calculator</h2>
          <p>Start calculating your investment returns now.</p>
          <span className="tool-link">Get Started →</span>
        </Link>

        <Link to="/calculator/mortgage" className="tool-card">
          <div className="tool-icon">🏡</div>
          <h2>房貸計算機</h2>
          <p>計算您的房貸還款計劃，包含寬限期選項。</p>
          <span className="tool-link">開始計算 →</span>
        </Link>

        <Link to="/calculator/fitness" className="tool-card">
          <div className="tool-icon">💪</div>
          <h2>健身計算機</h2>
          <p>計算 BMI、BMR/TDEE、FFMI、理想體重和營養素需求。</p>
          <span className="tool-link">開始計算 →</span>
        </Link>
      </div>
    </div>
  );
}
