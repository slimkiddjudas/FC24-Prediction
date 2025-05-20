import React from 'react';
import { footOptions } from '../constants/footMapping';

function FootSelector({ selectedFoot, onFootChange }) {
  const handleChange = (e) => {
    const foot = e.target.value;
    onFootChange(foot);
  };

  return (
    <div className="form-group">
      <label htmlFor="foot">Preferred Foot:</label>
      <select
        id="foot"
        className="form-control"
        value={selectedFoot}
        onChange={handleChange}
      >
        <option value="">Select Foot</option>
        {footOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FootSelector;