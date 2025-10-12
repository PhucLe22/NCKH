// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">Online Test App</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/exam" className="nav-link">Exams</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
        
        <div className="auth-buttons">
          <Link to="/admin/login" className="btn btn-outline admin-login">
            <i className="fas fa-user-shield"></i> Admin
          </Link>
          <Link to="/auth/login" className="btn btn-outline">Login</Link>
          <Link to="/auth/register" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
