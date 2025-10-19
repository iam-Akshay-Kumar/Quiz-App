import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFlashType("error");
      setFlashMessage("Passwords do not match!");
      setTimeout(() => setFlashMessage(""), 3000);
      return;
    }

    try {
      //  Register the user
      await axios.post("http://127.0.0.1:5000/api/register", {
        username,
        email,
        password,
      });

      //  Auto-login immediately after registration
      const loginRes = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(loginRes.data));

      //  Redirect to Home with flash message
      window.location.href = "/?flash=registration_success";
    } catch (err) {
      console.error(err);
      setFlashType("error");
      const msg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setFlashMessage(msg);
      setTimeout(() => setFlashMessage(""), 3000);
    }
  };

  return (
    <div className="register-page">
      {flashMessage && (
        <div className={`flash-popup ${flashType}`}>{flashMessage}</div>
      )}

      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create your account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
