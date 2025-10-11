import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./authService";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const data = await login(email, password);
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // lưu user
  
        setMessage(`Login successful! Hello! ${data.user.username}`);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(`${data.message || "UnCorrect email or password"}`);
      }
    } catch (err) {
      setMessage(" not connect to server!");
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-link">
          Don’t have an account? <Link to="/auth/register">Register</Link>
        </p>
        <p className="auth-link">
          <Link to="/auth/forgotPassword">Forgot Password?</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;