import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./home/Home";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="auth/login">Login</Link>
        <Link to="auth/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
