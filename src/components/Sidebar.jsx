import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [expandedMenus, setExpandedMenus] = useState({
    strengthTraining: false,
    hypertrophy: false
  });

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  return (
    <aside id="sidebar" className={isCollapsed ? 'collapsed' : ''}>
      <div className="sidebar-header">
        <button
          onClick={toggleSidebar}
          className="toggle-btn"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              <span className="icon">🏠</span>
              <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/investment">
              <span className="icon">💰</span>
              <span className="nav-text">Investment Calculator</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mortgage">
              <span className="icon">🏡</span>
              <span className="nav-text">房貸計算機</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness">
              <span className="icon">💪</span>
              <span className="nav-text">健身計算機</span>
            </NavLink>
          </li>

          {/* Strength Training Menu with Submenu */}
          <li className="has-submenu">
            <div
              className={`submenu-trigger ${expandedMenus.strengthTraining ? 'expanded' : ''}`}
              onClick={() => toggleSubmenu('strengthTraining')}
            >
              <span className="icon">🏋️</span>
              <span className="nav-text">力量課表</span>
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
                    <span className="nav-text">5x5 課表</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/strength/531">
                    <span className="submenu-icon">📈</span>
                    <span className="nav-text">5/3/1 課表</span>
                  </NavLink>
                </li>
              </ul>
            )}
            {/* Hover dropdown for collapsed sidebar */}
            {isCollapsed && (
              <div className="submenu-hover-dropdown">
                <div className="submenu-title">力量課表</div>
                <NavLink to="/strength/5x5">
                  <span className="submenu-icon">📊</span>
                  <span>5x5 課表</span>
                </NavLink>
                <NavLink to="/strength/531">
                  <span className="submenu-icon">📈</span>
                  <span>5/3/1 課表</span>
                </NavLink>
              </div>
            )}
          </li>

          {/* Hypertrophy Training Menu with Submenu */}
          <li className="has-submenu">
            <div
              className={`submenu-trigger ${expandedMenus.hypertrophy ? 'expanded' : ''}`}
              onClick={() => toggleSubmenu('hypertrophy')}
            >
              <span className="icon">💪</span>
              <span className="nav-text">肌肥大課表</span>
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
                    <span className="nav-text">Push/Pull/Legs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/hypertrophy/upper-lower">
                    <span className="submenu-icon">⬆️</span>
                    <span className="nav-text">Upper/Lower Split</span>
                  </NavLink>
                </li>
              </ul>
            )}
            {/* Hover dropdown for collapsed sidebar */}
            {isCollapsed && (
              <div className="submenu-hover-dropdown">
                <div className="submenu-title">肌肥大課表</div>
                <NavLink to="/hypertrophy/ppl">
                  <span className="submenu-icon">🔄</span>
                  <span>Push/Pull/Legs</span>
                </NavLink>
                <NavLink to="/hypertrophy/upper-lower">
                  <span className="submenu-icon">⬆️</span>
                  <span>Upper/Lower Split</span>
                </NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
