import React from 'react';
import { Select } from './ui/select';
import { Label } from './ui/label';
import { Star } from 'lucide-react';

function RatingSelector({ attribute, value, onChange }) {
  const formatLabel = (attr) => {
    return attr
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 inline ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={attribute} className="text-sm font-medium text-gray-700">
        {formatLabel(attribute)}
      </Label>
      <Select
        id={attribute}
        value={value || ''}
        onChange={handleChange}
        className="w-full"
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map(rating => (
          <option key={rating} value={rating}>
            {rating} Star{rating !== 1 ? 's' : ''}
          </option>
        ))}
      </Select>
      {value && (
        <div className="flex items-center gap-1 mt-1">
          {renderStars(value)}
          <span className="text-sm text-gray-600 ml-2">
            {value}/5 Stars
          </span>
        </div>
      )}
    </div>
  );
}

export default RatingSelector;