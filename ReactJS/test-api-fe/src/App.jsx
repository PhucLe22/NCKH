import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import Home from "./home/Home";
import Exam from "./exam/Exam";
import Header from "./components/Header";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import UserList from "./admin/UserList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/forgotPassword" element={<ForgotPassword />} />
          
          {/* Admin login (public) */}
          <Route path="admin/login" element={<AdminLogin />} />
          
          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/users" element={<UserList />} />
          </Route>
          
          {/* Redirect any unknown paths to home */}
          <Route path="*" element={<Home />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
