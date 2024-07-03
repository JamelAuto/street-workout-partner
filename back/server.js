const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // CORS configuration

// POST endpoint to generate workout program
app.post("/generate-program", (req, res) => {
  // Extract user inputs from req.body
  const { maxRepsPushUps, maxRepsPullUps, maxRepsDips } = req.body;

  // Validate inputs (positive integers)
  if (
    !Number.isInteger(maxRepsPushUps) ||
    !Number.isInteger(maxRepsPullUps) ||
    !Number.isInteger(maxRepsDips) ||
    maxRepsPushUps <= 0 ||
    maxRepsPullUps <= 0 ||
    maxRepsDips <= 0
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide positive integers." });
  }

  // Calculate reps for each exercise based on max reps
  const repsPushUps = Math.ceil(maxRepsPushUps / 3);
  const repsPullUps = Math.ceil(maxRepsPullUps / 3);
  const repsDips = Math.ceil(maxRepsDips / 3);

  // Calculate workout type based on reps for each exercise
  const workoutTypePushUps =
    repsPushUps <= 7
      ? "strength"
      : repsPushUps <= 12
      ? "hypertrophy"
      : "endurance";
  const workoutTypePullUps =
    repsPullUps <= 7
      ? "strength"
      : repsPullUps <= 12
      ? "hypertrophy"
      : "endurance";
  const workoutTypeDips =
    repsDips <= 7 ? "strength" : repsDips <= 12 ? "hypertrophy" : "endurance";

  // Function to generate workout program
  const generateProgram = (reps, workoutType) => {
    return `workout for ${workoutType} : ${reps} * 4`;
  };

  // Generate programs
  const pushUpsProgram = generateProgram(repsPushUps, workoutTypePushUps);
  const pullUpsProgram = generateProgram(repsPullUps, workoutTypePullUps);
  const dipsProgram = generateProgram(repsDips, workoutTypeDips);

  // Send response with generated programs
  res.json({ pushUpsProgram, pullUpsProgram, dipsProgram });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
