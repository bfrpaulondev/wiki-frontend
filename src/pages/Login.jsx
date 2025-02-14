import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authApi';
import { loginSuccess } from '../features/auth/authSlice';
import { TextField, Button, Typography, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log('Login response:', response);
      if (response && response.token) {
        dispatch(loginSuccess(response));
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Login failed: Invalid response');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
        <Button
          fullWidth sx={{ mt: 2 }}
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}

        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}

        </Button>
      </form>
    </Paper>
  );
};

export default Login;
