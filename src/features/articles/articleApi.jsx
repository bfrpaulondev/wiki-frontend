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

export const createArticle = async (articleData, token) => {
  const response = await axios.post(`${API_BASE_URL}/articles`, articleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateArticle = async (id, articleData, token) => {
  const response = await axios.put(`${API_BASE_URL}/articles/${id}`, articleData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteArticle = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/articles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const restoreArticle = async (id, historyId, token) => {
  const response = await axios.post(`${API_BASE_URL}/articles/${id}/restore/${historyId}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const saveDraft = async (id, token) => {
  const response = await axios.post(`${API_BASE_URL}/articles/${id}/draft`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const publishArticle = async (id, token) => {
  const response = await axios.put(`${API_BASE_URL}/articles/${id}/publish`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchRevisions = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${id}/revisions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
