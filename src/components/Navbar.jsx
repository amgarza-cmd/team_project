import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>
          {" | "}
          <Link to="/reserve">Reserve</Link>
          {" | "}
          <Link to="/my-reservations">My Reservations</Link>
          {" | "}
          <Link to="/about">About</Link>
          {" | "}
        </>
      )}

      {isLoggedIn ? (
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        location.pathname !== "/login" && (
          <Link to="/login">Login</Link>
        )
      )}
    </nav>
  );
}