import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
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
        </ul>
      </nav>
    </aside>
  );
}
