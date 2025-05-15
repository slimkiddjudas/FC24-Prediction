import React from 'react';

function ResultDisplay({ predictedValue }) {
  return (
    <div className="result-display">
      <h2>Predicted Market Value</h2>
      {predictedValue ? (
        <p>The estimated market value is: <strong>${predictedValue}</strong></p>
      ) : (
        <p>Please enter player attributes to see the predicted market value.</p>
      )}
    </div>
  );
}

export default ResultDisplay;