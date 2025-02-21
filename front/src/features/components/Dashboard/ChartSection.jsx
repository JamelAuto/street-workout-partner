import React, { useState } from 'react';
import { Paper, Typography, Box, Grid, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme, alpha } from '@mui/material/styles';

const ChartSection = ({ entries, setEntries, onUpdateEntries }) => {
  const [editingEntry, setEditingEntry] = useState(null);
  const theme = useTheme();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEditClick = (entry, index) => {
    setEditingEntry({ ...entry, index });
  };

  const handleSaveEdit = () => {
    if (!editingEntry) return;

    const updated = [...entries];
    updated[editingEntry.index] = {
      date: editingEntry.date,
      pushUps: parseInt(editingEntry.pushUps) || 0,
      pullUps: parseInt(editingEntry.pullUps) || 0,
      dips: parseInt(editingEntry.dips) || 0
    };
    const sortedEntries = updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setEntries(sortedEntries);
    localStorage.setItem('workoutEntries', JSON.stringify(sortedEntries));
    onUpdateEntries?.(sortedEntries);
    setEditingEntry(null);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^\d]/g, '');
    if (sanitizedValue === '' || (parseInt(sanitizedValue) >= 0)) {
      setEditingEntry(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    }
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('workoutEntries', JSON.stringify(updatedEntries));
    onUpdateEntries?.(updatedEntries);
    setEditingEntry(null);
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: "8px"
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
      elevation={theme.palette.mode === 'dark' ? 2 : 3}
      sx={{ 
        p: 2,
        height: '100%',
        background: theme.palette.background.gradient,
        transition: 'all 0.3s ease',
        borderRadius: '8px'
      }}
    >
      {entries.length > 0 ? (
        <>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Progress Chart
          </Typography>
          <Box sx={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart
                data={entries}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme.palette.mode === 'dark' ? '#333' : '#eee'} 
                />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke={theme.palette.text.primary}
                />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip 
                  labelFormatter={formatDate}
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[3],
                    border: 'none',
                    color: theme.palette.text.primary
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pushUps" 
                  stroke="#2196f3" 
                  name="Push Ups"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pullUps" 
                  stroke="#28a745" 
                  name="Pull Ups"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="dips" 
                  stroke="#dc3545" 
                  name="Dips"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Entry History
            </Typography>
            <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
              {entries.map((entry, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{
                    p: 2,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: editingEntry?.index === index ? 'action.hover' : 'background.paper',
                    borderRadius: '8px'
                  }}
                >
                  {editingEntry?.index === index ? (
                    <>
                      <TextField
                        type="date"
                        size="small"
                        name="date"
                        value={editingEntry.date}
                        onChange={handleEditChange}
                        sx={{ width: 150, ...inputStyles }}
                      />
                      {['pushUps', 'pullUps', 'dips'].map((exercise) => (
                        <TextField
                          key={exercise}
                          size="small"
                          name={exercise}
                          label={exercise.replace(/([A-Z])/g, ' $1').trim()}
                          value={editingEntry[exercise]}
                          onChange={handleEditChange}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            style: { width: '60px' }
                          }}
                          sx={inputStyles}
                        />
                      ))}
                      <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteEntry(editingEntry.index)}
                          sx={{
                            ...buttonStyles,
                            backgroundColor: '#dc3545',
                            '&:hover': {
                              backgroundColor: '#bb2d3b',
                            }
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={handleSaveEdit}
                          sx={buttonStyles}
                        >
                          Save
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleCancelEdit}
                          sx={buttonStyles}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography sx={{ width: 150 }}>
                        {formatDate(entry.date)}
                      </Typography>
                      <Typography>
                        Push Ups: {entry.pushUps}
                      </Typography>
                      <Typography>
                        Pull Ups: {entry.pullUps}
                      </Typography>
                      <Typography>
                        Dips: {entry.dips}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ ml: 'auto', ...buttonStyles }}
                        onClick={() => handleEditClick(entry, index)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Paper>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%',
          color: 'text.secondary',
          borderRadius: '8px'
        }}>
          <Typography variant="h6">
            Add your first entry to see the progress chart
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ChartSection;