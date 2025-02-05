import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const UserInputForm = ({ generatePrograms }) => {
  const [maxReps, setMaxReps] = useState({
    maxRepsPushUps: '',
    maxRepsPullUps: '',
    maxRepsDips: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setMaxReps({ ...maxReps, [name]: value });
    }
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (maxReps.maxRepsPushUps === '' || parseInt(maxReps.maxRepsPushUps, 10) < 0) tempErrors.maxRepsPushUps = "Please enter a valid number of push-ups.";
    if (maxReps.maxRepsPullUps === '' || parseInt(maxReps.maxRepsPullUps, 10) < 0) tempErrors.maxRepsPullUps = "Please enter a valid number of pull-ups.";
    if (maxReps.maxRepsDips === '' || parseInt(maxReps.maxRepsDips, 10) < 0) tempErrors.maxRepsDips = "Please enter a valid number of dips.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formattedMaxReps = {
        maxRepsPushUps: parseInt(maxReps.maxRepsPushUps, 10),
        maxRepsPullUps: parseInt(maxReps.maxRepsPullUps, 10),
        maxRepsDips: parseInt(maxReps.maxRepsDips, 10),
      };
      generatePrograms(formattedMaxReps);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="maxRepsPushUps"
        label="Max Reps Push Ups"
        name="maxRepsPushUps"
        type="number"
        value={maxReps.maxRepsPushUps}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!errors.maxRepsPushUps}
        helperText={errors.maxRepsPushUps}
        inputProps={{ min: 0, inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="maxRepsPullUps"
        label="Max Reps Pull Ups"
        name="maxRepsPullUps"
        type="number"
        value={maxReps.maxRepsPullUps}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!errors.maxRepsPullUps}
        helperText={errors.maxRepsPullUps}
        inputProps={{ min: 0, inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="maxRepsDips"
        label="Max Reps Dips"
        name="maxRepsDips"
        type="number"
        value={maxReps.maxRepsDips}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!errors.maxRepsDips}
        helperText={errors.maxRepsDips}
        inputProps={{ min: 0, inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Generate Program
      </Button>
    </Box>
  );
};

export default UserInputForm;
