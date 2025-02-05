import React, { useState } from "react";
import UserInputForm from "./features/components/UserInputForm";
import ProgramDisplay from "./features/components/ProgramDisplay";
import { Container, Typography, Box, CssBaseline } from "@mui/material";
import axios from "./axios.js";

function App() {
  const [programs, setPrograms] = useState({});

  const generatePrograms = async (maxReps) => {
    try {
      const response = await axios.post("/generate-program", {
        maxRepsPushUps: maxReps.maxRepsPushUps,
        maxRepsPullUps: maxReps.maxRepsPullUps,
        maxRepsDips: maxReps.maxRepsDips,
      });
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Street Workout Partner
        </Typography>
        <Typography component="p" variant="body2" color="textSecondary">
          You are running this application in <b>{process.env.NODE_ENV}</b> mode.
        </Typography>
        <UserInputForm generatePrograms={generatePrograms} />
        <ProgramDisplay programs={programs} />
      </Box>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Street Workout Partner. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
