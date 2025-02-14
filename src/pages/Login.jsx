import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authApi';
import { loginSuccess } from '../features/auth/authSlice';
import { TextField, Button, Typography, CircularProgress, Paper, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Responsividade

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
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
    <Paper
      elevation={3}
      sx={{
        maxWidth: isMobile ? '90%' : 400,
        mx: 'auto',
        mt: isMobile ? 4 : 8,
        p: isMobile ? 2 : 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          size={isMobile ? 'small' : 'medium'}
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          size={isMobile ? 'small' : 'medium'}
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mb: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Button
            fullWidth
            disabled={loading}
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Login;
