import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, message, Space, Spin, Typography } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import './admin.css';

const { Title } = Typography;

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const response = await axios.get('http://localhost:3000/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again.');
        setLoading(false);
        
        if (err.response?.status === 401) {
          message.error('Session expired. Please login again.');
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => role?.toUpperCase() || 'USER',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetails(record.id)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetails = (userId) => {
    // Navigate to user details page
    navigate(`/admin/users/${userId}`);
  };

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="admin-page-container">
        <div className="loading-container">
          <Spin size="large" />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page-container">
        <div className="error-container">
          <Title level={4} type="danger">
            {error}
          </Title>
          <Button type="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="back-button"
        >
          Back to Dashboard
        </Button>
        <div className="page-title">
          <UserOutlined className="page-icon" />
          <Title level={2} className="page-title-text">
            Users Management
          </Title>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage;
