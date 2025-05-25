import React from 'react';
import { Select } from './ui/select';
import { Label } from './ui/label';
import { positionOptions } from '../constants/positionMapping';

function PositionSelector({ selectedPosition, onPositionChange }) {
  const handleChange = (e) => {
    const position = e.target.value;
    onPositionChange(position);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="position" className="text-sm font-medium text-gray-700">
        Position
      </Label>
      <Select 
        id="position" 
        value={selectedPosition} 
        onChange={handleChange}
        className="w-full"
      >
        <option value="">Select a position</option>
        {positionOptions.map(pos => (
          <option key={pos} value={pos}>
            {pos}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default PositionSelector;