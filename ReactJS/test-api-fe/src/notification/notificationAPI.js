import axios from 'axios';

const BASE_URL = 'http://localhost:3000/notifications';

export const fetchNotifications = (studentId) => {
  return axios.get(`${BASE_URL}?studentId=${studentId}`);
};

export const createNotification = (data) => {
  return axios.post(BASE_URL, data);
};

export const markAsRead = (id) => {
  return axios.patch(`${BASE_URL}/${id}/read`);
};
