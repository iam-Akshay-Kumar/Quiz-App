import { useState , useEffect} from "react";
import axios from "axios";
import "./Login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));

      window.location.href = "/?flash=login_success"; 
    } catch (err) {
      setFlashMessage("Invalid credentials");
      setTimeout(() => setFlashMessage(""), 3000);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flash = params.get("flash");
    if (flash === "login_to_play_quiz") {
      setFlashMessage("Log in to play quiz");
      setTimeout(() => setFlashMessage(""), 3000); 
      // remove query param so it doesn’t show again
      window.history.replaceState({}, document.title, "/login");
    }
  }, []);


  return (
    <div className="login-page">
      {flashMessage && <div className="flash-popup">{flashMessage}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        
        <h2>Please Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
