import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [expandedMenus, setExpandedMenus] = useState({
    strengthTraining: false
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
            <NavLink to="/investment-calculator">
              <span className="icon">💰</span>
              <span className="nav-text">Investment Calculator</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/mortgage-calculator">
              <span className="icon">🏡</span>
              <span className="nav-text">房貸計算機</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fitness-calculator">
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
                  <NavLink to="/strength-training/5x5">
                    <span className="submenu-icon">📊</span>
                    <span className="nav-text">5x5 課表</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/strength-training/531">
                    <span className="submenu-icon">📈</span>
                    <span className="nav-text">5/3/1 課表</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
