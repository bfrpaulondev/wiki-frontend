import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Profile</Typography>
      {user ? (
        <>
          <Typography variant="h6">Username: {user.username}</Typography>
          <Typography variant="h6">Email: {user.email}</Typography>
        </>
      ) : (
        <Typography variant="body1">No user data</Typography>
      )}
    </Box>
  );
};

export default Profile;
