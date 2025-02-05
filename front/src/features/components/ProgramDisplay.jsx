import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ProgramDisplay = ({ programs }) => {
  return (
    <Box mt={4}>
      {programs.pushUpsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Push Ups</Typography>
          <Typography>{programs.pushUpsProgram}</Typography>
        </Paper>
      )}
      {programs.pullUpsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Pull Ups</Typography>
          <Typography>{programs.pullUpsProgram}</Typography>
        </Paper>
      )}
      {programs.dipsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Dips</Typography>
          <Typography>{programs.dipsProgram}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ProgramDisplay;
