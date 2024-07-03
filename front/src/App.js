import React, { useState } from "react";
import UserInputForm from "./features/components/UserInputForm";
import ProgramDisplay from "./features/components/ProgramDisplay";
import "./App.css"; // Import updated CSS

function App() {
  const [programs, setPrograms] = useState({});

  const generatePrograms = async (maxReps) => {
    try {
      const response = await fetch("/api/generate-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maxReps),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{" "} mode.
          Small changes
        </small>
        <form>
          <input
            type="hidden"
            defaultValue={process.env.REACT_APP_NOT_SECRET_CODE}
          />
        </form>
      </div>
      <h1>Street Workout Partner</h1>
      <UserInputForm generatePrograms={generatePrograms} />
      <ProgramDisplay programs={programs} />
      <footer>
        <p>
          &copy; {new Date().getFullYear()} Street Workout Partner. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
