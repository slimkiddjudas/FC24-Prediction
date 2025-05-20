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
      return { min: 0, max: 100, defaultValue: 55 };
    }
  };

  const { min, max, defaultValue } = getAttributeProps(attribute);
  
  const handleChange = (e) => {
    // String olarak değeri al, boş da olabilir
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
    <div className="form-group mb-3">
      <label htmlFor={attribute} className="form-label">{formatLabel(attribute)}:</label>
      <input
        type="number"
        id={attribute}
        value={value}
        onChange={handleChange}
        className="form-control"
        placeholder={defaultValue.toString()}
      />
      <small className="form-text text-muted">Range: {min} - {max}</small>
    </div>
  );
}

export default AttributeInput;