import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ArticleDetails from '../pages/ArticleDetails';
import ManageArticles from '../pages/ManageArticles';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Sections from '../pages/Sections';
import Comments from '../pages/Comments';
import History from '../pages/History';
import Search from '../pages/Search';
import Stats from '../pages/Stats';
import Tags from '../pages/Tags';
import Uploads from '../pages/Uploads';
import MainLayout from '../layouts/MainLayout';
import { useSelector } from 'react-redux';

// Componente para proteger as rotas
const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/manage-articles" element={<ManageArticles />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/comments/:articleId" element={<Comments />} />
          <Route path="/history/:articleId" element={<History />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/uploads" element={<Uploads />} />
        </Route>
      </Route>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

export default AppRoutes;
