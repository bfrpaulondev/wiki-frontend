import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTags = async () => {
  const response = await axios.get(`${API_BASE_URL}/tags`);
  return response.data;
};

export const createTag = async (tagData, token) => {
  const response = await axios.post(`${API_BASE_URL}/tags`, tagData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
