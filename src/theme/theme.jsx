import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5FBF',
      dark: '#61398F',
      light: '##FFFFFF'
    },
    secondary: {
      main: '#9A73B5',
      light: '#D6C6E1'
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#878787'
    },
    background: {
      default: '#F5F3F7',
      paper: '#E9E4ED',
    }
  },
  typography: {
    fontFamily: "'Inter', sans-serif"
  }
});

export default theme;
