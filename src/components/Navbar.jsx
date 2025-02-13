import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wiki
        </Typography>
        {token ? (
          <Button color="inherit" onClick={() => { dispatch(logout()); navigate('/login'); }}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
           <Button color="inherit" onClick={() => navigate('/register')}>
            Register
          </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
