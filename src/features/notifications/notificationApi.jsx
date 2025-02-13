import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNotifications = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const markNotificationAsRead = async (id, token) => {
  const response = await axios.put(`${API_BASE_URL}/notifications/${id}/read`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
