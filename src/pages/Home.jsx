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
        <Link to="/investment" className="tool-card">
          <div className="tool-icon">💰</div>
          <h2>Investment Calculator</h2>
          <p>Start calculating your investment returns now.</p>
          <span className="tool-link">Get Started →</span>
        </Link>

        <Link to="/mortgage" className="tool-card">
          <div className="tool-icon">🏡</div>
          <h2>房貸計算機</h2>
          <p>計算您的房貸還款計劃，包含寬限期選項。</p>
          <span className="tool-link">開始計算 →</span>
        </Link>

        <Link to="/fitness" className="tool-card">
          <div className="tool-icon">💪</div>
          <h2>健身計算機</h2>
          <p>計算 BMI、BMR/TDEE、FFMI、理想體重和營養素需求。</p>
          <span className="tool-link">開始計算 →</span>
        </Link>

        <div className="tool-card multi-link-card">
          <div className="tool-icon">🏋️</div>
          <h2>力量課表</h2>
          <p>經典力量訓練計畫，助您突破重量極限。</p>
          <div className="tool-links-group">
            <Link to="/strength/5x5" className="tool-link">5x5 課表 →</Link>
            <Link to="/strength/531" className="tool-link">5/3/1 課表 →</Link>
          </div>
        </div>

        <div className="tool-card multi-link-card">
          <div className="tool-icon">💪</div>
          <h2>肌肥大課表</h2>
          <p>專業分化訓練，優化肌肉生長效率。</p>
          <div className="tool-links-group">
            <Link to="/hypertrophy/ppl" className="tool-link">Push/Pull/Legs →</Link>
            <Link to="/hypertrophy/upper-lower" className="tool-link">Upper/Lower Split →</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
