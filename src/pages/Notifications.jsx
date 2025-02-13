import React from 'react';
import { useQuery } from 'react-query';
import { fetchNotifications } from '../features/notifications/notificationApi';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Notifications = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: notifications, isLoading, error } = useQuery('notifications', () => fetchNotifications(token));

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading notifications</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem key={notif._id}>
            <ListItemText primary={notif.message} secondary={new Date(notif.createdAt).toLocaleString()} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;
