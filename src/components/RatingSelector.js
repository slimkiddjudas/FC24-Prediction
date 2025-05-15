import React from 'react';

function RatingSelector({ attribute, value, onChange }) {
  // Format attribute label for display
  const formatLabel = (attr) => {
    return attr
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="form-group">
      <label htmlFor={attribute}>{formatLabel(attribute)}:</label>
      <select
        id={attribute}
        value={value || ''}
        onChange={handleChange}
        className="form-control"
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map(rating => (
          <option key={rating} value={rating}>
            {rating} {'★'.repeat(rating)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RatingSelector;