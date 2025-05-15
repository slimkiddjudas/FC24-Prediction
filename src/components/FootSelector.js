import React from 'react';
import { footMapping, footOptions } from '../constants/footMapping';

function FootSelector({ selectedFoot, onFootChange }) {
  const handleChange = (e) => {
    const foot = e.target.value;
    const footValue = foot ? footMapping[foot] : null;
    onFootChange(foot, footValue);
  };

  return (
    <div className="form-group">
      <label htmlFor="preferred_foot">Preferred Foot:</label>
      <select 
        id="preferred_foot" 
        value={selectedFoot || ''} 
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select preferred foot</option>
        {footOptions.map(foot => (
          <option key={foot} value={foot}>
            {foot}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FootSelector;