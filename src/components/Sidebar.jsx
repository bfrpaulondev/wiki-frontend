import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Define se é mobile

  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Manage Articles', path: '/manage-articles' },
    { text: 'Profile', path: '/profile' },
    { text: 'Notifications', path: '/notifications' },
    { text: 'Sections', path: '/sections' },
    { text: 'Stats', path: '/stats' },
    { text: 'Tags', path: '/tags' }
  ];

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: '#9A73B5' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        sx={{
          width: isMobile ? 'auto' : 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#9A73B5',
            color: '#FFFFFF'
          }
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => { 
              navigate(item.path);
              setOpen(false);
            }}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
