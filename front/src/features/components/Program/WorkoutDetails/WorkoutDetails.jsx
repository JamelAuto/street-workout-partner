import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WeekendIcon from '@mui/icons-material/Weekend';
import { format, isSunday } from 'date-fns';

const WorkoutDetails = ({ selectedDate, workoutProgram, userProgress }) => {
  const theme = useTheme();
  if (!selectedDate) return null;

  const workout = workoutProgram?.days[selectedDate];
  const isRestDay = isSunday(new Date(selectedDate));

  const getExerciseColor = (exercise) => {
    switch (exercise) {
      case 'Push Ups': return theme.palette.primary.main; // Green
      case 'Pull Ups': return theme.palette.secondary.main; // Light Green
      case 'Dips': return theme.palette.success.main; // Another shade of green
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Paper
      elevation={theme.palette.mode === 'dark' ? 2 : 3}
      sx={{ 
        height: '100%',
        background: theme.palette.background.gradient,
        transition: 'all 0.3s ease',
        borderRadius: '8px' // Added consistent radius
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          mb: 2,
          color: theme.palette.text.primary 
        }}>
          {format(new Date(selectedDate), 'EEEE, MMMM d')}
        </Typography>

        {isRestDay ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              gap: 2,
              py: 4
            }}
          >
            <WeekendIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
            <Typography variant="h6" color="text.secondary">
              Rest Day
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              align="center"
              sx={{ maxWidth: '80%' }}
            >
              Take time to recover and prepare for your next workout
            </Typography>
          </Box>
        ) : workout ? (
          <>
            <Chip
              icon={<FitnessCenterIcon />}
              label={workout.type}
              sx={{
                mb: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 500,
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main
                }
              }}
            />

            <List sx={{ py: 0 }}>
              {workout.exercises.map((exercise, index) => (
                <React.Fragment key={exercise.name}>
                  {index > 0 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                  <ListItem 
                    sx={{ 
                      px: 0,
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 500,
                        mb: 2,
                        color: getExerciseColor(exercise.name)
                      }}
                    >
                      {exercise.name}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex',
                      gap: 2,
                      width: '100%',
                      mb: 1
                    }}>
                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          p: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <TrendingUpIcon sx={{ color: 'primary.main' }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Sets × Reps
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {exercise.sets} × {exercise.progression[0]}
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          flex: 1,
                          p: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <TimerIcon sx={{ color: 'primary.main' }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Rest
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {exercise.restTime}s
                          </Typography>
                        </Box>
                      </Paper>
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2,
            py: 4
          }}>
            <Typography color="text.secondary">
              No workout scheduled for this day
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WorkoutDetails;