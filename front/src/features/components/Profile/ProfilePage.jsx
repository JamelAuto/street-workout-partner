import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

const ProfilePage = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (tab === 1 && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (tab === 0) {
        // Sign In
        const response = await axios.post('http://localhost:5000/login', {
          email: formData.email,
          password: formData.password,
        });
        
        // Use the login function from context
        login(response.data.user);
        setSuccess('Login successful');
        
        // Redirect to home page after successful login
        navigate('/');
      } else {
        // Sign Up
        const response = await axios.post('/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setSuccess('Account created successfully');
        // Handle successful registration (e.g., store token, redirect)
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <Box sx={{ 
      height: '100%',
      overflow: 'auto',
      bgcolor: theme.palette.background.default 
    }}>
      <Container maxWidth="sm">
        <Box sx={{ pt: 8, pb: 6 }}>
          <Paper
            elevation={theme.palette.mode === 'dark' ? 2 : 1}
            sx={{
              p: 4,
              background: theme.palette.background.paper,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                mb: 4,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                }
              }}
            >
              <Tab 
                label="Sign In" 
                icon={<LockOutlinedIcon />}
                iconPosition="start"
              />
              <Tab 
                label="Sign Up" 
                icon={<PersonAddOutlinedIcon />}
                iconPosition="start"
              />
            </Tabs>

            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert 
                severity="success" 
                sx={{ mb: 3 }}
                onClose={() => setSuccess('')}
              >
                {success}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tab === 1 && (
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                {tab === 1 && (
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(145deg, #2196f3 0%, #1976d2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(145deg, #1976d2 0%, #1565c0 100%)',
                    }
                  }}
                >
                  {tab === 0 ? 'Sign In' : 'Create Account'}
                </Button>

                {tab === 0 && (
                  <Button
                    variant="text"
                    sx={{
                      textTransform: 'none',
                      color: 'primary.main',
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    Forgot password?
                  </Button>
                )}
              </Box>
            </form>

            <Divider sx={{ my: 4 }} />

            <Typography 
              variant="body2" 
              color="text.secondary"
              align="center"
            >
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
