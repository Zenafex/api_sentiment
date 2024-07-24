import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
        default: '#fff', // Cambia '#f0f0f0' por el color deseado
    },

    primary: {
      main: '#1976d2', // Cambia esto según tus necesidades
    },
    secondary: {
      main: '#dc004e', // Cambia esto según tus necesidades
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
