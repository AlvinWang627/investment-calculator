import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              <span className="icon">🏠</span>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/investment-calculator">
              <span className="icon">💰</span>
              <span>Investment Calculator</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
