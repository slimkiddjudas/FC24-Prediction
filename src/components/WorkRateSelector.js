import React from 'react';
import { workRateMapping, workRateOptions } from '../constants/workRateMapping';

function WorkRateSelector({ selectedWorkRate, onWorkRateChange }) {
  const handleChange = (e) => {
    const workRate = e.target.value;
    const workRateValue = workRate ? workRateMapping[workRate] : null;
    onWorkRateChange(workRate, workRateValue);
  };

  return (
    <div className="form-group">
      <label htmlFor="work_rate">Work Rate (Attack/Defense):</label>
      <select 
        id="work_rate" 
        value={selectedWorkRate || ''} 
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select work rate</option>
        {workRateOptions.map(workRate => (
          <option key={workRate} value={workRate}>
            {workRate}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WorkRateSelector;