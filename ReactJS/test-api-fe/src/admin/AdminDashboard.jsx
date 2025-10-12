import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, Spin, message } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  TeamOutlined, 
  BarChartOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import adminService from './adminService';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    teachers: 0,
    exams: 0,
    submissions: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const [usersRes, teachersRes, examsRes] = await Promise.all([
          adminService.getUsers(),
          adminService.getTeachers(),
          adminService.getExams()
        ]);

        setStats({
          users: usersRes?.length || 0,
          teachers: teachersRes?.length || 0,
          exams: examsRes?.length || 0,
          submissions: 0 // You'll need to implement this endpoint
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        message.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: 'Total Users',
      value: stats.users,
      icon: <UserOutlined className="stat-icon" />,
      color: '#1890ff',
      action: () => navigate('/admin/users')
    },
    {
      title: 'Total Teachers',
      value: stats.teachers,
      icon: <TeamOutlined className="stat-icon" />,
      color: '#52c41a',
      action: () => navigate('/admin/teachers')
    },
    {
      title: 'Total Exams',
      value: stats.exams,
      icon: <BookOutlined className="stat-icon" />,
      color: '#722ed1',
      action: () => navigate('/admin/exams')
    },
    {
      title: 'Total Submissions',
      value: stats.submissions,
      icon: <BarChartOutlined className="stat-icon" />,
      color: '#fa8c16',
      action: () => navigate('/admin/submissions')
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your platform.</p>
      </div>
      
      <Row gutter={[16, 16]} className="dashboard-stats">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              hoverable 
              className="stat-card"
              onClick={stat.action}
            >
              <div className="stat-content">
                <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15` }}>
                  {React.cloneElement(stat.icon, { style: { color: stat.color, fontSize: '24px' } })}
                </div>
                <div className="stat-info">
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    valueStyle={{ color: stat.color, fontSize: '24px' }}
                  />
                </div>
                <div className="stat-action">
                  <Button 
                    type="text" 
                    icon={<ArrowRightOutlined style={{ color: stat.color }} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      stat.action();
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashboard;
