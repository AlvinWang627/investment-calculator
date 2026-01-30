import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    strengthTraining: false,
    hypertrophy: false
  });

  useEffect(() => {
    if (isCollapsed) {
      setExpandedMenus({
        strengthTraining: false,
        hypertrophy: false
      });
    } else {
      // Auto-expand menus based on current path
      if (location.pathname.startsWith('/strength')) {
        setExpandedMenus(prev => ({ ...prev, strengthTraining: true }));
      }
      if (location.pathname.startsWith('/hypertrophy')) {
        setExpandedMenus(prev => ({ ...prev, hypertrophy: true }));
      }
    }
  }, [isCollapsed, location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (menuKey) => {
    // Don't toggle submenu when sidebar is collapsed (only use hover)
    if (isCollapsed) return;

    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <aside id="sidebar" className={`flex flex-col ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button
          onClick={toggleSidebar}
          className="toggle-btn"
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li>
            <NavLink to="/" end>
              <span className="icon">🏠</span>
              <span className="nav-text">{t('sidebar.home')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/investment">
              <span className="icon">💰</span>
              <span className="nav-text">{t('sidebar.investment')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mortgage">
              <span className="icon">🏡</span>
              <span className="nav-text">{t('sidebar.mortgage')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness" end>
              <span className="icon">💪</span>
              <span className="nav-text">{t('sidebar.fitness')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness/1rm">
              <span className="icon">🔢</span>
              <span className="nav-text">{t('sidebar.oneRepMax')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness/nutrient-tracker">
              <span className="icon">🥗</span>
              <span className="nav-text">{t('sidebar.nutrientTracker')}</span>
            </NavLink>
          </li>

          {/* Strength Training Menu with Submenu */}
          <li className="has-submenu">
            <div
              className={`submenu-trigger ${expandedMenus.strengthTraining ? 'expanded' : ''} ${location.pathname.startsWith('/strength') ? 'active' : ''}`}
              onClick={() => toggleSubmenu('strengthTraining')}
            >
              <span className="icon">🏋️</span>
              <span className="nav-text">{t('sidebar.strength')}</span>
              {!isCollapsed && (
                <span className="submenu-arrow">
                  {expandedMenus.strengthTraining ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              )}
            </div>
            {expandedMenus.strengthTraining && !isCollapsed && (
              <ul className="submenu">
                <li>
                  <NavLink to="/strength/5x5">
                    <span className="submenu-icon">📊</span>
                    <span className="nav-text">{t('sidebar.fiveByFive')}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/strength/531">
                    <span className="submenu-icon">📈</span>
                    <span className="nav-text">{t('sidebar.fiveThreeOne')}</span>
                  </NavLink>
                </li>
              </ul>
            )}
            {/* Hover dropdown for collapsed sidebar */}
            {isCollapsed && (
              <div className="submenu-hover-dropdown">
                <div className="submenu-title">{t('sidebar.strength')}</div>
                <NavLink to="/strength/5x5">
                  <span className="submenu-icon">📊</span>
                  <span>{t('sidebar.fiveByFive')}</span>
                </NavLink>
                <NavLink to="/strength/531">
                  <span className="submenu-icon">📈</span>
                  <span>{t('sidebar.fiveThreeOne')}</span>
                </NavLink>
              </div>
            )}
          </li>

          {/* Hypertrophy Training Menu with Submenu */}
          <li className="has-submenu">
            <div
              className={`submenu-trigger ${expandedMenus.hypertrophy ? 'expanded' : ''} ${location.pathname.startsWith('/hypertrophy') ? 'active' : ''}`}
              onClick={() => toggleSubmenu('hypertrophy')}
            >
              <span className="icon">💪</span>
              <span className="nav-text">{t('sidebar.hypertrophy')}</span>
              {!isCollapsed && (
                <span className="submenu-arrow">
                  {expandedMenus.hypertrophy ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              )}
            </div>
            {expandedMenus.hypertrophy && !isCollapsed && (
              <ul className="submenu">
                <li>
                  <NavLink to="/hypertrophy/ppl">
                    <span className="submenu-icon">🔄</span>
                    <span className="nav-text">{t('sidebar.ppl')}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hypertrophy/upper-lower">
                    <span className="submenu-icon">⬆️</span>
                    <span className="nav-text">{t('sidebar.upperLower')}</span>
                  </NavLink>
                </li>
              </ul>
            )}
            {/* Hover dropdown for collapsed sidebar */}
            {isCollapsed && (
              <div className="submenu-hover-dropdown">
                <div className="submenu-title">{t('sidebar.hypertrophy')}</div>
                <NavLink to="/hypertrophy/ppl">
                  <span className="submenu-icon">🔄</span>
                  <span>{t('sidebar.ppl')}</span>
                </NavLink>
                <NavLink to="/hypertrophy/upper-lower">
                  <span className="submenu-icon">⬆️</span>
                  <span>{t('sidebar.upperLower')}</span>
                </NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <div className={`p-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <LanguageSwitcher />
      </div>
    </aside>
  );
}
