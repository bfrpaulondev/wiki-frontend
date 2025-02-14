import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button
} from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Tags = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [tagName, setTagName] = useState('');

  // Buscar todas as tags com token
  const { data: tags, isLoading, error } = useQuery('tags', async () => {
    const response = await axios.get(`${API_BASE_URL}/tags`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  });

  // Mutation para criar nova tag com token
  const addTagMutation = useMutation(
    async (newTag) => {
      const response = await axios.post(
        `${API_BASE_URL}/tags`,
        newTag,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Tag created successfully');
        queryClient.invalidateQueries('tags');
        setTagName('');
      },
      onError: () => {
        toast.error('Error creating tag');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      toast.error('Tag name cannot be empty');
      return;
    }
    addTagMutation.mutate({ name: tagName });
  };

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading tags</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Tags
      </Typography>

      {/* Formulário para criar nova tag */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Create New Tag
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained">
            Create Tag
          </Button>
        </form>
      </Paper>

      {/* Lista de tags existentes */}
      <Typography variant="h5" gutterBottom>
        Existing Tags
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {tags.map((tag) => (
            <ListItem key={tag._id}>
              <ListItemText primary={tag.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Tags;
