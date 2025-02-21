import React from 'react';
import { Paper, Grid, Typography, Box, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const CurrentMaxDisplay = ({ userProgress, onRefresh }) => {
  const theme = useTheme();

  // Return early if userProgress is null
  if (!userProgress) {
    return (
      <Paper 
        elevation={theme.palette.mode === 'dark' ? 2 : 3}
        sx={{ 
          p: 1,
          mb: 2,
          background: theme.palette.background.paper,
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Loading progress data...
        </Typography>
      </Paper>
    );
  }

  const exercises = [
    { name: 'Max Push Ups', key: 'pushUps', icon: '💪' },
    { name: 'Max Pull Ups', key: 'pullUps', icon: '🏋️' },
    { name: 'Max Dips', key: 'dips', icon: '🔥' }
  ];

  return (
    <Paper 
      elevation={theme.palette.mode === 'dark' ? 2 : 3}
      sx={{ 
        p: 1,
        mb: 2,
        background: theme.palette.background.paper,
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}
    >
      <Grid container spacing={1}>
        {exercises.map((exercise) => (
          <Grid item xs={4} key={exercise.key}>
            <Paper
              elevation={0}
              sx={{
                py: 0.5,
                px: 0.75,
                textAlign: 'center',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: '8px',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.25 }}>
                {exercise.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {userProgress[exercise.key] || 0}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {exercise.icon}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CurrentMaxDisplay;