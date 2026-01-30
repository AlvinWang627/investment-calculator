import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>{t('home.welcome')}</h1>
        <p className="subtitle">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="tools-grid">
        <Link to="/investment" className="tool-card">
          <div className="tool-icon">💰</div>
          <h2>{t('home.investment.title')}</h2>
          <p>{t('home.investment.desc')}</p>
          <span className="tool-link">{t('home.investment.action')}</span>
        </Link>

        <Link to="/mortgage" className="tool-card">
          <div className="tool-icon">🏡</div>
          <h2>{t('home.mortgage.title')}</h2>
          <p>{t('home.mortgage.desc')}</p>
          <span className="tool-link">{t('home.mortgage.action')}</span>
        </Link>

        <Link to="/fitness" className="tool-card">
          <div className="tool-icon">💪</div>
          <h2>{t('home.fitness.title')}</h2>
          <p>{t('home.fitness.desc')}</p>
          <span className="tool-link">{t('home.fitness.action')}</span>
        </Link>

        <Link to="/fitness/1rm" className="tool-card">
          <div className="tool-icon">🔢</div>
          <h2>{t('home.oneRepMax.title')}</h2>
          <p>{t('home.oneRepMax.desc')}</p>
          <span className="tool-link">{t('home.oneRepMax.action')}</span>
        </Link>

        <Link to="/fitness/nutrient-tracker" className="tool-card">
          <div className="tool-icon">🥗</div>
          <h2>{t('home.nutrientTracker.title')}</h2>
          <p>{t('home.nutrientTracker.desc')}</p>
          <span className="tool-link">{t('home.nutrientTracker.action')}</span>
        </Link>

        <div className="tool-card multi-link-card">
          <div className="tool-icon">🏋️</div>
          <h2>{t('home.strength.title')}</h2>
          <p>{t('home.strength.desc')}</p>
          <div className="tool-links-group">
            <Link to="/strength/5x5" className="tool-link">{t('sidebar.fiveByFive')} →</Link>
            <Link to="/strength/531" className="tool-link">{t('sidebar.fiveThreeOne')} →</Link>
          </div>
        </div>

        <div className="tool-card multi-link-card">
          <div className="tool-icon">💪</div>
          <h2>{t('home.hypertrophy.title')}</h2>
          <p>{t('home.hypertrophy.desc')}</p>
          <div className="tool-links-group">
            <Link to="/hypertrophy/ppl" className="tool-link">{t('sidebar.ppl')} →</Link>
            <Link to="/hypertrophy/upper-lower" className="tool-link">{t('sidebar.upperLower')} →</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
