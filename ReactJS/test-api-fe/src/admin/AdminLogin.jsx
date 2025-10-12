import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import './admin.css';

const { Title } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Attempting login with:', values.email);
      const response = await axios.post('http://localhost:3000/admin/login', {
        email: values.email,
        password: values.password
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('adminToken', response.data.token);
        
        // Show success message
        message.success('Đăng nhập thành công! Đang chuyển hướng...');
        
        // Use window.location for a full page reload to ensure auth state is properly set
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Đăng nhập thất bại. Vui lòng thử lại.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="back-to-home">
            <Link to="/">
              <Button type="text" icon={<ArrowLeftOutlined />}>
                Back to Home
              </Button>
            </Link>
          </div>
          <Title level={2} className="login-title">
            Admin Login
          </Title>
          <p className="login-subtitle">Enter your credentials to access the admin panel</p>
        </div>

        <Form
          name="admin_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={loading}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;