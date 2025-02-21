import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Container,
  Grid,
  Button 
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DeleteIcon from '@mui/icons-material/Delete';
import { generateWorkoutProgram } from '../../utils/programGenerator';
import InputSection from './InputSection';
import ChartSection from './ChartSection';
import AISection from './AISection';

const ExerciseTracker = ({ onUpdateEntries }) => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('workoutEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const [userProgress, setUserProgress] = useState(null);
  const [workoutProgram, setWorkoutProgram] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [duration] = useState(1);
  const theme = useTheme();

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('workoutEntries', JSON.stringify(entries));
      onUpdateEntries?.(entries);
    }
  }, [entries, onUpdateEntries]);

  useEffect(() => {
    const savedUserData = localStorage.getItem('workoutEntries');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      if (userData.length > 0) {
        const lastEntry = userData[userData.length - 1];
        const progress = {
          pushUps: parseInt(lastEntry.pushUps) || 0,
          pullUps: parseInt(lastEntry.pullUps) || 0,
          dips: parseInt(lastEntry.dips) || 0,
          lastUpdate: lastEntry.date
        };
        setUserProgress(progress);
        const initialProgram = generateWorkoutProgram(duration, progress);
        setWorkoutProgram(initialProgram);
        setSelectedDate(new Date().toISOString().split('T')[0]);
      }
    }
  }, []);

  const handleDarkModeChange = (e) => {
    const newDarkMode = e.target.checked;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleClearCache = () => {
    localStorage.removeItem('workoutEntries');
    localStorage.removeItem('workoutProgram');
    localStorage.removeItem('darkMode');
    setEntries([]);
    setDarkMode(false);
    onUpdateEntries?.([]);
  };

  const generateExampleData = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 2);
    const generateProgression = (startReps, incrementRange) => {
      const progression = [];
      let currentReps = startReps;
      for (let i = 0; i < 8; i++) {
        const increment = Math.floor(Math.random() * incrementRange);
        currentReps += increment;
        progression.push(currentReps);
      }
      return progression;
    };
    const generateDates = (start, end, count) => {
      const dates = [];
      const timeRange = end.getTime() - start.getTime();
      for (let i = 0; i < count; i++) {
        const randomTime = start.getTime() + Math.random() * timeRange;
        dates.push(new Date(randomTime));
      }
      return dates.sort((a, b) => a - b);
    };
    const pushUpsProgress = generateProgression(5, 3);
    const pullUpsProgress = generateProgression(1, 2);
    const dipsProgress = generateProgression(3, 2);
    const randomDates = generateDates(startDate, endDate, 8);
    const exampleEntries = [];
    for (let i = 0; i < 8; i++) {
      exampleEntries.push({
        date: randomDates[i].toISOString().split('T')[0],
        pushUps: pushUpsProgress[i],
        pullUps: pullUpsProgress[i],
        dips: dipsProgress[i]
      });
    }
    setEntries(exampleEntries);
    localStorage.setItem('workoutEntries', JSON.stringify(exampleEntries));
    onUpdateEntries?.(exampleEntries);
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<ArrowBackIcon />}
              variant="contained"
              sx={buttonStyles}
            >
              Back to Home
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Track Your Progress
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              onClick={generateExampleData}
              variant="contained"
              startIcon={<ShuffleIcon />}
              sx={buttonStyles}            >
              Generate Example
            </Button>
            <Button
              onClick={handleClearCache}
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{
                ...buttonStyles,
                background: 'linear-gradient(45deg, #f44336 30%, #d32f2f 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d32f2f 30%, #c62828 90%)',
                }
              }}
            >
              Reset All Data
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputSection 
              entries={entries} 
              setEntries={setEntries} 
              onUpdateEntries={onUpdateEntries} 
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ChartSection 
              entries={entries} 
              setEntries={setEntries} 
              onUpdateEntries={onUpdateEntries} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AISection 
              entries={entries} 
              setEntries={setEntries} 
              onUpdateEntries={onUpdateEntries} 
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ExerciseTracker;
