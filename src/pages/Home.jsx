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
        <Link to="/investment-calculator" className="tool-card">
          <div className="tool-icon">💰</div>
          <h2>Investment Calculator</h2>
          <p>Start calculating your investment returns now.</p>
          <span className="tool-link">Get Started →</span>
        </Link>
      </div>
    </div>
  );
}
