import React from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBadge = ({ count, onClick }) => (
  <IconButton color="inherit" onClick={onClick}>
    <Badge badgeContent={count} color="secondary">
      <NotificationsIcon />
    </Badge>
  </IconButton>
);

export default NotificationBadge;
