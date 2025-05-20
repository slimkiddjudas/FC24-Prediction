import React from 'react';
import { positionOptions } from '../constants/positionMapping';

function PositionSelector({ selectedPosition, onPositionChange }) {
  const handleChange = (e) => {
    const position = e.target.value;
    onPositionChange(position);
  };

  return (
    <div className="form-group">
      <label htmlFor="position">Position:</label>
      <select 
        id="position" 
        value={selectedPosition} 
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select a position</option>
        {positionOptions.map(pos => (
          <option key={pos} value={pos}>
            {pos}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelector;