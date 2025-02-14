import { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Home, Article, AccountCircle, Notifications, Category, BarChart, Label } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: 'Home', path: '/', icon: <Home /> },
    { text: 'Manage Articles', path: '/manage-articles', icon: <Article /> },
    { text: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { text: 'Notifications', path: '/notifications', icon: <Notifications /> },
    { text: 'Sections', path: '/sections', icon: <Category /> },
    { text: 'Stats', path: '/stats', icon: <BarChart /> },
    { text: 'Tags', path: '/tags', icon: <Label /> },
  ];

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: '#9A73B5', zIndex: theme.zIndex.drawer + 1 }}>
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
          width: isMobile ? '70%' : 240, 
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? '70%' : 240,
            boxSizing: 'border-box',
            backgroundColor: '#9A73B5',
            color: '#FFFFFF'
          }
        }}
      >
        <List sx={{marginTop:8}}>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              onClick={() => { 
                navigate(item.path);
                if (isMobile) setOpen(false); 
              }}
            >
              <ListItemIcon sx={{ color: '#FFF' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
