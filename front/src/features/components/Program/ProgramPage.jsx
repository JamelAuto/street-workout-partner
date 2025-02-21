import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { generateWorkoutProgram } from '../../utils/programGenerator';
import CalendarView from './Calendar/CalendarView';
import WorkoutDetails from './WorkoutDetails/WorkoutDetails';
import CurrentMaxDisplay from './CurrentMaxDisplay/CurrentMaxDisplay';
import { useTheme } from '@mui/material/styles';

const ProgramPage = () => {
  const [workoutProgram, setWorkoutProgram] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const updateProgress = async () => {
    try {
      const savedUserData = localStorage.getItem('workoutEntries');
      if (!savedUserData) return;

      const userData = JSON.parse(savedUserData);
      if (!Array.isArray(userData) || userData.length === 0) return;

      const lastEntry = userData[userData.length - 1];
      const progress = {
        pushUps: parseInt(lastEntry.pushUps) || 0,
        pullUps: parseInt(lastEntry.pullUps) || 0,
        dips: parseInt(lastEntry.dips) || 0,
        lastUpdate: lastEntry.date
      };

      setUserProgress(progress);
      const program = await generateWorkoutProgram(progress);
      setWorkoutProgram(program);
      setSelectedDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error updating program:', error);
      setError('Failed to update program');
    }
  };

  useEffect(() => {
    updateProgress();
  }, []);

  const buttonStyles = {
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    }
  };

  const renderContent = () => (
    <Box sx={{ 
      height: '100%',
      overflow: 'auto',
      bgcolor: theme.palette.background.default 
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Box>
              <Button
                component={Link}
                to="/tracker"
                startIcon={<ArrowBackIcon />}
                variant="contained"
                sx={buttonStyles}
              >
                Back to Tracker
              </Button>
              <Box>
                <Typography variant="h6">
                  Your Workout Program
                </Typography>
              </Box>
            </Box>
          </Box>
          <CurrentMaxDisplay userProgress={userProgress} onRefresh={updateProgress} />
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Box>
              <CalendarView
                workoutProgram={workoutProgram}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </Box>
            <Box>
              <WorkoutDetails
                selectedDate={selectedDate}
                workoutProgram={workoutProgram}
                userProgress={userProgress}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return renderContent();
};

export default ProgramPage;