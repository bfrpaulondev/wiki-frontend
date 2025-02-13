import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`);
  return response.data;
};

export const fetchArticleById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
  return response.data;
};
