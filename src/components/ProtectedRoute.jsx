import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode.default(token);
    const { exp } = decoded;
    return exp * 1000 >= Date.now();
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token && isTokenValid(token) ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
