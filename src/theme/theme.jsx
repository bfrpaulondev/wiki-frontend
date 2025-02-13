import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3A4F',
      dark: '#56647b',
      light: '#b4c2dc'
    },
    secondary: {
      main: '#FF4D4D',
      light: '#ffecda'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#e0e0e0'
    },
    background: {
      default: '#1A1F2B',
      paper: '#292e3b'
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif"
  }
});

export default theme;
