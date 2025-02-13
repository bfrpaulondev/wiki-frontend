import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const MainLayout = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex' }}>
      {!hideNav && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {!hideNav && <Navbar />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
