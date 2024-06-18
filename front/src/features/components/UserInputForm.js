import React, { useState } from 'react';

const UserInputForm = ({ generatePrograms }) => {
  const [maxReps, setMaxReps] = useState({
    maxRepsPushUps: '',
    maxRepsPullUps: '',
    maxRepsDips: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaxReps({ ...maxReps, [name]: parseInt(value, 10) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePrograms(maxReps);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Max Reps Push Ups:
        <input type="number" name="maxRepsPushUps" value={maxReps.maxRepsPushUps} onChange={handleChange} required />
      </label>
      <label>
        Max Reps Pull Ups:
        <input type="number" name="maxRepsPullUps" value={maxReps.maxRepsPullUps} onChange={handleChange} required />
      </label>
      <label>
        Max Reps Dips:
        <input type="number" name="maxRepsDips" value={maxReps.maxRepsDips} onChange={handleChange} required />
      </label>
      <button type="submit">Generate Program</button>
    </form>
  );
};

export default UserInputForm;
