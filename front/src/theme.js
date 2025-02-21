import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2196f3', // Strong blue for primary actions
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#00c853', // Energetic green for progress/success
      light: '#5efc82',
      dark: '#009624',
    },
    success: {
      main: '#00c853',
      light: '#5efc82',
      dark: '#009624',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      gradient: mode === 'dark'
        ? 'linear-gradient(145deg, #1e1e1e 0%, #121212 100%)'
        : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    },
    action: {
      active: mode === 'dark' ? '#64b5f6' : '#2196f3',
      hover: mode === 'dark' ? 'rgba(100, 181, 246, 0.08)' : 'rgba(33, 150, 243, 0.08)',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
  shape: {
    borderRadius: '8px',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(145deg, #2196f3 0%, #1976d2 100%)',
          '&:hover': {
            background: 'linear-gradient(145deg, #1976d2 0%, #1565c0 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '8px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'dark'
            ? 'linear-gradient(145deg, #1976d2 0%, #2196f3 100%)'
            : 'linear-gradient(145deg, #2196f3 0%, #64b5f6 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: mode === 'dark' 
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));