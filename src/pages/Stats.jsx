import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import { Box, Typography, Grid } from '@mui/material';

const Stats = () => {
  const { data: usage, isLoading: loadingUsage } = useQuery('usageStats', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stats/usage`);
    return response.data;
  });

  const { data: userActivity, isLoading: loadingActivity } = useQuery('userActivity', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/stats/user-activity`);
    return response.data;
  });

  if (loadingUsage || loadingActivity) return <Loader />;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Stats</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Total Articles: {usage.totalArticles}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Total Users: {usage.totalUsers}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">User Activity</Typography>
        {userActivity.map((item) => (
          <Box key={item._id} sx={{ py: 1 }}>
            <Typography>User ID: {item._id}</Typography>
            <Typography>Articles: {item.count}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Stats;
