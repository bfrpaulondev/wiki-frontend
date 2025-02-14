import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchSections = async () => {
  const response = await axios.get(`${API_BASE_URL}/sections`);
  return response.data;
};

export const createSection = async (sectionData, token) => {
  const response = await axios.post(`${API_BASE_URL}/sections`, sectionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateSection = async (id, sectionData, token) => {
  const response = await axios.put(`${API_BASE_URL}/sections/${id}`, sectionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteSection = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/sections/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchSectionById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/sections/${id}`);
  return response.data;
};
