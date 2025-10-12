import axios from 'axios';

const API_URL = 'http://localhost:8080/api/exams';

// Get all available exams
export const getExams = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
};

// Get a single exam by ID
export const getExamById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exam ${id}:`, error);
    throw error;
  }
};

// Submit exam answers
export const submitExam = async (examId, answers) => {
  try {
    const response = await axios.post(`${API_URL}/${examId}/submit`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting exam:', error);
    throw error;
  }
};

// Get exam results
export const getExamResults = async (examId) => {
  try {
    const response = await axios.get(`${API_URL}/${examId}/results`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam results:', error);
    throw error;
  }
};

// Get user's exam history
export const getUserExamHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user exam history:', error);
    throw error;
  }
};
