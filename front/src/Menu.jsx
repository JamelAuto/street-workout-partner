import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box, 
  Container 
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUser } from './context/UserContext';

export const MenuBar = ({ darkMode, onDarkModeChange }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useUser();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuItems = user ? [
    <MenuItem key="username">
      <Typography>{user.username}</Typography>
    </MenuItem>,
    <MenuItem key="logout" onClick={handleLogout}>
      Logout
    </MenuItem>
  ] : [
    <MenuItem 
      key="login"
      component={Link} 
      to="/profile"
      onClick={handleMenuClose}
    >
      Login
    </MenuItem>
  ];

  menuItems.push(
    <MenuItem key="theme" onClick={onDarkModeChange}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        <Typography>{darkMode ? 'Light Mode' : 'Dark Mode'}</Typography>
      </Box>
    </MenuItem>
  );

  const buttonStyles = {
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(8px)',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.2)',
    }
  };

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(145deg, #1976d2 0%, #2196f3 100%)'
          : 'linear-gradient(145deg, #2196f3 0%, #64b5f6 100%)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Street Workout Partner
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {user ? (
              <>
                <Typography sx={{ color: 'inherit' }}>
                  {user.username}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={buttonStyles}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                color="inherit" 
                component={Link} 
                to="/profile"
                sx={buttonStyles}
              >
                Login
              </Button>
            )}
            <IconButton 
              sx={{ 
                ml: 1,
                ...buttonStyles,
                minWidth: '40px',
                width: '40px',
                height: '40px',
                p: 0,
              }} 
              onClick={onDarkModeChange} 
              color="inherit"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { md: 'none' } }}
          >
            {menuItems}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};