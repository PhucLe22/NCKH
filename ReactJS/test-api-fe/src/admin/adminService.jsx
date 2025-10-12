import axios from 'axios';

const API_URL = 'http://localhost:3000/admin';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    // You can add any response transformation here if needed
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Don't redirect here, let the component handle it
    }
    
    // Return a consistent error object
    return Promise.reject({
      message: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

const adminService = {
  /**
   * Admin login
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   * @returns {Promise<Object>} - User data and token
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { 
        email: email.trim(),
        password: password
      });
      
      if (response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getTeachers: async () => {
    try {
      const response = await api.get('/teachers');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateTeacherStatus: async (teacherId, status) => {
    try {
      const response = await api.put(`/teachers/status/${teacherId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getExams: async () => {
    try {
      const response = await api.get('/exams');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createAdmin: async (adminData) => {
    try {
      const response = await api.post('/register', adminData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteAdmin: async (adminId, adminCode) => {
    try {
      const response = await api.delete(`/delete/${adminId}`, { data: { adminCode } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default adminService;