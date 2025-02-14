import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const History = () => {
  const { articleId } = useParams();
  const { data: historyData, isLoading, error } = useQuery(['history', articleId], async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/history/${articleId}`);
    return response.data;
  });

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading history</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>Article History</Typography>
      <List>
        {historyData.map((record) => (
          <ListItem key={record._id}>
            <ListItemText
              primary={record.title}
              secondary={new Date(record.updatedAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default History;
