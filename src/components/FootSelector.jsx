import React from 'react';
import { Select } from './ui/select';
import { Label } from './ui/label';
import { footOptions } from '../constants/footMapping';

function FootSelector({ selectedFoot, onFootChange }) {
  const handleChange = (e) => {
    const foot = e.target.value;
    onFootChange(foot);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="foot" className="text-sm font-medium text-gray-700">
        Preferred Foot
      </Label>
      <Select
        id="foot"
        className="w-full"
        value={selectedFoot}
        onChange={handleChange}
      >
        <option value="">Select Foot</option>
        {footOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default FootSelector;