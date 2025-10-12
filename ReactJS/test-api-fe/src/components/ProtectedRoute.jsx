import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin token exists in localStorage
      const token = localStorage.getItem('adminToken');
      console.log('ProtectedRoute - Token from localStorage:', token);
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
    
    // Listen for storage events to handle login/logout from other tabs
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" tip="Đang xác thực..." />
      </div>
    );
  }

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('Current path:', location.pathname);

  // If user is not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    console.log('Redirecting to login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
