// src/pages/Register.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Register data:', data); // Debug log
    setLoading(true);
    try {
      const response = await registerUser(data);
      console.log('Registration response:', response); // Debug log
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
