import React from 'react';
import { positionMapping, positionOptions } from '../constants/positionMapping';

function PositionSelector({ selectedPosition, onPositionChange }) {
  const handleChange = (e) => {
    const position = e.target.value;
    const positionValue = positionMapping[position];
    onPositionChange(position, positionValue);
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