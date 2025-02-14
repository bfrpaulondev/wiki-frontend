import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const History = () => {
  const { articleId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Responsividade

  const { data: historyData, isLoading, error } = useQuery(['history', articleId], async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/history/${articleId}`);
    return response.data;
  });

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading history</Typography>;

  return (
    <Box sx={{ mt: 3, px: isMobile ? 2 : 4, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
        Article History
      </Typography>

      <Paper sx={{ p: isMobile ? 2 : 3, maxHeight: '400px', overflowY: 'auto' }}>
        <List>
          {historyData.map((record) => (
            <ListItem key={record._id} divider>
              <ListItemText
                primary={record.title}
                secondary={new Date(record.updatedAt).toLocaleString()}
                sx={{ wordBreak: 'break-word', fontSize: isMobile ? '0.9rem' : '1rem' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default History;
