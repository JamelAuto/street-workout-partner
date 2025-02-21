import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Grid, 
  Typography, 
  IconButton,
  Chip,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  isToday,
  isSameMonth,
  isSameDay
} from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const CalendarView = ({ workoutProgram, selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const theme = useTheme();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  const getWorkoutColor = (type) => {
    switch (type) {
      case 'Push Focus': return theme.palette.primary.main; // Green
      case 'Pull Focus': return theme.palette.secondary.main; // Light Green
      case 'Full Body': return theme.palette.success.main; // Another shade of green
      default: return theme.palette.grey[500];
    }
  };

  const handleDateClick = (date) => {
    onDateSelect(format(date, 'yyyy-MM-dd'));
  };

  return (
    <Paper 
      elevation={theme.palette.mode === 'dark' ? 2 : 3}
      sx={{ 
        p: 1,
        background: theme.palette.background.gradient,
        transition: 'all 0.3s ease',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <IconButton 
          onClick={handlePrevMonth}
          sx={{ 
            color: 'primary.main',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton 
          onClick={handleNextMonth}
          sx={{ 
            color: 'primary.main',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Grid container spacing={0.5}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={12 / 7} key={day}>
            <Typography 
              align="center" 
              sx={{ 
                fontWeight: 600,
                color: 'text.secondary',
                fontSize: '0.75rem',
                mb: 0.5
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}

        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const workout = workoutProgram?.days[dateStr];
          const isSelected = selectedDate === dateStr;
          const isDayToday = isToday(day);
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <Grid item xs={12 / 7} key={dateStr}>
              <Tooltip 
                title={
                  workout ? `${workout.type} - ${workout.exercises.length} exercises` : 
                  "No workout scheduled"
                }
              >
                <Paper
                  onClick={() => handleDateClick(day)}
                  elevation={isSelected ? 4 : 0}
                  sx={{
                    p: 1,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    borderRadius: '8px',
                    bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.1) : 
                             isCurrentMonth ? 'background.paper' : 'background.default',
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[3],
                      borderColor: 'primary.main'
                    },
                    opacity: isCurrentMonth ? 1 : 0.5
                  }}
                >
                  <Typography 
                    align="center" 
                    sx={{ 
                      fontWeight: isDayToday ? 700 : 400,
                      color: isDayToday ? 'primary.main' : 'text.primary'
                    }}
                  >
                    {format(day, 'd')}
                  </Typography>
                  
                  {workout && (
                    <Chip
                      icon={<FitnessCenterIcon sx={{ fontSize: '0.75rem' }} />}
                      label={workout.type}
                      size="small"
                      sx={{
                        bgcolor: alpha(getWorkoutColor(workout.type), 0.1),
                        color: getWorkoutColor(workout.type),
                        borderRadius: '8px',
                        '& .MuiChip-label': {
                          px: 0.5,
                          fontSize: '0.625rem'
                        }
                      }}
                    />
                  )}
                </Paper>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default CalendarView;