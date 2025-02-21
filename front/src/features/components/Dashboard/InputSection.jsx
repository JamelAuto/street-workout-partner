import React, { useState } from 'react';
import { Grid, TextField, Button, Paper } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

const InputSection = ({ entries, setEntries, onUpdateEntries }) => {
  const [newEntry, setNewEntry] = useState({
    date: '',
    pushUps: '',
    pullUps: '',
    dips: ''
  });

  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^\d]/g, '');
    if (sanitizedValue === '' || (parseInt(sanitizedValue) >= 0)) {
      setNewEntry(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    }
  };

  const handleAddEntry = () => {
    if (newEntry.date && (newEntry.pushUps || newEntry.pullUps || newEntry.dips)) {
      const newEntryWithDate = {
        date: new Date(newEntry.date).toISOString().split('T')[0],
        pushUps: parseInt(newEntry.pushUps) || 0,
        pullUps: parseInt(newEntry.pullUps) || 0,
        dips: parseInt(newEntry.dips) || 0
      };

      const updatedEntries = [...entries, newEntryWithDate].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );

      setEntries(updatedEntries);
      localStorage.setItem('workoutEntries', JSON.stringify(updatedEntries));
      onUpdateEntries?.(updatedEntries);

      setNewEntry({
        date: '',
        pushUps: '',
        pullUps: '',
        dips: ''
      });
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: "8px",
      backgroundColor: theme.palette.background.paper,
      '& fieldset': {
        borderColor: alpha(theme.palette.text.primary, 0.2),
      },
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.text.primary, 0.3),
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    }
  };

  const buttonStyles = {
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2,
        background: theme.palette.background.gradient,
        transition: 'all 0.3s ease',
        borderRadius: "8px"
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            required
            fullWidth
            type="date"
            name="date"
            label="Date"
            value={newEntry.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={inputStyles}
          />
        </Grid>
        {['PushUps', 'PullUps', 'Dips'].map((exercise) => (
          <Grid item xs={12} md={2} key={exercise}>
            <TextField
              fullWidth
              type="text"
              name={exercise}
              label={exercise.replace(/([A-Z])/g, ' $1').trim()}
              value={newEntry[exercise]}
              onChange={handleInputChange}
              inputProps={{ 
                inputMode: 'numeric',
                pattern: '[0-9]*',
                onKeyDown: (e) => {
                  if ([8, 46, 9, 27, 13].includes(e.keyCode)) {
                    return;
                  }
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                },
                onPaste: (e) => {
                  e.preventDefault();
                }
              }}
              sx={inputStyles}
            />
          </Grid>
        ))}
        <Grid item xs={12} md={3}>
          <Button 
            fullWidth
            variant="contained" 
            onClick={handleAddEntry}
            disabled={!newEntry.date}
            sx={{ 
              ...buttonStyles,
              height: '56px',
              background: 'linear-gradient(45deg, #007bff 30%, #0056b3 90%)',
              boxShadow: '0 3px 5px 2px rgba(0, 123, 255, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0056b3 30%, #004094 90%)',
              }
            }}
          >
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InputSection;
