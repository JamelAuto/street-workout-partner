import React from 'react';

const ProgramDisplay = ({ programs }) => {
  return (
    <div className="programs">
      {programs.pushUpsProgram && (
        <div className="program">
          <h3>Push Ups</h3>
          <p>{programs.pushUpsProgram}</p>
        </div>
      )}
      {programs.pullUpsProgram && (
        <div className="program">
          <h3>Pull Ups</h3>
          <p>{programs.pullUpsProgram}</p>
        </div>
      )}
      {programs.dipsProgram && (
        <div className="program">
          <h3>Dips</h3>
          <p>{programs.dipsProgram}</p>
        </div>
      )}
    </div>
  );
};

export default ProgramDisplay;
