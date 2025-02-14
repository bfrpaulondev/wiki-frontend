import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Sections = () => {
  // 1) Carrega base URL e token do Redux (seu slice de autenticação)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = useSelector((state) => state.auth.token);

  const queryClient = useQueryClient();

  const [sectionName, setSectionName] = useState('');
  const [editingSection, setEditingSection] = useState(null);

  // 2) Buscar todas as seções
  const {
    data: sections,
    isLoading,
    error
  } = useQuery('sections', async () => {
    const response = await axios.get(`${API_BASE_URL}/sections`, {
      headers: {
        // Se o back-end exigir token, envie no cabeçalho Authorization
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  });

  // 3) Criar uma nova seção
  const addSectionMutation = useMutation(
    async (newSection) => {
      const response = await axios.post(
        `${API_BASE_URL}/sections`,
        newSection,
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
        toast.success('Section created successfully');
        queryClient.invalidateQueries('sections');
        setSectionName('');
      },
      onError: () => {
        toast.error('Error creating section');
      }
    }
  );

  // 4) Atualizar uma seção existente
  const updateSectionMutation = useMutation(
    async ({ id, data }) => {
      const response = await axios.put(
        `${API_BASE_URL}/sections/${id}`,
        data,
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
        toast.success('Section updated successfully');
        queryClient.invalidateQueries('sections');
        setEditingSection(null);
        setSectionName('');
      },
      onError: () => {
        toast.error('Error updating section');
      }
    }
  );

  // 5) Deletar uma seção
  const deleteSectionMutation = useMutation(
    async (id) => {
      const response = await axios.delete(
        `${API_BASE_URL}/sections/${id}`,
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
        toast.success('Section deleted successfully');
        queryClient.invalidateQueries('sections');
      },
      onError: () => {
        toast.error('Error deleting section');
      }
    }
  );

  // SUBMIT (criar ou atualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sectionName.trim()) {
      toast.error('Section name cannot be empty');
      return;
    }
    if (editingSection) {
      updateSectionMutation.mutate({
        id: editingSection._id,
        data: { name: sectionName }
      });
    } else {
      addSectionMutation.mutate({ name: sectionName });
    }
  };

  // Editar
  const handleEdit = (section) => {
    setEditingSection(section);
    setSectionName(section.name);
  };

  // Deletar
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      deleteSectionMutation.mutate(id);
    }
  };

  // Loading & Erros
  if (isLoading) return <Loader />;
  if (error) return <Typography>Error loading sections</Typography>;

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manage Sections
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editingSection ? 'Edit Section' : 'Create New Section'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {editingSection ? 'Update Section' : 'Create Section'}
          </Button>
          {editingSection && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => {
                setEditingSection(null);
                setSectionName('');
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Existing Sections
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {sections?.map((section) => (
            <ListItem
              key={section._id}
              secondaryAction={
                <>
                  <Button variant="text" onClick={() => handleEdit(section)}>
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(section._id)}
                  >
                    Delete
                  </Button>
                </>
              }
            >
              <ListItemText primary={section.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Sections;
