import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NotificationBadge = ({ count, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <IconButton 
      color="inherit" 
      onClick={onClick} 
      sx={{ padding: isMobile ? '6px' : '12px' }}
    >
      <Badge 
        badgeContent={count > 0 ? count : null} 
        color="secondary"
        sx={{
          '& .MuiBadge-badge': {
            fontSize: isMobile ? '0.7rem' : '0.9rem', 
            minWidth: isMobile ? '16px' : '20px', 
            height: isMobile ? '16px' : '20px'
          }
        }}
      >
        <NotificationsIcon sx={{ fontSize: isMobile ? '1.5rem' : '2rem' }} />
      </Badge>
    </IconButton>
  );
};

export default NotificationBadge;
