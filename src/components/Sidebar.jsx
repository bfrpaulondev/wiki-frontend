import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const drawerWidth = 240;
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
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#292e3b', color: '#FFFFFF' },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
