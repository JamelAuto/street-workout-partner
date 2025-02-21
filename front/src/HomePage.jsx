import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimelineIcon from '@mui/icons-material/Timeline';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const HomePage = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <TimelineIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Progress Tracker',
      description: 'Log and visualize your training progress over time',
      path: '/tracker'
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'Training Program',
      description: 'Get a personalized workout routine based on your fitness level',
      path: '/program'
    },
    {
      icon: <SmartToyIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
      title: 'AI Coach',
      description: 'Receive guidance and form tips from our AI assistant',
      path: '/tracker'
    }
  ];

  const buttonStyles = {
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    bgcolor: 'primary.main',
    color: 'white',
    '&:hover': {
      bgcolor: 'primary.dark',
    }
  };

  const featureCardStyles = {
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, #1e1e1e 0%, #121212 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[4],
    }
  };

  return (
    <Box sx={{ 
      height: '100%', // Change from minHeight to height
      bgcolor: theme.palette.background.default,
      overflow: 'auto' // Add this
    }}>
      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, #64b5f6 0%, #2196f3 100%)'
              : 'linear-gradient(145deg, #2196f3 0%, #1976d2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Street Workout Partner
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 400,
            color: theme.palette.text.secondary
          }}
        >
          Your personal calisthenics training companion
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={Link}
            to="/tracker"
            variant="contained"
            size="large"
            sx={buttonStyles}
          >
            Start Training
          </Button>
        </Stack>
      </Container>

      {/* Feature Cards */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Stack spacing={3}>
          {features.map((feature, index) => (
            <Card
              key={index}
              component={Link}
              to={feature.path}
              sx={featureCardStyles}
            >
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 3
              }}>
                {feature.icon}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
