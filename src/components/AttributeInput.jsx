import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

function AttributeInput({ attribute, value, onChange }) {
  const getAttributeProps = (attr) => {
    if (attr === 'age') {
      return { min: 15, max: 40, defaultValue: 22 };
    }
    else if (attr === 'height_cm') {
      return { min: 155, max: 210, defaultValue: 180 };
    }
    else if (attr === 'weight_kg') {
      return { min: 50, max: 120, defaultValue: 70 };
    }
    else {
      return { min: 0, max: 100, defaultValue: 55 };
    }
  };

  const { min, max, defaultValue } = getAttributeProps(attribute);
  
  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  const formatLabel = (attr) => {
    return attr
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={attribute} className="text-sm font-medium text-gray-700">
        {formatLabel(attribute)}
      </Label>
      <div className="relative">
        <Input
          type="number"
          id={attribute}
          value={value}
          onChange={handleChange}
          className="pr-16"
          placeholder={defaultValue.toString()}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
          {min}-{max}
        </div>
      </div>
    </div>
  );
}

export default AttributeInput;