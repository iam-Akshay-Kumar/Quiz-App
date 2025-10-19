import { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/leaderboard").then((res) => {
      // Sort by score descending
      const sorted = res.data.sort((a, b) => b.score - a.score);
      setLeaders(sorted);
    });
  }, []);

  if (leaders.length === 0) return <p>Loading leaderboard...</p>;

  const top3 = leaders.slice(0, 3);
  const others = leaders.slice(3);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>

      {/* Top 3 section */}
      <div className="top-three">
        <div className="top-card second">
          <div className="avatar">{top3[1]?.username[0]}</div>
          <p>{top3[1]?.username}</p>
          <span>2nd</span>
          <h4>{top3[1]?.score} pts</h4>
        </div>

        <div className="top-card first">
          <div className="avatar">{top3[0]?.username[0]}</div>
          <p>{top3[0]?.username}</p>
          <span>1st</span>
          <h4>{top3[0]?.score} pts</h4>
        </div>

        <div className="top-card third">
          <div className="avatar">{top3[2]?.username[0]}</div>
          <p>{top3[2]?.username}</p>
          <span>3rd</span>
          <h4>{top3[2]?.score} pts</h4>
        </div>
      </div>

      <p className="leader-highlight">
        <strong>{top3[0]?.username}</strong> is the topper 🔥
      </p>

      {/* Remaining players */}
      <div className="leader-list">
        {others.map((user, index) => (
          <div key={index} className="leader-item">
            <span className="rank">#{index + 4}   </span>
            <div className="avatar small">{user.username[0]}</div>
            <span className="name">{user.username}</span>          
            <span className="points">{user.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
