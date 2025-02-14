import axios from 'axios';
import jwtDecode from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // ou API_BASE_URL definido no .env
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Supondo que o token esteja no localStorage ou obtido de outra forma:
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (exp * 1000 >= Date.now()) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
