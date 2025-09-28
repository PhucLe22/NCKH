// src/home/Home.jsx
import { Link } from "react-router-dom";
import "./home.css";    

function Home() {
  return (
    <div className="home-container">
      <h1>🏠 Welcome to Home Page</h1>
      <p>Đây là trang chính của ứng dụng.</p>

      <div className="home-links">
        <Link to="/auth/login" className="home-link login">
          🔑 Login
        </Link>
        <Link to="/auth/register" className="home-link register">
          📝 Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
