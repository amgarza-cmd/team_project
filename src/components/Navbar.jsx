import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/about">About</Link> | <Link to="/Login">Login!</Link>
    </nav>
  );
}

function Logout(){
  localStorage.removeItem('token');
  Navigate('/login');
}