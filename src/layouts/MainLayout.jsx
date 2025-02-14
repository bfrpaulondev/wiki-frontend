import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MainLayout = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || location.pathname === '/register';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh' }}>
      {!hideNav && <Sidebar />}

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          paddingTop: isMobile && !hideNav ? '64px' : '0px', 
          minHeight: '100vh' 
        }}
      >
        {!hideNav && <Navbar />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
