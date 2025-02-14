import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../features/auth/authSlice';
import axios from 'axios';
import Lottie from 'lottie-react';
import robotAnimation from '../assets/robotAnimation.json';
import TypewriterEffect from '../components/TypewriterEffect';
import motivationalPhrases from '../assets/motivationalPhrases.json';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [userSettings, setUserSettings] = useState(null);
  const [randomPhrase, setRandomPhrase] = useState('');

  useEffect(() => {
    if (token) {
      axios.get(`https://wiki-api-glte.onrender.com/api/users/me/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserSettings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user settings:', error);
      });

      if (motivationalPhrases && motivationalPhrases.length > 0) {
        const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
        setRandomPhrase(motivationalPhrases[randomIndex]);
      } else {
        setRandomPhrase('Keep coding and stay motivated!');
      }
    }
  }, [token]);

  return (
    <AppBar sx={{
      marginTop: 2
    }} position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex' , flexWrap:"wrap" , padding: "10px", alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            {`Hello, ${userSettings?.displayName || 'Developer'}!`}
          </Typography>
          {robotAnimation && (
            <Box sx={{ width: 40, height: 40, mr: 1 }}>
              <Lottie animationData={robotAnimation} loop={true} />
            </Box>
          )}
          <TypewriterEffect text={randomPhrase} speed={100} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {token ? (
          <IconButton
            color="inherit"
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            <LogoutIcon />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <Typography variant="button">Login</Typography>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
