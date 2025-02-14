import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Loader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="50vh"
      sx={{
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <CircularProgress 
        size={isMobile ? 40 : 60} 
        thickness={isMobile ? 4 : 6} 
      />
    </Box>
  );
};

export default Loader;
