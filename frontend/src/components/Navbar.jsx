import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">Quiz App</div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/leaderboard">Leaderboard</Link>

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && (
          <>
            <span className="welcome">Welcome, {user.username || user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
