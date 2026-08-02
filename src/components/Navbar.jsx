import { useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  }

  /*
   * No mostramos la barra en la página de login
   * cuando todavía no existe una sesión.
   */
  if (!isLoggedIn && location.pathname === "/login") {
    return null;
  }

  function getLinkClass({ isActive }) {
    return isActive
      ? "navbar-link navbar-link-active"
      : "navbar-link";
  }

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <NavLink
          to={isLoggedIn ? "/" : "/login"}
          className="navbar-brand"
          onClick={closeMenu}
        >
          <span className="navbar-logo">CC</span>

          <span className="navbar-brand-text">
            <strong>Campus Connect</strong>
            <small>Event Finder</small>
          </span>
        </NavLink>

        {isLoggedIn && (
          <button
            type="button"
            className={`navbar-menu-button ${
              menuOpen ? "navbar-menu-button-open" : ""
            }`}
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}

        <div
          className={`navbar-content ${
            menuOpen ? "navbar-content-open" : ""
          }`}
        >
          {isLoggedIn && (
            <div className="navbar-links">
              <NavLink
                to="/"
                end
                className={getLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/dashboard"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/reserve"
                className={getLinkClass}
                onClick={closeMenu}
              >
                Reserve
              </NavLink>

              <NavLink
                to="/my-reservations"
                className={getLinkClass}
                onClick={closeMenu}
              >
                My Reservations
              </NavLink>

              <NavLink
                to="/about"
                className={getLinkClass}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </div>
          )}

          <div className="navbar-actions">
            {isLoggedIn ? (
              <button
                type="button"
                className="navbar-logout"
                onClick={handleLogout}
              >
                <span>Logout</span>
                <span className="navbar-logout-icon">→</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}