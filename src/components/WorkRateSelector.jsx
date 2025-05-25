import React from 'react';
import { Select } from './ui/select';
import { Label } from './ui/label';
import { workRateOptions } from '../constants/workRateMapping';

function WorkRateSelector({ selectedWorkRate, onWorkRateChange }) {
  const handleChange = (e) => {
    const workRate = e.target.value;
    onWorkRateChange(workRate);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="workRate" className="text-sm font-medium text-gray-700">
        Work Rate
      </Label>
      <Select
        id="workRate"
        className="w-full"
        value={selectedWorkRate}
        onChange={handleChange}
      >
        <option value="">Select Work Rate</option>
        {workRateOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}

export default WorkRateSelector;