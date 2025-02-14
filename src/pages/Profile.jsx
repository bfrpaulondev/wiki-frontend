import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  // Formulário de configurações do usuário
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { displayName: '', bio: '' },
  });

  // Formulário para atualização de senha
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm();

  // Busca as configurações do usuário logado
  const { data: settings, isLoading: isLoadingSettings, error: settingsError } = useQuery('userSettings', async () => {
    const response = await axios.get(`${API_BASE_URL}/users/me/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });

  // Busca os detalhes do usuário logado
  const { data: userDetails, isLoading: isLoadingUser, error: userError } = useQuery('userDetails', async () => {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });

  // Mutation para atualizar as configurações do usuário
  const updateSettingsMutation = useMutation(
    async (updatedSettings) => {
      const response = await axios.put(`${API_BASE_URL}/users/me/settings`, updatedSettings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Settings updated successfully');
        queryClient.invalidateQueries('userSettings');
      },
      onError: (error) => {
        console.error('Error updating settings:', error.response?.data || error.message);
        toast.error('Error updating settings');
      },
    }
  );

  // Mutation para atualizar a senha
  // O payload deve estar no formato { "oldPassword": "senhaAntiga", "newPassword": "novaSenha" }
  const updatePasswordMutation = useMutation(
    async (passwordData) => {
      const response = await axios.put(`${API_BASE_URL}/auth/update-password`, passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success('Password updated successfully');
        resetPassword();
      },
      onError: (error) => {
        console.error('Error updating password:', error.response?.data || error.message);
        toast.error('Error updating password');
      },
    }
  );

  // Função para submeter as configurações
  const onSubmitSettings = (data) => {
    updateSettingsMutation.mutate(data);
  };

  // Função para submeter a atualização de senha
  const onSubmitPassword = (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    updatePasswordMutation.mutate({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  if (isLoadingSettings || isLoadingUser) return <Loader />;
  if (settingsError) return <Typography>Error loading settings</Typography>;
  if (userError) return <Typography>Error loading user details</Typography>;

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {/* Exibição dos detalhes do usuário, incluindo configurações */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <Typography>
          Name: {userDetails?.name || userDetails?.username}
        </Typography>
        <Typography>Email: {userDetails?.email}</Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Display Name:</strong> {settings?.displayName || 'Not set'}
        </Typography>
        <Typography>
          <strong>Bio:</strong> {settings?.bio || 'Not set'}
        </Typography>
      </Paper>

      {/* Formulário de Configurações */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Settings
        </Typography>
        <form onSubmit={handleSubmit(onSubmitSettings)}>
          <TextField
            label="Display Name"
            fullWidth
            margin="normal"
            defaultValue={settings?.displayName || ''}
            {...register('displayName')}
          />
          <TextField
            label="Bio"
            fullWidth
            margin="normal"
            defaultValue={settings?.bio || ''}
            multiline
            rows={3}
            {...register('bio')}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Settings
          </Button>
        </form>
      </Paper>

      {/* Formulário de Atualização de Senha */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Password
        </Typography>
        <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <TextField
            label="Current Password"
            fullWidth
            margin="normal"
            type="password"
            {...registerPassword('currentPassword', { required: 'Current password required' })}
          />
          <TextField
            label="New Password"
            fullWidth
            margin="normal"
            type="password"
            {...registerPassword('newPassword', { required: 'New password required' })}
          />
          <TextField
            label="Confirm New Password"
            fullWidth
            margin="normal"
            type="password"
            {...registerPassword('confirmNewPassword', { required: 'Please confirm your new password' })}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
