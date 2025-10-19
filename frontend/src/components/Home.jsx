import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flash = params.get("flash");
    if (flash === "login_success") {
      setFlashMessage("Login successful!");
      setFlashType("success");
    } else if (flash === "registration_success") {
      setFlashMessage("Registration successful! Welcome ");
      setFlashType("success");
    }

    if (flash) {
      setTimeout(() => setFlashMessage(""), 3000); 
      window.history.replaceState({}, document.title, "/"); 
    }
  }, []);


  return (
    <div className="home-container">
      {flashMessage && (
        <div className="flash-popup success">{flashMessage}</div>
      )}

      <div className="hero-section">
        <h1 className="hero-title">Welcome to the Ultimate Quiz Portal 🎯</h1>
        <p className="hero-subtitle">
          Challenge yourself, boost your knowledge, and climb to the top of the leaderboard!
        </p>
        <div className="hero-buttons">
          <Link to="/quiz" className="btn-primary">Start Quiz</Link>
          <Link to="/leaderboard" className="btn-secondary">View Leaderboard</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
