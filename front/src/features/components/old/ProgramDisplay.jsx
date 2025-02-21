import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ProgramDisplay = ({ program }) => {
  return (
    <Box mt={4}>
      {program.pushUpsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Push Ups</Typography>
          <Typography>{program.pushUpsProgram}</Typography>
        </Paper>
      )}
      {program.pullUpsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Pull Ups</Typography>
          <Typography>{program.pullUpsProgram}</Typography>
        </Paper>
      )}
      {program.dipsProgram && (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Dips</Typography>
          <Typography>{program.dipsProgram}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ProgramDisplay;
