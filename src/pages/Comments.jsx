import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Comments = () => {
  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  const { data: comments, isLoading, error } = useQuery(['comments', articleId], async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/articles/${articleId}/comments`);
    return response.data;
  });

  const mutation = useMutation(
    async (newComment) => {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/articles/${articleId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Comment added successfully');
        queryClient.invalidateQueries(['comments', articleId]);
        setCommentText('');
      },
      onError: () => {
        toast.error('Error adding comment');
      },
    }
  );

  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    mutation.mutate(commentText);
  };

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading comments</Typography>;

  return (
    <Paper sx={{ p: isMobile ? 2 : 3, mt: 3, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
        Comments
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          size={isMobile ? 'small' : 'medium'}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ width: isMobile ? '100%' : 'auto' }} 
        >
          Submit
        </Button>
      </Box>

      <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {comments.map((comment) => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemText
              primary={comment.content}
              secondary={new Date(comment.createdAt).toLocaleString()}
              sx={{
                wordBreak: 'break-word', 
                fontSize: isMobile ? '0.9rem' : '1rem',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Comments;
