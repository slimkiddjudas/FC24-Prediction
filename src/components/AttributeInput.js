import React from 'react';

function AttributeInput({ attribute, value, onChange }) {
  // Define min, max, and default values based on the attribute
  const getAttributeProps = (attr) => {
    // Age restrictions
    if (attr === 'age') {
      return { min: 15, max: 40, defaultValue: 22 };
    }
    // Height restrictions
    else if (attr === 'height_cm') {
      return { min: 155, max: 210, defaultValue: 180 };
    }
    // Weight restrictions
    else if (attr === 'weight_kg') {
      return { min: 50, max: 120, defaultValue: 70 };
    }
    // All other attributes
    else {
      return { min: 50, max: 100, defaultValue: 55 };
    }
  };

  const { min, max, defaultValue } = getAttributeProps(attribute);

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    
    // Validate input is within range
    if (isNaN(newValue)) {
      newValue = defaultValue;
    } else if (newValue < min) {
      newValue = min;
    } else if (newValue > max) {
      newValue = max;
    }
    
    onChange(newValue);
  };

  // Format attribute label for display
  const formatLabel = (attr) => {
    return attr
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="form-group">
      <label htmlFor={attribute}>{formatLabel(attribute)}:</label>
      <input
        type="number"
        id={attribute}
        value={value || ''}
        onChange={handleChange}
        min={min}
        max={max}
        placeholder={defaultValue}
        className="form-control"
      />
      <small className="form-text text-muted">Range: {min} - {max}</small>
    </div>
  );
}

export default AttributeInput;