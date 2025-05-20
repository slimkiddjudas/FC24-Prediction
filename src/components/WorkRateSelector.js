import React from 'react';
import { workRateOptions } from '../constants/workRateMapping';

function WorkRateSelector({ selectedWorkRate, onWorkRateChange }) {
  const handleChange = (e) => {
    const workRate = e.target.value;
    onWorkRateChange(workRate);
  };

  return (
    <div className="form-group">
      <label htmlFor="workRate">Work Rate:</label>
      <select
        id="workRate"
        className="form-select"
        value={selectedWorkRate}
        onChange={handleChange}
      >
        <option value="">Select Work Rate</option>
        {workRateOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WorkRateSelector;